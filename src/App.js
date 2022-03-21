import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Transactions from "./pages/Transactions/Transactions";
import Users from "./pages/Users/Users";
import Product from "./pages/Product/Product";

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path="/home" element={<Home/>}/>
        <Route path="/users" element={<Users/>}/>
        <Route path="/transactions" element={<Transactions/>}/>
        <Route path="/product/:id" element={<Product/>}/>
      </Routes>
    </>
  )
}

export default App;
