import React, { useState, useEffect } from "react";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
import award_logo from "../images/award_logo.png";
import Slider from "react-slick";
import { Triangle } from "react-loader-spinner";
import MAC0 from "../images/MAC0.jpeg";
import MAC1 from "../images/MAC1.jpeg";
import MAC2 from "../images/MAC2.jpeg";
import MAC3 from "../images/MAC3.jpeg";
import MAC4 from "../images/MAC4.jpeg";
import MAC5 from "../images/MAC5.jpeg";
import MAC6 from "../images/MAC6.jpeg";
import MAC7 from "../images/MAC7.jpeg";
import {
  getAbout,
  updateAbout,
  uploadBanner,
  uploadProPic,
} from "../redux/admin/about-slice";
import { useDispatch, useSelector } from "react-redux";
import FileUpload from "./FileUpload";

const Home = () => {
  const dispatch = useDispatch();
  const { about, isLoading } = useSelector((state) => state.about);
  const [designation, setDesignation] = useState();
  const [awards, setAwards] = useState();
  const [editBio, setEditBio] = useState(null);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([
    MAC0,
    MAC1,
    MAC2,
    MAC3,
    MAC4,
    MAC5,
    MAC6,
    MAC7,
  ]);
  const settings = {
    dots: true,
    autoplay: true,
    autoplaySpeed: 2000,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };
  const regex = /\b\d{4}\b/g;

  useEffect(() => {
    dispatch(getAbout());
  }, []);

  const [imageEditing, setImageEditing] = useState(false);

  //--------------------------Bio editing functionality-------------------------------
  const [isBioEditing, setIsBioEditing] = useState(false);
  const [bio, setBio] = useState(null);

  //---------------------------Image editing functionality---------------------------

  const handleCarouselImage = () => {};

  //-------------------------Award editing functionality----------------------------
  const [isAwardEditing, setIsAwardEditing] = useState(false);
  const [award, setAward] = useState(null);

  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setEditBio(about?.bio);
    setIsEditing(true);
  };

  const handleChange = (event) => {
    setEditBio(event.target.value);
  };
  const handleCancelClick = () => {
    setEditBio(null);
    setIsEditing(false);
  };

  if (loading)
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
        <FileUpload setOpenModal={() => setImageEditing(false)} name="image" api="upload-pro-pic" />
      )}

      {isBioEditing && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-25 z-10 flex justify-center items-center">
          <div className="w-96 h-fit p-4 bg-white text-black rounded space-y-4">
            <div className="space-y-2">
              <div className="flex">
                <p className="w-20">Title</p>
                <input
                  className="px-2 border rounded flex-1"
                  type="text"
                  // onChange={(e) => setBio({ ...bio, name: e.target.value })}
                  placeholder="Title"
                  value={bio?.name}
                />
              </div>
              <div className="flex">
                <p className="w-20">Company</p>
                <input
                  className="px-2 border rounded flex-1"
                  type="text"
                  // onChange={(e) => setBio({ ...bio, company: e.target.value })}
                  placeholder="Company"
                  value={bio?.company}
                />
              </div>
              <div className="flex">
                <p className="w-20">Locaton</p>
                <input
                  className="px-2 border rounded flex-1"
                  type="text"
                  // onChange={(e) => setBio({ ...bio, location: e.target.value })}
                  placeholder="Locaton"
                  value={bio?.location}
                />
              </div>
            </div>
            <div className="flex justify-center gap-4">
              <button
                className="save"
                // onClick={handleSaveBio}
              >
                Save
              </button>
              <button
                className="cancel"
                // onClick={() => {
                //   setIsBioEditing(false);
                //   setBio(null);
                // }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {isAwardEditing && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-25 z-10 flex justify-center items-center">
          <div className="w-96 h-fit p-4 bg-white text-black rounded space-y-4">
            <div className="space-y-2">
              <div className="flex">
                <p className="w-16">Image: </p>
                <input
                  type="file"
                  // onChange={(e) =>
                  //   setAward({ ...award, image: e.target.value })
                  // }
                  value={award?.image}
                />
              </div>
              <div className="flex">
                <p className="w-16">Title</p>
                <input
                  className="px-2 border rounded flex-1"
                  type="text"
                  // onChange={(e) =>
                  //   setAward({ ...award, title: e.target.value })
                  // }
                  placeholder="Title"
                  value={award?.title}
                />
              </div>
              <div className="flex">
                <p className="w-16">Year</p>
                <input
                  className="px-2 border rounded flex-1"
                  type="text"
                  // onChange={(e) => setAward({ ...award, year: e.target.value })}
                  placeholder="Year"
                  value={award?.year}
                />
              </div>
            </div>
            <div className="flex justify-center gap-4">
              <button
                className="save"
                //  onClick={handleSaveAward}
              >
                Save
              </button>
              <button
                className="cancel"
                // onClick={() => {
                //   setIsAwardEditing(false);
                //   setBio(null);
                // }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
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
                // onClick={() => setIsBioEditing(true)}
                className="save"
              >
                + Add Designation
              </button>
            )}
            {designation?.map((d, index) => (
              <div key={d.name}>
                <div className="my-3">
                  <p className="font-semibold">{d.name}</p>
                  <p>{d.company}</p>
                  <p>{d.location}</p>
                </div>
                {isAuthenticated && (
                  <div className="flex justify-center gap-4">
                    <button
                      className="fas fa-edit text-green-500"
                      // onClick={() =>
                      //   handleBioUpdateButton(
                      //     d.id,
                      //     d.name,
                      //     d.company,
                      //     d.location
                      //   )
                      // }
                    ></button>
                    <button
                      className="fas fa-trash text-red-400"
                      // onClick={() => handleBioDelete(d.id)}
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
                value={editBio}
                onChange={handleChange}
                className="text-justify mb-4 w-full h-96 outline-none"
              />
              <button
                className="border px-4 py-1 mb-4 rounded mr-4"
                // onClick={handleSaveClick}
              >
                Save
              </button>
              <button
                className="border px-4 py-1 mb-4 rounded"
                // onClick={handleCancelClick}
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
                  // onClick={handleEditClick}
                >
                  Edit
                </button>
              )}
            </div>
          )}

          <div className="w-full overflow-hidden pb-10">
            <Slider {...settings}>
              {images?.map((img, index) => (
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
            <button
              // onClick={handleCarouselImage}
              className="edit"
            >
              + Add Pictures
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
            className="flex gap-2 p-2 border rounded my-2 shadow h-fit"
            key={a.title}
          >
            <div className="w-28 h-20 flex items-center justify-center relative">
              <p className="absolute z-10 font-semibold text-indigo-950">
                {a?.year?.match(regex)?.[0]}
              </p>
              <img
                src={award_logo}
                alt=""
                className="w-4/5 h-4/5 object-cover"
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
                  // onClick={() => handleUpdateAward(a.id, a.title, a.year)}
                ></button>
                <button
                  className="fas fa-trash text-red-400"
                  // onClick={() => handleDeleteAward(a.id)}
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
