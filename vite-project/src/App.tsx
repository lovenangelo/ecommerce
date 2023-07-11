import Brands from "./components/Home/Brands";
import Footer from "./components/Home/Footer";
import HandPickedCollections from "./components/Home/HandPickedCollections";
import Hero from "./components/Home/Hero";
import NewArrivals from "./components/Home/NewArrivals";
import Navbar from "./components/Navbar";
import Authentication from "./components/Authentication/AuthenticationWrapper";
import { Route } from "wouter";
import Profile from "@/components/Profile/Index";
import Handbag from "@/components/Products/Handbags/Index";

function App() {
  return (
    <>
      <Navbar />

      {/* Authentication */}
      <Route path="/auth">
        <Authentication />
      </Route>

      {/* Profile */}
      <Route path="/profile">
        <Profile />
      </Route>

      {/* Products */}
      {/* Handbags */}
      <Route path="/handbags">
        <Handbag />
      </Route>

      <Route path="/">
        <>
          <Hero />
          <NewArrivals />
          <HandPickedCollections />
          <Brands />
          <Footer />
        </>
      </Route>
    </>
  );
}

export default App;
