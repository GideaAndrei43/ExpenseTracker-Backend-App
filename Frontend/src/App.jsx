import './App.css';
import React, { useEffect, useState } from 'react';
import { FaTrash, FaEdit, FaWindowClose } from 'react-icons/fa';
import { PieChart } from '@mui/x-charts/PieChart';
import { publicRequest } from './requestMethods';

function App() {
  const [label, setLabel] = useState('');
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState('');
  const [updatedId, setUpdatedId] = useState('');
  const [updatedLabel, setUpdatedLabel] = useState('');
  const [updatedAmount, setUpdatedAmount] = useState('');
  const [updatedDate, setUpdatedDate] = useState('');
  const [expenses, setExpenses] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');

  const [showAddExpense, setShowAddExpense] = useState(false);
  const [showExpenseReport, setShowExpenseReport] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const handleShowEdit = (id) => {
    setShowEdit(!showEdit);
    setUpdatedId(id);
  };

  const handleUpdateExpense = async () => {
    if (updatedId) {
      try {
        await publicRequest.put(`/expenses/${updatedId}`, {
          value: updatedAmount,
          label: updatedLabel,
          date: updatedDate,
        });
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleExpenseReport = () => {
    setShowExpenseReport(!showExpenseReport);
  };

  const handleAddExpense = () => {
    setShowAddExpense(!showAddExpense);
  };

  const handleExpense = async () => {
    try {
      await publicRequest.post('/expenses', {
        label,
        date,
        value: amount,
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getExpenses = async () => {
      try {
        const res = await publicRequest.get('./expenses');
        setExpenses(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getExpenses();
  }, []);

  const handleDelete = async (id) => {
    try {
      await publicRequest.delete(`/expenses/${id}`);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const filteredExpenses = expenses.filter((item) =>
    item.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.date.includes(searchTerm) ||
    item.value.toString().includes(searchTerm)
  );

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
              <label className="mt-[10px] font-semibold text-[18px]">Name</label>
              <input
                type="text"
                placeholder="Start typing"
                className="border-[#555] p-[10px]"
                onChange={(e) => setLabel(e.target.value)}
              />
              <label className="mt-[10px] font-semibold text-[18px]">Date</label>
              <input
                type="date"
                className="border-[#555] p-[10px]"
                onChange={(e) => setDate(e.target.value)}
              />
              <label className="mt-[10px] font-semibold text-[18px]">Amount</label>
              <input
                type="number"
                className="border-[#555] p-[10px]"
                onChange={(e) => setAmount(e.target.value)}
              />
              <button
                className="brown-button text-[#ffff] p-[10px] border-none cursor-pointer my-[10px]"
                onClick={handleExpense}
              >
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
                    data: expenses,
                    innerRadius: 0,
                    outerRadius: 80,
                    paddingAngle: 5,
                    cornerRadius: 5,
                    startAngle: -45,
                    endAngle: 225,
                    cx: '50%',
                    cy: '50%',
                    label: { fontSize: '10px', fontWeight: 'normal' },
                  },
                ]}
              />
            </div>
          )}

          <div>
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-[10px] w-[150px] border-2 border-[#444] border-solid"
            />
          </div>
        </div>

        <div className="flex flex-col ">
          {filteredExpenses.map((item, index) => (
            <div
              className="relative flex justify-between items-center w-[80vw] h-[100px] chenar my-[20px] py-[10px]"
              key={index}
            >
              <h2 className="m-[20px] text-[18px] font-medium">{item.label}</h2>
              <span className="m-[20px] text-[18px] ">{item.date}</span>
              <span className="m-[20px] text-[18px] font-medium">
                {item.value}$
              </span>
              <div className="m-[20px]">
                <FaTrash
                  className="text-[#ff0000] mr-[10px] mb-[5px] cursor-pointer"
                  onClick={() => handleDelete(item._id)}
                />
                <FaEdit
                  className="mr-[10px] mb-[5px] cursor-pointer"
                  onClick={() => handleShowEdit(item._id)}
                />
              </div>
            </div>
          ))}
        </div>

        {showEdit && (
          <div className="absolute z-[999] flex flex-col p-[10px] top-[25%] right-[0px] h-[270px] w-[300px] bg-[#ffff] shadow-xl">
            <FaWindowClose
              className="flex justify-end items-end text-3xl text-red cursor-pointer"
              onClick={handleShowEdit}
            />
            <label className="mt-[10px] font-semibold text-[18px]">Name</label>
            <input
              type="text"
              placeholder="Start typing"
              className="border-[#555] p-[10px]"
              onChange={(e) => setUpdatedLabel(e.target.value)}
            />
            <label className="mt-[10px] font-semibold text-[18px]">Date</label>
            <input
              type="date"
              className="border-[#555] p-[10px]"
              onChange={(e) => setUpdatedDate(e.target.value)}
            />
            <label className="mt-[10px] font-semibold text-[18px]">Amount</label>
            <input
              type="number"
              className="border-[#555] p-[10px]"
              onChange={(e) => setUpdatedAmount(e.target.value)}
            />
            <button
              className="brown-button text-[#ffff] p-[10px] border-none cursor-pointer my-[10px]"
              onClick={handleUpdateExpense}
            >
              Edit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
