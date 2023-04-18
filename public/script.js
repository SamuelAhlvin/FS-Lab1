let currentId = null;
const modal = document.getElementById("updateModal");
const deleteModal = document.getElementById("deleteModal");
const createModal = document.getElementById("createModal");
const detailsModal = document.getElementById("detailsModal");
let idList = [];
fetch('http://localhost:3000/api/albums')
  .then(response => response.json())
  .then(data => {
    const span = document.getElementsByClassName("close")[0];
    const spanDelete = document.getElementsByClassName("closeDelete")[0];
    const spanCreate = document.getElementsByClassName("closeCreate")[0];
    const spanDetails = document.getElementsByClassName("closeDetails")[0];
    span.onclick = function () {
      modal.style.display = "none";
    }
    spanDelete.onclick = function () {
      deleteModal.style.display = "none";
    }
    spanCreate.onclick = function () {
      createModal.style.display = "none";
    }
    spanDetails.onclick = function () {
      detailsModal.style.display = "none";
    }

    const albumsTable = document.querySelector('#albums-table tbody');
    data.forEach(album => {
      idList.push(parseInt(album._id));
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

      const detailsElement = document.createElement('td');
      const detailsButton = document.createElement('button');
      detailsButton.textContent = 'Show Details';
      detailsButton.addEventListener('click', () => {
        const detailsTitle = document.getElementById("detailsTitle");
        const detailsArtist = document.getElementById("detailsArtist");
        const detailsYear = document.getElementById("detailsYear");
        const detailsId = document.getElementById("detailsId");
        detailsTitle.textContent = `Title: ${album.title}`;
        detailsArtist.textContent = `Artist: ${album.artist}`;
        detailsYear.textContent = `Year: ${album.year}`;
        detailsId.textContent = `Id: ${album._id}`;
        detailsModal.style.display = "block";
        currentId = id.textContent;
      });
      detailsElement.appendChild(detailsButton);

      albumRow.appendChild(albumTitle);
      albumRow.appendChild(artist);
      albumRow.appendChild(year);
      albumRow.appendChild(id);
      albumRow.appendChild(updateElement);
      albumRow.appendChild(deleteElement);
      albumRow.appendChild(detailsElement);
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
      body: JSON.stringify({ title: name, artist: artist, year: year })
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

const createBtn = document.getElementById("createButton");
const finalCreateBtn = document.getElementById("finalCreateButton");

createBtn.addEventListener('click', async () => {
  createModal.style.display = "block";
  console.log(idList);
});

finalCreateBtn.addEventListener('click', async () => {
  const name = createNameText.value;
  const artist = createArtistText.value;
  const year = createYearText.value;
  const id = createIdText.value;

  if (idList.includes(parseInt(id))) {
    alert("Id is already used, please use another Id");

  } else {
    try {
      await fetch(`http://localhost:3000/api/albums/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: name, artist: artist, year: year, _id: id })
      })

    } catch (error) {
      console.log(error);
    }

    modal.style.display = "none";
    alert("Album successfully created");
    window.location.reload();
  }
});
