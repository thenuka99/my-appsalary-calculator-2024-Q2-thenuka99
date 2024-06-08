import React, { useState, useEffect } from 'react';
import clear from '../assets/clear.png'

const Popup = ({ isOpen, onClose, onSubmit, initialData = { name: '', value: 0, epf: false }, buttonLabel }) => {
  const [formData, setFormData] = useState({ name: '', value: 0, epf: false });

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : parseFloat(value) || value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
    setFormData({ name: '', value: 0, epf: false });
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="  fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className=" bg-white w-[512px] h-96 rounded grid ">

        <div className=" flex justify-between px-3 font-bold">
          <h2>Add New Earnings</h2>
          <button className="close-button" onClick={onClose}><img src={clear} width="24px" alt="clear"/></button>
        </div>
        
        <div className="my-5 px-3">
          <label className="block mb-2.5 text-theme-blue text-sm font-semibold">
            Earnings Name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Eg: Travel"
              className="w-full p-2 mt-1.5 border border-gray-300 rounded text-black font-normal"
            />
          </label>
          <label className="block mb-2.5 text-theme-blue text-sm font-semibold">
            Amount
            <input
              type="number"
              name="value"
              value={formData.value}
              onChange={handleChange}
              placeholder="Eg: 10,000"
              className="w-full p-2 mt-1.5 border border-gray-300 rounded text-black font-normal"
            />
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="epf"
              checked={formData.epf}
              onChange={handleChange}
              className="mr-2"
            />
            EPF/ETF
          </label>
        </div>

        <div className="flex px-3 justify-end align-bottom">
          <button onClick={onClose} className=" text-theme-blue text-sm  h-10 w-[60px]">Cancel</button>
          <button onClick={handleSubmit} className=" bg-theme-blue text-sm text-white h-10 w-[60px] ml-2 rounded">{buttonLabel}</button>
        </div>

      </div>
    </div>
  );
};

export default Popup;
