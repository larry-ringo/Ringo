from fastapi import FastAPI, HTTPException, Request, APIRouter
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
from pydantic import BaseModel
from typing import List
import shutil
import re

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

LINKS_PATH = Path("app/storage/links")
SCHEDULES_DIR = Path("app/storage/schedules")
RECURRING_DIR = Path("app/storage/recurring")
EMAILS_PATH = Path("app/storage/emails")

class Link(BaseModel):
    name: str
    link: str

class ScheduleFile(BaseModel):
    name: str
    content: str

class ScheduleRenameRequest(BaseModel):
    old_name: str
    new_name: str

class LinkRenameRequest(BaseModel):
    old_name: str
    new_name: str
    link: str

class RecurringEntry(BaseModel):
    days: str  # 7-character binary string, example: 1000000 for Monday
    start: str  # HH:MM:SS
    end: str  # HH:MM:SS
    every: int  # seconds
    duration: int  # seconds
    name: str

class Email(BaseModel):
    address: str

# LINKS 
@app.get("/api/links")
def get_links():
    if not LINKS_PATH.exists():
        return []
    lines = LINKS_PATH.read_text().splitlines()
    return [{"name": line.split(" ")[0], "link": " ".join(line.split(" ")[1:])} for line in lines]

@app.post("/api/links")
def add_link(link: Link):
    url_pattern = re.compile(r'[^\s/$.?#].[^\s]*$')
    if not url_pattern.match(link.link):
        raise HTTPException(status_code=400, detail="Invalid link format")
    with open(LINKS_PATH, "a") as f:
        f.write(f"{link.name} {link.link}\n")
    return {"status": "success"}

@app.delete("/api/links")
def delete_link(link: Link):
    if not LINKS_PATH.exists():
        raise HTTPException(status_code=404, detail="Links file not found")
    if link.name == "default":
        raise HTTPException(status_code=403, detail="Cannot delete default schedule")
    lines = LINKS_PATH.read_text().splitlines()
    updated = [line for line in lines if not line.startswith(f"{link.name} ")]
    LINKS_PATH.write_text("\n".join(updated) + ("\n" if updated else ""))
    return {"status": "deleted"}

@app.put("/api/links")
def edit_link(request: LinkRenameRequest):
    if not LINKS_PATH.exists():
        raise HTTPException(status_code=404, detail="Links file not found")

    lines = LINKS_PATH.read_text().splitlines()
    found = False
    updated_lines = []

    for line in lines:
        if line.startswith(f"{request.old_name} "):
            updated_lines.append(f"{request.new_name} {request.link}")
            found = True
        else:
            updated_lines.append(line)

    if not found:
        raise HTTPException(status_code=404, detail="Link not found")

    LINKS_PATH.write_text("\n".join(updated_lines) + "\n")
    return {"status": "updated"}

# SCHEDULES
@app.get("/api/schedules")
def list_schedules():
    SCHEDULES_DIR.mkdir(parents=True, exist_ok=True)
    return [f.name for f in SCHEDULES_DIR.glob("*") if f.is_file()]

@app.get("/api/schedules/{name}")
def get_schedule(name: str):
    path = SCHEDULES_DIR / name
    if not path.exists():
        raise HTTPException(status_code=404, detail="Schedule not found")
    return {"name": name, "content": path.read_text()}

@app.post("/api/schedules")
def create_schedule(schedule: ScheduleFile):
    path = SCHEDULES_DIR / schedule.name
    if path.exists():
        raise HTTPException(status_code=400, detail="Schedule already exists")
    path.write_text(schedule.content)
    return {"status": "created"}

@app.put("/api/schedules/{name}")
def update_schedule(name: str, schedule: ScheduleFile):
    path = SCHEDULES_DIR / name
    if not path.exists():
        raise HTTPException(status_code=404, detail="Schedule not found")
    path.write_text(schedule.content)
    return {"status": "updated"}

@app.delete("/api/schedules/{name}")
def delete_schedule(name: str):
    path = SCHEDULES_DIR / name
    if not path.exists():
        raise HTTPException(status_code=404, detail="Schedule not found")
    path.unlink()
    return {"status": "deleted"}

@app.post("/api/schedules/rename")
def rename_schedule(rename: ScheduleRenameRequest):
    old_path = SCHEDULES_DIR / rename.old_name
    new_path = SCHEDULES_DIR / rename.new_name
    if not old_path.exists():
        raise HTTPException(status_code=404, detail="Original schedule not found")
    if new_path.exists():
        raise HTTPException(status_code=400, detail="Target name already exists")
    shutil.move(str(old_path), str(new_path))
    return {"status": "renamed"}

@app.post("/api/schedules/duplicate")
def duplicate_schedule(rename: ScheduleRenameRequest):
    old_path = SCHEDULES_DIR / rename.old_name
    new_path = SCHEDULES_DIR / rename.new_name
    if not old_path.exists():
        raise HTTPException(status_code=404, detail="Original schedule not found")
    if new_path.exists():
        raise HTTPException(status_code=400, detail="Target name already exists")
    shutil.copy(str(old_path), str(new_path))
    return {"status": "duplicated"}

# RECURRING 
@app.get("/api/recurring/{schedule}", response_model=List[RecurringEntry])
def get_recurring(schedule: str):
    file_path = RECURRING_DIR / schedule
    if not file_path.exists():
        return []
    entries = []
    with file_path.open("r") as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            try:
                days, start, end, every, duration, name = line.split(" ", 5)
                entries.append(RecurringEntry(
                    days=days,
                    start=start,
                    end=end,
                    every=int(every),
                    duration=int(duration),
                    name=name,
                ))
            except Exception:
                continue
    return entries

@app.get("/api/recurring_raw/{schedule}") # just need this for checking if the schedule changes
def get_recurring_raw(schedule: str):
    file_path = RECURRING_DIR / schedule
    if not file_path.exists():
        return {"content": ""}
    return {"content": file_path.read_text()}

@app.put("/api/recurring/{schedule}")
def save_recurring(schedule: str, entries: List[RecurringEntry]):
    file_path = RECURRING_DIR / schedule
    lines = [
        f"{e.days} {e.start} {e.end} {e.every} {e.duration} {e.name}"
        for e in entries
    ]
    file_path.write_text("\n".join(lines) + "\n")
    return {"status": "saved", "count": len(entries)}

# EMAILS
@app.get("/api/emails", response_model=List[str])
def get_emails():
    if not EMAILS_PATH.exists():
        return []
    return EMAILS_PATH.read_text().splitlines()

@app.post("/api/emails")
def add_email(email: Email):
    EMAILS_PATH.parent.mkdir(parents=True, exist_ok=True)
    existing = set(EMAILS_PATH.read_text().splitlines() if EMAILS_PATH.exists() else [])
    if email.address in existing:
        raise HTTPException(status_code=400, detail="Email already exists")
    with open(EMAILS_PATH, "a") as f:
        f.write(email.address + "\n")
    return {"status": "added"}

# mount static files AFTER defining all API routes
dist_path = Path("static")
app.mount("/", StaticFiles(directory=dist_path, html=True), name="static")