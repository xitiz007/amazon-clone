import Header from "../components/Header";
import Footer from "../components/Footer";
import Image from "next/image";
import { useSelector } from "react-redux";
import { selectItems, selectTotalPrice } from "../slices/basketSlice";
import CheckoutProduct from "../components/CheckoutProduct";
import Currency from "react-currency-formatter";
import { useSession } from "next-auth/client";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const stripePromise = loadStripe(process.env.stripe_public_key);

function Checkout() {
  const items = useSelector(selectItems);
  const totalPrice = useSelector(selectTotalPrice);
  const [session] = useSession();
  const createCheckoutSession = async () => {
    const stripe = await stripePromise;
    const checkoutSesion = await axios.post("/api/create-checkout-session", {
      items,
      email: session.user.email,
    });

    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSesion.data.id,
    });

    if (result.error) {
      alert(result.error.message);
    }
  };

  return (
    <>
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <main className="lg:flex max-w-screen-2xl mx-auto">
        {/* left */}
        <div className="flex-grow m-5 shadow-sm">
          <Image
            src="https://links.papareact.com/ikj"
            objectFit="contain"
            width={1020}
            height={250}
          />
          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4">
              {items.length === 0
                ? "Your Amazon Basket is empty"
                : "Shopping Basket"}
            </h1>

            {items.map((item, index) => (
              <CheckoutProduct
                key={index}
                id={item.id}
                title={item.title}
                price={item.price}
                description={item.description}
                category={item.category}
                image={item.image}
                rating={item.rating}
                hasPrime={item.hasPrime}
                quantity={item.quantity}
              />
            ))}
          </div>
        </div>

        {/* right */}
        <div className="flex flex-col p-10 bg-white shadow-md">
          {items.length > 0 && (
            <>
              <h2 className="whitespace-nowrap">
                Subtotal ({items.length} items):{" "}
                <span className="font-bold">
                  <Currency quantity={totalPrice} currency="GBP" />
                </span>
              </h2>
              <button
                role="link"
                onClick={createCheckoutSession}
                disabled={!session}
                className={`button mt-2 ${
                  !session &&
                  "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"
                }`}
              >
                {!session ? "Sign in to checkout" : "Proceed to checkout"}
              </button>
            </>
          )}
        </div>
      </main>
    </div>
    <Footer />
  </>
  );
}

export default Checkout;
