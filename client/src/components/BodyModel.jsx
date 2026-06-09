import { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
import { useAuth } from '../context/AuthContext';

const getRegionFromPoint = (point) => {
  const y = point.y;
  const x = point.x;
  const z = point.z;

  // ── BACK SIDE ──────────────────────────────────────
  if (z < 0) {
    if (y > 1.35)                                       return 'head';
    if (y > 1.2)                                        return 'neck';
    if (y > 0.95 && x < -0.3)                          return 'left_shoulder';
    if (y > 0.95 && x > 0.3)                           return 'right_shoulder';
    if (y > 0.9 && x > -0.3 && x < 0.3)               return 'upper_back';
    if (y > 0.75 && y < 0.95 && x > -0.3 && x < 0.3)  return 'middle_back';
    if (y > 0.5 && y < 0.75 && x > -0.3 && x < 0.3)   return 'lower_back';
    if (y > 0.1 && y < 0.95 && x < -0.2)              return 'left_arm';
    if (y > 0.1 && y < 0.95 && x > 0.2)               return 'right_arm';
    if (y < 0.5 && y > 0.3 && x < -0.1)              return 'left_glute';
    if (y < 0.5 && y > 0.3 && x > 0.1)               return 'right_glute';
    if (y < 0.3 && y > -0.25 && x < -0.1)              return 'left_hamstring';
    if (y < 0.3 && y > -0.25 && x > 0.1)               return 'right_hamstring';
    if (y > -0.25 && y < 0.1 && x < -0.1)             return 'left_knee';
    if (y > -0.25 && y < 0.1 && x > 0.1)              return 'right_knee';
    if (y > -0.5 && y < -0.25 && x < -0.1)              return 'left_calf';
    if (y > -0.5 && y < -0.25 && x > 0.1)               return 'right_calf';
     if (y > -1.1 && y < -0.9 && x > 0.1)               return 'heel';
    if (y > -1.1 && y < -0.9 && x < -0.1)               return 'heel';
    return 'Selected region is not identifiable';
  }

  // ── FRONT SIDE (your original — untouched) ─────────
  if (y > 1.35)                                        return 'head';
  if (y > 1.2)                                         return 'neck';
  if (y > 0.95 && x < -0.3)                           return 'left_shoulder';
  if (y > 0.95 && x > 0.3)                            return 'right_shoulder';
  if (y > 0.9 && x > -0.3 && x < 0.3)                return 'chest';
  if (y > 0.1 && y < 0.95 && x < -0.2)               return 'left_arm';
  if (y > 0.1 && y < 0.95 && x > 0.2)                return 'right_arm';
  if (y > 0.6 && y < 0.95 && x > -0.3 && x < 0.3)   return 'stomach';
  if (y > 0.3 && y < 0.6 && x > -0.3 && x < 0.3)    return 'abdomen';
  if (y < 0.3 && y > -0.1 && x < -0.1)               return 'left_thigh';
  if (y < 0.3 && y > -0.1 && x > 0.1)                return 'right_thigh';
  if (y > -0.25 && y < 0.1 && x < -0.1)              return 'left_knee';
  if (y > -0.25 && y < 0.1 && x > 0.1)               return 'right_knee';
  if (y > -1 && y < -0.25 && x < -0.1)               return 'left_foot';
  if (y > -1 && y < -0.25 && x > 0.1)                return 'right_foot';
  return 'Selected region is not identifiable';
};

function Model({ onBodyClick, modelPath }) {
  const { scene } = useGLTF(modelPath);
  const ref = useRef();

  const handleClick = (e) => {
  e.stopPropagation();
  const point  = e.point;
  const region = getRegionFromPoint(point);
  onBodyClick({ coords3D: point, bodyRegion: region });
};

  return (
    <primitive
      ref={ref}
      object={scene}
      scale={1.5}
      position={[0, -1, 0]}
      onClick={handleClick}
    />
  );
}

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 2, 0.5]} />
      <meshStandardMaterial color="#14b8a6" wireframe />
    </mesh>
  );
}

export default function BodyModel({ onBodyClick, logs }) {
  const { user } = useAuth();
  const modelPath = user?.gender === 'female' ? '/models/female.glb' : '/models/male.glb';

  return (
    <Canvas
      camera={{ position: [0, 1, 4], fov: 50 }}
      style={{ background: '#030712' }}
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[2, 5, 2]} intensity={1} />
      <directionalLight position={[-2, 3, -2]} intensity={0.4} />

      <Suspense fallback={<LoadingFallback />}>
        <Model onBodyClick={onBodyClick} modelPath={modelPath} />
        <Environment preset="city" />
      </Suspense>

      <OrbitControls
        enablePan={false}
        minDistance={2}
        maxDistance={8}
      />
    </Canvas>
  );
}