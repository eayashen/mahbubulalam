import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import DeleteModal from "./DeleteModal";
import {
  getConsultancies,
  addConsultancy,
  updateConsultancy,
  deleteConsultancy,
  uploadImage,
} from "../redux/admin/consultancy-slice";

const initialFormData = {
  title: "",
  duration: "",
  client: "",
  image: "",
};

const Consultancy = () => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { consultancies, isLoading } = useSelector(
    (state) => state.consultancy
  );
  const [formData, setFormData] = useState(initialFormData);
  const [isEditing, setIsEditing] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [consultancyId, setConsultancyId] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleUpdateConsultancy = (consultancy) => {
    setIsEditing(true);
    setConsultancyId(consultancy._id);
    const { title, duration, client, image } = consultancy;
    setFormData({ title, duration, client, image });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  };

  const handleImageFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setImageFile(file);
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleSaveApiCall = (url) => {
    if (formData.title === "") {
      alert("Title is required");
      return;
    }
    const payload = { ...formData, image: url };

    if (consultancyId) {
      dispatch(
        updateConsultancy({ formData: payload, id: consultancyId })
      ).then((res) => {
        if (res?.payload?.success) {
          dispatch(getConsultancies());
        }
      });
    } else {
      dispatch(addConsultancy(payload)).then((res) => {
        if (res?.payload?.success) {
          dispatch(getConsultancies());
        }
      });
    }
    setIsEditing(false);
    setFormData(initialFormData);
    setConsultancyId(null);
  };

  const handleSave = async () => {
    if (!imageFile) {
      handleSaveApiCall(formData?.image);
      return;
    }
    try {
      setImageLoadingState(true);
      // const token = JSON.parse(sessionStorage.getItem("token"));
      const data = new FormData();
      data.append("image", imageFile);

      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_API_URL}/api/consultancy/upload-image`,
        data
      );
      if (response?.data?.success) {
        const imageUrl = response?.data?.result?.secure_url;
        setUploadedImageUrl(response?.data?.result?.secure_url);
        setImageFile(null);
        handleSaveApiCall(imageUrl);
      } else {
        console.log("Image upload failed");
      }
    } catch (error) {
      console.error("Error uploading image:", error.message);
    } finally {
      setImageLoadingState(false);
    }
  };

  useEffect(() => {
    dispatch(getConsultancies());
  }, []);

  return (
    <div className="mt-4 lg:mx-24 mx-4">
      {openDeleteModal && (
        <DeleteModal
          onClose={() => {
            setOpenDeleteModal(false);
            setConsultancyId(null);
          }}
          handleDelete={() => {
            dispatch(deleteConsultancy(consultancyId)).then((res) => {
              if (res?.payload?.success) {
                dispatch(getConsultancies());
              }
            });
            setOpenDeleteModal(false);
            setConsultancyId(null);
          }}
        />
      )}
      {isEditing && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-25 z-50 flex justify-center items-center">
          <div className="w-96 h-fit p-6 bg-white text-black rounded space-y-4">
            <div className="space-y-2">
              <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className="border-2 border-dashed rounded-lg p-4"
              >
                <input
                  id="image-upload"
                  type="file"
                  className="hidden"
                  ref={inputRef}
                  onChange={handleImageFileChange}
                  // disabled={isEditMode}
                />
                {!imageFile ? (
                  <label
                    htmlFor="image-upload"
                    className={`cursor-pointer flex flex-col items-center justify-center sm:h-32 h-fit`}
                  >
                    {/* <UploadCloudIcon className="w-10 h-10 text-muted-forground mb-2" /> */}
                    <span>Drag & drop or click to upload file</span>
                  </label>
                ) : imageLoadingState ? (
                  <div className="h-10 bg-gray-200" />
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 text-promary mr-2" />
                    </div>
                    <p className="text-sm font-medium">{imageFile.name}</p>
                    <button
                      variant="ghost"
                      size="icon"
                      className="text-muted-forground hover:text-foreground"
                      onClick={handleRemoveImage}
                    >
                      <p className="w-4 h-4">X</p>
                      <span className="sr-only">Remove File</span>
                    </button>
                  </div>
                )}
              </div>
              <div className="flex items-center">
                <p className="w-16">Title</p>
                <input
                  className="px-2 border rounded flex-1"
                  type="text"
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Title"
                  value={formData?.title}
                />
              </div>
              <div className="flex items-center">
                <p className="w-16">Duration</p>
                <input
                  className="px-2 border rounded flex-1"
                  type="text"
                  onChange={(e) =>
                    setFormData({ ...formData, duration: e.target.value })
                  }
                  placeholder="Duration"
                  value={formData?.duration}
                />
              </div>
              <div className="flex items-center">
                <p className="w-16">Client</p>
                <input
                  className="px-2 border rounded flex-1"
                  type="text"
                  onChange={(e) =>
                    setFormData({ ...formData, client: e.target.value })
                  }
                  placeholder="Client"
                  value={formData?.client}
                />
              </div>
            </div>
            <div className="flex justify-center gap-4">
              <button className="save" onClick={handleSave}>
                Save
              </button>
              <button
                className="cancel"
                onClick={() => {
                  setIsEditing(false);
                  setFormData(initialFormData);
                  setConsultancyId(null);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between relative">
        <h1 className="text-2xl font-bold py-4 sm:mx-auto">Consultancy</h1>
        {isAuthenticated && (
          <button onClick={() => setIsEditing(true)} className="edit mt-2 absolute right-0">
            + Add Consultancy
          </button>
        )}
      </div>

      {consultancies?.map((a) => (
        <div
          className="flex sm:flex-row flex-col gap-2 my-3 shadow h-fit bg-white"
          key={a?.title}
        >
          <div className="w-40 h-40 flex mx-auto sm:pt-0 pt-2 items-center justify-center relative">
            <img
              src={a?.image}
              alt="picture"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 px-4 py-2">
            <p className="font-semibold text-md text-lg">{a?.title}</p>
            <p className="text-md text-gray-400 py-1">{a?.duration}</p>
            <p>{a?.client}</p>
          </div>
          {isAuthenticated && (
            <div className="flex mx-auto sm:pb-0 pb-4 gap-4 h-fit my-auto pr-2">
              <button
                className="fas fa-edit text-green-500"
                onClick={() => handleUpdateConsultancy(a)}
              ></button>
              <button
                className="fas fa-trash text-red-400"
                onClick={() => {
                  setOpenDeleteModal(true);
                  setConsultancyId(a._id);
                }}
              ></button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Consultancy;
