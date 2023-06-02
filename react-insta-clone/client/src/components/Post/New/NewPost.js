import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import camera from "../../../images/camera.png"
import icon from "../../../images/icon.png"
import { Link } from 'react-router-dom';
const NewPost = () => {
  const [files, setFiles] = useState(() => {
    const storedFiles = localStorage.getItem('uploadedFiles');
    return storedFiles ? JSON.parse(storedFiles) : [];
  });

  const [formData, setFormData] = useState(() => {
    const storedData = localStorage.getItem('formData');
    return storedData
      ? JSON.parse(storedData)
      : { name: '', location: '', description: '' };
  });

  const onDrop = (acceptedFiles) => {
    setFiles([...files, ...acceptedFiles]);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleDelete = (index) => {
    setFiles((prevFiles) => {
      const updatedFiles = [...prevFiles];
      updatedFiles.splice(index, 1);
      return updatedFiles;
    });
  };

  const handleAddPost = () => {
    const newPost = {
      file: null,
      name: formData.name,
      location: formData.location,
      description: formData.description,
    };
    setFiles([...files, newPost]);
  };

  useEffect(() => {
    localStorage.setItem('uploadedFiles', JSON.stringify(files));
  }, [files]);

  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div>
      <nav className="flex justify-between m-9">
        <div className="flex">
          <img
            src={icon}
            alt="icon"
            className="w-[50px] h-[50px] rounded-[50%]"
          />
          <h3 className="text-green-600 text-3xl">Instagram Clone</h3>
        </div>
        <Link to="/postview/newform">
          <img
            src={camera}
            alt="camera"
            className="w-[40px] h-[50px] object-cover cursor-pointer"
          />
        </Link>
      </nav>
      <hr className="bg-black" />

      <div className="max-w-md mx-auto mt-3 border border-gray-500 p-4 rounded-lg">
        <div
          {...getRootProps({ className: 'dropzone' })}
          className="border border-black rounded-md p-2 mb-1"
        >
          <input {...getInputProps()} />
          <p>Drag and drop files here, or click to select files</p>
        </div>
        <div className="mb-4">
          <input
            className="w-full border border-gray-300 rounded px-3 py-2"
            type="text"
            name="name"
            value={formData.name}
            placeholder="enter name"
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <input
            className="w-full border border-gray-300 rounded px-3 py-2"
            type="text"
            placeholder="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <textarea
            className="w-full border border-gray-300 rounded px-3 py-2"
            type="text"
            id="emailInput"
            placeholder="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={handleAddPost}
        >
          Post
        </button>
      </div>
      <div className="file-preview flex justify-center flex-col-reverse ml-[460px]">
        {files.map((file, index) => {
          if (file.type && file.type.startsWith('image/')) {
            return (
              <div key={index} className="preview-item w-[300px] mb-4">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`File ${index}`}
                  className="preview-image rounded-lg"
                />
                <div className="preview-details p-4 bg-white rounded-lg">
                  <p className="font-bold">Name: {formData.name}</p>
                  <p>Location: {formData.location}</p>
                  <p>Description: {formData.description}</p>
                  <button
                    onClick={() => handleDelete(index)}
                    className="bg-green-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-4"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            );
          } else {
            return (
              <div key={index} className="preview-item">
                <p>Unsupported file type: {file.name}</p>
                <div className="preview-details">
                  <p>Name: {formData.name}</p>
                  <p>Location: {formData.location}</p>
                  <p>Description: {formData.description}</p>
                  <button
                    onClick={() => handleDelete(index)}
                    className="bg-green-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-4"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default NewPost;
