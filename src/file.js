const searchInput = document.getElementById("search-input");
const productItem = document.getElementsByClassName("pro");
const buttons = document.querySelectorAll(".filter");
const priceDiv = document.getElementById("serch");
const priceButton = priceDiv.querySelector("button");

const changeClass = (filter) => {
  buttons.forEach((button) => {
    if (button.dataset.filter === filter) {
      button.classList.add("selected");
    } else {
      button.classList.remove("selected");
    }
  });
};

const searchHandelr = (event) => {
  const searchValue = event.target.value.toLowerCase().trim();
  searchValue.array.forEach((product) => {
    const productName = product.chidren[1].innerText.toLowerCase();
    if (productName.includes(searchValue)) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  });
};

const filterHandler = (event) => {
  const filter = event.target.dataset.filter;
  changeClass(filter);

  productItem.forEach((product) => {
    const category = product.dataset.category;

    if (filter === "all") {
      product.style.display = "block";
    } else {
      filter === category
        ? (product.style.display = "block")
        : (product.style.display = "none");
    }
  });
};

const searchPriceHandler = (event) => {
  const searchPrice = +event.target.parentElement.chidren[0].value;

  productItem.forEach((product) => {
    const productPrice = product.chidren[2].innerText;
    const price = productPrice.split(" ")[1];

    if (!searchPrice) {
      product.style.display = "block";
    } else {
      searchPrice === price
        ? (product.style.display = "block")
        : (product.style.display = "none");
    }
  });
};

window.addEventListener("load", () => {
  searchInput.addEventListener("keyup", searchHandelr);
  buttons.forEach((button) => {
    button.addEventListener("click", filterHandler);
  });
  priceButton.addEventListener("click", searchPriceHandler);
});
