import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Triangle } from "react-loader-spinner";
import NewsAndEventsForm from "./NewsAndEventsForm";
import { useNavigate } from "react-router-dom";
import {
  getNewsAndEvents,
  addNewsAndEvents,
  updateNewsAndEvents,
  deleteNewsAndEvents,
} from "../redux/admin/news-event-slice";
import DeleteModal from "../components/DeleteModal"; // ✅ import your modal
import { Link } from "react-router-dom";

const NewsAndEvents = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);
  const { newsAndEvents } = useSelector((state) => state.newsEvent);

  const [isNewsAndEventEditing, setIsNewsAndEventEditing] = useState(false);
  const [newsAndEventData, setNewsAndEventData] = useState({});
  const [newsAndEventId, setNewsAndEventId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // ✅ modal control
  const [deleteId, setDeleteId] = useState(null); // ✅ store which ID to delete

  const initialNewsAndEvent = {
    title: "",
    description: "",
    date: "",
    image: "",
    link: "",
  };

  // ✅ handle save (add or update)
  const handleSaveNewsAndEvent = (uploadedImageUrl) => {
    if (
      newsAndEventData.title === "" ||
      newsAndEventData.description === "" ||
      newsAndEventData.date === ""
    ) {
      alert("Title, Description and Date fields are required");
      return;
    }

    const payload = { ...newsAndEventData, image: uploadedImageUrl };

    if (newsAndEventId) {
      dispatch(
        updateNewsAndEvents({ formData: payload, id: newsAndEventId })
      ).then((res) => {
        if (res.payload?.success) {
          dispatch(getNewsAndEvents());
        }
      });
    } else {
      dispatch(addNewsAndEvents(payload)).then((res) => {
        if (res.payload?.success) {
          dispatch(getNewsAndEvents());
        }
      });
    }

    setIsNewsAndEventEditing(false);
    setNewsAndEventData(initialNewsAndEvent);
    newsAndEventId && setNewsAndEventId(null);
  };

  // ✅ fetch all data
  useEffect(() => {
    dispatch(getNewsAndEvents());
  }, [dispatch]);

  // ✅ delete handler (triggered from modal confirm)
  const handleDelete = () => {
    if (!deleteId) return;
    dispatch(deleteNewsAndEvents(deleteId)).then((res) => {
      if (res.payload?.success) {
        dispatch(getNewsAndEvents());
        setShowDeleteModal(false);
        setDeleteId(null);
      }
    });
  };

  // ✅ loading spinner
  if (isLoading)
    return (
      <div className="fixed top-0 left-0 flex justify-center items-center h-full w-screen">
        <Triangle
          height="60"
          width="60"
          color="#4fa94d"
          ariaLabel="triangle-loading"
          visible={true}
        />
      </div>
    );

  const handleNewsPage = (id) => {
    navigate(`/news-events/${id}`);
  };

  return (
    <div className="mt-4 lg:mx-24 mx-4">
      {/* Edit Form */}
      {isNewsAndEventEditing && (
        <NewsAndEventsForm
          setIsNewsAndEventEditing={setIsNewsAndEventEditing}
          setNewsAndEventData={setNewsAndEventData}
          newsAndEventData={newsAndEventData}
          newsAndEventId={newsAndEventId}
          setNewsAndEventId={setNewsAndEventId}
          handleSaveNewsAndEvent={handleSaveNewsAndEvent}
          initialNewsAndEvent={initialNewsAndEvent}
        />
      )}

      {/* Header */}
      <div className="flex items-center justify-between relative">
        <h1 className="text-2xl font-bold py-4 sm:mx-auto">News and Events</h1>

        {isAuthenticated && (
          <button
            onClick={() => setIsNewsAndEventEditing(true)}
            className="edit mt-2 absolute right-0"
          >
            + Add News/Event
          </button>
        )}
      </div>

      {/* List */}
      <div className="my-12 px-4">
        {newsAndEvents.length === 0 ? (
          <p className="text-center text-gray-500">No news or events found</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsAndEvents.map((newsAndEvent) => (
              <div
                key={newsAndEvent._id}
                className="relative group rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                {/* Background Image */}
                <div
                  className="h-64 bg-cover bg-center cursor-pointer"
                  onClick={() => handleNewsPage(newsAndEvent._id)}
                  style={{
                    backgroundImage: `url(${
                      newsAndEvent.image || "/placeholder.jpg"
                    })`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="absolute bottom-4 left-4 right-4 text-white z-10">
                    <span className="text-xs bg-sky-600 px-2 py-1 rounded-sm uppercase font-semibold tracking-wide">
                      NEWS
                    </span>

                    <h3 className="text-lg font-semibold mt-2 line-clamp-2">
                      {newsAndEvent.title}
                    </h3>

                    {newsAndEvent.date && (
                      <p className="text-sm text-gray-200">
                        {new Date(newsAndEvent.date).toLocaleDateString(
                          "en-GB",
                          { day: "numeric", month: "long", year: "numeric" }
                        )}
                      </p>
                    )}
                  </div>
                </div>

                {/* Admin Actions */}
                {isAuthenticated && (
                  <div className="absolute top-2 right-2 flex gap-2 z-20">
                    <button
                      onClick={() => {
                        setIsNewsAndEventEditing(true);
                        setNewsAndEventData(newsAndEvent);
                        setNewsAndEventId(newsAndEvent._id);
                      }}
                      className="bg-yellow-500 text-white text-xs px-2 py-1 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => {
                        setShowDeleteModal(true);
                        setDeleteId(newsAndEvent._id);
                      }}
                      className="bg-red-500 text-white text-xs px-2 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ✅ Delete Confirmation Modal */}
      {showDeleteModal && (
        <DeleteModal
          handleDelete={handleDelete}
          onClose={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
};

export default NewsAndEvents;
