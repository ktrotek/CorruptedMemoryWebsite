function updateCartTotal() {
    var cartItemContainer = document.querySelector('.products');
    if (!cartItemContainer) return; // Guard clause

    var cartItems = cartItemContainer.getElementsByClassName('product');
    var total = 0;

    for (var i = 0; i < cartItems.length; i++) {
        var priceElement = cartItems[i].querySelector('.price');
        if (priceElement) {
            var priceText = priceElement.textContent.replace(/[^0-9.]/g, '');
            total += parseFloat(priceText) || 0;
        }
    }

    // Update subtotal and total
    var subtotalElement = document.querySelector('.details span:nth-child(2)');
    var totalElement = document.querySelector('.checkout .totalPrice');
    
    if (subtotalElement && totalElement) {
        var shipping = 4.99;
        const discount = parseFloat(localStorage.getItem('currentDiscount')) || 0;
        subtotalElement.textContent = total.toFixed(2) + "€";
        totalElement.innerHTML = `<sup>€</sup>${(total + shipping - discount).toFixed(2)}`;
    }

    displayAmountofItems();
}

function initialiseRemoveButtons() {
    var removeCartButtons = document.getElementsByClassName('BtnRemove');
    
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener('click', function(event) {
            const productElement = this.closest('.product');
            const productContainer = document.querySelector('.cart .products');
            productContainer.classList.add('removing-item');
            productElement.classList.add('removing');
            setTimeout(() => {
                const title = productElement.querySelector('span').textContent;
                let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
                cartItems = cartItems.filter(item => item.title !== title);
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
                if (cartItems.length === 0) {
                    localStorage.removeItem('currentDiscount');
                    document.getElementById('couponIdLabel').style.display = 'none';
                    document.getElementById('couponId').style.display = 'none';
                }
                productElement.remove();
                displayAmountofItems();
                updateCartTotal();
            }, 500);
        });
    }
}

function addItemToCart(productCard) {
    // Get product details
    const title = productCard.querySelector('.prdctTitle').textContent;
    const price = productCard.querySelector('.prdctPrice').textContent;
    const imageSrc = productCard.querySelector('.image img').src;
    // Create cart item HTML
    const cartItem = document.createElement('div');
    cartItem.className = 'product';
    cartItem.innerHTML = `
        <div>
            <img src="${imageSrc}" alt="${title}">
        </div>
        <div>
            <span>${title}</span>
        </div>
        <div class="quantity">
            <button class="BtnRemove">
                <p>remove</p>
            </button>
        </div>
        <div class="price">${price}</div>
    `;


    // Add to cart visually
    const cartContainer = document.querySelector('.products');
    if (cartContainer) {
        cartContainer.appendChild(cartItem);
    }

    // Add to cart (using localStorage to persist between pages)
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.push({
        title: title,
        price: price,
        image: imageSrc
    });
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    initialiseRemoveButtons();
    updateCartTotal();
    displayAmountofItems();

    console.log('Adding to cart:', { title, price, imageSrc });

    // Show confirmation
    alert(`${title} added to cart!`);

}

// Add click handlers to all product cards
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', function(e) {
        // Only run if not clicking on existing buttons
        if(!e.target.closest('a, button')) {
            addItemToCart(this);
        }
    });
});

function displayAmountofItems() { 
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartItemCount = cartItems.length;
    const cartButton = document.querySelector('.cartButton');
    const quantity2Element = document.querySelector('.quantity2');

    if (cartButton && quantity2Element) {
        quantity2Element.textContent = cartItemCount;
        cartButton.setAttribute('data-quantity', cartItemCount);
    }
}

