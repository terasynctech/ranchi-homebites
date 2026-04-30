let cart = [];

function addToCart(name, price){
  cart.push({name, price});
  updateCart();
}

function updateCart(){
  document.getElementById("cartCount").innerText = cart.length;

  let html = "";
  let total = 0;

  cart.forEach(item=>{
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
  document.getElementById("cartModal").style.display = "block";
}

function closeCart(){
  document.getElementById("cartModal").style.display = "none";
}

function getLocation(){
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position){
      let lat = position.coords.latitude;
      let lng = position.coords.longitude;

      let mapLink = `https://maps.google.com/?q=${lat},${lng}`;

      document.getElementById("mapLocation").value = mapLink;
      document.getElementById("deliveryAddress").value = "Live location captured successfully";
      alert("Location added successfully");
    }, function(){
      alert("Unable to fetch location");
    });
  }else{
    alert("Geolocation not supported");
  }
}

function sendWhatsAppOrder(){
  let date = document.getElementById("deliveryDate").value;
  let time = document.getElementById("deliveryTime").value;
  let address = document.getElementById("deliveryAddress").value;
  let mapLocation = document.getElementById("mapLocation").value;

  let total = 0;
  let message = "🍽 RanchiHomeBites Order\n\n";

  cart.forEach(item=>{
    message += item.name + " - ₹" + item.price + "\n";
    total += item.price;
  });

  message += "\nTotal: ₹" + total;
  message += "\n\n📅 Delivery Date: " + date;
  message += "\n⏰ Delivery Time: " + time;
  message += "\n📍 Address: " + address;

  if(mapLocation){
    message += "\n🗺 Live Location: " + mapLocation;
  }

  let url = "https://wa.me/917633801161?text=" + encodeURIComponent(message);
  window.open(url);
}

function sendPartyOrder(){
  let plates = document.getElementById("plates").value;

  let message =
    "🎉 Party Order Request\n" +
    "Plates: " + plates + "\n" +
    "Please share menu and quotation.";

  let url = "https://wa.me/917633801161?text=" + encodeURIComponent(message);
  window.open(url);
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
