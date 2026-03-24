"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "./ThemeProvider";

const NODE_COUNT = 180;
const CONNECTION_DISTANCE = 2.2;
const MOUSE_INFLUENCE_RADIUS = 3.0;
const MOUSE_REPEL_STRENGTH = 0.4;

// Vibrant color palette for light mode
const LIGHT_COLORS = [
    [0.38, 0.42, 0.95],  // indigo
    [0.56, 0.28, 0.92],  // purple
    [0.93, 0.30, 0.55],  // pink
    [0.15, 0.78, 0.85],  // cyan
    [0.98, 0.55, 0.20],  // orange
    [0.20, 0.82, 0.50],  // green
    [0.95, 0.35, 0.35],  // red
];

function NeuralMesh({ isDark }: { isDark: boolean }) {
    const groupRef = useRef<THREE.Group>(null);
    const nodesRef = useRef<THREE.Points>(null);
    const linesRef = useRef<THREE.LineSegments>(null);
    const mouse3D = useRef(new THREE.Vector3(999, 999, 0));
    const { viewport } = useThree();

    const { positions, velocities, basePositions } = useMemo(() => {
        const positions = new Float32Array(NODE_COUNT * 3);
        const velocities = new Float32Array(NODE_COUNT * 3);
        const basePositions = new Float32Array(NODE_COUNT * 3);

        for (let i = 0; i < NODE_COUNT; i++) {
            const i3 = i * 3;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const r = 1.2 + Math.random() * 1.6;

            positions[i3] = r * Math.sin(phi) * Math.cos(theta);
            positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.8;
            positions[i3 + 2] = (Math.random() - 0.5) * 1.5;

            basePositions[i3] = positions[i3];
            basePositions[i3 + 1] = positions[i3 + 1];
            basePositions[i3 + 2] = positions[i3 + 2];

            velocities[i3] = (Math.random() - 0.5) * 0.003;
            velocities[i3 + 1] = (Math.random() - 0.5) * 0.003;
            velocities[i3 + 2] = (Math.random() - 0.5) * 0.002;
        }
        return { positions, velocities, basePositions };
    }, []);

    // Assign a color index to each node
    const nodeColorIndices = useMemo(() => {
        const indices = new Float32Array(NODE_COUNT);
        for (let i = 0; i < NODE_COUNT; i++) {
            indices[i] = Math.floor(Math.random() * LIGHT_COLORS.length);
        }
        return indices;
    }, []);

    const sizes = useMemo(() => {
        const s = new Float32Array(NODE_COUNT);
        for (let i = 0; i < NODE_COUNT; i++) {
            s[i] = 1.5 + Math.random() * 2.5;
        }
        return s;
    }, []);

    const maxConnections = NODE_COUNT * 6;
    const linePositions = useMemo(() => new Float32Array(maxConnections * 6), [maxConnections]);
    const lineColors = useMemo(() => new Float32Array(maxConnections * 6), [maxConnections]);

    useFrame(({ pointer }) => {
        mouse3D.current.set(
            pointer.x * viewport.width * 0.5,
            pointer.y * viewport.height * 0.5,
            0
        );
    });

    useFrame(({ clock }) => {
        if (!nodesRef.current || !linesRef.current) return;

        const time = clock.elapsedTime;
        const posAttr = nodesRef.current.geometry.getAttribute("position") as THREE.BufferAttribute;
        const posArray = posAttr.array as Float32Array;

        for (let i = 0; i < NODE_COUNT; i++) {
            const i3 = i * 3;
            posArray[i3] = basePositions[i3] + Math.sin(time * 0.3 + i * 0.5) * 0.08 + velocities[i3] * time * 5;
            posArray[i3 + 1] = basePositions[i3 + 1] + Math.cos(time * 0.25 + i * 0.3) * 0.06 + velocities[i3 + 1] * time * 5;
            posArray[i3 + 2] = basePositions[i3 + 2] + Math.sin(time * 0.2 + i * 0.7) * 0.05;

            const dx = posArray[i3] - mouse3D.current.x;
            const dy = posArray[i3 + 1] - mouse3D.current.y;
            const distToMouse = Math.sqrt(dx * dx + dy * dy);

            if (distToMouse < MOUSE_INFLUENCE_RADIUS && distToMouse > 0.01) {
                const force = (1 - distToMouse / MOUSE_INFLUENCE_RADIUS) * MOUSE_REPEL_STRENGTH;
                posArray[i3] += (dx / distToMouse) * force * 0.3;
                posArray[i3 + 1] += (dy / distToMouse) * force * 0.3;
            }

            const maxR = 3;
            const dist = Math.sqrt(posArray[i3] ** 2 + posArray[i3 + 1] ** 2 + posArray[i3 + 2] ** 2);
            if (dist > maxR) {
                posArray[i3] *= maxR / dist;
                posArray[i3 + 1] *= maxR / dist;
                posArray[i3 + 2] *= maxR / dist;
            }
        }
        posAttr.needsUpdate = true;

        // Build lines
        const lineGeo = linesRef.current.geometry;
        const linePosAttr = lineGeo.getAttribute("position") as THREE.BufferAttribute;
        const lineColAttr = lineGeo.getAttribute("color") as THREE.BufferAttribute;
        const linePosArr = linePosAttr.array as Float32Array;
        const lineColArr = lineColAttr.array as Float32Array;

        let lineIdx = 0;
        for (let i = 0; i < NODE_COUNT; i++) {
            const i3 = i * 3;
            for (let j = i + 1; j < NODE_COUNT; j++) {
                if (lineIdx >= maxConnections) break;
                const j3 = j * 3;
                const ddx = posArray[i3] - posArray[j3];
                const ddy = posArray[i3 + 1] - posArray[j3 + 1];
                const ddz = posArray[i3 + 2] - posArray[j3 + 2];
                const ddist = Math.sqrt(ddx * ddx + ddy * ddy + ddz * ddz);

                if (ddist < CONNECTION_DISTANCE) {
                    const alpha = (1 - ddist / CONNECTION_DISTANCE) * 0.2;
                    const lineBase = lineIdx * 6;

                    linePosArr[lineBase] = posArray[i3];
                    linePosArr[lineBase + 1] = posArray[i3 + 1];
                    linePosArr[lineBase + 2] = posArray[i3 + 2];
                    linePosArr[lineBase + 3] = posArray[j3];
                    linePosArr[lineBase + 4] = posArray[j3 + 1];
                    linePosArr[lineBase + 5] = posArray[j3 + 2];

                    if (isDark) {
                        lineColArr[lineBase] = alpha * 0.8;
                        lineColArr[lineBase + 1] = alpha * 0.8;
                        lineColArr[lineBase + 2] = alpha * 1.0;
                        lineColArr[lineBase + 3] = alpha * 0.8;
                        lineColArr[lineBase + 4] = alpha * 0.8;
                        lineColArr[lineBase + 5] = alpha * 1.0;
                    } else {
                        // Colorful in light mode — blend colors of connected nodes
                        const colI = LIGHT_COLORS[nodeColorIndices[i]];
                        const colJ = LIGHT_COLORS[nodeColorIndices[j]];
                        lineColArr[lineBase] = colI[0] * alpha * 3;
                        lineColArr[lineBase + 1] = colI[1] * alpha * 3;
                        lineColArr[lineBase + 2] = colI[2] * alpha * 3;
                        lineColArr[lineBase + 3] = colJ[0] * alpha * 3;
                        lineColArr[lineBase + 4] = colJ[1] * alpha * 3;
                        lineColArr[lineBase + 5] = colJ[2] * alpha * 3;
                    }
                    lineIdx++;
                }
            }
        }

        for (let k = lineIdx; k < maxConnections; k++) {
            const base = k * 6;
            linePosArr[base] = linePosArr[base + 1] = linePosArr[base + 2] = 0;
            linePosArr[base + 3] = linePosArr[base + 4] = linePosArr[base + 5] = 0;
            lineColArr[base] = lineColArr[base + 1] = lineColArr[base + 2] = 0;
            lineColArr[base + 3] = lineColArr[base + 4] = lineColArr[base + 5] = 0;
        }

        linePosAttr.needsUpdate = true;
        lineColAttr.needsUpdate = true;
        lineGeo.setDrawRange(0, lineIdx * 2);
    });

    // Dynamic shader based on theme
    const nodeVertexShader = `
    attribute float size;
    varying float vAlpha;
    varying float vColorIdx;
    attribute float colorIdx;
    void main() {
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = size * (150.0 / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
      vAlpha = 0.6 + 0.4 * (size / 6.0);
      vColorIdx = colorIdx;
    }
  `;

    const darkFragShader = `
    varying float vAlpha;
    void main() {
      float d = length(gl_PointCoord - vec2(0.5));
      if (d > 0.5) discard;
      float glow = 1.0 - smoothstep(0.0, 0.5, d);
      glow = pow(glow, 2.0);
      gl_FragColor = vec4(0.7, 0.7, 0.8, glow * vAlpha * 0.35);
    }
  `;

    const lightFragShader = `
    varying float vAlpha;
    varying float vColorIdx;
    void main() {
      float d = length(gl_PointCoord - vec2(0.5));
      if (d > 0.5) discard;
      float glow = 1.0 - smoothstep(0.0, 0.5, d);
      glow = pow(glow, 1.5);

      // Map color index to vibrant hues
      vec3 col;
      float idx = floor(vColorIdx + 0.5);
      if (idx < 1.0) col = vec3(0.38, 0.42, 0.95);
      else if (idx < 2.0) col = vec3(0.56, 0.28, 0.92);
      else if (idx < 3.0) col = vec3(0.93, 0.30, 0.55);
      else if (idx < 4.0) col = vec3(0.15, 0.78, 0.85);
      else if (idx < 5.0) col = vec3(0.98, 0.55, 0.20);
      else if (idx < 6.0) col = vec3(0.20, 0.82, 0.50);
      else col = vec3(0.95, 0.35, 0.35);

      gl_FragColor = vec4(col, glow * vAlpha * 0.6);
    }
  `;

    return (
        <group ref={groupRef} rotation={[0, 0, 0.15]}>
            <points ref={nodesRef}>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" args={[positions, 3]} count={NODE_COUNT} />
                    <bufferAttribute attach="attributes-size" args={[sizes, 1]} count={NODE_COUNT} />
                    <bufferAttribute attach="attributes-colorIdx" args={[nodeColorIndices, 1]} count={NODE_COUNT} />
                </bufferGeometry>
                <shaderMaterial
                    key={isDark ? "dark" : "light"}
                    transparent
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                    vertexShader={nodeVertexShader}
                    fragmentShader={isDark ? darkFragShader : lightFragShader}
                />
            </points>

            <lineSegments ref={linesRef}>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" args={[linePositions, 3]} count={maxConnections * 2} />
                    <bufferAttribute attach="attributes-color" args={[lineColors, 3]} count={maxConnections * 2} />
                </bufferGeometry>
                <lineBasicMaterial vertexColors transparent blending={THREE.AdditiveBlending} depthWrite={false} />
            </lineSegments>
        </group>
    );
}

export default function HeroNeuralMesh() {
    const { theme } = useTheme();

    return (
        <div className="absolute inset-0">
            <Canvas
                camera={{ position: [0, 0, 7], fov: 50 }}
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: true }}
                style={{ background: "transparent" }}
            >
                <NeuralMesh isDark={theme === "dark"} />
            </Canvas>
        </div>
    );
}
