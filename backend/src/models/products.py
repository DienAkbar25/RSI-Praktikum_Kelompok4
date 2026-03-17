from pydantic import BaseModel


class Addproduct (BaseModel) :
    name : str
    price : float
    stock : int
