import { useDispatch } from "react-redux";
import "./App.css";
import { AppRouter } from "./routers/AppRouter";
import { useEffect } from "react";
import { requstAllPatinet } from "./redux/patient";

function App() {
  const dispach = useDispatch();
  useEffect(() => {
    dispach(requstAllPatinet());
  }, [dispach]);
  return (
    <>
      <AppRouter />
    </>
  );
}

export default App;
