'use client'

import { useHouseStore } from '@/store/houseStore';

export function RoofSettings() {
    const { roof, updateRoof } = useHouseStore() as any;

    return (
        <div className="mb-5">
            <h2 className="text-xl font-bold mb-4">Параметры крыши</h2>

            <h2 className='font-semibold mt-4'>Тип крыши:</h2>
            <select className="w-full border border-gray-300 rounded-md p-2" value={roof.type} onChange={(e) => updateRoof({ type: e.target.value })}>
                <option value="gable">Двускатная</option>
                <option value="hip">Вальмовая</option>
            </select>

            <h2 className='font-semibold mt-4'>Шаг стропил (см):</h2>
            <input
                type="number"
                value={roof.rafterSpacing}
                onChange={(e) => updateRoof({ rafterSpacing: +e.target.value })}
                className="w-full border border-gray-300 rounded-md p-2"
            />
        </div>
    );
}
