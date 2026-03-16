from fastapi import FastAPI
from src.routers import products


app = FastAPI()


app.include_router(products.router)


app.get("/health")


async def health_check():
    return {"status": "healthy", "message": "service is running"}
