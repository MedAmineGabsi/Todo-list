import { TextField, Button, Alert, IconButton, Collapse } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState } from "react";

const formatTime = (time) =>{
  return time < 10 ? `0${time}`: time
}

const UserInput = () => {
  const [value, setValue] = useState("");
  const [nextId, setNextId] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);

  var now = new Date()

  const changeValue = (e) => {
    setValue(e.target.value);
  };

  const sendValue = () => {
    tasks.push({
      id: nextId,
      task: value,
      class: value.split(" ").join("-"),
      hash: value
        .split("")
        .map((e) => {
          return String.fromCharCode(e.charCodeAt(0) + 67);
        })
        .join(""),
      crypted: false,
      time: `${now.getHours()}:${formatTime(now.getMinutes())}:${formatTime(now.getSeconds())}`
    });
    setNextId(nextId + 1);
    console.log(tasks);
  };

  const removeTask = (id) => {
    let newtasks = tasks.filter((e) => e.id !== id);
    setTasks(newtasks);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value === "" || value.length >= 40) {
      setOpen(true);
      return;
    }
    sendValue();
    setValue("");
  };

  return (
    <div>
      <Collapse in={open}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          You cannot put task that contain more than 40 characters.
        </Alert>
      </Collapse>
      <form onSubmit={handleSubmit}>
        <TextField
          id="outlined-basic"
          label="Task"
          variant="outlined"
          onChange={changeValue}
          value={value}
        />
        <Button variant="contained" type="submit" style={{ margin: "8px" }}>
          Submit
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setTasks([]);
          }}
          style={{ margin: "8px" }}
          color="error"
        >Delete All</Button>
        <hr style={{ color: "white" }} />
      </form>
      <ul style={{ listStyle: "decimal" }}>
        {tasks.map((e) => {
          return (
            <li key={e.id}>
              <div className="todo-wrapper">
                <span className={e.class}>{e.crypted ? e.hash : e.task}</span>
                <div>
                  <Button variant="contained" style={{marginBottom: "20px"}} color="warning">
                    {e.time}
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => {
                      removeTask(e.id);
                    }}
                    style={{marginBottom: "20px", marginLeft: "9px" }}
                    color="error"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default UserInput;
