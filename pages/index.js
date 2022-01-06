import Head from "next/head";
import Switches from "../components/Switches";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-mainbg">
      <Head>
        <title>ESP8266 NodeMCU - BMS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Switches />
    </div>
  );
}
