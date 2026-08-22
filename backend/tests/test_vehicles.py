def test_create_vehicle(authenticated_client):
    response = authenticated_client.post(
        "/api/vehicles",
        json={
            "make": "Toyota",
            "model": "Camry",
            "category": "Sedan",
            "price": 30000,
            "quantity": 5
        }
    )

    assert response.status_code == 201

    data = response.json()

    assert data["make"] == "Toyota"
    assert data["model"] == "Camry"
    assert data["category"] == "Sedan"
    assert data["price"] == 30000
    assert data["quantity"] == 5


def test_get_vehicles(authenticated_client):
    authenticated_client.post(
        "/api/vehicles",
        json={
            "make": "Toyota",
            "model": "Camry",
            "category": "Sedan",
            "price": 30000,
            "quantity": 5
        }
    )

    authenticated_client.post(
        "/api/vehicles",
        json={
            "make": "Honda",
            "model": "Civic",
            "category": "Sedan",
            "price": 25000,
            "quantity": 3
        }
    )

    response = authenticated_client.get("/api/vehicles")

    assert response.status_code == 200

    data = response.json()

    assert len(data) == 2
    assert data[0]["make"] == "Toyota"
    assert data[1]["make"] == "Honda"


def test_search_vehicles_by_make(authenticated_client):
    authenticated_client.post(
        "/api/vehicles",
        json={
            "make": "Toyota",
            "model": "Camry",
            "category": "Sedan",
            "price": 30000,
            "quantity": 5
        }
    )

    authenticated_client.post(
        "/api/vehicles",
        json={
            "make": "Honda",
            "model": "Civic",
            "category": "Sedan",
            "price": 25000,
            "quantity": 3
        }
    )

    response = authenticated_client.get(
        "/api/vehicles/search?make=Toyota"
    )

    assert response.status_code == 200

    data = response.json()

    assert len(data) == 1
    assert data[0]["make"] == "Toyota"
    assert data[0]["model"] == "Camry"


def test_search_vehicles_by_category(authenticated_client):
    authenticated_client.post(
        "/api/vehicles",
        json={
            "make": "Toyota",
            "model": "Camry",
            "category": "Sedan",
            "price": 30000,
            "quantity": 5
        }
    )

    authenticated_client.post(
        "/api/vehicles",
        json={
            "make": "Toyota",
            "model": "RAV4",
            "category": "SUV",
            "price": 35000,
            "quantity": 4
        }
    )

    response = authenticated_client.get(
        "/api/vehicles/search?category=SUV"
    )

    assert response.status_code == 200

    data = response.json()

    assert len(data) == 1
    assert data[0]["model"] == "RAV4"


def test_search_vehicles_by_price_range(authenticated_client):
    authenticated_client.post(
        "/api/vehicles",
        json={
            "make": "Toyota",
            "model": "Camry",
            "category": "Sedan",
            "price": 30000,
            "quantity": 5
        }
    )

    authenticated_client.post(
        "/api/vehicles",
        json={
            "make": "BMW",
            "model": "X3",
            "category": "SUV",
            "price": 50000,
            "quantity": 2
        }
    )

    response = authenticated_client.get(
        "/api/vehicles/search?min_price=25000&max_price=35000"
    )

    assert response.status_code == 200

    data = response.json()

    assert len(data) == 1
    assert data[0]["make"] == "Toyota"


def test_update_vehicle(authenticated_client):
    create_response = authenticated_client.post(
        "/api/vehicles",
        json={
            "make": "Toyota",
            "model": "Camry",
            "category": "Sedan",
            "price": 30000,
            "quantity": 5
        }
    )

    vehicle_id = create_response.json()["id"]

    response = authenticated_client.put(
        f"/api/vehicles/{vehicle_id}",
        json={
            "make": "Toyota",
            "model": "Camry Hybrid",
            "category": "Sedan",
            "price": 35000,
            "quantity": 7
        }
    )

    assert response.status_code == 200

    data = response.json()

    assert data["id"] == vehicle_id
    assert data["model"] == "Camry Hybrid"
    assert data["price"] == 35000
    assert data["quantity"] == 7


def test_update_nonexistent_vehicle(authenticated_client):
    response = authenticated_client.put(
        "/api/vehicles/9999",
        json={
            "make": "Toyota",
            "model": "Camry",
            "category": "Sedan",
            "price": 30000,
            "quantity": 5
        }
    )

    assert response.status_code == 404
    assert response.json()["detail"] == "Vehicle not found"


