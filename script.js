let cart = [];

function addToCart(item, price){
    cart.push({item, price});
    updateCartCount();
}

function updateCartCount(){
    document.getElementById("cartCount").innerText = cart.length;
}

function openCart(){
    let cartItems = document.getElementById("cartItems");
    let total = 0;
    cartItems.innerHTML = "";

    cart.forEach((product,index)=>{
        total += product.price;
        cartItems.innerHTML += `
        <div class="cart-row">
            ${product.item} - ₹${product.price}
            <button onclick="removeItem(${index})">❌</button>
        </div>`;
    });

    document.getElementById("cartTotal").innerText = total;
    document.getElementById("cartModal").style.display = "block";
}

function removeItem(index){
    cart.splice(index,1);
    updateCartCount();
    openCart();
}

function closeCart(){
    document.getElementById("cartModal").style.display = "none";
}

function sendWhatsAppOrder(){
    let message = "🍱 *RanchiHomeBites Order*%0A%0A";
    let total = 0;

    cart.forEach(product=>{
        message += "• " + product.item + " - ₹" + product.price + "%0A";
        total += product.price;
    });

    message += "%0A💰 Total: ₹" + total;

    window.open("https://wa.me/917633801161?text=" + message);
}
