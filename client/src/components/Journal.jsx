import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Triangle } from "react-loader-spinner";

const Journal = () => {
  const location = useLocation();
  const isLoggedIn = useSelector((state) => state.isLoggedIn.value);
  const access_token = useSelector((state) => state.loginData.accessToken);
  const [journal, setJournal] = useState([]);
  const [isJournalEditing, setIsJournalEditing] = useState(false);
  const [tempJournal, setTempJournal] = useState(null);
  const [addPublication, setAddPublication] = useState(false);
  const [pathname, setPathname] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData(location.pathname.slice(1));
    setPathname(location.pathname.slice(1));
  }, [location.pathname]);

  const fetchData = async (path) => {
    try {
      setLoading(true); // Set loading state to true before fetching
      const response = await fetch(
        "http://13.232.229.42:8000/api/v1/publications"
      );
      const data = await response.json();

      // Simulate some delay to see the loading state in action
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setJournal(data.filter((item) => item.publications_type === path));
      setLoading(false); // Set loading state to false after fetching
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false); // Set loading state to false in case of error
    }
  };

  const handleEdit = (id, research_id, title, published, authors, url) => {
    setTempJournal((prevData) => ({
      ...prevData,
      id,
      research_id,
      title,
      published,
      authors,
      url
    }));
    setIsJournalEditing(true);
  };

  const handleSavePublication = async () => {
    try {
      const response = await fetch(
        `http://13.232.229.42:8000/api/v1/publications?id=${tempJournal.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
          body: JSON.stringify(
            {
              title: tempJournal?.title || "",
              published: tempJournal?.published || "",
              authors: tempJournal?.authors || "",
              id: tempJournal?.id,
              url: tempJournal?.url || "",
            },
            null,
            2
          ),
        }
      );
      if (response.ok) {
        fetchData(location.pathname.slice(1));
        console.log("Data updated successfully");
        setIsJournalEditing(false);
      } else {
        console.log("Error updating data");
      }
    } catch (error) {
      console.log("Error updating data:", error);
    }
  };

  const handleJournalAdd = async () => {
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
              title: tempJournal?.title || "",
              published: tempJournal?.published || "",
              authors: tempJournal?.authors || "",
              publications_type: tempJournal?.publications_type || "",
              url: tempJournal?.url || "",
            },
            null,
            2
          ),
        }
      );
      if (response.ok) {
        fetchData(location.pathname.slice(1));
        console.log("Data added successfully");
        setAddPublication(false);
      } else {
        console.log("Error adding data");
      }
    } catch (error) {
      console.log("Error adding data:", error);
    }
  };

  const handleJournalDelete = (id) => {
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
          fetchData(location.pathname.slice(1));
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
      {isJournalEditing && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-25 z-10 flex justify-center items-center">
          <div className="w-96 h-fit p-4 bg-white text-black rounded space-y-4">
            <div className="space-y-2">
              <div className="flex">
                <p className="w-20">Title</p>
                <input
                  className="px-2 border rounded flex-1"
                  type="text"
                  onChange={(e) =>
                    setTempJournal({ ...tempJournal, title: e.target.value })
                  }
                  placeholder="Title"
                  value={tempJournal?.title}
                />
              </div>
              <div className="flex">
                <p className="w-20">Published</p>
                <input
                  className="px-2 border rounded flex-1"
                  type="text"
                  onChange={(e) =>
                    setTempJournal({
                      ...tempJournal,
                      published: e.target.value,
                    })
                  }
                  placeholder="Description"
                  value={tempJournal?.published}
                />
              </div>
              <div className="flex">
                <p className="w-20">Authors</p>
                <input
                  className="px-2 border rounded flex-1"
                  type="text"
                  onChange={(e) =>
                    setTempJournal({ ...tempJournal, authors: e.target.value })
                  }
                  placeholder="Description"
                  value={tempJournal?.authors}
                />
              </div>
              <div className="flex">
                <p className="w-20">Link</p>
                <input
                  className="px-2 border rounded flex-1"
                  type="text"
                  onChange={(e) =>
                    setTempJournal({ ...tempJournal, url: e.target.value })
                  }
                  placeholder="https://example.com"
                  value={tempJournal?.url}
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
                  setIsJournalEditing(false);
                  setTempJournal(null);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {addPublication && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-25 z-10 flex justify-center items-center">
          <div className="w-96 h-fit p-4 bg-white text-black rounded space-y-4">
            <div className="space-y-2">
              <div className="flex">
                <p className="w-20">Type</p>
                <select
                  className="px-1 border rounded flex-1"
                  onChange={(e) =>
                    setTempJournal({
                      ...tempJournal,
                      publications_type: e.target.value,
                    })
                  }
                  value={tempJournal?.publications_type || ""}
                >
                  <option value="">Select Type</option>
                  <option value="journal">Journal</option>
                  <option value="working-paper">Working Paper</option>
                  <option value="policy">Policy</option>
                </select>
              </div>
              <div className="flex">
                <p className="w-20">Title</p>
                <input
                  className="px-2 border rounded flex-1"
                  type="text"
                  onChange={(e) =>
                    setTempJournal({ ...tempJournal, title: e.target.value })
                  }
                  placeholder="Title"
                  value={tempJournal?.title || ""}
                />
              </div>
              <div className="flex">
                <p className="w-20">Published</p>
                <input
                  className="px-2 border rounded flex-1"
                  type="text"
                  onChange={(e) =>
                    setTempJournal({
                      ...tempJournal,
                      published: e.target.value,
                    })
                  }
                  placeholder="Description"
                  value={tempJournal?.published || ""}
                />
              </div>
              <div className="flex">
                <p className="w-20">Authors</p>
                <input
                  className="px-2 border rounded flex-1"
                  type="text"
                  onChange={(e) =>
                    setTempJournal({ ...tempJournal, authors: e.target.value })
                  }
                  placeholder="Description"
                  value={tempJournal?.authors || ""}
                />
              </div>
              <div className="flex">
                <p className="w-20">Link</p>
                <input
                  className="px-2 border rounded flex-1"
                  type="text"
                  onChange={(e) =>
                    setTempJournal({ ...tempJournal, url: e.target.value })
                  }
                  placeholder="https://example.com"
                  value={tempJournal?.url || ""}
                />
              </div>
            </div>
            <div className="flex justify-center gap-4">
              <button className="save" onClick={handleJournalAdd}>
                Save
              </button>
              <button
                className="cancel"
                onClick={() => {
                  setAddPublication(false);
                  setTempJournal(null);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <p className="text-2xl font-bold text-center my-4">
        {pathname === "journal"
          ? "Journal Articals"
          : pathname === "working-paper"
          ? "Working Papers"
          : "Policy Briefs"}
      </p>
      {isLoggedIn && (
        <button className="edit" onClick={() => setAddPublication(true)}>
          + Add Publication
        </button>
      )}
      {journal?.map((item, index) => (
        <div key={index} className="my-4 border-b pb-2">
          <a href={item.url} className="text-xl font-semibold hover:text-teal-500" target="_blank" rel="noopener noreferrer">{item.title}</a>
          <p className="text-md">{item.published}</p>
          <p className="text-sm">{item.authors}</p>
          {isLoggedIn && (
            <div className="flex gap-4">
              <button
                onClick={() =>
                  handleEdit(
                    item.id,
                    item.research_id,
                    item.title,
                    item.published,
                    item.authors,
                    item.url
                  )
                }
                className="fas fa-edit"
              ></button>
              <button
                onClick={() => handleJournalDelete(item.id)}
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
