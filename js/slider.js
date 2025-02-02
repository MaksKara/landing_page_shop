const slides = document.querySelectorAll('.banner__slide'),
	  dots = document.querySelectorAll('.dot'),
	  sliderWrapper = document.querySelector('.banner__slider-wrapper');

let index = 0;

const activeSlide = n => {
	for(slide of slides) {
		slide.classList.remove('active');
	}
	slides[n].classList.add('active');
}

const activeDot = n => {
	for(dot of dots) {
		dot.classList.remove('active');
	}
	dots[n].classList.add('active');
}

const prepareCurrentSlide = ind => {
	activeSlide(ind);
	activeDot(ind);
}

const nextSlide = () => {
	if(index == slides.length - 1) {
		index = 0;
		prepareCurrentSlide(index);
	} else {
		index++;
		prepareCurrentSlide(index);
	}
}

const prevSlide = () => {
	clearInterval(interval);
	
	if(index == 0) {
		index == slides.length - 1;
		prepareCurrentSlide(index);
	} else {
		index--;
		prepareCurrentSlide(index);
	}
}

dots.forEach((item, indexDot) => {
	item.addEventListener('click', () => {
		index = indexDot;
		prepareCurrentSlide(index);
		clearInterval(interval);
	});
});

const interval = setInterval(nextSlide, 2000);

sliderWrapper.addEventListener('mouseenter', event => {
	clearInterval(interval);
});

sliderWrapper.addEventListener('mouseleave', event => {
	setTimeout(nextSlide, 2000);
});