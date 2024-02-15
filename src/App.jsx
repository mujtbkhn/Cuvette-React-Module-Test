import { useState } from "react";
import Body from "./components/Desktop/Body";
import NotesGroup from "./components/Mobile/NotesGroup";
import NotesMessages from "./components/Mobile/NotesMessages";
import { BrowserRouter, Route, Routes } from "react-router-dom";



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
