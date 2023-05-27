import React, { ChangeEvent } from 'react';

interface SearchFieldProps {
  labelName: string;
  type: string;
  name: string;
  placeholder: string;
  value: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void; 
}

const Searchfield: React.FC<SearchFieldProps> = ({
  type,
  name,
  placeholder,
  value,
  handleChange, 
}) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
      </div>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange} 
        required
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-full p-3"
      />
    </div>
  );
};

export default Searchfield;
