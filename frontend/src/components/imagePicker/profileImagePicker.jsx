import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

const ImagePicker = ({setBase64, user}) => {
  const [file, setFile] = useState(null);
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
    setFile(
        Object.assign(acceptedFiles[0], {
        preview: URL.createObjectURL(acceptedFiles[0])
        })
    );
    const reader = new FileReader();
    reader.readAsDataURL(acceptedFiles[0]);
    reader.onload = () => {
         setBase64(reader.result)
    };
    }
});

  return (
    <div {...getRootProps()} className='self-center' >
        <input {...getInputProps()} />
        {file ? (
            <img src={file.preview} 
            alt="preview" 
            className="h-64 w-56 object-contain" 
            />
        ) : (
            <img 
            src={`http://localhost:8000/images/${user?.profile_picture}`} 
            alt="default" 
            className="h-64 w-56 object-contain" />
        )}
    </div>
  );
};

export default ImagePicker;