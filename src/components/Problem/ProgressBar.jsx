import React from 'react';

export default function ProgressBar({ labelLeft, labelRight, percent = 0 }) {
  return (
    <div className="progress-container">
      <div className="progress-inner">
        <div className="progress-info">
          <span>{labelLeft}</span>
          <span>{labelRight}</span>
        </div>
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${percent}%` }} />
        </div>
      </div>
    </div>
  );
}
