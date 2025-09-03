// Order state
let orderState = {
  customer: {
    name: "",
    orderType: "dine-in",
    tableNumber: "",
    phoneNumber: "",
    specialNotes: "",
  },
  base: {
    kuah: "",
    kencur: "",
  },
  spice: {
    level: null,
    price: 0,
  },
  egg: {
    type: "none",
    price: 0,
  },
  extras: {
    kerupuk: { quantity: 0, price: 2000 },
    bakso: { quantity: 0, price: 3000 },
    sosis: { quantity: 0, price: 4000 },
    aqua: { quantity: 0, price: 3000 },
    nutrisari: { quantity: 0, price: 5000 },
  },
};

const basePrice = 15000; // Base seblak price

// DOM Elements
const stepContents = document.querySelectorAll(".step-content");
const stepItems = document.querySelectorAll(".step-item");

// Initialize
document.addEventListener("DOMContentLoaded", function () {
  updateOrderSummary();
  setupEventListeners();
});

// Event Listeners
function setupEventListeners() {
  // Customer name input
  document
    .getElementById("customerName")
    .addEventListener("input", function (e) {
      orderState.customer.name = e.target.value;
      updateOrderSummary();
    });

  // Order type select
  document.getElementById("orderType").addEventListener("change", function (e) {
    orderState.customer.orderType = e.target.value;
    updateOrderSummary();
  });

  // Table number input
  document
    .getElementById("tableNumber")
    .addEventListener("input", function (e) {
      orderState.customer.tableNumber = e.target.value;
      updateOrderSummary();
    });

  // Phone number input
  document
    .getElementById("phoneNumber")
    .addEventListener("input", function (e) {
      orderState.customer.phoneNumber = e.target.value;
      updateOrderSummary();
    });

  // Special notes input
  document
    .getElementById("specialNotes")
    .addEventListener("input", function (e) {
      orderState.customer.specialNotes = e.target.value;
      updateOrderSummary();
    });
}

// Step Navigation
function nextStep(stepNumber) {
  if (validateCurrentStep()) {
    showStep(stepNumber);
    updateStepProgress(stepNumber);

    // Populate review summary when going to step 4
    if (stepNumber === 4) {
      populateReviewSummary();
    }
    // Populate final summary when going to step 6
    if (stepNumber === 6) {
      populateFinalSummary();
    }
  }
}

function prevStep(stepNumber) {
  showStep(stepNumber);
  updateStepProgress(stepNumber);
}

function showStep(stepNumber) {
  stepContents.forEach((content) => {
    content.classList.remove("active");
  });
  document.getElementById(`step${stepNumber}`).classList.add("active");
}

