import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import DeleteModal from "./DeleteModal";
import { useState } from "react";
import { deleteMembership } from "../redux/admin/membership-slice";
import { getHomePageData } from "../redux/admin/about-slice";

const Membership = ({ handleUpdateMembership }) => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { homePageData, isLoading } = useSelector((state) => state.about);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null); // ✅ store membership ID

  const settings = {
    dots: true,
    infinite: homePageData?.memberships?.length > 3,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 3000,
    slidesToShow: 3,
    slidesToScroll: 1,
    pauseOnHover: true,
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  const handleDelete = () => {
    dispatch(deleteMembership(selectedId)).then((res) => {
      if (res.payload?.success) {
        dispatch(getHomePageData());
      }
    });

    setOpenDeleteModal(false);
    setSelectedId(null);
  };

  return (
    <div className="w-full overflow-hidden py-10 mt-4">
      <Slider {...settings}>
        {homePageData?.memberships?.map((item, idx) => (
          <div key={idx} className="px-3">
            <div className="relative w-full h-40 md:h-48 overflow-hidden rounded-xl group shadow-md bg-white border border-gray-200 flex items-center justify-center">
              <img
                src={item.imageLink}
                alt="membership"
                className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105 bg-white"
              />

              {/* Hover overlay text */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white text-sm font-semibold transition-opacity duration-300 space-y-2">
                {item.hoverText}

                {/* Show Edit & Delete buttons only if authenticated */}
                {isAuthenticated && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdateMembership(item)} // ✅ call update handler
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-xs transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setSelectedId(item._id);
                        setOpenDeleteModal(true);
                      }}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-xs transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Delete Modal */}
      {isAuthenticated && openDeleteModal && (
        <DeleteModal
          onClose={() => {
            setOpenDeleteModal(false);
            setSelectedId(null);
          }}
          handleDelete={handleDelete} // will use selectedId inside handleDelete
        />
      )}
    </div>
  );
};

export default Membership;
