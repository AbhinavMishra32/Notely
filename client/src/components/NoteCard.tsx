import React from 'react'

interface NoteCardProps {
    data:{
        title: string,
        content: string,
        date: string
    }
}

const NoteCard: React.FC<NoteCardProps> = ({data}) => {
    return (
        <div className='flex flex-col bg-neutral-800 p-5 rounded-xl'>
                <p className='text-md text-neutral-200 mb-2'>{data.title}</p>
                {/* <div className={`h-[${data.content.length * 0.5}px] text-sm text-neutral-400 max-h-[300px] mb-3 overflow-hidden`}> */}
                <div className={`h-[${data.content.length}px]`}>
                        {data.content}
                </div>
                <p className='text-xs text-neutral-500 mt-auto self-end'>{data.date}</p>
    </div>
  )
}

export default NoteCard