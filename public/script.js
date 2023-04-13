fetch('http://localhost:3000/api/albums')
  .then(response => response.json())
  .then(data => {
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
      albumRow.appendChild(albumTitle);
      albumRow.appendChild(artist);
      albumRow.appendChild(year);
      albumRow.appendChild(id);
      albumsTable.appendChild(albumRow);
    });
  })
  .catch(error => console.error("Error fetching albums:", error)); 