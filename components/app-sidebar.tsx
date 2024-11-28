"use client";
import { Edit, PenIcon, Plus } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import UserButton from "./UserButton";
import Link from "next/link";
import { getArticles } from "@/app/actions/articles";
import { Suspense, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface Article {
  id: string;
  title: string;
}

export default function AppSidebar() {
  const pathname = usePathname();
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const articles = await getArticles();
      setArticles(articles);
    };
    fetchArticles();
  }, [pathname]);

  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="flex items-center gap-2 py-4">
              <PenIcon className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">
                Marky
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <Link href="/create" className="w-full">
            <SidebarMenuButton className="w-full bg-primary/10 hover:bg-primary/20 text-primary rounded-lg my-2">
              <Plus className="h-4 w-4" />
              <span className="font-medium">New Article</span>
            </SidebarMenuButton>
          </Link>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="px-2 text-sm font-semibold text-muted-foreground">
            Your Articles
          </SidebarGroupLabel>
          <SidebarMenu>
            {articles.map((item) => (
              <Link href={`/dashboard/${item.id}`} key={item.id} className="w-full">
                <SidebarMenuButton
                  tooltip={item.title}
                  className={`w-full rounded-lg mb-1 ${pathname === `/dashboard/${item.id}`
                      ? "bg-secondary text-secondary-foreground"
                      : "hover:bg-secondary/50 text-muted-foreground hover:text-foreground"
                    }`}
                >
                  <Edit className="h-4 w-4" />
                  <span className="truncate text-sm">{item.title}</span>
                </SidebarMenuButton>
              </Link>
            ))}
            {!articles.length && (
              <div className="px-2 py-4 text-sm text-muted-foreground text-center">
                No articles yet
              </div>
            )}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <UserButton />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
