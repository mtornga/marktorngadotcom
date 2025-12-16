Built end-to-end computer vision pipelines for wildlife detection using Python, PyTorch, and CUDA, including dataset creation, model training, and iterative evaluation on real and simulated camera feeds.

Trained and fine-tuned YOLO and RT-DETR models on custom annotated datasets, improving detection performance under low light, occlusion, and long-range camera conditions.

Developed automated data preparation workflows to convert raw video into structured training assets, including frame extraction, bounding box aggregation, and labeling QC tools.

Designed reproducible model training environments using Docker, enabling consistent GPU-accelerated execution across local and cloud systems.

Implemented multi-object tracking and coordinate extraction logic to convert frame-level detections into continuous movement histories suitable for downstream analysis.

Used Python, NumPy, pandas, and matplotlib to analyze model errors, evaluate precision and recall, and identify failure patterns across test sequences.

Created lightweight inference endpoints using Flask and GCP Cloud Functions to host model components and support remote experimentation.

Deployed inference jobs to cloud GPU instances and optimized PyTorch workloads for CUDA performance, reducing training and evaluation time.

Built calibration utilities using AprilTags and homography transforms to map pixel coordinates into real-world positions for robotic navigation.

Integrated detection outputs with a microcontroller-based rover to prototype an autonomous closed loop from vision to movement.

Documented modeling steps, training configs, evaluation results, and data assumptions to support repeatability and future improvements.


Short version (if you need 4 or 5 bullets)

Built end-to-end CV pipelines using Python, PyTorch, CUDA, and Docker, including dataset prep, custom training runs, and evaluation.

Trained YOLO and RT-DETR models on custom-labeled wildlife datasets and optimized them for low-light and long-range conditions.

Deployed inference components using Flask and GCP Cloud Functions, including GPU-accelerated tests on cloud instances.

Created spatial calibration and tracking systems to convert model outputs into real-world coordinates for robotic navigation.

Analyzed model performance with NumPy, pandas, and matplotlib to guide iterative improvements.