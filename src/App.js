import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route,HashRouter } from "react-router-dom";
import "./App.css";
import BooksDetails from "./components/BooksDetails";
import BooksDetailsAdmin from "./components/BooksDetailsAdmin";
import AddBooks from "./components/AddBooks";

const Signup = lazy(() => import("./components/signup.jsx"));
const Login = lazy(() => import("./components/login.jsx"));
const User = lazy(() => import("./components/User.jsx"));
const Admin = lazy(() => import("./components/Admin.jsx"));
const Setting = lazy(() => import("./components/settings.jsx"));

function App() {
  return (
    <>
      <Suspense
        fallback={
          <div className="w-100 h-100 text-center mt-1">
            {" "}
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        }
      >
        <HashRouter>
          <Routes>
            {["Signup", "/"].map((path, index) => (
              <Route path={path} element={<Signup />} key={index}></Route>
            ))}
            <Route path="login" element={<Login />}></Route>
            <Route path="admin" element={<Admin />}></Route>
            <Route path="user" element={<User />}></Route>
            <Route path="/user/book/:id" element={<BooksDetails />} />
            <Route path="/admin/book/:id" element={<BooksDetailsAdmin />} />
            <Route path="admin/add" element={<AddBooks />} />
            <Route path="setting" element={<Setting />} />
          </Routes>
        </HashRouter>
      </Suspense>
    </>
  );
}

export default App;
