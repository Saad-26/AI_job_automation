import React from 'react';
import HeroSection from './HeroSection';
import BentoGridFeatures from './BentoGridFeatures';
import ScrollFeatureShowcase from './ScrollFeatureShowcase';
import ParallaxCTA from './ParallaxCTA';

interface LandingPageProps {
  onGetStarted: () => void;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection onGetStarted={onGetStarted} />
      
      {/* 
        Instead of a spacer, we slot the BentoGridFeatures right under the Hero. 
        It naturally flows from Hero's background overlapping the card.
      */}
      <BentoGridFeatures />
      <ScrollFeatureShowcase />
      <ParallaxCTA onGetStarted={onGetStarted} />
    </div>
  );
}
