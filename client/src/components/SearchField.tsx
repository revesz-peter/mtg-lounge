import React, { ChangeEvent } from "react";

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
            <div className="flex items-center gap-2 mb-2"></div>
            <input
                type={type}
                id={name}
                name={name}
                placeholder={placeholder}
                value={value}
                autoComplete="off"
                onChange={handleChange}
                required
                className="bg-white border-2 border-gray-300 text-gray-900 rounded-lg block w-full p-3 outline-amber-500"
            />
        </div>
    );
};

export default Searchfield;
