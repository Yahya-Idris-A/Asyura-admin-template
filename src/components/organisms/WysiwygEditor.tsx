"use client";

import React, {useCallback} from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import LinkExtension from "@tiptap/extension-link";
import { Color } from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import Highlight from "@tiptap/extension-highlight";
// ----------------------------
import { 
  Bold, Italic, Strikethrough, Underline as UnderlineIcon,
  List, ListOrdered, Heading1, Heading2, Heading3, 
  Quote, Undo, Redo, Code, AlignLeft, AlignCenter, 
  AlignRight, AlignJustify, ImageIcon, Link as LinkIcon, Minus, Unlink,
  Highlighter, Palette // Ikon baru untuk warna
} from "lucide-react";

export interface WysiwygEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
}

// --- Komponen Toolbar Internal ---
const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) return null;

  // Helper untuk styling tombol aktif
  const getButtonClass = (isActive: boolean) => `
    p-2 rounded-md transition-colors flex items-center justify-center
    ${isActive 
      ? "bg-primary/20 text-primary font-semibold" 
      : "text-foreground/70 hover:bg-background hover:text-foreground"
    }
  `;

  const Divider = () => <div className="w-px h-5 bg-border mx-1 shrink-0" />;

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);
    if (url === null) return; // cancelled
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  const addImage = useCallback(() => {
    // TODO: Di proyek real, di sini lo buka FileUploader, 
    // kirim gambar ke backend Go, dapatkan URL S3/Cloudinary, lalu masukkan ke src.
    const url = window.prompt('Enter Image URL (e.g., https://placehold.co/600x400):');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  return (
    <div className="flex flex-wrap items-center gap-y-2 gap-x-1 p-2 border-b border-border bg-background/50 rounded-t-xl overflow-x-auto custom-scrollbar">
      
      {/* 1. History */}
      <div className="flex items-center">
        <button type="button" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} className="p-1.5 text-foreground/50 hover:text-foreground disabled:opacity-30"><Undo className="w-4 h-4" /></button>
        <button type="button" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} className="p-1.5 text-foreground/50 hover:text-foreground disabled:opacity-30"><Redo className="w-4 h-4" /></button>
      </div>
      <Divider />

      {/* 2. Text Formatting */}
      <div className="flex items-center">
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={getButtonClass(editor.isActive("bold"))} title="Bold"><Bold className="w-4 h-4" /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={getButtonClass(editor.isActive("italic"))} title="Italic"><Italic className="w-4 h-4" /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} className={getButtonClass(editor.isActive("underline"))} title="Underline"><UnderlineIcon className="w-4 h-4" /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleStrike().run()} className={getButtonClass(editor.isActive("strike"))} title="Strikethrough"><Strikethrough className="w-4 h-4" /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleCode().run()} className={getButtonClass(editor.isActive("code"))} title="Inline Code"><Code className="w-4 h-4" /></button>
      </div>
      <Divider />

      <div className="flex items-center gap-1">
        {/* Input type="color" disembunyikan pakai CSS, dipicu lewat label */}
        <label className="relative cursor-pointer flex items-center justify-center p-1.5 tablet:p-2 rounded-md text-foreground/70 hover:bg-background hover:text-foreground transition-colors" title="Text Color">
          <Palette className="w-4 h-4" />
          <input
            type="color"
            onInput={(event) => editor.chain().focus().setColor((event.target as HTMLInputElement).value).run()}
            value={editor.getAttributes('textStyle').color || '#000000'}
            className="absolute opacity-0 w-0 h-0"
            data-testid="setColor"
          />
          {/* Indikator warna yang sedang aktif */}
          <div 
            className="absolute bottom-1 right-1 w-2 h-2 rounded-full border border-border" 
            style={{ backgroundColor: editor.getAttributes('textStyle').color || 'currentColor' }} 
          />
        </label>

        <button 
          type="button" 
          onClick={() => editor.chain().focus().toggleHighlight({ color: '#fef08a' }).run()} 
          className={getButtonClass(editor.isActive("highlight"))} 
          title="Highlight Text"
        >
          <Highlighter className="w-4 h-4" />
        </button>
      </div>
      <Divider />

      {/* 3. Headings & Paragraph */}
      <div className="flex items-center">
        <button type="button" onClick={() => editor.chain().focus().setParagraph().run()} className={getButtonClass(editor.isActive("paragraph"))} title="Paragraph"><span className="text-xs font-bold px-1">P</span></button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={getButtonClass(editor.isActive("heading", { level: 1 }))} title="Heading 1"><Heading1 className="w-4 h-4" /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={getButtonClass(editor.isActive("heading", { level: 2 }))} title="Heading 2"><Heading2 className="w-4 h-4" /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={getButtonClass(editor.isActive("heading", { level: 3 }))} title="Heading 3"><Heading3 className="w-4 h-4" /></button>
      </div>
      <Divider />

      {/* 4. Alignment */}
      <div className="flex items-center">
        <button type="button" onClick={() => editor.chain().focus().setTextAlign('left').run()} className={getButtonClass(editor.isActive({ textAlign: 'left' }))} title="Align Left"><AlignLeft className="w-4 h-4" /></button>
        <button type="button" onClick={() => editor.chain().focus().setTextAlign('center').run()} className={getButtonClass(editor.isActive({ textAlign: 'center' }))} title="Align Center"><AlignCenter className="w-4 h-4" /></button>
        <button type="button" onClick={() => editor.chain().focus().setTextAlign('right').run()} className={getButtonClass(editor.isActive({ textAlign: 'right' }))} title="Align Right"><AlignRight className="w-4 h-4" /></button>
        <button type="button" onClick={() => editor.chain().focus().setTextAlign('justify').run()} className={getButtonClass(editor.isActive({ textAlign: 'justify' }))} title="Justify"><AlignJustify className="w-4 h-4" /></button>
      </div>
      <Divider />

      {/* 5. Lists & Block */}
      <div className="flex items-center">
        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={getButtonClass(editor.isActive("bulletList"))} title="Bullet List"><List className="w-4 h-4" /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={getButtonClass(editor.isActive("orderedList"))} title="Numbered List"><ListOrdered className="w-4 h-4" /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={getButtonClass(editor.isActive("blockquote"))} title="Blockquote"><Quote className="w-4 h-4" /></button>
        <button type="button" onClick={() => editor.chain().focus().setHorizontalRule().run()} className={getButtonClass(false)} title="Horizontal Rule"><Minus className="w-4 h-4" /></button>
      </div>
      <Divider />

      {/* 6. Media & Links */}
      <div className="flex items-center">
        <button type="button" onClick={setLink} className={getButtonClass(editor.isActive("link"))} title="Add Link"><LinkIcon className="w-4 h-4" /></button>
        <button type="button" onClick={() => editor.chain().focus().unsetLink().run()} disabled={!editor.isActive("link")} className="p-1.5 text-foreground/50 hover:text-foreground disabled:opacity-30" title="Remove Link"><Unlink className="w-4 h-4" /></button>
        <button type="button" onClick={addImage} className={getButtonClass(false)} title="Insert Image"><ImageIcon className="w-4 h-4" /></button>
      </div>

    </div>
  );
};

