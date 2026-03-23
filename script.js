let wines = JSON.parse(localStorage.getItem("wines")) || [];

const wineName = document.getElementById("wine-name");
const wineQty = document.getElementById("wine-qty");
const wineImage = document.getElementById("wine-image");
const addBtn = document.getElementById("add-btn");
const search = document.getElementById("search");

const inStock = document.getElementById("in-stock");
const lowStock = document.getElementById("low-stock");
const outStock = document.getElementById("out-stock");

const totalWines = document.getElementById("total-wines");
const totalBottles = document.getElementById("total-bottles");

const themeToggle = document.getElementById("theme-toggle");

let chart;


addBtn.addEventListener("click", () => {
    const name = wineName.value.trim();
    const qty = parseInt(wineQty.value);
    const image = wineImage.value.trim();

    if (!name || isNaN(qty)) {
        alert("Fill all fields correctly!");
        return;
    }

    wines.push({ id: Date.now(), name, qty, image });
    save();
    clearInputs();
});


function save() {
    localStorage.setItem("wines", JSON.stringify(wines));
    render();
}


function clearInputs() {
    wineName.value = "";
    wineQty.value = "";
    wineImage.value = "";
}


function render(filtered = wines) {
    inStock.innerHTML = "";
    lowStock.innerHTML = "";
    outStock.innerHTML = "";

    let totalQty = 0;

    filtered.forEach(w => {
        totalQty += w.qty;

        const div = document.createElement("div");
        div.className = "bg-white dark:bg-gray-800 p-3 rounded-xl shadow";

        div.innerHTML = `
            <img src="${w.image || 'https://via.placeholder.com/80'}" class="w-16 h-16 object-cover rounded"/>
            <h4 class="font-semibold">${w.name}</h4>
            <p>Qty: ${w.qty}</p>
            <div class="flex gap-2 mt-2">
                <button onclick="inc(${w.id})" class="bg-green-500 text-white px-2 rounded">+</button>
                <button onclick="dec(${w.id})" class="bg-yellow-500 text-white px-2 rounded">-</button>
                <button onclick="del(${w.id})" class="bg-red-500 text-white px-2 rounded">X</button>
            </div>
        `;

        if (w.qty === 0) outStock.appendChild(div);
        else if (w.qty <= 5) lowStock.appendChild(div);
        else inStock.appendChild(div);
    });

    totalWines.textContent = filtered.length;
    totalBottles.textContent = totalQty;

    renderChart();
}


function inc(id) {
    wines = wines.map(w => {
        if (w.id === id) w.qty++;
        return w;
    });
    save();
}

function dec(id) {
    wines = wines.map(w => {
        if (w.id === id && w.qty > 0) w.qty--;
        return w;
    });
    save();
}

function del(id) {
    wines = wines.filter(w => w.id !== id);
    save();
}


search.addEventListener("input", () => {
    const value = search.value.toLowerCase();
    const filtered = wines.filter(w =>
        w.name.toLowerCase().includes(value)
    );
    render(filtered);
});


function renderChart() {
    const ctx = document.getElementById("wineChart");

    const data = {
        labels: wines.map(w => w.name),
        datasets: [{
            label: "Bottles",
            data: wines.map(w => w.qty),
        }]
    };

    if (chart) chart.destroy();

    chart = new Chart(ctx, {
        type: "bar",
        data: data,
    });
}


themeToggle.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");

    localStorage.setItem(
        "theme",
        document.documentElement.classList.contains("dark") ? "dark" : "light"
    );
});


if (localStorage.getItem("theme") === "dark") {
    document.documentElement.classList.add("dark");
}


render();