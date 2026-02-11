/**
 * 디스크 케어 일지 - 폼 제출 로직 및 UI 상호작용
 */

// ============================================
// Google Apps Script 배포 URL
// ⚠️ 중요: 이 URL을 본인의 Apps Script 배포 URL로 변경하세요!
// ============================================
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzkUBf3IeR2klfqziWn7HxWssBpxsl-hNeb1NkDXLY3JaOSxoqB4gfRSYV-X2wZzBAtYA/exec';

// ============================================
// 페이지 로드 시 초기화
// ============================================
document.addEventListener('DOMContentLoaded', function() {
  initializePage();
  setupEventListeners();
});

/**
 * 페이지 초기화
 */
function initializePage() {
  // 오늘 날짜 표시
  displayToday();

  // 날짜 입력 필드 기본값 설정
  setDefaultDate();

  // 슬라이더 값 표시 초기화
  updateSliderValues();
}

/**
 * 오늘 날짜 표시
 */
function displayToday() {
  const todayDisplay = document.getElementById('todayDisplay');
  if (todayDisplay) {
    const today = new Date();
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    };
    todayDisplay.textContent = `오늘: ${today.toLocaleDateString('ko-KR', options)}`;
  }
}

/**
 * 날짜 입력 필드 기본값 설정 (오늘)
 */
function setDefaultDate() {
  const dateInput = document.getElementById('recordDate');
  if (dateInput) {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    dateInput.value = formattedDate;
  }
}

/**
 * 슬라이더 값 표시 업데이트
 */
function updateSliderValues() {
  const morningSlider = document.getElementById('morningPain');
  const morningValue = document.getElementById('morningPainValue');

  if (morningSlider && morningValue) {
    morningValue.textContent = morningSlider.value;
  }

  const eveningSlider = document.getElementById('eveningPain');
  const eveningValue = document.getElementById('eveningPainValue');

  if (eveningSlider && eveningValue) {
    eveningValue.textContent = eveningSlider.value;
  }
}

/**
 * 이벤트 리스너 설정
 */
function setupEventListeners() {
  // 폼 제출 이벤트
  const form = document.getElementById('healthForm');
  if (form) {
    form.addEventListener('submit', handleFormSubmit);
  }

  // 슬라이더 값 변경 이벤트
  const morningSlider = document.getElementById('morningPain');
  if (morningSlider) {
    morningSlider.addEventListener('input', function() {
      document.getElementById('morningPainValue').textContent = this.value;
    });
  }

  const eveningSlider = document.getElementById('eveningPain');
  if (eveningSlider) {
    eveningSlider.addEventListener('input', function() {
      document.getElementById('eveningPainValue').textContent = this.value;
    });
  }

  // 칩 버튼 토글 이벤트 (다중 선택)
  const chips = document.querySelectorAll('.chip');
  chips.forEach(chip => {
    chip.addEventListener('click', function() {
      this.classList.toggle('selected');
    });
  });

  // 텍스트 영역 글자 수 카운터
  const textareas = document.querySelectorAll('textarea');
  textareas.forEach(textarea => {
    textarea.addEventListener('input', function() {
      updateCharCount(this);
    });
  });

  // 다리 증상 "힘 빠짐" 선택 시 즉시 경고
  const legSymptomRadios = document.querySelectorAll('input[name="legSymptom"]');
  legSymptomRadios.forEach(radio => {
    radio.addEventListener('change', function() {
      if (this.value === '힘 빠짐') {
        showWarning('⚠️ <strong>중요:</strong> 다리에 힘이 빠지는 증상은 신경 압박의 신호일 수 있습니다. 즉시 병원 상담을 권장합니다.');
      }
    });
  });
}

/**
 * 텍스트 영역 글자 수 업데이트
 */
function updateCharCount(textarea) {
  const charCount = textarea.nextElementSibling;
  if (charCount && charCount.classList.contains('char-count')) {
    const currentLength = textarea.value.length;
    const maxLength = textarea.getAttribute('maxlength') || 1000;
    charCount.textContent = `${currentLength}/${maxLength}`;

    // 1000자 근처에서 경고 색상
    if (currentLength > maxLength * 0.9) {
      charCount.style.color = 'var(--warning)';
    } else {
      charCount.style.color = 'var(--text-secondary)';
    }
  }
}

