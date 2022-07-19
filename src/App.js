import AppRouter from "./router/AppRouter";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <>
      <Provider store={store} /> <Toaster position="top-right" />
      <AppRouter />
    </>
  );
}

export default App;
