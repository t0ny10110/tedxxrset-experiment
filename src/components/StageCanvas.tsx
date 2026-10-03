import { Environment, Lightformer } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

type StageCanvasProps = {
  progress: React.RefObject<number>;
  pointer: React.RefObject<{ x: number; y: number }>;
};

const STAGE_RED = "#eb0029";
const SOFT_RED = "#74111f";
const INK = "#050505";
const METAL = "#242424";
const LIGHT = "#f8f0e6";

function seeded(index: number, salt: number) {
  const value = Math.sin(index * 91.17 + salt * 17.31) * 43758.5453;
  return value - Math.floor(value);
}

function Dust() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const array = new Float32Array(220 * 3);
    for (let i = 0; i < 220; i += 1) {
      array[i * 3] = (seeded(i, 1) - 0.5) * 28;
      array[i * 3 + 1] = seeded(i, 2) * 12;
      array[i * 3 + 2] = (seeded(i, 3) - 0.5) * 18;
    }
    return array;
  }, []);

  useFrame((state, rawDelta) => {
    if (!ref.current) return;
    const delta = Math.min(rawDelta, 0.05);
    ref.current.rotation.y += delta * 0.012;
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.12) * 0.15;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color={LIGHT} size={0.025} transparent opacity={0.38} depthWrite={false} />
    </points>
  );
}

