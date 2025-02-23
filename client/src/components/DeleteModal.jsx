import React from "react";

const DeleteModal = ({ handleDelete, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-25 z-50 flex justify-center items-center">
      <div className="w-96 h-fit p-6 bg-white text-black rounded space-y-4">
        <p className="sm:text-lg font-semibold mb-2 block">
          Are you sure you want to delete this item?
        </p>

        <div className="flex justify-center gap-4">
          <button
            className="save"
            onClick={() => {
              onClose();
            }}
          >
            Cancel
          </button>
          <button className="cancel" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
