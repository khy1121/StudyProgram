import React from 'react';

export default function OptionList({ options = [], selected, onSelect, showAnswer = false, correctAnswer = null }) {
  return (
    <div className="options-container">
      {options.map((option, idx) => {
        let optionClass = 'option-button';
        if (selected === idx) optionClass += ' selected';
        if (showAnswer) {
          if (idx === correctAnswer) {
            optionClass += ' correct';
          } else if (selected === idx) {
            optionClass += ' wrong';
          }
        }

        return (
          <button
            key={idx}
            type="button"
            className={optionClass}
            onClick={() => onSelect(idx)}
            disabled={showAnswer}
          >
            <div className="option-index">{idx + 1}</div>
            <div className="option-text">{option}</div>
            {showAnswer && (idx === correctAnswer || (selected === idx)) && (
              <div className={`result-mark ${idx === correctAnswer ? 'correct' : 'wrong'}`}>
                {idx === correctAnswer ? (
                  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                )}
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
