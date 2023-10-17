import Image from 'next/image'
import { Suspense } from "react";
import Navbar from "./components/shared/navbar";

export default function Home() {
  return (
      // <Suspense fallback={<Loading />}>
        <Navbar />
      // </Suspense>
  )
}
