import "./styles/app.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";

import HomeScreen from "./screens/homeScreen";
import ProductScreen from "./screens/productScreen";
import CartScreen from "./screens/cartScreen";
import AboutScreen from "./screens/aboutScreen";
import ContactScreen from "./screens/contactScreen";
import ErrorScreen from "./screens/errorScreen";
import Navbar from "./components/navbar";
import SideDrawer from "./components/sideDrawer";
import BackDrop from "./components/backDrop";
import Footer from "./components/footer";

function App() {
  const [sideToggle, setSideToggle] = useState(false);
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => qty + item.qty, 0);
  };

  return (
    <Router>
      <Navbar
        displaySideDrawer={() => setSideToggle(true)}
        getCartCount={getCartCount}
      />
      <SideDrawer
        show={sideToggle}
        closeSideDrawer={() => setSideToggle(false)}
        getCartCount={getCartCount}
      />
      <BackDrop
        show={sideToggle}
        closeSideDrawer={() => setSideToggle(false)}
      />

      <Routes>
        <Route exact path="/" element={<HomeScreen />} />
        <Route exact path="/product/:id" element={<ProductScreen />} />
        <Route exact path="/cart" element={<CartScreen />} />
        <Route exact path="/about" element={<AboutScreen />} />
        <Route exact path="/contact" element={<ContactScreen />} />
        <Route path="*" element={<ErrorScreen />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
