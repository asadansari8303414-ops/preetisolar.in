import { Card, CardContent } from "@/components/ui/card";

interface SystemDiagramProps {
  type: "on-grid" | "off-grid" | "hybrid";
}

const SystemDiagram = ({ type }: SystemDiagramProps) => {
  const diagrams = {
    "on-grid": (
      <div className="w-full">
        <svg viewBox="0 0 800 300" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
          {/* Solar Panels */}
          <g>
            <rect x="20" y="80" width="120" height="140" fill="#FFD700" stroke="#FF9900" strokeWidth="3" rx="8"/>
            <text x="80" y="110" textAnchor="middle" fontSize="16" fontWeight="bold">☀️ Solar</text>
            <text x="80" y="130" textAnchor="middle" fontSize="14">Panels</text>
            <text x="80" y="150" textAnchor="middle" fontSize="12" fill="#666">15 Panels</text>
            <text x="80" y="170" textAnchor="middle" fontSize="12" fill="#666">5kW</text>
          </g>
          
          {/* Arrow 1 */}
          <path d="M 140 150 L 200 150" stroke="#4169E1" strokeWidth="3" markerEnd="url(#arrowblue)"/>
          <text x="170" y="140" textAnchor="middle" fontSize="10" fill="#666">DC</text>
          
          {/* Inverter */}
          <g>
            <rect x="200" y="80" width="120" height="140" fill="#87CEEB" stroke="#4169E1" strokeWidth="3" rx="8"/>
            <text x="260" y="110" textAnchor="middle" fontSize="16" fontWeight="bold">⚡ Grid-Tied</text>
            <text x="260" y="130" textAnchor="middle" fontSize="14">Inverter</text>
            <text x="260" y="150" textAnchor="middle" fontSize="12" fill="#666">5kW</text>
          </g>
          
          {/* Arrow 2 to Home */}
          <path d="M 320 120 L 400 80 L 480 80" stroke="#4169E1" strokeWidth="3" markerEnd="url(#arrowblue)"/>
          <text x="390" y="75" textAnchor="middle" fontSize="10" fill="#666">AC</text>
          
          {/* Home */}
          <g>
            <rect x="480" y="30" width="120" height="100" fill="#90EE90" stroke="#228B22" strokeWidth="3" rx="8"/>
            <text x="540" y="60" textAnchor="middle" fontSize="16" fontWeight="bold">🏠 Home</text>
            <text x="540" y="80" textAnchor="middle" fontSize="14">Direct Use</text>
          </g>
          
          {/* Arrow 2 to Grid */}
          <path d="M 320 180 L 400 220 L 480 220" stroke="#4169E1" strokeWidth="3" markerEnd="url(#arrowblue)"/>
          <text x="390" y="215" textAnchor="middle" fontSize="10" fill="#666">Export</text>
          
          {/* Grid */}
          <g>
            <rect x="480" y="170" width="120" height="100" fill="#FFB6C1" stroke="#FF1493" strokeWidth="3" rx="8"/>
            <text x="540" y="200" textAnchor="middle" fontSize="16" fontWeight="bold">🔌 Grid</text>
            <text x="540" y="220" textAnchor="middle" fontSize="14">Net Meter</text>
          </g>
          
          {/* Arrow from Grid to Home */}
          <path d="M 540 170 L 540 130" stroke="#FF1493" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowpink)"/>
          <text x="550" y="150" fontSize="10" fill="#666">Night</text>
          
          {/* Arrow markers */}
          <defs>
            <marker id="arrowblue" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L0,6 L9,3 z" fill="#4169E1" />
            </marker>
            <marker id="arrowpink" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L0,6 L9,3 z" fill="#FF1493" />
            </marker>
          </defs>
        </svg>
      </div>
    ),
    "off-grid": (
      <div className="w-full">
        <svg viewBox="0 0 900 300" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
          {/* Solar Panels */}
          <g>
            <rect x="20" y="80" width="120" height="140" fill="#FFD700" stroke="#FF9900" strokeWidth="3" rx="8"/>
            <text x="80" y="110" textAnchor="middle" fontSize="16" fontWeight="bold">☀️ Solar</text>
            <text x="80" y="130" textAnchor="middle" fontSize="14">Panels</text>
            <text x="80" y="150" textAnchor="middle" fontSize="12" fill="#666">20 Panels</text>
            <text x="80" y="170" textAnchor="middle" fontSize="12" fill="#666">6kW</text>
          </g>
          
          {/* Arrow 1 */}
          <path d="M 140 150 L 200 150" stroke="#4169E1" strokeWidth="3" markerEnd="url(#arrowblue2)"/>
          <text x="170" y="140" textAnchor="middle" fontSize="10" fill="#666">DC</text>
          
          {/* Charge Controller */}
          <g>
            <rect x="200" y="80" width="130" height="140" fill="#87CEEB" stroke="#4169E1" strokeWidth="3" rx="8"/>
            <text x="265" y="110" textAnchor="middle" fontSize="16" fontWeight="bold">🔋 Charge</text>
            <text x="265" y="130" textAnchor="middle" fontSize="14">Controller</text>
            <text x="265" y="150" textAnchor="middle" fontSize="12" fill="#666">PWM/MPPT</text>
          </g>
          
          {/* Arrow 2 */}
          <path d="M 330 150 L 390 150" stroke="#4169E1" strokeWidth="3" markerEnd="url(#arrowblue2)"/>
          
          {/* Battery Bank */}
          <g>
            <rect x="390" y="80" width="130" height="140" fill="#FF6347" stroke="#DC143C" strokeWidth="3" rx="8"/>
            <text x="455" y="110" textAnchor="middle" fontSize="16" fontWeight="bold">🔋 Battery</text>
            <text x="455" y="130" textAnchor="middle" fontSize="14">Bank</text>
            <text x="455" y="150" textAnchor="middle" fontSize="12" fill="#FFF">48V 200Ah</text>
            <text x="455" y="170" textAnchor="middle" fontSize="12" fill="#FFF">Lithium</text>
          </g>
          
          {/* Arrow 3 */}
          <path d="M 520 150 L 580 150" stroke="#4169E1" strokeWidth="3" markerEnd="url(#arrowblue2)"/>
          
          {/* Off-Grid Inverter */}
          <g>
            <rect x="580" y="80" width="120" height="140" fill="#87CEEB" stroke="#4169E1" strokeWidth="3" rx="8"/>
            <text x="640" y="110" textAnchor="middle" fontSize="16" fontWeight="bold">⚡ Off-Grid</text>
            <text x="640" y="130" textAnchor="middle" fontSize="14">Inverter</text>
            <text x="640" y="150" textAnchor="middle" fontSize="12" fill="#666">6kW</text>
          </g>
          
          {/* Arrow 4 */}
          <path d="M 700 150 L 760 150" stroke="#4169E1" strokeWidth="3" markerEnd="url(#arrowblue2)"/>
          <text x="730" y="140" textAnchor="middle" fontSize="10" fill="#666">AC</text>
          
          {/* Home */}
          <g>
            <rect x="760" y="80" width="120" height="140" fill="#90EE90" stroke="#228B22" strokeWidth="3" rx="8"/>
            <text x="820" y="120" textAnchor="middle" fontSize="16" fontWeight="bold">🏠 Home</text>
            <text x="820" y="140" textAnchor="middle" fontSize="14">24×7 Power</text>
            <text x="820" y="160" textAnchor="middle" fontSize="12" fill="#666">Independent</text>
          </g>
          
          {/* Arrow markers */}
          <defs>
            <marker id="arrowblue2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L0,6 L9,3 z" fill="#4169E1" />
            </marker>
          </defs>
        </svg>
      </div>
    ),
    "hybrid": (
      <div className="w-full">
        <svg viewBox="0 0 900 350" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
          {/* Solar Panels */}
          <g>
            <rect x="20" y="120" width="120" height="110" fill="#FFD700" stroke="#FF9900" strokeWidth="3" rx="8"/>
            <text x="80" y="150" textAnchor="middle" fontSize="16" fontWeight="bold">☀️ Solar</text>
            <text x="80" y="170" textAnchor="middle" fontSize="14">Panels</text>
            <text x="80" y="190" textAnchor="middle" fontSize="12" fill="#666">18 Panels 5.4kW</text>
          </g>
          
          {/* Arrow to Hybrid Inverter */}
          <path d="M 140 175 L 240 175" stroke="#4169E1" strokeWidth="3" markerEnd="url(#arrowblue3)"/>
          <text x="190" y="165" textAnchor="middle" fontSize="10" fill="#666">DC</text>
          
          {/* Hybrid Inverter (Center) */}
          <g>
            <rect x="240" y="120" width="140" height="110" fill="#87CEEB" stroke="#4169E1" strokeWidth="3" rx="8"/>
            <text x="310" y="150" textAnchor="middle" fontSize="16" fontWeight="bold">⚡ Hybrid</text>
            <text x="310" y="170" textAnchor="middle" fontSize="14">Inverter</text>
            <text x="310" y="190" textAnchor="middle" fontSize="12" fill="#666">Smart Switch</text>
          </g>
          
          {/* Battery Bank (Below Inverter) */}
          <g>
            <rect x="260" y="250" width="100" height="80" fill="#FF6347" stroke="#DC143C" strokeWidth="3" rx="8"/>
            <text x="310" y="275" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#FFF">🔋 Battery</text>
            <text x="310" y="295" textAnchor="middle" fontSize="12" fill="#FFF">48V 150Ah</text>
          </g>
          
          {/* Arrow Inverter to Battery */}
          <path d="M 310 230 L 310 250" stroke="#DC143C" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowred)"/>
          
          {/* Arrow to Home (top) */}
          <path d="M 380 150 L 480 80 L 580 80" stroke="#228B22" strokeWidth="3" markerEnd="url(#arrowgreen)"/>
          <text x="480" y="75" textAnchor="middle" fontSize="10" fill="#666">Direct AC</text>
          
          {/* Home */}
          <g>
            <rect x="580" y="30" width="120" height="100" fill="#90EE90" stroke="#228B22" strokeWidth="3" rx="8"/>
            <text x="640" y="60" textAnchor="middle" fontSize="16" fontWeight="bold">🏠 Home</text>
            <text x="640" y="80" textAnchor="middle" fontSize="14">Load</text>
          </g>
          
          {/* Arrow to Grid (bottom) */}
          <path d="M 380 200 L 480 270 L 580 270" stroke="#FF1493" strokeWidth="3" markerEnd="url(#arrowpink2)"/>
          <text x="480" y="265" textAnchor="middle" fontSize="10" fill="#666">Export/Import</text>
          
          {/* Grid */}
          <g>
            <rect x="580" y="220" width="120" height="100" fill="#FFB6C1" stroke="#FF1493" strokeWidth="3" rx="8"/>
            <text x="640" y="250" textAnchor="middle" fontSize="16" fontWeight="bold">🔌 Grid</text>
            <text x="640" y="270" textAnchor="middle" fontSize="14">Net Meter</text>
          </g>
          
          {/* Arrow from Grid to Home */}
          <path d="M 640 220 L 640 130" stroke="#FF1493" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowpink2)"/>
          <text x="655" y="175" fontSize="10" fill="#666">Backup</text>
          
          {/* Arrow markers */}
          <defs>
            <marker id="arrowblue3" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L0,6 L9,3 z" fill="#4169E1" />
            </marker>
            <marker id="arrowgreen" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L0,6 L9,3 z" fill="#228B22" />
            </marker>
            <marker id="arrowpink2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L0,6 L9,3 z" fill="#FF1493" />
            </marker>
            <marker id="arrowred" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L0,6 L9,3 z" fill="#DC143C" />
            </marker>
          </defs>
        </svg>
      </div>
    )
  };

  return (
    <Card className="my-4">
      <CardContent className="p-6">
        {diagrams[type]}
      </CardContent>
    </Card>
  );
};

export default SystemDiagram;
