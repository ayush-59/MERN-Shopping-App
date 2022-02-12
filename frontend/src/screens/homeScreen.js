import Product from "../components/product";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts as listProducts } from "../redux/actions/productActions";

function HomeScreen() {
  const dispatch = useDispatch();
  const getProducts = useSelector(state => state.getProducts);
  const { products, loading, error } = getProducts;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  return (
    <div className="max-w-screen-lg m-auto">
      <h2 className="text-4xl font-bold  my-5 ml-2">Latest Products</h2>

      <div className="grid gap-10 grid-cols-2 md:grid-cols-3  lg:grid-cols-4">
        {loading ? (
          <h2>Loading... </h2>
        ) : error ? (
          <h2>error</h2>
        ) : (
          products.map(product => (
            <Product
              key={product._id}
              productId={product._id}
              name={product.name}
              price={product.price}
              imgUrl1={product.imgUrl1}
              imgUrl2={product.imgUrl2}
              imgUrl3={product.imgUrl3}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default HomeScreen;
