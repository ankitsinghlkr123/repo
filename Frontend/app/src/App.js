import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ItemForm from './components/itemform';
import ItemList from './components/itemlist';

function App() {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  const fetchItems = async () => {
    const res = await axios.get('http://localhost:5000/api/items');
    setItems(res.data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const addItem = async (item) => {
    await axios.post('http://localhost:5000/api/items', item);
    fetchItems();
  };

  const updateItem = async (id, updatedItem) => {
    await axios.put(`http://localhost:5000/api/items/${id}`, updatedItem);
    setEditingItem(null);
    fetchItems();
  };

  const deleteItem = async (id) => {
    await axios.delete(`http://localhost:5000/api/items/${id}`);
    fetchItems();
  };

  return (
    <div className="app">
      <h1>Lending Tracker</h1>
      <ItemForm addItem={addItem} editingItem={editingItem} updateItem={updateItem} />
      <ItemList items={items} onDelete={deleteItem} onEdit={setEditingItem} />
    </div>
  );
}

export default App;