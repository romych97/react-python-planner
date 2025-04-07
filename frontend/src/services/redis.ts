import type { NextApiRequest, NextApiResponse } from 'next'
import redis from '@/utils/lib/redis'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const value = await redis.get('username')
    return res.status(200).json({ username: value })
  }

  if (req.method === 'POST') {
    await redis.set('username', 'JohnDoe', 'EX', 120)
    return res.status(200).json({ message: 'Данные сохранены в Redis' })
  }

  res.status(405).json({ error: 'Метод не поддерживается' })
}
