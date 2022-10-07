import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import "./style.scss";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { useContext } from "react";
function App() {
  const { currentUser } = useContext();

  const ProtectedRoutes = ({ }) => {
    if (!currentUser) {
      return <Navigate to="/login" />
    }
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <ProtectedRoutes>
               
                <Home />

              </ProtectedRoutes>
            } />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
