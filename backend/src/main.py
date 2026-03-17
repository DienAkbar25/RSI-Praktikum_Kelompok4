import fastapi 
from src.routers.products import router

app = fastapi.FastAPI()

app.include_router(router)