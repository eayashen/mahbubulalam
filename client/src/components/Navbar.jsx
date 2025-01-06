import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import scholar from "../images/scholar.png";
import { useSelector, useDispatch } from "react-redux";
import { setValue } from "../redux/isLoggedIn";
import { setToken } from "../redux/loginData";
// import cv from "../CV of Mahbub-Ul Alam_31 Jan 2023.pdf";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn.value);
  const dispatch = useDispatch();
  const [showSubmenu, setShowSubmenu] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [PDFEditing, setPDFEditing] = useState(false);
  const [CV, setCV] = useState(null);
  const access_token = useSelector((state) => state.loginData.accessToken);
  const Links = [
    { name: "About Me", link: "/" },
    { name: "Research", link: "/research" },
    {
      name: "Publications",
      // link: "",
      submenu: [
        { name: "Journal Article", link: "/journal" },
        { name: "Working Paper", link: "/working-paper" },
        { name: "Policy", link: "/policy" },
      ],
    },
    { name: "Funding History", link: "/fundinghistory" },
    { name: "Contact", link: "/contact" },
  ];
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [about, setAbout] = useState();
  const [isMottoEditing, setIsMottoEditing] = useState(false);
  const [motto, setMotto] = useState();

  const handleScroll = () => {
    // console.log(window.scrollY)
    if (window.scrollY === 0) {
      setIsSticky(false);
    } else {
      setIsSticky(true);
    }
  };

  const test = () => {
    console.log(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    fetchData();
    // fetchCV();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://13.232.229.42:8000/api/v1/about");
      const jsonData = await response.json();
      setAbout(jsonData[0]);
    } catch (error) {
      console.log("Error fetching data:", error);
      // setLoading(false);
    }
  };

  const fetchCV = async () => {
    try {
      const response = await fetch(
        "http://13.232.229.42:8000/api/v1/cv/uploads/cv.pdf"
      );

      if (!response.ok) {
        console.log("Error fetching data");
      }

      const pdfBlob = await response.blob();
      const pdfUrl = URL.createObjectURL(pdfBlob);
      setCV(pdfUrl);
    } catch (error) {
      console.log("Error fetching data:", error);
      // setLoading(false);
    }
  };

  const handleMotto = () => {
    setMotto(about?.motto);
    setIsMottoEditing(true);
  };

  const handleDownloadClick = () => {
    // const url = `https://drive.google.com/file/d/15huhSUMEz8b8W_tjPe2f1ioG3H69NfdV/view?usp=drive_link`;
    window.open(CV, "_blank");
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
              name: about?.name,
              motto: motto,
              bio: about?.bio,
            },
            null,
            2
          ),
        });

        if (response.ok) {
          fetchData();
          console.log("Data updated successfully");
        } else {
          console.log("Error updating data");
        }
      } catch (error) {
        console.log("Error updating data:", error);
      }
    };

    updateData();
    fetchData();
    setIsMottoEditing(false);
  };

  const handleSaveCV = () => {
    //api call
    const apiUrl = "http://13.232.229.42:8000/api/v1/cv/uploads";

    if (!CV) {
      console.error("No pdf selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", CV, "cv.pdf");

    const headers = {
      Accept: "application/json",
      // "Content-Type": "application/pdf",
    };

    const requestOptions = {
      method: "POST",
      headers,
      body: formData,
    };

    fetch(apiUrl, requestOptions)
      .then((response) => {
        if (response.ok) {
          // fetchCV();
          console.log("PDF  uploaded successfully");
        } else {
          console.error("PDF  upload failed");
        }
      })
      .catch((error) => {
        console.error("Error while uploading PDF :", error);
      });
    setCV(null);
    setPDFEditing(false);
  };

  const handleLogOut = () => {
    dispatch(setValue(false));
    dispatch(setToken(null));
  };

  return (
    <div className="w-full">
      {PDFEditing && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-25 z-10 flex justify-center items-center">
          <div className="w-96 h-fit p-4 bg-white text-black rounded space-y-4">
            <input type="file" onChange={(e) => setCV(e.target.files[0])} />
            <div className="flex justify-center gap-4">
              <button
                className="bg-blue-400 rounded px-4 py-1 text-white hover:bg-blue-500"
                onClick={handleSaveCV}
              >
                Save
              </button>
              <button
                className="bg-red-400 rounded px-4 py-1 text-white hover:bg-red-500"
                onClick={() => setPDFEditing(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex items-center justify-between lg:mx-24 mx-4 mt-4">
        <h1 className="text-3xl font-bold pb-1">{about?.name}</h1>
        {isLoggedIn && (
          <button
            onClick={() => handleLogOut()}
            className="cancel font-semibold"
          >
            Logout
          </button>
        )}
      </div>

      {isMottoEditing ? (
        <div className="md:mx-24 mx-4 flex">
          <textarea
            value={motto}
            onChange={(e) => setMotto(e.target.value)}
            className="flex-1 outline-none"
          />
          <div className="flex gap-4 h-fit">
            <button className="save" onClick={handleSaveClick}>
              Save
            </button>
            <button className="cancel" onClick={() => setIsMottoEditing(false)}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex">
          <p className="lg:mx-24 mx-4">{about?.motto}</p>
          {isLoggedIn && (
            <button onClick={handleMotto} className="fas fa-edit"></button>
          )}
        </div>
      )}
      <div className="flex mt-4 left-0 md:px-0 bg-indigo-950 z-50 h-8 relative">
        <div
          onClick={() => setOpen(!open)}
          className="absolute top-1 mr-4 pl-4 cursor-pointer md:hidden text-teal-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </div>
        <div
          className={`md:flex absolute md:static md:mt-0 mt-8 mx-2 lg:mx-24 bg-indigo-950 md:z-auto z-[-1] left-0 w-48 md:w-auto md:pl-0 pl-6 transition-all duration-500 ease-in ${
            open ? "-left-4 " : "left-[-250px]"
          }`}
        >
          {Links.map((link) => (
            <div
              key={link.name}
              className="relative inline-block" // Add this class to create a relative container
              onMouseEnter={() => setShowSubmenu(link.name === "Publications")}
              onMouseLeave={() => setShowSubmenu(false)}
            >
              <Link to={link.link} className="font-semibold">
                <li
                  className={`px-2 py-1 hover:text-teal-400 list-none duration-500 ${
                    location.pathname === link.link
                      ? "text-teal-400"
                      : "text-white"
                  }`}
                  onClick={() => {
                    if (link.name !== "Publications") {
                      setOpen(false);
                    }
                  }}
                >
                  {link.name}
                </li>
              </Link>
              {link.name === "Publications" && showSubmenu && (
                <ul className="absolute left-0 top-8 z-10 w-32 px-2 bg-white shadow py-1">
                  {" "}
                  {link.submenu.map((submenuLink) => (
                    <li key={submenuLink.name}>
                      <Link
                        className="hover:text-teal-400"
                        to={submenuLink.link}
                        onClick={() => setOpen(false)}
                      >
                        {submenuLink.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          <div className="text-white font-semibold mt-1 pl-2 cursor-pointer flex">
            <p className="hover:text-teal-400" onClick={handleDownloadClick}>
              CV
            </p>
            {isLoggedIn && (
              <button
                onClick={() => setPDFEditing(true)}
                className="fas fa-edit pl-3 text-white hover:text-teal-400 pb-1"
              ></button>
            )}
          </div>
        </div>
        <div className="flex text-white gap-2 h-full mt-2 absolute lg:right-24 right-4">
          <a
            href="https://scholar.google.com/citations?hl=en&user=UwwIXLUAAAAJ"
            title="Google Scholer"
            className="hover:scale-125 ease duration-300"
            target="_blank"
          >
            <img className="h-5 w-5 -mt-0.5" src={scholar} alt="scholar" />
          </a>
          <a
            href="https://orcid.org/0000-0001-6940-364X"
            title="Orcid"
            className="fab fa-orcid hover:scale-125 hover:mb-2 ease duration-300"
          >
            <span className="sr-only">Orcid</span>
          </a>
          <a
            href="#"
            title="Publons"
            className="fa hover:scale-125 hover:mb-2 ease duration-300"
          >
            <b>P</b>
          </a>
          <a
            href="https://www.linkedin.com/in/mahbubalamicddrb/"
            title="LInkedin"
            className="fab fa-linkedin-in hover:scale-125 hover:mb-2 ease duration-300"
          ></a>
          <a
            href="https://twitter.com/mahbubicddrb"
            title="Twitter"
            className="fab fa-twitter hover:scale-125 hover:mb-2 ease duration-300"
          ></a>
          <a
            href="#"
            title="Instagram"
            className="fab fa-instagram hover:scale-125 hover:mb-2 ease duration-300"
          ></a>
          <a
            href="https://www.facebook.com/mahbubul.alam.79025"
            title="Facebook"
            className="fab fa-facebook-f hover:scale-125 hover:mb-2 ease duration-300"
          ></a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
