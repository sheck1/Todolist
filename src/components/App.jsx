import React, { useState, useEffect } from 'react';
import Header from './Header';
import TodoItem from './TodoItem';

function App() {
  const [inputText, setInputText] = useState('');

  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem('todoItems');
    return savedItems ? JSON.parse(savedItems) : [];
  });
  
  const [error, setError] = useState('');

  function handleChange(event) {
    const s = event.target.value;
    const newValue = s.charAt(0).toUpperCase() + s.slice(1);
    setInputText(newValue);
  }

  useEffect(() => {
    localStorage.setItem('todoItems', JSON.stringify(items));
  }, [items]);
  

  function addItem(event) {
    event.preventDefault();
    if (!inputText.trim()) {
      setError('Please enter a todo item.');
      return;
    }
    setItems(prevItems => {
      return [...prevItems, { text: inputText, id: Date.now() }];
    });
    setError('');
    setInputText('');
  }
  

  function deleteItem(id) {
    setItems(prevItems => {
      return prevItems.filter(item => item.id !== id);
    });
    localStorage.removeItem('todolist');
  }



  const saveEdit = (id, newText) => {
    setItems(items.map(todoItem => {
      if (todoItem.id === id) {
        return { ...todoItem, text: newText, isEditing: false };
      }
      return todoItem;
    }));
  };

  return (
    <div>
      <div className="heading">
        <h1>Organise Your Task.</h1>
      </div>
      <div className="container">
        <Header />
        <div className="form">
          {error && <div style={{ color: '#10188a' }}>{error}</div>}
          <input onChange={handleChange} type="text" value={inputText} required />
          <button onClick={addItem}>
            <span>Add</span>
          </button>
        </div>
        <div>
          {items.map((todoItem, index) => (
            <TodoItem
              key={index}
              id={todoItem.id}
              text={todoItem.text}
              onChecked={deleteItem}
              saveEdit={saveEdit}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
