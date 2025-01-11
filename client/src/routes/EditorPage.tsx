import { Color } from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import { BubbleMenu, EditorContent, FloatingMenu, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import '../editorStyles.css';
import { Toggle } from '@radix-ui/react-toggle';
import { AlignHorizontalDistributeEnd, Bold, Code, Code2, Dot, Fullscreen, Heading, Italic, List, Quote, Redo, Strikethrough as Strike, Strikethrough, Undo } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';


const EditorPage = () => {
    const [size, setSize] = useState("");
    const [hoverTools, setHoverTools] = useState(false);
    const { id } = useParams();
    const editor = useEditor({
        extensions,
        content: id,
        autofocus: true,
    });

    useEffect(() => {
        if (editor) {
            editor.commands.setContent(id);
        }
    }, [id, editor]);

    if (!editor) {
        return null;
    }

    const handleKeyPress = () => {
        setSize("m-[1px]");

        setTimeout(() => {
            setSize("");
        }, 100);
    }

    return (
        <div className="relative flex flex-col gap-2 ml-[36px] w-full h-screen" >
            < div className="rounded-xl mt-4" >
                <div className='absolute top-0 left-1/2 transform -translate-x-1/2 w-3/5 h-[40px]' onMouseEnter={() => { setHoverTools(true) }} onMouseLeave={() => { setHoverTools(false) }}></div>
                <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 ${hoverTools ? '-translate-y-[0px]' : '-translate-y-[80px]'} flex-wrap items-center justify-center gap-1 p-3 transition-all duration-300`} onMouseEnter={() => { setHoverTools(true) }} onMouseLeave={() => { setHoverTools(false) }}>
                    <div className='flex gap-1'>
                        <button
                            onClick={() => editor.chain().focus().toggleBold().run()}
                            disabled={!editor.can().chain().focus().toggleBold().run()}
                            className={`px-5 py-5 rounded-full backdrop-blur-sm ${editor.isActive('bold') ? 'bg-neutral-700/20' : 'bg-neutral-800/20 '} backdrop-blur-sm`} style={{ boxShadow: '0px 0px 20px 7px rgba(0,0,0,0.4)' }}
                        >
                            <Bold className='h-4 w-4' />
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleItalic().run()}
                            disabled={!editor.can().chain().focus().toggleItalic().run()}
                            className={`px-5 py-5 rounded-full backdrop-blur-sm ${editor.isActive('italic') ? 'bg-neutral-700/20' : 'bg-neutral-800/20 '} backdrop-blur-sm`} style={{ boxShadow: '0px 0px 20px 7px rgba(0,0,0,0.4)' }}
                        >
                            <Italic className='h-4 w-4' />
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleStrike().run()}
                            disabled={!editor.can().chain().focus().toggleStrike().run()}
                            className={`px-5 py-5 rounded-full backdrop-blur-sm ${editor.isActive('strike') ? 'bg-neutral-700/20' : 'bg-neutral-800/20 '} backdrop-blur-sm`} style={{ boxShadow: '0px 0px 20px 7px rgba(0,0,0,0.4)' }}
                        >
                            <Strikethrough className='h-4 w-4' />
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleCode().run()}
                            disabled={!editor.can().chain().focus().toggleCode().run()}
                            className={`px-5 py-5 rounded-full backdrop-blur-sm ${editor.isActive('code') ? 'bg-neutral-700/20' : 'bg-neutral-800/20 '} backdrop-blur-sm`} style={{ boxShadow: '0px 0px 20px 7px rgba(0,0,0,0.4)' }}
                        >
                            <Code className='h-4 w-4' />
                        </button>
                        {/* <button
                        onClick={() => editor.chain().focus().setParagraph().run()}
                        className={`px-5 py-5 rounded-full backdrop-blur-sm ${editor.isActive('paragraph') ? 'bg-neutral-700/20' : 'bg-neutral-800/20 '} backdrop-blur-sm`} style={{ boxShadow: '0px 0px 20px 7px rgba(0,0,0,0.4)' }}
                    >
                        P
                    </button> */}
                        {/* {
                        Array.from({ length: 6 }, (_, i) => (
                            <button
                                key={i}
                                onClick={() => editor.chain().focus().toggleHeading({ level: i + 1 }).run()}
                                className={`px-5 py-5 rounded-full backdrop-blur-sm ${editor.isActive('heading', { level: i + 1 }) ? 'bg-neutral-700/20' : 'bg-neutral-800/20 '} backdrop-blur-sm`} style={{ boxShadow: '0px 0px 20px 7px rgba(0,0,0,0.4)' }}
                            >
                                <div className='flex items-center justify-center'>
                                    H{i + 1}
                                </div>
                            </button>
                        ))
                    } */}
                        <button
                            onClick={() => editor.chain().focus().toggleBulletList().run()}
                            className={`px-5 py-5 rounded-full backdrop-blur-sm ${editor.isActive('bulletList') ? 'bg-neutral-700/20' : 'bg-neutral-800/20 '} backdrop-blur-sm`} style={{ boxShadow: '0px 0px 20px 7px rgba(0,0,0,0.4)' }}
                        >
                            <Dot className='h-4 w-4' />
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleOrderedList().run()}
                            className={`px-5 py-5 rounded-full backdrop-blur-sm ${editor.isActive('orderedList') ? 'bg-neutral-700/20' : 'bg-neutral-800/20 '} backdrop-blur-sm`} style={{ boxShadow: '0px 0px 20px 7px rgba(0,0,0,0.4)' }}
                        >
                            <List className='h-4 w-4' />
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                            className={`px-5 py-5 rounded-full backdrop-blur-sm ${editor.isActive('codeBlock') ? 'bg-neutral-700/20' : 'bg-neutral-800/20 '} backdrop-blur-sm`} style={{ boxShadow: '0px 0px 20px 7px rgba(0,0,0,0.4)' }}
                        >
                            <Code2 className='h-4 w-4' />
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleBlockquote().run()}
                            className={`px-5 py-5 rounded-full backdrop-blur-sm ${editor.isActive('blockquote') ? 'bg-neutral-700/20' : 'bg-neutral-800/20 '} backdrop-blur-sm`} style={{ boxShadow: '0px 0px 20px 7px rgba(0,0,0,0.4)' }}
                        >
                            <Quote className='h-4 w-4' />
                        </button>
                        <button onClick={() => editor.chain().focus().setHorizontalRule().run()} className="px-5 py-5 rounded-full backdrop-blur-sm bg-neutral-800/20" style={{ boxShadow: '0px 0px 20px 7px rgba(0,0,0,0.4)' }}>
                            <AlignHorizontalDistributeEnd className='h-4 w-4' />
                        </button>
                        <button
                            onClick={() => editor.chain().focus().undo().run()}
                            disabled={!editor.can().chain().focus().undo().run()}
                            className="px-5 py-5 rounded-full backdrop-blur-sm bg-neutral-800/20" style={{ boxShadow: '0px 0px 20px 7px rgba(0,0,0,0.4)' }}
                        >
                            <Undo className='h-4 w-4' />
                        </button>
                        <button
                            onClick={() => editor.chain().focus().redo().run()}
                            disabled={!editor.can().chain().focus().redo().run()}
                            className="px-5 py-5 rounded-full backdrop-blur-sm bg-neutral-800/20" style={{ boxShadow: '0px 0px 20px 7px rgba(0,0,0,0.4)' }}
                        >
                            <Redo className='h-4 w-4' />
                        </button>
                    </div>
                </div>
            </div >
            <div className={`${size} transition-all duration-500 border px-4 pt-2 pb-4 mt-2 rounded-xl min-h-[30vh] hover:min-h-[80vh] max-h-[80vh] overflow-y-scroll scrollbar-none bg-gradient-to-b from-neutral-900 to-neutral-950`} onKeyDown={() => { handleKeyPress() }}>
                <input type='text' className='h-14 w-full mb-5 text-4xl font-extralight border-b-2 border-neutral-800 bg-inherit' placeholder='Title' />
                <EditorContent editor={editor} aria-autocomplete='inline' className='w-full ml-2' />
                <BubbleMenu editor={editor} className='bg-neutral-800/40 p-1 backdrop-blur-sm rounded-xl'>
                    <div className='flex flex-wrap items-center justify-center gap-1'>
                        <Toggle
                            onClick={() => editor.chain().focus().toggleBold().run()}
                            disabled={!editor.can().chain().focus().toggleBold().run()}
                            className={`px-2 py-2 rounded-md backdrop-blur-sm ${editor.isActive('bold') ? 'bg-neutral-800/40 opacity-90' : 'bg-neutral-700/40 opacity-60'}`}
                        >
                            <Bold className='h-4 w-4 text-white' />
                        </Toggle>
                        <Toggle
                            onClick={() => editor.chain().focus().toggleItalic().run()}
                            disabled={!editor.can().chain().focus().toggleItalic().run()}
                            className={`px-2 py-2 rounded-md backdrop-blur-sm ${editor.isActive('italic') ? 'bg-neutral-800/40 opacity-90' : 'bg-neutral-700/40 opacity-60'}`}
                        >
                            <Italic className='h-4 w-4 text-white' />
                        </Toggle>
                        <Toggle
                            onClick={() => editor.chain().focus().toggleStrike().run()}
                            disabled={!editor.can().chain().focus().toggleStrike().run()}
                            className={`px-2 py-2 rounded-md backdrop-blur-sm ${editor.isActive('strike') ? 'bg-neutral-800/40 opacity-90' : 'bg-neutral-700/40 opacity-60'}`}>
                            <Strikethrough className='h-4 w-4 text-white' />
                        </Toggle>
                        <Toggle
                            onClick={() => editor.chain().focus().toggleOrderedList().run()}
                            className={`px-2 py-2 rounded-md backdrop-blur-sm ${editor.isActive('orderedList') ? 'bg-neutral-800/40 opacity-90' : 'bg-neutral-700/40 opacity-60'}`}
                        >
                            <List className='h-4 w-4 text-white' />
                        </Toggle>
                    </div>
                </BubbleMenu>
            </div>
        </div>
    );
};

export default EditorPage;

const extensions = [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle.configure({ types: [ListItem.name] }),
    StarterKit.configure({
        bulletList: {
            keepMarks: true,
            keepAttributes: false,
        },
        orderedList: {
            keepMarks: true,
            keepAttributes: false,
        },
    }),
];

// const content = `
// <h2 class="text-2xl">
//   Hi there,
// </h2>
// <p>
//   this is a <em>basic</em> example of <strong>Tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
// </p>
// <ul>
//   <li>
//     That’s a bullet list with one …
//   </li>
//   <li>
//     … or two list items.
//   </li>
// </ul>
// <p>
//   Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
// </p>
// <pre><code class="language-css">body {
//   display: none;
// }</code></pre>
// <p>
//   I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
// </p>
// <blockquote>
//   Wow, that’s amazing. Good work, boy! 👏
//   <br />
//   — Mom
// </blockquote>
// `;
