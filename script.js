const API_URL =
"https://script.google.com/macros/s/AKfycbzqObh3dq-UYgMK68SOn48WvvF-vjm4G4tF7JYP0SNwu1LDRW_QWdcerAQVImzeSJcz/exec";

let products = [];

async function addProduct() {
    let name = document.getElementById("name").value.trim();
    let price = document.getElementById("price").value.trim();

    if (name === "" || price === "") {
        alert("Please fill all fields.");
        return;
    }

    try {
        await fetch(API_URL, {
            method: "POST",
            body: JSON.stringify({
                name: name,
                price: price
            })
        });

        clearInputs();

        await showProducts();

        alert("Product saved!");
    } catch (error) {
        console.error(error);
        alert("Failed to save product.");
    }
}

async function showProducts() {
    try {
        const response = await fetch(API_URL);

        products = await response.json();

        let list = document.getElementById("list");

        list.innerHTML = "";

        if (products.length === 0) {
            list.innerHTML =
                "<p>No products available.</p>";
            return;
        }

        products.forEach(product => {
            list.innerHTML += `
                <p>
                    <b>${product.name}</b><br>
                    ₱${product.price}
                </p>
            `;
        });

    } catch (error) {
        console.error(error);
    }
}

function searchProduct() {
    let keyword =
        document.getElementById("search")
        .value
        .toLowerCase();

    let list = document.getElementById("list");

    list.innerHTML = "";

    let filtered = products.filter(product =>
        product.name.toLowerCase().includes(keyword)
    );

    if (filtered.length === 0) {
        list.innerHTML =
            "<p>No matching products.</p>";
        return;
    }

    filtered.forEach(product => {
        list.innerHTML += `
            <p>
                <b>${product.name}</b><br>
                ₱${product.price}
            </p>
        `;
    });
}

function clearInputs() {
    document.getElementById("name").value = "";
    document.getElementById("price").value = "";
}

showProducts();