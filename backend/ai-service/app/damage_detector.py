from ultralytics import YOLO

model = YOLO("yolov8n.pt")

DAMAGE_COSTS = {
    "tv": 300,
    "sofa": 200,
    "bed": 250,
    "chair": 100,
    "table": 150,
}

def detect_objects(image_path):
    results = model(image_path)
    labels = results[0].names
    detected_classes = results[0].boxes.cls.tolist()
    detected_labels = [labels[int(cls_id)] for cls_id in detected_classes]
    return detected_labels

def detect_damage_yolo(before_path, after_path):
    before_items = detect_objects(before_path)
    after_items = detect_objects(after_path)

    missing_items = list(set(before_items) - set(after_items))
    damage_types = [item for item in missing_items if item in DAMAGE_COSTS]
    return damage_types

def calculate_total_cost(damage_types):
    return sum(DAMAGE_COSTS.get(item, 0) for item in damage_types)
