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

    if(cart.length === 0){
        cartItems.innerHTML = "<p>Your cart is empty</p>";
    }

    cart.forEach((product,index)=>{
        total += product.price;

        cartItems.innerHTML += `
        <div class="cart-row">
            <span>${product.item} - ₹${product.price}</span>
            <button onclick="removeItem(${index})">X</button>
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
    if(cart.length === 0){
        alert("Cart is empty");
        return;
    }

    let message = "🍱 *RanchiHomeBites Order*%0A%0A";
    let total = 0;

    cart.forEach(product=>{
        message += "• " + product.item + " - ₹" + product.price + "%0A";
        total += product.price;
    });

    message += "%0A💰 Total: ₹" + total;

    let url = "https://wa.me/917633801161?text=" + message;
    window.open(url,'_blank');

}
let slides = document.querySelectorAll(".hero-slide");
let currentSlide = 0;

function autoSlide(){
  slides[currentSlide].classList.remove("active");
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add("active");
}

setInterval(autoSlide, 3000);
