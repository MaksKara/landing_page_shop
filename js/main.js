window.onscroll = function() {
	scrollFunc()
};

function scrollFunc() {
	let scrollPos = 50;
	let header = document.getElementById('header');

	if(document.body.scrollTop > scrollPos || document.documentElement.scrollTop > scrollPos) {
		header.classList.add('active');
	} else {
		header.classList.remove('active');
	}
}