function Audience({ reveal }: { reveal: number }) {
  const silhouettes = useMemo(
    () =>
      Array.from({ length: 28 }, (_, index) => ({
        x: (index % 14 - 6.5) * 1.25 + (seeded(index, 8) - 0.5) * 0.3,
        z: 5.3 + Math.floor(index / 14) * 1.25,
        scale: 0.72 + seeded(index, 9) * 0.3,
      })),
    [],
  );

  return (
    <group position-y={-2.4 * (1 - reveal)}>
      {silhouettes.map((person, index) => (
        <group key={index} position={[person.x, 0, person.z]} scale={person.scale}>
          <mesh position-y={1.05}>
            <capsuleGeometry args={[0.34, 1.1, 4, 8]} />
            <meshStandardMaterial color={INK} roughness={1} />
          </mesh>
          <mesh position-y={2.02}>
            <sphereGeometry args={[0.32, 10, 8]} />
            <meshStandardMaterial color={INK} roughness={1} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function TedxMark({ glow }: { glow: number }) {
  return (
    <group position={[-0.4, 4.3, -5.7]} scale={1.25}>
      <group position-x={-5.1}>
        <mesh position={[0, 1.4, 0]}><boxGeometry args={[3.2, 0.72, 0.8]} /><meshStandardMaterial color={STAGE_RED} emissive={STAGE_RED} emissiveIntensity={glow} /></mesh>
        <mesh position={[0, 0, 0]}><boxGeometry args={[0.72, 3.5, 0.8]} /><meshStandardMaterial color={STAGE_RED} emissive={STAGE_RED} emissiveIntensity={glow} /></mesh>
      </group>
      <group position-x={-2.1}>
        {[1.4, 0, -1.4].map((y) => <mesh key={y} position={[0.65, y, 0]}><boxGeometry args={[2.6, 0.66, 0.8]} /><meshStandardMaterial color={STAGE_RED} emissive={STAGE_RED} emissiveIntensity={glow} /></mesh>)}
        <mesh><boxGeometry args={[0.66, 3.5, 0.8]} /><meshStandardMaterial color={STAGE_RED} emissive={STAGE_RED} emissiveIntensity={glow} /></mesh>
      </group>
      <group position-x={1.4}>
        <mesh><boxGeometry args={[0.7, 3.5, 0.8]} /><meshStandardMaterial color={STAGE_RED} emissive={STAGE_RED} emissiveIntensity={glow} /></mesh>
        <mesh position={[1.25, 0, 0]} rotation-z={-0.42}><boxGeometry args={[0.7, 3.65, 0.8]} /><meshStandardMaterial color={STAGE_RED} emissive={STAGE_RED} emissiveIntensity={glow} /></mesh>
        <mesh position={[2.5, 0, 0]} rotation-z={0.42}><boxGeometry args={[0.7, 3.65, 0.8]} /><meshStandardMaterial color={STAGE_RED} emissive={STAGE_RED} emissiveIntensity={glow} /></mesh>
      </group>
      <group position-x={5.2} scale={0.68}>
        <mesh rotation-z={-0.65}><boxGeometry args={[0.58, 3.2, 0.58]} /><meshStandardMaterial color={LIGHT} emissive={LIGHT} emissiveIntensity={glow * 0.25} /></mesh>
        <mesh rotation-z={0.65}><boxGeometry args={[0.58, 3.2, 0.58]} /><meshStandardMaterial color={LIGHT} emissive={LIGHT} emissiveIntensity={glow * 0.25} /></mesh>
      </group>
    </group>
  );
}

function SpotlightBeams({ ignition }: { ignition: number }) {
  const left = useRef<THREE.Mesh>(null);
  const right = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    const sway = Math.sin(state.clock.elapsedTime * 0.22) * 0.08;
    if (left.current) left.current.rotation.z = -0.18 + sway;
    if (right.current) right.current.rotation.z = 0.18 - sway;
  });
  return (
    <group position-y={6}>
      <mesh ref={left} position={[-3.2, -3, -0.5]} rotation-z={-0.18}>
        <coneGeometry args={[2.3, 9, 32, 1, true]} />
        <meshBasicMaterial color={LIGHT} transparent opacity={0.045 * ignition} side={THREE.DoubleSide} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh ref={right} position={[3.2, -3, -0.5]} rotation-z={0.18}>
        <coneGeometry args={[2.3, 9, 32, 1, true]} />
        <meshBasicMaterial color={LIGHT} transparent opacity={0.04 * ignition} side={THREE.DoubleSide} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}

function Stage({ progress, pointer }: StageCanvasProps) {
  const rig = useRef<THREE.Group>(null);
  const keyLight = useRef<THREE.SpotLight>(null);
  const speaker = useRef<THREE.Group>(null);
  const audience = useRef(0);
  const ignition = useRef(0);
  const spark = useRef(0);

  useFrame(({ camera }, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    const p = Math.max(0, Math.min(1, progress.current));
    ignition.current = THREE.MathUtils.damp(ignition.current, THREE.MathUtils.smoothstep(p, 0.08, 0.32), 3, delta);
    audience.current = THREE.MathUtils.damp(audience.current, THREE.MathUtils.smoothstep(p, 0.3, 0.58), 3, delta);
    spark.current = THREE.MathUtils.damp(spark.current, THREE.MathUtils.smoothstep(p, 0.58, 0.86), 3, delta);
    const px = pointer.current.x;
    const py = pointer.current.y;
    camera.position.x = THREE.MathUtils.damp(camera.position.x, px * 0.55, 3, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, 4.4 + p * 0.65 + py * 0.2, 3, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, 15.5 - p * 4.8, 2.4, delta);
    camera.lookAt(0, 2.5, -1.8 - p * 1.2);
    if (rig.current) rig.current.position.y = Math.sin(performance.now() * 0.00035) * 0.04;
    if (keyLight.current) keyLight.current.intensity = 180 * ignition.current;
    if (speaker.current) {
      speaker.current.position.y = -3.1 + spark.current * 3.1;
      speaker.current.scale.setScalar(0.96 + Math.sin(performance.now() * 0.001) * 0.008);
    }
  });

  return (
    <group ref={rig}>
      <mesh rotation-x={-Math.PI / 2} position-y={-0.05} receiveShadow>
        <planeGeometry args={[42, 36, 1, 1]} />
        <meshStandardMaterial color={INK} roughness={0.72} metalness={0.18} />
      </mesh>
      <mesh position={[0, 3.6, -6.5]} receiveShadow>
        <boxGeometry args={[24, 8, 0.7]} />
        <meshStandardMaterial color={METAL} roughness={0.85} metalness={0.3} />
      </mesh>
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.05, 0.1]} receiveShadow>
        <cylinderGeometry args={[3.15, 3.15, 0.06, 64]} />
        <meshStandardMaterial color={STAGE_RED} roughness={0.9} emissive={SOFT_RED} emissiveIntensity={0.18} />
      </mesh>
      <TedxMark glow={spark.current * 1.6} />
      <SpotlightBeams ignition={ignition.current} />
      <spotLight ref={keyLight} position={[0, 11, 3]} target-position={[0, 0, 0]} angle={0.38} penumbra={0.72} color={LIGHT} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
      <pointLight position={[-7, 3, -2]} intensity={42} color={STAGE_RED} distance={14} />
      <pointLight position={[7, 4, -1]} intensity={26} color="#385065" distance={15} />
      <group ref={speaker} position={[0, -3.1, 0]}>
        <mesh position-y={1.35} castShadow><capsuleGeometry args={[0.55, 1.65, 8, 16]} /><meshStandardMaterial color={INK} roughness={0.92} /></mesh>
        <mesh position-y={2.8} castShadow><sphereGeometry args={[0.46, 16, 12]} /><meshStandardMaterial color={INK} roughness={0.92} /></mesh>
      </group>
      <Audience reveal={audience.current} />
      <Dust />
      <Environment resolution={64}>
        <Lightformer intensity={1.4} color={LIGHT} position={[0, 8, 3]} scale={[10, 3, 1]} />
        <Lightformer intensity={2} color={STAGE_RED} position={[-8, 2, -1]} rotation-y={Math.PI / 2} scale={[8, 2, 1]} />
      </Environment>
    </group>
  );
}

export function StageCanvas({ progress, pointer }: StageCanvasProps) {
  return (
    <Canvas shadows dpr={[1, 1.5]} camera={{ position: [0, 4.4, 15.5], fov: 46 }} gl={{ antialias: true, powerPreference: "high-performance" }}>
      <color attach="background" args={[INK]} />
      <fogExp2 attach="fog" args={[INK, 0.036]} />
      <ambientLight intensity={0.32} color="#6f7580" />
      <Stage progress={progress} pointer={pointer} />
    </Canvas>
  );
}