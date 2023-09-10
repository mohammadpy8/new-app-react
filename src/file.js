const searchInput = document.getElementById("search-input");
const productItem = document.getElementsByClassName("pro");
const buttons = document.querySelectorAll(".filter");

const searchHandelr = (event) => {
    const searchValue = event.target.value.toLowerCase().trim();
    searchValue.array.forEach(product => {
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
}

searchInput.addEventListener("keyup", searchHandelr);
buttons.forEach(button => {
    button.addEventListener("click", filterHandler);
});