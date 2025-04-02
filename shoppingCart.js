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
        subtotalElement.textContent = total.toFixed(2) + "€";
        totalElement.innerHTML = `<sup>€</sup>${(total + shipping).toFixed(2)}`;
    }

    displayAmountofItems();
}

function initialiseRemoveButtons() {
    var removeCartButtons = document.getElementsByClassName('BtnRemove');
    
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener('click', function(event) {
            const productElement = this.closest('.product');
            const title = productElement.querySelector('span').textContent;
            
            let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            cartItems = cartItems.filter(item => item.title !== title);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            
            productElement.remove();
            displayAmountofItems();
            updateCartTotal();
        });
    }
}

function addItemToCart(productCard) {
    // Get product details
    const title = productCard.querySelector('.title').textContent;
    const price = productCard.querySelector('.price').textContent;
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