from fastapi import FastAPI

from app.database import Base, engine
from app.models.user import User
from app.models.vehicle import Vehicle
from app.routes.auth import router as auth_router
from app.routes.vehicles import router as vehicles_router


Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="Car Dealership Inventory API"
)


app.include_router(auth_router)
app.include_router(vehicles_router)


@app.get("/")
def root():
    return {"message": "Car Dealership API is running"}