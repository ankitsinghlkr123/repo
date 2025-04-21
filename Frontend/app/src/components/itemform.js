import React, { useState, useEffect } from 'react';

function ItemForm({ addItem, editingItem, updateItem }) {
  const [formData, setFormData] = useState({
    name: '',
    person: '',
    type: 'Lent',
    status: 'Pending',
    dateGiven: '',
    expectedReturnDate: ''
  });

  useEffect(() => {
    if (editingItem) {
      setFormData(editingItem);
    }
  }, [editingItem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editingItem ? updateItem(editingItem._id, formData) : addItem(formData);
    setFormData({
      name: '',
      person: '',
      type: 'Lent',
      status: 'Pending',
      dateGiven: '',
      expectedReturnDate: ''
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Item Name" value={formData.name} onChange={handleChange} required />
      <input name="person" placeholder="Person's Name" value={formData.person} onChange={handleChange} required />
      <select name="type" value={formData.type} onChange={handleChange}>
        <option value="Lent">Lent</option>
        <option value="Borrowed">Borrowed</option>
      </select>
      <select name="status" value={formData.status} onChange={handleChange}>
        <option value="Pending">Pending</option>
        <option value="Returned">Returned</option>
      </select>
      <input type="date" name="dateGiven" value={formData.dateGiven} onChange={handleChange} required />
      <input type="date" name="expectedReturnDate" value={formData.expectedReturnDate} onChange={handleChange} required />
      <button type="submit">{editingItem ? 'Update' : 'Add'} Item</button>
    </form>
  );
}

export default ItemForm;