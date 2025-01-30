import { useAuth } from "@clerk/clerk-react";
import { ChevronLeft, ChevronRight, Loader, Loader2, MenuIcon, MenuSquare, Plus } from "lucide-react";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/axios";
import { useSidebar } from "../contexts/SidebarContext";
import {AnimatePresence, motion} from 'framer-motion';

export const SidebarOpenButton = () => {
  const { sidebarOpen, setSidebarOpen } = useSidebar();

  return (
    <button
      className="border-2 sm:hidden w-19 left-4 bg-neutral-800/20 backdrop-blur-md p-1 rounded-xl"
      onClick={() => setSidebarOpen(!sidebarOpen)}
    >
      {sidebarOpen ? <ChevronLeft size={25} /> : <ChevronRight size={25} />}
    </button>
  );
}


const Navbar = () => {

  const { getToken } = useAuth();
  const navigate = useNavigate();
  const [creatingNote, setCreatingNote] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);
  const [noteCreated, setNoteCreated] = useState(false);
  const [buttonProperties, setButtonProperties] = useState<{width: number, height: number, x: number, y: number}>({width: 0, height: 0, x: 0, y: 0});
  const [noteId, setNoteId] = useState<string | null>(null);

  const handleButtonSize = () => {
    if (buttonRef.current) {
      const { width, height, x, y } = buttonRef.current.getBoundingClientRect();
      setButtonProperties({width, height, x, y});
      console.log("Button Properties: ", buttonProperties);
    }
  }

  const createNote = async () => {
    handleButtonSize();
    setCreatingNote(true);
    try {
      const token = await getToken();
      const response = await api.post("/api/note", {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data);
      const noteId = response.data.noteId;
      setNoteId(noteId);
      // setCreatingNote(false);
      setNoteCreated(true); // this is used to trigger the animation that goes to full screen from the button. the code for that animation is commented
      if (noteId) {
        navigate(`/app/note/${noteId}`);
      } else {
        console.error("Note ID is undefined");
      }
      // for testing purposes
      // setTimeout(() => {
      //   setCreatingNote(false);
      //   setNoteCreated(true);
      // }, 1000);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="sticky z-30 top-0 pt-5 bg-gradient-to-b from-black to-transparent w-full flex justify-between items-start">
      <div className="flex gap-4 mb-6">
        <SidebarOpenButton />
        <h1 className="font-light text-4xl">Notes</h1>
      </div>
      <button onClick={createNote} disabled={creatingNote}>
        <motion.div ref={buttonRef} className="flex justify-center items-center gap-2 bg-neutral-900/40 hover:bg-neutral-800 hover:border-neutral-700 p-[10px] border-2 rounded-full backdrop-blur-sm overflow-hidden"
          initial={false}
          animate={{
            width: creatingNote ? 200 : 50,
            height: 50,
          }}
          transition={{
            duration: 0.5, ease: "easeOut", type: "spring", stiffness: 40, damping: 10
          }}
        >
          ) : (
            <Plus size={20} />
          )}
        </motion.div>
      </button>
      {/* this is the animation that goes to full screen from the button */}
      {/* {noteCreated && (
        <motion.div
          className="fixed inset-0 z-40 flex justify-center items-center gap-2 bg-neutral-900 p-[10px] border-2 backdrop-blur-sm overflow-hidden"
          initial={{ x: buttonProperties.x + buttonProperties.width / 2 - 150, y: buttonProperties.y + buttonProperties.height / 2 - 35, width: 200, height: 70, borderRadius: "50%", opacity: 50 }}
          animate={{ x: "50%", y: "50%", width: "110%", height: "110%", translateX: "-50%", translateY: "-50%", borderRadius: "0%" }}
          transition={{ duration: 0.3, type: "spring", stiffness: 40, damping: 10 }}
          onAnimationComplete={() => {
            navigate(`/app/note/${noteId}`);
            setNoteCreated(false);
          }}
        />
      )} */}
    </div>
  );
};

export default Navbar;