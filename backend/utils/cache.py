import redis
import os

REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379")

redis_client = redis.Redis.from_url(REDIS_URL, decode_responses=True)

def cache_set(key: str, value: str, expire: int = 60):
    """Сохранить значение в Redis с истечением через expire секунд"""
    redis_client.setex(key, expire, value)

def cache_get(key: str):
    """Получить значение из Redis"""
    return redis_client.get(key)
