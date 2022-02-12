import { addToCart, removeFromCart } from "../redux/actions/cartActions";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

function CartItem({ item, displayAlert }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(removeFromCart(item.id, item.qty));
  };
  const handleQuantity = qty => {
    if (item.countInStock < qty) {
      displayAlert("Not Enough Items in Stock !", false);
    } else if (0 <= qty) dispatch(addToCart(item.id, qty));
  };

  const getItemTotal = () => {
    return item.price * item.qty;
  };

  return (
    <div className="md:flex items-center py-8 border-t border-gray-200">
      <div className="w-1/4">
        <img
          src={item.imgUrl}
          alt={item.name}
          className="w-full h-full object-center object-cover"
        />
      </div>
      <div className="md:pl-3 md:w-3/4 w-full">
        <p className="text-xs leading-3 text-gray-800 md:pt-0 pt-4">
          {item.category}
        </p>
        <div className="flex items-center justify-between w-full pt-1">
          <Link to={`/product/${item.id}`}>
            <p className="text-2xl font-black leading-none text-gray-800">
              {item.name}
            </p>
          </Link>
        </div>
        <p className="text-xs leading-3 text-gray-600 pt-2">
          {item.description}
        </p>
        <p className="text-sm leading-3  py-4">Rate: ${item.price}</p>
        <p className="w-96 text-sm leading-3 ">
          {item.countInStock > 0 ? "In Stock" : "Not In Stock"}
        </p>
        <p className="text-sm leading-3 mt-8">Select Quantity</p>
        <div className="flex items-center justify-between pt-2 pr-6">
          <div className="flex items-center  mt-1">
            <div className="flex items-center">
              <button
                className="mr-2 px-2 rounded-lg bg-gray-200 border-0"
                type="button"
                name="decrement"
                onClick={() => handleQuantity(item.qty - 1)}
              >
                -
              </button>

              <span>{item.qty}</span>

              <button
                className="ml-2 px-2 rounded-lg bg-gray-200 border-0"
                type="button"
                name="increment"
                onClick={() => handleQuantity(item.qty + 1)}
              >
                +
              </button>
            </div>

            <button
              type="button"
              className="ml-10 border-0 bg-white hover:text-red-600"
              onClick={handleDelete}
            >
              <svg
                style={{ height: "35px", width: "40px" }}
                className=""
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                ></path>
              </svg>
            </button>
          </div>
          <div>
            <p className="text-2xl items-start ml-4 font-black leading-none text-gray-800">
              ${getItemTotal().toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
