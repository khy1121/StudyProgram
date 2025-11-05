import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import '../../styles/problem.css';

// localStorage 키
const STORAGE_KEY = 'continueStudy';

function getContinueList() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export default function ContinueStudy() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [list, setList] = useState([]);

  useEffect(() => {
    setList(getContinueList());
  }, []);

  const handleContinue = (item) => {
    navigate('/problem', { state: item });
  };

  const handleHome = () => {
    navigate('/home');
  };

  const handleDelete = (idx) => {
    if (window.confirm('이 학습 기록을 삭제하시겠습니까?')) {
      try {
        const STORAGE_KEY = 'continueStudy';
        let raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          let arr = JSON.parse(raw);
          arr.splice(idx, 1);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
          setList(arr);
        }
      } catch (e) {
        console.error('Failed to delete item:', e);
      }
    }
  };

  // 모드별 아이콘과 색상
  const getModeInfo = (mode) => {
    if (mode === 'quiz') {
      return {
        icon: (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 11l3 3L22 4"></path>
            <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"></path>
          </svg>
        ),
        label: '퀴즈 모드',
        color: '#3B82F6'
      };
    } else {
      return {
        icon: (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
        ),
        label: '시험 모드',
        color: '#8B5CF6'
      };
    }
  };

  if (!list.length) {
    return (
      <div className={`continue-study-page ${theme}`}>
        <div className={`continue-study-empty ${theme}`}>
          <div className="empty-icon-wrapper">
            <svg className="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <h2 className="empty-title">이어할 학습이 없습니다</h2>
          <p className="empty-description">
            새로운 학습을 시작하거나<br />
            기존 학습을 완료하면 이곳에 표시됩니다
          </p>
          <button className="btn-main" onClick={handleHome}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            메인으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`continue-study-page ${theme}`}>
      <h1 className="continue-title">이어서 학습하기</h1>
      <p className="continue-desc">중단했던 학습을 이어서 진행하세요</p>
      <div className="continue-list">
        {list.map((item, idx) => {
          const modeInfo = getModeInfo(item.mode);
          return (
            <div className={`continue-card ${theme}`} key={idx}>
              {/* 삭제 버튼 */}
              <button 
                className="delete-btn" 
                onClick={() => handleDelete(idx)}
                aria-label="삭제"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"></path>
                  <line x1="10" y1="11" x2="10" y2="17"></line>
                  <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
              </button>

              {/* 모드 아이콘 */}
              <div className="mode-icon-wrapper" style={{ backgroundColor: modeInfo.color }}>
                {modeInfo.icon}
              </div>

              <div className="continue-card-header">
                {/* 과목과 모드 정보 */}
                <div className="continue-subject">
                  <span className={`subject-badge ${item.difficulty}`}>{item.subjectLabel}</span>
                  <span className="mode-badge" style={{ backgroundColor: modeInfo.color }}>
                    {modeInfo.label}
                  </span>
                </div>
                <div className="difficulty-badge-wrapper">
                  <span className={`difficulty-badge ${item.difficulty}`}>
                    {item.difficulty === '초급' && '🟢'}
                    {item.difficulty === '중급' && '🟡'}
                    {item.difficulty === '고급' && '🔴'}
                    {item.difficulty}
                  </span>
                </div>
                
                <div className="continue-progress-label">진행률</div>
                <div className="continue-progress-bar">
                  <div className="continue-progress-inner" style={{ width: `${item.progressPercent}%` }} />
                </div>
                <div className="continue-progress-info">
                  <span>{Math.round(item.progressPercent)}%</span>
                  <span>{item.current + 1}/{item.total} 문제</span>
                </div>
              </div>
              
              <div className="continue-card-body">
                <div className="continue-stats">
                  <div className="continue-stat">
                    <div className="stat-label">정답률</div>
                    <div className="stat-value">{item.correctRate}%</div>
                  </div>
                  <div className="continue-stat">
                    <div className="stat-label">남은 시간</div>
                    <div className="stat-value">
                      {(item.remainingTimeMin || item.studyTimeMin) ? `${item.remainingTimeMin || item.studyTimeMin}분` : '제한없음'}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="continue-card-footer">
                <button className="action-btn" onClick={() => handleContinue(item)}>
                  이어서 시작
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="continue-actions">
        <button className="btn-main" onClick={handleHome}>메인으로 돌아가기</button>
      </div>
    </div>
  );
}
