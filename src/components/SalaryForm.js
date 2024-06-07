import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBasicSalary, addEarning, updateEarning, deleteEarning, addDeduction, updateDeduction, deleteDeduction, reset } from '../redux/salarySlice';
import Popup from './Popup';

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
    <div>
      <div>
        <div>Calculate Your Salary</div>
        <button onClick={handleReset}>Reset</button>
      </div>

      <label>Basic Salary:</label>
      <input type="number" value={basicSalary} onChange={handleBasicSalaryChange} />

      <div>Earnings</div>
      <div>Allowance, Fixed Allowance, Bonus and etc.</div>

      <div>
        {earnings.map((earning, index) => (
          <div key={index}>
            <span>{earning.name}: {earning.value} (EPF: {earning.epf ? 'Yes' : 'No'})</span>
            <button onClick={() => handleEditEarning(index)}>Edit</button>
            <button onClick={() => handleDeleteEarning(index)}>Delete</button>
          </div>
        ))}
      </div>

      <button onClick={() => setIsPopupOpen(true)}>Add New Allowance</button>

      <Popup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSubmit={editingEarningIndex !== null ? handleUpdateEarning : handleAddEarning}
        initialData={editingEarning}
        buttonLabel={editingEarningIndex !== null ? "Update Earning" : "Add Earning"}
      />

      <div>Deductions</div>
      <div>Salary Advances, Loan Deductions and all</div>

      <div>
        {deductions.map((deduction, index) => (
          <div key={index}>
            <span>{deduction.name}: {deduction.value} (EPF: {deduction.epf ? 'Yes' : 'No'})</span>
            <button onClick={() => handleEditDeduction(index)}>Edit</button>
            <button onClick={() => handleDeleteDeduction(index)}>Delete</button>
          </div>
        ))}
      </div>

      <button onClick={() => setIsPopupOpenDeduction(true)}>Add New Deduction</button>

      <Popup
        isOpen={isPopupOpenDeduction}
        onClose={() => setIsPopupOpenDeduction(false)}
        onSubmit={editingDeductionIndex !== null ? handleUpdateDeduction : handleAddDeduction}
        initialData={editingDeduction}
        buttonLabel={editingDeductionIndex !== null ? "Update Deduction" : "Add Deduction"}
      />
    </div>
  );
};

export default SalaryForm;
