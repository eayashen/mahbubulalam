import axios from "axios";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";

const MembershipForm = ({
  setIsMembershipEditing,
  handleSaveMembership,
  membershipData,
  setMembershipData,
  setMembershipId,
}) => {
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);

  const handleImageFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setImageFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const uploadImageToCloudinary = async () => {
    if (!imageFile) {
      handleSaveMembership(membershipData?.image);
      return;
    }
    try {
      setImageLoadingState(true);
      // const token = JSON.parse(sessionStorage.getItem("token"));
      const data = new FormData();
      data.append("image", imageFile);

      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_API_URL}/api/membership/upload-image`,
        data
      );
      if (response?.data?.success) {
        const imageUrl = response?.data?.result?.secure_url;
        setUploadedImageUrl(response?.data?.result?.secure_url);
        setImageFile(null);
        handleSaveMembership(imageUrl);
      } else {
        console.log("Image upload failed");
      }
    } catch (error) {
      console.error("Error uploading image:", error.message);
    } finally {
      setImageLoadingState(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-25 z-40 flex justify-center items-center">
      <div className="w-96 h-fit p-4 bg-white text-black rounded space-y-4">
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
            <p className="w-24">Hover Text</p>
            <input
              className="px-2 border rounded flex-1"
              type="text"
              onChange={(e) =>
                setMembershipData({
                  ...membershipData,
                  hoverText: e.target.value,
                })
              }
              placeholder="Title"
              value={membershipData?.hoverText}
            />
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <button className="save" onClick={uploadImageToCloudinary}>
            Save
          </button>
          <button
            className="cancel"
            onClick={() => {
              setIsMembershipEditing(false);
              setMembershipId(null);
              setMembershipData({ hoverText: "", imageLink: "" });
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default MembershipForm;
