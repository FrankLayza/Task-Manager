import { useState, useEffect } from "react";
import { FaSun, FaMoon, FaTimes } from "react-icons/fa";
import { IoSend } from "react-icons/io5";

const Form = ({ toggleTheme, toggle }) => {
  const [input, setInput] = useState("");
  const [todoList, setTodo] = useState([]);
  const [visibleList, setVisible] = useState([]);
  const [count, setCount] = useState(0);

  const showAll = () => {
    setVisible(todoList);
  };

  const addTask = () => {
    if(!input.trim()) return;
    const newTodo = { id: Date.now(), text: input, completed: false };
    const updatedTodo = [newTodo, ...todoList];
    setTodo(updatedTodo);
    setVisible(updatedTodo);
    setCount(count + 1);
    setInput("");
  };

  const removeTask = (id) => {
    const updated = todoList.filter((todo) => todo.id !== id);
    setTodo(updated);
    setVisible(updated);
    setCount(count - 1);
  };

  const toggleCompleted = (id) => {
    const updated = todoList.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodo(updated);
    setVisible(updated);
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
    setVisible(todoList);
  }, [todoList]);
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
          className={`flex ${toggle ? "bg-lightGrayishBlue" : "bg-dark-300"}  w-full p-3`}
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
              key={todo.id}
              className={`flex ${
                toggle ? "bg-lightGrayishBlue shadow-gray-400" : "bg-dark-300"
              } w-full p-3`}
            >
              <label className="inline-flex items-center cursor-pointer mx-2">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={todo.completed}
                  onChange={() => toggleCompleted(todo.id)}
                />
                <div className="rounded-full border-gray-600 w-5 h-5 border-1 peer-checked:bg-gradient-to-r from-gradientBlue to-gradientPurple transition"></div>
              </label>
              <span
                className={`${toggle ? "text-black" : "text-gray-400"} ${
                  todo.completed ? "line-through opacity-50" : ""
                }`}
              >
                {todo.text}
              </span>
              <button className="ml-auto" onClick={() => removeTask(todo.id)}>
                <FaTimes className="text-darkGrayishBlue cursor-pointer" />
              </button>
            </div>
          ))}
          <div
            className={`flex justify-between text-[10px] overflow-hidden w-full ${
              toggle ? "bg-lightGrayishBlue text-black shadow-lg" : "bg-dark-300 text-gray-400"
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
