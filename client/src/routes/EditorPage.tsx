import { Color } from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import '../editorStyles.css';

const EditorPage = () => {
    // const { editor } = useCurrentEditor();
    const editor = useEditor({
        extensions,
        content,
        autofocus: true,
    });

    if (!editor) {
        return null;
    }

    return (
        <div className="flex flex-col gap-2 mb-4 w-full h-screen bg-neutral-950">
            < div className="button-group flex flex-wrap gap-2" >
                <button

                    onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={!editor.can().chain().focus().toggleBold().run()}
                    className={`px-2 py-1 rounded ${editor.isActive('bold') ? 'bg-neutral-700' : 'bg-neutral-800'}`}
                >
                    Bold
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    disabled={!editor.can().chain().focus().toggleItalic().run()}
                    className={`px-2 py-1 rounded ${editor.isActive('italic') ? 'bg-neutral-700' : 'bg-neutral-800'}`}
                >
                    Italic
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    disabled={!editor.can().chain().focus().toggleStrike().run()}
                    className={`px-2 py-1 rounded ${editor.isActive('strike') ? 'bg-neutral-700' : 'bg-neutral-800'}`}
                >
                    Strike
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    disabled={!editor.can().chain().focus().toggleCode().run()}
                    className={`px-2 py-1 rounded ${editor.isActive('code') ? 'bg-neutral-700' : 'bg-neutral-800'}`}
                >
                    Code
                </button>
                <button onClick={() => editor.chain().focus().unsetAllMarks().run()} className="px-2 py-1 rounded bg-neutral-800">
                    Clear marks
                </button>
                <button onClick={() => editor.chain().focus().clearNodes().run()} className="px-2 py-1 rounded bg-neutral-800">
                    Clear nodes
                </button>
                <button
                    onClick={() => editor.chain().focus().setParagraph().run()}
                    className={`px-2 py-1 rounded ${editor.isActive('paragraph') ? 'bg-neutral-700' : 'bg-neutral-800'}`}
                >
                    Paragraph
                </button>
                {
                    Array.from({ length: 6 }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => editor.chain().focus().toggleHeading({ level: i + 1 }).run()}
                            className={`px-2 py-1 rounded ${editor.isActive('heading', { level: i + 1 }) ? 'bg-neutral-700' : 'bg-neutral-800'}`}
                        >
                            H{i + 1}
                        </button>
                    ))
                }
                <button
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`px-2 py-1 rounded ${editor.isActive('bulletList') ? 'bg-neutral-700' : 'bg-neutral-800'}`}
                >
                    Bullet list
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={`px-2 py-1 rounded ${editor.isActive('orderedList') ? 'bg-neutral-700' : 'bg-neutral-800'}`}
                >
                    Ordered list
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    className={`px-2 py-1 rounded ${editor.isActive('codeBlock') ? 'bg-neutral-700' : 'bg-neutral-800'}`}
                >
                    Code block
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={`px-2 py-1 rounded ${editor.isActive('blockquote') ? 'bg-neutral-700' : 'bg-neutral-800'}`}
                >
                    Blockquote
                </button>
                <button onClick={() => editor.chain().focus().setHorizontalRule().run()} className="px-2 py-1 rounded bg-neutral-800">
                    Horizontal rule
                </button>
                <button onClick={() => editor.chain().focus().setHardBreak().run()} className="px-2 py-1 rounded bg-neutral-800">
                    Hard break
                </button>
                <button
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().chain().focus().undo().run()}
                    className="px-2 py-1 rounded bg-neutral-800"
                >
                    Undo
                </button>
                <button
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().chain().focus().redo().run()}
                    className="px-2 py-1 rounded bg-neutral-800"
                >
                    Redo
                </button>
                <button
                    onClick={() => editor.chain().focus().setColor('#958DF1').run()}
                    className={`px-2 py-1 rounded ${editor.isActive('textStyle', { color: '#958DF1' }) ? 'bg-neutral-700' : 'bg-neutral-800'}`}
                >
                    Purple
                </button>
            </div >
            <div>
                <EditorContent editor={editor} />
            </div>
        </div >
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

const content = `
<h2 class="text-2xl">
  Hi there,
</h2>
<p>
  this is a <em>basic</em> example of <strong>Tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
</p>
<ul>
  <li>
    That’s a bullet list with one …
  </li>
  <li>
    … or two list items.
  </li>
</ul>
<p>
  Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
</p>
<pre><code class="language-css">body {
  display: none;
}</code></pre>
<p>
  I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
</p>
<blockquote>
  Wow, that’s amazing. Good work, boy! 👏
  <br />
  — Mom
</blockquote>
`;

// export default () => {
//     return (
//         <div className='flex flex-col'>
//             <MenuBar />
//             {/* <EditorProvider slotBefore={<MenuBar />} extensions={extensions} content={content} autofocus /> */}
//             <EditorContent editor={editor} />
//         </div>
//     );
// };
