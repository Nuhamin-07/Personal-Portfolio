"use client";

import React from "react";
import SlingshotLamp from "@/components/SlingshotLamp/SlingshotLamp";

export default function MidnightLabSection() {
  return (
    <section
      id="playground"
      className="w-full min-h-screen py-2 sm:py-3.5 lg:py-4 px-2 sm:px-3.5 lg:px-4 relative z-50 flex items-center justify-center scroll-mt-6"
    >
      {/* Luxury Rounded Stage Frame with increased height and subtle gap */}
      <div className="w-full h-[94vh] sm:h-[97vh] min-h-[660px] max-h-[1200px] max-w-[1760px] mx-auto rounded-2xl sm:rounded-[2rem] lg:rounded-[2.5rem] border border-white/12 bg-[#050607] overflow-hidden relative">
        <SlingshotLamp />
      </div>
    </section>
  );
}
