import Header from '../components/Header';
import Banner from '../components/Banner';
import ProductFeed from '../components/ProductFeed';
import Head from "next/head";
import { getSession } from 'next-auth/client';
import Footer from '../components/Footer';

export default function Home({products}) {
  return (
    <div className="bg-gray-100 relative">
      <Header />
      <main className="max-w-screen-2xl mx-auto">
        {/* banner */}
        <Banner />
        {/* products */}
        <ProductFeed products={products} />
      </main>
      <Footer />
    </div>
  );
}

export async function getServerSideProps(context)
{
  const session = await getSession(context);
  const products = await fetch("https://fakestoreapi.com/products")
  .then(response => response.json());
  return {
    props: {
      products,
      session
    }
  }
}
