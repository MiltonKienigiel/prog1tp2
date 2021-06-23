//obtengo el query string
let queryString = window.location.search

//paso de ese texto a un objeto
let objetoQuery = new URLSearchParams(queryString);

//ahora si obtengo el id del album
var trackId = objetoQuery.get('id');



fetch("https://cors-anywhere.herokuapp.com/https://api.deezer.com/track/" + trackId)
  .then(function (response) {
    return response.json()
  })
  .then(function (data) {


    let contenedorData = document.querySelector(".MainContent")
    let subtitulo = document.querySelector(".Subtitle")

    let track = data
    console.log(track);
    subtitulo.innerHTML = `
    ${track.title}
`
    contenedorData.innerHTML = ` 
<article>
<div class="card">
  <div class="avatar" style="background-image: url('${track.album.cover_big}')"></div>
  <div>
    <h1>${track.title}</h1>
    <h3 id=infosingle><a href="detail-artist.html?id=${track.artist.id}">${track.artist.name}</a>
    </h3>
    <h3 id=infosingle>Type:${track.type}</h3>
    <h3 id=infosingle>${track.duration} Seg </h3>

    <button id="addplaylist"> Add to Playlist</button>
    <button id="addedplaylist"> Added to Playlist</button>
    <h4> <a href="playlist.html"  class="formap"> Mi Playlist</a> </h4>
    <audio id=audios src="${track.preview}" controls="audios/muchacha-almendra.mp3"> </audio>
  </div>
</div>
</article>`
    const add = document.querySelector('#addplaylist')
    const added = document.querySelector('#addedplaylist')
    if (window.localStorage.getItem('list')) {
      let tracks = JSON.parse(window.localStorage.getItem('list'))
      tracks.forEach(element => {
        if (element.id == track.id) {
          add.style.display = 'none'
          added.style.display = 'block'
        }
      });


    }
    add.addEventListener('click', function () {
      if (window.localStorage.getItem('list')) {
        let tracks = JSON.parse(window.localStorage.getItem('list'))
        tracks.push(track)
        window.localStorage.setItem('list', JSON.stringify(tracks))
        add.style.display = 'none'
        added.style.display = 'block'
      } else {
        let tracks = []
        window.localStorage.setItem('list', JSON.stringify(tracks))
        add.style.display = 'none'
        added.style.display = 'block'
      }

    })
  })