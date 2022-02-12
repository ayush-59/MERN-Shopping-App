import { Link } from "react-router-dom";

function SideDrawer({ show, closeSideDrawer, getCartCount }) {
  return (
    <div
      className={`flex flex-col md:hidden justify-center w-3/4 h-full fixed top-0 left-0 z-[100] bg-white -translate-x-full transition ease-in-out delay-150 ${show &&
        "translate-x-0"}`}
    >
      <ul className="flex flex-col list-none" onClick={closeSideDrawer}>
        <li className="flex items-center">
          <Link
            to="/"
            className="flex items-center justify-center align-middle flex-1 p-4 text-2xl text-black hover:bg-gray-700 hover:text-white"
          >
            Shop
          </Link>
        </li>
        <li className="flex items-center">
          <Link
            to="/cart"
            className="group flex items-center justify-center align-middle flex-1 p-4 text-2xl text-black hover:bg-gray-700 hover:text-white"
          >
            <i className="fas fa-shopping-cart"></i>
            <span className="flex items-center ml-2">
              Cart
              <span className="ml-2 w-7 h-7 flex justify-center items-center bg-black text-white rounded-full group-hover:text-black group-hover:bg-white">
                {getCartCount()}
              </span>
            </span>
          </Link>
        </li>
        <li className="flex items-center">
          <Link
            to="/about"
            className="flex items-center justify-center align-middle flex-1 p-4 text-2xl text-black hover:bg-gray-700 hover:text-white"
          >
            About
          </Link>
        </li>
        <li className="flex items-center">
          <Link
            to="/contact"
            className="flex items-center justify-center align-middle flex-1 p-4 text-2xl text-black hover:bg-gray-700 hover:text-white"
          >
            Contact
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default SideDrawer;
