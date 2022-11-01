/* global data */
var $photoUrlInput = document.querySelector('#photo-url');
var $image = document.querySelector('img');
var $form = document.querySelector('form');
$photoUrlInput.addEventListener('input', function () {
  $image.setAttribute('src', event.target.value);
}
);

$form.addEventListener('submit', function () {
  event.preventDefault();
  var entry = {
    title: $form.elements.title.value,
    url: $form.elements.url.value,
    notes: $form.elements.notes.value,
    EntryID: data.nextEntryId
  };
  data.nextEntryId++;
  data.entries.push(entry);
  $image.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
}
);
