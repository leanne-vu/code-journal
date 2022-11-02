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
}
);

function renderEntries(entry) {
  var list = document.createElement('li');
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

  var textNotes = document.createElement('p');
  textNotes.textContent = entry.notes;
  columnDiv2.appendChild(textNotes);
  return list;
}

var $ul = document.querySelector('ul');

console.log($ul);
/* <li>
  <div class="entry-row row">
    <div class="column-half">
      <img src="images/placeholder-image-square.jpg">
    </div>
    <div class="column-half">
      <h3>Ada LoveLace</h3>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae quod consequuntur tenetur totam repudiandae modi ad vel omnis eos laboriosam enim delectus quas magnam vitae nam est velit, ducimus doloremque!</p>
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestiae enim blanditiis voluptate, iusto pariatur distinctio est fuga quod ullam ad quidem! Assumenda ut minus facilis maxime itaque magni in ipsa.</p>
    </div>
  </div>
</li> */