/**
 * 폼 제출 처리
 */
async function handleFormSubmit(event) {
  event.preventDefault();

  // 1. 폼 데이터 수집
  const formData = collectFormData();

  // 2. 클라이언트 사이드 검증
  if (!validateForm(formData)) {
    return;
  }

  // 3. Apps Script URL 체크
  if (SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_DEPLOYMENT_URL_HERE') {
    showError('Google Apps Script URL이 설정되지 않았습니다. js/form.js 파일에서 SCRIPT_URL 변수를 설정해주세요.');
    return;
  }

  // 4. 로딩 상태 표시
  showLoading();

  try {
    // 5. Google Apps Script에 POST 요청
    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors', // Apps Script 필수 설정
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
      redirect: 'follow'
    });

    // no-cors 모드에서는 응답을 읽을 수 없으므로
    // 성공으로 간주하고 처리
    handleSubmitSuccess(formData);

  } catch (error) {
    console.error('Error submitting form:', error);
    showError('저장 중 오류가 발생했습니다. 인터넷 연결을 확인하고 다시 시도해주세요.');
  } finally {
    hideLoading();
  }
}

/**
 * 폼 데이터 수집
 */
function collectFormData() {
  return {
    recordDate: document.getElementById('recordDate').value,
    morningPain: document.getElementById('morningPain').value,
    eveningPain: document.getElementById('eveningPain').value,
    painLocations: getSelectedChips('painLocations'),
    painTypes: getSelectedChips('painTypes'),
    legSymptom: document.querySelector('input[name="legSymptom"]:checked')?.value || '없음',
    activities: document.getElementById('activities').value.trim(),
    worsened: document.getElementById('worsened').value.trim(),
    relieved: document.getElementById('relieved').value.trim(),
    medication: document.getElementById('medication').value.trim(),
    notes: document.getElementById('notes').value.trim(),
    summary: document.getElementById('summary').value.trim()
  };
}

/**
 * 선택된 칩 버튼 값들을 쉼표로 구분된 문자열로 반환
 */
function getSelectedChips(groupId) {
  const group = document.getElementById(groupId);
  if (!group) return '';

  const selectedChips = group.querySelectorAll('.chip.selected');
  const values = Array.from(selectedChips).map(chip => chip.dataset.value);
  return values.join(', ');
}

/**
 * 제출 성공 처리
 */
function handleSubmitSuccess(formData) {
  // 성공 메시지 표시
  showSuccess('기록이 성공적으로 저장되었습니다! 💙');

  // 경고 플래그 체크
  checkWarnings(formData);

  // 폼 초기화
  resetForm();
}

/**
 * 경고 조건 체크
 */
function checkWarnings(formData) {
  const warnings = [];

  // 1. 다리 힘 빠짐
  if (formData.legSymptom === '힘 빠짐') {
    warnings.push('⚠️ <strong>긴급 알림:</strong> 다리에 힘이 빠지는 증상이 기록되었습니다. 즉시 병원 상담을 권장합니다.');
  }

  // 2. 심한 통증 (8점 이상)
  if (parseInt(formData.morningPain) >= 8 || parseInt(formData.eveningPain) >= 8) {
    warnings.push('⚠️ <strong>주의:</strong> 통증 점수가 8점 이상입니다. 증상이 지속되면 병원 상담을 고려하세요.');
  }

  // 경고 메시지 표시
  if (warnings.length > 0) {
    setTimeout(() => {
      showWarning(warnings.join('<br><br>'));
    }, 500);
  }
}

/**
 * 폼 초기화
 */
function resetForm() {
  const form = document.getElementById('healthForm');
  if (form) {
    form.reset();
  }

  // 날짜 기본값 재설정
  setDefaultDate();

  // 슬라이더 값 표시 초기화
  updateSliderValues();

  // 선택된 칩 버튼 초기화
  const selectedChips = document.querySelectorAll('.chip.selected');
  selectedChips.forEach(chip => {
    chip.classList.remove('selected');
  });

  // 글자 수 카운터 초기화
  const textareas = document.querySelectorAll('textarea');
  textareas.forEach(textarea => {
    updateCharCount(textarea);
  });

  // 화면 최상단으로 스크롤
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
