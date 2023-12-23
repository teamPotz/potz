export default () => {
  const currentURL = window.location.href;
  const textarea = document.createElement('textarea');
  textarea.value = currentURL;
  document.body.appendChild(textarea);

  textarea.select(); //textareat에 저장한 url 선택함
  textarea.setSelectionRange(0, 99999); //텍스트 전체 복사

  document.execCommand('copy'); //클립보드로 복사.

  document.body.removeChild(textarea);

  alert('주소가 복사되었어요!');
};
