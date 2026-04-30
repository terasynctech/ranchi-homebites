let cart = [];

function addToCart(name, price){
  cart.push({name, price});
  updateCart();
}

function updateCart(){
  document.getElementById("cartCount").innerText = cart.length;

  let html = "";
  let total = 0;

  cart.forEach((item, index)=>{
    total += item.price;
    html += `
      <div class="cart-row">
        <span>${item.name}</span>
        <span>₹${item.price}</span>
      </div>
    `;
  });

  document.getElementById("cartItems").innerHTML = html;
  document.getElementById("cartTotal").innerText = total;
}

function openCart(){
  document.getElementById("cartModal").style.display="block";
}

function closeCart(){
  document.getElementById("cartModal").style.display="none";
}

function sendWhatsAppOrder(){
  let message = "🍽 RanchiHomeBites Order%0A%0A";
  let total = 0;

  cart.forEach(item=>{
    message += item.name + " - ₹" + item.price + "%0A";
    total += item.price;
  });

  message += "%0ATotal: ₹" + total;

  window.open("https://wa.me/917633801161?text=" + message);
}

function sendPartyOrder(){
  let plates = document.getElementById("plates").value;
  let msg = "🎉 Party Order Request%0APlates: " + plates;
  window.open("https://wa.me/917633801161?text=" + msg);
}

let slides = document.querySelectorAll(".hero-slide");
let currentSlide = 0;

function startSlider(){
  setInterval(()=>{
    slides[currentSlide].classList.remove("active");
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add("active");
  },3000);
}

window.onload = startSlider;
