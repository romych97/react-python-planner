from fastapi import FastAPI
from utils.cache import cache_set, cache_get
from app.api.v1 import project

app = FastAPI()

app.include_router(project.router, prefix="/api/v1")


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/set_cache")
def set_cache():
    cache_set("username", "JohnDoe", expire=120)
    return {"message": "Данные сохранены в Redis"}


@app.get("/get_cache")
def get_cache():
    value = cache_get("username")
    return {"username": value}
