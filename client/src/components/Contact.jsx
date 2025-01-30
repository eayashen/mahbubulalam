import { useState, useEffect } from "react";
import scholar from "../images/scholar.png";
import { useDispatch, useSelector } from "react-redux";
import { getContact, updateContact } from "../redux/admin/contact-slice";
import { Triangle } from "react-loader-spinner";

const initialFormData = {
  phone: "",
  phoneVisible: true,
  email: "",
  emailVisible: true,
  address: "",
  addressVisible: true,
};

const Contact = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { contact, isLoading } = useSelector((state) => state.contact);
  const { socialLinks, isLinkLoading } = useSelector(
    (state) => state.socialLinks
  );
  const [formData, setFormData] = useState(initialFormData);
  const [openModal, setOpenModal] = useState(false);

  const handleSave = () => {
    dispatch(updateContact(formData));
    setOpenModal(false);
    setFormData(initialFormData);
  };

  const handleModalOpen = () => {
    setOpenModal(true);
    if (contact) {
      const {
        phone,
        phoneVisible,
        email,
        emailVisible,
        address,
        addressVisible,
      } = contact;
      setFormData({
        phone,
        phoneVisible,
        email,
        emailVisible,
        address,
        addressVisible,
      });
    } else {
      setFormData(initialFormData);
    }
  };

  useEffect(() => {
    dispatch(getContact());
  }, []);

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
    <div className="bg-gray-200 py-20 lg:px-24 px-14">
      {openModal && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-25 z-50 flex justify-center items-center">
          <div className="w-96 h-fit p-4 bg-white text-black rounded space-y-4">
            <p className="sm:text-lg font-semibold mb-2 block">
              Contact Information
            </p>
            <div className="flex items-center">
              <input
                type="checkbox"
                onChange={(e) =>
                  setFormData({ ...formData, phoneVisible: e.target.checked })
                }
                checked={formData?.phoneVisible}
              />
              <p className="w-20 ml-2">Phone: </p>
              <input
                className="px-2 border rounded flex-1"
                type="text"
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                value={formData?.phone}
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                onChange={(e) =>
                  setFormData({ ...formData, emailVisible: e.target.checked })
                }
                checked={formData?.emailVisible}
              />
              <p className="w-20 ml-2">Email: </p>
              <input
                className="px-2 border rounded flex-1"
                type="text"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                value={formData?.email}
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    addressVisible: e.target.checked,
                  })
                }
                checked={formData?.addressVisible}
              />
              <p className="w-20 ml-2">Address: </p>
              <textarea
                className="px-2 border rounded flex-1 min-h-28"
                type="text"
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                value={formData?.address}
              />
            </div>
            <div className="flex justify-center gap-4">
              <button className="save" onClick={handleSave}>
                Save
              </button>
              <button
                className="cancel"
                onClick={() => {
                  setOpenModal(false);
                  setFormData(initialFormData);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="w-full h-fit bg-white rounded-xl lg:w-[800px] mx-auto">
        <div className="flex justif-center sm:flex-row flex-col sm:px-10">
          <div className="flex-1 flex flex-col p-6 space-y-5">
            <p className="text-2xl font-bold">Contact Info</p>
            {contact?.phoneVisible && (
              <div className="flex items-center gap-2 text-lg">
                <i className="fas fa-solid fa-phone"></i>
                <p>{contact?.phone}</p>
              </div>
            )}
            {contact?.emailVisible && (
              <div className="flex items-center gap-2 text-lg">
                <i className="fas fa-regular fa-envelope"></i>
                <p>{contact?.email}</p>
              </div>
            )}
            {contact?.addressVisible && (
              <div className="flex items-center gap-2 text-lg">
                <i className="fas fa-solid fa-location-arrow"></i>
                <p>{contact?.address}</p>
              </div>
            )}
            <div className="flex text-black gap-2 h-6 text-xl">
              {socialLinks?.scholarVisible && (
                <a
                  href={socialLinks?.scholar}
                  title="Google Scholer"
                  className="hover:scale-125 ease duration-300"
                  target="_blank"
                >
                  <img
                    className="h-5 w-5 -mt-0.5"
                    src={scholar}
                    alt="scholar"
                  />
                </a>
              )}
              {socialLinks?.orcidVisible && (
                <a
                  href={socialLinks?.orcid}
                  title="Orcid"
                  className="fab fa-orcid hover:scale-125 ease duration-300"
                  target="_blank"
                >
                  <span className="sr-only">Orcid</span>
                </a>
              )}
              {socialLinks?.publonsVisible && (
                <a
                  href={socialLinks?.publons}
                  title="Publons"
                  className="fa hover:scale-125 ease duration-300"
                  target="_blank"
                >
                  <b>P</b>
                </a>
              )}
              {socialLinks?.linkedinVisible && (
                <a
                  href={socialLinks?.linkedin}
                  title="LInkedin"
                  className="fab fa-linkedin-in hover:scale-125 ease duration-300"
                  target="_blank"
                ></a>
              )}
              {socialLinks?.twitterVisible && (
                <a
                  href={socialLinks?.twitter}
                  title="Twitter"
                  className="fab fa-twitter hover:scale-125 ease duration-300"
                  target="_blank"
                ></a>
              )}
              {socialLinks?.instagramVisible && (
                <a
                  href={socialLinks?.instagram}
                  title="Instagram"
                  className="fab fa-instagram hover:scale-125 ease duration-300"
                  target="_blank"
                ></a>
              )}
              {socialLinks?.facebookVisible && (
                <a
                  href={socialLinks?.facebook}
                  title="Facebook"
                  className="fab fa-facebook-f hover:scale-125 ease duration-300"
                  target="_blank"
                ></a>
              )}
            </div>
          </div>
          <div className="flex-1 flex flex-col p-6 space-y-3 justify-center">
            <input
              className="p-1 border outline-none w-full rounded bg-gray-100"
              type="text"
              placeholder="Enter your name"
            />
            <input
              className="p-1 border outline-none w-full rounded bg-gray-100"
              type="text"
              placeholder="Enter your valid email address"
            />
            <textarea
              className="p-1 rounded border outline-none max-w-full h-32 max-h-40 bg-gray-100"
              placeholder="Enter your message..."
            ></textarea>
            <button className="save bg-indigo-950 hover:bg-indigo-950 hover:text-teal-300 w-full">
              SEND EMAIL
            </button>
          </div>
        </div>
        {isAuthenticated && (
          <div className="flex justify-center pb-6">
            <button className="save" onClick={handleModalOpen}>
              Edit Contact
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact;
