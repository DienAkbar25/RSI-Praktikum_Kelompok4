from pydantic import BaseModel


class Product(BaseModel):
    id: int
    name: str
    price: float
    stock: int


products = [
    Product(id=1, name="Beras", price=35000, stock=15),
    Product(id=2, name="Kopi", price=15000, stock=20),
    Product(id=3, name="Minyak", price=45000, stock=25),
    Product(id=4, name="Tepung", price=8000, stock=50),
    Product(id=5, name="Sabun", price=5000, stock=30),
]

