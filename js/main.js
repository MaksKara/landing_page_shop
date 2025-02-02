document.addEventListener('DOMContentLoaded', function () {
	renderProduct();
	renderToCart();
})

window.onload = function () {
	alignHeight();
	window.onresize = alignHeight;
	// alignHeight_1();
	checkCard();
	renderToCart();
}

window.onscroll = function () {
	scrollFunc();
};

let products = [
	{ id: 1, title: 'Branded Shoe', price: 300, img: 'assets/img/products/product_1.png', attribute: 'first' },
	{ id: 2, title: 'Branded Tees', price: 250, img: 'assets/img/products/product_2.png', attribute: 'second' },
	{ id: 3, title: 'Branded Shoe', price: 350, img: 'assets/img/products/product_3.png', attribute: 'third' },
	{ id: 4, title: 'Branded Shoe', price: 325, img: 'assets/img/products/product_4.png', attribute: 'fourth' },
	{ id: 5, title: 'EMS Woman Bag', price: 275, img: 'assets/img/products/product_5.png', attribute: 'fifth' },
	{ id: 6, title: 'Branded Cargos', price: 225, img: 'assets/img/products/product_6.png', attribute: 'sixth' }
];

let priceHeader = document.querySelector('.header__price'),
	dotQuant = document.querySelector('.header__quant'),
	// modalQuant = document.querySelector('.modal__numb'),
	quantModal = document.querySelector('#total-amount'),
	priceModal = document.querySelector('#total-price');

priceHeader.innerHTML = '0$';
dotQuant.innerHTML = 0;
// modalQuant.innerHTML = 1;

function scrollFunc() {
	let scrollPos = 50;
	let header = document.getElementById('header');

	if (document.body.scrollTop > scrollPos || document.documentElement.scrollTop > scrollPos) {
		header.classList.add('active');
	} else {
		header.classList.remove('active');
	}
}

//================================
//************RENDER**************
//************PRODUCT*************
//================================
const drawProduct = product => `
	<div class="col-lg-4 products__item-wrap">
		<div class="products__item" id="items_${product.id}">
			<img src="${product.img}" alt="${product.title}" class="products__img">
			<p class="products__name">${product.title}</p>
			<div class="products__cost">
				<p class="products__price">${product.price}<span>$</span></p>
				<a href="#" class="products__btn" data-id="${product.attribute}">Buy now</a>
			</div>
		</div>
	</div>
`

function renderProduct() {
	const html = products.map(drawProduct).join('');
	document.querySelector('#products__cards').innerHTML = html;
}

//первый способ.
function alignHeight() {
	let maxH = 0;
	let items = document.querySelectorAll(".products__item");
	items.forEach(function (item, index) {
		let height = item.offsetHeight;
		if (height > maxH) {
			maxH = height;
		}
	});
	items.forEach(function (item, index) {
		item.style.height = `${maxH}px`;
	});
}

//=================================
//************LOCAL****************
//***********STORAGE***************
//=================================

let totalAmount = 0;
let totalPrice = 0;

function renderQuant() {
	dotQuant.innerHTML = totalAmount;
	quantModal.innerHTML = totalAmount;
}

document.addEventListener('click', event => {
	event.preventDefault();

	const idProduct = event.target.dataset.id
	if (idProduct) {
		totalAmount++;
		renderQuant();
		addToCart(event);
		priceTotal();
	}

	const btnModal = event.target.dataset.btn;
	if (btnModal == 'plus') {
		console.log('plus');
		modalPlus(event);
	} else if (btnModal == 'minus') {
		console.log('minus');
		modalMinus(event)
	} else if (btnModal == 'delete') {
		console.log('delete');
	}
});

let cart = [];
let cartModal = [];
let productObject = {};
let productArray = [];

function addToCart(event) {
	const count = event.target.dataset.id;

	if (cart[count] != undefined) {
		cart[count]++;
	} else {
		cart[count] = 1;
	}
	// let price;
	for (let g of products) {
		// price = `${g.price}`;

		// if (cart[price] != undefined) {

		// 	cart[price] = price * cart[count];
		// } else {
		// 	cart[price] = price;
		// }
		// priceHeader.innerHTML = cart[price]

		productObject = { id: `${g.id}`, img: `${g.img}`, title: `${g.title}`, price: `${g.price}`, count: cart[count] };

		if (count == `${g.attribute}`) {
			productArray = JSON.parse(localStorage.getItem('prod')) || [];
			let i = productArray.findIndex(o => o.id === `${g.id}`);

			if (productArray[i]) {
				productArray[i] = productObject;
				// console.log('if');
			} else {
				productArray.push(productObject);
				// console.log('else');
			}
			localStorage.setItem('prod', JSON.stringify(productArray));
			// console.log(productArray);
			// console.log(productObject);
		}
		checkCard();
		renderToCart();
	}
}

function priceTotal() {
	productArray.map(item => {
		return totalPrice = totalPrice + item.count * item.price;
	});
	console.log(totalPrice)
	// priceHeader.innerHTML = totalPrice + '$';
}

function checkCard() {
	let items = localStorage.getItem('prod');

	if (items != null) {
		cartModal = JSON.parse(items);
	}
	renderToCart(cartModal);
}

//====================================
//*************DRAW*TO****************
//**************CART******************
//====================================

const drawCart = cart => ` 
	<div class="modal__item">
		<div class="modal__product">
			<p class="modal__title">${cart.title}</p>
			<img src="${cart.img}" alt="${cart.title}" class="modal__img">
		</div>
		<div class="modal__quant">
			<button class="btn-minus" data-btn="minus" data-prod=${cart.id}>-</button>
			<span class="modal__numb">${cart.count}</span>
			<button class="btn-plus" data-btn="plus" data-prod=${cart.id}>+</button>
		</div>
		<span class="modal__price">${cart.price}$</span>
		<button class="modal__btn btn-delete" data-btn="delete" data-prod=${cart.id}>Delete</button>
	</div>
`

function renderToCart() {
	const html = cartModal.map(drawCart).join('');
	document.querySelector('#modal-wrap').innerHTML = html;
}

//================================
//*************COUNT**************
//*************MODAL**************
//================================

const maxAmound = 9;

function modalPlus(event) {
	for (let i of cartModal) {
		// console.log(i.id)
		// console.log(event.target.dataset.prod)
		if (i.id == event.target.dataset.prod) {
			if (i.count < maxAmound) {
				i.count++;
				totalAmount++;
				renderQuant();
			} else {
				alert('Sorry, max amount products(');
			}
		}

		localStorage.setItem('prod', JSON.stringify(cartModal));
	}
	renderToCart();
}

function modalMinus(event) {
	for (let i of cartModal) {
		if (i.id == event.target.dataset.prod) {
			if (i.count > 1) {
				i.count--;
				totalAmount--;
				renderQuant();
			} else {
				alert('Sorry, min amount products(');
			}
		}
		localStorage.setItem('prod', JSON.stringify(cartModal));
	}
	renderToCart();
	// 	for(let i = count; i > 1; i--){
	// 		if(count > 1) {
	// 			count--;
	// 			modalQuant.innerHTML = count;
	// 			dotQuant.innerHTML = count;
	// 			break;
	// 		} 
	// 	}	
}












//второй способ.
// function alignHeight_1() {
// 	let maxH = 0;
// 	for(let product of products){
// 		let height = document.querySelector(`#items_${product.id}`).offsetHeight;
// 		if(height > maxH){
// 			maxH = height;
// 		}
// 	}
// 	for(let product of products){
// 		document.querySelector(`#items_${product.id}`).style.height = `${maxH}px`;
// 	}
// }

