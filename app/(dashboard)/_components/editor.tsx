"use client";

import dynamic from "next/dynamic";
import "@uiw/react-markdown-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import html2pdf from "html2pdf.js";
import { useTheme } from "next-themes";

const Markdown = dynamic(
  () => import("@uiw/react-markdown-editor").then((mod) => mod.default),
  { ssr: false },
);

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
  const { theme } = useTheme();
  const router = useRouter();

  // Editor configuration

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch(`/api/articles/${article?.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) throw new Error("Failed to update article");

      // Refresh the page data
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const response = await fetch(`/api/delete/${article?.id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      console.log(data);
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
    } finally {
      setDeleting(false);
    }
  };

  // const handleExport = async () => {
  //   setExporting(true);
  //   try {
  //     const element = document.querySelector(".wmde-markdown");
  //     if (!element) throw new Error("No element found");
  //     element.setAttribute("data-color-mode", "light");
  //     element.classList.add("pdf-export");
  //
  //     console.log("export", element);
  //     // Remove any unwanted elements or attributes
  //     element.querySelectorAll("script, style").forEach((el) => el.remove());
  //
  //     // configure html2pdf
  //     const options = {
  //       margin: [0.75, 0.75, 0.75, 0.75], // Increase margins
  //       filename: `${article?.title || "document"}.pdf`,
  //       image: { type: "jpeg", quality: 0.98 },
  //       html2canvas: { scale: 2, useCORS: true }, // Increase scale for better quality
  //       jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
  //       pagebreak: { mode: ["avoid-all", "css", "legacy"] }, // Improved page breaks
  //     };
  //
  //     await html2pdf().set(options).from(element).save();
  //   } catch (error) {
  //     console.log("ERROR_EXPORT", error);
  //   } finally {
  //     setExporting(false);
  //   }
  // };

  // const handleExport = async () => {
  //   setExporting(true);
  //   try {
  //     const element = document.querySelector(".wmde-markdown");
  //     if (!element) throw new Error("No element found");
  //
  //     // Create a new div to hold our export content
  //     const exportContainer = document.createElement("div");
  //     exportContainer.innerHTML = element.innerHTML;
  //
  //     // Apply light mode styles
  //     exportContainer.setAttribute("data-color-mode", "light");
  //     exportContainer.classList.add("pdf-export");
  //
  //     // Apply light mode to code blocks
  //     exportContainer.querySelectorAll("pre").forEach((pre) => {
  //       pre.style.backgroundColor = "#f6f8fa";
  //       pre.style.color = "#24292e";
  //     });
  //
  //     // Apply light mode to inline code
  //     exportContainer.querySelectorAll("code:not(pre code)").forEach((code) => {
  //       code.style.backgroundColor = "rgba(27,31,35,0.05)";
  //       code.style.color = "#24292e";
  //     });
  //
  //     // Add custom styles for PDF export
  //     const styleElement = document.createElement("style");
  //     styleElement.textContent = `
  //     .pdf-export {
  //       font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  //       line-height: 1.5;
  //       color: #24292e;
  //       background-color: #ffffff;
  //       padding: 20px;
  //     }
  //     .pdf-export h1, .pdf-export h2 {
  //       border-bottom: 1px solid #eaecef;
  //       padding-bottom: 0.3em;
  //       margin-top: 24px;
  //       margin-bottom: 16px;
  //     }
  //     .pdf-export pre {
  //       background-color: #f6f8fa;
  //       border-radius: 3px;
  //       font-size: 85%;
  //       line-height: 1.45;
  //       overflow: auto;
  //       padding: 16px;
  //     }
  //   `;
  //
  //     // Create a wrapper div that includes both the style and the content
  //     const wrapper = document.createElement("div");
  //     wrapper.appendChild(styleElement);
  //     wrapper.appendChild(exportContainer);
  //
  //     // Configure html2pdf options
  //     const options = {
  //       margin: [0.75, 0.75, 0.75, 0.75],
  //       filename: `${article?.title || "document"}.pdf`,
  //       image: { type: "jpeg", quality: 0.98 },
  //       html2canvas: { scale: 2, useCORS: true },
  //       jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
  //       pagebreak: { mode: ["avoid-all", "css", "legacy"] },
  //     };
  //
  //     // Generate and save PDF
  //     await html2pdf().set(options).from(wrapper).save();
  //   } catch (error) {
  //     console.log("ERROR_EXPORT", error);
  //   } finally {
  //     setExporting(false);
  //   }
  // };


  const handleExport = async () => {
    setExporting(true);
    try {
      const element = document.querySelector(".wmde-markdown");
      if (!element) throw new Error("No element found");

      // Clone the entire element
      const clonedElement = element.cloneNode(true) as Element;

      // Apply light mode styles
      clonedElement.setAttribute("data-color-mode", "light");
      clonedElement.classList.add("pdf-export");

      // Add custom styles for PDF export
      const styleElement = document.createElement("style");
      styleElement.textContent = `
      .pdf-export {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
        line-height: 1.5;
        color: #24292e;
        background-color: #ffffff;
        padding: 20px;
      }
      .pdf-export h1, .pdf-export h2 {
        border-bottom: 1px solid #eaecef;
        padding-bottom: 0.3em;
        margin-top: 24px;
        margin-bottom: 16px;
      }
      .pdf-export pre {
        background-color: #f6f8fa !important;
        border-radius: 3px;
        font-size: 85%;
        line-height: 1.45;
        overflow: auto;
        padding: 16px;
      }
      .pdf-export code {
        background-color: rgba(27,31,35,0.05);
        border-radius: 3px;
        font-size: 85%;
        margin: 0;
        padding: 0.2em 0.4em;
      }
      /* Add any other necessary styles here */
    `;

      // Create a wrapper div that includes both the style and the cloned content
      const wrapper = document.createElement("div");
      wrapper.appendChild(styleElement);
      wrapper.appendChild(clonedElement);

      // Configure html2pdf options
      const options = {
        margin: [0.75, 0.75, 0.75, 0.75],
        filename: `${article?.title || "document"}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
        pagebreak: { mode: ["avoid-all", "css", "legacy"] },
      };

      // Generate and save PDF
      await html2pdf().set(options).from(wrapper).save();
    } catch (error) {
      console.log("ERROR_EXPORT", error);
    } finally {
      setExporting(false);
    }
  };



  return (
    <div className="max-w-6xl mx-auto p-6 shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{article?.title}</h1>
        <div className="flex gap-4">
          <Button onClick={handleSave} disabled={saving} variant="secondary">
            {saving ? "Saving..." : "Save Changes"}
          </Button>
          <Button onClick={handleDelete} disabled={deleting} variant="outline">
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>

      <div className="mb-4 text-sm text-gray-500 flex gap-x-4 items-center">
        <div>
          Last updated:{" "}
          {new Date(article?.createdAt ?? Date.now()).toLocaleString()}
        </div>
        <Button onClick={handleExport} disabled={exporting}>
          {" "}
          {exporting ? "Exporting..." : "Export"}
        </Button>
      </div>
      <div
        data-color-mode={`${theme === "dark" ? "dark" : "light"}`}
        className="markdown-editor-wrapper"
      >
        <Markdown
          visible={true}
          value={content}
          onChange={(value) => setContent(value || "")}
          height="500px"
        />
      </div>
    </div>
  );
}
