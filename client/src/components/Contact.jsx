import React from "react";
import scholar from "../images/scholar.png";

const Contact = () => {
  return (
    <div className="bg-gray-200 py-20 lg:px-24 px-14">
      <div className="w-full h-fit bg-white rounded-xl lg:w-[800px] mx-auto">
        <div className="flex justif-center sm:flex-row flex-col px-10">
          <div className="flex-1 flex flex-col p-6 space-y-5">
            <p className="text-2xl font-bold">Contact Info</p>
            <div className="flex items-center gap-2 text-lg">
              <i className="fas fa-solid fa-phone"></i>
              <p>+880 1818-585465</p>
            </div>
            <div className="flex items-center gap-2 text-lg">
              <i className="fas fa-regular fa-envelope"></i>
              <p>mahbubalam@icddrb.org</p>
            </div>
            <div className="flex items-center gap-2 text-lg">
              <i className="fas fa-solid fa-location-arrow"></i>
              <p>
                68, Shaheed Tajuddin Ahmed Sharani, Mohakhali, Dhaka, Bangladesh
              </p>
            </div>
            <div className="flex text-black gap-2 h-6 text-xl">
              <a
                href="https://scholar.google.com/citations?hl=en&user=UwwIXLUAAAAJ"
                title="Google Scholer"
                className="hover:scale-125 ease duration-300"
              >
                <img className="h-5 w-5 -mt-0.5" src={scholar} alt="scholar" />
              </a>
              <a
                href="https://orcid.org/0000-0001-6940-364X"
                title="Orcid"
                className="fab fa-orcid hover:scale-125 ease duration-300"
              >
                <span className="sr-only">Orcid</span>
              </a>
              <a
                href="#"
                title="Publons"
                className="fa hover:scale-125 ease duration-300"
              >
                <b>P</b>
              </a>
              <a
                href="https://www.linkedin.com/in/mahbubalamicddrb/"
                title="LInkedin"
                className="fab fa-linkedin-in hover:scale-125 ease duration-300"
              ></a>
              <a
                href="https://twitter.com/mahbubicddrb"
                title="Twitter"
                className="fab fa-twitter hover:scale-125 ease duration-300"
              ></a>
              <a
                href="#"
                title="Instagram"
                className="fab fa-instagram hover:scale-125 ease duration-300"
              ></a>
              <a
                href="https://www.facebook.com/mahbubul.alam.79025"
                title="Facebook"
                className="fab fa-facebook-f hover:scale-125 ease duration-300"
              ></a>
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
      </div>
    </div>
  );
};

export default Contact;
