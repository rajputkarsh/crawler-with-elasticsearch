import * as Redux from "react-redux";
import Stores from "./redux/store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import Routes from "./components/Routes";


const persistor = persistStore(Stores);

function App() {
  return (
    <Redux.Provider store={Stores}>
      <PersistGate loading={null} persistor={persistor}>
        <Routes />
      </PersistGate>
    </Redux.Provider>
  );
}

export default App;
