"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Node as TiptapNode, mergeAttributes } from "@tiptap/core";
import {
  EditorContent,
  NodeViewWrapper,
  ReactNodeViewRenderer,
  useEditor,
  type NodeViewProps,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import CodeBlock from "@tiptap/extension-code-block";
import TextAlign from "@tiptap/extension-text-align";
import { TableKit } from "@tiptap/extension-table";
import { cn } from "@/app/lib/utils";
import {
  FiAlignCenter,
  FiAlignLeft,
  FiAlignRight,
  FiBold,
  FiCode,
  FiImage,
  FiItalic,
  FiLink,
  FiList,
  FiUnderline,
  FiX,
} from "react-icons/fi";
import { MdFormatListNumbered, MdFormatQuote } from "react-icons/md";

type RichTextEditorProps = {
  value: string;
  onChange: (html: string) => void;
  onUploadImage?: (file: File) => Promise<string | null>;
  placeholder?: string;
  className?: string;
};

const ALLOWED_HTML_TAGS = new Set([
  "a",
  "b",
  "blockquote",
  "br",
  "code",
  "del",
  "div",
  "em",
  "h1",
  "h2",
  "h3",
  "h4",
  "hr",
  "i",
  "img",
  "li",
  "ol",
  "p",
  "pre",
  "s",
  "strong",
  "table",
  "tbody",
  "td",
  "th",
  "thead",
  "tr",
  "u",
  "ul",
]);

const DROP_HTML_TAGS = new Set([
  "iframe",
  "object",
  "script",
  "style",
  "svg",
  "video",
  "audio",
  "form",
  "input",
  "button",
  "embed",
  "link",
  "meta",
]);

function decodeHtmlAttribute(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return "";
  }
}

function isSafeUrl(value: string, allowDataImage = false) {
  const url = value.trim();
  if (!url) return false;
  if (allowDataImage && /^data:image\/(?:png|gif|jpe?g|webp);base64,/i.test(url)) {
    return true;
  }
  if (url.startsWith("/") && !url.startsWith("//")) return true;
  if (url.startsWith("#")) return true;

  try {
    const parsed = new URL(url);
    return ["http:", "https:", "mailto:", "tel:"].includes(parsed.protocol);
  } catch {
    return false;
  }
}

function sanitizeCustomHtml(html: string) {
  if (typeof window === "undefined" || !html.trim()) return "";

  const parsed = new DOMParser().parseFromString(html, "text/html");
  const cleanNode = (node: Node): Node[] => {
    if (node.nodeType === Node.TEXT_NODE) {
      return [document.createTextNode(node.textContent ?? "")];
    }
    if (!(node instanceof HTMLElement)) return [];

    const tag = node.tagName.toLowerCase();
    if (DROP_HTML_TAGS.has(tag)) return [];

    const children = Array.from(node.childNodes).flatMap(cleanNode);
    if (!ALLOWED_HTML_TAGS.has(tag)) return children;

    const clean = document.createElement(tag);
    for (const name of ["colspan", "rowspan"] as const) {
      const value = node.getAttribute(name);
      if ((tag === "td" || tag === "th") && value && /^\d{1,2}$/.test(value)) {
        clean.setAttribute(name, value);
      }
    }

    if (tag === "th") clean.setAttribute("scope", "col");

    if (tag === "a") {
      const href = node.getAttribute("href") ?? "";
      if (!isSafeUrl(href)) return children;
      clean.setAttribute("href", href.trim());
      clean.setAttribute("target", "_blank");
      clean.setAttribute("rel", "noopener noreferrer");
      const title = node.getAttribute("title");
      if (title) clean.setAttribute("title", title);
    }

    if (tag === "img") {
      const src = node.getAttribute("src") ?? "";
      if (!isSafeUrl(src, true)) return [];
      clean.setAttribute("src", src.trim());
      clean.setAttribute("alt", node.getAttribute("alt") ?? "");
      const title = node.getAttribute("title");
      if (title) clean.setAttribute("title", title);
      return [clean];
    }

    clean.append(...children);
    return [clean];
  };

  const container = document.createElement("div");
  container.append(...Array.from(parsed.body.childNodes).flatMap(cleanNode));
  return container.innerHTML;
}

