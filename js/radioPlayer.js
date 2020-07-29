export const radioPlayerInit = () => {
	const radio = document.querySelector('.radio'),
				radioCoverImg = document.querySelector('.radio-cover__img'),
				radioHeaderBig = document.querySelector('.radio-header__big'),
				radioNavigation = document.querySelector('.radio-navigation'),
				radioItem = document.querySelectorAll('.radio-item'),
				radioStop = document.querySelector('.radio-stop'),
				audioVolume = document.querySelector('.audio-volume'),
				radioVolumeDown = document.querySelector('.radio-volume-down'),
				radioVolumeUp = document.querySelector('.radio-volume-up');

	const audio = new Audio();
	audio.type = 'audio/aac';
	radioStop.disabled = true;

	const changeIconPlay = () => {
		if (audio.paused) {
			radio.classList.remove('play');
			radioStop.classList.add('fa-play');
			radioStop.classList.remove('fa-stop');
		} else {
			radio.classList.add('play');
			radioStop.classList.remove('fa-play');
			radioStop.classList.add('fa-stop');
		}
	};

	const selectItem = elem => {
		radioItem.forEach(item => item.classList.remove('select'));
		elem.classList.add('select');
	};

	const toggleIconVolume = () => {
		if (audio.volume === 0) {
			radioVolumeDown.classList.remove('fa-volume-down');
			radioVolumeDown.classList.add('fa-volume-off');
		} else {
			radioVolumeDown.classList.remove('fa-volume-off');
			radioVolumeDown.classList.add('fa-volume-down');
		}
	};

	radioNavigation.addEventListener('change', event => {
		const target = event.target;
		const parrent = target.closest('.radio-item');
		selectItem(parrent);

		const title = parrent.querySelector('.radio-name').textContent;
		radioHeaderBig.textContent = title;

		const urlImg = parrent.querySelector('.radio-img').src;
		radioCoverImg.src = urlImg;
			
		radioStop.disabled = false;
		audio.src = target.dataset.radioStantion;
		audio.play();
		changeIconPlay();
	});
	
	radioStop.addEventListener('click', () => {
		if (audio.paused) {
			audio.play();
		} else {
			audio.pause();
		}
		changeIconPlay();
	});

	audioVolume.addEventListener('input', () => {
		audio.volume = audioVolume.value / 100;
		toggleIconVolume();
	});

	audio.volume = 0.5;
	audioVolume.value = audio.volume * 100;

	radioVolumeDown.addEventListener('click', () => {
		audio.volume = 0;
		audioVolume.value = 0;
		toggleIconVolume();
	});

	radioVolumeUp.addEventListener('click', () => {
		audio.volume = 1;
		audioVolume.value = 100;
		toggleIconVolume();
	});

};