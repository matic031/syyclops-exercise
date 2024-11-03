import React from "react";
import { HiX } from "react-icons/hi";

function Sidebar({ onUserSelect, closeSidebar, isFullScreen }) {
    const handleUserClick = (user) => onUserSelect(user);

    return (
        <div className={`bg-[var(--blue-light)] p-4 text-white min-h-screen ${isFullScreen ? "w-full fixed z-30" : "w-56"}`}>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Users</h2>
                {isFullScreen && (
                    <HiX className="text-4xl cursor-pointer md:hidden" onClick={closeSidebar} />
                )}
            </div>
            <ul className="space-y-2">
                <li className="cursor-pointer hover:bg-[var(--orange-dark)] p-2 rounded" onClick={() => handleUserClick("User 1")}>
                    User 1
                </li>
                <li className="cursor-pointer hover:bg-[var(--orange-dark)] p-2 rounded" onClick={() => handleUserClick("User 2")}>
                    User 2
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;
