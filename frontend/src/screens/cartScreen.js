import { useSelector } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import CartItem from "../components/cartItem";
import Alert from "../components/alert";

function CartScreen() {
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  const [alert, setAlert] = useState(false);
  const [alertText, setAlertText] = useState(false);
  const [alertSuccess, setAlertSuccess] = useState(true);

  const shipping = 30.0;
  const tax = 35.0;

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => item.qty + qty, 0);
  };
  const getCartSubTotal = () => {
    return cartItems.reduce((price, item) => item.price * item.qty + price, 0);
  };

  const displayAlert = (text, alertSuccess) => {
    setAlertText(text);
    setAlertSuccess(alertSuccess);
    setAlert(true);
    setTimeout(() => setAlert(false), 1000);
  };

  const handleCheckout = () => {
    if (getCartCount() === 0) {
      displayAlert("Cart Empty !", false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center text-center px-4 sm:px-0 ">
        <Alert text={alertText} alertSuccess={alertSuccess} alert={alert} />
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
                <p className="text-3xl font-bold mt-28 text-center">
                  Your cart is Empty
                </p>
              ) : (
                cartItems.map(item => (
                  <CartItem
                    key={item.id}
                    item={item}
                    displayAlert={displayAlert}
                  />
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
                      ${getCartSubTotal() === 0 ? 0.0 : shipping}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-5">
                    <p className="text-base leading-none text-gray-800">Tax</p>
                    <p className="text-base leading-none text-gray-800">
                      ${getCartSubTotal() === 0 ? 0.0 : tax}
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
                      {getCartSubTotal() === 0
                        ? 0.0
                        : (getCartSubTotal() + shipping + tax).toFixed(2)}
                    </p>
                  </div>
                  <Link to="#">
                    <button
                      type="submit"
                      className="focus:outline-none bg-gray-700 w-full transition duration-150 ease-in-out hover:bg-blue-400 rounded text-white px-8 py-3 text-lg leading-6"
                      onClick={handleCheckout}
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
