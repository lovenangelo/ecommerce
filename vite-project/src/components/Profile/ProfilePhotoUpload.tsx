import React, { useState } from "react";

const ProfilePhotoUpload = () => {
  const [selectedImage, setSelectedImage] = useState<
    string | ArrayBuffer | null
  >(null);

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    handleImageUpload(file);
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div
      className="photo-upload"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {selectedImage ? (
        <img
          src={typeof selectedImage === "string" ? selectedImage : ""}
          alt="Uploaded"
        />
      ) : (
        <div className="upload-placeholder">
          <p>Drag and drop an image here</p>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e.target.files![0])}
          />
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoUpload;
