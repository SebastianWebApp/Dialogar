import { Routes, Route } from "react-router-dom";
import Index from "./pages/index";
import NotFound from "./pages/NotFound";
// import PlaylistPage from "./pages/playlist";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Index />} />
        {/* <Route path="/playlist" element={<PlaylistPage />} /> */}
        <Route path="*" element={<NotFound />} /> Ruta 404
      </Routes>
    </div>
  );
}

export default App;
