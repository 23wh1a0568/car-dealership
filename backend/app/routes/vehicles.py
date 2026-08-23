from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.vehicle import Vehicle
from app.schemas.vehicle import (
    VehicleCreate,
    VehicleResponse,
    VehicleUpdate
)
from app.auth.dependencies import (
    get_current_user,
    require_admin
)

router = APIRouter(
    prefix="/api/vehicles",
    tags=["Vehicles"]
)


@router.post(
    "",
    response_model=VehicleResponse,
    status_code=status.HTTP_201_CREATED
)
def create_vehicle(
    vehicle: VehicleCreate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    new_vehicle = Vehicle(
        make=vehicle.make,
        model=vehicle.model,
        category=vehicle.category,
        price=vehicle.price,
        quantity=vehicle.quantity
    )

    db.add(new_vehicle)
    db.commit()
    db.refresh(new_vehicle)

    return new_vehicle


@router.get(
    "",
    response_model=list[VehicleResponse]
)
def get_vehicles(
    db: Session = Depends(get_db)
):
    vehicles = db.query(Vehicle).all()

    return vehicles

@router.get(
    "/search",
    response_model=list[VehicleResponse]
)
def search_vehicles(
    make: str | None = None,
    model: str | None = None,
    category: str | None = None,
    min_price: float | None = None,
    max_price: float | None = None,
    db: Session = Depends(get_db)
):
    query = db.query(Vehicle)

    if make:
        query = query.filter(Vehicle.make.ilike(f"%{make}%"))

    if model:
        query = query.filter(Vehicle.model.ilike(f"%{model}%"))

    if category:
        query = query.filter(Vehicle.category.ilike(f"%{category}%"))

    if min_price is not None:
        query = query.filter(Vehicle.price >= min_price)

    if max_price is not None:
        query = query.filter(Vehicle.price <= max_price)

    return query.all()

@router.put(
    "/{vehicle_id}",
    response_model=VehicleResponse
)
def update_vehicle(
    vehicle_id: int,
    vehicle_data: VehicleUpdate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(require_admin)
):
    vehicle = db.query(Vehicle).filter(
        Vehicle.id == vehicle_id
    ).first()

    if not vehicle:
        raise HTTPException(
            status_code=404,
            detail="Vehicle not found"
        )

    vehicle.make = vehicle_data.make
    vehicle.model = vehicle_data.model
    vehicle.category = vehicle_data.category
    vehicle.price = vehicle_data.price
    vehicle.quantity = vehicle_data.quantity

    db.commit()
    db.refresh(vehicle)

    return vehicle

@router.delete(
    "/{vehicle_id}",
    status_code=status.HTTP_204_NO_CONTENT
)
def delete_vehicle(
    vehicle_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(require_admin)
):
    vehicle = db.query(Vehicle).filter(
        Vehicle.id == vehicle_id
    ).first()

    if not vehicle:
        raise HTTPException(
            status_code=404,
            detail="Vehicle not found"
        )

    db.delete(vehicle)
    db.commit()

    return None

@router.post("/{vehicle_id}/purchase")
def purchase_vehicle(
    vehicle_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    vehicle = db.query(Vehicle).filter(
        Vehicle.id == vehicle_id
    ).first()

    if not vehicle:
        raise HTTPException(
            status_code=404,
            detail="Vehicle not found"
        )

    if vehicle.quantity <= 0:
        raise HTTPException(
            status_code=400,
            detail="Vehicle is out of stock"
        )

    vehicle.quantity -= 1

    db.commit()
    db.refresh(vehicle)

    return {
        "message": "Vehicle purchased successfully",
        "quantity": vehicle.quantity
    }

@router.post("/{vehicle_id}/restock")
def restock_vehicle(
    vehicle_id: int,
    restock_data: dict,
    db: Session = Depends(get_db),
    current_user: dict = Depends(require_admin)
):
    vehicle = db.query(Vehicle).filter(
        Vehicle.id == vehicle_id
    ).first()

    if not vehicle:
        raise HTTPException(
            status_code=404,
            detail="Vehicle not found"
        )

    quantity = restock_data.get("quantity")

    if quantity is None or quantity <= 0:
        raise HTTPException(
            status_code=400,
            detail="Restock quantity must be greater than zero"
        )

    vehicle.quantity += quantity

    db.commit()
    db.refresh(vehicle)

    return {
        "message": "Vehicle restocked successfully",
        "quantity": vehicle.quantity
    }
