import React, { useState } from "react";
import lounge from "../../public/mtg-lounge-logo.png";

interface RegisterProps {
    handleRegister: (username: string, password: string) => void;
    closeDialog: () => void;
}

const Register: React.FC<RegisterProps> = ({ handleRegister, closeDialog }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
            <div className="bg-white rounded-lg shadow-xl p-8 w-1/2 mx-auto border-gray-300 transform scale-90 hover:scale-100 transition-transform duration-300">
                <div className="flex justify-center items-center border-b pb-4">
                    <h3 className="text-3xl font-bold text-gray-700 mx-2">
                        Register to
                    </h3>
                    <img src={lounge} className="h-10 sm:h-14 lg:h-20 xl:h-28 ml-2" />
                </div>
                <div className="pt-2 mb-6">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="username"
                    >
                        Username
                    </label>
                    <input
                        className="bg-white border-2 border-gray-300 text-gray-900 rounded-lg block w-full p-3 outline-amber-500"
                        id="username"
                        type="text"
                        placeholder="Username"
                        autoComplete="off"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="mb-8">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="password"
                    >
                        Password
                    </label>
                    <input
                        className="bg-white border-2 border-gray-300 text-gray-900 rounded-lg block w-full p-3 outline-amber-500"
                        id="password"
                        type="password"
                        autoComplete="off"
                        placeholder="******************"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="grid gap-4">
                    <button
                        className="text-2xl bg-amber-500 hover:bg-amber-400 text-white py-2 px-6 rounded-lg shadow transition-colors duration-200"
                        onClick={() => {
                            handleRegister(username, password);
                        }}
                    >
                        Register
                    </button>
                    <button
                        className="text-2xl bg-gray-400 hover:bg-gray-300 text-white py-2 px-6 rounded-lg shadow transition-colors duration-200"
                        onClick={closeDialog}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Register;
