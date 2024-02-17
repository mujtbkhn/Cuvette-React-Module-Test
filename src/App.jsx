import { useState } from "react";
import NotesGroup from "./components/Mobile/NotesGroup/NotesGroup";
import NotesMessages from "./components/Mobile/NotesMessages/NotesMessages";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/Desktop/Body/Body";


function App() {
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  const checkScreenSize = () => {
    setScreenSize(window.innerWidth);
  };
  window.addEventListener("resize", checkScreenSize);

return (
    <>
    
      {screenSize > 500 ? (
        <Body />
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<NotesGroup />} />
            <Route path="/notes" element={<NotesMessages />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
