// 보호 라우트 컴포넌트
// - 책임: 인증된 사용자만 자식 라우트를 접근 가능하게 함
// - 방식: localAuth.getUser()로 세션 유효성 검사 → 통과 시 children 렌더, 실패 시 로그인으로 리다이렉트
import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import * as localAuth from '../../services/localAuth'

export default function ProtectedRoute({ children }) {
  // status: 'loading' 동안은 화면을 비워 깜빡임 최소화
  const [status, setStatus] = useState('loading')
  const [authed, setAuthed] = useState(false)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        // localAuth 서비스로 사용자 세션 확인
        const result = await localAuth.getUser()
        if (!mounted) return
        setAuthed(result.success)
      } catch {
        if (!mounted) return
        setAuthed(false)
      } finally {
        if (mounted) setStatus('done')
      }
    })()
    return () => { mounted = false }
  }, [])

  // 로딩 중에는 빈 화면(혹은 로더) 표시
  if (status === 'loading') return null
  return authed ? children : <Navigate to="/auth/login" replace />
}
