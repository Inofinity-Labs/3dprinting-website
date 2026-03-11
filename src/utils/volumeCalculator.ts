import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { ThreeMFLoader } from 'three/examples/jsm/loaders/3MFLoader.js';

// Computes volume of a ThreeJS buffer geometry.
function computeVolume(geometry: THREE.BufferGeometry): number {
  let volume = 0;
  
  if (!geometry.index && !geometry.attributes.position) return 0;

  // Ensure non-indexed for simple triangle iteration
  const geom = geometry.index ? geometry.toNonIndexed() : geometry;
  const positions = geom.attributes.position.array;

  const p1 = new THREE.Vector3();
  const p2 = new THREE.Vector3();
  const p3 = new THREE.Vector3();

  for (let i = 0; i < positions.length; i += 9) {
    p1.set(positions[i], positions[i + 1], positions[i + 2]);
    p2.set(positions[i + 3], positions[i + 4], positions[i + 5]);
    p3.set(positions[i + 6], positions[i + 7], positions[i + 8]);
    
    // Signed volume of tetrahedron from origin
    volume += p1.dot(p2.cross(p3)) / 6.0;
  }
  return Math.abs(volume);
}

// Fallback estimation using file size (1MB ~= 15 cm3)
function fallbackEstimation(sizeBytes: number) {
  const mbSize = sizeBytes / (1024 * 1024);
  return Math.max(5, mbSize * 15);
}

export async function estimatePrintVolume(file: File): Promise<number> {
  const extension = file.name.split('.').pop()?.toLowerCase();
  const buffer = await file.arrayBuffer();

  let geometry: THREE.BufferGeometry | null = null;

  try {
    if (extension === 'stl') {
      const loader = new STLLoader();
      geometry = loader.parse(buffer);
    } else if (extension === 'obj') {
      const decoder = new TextDecoder('utf-8');
      const text = decoder.decode(buffer);
      const loader = new OBJLoader();
      const group = loader.parse(text);
      group.traverse((child: THREE.Object3D) => {
        if (!geometry && (child as THREE.Mesh).isMesh) {
          geometry = (child as THREE.Mesh).geometry;
        }
      });
    } else if (extension === '3mf') {
      const loader = new ThreeMFLoader();
      const group = loader.parse(buffer);
      group.traverse((child: THREE.Object3D) => {
        if (!geometry && (child as THREE.Mesh).isMesh) {
          geometry = (child as THREE.Mesh).geometry;
        }
      });
    }
  } catch (err) {
    console.warn('Error parsing 3D file for volume, falling back to size estimation:', err);
    return fallbackEstimation(file.size);
  }

  if (geometry) {
    const cubicMM = computeVolume(geometry);
    // Standard 3D Printing exports are in mm, so we convert mm³ to cm³
    const cubicCM = cubicMM / 1000;
    
    if (cubicCM > 0) {
      // Return accurate estimation. Minimum 0.1 cm3 to allow precision on tiny parts.
      return Math.max(0.1, cubicCM);
    }
  }

  return fallbackEstimation(file.size);
}
