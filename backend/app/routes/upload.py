from fastapi import APIRouter, UploadFile, File, HTTPException, Form, Request
from typing import Optional
import io
import re

router = APIRouter()

def extract_text_from_pdf(file_bytes: bytes) -> str:
    try:
        import fitz
        doc = fitz.open(stream=file_bytes, filetype="pdf")
        text = ""
        for page in doc:
            text += page.get_text()
        doc.close()
        return text.strip()
    except Exception as e:
        print(f"[PDF Extract Error] {e}")
        return ""

def extract_text_from_docx(file_bytes: bytes) -> str:
    """
    Deep extraction from DOCX: paragraphs, tables, headers, footers.
    """
    try:
        from docx import Document
        doc = Document(io.BytesIO(file_bytes))
        full_text = []
        
        # 1. Main paragraphs
        for para in doc.paragraphs:
            if para.text.strip():
                full_text.append(para.text)
        
        # 2. Tables (crucial for resume skills)
        for table in doc.tables:
            for row in table.rows:
                row_text = [cell.text.strip() for cell in row.cells if cell.text.strip()]
                if row_text:
                    full_text.append(" | ".join(row_text))
                    
        # 3. Headers & Footers
        for section in doc.sections:
            for header in [section.header]:
                for para in header.paragraphs:
                    if para.text.strip(): full_text.append(para.text)
            for footer in [section.footer]:
                for para in footer.paragraphs:
                    if para.text.strip(): full_text.append(para.text)

        result = "\n".join(full_text).strip()
        print(f"[DOCX Debug] Extracted {len(result)} chars from docx.")
        return result
    except Exception as e:
        print(f"[DOCX Extract Error] {e}")
        return ""

def decode_file(filename: str, bytes: bytes) -> str:
    ext = filename.lower().split('.')[-1] if filename and "." in filename else "txt"
    text = ""
    print(f"[Upload Debug] Processing: {filename} ({len(bytes)} bytes)")
    
    if ext == 'pdf':
        text = extract_text_from_pdf(bytes)
    elif ext in ['doc', 'docx']:
        text = extract_text_from_docx(bytes)
    else:
        # Try common text decoders to avoid garbled extraction.
        for encoding in ("utf-8", "utf-16", "latin-1"):
            try:
                text = bytes.decode(encoding)
                if text.strip():
                    break
            except Exception:
                continue
    
    if not text.strip() or len(text.strip()) < 50:
        # Emergency fallback for failures — try raw string extraction
        print(f"[Upload Warning] Extraction too short ({len(text)} chars). Using fallback.")
        try:
            # Simple regex to get readable strings from binary
            chunks = re.findall(rb"[A-Za-z][A-Za-z0-9\-\+\#\./]{2,}", bytes)
            fallback = " ".join(chunk.decode("ascii", errors="ignore") for chunk in chunks)
            return fallback[:10000]
        except Exception:
            pass
            
    return text.strip()

@router.post("/upload")
async def upload_files(
    resume: Optional[UploadFile] = File(None),
    jd: Optional[UploadFile] = File(None),
    resume_text: Optional[str] = Form(None),
    jd_text: Optional[str] = Form(None)
):
    res_str = ""
    jd_str = ""
    
    if resume:
        res_str = decode_file(resume.filename, await resume.read())
        print(f"[Upload Debug] Final Resume Text Length: {len(res_str)}")
    elif resume_text:
        res_str = resume_text
        
    if jd:
        jd_str = decode_file(jd.filename, await jd.read())
        print(f"[Upload Debug] Final JD Text Length: {len(jd_str)}")
    elif jd_text:
        jd_str = jd_text
        
    if not res_str or not jd_str:
        raise HTTPException(status_code=400, detail="Missing resume or JD content.")
        
    return {"resume": res_str, "jd": jd_str}
