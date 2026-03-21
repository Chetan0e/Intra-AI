from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import upload, analysis, roadmap, training

app = FastAPI(
    title="Intra AI — Adaptive Workforce Intelligence Engine",
    description="Resume ↔ JD skill matching, gap analysis, and adaptive learning roadmap generation.",
    version="2.0.0",
)

# CORS — allow the Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# All routes under /api prefix
app.include_router(upload.router,   prefix="/api", tags=["Upload"])
app.include_router(analysis.router, prefix="/api", tags=["Analysis"])
app.include_router(roadmap.router,  prefix="/api", tags=["Roadmap"])
app.include_router(training.router, prefix="/api", tags=["Training"])

# Also mount at root (frontend calls /upload, /analyze etc. without /api prefix)
app.include_router(upload.router,   tags=["Upload"])
app.include_router(analysis.router, tags=["Analysis"])
app.include_router(roadmap.router,  tags=["Roadmap"])
app.include_router(training.router, tags=["Training"])


@app.get("/")
def read_root():
    return {
        "message": "Intra AI Inference Engine running 🚀",
        "version": "2.0.0",
        "endpoints": ["/upload", "/analyze", "/roadmap", "/api/upload", "/api/analyze", "/api/roadmap"],
    }


@app.get("/health")
def health_check():
    return {"status": "healthy"}
