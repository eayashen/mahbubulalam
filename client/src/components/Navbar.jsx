import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import scholar from "../images/scholar.png";
import { useSelector, useDispatch } from "react-redux";
import { resetTokenAndCredentials } from "../redux/auth-slice";
import { getAbout, updateAbout } from "../redux/admin/about-slice";
import {
  getSocialLinks,
  updateSocialLinks,
} from "../redux/admin/sociallinks-slice";
import FileUpload from "./FileUpload";

const initialFormData = {
  name: "",
  motto: "",
  bio: "",
};

const initialSocialLinkData = {
  scholar: "",
  scholarVisible: "",
  orcid: "",
  orcidVisible: "",
  publons: "",
  publonsVisible: "",
  linkedin: "",
  linkedinVisible: "",
  twitter: "",
  twitterVisible: "",
  instagram: "",
  instagramVisible: "",
  facebook: "",
  facebookVisible: "",
};

const Navbar = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { about, isLoading } = useSelector((state) => state.about);
  const { socialLinks, isLinkLoading } = useSelector(
    (state) => state.socialLinks
  );
  const [showSubmenu, setShowSubmenu] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [socialLinkData, setSocialLinkData] = useState(initialSocialLinkData);
  const [cvInputOpen, setCvInputOpen] = useState(false);
  const [openSocialLinkModal, setOpenSocialModal] = useState(false);
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
    setFormData(initialFormData);
  };

  const handleFormOpen = () => {
    setShowForm(true);
    const { name, motto, bio } = about;
    setFormData({ name, motto, bio });
  };

  const handleLogOut = () => {
    dispatch(resetTokenAndCredentials());
  };

  const handleModalOpen = () => {
    setOpenSocialModal(true);

    if (socialLinks && Object.keys(socialLinks).length > 0) {
      setSocialLinkData({
        scholar: socialLinks.scholar || "",
        scholarVisible: formatBoolean(socialLinks.scholarVisible),
        orcid: socialLinks.orcid || "",
        orcidVisible: formatBoolean(socialLinks.orcidVisible),
        publons: socialLinks.publons || "",
        publonsVisible: formatBoolean(socialLinks.publonsVisible),
        linkedin: socialLinks.linkedin || "",
        linkedinVisible: formatBoolean(socialLinks.linkedinVisible),
        twitter: socialLinks.twitter || "",
        twitterVisible: formatBoolean(socialLinks.twitterVisible),
        instagram: socialLinks.instagram || "",
        instagramVisible: formatBoolean(socialLinks.instagramVisible),
        facebook: socialLinks.facebook || "",
        facebookVisible: formatBoolean(socialLinks.facebookVisible),
      });
    } else {
      setSocialLinkData(initialSocialLinkData);
    }
  };

  const formatBoolean = (value) => value === "true" || value === true;

  const handleSocialLinkUpdate = () => {
    const formattedData = {
      scholar: socialLinkData.scholar || "",
      orcid: socialLinkData.orcid || "",
      publons: socialLinkData.publons || "",
      linkedin: socialLinkData.linkedin || "",
      twitter: socialLinkData.twitter || "",
      instagram: socialLinkData.instagram || "",
      facebook: socialLinkData.facebook || "",
      scholarVisible: formatBoolean(socialLinkData.scholarVisible),
      orcidVisible: formatBoolean(socialLinkData.orcidVisible),
      publonsVisible: formatBoolean(socialLinkData.publonsVisible),
      linkedinVisible: formatBoolean(socialLinkData.linkedinVisible),
      twitterVisible: formatBoolean(socialLinkData.twitterVisible),
      instagramVisible: formatBoolean(socialLinkData.instagramVisible),
      facebookVisible: formatBoolean(socialLinkData.facebookVisible),
    };

    dispatch(updateSocialLinks(formattedData)); // Use formattedData
    setOpenSocialModal(false);
    setSocialLinkData(initialSocialLinkData);
  };

  useEffect(() => {
    dispatch(getAbout());
    dispatch(getSocialLinks());
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
                <textarea
                  className="px-2 border rounded flex-1 min-h-28"
                  type="text"
                  onChange={(e) =>
                    setFormData({ ...formData, motto: e.target.value })
                  }
                  value={formData?.motto}
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
          text="Upload CV"
        />
      )}

      {openSocialLinkModal && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-25 z-50 flex justify-center items-center">
          <div className="w-96 h-fit p-4 bg-white text-black rounded space-y-4">
            <p className="sm:text-lg font-semibold mb-2 block">
              Update Social Links
            </p>
            <div className="flex items-center">
              <input
                type="checkbox"
                onChange={(e) =>
                  setSocialLinkData({
                    ...socialLinkData,
                    scholarVisible: e.target.checked,
                  })
                }
                checked={socialLinkData?.scholarVisible}
                placeholder="Enter Scholar Link Address"
              />
              <p className="w-20 ml-2">Scholar: </p>
              <input
                className="px-2 border rounded flex-1"
                type="text"
                onChange={(e) =>
                  setSocialLinkData({
                    ...socialLinkData,
                    scholar: e.target.value,
                  })
                }
                value={socialLinkData?.scholar}
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                onChange={(e) =>
                  setSocialLinkData({
                    ...socialLinkData,
                    orcidVisible: e.target.checked,
                  })
                }
                checked={socialLinkData?.orcidVisible}
              />
              <p className="w-20 ml-2">Orcid: </p>
              <input
                className="px-2 border rounded flex-1"
                type="text"
                onChange={(e) =>
                  setSocialLinkData({
                    ...socialLinkData,
                    orcid: e.target.value,
                  })
                }
                value={socialLinkData?.orcid}
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                onChange={(e) =>
                  setSocialLinkData({
                    ...socialLinkData,
                    publonsVisible: e.target.checked,
                  })
                }
                checked={socialLinkData?.publonsVisible}
              />
              <p className="w-20 ml-2">Publons: </p>
              <input
                className="px-2 border rounded flex-1"
                type="text"
                onChange={(e) =>
                  setSocialLinkData({
                    ...socialLinkData,
                    publons: e.target.value,
                  })
                }
                value={socialLinkData?.publons}
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                onChange={(e) =>
                  setSocialLinkData({
                    ...socialLinkData,
                    linkedinVisible: e.target.checked,
                  })
                }
                checked={socialLinkData?.linkedinVisible}
              />
              <p className="w-20 ml-2">Linkedin: </p>
              <input
                className="px-2 border rounded flex-1"
                type="text"
                onChange={(e) =>
                  setSocialLinkData({
                    ...socialLinkData,
                    linkedin: e.target.value,
                  })
                }
                value={socialLinkData?.linkedin}
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                onChange={(e) =>
                  setSocialLinkData({
                    ...socialLinkData,
                    twitterVisible: e.target.checked,
                  })
                }
                checked={socialLinkData?.twitterVisible}
              />
              <p className="w-20 ml-2">Twitter: </p>
              <input
                className="px-2 border rounded flex-1"
                type="text"
                onChange={(e) =>
                  setSocialLinkData({
                    ...socialLinkData,
                    twitter: e.target.value,
                  })
                }
                value={socialLinkData?.twitter}
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                onChange={(e) =>
                  setSocialLinkData({
                    ...socialLinkData,
                    instagramVisible: e.target.checked,
                  })
                }
                checked={socialLinkData?.instagramVisible}
              />
              <p className="w-20 ml-2">Instagram: </p>
              <input
                className="px-2 border rounded flex-1"
                type="text"
                onChange={(e) =>
                  setSocialLinkData({
                    ...socialLinkData,
                    instagram: e.target.value,
                  })
                }
                value={socialLinkData?.instagram}
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                onChange={(e) =>
                  setSocialLinkData({
                    ...socialLinkData,
                    facebookVisible: e.target.checked,
                  })
                }
                checked={socialLinkData?.facebookVisible}
              />
              <p className="w-20 ml-2">Facebook: </p>
              <input
                className="px-2 border rounded flex-1"
                type="text"
                onChange={(e) =>
                  setSocialLinkData({
                    ...socialLinkData,
                    facebook: e.target.value,
                  })
                }
                value={socialLinkData?.facebook}
              />
            </div>
            <div className="flex justify-center gap-4">
              <button className="save" onClick={handleSocialLinkUpdate}>
                Save
              </button>
              <button
                className="cancel"
                onClick={() => {
                  setOpenSocialModal(false);
                  setSocialLinkData(initialSocialLinkData);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
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
        <p className="lg:mx-24 mx-4 whitespace-pre-wrap">
          {about?.motto || ""}
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
                className="pl-3 font-normal text-teal-300 hover:text-teal-400 pb-1"
                onClick={() => setCvInputOpen(true)}
              >
                Update CV
              </button>
            )}
          </div>
        </div>
        <div className="flex items-center text-white gap-2 h-full absolute lg:right-24 right-4">
          {isAuthenticated && (
            <button
              className="text-teal-300 hover:text-teal-400"
              onClick={handleModalOpen}
            >
              Update Link
            </button>
          )}
          {socialLinks?.scholarVisible && (
            <a
              href={socialLinks?.scholar}
              title="Google Scholer"
              className="hover:scale-125 ease duration-300"
              target="_blank"
            >
              <img className="h-5 w-5 -mt-0.5" src={scholar} alt="scholar" />
            </a>
          )}
          {socialLinks?.orcidVisible && (
            <a
              href={socialLinks?.orcid}
              title="Orcid"
              className="fab fa-orcid hover:scale-125 ease duration-300"
            >
              <span className="sr-only">Orcid</span>
            </a>
          )}
          {socialLinks?.publonsVisible && (
            <a
              href={socialLinks?.publons}
              title="Publons"
              className="fa hover:scale-125 ease duration-300"
            >
              <b>P</b>
            </a>
          )}
          {socialLinks?.linkedinVisible && (
            <a
              href={socialLinks?.linkedin}
              title="LInkedin"
              className="fab fa-linkedin-in hover:scale-125 ease duration-300"
            ></a>
          )}
          {socialLinks?.twitterVisible && (
            <a
              href={socialLinks?.twitter}
              title="Twitter"
              className="fab fa-twitter hover:scale-125 ease duration-300"
            ></a>
          )}
          {socialLinks?.instagramVisible && (
            <a
              href={socialLinks?.instagram}
              title="Instagram"
              className="fab fa-instagram hover:scale-125 ease duration-300"
            ></a>
          )}
          {socialLinks?.facebookVisible && (
            <a
              href={socialLinks?.facebook}
              title="Facebook"
              className="fab fa-facebook-f hover:scale-125 ease duration-300"
            ></a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
