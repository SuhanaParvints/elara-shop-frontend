let cart = [];
/* ELEMENTS */
const cartSidebar = document.getElementById('cart-sidebar');
const menuOverlay = document.getElementById('menu-overlay');

/* CART OPEN */
document.getElementById('cart-open').onclick = () => {
    cartSidebar.classList.add('active');
};

/* CART CLOSE */
document.getElementById('cart-close').onclick = () => {
    cartSidebar.classList.remove('active');
};

/* MENU OPEN */
document.getElementById('menu-open').onclick = () => {
    menuOverlay.classList.add('active');
};

/* MENU CLOSE */
document.getElementById('menu-close').onclick = () => {
    menuOverlay.classList.remove('active');
};

/* DARK MODE */
document.getElementById('theme-toggle').onclick = () => {
    document.body.classList.toggle('dark-mode');
};

/* ADD TO CART */
document.querySelectorAll('.add-to-cart').forEach(button => {

    button.addEventListener('click', (e) => {

        const card = e.target.closest('.product-card');
        const name = card.querySelector('h3').innerText;
        const priceText = card.querySelector('p').innerText;
        const price = Number(priceText);
        addToCart(name, price);

    });

});

/* ADD ITEM */
function addToCart(name, price) {

    cart.push({ name, price });

    updateCartUI();

    cartSidebar.classList.add('active');
}

/* UPDATE UI */
function updateCartUI() {

    const container =
        document.getElementById('cart-items-container');

    const countLabel =
        document.getElementById('cart-count');

    const statusLabel =
        document.getElementById('item-status');

    const totalLabel =
        document.getElementById('cart-total');

    countLabel.innerText = cart.length;

    statusLabel.innerText =
        `${cart.length} item(s) selected`;

    if (cart.length === 0) {
        container.innerHTML = `
            <p class="empty-msg">Your cart is empty.</p>`;
        totalLabel.innerText = `₹0`;
        return;
    }
    let total = 0;
    container.innerHTML = '';
    cart.forEach(item => {
        total = total + item.price;
        const div = document.createElement('div');
        div.classList.add('cart-item');
        div.innerHTML = `
            <span>${item.name}</span>
            <span>₹${item.price}</span>`;
        container.appendChild(div);
    });
    totalLabel.innerText = `₹${total}`;
}
/* SHOP NOW BUTTON */
const shopBtn = document.querySelector('.shop-now');
shopBtn.onclick = () => {
    const section = document.getElementById('collections');
    section.scrollIntoView({
        behavior: 'smooth'
    });
};

/*CATEGORY FILTER */
document.querySelectorAll('.cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        document.querySelectorAll('.cat-btn')
            .forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const selected = btn.dataset.cat;

        // Show / hide product cards
        document.querySelectorAll('.product-card').forEach(card => {
            if (selected === 'all' || card.dataset.cat === selected) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }

        });

    });

});