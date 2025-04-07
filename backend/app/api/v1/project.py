from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
# from app.core.database import SessionLocal
# from app.services.project_service import create_project, get_project
# from app.schemas.project import ProjectCreateSchema, ProjectSchema

router = APIRouter()


@router.post("/projects/")
async def create():
    return {"message": ""}


@router.get("/projects")
async def fetch():
    return {"message": ""}
