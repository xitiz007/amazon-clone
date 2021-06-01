import Image from "next/image";
import { StarIcon } from "@heroicons/react/solid";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import {
  addToBasket,
  removeFromBasket,
  decrementFromBasket,
} from "../slices/basketSlice";

function CheckoutProduct({
  id,
  hasPrime,
  title,
  price,
  description,
  category,
  image,
  rating,
  quantity
}) {
  const dispatch = useDispatch();

  const removeFromBasketHandler = () => {
    dispatch(removeFromBasket(id));
  };

  const incrementCount = () => {
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
  }

  const decrementCount = () => {
    dispatch(decrementFromBasket(id));
  }

  return (
    <div className="grid grid-cols-5">
      <Image src={image} width={200} height={200} objectFit="contain" />
      <div className="col-span-3 mx-5">
        <p>{title}</p>
        <div className="flex">
          {Array(rating)
            .fill()
            .map((_, index) => (
              <StarIcon key={index} className="h-5 text-yellow-500" />
            ))}
        </div>
        <p className="text-xs my-2 line-clamp-3">{description}</p>
        <Currency quantity={price} currency="GBP" />
        {hasPrime && (
          <div className="flex items-center space-x-2">
            <img
              src="https://links.papareact.com/fdw"
              alt="prime"
              loading="lazy"
              className="w-12"
            />
            <p className="text-xs text-gray-500">Free Next-day Delivery</p>
          </div>
        )}
      </div>
      <div className="flex flex-col space-y-2 my-auto justify-self-end">
        {/* <button className="button" onClick={addToBasketHandler}>
          Add to Basket
        </button> */}
        <div className="flex items-center mx-auto space-x-5 my-2">
          <button className="incdec" onClick={decrementCount}>
            -
          </button>
          <span className="text-xs md:text-sm">{quantity}</span>
          <button className="incdec" onClick={incrementCount}>
            +
          </button>
        </div>
        <button className="button" onClick={removeFromBasketHandler}>
          Remove from Basket
        </button>
      </div>
    </div>
  );
}

export default CheckoutProduct;
