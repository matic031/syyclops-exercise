import React, { useState, useEffect } from 'react';
import { HiPencilAlt, HiCheck, HiX } from 'react-icons/hi';
import { updateUser } from '../services/userService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UserDetailsForm({ userData, onSave }) {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ ...userData });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        handleCancelClick();
    }, [userData]);

    const handleEditClick = () => setIsEditing(true);

    const handleCancelClick = () => {
        setIsEditing(false);
        setFormData({ ...userData });
        setErrors({});
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.firstName.trim()) newErrors.firstName = "First name is required.";
        if (!formData.lastName.trim()) newErrors.lastName = "Last name is required.";
        if (!formData.age || formData.age <= 0) newErrors.age = "Age must be a positive number.";
        if (!["male", "female", "other"].includes(formData.gender.toLowerCase())) newErrors.gender = "Select a gender.";
        if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Enter a valid email address.";
        if (!/^[\d+ -]+$/.test(formData.phone)) newErrors.phone = "Phone can only contain numbers, +, and -.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSaveClick = async () => {
        if (validate()) {
            try {
                const updatedData = await updateUser(formData.id, formData);
                setIsEditing(false);
                onSave(updatedData);
                toast.success("User updated successfully!");
            } catch (error) {
                console.error("Error updating user:", error);
                toast.error("Failed to update user.");
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div className="p-4 border border-b border-[var(--orange-dark)] rounded-lg bg-white">
            <ToastContainer position="top-right" autoClose={4000} hideProgressBar />
            <h2 className="text-2xl">
                User Details for: <b>{userData.firstName} {userData.lastName}</b>
            </h2>

            <div className="space-y-2 mt-2">
                <div>
                    <label className="block text-gray-700 font-medium">ID</label>
                    <input
                        type="text"
                        value={formData.id}
                        disabled
                        className="w-48 p-2 border border-gray-300 rounded bg-gray-100"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium">First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-48 p-2 border border-gray-300 rounded"
                    />
                    {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
                </div>
                <div>
                    <label className="block text-gray-700 font-medium">Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-48 p-2 border border-gray-300 rounded"
                    />
                    {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
                </div>
                <div>
                    <label className="block text-gray-700 font-medium">Age</label>
                    <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-48 p-2 border border-gray-300 rounded"
                    />
                    {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
                </div>
                <div>
                    <label className="block text-gray-700 font-medium">Gender</label>
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-48 p-2 border border-gray-300 rounded bg-white"
                    >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                    {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
                </div>
                <div>
                    <label className="block text-gray-700 font-medium">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-48 p-2 border border-gray-300 rounded"
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>
                <div>
                    <label className="block text-gray-700 font-medium">Phone</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-48 p-2 border border-gray-300 rounded"
                    />
                    {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                </div>
                <div className="pt-7">
                    {!isEditing ? (
                        <button
                            onClick={handleEditClick}
                            className="border w-24 h-14 text-xl flex items-center justify-center border-[var(--orange-dark)] bg-[var(--orange-light)] text-white rounded-xl space-x-2"
                        >
                            <HiPencilAlt className="text-2xl" />
                            <span>Edit</span>
                        </button>
                    ) : (
                        <div className="flex space-x-4">
                            <button
                                onClick={handleSaveClick}
                                className="border w-28 h-14 text-xl flex items-center justify-center border-[var(--orange-dark)] bg-[var(--orange-light)] text-white rounded-xl space-x-2"
                            >
                                <HiCheck className="text-2xl" />
                                <span>Save</span>
                            </button>
                            <button
                                onClick={handleCancelClick}
                                className="border w-28 h-14 text-xl flex items-center justify-center border-[var(--blue-dark)] bg-[var(--blue-light)] text-white rounded-xl space-x-2"
                            >
                                <HiX className="text-2xl" />
                                <span>Cancel</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UserDetailsForm;
