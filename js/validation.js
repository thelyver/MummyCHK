/**
 * 디스크 케어 일지 - 입력 검증 로직
 */

/**
 * 폼 데이터 유효성 검증
 * @param {Object} data - 폼 데이터 객체
 * @returns {boolean} 유효성 검증 통과 여부
 */
function validateForm(data) {
  // 1. 필수 필드 체크: 날짜
  if (!data.recordDate) {
    showError('날짜를 선택해주세요.');
    return false;
  }

  // 2. 날짜 유효성 체크 (미래 날짜 방지)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const selectedDate = new Date(data.recordDate);
  selectedDate.setHours(0, 0, 0, 0);

  if (selectedDate > today) {
    showError('미래 날짜는 선택할 수 없습니다.');
    return false;
  }

  // 3. 통증 점수 범위 체크 (0-10)
  const morningPain = parseInt(data.morningPain);
  const eveningPain = parseInt(data.eveningPain);

  if (isNaN(morningPain) || morningPain < 0 || morningPain > 10) {
    showError('기상 시 통증 점수는 0~10 사이여야 합니다.');
    return false;
  }

  if (isNaN(eveningPain) || eveningPain < 0 || eveningPain > 10) {
    showError('취침 전 통증 점수는 0~10 사이여야 합니다.');
    return false;
  }

  // 4. 텍스트 필드 길이 제한 (1000자)
  const maxLength = 1000;
  const textFields = [
    { name: '주요 활동', value: data.activities },
    { name: '악화 시점', value: data.worsened },
    { name: '완화 행동', value: data.relieved },
    { name: '약물 처치', value: data.medication },
    { name: '특이사항', value: data.notes },
    { name: '하루 요약', value: data.summary }
  ];

  for (const field of textFields) {
    if (field.value && field.value.length > maxLength) {
      showError(`${field.name}은(는) ${maxLength}자를 초과할 수 없습니다. (현재: ${field.value.length}자)`);
      return false;
    }
  }

  // 5. 다리 증상 필수 선택 체크
  if (!data.legSymptom) {
    showError('다리 증상을 선택해주세요.');
    return false;
  }

  // 모든 검증 통과
  return true;
}

/**
 * 오류 메시지 표시
 * @param {string} message - 오류 메시지
 */
function showError(message) {
  const warningDiv = document.getElementById('warningMessage');
  if (warningDiv) {
    warningDiv.innerHTML = `⚠️ ${message}`;
    warningDiv.style.display = 'block';

    // 3초 후 자동 숨김
    setTimeout(() => {
      warningDiv.style.display = 'none';
    }, 5000);

    // 화면 최상단으로 스크롤
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    alert(message);
  }
}

/**
 * 성공 메시지 표시
 * @param {string} message - 성공 메시지
 */
function showSuccess(message) {
  const successDiv = document.getElementById('successMessage');
  if (successDiv) {
    successDiv.innerHTML = `✅ ${message}`;
    successDiv.style.display = 'block';

    // 5초 후 자동 숨김
    setTimeout(() => {
      successDiv.style.display = 'none';
    }, 5000);

    // 화면 최상단으로 스크롤
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

/**
 * 경고 메시지 표시 (다리 힘 빠짐 등)
 * @param {string} message - 경고 메시지
 */
function showWarning(message) {
  const warningDiv = document.getElementById('warningMessage');
  if (warningDiv) {
    warningDiv.innerHTML = message;
    warningDiv.style.display = 'block';

    // 화면 최상단으로 스크롤
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

/**
 * 로딩 상태 표시
 */
function showLoading() {
  const submitBtn = document.getElementById('submitBtn');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.querySelector('.btn-text').style.display = 'none';
    submitBtn.querySelector('.btn-loader').style.display = 'inline-block';
  }
}

/**
 * 로딩 상태 숨김
 */
function hideLoading() {
  const submitBtn = document.getElementById('submitBtn');
  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn.querySelector('.btn-text').style.display = 'inline-block';
    submitBtn.querySelector('.btn-loader').style.display = 'none';
  }
}
