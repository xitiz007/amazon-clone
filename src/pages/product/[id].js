import Header from "../../components/Header";
import axios from "axios";
import { StarIcon } from "@heroicons/react/solid";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToBasket } from "../../slices/basketSlice";
import Product from "../../components/Product";

const MAX_RATING = 5;
const MIN_RATING = 1;

function ProductView({
  id,
  title,
  price,
  description,
  category,
  image,
  rating,
  hasPrime,
  products
}) {
  const dispatch = useDispatch();
  const addToBasketHandler = () => {
    const product = {
      id,
      hasPrime,
      title,
      price,
      description,
      category,
      image,
      rating,
    };
    dispatch(addToBasket(product));
  };
  return (
    <div className="">
      <Header />
      <main className="max-w-screen-lg mx-auto p-5 md:p-10 flex space-x-5">
        <img
          className="w-16 md:w-32 lg:w-48 object-contain"
          src={image}
          alt={title}
        />
        <div className="flex flex-col space-y-1">
          <h1 className="text-amazon_blue-Orange text-sm md:text-lg lg:text-xl">
            {title}
          </h1>
          <p className="text-xs italic text-gray-400">{category}</p>
          <div className="flex">
            {Array(rating)
              .fill()
              .map((_, index) => (
                <StarIcon className="h-5 text-yellow-500" key={index} />
              ))}
          </div>
          <p className="text-xs md:text-md lg:text-lg mt-1">{description}</p>
          <div className="mb-5">
            <Currency quantity={price} currency="GBP" />
          </div>
          {true && (
            <div className="flex items-center space-x-2 -mt-5">
              <img
                className="w-12"
                src="https://links.papareact.com/fdw"
                alt="prime"
              />
              <p className="text-xs text-gray-500">Free Next-day Delivery</p>
            </div>
          )}
          <button onClick={addToBasketHandler} className="mt-auto button">
            Add to Basket
          </button>
        </div>
      </main>
      <section className="max-w-screen-2xl p-5 md:p-10 mx-auto bg-gradient-to-b from-gray-50 to-gray-200 rounded-sm">
        <h6 className="text-amazon_blue-Orange text-sm md:text-lg lg:text-xl">
          Related products
        </h6>
        <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto">
          {
            products?.map(product => (
              <Product
                key={product.id}
                id={product.id}
                title={product.title}
                price={product.price}
                description={product.description}
                category={product.category}
                image={product.image}
              />              
            ))
          }

        </div>
      </section>
    </div>
  );
}

export async function getServerSideProps(context) {
  const getHasPrime = () => {
    return Math.random() > 0.5;
  };

  const getRating = () => {
    return (
      Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
    );
  };

  const { id } = context.query;
  const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
  const { title, price, description, category, image } = response.data;
  const rating = getRating();
  const hasPrime = getHasPrime();

  const response2 = await axios.get("https://fakestoreapi.com/products");
  const products = response2.data.filter(
    (product) => product.category === category
  ).slice(0, 4);

  return {
    props: {
      id,
      title,
      price,
      description,
      category,
      image,
      rating,
      hasPrime,
      products
    },
  };
}

export default ProductView;
