import React, { useState, useContext } from "react";
import "./App.css";

const AppContext = React.createContext();

const App = () => {
  const [val, setVal] = useState("");
  const [task, setTask] = useState([]); // array of objects
  const [EditTask, setEditTask] = useState(false);
  const [EditTask_id, setEditTask_id] = useState(0);

  const rm = () => {
    const sure = confirm("Do you want to delete you entire toDo list?");
    if (sure) {
      setTask([]);
    }
  };
  const editTask = (index, task) => {
    setVal(task);
    setEditTask(true);
    setEditTask_id(index);
  };

  const deleteTask = (index) => {
    const updatedTasks = task.filter((currElem) => {
      return currElem.id !== index;
    });
    setTask(updatedTasks);
  };

  // New Function Edit
  const editTasks = (string) => {
    const index = task.findIndex((currElem) => {
      return currElem.id === EditTask_id;
    });
    task[index].name = string;
    setTask(task);
    setVal("");
    setEditTask(false);
  };
  // New Function Add
  const addTasks = (string) => {
    if (!string) {
      alert("First enter your task!");
    } 
    const obj = {
      name: string,
      id: new Date().getTime().toString(),
    };
    setTask([...task, obj]);
    setVal("");
  };

  const addTask = (string) => {
    if (!string) {
      alert("First enter your task!");
    } else if (string && EditTask) {
      const editTask_inToDo = task.find((currElem) => {
        return currElem.id === EditTask_id;
      });
      setTask([...task, (editTask_inToDo.name = string)]);
      setVal("");
      setEditTask(false);
    } else {
      const obj = {
        name: string,
        id: new Date().getTime().toString(),
      };
      setTask([...task, obj]);
      setVal(""); // now this setVal will set the val to empty string after storing task in task useState
    }
  };

  return (
    <>
      <AppContext.Provider value={{ addTask, val }}>
        <div className=" custom-class-main position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-body-tertiary">
          <h2 className="my-1 mx-5">Make your To Do List 📝</h2>
          <input
            className="my-1 mx-2"
            onChange={(event) => setVal(event.target.value)}
            value={val}
            type="text"
            placeholder="Enter your task here: "
          />

          <AddBtn
            name={EditTask ? "Submit" : "Add"}
            whatToDo={EditTask ? editTasks : addTasks}
          />

          {task.map((currElem, index) => {
            return (
              <div className="task-list" key={index}>
                <p className="task">
                  {" "}
                  {index + 1 + "."} {currElem.name}{" "}
                </p>
                <button
                  className="ex-btn"
                  onClick={() => editTask(currElem.id, currElem.name)}
                >
                  {" "}
                  edit{" "}
                </button>
                <button
                  className="ex-btn"
                  onClick={() => deleteTask(currElem.id)}
                >
                  {" "}
                  delete{" "}
                </button>
              </div>
            );
          })}
          <button
            className="btn btn-danger rounded-pill px-2 my-1 mx-5"
            onClick={() => rm()}
          >
            {" "}
            Remove{" "}
          </button>
        </div>
      </AppContext.Provider>
    </>
  );
};

const EditButton = () => {};

export const AddBtn = ({ name, whatToDo }) => {
  const { addTask, val } = useContext(AppContext);
  return (
    <>
      <button
        onClick={() => whatToDo(val)}
        className="btn btn-primary rounded-pill py-1 px-3"
      >
        {name}
      </button>
    </>
  );
};
export const SaveBtn = () => {
  return (
    <>
      <button
        onClick={() => saveTask(val)}
        className="btn btn-primary rounded-pill py-1 px-3"
      >
        {" "}
        Save{" "}
      </button>
    </>
  );
};

export default App;
