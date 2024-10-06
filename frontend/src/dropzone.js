import { useDropzone } from "react-dropzone";
import React, { useState } from 'react';
import { Progress} from '@chakra-ui/react'
function Dropzone() {
  const [isLoading, setIsLoading] = useState(false);
  const onDrop = (acceptedFiles) => {
    // Create a FormData object to hold the files
    setIsLoading(true);
    const formData = new FormData();
    
    // Append each accepted file to the FormData object
    acceptedFiles.forEach(file => {
      formData.append('files', file); // Use 'files' to match the Flask backend
    });

    // Call the upload function
    uploadFiles(formData);
  };

  const uploadFiles = async (formData) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        // Show a success pop-up message
        alert(data.message);
      }
      console.log(data.message || data.error);
    } catch (error) {
      console.error('Error uploading files:', error);
    }
    setIsLoading(false);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple: true });

  return (
    <div {...getRootProps()} style={dropzoneStyle}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag and drop some files here, or click to select files</p>
      )}
      {isLoading && <Progress size='xs' isIndeterminate />}
    </div>
  );
}

const dropzoneStyle = {
  border: '2px dashed #cccccc',
  borderRadius: '5px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
  margin: '20px 0',
};

export default Dropzone;


