import Brands from "./components/Home/Brands";
import Footer from "./components/Home/Footer";
import HandPickedCollections from "./components/Home/HandPickedCollections";
import Hero from "./components/Home/Hero";
import NewArrivals from "./components/Home/NewArrivals";
import Navbar from "./components/Navbar";
import Authentication from "./components/Authentication/AuthenticationWrapper";
import { Route } from "wouter";
import axios from "axios";
import { useAppSelector } from "./redux/hooks";

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

      {/* Authenticated routes */}
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
