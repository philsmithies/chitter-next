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
  const isConnected = await client.isConnected();

  return {
    props: { isConnected },
  };
}
