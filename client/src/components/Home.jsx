import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { Triangle } from "react-loader-spinner";
import {
  getAbout,
  updateAbout,
  uploadBanner,
} from "../redux/admin/about-slice";
import {
  getDesignation,
  updateDesignation,
  addDesignation,
  deleteDesignation,
} from "../redux/admin/designation-slice";
import {
  getAwards,
  updateAward,
  addAward,
  deleteAward,
} from "../redux/admin/award-slice";
import { useDispatch, useSelector } from "react-redux";
import FileUpload from "./FileUpload";
import AwardForm from "./AwardForm";
import Gallery from "./Gallery";
import DeleteModal from "./DeleteModal";

const initialFormData = {
  title: "",
  company: "",
  location: "",
};

const initialAboutFormData = {
  name: "",
  motto: "",
  bio: "",
};

const initialAward = {
  title: "",
  year: "",
  image: "",
};

const Home = () => {
  const dispatch = useDispatch();
  const { about, isLoading } = useSelector((state) => state.about);
  const { designation } = useSelector((state) => state.designation);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { awards } = useSelector((state) => state.award);
  const [formData, setFormData] = useState(initialFormData);
  const [aboutFormData, setAboutFormData] = useState(initialAboutFormData);
  const [isDesignationEditing, setIsDesignationEditing] = useState(false);
  const [designationId, setDesignationId] = useState(null);
  const [awardData, setAwardData] = useState(initialAward);
  const [isAwardEditing, setIsAwardEditing] = useState(false);
  const [awardId, setAwardId] = useState(null);
  const [openImageUpdateModal, setOpenImageUpdateModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const settings = {
    dots: true,
    autoplay: true,
    autoplaySpeed: 2000,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    // adaptiveHeight: true,
  };

  useEffect(() => {
    dispatch(getAbout());
    dispatch(getDesignation());
    dispatch(getAwards());
  }, []);

  const [imageEditing, setImageEditing] = useState(false);

  const handleSaveDesignation = () => {
    if (formData.title === "") {
      alert("Title fields are required");
      return;
    }
    if (formData && designationId) {
      dispatch(updateDesignation({ formData, id: designationId })).then(
        (res) => {
          if (res.payload?.success) {
            dispatch(getDesignation());
          }
        }
      );
    } else {
      dispatch(addDesignation(formData)).then((res) => {
        console.log(res);
        if (res.payload?.success) {
          dispatch(getDesignation());
        }
      });
    }
    setIsDesignationEditing(false);
    setFormData(initialFormData);
    designationId && setDesignationId(null);
  };

  const handleUpdate = (d) => {
    setIsDesignationEditing(true);
    setDesignationId(d._id);
    setFormData({
      title: d.title,
      company: d.company,
      location: d.location,
    });
  };

  const handleDeleteDesignation = (id) => {
    dispatch(deleteDesignation(id)).then((res) => {
      if (res.payload?.success) {
        dispatch(getDesignation());
      }
    });
  };

  const handleEditClick = () => {
    const { name, motto, bio } = about;
    setAboutFormData({ name, motto, bio });
    setIsEditing(true);
  };

  const handleSaveBio = () => {
    dispatch(updateAbout(aboutFormData)).then((res) => {
      if (res.payload?.success) {
        dispatch(getAbout());
      }
    });
    setIsEditing(false);
    setAboutFormData(initialAboutFormData);
  };

  // image section
  const handleImageUpdateModal = () => {
    setOpenImageUpdateModal(true);
  };

  // award section
  const handleSaveAward = (uploadedImageUrl) => {
    if (awardData.title === "" || awardData.year === "") {
      alert("Title and Year fields are required");
      return;
    }
    const payload = { ...awardData, image: uploadedImageUrl };

    if (awardId) {
      dispatch(updateAward({ formData: payload, id: awardId })).then((res) => {
        if (res.payload?.success) {
          dispatch(getAwards());
        }
      });
    } else {
      dispatch(addAward(payload)).then((res) => {
        if (res.payload?.success) {
          dispatch(getAwards());
        }
      });
    }
    setIsAwardEditing(false);
    setAwardData(initialAward);
    awardId && setAwardId(null);
  };

  const handleUpdateAward = (a) => {
    setIsAwardEditing(true);
    setAwardId(a._id);
    const { title, year, image } = a;
    setAwardData({ title, year, image });
  };

  const handleDeleteAward = (id) => {
    dispatch(deleteAward(id)).then((res) => {
      if (res.payload?.success) {
        dispatch(getAwards());
      }
    });
  };

  if (isLoading)
    return (
      <div className="fixed top-0 left-0 flex justify-center items-center h-full w-screen">
        <Triangle
          height="60"
          width="60"
          color="#4fa94d"
          ariaLabel="triangle-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      </div>
    );

  return (
    <div className="mt-4 lg:mx-24 mx-4">
      {imageEditing && (
        <FileUpload
          setOpenModal={() => setImageEditing(false)}
          name="image"
          api="upload-pro-pic"
          text="Upload Profile Picture"
          oldImage={null}
        />
      )}

      {isDesignationEditing && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-25 z-50 flex justify-center items-center">
          <div className="w-96 h-fit p-4 bg-white text-black rounded space-y-4">
            <div className="space-y-2">
              <p className="text-center text-lg font-semibold p-2">
                Update Designation
              </p>
              <div className="flex items-center">
                <p className="w-20">Title</p>
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
                <p className="w-20">Company</p>
                <input
                  className="px-2 border rounded flex-1"
                  type="text"
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  placeholder="Company"
                  value={formData?.company}
                />
              </div>
              <div className="flex items-center">
                <p className="w-20">Locaton</p>
                <input
                  className="px-2 border rounded flex-1"
                  type="text"
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  placeholder="Locaton"
                  value={formData?.location}
                />
              </div>
            </div>
            <div className="flex justify-center gap-4">
              <button className="save" onClick={handleSaveDesignation}>
                Save
              </button>
              <button
                className="cancel"
                onClick={() => {
                  setIsDesignationEditing(false);
                  setFormData(initialFormData);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {openImageUpdateModal && (
        <Gallery
          setOpenModal={() => setOpenImageUpdateModal(false)}
          images={about?.banner}
          // images={images}
        />
      )}

      {isAwardEditing && (
        <AwardForm
          setIsAwardEditing={setIsAwardEditing}
          setAwardData={setAwardData}
          awardData={awardData}
          setAwardId={setAwardId}
          awardId={awardId}
          handleSaveAward={handleSaveAward}
          initialAward={initialAward}
        />
      )}

      <div className="sm:flex gap-2">
        <div className="flex flex-col items-center sm:w-1/3 w-full p-2 gap-2">
          <div className="max-w-full w-56 h-64">
            <img
              src={about?.pro_pic}
              alt="profile"
              className="w-full h-full object-cover"
            />
          </div>
          {isAuthenticated && (
            <button
              onClick={() => setImageEditing(true)}
              className="save text-white"
            >
              Change Picture
            </button>
          )}
          <div className="text-center">
            <p className="font-bold text-xl">{about?.name}</p>
            {isAuthenticated && (
              <button
                onClick={() => setIsDesignationEditing(true)}
                className="save"
              >
                + Add Designation
              </button>
            )}
            {designation?.map((d, index) => (
              <div key={d.title}>
                <div className="my-3">
                  <p className="font-semibold">{d.title}</p>
                  <p>{d.company}</p>
                  <p>{d.location}</p>
                </div>
                {isAuthenticated && (
                  <div className="flex justify-center gap-4">
                    <button
                      className="fas fa-edit text-green-500"
                      onClick={() => handleUpdate(d)}
                    ></button>
                    <button
                      className="fas fa-trash text-red-400"
                      onClick={() => handleDeleteDesignation(d._id)}
                    ></button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          {isEditing ? (
            <div className="w-full">
              <textarea
                value={aboutFormData?.bio}
                onChange={(e) => setAboutFormData({ bio: e.target.value })}
                className="text-justify mb-4 w-full h-96 p-2 outline-none whitespace-pre-wrap"
              />
              <button
                className="border px-4 py-1 mb-4 rounded mr-4 save"
                onClick={handleSaveBio}
              >
                Save
              </button>
              <button
                className="border px-4 py-1 mb-4 rounded cancel"
                onClick={() => {
                  setIsEditing(false);
                  setAboutFormData(initialAboutFormData);
                }}
              >
                Cancel
              </button>
            </div>
          ) : (
            <div>
              <p className="text-justify mb-4 whitespace-pre-line">
                {about?.bio}
              </p>
              {isAuthenticated && (
                <button
                  className="save border px-4 py-1 mb-4 rounded"
                  onClick={handleEditClick}
                >
                  Edit
                </button>
              )}
            </div>
          )}

          <div className="w-full overflow-hidden pb-10">
            <Slider {...settings}>
              {about?.banner?.map((img, index) => (
                <div
                  key={index}
                  className="image-container border-4 border-indigo-950"
                >
                  <img src={img} alt="Certificate" />
                </div>
              ))}
            </Slider>
          </div>

          {isAuthenticated && (
            <button onClick={handleImageUpdateModal} className="edit">
              Update Image
            </button>
          )}
        </div>
      </div>

      {/* ----------------------- Award Section --------------------- */}
      <div className="my-4">
        <p className="w-full text-center py-1 bg-indigo-950 text-white font-semibold mt-4">
          Awards
        </p>
        {isAuthenticated && (
          <button onClick={() => setIsAwardEditing(true)} className="edit mt-2">
            + Add Awards
          </button>
        )}
        {awards?.map((a) => (
          <div
            className="flex gap-2 p-2 border my-2 shadow h-fit bg-white"
            key={a.title}
          >
            <div className="w-28 h-20 flex items-center justify-center relative">
              <img
                src={a.image}
                alt="award"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 pl-4">
              <p className="font-semibold text-md">{a.title}</p>
              <p>{a.year}</p>
            </div>
            {isAuthenticated && (
              <div className="flex gap-4 h-fit my-auto">
                <button
                  className="fas fa-edit text-green-500"
                  onClick={() => handleUpdateAward(a)}
                ></button>
                <button
                  className="fas fa-trash text-red-400"
                  onClick={() => handleDeleteAward(a._id)}
                ></button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
