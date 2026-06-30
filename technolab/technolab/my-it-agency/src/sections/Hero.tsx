import { useRef, useMemo, useEffect, useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, Preload } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

// ============================================================================
// OPTIMIZED FIBONACCI SPHERE - Same quality, fewer points
// ============================================================================
const generateFibonacciSphere = (count: number, radius: number = 1) => {
  const positions = new Float32Array(count * 3);
  const phi = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const radiusAtY = Math.sqrt(1 - y * y);
    const theta = phi * i;

    positions[i * 3] = Math.cos(theta) * radiusAtY * radius;
    positions[i * 3 + 1] = y * radius;
    positions[i * 3 + 2] = Math.sin(theta) * radiusAtY * radius;
  }

  return positions;
};

// ============================================================================
// ATMOSPHERE
// ============================================================================
const Atmosphere = () => {
  const atmosphereRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y += delta * 0.02;
    }
  });

  return (
    <mesh ref={atmosphereRef} scale={1.15}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshPhongMaterial
        emissive={new THREE.Color(0x4f46e5)}
        emissiveIntensity={0.15}
        transparent
        opacity={0.1}
        side={THREE.BackSide}
        depthWrite={false}
      />
    </mesh>
  );
};

// ============================================================================
// FLOATING PARTICLES - REDUCED
// ============================================================================
const FloatingParticles = () => {
  const pointsRef = useRef<THREE.Points>(null);

  const orbitalPositions = useMemo(() => {
    const count = 200; // Reduced from 400
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI * 2;
      const radius = 2.4 + Math.random() * 1.2;

      positions[i * 3] = Math.cos(theta) * Math.sin(phi) * radius;
      positions[i * 3 + 1] = Math.sin(theta) * radius;
      positions[i * 3 + 2] = Math.cos(phi) * Math.sin(theta) * radius;
    }

    return positions;
  }, []);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.03;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
      pointsRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.15) * 0.1;
    }
  });

  return (
    <Points ref={pointsRef} positions={orbitalPositions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={new THREE.Color(0x00d9ff)}
        size={0.025}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.8}
      />
    </Points>
  );
};

// ============================================================================
// CORE GLOBE PARTICLES - REDUCED
// ============================================================================
const CoreGlobeParticles = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const groupRef = useRef<THREE.Group>(null);

  // Reduced: 3500 -> 2000, 1500 -> 800
  const corePositions = useMemo(() => generateFibonacciSphere(2000, 1), []);
  const secondLayerPositions = useMemo(() => generateFibonacciSphere(800, 0.75), []);

  useFrame((state, delta) => {
    if (groupRef.current && pointsRef.current) {
      groupRef.current.rotation.y += delta * 0.025;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      groupRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.2) * 0.1;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.08;

      const breathe = 1 + Math.sin(state.clock.elapsedTime * 1.2) * 0.03;
      groupRef.current.scale.set(breathe, breathe, breathe);
    }
  });

  return (
    <group ref={groupRef}>
      <Points ref={pointsRef} positions={corePositions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={new THREE.Color(0xd946ef)}
          size={0.025}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.9}
        />
      </Points>

      <Points positions={secondLayerPositions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={new THREE.Color(0x06b6d4)}
          size={0.035}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.7}
        />
      </Points>
    </group>
  );
};

// ============================================================================
// LIGHTING
// ============================================================================
const LightingSetup = () => {
  return (
    <>
      <ambientLight intensity={0.5} color={new THREE.Color(0xb3b3d9)} />
      <directionalLight
        position={[5, 3, 5]}
        intensity={1.2}
        color={new THREE.Color(0xffffff)}
        castShadow={false}
      />
      <pointLight
        position={[-6, 2, -3]}
        intensity={0.8}
        color={new THREE.Color(0x9333ea)}
        distance={15}
        decay={2}
      />
      <pointLight
        position={[6, -2, 3]}
        intensity={0.6}
        color={new THREE.Color(0x0ea5e9)}
        distance={15}
        decay={2}
      />
      <pointLight
        position={[0, 0, 6]}
        intensity={0.4}
        color={new THREE.Color(0xe9d5ff)}
        distance={20}
        decay={2}
      />
    </>
  );
};

// ============================================================================
// OPTIMIZED CAMERA PARALLAX - Only on desktop, throttled
// ============================================================================
const CameraParallax = ({ enabled }: { enabled: boolean }) => {
  const { camera } = useThree();
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetCameraRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [enabled]);

  useFrame(() => {
    if (!enabled) return;

    const parallaxStrength = 0.1; // Reduced from 0.15
    targetCameraRef.current.x = mouseRef.current.x * parallaxStrength;
    targetCameraRef.current.y = mouseRef.current.y * parallaxStrength;

    camera.position.x += (targetCameraRef.current.x - camera.position.x) * 0.08;
    camera.position.y += (targetCameraRef.current.y - camera.position.y) * 0.08;
  });

  return null;
};

