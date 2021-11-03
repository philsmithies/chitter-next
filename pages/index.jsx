import Head from "next/head";
import Feed from "../components/Feed";
import SideBar from "../components/Sidebar";
import TweetModal from "../components/TweetModal";
import clientPromise from "../lib/clientPromise";
import Header from "../components/Header";
import React from "react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/client";
import SignUpBar from "../components/SignUpBar";

export default function Home({ isConnected }) {
  const [session, loading] = useSession();

  return (
    <div>
      <Feed />
    </div>
  );
}

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
