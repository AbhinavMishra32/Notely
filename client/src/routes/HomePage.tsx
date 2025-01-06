import React from 'react'
import NoteCard from '../components/NoteCard'
import Masonry from "react-masonry-css";


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
    return (
        <div className="w-5/6 h-screen m-auto">
            <div className="p-8">
                <h1 className="font-light text-4xl mb-6">Notes</h1>

                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="flex -ml-6 w-auto"
                    columnClassName="pl-6 bg-clip-padding"
                >
                    {notesData.map((note, index) => (
                        <div key={index} className="mb-6">
                            <NoteCard data={note} />
                        </div>
                    ))}
                </Masonry>
            </div>
        </div>
    );
};

export default HomePage