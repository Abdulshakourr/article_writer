"use client"
import {
  Edit,
  PenIcon,
  Plus,
} from "lucide-react"


import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

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
} from "@/components/ui/sidebar"
import UserButton from "./UserButton"
import Link from "next/link"
import { getArticles } from "@/app/actions/articles"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

export default function AppSidebar() {
  const pathname = usePathname()
  const [articles, setArticles] = useState<any[]>([])

  useEffect(() => {
    const fetchArticles = async () => {
      const articles = await getArticles()
      setArticles(articles)
    }
    fetchArticles()
  }, [pathname])

 

  return (


    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="text-xl font-bold text-indigo-600 hover:text-indigo-800"><PenIcon /> Marky</SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <Link href="/create">
            <SidebarMenuButton>
              <Plus /> Add Article
            </SidebarMenuButton>
          </Link>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="text-md text-black/40 font-bold">Your Articles</SidebarGroupLabel>
          <SidebarMenu>
            {/* {articles && <p>loading...</p>} */}
            {articles.map((item) => (
               <Link href={`/dashboard/${item.id}`}>
              <SidebarMenuButton tooltip={item.title}  key={item.id}  className="text-sm text-gray-500 hover:text-gray-800" >
               <Edit/>{item.title}
              </SidebarMenuButton>
              </Link>
            ))}
            {!articles.length && <SidebarMenuButton className="text-sm text-gray-500 hover:text-gray-800" >No articles found</SidebarMenuButton>}
          </SidebarMenu>
        </SidebarGroup>

      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <UserButton />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
