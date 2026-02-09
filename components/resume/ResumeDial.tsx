'use client';

import { useState, useRef, useCallback, useEffect, useMemo } from 'react';

export interface ResumeDialLevel {
  value: number;
  label: string;
}

interface ResumeDialProps {
  level: number;
  onChange: (level: number) => void;
  levels?: ResumeDialLevel[];
  compact?: boolean;
}

const DEFAULT_LEVELS: ResumeDialLevel[] = [
  { value: 0, label: 'Quick Bite' },
  { value: 1, label: 'Resume' },
  { value: 2, label: 'Resume+' },
  { value: 3, label: 'Everything Ever' },
];

interface DialLevelWithAngle extends ResumeDialLevel {
  angle: number;
}

function withAngles(levels: ResumeDialLevel[]): DialLevelWithAngle[] {
  if (levels.length <= 1) {
    return levels.map((item) => ({ ...item, angle: 90 }));
  }

  return levels.map((item, index) => ({
    ...item,
    angle: 180 - (180 * index) / (levels.length - 1),
  }));
}

export default function ResumeDial({
  level,
  onChange,
  levels = DEFAULT_LEVELS,
  compact = false,
}: ResumeDialProps) {
  const [isDragging, setIsDragging] = useState(false);
  const dialRef = useRef<HTMLDivElement>(null);
  const activePointerIdRef = useRef<number | null>(null);

  const dialLevels = useMemo(() => withAngles(levels), [levels]);

  const currentLevel = dialLevels.find((item) => item.value === level) ?? dialLevels[0];
  const currentIndex = dialLevels.findIndex((item) => item.value === currentLevel.value);

  // CSS rotate: 0deg points right, 90deg points down. Convert math angle to CSS angle.
  const pointerRotation = -currentLevel.angle + 90;

  const getAngleFromPoint = useCallback((clientX: number, clientY: number) => {
    if (!dialRef.current) return null;

    const rect = dialRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height - 24;

    const deltaX = clientX - centerX;
    const deltaY = -(clientY - centerY);

    let angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
    if (angle < 0) angle = 0;
    if (angle > 180) angle = 180;

    return angle;
  }, []);

  const getClosestLevelValue = useCallback(
    (angle: number) => {
      let closest = dialLevels[0];
      let minDiff = Math.abs(angle - closest.angle);

      dialLevels.forEach((candidate) => {
        const diff = Math.abs(angle - candidate.angle);
        if (diff < minDiff) {
          minDiff = diff;
          closest = candidate;
        }
      });

      return closest.value;
    },
    [dialLevels]
  );

  const updateFromPoint = useCallback(
    (clientX: number, clientY: number) => {
      const angle = getAngleFromPoint(clientX, clientY);
      if (angle === null) return;
      const nextLevel = getClosestLevelValue(angle);
      onChange(nextLevel);
    },
    [getAngleFromPoint, getClosestLevelValue, onChange]
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      e.preventDefault();
      activePointerIdRef.current = e.pointerId;
      setIsDragging(true);
      updateFromPoint(e.clientX, e.clientY);
    },
    [updateFromPoint]
  );

  const handlePointerMove = useCallback(
    (e: PointerEvent) => {
      if (!isDragging) return;
      if (activePointerIdRef.current !== null && e.pointerId !== activePointerIdRef.current) return;
      updateFromPoint(e.clientX, e.clientY);
    },
    [isDragging, updateFromPoint]
  );

  const stopDragging = useCallback((e?: PointerEvent) => {
    if (e && activePointerIdRef.current !== null && e.pointerId !== activePointerIdRef.current) return;
    setIsDragging(false);
    activePointerIdRef.current = null;
  }, []);

  useEffect(() => {
    if (!isDragging) return;

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', stopDragging);
    window.addEventListener('pointercancel', stopDragging);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', stopDragging);
      window.removeEventListener('pointercancel', stopDragging);
    };
  }, [isDragging, handlePointerMove, stopDragging]);

  const setByIndex = useCallback(
    (index: number) => {
      const boundedIndex = Math.max(0, Math.min(dialLevels.length - 1, index));
      onChange(dialLevels[boundedIndex].value);
    },
    [dialLevels, onChange]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
        e.preventDefault();
        setByIndex(currentIndex - 1);
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
        e.preventDefault();
        setByIndex(currentIndex + 1);
      } else if (e.key === 'Home') {
        e.preventDefault();
        setByIndex(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        setByIndex(dialLevels.length - 1);
      }
    },
    [currentIndex, dialLevels.length, setByIndex]
  );

  const containerWidth = compact ? 240 : 340;
  const containerHeight = compact ? 150 : 240;
  const arcRadius = compact ? 102 : 145;
  const markerRadius = compact ? 89 : 130;
  const centerX = containerWidth / 2;
  const centerY = compact ? containerHeight - 30 : containerHeight - 38;

  const dialStemWidth = compact ? 10 : 14;
  const dialStemHeight = compact ? 58 : 90;
  const dialStemTop = compact ? 58 : 90;
  const dialStemKnob = compact ? 16 : 24;
  const dialHubSize = compact ? 56 : 76;
  const dialHubBorder = compact ? 4 : 6;
  const markerSize = compact ? 25 : 34;
  const markerBorder = compact ? 3 : 4;
  const dialCenterButton = compact ? 32 : 42;

  const getMarkerPos = (angleDeg: number) => {
    const angleRad = (angleDeg * Math.PI) / 180;
    return {
      x: centerX + Math.cos(angleRad) * markerRadius - markerSize / 2,
      y: centerY - Math.sin(angleRad) * markerRadius - markerSize / 2,
    };
  };

  return (
    <div className={`flex flex-col items-center ${compact ? 'gap-2 my-2' : 'gap-6 my-12'}`}>
      <div
        ref={dialRef}
        className="relative touch-none"
        style={{ width: `${containerWidth}px`, height: `${containerHeight}px` }}
        role="slider"
        tabIndex={0}
        aria-label="Resume detail level"
        aria-valuemin={0}
        aria-valuemax={dialLevels.length - 1}
        aria-valuenow={currentIndex}
        aria-valuetext={currentLevel.label}
        onKeyDown={handleKeyDown}
      >
        <div
          className="absolute border-8 border-neo-text bg-neo-bg"
          style={{
            width: `${arcRadius * 2}px`,
            height: `${arcRadius}px`,
            borderRadius: `${arcRadius}px ${arcRadius}px 0 0`,
            borderBottom: 'none',
            boxShadow: compact ? '4px -3px 0 rgba(26, 26, 26, 1)' : '6px -4px 0 rgba(26, 26, 26, 1)',
            left: `${centerX - arcRadius}px`,
            top: `${centerY - arcRadius}px`,
          }}
        />

        <div
          className="absolute rounded-full border-6 border-neo-text bg-neo-secondary"
          style={{
            width: `${dialHubSize}px`,
            height: `${dialHubSize}px`,
            left: `${centerX - dialHubSize / 2}px`,
            top: `${centerY - dialHubSize / 2}px`,
            borderWidth: `${dialHubBorder}px`,
            boxShadow: compact ? '3px 3px 0 rgba(26, 26, 26, 1)' : '4px 4px 0 rgba(26, 26, 26, 1)',
          }}
        />

        {dialLevels.map((levelData) => {
          const pos = getMarkerPos(levelData.angle);
          const isActive = levelData.value === currentLevel.value;

          return (
            <button
              key={levelData.value}
              type="button"
              onClick={() => onChange(levelData.value)}
              className={`absolute rounded-full border-4 border-neo-text transition-all focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 ${
                isActive
                  ? 'bg-neo-bg scale-110'
                  : 'bg-neo-bg hover:bg-neo-accent hover:scale-105'
              }`}
              style={{
                width: `${markerSize}px`,
                height: `${markerSize}px`,
                left: `${pos.x}px`,
                top: `${pos.y}px`,
                borderWidth: `${markerBorder}px`,
                outline: 'none',
                WebkitTapHighlightColor: 'transparent',
                boxShadow: isActive
                  ? `${compact ? '0 0 0 4px' : '0 0 0 6px'} rgba(255, 0, 110, 0.95), ${compact ? '2px 2px' : '3px 3px'} 0 rgba(26, 26, 26, 1)`
                  : `${compact ? '2px 2px' : '3px 3px'} 0 rgba(26, 26, 26, 1)`,
              }}
              aria-label={`Set resume level to ${levelData.label}`}
            />
          );
        })}

        <div
          className="absolute cursor-grab active:cursor-grabbing"
          style={{
            width: `${dialStemWidth}px`,
            height: `${dialStemHeight}px`,
            left: `${centerX - dialStemWidth / 2}px`,
            top: `${centerY - dialStemTop}px`,
            transform: `rotate(${pointerRotation}deg)`,
            transformOrigin: 'center bottom',
            transition: isDragging ? 'none' : 'transform 0.25s ease-out',
          }}
          onPointerDown={handlePointerDown}
        >
          <div
            className="w-full h-full bg-neo-primary border-4 border-neo-text"
            style={{
              borderRadius: '8px 8px 0 0',
              boxShadow: compact ? '2px 2px 0 rgba(26, 26, 26, 1)' : '3px 3px 0 rgba(26, 26, 26, 1)',
            }}
          />
          <div
            className="absolute rounded-full bg-neo-primary border-4 border-neo-text"
            style={{
              width: `${dialStemKnob}px`,
              height: `${dialStemKnob}px`,
              left: `${-(dialStemKnob - dialStemWidth) / 2}px`,
              top: `${-Math.round(dialStemKnob / 3)}px`,
            }}
          />
        </div>

        <button
          type="button"
          onClick={() => setByIndex((currentIndex + 1) % dialLevels.length)}
          className="absolute rounded-full border-4 border-neo-text bg-neo-accent hover:bg-neo-primary transition-colors focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
          style={{
            width: `${dialCenterButton}px`,
            height: `${dialCenterButton}px`,
            left: `${centerX - dialCenterButton / 2}px`,
            top: `${centerY - dialCenterButton / 2}px`,
            boxShadow: compact ? '2px 2px 0 rgba(26, 26, 26, 1)' : '3px 3px 0 rgba(26, 26, 26, 1)',
            zIndex: 10,
            outline: 'none',
            WebkitTapHighlightColor: 'transparent',
          }}
          aria-label="Cycle resume detail level"
        />
      </div>

      <div className={`flex items-center ${compact ? 'gap-1' : 'gap-3'} flex-wrap justify-center mt-0`}>
        {dialLevels.map((levelData) => {
          const isActive = levelData.value === currentLevel.value;
          return (
            <button
              key={levelData.value}
              type="button"
              onClick={() => onChange(levelData.value)}
              className={`${compact ? 'px-1.5 py-0.5 text-[11px]' : 'px-4 py-2'} font-heading font-bold border-4 border-neo-text transition-all focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 ${
                isActive
                  ? 'bg-neo-primary text-white -rotate-1 scale-105'
                  : 'bg-neo-bg hover:bg-neo-secondary'
              }`}
              style={{
                boxShadow: compact ? '2px 2px 0 rgba(26, 26, 26, 1)' : '4px 4px 0 rgba(26, 26, 26, 1)',
                borderWidth: compact ? '3px' : '4px',
                outline: 'none',
                WebkitTapHighlightColor: 'transparent',
              }}
            >
              {levelData.label}
            </button>
          );
        })}
      </div>

      <div className="text-center">
        {!compact && <p className="font-heading font-bold text-xl text-neo-primary">{currentLevel.label}</p>}
        {!compact && <p className="text-sm text-neo-text/70">Use drag, touch, or click to switch levels.</p>}
      </div>
    </div>
  );
}
