import React, { useState } from "react";

interface NoteCardProps {
  data: {
    title: string;
    content: string;
    date: string;
  };
}

const NoteCard: React.FC<NoteCardProps> = ({ data }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className="p-[1px] bg-gradient-to-tl from-neutral-800 to-neutral-600 rounded-xl hover:ring-2 hover:ring-neutral-700"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col break-words bg-neutral-900 hover:bg-neutral-800 p-5 rounded-xl transition-colors duration-200 ease-in-out">
        <p className="text-md text-neutral-200 mb-2">{data.title}</p>
        <div className="max-h-[400px] overflow-hidden relative">
          <div
            className={`h-[${data.content.length}px] text-[14px] text-neutral-300 mb-3`}
          >
            <div dangerouslySetInnerHTML={{ __html: data.content }} />
          </div>
          <div
            className={`${data.content.length > 200 &&
              `absolute z-0 bottom-0 left-0 right-0 h-20 bg-gradient-to-t ${isHovered ? "from-inherit" : "from-neutral-900"
              } to-transparent transition-all duration-200 ease-in-out`
              } `}
          ></div>
        </div>
        <p className="text-xs text-neutral-500 mt-auto self-end">{data.date}</p>
      </div>
    </div>
  );
};

export default NoteCard;
