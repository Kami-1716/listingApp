import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ForgotPassword, Home, Offers, Profile, SignIn, SignUp } from "./pages";
import { Footer, Header } from "./components";


function App() {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
