// Login.tsx

import React, { useState } from "react";

interface LoginProps {
    handleLogin: (username: string, password: string) => void;
    closeDialog: () => void;
}

const Login: React.FC<LoginProps> = ({ handleLogin, closeDialog }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
            <div className="bg-white rounded-lg shadow-xl p-8 w-1/2 mx-auto border-gray-300 transform scale-90 hover:scale-100 transition-transform duration-300">
                <h3 className="text-3xl font-bold text-gray-700 mb-4 text-center border-b pb-4">
                    Login
                </h3>
                <div className="mb-6">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="username"
                    >
                        Username
                    </label>
                    <input
                        className="bg-white border-2 border-gray-300 text-gray-900 rounded-lg block w-full p-3"
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
                        className="bg-white border-2 border-gray-300 text-gray-900 rounded-lg block w-full p-3"
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
                        className="text-2xl bg-blue-500 hover:bg-blue-400 text-white py-2 px-6 rounded-lg shadow transition-colors duration-200"
                        onClick={() => {
                            handleLogin(username, password);
                        }}
                    >
                        Log in
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

export default Login;
