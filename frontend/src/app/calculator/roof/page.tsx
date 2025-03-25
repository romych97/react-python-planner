"use client"

import GableRoofCanvas from '@/features/calculator/components/Roof/GableRoofCanvas';
import { useState } from 'react';

export default function RoofCalculator() {
    const [roofType, setRoofType] = useState('двускатная');
    const [roofMaterial, setRoofMaterial] = useState('hard');
    const [roofParams, setRoofParams] = useState({
        battenWidth: 10,
        battenThickness: 3,
        battenSpacing: 40,
        mauerlat: false,
        waterproofing: false,
        counterBatten: false,
        insulation: false,
        rafterSpacing: 60,
        houseLength: 1000,  // Длина дома
        houseWidth: 1000,   // Ширина дома
        roofHeight: 300,    // Высота крыши
        roofOverhang: 50    // Вынос крыши
    });

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setRoofParams((prev) => ({
            ...prev,
            [name]: Number(value)
        }));
    };

    return (
        <div className="container mx-auto min-h-screen">
            {/* Left column (params) */}
            <div className="pt-4 flex">
                <div className="md:w-[400px] p-4 bg-[#f8f9fa] border border-[#dadce0]">
                    <div>
                        <h2 className="text-xl font-bold mb-4">Параметры крыши</h2>
                        <div>
                            <h3 className="font-semibold">Тип крыши</h3>
                            {['двускатная', 'односкатная', 'шатровая', 'вальмовая'].map((type) => (
                                <button
                                    key={type}
                                    className={`cursor-pointer px-4 py-2 ${roofType === type ? 'bg-gray-300 text-dark' : 'bg-gray-200 text-black'}`}
                                    onClick={() => setRoofType(type)}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="font-semibold mt-4">Тип покрытия</h3>
                        {['твердое', 'мягкое'].map((material) => (
                            <button
                                key={material}
                                className={`cursor-pointer px-4 py-2 ${roofMaterial === material ? 'bg-gray-300 text-dark' : 'bg-gray-200 text-black'}`}
                                onClick={() => setRoofMaterial(material)}
                            >
                                {material}
                            </button>
                        ))}
                    </div>
                    <div>
                        <h2 className="font-semibold mt-4">Размеры дома</h2>
                        <label>
                            Ширина X:
                            <input
                                type="number"
                                value={roofParams.houseLength}
                                onChange={(e) => setRoofParams({ ...roofParams, houseLength: Number(e.target.value) })}
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </label>
                        <label>
                            Длина Y:
                            <input
                                type="number"
                                value={roofParams.houseWidth}
                                onChange={(e) => setRoofParams({ ...roofParams, houseWidth: Number(e.target.value) })}
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </label>
                        <label>
                            Высота крыши:
                            <input
                                type="number"
                                value={roofParams.roofHeight}
                                onChange={(e) => setRoofParams({ ...roofParams, roofHeight: Number(e.target.value) })}
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </label>
                        <label>
                            Вынос кровли:
                            <input
                                type="number"
                                value={roofParams.roofOverhang}
                                onChange={(e) => setRoofParams({ ...roofParams, roofOverhang: Number(e.target.value) })}
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </label>
                    </div>
                    <div>
                        <h2 className="font-semibold mt-4">Размеры обрешетки</h2>
                        <label className="block mb-2">
                            Длина
                            <input
                                type="number"
                                min="1"
                                max="100"
                                name="battenWidth"
                                value={roofParams.battenWidth}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </label>

                        <label className="block mb-2">
                            Толщина
                            <input
                                type="number"
                                min="1"
                                max="50"
                                name="battenThickness"
                                value={roofParams.battenThickness}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </label>

                        <label className="block mb-2">
                            Дистанция между досками
                            <input
                                type="number"
                                min="5"
                                max="150"
                                name="battenSpacing"
                                value={roofParams.battenSpacing}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </label>
                    </div>
                </div>

                {/* Right column (Canvas) */}
                <div className="ml-4 w-3/4">
                    {roofType == 'двускатная' && <GableRoofCanvas roofParams={roofParams} />}
                </div>
            </div>
        </div>
    );
}
