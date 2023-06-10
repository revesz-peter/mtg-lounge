import React from 'react';

interface LoginRequiredProps {
    isDialogOpen: boolean;
    setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setIsLoginDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginRequired: React.FC<LoginRequiredProps> = ({ isDialogOpen, setIsDialogOpen, setIsLoginDialogOpen }) => {
    if (!isDialogOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
            <div className="bg-white rounded-lg shadow-xl p-8 max-w-xl mx-auto border-gray-300 transform scale-90 hover:scale-100 transition-transform duration-300">
                <h3 className="text-3xl font-bold text-gray-700 mb-4 text-center border-b pb-4">
                    Login required
                </h3>
                <p className="text-gray-600 text-lg mb-8 text-center">
                    You need to log in to save your deck.
                </p>
                <div className="grid gap-4">
                    <button
                        className="text-2xl bg-blue-500 hover:bg-blue-400 text-white py-2 px-6 rounded-lg shadow transition-colors duration-200"
                        onClick={() => setIsLoginDialogOpen(true)}
                    >
                        Log in
                    </button>
                    <button
                        className="text-2xl bg-gray-400 hover:bg-gray-300 text-white py-2 px-6 rounded-lg shadow transition-colors duration-200"
                        onClick={() => setIsDialogOpen(false)}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LoginRequired;