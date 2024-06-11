import React, {useState} from "react";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';

function TodoItem({ id, text, onChecked, saveEdit }) {

  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    saveEdit(id, editedText);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setEditedText(e.target.value);
  };
  
 
  return (
    <div>
    {isEditing ? (
      <div>
        <input type="text" value={editedText} onChange={handleChange} />
        <button className="save-button" onClick={handleSave}>Save</button>
      </div>
    ) : (
      <div >
    <h4 className="todo-list">{text}
    <div className="icons">
    <EditNoteOutlinedIcon    onClick={handleEdit} style={{margin:5}} />
    <DeleteOutlineIcon   onClick={() => {
      onChecked(id);
    }}/>
    </div>
    
    </h4>
   
  </div>
    )}
  </div>
   
  );
}

export default TodoItem;

