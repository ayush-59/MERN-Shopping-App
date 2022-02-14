import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { getProductDetails } from "../redux/actions/productActions";
import { addToCart } from "../redux/actions/cartActions";
import { useParams } from "react-router-dom";

import Alert from "../components/alert";

const ProductScreen = () => {
  const [qty, setQty] = useState(1);

  const [alert, setAlert] = useState(false);
  const [alertText, setAlertText] = useState(false);
  const [alertSuccess, setAlertSuccess] = useState(true);

  const [selectedImg, setSelectedImg] = useState(0);
  const dispatch = useDispatch();
  const { id } = useParams();

  const productDetails = useSelector(state => state.getProductDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    if (product && id !== product._id) {
      dispatch(getProductDetails(id));
    }
  }, []);

  const displayAlert = (text, alertSuccess) => {
    setAlertText(text);
    setAlertSuccess(alertSuccess);
    setAlert(true);
    setTimeout(() => setAlert(false), 1000);
  };

  const addToCartHandler = () => {
    dispatch(addToCart(product._id, qty));
    displayAlert("Item Added to Cart !", true);
  };

  const images = product
    ? [product.imgUrl1, product.imgUrl2, product.imgUrl3]
    : [];

  const rating = !product ? [] : [...Array(5).keys()].map(x => {
    return x + 1 <= product.rating ? (
      <i className="fa-solid fa-star" key={x + 1}></i>
    ) : x === Math.trunc(product.rating) ? (
      <i className="fa-solid fa-star-half-stroke" key={x + 1}></i>
    ) : (
      <i className="fa-regular fa-star" key={x + 1}></i>
    );
  });

  return (
    <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4 ">
      {loading ? (
        <h2>Loading...</h2>
      ) : error || !product ? (
        <h2>${error}</h2>
      ) : (
        <>
          <div className="flex items-center justify-center text-center px-4 sm:px-0">
            <Alert text={alertText} alert={alert} alertSuccess={alertSuccess} />
          </div>
          <div className="flex justify-center items-center lg:flex-row flex-col gap-8">
            {/* <!-- Description Div --> */}

            <div className="  w-full sm:w-96 md:w-8/12 lg:w-6/12 items-center">
              <p className=" focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 font-normal text-base leading-4 text-gray-600">
                Home / {product.category} / {product.name}
              </p>
              <h2 className="font-semibold lg:text-4xl text-3xl lg:leading-9 leading-7 text-gray-800 mt-4">
                {product.name}
              </h2>
              <p className="font-sans text-lg leading-6 mt-4 leading-4 text-gray-700">
                {product.description}
              </p>

              <div className=" flex flex-row justify-between  mt-5">
                <div className=" flex flex-row space-x-3">{rating}</div>
                <p className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 font-normal text-base leading-4 text-gray-700 hover:underline hover:text-gray-800 duration-100 cursor-pointer">
                  {product.reviews} reviews
                </p>
              </div>

              <p className=" font-normal text-base leading-6 text-gray-600 mt-7">
                {product.desc}
              </p>
              <p className=" font-semibold lg:text-2xl text-xl lg:leading-6 leading-5 mt-6 ">
                $ {product.price}
              </p>

              <div className="lg:mt-11 mt-10">
                <div className="flex flex-row justify-between">
                  <p className=" font-medium text-base leading-4 text-gray-600">
                    Select quantity
                  </p>
                  <div className="flex">
                    <span
                      onClick={() => {
                        if (qty > 1) setQty(prev => prev - 1);
                      }}
                      className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 cursor-pointer border border-gray-300 border-r-0 w-7 h-7 flex items-center justify-center pb-1"
                    >
                      -
                    </span>
                    <input
                      id="counter"
                      aria-label="input"
                      className="border border-gray-300 h-full text-center w-14 pb-1"
                      type="text"
                      value={qty}
                      onChange={e => e.target.value}
                    />
                    <span
                      onClick={() => {
                        if (qty === product.countInStock) {
                          displayAlert("Not Enough Items in Stock !", false);
                        } else setQty(prev => prev + 1);
                      }}
                      className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 cursor-pointer border border-gray-300 border-l-0 w-7 h-7 flex items-center justify-center pb-1 "
                    >
                      +
                    </span>
                  </div>
                </div>
                <hr className=" bg-gray-200 w-full my-2" />
                <div className=" flex flex-row justify-between items-center mt-4">
                  <p className="font-medium text-base leading-4 text-gray-600">
                    Status
                  </p>
                  {product.countInStock > 0 ? (
                    <p>In Stock</p>
                  ) : (
                    <p>Not In Stock</p>
                  )}
                </div>
                <hr className=" bg-gray-200 w-full mt-4" />
              </div>

              <button
                className="focus:outline-none focus:ring-2 rounded-md hover:bg-blue-400 focus:ring-offset-2 focus:ring-blue-400 font-medium text-base leading-4 text-white bg-gray-800 w-full py-5 lg:mt-16 mt-8"
                onClick={addToCartHandler}
              >
                Add to shopping bag
              </button>
            </div>

            {/* <!-- Preview Images Div For larger Screen--> */}

            <div className=" w-full sm:w-96 md:w-8/12  lg:w-6/12 flex lg:flex-row flex-col lg:gap-8 sm:gap-6 gap-4">
              <div className=" w-full lg:w-8/12 flex justify-center items-center">
                <img src={images[selectedImg]} alt="Preview" />
              </div>
              <div className=" w-full lg:w-1/6 grid lg:grid-cols-1 sm:grid-cols-3 grid-cols-2 gap-6">
                <div
                  className="flex justify-center items-center py-4"
                  onClick={() => setSelectedImg(0)}
                >
                  <img src={product.imgUrl1} alt="preview 1" />
                </div>
                <div
                  className="flex justify-center items-center py-4"
                  onClick={() => setSelectedImg(1)}
                >
                  <img src={product.imgUrl1} alt="preview 2" />
                </div>
                <div
                  className="flex justify-center items-center py-4"
                  onClick={() => setSelectedImg(2)}
                >
                  <img src={product.imgUrl1} alt="preview 3" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex mt-28 justify-center items-center w-full">
            <div className="w-full sm:w-96 md:w-8/12 lg:w-full grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:gap-28 sm:gap-x-6 sm:gap-y-12 gap-y-12 sm:mt-14 mt-10">
              <div>
                <i className="text-6xl text-gray-700 fa-solid fa-0"></i>
                <i className="ml-2 text-6xl text-gray-700 fa-solid fa-7"></i>
                <p className="font-semibold text-xl leading-5 text-gray-800 lg:mt-10 mt-9">
                  7 Days Replacement
                </p>
                <p className="text-normal text-base leading-6 text-gray-600 mt-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Aliquam id diam maecenas ultricies mi eget mauris.
                </p>
              </div>
              <div>
                <p className="text-6xl text-gray-700">
                  <svg
                    width="50"
                    height="50"
                    viewBox="0 0 50 50"
                    fill="#374151"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.833 6.66659C17.574 7.42209 14.5766 9.03575 12.1515 11.3402C9.72641 13.6447 7.96204 16.556 7.04139 19.7722C6.12073 22.9884 6.07733 26.3923 6.91568 29.6309C7.75403 32.8696 9.44359 35.8249 11.8091 38.1905C14.1747 40.556 17.13 42.2456 20.3686 43.0839C23.6073 43.9223 27.0112 43.8789 30.2274 42.9582C33.4436 42.0375 36.3549 40.2732 38.6594 37.8481C40.9638 35.423 42.5775 32.4255 43.333 29.1666C43.333 28.6141 43.1135 28.0842 42.7228 27.6935C42.3321 27.3028 41.8022 27.0833 41.2497 27.0833H33.333C32.9542 28.5395 32.1975 29.8699 31.1394 30.9397C30.0813 32.0095 28.7594 32.7809 27.3074 33.1757C25.8554 33.5705 24.3249 33.5747 22.8708 33.1879C21.4166 32.8011 20.0905 32.0371 19.0265 30.9731C17.9625 29.9091 17.1984 28.583 16.8117 27.1288C16.4249 25.6747 16.4291 24.1442 16.8239 22.6922C17.2187 21.2402 17.99 19.9183 19.0599 18.8602C20.1297 17.8021 21.4601 17.0453 22.9163 16.6666V8.33326C22.8904 8.08643 22.8158 7.84721 22.6968 7.62944C22.5777 7.41168 22.4166 7.21971 22.2229 7.06468C22.0291 6.90964 21.8064 6.79463 21.5678 6.72629C21.3293 6.65795 21.0795 6.63766 20.833 6.66659Z"
                      stroke="#4B5563"
                      strokeWidth="3.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M31.25 7.29163C33.8953 8.22305 36.2979 9.736 38.2809 11.719C40.264 13.7021 41.7769 16.1047 42.7083 18.75H33.3333C32.6946 18.0019 31.998 17.3054 31.25 16.6666V7.29163Z"
                      stroke="#4B5563"
                      strokeWidth="3.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </p>
                <p className="font-semibold text-xl leading-5 text-gray-800 lg:mt-10 mt-9">
                  Durable Product
                </p>
                <p className="text-normal text-base leading-6 text-gray-600 mt-4">
                  Product durability is a key aspect of achieving a circular
                  economy. ... Moreover, enhancing the durability of individual
                  hardware components{" "}
                </p>
              </div>
              <div>
                <i className="text-6xl text-gray-700 fa-solid fa-truck"></i>
                <p className="font-semibold text-xl leading-5 text-gray-800 lg:mt-10 mt-9">
                  Instant Delivery
                </p>
                <p className="text-normal text-base leading-6 text-gray-600 mt-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Vel pretium lectus quam id leo in vitae turpis massa.
                </p>
              </div>
              <div>
                <i className="text-6xl text-gray-700 fa-solid fa-handshake-simple-slash"></i>
                <p className="font-semibold text-xl leading-5 text-gray-800 lg:mt-10 mt-9">
                  No Contact Delivery
                </p>
                <p className="text-normal text-base leading-6 text-gray-600 mt-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Aenean euismod elementum nisi quis eleifend quam adipiscing
                  vitae proin.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductScreen;
