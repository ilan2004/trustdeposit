import os
from fastapi import FastAPI, UploadFile, File, Form, HTTPException, Depends
from sqlalchemy.orm import Session
from app import models, database
from app.damage_detector import detect_damage_yolo, calculate_total_cost
from datetime import datetime
import shutil

app = FastAPI()

UPLOAD_DIR = "uploaded_images"
os.makedirs(UPLOAD_DIR, exist_ok=True)

database.Base.metadata.create_all(bind=database.engine)

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def root():
    return {"message": "TrustDeposit backend running"}

@app.post("/upload-photo/")
async def upload_photo(user_id: str = Form(...), photo_type: str = Form(...), file: UploadFile = File(...), db: Session = Depends(get_db)):
    if photo_type not in ["move-in", "move-out"]:
        raise HTTPException(status_code=400, detail="photo_type must be 'move-in' or 'move-out'")

    filename = f"{user_id}_{photo_type}_{int(datetime.now().timestamp())}_{file.filename}"
    file_path = os.path.join(UPLOAD_DIR, filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    photo = models.Photo(user_id=user_id, photo_type=photo_type, filename=filename)
    db.add(photo)
    db.commit()
    db.refresh(photo)

    return {"filename": filename, "message": "Photo uploaded successfully"}

@app.post("/add-deposit/")
def add_deposit(user_id: str = Form(...), amount_paid: float = Form(...), db: Session = Depends(get_db)):
    deposit = models.Deposit(user_id=user_id, amount_paid=amount_paid)
    db.add(deposit)
    db.commit()
    db.refresh(deposit)
    return {"message": "Deposit recorded", "deposit_id": deposit.id}

@app.post("/calculate-refund/")
def calculate_refund(user_id: str = Form(...), db: Session = Depends(get_db)):
    deposit = db.query(models.Deposit).filter_by(user_id=user_id).order_by(models.Deposit.id.desc()).first()
    if not deposit:
        raise HTTPException(status_code=404, detail="Deposit record not found")

    move_in_photo = db.query(models.Photo).filter_by(user_id=user_id, photo_type="move-in").order_by(models.Photo.timestamp.desc()).first()
    move_out_photo = db.query(models.Photo).filter_by(user_id=user_id, photo_type="move-out").order_by(models.Photo.timestamp.desc()).first()

    if not move_in_photo or not move_out_photo:
        raise HTTPException(status_code=404, detail="Required photos not found")

    before_path = os.path.join(UPLOAD_DIR, move_in_photo.filename)
    after_path = os.path.join(UPLOAD_DIR, move_out_photo.filename)

    damage_types = detect_damage_yolo(before_path, after_path)
    damage_cost = calculate_total_cost(damage_types)

    refund_amount = deposit.amount_paid - damage_cost
    if refund_amount < 0:
        refund_amount = 0

    return {
        "deposit_paid": deposit.amount_paid,
        "damage_types": damage_types,
        "damage_cost": damage_cost,
        "refund_amount": refund_amount
    }
