import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBasicSalary, addEarning, updateEarning, deleteEarning, addDeduction, updateDeduction, deleteDeduction, reset } from '../redux/salarySlice';
import Popup from './Popup';
import add from '../assets/add.png';
import reseticon from '../assets/reset.png';
import done from '../assets/done.png';
import clear from '../assets/clear.png';
import edit from '../assets/edit.png'

const SalaryForm = () => {
  const dispatch = useDispatch();
  const basicSalary = useSelector((state) => state.salary.basicSalary);
  const earnings = useSelector((state) => state.salary.earnings);
  const deductions = useSelector((state) => state.salary.deductions);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [editingEarningIndex, setEditingEarningIndex] = useState(null);
  const [editingEarning, setEditingEarning] = useState({ name: '', value: 0, epf: false });

  const [isPopupOpenDeduction, setIsPopupOpenDeduction] = useState(false);
  const [editingDeductionIndex, setEditingDeductionIndex] = useState(null);
  const [editingDeduction, setEditingDeduction] = useState({ name: '', value: 0, epf: false });

  const handleReset = () => {
    dispatch(reset());
  };

  // ---basic---
  const handleBasicSalaryChange = (e) => {
    dispatch(setBasicSalary(Number(e.target.value)));
  };

  // ---earnings---
  const handleAddEarning = (newEarning) => {
    dispatch(addEarning(newEarning));
  };

  const handleEditEarning = (index) => {
    setEditingEarningIndex(index);
    setEditingEarning(earnings[index]);
    setIsPopupOpen(true);
  };

  const handleUpdateEarning = (updatedEarning) => {
    dispatch(updateEarning({ index: editingEarningIndex, earning: updatedEarning }));
    setEditingEarningIndex(null);
    setEditingEarning({ name: '', value: 0, epf: false });
    setIsPopupOpen(false);
  };

  const handleDeleteEarning = (index) => {
    dispatch(deleteEarning(index));
  };

  // ---deductions---
  const handleAddDeduction = (newDeduction) => {
    dispatch(addDeduction(newDeduction));
  };

  const handleEditDeduction = (index) => {
    setEditingDeductionIndex(index);
    setEditingDeduction(deductions[index]);
    setIsPopupOpenDeduction(true);
  };

  const handleUpdateDeduction = (updatedDeduction) => {
    dispatch(updateDeduction({ index: editingDeductionIndex, deduction: updatedDeduction }));
    setEditingDeductionIndex(null);
    setEditingDeduction({ name: '', value: 0, epf: false });
    setIsPopupOpenDeduction(false);
  };

  const handleDeleteDeduction = (index) => {
    dispatch(deleteDeduction(index));
  };

  return (
    <div className=' bg-[#FAFAFA] ml-32 mt-36 p-3 rounded-none border'>
      <div className=' flex justify-between mb-2'>
        <div className=' text-xl font-bold'>Calculate Your Salary</div>
        <button onClick={handleReset} className=' text-theme-blue text-sm font-semibold flex'><img src={reseticon} width="24px" alt="add" />Reset</button>
      </div>

      <div className=' text-base font-bold'>Basic Salary</div>
      <input className=' border border-white-gray rounded bg-white py-3 px-4 h-12 w-96 ' type="number" value={basicSalary} onChange={handleBasicSalaryChange} />

      <div className=' text-base font-bold mt-2'>Earnings</div>
      <div className=' text-xs text-secondary-txt'>Allowance, Fixed Allowance, Bonus and etc.</div>

      <div>
        {earnings.map((earning, index) => (
          <div key={index} className='flex items-center space-x-2'>
            <span className='text-base flex items-center'>
              {earning.name}: {earning.value.toFixed(2)} 
              {earning.epf && (
                <>
                  <img src={done} width="16px" className="ml-1" alt="done" />
                  <span className='ml-1'>EPF/ETF</span>
                </>
              )}
            </span>
            <div className='flex items-center space-x-1'>
              <button onClick={() => handleEditEarning(index)} className="p-1 rounded-full bg-gray-200 hover:bg-gray-300">
                <img src={edit} width="16px" alt="edit" />
              </button>
              <div className="border-r border-gray-300 h-4"></div>
              <button onClick={() => handleDeleteEarning(index)} className="p-1 rounded-full bg-gray-200 hover:bg-gray-300">
                <img src={clear} width="16px" alt="delete" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <button onClick={() => setIsPopupOpen(true)} className=' text-theme-blue text-sm font-semibold flex py-3'><img src={add} width="24px" alt="add" />Add New Allowance</button>

      <Popup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSubmit={editingEarningIndex !== null ? handleUpdateEarning : handleAddEarning}
        initialData={editingEarning}
        buttonLabel={editingEarningIndex !== null ? "Update" : "Add"}
      />

      <div className=' text-base font-bold mt-2'>Deductions</div>
      <div className=' text-xs text-secondary-txt'>Salary Advances, Loan Deductions and all</div>

      <div>
        {deductions.map((deduction, index) => (
          <div key={index} className='flex items-center space-x-2'>
            <span className='text-base flex items-center'>
              {deduction.name}: {deduction.value.toFixed(2)} 
              {deduction.epf && (
                <>
                  <img src={done} width="16px" className="ml-1" alt="done" />
                  <span className='ml-1'>EPF/ETF</span>
                </>
              )}
            </span>
            <div className='flex items-center space-x-1'>
              <button onClick={() => handleEditDeduction(index)} className="p-1 rounded-full bg-gray-200 hover:bg-gray-300">
                <img src={edit} width="16px" alt="edit" />
              </button>
              <div className="border-r border-gray-300 h-4"></div>
              <button onClick={() => handleDeleteDeduction(index)} className="p-1 rounded-full bg-gray-200 hover:bg-gray-300">
                <img src={clear} width="16px" alt="delete" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <button onClick={() => setIsPopupOpenDeduction(true)} className=' text-theme-blue text-sm font-semibold flex py-3'><img src={add} width="24px" alt="add" />Add New Deduction</button>

      <Popup
        isOpen={isPopupOpenDeduction}
        onClose={() => setIsPopupOpenDeduction(false)}
        onSubmit={editingDeductionIndex !== null ? handleUpdateDeduction : handleAddDeduction}
        initialData={editingDeduction}
        buttonLabel={editingDeductionIndex !== null ? "Update" : "Add"}
      />
    </div>
  );
};

export default SalaryForm;
