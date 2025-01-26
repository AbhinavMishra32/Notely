import { UserButton, useUser } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";
import {AnimatePresence, motion} from 'framer-motion';
import {
  ChevronRightIcon,
  Cross,
  CrossIcon,
  Delete,
  Fullscreen,
  Link,
  LucideDelete,
  MoreHorizontal,
  View,
  X,
} from "lucide-react";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../components/ui/drawer";

import {
  DropdownMenuContent,
  DropdownMenuLabel,
} from "@radix-ui/react-dropdown-menu";
import { Autocomplete } from "@mui/joy";
import axios from "axios";
import { api } from "../services/axios";
import { useSidebar } from "../contexts/SidebarContext";

const Sidebar = ({ children }) => {
  const { user } = useUser();
  return (
    <div
      className="fixed top-0 left-0 h-screen w-60 py-4 px-2 bg-gradient-to-b from-neutral-900 to-neutral-950 border-r-2 z-50"
    >
      <div className="flex gap-2 pl-1 pr-2 py-2 mb-3 bg-neutral-800 rounded-xl">
        <div className="pl-3 pr-1 flex items-center justify-center">
          <UserButton
            appearance={{
              baseTheme: dark,
              elements: { userButtonAvatarBox: "w-8 h-8" },
            }}
          />
        </div>
        <div className="flex flex-col">
          <p className="text-gray-400 text-xs">Free account</p>
          <p className="text-white text-sm">{user?.username}</p>
        </div>
      </div>
      <div className="">
        {" "}
        {/* Ensure that the content scrolls if needed */}
        {children}
      </div>
    </div>
  );
};

export const SidebarGroup: React.FC<{
  title: string;
  containsNotes: boolean;
  children: React.ReactNode;
}> = ({ title, containsNotes, children }) => {
  return (
    <div className="flex flex-col gap-1 max-h-[70vh] max-w-full">
      <div className="text-neutral-400 font-semibold text-[12px] px-2 pt-5">
        {title}
      </div>
      <div className="overflow-y-auto sidebar-group">{children}</div>
    </div>
  );
};

