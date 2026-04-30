let cart = [];

function addToCart(name, price){
  let existingItem = cart.find(item => item.name === name);

  if(existingItem){
    existingItem.qty += 1;
  }else{
    cart.push({
      name: name,
      price: price,
      qty: 1
    });
  }

  updateCart();
}

function changeQty(index, change){
  cart[index].qty += change;

  if(cart[index].qty <= 0){
    cart.splice(index, 1);
  }

  updateCart();
}

function updateCart(){
  let totalItems = 0;
  let totalAmount = 0;
  let html = "";

  cart.forEach((item, index)=>{
    let itemTotal = item.price * item.qty;
    totalItems += item.qty;
    totalAmount += itemTotal;

    html += `
      <div class="cart-row">
        <div>
          <strong>${item.name}</strong><br>
          ₹${item.price} × ${item.qty} = ₹${itemTotal}
        </div>

        <div class="qty-controls">
          <button onclick="changeQty(${index}, -1)">−</button>
          <span>${item.qty}</span>
          <button onclick="changeQty(${index}, 1)">+</button>
        </div>
      </div>
    `;
  });

  document.getElementById("cartCount").innerText = totalItems;
  document.getElementById("cartItems").innerHTML = html;
  document.getElementById("cartTotal").innerText = totalAmount;
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
    let itemTotal = item.price * item.qty;
    total += itemTotal;

    message += `${item.name} x ${item.qty} = ₹${itemTotal}\n`;
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

function downloadInvoice(){
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  let date = document.getElementById("deliveryDate").value;
  let time = document.getElementById("deliveryTime").value;
  let address = document.getElementById("deliveryAddress").value;

  let invoiceNo = "RB" + Math.floor(Math.random() * 100000);
  let y = 20;
  let total = 0;

  doc.setFontSize(18);
  doc.text("RanchiHomeBites", 20, y);

  y += 8;
  doc.setFontSize(10);
  doc.text("Homemade Food Delivered Fresh in Ranchi", 20, y);

  y += 12;
  doc.text("Invoice No: " + invoiceNo, 20, y);
  doc.text("Date: " + new Date().toLocaleDateString(), 140, y);

  y += 12;
  doc.setFontSize(12);
  doc.text("Customer Delivery Details", 20, y);

  y += 8;
  doc.setFontSize(10);
  doc.text("Delivery Date: " + date, 20, y);
  y += 6;
  doc.text("Delivery Time: " + time, 20, y);
  y += 6;
  doc.text("Address: " + address, 20, y);

  y += 14;
  doc.setFontSize(12);
  doc.text("Order Summary", 20, y);

  y += 8;
  doc.setFontSize(10);

  cart.forEach(item=>{
    let itemTotal = item.price * item.qty;
    total += itemTotal;

    doc.text(
      `${item.name}  x${item.qty}   ₹${item.price}   = ₹${itemTotal}`,
      20,
      y
    );
    y += 8;
  });

  y += 5;
  doc.setFontSize(12);
  doc.text("Total Amount: ₹" + total, 20, y);

  y += 15;
  doc.setFontSize(10);
  doc.text("Thank you for ordering from RanchiHomeBites", 20, y);
  y += 6;
  doc.text("WhatsApp: +91 76338 01161", 20, y);

  doc.save("RanchiHomeBites-Invoice.pdf");
}

let slides = document.querySelectorAll(".hero-slide");
let currentSlide = 0;

function startSlider(){
  setInterval(()=>{
    slides[currentSlide].classList.remove("active");
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add("active");
  }, 3000);
}

window.onload = startSlider;
