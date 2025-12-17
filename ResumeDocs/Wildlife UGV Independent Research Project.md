Personal Projects – Computer Vision & Robotics (Independent Research)
	•	Designed and implemented a full end-to-end computer-vision pipeline for wildlife monitoring, including image ingestion from RTSP streams, YOLO/RT-DETR detection, multi-object tracking, re-identification, kalman filtering, and trajectory analysis. 
	•	Built custom deep-learning datasets (indoor tabletop simulation + outdoor real-world feeds), collecting, annotating, and curating imagery to fine-tune YOLO models for multi-class wildlife detection under low light, occlusion, and long-range conditions. 
	•	Implemented predictive modeling for animal movement, generating structured coordinate-level data from live streams and developing early-stage algorithms for path prediction, anomaly detection, and behavior inference. 
	•	Developed a reproducible model training and evaluation workflow using Python, Ultralytics, CVAT/LabelImg, and GPU acceleration (local and cloud), enabling rapid iteration, test-driven evaluation clips, and metric-driven model selection.
	•	Created a calibration and mapping system using AprilTags and homography transforms to convert pixel detections into real-world spatial coordinates for both static scenes and robotic navigation. 
	•	Engineered an autonomous robotics loop where a microcontroller-based ground vehicle executes navigation tasks using CV-derived coordinates and environmental geometry models. 
	•	Built automation scripts and data pipelines to rapidly convert raw video to structured datasets (bounding boxes, coordinates, model outputs) and generate visualization artifacts such as annotated videos and event recaps. 
	•	Designed scalable workflows for image→data reduction, compressing long video sequences into compact tabular movement histories to support further statistical modeling and predictive analytics. 
	•	Applied cloud-based compute (RunPod / GPU instances) for distributed model training, inference workloads, and dataset synchronization across environments. (Matches “deploying in a cloud environment.”)
	•	Demonstrated strong “data science in the loop” skills by analyzing model failures (FN/FP patterns), tuning hyperparameters (NMS IOU, conf thresholds, max detections), and developing quality-control frameworks for benchmarking model performance.
	•	Communicated results through clear visualizations, spatial maps, and annotated experiments, documenting model inputs/outputs, assumptions, and scientific next steps—mirroring biotech-style experimental reporting.

Optional: Very short 2–3 line version (if space is tight)
	•	Built a full computer-vision pipeline for wildlife monitoring, including custom YOLO training, multi-object tracking, re-identification, and predictive modeling of movement from RTSP camera streams.
	•	Created reproducible, cloud-enabled workflows for dataset generation, model evaluation, spatial calibration (AprilTags → real-world coordinates), and autonomous robotic navigation.
	•	Delivered clear experimental reporting and visualizations of model performance, failure analysis, and business-style insights from large imaging datasets.
