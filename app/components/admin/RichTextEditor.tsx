"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import CodeBlock from "@tiptap/extension-code-block";
import { cn } from "@/app/lib/utils";
import {
  FiBold,
  FiItalic,
  FiUnderline,
  FiList,
  FiCode,
  FiLink,
  FiImage,
  FiType,
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
      disabled={disabled}
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

function Divider() {
  return <span className="mx-1 hidden h-5 w-px bg-white/10 sm:block" />;
}

export default function RichTextEditor({
  value,
  onChange,
  onUploadImage,
  placeholder = "Write your article...",
  className,
}: RichTextEditorProps) {
  const [htmlMode, setHtmlMode] = useState(false);
  const [htmlDraft, setHtmlDraft] = useState(value);
  const [linkOpen, setLinkOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("https://");
  const [uploading, setUploading] = useState(false);
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
        HTMLAttributes: {
          class: "rounded-xl max-w-full h-auto my-4",
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
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
    onUpdate: ({ editor: ed }) => {
      skipNextSync.current = true;
      const html = ed.getHTML();
      setHtmlDraft(html);
      onChange(html === "<p></p>" ? "" : html);
    },
  });

  useEffect(() => {
    if (!editor || htmlMode) return;
    if (skipNextSync.current) {
      skipNextSync.current = false;
      return;
    }
    const current = editor.getHTML();
    const next = value || "";
    if ((current === "<p></p>" ? "" : current) !== next) {
      editor.commands.setContent(next || "", { emitUpdate: false });
      setHtmlDraft(next);
    }
  }, [value, editor, htmlMode]);

  useEffect(() => {
    if (linkOpen) {
      window.setTimeout(() => linkInputRef.current?.focus(), 50);
    }
  }, [linkOpen]);

  const openLinkPanel = useCallback(() => {
    if (!editor) return;
    const previous = editor.getAttributes("link").href as string | undefined;
    setLinkUrl(previous || "https://");
    setLinkOpen(true);
  }, [editor]);

  const applyLink = () => {
    if (!editor) return;
    const url = linkUrl.trim();
    if (!url || url === "https://") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    } else {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    }
    setLinkOpen(false);
  };

  const handleImagePick = async (file: File) => {
    if (!editor) return;
    setUploading(true);
    try {
      if (onUploadImage) {
        const url = await onUploadImage(file);
        if (url) editor.chain().focus().setImage({ src: url }).run();
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          editor.chain().focus().setImage({ src: reader.result }).run();
        }
      };
      reader.readAsDataURL(file);
    } finally {
      setUploading(false);
    }
  };

  const toggleHtmlMode = () => {
    if (!editor) return;
    if (htmlMode) {
      editor.commands.setContent(htmlDraft || "", { emitUpdate: false });
      onChange(htmlDraft);
      setHtmlMode(false);
      return;
    }
    setHtmlDraft(editor.getHTML());
    setHtmlMode(true);
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

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-white/10 bg-[#0B1220] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
        className
      )}
    >
      <div className="flex flex-wrap items-center gap-0.5 border-b border-white/10 bg-white/[0.03] px-2 py-2">
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

        <Divider />

        <ToolbarButton
          label="Heading 1"
          active={editor.isActive("heading", { level: 1 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
        >
          H1
        </ToolbarButton>
        <ToolbarButton
          label="Heading 2"
          active={editor.isActive("heading", { level: 2 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          H2
        </ToolbarButton>
        <ToolbarButton
          label="Heading 3"
          active={editor.isActive("heading", { level: 3 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          H3
        </ToolbarButton>

        <Divider />

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

        <Divider />

        <ToolbarButton
          label="HTML source"
          active={htmlMode}
          onClick={toggleHtmlMode}
        >
          <span className="inline-flex items-center gap-1.5">
            <FiType size={13} />
            HTML
          </span>
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
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void handleImagePick(file);
            e.target.value = "";
          }}
        />
      </div>

      {linkOpen ? (
        <div className="flex flex-col gap-2 border-b border-white/10 bg-primary/5 px-3 py-3 sm:flex-row sm:items-center">
          <input
            ref={linkInputRef}
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                applyLink();
              }
              if (e.key === "Escape") setLinkOpen(false);
            }}
            placeholder="https://example.com"
            className="h-10 flex-1 rounded-xl border border-white/10 bg-[#0B1220] px-3 text-[13px] text-white outline-none focus:border-primary/50"
          />
          <div className="flex items-center gap-2">
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
              className="h-10 cursor-pointer rounded-xl border border-white/10 px-3 text-[13px] text-white/70 hover:bg-white/5"
            >
              Remove
            </button>
            <button
              type="button"
              onClick={() => setLinkOpen(false)}
              className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-white/10 text-white/60 hover:bg-white/5"
              aria-label="Close link panel"
            >
              <FiX size={16} />
            </button>
          </div>
        </div>
      ) : null}

      {uploading ? (
        <div className="border-b border-white/10 bg-white/[0.03] px-4 py-2 text-[12px] text-primary">
          Uploading image…
        </div>
      ) : null}

      {htmlMode ? (
        <textarea
          value={htmlDraft}
          onChange={(e) => {
            setHtmlDraft(e.target.value);
            onChange(e.target.value);
          }}
          className="min-h-[360px] w-full resize-y bg-[#070B14] px-5 py-4 font-mono text-[13px] leading-relaxed text-primary/90 outline-none"
          spellCheck={false}
        />
      ) : (
        <EditorContent editor={editor} />
      )}
    </div>
  );
}
