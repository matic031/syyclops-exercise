import React from "react";
import { HiMenu } from "react-icons/hi";

function Header({ toggleMenu, isMenuOpen }) {
    return (
        <header className="bg-[var(--blue-dark)] text-white h-36 flex items-center px-8 fixed top-0 left-0 right-0 z-50 border-b border-[var(--orange-dark)]">
            <div className="w-full flex justify-between items-center space-x-8 pl-4 md:pl-16">
                <img
                    src={`${process.env.PUBLIC_URL}/logo.svg`}
                    alt="Logo"
                    className="h-6 min-w-[10rem]"
                />
                <div className="hidden md:flex space-x-4">
                    <button className="border w-40 h-14 text-xl flex items-center justify-center border-[var(--orange-dark)] bg-[var(--blue-dark)] rounded-xl">
                        Contact Us
                    </button>
                    <button className="border w-40 h-14 text-xl flex items-center justify-center border-[var(--orange-dark)] bg-[var(--blue-dark)] rounded-xl">
                        Login
                    </button>
                </div>

                <div className="md:hidden">
                    <HiMenu className="text-3xl cursor-pointer" onClick={toggleMenu} />
                </div>
            </div>

            {isMenuOpen && (
                <div className="md:hidden absolute top-36 right-8 bg-[var(--blue-dark)] text-white rounded-lg shadow-lg p-4 space-y-2">
                    <button className="border w-40 h-14 text-xl flex items-center justify-center border-[var(--orange-dark)] bg-[var(--blue-dark)] rounded-xl">
                        Contact Us
                    </button>
                    <button className="border w-40 h-14 text-xl flex items-center justify-center border-[var(--orange-dark)] bg-[var(--blue-dark)] rounded-xl">
                        Login
                    </button>
                </div>
            )}
        </header>
    );
}

export default Header;
