import React from 'react'
import ReactImagePickerEditor, { ImagePickerConf } from 'react-image-picker-editor';
import 'react-image-picker-editor/dist/index.css'

export const ImagePicker=({imageUrl, handleImageChange })=>{
  
    const config = {
        borderRadius: '0',
        language: 'en',
        width: '150px',
        height: '200px',
        objectFit: 'cover',
        compressInitial: null,
        hideDeleteBtn: false,
        hideDownloadBtn: true,
        hideEditBtn: true,
        hideAddBtn: true,
    };
     
    return(
        < ReactImagePickerEditor
            config={config}
            imageSrcProp={imageUrl}
            imageChanged={handleImageChange} 
            
        />
    )
}