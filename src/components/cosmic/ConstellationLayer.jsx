import React from 'react';

/**
 * ConstellationLayer — Geometric Astronomical Constellations
 * 5 geometric constellation star groups connected with delicate dashed SVG lines.
 * Subtle pulsation and shimmering glow.
 */
export default function ConstellationLayer() {
  // Constellation Group 1: Cassiopeia (W-Shape, Top-Left)
  const cassiopeia = {
    nodes: [
      { x: 120, y: 110, id: 'cas-1' },
      { x: 165, y: 145, id: 'cas-2', gold: true },
      { x: 215, y: 125, id: 'cas-3' },
      { x: 270, y: 160, id: 'cas-4' },
      { x: 315, y: 130, id: 'cas-5', gold: true }
    ],
    edges: [[0, 1], [1, 2], [2, 3], [3, 4]]
  };

  // Constellation Group 2: Northern Crown / Corona Borealis (Arc, Top-Center)
  const coronaBorealis = {
    nodes: [
      { x: 580, y: 90, id: 'cb-1' },
      { x: 615, y: 115, id: 'cb-2' },
      { x: 655, y: 125, id: 'cb-3', gold: true }, // Alphecca
      { x: 695, y: 118, id: 'cb-4' },
      { x: 730, y: 95, id: 'cb-5' }
    ],
    edges: [[0, 1], [1, 2], [2, 3], [3, 4]]
  };

  // Constellation Group 3: Northern Cross / Cygnus (Top-Right / Discovery Perimeter)
  const cygnus = {
    nodes: [
      { x: 1180, y: 120, id: 'cyg-1', label: 'Deneb' }, // Deneb
      { x: 1140, y: 180, id: 'cyg-2', gold: true }, // Sadr
      { x: 1100, y: 240, id: 'cyg-3' }, // Albireo
      { x: 1070, y: 155, id: 'cyg-4' }, // Wing Left
      { x: 1210, y: 205, id: 'cyg-5' }  // Wing Right
    ],
    edges: [[0, 1], [1, 2], [3, 1], [1, 4]]
  };

  // Constellation Group 4: Orion's Bow & Belt (Mid-Left Zone 2/3 Boundary)
  const orionSegment = {
    nodes: [
      { x: 140, y: 440, id: 'ori-1' }, // Betelgeuse
      { x: 240, y: 420, id: 'ori-2' }, // Bellatrix
      { x: 175, y: 495, id: 'ori-3', gold: true }, // Belt 1
      { x: 190, y: 490, id: 'ori-4', gold: true }, // Belt 2
      { x: 205, y: 485, id: 'ori-5', gold: true }, // Belt 3
      { x: 150, y: 560, id: 'ori-6' }, // Saiph
      { x: 250, y: 540, id: 'ori-7' }  // Rigel
    ],
    edges: [[0, 1], [0, 2], [1, 4], [2, 3], [3, 4], [2, 5], [4, 6]]
  };

  // Constellation Group 5: Pegasus Square / Dipper Segment (Bottom-Right Zone 5)
  const pegasusSquare = {
    nodes: [
      { x: 1120, y: 680, id: 'peg-1' },
      { x: 1260, y: 660, id: 'peg-2', gold: true },
      { x: 1280, y: 780, id: 'peg-3' },
      { x: 1140, y: 800, id: 'peg-4' }
    ],
    edges: [[0, 1], [1, 2], [2, 3], [3, 0]]
  };

  const constellations = [cassiopeia, coronaBorealis, cygnus, orionSegment, pegasusSquare];

  return (
    <div className="cosmic-layer" aria-hidden="true">
      <svg className="orbit-svg" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        {constellations.map((c, groupIdx) => (
          <g key={`constellation-group-${groupIdx}`}>
            {/* Connecting Lines */}
            {c.edges.map(([fromIdx, toIdx], edgeIdx) => {
              const p1 = c.nodes[fromIdx];
              const p2 = c.nodes[toIdx];
              return (
                <line
                  key={`edge-${groupIdx}-${edgeIdx}`}
                  x1={p1.x}
                  y1={p1.y}
                  x2={p2.x}
                  y2={p2.y}
                  className="constellation-line"
                  style={{ animationDelay: `${groupIdx * 1.5 + edgeIdx * 0.4}s` }}
                />
              );
            })}

            {/* Star Vertices */}
            {c.nodes.map((node) => (
              <circle
                key={node.id}
                cx={node.x}
                cy={node.y}
                r={node.gold ? 2.8 : 2.0}
                className={node.gold ? "constellation-node-gold" : "constellation-node"}
                style={{ animationDelay: `${groupIdx * 0.8}s` }}
              />
            ))}
          </g>
        ))}
      </svg>
    </div>
  );
}