export const SidebarItem: React.FC<{
  icon: any;
  text: string;
  link: string;
  isNote: boolean;
  id: string;
  notes: { title: string; content: string; date: string; id: string }[];
  fetchAllNotes: () => void;
}> = ({ icon, text, link, isNote, id, notes, fetchAllNotes }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const { sidebarOpen, setSidebarOpen } = useSidebar();
  const navigate = useNavigate();

  const deleteNote = async (noteId: string) => {
    try {
      const response = await api.delete(
        `/api/note/${noteId}`
      );
      console.log("response from deleteNote: ", response);
      setIsActive(false);
      setIsHovered(!isHovered);
      setSidebarOpen(!sidebarOpen);
      fetchAllNotes();
      navigate("/app/home");
    } catch (error) {
      console.log("Error while deleting note: ", error);
    }
  };

  return (
    <div
      className={`flex justify-between mb-[1px] hover:bg-neutral-800 ${isActive ? "bg-neutral-800" : ""
        } rounded-md py-1 px-2 transition-all duration-200 ease-in-out`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <NavLink
        to={link}
        // className={({ isActive }) => isActive ? 'bg-neutral-800 text-white' : 'text-neutral-400'}
        className={({ isActive }) => {
          setIsActive(isActive);
          return isActive ? "" : "";
        }}
        style={{ width: "100%", height: "100%" }}
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <div className="flex items-center">
          <div
            className="flex items-center justify-center mr-1 overflow-hidden flex-shrink-0"
            style={{ width: "24px", height: "24px" }}
          >
            {isNote ? (
              <>
                <div
                  className={`relative left-2 transition-opacity duration-200 mr-2 ${isHovered ? "opacity-0" : "opacity-100"
                    }`}
                >
                  {icon}
                </div>
                <div
                  className={`relative -left-[15px] transition-opacity duration-200 ${isHovered ? "opacity-100" : "opacity-0"
                    }`}
                >
                  <ChevronRightIcon size={16} color="gray" />
                </div>
              </>
            ) : (
              <>
                <div
                  className={`absolute transition-opacity duration-200 mr-2`}
                >
                  {icon}
                </div>
              </>
            )}
          </div>
          <div className="font-inter text-neutral-400 text-[15px] antialiased overflow-ellipsis whitespace-nowrap overflow-hidden flex-grow">
            {text}
          </div>
        </div>
      </NavLink>
      {isNote && ( window.innerWidth > 640 ? (
        <DropdownMenu>
          <DropdownMenuTrigger
            className={`flex items-center justify-center pr-1 transition-opacity duration-200 ${window.innerWidth < 640 ? "opacity-100" : isHovered ? "opacity-100" : "opacity-0"
              }`}
          >
            <div className="relative">
              <div className={`absolute -right-1 bottom-1/2 translate-y-1/2 ${window.innerWidth <= 640 ? "" : "hover:bg-neutral-700 bg-neutral-800 hover:border-neutral-600"} p-[2px] rounded-md border border-transparent shadow-2xl`}>
                <MoreHorizontal size={16} color="gray" />
              </div>
            </div>
          </DropdownMenuTrigger>

            <DropdownMenuContent
              className="relative left-24 -top-5 z-50 w-56 backdrop-blur-md bg-neutral-700/30 rounded-xl border border-neutral-700/60"
              style={{ boxShadow: "0px 0px 30px 7px rgba(0,0,0,0.6)" }}
              asChild
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.4, x: -10, y: -10 }}
                animate={{ opacity: 1, scale: 1, x: 0, y: 0, originX: 0, originY: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1, type: "spring", stiffness: 160, damping: 15 }}
              >
                <button
                  className="flex w-full justify-between gap-1 hover:bg-neutral-800/50 hover:ring-[1px] hover:ring-neutral-700/80 rounded-xl py-1 px-2 transition-all duration-300 ease-in-out"
                  onClick={() => deleteNote(id)}
                >
                  <div className="flex items-center">
                    <div
                      className="flex items-center justify-center mr-1 overflow-hidden"
                      style={{ width: "24px", height: "24px" }}
                    >
                      <div
                        className={`flex items-center jusfity-center absolute transition-opacity duration-200 mr-2`}
                      >
                        <X size={18} color="gray" />
                      </div>
                    </div>
                    <div className="font-inter text-neutral-400 text-[15px] antialiased">
                      Delete
                    </div>
                  </div>
                </button>
                <button className="flex w-full justify-between gap-1 hover:bg-neutral-700/50 hover:ring-[1px] hover:ring-neutral-700/80 rounded-xl py-1 px-2 transition-all duration-300 ease-in-out">
                  <div className="flex items-center">
                    <div
                      className="flex items-center justify-center mr-1 overflow-hidden"
                      style={{ width: "24px", height: "24px" }}
                    >
                      <div
                        className={`flex items-center jusfity-center absolute transition-opacity duration-200 mr-2`}
                      >
                        <Link size={16} color="gray" />
                      </div>
                    </div>
                    <div className="font-inter text-neutral-400 text-[15px] antialiased">
                      Copy link
                    </div>
                  </div>
                </button>
                <div className="px-1">
                  <DropdownMenuSeparator className="bg-neutral-700/40" />
                </div>
                <button className="flex w-full justify-between gap-1 hover:bg-neutral-700/50 hover:ring-[1px] hover:ring-neutral-700/80 rounded-xl py-1 px-2 transition-all duration-300 ease-in-out">
                  <div className="flex items-center">
                    <div
                      className="flex items-center justify-center mr-1 overflow-hidden"
                      style={{ width: "24px", height: "24px" }}
                    >
                      <div
                        className={`flex items-center jusfity-center absolute transition-opacity duration-200 mr-2`}
                      >
                        <View size={16} color="gray" />
                      </div>
                    </div>
                    <div className="font-inter text-neutral-400 text-[15px] antialiased">
                      View details
                    </div>
                  </div>
                </button>
              </motion.div>
            </DropdownMenuContent>
          </DropdownMenu>) : (
          <Drawer>
            <DrawerTrigger>
              <div className={`flex items-center justify-center pr-1 transition-opacity duration-200 ${window.innerWidth < 640 ? "opacity-100" : isHovered ? "opacity-100" : "opacity-0"
                }`}>
                <div className="relative">
                  <div className={`absolute -right-1 bottom-1/2 translate-y-1/2 ${window.innerWidth <= 640 ? "" : "hover:bg-neutral-700 bg-neutral-800 hover:border-neutral-600"} p-[2px] rounded-md border border-transparent shadow-2xl`}>
                    <MoreHorizontal size={16} color="gray" />
                  </div>
                </div>
              </div>
            </DrawerTrigger>
            <DrawerContent className="rounded-t-3xl">
              <DrawerHeader>
                <DrawerTitle>
                  {text}
                </DrawerTitle>
                <DrawerDescription>
                  Choose an action
                </DrawerDescription>
                <div className="mt-3 flex flex-col gap-3 w-full h-[20vh]">
                  <div className="w-full h-[45px] rounded-md bg-neutral-900 border-[1px] border-neutral-800">
                    <DrawerClose className="w-full h-full">
                      <button
                        className="w-full h-full flex items-center justify-center gap-2 hover:bg-neutral-800/50 rounded-md"
                        onClick={() => deleteNote(id)}
                      >
                        <X size={24} />
                        <div className="text-[15px] font-inter">
                          Delete Note
                        </div>
                      </button>
                    </DrawerClose>
                  </div>
                  <div className="w-full h-[45px] rounded-md bg-neutral-900 border-[1px] border-neutral-800">
                    <DrawerClose className="w-full h-full">
                      <button className="w-full h-full flex items-center justify-center gap-2 rounded-md"
                        onClick={() => navigator.clipboard.writeText("https://dbnotes.abhinavmishra.in" + link)}
                      >
                        <Link size={20} />
                        <div className="text-[15px] font-inter">
                          Copy Link
                        </div>
                      </button>
                    </DrawerClose>
                  </div>
                </div>
              </DrawerHeader>
            </DrawerContent>
          </Drawer>
        )
        )}
      </div>
    );
  };

export default Sidebar;
