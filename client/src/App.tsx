import * as Redux from "react-redux";
import Stores from "./redux/store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import Routes from "./components/Routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const persistor = persistStore(Stores);

function App() {
  return (
    <Redux.Provider store={Stores}>
      <PersistGate loading={null} persistor={persistor}>
        <Routes />
        <ToastContainer />
      </PersistGate>
    </Redux.Provider>
  );
}

export default App;
