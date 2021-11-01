import Head from "next/head";
import Feed from "../components/Feed";
import SideBar from "../components/Sidebar";
import TweetModal from "../components/TweetModal";
import clientPromise from "../lib/clientPromise";
import Header from "../components/Header";
import React from "react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/client";

export default function Home({ isConnected }) {
  const [session, loading] = useSession();

  return (
    <div className="bg-red-500 h-screen">
      <p className="">Mongo DB {isConnected}</p>
      <div className="flex">
        {session && <SideBar user={session.user} />}
        <Feed />
      </div>

      {!session && (
        <>
          Not signed in
          <br />
          <button onClick={signIn}>Sign In</button>
        </>
      )}
      {session && (
        <>
          Signed in as {session.user.name} <br />
          <img width="100px" src={session.user.image} />
          <div>You can view the secret pages</div>
          <button className="border-2 border-black">
            <Link href="/secret">To the secret</Link>
          </button>
          <br />
          <button onClick={signOut}>Sign out</button>
        </>
      )}
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
