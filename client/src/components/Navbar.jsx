import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import scholar from "../images/scholar.png";
import { useSelector, useDispatch } from "react-redux";
import { resetTokenAndCredentials } from "../redux/auth-slice";
import AboutForm from "./AboutForm";
import { getAbout, updateAbout } from "../redux/admin/about-slice";
import FileUpload from "./FileUpload";

const initialFormData = {
  name: "",
  motto: "",
  bio: "",
};

const Navbar = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { about, isLoading } = useSelector((state) => state.about);
  const [showSubmenu, setShowSubmenu] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [cvInputOpen, setCvInputOpen] = useState(false);
  const Links = [
    { name: "About Me", link: "/" },
    { name: "Research", link: "/research" },
    {
      name: "Publications",
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
  const [showForm, setShowForm] = useState(false);
  const location = useLocation();

  const handleAboutUpdate = () => {
    dispatch(updateAbout(formData)).then((res) => {
      // if(res.payload?.success) {
      dispatch(getAbout());
    });
    setShowForm(false);
  };

  const handleFormOpen = () => {
    setShowForm(true);
    const { name, motto, bio } = about;
    setFormData({ name, motto, bio });
  };

  const handleLogOut = () => {
    dispatch(resetTokenAndCredentials());
  };

  useEffect(() => {
    dispatch(getAbout());
  }, []);

  return (
    <div className="w-full">
      {showForm && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-25 z-50 flex justify-center items-center">
          <div className="w-96 h-fit p-4 bg-white text-black rounded space-y-4">
            <p className="text-center text-lg font-semibold">
              Update About Information
            </p>
            <div className="space-y-2">
              <div className="flex items-center">
                <p className="w-24">Name: </p>
                <input
                  className="px-2 border rounded flex-1"
                  type="text"
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  value={formData?.name}
                />
              </div>
              <div className="flex items-center">
                <p className="w-24">Motto: </p>
                <input
                  className="px-2 border rounded flex-1"
                  type="text"
                  onChange={(e) =>
                    setFormData({ ...formData, motto: e.target.value })
                  }
                  value={formData?.motto}
                />
              </div>
              <div className="flex items-center">
                <p className="w-24">Bio: </p>
                <textarea
                  className="px-2 border rounded flex-1 "
                  type="text"
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
                  value={formData?.bio}
                />
              </div>
            </div>
            <div className="flex justify-center gap-4">
              <button className="save" onClick={handleAboutUpdate}>
                Save
              </button>
              <button
                className="cancel"
                onClick={() => {
                  setShowForm(false);
                  setFormData(initialFormData);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {cvInputOpen && (
        <FileUpload
          setOpenModal={() => setCvInputOpen(!cvInputOpen)}
          name={"cv"}
          api={"upload-cv"}
        />
      )}
      <div className="flex items-center justify-between lg:mx-24 mx-4 mt-4">
        <h1 className="text-3xl font-bold pb-1">{about?.name}</h1>
        {isAuthenticated && (
          <button
            onClick={() => handleLogOut()}
            className="cancel font-semibold"
          >
            Logout
          </button>
        )}
      </div>

      <div className="flex">
        <p className="lg:mx-24 mx-4">
          {about?.motto || "akfbsefrj ejhfvjehf jsveshf js"}
        </p>
        {isAuthenticated && (
          <button className="fas fa-edit" onClick={handleFormOpen}></button>
        )}
      </div>

      <div className="flex mt-4 left-0 md:px-0 bg-indigo-950 z-30 h-8 relative">
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
            <p
              className="hover:text-teal-400"
              onClick={() => {
                if (about?.cv) {
                  window.open(about.cv, "_blank"); // Opens the CV in a new tab
                } else {
                  alert("CV is not available.");
                }
              }}
            >
              CV
            </p>
            {isAuthenticated && (
              <button
                className="fas fa-edit pl-3 text-white hover:text-teal-400 pb-1"
                onClick={() => setCvInputOpen(true)}
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
