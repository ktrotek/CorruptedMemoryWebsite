var removeCartButtons = document.getElementsByClassName('BtnRemove');

for (var i = 0; i < removeCartButtons.length; i++) {
    var button = removeCartButtons[i];
    button.addEventListener('click', function(event) {
        // localStorage update
        const title = this.closest('.product').querySelector('span').textContent;
        
        let cartItems = JSON.parse(localStorage.getItem('cartItems'));
        cartItems = cartItems.filter(item => item.title !== title);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        
        updateCartTotal()
    })
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('products')[0];
    var cartItems = cartItemContainer.getElementsByClassName('product');
    var total = 0;

    for (var i = 0; i < cartItems.length; i++) {
        var cartItem = cartItems[i];
        var priceElement = cartItem.getElementsByClassName('price')[0];
        
        if (priceElement) {
            // Remove currency symbol and convert to number
            var price = parseFloat(priceElement.textContent.replace(/[^0-9.]/g, ''));
            total += price;
        }
    }

    // Update the displayed totals
    var subtotalElement = document.querySelector('.details span:nth-child(2)');
    var totalElement = document.querySelector('.checkout .price');
    
    if (subtotalElement && totalElement) {
        var shipping = 4.99;
        subtotalElement.textContent = total.toFixed(2) + "$";
        totalElement.innerHTML = `<sup>$</sup>${(total + shipping).toFixed(2)}`;
    }
}


function addItemToCart(productCard) {
    // Get product details
    const title = productCard.querySelector('.title').textContent;
    const price = productCard.querySelector('.price').textContent;
    const imageSrc = productCard.querySelector('img').src;

    // Create cart item HTML
    const cartItem = document.createElement('div');
    cartItem.className = 'product';
    cartItem.innerHTML = `
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

    // Add to cart (using localStorage to persist between pages)
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.push({
        title: title,
        price: price,
        image: imageSrc
    });
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

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