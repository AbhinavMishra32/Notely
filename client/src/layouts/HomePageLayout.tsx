import { useAuth, useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar, { SidebarGroup, SidebarItem } from "../components/Sidebar";
import {
  HelpCircle,
  HelpingHand,
  NotebookText,
  Search,
  Settings2,
} from "lucide-react";
import AIPanel from "../components/AIPanel";
import axios from "axios";
import { Skeleton } from "../components/ui/skeleton";

const HomePageLayout = () => {
  const { isSignedIn, signOut } = useAuth();
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const [notes, setNotes] = useState<{ title: string, content: string, date: string, id: string }[]>([]);
  const [loading, setLoading] = useState(true);

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
      const notesData = await axios.get('http://localhost:3000/api/note', {
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
        <div className="sticky z-20 left-0 top-0 h-screen w-60">
          <Sidebar>
            <SidebarItem
              icon={<Search color="grey" size={17} />}
              link="/"
              text="Search"
              isNote={false}
            />
            <SidebarGroup title="Notes">
              {loading ? (
                <div className="flex-col">
                  <Skeleton className="rounded-md h-[30px] mb-1" />
                  <Skeleton className="rounded-md h-[30px] my-1" />
                  <Skeleton className="rounded-md h-[30px] mt-1" />
                </div>
              ) : (notes.map((note, index) => (
                <SidebarItem
                  key={index}
                  icon={<NotebookText color="grey" size={17} />}
                  link={`/app/note/${note.id}`}
                  id={note.id}
                  text={note.title}
                  isNote={true} />
              )))}
            </SidebarGroup>
            {/* <SidebarItem
                icon={<NotebookText color="grey" size={17} />}
                link="/app/note/note-title-1-2qg3jl23gasdf"
                text="note title 1"
                isNote={true}
              />
              <SidebarItem
                icon={<NotebookText color="grey" size={17} />}
                link="/app/note/helo-asem3wlk2fj2f23"
                text="helo"
                isNote={true}
              />
              <SidebarItem
                icon={<NotebookText color="grey" size={17} />}
                link="/app/note/nice-note-asdfavbwmklvm32lk23k5"
                text="nice note"
                isNote={true}
              />
            </SidebarGroup> */}

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
        <div className="flex-1 overflow-y-auto scrollbar-none bg-neutral-950">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default HomePageLayout;
