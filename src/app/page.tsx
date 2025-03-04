"use client"

import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import House from "./components/House";

 

export default function Home() {

  return (
    <div className="grid grid-rows-[60px_1fr_20px] items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Header /> 
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start p-8 pb-20 sm:p-20">

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <House floors={4} wallColor="yellow" roofColor="#8B0000" doorColor="#8B4513" />
          <House floors={1} wallColor="yellow" roofColor="#8B0000" doorColor="#8B4513" />

        </div>
      </main>
      <Footer />
    </div>
  );
}
