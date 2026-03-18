from pydantic import BaseModel


class ProductAdd(BaseModel):
    name: str
    price: float
    stock: int


class ProductUpdate(BaseModel):
    name: str | None = None
    price: float | None = None
    stock: int | None = None