function updateStepProgress(currentStep) {
  stepItems.forEach((item, index) => {
    if (index + 1 <= currentStep) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
}

function validateCurrentStep() {
  const currentStep = document.querySelector(".step-content.active");

  if (currentStep.id === "step1") {
    if (!orderState.base.kuah || !orderState.base.kencur) {
      alert("Please select your base and kencur level");
      return false;
    }
  }

  if (currentStep.id === "step2") {
    if (orderState.spice.level === null) {
      alert("Please select a spice level");
      return false;
    }
  }

  if (currentStep.id === "step3") {
    // Step 3 (extras) is optional, no validation needed
    return true;
  }

  if (currentStep.id === "step4") {
    // Step 4 (review) is just a review, no validation needed
    return true;
  }

  if (currentStep.id === "step5") {
    if (!orderState.customer.name.trim()) {
      alert("Please enter your name");
      return false;
    }
  }

  if (currentStep.id === "step6") {
    // Step 6 (final confirmation) is just confirmation, no validation needed
    return true;
  }

  return true;
}

// Option Selection
function selectOption(element, type, value) {
  // Remove selection from siblings
  const siblings = element.parentElement.children;
  Array.from(siblings).forEach((sibling) => {
    sibling.classList.remove("selected");
  });

  // Add selection to current element
  element.classList.add("selected");

  // Update order state
  orderState.base[type] = value;
  updateOrderSummary();
}

// Spice Selection
function selectSpice(element, level, price) {
  // Remove selection from siblings
  const siblings = element.parentElement.children;
  Array.from(siblings).forEach((sibling) => {
    sibling.classList.remove("selected");
  });

  // Add selection to current element
  element.classList.add("selected");

  // Update order state
  orderState.spice = { level, price };
  updateOrderSummary();
}

// Egg Selection
function selectEgg(element, type, price) {
  // Remove selection from siblings
  const siblings = element.parentElement.children;
  Array.from(siblings).forEach((sibling) => {
    sibling.classList.remove("selected");
  });

  // Add selection to current element
  element.classList.add("selected");

  // Update order state
  orderState.egg = { type, price };
  updateOrderSummary();
}

// Quantity Management
function changeQuantity(item, change) {
  const currentQty = orderState.extras[item].quantity;
  const newQty = Math.max(0, currentQty + change);

  orderState.extras[item].quantity = newQty;
  document.getElementById(`qty-${item}`).textContent = newQty;

  updateOrderSummary();
}

// Order Summary Update
function updateOrderSummary() {
  // Update customer info
  document.getElementById("customerDisplay").textContent =
    orderState.customer.name || "-";
  document.getElementById("orderTypeDisplay").textContent =
    orderState.customer.orderType === "dine-in" ? "Dine In" : "Take Away";

  // Update base selection
  document.getElementById("baseDisplay").textContent = orderState.base.kuah
    ? `Kuah ${
        orderState.base.kuah.charAt(0).toUpperCase() +
        orderState.base.kuah.slice(1)
      }`
    : "-";

  document.getElementById("kencurDisplay").textContent = orderState.base.kencur
    ? orderState.base.kencur.charAt(0).toUpperCase() +
      orderState.base.kencur.slice(1)
    : "-";

  // Update spice level
  document.getElementById("spiceDisplay").textContent =
    orderState.spice.level !== null ? `Level ${orderState.spice.level}` : "-";

  // Update egg selection
  let eggText = "-";
  if (orderState.egg.type !== "none") {
    eggText =
      orderState.egg.type === "whole"
        ? "Whole Egg"
        : orderState.egg.type === "scrambled"
        ? "Scrambled Egg"
        : "-";
  } else {
    eggText = "No Egg";
  }
  document.getElementById("eggDisplay").textContent = eggText;

  // Update extras
  updateExtrasSummary();

  // Calculate and update total
  calculateTotal();
}

function updateExtrasSummary() {
  const extrasContainer = document.getElementById("extrasListSummary");
  const hasExtras = Object.values(orderState.extras).some(
    (extra) => extra.quantity > 0
  );

  if (!hasExtras) {
    extrasContainer.innerHTML =
      '<p class="empty-state">No additional items</p>';
    return;
  }

  let extrasHTML = "";
  Object.entries(orderState.extras).forEach(([item, data]) => {
    if (data.quantity > 0) {
      const itemName = item.charAt(0).toUpperCase() + item.slice(1);
      const totalPrice = data.quantity * data.price;
      extrasHTML += `
                <div class="order-item">
                    <span>${itemName} (${data.quantity}x)</span>
                    <span>Rp ${totalPrice.toLocaleString("id-ID")}</span>
                </div>
            `;
    }
  });

  extrasContainer.innerHTML = extrasHTML;
}

function calculateTotal() {
  let total = basePrice;

  // Add spice price
  total += orderState.spice.price;

  // Add egg price
  total += orderState.egg.price;

  // Add extras price
  Object.values(orderState.extras).forEach((extra) => {
    total += extra.quantity * extra.price;
  });

  // Update display
  document.getElementById(
    "subtotalAmount"
  ).textContent = `Rp ${total.toLocaleString("id-ID")}`;
  document.getElementById(
    "totalAmount"
  ).textContent = `Rp ${total.toLocaleString("id-ID")}`;
}

// Review Summary Population (Step 4)
function populateReviewSummary() {
  // Seblak details
  document.getElementById("reviewBase").textContent = orderState.base.kuah
    ? `Kuah ${
        orderState.base.kuah.charAt(0).toUpperCase() +
        orderState.base.kuah.slice(1)
      }`
    : "-";
  document.getElementById("reviewKencur").textContent = orderState.base.kencur
    ? orderState.base.kencur.charAt(0).toUpperCase() +
      orderState.base.kencur.slice(1)
    : "-";
  document.getElementById("reviewSpice").textContent =
    orderState.spice.level !== null ? `Level ${orderState.spice.level}` : "-";

  let eggText = "-";
  if (orderState.egg.type !== "none") {
    eggText =
      orderState.egg.type === "whole"
        ? "Whole Egg"
        : orderState.egg.type === "scrambled"
        ? "Scrambled Egg"
        : "-";
  } else {
    eggText = "No Egg";
  }
  document.getElementById("reviewEgg").textContent = eggText;

  // Extras
  const reviewExtrasContainer = document.getElementById("reviewExtrasList");
  const hasExtras = Object.values(orderState.extras).some(
    (extra) => extra.quantity > 0
  );

  if (!hasExtras) {
    reviewExtrasContainer.innerHTML =
      '<p class="empty-state">No additional items</p>';
  } else {
    let extrasHTML = "";
    Object.entries(orderState.extras).forEach(([item, data]) => {
      if (data.quantity > 0) {
        const itemName = item.charAt(0).toUpperCase() + item.slice(1);
        const totalPrice = data.quantity * data.price;
        extrasHTML += `
          <div class="detail-row">
            <span>${itemName} (${data.quantity}x)</span>
            <span>Rp ${totalPrice.toLocaleString("id-ID")}</span>
          </div>
        `;
      }
    });
    reviewExtrasContainer.innerHTML = extrasHTML;
  }

  // Pricing breakdown
  document.getElementById("reviewSpicePrice").innerHTML = `
    <span>Spice Level:</span>
    <span>Rp ${orderState.spice.price.toLocaleString("id-ID")}</span>
  `;

  document.getElementById("reviewEggPrice").innerHTML = `
    <span>Egg:</span>
    <span>Rp ${orderState.egg.price.toLocaleString("id-ID")}</span>
  `;

  let extrasTotal = 0;
  Object.values(orderState.extras).forEach((extra) => {
    extrasTotal += extra.quantity * extra.price;
  });

  document.getElementById("reviewExtrasPrice").innerHTML = `
    <span>Extras:</span>
    <span>Rp ${extrasTotal.toLocaleString("id-ID")}</span>
  `;

  const finalTotal =
    basePrice + orderState.spice.price + orderState.egg.price + extrasTotal;
  document.getElementById(
    "reviewFinalTotal"
  ).textContent = `Rp ${finalTotal.toLocaleString("id-ID")}`;
}

// Final Summary Population (Step 6)
function populateFinalSummary() {
  // Customer details
  document.getElementById("finalCustomerName").textContent =
    orderState.customer.name || "-";
  document.getElementById("finalOrderType").textContent =
    orderState.customer.orderType === "dine-in" ? "Dine In" : "Take Away";
  document.getElementById("finalTableNumber").textContent =
    orderState.customer.tableNumber || "-";
  document.getElementById("finalPhone").textContent =
    orderState.customer.phoneNumber || "-";

  // Seblak details
  document.getElementById("finalBase").textContent = orderState.base.kuah
    ? `Kuah ${
        orderState.base.kuah.charAt(0).toUpperCase() +
        orderState.base.kuah.slice(1)
      }`
    : "-";
  document.getElementById("finalKencur").textContent = orderState.base.kencur
    ? orderState.base.kencur.charAt(0).toUpperCase() +
      orderState.base.kencur.slice(1)
    : "-";
  document.getElementById("finalSpice").textContent =
    orderState.spice.level !== null ? `Level ${orderState.spice.level}` : "-";

  let eggText = "-";
  if (orderState.egg.type !== "none") {
    eggText =
      orderState.egg.type === "whole"
        ? "Whole Egg"
        : orderState.egg.type === "scrambled"
        ? "Scrambled Egg"
        : "-";
  } else {
    eggText = "No Egg";
  }
  document.getElementById("finalEgg").textContent = eggText;

  // Extras
  const finalExtrasContainer = document.getElementById("finalExtrasList");
  const hasExtras = Object.values(orderState.extras).some(
    (extra) => extra.quantity > 0
  );

  if (!hasExtras) {
    finalExtrasContainer.innerHTML =
      '<p class="empty-state">No additional items</p>';
  } else {
    let extrasHTML = "";
    Object.entries(orderState.extras).forEach(([item, data]) => {
      if (data.quantity > 0) {
        const itemName = item.charAt(0).toUpperCase() + item.slice(1);
        const totalPrice = data.quantity * data.price;
        extrasHTML += `
          <div class="detail-row">
            <span>${itemName} (${data.quantity}x)</span>
            <span>Rp ${totalPrice.toLocaleString("id-ID")}</span>
          </div>
        `;
      }
    });
    finalExtrasContainer.innerHTML = extrasHTML;
  }

  // Special notes
  const finalNotes = document.getElementById("finalNotes");
  if (orderState.customer.specialNotes.trim()) {
    finalNotes.innerHTML = `<p>${orderState.customer.specialNotes}</p>`;
  } else {
    finalNotes.innerHTML = '<p class="empty-state">No special requests</p>';
  }

  // Pricing breakdown
  document.getElementById("finalSpicePrice").innerHTML = `
    <span>Spice Level:</span>
    <span>Rp ${orderState.spice.price.toLocaleString("id-ID")}</span>
  `;

  document.getElementById("finalEggPrice").innerHTML = `
    <span>Egg:</span>
    <span>Rp ${orderState.egg.price.toLocaleString("id-ID")}</span>
  `;

  let extrasTotal = 0;
  Object.values(orderState.extras).forEach((extra) => {
    extrasTotal += extra.quantity * extra.price;
  });

  document.getElementById("finalExtrasPrice").innerHTML = `
    <span>Extras:</span>
    <span>Rp ${extrasTotal.toLocaleString("id-ID")}</span>
  `;

  const grandTotal =
    basePrice + orderState.spice.price + orderState.egg.price + extrasTotal;
  document.getElementById(
    "finalGrandTotal"
  ).textContent = `Rp ${grandTotal.toLocaleString("id-ID")}`;
}

// Checkout Summary Population
function populateCheckoutSummary() {
  // Customer details
  document.getElementById("checkoutCustomerName").textContent =
    orderState.customer.name || "-";
  document.getElementById("checkoutOrderType").textContent =
    orderState.customer.orderType === "dine-in" ? "Dine In" : "Take Away";
  document.getElementById("checkoutTableNumber").textContent =
    orderState.customer.tableNumber || "-";
  document.getElementById("checkoutPhone").textContent =
    orderState.customer.phoneNumber || "-";

  // Seblak details
  document.getElementById("checkoutBase").textContent = orderState.base.kuah
    ? `Kuah ${
        orderState.base.kuah.charAt(0).toUpperCase() +
        orderState.base.kuah.slice(1)
      }`
    : "-";
  document.getElementById("checkoutKencur").textContent = orderState.base.kencur
    ? orderState.base.kencur.charAt(0).toUpperCase() +
      orderState.base.kencur.slice(1)
    : "-";
  document.getElementById("checkoutSpice").textContent =
    orderState.spice.level !== null ? `Level ${orderState.spice.level}` : "-";

  let eggText = "-";
  if (orderState.egg.type !== "none") {
    eggText =
      orderState.egg.type === "whole"
        ? "Whole Egg"
        : orderState.egg.type === "scrambled"
        ? "Scrambled Egg"
        : "-";
  } else {
    eggText = "No Egg";
  }
  document.getElementById("checkoutEgg").textContent = eggText;

  // Extras
  const checkoutExtrasContainer = document.getElementById("checkoutExtrasList");
  const hasExtras = Object.values(orderState.extras).some(
    (extra) => extra.quantity > 0
  );

  if (!hasExtras) {
    checkoutExtrasContainer.innerHTML =
      '<p class="empty-state">No additional items</p>';
  } else {
    let extrasHTML = "";
    Object.entries(orderState.extras).forEach(([item, data]) => {
      if (data.quantity > 0) {
        const itemName = item.charAt(0).toUpperCase() + item.slice(1);
        const totalPrice = data.quantity * data.price;
        extrasHTML += `
          <div class="detail-row">
            <span>${itemName} (${data.quantity}x)</span>
            <span>Rp ${totalPrice.toLocaleString("id-ID")}</span>
          </div>
        `;
      }
    });
    checkoutExtrasContainer.innerHTML = extrasHTML;
  }

  // Special notes
  const checkoutNotes = document.getElementById("checkoutNotes");
  if (orderState.customer.specialNotes.trim()) {
    checkoutNotes.innerHTML = `<p>${orderState.customer.specialNotes}</p>`;
  } else {
    checkoutNotes.innerHTML = '<p class="empty-state">No special requests</p>';
  }

  // Pricing breakdown
  document.getElementById("checkoutSpicePrice").innerHTML = `
    <span>Spice Level:</span>
    <span>Rp ${orderState.spice.price.toLocaleString("id-ID")}</span>
  `;

  document.getElementById("checkoutEggPrice").innerHTML = `
    <span>Egg:</span>
    <span>Rp ${orderState.egg.price.toLocaleString("id-ID")}</span>
  `;

  let extrasTotal = 0;
  Object.values(orderState.extras).forEach((extra) => {
    extrasTotal += extra.quantity * extra.price;
  });

  document.getElementById("checkoutExtrasPrice").innerHTML = `
    <span>Extras:</span>
    <span>Rp ${extrasTotal.toLocaleString("id-ID")}</span>
  `;

  const finalTotal =
    basePrice + orderState.spice.price + orderState.egg.price + extrasTotal;
  document.getElementById(
    "checkoutFinalTotal"
  ).textContent = `Rp ${finalTotal.toLocaleString("id-ID")}`;
}

// Order Placement
function placeOrder() {
  if (!validateOrder()) {
    return;
  }

  // Generate order number
  const orderNumber = "SB" + Date.now().toString().slice(-6);
  document.getElementById("orderNumber").textContent = orderNumber;

  // Show success modal
  const modal = document.getElementById("successModal");
  modal.classList.add("active");

  // Log order for demo purposes
  console.log("Order placed:", {
    orderNumber,
    ...orderState,
    total: calculateOrderTotal(),
  });
}

function validateOrder() {
  if (!orderState.customer.name.trim()) {
    alert("Please enter your name");
    showStep(5);
    return false;
  }

  if (!orderState.base.kuah || !orderState.base.kencur) {
    alert("Please select your base and kencur level");
    showStep(1);
    return false;
  }

  if (orderState.spice.level === null) {
    alert("Please select a spice level");
    showStep(2);
    return false;
  }

  return true;
}

function calculateOrderTotal() {
  let total = basePrice;
  total += orderState.spice.price;
  total += orderState.egg.price;

  Object.values(orderState.extras).forEach((extra) => {
    total += extra.quantity * extra.price;
  });

  return total;
}

// New Order
function newOrder() {
  // Reset order state
  orderState = {
    customer: {
      name: "",
      orderType: "dine-in",
      tableNumber: "",
      phoneNumber: "",
      specialNotes: "",
    },
    base: {
      kuah: "",
      kencur: "",
    },
    spice: {
      level: null,
      price: 0,
    },
    egg: {
      type: "none",
      price: 0,
    },
    extras: {
      kerupuk: { quantity: 0, price: 2000 },
      bakso: { quantity: 0, price: 3000 },
      sosis: { quantity: 0, price: 4000 },
      aqua: { quantity: 0, price: 3000 },
      nutrisari: { quantity: 0, price: 5000 },
    },
  };

  // Reset form
  document.getElementById("customerName").value = "";
  document.getElementById("orderType").value = "dine-in";
  document.getElementById("tableNumber").value = "";
  document.getElementById("phoneNumber").value = "";
  document.getElementById("specialNotes").value = "";

  // Reset selections
  document.querySelectorAll(".selected").forEach((element) => {
    element.classList.remove("selected");
  });

  // Reset quantities
  Object.keys(orderState.extras).forEach((item) => {
    document.getElementById(`qty-${item}`).textContent = "0";
  });

  // Hide modal
  document.getElementById("successModal").classList.remove("active");

  // Go to first step
  showStep(1);
  updateStepProgress(1);

  // Update summary
  updateOrderSummary();
}

// Modal close on backdrop click
document.getElementById("successModal").addEventListener("click", function (e) {
  if (e.target === this) {
    newOrder();
  }
});

// Keyboard shortcuts
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    const modal = document.getElementById("successModal");
    if (modal.classList.contains("active")) {
      newOrder();
    }
  }
});
