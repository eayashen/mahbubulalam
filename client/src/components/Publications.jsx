import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPublications,
  addPublication,
  updatePublication,
  deletePublication,
} from "../redux/admin/publication-slice";
import { Triangle } from "react-loader-spinner";
import { Link } from "react-router-dom";
import DeleteModal from "./DeleteModal";
import Counter from "./CountsDisplay";

const initialFormData = {
  title: "",
  published: "",
  category: "",
  authors: "",
  link: "",
  keywords: [],
};

const types = {
  journal: "JOURNAL ARTICLE",
  "working-paper": "WORKING PAPER",
  policy: "POLICY BRIEF",
};

const Publications = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { publications, counts, isLoading } = useSelector(
    (state) => state.publication
  );
  const [formData, setFormData] = useState(initialFormData);
  const [isPublicationEditing, setIsPublicationEditing] = useState(false);
  const [publicationId, setPublicationId] = useState(null);
  const [key, setKey] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getAllPublications());
  }, [dispatch]);

  const handleSavePublication = async () => {
    if (!formData.title || !formData.category) {
      alert("Title and Type are required");
      return;
    }
    if (publicationId) {
      dispatch(updatePublication({ id: publicationId, formData })).then(
        (res) => {
          if (res.payload?.success) {
            dispatch(getAllPublications());
          }
        }
      );
    } else {
      dispatch(addPublication(formData)).then((res) => {
        if (res.payload?.success) {
          dispatch(getAllPublications());
        }
      });
    }
    setIsPublicationEditing(false);
    setFormData(initialFormData);
    setPublicationId(null);
  };

  const handlePublicationsDelete = () => {
    dispatch(deletePublication(publicationId)).then((res) => {
      if (res.payload?.success) {
        dispatch(getAllPublications());
      }
    });
    setIsDeleteModalOpen(false);
    setPublicationId(null);
  };

  const addItem = () => {
    if (key === "") return;
    setFormData({
      ...formData,
      keywords: [...formData.keywords, key],
    });
    setKey("");
  };

  const removeItem = (value) => {
    setFormData({
      ...formData,
      keywords: formData.keywords.filter((keyword) => keyword !== value),
    });
  };

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
    <div className="lg:mx-24 mx-4">
      {isDeleteModalOpen && (
        <DeleteModal
          onClose={() => setIsDeleteModalOpen(false)}
          handleDelete={handlePublicationsDelete}
        />
      )}

      {isPublicationEditing && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-25 z-10 flex justify-center items-center">
          <div className="w-96 h-fit p-4 bg-white text-black rounded space-y-4">
            <div className="space-y-2">
              <div className="flex items-center">
                <p className="w-20">Title</p>
                <input
                  className="px-2 border rounded flex-1"
                  type="text"
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Title"
                  value={formData?.title}
                />
              </div>
              <div className="flex items-center">
                <p className="w-20">Published</p>
                <input
                  className="px-2 border rounded flex-1"
                  type="text"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      published: e.target.value,
                    })
                  }
                  placeholder="Site name"
                  value={formData?.published}
                />
              </div>
              <div className="flex items-center">
                <p className="w-20">Type</p>
                <select
                  className="px-1 border rounded flex-1 h-10"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      category: e.target.value,
                    })
                  }
                  value={formData?.category || ""}
                >
                  <option value="">Select Type</option>
                  <option value="journal">Journal</option>
                  <option value="working-paper">Working Paper</option>
                  <option value="policy">Policy Brief</option>
                </select>
              </div>
              <div className="flex items-center">
                <p className="w-20">Authors</p>
                <input
                  className="px-2 border rounded flex-1"
                  type="text"
                  onChange={(e) =>
                    setFormData({ ...formData, authors: e.target.value })
                  }
                  placeholder="Authors"
                  value={formData?.authors}
                />
              </div>
              <div className="flex items-center">
                <p className="w-20">Link</p>
                <input
                  className="px-2 border rounded flex-1"
                  type="text"
                  onChange={(e) =>
                    setFormData({ ...formData, link: e.target.value })
                  }
                  placeholder="https://example.com"
                  value={formData?.link}
                />
              </div>
              <div>
                <div className="flex items-center">
                  <p className="w-20">Keywords</p>
                  <input
                    type="text"
                    className="px-2 border rounded flex-1"
                    placeholder="Bold Name"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                  />
                  <button className="ml-2 save py-2" onClick={(e) => addItem()}>
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  {formData?.keywords?.map((keyword) => (
                    <div
                      key={Math.random()}
                      className="border px-2 py-1 rounded-sm"
                    >
                      {keyword}
                      <button
                        onClick={() => removeItem(keyword)}
                        className="ml-2 text-red-500"
                      >
                        x
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-center gap-4">
              <button className="save" onClick={handleSavePublication}>
                Save
              </button>
              <button
                className="cancel"
                onClick={() => {
                  setIsPublicationEditing(false);
                  setFormData(initialFormData);
                  setPublicationId(null);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {isAuthenticated && (
        <button
          className="edit mt-4"
          onClick={() => {
            setIsPublicationEditing(true);
          }}
        >
          + Add Publication
        </button>
      )}

      <div className="flex flex-wrap justify-center max-w-screen-lg w-full mx-auto">
        <h1 className="text-center w-full pt-4 font-bold text-2xl  text-slate-800 ">
          Publications
        </h1>
        {counts?.map((item, index) => (
          <div
            key={index}
            className="p-4 rounded w-48 sm:my-4 lg:mx-10 text-center cursor-pointer"
            onClick={() => {
              const section = document.getElementById(
                `section-${item.category}`
              );
              if (section) {
                const navbarHeight = 150;
                const sectionTop = section.offsetTop;
                window.scrollTo({
                  top: sectionTop - navbarHeight,
                  behavior: "smooth",
                });
              }
            }}
          >
            <Counter count={item.count} />
            <p className="font-bold text-gray-500 hover:underline">
              {types[item.category]}
            </p>
          </div>
        ))}
      </div>
      <hr />

      {publications?.map((item, index) => (
        <div
          key={index}
          id={`section-${item.category}`} // Assign category ID here
          className="my-4 border-b pb-4 space-y-1"
        >
          <p className="text-xs font-bold text-gray-500 mb-1">
            {types[item.category]}
          </p>
          <Link
            to={item.link}
            target="_blank"
            className="text-lg text-slate-700 font-semibold hover:underline"
          >
            {item.title}
          </Link>
          <p className="text-sm text-gray-500 italic">{item.published}</p>
          <p className="text-slate-700">
            {item.authors.split(",").map((author, index) => {
              const trimmedAuthor = author.trim();
              const isKeyword = item.keywords.some(
                (keyword) =>
                  keyword.toLowerCase() === trimmedAuthor.toLowerCase()
              );

              return (
                <span key={index}>
                  {isKeyword ? <strong>{trimmedAuthor}</strong> : trimmedAuthor}
                  {index !== item.authors.split(",").length - 1 && ", "}
                </span>
              );
            })}
          </p>

          {isAuthenticated && (
            <div className="flex gap-4">
              <button
                onClick={() => {
                  setFormData(item);
                  setPublicationId(item._id);
                  setIsPublicationEditing(true);
                }}
                className="fas fa-edit"
              ></button>
              <button
                onClick={() => {
                  setPublicationId(item._id);
                  setIsDeleteModalOpen(true);
                }}
                className="fas fa-trash text-red-500"
              ></button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Publications;
