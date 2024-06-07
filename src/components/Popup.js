import React, { useState, useEffect } from 'react';

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
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Add New Earnings</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <label>
            Earnings Name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Eg: Travel"
            />
          </label>
          <label>
            Amount
            <input
              type="number"
              name="value"
              value={formData.value}
              onChange={handleChange}
              placeholder="Eg: 10,000"
            />
          </label>
          <label>
            <input
              type="checkbox"
              name="epf"
              checked={formData.epf}
              onChange={handleChange}
            />
            EPF/ETF
          </label>
        </div>
        <div className="modal-footer">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSubmit}>{buttonLabel}</button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
