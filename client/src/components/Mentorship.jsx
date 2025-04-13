import React, { useState, useEffect } from "react";
import { Triangle } from "react-loader-spinner";
import { useSelector, useDispatch } from "react-redux";
import {
  getMentorships,
  addMentorship,
  updateMentorship,
  deleteMentorship,
} from "../redux/admin/mentorship-slice";
import DeleteModal from "./DeleteModal";
import boyIcon from "../images/boy_icon.jpg";
import girlIcon from "../images/girl_icon.jpg";

const initialMentorshipData = {
  name: "",
  present_title: "",
  university_name: "",
  previous_title: "",
  email: "",
  gender: "",
};

const Mentorship = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { mentorships, isLoading } = useSelector((state) => state.mentorship);

  const [formData, setFormData] = useState(initialMentorshipData);
  const [isEditing, setIsEditing] = useState(false);
  const [mentorshipId, setMentorshipId] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleUpdateMentorship = (mentorship) => {
    setIsEditing(true);
    setMentorshipId(mentorship._id);
    const {
      name,
      present_title,
      university_name,
      previous_title,
      email,
      gender,
    } = mentorship;
    setFormData({
      name,
      present_title,
      university_name,
      previous_title,
      email,
      gender,
    });
  };

  const handleSaveApiCall = (url) => {
    if (formData.name === "") {
      alert("Name is required");
      return;
    }
    const payload = { ...formData };

    if (mentorshipId) {
      dispatch(updateMentorship({ formData: payload, id: mentorshipId })).then(
        (res) => {
          if (res?.payload?.success) {
            dispatch(getMentorships());
          }
        }
      );
    } else {
      dispatch(addMentorship(payload)).then((res) => {
        if (res?.payload?.success) {
          dispatch(getMentorships());
        }
      });
    }
    setIsEditing(false);
    setFormData(initialMentorshipData);
    setMentorshipId(null);
  };

  useEffect(() => {
    dispatch(getMentorships());
  }, []);

  return (
    <div className="mt-4 lg:mx-24 mx-4">
      {openDeleteModal && (
        <DeleteModal
          onClose={() => {
            setOpenDeleteModal(false);
            setMentorshipId(null);
          }}
          handleDelete={() => {
            dispatch(deleteMentorship(mentorshipId)).then((res) => {
              if (res?.payload?.success) {
                dispatch(getMentorships());
              }
            });
            setOpenDeleteModal(false);
            setMentorshipId(null);
          }}
        />
      )}

      {isEditing && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-25 z-50 flex justify-center items-center">
          <div className="w-96 h-fit p-6 bg-white text-black rounded space-y-4">
            <div className="space-y-2">
              <div className="flex items-center">
                <p className="w-20">Name</p>
                <input
                  className="px-2 border rounded flex-1"
                  type="text"
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Name"
                  value={formData?.name}
                />
              </div>
              <div className="flex items-center">
                <p className="w-20">Present title</p>
                <input
                  className="px-2 border rounded flex-1"
                  type="text"
                  onChange={(e) =>
                    setFormData({ ...formData, present_title: e.target.value })
                  }
                  placeholder="Present title"
                  value={formData?.present_title}
                />
              </div>
              <div className="flex items-center">
                <p className="w-20">University Name</p>
                <input
                  className="px-2 border rounded flex-1"
                  type="text"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      university_name: e.target.value,
                    })
                  }
                  placeholder="University Name"
                  value={formData?.university_name}
                />
              </div>
              <div className="flex items-center">
                <p className="w-20">Previous title</p>
                <input
                  className="px-2 border rounded flex-1"
                  type="text"
                  onChange={(e) =>
                    setFormData({ ...formData, previous_title: e.target.value })
                  }
                  placeholder="Previous title"
                  value={formData?.previous_title}
                />
              </div>
              <div className="flex items-center">
                <p className="w-20">Email</p>
                <input
                  className="px-2 border rounded flex-1"
                  type="text"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="Email"
                  value={formData?.email}
                />
              </div>
              <div className="flex items-center">
                <p className="w-20">Gender</p>
                <select
                  className="px-2 h-10 border rounded flex-1"
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value })
                  }
                  value={formData?.gender}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>
            <div className="flex justify-center gap-4">
              <button className="save" onClick={handleSaveApiCall}>
                Save
              </button>
              <button
                className="cancel"
                onClick={() => {
                  setIsEditing(false);
                  setFormData(initialMentorshipData);
                  setMentorshipId(null);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between relative">
        <h1 className="text-2xl font-bold py-4 sm:mx-auto">Mentorship</h1>
        {isAuthenticated && (
          <button
            onClick={() => setIsEditing(true)}
            className="edit mt-2 absolute right-0"
          >
            + Add Mentorship
          </button>
        )}
      </div>

      <div className="flex justify-center gap-4 flex-wrap">
        {mentorships?.map((mentor, index) => (
          <div
            key={index}
            className="w-72 min-h-80 h-fit bg-white shadow-md p-4 flex flex-col gap-2 group relative overflow-hidden"
          >
            <div className="h-36 w-full overflow-hidden">
              <img
                src={mentor.gender === "Male" ? boyIcon : girlIcon}
                alt="add"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="text-center text-sm">
              <h1 className="text-lg font-bold">{mentor.name}</h1>
              <p>{mentor.present_title}</p>
              <p>{mentor.university_name}</p>
              <p>{mentor.previous_title}</p>
              <p>{mentor.email}</p>
            </div>
            {isAuthenticated && (
              <div className="absolute left-0 sm:-bottom-10 bottom-0 flex gap-4  group-hover:bottom-0 transition-all duration-300 ease-in-out bg-black bg-opacity-20 w-full p-3 justify-center rounded-t-md">
                <button
                  className="fas fa-edit text-green-500"
                  onClick={() => handleUpdateMentorship(mentor)}
                ></button>
                <button
                  className="fas fa-trash text-red-400"
                  onClick={() => {
                    setOpenDeleteModal(true);
                    setMentorshipId(mentor._id);
                  }}
                ></button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mentorship;
