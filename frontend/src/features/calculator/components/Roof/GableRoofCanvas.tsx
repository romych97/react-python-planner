import { useEffect, useRef } from 'react';

export default function GableRoofCanvas({ roofParams }: any) {
    const { houseLength, houseWidth, battenWidth, battenThickness, battenSpacing, rafterSpacing, roofOverhang } = roofParams;
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current as any;
        const ctx = canvas.getContext('2d');
        const canvasSize = 600;
        const beamWidthInCm = 40;
        const ridgeBeamWidthCm = 20;
        const padding = 70;

        // We determine the scale (so that the layout does not go beyond the canvas boundaries)
        const maxHouseDimension = Math.max(houseLength, houseWidth);
        const cmToPx = (canvasSize - padding * 2) / (maxHouseDimension + roofOverhang * 2);

        // Elements size in px
        const houseLengthInPx = houseLength * cmToPx;
        const houseWidthInPx = houseWidth * cmToPx;
        const ridgeBeamWidthPx = ridgeBeamWidthCm * cmToPx;
        const beamWidthInPx = beamWidthInCm * cmToPx;
        const overhangInPx = roofOverhang * cmToPx;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Position of start render
        const startX = (canvas.width - houseLengthInPx) / 2;
        const startY = (canvas.height - houseWidthInPx) / 2;

        // FIll house area
        ctx.fillStyle = '#fff';
        ctx.fillRect(startX, startY, houseLengthInPx, houseWidthInPx);

        // Mauerlat
        ctx.fillStyle = '#ffb84d';
        ctx.strokeStyle = '#f9d15a';
        ctx.lineWidth = 2;

        // Top and Botton border of Mauerlat
        ctx.fillRect(startX, startY, houseLengthInPx, beamWidthInPx);
        ctx.strokeRect(startX, startY, houseLengthInPx, beamWidthInPx);

        ctx.fillRect(startX, startY + houseWidthInPx - beamWidthInPx, houseLengthInPx, beamWidthInPx);
        ctx.strokeRect(startX, startY + houseWidthInPx - beamWidthInPx, houseLengthInPx, beamWidthInPx);

        // Left and right border of Mauerlat
        ctx.fillRect(startX, startY, beamWidthInPx, houseWidthInPx);
        ctx.strokeRect(startX, startY, beamWidthInPx, houseWidthInPx);

        ctx.fillRect(startX + houseLengthInPx - beamWidthInPx, startY, beamWidthInPx, houseWidthInPx);
        ctx.strokeRect(startX + houseLengthInPx - beamWidthInPx, startY, beamWidthInPx, houseWidthInPx);

        // lathing
        ctx.fillStyle = '#ffeaaa';
        ctx.strokeStyle = '#e9c862';
        ctx.lineWidth = 1;

        const centerY = startY + houseWidthInPx / 2;

        for (let y = centerY; y >= startY - overhangInPx; y -= battenSpacing * cmToPx) {
            ctx.fillRect(startX - overhangInPx, y - battenWidth * cmToPx / 2, houseLengthInPx + overhangInPx * 2, battenWidth * cmToPx);
            ctx.strokeRect(startX - overhangInPx, y - battenWidth * cmToPx / 2, houseLengthInPx + overhangInPx * 2, battenWidth * cmToPx);
        }

        for (let y = centerY; y <= startY + houseWidthInPx + overhangInPx; y += battenSpacing * cmToPx) {
            ctx.fillRect(startX - overhangInPx, y - battenWidth * cmToPx / 2, houseLengthInPx + overhangInPx * 2, battenWidth * cmToPx);
            ctx.strokeRect(startX - overhangInPx, y - battenWidth * cmToPx / 2, houseLengthInPx + overhangInPx * 2, battenWidth * cmToPx);
        }

        // Ridge
        ctx.fillStyle = '#ffeaaa';
        ctx.strokeStyle = '#e9c862';
        const ridgeX = startX - overhangInPx;
        const ridgeY = startY + houseWidthInPx / 2 - ridgeBeamWidthPx / 2;
        ctx.fillRect(ridgeX, ridgeY, houseLengthInPx + overhangInPx * 2, ridgeBeamWidthPx);
        ctx.strokeRect(ridgeX, ridgeY, houseLengthInPx + overhangInPx * 2, ridgeBeamWidthPx);

        // Line with sizes
        drawDimensionLine({
            ctx: ctx,
            x1: startX - overhangInPx - 15, // Offset the line to the left of the model
            y1: startY - overhangInPx,      // Start of line at top
            x2: startX - overhangInPx - 15, // The end of the line is also to the left of the model
            y2: startY + houseWidthInPx + overhangInPx, // Bottom of the line
            label: `${houseLength}`,
            orientation: 'vertical'
        });

        drawDimensionLine({
            ctx: ctx,
            x1: startX - overhangInPx,
            y1: startY + houseWidthInPx + overhangInPx + 15,
            x2: startX + houseLengthInPx + overhangInPx,
            y2: startY + houseWidthInPx + overhangInPx + 15,
            label: `${houseWidth}`,
            orientation: 'horizontal'
        });

        // Rafter system
        const rafterWidthInPx = 6 * cmToPx;
        const totalHeightInPx = houseWidthInPx + 2 * overhangInPx;

        const startY2 = startY - overhangInPx;
        const numberOfRafters = Math.floor(houseLengthInPx / rafterSpacing + cmToPx / 2);
        const adjustedSpacing = (houseLengthInPx - rafterWidthInPx) / (numberOfRafters - 1);

        for (let i = 0; i < numberOfRafters; i++) {
            const x = startX + i * adjustedSpacing;
            ctx.fillRect(x - rafterWidthInPx / 2, startY2, rafterWidthInPx, totalHeightInPx);
            ctx.strokeRect(x - rafterWidthInPx / 2, startY2, rafterWidthInPx, totalHeightInPx);
        }

    }, [roofParams]);

    // Function to draw a line with size
    const drawDimensionLine = ({ ctx, x1, y1, x2, y2, label, orientation }: any) => {

        const arrowSize = 6;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.fillStyle = 'black';

        if (orientation === 'vertical') {
            // Left arrow
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x1 - arrowSize, y1 + arrowSize);
            ctx.lineTo(x1 + arrowSize, y1 + arrowSize);
            ctx.closePath();
            ctx.fill();

            // Right arrow
            ctx.beginPath();
            ctx.moveTo(x2, y2);
            ctx.lineTo(x2 - arrowSize, y2 - arrowSize);
            ctx.lineTo(x2 + arrowSize, y2 - arrowSize);
            ctx.closePath();
            ctx.fill();
        }
        if (orientation === 'horizontal') {

            // Left arrow
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x1 + arrowSize, y1 - arrowSize);
            ctx.lineTo(x1 + arrowSize, y1 + arrowSize);
            ctx.closePath();
            ctx.fill();

            // Right arrow
            ctx.beginPath();
            ctx.moveTo(x2, y2);
            ctx.lineTo(x2 - arrowSize, y2 - arrowSize);
            ctx.lineTo(x2 - arrowSize, y2 + arrowSize);
            ctx.closePath();
            ctx.fill();
        }

        // Text
        ctx.font = '10px Arial';

        const textOffset = orientation === 'vertical' ? 15 : -15;
        const midX = (x1 + x2) / 2;
        const midY = (y1 + y2) / 2;

        if (orientation === 'vertical') {
            ctx.fillText(label, midX - 30, midY);
        } else {
            ctx.fillText(label, midX, midY + 15);
        }

    };


    return (
        <div className="flex h-screen">
            <div className="w-full overflow-hidden">
                <canvas
                    ref={canvasRef}
                    width={600}
                    height={600}
                    className="bg-[#f8f9fa] border border-gray-300 w-full h-auto"
                />
            </div>
        </div>
    );
}