// ============================================================================
// GLOBE SCENE
// ============================================================================
const GlobeScene = ({ enableParallax }: { enableParallax: boolean }) => {
  return (
    <Canvas
      camera={{
        position: [0, 0, 5.2],
        fov: 55,
        far: 1000,
      }}
      dpr={[1, 1.2]} // Reduced from [1, 1.5]
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        toneMappingExposure: 1.8,
        precision: 'mediump', // Added for mobile optimization
      }}
    >
      <fog attach="fog" args={['#05050f', 5, 12]} />
      <LightingSetup />
      <Atmosphere />
      <CoreGlobeParticles />
      <FloatingParticles />
      <CameraParallax enabled={enableParallax} />
      <Preload all />
    </Canvas>
  );
};
// ============================================================================
// MAIN HERO COMPONENT - WITH ABOUT EMERGENCE
// ============================================================================
export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<HTMLDivElement>(null);
  const [enableParallax, setEnableParallax] = useState(true);

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    setEnableParallax(!isMobile);
  }, []);
useGSAP(
    () => {

      gsap.set(globeRef.current, { 
        xPercent: -40, 
        left: "50%" 
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=150%', 
          scrub: 5, // Keep this as 'true' for Lenis
          pin: true,
          pinSpacing: false,
          anticipatePin: 4,

        },
      });

      // Text exits quickly
      tl.to(
        textRef.current,
        {
          y: -200,
          opacity: 0,
          scale: 0.85,
          duration: 2,
          ease: 'power2.in',
          force3D: true,
        },
        0
      );

      // Globe scales up and fades
      tl.to(
        globeRef.current,
        {
          scale: 1,
          opacity: 0,
          y:10, // GSAP will automatically keep the xPercent: -50 applied alongside this!
          duration: 8,
          ease: 'power.inOut',
          force3D: true,
        },
        0
      );
    },
    { scope: containerRef }
  );

  return (
    <div
      id="home"
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#05050f] flex flex-col items-center pt-32"
    >
      {/* Background Stars - optimized */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none z-0 transform-gpu"
        style={{
          backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)',
          backgroundSize: '150px 150px',
        }}
      ></div>

      {/* Text Content */}
      <div
        ref={textRef}
        className="relative z-20 flex flex-col items-center text-center px-4 w-full max-w-4xl mx-auto mt-4 will-change-transform"
      >
        <div className="absolute -inset-8 bg-gradient-to-b from-black/40 via-black/20 to-transparent rounded-3xl blur-2xl -z-10 transform-gpu"></div>

        <div className="inline-flex items-center mb-6 px-4 py-1.5 rounded-full bg-black/40 border border-white/20 backdrop-blur-md text-gray-100 text-xs font-medium tracking-wide">
          <Sparkles className="w-3 h-3 text-fuchsia-400 mr-2" />
          Premium IT Solutions · Est. 2012
        </div>

        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight mb-6 leading-[1.1] font-sans"
          style={{
            textShadow:
              '0 0 40px rgba(0,0,0,0.8), 0 0 20px rgba(139, 92, 246, 0.4), 0 8px 32px rgba(0,0,0,0.5)',
          }}
        >
          Innovating the <br className="hidden md:block" />
          Future Through <br className="hidden md:block" />
          Technology
        </h1>

        <p
          className="text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-400 to-white text-lg md:text-xl max-w-2xl mb-10 leading-relaxed mx-auto font-medium"
          style={{
            textShadow: '0 4px 16px rgba(0,0,0,0.5)',
          }}
        >
          We build innovative software, cloud, and AI solutions that help businesses scale, streamline
          operations, and achieve sustainable growth.
        </p>

        <div className="flex items-center gap-4 z-20">
          <button className="px-8 py-3.5 rounded-full bg-white text-black font-semibold transition-all hover:scale-105 flex items-center gap-2 shadow-[0_0_30px_rgba(255,255,255,0.3)] transform-gpu">
            Get Started <ArrowRight className="w-4 h-4" />
          </button>
          <button className="px-8 py-3.5 rounded-full bg-black/40 text-white font-semibold border border-white/30 transition-all hover:bg-black/60 backdrop-blur-md flex items-center gap-2 transform-gpu">
            Contact Sales <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3D Globe Container */}
      <div
        ref={globeRef}
        // 2. THE FIX: Notice that 'left-1/2' and '-translate-x-1/2' are completely removed from here!
        className="absolute bottom-[-30%] md:bottom-[-40%] w-[150vw] md:w-[100vw] h-[800px] md:h-[1000px] z-10 pointer-events-none flex justify-center items-center will-change-transform"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-fuchsia-600/40 rounded-full blur-[150px] transform-gpu"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-600/50 rounded-full blur-[120px] transform-gpu"></div>

        <div className="w-full h-full">
          <GlobeScene enableParallax={enableParallax} />
        </div>
      </div>
    </div>
  );
}