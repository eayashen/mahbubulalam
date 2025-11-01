import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getNewsAndEventById } from "../redux/admin/news-event-slice";
import { Triangle } from "react-loader-spinner";

const NewsAndEvent = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { newsAndEvent, isLoading } = useSelector(
    (state) => state.newsEvent
  );

  useEffect(() => {
    dispatch(getNewsAndEventById(id));
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
    <div className="py-10 xl:px-60 md:px-28 px-4  lg:mx-24 mx-4 bg-white">
      {/* Image */}
      <img
        src={newsAndEvent?.image}
        alt={newsAndEvent?.title}
        className="w-full rounded-lg shadow-md object-cover max-h-[500px]"
      />

      {/* Date */}
      <p className="text-gray-500 mt-4 text-sm">
        Posted on{" "}
        {new Date(newsAndEvent?.date).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>

      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-bold mt-2 leading-snug">
        {newsAndEvent?.title}
      </h1>

      {/* Description */}
      <p className="text-gray-700 mt-4 leading-relaxed whitespace-pre-line">
        {newsAndEvent?.description}
      </p>

      {/* Optional Link */}
      {newsAndEvent?.link && (
        <a
          href={newsAndEvent?.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-6 text-blue-600 font-medium hover:underline"
        >
          Source →
        </a>
      )}
    </div>
  );
};

export default NewsAndEvent;
