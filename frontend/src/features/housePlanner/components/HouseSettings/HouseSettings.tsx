'use client'
import { useHouseStore } from '@/store/houseStore';

export function HouseSettings() {
    const { house, updateHouse } = useHouseStore() as any;

    return (
        <div className="mb-5">
            <div>
                <h2 className="text-xl font-bold mb-4">Параметры дома</h2>
                <div>
                    <div>
                        <h2 className='font-semibold mt-4'>Длина (см):</h2>
                        <input
                            type="number"
                            value={house.length}
                            onChange={(e) => updateHouse({ length: +e.target.value })}
                            className="w-full border border-gray-300 rounded-md p-2"
                        />
                    </div>
                    <div>
                        <h2 className='font-semibold mt-4'>Ширина (см):</h2>
                        <input
                            type="number"
                            value={house.width}
                            onChange={(e) => updateHouse({ width: +e.target.value })}
                            className="w-full border border-gray-300 rounded-md p-2"
                        />
                    </div>
                    <div>
                        <h2 className='font-semibold mt-4'>Толщина стен (см):</h2>
                        <input
                            type="number"
                            value={house.wallThickness}
                            onChange={(e) => updateHouse({ wallThickness: +e.target.value })}
                            className="w-full border border-gray-300 rounded-md p-2"
                        />
                    </div>
                    <div>
                        <h2 className='font-semibold mt-4'>Количество окон:</h2>
                        <input
                            type="number"
                            value={house.windows}
                            onChange={(e) => updateHouse({ windows: +e.target.value })}
                            className="w-full border border-gray-300 rounded-md p-2"
                        />
                    </div>
                    <div>
                        <h2 className='font-semibold mt-4'>Количество дверей:</h2>
                        <input
                            type="number"
                            value={house.doors ?? ''}
                            onChange={(e) => updateHouse({ doors: +e.target.value })}
                            className="w-full border border-gray-300 rounded-md p-2"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
