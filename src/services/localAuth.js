// 로컬스토리지 기반 인증 서비스 (백엔드 없이 동작)
// 주의: 실제 보안은 취약하므로 프로토타입/데모용으로만 사용하세요
// 비밀번호는 평문 저장되며, 누구나 localStorage를 볼 수 있습니다

const USERS_KEY = 'studyapp_users'
const CURRENT_USER_KEY = 'studyapp_current_user'

/**
 * 로컬스토리지에서 모든 사용자 목록 가져오기
 */
function getUsers() {
  const json = localStorage.getItem(USERS_KEY)
  return json ? JSON.parse(json) : []
}

/**
 * 로컬스토리지에 사용자 목록 저장
 */
function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

/**
 * 현재 로그인한 사용자 정보 저장
 */
function setCurrentUser(user) {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user))
}

/**
 * 현재 로그인한 사용자 정보 가져오기
 */
function getCurrentUser() {
  const json = localStorage.getItem(CURRENT_USER_KEY)
  return json ? JSON.parse(json) : null
}

/**
 * 현재 로그인한 사용자 정보 삭제
 */
function clearCurrentUser() {
  localStorage.removeItem(CURRENT_USER_KEY)
}

/**
 * 회원가입
 * @param {string} email 
 * @param {string} name 
 * @param {string} password 
 * @returns {Promise<{success: boolean, message?: string, user?: object}>}
 */
export async function signup(email, name, password) {
  // 간단한 지연으로 비동기 API 호출처럼 보이게 함
  await new Promise(resolve => setTimeout(resolve, 300))

  const users = getUsers()
  
  // 이메일 중복 체크
  const existing = users.find(u => u.email === email)
  if (existing) {
    return { success: false, message: '이미 가입된 이메일입니다.' }
  }

  // 새 사용자 생성
  const newUser = {
    id: Date.now(), // 간단한 ID 생성
    email,
    name,
    password, // 주의: 평문 저장 (프로토타입용)
    createdAt: new Date().toISOString()
  }

  users.push(newUser)
  saveUsers(users)

  // 비밀번호 제외하고 반환
  const { password: _, ...userWithoutPassword } = newUser
  return { 
    success: true, 
    user: userWithoutPassword 
  }
}

/**
 * 로그인
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<{success: boolean, message?: string, user?: object}>}
 */
export async function login(email, password) {
  await new Promise(resolve => setTimeout(resolve, 300))

  const users = getUsers()
  const user = users.find(u => u.email === email && u.password === password)

  if (!user) {
    return { 
      success: false, 
      message: '이메일 또는 비밀번호가 올바르지 않습니다.' 
    }
  }

  // 현재 사용자로 설정
  const { password: _, ...userWithoutPassword } = user
  setCurrentUser(userWithoutPassword)

  return { 
    success: true, 
    user: userWithoutPassword 
  }
}

/**
 * 로그아웃
 * @returns {Promise<{success: boolean}>}
 */
export async function logout() {
  await new Promise(resolve => setTimeout(resolve, 100))
  clearCurrentUser()
  return { success: true }
}

/**
 * 현재 로그인한 사용자 정보 조회 (세션 확인)
 * @returns {Promise<{success: boolean, user?: object, message?: string}>}
 */
export async function getUser() {
  await new Promise(resolve => setTimeout(resolve, 100))
  
  const user = getCurrentUser()
  if (!user) {
    return { 
      success: false, 
      message: '인증 필요' 
    }
  }

  return { 
    success: true, 
    user 
  }
}
