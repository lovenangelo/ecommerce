import Brands from "./components/Brands";
import Footer from "./components/Footer";
import HandPickedCollections from "./components/HandPickedCollections";
import Hero from "./components/Hero";
import NewArrivals from "./components/NewArrivals";
import Navbar from "./components/Navbar";
import Authentication from "./components/AuthenticationWrapper";
import { Route } from "wouter";
import axios from "axios";
import { useAppSelector } from "./redux/hooks";
import Home from "./components/AuthenticatedComponents/Home";

function App() {
  const user = useAppSelector((state) => state.user.value);
  axios.defaults.withCredentials = true;
  console.log("user:" + user);

  return (
    <>
      <Navbar />

      {/* Authentication */}
      <Route path="/auth">
        <Authentication />
      </Route>

      {/* Guest */}
      <Route path="/">
        {!user && (
          <>
            <Hero />
            <NewArrivals />
            <HandPickedCollections />
            <Brands />
            <Footer />
          </>
        )}
        {/* Authenticated routes */}
        {user && <Home />}
      </Route>
    </>
  );
}

export default App;
