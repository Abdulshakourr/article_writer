"use client";

import dynamic from "next/dynamic";
import "@uiw/react-markdown-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRouter } from "next/navigation";
import html2pdf from "html2pdf.js";
import { useTheme } from "next-themes";
import { debounce } from "lodash";
import { Eye, EyeOff, Save, Trash2 } from "lucide-react";

const Markdown = dynamic(() => import("@uiw/react-markdown-editor"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[500px] w-[1020px] "> <div className=" h-full w-full animate-pulse bg-muted rounded-md" /></div>
  )
}) as React.ComponentType<{
  value: string;
  onChange: (value: string) => void;
  height: string;
  width: string;
  options?: {
    autofocus?: boolean;
    spellcheck?: boolean;
    renderingConfig?: {
      singleLineBreaks?: boolean;
      codeSyntaxHighlighting?: boolean;
    };
    allowImages?: boolean;
  };
  visible?: boolean;
  preview?: 'live' | 'edit' | 'preview';
  enableScroll?: boolean;
}>;

interface ArticleProps {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export default function Editor({ article }: { article: ArticleProps | null }) {
  const [content, setContent] = useState(article?.content || "");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date>(new Date(article?.createdAt || Date.now()));
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const { theme } = useTheme();
  const router = useRouter();

  // Debounced save function
  const debouncedSave = useCallback(
    debounce(async (content: string) => {
      if (!article?.id) return;

      try {
        setSaving(true);
        const response = await fetch(`/api/articles/${article.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content }),
        });

        if (!response.ok) throw new Error("Failed to update article");

        setLastSaved(new Date());
        router.refresh();
      } catch (error) {
        console.error(error);
      } finally {
        setSaving(false);
      }
    }, 1000),
    [article?.id, router]
  );

  // Auto-save on content change
  useEffect(() => {
    if (content !== article?.content) {
      debouncedSave(content);
    }
  }, [content, article?.content, debouncedSave]);

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      debouncedSave.cancel();
    };
  }, [debouncedSave]);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this article?")) return;

    setDeleting(true);
    try {
      const response = await fetch(`/api/delete/${article?.id}`, {
        method: "DELETE",
      });
      console.log("res", response)
      if (!response.ok) throw new Error("Failed to delete article");

      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setDeleting(false);
    }
  };

  const handleExport = async () => {
    setExporting(true);
    try {
      const element = document.querySelector(".wmde-markdown");
      if (!element) throw new Error("No element found");

      // Clone the element to avoid modifying the original
      const clonedElement = element.cloneNode(true) as Element;
      clonedElement.setAttribute("data-color-mode", "light");
      // clonedElement.classList.add("pdf-export");

      // // Add export styles
      // const styleElement = document.createElement("style");
      // styleElement.textContent = `
      //   .pdf-export {
      //     font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      //     line-height: 1.5;
      //     color: #24292e;
      //     background-color: #ffffff;
      //     padding: 10px;
      //   }
      //   .pdf-export h1, .pdf-export h2 {
      //     // border-bottom: 1px solid #eaecef;
      //     padding-bottom: 0.3em;
      //     margin-top: 10px;
      //     margin-bottom: 12px;
      //   }
      //   .pdf-export pre {
      //     background-color: #f6f8fa !important;
      //     border-radius: 3px;
      //     font-size: 85%;
      //     line-height: 1.45;
      //     padding: 16px;
      //   }
      //   .pdf-export code {
      //     background-color: rgba(27,31,35,0.05);
      //     border-radius: 3px;
      //     font-size: 85%;
      //     margin: 0;
      //     padding: 0.2em 0.4em;
      //   }
      // `;

      const wrapper = document.createElement("div");
      // wrapper.appendChild(styleElement);
      wrapper.appendChild(clonedElement);

      const options = {
        margin: [0.75, 0.75, 0.75, 0.75],
        filename: `${article?.title || "document"}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          logging: false, // Disable logging for better performance
          removeContainer: true // Clean up after export
        },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
        pagebreak: { mode: ["avoid-all", "css", "legacy"] },
      };

      await html2pdf().set(options).from(wrapper).save();
    } catch (error) {
      console.error("Export failed:", error);
    } finally {
      setExporting(false);
    }
  };

  // const insertMarkdown = (markdown: string) => {
  //   const currentValue = content;
  //   const newValue = currentValue + markdown;
  //   setContent(newValue);
  //   debouncedSave(newValue);
  // };

  return (
    <div className="h-full flex flex-col w-full">
      <header className="flex items-center justify-between border-b p-4">
        <h1 className="text-lg font-semibold">{article?.title}</h1>
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={() => debouncedSave(content)} disabled={saving} variant="outline" size="icon">
                  <Save className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Save Changes</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={handleDelete} disabled={deleting} variant="outline" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Delete</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Button
            onClick={handleExport}
            disabled={exporting}
            variant="outline"
          >
            {exporting ? "Exporting..." : "Export to PDF"}
          </Button>
        </div>
      </header>

      <div className="flex-1 overflow-hidde w-full">
        <div className="flex-1 flex">
          <div className={`flex-1 ${isPreviewMode ? 'hidden' : ''}`}>
            <div
              data-color-mode={theme === "dark" ? "dark" : "light"}
              className="h-full"
            >
              <Markdown
                value={content}
                onChange={(value) => {
                  setContent(value);
                  debouncedSave(value);
                }}
                height="600px"
                width="1048px"
                preview="live"
                visible={true}
                enableScroll={true}
                options={{
                  autofocus: true,
                  spellcheck: true,
                  allowImages: true,
                  renderingConfig: {
                    singleLineBreaks: false,
                    codeSyntaxHighlighting: true,
                  }
                }}
              />
            </div>
          </div>
          <div className={`flex-1 border-l ${isPreviewMode ? '' : 'hidden'}`}>
            <div className="prose dark:prose-invert max-w-none p-4">
              <div className="wmde-markdown-var"> </div>
              <div className="wmde-markdown">
                <div className="wmde-markdown-color" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="flex items-center justify-between border-t p-2">
        <div className="text-sm text-muted-foreground">
          Last saved: {lastSaved.toLocaleString()}
        </div>
        <Button variant="ghost" size="sm" onClick={() => setIsPreviewMode(!isPreviewMode)}>
          {isPreviewMode ? <EyeOff className="mr-2 h-4 w-4" /> : <Eye className="mr-2 h-4 w-4" />}
          {isPreviewMode ? 'Edit' : 'Preview'}
        </Button>
      </footer>
    </div>
  );
}
