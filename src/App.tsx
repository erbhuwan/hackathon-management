import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login";
import { Auth } from "./components/shared/auth";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Auth />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
