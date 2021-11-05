// import Head from "next/head";
import Feed from "../components/Feed";
import clientPromise from "../lib/clientPromise";
import React from "react";
import { useSession } from "next-auth/client";
import Layout from "../components/Layout";

export default function Home({ isConnected }) {
  const [session, loading] = useSession();

  return (
    <div className="max-w-screen-sm m-auto">
      <Feed />
    </div>
  );
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export async function getServerSideProps(context) {
  const client = await clientPromise;

  // client.db() will be the default database passed in the MONGODB_URI
  // You can change the database by calling the client.db() function and specifying a database like:
  // const db = client.db("myDatabase");
  // Then you can execute queries against your database like so:
  // db.find({}) or any of the MongoDB Node Driver commands

  const isConnected = await client.isConnected();

  return {
    props: { isConnected },
  };
}
