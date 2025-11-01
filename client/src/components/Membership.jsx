import React from "react";
import Slider from "react-slick";

import astmh_2020 from "../images/astmh_2020.png";
import GWA_2017 from "../images/GWA_2017.jpg";
import onehealthBangladesh_2015 from "../images/onehealthBangladesh_2015.png.webp";
import susana_2016 from "../images/susana_2016.png";
import WGCD_2014 from "../images/WGCD_2014.jpeg";
import WSSCC_2018 from "../images/WSSCC_2018.jpg";

const Membership = () => {
  const membership = [
    {
      imageLink: astmh_2020,
      hoverText: "Membership Since 2020",
    },
    {
      imageLink: WSSCC_2018,
      hoverText: "Membership Since 2018",
    },
    {
      imageLink: GWA_2017,
      hoverText: "Membership Since 2017",
    },
    {
      imageLink: susana_2016,
      hoverText: "Membership Since 2016",
    },
    {
      imageLink: onehealthBangladesh_2015,
      hoverText: "Membership Since 2015",
    },
    {
      imageLink: WGCD_2014,
      hoverText: "Membership Since 2014",
    }
  ];

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000, // for continuous movement
    speed: 3000, // adjust for smooth speed
    slidesToShow: 3, // number of visible slides at once
    slidesToScroll: 1,
    pauseOnHover: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="w-full overflow-hidden py-10 mt-4">
      <Slider {...settings}>
        {membership.map((item, idx) => (
          <div key={idx} className="px-3">
            <div className="relative w-full h-40 md:h-48 overflow-hidden rounded-xl group shadow-md bg-white border border-gray-200 flex items-center justify-center">
              <img
                src={item.imageLink}
                alt="membership"
                className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105 bg-white"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-sm font-semibold transition-opacity duration-300">
                {item.hoverText}
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Membership;
