import React from "react";

function Landing() {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            <div className="bg-gray-800/80 rounded-xl shadow-xl p-8 flex flex-col items-center max-w-lg w-full">
                <h1 className="text-4xl font-bold text-white mb-4 text-center">
                    Welcome to Vaidik's Website!
                </h1>
                <p className="text-lg text-gray-300 mb-8 text-center">
                    Discover a curated set of DSA (Data Structures & Algorithms) questions.<br />
                    Click below to start practicing and sharpen your skills!
                </p>
                <button
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold shadow transition-all duration-150"
                    onClick={() => window.location.href = "/questions"}
                >
                    Continue
                </button>
            </div>
        </div>
    );
}

export default Landing;
