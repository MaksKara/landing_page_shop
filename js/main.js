let products = [
{id: 1, title: 'Branded Shoe', price: 300, img: 'assets/img/products/product_1.png'},
{id: 2, title: 'Branded Tees', price: 250, img: 'assets/img/products/product_2.png'},
{id: 3, title: 'Branded Shoe', price: 350, img: 'assets/img/products/product_3.png'},
{id: 4, title: 'Branded Shoe', price: 325, img: 'assets/img/products/product_4.png'},
{id: 5, title: 'EMS Woman Bag', price: 275, img: 'assets/img/products/product_5.png'},
{id: 6, title: 'Branded Cargos', price: 225, img: 'assets/img/products/product_6.png'}
];

let price = document.querySelector('.header__price'),
	dotQuant = document.querySelector('.header__quant');

window.onscroll = function() {
	scrollFunc();
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

price.innerHTML = '0$';
dotQuant.innerHTML = 0;

const drawHTML = product => `
	<div class="col-lg-4 products__item-wrap">
		<div class="products__item" id="items_${product.id}">
			<img src="${product.img}" alt="${product.title}" class="products__img">
			<p class="products__name">${product.title}</p>
			<div class="products__cost">
				<p class="products__price">$${product.price}</p>
				<a href="#" class="products__btn">Buy now</a>
			</div>
		</div>
	</div>
`

function render() {
	const html = products.map(drawHTML).join('');
	document.querySelector('#products__cards').innerHTML = html;
}

render();

window.onload = function() { 
	let arrProducts = [
		document.querySelector('#items_1').offsetHeight,
		document.querySelector('#items_2').offsetHeight,
		document.querySelector('#items_3').offsetHeight,
		document.querySelector('#items_4').offsetHeight,
		document.querySelector('#items_5').offsetHeight,
		document.querySelector('#items_6').offsetHeight
	];

	function equalHeight() {
		document.querySelector('#items_1').style.height = 'auto';
		document.querySelector('#items_2').style.height = 'auto';
		document.querySelector('#items_3').style.height = 'auto';
		document.querySelector('#items_4').style.height = 'auto';
		document.querySelector('#items_5').style.height = 'auto';
		document.querySelector('#items_6').style.height = 'auto';

		const maxH = Math.max.apply(null, arrProducts);
		
		document.querySelector('#items_1').style.height = maxH + 'px';
		document.querySelector('#items_2').style.height = maxH + 'px';
		document.querySelector('#items_3').style.height = maxH + 'px';
		document.querySelector('#items_4').style.height = maxH + 'px';
		document.querySelector('#items_5').style.height = maxH + 'px';
		document.querySelector('#items_6').style.height = maxH + 'px';
	}

	equalHeight();
	window.onresize = equalHeight;
}