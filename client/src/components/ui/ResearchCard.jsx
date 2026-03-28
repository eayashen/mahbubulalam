import { ArrowRight } from "lucide-react";
import onGoing from "../../images/Ongoing.jpeg";
import Previous from "../../images/Previous.jpeg";

export const ResearchCard = ({ data, type }) => {
  const hasUrl = !!data?.url;

  return (
    <div className="group relative flex gap-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">

      {/* LEFT IMAGE */}
      <div className="sm:w-[100px] w-[50px] sm:h-[141px] h-[70px] flex-shrink-0 overflow-hidden">
        <img
          src={data?.image || (type === "previous" ? Previous : onGoing)}
          alt={data?.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* RIGHT CONTENT */}
      <div className="flex flex-col justify-start py-4 pr-6 flex-1">
        <p className="text-sm text-gray-500">{data?.duration}</p>

        {/* TITLE - 1 LINE */}
        <h3 className="text-lg font-semibold sm:line-clamp-1 group-hover:line-clamp-none">
          {data?.title}
        </h3>

        {/* DESCRIPTION - 2 LINES */}
        <p className="text-gray-600 text-sm sm:line-clamp-2 group-hover:line-clamp-none mt-1">
          {data?.description}
        </p>
      </div>

      {/* HOVER "SEE MORE" */}
      {hasUrl && (
        <div className="absolute right-4 bottom-4 opacity-0 translate-x-6 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          <a
            href={data.url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-blue-600 font-medium hover:underline text-sm cursor-pointer"
          >
            View Report <ArrowRight size={16} />
          </a>
        </div>
      )}
    </div>
  );
};