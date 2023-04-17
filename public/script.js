let currentId = null;
const modal = document.getElementById("updateModal");
const deleteModal = document.getElementById("deleteModal");
fetch('http://localhost:3000/api/albums')
  .then(response => response.json())
  .then(data => {
    const span = document.getElementsByClassName("close")[0];
    const spanDelete = document.getElementsByClassName("closeDelete")[0];
    span.onclick = function () {
      modal.style.display = "none";
    }
    spanDelete.onclick = function () {
      deleteModal.style.display = "none";
    }

    const albumsTable = document.querySelector('#albums-table tbody');
    data.forEach(album => {
      const albumRow = document.createElement('tr');
      const albumTitle = document.createElement('td');
      albumTitle.textContent = album.title;

      const artist = document.createElement('td');
      artist.textContent = album.artist;

      const year = document.createElement('td');
      year.textContent = album.year;

      const id = document.createElement('td');
      id.textContent = album._id;

      const updateElement = document.createElement('td');
      const updateButton = document.createElement('button');
      updateButton.textContent = 'Update';

      updateButton.addEventListener('click', () => {
        const updateHeader = document.getElementById("albumUpdate");
        updateHeader.textContent = `Update album "${album.title}"`;
        modal.style.display = "block";
        currentId = id.textContent;
      });
      updateElement.appendChild(updateButton);

      const deleteElement = document.createElement('td');
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';

      deleteButton.addEventListener('click', () => {
        const updateHeader = document.getElementById("albumDelete");
        updateHeader.textContent = `Delete album "${album.title}"`;
        deleteModal.style.display = "block";
        currentId = id.textContent;
      });
      deleteElement.appendChild(deleteButton);

      albumRow.appendChild(albumTitle);
      albumRow.appendChild(artist);
      albumRow.appendChild(year);
      albumRow.appendChild(id);
      albumRow.appendChild(updateElement);
      albumRow.appendChild(deleteElement);
      albumsTable.appendChild(albumRow);
    });
  })
  .catch(error => console.error("Error fetching albums:", error));

const updateBtn = document.getElementById("updateButton");

updateBtn.addEventListener('click', async () => {
  const name = nameText.value;
  const artist = artistText.value;
  const year = yearText.value;

  try {
    await fetch(`http://localhost:3000/api/albums/${currentId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name, artist: artist, year: year })
    })

  } catch (error) {
    console.log(error);
  }

  modal.style.display = "none";
  alert("Album successfully updated");
  window.location.reload();
});

const deleteBtn = document.getElementById("deleteButton");

deleteBtn.addEventListener('click', async () => {

  try {
    await fetch(`http://localhost:3000/api/albums/${currentId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.log(error);
  }

  modal.style.display = "none";
  alert(`Album successfully deleted`);
  window.location.reload();
});