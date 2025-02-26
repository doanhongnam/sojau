
const fbtsubmit = document.querySelector('#fptsubmit')
fbtsubmit.addEventListener('click', (e) => {

    Shopify.addToCart = function(items) {
        fetch(window.Shopify.routes.root + 'cart/add.js', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(items)
        })
            .then(response => {
                document.querySelector
                const cartItems = e.target.closest('body').querySelector('cart-drawer-items') || e.target.closest('body').querySelector('cart-items');
                cartItems.updateQuantity(2,1, 'plus');
                const cart_drawer = e.target.closest('body').querySelector('cart-drawer')
                e.target.closest('body').classList.add('overlay-body-cart-drawn')
                cart_drawer.classList.add('active');
                window.renderCountInCart();
                return response.json();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };
    // get main product id
    const mainProduct = e.target.closest('.tp-product-detail__right').querySelector('.input-detail-variant').getAttribute('value')
    let products = {
        'items': [
            {
                'id': mainProduct,
                'quantity': 1
            }
        ]
    };

    // get product id of bought together products

    const boughtTogetherProducts = e.target.closest('.tp-product-detail__right').querySelectorAll('.fbtcheckbox:checked');
    boughtTogetherProducts.forEach((product) => {
        let fptproduct = product.closest('.frequentyly-text-price').querySelector('.selector-for-featured-product');
        let productID = fptproduct.options[fptproduct.selectedIndex].value
        products.items.push({
            'id': productID,
            'quantity': 1
        })
    });
    Shopify.addToCart(products)
    e.preventDefault();
} );

document.addEventListener('click', function (e) {
    if(e.target.classList.contains('selector-for-featured-product added')){

    }
});