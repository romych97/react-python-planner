'use client'

import { useRef, useEffect, useState } from 'react';
import { useHouseStore } from '@/store/houseStore';

export default function HouseCanvas() {
    const [dragging, setDragging] = useState<{ type: string, index: number } | null>(null);

    const { house, roof, updateHouse } = useHouseStore() as any;
    console.log("🚀 ~ HouseCanvas ~ house:", house)
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current as any;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const scale = 500 / Math.max(house.width, house.length);
        const widthPx = house.width * scale;
        const lengthPx = house.length * scale;
        const wallThicknessPx = house.wallThickness * scale;


        drawRafters(ctx, widthPx, lengthPx, roof.rafterSpacing, scale, roof.overhang);

        drawDoors(ctx, widthPx, lengthPx, house.doors);
        drawWindows(ctx, widthPx, house.windows);
        drawWalls(ctx, widthPx, lengthPx, wallThicknessPx);

        drawRoof(ctx, widthPx, lengthPx);
    }, [house, roof]);

    // Handle mouse events
    const handleMouseDown = (event: React.MouseEvent) => {
        const { offsetX, offsetY } = event.nativeEvent;

        for (let i = 0; i < house.doors.length; i++) {
            const door = house.doors[i];
            if (offsetX >= door.x && offsetX <= door.x + 30 &&
                offsetY >= door.y && offsetY <= door.y + 10) {
                setDragging({ type: 'doors', index: i });
                return;
            }
        }

        for (let i = 0; i < house.windows.length; i++) {
            const window = house.windows[i];
            if (offsetX >= window.x && offsetX <= window.x + 20 &&
                offsetY >= window.y && offsetY <= window.y + 10) {
                setDragging({ type: 'windows', index: i });
                return;
            }
        }
    };


    const handleMouseMove = (event: React.MouseEvent) => {
        if (!dragging) return;

        const { offsetX, offsetY } = event.nativeEvent;
        const updatedElements = [...house[dragging.type]];

        updatedElements[dragging.index] = { x: offsetX, y: offsetY };

        updateHouse({ ...house, [dragging.type]: updatedElements });
    };

    const handleMouseUp = () => {
        setDragging(null);
    };

    return <canvas
        className='bg-[#f8f9fa] border border-gray-300 w-full h-auto'
        ref={canvasRef}
        width={600}
        height={600}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp} />;
}

// Draw house walls
function drawWalls(ctx: CanvasRenderingContext2D, widthPx: number, lengthPx: number, wallThicknessPx: number) {
    ctx.fillStyle = '#ffb84d';
    ctx.strokeStyle = '#f9d15a';
    ctx.fillRect(50, 50, widthPx, wallThicknessPx); // Верхняя стена
    ctx.fillRect(50, 50 + lengthPx - wallThicknessPx, widthPx, wallThicknessPx); // Нижняя стена
    ctx.fillRect(50, 50, wallThicknessPx, lengthPx); // Левая стена
    ctx.fillRect(50 + widthPx - wallThicknessPx, 50, wallThicknessPx, lengthPx); // Правая стена

}

// Draw roof ridge
function drawRoof(ctx: CanvasRenderingContext2D, widthPx: number, lengthPx: number) {
    console.log("🚀 ~ drawRoof ~ lengthPx:", lengthPx)
    console.log("🚀 ~ drawRoof ~ widthPx:", widthPx)
    ctx.fillStyle = '#ffeaaa';
    ctx.strokeStyle = '#e9c862';
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(50, 50 + lengthPx / 2);
    ctx.lineTo(50 + widthPx, 50 + lengthPx / 2);
    ctx.stroke();
}

// Draw rafters with overhang
function drawRafters(ctx: CanvasRenderingContext2D, widthPx: number, lengthPx: number, rafterSpacing: number, scale: number, overhang: number) {
    ctx.lineWidth = 1;

    ctx.fillStyle = '#ffeaaa';
    ctx.strokeStyle = '#e9c862'; // Rafter color

    const firstRafterX = 50; // first rafter on the wall plate
    const overhangPx = overhang * scale; // Extension length in pixels

    // We recalculate the number of rafters so that they are evenly spaced.
    const numberOfRafters = Math.floor(widthPx / (rafterSpacing * scale)) + 1;
    const adjustedSpacing = widthPx / (numberOfRafters - 1);

    for (let i = 0; i < numberOfRafters; i++) {
        const x = firstRafterX + i * adjustedSpacing;
        ctx.fillRect(x - 3, 50 - overhangPx, 6, lengthPx + overhangPx * 2); // Добавляем вынос
        ctx.strokeRect(x - 3, 50 - overhangPx, 6, lengthPx + overhangPx * 2);
    }

}

// Draw doors
function drawDoors(ctx: CanvasRenderingContext2D, widthPx: number, lengthPx: number, doors: number) {
    ctx.fillStyle = '#964B00';

    for (let i = 0; i < doors; i++) {
        const x = 50 + (i + 1) * (widthPx / (doors + 1));
        ctx.fillRect(x - 15, 50 + lengthPx - 10, 30, 10);
    }
}

// Draw windows
function drawWindows(ctx: CanvasRenderingContext2D, widthPx: number, windows: number) {
    ctx.fillStyle = '#69c';

    for (let i = 0; i < windows; i++) {
        const x = 50 + (i + 1) * (widthPx / (windows + 1));
        ctx.fillRect(x - 10, 50, 20, 10);
    }
}

