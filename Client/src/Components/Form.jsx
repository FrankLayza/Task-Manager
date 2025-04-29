import axios from "axios";
import { useState, useEffect } from "react";
import { FaSun, FaMoon, FaTimes } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Form = ({ toggleTheme, toggle }) => {
  const [input, setInput] = useState("");
  const [todoList, setTodo] = useState([]);
  const [visibleList, setVisible] = useState([]);
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  const showAll = () => {
    setVisible(todoList);
  };
  const addTask = async () => {
    if (!input.trim()) return;

    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.post(
        "http://localhost:5000/api/tasks/create",
        { title: input },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedTodo = [data.newTask, ...todoList];
      setTodo(updatedTodo);
      setVisible(updatedTodo);
      console.log(updatedTodo);
      setCount((prev) => prev + 1);
      setInput("");
    } catch (error) {
      console.error(error.message);
      if (error.response && error.response.status === 401) {
        toast.error("Session expired. Please log in again");
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        toast.error("Error adding a task");
      }
    }
  };

  const removeTask = (id) => {
    const updated = todoList.filter((todo) => todo._id !== id);
    setTodo(updated);
    setVisible(updated);
    setCount(count - 1);
  };

  const toggleCompleted = (id) => {
    const updated = todoList.map((todo) =>
      todo._id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodo(updated);
    setVisible(updated);
    setCount(updated.filter((todo) => !todo.completed).length);
  };

  const activeTask = () => {
    setVisible(todoList.filter((todo) => !todo.completed));
  };

  const filterCompleted = () => {
    setVisible(todoList.filter((todo) => todo.completed));
  };

  const clearCompleted = () => {
    const clearCompletedTask = todoList.filter((todo) => !todo.completed);
    setTodo(clearCompletedTask);
    setVisible(clearCompletedTask);
  };

  useEffect(() => {
    const fetchAllTask = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }
        const { data } = await axios.get("http://localhost:5000/api/tasks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTodo(data.tasks || []);
        setVisible(data.tasks || []);
        setCount((data.tasks || []).filter((task) => !task.completed).length);
      } catch (error) {
        console.error(error.response?.data || error.message)
        if (error.response && error.response.status === 401) {
          toast.error("Session expired. Please log in again");
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          toast.error("error fetching tasks");
        }
      }
    };
    fetchAllTask();
  }, [navigate]);
  return (
    <>
      <div className=" p-20 h-full w-[500px]">
        <div className="flex justify-between mb-5">
          <h2 className="text-white text-4xl font-normal">TODO</h2>
          <button onClick={toggleTheme}>
            {toggle ? (
              <FaSun className="text-white cursor-pointer" />
            ) : (
              <FaMoon className="text-white cursor-pointer" />
            )}
          </button>
        </div>

        <div
          className={`flex ${
            toggle ? "bg-lightGrayishBlue" : "bg-dark-300"
          }  w-full p-3`}
        >
          <label className="inline-flex items-center cursor-pointer mx-2">
            <input type="checkbox" className="sr-only peer" />
            <div className="rounded-full border-gray-600 w-5 h-5 border-1 peer-checked:bg-gradient-to-r from-gradientBlue to-gradientPurple transition"></div>
          </label>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={`${
              toggle ? "text-black" : "text-gray-400"
            } text-[18px] outline-none border-none`}
            type="text"
            placeholder="Create a new todo..."
          />
          <button
            className="ml-auto"
            onClick={() => {
              addTask();
            }}
          >
            <IoSend
              className={`${
                toggle ? "text-dark-300" : "text-white"
              } cursor-pointer`}
            />
          </button>
        </div>

        {/* todolist */}
        <div className="mt-6">
          {visibleList.map((todo) => (
            <div
              key={todo._id}
              className={`flex ${
                toggle ? "bg-lightGrayishBlue shadow-gray-400" : "bg-dark-300"
              } w-full p-3`}
            >
              <label className="inline-flex items-center cursor-pointer mx-2">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={todo.completed}
                  onChange={() => toggleCompleted(todo._id)}
                />
                <div className="rounded-full border-gray-600 w-5 h-5 border-1 peer-checked:bg-gradient-to-r from-gradientBlue to-gradientPurple transition"></div>
              </label>
              <span
                className={`${toggle ? "text-black" : "text-gray-400"} ${
                  todo.completed ? "line-through opacity-50" : ""
                }`}
              >
                {todo.title}
              </span>
              <button className="ml-auto" onClick={() => removeTask(todo._id)}>
                <FaTimes className="text-darkGrayishBlue cursor-pointer" />
              </button>
            </div>
          ))}
          <div
            className={`flex justify-between text-[10px] overflow-hidden w-full ${
              toggle
                ? "bg-lightGrayishBlue text-black shadow-lg"
                : "bg-dark-300 text-gray-400"
            } p-3`}
          >
            <div>{count} items left</div>
            <div className="flex">
              <button className="ml-2 cursor-pointer" onClick={showAll}>
                All
              </button>
              <button className="mx-2 cursor-pointer" onClick={activeTask}>
                Active
              </button>
              <button className="cursor-pointer" onClick={filterCompleted}>
                Completed
              </button>
            </div>
            <div>
              <button className="cursor-pointer" onClick={clearCompleted}>
                Clear Completed
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
