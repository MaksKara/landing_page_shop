document.addEventListener('DOMContentLoaded', function(){
	render();
})

window.onload = function () {
	alignHeight();
	window.onresize = alignHeight;
	alignHeight_2()
}


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

//первый способ.
function alignHeight(){
	let maxH = 0;
	let items = document.querySelectorAll(".products__item");
	items.forEach(function (item, index) {
		let height = item.offsetHeight;
		if(height > maxH){
			maxH = height;
		}
	});
	items.forEach(function (item, index) {
		item.style.height = `${maxH}px`;
	});
}

//второй способ.
function alignHeight_1() {
	let maxH = 0;
	for(let product of products){
		let height = document.querySelector(`#items_${product.id}`).offsetHeight;
		if(height > maxH){
			maxH = height;
		}
	}
	for(let product of products){
		document.querySelector(`#items_${product.id}`).style.height = `${maxH}px`;
	}
}