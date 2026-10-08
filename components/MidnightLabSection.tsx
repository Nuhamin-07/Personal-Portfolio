"use client";

import React from "react";
import SlingshotLamp from "@/components/SlingshotLamp/SlingshotLamp";

export default function MidnightLabSection() {
  return (
    <section
      id="playground"
      className="w-full min-h-screen relative bg-[#050607] text-[#ece6da] overflow-hidden border-y border-white/10 flex flex-col justify-center scroll-mt-0"
    >
      <SlingshotLamp />
    </section>
  );
}
