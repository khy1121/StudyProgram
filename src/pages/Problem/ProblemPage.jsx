// src/pages/Problem/ProblemPage.jsx
// 페이지 래퍼: components 폴더의 ProblemPage 컴포넌트를 페이지 형식으로 노출
import React from 'react';
import Problem from '../../components/Problem/ProblemPage';

// 페이지 레벨 래퍼: 인증/레이아웃/프리패칭이 필요하면 여기서 처리
export default function ProblemPage() {
  return (
    <div>
      <Problem />
    </div>
  );
}
