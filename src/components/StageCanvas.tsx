import { Environment, Lightformer } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type StageCanvasProps = { progress: React.RefObject<number>; pointer: React.RefObject<{ x: number; y: number }> };
const RED = "#eb0029";
const DEEP_RED = "#74111f";
const INK = "#050505";
const METAL = "#242424";
const LIGHT = "#f8f0e6";
const COOL = "#385065";
const CAMERA_KEYS = [
  { p: [0, 4.2, 16], t: [0, 2.6, -2], f: 45 },
  { p: [-1.2, 4.7, 10], t: [0, 2.5, -4], f: 49 },
  { p: [1.3, 3.8, 4], t: [0, 2.1, -6], f: 43 },
  { p: [-1.5, 5.1, -2], t: [0, 2.8, -12], f: 52 },
  { p: [1, 3.6, -9], t: [0, 2.2, -18], f: 46 },
  { p: [0, 4.5, -16], t: [0, 3, -26], f: 40 },
] as const;

function seeded(index: number, salt: number) { const value = Math.sin(index * 91.17 + salt * 17.31) * 43758.5453; return value - Math.floor(value); }
function range(value: number, start: number, end: number) { return THREE.MathUtils.smoothstep(value, start, end); }

function Dust({ progress }: { progress: React.RefObject<number> }) {
  const ref = useRef<THREE.Points>(null);
  const material = useRef<THREE.PointsMaterial>(null);
  const positions = useMemo(() => {
    const array = new Float32Array(380 * 3);
    for (let i = 0; i < 380; i += 1) { array[i * 3] = (seeded(i, 1) - 0.5) * 28; array[i * 3 + 1] = seeded(i, 2) * 12; array[i * 3 + 2] = 15 - seeded(i, 3) * 50; }
    return array;
  }, []);
  useFrame((state, rawDelta) => {
    if (!ref.current || !material.current) return;
    const delta = Math.min(rawDelta, 0.05);
    const p = progress.current;
    ref.current.rotation.y += delta * (0.012 + p * 0.04);
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.18) * 0.18;
    ref.current.position.z = p * 3;
    material.current.opacity = 0.22 + Math.sin(p * Math.PI) * 0.34;
    material.current.size = 0.022 + p * 0.025;
  });
  return <points ref={ref}><bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry><pointsMaterial ref={material} color={LIGHT} size={0.025} transparent opacity={0.3} depthWrite={false} /></points>;
}

function TedxMark({ progress }: { progress: React.RefObject<number> }) {
  const group = useRef<THREE.Group>(null);
  const materials = useRef<THREE.MeshStandardMaterial[]>([]);
  useFrame((_, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    const p = progress.current;
    const glow = range(p, 0.28, 0.48) * (1 - range(p, 0.72, 0.92));
    if (group.current) { group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, (p - 0.35) * 0.16, 4, delta); group.current.position.y = 3.9 + Math.sin(p * Math.PI * 2) * 0.2; }
    materials.current.forEach((material) => { material.emissiveIntensity = 0.15 + glow * 2.2; material.opacity = 0.18 + glow * 0.82; });
  });
  const material = (color: string, index: number) => <meshStandardMaterial ref={(node) => { if (node) materials.current[index] = node; }} color={color} emissive={color} transparent opacity={0.2} roughness={0.45} metalness={0.2} />;
  return <group ref={group} position={[-0.4, 3.9, -6.2]} scale={1.2}>
    <group position-x={-5.1}><mesh position={[0, 1.4, 0]}><boxGeometry args={[3.2, .72, .8]} />{material(RED, 0)}</mesh><mesh><boxGeometry args={[.72, 3.5, .8]} />{material(RED, 1)}</mesh></group>
    <group position-x={-2.1}>{[1.4, 0, -1.4].map((y, i) => <mesh key={y} position={[.65, y, 0]}><boxGeometry args={[2.6, .66, .8]} />{material(RED, i + 2)}</mesh>)}<mesh><boxGeometry args={[.66, 3.5, .8]} />{material(RED, 5)}</mesh></group>
    <group position-x={1.4}><mesh><boxGeometry args={[.7, 3.5, .8]} />{material(RED, 6)}</mesh><mesh position={[1.25, 0, 0]} rotation-z={-.42}><boxGeometry args={[.7, 3.65, .8]} />{material(RED, 7)}</mesh><mesh position={[2.5, 0, 0]} rotation-z={.42}><boxGeometry args={[.7, 3.65, .8]} />{material(RED, 8)}</mesh></group>
    <group position-x={5.2} scale={.68}><mesh rotation-z={-.65}><boxGeometry args={[.58, 3.2, .58]} />{material(LIGHT, 9)}</mesh><mesh rotation-z={.65}><boxGeometry args={[.58, 3.2, .58]} />{material(LIGHT, 10)}</mesh></group>
  </group>;
}

