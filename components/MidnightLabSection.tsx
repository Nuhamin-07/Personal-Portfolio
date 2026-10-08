"use client";

import React from "react";
import Section from "@/components/shared/Section";
import SectionHeader from "@/components/shared/SectionHeader";
import SlingshotLamp from "@/components/SlingshotLamp/SlingshotLamp";

export default function MidnightLabSection() {
  return (
    <Section id="playground" className="relative">
      {/* Editorial Section Header */}
      <SectionHeader
        tag="[ 06 / CREATIVE CODE & PHYSICS ]"
        title="The Midnight"
        titleSecondLine="Lab."
        stickerText="INTERACTIVE PHYSICS"
        countBadge="60 FPS"
        description="An interactive playground built with native HTML5 Canvas 2D, pendulum & ballistic physics, and procedural Web Audio synthesis."
      />

      {/* Slingshot Lamp Canvas Card */}
      <div className="mt-6 sm:mt-10 max-w-6xl mx-auto">
        <SlingshotLamp />
      </div>
    </Section>
  );
}
