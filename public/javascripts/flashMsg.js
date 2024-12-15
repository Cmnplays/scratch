document.addEventListener('DOMContentLoaded', function () {
  const flashMessage = document.querySelector('.flash-message');
  if (flashMessage) {
    setTimeout(() => {
      flashMessage.classList.add('hide');
    }, 1750);
  }
});
