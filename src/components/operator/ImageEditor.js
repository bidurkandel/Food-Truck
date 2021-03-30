import React, { useState, useRef } from 'react';
import AvatarEditor from 'react-avatar-editor'

function ImageEditor(params) {
    const [file, setFile] = useState('')
    const [fileURL, setFileURL] = useState('https://images.unsplash.com/photo-1573490647695-2892d0bf89e7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=799&q=80')
    const [buttonDisabled, setButtonDisabled] = useState(true)
    const [pictureScale, setPictureScale] = useState(1)
    const editorRef = useRef(null)

    const handleChange = (e) => {
        setFile(e.target.files[0])
    }

    const handleSave = (e) => {
        const canvas = editorRef.current.getImageScaledToCanvas()
        setFileURL(canvas.toDataURL())
    }

    const handleScaleChange = (e) => {
        setPictureScale(1 + (e.target.value/10))
    }

    return (
        <>
            <input type="file" accept=".jpg,.png,.jpeg" onChange={handleChange}/>
            <AvatarEditor
                ref={editorRef}
                image={file}
                width={500}
                height={250}
                border={100}
                color={[255, 155, 100, 0.6]} // RGBA
                scale={pictureScale}
                rotate={0}
            />
            <input type="range" value={(pictureScale - 1)* 10} min="1" max="10" onChange={handleScaleChange}/>
            <button onClick={handleSave}>save</button>
            <img alt="asd" src={fileURL} />
        </>
    )
}

export default ImageEditor