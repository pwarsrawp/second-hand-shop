import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Favorite from "../components/Favorite";

function FavouritesPage() {
  return (
    <div className="favorites-wrapper">
      <Navbar />
      <div className="favorites-test">
      <Favorite />
      </div>   
      <Footer />      
    </div>
  );
}

export default FavouritesPage;
