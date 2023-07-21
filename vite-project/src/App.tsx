import Brands from "./components/Home/Brands";
import Footer from "./components/Home/Footer";
import HandPickedCollections from "./components/Home/HandPickedCollections";
import Hero from "./components/Home/Hero";
import NewArrivals from "./components/Home/NewArrivals";
import Navbar from "./components/Navbar";
import Authentication from "./components/Authentication/AuthenticationWrapper";
import { Route } from "wouter";
import Profile from "@/components/Profile/Index";
import Product from "@/components/Products/Index";
import SingleProduct from "./components/Products/SingleProduct";
import Cart from "@/components/Cart/Index";
import Checkout from "@/components/Cart/Checkout/Index";
import Sell from "@/components/Sell/Index";
function App() {
  return (
    <>
      <Navbar />

      {/* Authentication */}
      <Route path="/auth">
        <Authentication />
      </Route>

      {/* Sell */}
      <Route path="/sell">
        <Sell />
      </Route>

      {/* Profile */}
      <Route path="/profile">
        <Profile />
      </Route>

      {/* Cart  */}
      <Route path="/cart">
        <Cart />
      </Route>

      {/* Checkout  */}
      <Route path="/checkout">
        <Checkout />
      </Route>
      {/* Products */}
      {/* Handbags */}
      <Route path="/products/:category">
        {(params) => <Product category={params.category} />}
      </Route>

      <Route path="/item/:id">
        {(params) => <SingleProduct id={params.id} />}
      </Route>

      <Route path="/">
        <>
          <Hero />
          <NewArrivals />
          <HandPickedCollections />
          <Brands />
        </>
      </Route>

      <Footer />
    </>
  );
}

export default App;
