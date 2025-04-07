'use client'
import { useState, useEffect } from 'react';
import { useHouseStore } from '@/store/houseStore';

export default function HousePlanner() {
    const { mode, walls, addWall, addRoom } = useHouseStore() as any;
    const [tempWall, setTempWall] = useState(null) as any;
    const [startPoint, setStartPoint] = useState(null) as any;
    const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

    // Update dimensions on resize
    useEffect(() => {
        const updateSize = () => {
            setDimensions({ width: window.innerWidth, height: window.innerHeight });
        };
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    // Update dimensions on resize
    useEffect(() => {
        setStartPoint(null);
        setTempWall(null);
    }, [mode]);

    // Dynamic scaling based on house size
    const pixelsPerMeter = 100;
    const scale = pixelsPerMeter;

    const handleMouseClick = (e: any) => {
        if (mode !== 'walls') return;
        const x = e.nativeEvent.offsetX;
        const y = e.nativeEvent.offsetY;
        if (!startPoint) {
            setStartPoint({ x, y });
        } else {
            addWall({ x1: startPoint.x, y1: startPoint.y, x2: x, y2: y });
            checkForRoom([...walls, { x1: startPoint.x, y1: startPoint.y, x2: x, y2: y }]);
            setStartPoint({ x, y });
            setTempWall(null);
        }
    };

    const handleMouseMove = (e: any) => {
        if (!startPoint || mode !== 'walls') return;

        const gridSize = 100; // 1 meter = 100 pixels
        const snapThreshold = 10; // Pixels within which snapping happens

        const x = snapToGrid(e.nativeEvent.offsetX, gridSize, snapThreshold);
        const y = snapToGrid(e.nativeEvent.offsetY, gridSize, snapThreshold);

        const snap = findNearestWallPoint(x, y, (useHouseStore.getState() as any).walls);
        if (snap) {
            setTempWall({ x1: startPoint.x, y1: startPoint.y, x2: snap.x, y2: snap.y });
        } else {
            setTempWall({ x1: startPoint.x, y1: startPoint.y, x2: x, y2: y });
        }

        // setTempWall({ x1: startPoint.x, y1: startPoint.y, x2: x, y2: y });
    };

    // Check if walls form a closed room
    const checkForRoom = (updatedWalls: any[]) => {
        const points = new Set();

        updatedWalls.forEach((wall) => {
            points.add(`${wall.x1},${wall.y1}`);
            points.add(`${wall.x2},${wall.y2}`);
        });

        const pointArray = Array.from(points).map((p: any) => p.split(',').map(Number));
        console.log("🚀 ~ checkForRoom ~ pointArray:", pointArray)

        // Проверяем, образуют ли точки замкнутый контур
        if (isClosedPolygon(pointArray)) {
            console.log("🚀 ~ checkForRoom ~ pointArray:", pointArray)
            addRoom(pointArray);
        }
    };

    let rooms = (useHouseStore.getState() as any).rooms
    console.log("🚀 ~ HousePlanner ~ rooms:", rooms)

    return (
        <svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${dimensions.width} ${dimensions.height}`} // Показываем всю область
            className="bg-[#f8f9fa] border border-gray-300"
            onClick={handleMouseClick}
            onMouseMove={handleMouseMove}
        >

            {/* Render rooms */}
            {(useHouseStore.getState() as any).rooms.map((room: any, index: any) => (
                <polygon
                    key={index}
                    points={room.points.map((p: number[]) => p.join(',')).join(' ')}
                    fill="rgba(255, 223, 186, 0.5)"
                    stroke="orange"
                />
            ))}

            {/* Grid */}
            {drawGrid(dimensions.width, dimensions.height, scale)}

            {/* Render saved walls */}
            {(useHouseStore.getState() as any).walls.map((wall: any, index: any) => (
                <line key={index} x1={wall.x1} y1={wall.y1} x2={wall.x2} y2={wall.y2} stroke="black" strokeWidth="4" />
            ))}

            {/* Temporary wall preview */}
            {tempWall && (
                <g>
                    <line x1={tempWall.x1} y1={tempWall.y1} x2={tempWall.x2} y2={tempWall.y2} stroke="gray" strokeWidth="2" strokeDasharray="5,5" />
                    {drawWallLabel(tempWall)}
                </g>
            )}
        </svg>
    );
}

// Draw wall label
function drawWallLabel(wall: any) {
    const midX = (wall.x1 + wall.x2) / 2;
    const midY = (wall.y1 + wall.y2) / 2;
    const length = (Math.sqrt((wall.x2 - wall.x1) ** 2 + (wall.y2 - wall.y1) ** 2) / 100).toFixed(2); // Length in meters

    return (
        <text x={midX} y={midY - 5} fontSize="14" fill="black" textAnchor="middle">
            {length} м
        </text>
    );
}

// Draw grid
function drawGrid(width: number, height: number, scale: number) {
    const step = scale / 2; // 1 meter = scale пикселей
    const lines = [];

    // Vertical lines
    for (let x = 0; x <= width; x += step) {
        lines.push(<line key={`v${x}`} x1={x} y1={0} x2={x} y2={height} stroke="#ddd" strokeWidth="1" />);
    }

    // Horizontal lines
    for (let y = 0; y <= height; y += step) {
        lines.push(<line key={`h${y}`} x1={0} y1={y} x2={width} y2={y} stroke="#ddd" strokeWidth="1" />);
    }

    return lines;
}

// Function to snap coordinates to the grid
function snapToGrid(value: number, gridSize: number, threshold: number) {
    const remainder = value % gridSize;
    if (remainder < threshold || remainder > gridSize - threshold) {
        return Math.round(value / gridSize) * gridSize;
    }
    return value;
}


// Check by closed circuit
function isClosedPolygon(points: number[][], tolerance = 10): boolean {
    if (points.length < 3) return false;

    const [x1, y1] = points[0];
    const [x2, y2] = points[points.length - 1];
    const dist = Math.hypot(x1 - x2, y1 - y2);

    return dist < tolerance;
}

function findNearestWallPoint(x: number, y: number, walls: any[], threshold = 10) {
    let nearest = null;
    let minDist = Infinity;

    for (const wall of walls) {
        const points = [
            { x: wall.x1, y: wall.y1 },
            { x: wall.x2, y: wall.y2 }
        ];
        for (const p of points) {
            const dist = Math.hypot(x - p.x, y - p.y);
            if (dist < threshold && dist < minDist) {
                nearest = p;
                minDist = dist;
            }
        }
    }

    return nearest;
}
