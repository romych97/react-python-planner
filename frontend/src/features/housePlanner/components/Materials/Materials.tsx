'use client'

import { useHouseStore } from '@/store/houseStore';

export function Materials() {
    const { house, updateHouse } = useHouseStore() as any;

    return (
        <div className="panel">
            <h3>Материалы</h3>

            <label>Стены:</label>
            <select value={house.wallMaterial} onChange={(e) => updateHouse({ wallMaterial: e.target.value })}>
                <option value="brick">Кирпич</option>
                <option value="wood">Дерево</option>
                <option value="concrete">Бетон</option>
            </select>

            <label>Крыша:</label>
            <select value={house.roofMaterial} onChange={(e) => updateHouse({ roofMaterial: e.target.value })}>
                <option value="metal">Металлочерепица</option>
                <option value="shingles">Гибкая черепица</option>
                <option value="tile">Керамическая черепица</option>
            </select>
        </div>
    );
}
