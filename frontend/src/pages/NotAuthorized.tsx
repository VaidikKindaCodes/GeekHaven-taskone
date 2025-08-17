import { useNavigate } from "react-router-dom";

function NotAuthorized() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gray-100">
            <h1 className="text-3xl font-bold text-red-600 mb-4">
                403 - Not Authorized
            </h1>
            <p className="text-base text-gray-700 mb-6">
                You do not have permission to view this page.
            </p>
            <button
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                onClick={() => navigate("/sign-in")}
            >
                Go to Login
            </button>
        </div>
    );
}

export default NotAuthorized;
