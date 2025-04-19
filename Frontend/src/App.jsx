import './App.css';
import React, { useState } from 'react';
import { FaTrash, FaEdit, FaWindowClose } from 'react-icons/fa';
import { PieChart } from '@mui/x-charts/PieChart';

function App() {
  const [showAddExpense, setShowAddExpense] = useState(false);

  const [showExpenseReport, setShowExpenseReport] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const handleShowEdit=()=>{
    setShowEdit(!showEdit);
  }

  const handleExpenseReport = () => {
    setShowExpenseReport(!showExpenseReport);
  };

  const handleAddExpense = () => {
    setShowAddExpense(!showAddExpense);
  };
  return (
    <div>
      <div className="flex flex-col justify-center items-center mt-[2%] w-[80%] mr-[5%] ml-[5%] ">
        <h1 className="text-2xl font-medium  ">Check your expenses</h1>

        <div className="relative flex items-center justify-between mt-5 w-[100%]">
          <div className="relative flex justify-between width-[300px]">
            <button
              className=" brown-button p-[10px] border-none outline-none cursor-pointer text-[#fff] text-medium "
              onClick={handleAddExpense}
            >
              Add Expense
            </button>
            <button
              className="ml-[40px] blue-button p-[10px] border-none outline-none cursor-pointer text-[#fff]  text-medium "
              onClick={handleExpenseReport}
            >
              Expense Report
            </button>
          </div>
          {showAddExpense && (
            <div className="absolute z-[999] flex flex-col p-[10px] top-[50px] left-[0px] h-[270px] w-[300px] bg-[#ffff] shadow-xl">
              <FaWindowClose
                className="flex justify-end items-end text-3xl text-red cursor-pointer"
                onClick={handleAddExpense}
              />
              <label htmlFor="" className="mt-[10px] font-semibold text-[18px]">
                Name
              </label>
              <input
                type="text"
                placeholder="Start typing"
                className="border-[#555] p-[10px] "
              />

              <label htmlFor="" className="mt-[10px] font-semibold text-[18px]">
                Date
              </label>
              <input
                type="date"
                placeholder="20/05/2024"
                className="border-[#555] p-[10px] "
              />

              <label htmlFor="" className="mt-[10px] font-semibold text-[18px]">
                Amount
              </label>
              <input
                type="Number"
                placeholder="230$"
                className="border-[#555] p-[10px] "
              />
              <button className="brown-button text-[#ffff] p-[10px] border-none cursor-pointer my-[10px]">
                Add
              </button>
            </div>
          )}
          {showExpenseReport && (
            <div className="absolute z-[999] flex flex-col p-[10px] top-[50px] left-[100px] h-[270px] w-[300px] bg-[#ffff] shadow-xl">
              <FaWindowClose
                className="flex justify-end items-end text-2xl text-red cursor-pointer"
                onClick={handleExpenseReport}
              />

              <PieChart
                series={[
                  {
                    data: [
                      { id: 0, value: 10, label: 'series A' },
                      { id: 1, value: 15, label: 'series B' },
                      { id: 2, value: 20, label: 'series C' },
                    ],
                    innerRadius: 30,
                    outerRadius: 100,
                    paddingAngle: 5,
                    cornerRadius: 5,
                    startAngle: -45,
                    endAngle: 225,
                    cx: 150,
                    cy: 150,
                  },
                ]}
              />
            </div>
          )}

          <div>
            <input
              type="text"
              placeholder="Search"
              className="p-[10px] w-[150px] border-2 border-[#444] border-solid"
            />
          </div>
        </div>

        <div className="flex flex-col ">
          <div className="relative flex justify-between items-center w-[80vw] h-[100px] chenar my-[20px] py-[10px]">
            <h2 className="m-[20px] text-[18px] font-medium">Snacks</h2>
            <span className="m-[20px] text-[18px] ">20/05/2024</span>
            <span className="m-[20px] text-[18px] font-medium">18.56$</span>
            <div className="m-[20px]">
              <FaTrash className="text-[#ff0000] mr-[10px] mb-[5px] cursor-pointer" />
              <FaEdit className="mr-[10px] mb-[5px] cursor-pointer" onClick={handleShowEdit} />
            </div>
          </div>
          <div className="relative flex justify-between items-center w-[80vw] h-[100px] chenar my-[20px] py-[10px]">
            <h2 className="m-[20px] text-[18px] font-medium">
              Electricity Bill November
            </h2>
            <span className="m-[20px] text-[18px] ">20/05/2024</span>
            <span className="m-[20px] text-[18px] font-medium">8.26$</span>
            <div className="m-[20px]">
              <FaTrash className="text-[#ff0000] mr-[10px] mb-[5px] cursor-pointer" />
              <FaEdit className="mr-[10px] mb-[5px] cursor-pointer" />
            </div>
          </div>
          <div className="relative flex justify-between items-center w-[80vw] h-[100px] chenar my-[20px] py-[10px]">
            <h2 className="m-[20px] text-[18px] font-medium">
              Internet Monthly Bill-Telecom
            </h2>
            <span className="m-[20px] text-[18px] ">15/02/2024</span>
            <span className="m-[20px] text-[18px] font-medium">11.56$</span>
            <div className="m-[20px]">
              <FaTrash className="text-[#ff0000] mr-[10px] mb-[5px] cursor-pointer" />
              <FaEdit className="mr-[10px] mb-[5px] cursor-pointer" />
            </div>
          </div>
        </div>
        {showEdit && (
            <div className="absolute z-[999] flex flex-col p-[10px] top-[25%] right-[0px] h-[270px] w-[300px] bg-[#ffff] shadow-xl">
              <FaWindowClose
                className="flex justify-end items-end text-3xl text-red cursor-pointer"
                onClick={handleShowEdit}
              />
              <label htmlFor="" className="mt-[10px] font-semibold text-[18px]">
                Name
              </label>
              <input
                type="text"
                placeholder="Start typing"
                className="border-[#555] p-[10px] "
              />

              <label htmlFor="" className="mt-[10px] font-semibold text-[18px]">
                Date
              </label>
              <input
                type="date"
                placeholder="20/05/2024"
                className="border-[#555] p-[10px] "
              />

              <label htmlFor="" className="mt-[10px] font-semibold text-[18px]">
                Amount
              </label>
              <input
                type="Number"
                placeholder="230$"
                className="border-[#555] p-[10px] "
              />
              <button className="brown-button text-[#ffff] p-[10px] border-none cursor-pointer my-[10px]">
                Edit
              </button>
            </div>
          )}
      </div>
    </div>
  );
}

export default App;
