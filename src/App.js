import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, PresentationControls, Environment, ContactShadows, Html, Stars, OrbitControls } from '@react-three/drei'

export default function App() {
  return (
    <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 4], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} shadow-mapSize={[512, 512]} castShadow />
      <PresentationControls
        global
        config={{ mass: 2, tension: 500 }}
        snap={{ mass: 4, tension: 1900 }}
        rotation={[-4.21, 0, -0.1]}
        polar={[-Math.PI / 1, Math.PI / 3]}
        azimuth={[-Math.PI / 1.03, Math.PI / 1.05]}>
        <ENS rotation={[-Math.PI / 0.1, 0, 0]} position={[-0.3, -5, 0.5]} scale={0.15} />
      </PresentationControls>
      <ContactShadows rotation-x={Math.PI / 2} position={[0, 0, 0]} opacity={0.75} width={10} height={10} blur={2.6} far={2} />
      <OrbitControls minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} enableZoom={true} enablePan={true} />
      <Stars radius={50} depth={100} count={2000} saturation={500} />
    </Canvas>
  )
}

function ENS(props) {
  const ref = useRef()
  const { nodes, materials } = useGLTF('/ENS.glb')
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    ref.current.rotation.x = -Math.PI / 1.75 + Math.cos(t / 4) / 8
    ref.current.rotation.y = Math.sin(t / 4) / 8
    ref.current.rotation.z = (1 + Math.sin(t / 1.5)) / 20
    ref.current.position.y = (1 + Math.sin(t / 1.5)) / 10
  })
  return (
    <group ref={ref} {...props} dispose={null}>
      <mesh
        geometry={nodes.Curve001.geometry}
        material={materials['SVGMat.003']}
        position={[-6.58, 0.51, -1.26]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={76.66}
      />
      <mesh
        geometry={nodes.Curve002.geometry}
        material={materials['SVGMat.001']}
        position={[-6.58, 0.51, -1.26]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={76.66}
      />
      <mesh
        geometry={nodes.Curve003.geometry}
        material={materials['SVGMat.004']}
        position={[-6.58, 0.51, -1.26]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={76.66}
      />
      <mesh
        geometry={nodes.Curve004.geometry}
        material={materials['SVGMat.002']}
        position={[-6.6, 0.51, -1.3]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={76.66}>
        <Html scale={9060} rotation={[Math.PI / 3, -3, -3]} position={[100, -710, 40]} transform opacity={[20]}>
          <div className="annotation">
            <span style={{ fontSize: '1.5em' }}></span>
          </div>
        </Html>
      </mesh>
    </group>
  )
}