function World({ progress, pointer }: StageCanvasProps) {
  const world = useRef<THREE.Group>(null);
  const keyLight = useRef<THREE.SpotLight>(null);
  const redLight = useRef<THREE.PointLight>(null);
  const speaker = useRef<THREE.Group>(null);
  const rings = useRef<THREE.Group>(null);
  const look = useRef(new THREE.Vector3(0, 2.6, -2));
  const frames = useMemo(() => Array.from({ length: 9 }, (_, index) => ({ z: 10 - index * 5.5, scale: 1 + seeded(index, 7) * 0.25, rotation: (seeded(index, 8) - 0.5) * 0.18 })), []);

  useFrame(({ camera, clock }, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    const p = THREE.MathUtils.clamp(progress.current, 0, 1);
    const scaled = p * (CAMERA_KEYS.length - 1);
    const index = Math.min(CAMERA_KEYS.length - 2, Math.floor(scaled));
    const mix = THREE.MathUtils.smoothstep(scaled - index, 0, 1);
    const from = CAMERA_KEYS[index]; const to = CAMERA_KEYS[index + 1];
    if (!from || !to) return;
    const targetPosition = new THREE.Vector3().fromArray(from.p).lerp(new THREE.Vector3().fromArray(to.p), mix);
    targetPosition.x += pointer.current.x * 0.55; targetPosition.y -= pointer.current.y * 0.22;
    camera.position.lerp(targetPosition, 1 - Math.exp(-4.2 * delta));
    const targetLook = new THREE.Vector3().fromArray(from.t).lerp(new THREE.Vector3().fromArray(to.t), mix);
    look.current.lerp(targetLook, 1 - Math.exp(-4.8 * delta)); camera.lookAt(look.current);
    const perspective = camera as THREE.PerspectiveCamera; perspective.fov = THREE.MathUtils.damp(perspective.fov, THREE.MathUtils.lerp(from.f, to.f, mix), 5, delta); perspective.updateProjectionMatrix();
    if (world.current) world.current.rotation.z = Math.sin(p * Math.PI * 2) * 0.012;
    if (keyLight.current) { keyLight.current.intensity = 35 + range(p, .08, .42) * 155; keyLight.current.position.x = Math.sin(p * Math.PI * 3) * 4; keyLight.current.color.lerpColors(new THREE.Color(LIGHT), new THREE.Color("#ffd6ad"), range(p, .32, .58)); }
    if (redLight.current) redLight.current.intensity = 20 + Math.sin(p * Math.PI) * 75;
    if (speaker.current) { const reveal = range(p, .32, .44) * (1 - range(p, .56, .7)); speaker.current.position.y = -3 + reveal * 3; speaker.current.scale.setScalar(.95 + Math.sin(clock.elapsedTime * .9) * .008); }
    if (rings.current) { rings.current.rotation.z = clock.elapsedTime * .035 + p * 1.4; rings.current.position.z = -12 - p * 5; }
  });

  return <group ref={world}>
    <mesh rotation-x={-Math.PI / 2} position-y={-.05} receiveShadow><planeGeometry args={[46, 80]} /><meshStandardMaterial color={INK} roughness={.68} metalness={.24} /></mesh>
    {frames.map((frame, index) => <group key={frame.z} position={[0, 3.8, frame.z]} rotation-z={frame.rotation} scale={frame.scale}><mesh position-x={-8}><boxGeometry args={[.18, 8, .28]} /><meshStandardMaterial color={index % 3 === 0 ? RED : METAL} emissive={index % 3 === 0 ? DEEP_RED : INK} emissiveIntensity={.7} /></mesh><mesh position-x={8}><boxGeometry args={[.18, 8, .28]} /><meshStandardMaterial color={index % 3 === 0 ? RED : METAL} emissive={index % 3 === 0 ? DEEP_RED : INK} emissiveIntensity={.7} /></mesh><mesh position-y={4}><boxGeometry args={[16.2, .18, .28]} /><meshStandardMaterial color={METAL} /></mesh></group>)}
    <mesh position={[0, 3.5, -6.8]}><boxGeometry args={[22, 8, .55]} /><meshStandardMaterial color={METAL} roughness={.82} metalness={.32} /></mesh>
    <mesh rotation-x={-Math.PI / 2} position={[0, .06, -.2]} receiveShadow><cylinderGeometry args={[3.25, 3.25, .07, 64]} /><meshStandardMaterial color={RED} roughness={.88} emissive={DEEP_RED} emissiveIntensity={.3} /></mesh>
    <TedxMark progress={progress} />
    <group ref={speaker}><mesh position-y={1.35} castShadow><capsuleGeometry args={[.55, 1.65, 8, 16]} /><meshStandardMaterial color={INK} roughness={.92} /></mesh><mesh position-y={2.8} castShadow><sphereGeometry args={[.46, 16, 12]} /><meshStandardMaterial color={INK} roughness={.92} /></mesh></group>
    <group ref={rings} position={[0, 3, -12]}>{[0, 1, 2].map((item) => <mesh key={item} rotation-x={Math.PI / 2} scale={1 + item * .65}><torusGeometry args={[3.2, .035, 8, 96]} /><meshBasicMaterial color={item === 1 ? RED : LIGHT} transparent opacity={.28 - item * .05} /></mesh>)}</group>
    <spotLight ref={keyLight} position={[0, 11, 3]} angle={.35} penumbra={.76} color={LIGHT} intensity={50} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
    <pointLight ref={redLight} position={[-7, 3, -7]} intensity={45} color={RED} distance={22} />
    <pointLight position={[7, 4, -14]} intensity={34} color={COOL} distance={20} />
    <Dust progress={progress} />
    <Environment resolution={64}><Lightformer intensity={1.4} color={LIGHT} position={[0, 8, 3]} scale={[10, 3, 1]} /><Lightformer intensity={2} color={RED} position={[-8, 2, -1]} rotation-y={Math.PI / 2} scale={[8, 2, 1]} /></Environment>
  </group>;
}

export function StageCanvas({ progress, pointer }: StageCanvasProps) {
  return <Canvas shadows dpr={[1, 1.5]} camera={{ position: [0, 4.2, 16], fov: 45 }} gl={{ antialias: true, powerPreference: "high-performance" }}><color attach="background" args={[INK]} /><fogExp2 attach="fog" args={[INK, .03]} /><ambientLight intensity={.34} color="#6f7580" /><World progress={progress} pointer={pointer} /></Canvas>;
}