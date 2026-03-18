from fastapi import APIRouter, HTTPException, status
from src.schemas.products import Product, products
from src.models.products import ProductUpdate, ProductAdd
from src.utils.get_by_id import get_by_id


router = APIRouter(prefix="/api/v1/products", tags=["products"])


@router.get("/", response_model=list[Product])
async def get_all_product():
    return products


@router.post("/", status_code=status.HTTP_201_CREATED, response_model=Product)
async def add_product(product: ProductAdd):
    new_id = max([p.id for p in products], default=0) + 1

    new_product = Product(
        id=new_id, name=product.name, price=product.price, stock=product.stock
    )

    products.append(new_product)

    return new_product


@router.put("/{product_id}", response_model=Product)
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

    return products[idx]


@router.delete("/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_product(product_id: int):
    idx = get_by_id(product_id, products)

    if idx is False:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Product with id {product_id} not found",
        )

    products.pop(idx)

    return None
