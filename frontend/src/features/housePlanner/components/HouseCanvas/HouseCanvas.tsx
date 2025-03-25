'use client'

import { useRef, useEffect } from 'react';
import { useHouseStore } from '@/store/houseStore';

export default function HouseCanvas() {
    const { house, roof } = useHouseStore() as any;
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current as any;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const scale = 500 / Math.max(house.width, house.length);
        const widthPx = house.width * scale;
        const lengthPx = house.length * scale;
        const wallThicknessPx = house.wallThickness * scale;

        // 🔹 Коньковый прогон (по центру крыши)
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(50, 50 + lengthPx / 2);
        ctx.lineTo(50 + widthPx, 50 + lengthPx / 2);
        ctx.stroke();

        // 🔹 Добавляем двери
        ctx.fillStyle = '#964B00';
        for (let i = 0; i < house.doors; i++) {
            const x = 50 + (i + 1) * (widthPx / (house.doors + 1));
            ctx.fillRect(x - 15, 50 + lengthPx - wallThicknessPx, 30, wallThicknessPx);
        }

        // 🔹 Рисуем стены
        ctx.fillStyle = '#aaa';
        ctx.fillRect(50, 50, widthPx, wallThicknessPx); // Верхняя стена
        ctx.fillRect(50, 50 + lengthPx - wallThicknessPx, widthPx, wallThicknessPx); // Нижняя стена
        ctx.fillRect(50, 50, wallThicknessPx, lengthPx); // Левая стена
        ctx.fillRect(50 + widthPx - wallThicknessPx, 50, wallThicknessPx, lengthPx); // Правая стена

        // 🔹 Добавляем окна (равномерно распределяем по стенам)
        ctx.fillStyle = '#69c';
        for (let i = 0; i < house.windows; i++) {
            const x = 50 + (i + 1) * (widthPx / (house.windows + 1));
            ctx.fillRect(x - 10, 50, 20, wallThicknessPx); // Окна сверху
        }

        ctx.strokeStyle = '#666';
        ctx.fillStyle = '#8B4513'; // Цвет стропил

        const firstRafterX = 50; // Первая стропила на мауэрлате
        const lastRafterX = 50 + widthPx; // Последняя стропила тоже на мауэрлате

        const overhangPx = roof.overhang * scale; // Длина выноса в пикселях

        // Пересчитываем количество стропил так, чтобы они равномерно располагались
        const numberOfRafters = Math.floor(widthPx / (roof.rafterSpacing * scale)) + 1;
        const adjustedSpacing = widthPx / (numberOfRafters - 1);

        for (let i = 0; i < numberOfRafters; i++) {
            const x = firstRafterX + i * adjustedSpacing;
            ctx.fillRect(x - 3, 50 - overhangPx, 6, lengthPx + overhangPx * 2); // Добавляем вынос
            ctx.strokeRect(x - 3, 50 - overhangPx, 6, lengthPx + overhangPx * 2);
        }

    }, [house]);

    return <canvas className='bg-[#f8f9fa] border border-gray-300 w-full h-auto' ref={canvasRef} width={600} height={600} />;
}
