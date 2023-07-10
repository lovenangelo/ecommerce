import Brands from "./components/Brands";
import Footer from "./components/Footer";
import HandPickedCollections from "./components/HandPickedCollections";
import Hero from "./components/Hero";
import NewArrivals from "./components/NewArrivals";
import Navbar from "./components/Navbar";
import Authentication from "./components/AuthenticationWrapper";
import { Route } from "wouter";

function App() {
  return (
    <>
      <Navbar />

      {/* Authentication */}
      <Route path="/auth">
        <Authentication />
      </Route>

      {/* Guest */}
      <Route path="/">
        <Hero />
        <NewArrivals />
        <HandPickedCollections />
        <Brands />
        <Footer />
      </Route>
    </>
  );
}

export default App;
