import Brands from "./components/Home/Brands";
import HandPickedCollections from "./components/Home/HandPickedCollections";
import Hero from "./components/Home/Hero";
import NewArrivals from "./components/Home/NewArrivals";
import Navbar from "./components/Navbar";
import Authentication from "./components/Authentication/AuthenticationWrapper";
import { Redirect, Route, Switch } from "wouter";
import Profile from "@/components/Profile/Index";
import Product from "@/components/Products/Index";
import SingleProduct from "./components/Products/SingleProduct";
import Cart from "@/components/Cart/Index";
import Checkout from "@/components/Cart/Checkout/Index";
import Sell from "@/components/Sell/Index";
import { Suspense, lazy } from "react";
import NotFoundPage from "@/components/404/Index";

const LazyFooter = lazy(() => import("@/components/Home/Footer"));
function App() {
  return (
    <>
      <Navbar />
      <Switch>
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

        {/* Edit Product */}
        <Route path="/my-products/edit/:id">
          {(params) => <Sell id={params.id} />}
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
          {(params) => {
            const categories = [
              "handbags",
              "watches",
              "skincare",
              "jewellery",
              "apparels",
            ];
            if (params.category && categories.includes(params.category)) {
              console.log("hey");

              return <Product category={params.category} />;
            } else {
              return <Redirect to="/" />;
            }
          }}
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
            <Suspense fallback={<div>Loading...</div>}>
              <LazyFooter />
            </Suspense>
          </>
        </Route>
        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
    </>
  );
}

export default App;
