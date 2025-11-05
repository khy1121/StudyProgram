import React from 'react';

const ResultsCard = ({ results }) => {
  const getGrade = () => {
    const score = Math.round((results.correctCount / (results.correctCount + results.wrongCount)) * 100) || 0;
    if (score >= 90) return ['A', '매우 우수'];
    if (score >= 80) return ['B', '우수'];
    if (score >= 70) return ['C', '보통'];
    if (score >= 60) return ['D', '노력 필요'];
    return ['F', '더 많은 학습 필요'];
  };

  const [grade, gradeText] = getGrade();

  return (
    <div className="results-card">
      <div className="results-header">
        <div className="subject-info">
          {results.subject === 'os' && '운영체제'}
          {results.subject === 'ds' && '자료구조'}
          {results.subject === 'web' && '웹프레임워크'}
          {results.difficulty && ` - ${results.difficulty}`}
        </div>
        <div className="result-circle">
          <svg className="progress-ring" width="160" height="160">
            <circle
              className="progress-ring-bg"
              stroke="var(--bg-secondary)"
              strokeWidth="8"
              fill="transparent"
              r="70"
              cx="80"
              cy="80"
            />
            <circle
              className="progress-ring-progress"
              stroke="url(#gradient)"
              strokeWidth="8"
              fill="transparent"
              r="70"
              cx="80"
              cy="80"
              style={{
                strokeDasharray: `${2 * Math.PI * 70}`,
                strokeDashoffset: `${2 * Math.PI * 70 * (1 - (results.correctCount / results.problems.length))}`,
              }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2563eb" />
                <stop offset="100%" stopColor="#7c3aed" />
              </linearGradient>
            </defs>
          </svg>
          <div className="result-percentage">
            <span className="percentage-value">
              {Math.round((results.correctCount / results.problems.length) * 100)}
            </span>
            <span className="percentage-symbol">%</span>
          </div>
        </div>
      </div>

      <div className="score-details">
        <div className="score-item">
          <span className="score-label">정답 수</span>
          <span className="score-value">{results.correctCount}</span>
        </div>
        <div className="score-item">
          <span className="score-label">오답 수</span>
          <span className="score-value">{results.wrongCount}</span>
        </div>
        <div className="score-item">
          <span className="score-label">총 문제 수</span>
          <span className="score-value">{results.problems.length}</span>
        </div>
      </div>

      <div className="problem-review">
        <h3 className="review-title">문제 리뷰</h3>
        {results.problems.map((problem, index) => (
          <div key={index} className="review-item">
            <div className="review-header">
              <div className="review-number-container">
                <span className="review-number">{index + 1}번</span>
                {problem.userSelectedIndex === problem.answerIndex ? (
                  <span className="review-result correct">
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    정답
                  </span>
                ) : (
                  <span className="review-result wrong">
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                    오답
                  </span>
                )}
              </div>
            </div>
            <div className="review-content">
              <p className="review-question">{problem.question}</p>
              <div className="review-answers">
                <div className="answer-row">
                  <div className="answer-label">선택한 답안</div>
                  <div className={`answer-value ${problem.userSelectedIndex === problem.answerIndex ? 'correct' : 'wrong'}`}>
                    {problem.userSelectedIndex + 1}번
                  </div>
                </div>
                <div className="answer-row">
                  <div className="answer-label">정답</div>
                  <div className="answer-value correct">{problem.answerIndex + 1}번</div>
                </div>
              </div>
              {problem.explanation && (
                <div className="review-explanation">
                  <div className="explanation-header">
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="16" x2="12" y2="12"></line>
                      <line x1="12" y1="8" x2="12.01" y2="8"></line>
                    </svg>
                    해설
                  </div>
                  <div className="explanation-content">{problem.explanation}</div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultsCard;
