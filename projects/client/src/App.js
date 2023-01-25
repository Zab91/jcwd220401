//Function and Redux
import { Route, Routes } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Navbar from "./components/navbar";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { cartSync } from "./redux/cartSlice";
import { login } from "./redux/userSlice";

//Component and Pages
import HomePage from "./pages/HomePage";
import { LoginPage } from "./pages/LoginUser";
import { UserProfile } from "./pages/ProfilePage";
import { ChangePassword } from "./pages/ChangePassword";
import Register from "./components/register";
import DetailPage from "./pages/DetailPage";
import NotFound from "./components/404";
import Search from "./components/search";
import CartDetail from "./components/CartComp";
import { ListAddressUser } from "./components/listAddressUser";
import { AddAddress } from "./components/addAddress";
import { UpdateAddress } from "./components/updateAddress";
import SelectAddress from "./components/addressSelect";
import SendEmailPassword from "./pages/SendEmailPage";
import ResetPassword from "./pages/ResetPassword";

//keeplogin url
const urlKeepLogin = `http://localhost:8000/usersLogin/keepLogin`;

function App() {
  //keeplogin token
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  // console.log(token)

  //Function keeplogin
  const keepLogin = async () => {
    try {
      const res = await axios.get(urlKeepLogin, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(res.data);

      // Get cart data by id user
      const cart = await axios.get(`http://localhost:8000/cart/${res.data.id}`);
      dispatch(cartSync(cart.data));
      dispatch(login(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    keepLogin();
  }, []);

  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: "", lng: "" },
  });

  const onSuccess = location => {
    setLocation({
      loaded: true,
      coordinates: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
    });
  };

  const onError = error => {
    setLocation({
      loaded: true,
      error: {
        code: error.code,
        message: error.message,
      },
    });
  };

  useEffect(() => {
    if (!"geolocation in navigator") {
      onError({
        code: 0,
        message: "geolocation not supported",
      });
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);
  console.log(location);

  const myStyle = {
    maxWidth: "506px",
    heigth: "auto",
    backgroundColor: "white",
    margin: "auto",
  };
  const bodyStyle = {
    backgroundColor: "grey",
    width: "auto",
    height: "auto",
  };

  return (
    <div style={bodyStyle}>
      <div style={myStyle}>
        <Routes>
          <Route
            path="/selectAddress"
            element={<SelectAddress />}
          />
          <Route
            path="/profile"
            element={<UserProfile />}
          />
          <Route
            path="/login"
            element={<LoginPage />}
          />
          <Route
            path="/changePassword"
            element={<ChangePassword />}
          />
          <Route
            path="/cart"
            element={
              <>
                <CartDetail />
                <Navbar />
              </>
            }
          />
          <Route
            path="/address"
            element={
              <>
                <ListAddressUser />
                <Navbar />
              </>
            }
          />
          <Route
            path="/address/:id"
            element={
              <>
                <ListAddressUser />
                <Navbar />
              </>
            }
          />
          <Route
            path="/updateAddress/:id"
            element={
              <>
                <UpdateAddress />
                <Navbar />
              </>
            }
          />
          <Route
            path="/addAddress/:id"
            element={
              <>
                <AddAddress />
                <Navbar />
              </>
            }
          />
          <Route
            path="/*"
            element={
              <>
                <NotFound />
                <Navbar />
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                <HomePage />
              </>
            }
          />

          <Route
            path="/detail/:id"
            element={
              <>
                <Search />
                <DetailPage />
                <Navbar />
              </>
            }
          />
          <Route
            path="/register"
            element={
              <>
                <Register />
              </>
            }
          />
          <Route
            path="/verifyResetPassword"
            element={
              <>
                <SendEmailPassword />
              </>
            }
          />
          <Route
            path="/resetPassword"
            element={
              <>
                <ResetPassword />
              </>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
