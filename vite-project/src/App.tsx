import Brands from "./components/Brands";
import Footer from "./components/Footer";
import HandPickedCollections from "./components/HandPickedCollections";
import Hero from "./components/Hero";
import NewArrivals from "./components/NewArrivals";
import Navbar from "./shared/Navbar";

function App() {
  return (
    <div className="w-full h-full">
      <Navbar />
      <Hero />
      <NewArrivals />
      <HandPickedCollections />
      <Brands />
      <Footer />
    </div>
  );
}

export default App;
