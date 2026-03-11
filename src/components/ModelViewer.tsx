"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { ThreeMFLoader } from "three/examples/jsm/loaders/3MFLoader.js";
import { useEffect, useState } from "react";
import * as THREE from "three";

export default function ModelViewer({ file, colorHex }: { file: File, colorHex: string }) {
  const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null);

  useEffect(() => {
    if (!file) {
      setGeometry(null);
      return;
    }
    const ext = file.name.split('.').pop()?.toLowerCase();
    const url = URL.createObjectURL(file);

    let isMounted = true;

    async function loadModel() {
      try {
        if (ext === 'stl') {
          const loader = new STLLoader();
          const geom = await loader.loadAsync(url);
          if (isMounted) setGeometry(geom);
        } else if (ext === 'obj') {
          const loader = new OBJLoader();
          const group = await loader.loadAsync(url);
          let foundGeom: THREE.BufferGeometry | null = null;
          group.traverse((child: any) => {
            if (!foundGeom && child.isMesh) {
              foundGeom = child.geometry;
            }
          });
          if (isMounted && foundGeom) setGeometry(foundGeom);
        } else if (ext === '3mf') {
          const loader = new ThreeMFLoader();
          const group = await loader.loadAsync(url);
          let foundGeom: THREE.BufferGeometry | null = null;
          group.traverse((child: any) => {
            if (!foundGeom && child.isMesh) {
              foundGeom = child.geometry;
            }
          });
          if (isMounted && foundGeom) setGeometry(foundGeom);
        }
      } catch (err) {
        console.error("Failed to load 3D model for view:", err);
      }
    }

    loadModel();

    return () => {
      isMounted = false;
      URL.revokeObjectURL(url);
    };
  }, [file]);

  if (!geometry) {
    return (
      <div className="flex items-center justify-center w-full h-full text-slate-500 gap-2">
        <span className="material-symbols-outlined animate-spin text-primary">autorenew</span>
        <span className="font-bold text-sm tracking-wider uppercase">Processing Geometry...</span>
      </div>
    );
  }

  return (
    <Canvas shadows camera={{ position: [0, 0, 100], fov: 50 }} className="w-full h-full cursor-move">
      <Stage environment="city" intensity={0.5}>
        <mesh geometry={geometry}>
          <meshStandardMaterial color={colorHex} roughness={0.4} metalness={0.1} />
        </mesh>
      </Stage>
      <OrbitControls makeDefault autoRotate autoRotateSpeed={2} enablePan={false} />
    </Canvas>
  );
}
