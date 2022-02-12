import { useSelector } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import CartItem from "../components/cartItem";

function CartScreen() {
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;
  const [alert, setAlert] = useState(false);
  const shipping = 30.0;
  const tax = 35.0;

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => item.qty + qty, 0);
  };
  const getCartSubTotal = () => {
    return cartItems.reduce((price, item) => item.price * item.qty + price, 0);
  };

  return (
    <div>
      <div className="flex items-center justify-center text-center px-4 sm:px-0 ">
        <div
          id="alert"
          className={`fixed z-50 bg-red-500 shadow rounded-lg  md:flex justify-between items-center top-0 mt-12 mb-8 py-4 px-4 -translate-y-full scale-0 transition ease-in-out delay-150 ${alert &&
            "translate-y-0 scale-100"} `}
        >
          <div className="flex">
            <div className="mr-2 mt-0.5 sm:mt-0 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width={22}
                height={22}
                fill="currentColor"
              >
                <path
                  className="heroicon-ui"
                  d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20zm0 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm0 9a1 1 0 0 1-1-1V8a1 1 0 0 1 2 0v4a1 1 0 0 1-1 1zm0 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"
                />
              </svg>
            </div>
            <p className="mr-2 text-base font-bold text-white">
              Not Enough Items in Stock !
            </p>
          </div>
        </div>
      </div>
      <div
        className="z-30 w-full h-full bg-black bg-opacity-90 top-0 overflow-y-auto overflow-x-hidden"
        id="chec-div"
      >
        <div
          className="w-full z-10 right-0 h-full overflow-x-hidden transform translate-x-0 transition ease-in-out duration-700"
          id="checkout"
        >
          <div className="flex md:flex-row flex-col justify-end" id="cart">
            <div
              className="lg:w-1/2 w-full md:pl-10 pl-4 pr-10 md:pr-4 md:py-12 py-8 bg-white overflow-y-auto overflow-x-hidden h-screen"
              id="scroll"
            >
              <div className="flex items-center text-gray-500 hover:text-gray-600 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-chevron-left"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <polyline points="15 6 9 12 15 18" />
                </svg>
                <Link to="/">
                  <p className="text-sm pl-2 leading-none hover:text-blue-400">
                    Back
                  </p>
                </Link>
              </div>

              {cartItems.length === 0 ? (
                <p>Your cart is Empty</p>
              ) : (
                cartItems.map(item => (
                  <CartItem item={item} setAlert={setAlert} />
                ))
              )}
            </div>

            <div className="xl:w-1/2 md:w-1/3 xl:w-1/4 w-full bg-gray-100 h-full">
              <div className="flex flex-col md:h-screen px-14 py-20 justify-between overflow-y-auto">
                <div>
                  <p className="text-4xl font-black leading-9 text-gray-800">
                    Summary
                  </p>
                  <div className="flex items-center justify-between pt-16">
                    <p className="text-base leading-none text-gray-800">
                      Subtotal
                    </p>
                    <p className="text-base leading-none text-gray-800">
                      ${getCartSubTotal().toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-5">
                    <p className="text-base leading-none text-gray-800">
                      Shipping
                    </p>
                    <p className="text-base leading-none text-gray-800">
                      ${cartItems.length === 0 ? 0.0 : shipping}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-5">
                    <p className="text-base leading-none text-gray-800">Tax</p>
                    <p className="text-base leading-none text-gray-800">
                      ${cartItems.length === 0 ? 0.0 : tax}
                    </p>
                  </div>
                </div>
                <div>
                  <div className="flex items-center pb-6 justify-between lg:pt-5 pt-20">
                    <p className="text-2xl leading-normal text-gray-800">
                      Total
                    </p>
                    <p className="text-2xl font-bold leading-normal text-right text-gray-800">
                      $
                      {cartItems.length === 0
                        ? 0.0
                        : (getCartSubTotal() + shipping + tax).toFixed(2)}
                    </p>
                  </div>
                  <Link to="#">
                    <button
                      type="submit"
                      className="focus:outline-none bg-gray-700 w-full transition duration-150 ease-in-out hover:bg-blue-400 rounded text-white px-8 py-3 text-lg leading-6"
                    >
                      Checkout
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartScreen;
