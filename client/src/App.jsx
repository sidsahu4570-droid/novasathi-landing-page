import CosmicBackground from './components/cosmic/CosmicBackground'

function App() {
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {/* PHASE 1 ONLY: Procedural Cosmic Environment */}
      <CosmicBackground />
    </div>
  )
}

export default App
