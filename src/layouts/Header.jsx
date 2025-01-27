import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoriteContext";

const Header = () => {
  const { favoriteData } = useFavorites();

  return (
    <header className="border-b border-outline fixed top-0 z-50 bg-white w-full">
      <nav className="w-full mx-auto flex items-center justify-between flex-wrap px-4 py-3">
        <div className="flex justify-center items-center gap-2">
          <h1 className="text-xl text-[#0077D4] ">
            <Link to="/">Supermarket Product</Link>
          </h1>
        </div>
        <div className="flex justify-center items-center">
          <ul className="flex gap-4">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/favorites">
                Favorites{" "}
                <span className=" text-yellow-500">
                  {favoriteData.length > 0 ? favoriteData.length : ""}
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
