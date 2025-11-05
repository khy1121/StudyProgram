import React from 'react';

export default function QuestionCard({ question }) {
  return (
    <div className="question-container">
      <h2 className="question-text">{question}</h2>
    </div>
  );
}
