import React from "react";
import Input from "components/HTML/Input";
import { IoCloudUploadOutline } from "react-icons/io5";

interface FileInputProps {
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
}

const FileInput: React.FC<FileInputProps> = ({ onChange }) => {
  return (
    <div className="flex items-center justify-center w-full">
      <label className="flexCenter flex-col w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50">
        <div className="flexCenter flex-col pt-5 pb-6">
          <IoCloudUploadOutline className="size-8 text-gray-500" />
          <p className="mb-2 text-sm text-gray-500">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-xs text-gray-500">
            SVG, PNG, JPG or AVIF (MAX. 800x400px)
          </p>
        </div>
        <Input
          id="images"
          type="file"
          accept="images/*"
          multiple
          className="hidden"
          onChange={onChange}
        />
      </label>
    </div>
  );
};

export default FileInput;
