from fastapi import APIRouter, HTTPException, status
from src.models.products import ProductUpdate
from src.schemas.products import products
from src.utils.get_by_id import get_by_id


router = APIRouter(prefix="/api/v1/products", tags=["products"])


# @router.get("/")


# @router.post("/")


@router.put("/{product_id}")
async def update_product(product_id: int, product_new: ProductUpdate):
    idx = get_by_id(product_id, products)

    if idx is False:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Product with id {product_id} not found",
        )

    products[idx] = products[idx].model_copy(
        update=product_new.model_dump(exclude_unset=True)
    )

    return {
        "status": "success",
        "message": "Item updated successfully",
        "database": products,  # NOTE: Hanya untuk lihat data, hapus kalau sudah ada GET endpoint
    }


@router.delete("/{product_id}")
async def delete_product(product_id: int):
    idx = get_by_id(product_id, products)

    if idx is False:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Product with id {product_id} not found",
        )

    products.pop(idx)

    return {
        "status": "success",
        "message": "Item deleted successfully",
        "database": products,  # NOTE: Hanya untuk lihat data, hapus kalau sudah ada GET endpoint
    }
