import { UserButton, useUser } from '@clerk/clerk-react'
import { dark } from '@clerk/themes';
import { ChevronRightIcon, Cross, Delete, Link, LucideDelete, MoreHorizontal, View, X } from 'lucide-react';
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { DropdownMenu, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { DropdownMenuContent, DropdownMenuLabel } from '@radix-ui/react-dropdown-menu';

const Sidebar = ({ children }) => {
    const { user } = useUser();
    return (
        <div className='flex flex-col gap-2 py-4 px-2 bg-neutral-900 border-r-2'>
            <div className='flex gap-2 pl-1 pr-2 py-2 mb-3 bg-neutral-800 w-60 rounded-xl'>
                <div className='pl-3 pr-1 flex items-center justify-center'>
                    <UserButton appearance={{ baseTheme: dark, elements: { userButtonAvatarBox: 'w-8 h-8' } }} />
                </div>
                <div className='flex flex-col justify-center items-center'>
                    <p className='text-gray-400 text-xs'>Standard account</p>
                    <p className='text-white text-sm'>{user?.fullName}</p>
                </div>
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}

export const SidebarGroup: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => {
    return (
        <>
            <div className='flex flex-col gap-1'>
                <div className='text-neutral-400 font-semibold text-[12px] px-2 pt-5'>
                    {title}
                </div>
                <div>
                    {children}
                </div>
            </div>
        </>
    )
}

//object of notes

const notes = [
    {
        title: 'note title 1',
    },
    {
        title: 'note title 2',
    }
]

export const SidebarItem: React.FC<{ icon: any, text: string, link: string, isNote: boolean }> = ({ icon, text, link, isNote }) => {
    const [isHovered, setIsHovered] = useState(false);
    if (!icon || !text || !link) {
        return <p>Enter all props</p>
    }
    return (
        <div
            className='flex justify-between gap-1 hover:bg-neutral-800 rounded-md py-1 px-2 transition-all duration-200 ease-in-out'
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <NavLink
                to={link}
                className={({ isActive }) => isActive ? 'bg-neutral-800' : ''}
                style={{ flex: 1 }}
            >
                <div className='flex items-center'>
                    <div className='flex items-center justify-center mr-1 overflow-hidden' style={{ width: '24px', height: '24px' }}>
                        <div className={`absolute transition-opacity duration-200 mr-2 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
                            {icon}
                        </div>
                        <div className={`absolute transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                            <ChevronRightIcon size={16} color='gray' />
                        </div>
                    </div>
                    <div className='font-inter text-neutral-400 text-[15px] antialiased'>
                        {text}
                    </div>
                </div>
            </NavLink>
            {isNote && (
                <DropdownMenu>
                    <DropdownMenuTrigger className={`flex items-center justify-center pr-1 transition-opacity duration-200 overflow-hidden ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                        <div className='hover:bg-neutral-700 p-[2px] rounded-md border border-transparent hover:border-neutral-600' >
                            <MoreHorizontal size={16} color='gray' />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='absolute w-56 backdrop-blur-md bg-neutral-600/30 rounded-md border'>
                        <button
                            className='flex w-full justify-between gap-1 hover:bg-neutral-800 py-1 px-2 transition-all duration-200 ease-in-out'>
                            <div className='flex items-center'>
                                <div className='flex items-center justify-center mr-1 overflow-hidden' style={{ width: '24px', height: '24px' }}>
                                    <div className={`flex items-center jusfity-center absolute transition-opacity duration-200 mr-2`}>
                                        <X size={18} color='gray' />
                                    </div>
                                </div>
                                <div className='font-inter text-neutral-400 text-[15px] antialiased'>
                                    Delete
                                </div>
                            </div>
                        </button>
                        <button
                            className='flex w-full justify-between gap-1 hover:bg-neutral-800 py-1 px-2 transition-all duration-200 ease-in-out'>
                            <div className='flex items-center'>
                                <div className='flex items-center justify-center mr-1 overflow-hidden' style={{ width: '24px', height: '24px' }}>
                                    <div className={`flex items-center jusfity-center absolute transition-opacity duration-200 mr-2`}>
                                        <Link size={16} color='gray' />
                                    </div>
                                </div>
                                <div className='font-inter text-neutral-400 text-[15px] antialiased'>
                                    Copy link
                                </div>
                            </div>
                        </button>
                        <DropdownMenuSeparator />
                        <button
                            className='flex w-full justify-between gap-1 hover:bg-neutral-800 py-1 px-2 transition-all duration-200 ease-in-out'>
                            <div className='flex items-center'>
                                <div className='flex items-center justify-center mr-1 overflow-hidden' style={{ width: '24px', height: '24px' }}>
                                    <div className={`flex items-center jusfity-center absolute transition-opacity duration-200 mr-2`}>
                                        <View size={16} color='gray' />
                                    </div>
                                </div>
                                <div className='font-inter text-neutral-400 text-[15px] antialiased'>
                                    View details
                                </div>
                            </div>
                        </button>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        </div>
    )
}

export default Sidebar