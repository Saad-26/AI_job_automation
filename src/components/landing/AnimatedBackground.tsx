import React, { useEffect, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadFull } from 'tsparticles';

interface AnimatedBackgroundProps {
  isDark: boolean;
}

export default function AnimatedBackground({ isDark }: AnimatedBackgroundProps) {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  // Theme-aware configuration options
  const bgColorClass = isDark ? 'bg-[#020617]' : 'bg-slate-50';
  const particleColorValue = isDark ? ["#3b82f6", "#14b8a6", "#ffffff"] : ["#3b82f6", "#14b8a6", "#94a3b8"];
  const linkColorValue = isDark ? "#475569" : "#94a3b8";
  const linkOpacityValue = isDark ? 0.4 : 0.6;

  if (!init) {
    return <div className={`fixed inset-0 z-[-1] w-full h-full ${bgColorClass} transition-colors duration-500`} />;
  }

  return (
    <div className={`fixed inset-0 z-[-1] w-full h-full ${bgColorClass} transition-colors duration-500`}>
      <Particles
        id="tsparticles"
        className="absolute inset-0 -z-10 h-full w-full"
        options={{
          fullScreen: { enable: false },
          background: {
            color: { value: "transparent" }, // Relying on wrapper div for smooth color transitions
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: { enable: true, mode: "push" },
              onHover: { enable: true, mode: "grab" },
            },
            modes: {
              push: { quantity: 4 },
              grab: { distance: 150, links: { opacity: linkOpacityValue } },
            },
          },
          particles: {
            color: { value: particleColorValue },
            links: {
              color: linkColorValue,
              distance: 150,
              enable: true,
              opacity: linkOpacityValue,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: { default: "bounce" },
              random: true,
              speed: 0.8,
              straight: false,
            },
            number: {
              density: { enable: true },
              value: 100,
            },
            opacity: { value: 0.6 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 3 } },
          },
          detectRetina: true,
        }}
      />
    </div>
  );
}
