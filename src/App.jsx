import Dark from './assets/images/bg-desktop-dark.jpg';
import Form from './Components/Form';
function App() {
  return (
    <>
      <div className="flex justify-center items-center flex-col bg-cover bg-center h-[30vh]" style={{backgroundImage: `url(${Dark})`}}>
        <Form />
      </div>
    </>
  );
}

export default App;
