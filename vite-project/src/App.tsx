import Hero from "./components/Hero";
import NewArrivals from "./components/NewArrivals";
import Navbar from "./shared/Navbar";

function App() {
  return (
    <div className="container w-full h-full">
      <Navbar />
      <Hero />
      <NewArrivals />
    </div>
  );
}

export default App;
