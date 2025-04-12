import Dark from './assets/images/bg-desktop-dark.jpg';
import Form from './Components/Form';
import {useEffect, useState} from 'react';
function App() {
  const [toggle, setToggle] = useState(false);


  const toggleTheme = () => {
    setToggle((prev) => !prev)
  }

  useEffect(() => {
    document.body.style.backgroundColor = toggle ? 'hsl(0, 0%, 98%)' : 'hsl(235, 21%, 11%)';
  }, [toggle])
  return (
    <>
      <div className="flex justify-center items-center flex-col bg-cover bg-center h-[40vh]" style={{backgroundImage: `url(${Dark})`}}>
        <Form toggleTheme={toggleTheme} toggle={toggle}/>
      </div>
    </>
  );
}

export default App;
