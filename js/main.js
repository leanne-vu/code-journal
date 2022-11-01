/* global data */
var $photoUrlInput = document.querySelector('#photo-url');
var $image = document.querySelector('img');

$photoUrlInput.addEventListener('input', function () {
  $image.setAttribute('src', event.target.value);
}
);
