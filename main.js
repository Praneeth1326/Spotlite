document.addEventListener("DOMContentLoaded", function () {
    const section = document.querySelector(".mainsongs");
    section.innerHTML = "<p>Loading songs...</p>";

    fetch("https://itunes.apple.com/search?term=english%20pop&entity=song&limit=8")
        .then(response => response.json())
        .then(data => {
            section.innerHTML = "";
            data.results.forEach((song, idx) => {
                const songDiv = document.createElement("div");
                songDiv.className = "song-item";
                songDiv.innerHTML = `
                    <div class="img-container" style="position:relative;">
                        <img src="${song.artworkUrl100}" alt="${song.trackName}">
                        <button class="play-btn" data-audio="audio${idx}" style="
                            position:absolute;
                            top:50%;
                            left:50%;
                            transform:translate(-50%,-50%);
                            background:rgba(46,235,81,0.85);
                            border:none;
                            border-radius:50%;
                            width:48px;
                            height:48px;
                            display:flex;
                            align-items:center;
                            justify-content:center;
                            font-size:1.5em;
                            color:#fff;
                            cursor:pointer;
                        ">
                            <i class="fas fa-play"></i>
                        </button>
                        <audio id="audio${idx}" src="${song.previewUrl}"></audio>
                    </div>
                    <span>${song.trackName} <br><small>${song.artistName}</small></span>
                `;
                section.appendChild(songDiv);
            });

            // Play button functionality
            section.querySelectorAll('.play-btn').forEach(btn => {
                btn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    // Pause all audios first
                    section.querySelectorAll('audio').forEach(aud => aud.pause());
                    // Play the selected audio
                    const audio = document.getElementById(this.getAttribute('data-audio'));
                    if (audio.paused) {
                        audio.currentTime = 0;
                        audio.play();
                    } else {
                        audio.pause();
                    }
                });
            });
        })
        .catch(error => {
            section.innerHTML = "<p>Failed to load songs.</p>";
            console.error(error);
        });
});