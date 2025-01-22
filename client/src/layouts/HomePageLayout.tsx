import { useAuth, useUser } from "@clerk/clerk-react";
import React, { createContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar, { SidebarGroup, SidebarItem } from "../components/Sidebar";
import {
  ChevronRight,
  HelpCircle,
  HelpingHand,
  LucidePackageMinus,
  MenuIcon,
  Notebook,
  NotebookPen,
  NotebookTabs,
  NotebookText,
  NotepadText,
  Search,
  Settings2,
  StickyNote,
} from "lucide-react";
import AIPanel from "../components/AIPanel";
import axios from "axios";
import { Skeleton } from "../components/ui/skeleton";
import { api } from "../services/axios";
import { Menu } from "@mui/joy";

const sidebarOpenContext = createContext({
  sidebarOpen: false,
  setSidebarOpen: (value: boolean) => { }
});

const HomePageLayout = () => {
  const { isSignedIn, signOut } = useAuth();
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const [notes, setNotes] = useState<{ title: string, content: string, date: string, id: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      navigate("/sign-in");
    }
  }, [isLoaded, isSignedIn]);

  // if (!isLoaded) {
  //   return <div>Loading...</div>;
  // }

  const fetchAllNotes = async () => {
    try {
      const notesData = await api.get('/api/note', {
        headers: {
          Authorization: `Bearer ${await getToken()}`
        }
      })
      setNotes(notesData.data.notes);
      console.log("notesData.data from sidebar: ", notesData.data);
      setLoading(false);
    } catch (error) {
      console.log("Error while fetching all notes: ", error);
    }
  }

  useEffect(() => {
    fetchAllNotes();
  }, []);


  return (
    <>
      <div className="flex">
        <div className={`fixed z-20 left-0 top-0 h-full w-60 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-out`}>
          <Sidebar>
            <SidebarItem
              icon={<Search color="grey" size={17} />}
              link="/"
              text="Search"
              isNote={false}
            />
            <SidebarGroup title="Notes" containsNotes={true}>
              {loading ? (
                <div className="flex-col">
                  <Skeleton className="rounded-md h-[30px] mb-1" />
                  <Skeleton className="rounded-md h-[30px] my-1" />
                  <Skeleton className="rounded-md h-[30px] mt-1" />
                </div>
              ) : (notes.map((note, index) => (
                <SidebarItem
                  key={index}
                  icon={<NotebookPen color="grey" size={16} />}
                  link={`/app/note/${note.id}`}
                  id={note.id}
                  text={note.title}
                  isNote={true}
                  notes={notes}
                  fetchAllNotes={fetchAllNotes}
                />
              )))}
            </SidebarGroup>
            <SidebarGroup title="Settings">
              <SidebarItem
                icon={<Settings2 color="gray" size={17} />}
                link="/settings"
                text="Settings"
                isNote={false}
              />
              <SidebarItem
                icon={<HelpCircle color="gray" size={17} />}
                link="/help"
                text="Help"
                isNote={false}
              />
            </SidebarGroup>
          </Sidebar>
        </div>
        <button className="fixed z-20 top-[24px] border-2 sm:hidden left-4 bg-neutral-800/20 backdrop-blur-md p-1 rounded-xl"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {/* <ChevronRight size={30} /> */}
          <MenuIcon size={25} />
        </button>
        <div className={`flex-1 overflow-y-auto bg-neutral-950 transition-transform duration-300 ease-out ${sidebarOpen ? "translate-x-60" : ""}`}>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default HomePageLayout;
