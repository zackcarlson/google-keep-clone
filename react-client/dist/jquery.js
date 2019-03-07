$(document).ready(() => {

  /* Collapse Input Form Window */
  let show = false;

  function closeFormWindow() {
    if (show) {
      $('.title-input').css('display', 'none');
      $('.btn-md').css('display', 'none');
      $('.bg-light').css('display', 'none');
      show = false;
    }
  }

  function openFormWindow() {
    if (!show) {
      $('.title-input').css('display', 'block');
      $('.btn-md').css('display', 'inline-block');
      $('.bg-light').css('display', 'flex');
      show = true;
    }
  }

  $('.form-group').children().on('focus', () => {
    openFormWindow();
  });

  $('.btn-md, .btn-outline-dark').on('click', () => {
    closeFormWindow();
  });

  /* Collapse Input Form Window */
});