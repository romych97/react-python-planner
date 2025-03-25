'use client'

import { useEffect } from 'react';
import { useHouseStore } from '@/store/houseStore';

export function SaveProject() {
    const { house } = useHouseStore() as any;

    useEffect(() => {
        localStorage.setItem('houseProject', JSON.stringify(house));
    }, [house]);

    return (
        <button onClick={() => alert('Проект сохранён!')}>💾 Сохранить проект</button>
    );
}
