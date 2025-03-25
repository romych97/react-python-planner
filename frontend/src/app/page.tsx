"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const calculators = [
  {
    id: 1,
    title: 'Калькулятор кровли',
    items: [
      { id: "roof", name: "Калькулятор кровли", img: "https://static.vecteezy.com/system/resources/thumbnails/021/594/326/small/new-brown-roof-of-home-png.png" },
      { id: "floor", name: "Калькулятор фундамента и пола" },
      { id: "wall", name: "Калькулятор стен и потолка" },
      { id: "staircase", name: "Калькулятор лестницы", },
      { id: "materials", name: "Калькулятор строительных материалов" },
      { id: "metall", name: "Калькулятор металлопроката" },
      { id: "thermal", name: "Building Thermal Calculators" },
      { id: "electricity", name: "Калькулятор электромонтажных работ" },
    ]
  },
  {
    id: 2,
    title: 'Construction calculations',
    items: []
  },
  {
    id: 3,
    title: 'Geometry for builders',
    items: []
  },
];

const Home = () => {
  const [isMounted, setIsMounted] = useState(false);

  // prevent SSR mismatch by delaying render on the client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen">
      {calculators.map((category) => (
        <div key={category.id}>
          <h1 className="text-3xl font-bold mb-6 p-8">{category.title}</h1>
          <div className="w-full grid grid-cols-4 gap-4 auto-rows-fr">
            {category.items.map((calc) => (
              <div
                key={calc.id}
                className="border border-gray-800 rounded-sm shadow-md hover:bg-gray-900 transition flex flex-col min-h-full"
              >
                <Link href={'/calculator/' + calc.id}>
                  <div className="py-2 px-4 border-b border-gray-800 flex-grow">
                    <h2 className="text-lg font-semibold">{calc.name}</h2>
                  </div>

                  {calc.img && (
                    <div className="py-2 px-4">
                      <Image
                        src={calc.img}
                        alt={calc.name}
                        width={0}
                        height={500}
                        style={{ objectFit: 'cover', width: '100%', height: '150px' }}
                        loader={({ src }) => src}
                      />
                    </div>
                  )}
                </Link>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Home