// --- Komponen Utama Editor ---
export const WysiwygEditor = ({ value, onChange, placeholder = "Write something awesome...", label, error }: WysiwygEditorProps) => {
  
const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      // ------------------------
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-lg max-w-full h-auto my-4 border border-border shadow-sm',
        },
      }),
      LinkExtension.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-primary underline cursor-pointer',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Placeholder.configure({
        placeholder: placeholder,
        emptyEditorClass: "is-editor-empty before:content-[attr(data-placeholder)] before:text-foreground/40 before:float-left before:pointer-events-none",
      }),
    ],
    content: value,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose-base max-w-none focus:outline-none min-h-[200px] p-4 text-foreground",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="flex flex-col gap-2 w-full">
      {label && <label className="text-sm font-medium text-foreground">{label}</label>}
      
      <div className={`flex flex-col w-full rounded-xl border bg-card transition-colors
        ${error ? "border-red-500 focus-within:ring-1 focus-within:ring-red-500/50" : "border-border focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/30"}
      `}>
        {/* Toolbar Kustom Kita */}
        <MenuBar editor={editor} />
        
        {/* Area Ngetik TipTap */}
        <EditorContent editor={editor} className="flex-1 overflow-y-auto max-h-[500px]" />
      </div>

      {error && <span className="text-xs font-medium text-red-500">{error}</span>}
    </div>
  );
};