fetch('http://localhost:3000/api/albums')
  .then(response => response.json())
  .then(data => {
    const modal = document.getElementById("myModal");
    const span = document.getElementsByClassName("close")[0];
    span.onclick = function () {
      modal.style.display = "none";
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
      });
      updateElement.appendChild(updateButton);

      const deleteElement = document.createElement('td');
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';

      deleteButton.addEventListener('click', () => {
        console.log("delete clicked");
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