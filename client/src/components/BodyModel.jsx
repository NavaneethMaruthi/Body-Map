import { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
import { useAuth } from '../context/AuthContext';

function Model({ onBodyClick, modelPath }) {
  const { scene } = useGLTF(modelPath);
  const ref = useRef();

  const handleClick = (e) => {
    e.stopPropagation();
    const point  = e.point;
    const region = e.object.name || 'unknown_region';
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