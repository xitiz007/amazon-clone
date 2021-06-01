import Image from "next/image";
import { useState } from "react";
import { StarIcon } from "@heroicons/react/solid";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToBasket } from "../slices/basketSlice";
import { useRouter } from 'next/router';
const MAX_RATING = 5;
const MIN_RATING = 1;

function Product({id, title, price, description, category, image }) {
  const router = useRouter();
  const [rating] = useState(
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
  );
  const [hasPrime] = useState(Math.random() > 0.5);  

  const dispatch = useDispatch();

  const addToBasketHandler = () => {
    const product = { id, hasPrime, title, price, description, category, image, rating };
    dispatch(addToBasket(product));
  };


  return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-10 transform transition duration-500 hover:scale-110">
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">
        {category}
      </p>
      <Image
        onClick={() => router.push(`/product/${id}`)}
        src={image}
        height={200}
        width={200}
        objectFit="contain"
        className="cursor-pointer"
      />
      <h4
        onClick={() => router.push(`/product/${id}`)}
        className="my-3 hover:underline cursor-pointer"
      >
        {title}
      </h4>
      <div className="flex">
        {Array(rating)
          .fill()
          .map((_, index) => (
            <StarIcon className="h-5 text-yellow-500" key={index} />
          ))}
      </div>
      <p className="text-xs my-2 line-clamp-2">{description}</p>
      <div className="mb-5">
        <Currency quantity={price} currency="GBP" />
      </div>
      {hasPrime && (
        <div className="flex items-center space-x-2 -mt-5">
          <img
            className="w-12"
            src="https://links.papareact.com/fdw"
            alt="prime"
          />
          <p className="text-xs text-gray-500">Free Next-day Delivery</p>
        </div>
      )}
      <button className="mt-auto button" onClick={addToBasketHandler}>
        Add to Basket
      </button>
    </div>
  );
}

export default Product;
