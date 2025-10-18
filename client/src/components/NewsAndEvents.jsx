import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Triangle } from "react-loader-spinner";
import NewsAndEventsForm from "./NewsAndEventsForm";
import {
  getNewsAndEvents,
  addNewsAndEvents,
  updateNewsAndEvents,
  deleteNewsAndEvents,
} from "../redux/admin/news-event-slice";

const NewsAndEvents = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);
  const { newsAndEvents } = useSelector((state) => state.newsEvent);
  const [isNewsAndEventEditing, setIsNewsAndEventEditing] = useState(false);
  const [newsAndEventData, setNewsAndEventData] = useState({});
  const [newsAndEventId, setNewsAndEventId] = useState(null);
  const initialNewsAndEvent = {
    title: "",
    description: "",
    date: "",
    image: "",
    link: "",
  };
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

  useEffect(() => {
    dispatch(getNewsAndEvents());
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
    <div className="mt-4 lg:mx-24 mx-4">
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
      <div className="my-12 px-4">
        {newsAndEvents.length === 0 ? (
          <p className="text-center text-gray-500">No News and Events found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsAndEvents.map((newsAndEvent) => (
              <div
                key={newsAndEvent._id}
                className="relative group rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                {/* Background Image */}
                <div
                  className="h-64 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${
                      newsAndEvent.image || "/placeholder.jpg"
                    })`,
                  }}
                >
                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Content Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 text-white z-10">
                    {/* Category Tag */}
                    <span className="text-xs bg-sky-600 px-2 py-1 rounded-sm uppercase font-semibold tracking-wide">
                      {newsAndEvent.category || "NEWS"}
                    </span>

                    {/* Title */}
                    <h3 className="text-lg font-semibold mt-2">
                      {newsAndEvent.title}
                    </h3>

                    {/* Optional Date */}
                    {newsAndEvent.date && (
                      <p className="text-sm text-gray-200">
                        {new Date(newsAndEvent.date).toLocaleDateString()}
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
                        dispatch(deleteNewsAndEvents(newsAndEvent._id)).then(
                          (res) => {
                            if (res.payload?.success) {
                              dispatch(getNewsAndEvents());
                            }
                          }
                        );
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
    </div>
  );
};

export default NewsAndEvents;
