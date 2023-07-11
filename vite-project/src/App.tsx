import Brands from "./components/AuthenticatedComponents/Brands";
import Footer from "./components/AuthenticatedComponents/Footer";
import HandPickedCollections from "./components/AuthenticatedComponents/HandPickedCollections";
import Hero from "./components/AuthenticatedComponents/Hero";
import NewArrivals from "./components/AuthenticatedComponents/NewArrivals";
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
        {user && (
          <>
            <Hero />
            <NewArrivals />
            <HandPickedCollections />
            <Brands />
            <Footer />
          </>
        )}
        {/* Guest */}
      </Route>
    </>
  );
}

export default App;