function CustomHtmlBlockView({ node, updateAttributes }: NodeViewProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(String(node.attrs.html ?? ""));
  const source = String(node.attrs.html ?? "");
  const preview = sanitizeCustomHtml(editing ? draft : source);

  return (
    <NodeViewWrapper
      className="blog-custom-html-block my-5 block"
      contentEditable={false}
    >
      <div className="rounded-[20px] border-2 border-primary/60 p-1">
        <div className="overflow-x-auto rounded-2xl bg-white p-3">
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: preview }}
          />
        </div>
        <button
          type="button"
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => {
            setDraft(source);
            setEditing(true);
          }}
          className="ml-1 mt-2 cursor-pointer rounded-full bg-primary px-3.5 py-1.5 text-[12px] font-semibold text-black-v0 shadow-sm transition hover:bg-primary/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Edit HTML
        </button>
      </div>

      {editing ? (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setEditing(false);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-custom-html-title"
            className="flex max-h-[92vh] w-full max-w-[900px] flex-col overflow-hidden rounded-[24px] border border-white/10 bg-[#0F172A] shadow-2xl"
          >
            <header className="border-b border-white/10 px-5 py-4 sm:px-6">
              <h2
                id="edit-custom-html-title"
                className="text-[18px] font-semibold text-white"
              >
                Edit HTML
              </h2>
              <p className="mt-1 text-[13px] text-white/50">
                Update the source and preview it before applying.
              </p>
            </header>
            <div className="space-y-4 overflow-y-auto px-5 py-5 sm:px-6">
              <textarea
                aria-label="Custom HTML source"
                autoFocus
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                className="min-h-[190px] w-full resize-y rounded-2xl border border-white/10 bg-[#070B14] px-4 py-3 font-mono text-[12px] leading-relaxed text-primary/90 outline-none transition focus:border-primary/60"
                spellCheck={false}
              />
              <div className="min-h-28 overflow-x-auto rounded-2xl border border-white/10 bg-white p-4">
                {preview ? (
                  <div
                    className="blog-content"
                    dangerouslySetInnerHTML={{ __html: preview }}
                  />
                ) : (
                  <p className="py-8 text-center text-[13px] text-slate-400">
                    Paste supported HTML to preview it here.
                  </p>
                )}
              </div>
            </div>
            <footer className="flex justify-end gap-2 border-t border-white/10 px-5 py-4 sm:px-6">
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="inline-flex h-10 cursor-pointer items-center justify-center rounded-xl border border-white/10 px-4 text-[13px] font-medium text-white/75 transition hover:bg-white/[0.06]"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!preview}
                onClick={() => {
                  updateAttributes({ html: preview });
                  setEditing(false);
                }}
                className="inline-flex h-10 cursor-pointer items-center justify-center rounded-xl bg-primary px-5 text-[13px] font-semibold text-black-v0 transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Apply HTML
              </button>
            </footer>
          </section>
        </div>
      ) : null}
    </NodeViewWrapper>
  );
}

const CustomHtmlBlock = TiptapNode.create({
  name: "customHtmlBlock",
  group: "block",
  atom: true,
  selectable: true,

  addAttributes() {
    return {
      html: {
        default: "",
        parseHTML: (element) =>
          decodeHtmlAttribute(element.getAttribute("data-blog-custom-html") ?? ""),
        renderHTML: (attributes) => ({
          "data-blog-custom-html": encodeURIComponent(
            String(attributes.html ?? "")
          ),
        }),
      },
    };
  },

  parseHTML() {
    return [{ tag: "div[data-blog-custom-html]" }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, { class: "blog-custom-html-block" }),
      ["p", "Custom HTML block"],
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(CustomHtmlBlockView);
  },
});

function ToolbarButton({
  active,
  disabled,
  onClick,
  label,
  children,
}: {
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={active}
      disabled={disabled}
      onMouseDown={(event) => event.preventDefault()}
      onClick={onClick}
      className={cn(
        "inline-flex h-9 min-w-9 cursor-pointer items-center justify-center rounded-lg px-2.5 text-[13px] font-semibold transition",
        active
          ? "bg-primary/20 text-primary ring-1 ring-primary/40"
          : "text-white/65 hover:bg-white/[0.08] hover:text-white",
        disabled && "cursor-not-allowed opacity-40"
      )}
    >
      {children}
    </button>
  );
}

