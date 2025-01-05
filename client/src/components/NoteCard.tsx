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
    <div className='bg-neutral-800 p-5 rounded-xl'>
        <p>{data.title}</p>
        <div className={`h-[${data.content.length * 0.3}px] overflow-hidden`}>
            {data.content}
        </div>
        {/* <div className='h-[300px]'>eeeeee</div> */}
        <p className='text-sm text-neutral-400'>{data.date}</p>
    </div>
  )
}

export default NoteCard