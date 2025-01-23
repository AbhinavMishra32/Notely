import { useEffect, useRef, useState } from "react";
import NoteCard from "../components/NoteCard";
import Masonry from "react-masonry-css";
import AIBar from "../components/AIBar";
import { AnimatePresence, motion } from "framer-motion";
import { Edit, FilePlus2, Plus, X } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import { api } from "../services/axios";
import React from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import StarterKit from "@tiptap/starter-kit";

const breakpointColumnsObj = {
  default: 4, // For large screens
  1400: 2, // For medium screens
  700: 1, // For small screens
};

const HomePage = () => {
  const parentRef = useRef(null);
  const [parentWidth, setParentWidth] = useState(0);
  const [selectedNote, setSelectedNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredIcon, setIsHoveredIcon] = useState<string | null>("");
  const [notes, setNotes] = useState<
    { title: string; content: string; date: string }[]
  >([]);
  const [editorContent, setEditorContentState] = useState("");



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

  const Editor = useEditor({
    autofocus: true,
    extensions: extensions
  });

  const updateEditorContent = (content: string) => {
    Editor?.commands.setContent(content);
  }



  const [sidebarWidth, setSidebarWidth] = useState(64);

  const { getToken } = useAuth();

  useEffect(() => {
    if (parentRef.current) {
      setParentWidth(parentRef.current.offsetWidth); // Get parent container's width
      console.log("Parent width:", parentRef.current.offsetWidth);
    }
  }, []);

  const fetchAllNotes = async () => {
    try {
      const notesData = await api.get("/api/note", {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });
      // console.log(notesData.data);
      setNotes(notesData.data.notes);
      // console.log("notesData.data: ", notesData.data);
      setLoading(false);
    } catch (error) {
      console.log("Error while fetching all notes: ", error);
    }
  };

  useEffect(() => {
    fetchAllNotes();
  }, []);

  //

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 700) {
        setSidebarWidth(0);
      } else {
        setSidebarWidth(64);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="relative w-full h-screen m-auto">
      <div className="px-[20px] md:px-[40px] lg:px-[90px] pb-10">
        <Navbar />
        {notes.length === 0 ? (
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-y-hidden">
            <div className="bg-neutral-900 w-[250px] h-[250px] rounded-2xl border overflow-y-hidden">
              <div className="flex items-center justify-center h-full">
                <div className="flex flex-col gap-5 items-center justify-center">
                  <div className="w-[120px] h-[120px] bg-neutral-800 rounded-2xl border flex items-center justify-center">
                    <FilePlus2 size={50} color="grey" />
                  </div>
                  <p className="text-neutral-400 flex items-center justify-center">
                    Add a note by pressing
                    <div className="inline-flex justify-center items-center w-[30px] h-[30px] gap-2 bg-neutral-900 border-2 rounded-full backdrop-blur-sm ml-1">
                      <Plus size={14} />
                    </div>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="flex -ml-6 w-auto"
            columnClassName="pl-6 bg-clip-padding"
          >
            {loading ? (
              <div>Loading...</div>
            ) : (
              notes.map((note, index) => (
                <div
                  key={note.id}
                  className="cursor-pointer mb-6"
                  onClick={() => {
                    setSelectedNote(note);
                    updateEditorContent(note.content);
                  }}
                >
                  <NoteCard
                    data={{
                      title: note.title,
                      content: note.content,
                      date: new Date(note.createdAt).toDateString(),
                    }}
                  />
                </div>
              ))
            )}
          </Masonry>
        )}
      </div>


      {selectedNote && (
        <AnimatePresence>
          <div
            className={`fixed left-${sidebarWidth} inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm`}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0.4 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.5, type: "spring" }}
            >
              <div
                className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10"
                onClick={() => setSelectedNote(null)}
              ></div>
              <div className={`absolute flex-wrap break-words top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2 z-20 w-[90vw] max-w-[90vw] sm:max-w-[700px] sm:max-h-[90vh]
              ${window.innerWidth > 640 ? "left-[calc(50%+119px)]" : "left-1/2 top-1/2"
                }`}>
                <div
                  className="p-[1px] bg-gradient-to-tl from-neutral-800 to-neutral-600 rounded-xl"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <div className="flex flex-col bg-neutral-900 p-5 rounded-xl transition-colors duration:200 ease-in-out max-w-full h-auto max-h-[90vh] sm:max-h-[500px]">
                    <p className="sm:text-xl text-md text-neutral-100 mb-2 break-words">
                      {selectedNote.title}
                    </p>
                    <div className="w-full relative overflow-y-auto break-words max-h-full]">
                      {/* change the max-h-[60vh] to change the max height of the selectedCard thing, it will only change if changes from here */}
                      <div className="sm:text-md text-sm text-neutral-300 mb-3 max-h-[60vh]">
                        <EditorContent editor={Editor} contentEditable={false} className="w-full break-words pointer-events-none max-h-full" />
                      </div>
                    </div>
                    <p className="text-xs text-neutral-500 mt-auto self-end">
                      {selectedNote.date}
                    </p>
                  </div>
                </div>
                <div className="absolute top-0 right-0 p-2">
                  <div className="flex gap-2 items-center justify-center m-2">
                    <Link
                      to={`/app/note/${selectedNote.id}`}
                      onMouseEnter={() => setIsHoveredIcon("edit")}
                      onMouseLeave={() => setIsHoveredIcon(null)}
                    >
                      <Edit
                        size={19}
                        color={`${isHoveredIcon === "edit" ? "white" : "gray"}`}
                      />
                    </Link>
                    <button
                      className=""
                      onClick={() => setSelectedNote(null)}
                      onMouseEnter={() => setIsHoveredIcon("close")}
                      onMouseLeave={() => setIsHoveredIcon(null)}
                    >
                      <X
                        size={22}
                        color={`${isHoveredIcon === "close" ? "white" : "gray"}`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </AnimatePresence>
      )}

      <AIBar parentWidth={parentWidth} />
    </div>
  );
};

export default HomePage;
