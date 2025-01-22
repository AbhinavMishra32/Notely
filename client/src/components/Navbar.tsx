import { useAuth } from "@clerk/clerk-react";
import { ChevronLeft, ChevronRight, MenuIcon, MenuSquare, Plus } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/axios";
import { useSidebar } from "../contexts/SidebarContext";

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


  const saveNote = async () => {
    try {
      const token = await getToken();
      const response = await api.post("/api/note", {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data);
      const noteId = response.data.noteId;
      if (noteId) {
        navigate(`/app/note/${noteId}`);
      } else {
        console.error("Note ID is undefined");
      }
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
      <button onClick={saveNote}>
        <div className="flex justify-center items-center gap-2 bg-neutral-900/40 hover:bg-neutral-800 p-[10px] border-2 rounded-full backdrop-blur-sm">
          <Plus size={20} />
        </div>
      </button>
    </div>
  );
};

export default Navbar;