function makeItemsAppearInBasket () {
    document.addEventListener('DOMContentLoaded', () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const productsContainer = document.querySelector('.products');
    productsContainer.innerHTML = '';
    localStorage.getItem("report");
    cartItems.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'product';
        cartItem.innerHTML = `
                <div>
                    <img class="cartImages" src="${item.image}" alt="${item.title}">
                </div>
                <div class="itemInfo">
                    <span class="cartTitle">${item.title}</span>
                </div>
                <div class="price-and-remove">
                    <span class="price">${item.price}</span>
                    <button class="BtnRemove">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" height="50" width="50">
                    <path fill="#00ff22" d="M8.78842 5.03866C8.86656 4.96052 8.97254 4.91663 9.08305 4.91663H11.4164C11.5269 4.91663 11.6329 4.96052 11.711 5.03866C11.7892 5.11681 11.833 5.22279 11.833 5.33329V5.74939H8.66638V5.33329C8.66638 5.22279 8.71028 5.11681 8.78842 5.03866ZM7.16638 5.74939V5.33329C7.16638 4.82496 7.36832 4.33745 7.72776 3.978C8.08721 3.61856 8.57472 3.41663 9.08305 3.41663H11.4164C11.9247 3.41663 12.4122 3.61856 12.7717 3.978C13.1311 4.33745 13.333 4.82496 13.333 5.33329V5.74939H15.5C15.9142 5.74939 16.25 6.08518 16.25 6.49939C16.25 6.9136 15.9142 7.24939 15.5 7.24939H15.0105L14.2492 14.7095C14.2382 15.2023 14.0377 15.6726 13.6883 16.0219C13.3289 16.3814 12.8414 16.5833 12.333 16.5833H8.16638C7.65805 16.5833 7.17054 16.3814 6.81109 16.0219C6.46176 15.6726 6.2612 15.2023 6.25019 14.7095L5.48896 7.24939H5C4.58579 7.24939 4.25 6.9136 4.25 6.49939C4.25 6.08518 4.58579 5.74939 5 5.74939H6.16667H7.16638ZM7.91638 7.24996H12.583H13.5026L12.7536 14.5905C12.751 14.6158 12.7497 14.6412 12.7497 14.6666C12.7497 14.7771 12.7058 14.8831 12.6277 14.9613C12.5495 15.0394 12.4436 15.0833 12.333 15.0833H8.16638C8.05588 15.0833 7.94989 15.0394 7.87175 14.9613C7.79361 14.8831 7.74972 14.7771 7.74972 14.6666C7.74972 14.6412 7.74842 14.6158 7.74584 14.5905L6.99681 7.24996H7.91638Z" clip-rule="evenodd" fill-rule="evenodd"></path>
                </svg>
                </button>
                </div>
            `;
        productsContainer.appendChild(cartItem);
    });  
    const discount = localStorage.getItem('currentDiscount');
    if (discount) {
        document.getElementById('couponIdLabel').style.display = 'inline';
        document.getElementById('couponId').style.display = 'inline';
        document.getElementById('couponId').textContent = 
                `-${parseFloat(discount).toFixed(2)}€`;
    }
    
    initialiseRemoveButtons();
    updateCartTotal();
    displayAmountofItems();
});
}

const VALID_VOUCHERS = [
    { code: "SUMMER20", amount: 20 },
    { code: "SAVE10", amount: 10 },
    { code: "FIRST5", amount: 5 }
];

function addInputField() {
    const form = document.querySelector('.form2 .couponBox');
    const discountButton = document.querySelector('.checkbox-wrapper');
    discountButton.style.display = 'none';
    
    window.voucherTimeout = setTimeout(() => {
        const inputHTML = `
            <div class="input-group" style="animation: fadeIn 0.5s ease">
                <input type="text" class="input2" placeholder="Enter Voucher Code" id="voucherInput">
                <input type="button" class="button--submit" value="Redeem" onclick="validateCoupon()" id="redeemButton">
                <span id="couponReply"></span>
            </div>
        `;
        form.innerHTML = inputHTML;
        const voucherInput = document.getElementById('voucherInput');
        voucherInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') validateCoupon();
        });
    }, 300);
    
}

function validateCoupon() {
    const voucherInput = document.getElementById('voucherInput');
    const couponReply = document.getElementById('couponReply');
    const couponId = document.getElementById('couponId');
    const totalPriceSpan = document.querySelector('.totalPrice');
    const couponIdLabel = document.getElementById('couponIdLabel');
    const redeemButton = document.getElementById('redeemButton')


    couponReply.innerHTML = '';
    const enteredCode = voucherInput.value.trim().toUpperCase();
    const validVoucher = VALID_VOUCHERS.find(v => v.code === enteredCode);
    
    if (validVoucher) {
        couponIdLabel.style.display = 'inline';
        couponId.style.display = 'inline';
        couponReply.innerHTML = `${validVoucher.amount}€ discount applied!`;
        couponReply.style.fontSize = '1rem';
        couponReply.style.animation = 'graceful-exit 3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
        couponId.textContent = `-  ${validVoucher.amount}€`;
        couponIdLabel.textContent = 'Discount from Coupons';
        localStorage.setItem('currentDiscount', validVoucher.amount);

        voucherInput.style.display = 'none';
        redeemButton.style.display = 'none';
    } else {
        couponIdLabel.style.display = 'none';
        couponId.style.display = 'none';
        couponReply.innerHTML = "Invalid voucher code";
        localStorage.removeItem('currentDiscount');
    }
    updateCartTotal();
}

makeItemsAppearInBasket();