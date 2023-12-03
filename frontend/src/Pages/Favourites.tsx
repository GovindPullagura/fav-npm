import React, { useState } from "react";
import Modal from "../Components/Modal";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom"; // Assuming you're using React Router for navigation

const Favorites = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const favorites = JSON.parse(localStorage.getItem("favourites") || "[]");

  const handleDelete = (item: any) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleConfirmDelete = () => {
    // Remove the selected item from favorites
    const updatedFavorites = favorites.filter(
      (favourite: any) => favourite !== selectedItem
    );
    localStorage.setItem("favourites", JSON.stringify(updatedFavorites));

    // Close the modal
    setShowModal(false);
  };

  return (
    <div className="mt-4 p-8 bg-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-semibold">Favorites</h2>
        <Link to="/" className="text-blue-500 hover:underline">
          Go to Home
        </Link>
      </div>

      {favorites.length > 0 ? (
        <table className="w-full md:w-1/2 border border-gray-300 bg-white shadow-md rounded-md overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 border-b">Package Name</th>
              <th className="py-2 px-4 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {favorites.map((item: any) => (
              <tr key={item}>
                <td className="py-2 px-4 border-b text-center">{item}</td>
                <td className="py-2 px-4 border-b text-center">
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(item)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500">No favorites yet.</p>
      )}

      <Modal
        show={showModal}
        onClose={handleModalClose}
        onConfirm={handleConfirmDelete}
        item={selectedItem}
      />
    </div>
  );
};

export default Favorites;
