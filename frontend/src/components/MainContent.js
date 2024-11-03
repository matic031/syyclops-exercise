import React from "react";
import { HiMenu } from "react-icons/hi";

function MainContent({ user, toggleSidebar }) {
    return (
        <div className="flex-1 p-6">
            <button
                className="md:hidden bg-[var(--orange-light)] text-white px-4 py-2 mb-4 rounded flex items-center"
                onClick={toggleSidebar}
            >
                <HiMenu className="text-2xl cursor-pointer" />
            </button>
            <p className="text-2xl">{user ? `Details for ${user}` : "Select a user from the sidebar"}</p>
        </div>
    );
}

export default MainContent;
