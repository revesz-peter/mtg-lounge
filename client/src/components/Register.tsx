import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import lounge from "../../public/mtg-lounge-logo.png";

interface RegisterProps {
    handleRegister: (username: string, password: string) => void;
    closeDialog: () => void;
}

const Register: React.FC<RegisterProps> = ({ handleRegister, closeDialog }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
            <div className="bg-white rounded-lg shadow-xl p-8 w-1/3 mx-auto border-gray-300 transform scale-90 hover:scale-100 transition-transform duration-300">
                <div className="flex justify-center items-center border-b pb-4">
                    <h3 className="text-3xl font-bold text-gray-700 mx-2">
                        Register to
                    </h3>
                    <img
                        src={lounge}
                        className="h-10 sm:h-14 lg:h-20 xl:h-28 ml-2"
                    />
                </div>
                <div className="pt-2 mb-6">
                    <TextField
                        label="Username"
                        variant="outlined"
                        autoComplete="off"
                        fullWidth
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                "&:hover": {
                                    "& > fieldset": {
                                        borderColor: "#262018",
                                        borderWidth: "2px",
                                    },
                                },
                                "&.Mui-focused": {
                                    "& > fieldset": {
                                        borderColor: "#262018",
                                        borderWidth: "2px",
                                    },
                                },
                            },
                            input: { color: "#262018" },
                        }}
                        InputLabelProps={{
                            style: { color: "#262018" },
                        }}
                    />
                </div>
                <div className="mb-8">
                    <TextField
                        label="Password"
                        variant="outlined"
                        autoComplete="off"
                        type={showPassword ? "text" : "password"}
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {showPassword ? (
                                            <VisibilityOff />
                                        ) : (
                                            <Visibility />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                "&:hover": {
                                    "& > fieldset": {
                                        borderColor: "#262018",
                                        borderWidth: "2px",
                                    },
                                },
                                "&.Mui-focused": {
                                    "& > fieldset": {
                                        borderColor: "#262018",
                                        borderWidth: "2px",
                                    },
                                },
                            },
                            input: { color: "#262018" },
                        }}
                        InputLabelProps={{
                            style: { color: "#262018" },
                        }}
                    />
                </div>
                <div className="grid gap-4">
                    <button
                        className="text-2xl bg-amber-600 hover:bg-amber-400 text-white py-2 px-6 rounded-lg shadow transition-colors duration-200"
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
