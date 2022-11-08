/* global data */
var $delete = document.querySelector('.delete-button');
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
  if (data.editing !== null) {

    for (var i = 0; i < data.entries.length; i++) {
      if (data.editing.EntryID === data.entries[i].EntryID) {
        data.editing = {
          title: $form.elements.title.value,
          url: $form.elements.url.value,
          notes: $form.elements.notes.value,
          EntryID: data.entries[i].EntryID
        };
        data.entries[i] = data.editing;
        var $list = document.querySelectorAll('li');
        for (var z = 0; z < $list.length; z++) {
          if (Math.floor($list[z].getAttribute('data-entry-id')) === data.entries[i].EntryID) {
            $list[z].replaceWith(renderEntries(data.entries[i]));
          }
        }
      }
    }
  }
  if (data.editing === null) {
    data.nextEntryId++;
    data.entries.unshift(entry);
    $image.setAttribute('src', 'images/placeholder-image-square.jpg');
    $ul.prepend(renderEntries(entry));
  }
  $form.reset();
  swapViews('entries');
  hasEntries();
  data.editing = null;
  $delete.className = 'hidden delete-button';

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
$entries.addEventListener('click', function () {
  data.editing = null;
  $delete.className = 'hidden delete-button';
  swapViews($entries.getAttribute('data-view'));
});
$newEntries.addEventListener('click', function () {
  $h1text.textContent = 'New Entry';
  $image.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
  swapViews($newEntries.getAttribute('data-view'));
});
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
$ul.addEventListener('click', editClicked);
var $h1text = document.querySelector('.h1');
function editClicked() {
  if (event.target.className === 'fa-solid fa-pencil') {
    swapViews('entry-form');
  }
  if ($h1text.textContent === 'New Entry') {
    $h1text.textContent = 'Edit Entry';
  }
  var listItem = event.target.closest('li');
  var entryStringNum = listItem.getAttribute('data-entry-id');
  var entryNumber = Math.floor(entryStringNum);
  for (var i = 0; i < data.entries.length; i++) {
    if (data.entries[i].EntryID === entryNumber) {
      data.editing = data.entries[i];
      $form.elements.title.value = data.entries[i].title;
      $form.elements.url.value = data.entries[i].url;
      $form.elements.notes.value = data.entries[i].notes;
      $image.setAttribute('src', data.entries[i].url);
    }
  }
  $delete.className = 'delete-button';
  $delete.addEventListener('click', function () {
    var $modal = document.querySelector('.container-modal');
    $modal.className = 'container-modal';

  });

}
var $cancel = document.querySelector('.cancel-but');
$cancel.addEventListener('click', function () {
  var $modal = document.querySelector('.container-modal');
  $modal.className = 'hidden container-modal';
});
var $confirm = document.querySelector('.confirm-but');
$confirm.addEventListener('click', function () {

  for (var i = 0; i < data.entries.length; i++) {
    if (data.editing.EntryID === data.entries[i].EntryID) {
      var $list = document.querySelectorAll('li');
      for (var z = 0; z < $list.length; z++) {
        if (Math.floor($list[z].getAttribute('data-entry-id')) === data.editing.EntryID) {
          $list[z].remove();
        }
      } data.entries.splice(i, 1);
    }
  }

}

);
