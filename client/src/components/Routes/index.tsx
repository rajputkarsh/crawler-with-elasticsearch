import { BrowserRouter, Routes, Route } from "react-router-dom";
import ClientList from "../../containers/ClientList";
import ClientInfo from "../../containers/ClientInfo";
import NotFound from "../../containers/NotFound";

function index() {
  return (
    <div className="bg-light px-2">
      <BrowserRouter>
        <Routes>
          <Route element={<ClientList />} path="/" />
          <Route element={<ClientInfo />} path="/:id" />
          <Route element={<NotFound />} path="*" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default index;
