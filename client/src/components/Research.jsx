import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Triangle } from "react-loader-spinner";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import {
  getResearch,
  getPublications,
  addResearch,
  updateResearch,
  deleteResearch,
} from "../redux/admin/research-slice";
import { Accordion } from "rsuite";

const initialFormData = {
  duration: "",
  title: "",
  description: "",
  status: "",
  publications: [],
};

const Research = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { research, publications, isLoading } = useSelector(
    (state) => state.research
  );
  const [formData, setFormData] = useState(initialFormData);
  const [researchId, setResearchId] = useState(null);
  const [isResearchEditing, setIsResearchEditing] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [isPublicationSelecting, setIsPublicationSelecting] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [selectedResearch, setSelectedResearch] = useState(null);

  const filteredPublications =
    query === ""
      ? publications
      : publications.filter((p) =>
          p.title.toLowerCase().includes(query.toLowerCase())
        );

  const handleChange = (value) => {
    setSelected(value);
  };

  useEffect(() => {
    dispatch(getResearch());
    dispatch(getPublications());
  }, [dispatch]);

  const handleEdit = (id, duration, status, title, description) => {
    setResearchId(id);
    setFormData((prevData) => ({
      ...prevData,
      duration,
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

  const handleSelectPublications = (res) => {
    setResearchId(res?._id);
    setSelectedResearch(res);
    setIsPublicationSelecting(true);
  };

  const handleSavePublication = () => {
    if (!selected || !selected._id) {
      alert("Please select a publication");
      return;
    }

    const selectedPublicationId = selected._id;

    // Find the current research item by ID
    // const currentResearch = research?.find((r) => r._id === researchId);

    // if (!currentResearch) {
    //   alert("Research item not found");
    //   return;
    // }

    // Extract current publication IDs and add new one if not already present
    const existingPublications =
      selectedResearch.publications?.map((p) => p._id) || [];
    if (existingPublications.includes(selectedPublicationId)) {
      alert("Publication already added to this research");
      return;
    }

    const updatedPublications = [
      ...existingPublications,
      selectedPublicationId,
    ];

    dispatch(
      updateResearch({
        id: researchId,
        formData: {
          ...selectedResearch,
          publications: updatedPublications,
        },
      })
    ).then((res) => {
      if (res.payload?.success) {
        dispatch(getResearch());
        setIsPublicationSelecting(false);
        setSelected(null);
      }
    });
  };

  const handlePublicationDelete = (publicationId) => () => {
    const updatedPublications = selectedResearch.publications.filter(
      (p) => p._id !== publicationId
    );
    dispatch(
      updateResearch({
        id: researchId,
        formData: {
          ...selectedResearch,
          publications: updatedPublications,
        },
      })
    ).then((res) => {
      if (res.payload?.success) {
        dispatch(getResearch());
        setSelectedResearch((prev) => ({
          ...prev,
          publications: updatedPublications,
        }));
      }
    });
  };

  if (isLoading) {
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
  }

  return (
    <div className="lg:mx-24 mx-4">
      {isResearchEditing && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-25 z-10 flex justify-center items-center">
          <div className="sm:w-[600px] w-96 h-fit p-4 bg-white text-black rounded space-y-4">
            <div className="space-y-2">
              <div className="flex items-center">
                <p className="w-20">Duration</p>
                <input
                  className="px-2 border rounded flex-1"
                  type="text"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      duration: e.target.value,
                    })
                  }
                  placeholder="Duration"
                  value={formData?.duration}
                />
              </div>
              <div className="flex items-center">
                <p className="w-20">Status</p>
                <select
                  className="px-2 h-10 border rounded flex-1"
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

      {isPublicationSelecting && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-25 z-50 flex justify-center items-center">
          <div className="w-96 h-fit p-4 bg-white text-black rounded space-y-4">
            <div className="space-y-2">
              <h1 className="text-lg font-semibold text-center">
                Select Publications for Research{" "}
                {research?.publications?.length}
              </h1>
              {/* Scrollable list of selected publications */}
              <div className="max-h-80 overflow-y-auto">
                {selectedResearch?.publications?.length === 0 && (
                  <p className="text-center text-gray-500">
                    No publication selected
                  </p>
                )}
                {selectedResearch?.publications?.map((p) => (
                  <div
                    key={p._id}
                    className="flex items-center justify-between gap-2 my-2 p-2 border rounded"
                  >
                    <p className="">{p.title}</p>
                    <span
                      className="cursor-pointer text-red-500 bg-gray-100 px-2 rounded text-sm"
                      onClick={handlePublicationDelete(p._id)}
                    >
                      X
                    </span>
                  </div>
                ))}
              </div>

              <Combobox value={selected} onChange={handleChange}>
                <div className="relative">
                  <div className="relative w-full cursor-default overflow-hidden rounded border bg-white text-left shadow-md">
                    <ComboboxInput
                      className="w-full border-none py-2 pl-3 pr-10 leading-5 focus:ring-0"
                      displayValue={(p) => p?.title || ""}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search and select publication"
                    />
                    <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2">
                      {/* <ChevronDownIcon className="h-5 w-5 text-gray-400" /> */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30px"
                        height="30px"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z"
                          fill="#000000"
                        />
                      </svg>
                    </ComboboxButton>
                  </div>

                  <ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {filteredPublications.length === 0 && query !== "" ? (
                      <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                        Nothing found.
                      </div>
                    ) : (
                      filteredPublications.map((p) => (
                        <ComboboxOption
                          key={p._id}
                          value={p}
                          className={({ active }) =>
                            `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                              active
                                ? "bg-blue-100 text-blue-900"
                                : "text-gray-900"
                            }`
                          }
                        >
                          {p.title}
                        </ComboboxOption>
                      ))
                    )}
                  </ComboboxOptions>
                </div>
              </Combobox>
            </div>
            <div className="flex justify-center gap-4">
              <button className="save" onClick={handleSavePublication}>
                Add
              </button>
              <button
                className="cancel"
                onClick={() => {
                  setIsPublicationSelecting(false);
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
            <div className="my-4 border-b pb-2" key={d._id}>
              <p className="text-sm text-gray-500">{d.duration}</p>
              <p className="text-lg font-semibold">{d.title}</p>
              <p className="whitespace-pre-line">{d.description}</p>
              {isAuthenticated && (
                <div className="flex gap-4 py-1">
                  <button
                    onClick={() =>
                      handleEdit(
                        d._id,
                        d.duration,
                        d.status,
                        d.title,
                        d.description
                      )
                    }
                    className="fas fa-edit"
                  ></button>
                  <button
                    onClick={() => handleResearchDelete(d._id)}
                    className="fas fa-trash text-red-500"
                  ></button>
                  <button
                    onClick={() => handleSelectPublications(d)}
                    className="edit"
                  >
                    + Select Publication
                  </button>
                </div>
              )}
              {d?.publications?.length > 0 && (
                <button
                  onClick={() =>
                    setSelectedProjectId((prevId) =>
                      prevId === d._id ? null : d._id
                    )
                  }
                  className="border px-2 rounded my-2 bg-blue-200"
                >
                  View Publications
                </button>
              )}

              {selectedProjectId === d._id &&
                d?.publications?.map((p) => (
                  <div key={Math.random()} className="border-b py-2 mb-4 ml-6">
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold hover:text-teal-500"
                    >
                      {p.title}
                    </a>
                    <p>{p.published}</p>
                    <p>
                      {p.authors.split(" ").map((word, index) => {
                        const isKeyword = p.keywords.some(
                          (keyword) =>
                            keyword.toLowerCase() === word.toLowerCase()
                        );
                        return (
                          <span key={index}>
                            {isKeyword ? <strong>{word}</strong> : word}
                            {index !== p.authors.split(" ").length - 1 && " "}
                          </span>
                        );
                      })}
                    </p>
                    {/* {isAuthenticated && (
                      <div className="flex gap-4 py-2">
                        <button
                          // onClick={() => handlePublicationDelete(p._id)}
                          className="fas fa-trash text-red-500"
                        ></button>
                      </div>
                    )} */}
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
            <div className="my-4 border-b pb-2" key={d._id}>
              <p className="text-sm text-gray-500">{d.duration}</p>
              <p className="text-lg font-semibold">{d.title}</p>
              <p className="whitespace-pre-line">{d.description}</p>
              {isAuthenticated && (
                <div className="flex gap-4 py-1">
                  <button
                    onClick={() =>
                      handleEdit(
                        d._id,
                        d.duration,
                        d.status,
                        d.title,
                        d.description
                      )
                    }
                    className="fas fa-edit"
                  ></button>
                  <button
                    onClick={() => handleResearchDelete(d._id)}
                    className="fas fa-trash text-red-500"
                  ></button>
                  <button
                    onClick={() => handleSelectPublications(d)}
                    className="edit"
                  >
                    + Select Publication
                  </button>
                </div>
              )}
              {d?.publications?.length > 0 && (
                <button
                  onClick={() =>
                    setSelectedProjectId((prevId) =>
                      prevId === d._id ? null : d._id
                    )
                  }
                  className="border px-2 rounded my-2 bg-blue-200"
                >
                  View Publications
                </button>
              )}
              {selectedProjectId === d._id &&
                d?.publications?.map((p) => (
                  <div key={Math.random()} className="border-b mb-4 py-2 ml-6">
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold hover:text-teal-500"
                    >
                      {p.title}
                    </a>
                    <p>{p.published}</p>
                    <p>
                      {p.authors.split(" ").map((word, index) => {
                        const isKeyword = p.keywords.some(
                          (keyword) =>
                            keyword.toLowerCase() === word.toLowerCase()
                        );
                        return (
                          <span key={index}>
                            {isKeyword ? <strong>{word}</strong> : word}
                            {index !== p.authors.split(" ").length - 1 && " "}
                          </span>
                        );
                      })}
                    </p>
                    {/* {isAuthenticated && (
                      <div className="flex gap-4 py-2">
                        <button
                          // onClick={() => handlePublicationDelete(d._id)}
                          className="fas fa-trash text-red-500"
                        ></button>
                      </div>
                    )} */}
                  </div>
                ))}
            </div>
          )
      )}
    </div>
  );
};

export default Research;
