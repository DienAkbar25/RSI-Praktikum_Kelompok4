class Product() :
    id : int
    name : str
    stock : int
    price : float
    def __init__(self,id,name,stock,price):
        self.id=id
        self.id=name
        self.id=stock
        self.id=price

products = [
    Product (id = 1, name = "Beras", stock= 15, price= 35000),
    Product (id = 2, name = "Kopi", stock= 20, price= 15000),
    Product (id = 3, name = "Minyak", stock= 25, price= 45000),
    Product (id = 4, name = "Tepung", stock= 50, price= 8000),
    Product (id = 5, name = "Sabun", stock= 30, price= 5000)
]