def test_delete_vehicle(admin_client):
    create_response = admin_client.post(
        "/api/vehicles",
        json={
            "make": "Toyota",
            "model": "Camry",
            "category": "Sedan",
            "price": 30000,
            "quantity": 5
        }
    )

    vehicle_id = create_response.json()["id"]

    response = admin_client.delete(
        f"/api/vehicles/{vehicle_id}"
    )

    assert response.status_code == 204

    get_response = admin_client.get(
        "/api/vehicles"
    )

    data = get_response.json()

    assert len(data) == 0


def test_delete_nonexistent_vehicle(admin_client):
    response = admin_client.delete(
        "/api/vehicles/9999"
    )

    assert response.status_code == 404
    assert response.json()["detail"] == "Vehicle not found"


def test_create_vehicle_requires_authentication(client):
    response = client.post(
        "/api/vehicles",
        json={
            "make": "Toyota",
            "model": "Camry",
            "category": "Sedan",
            "price": 30000,
            "quantity": 5
        }
    )

    assert response.status_code == 401

def test_delete_vehicle_requires_admin(authenticated_client):
    create_response = authenticated_client.post(
        "/api/vehicles",
        json={
            "make": "Toyota",
            "model": "Camry",
            "category": "Sedan",
            "price": 30000,
            "quantity": 5
        }
    )

    vehicle_id = create_response.json()["id"]

    response = authenticated_client.delete(
        f"/api/vehicles/{vehicle_id}"
    )

    assert response.status_code == 403
    assert response.json()["detail"] == "Admin access required"

def test_purchase_vehicle(authenticated_client):
    create_response = authenticated_client.post(
        "/api/vehicles",
        json={
            "make": "Toyota",
            "model": "Camry",
            "category": "Sedan",
            "price": 30000,
            "quantity": 5
        }
    )

    vehicle_id = create_response.json()["id"]

    response = authenticated_client.post(
        f"/api/vehicles/{vehicle_id}/purchase"
    )

    assert response.status_code == 200

    data = response.json()

    assert data["message"] == "Vehicle purchased successfully"
    assert data["quantity"] == 4

def test_purchase_vehicle_when_out_of_stock(authenticated_client):
    create_response = authenticated_client.post(
        "/api/vehicles",
        json={
            "make": "Toyota",
            "model": "Camry",
            "category": "Sedan",
            "price": 30000,
            "quantity": 0
        }
    )

    vehicle_id = create_response.json()["id"]

    response = authenticated_client.post(
        f"/api/vehicles/{vehicle_id}/purchase"
    )

    assert response.status_code == 400
    assert response.json()["detail"] == "Vehicle is out of stock"

def test_purchase_nonexistent_vehicle(authenticated_client):
    response = authenticated_client.post(
        "/api/vehicles/9999/purchase"
    )

    assert response.status_code == 404
    assert response.json()["detail"] == "Vehicle not found"

def test_restock_vehicle(admin_client):
    create_response = admin_client.post(
        "/api/vehicles",
        json={
            "make": "Toyota",
            "model": "Camry",
            "category": "Sedan",
            "price": 30000,
            "quantity": 5
        }
    )

    vehicle_id = create_response.json()["id"]

    response = admin_client.post(
        f"/api/vehicles/{vehicle_id}/restock",
        json={
            "quantity": 3
        }
    )

    assert response.status_code == 200

    data = response.json()

    assert data["message"] == "Vehicle restocked successfully"
    assert data["quantity"] == 8

def test_restock_vehicle_requires_admin(authenticated_client):
    create_response = authenticated_client.post(
        "/api/vehicles",
        json={
            "make": "Toyota",
            "model": "Camry",
            "category": "Sedan",
            "price": 30000,
            "quantity": 5
        }
    )

    vehicle_id = create_response.json()["id"]

    response = authenticated_client.post(
        f"/api/vehicles/{vehicle_id}/restock",
        json={
            "quantity": 3
        }
    )

    assert response.status_code == 403
    assert response.json()["detail"] == "Admin access required"

def test_restock_nonexistent_vehicle(admin_client):
    response = admin_client.post(
        "/api/vehicles/9999/restock",
        json={
            "quantity": 3
        }
    )

    assert response.status_code == 404
    assert response.json()["detail"] == "Vehicle not found"