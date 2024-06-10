import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar, Sidebar } from "./layout";
import {
  AllNotes,
  ArchiveNotes,
  ErrorPage,
  TagNotes,
  TrashNotes,
} from "./pages";
import { useAppSelector } from "./hooks/redux";
import { TagsModal } from "./components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { viewEditTagsModal, viewCreateNoteModal } = useAppSelector(
    (state) => state.modal
  );

  return (
    <div className="app">
      {viewEditTagsModal && <TagsModal type="edit" />}
      <BrowserRouter>
        <Sidebar />
        <div className="app__container">
          <Navbar />
          <ToastContainer
            position="bottom-right"
            theme="light"
            pauseOnHover
            autoClose={1500}
          />
          <Routes>
            <Route path="/" element={<AllNotes />} />
            <Route path="/archive" element={<ArchiveNotes />} />
            <Route path="/trash" element={<TrashNotes />} />
            <Route path="/tag/:name" element={<TagNotes />} />
            <Route path="/404" element={<ErrorPage />} />
            <Route path="/*" element={<Navigate to={"/404"} replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
