import React from 'react'
import { useParams } from 'react-router-dom'
import { EditorProvider, FloatingMenu, BubbleMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

const extensions = [StarterKit]

const content = '<p>Hello World!</p>'

const EditorPage = () => {
    const { id } = useParams();
    return (
        <>
            <div>{id}</div>
            <EditorProvider extensions={extensions} content={content} >
                <FloatingMenu editor={null}>This is the floating menu</FloatingMenu>
                <BubbleMenu editor={null}>This is the bubble menu</BubbleMenu>
            </EditorProvider>
        </>
    )
}

export default EditorPage