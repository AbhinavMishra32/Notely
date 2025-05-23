import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { BubbleMenu, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import "../editorStyles.css";
import {
  AlignHorizontalDistributeEnd,
  Bold,
  ChevronLeft,
  ChevronRight,
  CloudUpload,
  Code,
  Code2,
  Dot,
  Italic,
  List,
  Loader2,
  Quote,
  Redo,
  ShieldClose,
  Strikethrough,
  Undo,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { api } from "../services/axios";
import React from "react";
import { SidebarOpenButton } from "../components/Navbar";
import { useSidebar } from "../contexts/SidebarContext";

const EditorPage = () => {
  const [size, setSize] = useState("");
  const [noteTitle, setNoteTitle] = useState("");
  const [content, updateContent] = useState("");
  const [allowedAccess, setAllowedAccess] = useState(true);
  const { noteId } = useParams();
  const [saving, setSaving] = useState(false);
  const [fetchingNote, setFetchingNote] = useState(true);
  const { sidebarOpen, setSidebarOpen } = useSidebar();

  const { getToken } = useAuth();

  const setEditorContent = (content: string) => {
    editor?.commands.setContent(content);
  }

  const fetchNote = async (noteId: string | undefined) => {
    if (!noteId) {
      console.log("noteId is undefined");
      return;
    }
    try {
      const response = await api.get(`/api/note/${noteId}`, {
        headers: {
          Authorization: `Bearer ${await getToken()}`
        }
      });
      setNoteTitle(response.data.note.title);
      setEditorContent(response.data.note.content); // Set content only once
      setFetchingNote(false);
      if (response.status == 403) {
        setAllowedAccess(false);
      }
    }
    catch (err) {
      console.log("Error fetching note: ", err);
      if (err.response && err.response.status == 403) {
        setAllowedAccess(false);
        setNoteTitle(err.response.data.note.title);
        setEditorContent(err.response.data.note.content);
      }
      setFetchingNote(false);
    }
  }

  useEffect(() => {
    fetchNote(noteId);
  }, [noteId]);

  const editor = useEditor({
    extensions,
    content: content,
    autofocus: true,
  });

  if (!editor) {
    return;
  }

  const handleKeyPress = () => {
    setSize("m-[1px]");

    setTimeout(() => {
      setSize("");
    }, 100);
  };

  const saveNote = async () => {
    try {
      setSaving(true);
      if (editor) {
        const content = editor.getHTML();
        const response = await api.put(`/api/note/${noteId}`, {
          title: noteTitle,
          content: content,
        }, {
          headers: {
            Authorization: `Bearer ${await getToken()}`
          }
        });
        if (response.status == 403) {
          setAllowedAccess(false);
        }
        setSaving(false);
        console.log("saveNote response: ", response);
        //   localStorage.setItem("noteContent", content);
        //   localStorage.setItem("noteTitle", noteTitle);
        // console.log("Note saved: ", content);
      }
    } catch (err) {
      if (err.status == 403) {
        setAllowedAccess(false);
      }
      console.log(err);
    }
  };
  return (
    <div className="relative flex flex-col items-center gap-2 w-full overflow-y-hidden">
      <div className="rounded-xl mt-2 w-full">
        {allowedAccess && (
          <div className="flex flex-col gap-1">
            <div className="relative flex items-center gap-2 sm:mb-0 mb-2">
              <div className="">
                <button
                  className="absolute top-0 left-4 sm:hidden flex items-center justify-center p-1 rounded-full bg-neutral-800 hover:bg-neutral-700 transition-all duration-300"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                  {sidebarOpen ? (
                    <ChevronLeft className="h-6 w-6" />
                  ) : (
                    <ChevronRight className="h-6 w-6" />
                  )}
                </button>
                <button
                  className="absolute top-0 left-[53px] sm:left-[90px] flex sm:ml-5 ml-0 items-center justify-center rounded-full bg-neutral-800 hover:bg-neutral-700 p-2 transition-all duration-300"
                  onClick={saveNote}
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <Loader2 className="animate-spin h-4 w-4 mr-2" />
                      <p className="text-xs mr-1">Saving...</p>
                    </>
                  ) : (
                    <CloudUpload className="h-4 w-4" />
                  )}
                </button>
              </div>
              <div className="flex w-full items-center sm:justify-start justify-center gap-1 h-8 transition-all duration-300">
                <button
                  onClick={() => editor.chain().focus().undo().run()}
                  disabled={!editor.can().chain().focus().undo().run()}
                  className="px-2 py-2 rounded-full bg-neutral-800 hover:bg-neutral-700 transition-all duration-300"
                >
                  <Undo className="h-4 w-4" />
                </button>
                <button
                  onClick={() => editor.chain().focus().redo().run()}
                  disabled={!editor.can().chain().focus().redo().run()}
                  className={`px-2 py-2 rounded-full transition-all duration-300 ${editor.can().chain().focus().redo().run()
                    ? "bg-neutral-800 hover:bg-neutral-700"
                    : "opacity-30"
                    }`}
                >
                  <Redo className="h-4 w-4" />
                </button>

              </div>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-1">
              {/* <div className="flex flex-wrap justify-center items-center bg-neutral-900 w-full"> */}
              <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}
                className={`px-2 py-2 rounded ${editor.isActive("bold") ? "bg-neutral-700" : "bg-neutral-800"
                  }`}
              >
                <Bold className="h-4 w-4" />
              </button>
              <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
                className={`px-2 py-2 rounded ${editor.isActive("italic")
                  ? "bg-neutral-700"
                  : "bg-neutral-800"
                  }`}
              >
                <Italic className="h-4 w-4" />
              </button>
              <button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                disabled={!editor.can().chain().focus().toggleStrike().run()}
                className={`px-2 py-2 rounded ${editor.isActive("strike")
                  ? "bg-neutral-700"
                  : "bg-neutral-800"
                  }`}
              >
                <Strikethrough className="h-4 w-4" />
              </button>
              <button
                onClick={() => editor.chain().focus().toggleCode().run()}
                disabled={!editor.can().chain().focus().toggleCode().run()}
                className={`px-2 py-2 rounded ${editor.isActive("code") ? "bg-neutral-700" : "bg-neutral-800"
                  }`}
              >
                <Code className="h-4 w-4" />
              </button>
              {/* <button
                onClick={() => editor.chain().focus().setParagraph().run()}
                className={`px-2 py-2 rounded ${
                  editor.isActive("paragraph")
                    ? "bg-neutral-700"
                    : "bg-neutral-800"
                }`}
              >
                P
              </button> */}
              <select
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "paragraph") {
                    editor.chain().focus().setParagraph().run();
                  } else {
                    editor.chain().focus().toggleHeading({ level: parseInt(value) }).run();
                  }
                }}
                className="px-2 py-1 rounded bg-neutral-800 text-white"
                value={editor.isActive('heading') ? editor.getAttributes('heading').level : editor.isActive('paragraph') ? 'paragraph' : ''}
              >
                <option value="" disabled>{editor.isActive('heading') ? editor.getAttributes('heading').level : 'P'}</option>
                <option value="paragraph">P</option>
                {Array.from({ length: 6 }, (_, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`px-2 py-2 rounded ${editor.isActive("bulletList")
                  ? "bg-neutral-700"
                  : "bg-neutral-800"
                  }`}
              >
                <Dot className="h-4 w-4" />
              </button>
              <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`px-2 py-2 rounded ${editor.isActive("orderedList")
                  ? "bg-neutral-700"
                  : "bg-neutral-800"
                  }`}
              >
                <List className="h-4 w-4" />
              </button>
              <button
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                className={`px-2 py-2 rounded ${editor.isActive("codeBlock")
                  ? "bg-neutral-700"
                  : "bg-neutral-800"
                  }`}
              >
                <Code2 className="h-4 w-4" />
              </button>
              <button
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={`px-2 py-2 rounded ${editor.isActive("blockquote")
                  ? "bg-neutral-700"
                  : "bg-neutral-800"
                  }`}
              >
                <Quote className="h-4 w-4" />
              </button>
              <button
                onClick={() => editor.chain().focus().setHorizontalRule().run()}
                className="px-2 py-2 rounded bg-neutral-800"
              >
                <AlignHorizontalDistributeEnd className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
        {!allowedAccess && (
          <div className="flex items-center justify-center">
            <div className="inline-flex gap-2 bg-neutral-800/50 border border-red-800/40 px-2 py-1 rounded-md">
              <ShieldClose /> You don't have permission to edit this note
            </div>
          </div>
        )}
      </div>
      <div
        className={`${size} transition-all duration-75 border px-4 pt-2 pb-4 mt-2 sm:rounded-xl rounded-t-3xl w-full sm:w-[60vw] h-[calc(100vh-6.3rem)] bg-gradient-to-b from-neutral-900 to-neutral-950 overflow-hidden`}
        onKeyDown={() => {
          handleKeyPress();
        }}
      >
        {fetchingNote ? (
          <div className="flex items-center justify-center w-full h-full rounded-xl bg-neutral-901 transition-opacity duration-1000 opacity-30">
            <div className="flex flex-col items-center justify-center">
              <Loader2 className="h-10 w-10 animate-spin" />
              <div className="mt-2 text-xs">Loading...</div>
            </div>
          </div>
        ) : (
          <div className="transition-opacity duration-500 opacity-100 max-w-full text-wrap break-words overflow-y-auto">
            <input
              type="text"
              className="text-neutral-200 h-15 w-full mb-5 text-4xl font-extralight border-b-2 border-neutral-800 focus:outline-none bg-inherit overflow-ellipsis"
              placeholder="Title"
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
            />
            <EditorContent
              editor={editor}
              aria-autocomplete="inline"
              className="w-full text-wrap break-words text-neutral-300 h-[calc(100vh-200px)] overflow-y-auto"
            />
            <BubbleMenu
              editor={editor}
              className=" p-1 backdrop-blur-xl border bg-neutral-800/20 border-neutral-700/50 rounded-xl"
            >
              <div className="flex flex-wrap items-center justify-center gap-2">
                <button
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  disabled={!editor.can().chain().focus().toggleBold().run()}
                  className={`px-3 py-2 rounded-md ${editor.isActive("bold") ? "opacity-100" : "opacity-50"
                    }`}
                >
                  <Bold className="h-5 w-4 text-white" />
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  disabled={!editor.can().chain().focus().toggleItalic().run()}
                  className={`px-3 py-2 rounded-md ${editor.isActive("italic") ? " opacity-100" : " opacity-50"
                    }`}
                >
                  <Italic className="h-5 w-4 text-white" />
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleStrike().run()}
                  disabled={!editor.can().chain().focus().toggleStrike().run()}
                  className={`px-3 py-2 rounded-md ${editor.isActive("strike") ? "opacity-100" : "opacity-50"
                    }`}
                >
                  <Strikethrough className="h-5 w-4 text-white" />
                </button>
                <button
                  onClick={() =>
                    editor.chain().focus().toggleOrderedList().run()
                  }
                  className={`px-3 py-2 rounded-md ${editor.isActive("orderedList")
                    ? "opacity-100"
                    : "opacity-50"
                    }`}
                >
                  <List className="h-5 w-4 text-white" />
                </button>
              </div>
            </BubbleMenu>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditorPage;

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
];


// const content = `
// <h2 class="text-2xl">
//   Hi there,
// </h2>
// <p>
//   this is a <em>basic</em> example of <strong>Tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
// </p>
// <ul>
//   <li>
//     That’s a bullet list with one …
//   </li>
//   <li>
//     … or two list items.
//   </li>
// </ul>
// <p>
//   Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
// </p>
// <pre><code class="language-css">body {
//   display: none;
// }</code></pre>
// <p>
//   I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
// </p>
// <blockquote>
//   Wow, that’s amazing. Good work, boy! 👏
//   <br />
//   — Mom
// </blockquote>
// `;
