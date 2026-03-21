from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import upload, analysis, roadmap, training
from app.routes.upload_fallback import router as fallback_router

app = FastAPI()

# Allow CORS for the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(upload.router, prefix="/api", tags=["upload"])
app.include_router(analysis.router, prefix="/api", tags=["analysis"])
app.include_router(roadmap.router, prefix="/api", tags=["roadmap"])
app.include_router(training.router, prefix="/api", tags=["training"])

# Add fallback routes without /api prefix
app.include_router(upload.router, tags=["upload"])
app.include_router(analysis.router, tags=["analysis"])
app.include_router(roadmap.router, tags=["roadmap"])
app.include_router(training.router, tags=["training"])
app.include_router(fallback_router, tags=["fallback"])

@app.get("/")
def read_root():
    return {"message": "Intra Ai Inference Engine running 🚀"}
