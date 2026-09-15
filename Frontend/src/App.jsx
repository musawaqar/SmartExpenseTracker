import Hero from "./Mycomp/Hero"
import Login from "./Mycomp/Login"
import Signup from "./Mycomp/Signup"
import Navbar from "./Mycomp/Navbar"
import Expense from "./Mycomp/Expense"
import ProtectedRoute from "./Mycomp/ProtectedRoutes" // Make sure the path matches where you put the file
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Protected Expense Route */}
        <Route element={<ProtectedRoute />}>
          <Route path="/Expense" element={<Expense />} />    
        </Route>
      </Routes>
    </BrowserRouter>
  );
}