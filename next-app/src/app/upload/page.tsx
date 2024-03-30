'use client';
import Link from 'next/link';
// Import React and React Dropzone
import React from 'react';
import { useDropzone,   } from 'react-dropzone';


const FileUploadComponent: React.FC = () => {
  const {getRootProps, getInputProps, acceptedFiles} = useDropzone();

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    // Implement the file upload logic here.
    // This is a placeholder for the upload logic.
    console.log('Submitting files:', acceptedFiles);

    // After submission, you might want to clear the selected files
    // setFiles([]);
  };

  return (
         <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
    
      <h1 className='p-4'>Files Upload</h1>
      <div {...getRootProps({className: 'dropzone'})} style={{ border: '2px dashed #007bff', padding: '20px', cursor: 'pointer' }}>
        <input {...getInputProps()} />
        <p>{"Drag 'n' drop some files here, or click to select files"}</p>
      </div>
      <ul className='p-4'>
        {acceptedFiles.map((file, index) => (
          <li key={index}>{file.name}</li>
        ))}
      </ul>
      <button className="bg-white hover:bg-slate-200 text-slate-700 font-bold py-2 p-4 border-blue-500 rounded "onClick={handleSubmit}>Submit/Upload Files</button>
    </div>
    <Link href="/chat" > Back to Chat</Link>
    </main>
  );
};

export default FileUploadComponent;
