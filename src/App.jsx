import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/main";
import SultanasMenu from "./pages/menu/main";
import SultanasAboutPage from "./pages/home/about/main";
import SultanasContact from "./pages/contact/main";
import Sultanas404 from "./pages/404/main";

export default function App(){
  return(
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route  path="/menu" element={<SultanasMenu />} />
          <Route  path="/about" element={<SultanasAboutPage />} />
          <Route path="/contact" element={<SultanasContact />} />
          <Route path="*" element={<Sultanas404 />} />

        </Routes>
      </Router>
    </>
  )
}
