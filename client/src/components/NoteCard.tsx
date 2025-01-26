import React, { useRef, useState } from "react";
import {motion} from "framer-motion";
interface NoteCardProps {
  data: {
    title: string;
    content: string;
    date: string;
  };
  setGridBoxProperties: React.Dispatch<React.SetStateAction<{ width: number; height: number, x: number, y: number }>>;
}

const NoteCard: React.FC<NoteCardProps> = ({ data, setGridBoxProperties }) => {
  const [isHovered, setIsHovered] = useState(false);
  const parentRef = useRef<HTMLDivElement>(null);
  // const [size, setSize] = useState<{width: number, height: number}>({ width: 0, height: 0 });

  const handleParentSize = () => {
    if (parentRef.current) {
      const rect = parentRef.current.getBoundingClientRect();
      setGridBoxProperties({width: rect.width, height: rect.height, x: rect.x, y: rect.y});
    }
  }

  return (
    <motion.div
    initial = {{opacity: 0}}
    animate= {{opacity: 1}}
    transition={{duration: 0.5}}
    ref={parentRef}
    onClick={() => handleParentSize()}
      className="p-[1px] bg-gradient-to-tl from-neutral-800 to-neutral-600 rounded-xl hover:ring-1 hover:ring-neutral-700"
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
    </motion.div>
  );
};

export default NoteCard;
