// =====================
// Corazones flotantes
// =====================
const heartsContainer = document.getElementById('bgHearts');
const emojis = ['🌷'];

for (let i = 0; i < 22; i++) {
  const span = document.createElement('span');
  span.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  span.style.left = Math.random() * 100 + 'vw';
  span.style.animationDuration = (8 + Math.random() * 14) + 's';
  span.style.animationDelay = (Math.random() * 12) + 's';
  span.style.fontSize = (0.9 + Math.random() * 1.1) + 'rem';
  heartsContainer.appendChild(span);
}

// =====================
// Modal - mejores momentos
// =====================
function openModal() {
  document.getElementById('modal').classList.add('active');
}
function closeModal() {
  document.getElementById('modal').classList.remove('active');
}
document.getElementById('modal').addEventListener('click', function (e) {
  if (e.target === this) closeModal();
});

// =====================
// YouTube IFrame API
// =====================
let player;
let isPlaying = false;
let progressInterval;

const ytScript = document.createElement('script');
ytScript.src = 'https://www.youtube.com/iframe_api';
document.head.appendChild(ytScript);

function onYouTubeIframeAPIReady() {
  player = new YT.Player('ytPlayerContainer', {
    height: '0',
    width: '0',
    videoId: 'ffvn5wnXc9w',
    playerVars: {
      autoplay: 1,
      loop: 1,
      playlist: 'ffvn5wnXc9w',
      controls: 0,
      mute: 0
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange
    }
  });
}

function onPlayerReady(event) {
  event.target.setVolume(70);
  event.target.playVideo();
  isPlaying = true;
  document.getElementById('playBtn').textContent = '⏸';
  startProgress();
}

function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.PLAYING) {
    isPlaying = true;
    document.getElementById('playBtn').textContent = '⏸';
  } else if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED) {
    isPlaying = false;
    document.getElementById('playBtn').textContent = '▶';
  }
}

function togglePlay() {
  if (!player) return;
  if (isPlaying) {
    player.pauseVideo();
  } else {
    player.playVideo();
  }
}

function startProgress() {
  clearInterval(progressInterval);
  progressInterval = setInterval(() => {
    if (!player || typeof player.getCurrentTime !== 'function') return;
    const current = player.getCurrentTime();
    const duration = player.getDuration();
    if (duration > 0) {
      document.getElementById('progressBar').style.width = (current / duration * 100) + '%';
    }
  }, 500);
}