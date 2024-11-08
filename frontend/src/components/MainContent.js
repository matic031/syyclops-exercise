import React from "react";
import { HiMenu } from "react-icons/hi";
import UserDetailsForm from "./UserDetailsForm";

function MainContent({ user, toggleSidebar, onSave }) {
    return (
        <div className="flex-1 p-6 mt-20">
            <button
                className="md:hidden bg-[var(--orange-light)] text-white px-4 py-2 mb-4 rounded flex items-center"
                onClick={toggleSidebar}
            >
                <HiMenu className="text-2xl cursor-pointer" />
            </button>
            {user ? (
                <UserDetailsForm userData={user} onSave={onSave} />
            ) : (
                <p className="text-2xl">Select a user from the sidebar</p>
            )}
        </div>
    );
}

export default MainContent;
