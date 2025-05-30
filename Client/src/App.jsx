import Dark from "./assets/images/bg-desktop-dark.jpg";
import SignBackground from "./assets/images/Rectangle.png";
import LoginBackground from "./assets/images/Image.png";
import Form from "./Components/Form";
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import SignIn from "./Components/Sign";
import LogIn from "./Components/Login";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
function App() {
  const [toggle, setToggle] = useState(false);
  const location = useLocation();
  const toggleTheme = () => {
    setToggle((prev) => !prev);
  };

  useEffect(() => {
    if (location.pathname === "/form") {
      document.body.style.backgroundColor = toggle
        ? "hsl(0, 0%, 98%)"
        : "hsl(235, 21%, 11%)";
    } else {
      document.body.style.backgroundColor = "transparent";
      document.body.style.backgroundImage = "none";
    }
  }, [location.pathname, toggle]);
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <Routes>
        <Route
          path="/form"
          element={
            <div
              className="form flex justify-center items-center flex-col bg-cover bg-center h-[40vh]"
              style={{ backgroundImage: `url(${Dark})` }}
            >
              <Form toggleTheme={toggleTheme} toggle={toggle} />
            </div>
          }
        />
        <Route
          path="/"
          element={
            <div
              className="flex justify-center items-center flex-col bg-center bg-cover min-h-screen w-full h-full"
              style={{ backgroundImage: `url(${SignBackground})` }}
            >
              <SignIn />
            </div>
          }
        />
        <Route
          path="/login"
          element={
            <div
              className="flex justify-center items-center flex-col bg-center bg-cover min-h-screen w-full h-full"
              style={{ backgroundImage: `url(${LoginBackground})` }}
            >
              <LogIn />
            </div>
          }
        />
      </Routes>
    </>
  );
}

export default App;
