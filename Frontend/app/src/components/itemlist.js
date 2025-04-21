import React, { useState } from 'react';

function ItemList({ items, onDelete, onEdit }) {
  const [filter, setFilter] = useState('All');

  const filteredItems =
    filter === 'All' ? items : items.filter((item) => item.type === filter);

  return (
    <div>
      <div>
        <button onClick={() => setFilter('All')}>All</button>
        <button onClick={() => setFilter('Lent')}>Lent</button>
        <button onClick={() => setFilter('Borrowed')}>Borrowed</button>
      </div>
      <ul>
        {filteredItems.map((item) => (
          <li key={item._id}>
            <strong>{item.name}</strong> ({item.type}) to/from {item.person} <br/>
            Status: {item.status} | Given: {new Date(item.dateGiven).toLocaleDateString()} | Return: {new Date(item.expectedReturnDate).toLocaleDateString()}
            <div>
              <button onClick={() => onEdit(item)}>Edit</button>
              <button onClick={() => onDelete(item._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ItemList;