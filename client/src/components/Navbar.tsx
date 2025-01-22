import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { Plus } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

  const { getToken } = useAuth();
  const navigate = useNavigate();

  const saveNote = async () => {
    try {
      const token = await getToken();
      const response = await axios.post("http://localhost:3000/api/note", {}, {
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
    <div className="sticky z-10 top-0 pt-5 bg-gradient-to-b from-black to-transparent w-full flex justify-between items-start">
      <h1 className="font-light text-4xl mb-6">Notes</h1>
      <button onClick={saveNote}>
        <div className="flex justify-center items-center gap-2 bg-neutral-900/40 hover:bg-neutral-800 p-[10px] border-2 rounded-full backdrop-blur-sm">
          <Plus size={20} />
        </div>
      </button>
    </div>
  );
};

export default Navbar;