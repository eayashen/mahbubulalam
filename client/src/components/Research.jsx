import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Triangle } from "react-loader-spinner";
import {
  getResearch,
  addResearch,
  updateResearch,
  deleteResearch,
} from "../redux/admin/research-slice";
import {
  addPublication,
  updatePublication,
  deletePublication,
} from "../redux/admin/publication-slice";

const initialFormData = {
  title: "",
  description: "",
  status: "",
};

const initialPublicationData = {
  title: "",
  published: "",
  category: "",
  research_id: "",
  authors: "",
  link: "",
  keywords: [],
};

const Research = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { research, isLoading } = useSelector((state) => state.research);
  const [formData, setFormData] = useState(initialFormData);
  const [publicationData, setPublicationData] = useState(
    initialPublicationData
  );
  const [researchId, setResearchId] = useState(null);
  const [isResearchEditing, setIsResearchEditing] = useState(false);
  const [publicationId, setPublicationId] = useState(null);
  const [ispublicationEditing, setIsPublicationEditing] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  useEffect(() => {
    dispatch(getResearch());
  }, []);

  const handleEdit = (id, title, description, status) => {
    setResearchId(id);
    setFormData((prevData) => ({
      ...prevData,
      title,
      description,
      status,
    }));
    setIsResearchEditing(true);
  };

  const handleSaveResearch = () => {
    if (!formData.title || !formData.status) {
      alert("Title and Status are required fields");
      return;
    }
    if (formData && researchId !== null) {
      dispatch(updateResearch({ formData, id: researchId })).then((res) => {
        if (res.payload?.success) {
          dispatch(getResearch());
        }
      });
    } else {
      dispatch(addResearch(formData)).then((res) => {
        if (res.payload?.success) {
          dispatch(getResearch());
        }
      });
    }
    setIsResearchEditing(false);
    setResearchId(null);
    setFormData(initialFormData);
  };

  const handleResearchDelete = (id) => {
    dispatch(deleteResearch(id)).then((res) => {
      if (res.payload?.success) {
        dispatch(getResearch());
      }
    });
    setResearchId(null);
  };

  const handlePublicationsEdit = (id) => {
    setResearchId(id);
    setIsPublicationEditing(true);
  };

  const handleSavePublication = () => {
    if (!publicationData?.title || !publicationData?.category) {
      alert("Title and Category are required fields");
      return;
    }
    if (researchId === null) {
      alert("Please select a research to add publication");
      return;
    }
    if (researchId !== null && publicationId !== null) {
      dispatch(
        updatePublication({ formData: publicationData, id: publicationId })
      ).then((res) => {
        if (res.payload?.success) {
          dispatch(getResearch());
        }
      });
    } else {
      dispatch(
        addPublication({ ...publicationData, research_id: researchId })
      ).then((res) => {
        if (res.payload?.success) {
          dispatch(getResearch());
        }
      });
    }
    setIsPublicationEditing(false);
    setPublicationData(initialPublicationData);
    setResearchId(null);
    setPublicationId(null);
  };

  const handlePublicationDelete = (id) => {
    dispatch(deletePublication(id)).then((res) => {
      if (res.payload?.success) {
        dispatch(getResearch());
      }
    });
    setPublicationId(null);
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
      {isResearchEditing && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-25 z-10 flex justify-center items-center">
          <div className="sm:w-[600px] w-96 h-fit p-4 bg-white text-black rounded space-y-4">
            <div className="space-y-2">
              <div className="flex items-center">
                <p className="w-20">Status</p>
                <select
                  className="px-2 border rounded flex-1"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      status: e.target.value,
                    })
                  }
                  value={formData?.status}
                >
                  <option value="">Select status</option>
                  <option value="onGoing">On Going</option>
                  <option value="previousResearch">Previous Research</option>
                </select>
              </div>
              <div className="flex items-center">
                <p className="w-20">Title</p>
                <textarea
                  className="px-2 border rounded flex-1 max-h-32 h-20"
                  type="text"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      title: e.target.value,
                    })
                  }
                  placeholder="Title"
                  value={formData?.title}
                />
              </div>
              <div className="flex items-center">
                <p className="w-20">Description</p>
                <textarea
                  className="px-2 border rounded flex-1 max-h-60 h-40"
                  type="text"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    })
                  }
                  placeholder="Description"
                  value={formData?.description}
                />
              </div>
            </div>
            <div className="flex justify-center gap-4">
              <button className="save" onClick={handleSaveResearch}>
                Save
              </button>
              <button
                className="cancel"
                onClick={() => {
                  setIsResearchEditing(false);
                  setResearchId(null);
                  setFormData(initialFormData);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {ispublicationEditing && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-25 z-10 flex justify-center items-center">
          <div className="w-96 h-fit p-4 bg-white text-black rounded space-y-4">
            <div className="space-y-2">
              <div className="flex items-center">
                <p className="w-20">Title</p>
                <input
                  className="px-2 border rounded flex-1"
                  type="text"
                  onChange={(e) =>
                    setPublicationData({
                      ...publicationData,
                      title: e.target.value,
                    })
                  }
                  placeholder="Title"
                  value={publicationData?.title}
                />
              </div>
              <div className="flex items-center">
                <p className="w-20">Published</p>
                <input
                  className="px-2 border rounded flex-1"
                  type="text"
                  onChange={(e) =>
                    setPublicationData({
                      ...publicationData,
                      published: e.target.value,
                    })
                  }
                  placeholder="Site name"
                  value={publicationData?.published}
                />
              </div>
              <div className="flex items-center">
                <p className="w-20">Type</p>
                <select
                  className="px-1 border rounded flex-1 h-10"
                  onChange={(e) =>
                    setPublicationData({
                      ...publicationData,
                      category: e.target.value,
                    })
                  }
                  value={publicationData?.category || ""}
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
                    setPublicationData({
                      ...publicationData,
                      authors: e.target.value,
                    })
                  }
                  placeholder="Authors"
                  value={publicationData?.authors}
                />
              </div>
              <div className="flex items-center">
                <p className="w-20">Link</p>
                <input
                  className="px-2 border rounded flex-1"
                  type="text"
                  onChange={(e) =>
                    setPublicationData({
                      ...publicationData,
                      link: e.target.value,
                    })
                  }
                  placeholder="https://example.com"
                  value={publicationData?.link}
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
                  setPublicationData(null);
                  setPublicationId(null);
                  setResearchId(null);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <p className="text-2xl font-bold text-center my-4">Research</p>
      <div className="flex gap-4">
        <p className="text-xl font-bold bg-indigo-950 p-2 text-white w-fit">
          On Going
        </p>
        {isAuthenticated && (
          <button onClick={() => setIsResearchEditing(true)} className="edit">
            + Add Research
          </button>
        )}
      </div>
      {research?.map(
        (d) =>
          d.status === "onGoing" && (
            <div className="my-4" key={d._id}>
              <p className="text-lg font-semibold">{d.title}</p>
              <p className="whitespace-pre-line">{d.description}</p>
              {isAuthenticated && (
                <div className="flex gap-4">
                  <button
                    onClick={() =>
                      handleEdit(d._id, d.title, d.description, d.status)
                    }
                    className="fas fa-edit"
                  ></button>
                  <button
                    onClick={() => handleResearchDelete(d._id)}
                    className="fas fa-trash text-red-500"
                  ></button>
                  <button
                    onClick={() => handlePublicationsEdit(d._id)}
                    className="edit"
                  >
                    + Add Publication
                  </button>
                </div>
              )}
              {d?.publications?.length > 0 && (
                <button
                  onClick={() => setSelectedProjectId(d._id)}
                  className="border px-2 rounded my-2"
                >
                  View Publications
                </button>
              )}
              {selectedProjectId === d._id &&
                d?.publications?.map((p) => (
                  <div key={Math.random()} className="border-b p-2 mb-4">
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold hover:text-teal-500"
                    >
                      {p.title}
                    </a>
                    <p>{p.published}</p>
                    <p>{p.authors}</p>
                    {isAuthenticated && (
                      <div className="flex gap-4">
                        <button
                          onClick={() => {
                            setPublicationData(p);
                            setPublicationId(p._id);
                            setIsPublicationEditing(true);
                            setResearchId(d._id);
                          }}
                          className="fas fa-edit"
                        ></button>
                        <button
                          onClick={() => handlePublicationDelete(p._id)}
                          className="fas fa-trash text-red-500"
                        ></button>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          )
      )}
      <p className="text-xl font-bold bg-indigo-950 p-2 text-white w-fit">
        Previous Research
      </p>
      {research?.map(
        (d) =>
          d.status === "previousResearch" && (
            <div className="my-4" key={d._id}>
              <p className="text-lg font-semibold">{d.title}</p>
              <p className="whitespace-pre-line">{d.description}</p>
              {isAuthenticated && (
                <div className="flex gap-4">
                  <button
                    onClick={() =>
                      handleEdit(d._id, d.title, d.description, d.status)
                    }
                    className="fas fa-edit"
                  ></button>
                  <button
                    onClick={() => handleResearchDelete(d._id)}
                    className="fas fa-trash text-red-500"
                  ></button>
                  <button
                    onClick={() => handlePublicationsEdit(d._id)}
                    className="edit"
                  >
                    + Add Publication
                  </button>
                </div>
              )}
              {d?.publications?.length > 0 && (
                <button
                  onClick={() => setSelectedProjectId(d._id)}
                  className="border px-2 rounded my-2"
                >
                  View Publications
                </button>
              )}
              {selectedProjectId === d._id &&
                d?.publications?.map((p) => (
                  <div key={Math.random()} className="border-b mb-4">
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold hover:text-teal-500"
                    >
                      {p.title}
                    </a>
                    <p>{p.published}</p>
                    <p>{p.authors}</p>
                    {isAuthenticated && (
                      <div className="flex gap-4">
                        <button
                          onClick={() => {
                            setPublicationData(p);
                            setPublicationId(p._id);
                            setIsPublicationEditing(true);
                            setResearchId(d._id);
                          }}
                          className="fas fa-edit"
                        ></button>
                        <button
                          onClick={() => handlePublicationDelete(d._id)}
                          className="fas fa-trash text-red-500"
                        ></button>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          )
      )}
    </div>
  );
};

export default Research;
