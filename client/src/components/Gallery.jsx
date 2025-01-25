import { useState } from "react";
import DeleteModal from "./DeleteModal";

const Gallery = ({ setOpenModal, images }) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-25 z-50 flex justify-center items-center p-4">
      {openDeleteModal && (
        <DeleteModal
          handleDelete={() => {
            console.log("delete");
          }}
          onClose={() => {
            setOpenDeleteModal(false);
          }}
        />
      )}
      <div className="relative max-w-[780px] flex-1 max-h-[90vh] overflow-y-auto p-8 bg-white text-black rounded space-y-4 m-4">
        <div className="flex items-center gap-6">
          <p className="sm:text-lg font-semibold py-2 block">Gallery</p>
          <button className="save">+ New Upload</button>
        </div>
        <div className="flex gap-4 flex-wrap">
          {images.map((img, index) => (
            <div
              key={index}
              className="shadow-md border border-teal-500 rounded overflow-hidden"
            >
              <img
                key={index}
                src={img}
                alt="gallery"
                className="w-40 h-32 object-cover"
              />
              <div className="flex">
                <button className="fa fa-upload flex-1 text-white bg-green-400 flex items-center justify-center h-8"></button>
                <button
                  onClick={() => {
                    setOpenDeleteModal(true);
                  }}
                  className="fas fa-trash text-white flex-1 bg-red-400 flex items-center justify-center h-8"
                ></button>
              </div>
            </div>
          ))}
        </div>
        <button
          className="absolute right-4 top-0 rounded-full bg-slate-300 px-3 py-1 font-semibold"
          onClick={() => {
            setOpenModal(false);
          }}
        >
          X
        </button>
      </div>
    </div>
  );
};

export default Gallery;
