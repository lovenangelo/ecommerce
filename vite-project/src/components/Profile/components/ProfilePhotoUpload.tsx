import { useState } from "react";

import { Button } from "@/components/ui/button";
import { DialogContent, DialogHeader } from "@/components/ui/dialog";
import Icons from "@/lib/icons";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axiosClient from "@/lib/axios";
import { useAppDispatch } from "@/redux/hooks";
import { removeUser, updateAvatar } from "@/redux/slices/userSlice";
import imageCompression from "browser-image-compression";
const options = {
  maxSizeMB: 1,
  maxWidthOrHeight: 1920,
  useWebWorker: true,
};
export default function PhotoUploadDialog() {
  const dispatch = useAppDispatch();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const imageFile = event.target.files && event.target.files[0];
    if (imageFile !== null) {
      try {
        const compressedFile = await imageCompression(imageFile, options);
        setSelectedFile(compressedFile);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const imageFile = event.dataTransfer.files && event.dataTransfer.files[0];
    if (imageFile !== null) {
      try {
        const compressedFile = await imageCompression(imageFile, options);
        setSelectedFile(compressedFile);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleUpload = async () => {
    setIsLoading(true);
    if (selectedFile !== null) {
      try {
        const res = await axiosClient.post(
          "/api/upload-avatar",
          { avatar: selectedFile },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        dispatch(updateAvatar(res.data));
      } catch (error) {
        console.log(error);
        dispatch(removeUser());
      }
    }
    setIsLoading(false);
  };

  return (
    <DialogContent className={cn("w-36 md:w-96 h-max")}>
      <div className="flex-col inset-0 flex items-center justify-center">
        <DialogHeader>
          <h2 className="text-xl font-bold mb-4">Change Profile Picture</h2>
        </DialogHeader>
        {selectedFile && (
          <div className="flex justify-center mb-6">
            <Avatar className="mt-4 w-20 h-20">
              <AvatarImage
                src={URL.createObjectURL(selectedFile)}
                className="object-cover"
              />
              <AvatarFallback className="font-semibold text-2xl">
                LA
              </AvatarFallback>
            </Avatar>
          </div>
        )}
        <div
          className={cn(
            "border-dashed border-2 border-gray-400 rounded-lg p-4 mb-4 text-center",
            isDraggingOver && selectedFile == null ? "bg-blue-200" : ""
          )}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onDragLeave={handleDragLeave}
        >
          <label
            htmlFor="file-upload"
            className="block mb-2 cursor-pointer text-blue-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 mx-auto mb-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm0 1a9 9 0 110-18 9 9 0 010 18zm0-8a2 2 0 100-4 2 2 0 000 4zm4-5a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
            Select a Photo
          </label>
          <input
            type="file"
            id="file-upload"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
          <p className="text-gray-400">or</p>
          <p className="text-gray-400">Drag and drop a photo here</p>
        </div>
        <p className="text-gray-600 mb-2">Allowed photo types: JPEG, PNG</p>
        <div className="flex justify-center mt-4">
          <Button
            onClick={() => {
              handleUpload();
            }}
            disabled={selectedFile == null || isLoading}
          >
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Upload
          </Button>
        </div>
      </div>
    </DialogContent>
  );
}
