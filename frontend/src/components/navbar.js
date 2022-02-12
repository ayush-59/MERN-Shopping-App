import { Link } from "react-router-dom";

function Navbar({ displaySideDrawer, getCartCount }) {
  return (
    <nav className="flex justify-between text-white items-center font-sans bg-gray-700 shadow-lg w-full h-20 px-6 py-4 z-30">
      <div className="text-white text-xl font-bold cursor-pointer md:text-xl">
        <h1>MERN Shopping App</h1>
      </div>

      <ul className="flex items-center list-none md:block hidden">
        <li className="pl-6 float-left">
          <Link
            to="/"
            className="flex items-center text-xl bg-black p-2.5 rounded-lg hover:bg-blue-400"
          >
            Shop
          </Link>
        </li>
        <li className="md:block hidden pl-6 float-left">
          <Link
            to="/cart"
            className="flex items-center text-xl bg-black p-2.5 rounded-lg hover:bg-blue-400"
          >
            <i className="fas fa-shopping-cart"></i>
            <span className="ml-2">Cart</span>
            <span className="ml-2 w-7 h-7 flex justify-center bg-white text-black rounded-full">
              {getCartCount()}
            </span>
          </Link>
        </li>
        <li className="md:block hidden pl-6 float-left">
          <Link
            to="/about"
            className="flex items-center text-xl bg-black p-2.5 rounded-lg hover:bg-blue-400"
          >
            About
          </Link>
        </li>
        <li className="md:block hidden pl-6 float-left">
          <Link
            to="/contact"
            className="flex items-center text-xl bg-black p-2.5 rounded-lg hover:bg-blue-400"
          >
            Contact
          </Link>
        </li>
      </ul>

      <div
        className="flex flex-col w-7 h-7 justify-between items-center cursor-pointer md:hidden"
        onClick={displaySideDrawer}
      >
        <div className="w-full h-1 bg-white rounded-lg hover:bg-blue-400"></div>
        <div className="w-full h-1 bg-white rounded-lg hover:bg-blue-400"></div>
        <div className="w-full h-1 bg-white rounded-lg hover:bg-blue-400"></div>
      </div>
    </nav>
  );
}

export default Navbar;
