from fastapi import APIRouter
from src.schemas.products import Product
from src.schemas.products import products
from src.models.products import Addproduct



router = APIRouter(prefix="/api/v1/products", tags=["products"])

@router.get("/")
async def get_all_product():
    return {
        "status" : "success",
        "message" : "resturn all item",
        "data" : products
    }

@router.post("/")
async def add_product(product : Addproduct):
    new_id = max([p.id for p in products]) + 1

    new_product = Product(
            id = new_id,
            name = product.name,
            price = product.price,
            stock = product.stock

    )
        
    products.append(new_product)

    return {
        "status" : "success",
        "message" : "added product",
        "data" : new_product    
    }
