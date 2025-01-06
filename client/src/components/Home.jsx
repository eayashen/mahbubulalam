import React, { useState, useEffect } from "react";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
import award_logo from "../images/award_logo.png";
import Slider from "react-slick";
import { useSelector } from "react-redux";
import { Triangle } from "react-loader-spinner";
import MAC0 from "../images/MAC0.jpeg";
import MAC1 from "../images/MAC1.jpeg";
import MAC2 from "../images/MAC2.jpeg";
import MAC3 from "../images/MAC3.jpeg";
import MAC4 from "../images/MAC4.jpeg";
import MAC5 from "../images/MAC5.jpeg";
import MAC6 from "../images/MAC6.jpeg";
import MAC7 from "../images/MAC7.jpeg";
import axios from "axios";

const Home = () => {
  const [about, setAbout] = useState();
  const [designation, setDesignation] = useState();
  const [awards, setAwards] = useState();
  const [editBio, setEditBio] = useState(null);
  const isLoggedIn = useSelector((state) => state.isLoggedIn.value);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState();
  const access_token = useSelector((state) => state.loginData.accessToken);
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
    fetchData();
    fetchDesignation();
    fetchAwards();
    fetchProfileImage();
    // fetchAwardImage();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
        const response = await fetch(
          "http://13.232.229.42:8000/api/v1/about",
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
          }
        );

        if (response.ok) {
          const jsonData = await response.json();
          setAbout(jsonData[0]);
        } else {
          console.log("Error fetching about data:", response.status);
        }
    } catch (error) {
      console.log("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDesignation = async () => {
    setLoading(true);
    try {
        const response = await axios.get(
          "http://13.232.229.42:8000/api/v1/designation",
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          const jsonData = response.data;
          setDesignation(jsonData);
        } else {
          console.log("Error fetching designation data:", response.status);
        }
    } catch (error) {
      console.log("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAwards = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://13.232.229.42:8000/api/v1/awards");
      const jsonData = await response.json();
      setAwards(jsonData);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching data:", error);
      // setLoading(false);
    }
  };

  //---------------------------Image edit functionality-------------------------------
  const [imageEditing, setImageEditing] = useState(false);
  const [image, setImage] = useState();

  const fetchProfileImage = async () => {
    try {
      const response = await fetch(
        "http://13.232.229.42:8000/api/v1/image/uploads/pro_pic"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch image");
      }

      const imageBlob = await response.blob(); // Get image as Blob
      const imageSrc = URL.createObjectURL(imageBlob); // Create image URL
      setProfile(imageSrc);
    } catch (error) {
      console.error("Error fetching profile image:", error);
      return null;
    }
  };
  const handleSaveImage = () => {
    //api call
    const apiUrl = "http://13.232.229.42:8000/api/v1/image/uploads";

    if (!image) {
      console.error("No image selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", image, "pro_pic"); // 'filename.jpg' is the desired filename on the server

    const headers = {
      Accept: "application/json",
      Authorization: `Bearer ${access_token}`,
    };

    const requestOptions = {
      method: "POST",
      headers,
      body: formData,
    };

    fetch(apiUrl, requestOptions)
      .then((response) => {
        if (response.ok) {
          fetchProfileImage();
          console.log("Image uploaded successfully");
        } else {
          console.error("Image upload failed");
        }
      })
      .catch((error) => {
        console.error("Error while uploading image:", error);
      });
    setImage(null);
    setImageEditing(false);
  };

  //--------------------------Bio editing functionality-------------------------------
  const [isBioEditing, setIsBioEditing] = useState(false);
  const [bio, setBio] = useState(null);

  const handleSaveBio = () => {
    if (bio && bio.id !== undefined) {
      const updateData = async () => {
        try {
          const response = await fetch(
            "http://13.232.229.42:8000/api/v1/designation",
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token}`,
              },
              body: JSON.stringify(
                {
                  location: bio?.location,
                  id: bio?.id,
                  name: bio?.name,
                  company: bio?.company,
                },
                null,
                2
              ),
            }
          );

          if (response.ok) {
            fetchDesignation();
            setBio(null);
            console.log("Data updated successfully");
          } else {
            console.log("Error updating data");
          }
        } catch (error) {
          console.log("Error updating data:", error);
        }
      };
      updateData();
    } else {
      const updateData = async () => {
        try {
          const response = await fetch(
            "http://13.232.229.42:8000/api/v1/designation",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token}`,
              },
              body: JSON.stringify(
                {
                  location: bio?.location || "",
                  name: bio?.name,
                  company: bio?.company || "",
                },
                null,
                2
              ),
            }
          );

          if (response.ok) {
            fetchDesignation();
            setBio(null);
            console.log("Data updated successfully");
          } else {
            console.log("Error updating data");
          }
        } catch (error) {
          console.log("Error updating data:", error);
        }
      };
      updateData();
    }

    setIsBioEditing(false);
  };

  const handleBioUpdateButton = (id, name, company, location) => {
    setBio((prevBio) => ({ ...prevBio, id, name, company, location }));
    setIsBioEditing(true);
  };

  const handleBioDelete = (id) => {
    const deleteDesignation = async () => {
      try {
        const response = await fetch(
          `http://13.232.229.42:8000/api/v1/designation?id=${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
        if (response.ok) {
          fetchDesignation();
          console.log("Data deleted successfully");
        } else {
          console.log("Error updating data");
        }
      } catch (error) {
        console.log("Error updating data:", error);
      }
    };
    deleteDesignation();
  };

  //---------------------------Image editing functionality---------------------------

  const handleCarouselImage = () => {};

  //-------------------------Award editing functionality----------------------------
  const [isAwardEditing, setIsAwardEditing] = useState(false);
  const [award, setAward] = useState(null);

  const handleUpdateAward = (id, title, year) => {
    setAward((prevAward) => ({ ...prevAward, id, title, year }));
    setIsAwardEditing(true);
  };

  const handleSaveAward = () => {
    if (award && award.id !== undefined) {
      const updateAward = async () => {
        try {
          const response = await fetch(
            "http://13.232.229.42:8000/api/v1/awards",
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token}`,
              },
              body: JSON.stringify(
                {
                  title: award?.title,
                  year: award?.year,
                  id: award?.id,
                },
                null,
                2
              ),
            }
          );

          if (response.ok) {
            fetchAwards();
            setAward(null);
            console.log("Data updated successfully");
          } else {
            console.log("Error updating data");
          }
        } catch (error) {
          console.log("Error updating data:", error);
        }
      };
      updateAward();
    } else {
      const updateAward = async () => {
        try {
          const response = await fetch(
            "http://13.232.229.42:8000/api/v1/awards",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token}`,
              },
              body: JSON.stringify(
                {
                  title: award?.title || "",
                  year: award?.year || "",
                },
                null,
                2
              ),
            }
          );

          if (response.ok) {
            fetchAwards();
            setAward(null);
            console.log("Data updated successfully");
          } else {
            console.log("Error updating data");
          }
        } catch (error) {
          console.log("Error updating data:", error);
        }
      };
      updateAward();
    }
    setIsAwardEditing(false);
  };

  const handleDeleteAward = (id) => {
    const deleteAward = async () => {
      try {
        const response = await fetch(
          `http://13.232.229.42:8000/api/v1/awards?id=${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
        if (response.ok) {
          fetchAwards();
          console.log("Data deleted successfully");
        } else {
          console.log("Error updating data");
        }
      } catch (error) {
        console.log("Error updating data:", error);
      }
    };
    deleteAward();
  };

  // const [activeIndex, setActiveIndex] = useState(0);

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setActiveIndex((prevIndex) => (prevIndex + 1) % 3);
  //   }, 5000);

  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, []);

  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setEditBio(about?.bio);
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    const updateData = async () => {
      try {
        const response = await fetch("http://13.232.229.42:8000/api/v1/about", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
          body: JSON.stringify(
            {
              id: 1,
              name: about?.name || "",
              motto: about?.motto || "",
              bio: editBio || "",
            },
            null,
            2
          ),
        });

        if (response.ok) {
          fetchData();
          setEditBio(null);
          console.log("Data updated successfully");
        } else {
          console.log("Error updating data");
        }
      } catch (error) {
        console.log("Error updating data:", error);
      }
    };

    updateData();
    setIsEditing(false);
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

  // const fetchAwardImage = async () => {
  //   try {
  //     const response = await fetch(
  //       "https://port.abirmunna.me/api/v1/image/get_all"
  //     );
  //     const jsonData = await response.json();
  //     if (response.ok) {
  //       try {
  //         const filteredStrings = jsonData.filter((str) =>
  //           str.startsWith("test")
  //         );

  //         // Create an async function to fetch and set images
  //         const fetchAndSetImages = async () => {
  //           for (const img of filteredStrings) {
  //             const response = await fetch(
  //               `https://port.abirmunna.me/api/v1/image/uploads/${img}`
  //             );

  //             if (!response.ok) {
  //               throw new Error(`Failed to fetch image: ${img}`);
  //             }

  //             const imageBlob = await response.blob(); // Get image as Blob
  //             const imageSrc = URL.createObjectURL(imageBlob); // Create image URL
  //             setImages((images) => [...images, imageSrc]);
  //           }
  //         };

  //         fetchAndSetImages().catch((error) => {
  //           console.error("Error fetching profile image:", error);
  //         });
  //       } catch (error) {
  //         console.error("Error filtering images:", error);
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error fetching profile image:", error);
  //     return null;
  //   }
  // };

  return (
    <div className="mt-4 lg:mx-24 mx-4">
      {imageEditing && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-25 z-10 flex justify-center items-center">
          <div className="w-96 h-fit p-4 bg-white text-black rounded space-y-4">
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
            <div className="flex justify-center gap-4">
              <button
                className="bg-blue-400 rounded px-4 py-1 text-white hover:bg-blue-500"
                onClick={handleSaveImage}
              >
                Save
              </button>
              <button
                className="bg-red-400 rounded px-4 py-1 text-white hover:bg-red-500"
                onClick={() => setImageEditing(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
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
                  onChange={(e) => setBio({ ...bio, name: e.target.value })}
                  placeholder="Title"
                  value={bio?.name}
                />
              </div>
              <div className="flex">
                <p className="w-20">Company</p>
                <input
                  className="px-2 border rounded flex-1"
                  type="text"
                  onChange={(e) => setBio({ ...bio, company: e.target.value })}
                  placeholder="Company"
                  value={bio?.company}
                />
              </div>
              <div className="flex">
                <p className="w-20">Locaton</p>
                <input
                  className="px-2 border rounded flex-1"
                  type="text"
                  onChange={(e) => setBio({ ...bio, location: e.target.value })}
                  placeholder="Locaton"
                  value={bio?.location}
                />
              </div>
            </div>
            <div className="flex justify-center gap-4">
              <button className="save" onClick={handleSaveBio}>
                Save
              </button>
              <button
                className="cancel"
                onClick={() => {
                  setIsBioEditing(false);
                  setBio(null);
                }}
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
                  onChange={(e) =>
                    setAward({ ...award, image: e.target.value })
                  }
                  value={award?.image}
                />
              </div>
              <div className="flex">
                <p className="w-16">Title</p>
                <input
                  className="px-2 border rounded flex-1"
                  type="text"
                  onChange={(e) =>
                    setAward({ ...award, title: e.target.value })
                  }
                  placeholder="Title"
                  value={award?.title}
                />
              </div>
              <div className="flex">
                <p className="w-16">Year</p>
                <input
                  className="px-2 border rounded flex-1"
                  type="text"
                  onChange={(e) => setAward({ ...award, year: e.target.value })}
                  placeholder="Year"
                  value={award?.year}
                />
              </div>
            </div>
            <div className="flex justify-center gap-4">
              <button className="save" onClick={handleSaveAward}>
                Save
              </button>
              <button
                className="cancel"
                onClick={() => {
                  setIsAwardEditing(false);
                  setBio(null);
                }}
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
              src={profile}
              alt="profile"
              className="w-full h-full object-cover"
            />
          </div>
          {isLoggedIn && (
            <button
              onClick={() => setImageEditing(true)}
              className="save text-white"
            >
              Change Picture
            </button>
          )}
          <div className="text-center">
            <p className="font-bold text-xl">{about?.name}</p>
            {isLoggedIn && (
              <button onClick={() => setIsBioEditing(true)} className="save">
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
                {isLoggedIn && (
                  <div className="flex justify-center gap-4">
                    <button
                      className="fas fa-edit text-green-500"
                      onClick={() =>
                        handleBioUpdateButton(
                          d.id,
                          d.name,
                          d.company,
                          d.location
                        )
                      }
                    ></button>
                    <button
                      className="fas fa-trash text-red-400"
                      onClick={() => handleBioDelete(d.id)}
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
                onClick={handleSaveClick}
              >
                Save
              </button>
              <button
                className="border px-4 py-1 mb-4 rounded"
                onClick={handleCancelClick}
              >
                Cancel
              </button>
            </div>
          ) : (
            <div>
              <p className="text-justify mb-4 whitespace-pre-line">
                {about?.bio}
              </p>
              {isLoggedIn && (
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

          {isLoggedIn && (
            <button onClick={handleCarouselImage} className="edit">
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
        {isLoggedIn && (
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
            {isLoggedIn && (
              <div className="flex gap-4 h-fit my-auto">
                <button
                  className="fas fa-edit text-green-500"
                  onClick={() => handleUpdateAward(a.id, a.title, a.year)}
                ></button>
                <button
                  className="fas fa-trash text-red-400"
                  onClick={() => handleDeleteAward(a.id)}
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
