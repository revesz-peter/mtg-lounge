import React from "react";
import lounge from "../../public/mtg-lounge-logo.png";

interface LoginRequiredProps {
    isDialogOpen: boolean;
    setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setIsLoginDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setIsRegisterDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginRequired: React.FC<LoginRequiredProps> = ({
    isDialogOpen,
    setIsDialogOpen,
    setIsLoginDialogOpen,
    setIsRegisterDialogOpen,
}) => {
    if (!isDialogOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
            <div className="bg-white rounded-lg shadow-xl p-8 max-w-xl mx-auto border-gray-300 transform scale-90 hover:scale-100 transition-transform duration-300">
                <div className="flex justify-center items-center border-b pb-4">
                    <img
                        src={lounge}
                        className="h-16 sm:h-18 lg:h-20 xl:h-24"
                    />
                </div>
                <p className="text-gray-600 text-lg mt-2 mb-8 text-center">
                    You can log in to save your decks <br /> and manage
                    previously built ones.
                </p>
                <div className="grid gap-4">
                    <button
                        className="text-2xl  bg-amber-500 hover:bg-amber-400 text-white py-2 px-6 rounded-lg shadow transition-colors duration-200"
                        onClick={() => setIsLoginDialogOpen(true)}
                    >
                        Log in
                    </button>
                    <button
                        className="text-2xl  bg-amber-600 hover:bg-amber-400 text-white py-2 px-6 rounded-lg shadow transition-colors duration-200"
                        onClick={() => setIsRegisterDialogOpen(true)}
                    >
                        Register
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
};

export default LoginRequired;
