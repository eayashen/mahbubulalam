import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Triangle } from "react-loader-spinner";
import {
  addFunding,
  deleteFunding,
  getFundings,
  updateFunding,
} from "../redux/admin/funding-slice";

const initialFormData = {
  year: "",
  title: "",
  role: "",
  awarded_amount: "",
  time_period: "",
  donor: "",
};

const FundingHistory = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { fundings, isLoading } = useSelector((state) => state.funding);
  const [formData, setFormData] = useState(initialFormData);
  const [total, setTotal] = useState(0);
  const [roleSum, setRoleSum] = useState(0);

  //---------------------Table update functionality ------------------
  const [isTableEditing, setIsTableEditing] = useState(false);
  const [editedId, setEditedId] = useState(null);

  useEffect(() => {
    dispatch(getFundings());
  }, []);

  const handleUpdate = (d) => {
    setIsTableEditing(true);
    setEditedId(d._id);
    const { year, title, role, awarded_amount, time_period, donor } = d;
    setFormData({
      year,
      title,
      role,
      awarded_amount,
      time_period,
      donor,
    });
  };

  const handleSave = () => {
    if (!formData.title || !formData.role) {
      alert("Title and Role are required fields");
      return;
    }
    if (formData && editedId) {
      dispatch(updateFunding({ formData, id: editedId })).then((res) => {
        if (res.payload?.success) {
          dispatch(getFundings());
        }
      });
    } else {
      dispatch(addFunding(formData)).then((res) => {
        if (res.payload?.success) {
          dispatch(getFundings());
        }
      });
    }
    setIsTableEditing(false);
    setFormData(initialFormData);
    editedId && setEditedId(null);
  };

  const handleDelete = (id) => {
    dispatch(deleteFunding(id)).then((res) => {
      if (res.payload?.success) {
        dispatch(getFundings());
      }
    });
  };

  useEffect(() => {
    if (fundings && fundings.length > 0) {
      const totalSum = fundings.reduce((accumulator, currentObject) => {
        return Number(accumulator) + Number(currentObject.awarded_amount);
      }, 0);
      setTotal(totalSum || 0);

      const roleSums = fundings.reduce((accumulator, currentObject) => {
        const { role, awarded_amount } = currentObject;
        accumulator[role] =
          (Number(accumulator[role]) || 0) + Number(awarded_amount);
        return accumulator;
      }, {});
      setRoleSum(roleSums);
    }
  }, [fundings]);

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
      {isTableEditing && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-25 z-50 flex justify-center items-center">
          <div className="w-96 h-fit p-4 bg-white text-black rounded space-y-4">
            <div className="space-y-2">
              <div className="flex items-center">
                <p className="w-24">Year: </p>
                <input
                  className="px-2 border rounded flex-1"
                  type="number"
                  onChange={(e) =>
                    setFormData({ ...formData, year: e.target.value })
                  }
                  value={formData?.year}
                />
              </div>
              <div className="flex items-center">
                <p className="w-24">Title</p>
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
                <p className="w-24">Role</p>
                <select
                  className="px-2 h-10 border rounded flex-1"
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  value={formData?.role}
                >
                  <option value="">Select Role</option>
                  <option value="Principal Investigator">
                    Principal Investigator
                  </option>
                  <option value="Co-Principal Investigator">
                    Co-Principal Investigator
                  </option>
                  <option value="Co-Investigator">Co-Investigator</option>
                </select>
              </div>
              <div className="flex items-center">
                <p className="w-24">Award</p>
                <input
                  className="px-2 border rounded flex-1"
                  type="number"
                  onChange={(e) =>
                    setFormData({ ...formData, awarded_amount: e.target.value })
                  }
                  placeholder="Award"
                  value={formData?.awarded_amount}
                />
              </div>
              <div className="flex items-center">
                <p className="w-24">Duration</p>
                <input
                  className="px-2 border rounded flex-1"
                  type="text"
                  onChange={(e) =>
                    setFormData({ ...formData, time_period: e.target.value })
                  }
                  placeholder="Duration"
                  value={formData?.time_period}
                />
              </div>
              <div className="flex items-center">
                <p className="w-24">Donor</p>
                <input
                  className="px-2 border rounded flex-1"
                  type="text"
                  onChange={(e) =>
                    setFormData({ ...formData, donor: e.target.value })
                  }
                  placeholder="Donor"
                  value={formData?.donor}
                />
              </div>
            </div>
            <div className="flex justify-center gap-4">
              <button className="save" onClick={handleSave}>
                Save
              </button>
              <button
                className="cancel"
                onClick={() => {
                  setIsTableEditing(false);
                  setFormData(initialFormData);
                  editedId && setEditedId(null);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <p className="text-center font-bold text-2xl my-4">Funding History</p>
      <div className="sm:flex justify-center flex-wrap py-4 hidden">
        <div className="flex-1 text-center">
          <p className="font-bold">${total.toLocaleString()}</p>
          <p className="">Total amount awarded till date</p>
        </div>
        <div className="flex-1 text-center">
          <p className="font-bold">
            ${roleSum ? (roleSum["Principal Investigator"] ?? 0).toLocaleString() : 0}
          </p>
          <p className="">As Principal Investigator (PI)</p>
        </div>
        <div className="flex-1 text-center">
          <p className="font-bold">
            ${roleSum ? (roleSum["Co-Principal Investigator"] ?? 0).toLocaleString() : 0}
          </p>
          <p className="">As Co-Principal Investigator (Co-PI)</p>
        </div>
        <div className="flex-1 text-center">
          <p className="font-bold">
            ${roleSum ? (roleSum["Co-Investigator"] ?? 0).toLocaleString() : 0}
          </p>
          <p className="">As Co-Investigator (Co-I)</p>
        </div>
      </div>
      <div className="text-right mr-10 sm:hidden">
        <p>
          Total amount awarded till date:{" "}
          <span className="font-medium">${total.toLocaleString()}</span>
        </p>
        <p>
          As Principal Investigator (PI):{" "}
          <span className="font-medium">
            ${roleSum ? (roleSum["Principal Investigator"] ?? 0).toLocaleString() : 0}
          </span>
        </p>
        <p>
          As Co-Principal Investigator (Co-PI):{" "}
          <span className="font-medium">
            ${roleSum ? (roleSum["Co-Principal Investigator"] ?? 0).toLocaleString() : 0}
          </span>
        </p>
        <p>
          As Co-Investigator (Co-I):{" "}
          <span className="font-medium">
            ${roleSum ? (roleSum["Co-Investigator"] ?? 0).toLocaleString() : 0}
          </span>
        </p>
      </div>
      <div className="my-4 overflow-x-auto">
        <div
          className={`bg-indigo-950 text-white flex p-1 ${
            isAuthenticated ? "min-w-[1096px]" : "min-w-[1016px]"
          }`}
        >
          <p className="w-10 px-1">Year</p>
          <p className="flex-1 px-4">Title</p>
          <p className="w-40 px-1">Role</p>
          <p className="w-20 px-1">Awarded Amount($)</p>
          <p className="w-40 text-center px-1">Duration</p>
          <p className="w-32 px-1">Donor</p>
          {isAuthenticated && <div className="w-20">Actions</div>}
        </div>
        {isAuthenticated && (
          <button onClick={() => setIsTableEditing(true)} className="edit mt-2">
            + Add{" "}
          </button>
        )}
        {fundings?.map((d) => (
          <div
            className={`flex border shadow p-1 my-2 bg-white ${
              isAuthenticated ? "min-w-[1096px]" : "min-w-[1016px]"
            }`}
            key={Math.random()}
          >
            <p className="w-10 px-1">{d.year}</p>
            <p className="flex-1 px-4">{d.title}</p>
            <p className="w-40 px-1">{d.role}</p>
            <p className="w-20 px-1">${Number(d.awarded_amount).toLocaleString()}</p>
            <p className="w-40 px-1">{d.time_period}</p>
            <p className="w-32 px-1">{d.donor}</p>
            {isAuthenticated && (
              <div className="flex w-20 gap-4 justify-center items-center">
                <button
                  onClick={() => handleUpdate(d)}
                  className="fas fa-edit text-green-500"
                ></button>
                <button
                  onClick={() => handleDelete(d._id)}
                  className="fas fa-trash text-red-400"
                ></button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FundingHistory;
