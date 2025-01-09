import React, { useEffect, useRef, useState } from 'react'
import NoteCard from '../components/NoteCard'
import Masonry from "react-masonry-css";
import AIBar from '../components/AIBar';
import { AnimatePresence, motion } from 'framer-motion';
import { Edit, Edit2, Edit3, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';


const notesData = [
    {
        title: 'Note Title 1',
        content: 'Note Content 1',
        date: 'Jan 17'
    },
    {
        title: 'Note Title 2',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc in odio et felis eleifend eleifend. Interdum et malesuada fames ac ante ipsum primis in faucibus. Praesent rhoncus nibh vel bibendum hendrerit. Phasellus suscipit urna eget nisl maximus, ut suscipit sapien euismod. Nulla ullamcorper facilisis lacus, fermentum accumsan sem egestas ac. Fusce nec ex vehicula, porta ligula in, auctor odio. Maecenas et accumsan nunc. Vivamus lacinia arcu sit amet leo accumsan, a condimentum est egestas. Vestibulum ut enim commodo, sodales mauris a, mattis est. Cras dapibus tristique est et vehicula.',
        date: 'Jan 18'
    },
    {
        title: 'Note Title 3',
        content: 'Note Content 3',
        date: 'Jan 19'
    },
    {
        title: 'Note Title 4',
        content: 'Note Content 4',
        date: 'Jan 20'
    },
    {
        title: 'Note Title 5',
        content: 'Note Content 5',
        date: 'Jan 21'
    },
    {
        title: 'Note Title 6',
        content: 'Note Content 6',
        date: 'Jan 22'
    },
    {
        title: 'Note Title 7',
        content: 'Note Content 7',
        date: 'Jan 23'
    },
    {
        title: 'Note Title 8',
        content: 'Note Content 8',
        date: 'Jan 24'
    },
    {
        title: 'Note Title 9',
        content: 'Note Content 9',
        date: 'Jan 25'
    },
    {
        title: 'Note Title 10',
        content: 'Note Content 10',
        date: 'Jan 26'
    },
    {
        title: 'Note Title 11',
        content: 'loram ipsum dolor sit amet, consectetur adipiscing elit. Nunc in odio et felis eleifend eleif end. Interdum et malesuada fames ac ante ipsum primis in faucibus. Praesent rhoncus nibh vel bibendum hendrerit. Phasellus suscipit urna eget nisl maximus, ut suscipit sapien euismod. Nulla ullamcorper facilisis lacus, fermentum acc ',
        date: 'Jan 27'
    },
    {
        title: 'Note Title 12',
        content: 'Note Content 12',
        date: 'Jan 28'
    },
    {
        title: 'Note Title 13',
        content: 'Note Content 13',
        date: 'Jan 29'
    },
    {
        title: 'Note Title 14',
        content: 'Note Content 14',
        date: 'Jan 30'
    },
    {
        title: 'Note Title 15',
        content: 'Note Content 15',
        date: 'Jan 31'
    },
    {
        title: 'Note Title 16',
        content: 'Note Content 16',
        date: 'Feb 1'
    },
    {
        title: 'Note Title 17',
        content: 'Note Content 17',
        date: 'Feb 2'
    },
    {
        title: 'Note Title 18',
        content: 'Note Content 18',
        date: 'Mar 3',
    },
    {
        title: 'Note Title 19',
        content: 'Note Content 19',
        date: 'Mar 4'
    },
    {
        title: 'Note Title 20',
        content: 'Note Content 20',
        date: 'Mar 5'
    },
    {
        title: 'Note Title 10',
        content: 'Note Content 10',
        date: 'Jan 26'
    },
    {
        title: 'Note Title 1123 ',
        content: 'loram ipsum dolor sit amet, consectetur adipiscing elit. Nunc in odio et felis eleifend eleif end. Interdum et malesuada fames ac ante ipsum primis in faucibus. Praesent rhoncus nibh vel bibendum hendrerit. Phasellus suscipit urna eget nisl maximus, ut suscipit sapien euismod. Nulla ullamcorper facilisis lacus, fermentum acc Vc in odio et felis eleifend eleif end. Interdumc in odio et felis eleifend eleif end. Interdumc in odio et felis eleifend eleif end. Interdumc in odio et felis eleifend eleif end. Interdumc in odio et felis eleifend eleif end. Interdumc in odio et felis eleifend eleif end. Interdumc in odio et felis eleifend eleif end. Interdumc in odio et felis eleifend eleif end. Interdumc in odio et felis eleifend eleif end. Interdumc in odio et felis eleifend eleif end. Interdumc in odio et felis eleifend eleif end. Interdumc in odio et felis eleifend eleif end. Interdumc in odio et felis eleifend eleif end. Interdumc in odio et felis eleifend eleif end. Interdumc in odio et felis eleifend eleif end. Interdumc in odio et felis eleifend eleif end. Interdumc in odio et felis eleifend eleif end. Interdumc in odio et felis eleifend eleif end. Interdumc in odio et felis eleifend eleif end. Interdumc in odio et felis eleifend eleif end. Interdumc in odio et felis eleifend eleif end. Interdumc in odio et felis eleifend eleif end. Interdumc in odio et felis eleifend eleif end. Interdumc in odio et felis eleifend eleif end. Interdum',
        date: 'Jan 27'
    },
    {
        title: 'Note Title 12',
        content: 'Note Content 12',
        date: 'Jan 28'
    },
    {
        title: 'Note Title 13',
        content: 'Note Content 13',
        date: 'Jan 29'
    },
    {
        title: 'Note Title 14',
        content: 'Note Content 14',
        date: 'Jan 30'
    },
    {
        title: 'Note Title 15',
        content: 'Note Content 15',
        date: 'Jan 31'
    },
    {
        title: 'Note Title 16',
        content: 'Note Content 16',
        date: 'Feb 1'
    },
    {
        title: 'Note Title 17',
        content: 'Note Content 17',
        date: 'Feb 2'
    },
    {
        title: 'Note Title 18',
        content: 'Note Content 18',
        date: 'Mar 3',
    },
    {
        title: 'Note Title 19',
        content: 'Note Content 19',
        date: 'Mar 4'
    },
    {
        title: 'Note Title 20',
        content: 'Note Content 20',
        date: 'Mar 5'
    },
]

const breakpointColumnsObj = {
    default: 4,  // For large screens
    1400: 2,     // For medium screens
    700: 1,      // For small screens
};

const HomePage = () => {
    const parentRef = useRef(null);
    const [parentWidth, setParentWidth] = useState(0);
    const [selectedNote, setSelectedNote] = useState(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isHoveredIcon, setIsHoveredIcon] = useState<string | null>('');

    useEffect(() => {
        if (parentRef.current) {
            setParentWidth(parentRef.current.offsetWidth);  // Get parent container's width
        }
    }, []);

    return (
        <div className="relative w-5/6 h-screen m-auto">
            <div className="p-8">
                <h1 className="font-light text-4xl mb-6">Notes</h1>

                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="flex -ml-6 w-auto"
                    columnClassName="pl-6 bg-clip-padding"
                >
                    {notesData.map((note, index) => (
                        <div key={index} className="cursor-pointer mb-6" onClick={() => { setSelectedNote(note) }}>
                            <NoteCard data={note} />
                        </div>
                    ))}
                </Masonry>
            </div>

            {selectedNote && (
                <AnimatePresence>
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
                        <motion.div
                            initial={{ scale: 0.7, opacity: 0.4 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ duration: 0.5, type: 'spring' }}
                        >
                            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10" onClick={() => setSelectedNote(null)}></div>
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                                <div className='p-[1px] bg-gradient-to-tl from-neutral-800 to-neutral-600 rounded-xl'
                                    onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)}>
                                    <div className='flex flex-col bg-neutral-900 p-5 rounded-xl transition-colors duration:200 ease-in-out'>
                                        <p className='text-md text-neutral-200 mb-2'>{selectedNote.title}</p>
                                        <div className='w-[500px] h-full relative'>
                                            <div className={`text-[14px] text-neutral-300 mb-3`}>
                                                {selectedNote.content}
                                            </div>
                                        </div>
                                        <p className='text-xs text-neutral-500 mt-auto self-end'>{selectedNote.date}</p>
                                    </div>
                                </div>
                                <div className='absolute top-0 right-0 p-2'>
                                    <div className='flex gap-2 items-center justify-center m-2'>
                                        <Link to={`/app/note/${selectedNote.title}`} onMouseEnter={() => setIsHoveredIcon('edit')} onMouseLeave={() => setIsHoveredIcon(null)}><Edit size={19} color={`${isHoveredIcon === 'edit' ? 'white' : 'gray'}`} /></Link>
                                        <button className='' onClick={() => setSelectedNote(null)} onMouseEnter={() => setIsHoveredIcon('close')} onMouseLeave={() => setIsHoveredIcon(null)}><X size={22} color={`${isHoveredIcon === 'close' ? 'white' : 'gray'}`} /></button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div >
                </AnimatePresence>
            )}

            <AIBar parentWidth={parentWidth} />
        </div >
    );
};

export default HomePage