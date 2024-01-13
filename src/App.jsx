import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CreateListing, ForgotPassword, Home, Offers, Profile, SignIn, SignUp, UpdateListing, ViewListing } from "./pages";
import { Footer, Header, PrivateRoute } from "./components";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<PrivateRoute />} >
            <Route path="/profile" element={<Profile/>} />
          </Route>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/category/:categoryName/:listingId" element={<ViewListing />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/create-listing" element={<PrivateRoute />} >
            <Route path="/create-listing" element={<CreateListing />} />  
          </Route>
          <Route path="/update-listing" element={<PrivateRoute />} >
            <Route path="/update-listing/:listingId" element={<UpdateListing />} />  
          </Route>
        </Routes>
      </BrowserRouter>

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        />
        
    </>
  );
}

export default App;
