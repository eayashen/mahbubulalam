import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Triangle } from "react-loader-spinner";

const FundingHistory = () => {
    const isLoggedIn = useSelector((state) => state.isLoggedIn.value);
    const [total, setTotal] = useState(0);
    const [roleSum, setRoleSum] = useState(0);
    const access_token = useSelector((state) => state.loginData.accessToken);

    //---------------------Table update functionality ------------------
    const [isTableEditing, setIsTableEditing] = useState(false);
    const [tableRow, setTableRow] = useState(null);
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://13.232.229.42:8000/api/v1/funding');
            const jsonData = await response.json();
            setData(jsonData)
            setLoading(false);
        } catch (error) {
            console.log('Error fetching data:', error);
            // setLoading(false);
        }
    };

    const handleUpdate = (d) => {
        setIsTableEditing(true)
        setTableRow(d)
    }

    const handleSave = () => {
        if(tableRow && tableRow.id !== undefined) {
            const updateHistory = async () => {
                try {
                    const response = await fetch('http://13.232.229.42:8000/api/v1/funding', {
                        method: 'PUT',
                        headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${access_token}`,
                        },
                        body: JSON.stringify({
                            "year": tableRow?.year,
                            "title": tableRow?.title,
                            "role": tableRow?.role,
                            "awarded_amount": tableRow?.awarded_amount,
                            "time_period": tableRow?.time_period,
                            "doner": tableRow?.doner,
                            "id": tableRow?.id
                        },
                        null,
                        2
                        ),
                    });
                    
                    if (response.ok) {
                        fetchData();
                        setTableRow(null);
                        console.log('Data updated successfully');
                    } else {
                        console.log('Error updating data');
                    }
                } catch (error) {
                    console.log('Error updating data:', error);
                }
            };
            updateHistory();
        }
        else{
            const updateHistory = async () => {
                try {
                    const response = await fetch('http://13.232.229.42:8000/api/v1/funding', {
                        method: 'POST',
                        headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${access_token}`,
                        },
                        body: JSON.stringify({
                            "year": tableRow?.year || "",
                            "title": tableRow?.title || "",
                            "role": tableRow?.role || "",
                            "awarded_amount": tableRow?.awarded_amount || "",
                            "time_period": tableRow?.time_period || "",
                            "doner": tableRow?.doner || "",
                        },
                        null,
                        2
                        ),
                    });
                    
                    if (response.ok) {
                        fetchData();
                        setTableRow(null);
                        console.log('Data added successfully');
                    } else {
                        console.log('Error updating data');
                    }
                } catch (error) {
                    console.log('Error updating data:', error);
                }
            };
            updateHistory();
        }
        setIsTableEditing(false)
    }

    const handleDelete = (id) => {
        const deleteHistory = async () => {
            try {
                const response = await fetch(`http://13.232.229.42:8000/api/v1/funding?id=${id}`, {
                    method: 'DELETE',
                    headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${access_token}`,
                    },
                });
                if (response.ok) {
                    fetchData();
                    console.log('Data deleted successfully');
                } else {
                    console.log('Error updating data');
                }
            } catch (error) {
                console.log('Error updating data:', error);
            }
        };
        deleteHistory();
    }

    useEffect(() => {
        if (data && data.length > 0) {
            const totalSum = data.reduce((accumulator, currentObject) => {
                return Number(accumulator) + Number(currentObject.awarded_amount);
            }, 0);
            setTotal(totalSum || 0);
        
            const roleSums = data.reduce((accumulator, currentObject) => {
                const { role, awarded_amount } = currentObject;
                accumulator[role] = (Number(accumulator[role]) || 0) + Number(awarded_amount);
                return accumulator;
            }, {});
            setRoleSum(roleSums);
        }
    }, [data]); 
    
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
        <div className='lg:mx-24 mx-4'>
            {isTableEditing && (
                <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-25 z-10 flex justify-center items-center">
                    <div className="w-96 h-fit p-4 bg-white text-black rounded space-y-4">
                        <div className='space-y-2'>
                            <div className="flex">
                                <p className='w-24'>Year: </p>
                                <input className='px-2 border rounded flex-1' type="text" onChange={e => setTableRow({...tableRow, year: e.target.value})}  value={tableRow?.year}/>
                            </div>
                            <div className="flex">
                                <p className='w-24'>Title</p>
                                <input className='px-2 border rounded flex-1' type="text" onChange={e => setTableRow({...tableRow, title: e.target.value})}  placeholder='Title' value={tableRow?.title}/>
                            </div>
                            <div className="flex">
                                <p className='w-24'>Role</p>
                                <select
                                className="px-2 border rounded flex-1"
                                onChange={(e) => setTableRow({ ...tableRow, role: e.target.value })}
                                value={tableRow?.role}
                                >
                                    <option value="">Select Role</option>
                                    <option value="Principal Investigator">Principal Investigator</option>
                                    <option value="Co-Principal Investigator">Co-Principal Investigator</option>
                                    <option value="Co-Investigator">Co-Investigator</option>
                                </select>
                            </div>
                            <div className="flex">
                                <p className='w-24'>Award</p>
                                <input className='px-2 border rounded flex-1' type="text" onChange={e => setTableRow({...tableRow, awarded_amount: e.target.value})}  placeholder='Award' value={tableRow?.awarded_amount}/>
                            </div>
                            <div className="flex">
                                <p className='w-24'>Duration</p>
                                <input className='px-2 border rounded flex-1' type="text" onChange={e => setTableRow({...tableRow, time_period: e.target.value})}  placeholder='Duration' value={tableRow?.time_period}/>
                            </div>
                            <div className="flex">
                                <p className='w-24'>Donar</p>
                                <input className='px-2 border rounded flex-1' type="text" onChange={e => setTableRow({...tableRow, doner: e.target.value})}  placeholder='Donar' value={tableRow?.doner}/>
                            </div>
                        </div>
                        <div className="flex justify-center gap-4">
                            <button className="save" onClick={handleSave}>
                                Save
                            </button>
                            <button className="cancel" onClick={() => {setIsTableEditing(false); setTableRow(null)}}>
                                Cancel
                            </button>
                        </div> 
                    </div>
                </div>
            )}

            <p className='text-center font-bold text-2xl my-4'>Funding History</p>
            <div className="text-right mr-10">
                <p>Total amount awarded till date: <span className='font-medium'>${total}</span></p>
                <p>As Principal Investigator (PI): <span className='font-medium'>${roleSum ? roleSum['Principal Investigator'] ?? 0 : 0}</span></p>
                <p>As Co-Principal Investigator (Co-PI): <span className='font-medium'>${roleSum ? roleSum['Co-Principal Investigator'] ?? 0 : 0}</span></p>
                <p>As Co-Investigator (Co-I): <span className='font-medium'>${roleSum ? roleSum['Co-Investigator'] ?? 0 : 0}</span></p>
            </div>
            <div className="my-4 overflow-x-auto">
                <div className={`bg-indigo-950 text-white flex p-1 ${isLoggedIn ? 'min-w-[1096px]' : 'min-w-[1016px]'}`}>
                    <p className='w-10 px-1'>Year</p>
                    <p className='flex-1 px-4'>Title</p>
                    <p className='w-40 px-1'>Role</p>
                    <p className='w-20 px-1'>Awarded Amount($)</p>
                    <p className='w-40 text-center px-1'>Duration</p>
                    <p className='w-32 px-1'>Donar</p>
                    {isLoggedIn && (
                        <div className="w-20">Actions</div>
                    )}
                </div>
                {isLoggedIn && (
                    <button onClick={() => setIsTableEditing(true)} className="edit mt-2">+ Add </button>
                )}
                {
                    data?.map(d => (
                        <div className={`flex border shadow p-1 my-2 ${isLoggedIn ? 'min-w-[1096px]' : 'min-w-[1016px]'}`} key={Math.random()}>
                            <p className='w-10 px-1'>{d.year}</p>
                            <p className='flex-1 px-4'>{d.title}</p>
                            <p className='w-40 px-1'>{d.role}</p>
                            <p className='w-20 px-1'>${d.awarded_amount}</p>
                            <p className='w-40 px-1'>{d.time_period}</p>
                            <p className='w-32 px-1'>{d.doner}</p>
                            {isLoggedIn && (
                                <div className="flex w-20 gap-4 justify-center items-center">
                                    <button onClick={() => handleUpdate(d)} className="fas fa-edit text-green-500"></button>
                                    <button onClick={() => handleDelete(d.id)} className="fas fa-trash text-red-400"></button>
                                </div>
                            )}
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default FundingHistory;
