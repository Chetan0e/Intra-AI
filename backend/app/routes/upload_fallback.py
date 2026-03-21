from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel

router = APIRouter()

class UploadData(BaseModel):
    resume: str = ""
    jd: str = ""

@router.post("/upload/fallback")
@router.get("/upload/fallback")  # Add GET for debugging
async def upload_fallback(request: Request):
    """Ultra-permissive upload endpoint for debugging"""
    try:
        method = request.method
        print(f"Fallback upload - Method: {method}")
        print(f"Fallback upload - Content-Type: {request.headers.get('content-type', 'unknown')}")
        
        if method == "GET":
            return {
                "message": "Fallback endpoint is working. Use POST to upload files.",
                "status": "ready",
                "debug": {
                    "method": method,
                    "content_type": request.headers.get('content-type'),
                    "usage": "POST with resume and jd files or data"
                }
            }
        
        # Try to get body as text first
        body = await request.body()
        print(f"Raw body: {body[:200]}...")  # First 200 chars
        
        # Try JSON parsing
        try:
            import json
            data = json.loads(body.decode('utf-8'))
            print(f"Parsed JSON keys: {list(data.keys()) if isinstance(data, dict) else 'not dict'}")
            
            resume = data.get('resume', '') or ''
            jd = data.get('jd', '') or ''
            
            print(f"Resume length: {len(resume)}, JD length: {len(jd)}")
            
            return {
                "resume": resume,
                "jd": jd,
                "source": "fallback_upload",
                "debug": {
                    "content_type": request.headers.get('content-type'),
                    "keys_received": list(data.keys()) if isinstance(data, dict) else []
                }
            }
            
        except json.JSONDecodeError as e:
            print(f"JSON decode error: {e}")
            # Return raw body as resume if no JD
            return {
                "resume": body.decode('utf-8', errors='ignore'),
                "jd": "",
                "source": "fallback_raw",
                "debug": {
                    "error": "JSON decode failed",
                    "content_type": request.headers.get('content-type')
                }
            }
            
    except Exception as e:
        print(f"Fallback endpoint error: {e}")
        return {
            "resume": "",
            "jd": "",
            "source": "fallback_error",
            "error": str(e)
        }
