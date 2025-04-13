import { useNavigate } from "react-router-dom";

function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="h-screen bg-[#1A2238] w-full flex flex-col justify-center items-center">
            <h1 className="text-9xl font-extrabold text-white tracking-widest">
                404
            </h1>
            <div className="bg-black text-white px-2 text-sm rounded rotate-12 absolute">Page not found...</div>
            <button 
                onClick={() => navigate(-1)} 
                className="mt-5 relative inline-block text-sm font-medium text-[#FF6A3D] focus:outline-none focus:ring"
            >
                <span className="relative block px-8 py-3 border border-current bg-[#1A2238]">
                    Go Back
                </span>
            </button>
        </div>
    );
}

export default NotFound;
