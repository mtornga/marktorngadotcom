'use client';

import { useState, useRef, useCallback, useEffect } from 'react';

interface ResumeDialProps {
  level: number;
  onChange: (level: number) => void;
}

// Angles in degrees, measured from right (0°) going counter-clockwise
// For screen coords where Y goes down, we'll negate Y in calculations
const LEVELS = [
  { value: 0, label: 'Minimal', angle: 180 },  // Far left
  { value: 1, label: 'Short', angle: 135 },    // Upper left
  { value: 2, label: 'Medium', angle: 45 },    // Upper right
  { value: 3, label: 'Long', angle: 0 },       // Far right
];

export default function ResumeDial({ level, onChange }: ResumeDialProps) {
  const [isDragging, setIsDragging] = useState(false);
  const dialRef = useRef<HTMLDivElement>(null);

  const currentLevel = LEVELS.find(l => l.value === level) || LEVELS[0];

  // Convert level angle to rotation for the pointer (needs adjustment for CSS)
  // CSS rotate: 0° = pointing right, 90° = pointing down, -90° = pointing up
  // We want: angle 0 = point right, angle 90 = point up, angle 180 = point left
  const pointerRotation = -currentLevel.angle + 90; // Adjust for CSS rotation

  const handleLevelClick = (newLevel: number) => {
    onChange(newLevel);
  };

  // Calculate angle from mouse position
  const getAngleFromMouse = useCallback((clientX: number, clientY: number) => {
    if (!dialRef.current) return null;

    const rect = dialRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height - 20; // Bottom of the arc

    const deltaX = clientX - centerX;
    const deltaY = -(clientY - centerY); // Negate for math coords (Y up)

    // Calculate angle in degrees
    let angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

    // Constrain to top semicircle (0 to 180)
    if (angle < 0) angle = 0;
    if (angle > 180) angle = 180;

    return angle;
  }, []);

  // Find closest level based on angle
  const getLevelFromAngle = useCallback((angle: number) => {
    let closestLevel = LEVELS[0];
    let minDiff = Math.abs(angle - LEVELS[0].angle);

    LEVELS.forEach(levelData => {
      const diff = Math.abs(angle - levelData.angle);
      if (diff < minDiff) {
        minDiff = diff;
        closestLevel = levelData;
      }
    });

    return closestLevel.value;
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    const angle = getAngleFromMouse(e.clientX, e.clientY);
    if (angle !== null) {
      const newLevel = getLevelFromAngle(angle);
      onChange(newLevel);
    }
  }, [getAngleFromMouse, getLevelFromAngle, onChange]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;

    const angle = getAngleFromMouse(e.clientX, e.clientY);
    if (angle !== null) {
      const newLevel = getLevelFromAngle(angle);
      onChange(newLevel);
    }
  }, [isDragging, getAngleFromMouse, getLevelFromAngle, onChange]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Layout constants
  const containerWidth = 300;
  const containerHeight = 200;
  const arcRadius = 130;
  const markerRadius = 115;
  const centerX = containerWidth / 2;
  const centerY = containerHeight - 30; // Near bottom with padding

  // Calculate marker position (for screen coords, negate sin for Y)
  const getMarkerPos = (angleDeg: number) => {
    const angleRad = (angleDeg * Math.PI) / 180;
    return {
      x: centerX + Math.cos(angleRad) * markerRadius - 14,
      y: centerY - Math.sin(angleRad) * markerRadius - 14, // Subtract for screen Y
    };
  };

  return (
    <div className="flex flex-col items-center gap-6 my-12">
      {/* Dial Container */}
      <div
        ref={dialRef}
        className="relative"
        style={{ width: `${containerWidth}px`, height: `${containerHeight}px` }}
      >
        {/* Semicircle Arc */}
        <div
          className="absolute border-8 border-neo-text bg-neo-bg"
          style={{
            width: `${arcRadius * 2}px`,
            height: `${arcRadius}px`,
            borderRadius: `${arcRadius}px ${arcRadius}px 0 0`,
            borderBottom: 'none',
            boxShadow: '6px -4px 0 rgba(26, 26, 26, 1)',
            left: `${centerX - arcRadius}px`,
            top: `${centerY - arcRadius}px`,
          }}
        />

        {/* Center Hub */}
        <div
          className="absolute rounded-full border-6 border-neo-text bg-neo-secondary"
          style={{
            width: '70px',
            height: '70px',
            left: `${centerX - 35}px`,
            top: `${centerY - 35}px`,
            borderWidth: '6px',
            boxShadow: '4px 4px 0 rgba(26, 26, 26, 1)',
          }}
        />

        {/* Level Markers */}
        {LEVELS.map((levelData) => {
          const pos = getMarkerPos(levelData.angle);
          const isActive = levelData.value === level;

          return (
            <button
              key={levelData.value}
              onClick={() => handleLevelClick(levelData.value)}
              className={`absolute rounded-full border-4 border-neo-text transition-all ${
                isActive
                  ? 'bg-neo-primary scale-125'
                  : 'bg-neo-bg hover:bg-neo-accent hover:scale-110'
              }`}
              style={{
                width: '28px',
                height: '28px',
                left: `${pos.x}px`,
                top: `${pos.y}px`,
                boxShadow: '3px 3px 0 rgba(26, 26, 26, 1)',
              }}
              aria-label={`Set resume level to ${levelData.label}`}
            />
          );
        })}

        {/* Pointer Arm */}
        <div
          className="absolute cursor-grab active:cursor-grabbing"
          style={{
            width: '12px',
            height: '75px',
            left: `${centerX - 6}px`,
            top: `${centerY - 75}px`,
            transform: `rotate(${pointerRotation}deg)`,
            transformOrigin: 'center bottom',
            transition: isDragging ? 'none' : 'transform 0.3s ease-out',
          }}
          onMouseDown={handleMouseDown}
        >
          <div
            className="w-full h-full bg-neo-primary border-4 border-neo-text"
            style={{
              borderRadius: '6px 6px 0 0',
              boxShadow: '3px 3px 0 rgba(26, 26, 26, 1)',
            }}
          />
          <div
            className="absolute rounded-full bg-neo-primary border-4 border-neo-text"
            style={{
              width: '22px',
              height: '22px',
              left: '-5px',
              top: '-8px',
            }}
          />
        </div>

        {/* Center Knob */}
        <button
          onClick={() => onChange((level + 1) % LEVELS.length)}
          className="absolute rounded-full border-4 border-neo-text bg-neo-accent hover:bg-neo-primary transition-colors"
          style={{
            width: '36px',
            height: '36px',
            left: `${centerX - 18}px`,
            top: `${centerY - 18}px`,
            boxShadow: '3px 3px 0 rgba(26, 26, 26, 1)',
            zIndex: 10,
          }}
          aria-label="Cycle resume level"
        />
      </div>

      {/* Level Buttons */}
      <div className="flex items-center gap-3 flex-wrap justify-center mt-8">
        {LEVELS.map((levelData) => {
          const isActive = levelData.value === level;
          return (
            <button
              key={levelData.value}
              onClick={() => handleLevelClick(levelData.value)}
              className={`px-4 py-2 font-heading font-bold border-4 border-neo-text transition-all ${
                isActive
                  ? 'bg-neo-primary text-white -rotate-1 scale-105'
                  : 'bg-neo-bg hover:bg-neo-secondary'
              }`}
              style={{
                boxShadow: '4px 4px 0 rgba(26, 26, 26, 1)',
              }}
            >
              {levelData.label}
            </button>
          );
        })}
      </div>

      {/* Current Level */}
      <p className="font-heading font-bold text-xl text-neo-primary">
        {currentLevel.label}
      </p>
    </div>
  );
}
