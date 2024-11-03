import React, { useEffect, useState } from "react";
import { HiX } from "react-icons/hi";
import { searchUsers, fetchUserById } from "../services/userService";

function Sidebar({ onUserSelect, closeSidebar, isFullScreen, users }) {
    const [filteredUsers, setFilteredUsers] = useState(users);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        setFilteredUsers(users);
    }, [users]);

    const handleSearch = async (e) => {
        const query = e.target.value;
        setSearchTerm(query);

        if (query.trim() === "") {
            setFilteredUsers(users);
        } else {
            try {
                const searchResults = await searchUsers(query);
                setFilteredUsers(searchResults);
            } catch (error) {
                console.error("Error fetching search results:", error);
                setFilteredUsers([]);
            }
        }
    };

    const handleUserClick = async (user) => {
        try {
            const userData = await fetchUserById(user.id);
            onUserSelect(userData);
            if (isFullScreen) {
                closeSidebar();
            }
        } catch (error) {
            console.error("Failed to fetch user data", error);
        }
    };

    return (
        <div
            className={`bg-[var(--blue-light)] p-4 text-white ${isFullScreen ? "fixed inset-0 z-30" : "h-[calc(100vh-4rem)] w-64"} overflow-y-auto`}
            style={{ scrollbarGutter: "stable" }}
        >
            {isFullScreen && (
                <HiX className="text-4xl cursor-pointer absolute top-40 right-4 z-40 md:top-4 md:right-4" onClick={closeSidebar} />
            )}
            <div className="flex flex-col mt-36 w-56 md:mt-20 md:w-full border border-[var(--orange-dark)] rounded-lg p-2">
                <h2 className="text-xl font-semibold">Users</h2>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder="Filter users (id or name)"
                    className={`mt-2 p-2 rounded bg-white text-black ${isFullScreen ? "w-50" : "w-20 md:w-full"}`}
                />
            </div>
            <ul className="space-y-2 mt-4">
                {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                        <li
                            key={user.id}
                            className="cursor-pointer hover:bg-[var(--orange-dark)] py-2 px-1 rounded"
                            onClick={() => handleUserClick(user)}
                        >
                            {user.id}. {user.firstName} {user.lastName}
                        </li>
                    ))
                ) : (
                    <li className="text-gray-300">No users found</li>
                )}
            </ul>
        </div>
    );
}

export default Sidebar;
