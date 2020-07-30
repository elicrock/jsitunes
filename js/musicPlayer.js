import { addZero } from './subScript.js';
export const musicPlayerInit = () => {
	const audio = document.querySelector('.audio'),
				audioImg = document.querySelector('.audio-img'),
				audioHeader = document.querySelector('.audio-header'),
				audioPlayer = document.querySelector('.audio-player'),
				audioNavigation = document.querySelector('.audio-navigation'),
				audioButtonPlay = document.querySelector('.audio-button__play'),
				audioProgress = document.querySelector('.audio-progress'),
				audioProgressTiming = document.querySelector('.audio-progress__timing'),
				audioTimePassed = document.querySelector('.audio-time__passed'),
				audioTimeTotal = document.querySelector('.audio-time__total'),
				musicVolume = document.querySelector('.music-volume'),
				musicVolumeDown = document.querySelector('.music-volume-down'),
				musicVolumeUp = document.querySelector('.music-volume-up');
	
	const playlist = ['hello', 'flow', 'speed'];

	let trackIndex = 0;

	const loadTrack = () => {
		const isPlayed = audioPlayer.paused;
		const track = playlist[trackIndex];
		audioImg.src = `./audio/${track}.jpg`;
		audioHeader.textContent = track.toUpperCase();
		audioPlayer.src = `./audio/${track}.mp3`;

		if (isPlayed) {
			audioPlayer.pause();
		} else {
			audioPlayer.play();
		}
	};

	const prevTrack = () => {
		if (trackIndex !== 0) {
			trackIndex--;
		} else {
			trackIndex = playlist.length - 1;
		}
		loadTrack();
	};

	const nextTrack = () => {
		if (trackIndex === playlist.length - 1) {
			trackIndex = 0;
		} else {
			trackIndex++;
		}
		loadTrack();
	};

	const toggleIconVolume = () => {
		if (audioPlayer.volume === 0) {
			musicVolumeDown.classList.remove('fa-volume-down');
			musicVolumeDown.classList.add('fa-volume-off');
		} else {
			musicVolumeDown.classList.remove('fa-volume-off');
			musicVolumeDown.classList.add('fa-volume-down');
		}
	};

	audioNavigation.addEventListener('click', event => {
		const target = event.target;
		if (target.classList.contains('audio-button__play')) {
			audio.classList.toggle('play');
			audioButtonPlay.classList.toggle('fa-play');
			audioButtonPlay.classList.toggle('fa-pause');

			if (audioPlayer.paused) {
				audioPlayer.play();
			} else {
				audioPlayer.pause();
			}
			const track = playlist[trackIndex];
			audioHeader.textContent = track.toUpperCase();
		}

		if (target.classList.contains('audio-button__prev')) {
			prevTrack();
		}

		if (target.classList.contains('audio-button__next')) {
			nextTrack();
		}
	});

	audioPlayer.addEventListener('ended', () => {
		nextTrack();
		audioPlayer.play();
	});

	audioPlayer.addEventListener('timeupdate', () => {
		const currentTime = audioPlayer.currentTime;
		const duration = audioPlayer.duration;
		const progress = (currentTime / duration) * 100;
		audioProgressTiming.style.width = progress + '%';

		let minutePassed = Math.floor(currentTime / 60) || '0';
		let secondsPassed = Math.floor(currentTime % 60) || '0';

		let minuteTotal = Math.floor(duration / 60) || '0';
		let secondsTotal = Math.floor(duration % 60) || '0';

		audioTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondsPassed)}`;
		audioTimeTotal.textContent = `${addZero(minuteTotal)}:${addZero(secondsTotal)}`;
	});

	audioProgress.addEventListener('click', event => {
		const x = event.offsetX;
		const allWidth = audioProgress.clientWidth;
		const progress = (x / allWidth) * audioPlayer.duration;
		audioPlayer.currentTime = progress;
	});

	musicVolume.addEventListener('input', () => {
		audioPlayer.volume = musicVolume.value / 100;
		toggleIconVolume();
	});

	audioPlayer.volume = 0.5;
	musicVolume.value = audioPlayer.volume * 100;

	musicVolumeDown.addEventListener('click', () => {
		audioPlayer.volume = 0;
		musicVolume.value = 0;
		toggleIconVolume();
	});

	musicVolumeUp.addEventListener('click', () => {
		audioPlayer.volume = 1;
		musicVolume.value = 100;
		toggleIconVolume();
	});

};