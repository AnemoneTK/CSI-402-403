"use client";
import React from "react";

interface TextInputProps {
  label: string;
  id: string;
  defaultValue?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const TextInput: React.FC<TextInputProps> = ({
  label,
  id,
  defaultValue,
  onChange,
}) => {
  return (
    <div className="mb-4 w-100">
      <label
        htmlFor="lastName"
        className="block text-sm font-medium text-gray-700"
      >
        {label}:
      </label>
      <input
        type="text"
        id={id}
        name={id}
        placeholder={label}
        // required
        defaultValue={defaultValue || ""}
        onChange={onChange}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 text-black rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      />
    </div>
  );
};

export default TextInput;
