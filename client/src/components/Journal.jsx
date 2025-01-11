import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Triangle } from "react-loader-spinner";
import {
  addPublication,
  getPublications,
  updatePublication,
  deletePublication,
} from "../redux/admin/publication-slice";

const initialFormData = {
  title: "",
  published: "",
  category: "",
  authors: "",
  link: "",
  keywords: [],
};

const types = {
  journal: "Journal",
  "working-paper": "Working Paper",
  policy: "Policy",
};

const Journal = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { publications, isLoading } = useSelector((state) => state.publication);
  const [formData, setFormData] = useState(initialFormData);
  const [isPublicationEditing, setIsPublicationEditing] = useState(false);
  const [publicationId, setPublicationId] = useState(null);

  useEffect(() => {
    dispatch(getPublications(location.pathname.slice(1)));
  }, [location.pathname]);

  const handleEdit = (id, research_id, title, published, authors, url) => {
    setIsPublicationEditing(true);
  };

  const handleSavePublication = async () => {
    if (!formData.title || !formData.category) {
      alert("Title and Type are required");
      return;
    }
    if (publicationId) {
      dispatch(updatePublication({ id: publicationId, formData })).then(
        (res) => {
          if (res.payload?.success) {
            dispatch(getPublications(location.pathname.slice(1)));
          }
        }
      );
    } else {
      dispatch(addPublication(formData)).then((res) => {
        if (res.payload?.success) {
          dispatch(getPublications(location.pathname.slice(1)));
        }
      });
    }
    setIsPublicationEditing(false);
    setFormData(initialFormData);
    setPublicationId(null);
  };

  const handlePublicationsDelete = (id) => {
    dispatch(deletePublication(id)).then((res) => {
      if (res.payload?.success) {
        dispatch(getPublications(location.pathname.slice(1)));
      }
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
                  value={
                    formData?.category ||
                    (types[location.pathname.slice(1)]
                      ? location.pathname.slice(1)
                      : "")
                  }
                >
                  <option value="">Select Type</option>
                  <option value="journal">Journal</option>
                  <option value="working-paper">Working Paper</option>
                  <option value="policy">Policy</option>
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
                  placeholder="Description"
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
              <div>keywords</div>
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

      <p className="text-2xl font-bold text-center my-4">
        {types[location.pathname.slice(1)] || "Policy Briefs"}
      </p>
      {isAuthenticated && (
        <button
          className="edit"
          onClick={() => {
            setIsPublicationEditing(true);
            setFormData({
              ...formData,
              category: location.pathname.slice(1),
            });
          }}
        >
          + Add Publication
        </button>
      )}
      {publications?.map((item, index) => (
        <div key={index} className="my-4 border-b pb-2">
          <a
            href={item.link}
            className="text-xl font-semibold hover:text-teal-500"
            target="_blank"
            rel="noopener noreferrer"
          >
            {item.title}
          </a>
          <p className="text-md">{item.published}</p>
          <p className="text-sm">{item.authors}</p>
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
                onClick={() => handlePublicationsDelete(item._id)}
                className="fas fa-trash text-red-500"
              ></button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Journal;
