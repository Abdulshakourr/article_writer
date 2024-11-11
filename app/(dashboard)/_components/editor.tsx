"use client";

import dynamic from "next/dynamic";
import "@uiw/react-markdown-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import html2pdf from "html2pdf.js";

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

  const handleExport = async () => {
    setExporting(true);
    try {
      const element = document.querySelector(".wmde-markdown");
      if (!element) throw new Error("No element found");
      element.setAttribute("data-color-mode", "light");
      // previewDiv.setAttribute("data-color-mode", "light");

      console.log("export", element);

      // configure html2pdf

      const options = {
        margin: 0.4,
        filename: `${article?.title || "document"}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      };

      html2pdf().set(options).from(element).save();
    } catch (error) {
      console.log("ERROR_EXPORT", error);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
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
      <div data-color-mode="light" className="markdown-editor-wrapper">
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
