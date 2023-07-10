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
  const user = useAppSelector((state) => state.user);
  axios.defaults.withCredentials = true;
  console.log("user:" + user.value?.name);

  return (
    <>
      <Navbar />

      {/* Authentication */}
      <Route path="/auth">
        <Authentication />
      </Route>

      {/* Guest */}
      <Route path="/">
        {user.value == null && (
          <>
            <Hero />
            <NewArrivals />
            <HandPickedCollections />
            <Brands />
            <Footer />
          </>
        )}
        {/* Authenticated routes */}
        {user.value !== null && <Home />}
      </Route>
    </>
  );
}

export default App;
