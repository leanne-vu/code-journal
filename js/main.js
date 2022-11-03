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
  data.entries.unshift(entry);
  $image.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
  $ul.prepend(renderEntries(entry));
  swapViews('entries');
  hasEntries();
}
);

function renderEntries(entry) {
  var list = document.createElement('li');
  list.setAttribute('data-entry-id', entry.EntryID);
  var rowDiv = document.createElement('div');
  rowDiv.className = 'entry-row row';
  list.appendChild(rowDiv);

  var columnDiv = document.createElement('div');
  columnDiv.className = 'column-half';
  rowDiv.appendChild(columnDiv);

  var image = document.createElement('img');
  image.setAttribute('src', entry.url);
  columnDiv.appendChild(image);

  var columnDiv2 = document.createElement('div');
  columnDiv2.className = 'column-half';
  rowDiv.appendChild(columnDiv2);

  var textTitle = document.createElement('h3');
  textTitle.textContent = entry.title;
  columnDiv2.appendChild(textTitle);

  var editIcon = document.createElement('i');
  editIcon.className = 'fa-solid fa-pencil';
  columnDiv2.appendChild(editIcon);

  var textNotes = document.createElement('p');
  textNotes.textContent = entry.notes;
  columnDiv2.appendChild(textNotes);
  return list;
}

var $ul = document.querySelector('ul');
function entryLoop(data) {
  for (var i = 0; i < data.entries.length; i++) {
    var all = renderEntries(data.entries[i]);
    $ul.appendChild(all);

  }
}
document.addEventListener('DOMContentLoaded', entryLoop(data));
var $noEntries = document.querySelector('.no-entries-column');

var $entries = document.querySelector('.entries-anchor');
var $dataviews = document.querySelectorAll('.view');
var $newEntries = document.querySelector('.new-anchor');
$entries.addEventListener('click', function () { swapViews($entries.getAttribute('data-view')); });
$newEntries.addEventListener('click', function () { swapViews($newEntries.getAttribute('data-view')); });
function swapViews(dataview) {
  data.view = dataview;
  for (var i = 0; i < $dataviews.length; i++) {
    if ($dataviews[i].getAttribute('data-view') === dataview) {
      $dataviews[i].className = 'view';
    } else $dataviews[i].className = 'view hidden';
  }
}

document.addEventListener('DOMContentLoaded', function () {
  swapViews(data.view);
  hasEntries();
});
function hasEntries() {
  if (data.entries.length > 0) {
    $noEntries.className = 'hidden';
  }
}
$ul.addEventListener('click', entriesListClicked);
function entriesListClicked() {
  console.log(event.target);
  console.log(event.target.tagName);
}
