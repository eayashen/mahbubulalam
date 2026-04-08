import { useMemo, useRef, useEffect, useState } from "react";
import ForceGraph2D from "react-force-graph-2d";

const Connections = ({ graphData }) => {
  const fgRef = useRef();
  const [isInitialized, setIsInitialized] = useState(false);
  const containerRef = useRef();
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setSize({ width, height });
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // ✅ clone data
  const safeData = useMemo(
    () => ({
      nodes: graphData?.nodes?.map((n) => ({ ...n })) || [],
      links: graphData?.links?.map((l) => ({ ...l })) || [],
    }),
    [graphData],
  );

  // ✅ convert lucide icons → SVG image
  const centerImg = useMemo(() => {
    const img = new Image();
    img.src =
      "data:image/svg+xml;utf8," +
      encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-icon lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
      `);
    return img;
  }, []);

  const donorImg = useMemo(() => {
    const img = new Image();
    img.src =
      "data:image/svg+xml;utf8," +
      encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users-icon lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><path d="M16 3.128a4 4 0 0 1 0 7.744"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><circle cx="9" cy="7" r="4"/></svg>
      `);
    return img;
  }, []);

  // ✅ Method 1: Use onEngineStop with a delay to ensure final positions
  const handleEngineStop = () => {
    if (fgRef.current && typeof fgRef.current.zoomToFit === "function") {
      // Small delay to ensure all nodes have settled
      setTimeout(() => {
        fgRef.current.zoomToFit(500, 80);
        setIsInitialized(true);
      }, 50);
    }
  };

  // ✅ Method 2: Also trigger on frame update for smoother experience
  useEffect(() => {
    if (!isInitialized && fgRef.current && safeData.nodes.length) {
      // Initial positioning to center
      const timer = setTimeout(() => {
        if (fgRef.current && typeof fgRef.current.centerAt === "function") {
          fgRef.current.centerAt(0, 0, 500);
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [safeData, isInitialized]);

  // ✅ Method 3: Force initial node positions to avoid top-left issue
  const initializedData = useMemo(() => {
    if (!safeData.nodes.length) return safeData;

    // Pre-position nodes to avoid initial clustering at (0,0)
    const nodesWithPositions = safeData.nodes.map((node, index) => {
      // If nodes don't have positions, give them random initial positions
      if (!node.x || !node.y) {
        // Distribute nodes in a circle or grid pattern
        const angle = (index / safeData.nodes.length) * Math.PI * 2;
        const radius = Math.min(200, Math.sqrt(safeData.nodes.length) * 30);
        return {
          ...node,
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius,
        };
      }
      return node;
    });

    return {
      ...safeData,
      nodes: nodesWithPositions,
    };
  }, [safeData]);

  return (
    <div ref={containerRef} className="w-full h-[500px]">
      <ForceGraph2D
        ref={fgRef}
        width={size.width}
        height={size.height}
        graphData={initializedData}
        enableZoomInteraction={false}
        enablePanInteraction={false}
        d3Force="charge"
        d3ForceStrength={-250}
        nodeLabel="id"
        onEngineStop={handleEngineStop}
        nodeCanvasObject={(node, ctx, globalScale) => {
          const label = node.id;
          const fontSize = 11 / globalScale;

          const size = node.group === "center" ? 8 : 4;
          const img = node.group === "center" ? centerImg : donorImg;

          if (img.complete) {
            ctx.drawImage(
              img,
              node.x - size / 2,
              node.y - size / 2,
              size,
              size,
            );
          }

          ctx.font = `${fontSize}px Sans-Serif`;
          ctx.fillStyle = "#333";
          ctx.fillText(label, node.x + size / 2, node.y + 4);
        }}
        linkWidth={(link) => Math.log(link.value + 1) * 2}
        linkColor={() => "#ccc"}
        cooldownTicks={120}
        cooldownTime={300}
      />
    </div>
  );
};

export default Connections;
