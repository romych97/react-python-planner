from sqlalchemy import Column, Integer, String, JSON
from app.core.database import Base


class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True, nullable=False)
    rooms = Column(JSON, nullable=False)  # JSON-хранение точек