const controlClass =
  "h-10 rounded-xl border border-white/10 bg-[#0B1220] px-3 text-[13px] text-white outline-none transition focus:border-primary/50";
const actionClass =
  "inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/10 px-3 text-[13px] font-medium text-white/75 transition hover:bg-white/[0.06] hover:text-white";

export default function RichTextEditor({
  value,
  onChange,
  onUploadImage,
  placeholder = "Write your article...",
  className,
}: RichTextEditorProps) {
  const [htmlDialogOpen, setHtmlDialogOpen] = useState(false);
  const [customHtml, setCustomHtml] = useState("");
  const [linkOpen, setLinkOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("https://");
  const [linkError, setLinkError] = useState("");
  const [toolbarError, setToolbarError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const skipNextSync = useRef(false);
  const linkInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
        codeBlock: false,
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          rel: "noopener noreferrer",
          target: "_blank",
        },
      }),
      Image.configure({
        allowBase64: true,
        HTMLAttributes: {
          class: "rounded-xl max-w-full h-auto my-4",
        },
      }),
      TableKit.configure({
        table: { resizable: true, HTMLAttributes: { class: "blog-table" } },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right"],
      }),
      CustomHtmlBlock,
      Placeholder.configure({ placeholder }),
      CodeBlock,
    ],
    content: value || "",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "admin-editor max-w-none min-h-[360px] px-5 py-4 text-[15px] leading-relaxed text-white/90 outline-none focus:outline-none",
      },
    },
    onUpdate: ({ editor: currentEditor }) => {
      skipNextSync.current = true;
      const html = currentEditor.getHTML();
      onChange(html === "<p></p>" ? "" : html);
    },
  });

  useEffect(() => {
    if (!editor) return;
    if (skipNextSync.current) {
      skipNextSync.current = false;
      return;
    }
    const current = editor.getHTML();
    const next = value || "";
    if ((current === "<p></p>" ? "" : current) !== next) {
      editor.commands.setContent(next || "", { emitUpdate: false });
    }
  }, [value, editor]);

  useEffect(() => {
    if (linkOpen) {
      window.setTimeout(() => linkInputRef.current?.focus(), 50);
    }
  }, [linkOpen]);

  const openLinkPanel = useCallback(() => {
    if (!editor) return;
    const previous = editor.getAttributes("link").href as string | undefined;
    setLinkUrl(previous || "https://");
    setLinkError("");
    setLinkOpen(true);
  }, [editor]);

  const applyLink = () => {
    if (!editor) return;
    const url = linkUrl.trim();
    if (!url || url === "https://") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      setLinkOpen(false);
      return;
    }
    if (!isSafeUrl(url)) {
      setLinkError("Enter a valid http, https, mailto, tel, or site-relative URL.");
      return;
    }
    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url })
      .run();
    setLinkOpen(false);
  };

  const applyTextAlignment = (alignment: "left" | "center" | "right") => {
    if (!editor) return;
    setToolbarError("");
    const applied = editor
      .chain()
      .focus()
      .setTextAlign(alignment)
      .run();
    if (!applied) {
      setToolbarError("Place the cursor in a paragraph or heading before aligning text.");
    }
  };

  const handleImagePick = async (file: File) => {
    if (!editor) return;
    setUploading(true);
    setUploadError("");
    try {
      if (onUploadImage) {
        const url = await onUploadImage(file);
        if (!url) {
          setUploadError("The image upload did not return an image URL.");
          return;
        }
        editor
          .chain()
          .focus()
          .setImage({ src: url, alt: file.name.replace(/\.[^.]+$/, "") })
          .run();
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          editor
            .chain()
            .focus()
            .setImage({
              src: reader.result,
              alt: file.name.replace(/\.[^.]+$/, ""),
            })
            .run();
        }
      };
      reader.onerror = () => setUploadError("The selected image could not be read.");
      reader.readAsDataURL(file);
    } catch (error) {
      setUploadError(
        error instanceof Error ? error.message : "The image upload failed."
      );
    } finally {
      setUploading(false);
    }
  };

  const insertCustomHtml = () => {
    if (!editor) return;
    const cleanHtml = sanitizeCustomHtml(customHtml);
    if (!cleanHtml.trim()) return;
    const selection = editor.state.selection;
    editor
      .chain()
      .focus()
      .insertContentAt(
        { from: selection.from, to: selection.to },
        { type: CustomHtmlBlock.name, attrs: { html: cleanHtml } }
      )
      .run();
    setCustomHtml("");
    setHtmlDialogOpen(false);
  };

  if (!editor) {
    return (
      <div
        className={cn(
          "overflow-hidden rounded-2xl border border-white/10 bg-[#0B1220]",
          className
        )}
      >
        <div className="h-[420px] animate-pulse bg-white/[0.03]" />
      </div>
    );
  }

  const safePreview = sanitizeCustomHtml(customHtml);

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-white/10 bg-[#0B1220] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
        className
      )}
    >
      <div
        role="toolbar"
        aria-label="Article formatting"
        className="flex flex-wrap items-center gap-0.5 border-b border-white/10 bg-white/[0.03] px-2 py-2"
      >
        <ToolbarButton
          label="Bold"
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <FiBold size={15} />
        </ToolbarButton>
        <ToolbarButton
          label="Italic"
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <FiItalic size={15} />
        </ToolbarButton>
        <ToolbarButton
          label="Underline"
          active={editor.isActive("underline")}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <FiUnderline size={15} />
        </ToolbarButton>
        {[1, 2, 3].map((level) => (
          <ToolbarButton
            key={level}
            label={`Heading ${level}`}
            active={editor.isActive("heading", { level })}
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleHeading({ level: level as 1 | 2 | 3 })
                .run()
            }
          >
            H{level}
          </ToolbarButton>
        ))}
        <ToolbarButton
          label="Bullet list"
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <FiList size={15} />
        </ToolbarButton>
        <ToolbarButton
          label="Numbered list"
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <MdFormatListNumbered size={17} />
        </ToolbarButton>
        <ToolbarButton
          label="Quote"
          active={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          <MdFormatQuote size={17} />
        </ToolbarButton>
        <ToolbarButton
          label="Code block"
          active={editor.isActive("codeBlock")}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        >
          <FiCode size={15} />
        </ToolbarButton>
        <ToolbarButton
          label="Align left"
          active={editor.isActive({ textAlign: "left" })}
          onClick={() => applyTextAlignment("left")}
        >
          <FiAlignLeft size={15} />
        </ToolbarButton>
        <ToolbarButton
          label="Align center"
          active={editor.isActive({ textAlign: "center" })}
          onClick={() => applyTextAlignment("center")}
        >
          <FiAlignCenter size={15} />
        </ToolbarButton>
        <ToolbarButton
          label="Align right"
          active={editor.isActive({ textAlign: "right" })}
          onClick={() => applyTextAlignment("right")}
        >
          <FiAlignRight size={15} />
        </ToolbarButton>
        <ToolbarButton
          label="Insert custom HTML"
          onClick={() => setHtmlDialogOpen(true)}
        >
          <span className="text-[12px] font-semibold">HTML</span>
        </ToolbarButton>
        <ToolbarButton
          label="Link"
          active={editor.isActive("link") || linkOpen}
          onClick={openLinkPanel}
        >
          <FiLink size={15} />
        </ToolbarButton>
        <ToolbarButton
          label="Image"
          disabled={uploading}
          onClick={() => fileRef.current?.click()}
        >
          <FiImage size={15} />
        </ToolbarButton>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) void handleImagePick(file);
            event.target.value = "";
          }}
        />
      </div>

      {linkOpen ? (
        <div className="border-b border-white/10 bg-primary/5 px-3 py-3">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <input
              ref={linkInputRef}
              value={linkUrl}
              onChange={(event) => {
                setLinkUrl(event.target.value);
                setLinkError("");
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  applyLink();
                }
                if (event.key === "Escape") setLinkOpen(false);
              }}
              placeholder="https://example.com"
              className={cn(controlClass, "flex-1")}
            />
            <button
              type="button"
              onClick={applyLink}
              className="h-10 cursor-pointer rounded-xl bg-primary px-4 text-[13px] font-semibold text-black-v0"
            >
              Apply
            </button>
            <button
              type="button"
              onClick={() => {
                editor.chain().focus().extendMarkRange("link").unsetLink().run();
                setLinkOpen(false);
              }}
              className={actionClass}
            >
              Remove
            </button>
            <ToolbarButton
              label="Close link panel"
              onClick={() => setLinkOpen(false)}
            >
              <FiX size={16} />
            </ToolbarButton>
          </div>
          {linkError ? (
            <p role="alert" className="mt-2 text-[12px] text-red-300">
              {linkError}
            </p>
          ) : null}
        </div>
      ) : null}

      {toolbarError || uploading || uploadError ? (
        <div
          role={toolbarError || uploadError ? "alert" : "status"}
          className={cn(
            "border-b border-white/10 px-4 py-2 text-[12px]",
            toolbarError || uploadError ? "text-red-300" : "text-primary"
          )}
        >
          {toolbarError || uploadError || "Uploading image…"}
        </div>
      ) : null}

      <EditorContent
        editor={editor}
        className="h-[460px] overflow-y-auto overscroll-contain"
      />

      {htmlDialogOpen ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setHtmlDialogOpen(false);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="custom-html-title"
            className="flex max-h-[92vh] w-full max-w-[900px] flex-col overflow-hidden rounded-[24px] border border-white/10 bg-[#0F172A] shadow-2xl"
          >
            <header className="flex items-start justify-between gap-4 border-b border-white/10 px-5 py-4 sm:px-6">
              <div>
                <h2
                  id="custom-html-title"
                  className="text-[18px] font-semibold text-white"
                >
                  Custom HTML
                </h2>
                <p className="mt-1 max-w-2xl text-[13px] leading-relaxed text-white/50">
                  Paste a table or other supported HTML. Preview it before inserting into your article.
                </p>
              </div>
              <button
                type="button"
                aria-label="Close custom HTML"
                onClick={() => setHtmlDialogOpen(false)}
                className="inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-lg text-white/55 transition hover:bg-white/[0.06] hover:text-white"
              >
                <FiX size={18} />
              </button>
            </header>

            <div className="space-y-4 overflow-y-auto px-5 py-5 sm:px-6">
              <div>
                <label
                  htmlFor="custom-html-source"
                  className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.08em] text-white/60"
                >
                  HTML
                </label>
                <textarea
                  id="custom-html-source"
                  autoFocus
                  value={customHtml}
                  onChange={(event) => setCustomHtml(event.target.value)}
                  placeholder={`<table>
  <thead>
    <tr><th>Name</th><th>Email</th><th>City</th></tr>
  </thead>
  <tbody>
    <tr><td>Ali</td><td>ali@example.com</td><td>Lahore</td></tr>
  </tbody>
</table>`}
                  className="min-h-[190px] w-full resize-y rounded-2xl border border-white/10 bg-[#070B14] px-4 py-3 font-mono text-[12px] leading-relaxed text-primary/90 outline-none transition placeholder:text-white/30 focus:border-primary/60"
                  spellCheck={false}
                />
              </div>

              <div>
                <h3 className="mb-2 text-[12px] font-semibold uppercase tracking-[0.08em] text-white/60">
                  Preview
                </h3>
                <div className="min-h-28 overflow-x-auto rounded-2xl border border-white/10 bg-white p-4">
                  {safePreview ? (
                    <div
                      className="blog-content min-h-20"
                      dangerouslySetInnerHTML={{ __html: safePreview }}
                    />
                  ) : (
                    <p className="py-8 text-center text-[13px] text-slate-400">
                      Paste supported HTML to preview it here.
                    </p>
                  )}
                </div>
              </div>
            </div>

            <footer className="flex justify-end gap-2 border-t border-white/10 px-5 py-4 sm:px-6">
              <button
                type="button"
                onClick={() => setHtmlDialogOpen(false)}
                className={cn(actionClass, "px-4")}
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!safePreview}
                onClick={insertCustomHtml}
                className="inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-5 text-[13px] font-semibold text-black-v0 transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Insert HTML
              </button>
            </footer>
          </section>
        </div>
      ) : null}
    </div>
  );
}
