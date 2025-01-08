import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Triangle } from "react-loader-spinner";

const Research = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const access_token = useSelector((state) => state.loginData.accessToken);
  const [selectedProject, setSelectedProject] = useState(null);
  const [data, setData] = useState();
  const [researchTitle, setResearchTitle] = useState();
  const [isResearchTitleEditing, setIsResearchTitleEditing] = useState(false);
  const [publicationEditing, setPublicationEditing] = useState();
  const [ispublicationEditing, setIsPublicationEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://13.232.229.42:8000/api/v1/research");
      const jsonData = await response.json();
      setData(jsonData);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching data:", error);
      // setLoading(false);
    }
  };

  const handleViewPublications = (description) => {
    selectedProject === description
      ? setSelectedProject(null)
      : setSelectedProject(description);
  };

  const handleEdit = (id, title, description, status) => {
    setResearchTitle((prevData) => ({
      ...prevData,
      id,
      title,
      description,
      status,
    }));
    setIsResearchTitleEditing(true);
  };

  const handleSaveTitle = () => {
    if (researchTitle && researchTitle.id !== undefined) {
      const updateTitle = async () => {
        try {
          const response = await fetch(
            "http://13.232.229.42:8000/api/v1/research",
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token}`,
              },
              body: JSON.stringify(
                {
                  title: researchTitle?.title || "",
                  description: researchTitle?.description || "",
                  id: researchTitle?.id,
                  status: researchTitle?.status,
                },
                null,
                2
              ),
            }
          );

          if (response.ok) {
            fetchData();
            setResearchTitle(null);
            console.log("Data updated successfully");
          } else {
            console.log("Error updating data");
          }
        } catch (error) {
          console.log("Error updating data:", error);
        }
      };
      updateTitle();
    } else {
      const updateTitle = async () => {
        try {
          const response = await fetch(
            "http://13.232.229.42:8000/api/v1/research",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token}`,
              },
              body: JSON.stringify(
                {
                  title: researchTitle?.title || "",
                  description: researchTitle?.description || "",
                  status: researchTitle?.status || "",
                },
                null,
                2
              ),
            }
          );

          if (response.ok) {
            fetchData();
            setResearchTitle(null);
            console.log("Data updated successfully");
          } else {
            console.log("Error updating data");
          }
        } catch (error) {
          console.log("Error updating data:", error);
        }
      };
      updateTitle();
    }

    setIsResearchTitleEditing(false);
  };

  const handleTitleDelete = (id) => {
    const deleteResearch = async () => {
      try {
        const response = await fetch(
          `https://port.abirmunna.me/api/v1/research?id=${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
        if (response.ok) {
          fetchData();
          console.log("Data deleted successfully");
        } else {
          console.log("Error updating data");
        }
      } catch (error) {
        console.log("Error updating data:", error);
      }
    };
    deleteResearch();
    fetchData();
  };

  const handlePublicationsEdit = (
    id,
    research_id,
    title,
    published,
    authors,
    url
  ) => {
    setPublicationEditing((prevData) => ({
      ...prevData,
      id,
      research_id,
      title,
      published,
      authors,
      url,
    }));
    setIsPublicationEditing(true);
  };

  const handleSavePublication = () => {
    if (publicationEditing && publicationEditing?.research_id !== undefined) {
      const updatePublication = async () => {
        try {
          const response = await fetch(
            "http://13.232.229.42:8000/api/v1/publications",
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token}`,
              },
              body: JSON.stringify(
                {
                  title: publicationEditing?.title || "",
                  published: publicationEditing?.published || "",
                  authors: publicationEditing?.authors || "",
                  research_id: publicationEditing?.research_id,
                  id: publicationEditing?.id,
                  url: publicationEditing?.url,
                },
                null,
                2
              ),
            }
          );
          if (response.ok) {
            fetchData();
            setPublicationEditing(null);
            console.log("Data updated successfully");
          } else {
            console.log("Error updating data");
          }
        } catch (error) {
          console.log("Error updating data:", error);
        }
      };
      updatePublication();
    } else {
      const updatePublication = async () => {
        try {
          const response = await fetch(
            "http://13.232.229.42:8000/api/v1/publications",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token}`,
              },
              body: JSON.stringify(
                {
                  title: publicationEditing?.title || "",
                  published: publicationEditing?.published || "",
                  authors: publicationEditing?.authors || "",
                  research_id: publicationEditing?.id,
                },
                null,
                2
              ),
            }
          );

          if (response.ok) {
            fetchData();
            setPublicationEditing(null);
            console.log("Data updated successfully");
          } else {
            console.log("Error updating data");
          }
        } catch (error) {
          console.log("Error updating data:", error);
        }
      };
      updatePublication();
    }

    setIsPublicationEditing(false);
  };

  const handlePublicationDelete = (id) => {
    const deletePublication = async () => {
      try {
        const response = await fetch(
          `http://13.232.229.42:8000/api/v1/publications?id=${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
        if (response.ok) {
          fetchData();
          console.log("Data deleted successfully");
        } else {
          console.log("Error updating data");
        }
      } catch (error) {
        console.log("Error updating data:", error);
      }
    };
    deletePublication();
  };

  if (loading)
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
      {isResearchTitleEditing && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-25 z-10 flex justify-center items-center">
          <div className="sm:w-[600px] w-96 h-fit p-4 bg-white text-black rounded space-y-4">
            <div className="space-y-2">
              <div className="flex">
                <p className="w-20">Status</p>
                <select
                  className="px-2 border rounded flex-1"
                  onChange={(e) =>
                    setResearchTitle({
                      ...researchTitle,
                      status: e.target.value,
                    })
                  }
                  value={researchTitle?.status}
                >
                  <option value="">Select status</option>
                  <option value="onGoing">On Going</option>
                  <option value="previousResearch">Previous Research</option>
                </select>
              </div>
              <div className="flex">
                <p className="w-20">Title</p>
                <textarea
                  className="px-2 border rounded flex-1 max-h-32 h-20"
                  type="text"
                  onChange={(e) =>
                    setResearchTitle({
                      ...researchTitle,
                      title: e.target.value,
                    })
                  }
                  placeholder="Title"
                  value={researchTitle?.title}
                />
              </div>
              <div className="flex">
                <p className="w-20">Description</p>
                <textarea
                  className="px-2 border rounded flex-1 max-h-60 h-40"
                  type="text"
                  onChange={(e) =>
                    setResearchTitle({
                      ...researchTitle,
                      description: e.target.value,
                    })
                  }
                  placeholder="Description"
                  value={researchTitle?.description}
                />
              </div>
            </div>
            <div className="flex justify-center gap-4">
              <button className="save" onClick={handleSaveTitle}>
                Save
              </button>
              <button
                className="cancel"
                onClick={() => {
                  setIsResearchTitleEditing(false);
                  setResearchTitle(null);
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
              <div className="flex">
                <p className="w-20">Title</p>
                <input
                  className="px-2 border rounded flex-1"
                  type="text"
                  onChange={(e) =>
                    setPublicationEditing({
                      ...publicationEditing,
                      title: e.target.value,
                    })
                  }
                  placeholder="Title"
                  value={publicationEditing?.title}
                />
              </div>
              <div className="flex">
                <p className="w-20">Published</p>
                <input
                  className="px-2 border rounded flex-1"
                  type="text"
                  onChange={(e) =>
                    setPublicationEditing({
                      ...publicationEditing,
                      published: e.target.value,
                    })
                  }
                  placeholder="Published"
                  value={publicationEditing?.published}
                />
              </div>
              <div className="flex">
                <p className="w-20">Authors</p>
                <input
                  className="px-2 border rounded flex-1"
                  type="text"
                  onChange={(e) =>
                    setPublicationEditing({
                      ...publicationEditing,
                      authors: e.target.value,
                    })
                  }
                  placeholder="Authors"
                  value={publicationEditing?.authors}
                />
              </div>
              <div className="flex">
                <p className="w-20">Link</p>
                <input
                  className="px-2 border rounded flex-1"
                  type="text"
                  onChange={(e) =>
                    setPublicationEditing({
                      ...publicationEditing,
                      url: e.target.value,
                    })
                  }
                  placeholder="https://example.com"
                  value={publicationEditing?.url}
                />
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
                  setPublicationEditing(null);
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
          <button
            onClick={() => setIsResearchTitleEditing(true)}
            className="edit"
          >
            + Add Research
          </button>
        )}
      </div>
      {data?.map(
        (d) =>
          d.status === "onGoing" && (
            <div className="my-4" key={d.id}>
              <p className="text-lg font-semibold">{d.title}</p>
              <p className="whitespace-pre-line">{d.description}</p>
              {isAuthenticated && (
                <div className="flex gap-4">
                  <button
                    onClick={() =>
                      handleEdit(d.id, d.title, d.description, d.status)
                    }
                    className="fas fa-edit"
                  ></button>
                  <button
                    onClick={() => handleTitleDelete(d.id)}
                    className="fas fa-trash text-red-500"
                  ></button>
                  <button
                    onClick={() => handlePublicationsEdit(d.id)}
                    className="edit"
                  >
                    + Add Publication
                  </button>
                </div>
              )}
              <button
                onClick={() => handleViewPublications(d.description)}
                className={`border px-2 rounded my-2 ${
                  d.publications.length ? "" : "hidden"
                }`}
              >
                View Publications
              </button>
              {selectedProject === d.description &&
                d.publications.map((p) => (
                  <div key={Math.random()} className="border-b mb-4">
                    <a
                      href={p.url}
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
                          onClick={() =>
                            handlePublicationsEdit(
                              p.id,
                              p.research_id,
                              p.title,
                              p.published,
                              p.authors,
                              p.url
                            )
                          }
                          className="fas fa-edit"
                        ></button>
                        <button
                          onClick={() => handlePublicationDelete(d.id)}
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
      {data?.map(
        (d) =>
          d.status === "previousResearch" && (
            <div className="my-4" key={d.id}>
              <p className="text-lg font-semibold">{d.title}</p>
              <p className="whitespace-pre-line">{d.description}</p>
              {isAuthenticated && (
                <div className="flex gap-4">
                  <button
                    onClick={() => handleEdit(d.id, d.title, d.description)}
                    className="fas fa-edit"
                  ></button>
                  <button
                    onClick={() => handleTitleDelete(d.id)}
                    className="fas fa-trash text-red-500"
                  ></button>
                  <button
                    onClick={() => handlePublicationsEdit(d.id)}
                    className="edit"
                  >
                    + Add Publication
                  </button>
                </div>
              )}
              <button
                onClick={() => handleViewPublications(d.description)}
                className={`border px-2 rounded my-2 ${
                  d.publications.length ? "" : "hidden"
                }`}
              >
                View Publications
              </button>
              {selectedProject === d.description &&
                d.publications.map((p) => (
                  <div key={Math.random()} className="border-b mb-4">
                    <a
                      href={p.url}
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
                          onClick={() =>
                            handlePublicationsEdit(
                              p.id,
                              p.research_id,
                              p.title,
                              p.published,
                              p.authors,
                              p.url
                            )
                          }
                          className="fas fa-edit"
                        ></button>
                        <button
                          onClick={() => handlePublicationDelete(d.id)}
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
