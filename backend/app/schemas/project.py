from pydantic import BaseModel
from typing import List


class RoomSchema(BaseModel):
    points: List[List[int]]


class ProjectCreateSchema(BaseModel):
    name: str
    rooms: List[RoomSchema]


class ProjectSchema(ProjectCreateSchema):
    id: int

    class Config:
        orm_mode = True
