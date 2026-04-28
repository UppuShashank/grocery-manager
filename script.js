let items = JSON.parse(localStorage.getItem("items")) || [];

function saveData() {
    localStorage.setItem("items", JSON.stringify(items));
}

function addItem() {
    const name = document.getElementById("name").value;
    const price = parseInt(document.getElementById("price").value);
    const qty = parseInt(document.getElementById("qty").value);
    const category = document.getElementById("category").value;

    if (!name || !price || !qty) {
        alert("Fill all fields");
        return;
    }

    const item = { name, price, qty, category };
    items.push(item);

    saveData();
    renderItems(items);

    document.getElementById("name").value = "";
    document.getElementById("price").value = "";
    document.getElementById("qty").value = "";
}

function renderItems(data) {
    const list = document.getElementById("list");
    list.innerHTML = "";

    let total = 0;

    data.forEach((item, index) => {
        const li = document.createElement("li");
        const itemTotal = item.price * item.qty;
        total += itemTotal;

        li.innerHTML = `
            ${item.name} (${item.category}) x${item.qty} - ₹${itemTotal}
            <button onclick="removeItem(${index})">X</button>
        `;

        list.appendChild(li);
    });

    document.getElementById("total").innerText = total;
}

function removeItem(index) {
    items.splice(index, 1);
    saveData();
    renderItems(items);
}

function filterItems(category) {
    if (category === "All") {
        renderItems(items);
    } else {
        const filtered = items.filter(i => i.category === category);
        renderItems(filtered);
    }
}

// initial load
renderItems(items);
