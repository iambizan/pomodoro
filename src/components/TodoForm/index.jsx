import React from "react";

import "./styles.scss";

const TodoForm = ({ visible, onClose, addTodo }) => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [time, setTime] = React.useState("");
  const [errors, setErrors] = React.useState({
    title: "",
    description: "",
    time: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({
      title: "",
      description: "",
      time: "",
    });
    if (title.trim() === "") {
      setErrors((prev) => ({ ...prev, title: "Title is required" }));
    } else if (description.trim() === "") {
      setErrors((prev) => ({
        ...prev,
        description: "Description is required",
      }));
    } else if (time === null) {
      setErrors((prev) => ({ ...prev, time: "Time is required" }));
    } else if (time < 20) {
      setErrors((prev) => ({
        ...prev,
        time: "min. 20mins is required",
      }));
    } else {
      await addTodo(title, description, time);
      handleClose();
    }
  };

  const handleClose = () => {
    setTitle("");
    setDescription("");
    setTime("");
    onClose();
  };

  return (
    <div
      className={`todoform modal-overlay ${visible && `modal-overlay-active`}`}
    >
      <div className="todoform__inputs">
        <div>
          <input
            type="text"
            className="todoform__input"
            placeholder="Add a title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && <p class="form-error-text">{errors.title}</p>}
        </div>

        <div>
          <textarea
            className="todoform__input"
            placeholder="Add a description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {errors.description && (
            <p class="form-error-text">{errors.description}</p>
          )}
        </div>
        <div>
          <input
            type="number"
            className="todoform__input"
            placeholder="Add time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
          {errors.time && <p class="form-error-text">{errors.time}</p>}
        </div>

        <div className="todoform__inputs--actions">
          <div className="btn" onClick={handleClose}>
            cancel
          </div>
          <div className="btn" onClick={handleSubmit}>
            add
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoForm;
