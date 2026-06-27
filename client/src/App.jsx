import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Auth from "./pages/Auth";

import Home from "./pages/Home";
import YourPosts from "./pages/YourPosts";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/posts" element={<YourPosts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
