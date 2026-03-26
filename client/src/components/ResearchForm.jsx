import React, { useRef, useState } from "react";
import axios from "axios";

const ResearchFormModal = ({
  formData,
  setFormData,
  handleSaveResearch,
  setIsResearchEditing,
  setResearchId,
  initialFormData,
  researchId,
}) => {
  const inputRef = useRef(null);

  const [imageFile, setImageFile] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);

  // 📌 FILE SELECT
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setImageFile(file);
  };

  // 📌 DRAG
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) setImageFile(file);
  };

  const handleDragOver = (e) => e.preventDefault();

  const removeImage = () => {
    setImageFile(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  // 🚀 UPLOAD + SAVE
  const handleSubmit = async () => {
    if (!formData.title || !formData.status) {
      alert("Title and Status are required");
      return;
    }

    let imageUrl = formData?.image || "";

    // 👉 Upload only if new file selected
    if (imageFile) {
      try {
        setImageLoading(true);

        const data = new FormData();
        data.append("image", imageFile);

        const res = await axios.post(
          `${process.env.REACT_APP_SERVER_API_URL}/api/news-event/upload-image`,
          data
        );

        if (res?.data?.success) {
          imageUrl = res.data.result.secure_url;
        }
      } catch (err) {
        console.error("Upload failed", err);
      } finally {
        setImageLoading(false);
      }
    }

    // 👉 Save with image + url
    handleSaveResearch({
      ...formData,
      image: imageUrl,
    });
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black/30 z-50 flex justify-center items-center">
      <div className="sm:w-[600px] w-96 p-4 bg-white rounded space-y-4">

        <h1 className="text-xl py-2 text-center font-semibold">{!researchId ? "Add Research" : "Edit Research"}</h1>

        {/* IMAGE UPLOAD */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="border-2 border-dashed rounded-lg p-4 text-center h-20"
        >
          <input
            type="file"
            ref={inputRef}
            onChange={handleImageChange}
            className="hidden"
            id="research-image"
          />

          {!imageFile ? (
            <label htmlFor="research-image" className="cursor-pointer block">
              <p className="text-gray-500">
                Drag & drop or click to upload image
              </p>
            </label>
          ) : imageLoading ? (
            <div className="h-10 bg-gray-200 animate-pulse rounded" />
          ) : (
            <div className="flex justify-between items-center">
              <p className="text-sm">{imageFile.name}</p>
              <button
                onClick={removeImage}
                className="text-red-500 text-sm"
              >
                Remove
              </button>
            </div>
          )}
        </div>

        {/* FORM FIELDS */}
        <div className="space-y-3">

          <div className="flex items-center">
            <p className="w-24">Duration</p>
            <input
              className="border px-2 py-1 flex-1 rounded"
              value={formData?.duration}
              onChange={(e) =>
                setFormData({ ...formData, duration: e.target.value })
              }
            />
          </div>

          <div className="flex items-center">
            <p className="w-24">Status</p>
            <select
              className="border px-2 py-1 flex-1 rounded"
              value={formData?.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
            >
              <option value="">Select</option>
              <option value="onGoing">On Going</option>
              <option value="previousResearch">Previous</option>
            </select>
          </div>

          <div className="flex items-center">
            <p className="w-24">Title</p>
            <textarea
              className="border px-2 py-1 flex-1 rounded h-20"
              value={formData?.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>

          <div className="flex items-start">
            <p className="w-24 pt-2">Description</p>
            <textarea
              className="border px-2 py-1 flex-1 rounded h-24"
              value={formData?.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          {/* ✅ NEW URL FIELD */}
          <div className="flex items-center">
            <p className="w-24">URL</p>
            <input
              className="border px-2 py-1 flex-1 rounded"
              placeholder="https://..."
              value={formData?.url || ""}
              onChange={(e) =>
                setFormData({ ...formData, url: e.target.value })
              }
            />
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-center gap-4 pt-2">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-1 rounded"
          >
            {imageLoading ? "Saving..." : "Save"}
          </button>

          <button
            onClick={() => {
              setIsResearchEditing(false);
              setResearchId(null);
              setFormData(initialFormData);
            }}
            className="bg-gray-300 px-4 py-1 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResearchFormModal;