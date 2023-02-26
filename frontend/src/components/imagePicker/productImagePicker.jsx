import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

const ImagePicker = ({setProductProps, productProps}) => {
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
        setProductProps({...productProps, base64: reader.result})
      };
    }
  });

  return (
    <div {...getRootProps()} className='self-center' >
      <input {...getInputProps()} />
      {file ? (
        <img src={file.preview} alt="preview" className="h-64" />
      ) : (
        <img 
        src={`http://localhost:8000/images/${productProps.defaultImage}`} 
        alt="default" 
        className="h-64" />
      )}
    </div>
  );
};

export default ImagePicker;
