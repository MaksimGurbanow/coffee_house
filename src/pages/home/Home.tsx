import About from "./components/about/About";
import CoffeeIntro from "./components/coffeeIntro/CoffeeIntro";
import FavoriteCoffee from "./components/favoriteCoffee/FavoriteCoffee";
import MobileApp from "./components/mobileApp/MobileApp";

const Home = () => {
  return (
    <>
      <CoffeeIntro />
      <FavoriteCoffee />
      <About />
      <MobileApp />
    </>
  );
};

export default Home;
