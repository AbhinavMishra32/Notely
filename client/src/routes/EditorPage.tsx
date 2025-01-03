import React from 'react'
import { useParams } from 'react-router-dom'

const EditorPage = () => {
    const { id } = useParams();
    return (
        <div>{id}</div>
    )
}

export default EditorPage