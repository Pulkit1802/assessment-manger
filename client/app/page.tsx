"use client";
import { useState, useEffect } from "react";
import { redirect } from 'next/navigation'

export default function Home() {

  const [user, setUser] = useState(null);

  const checkIfLoggedIn = () => {
    const token = localStorage.getItem("token");

    if (!token)
      redirect("/login")
    else
      redirect("/section")
  }

  useEffect(() => {
    checkIfLoggedIn();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      
    </main>
  )
}
