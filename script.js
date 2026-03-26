const themeToggle = document.getElementById('themeToggle');
const body = document.body;

const savedTheme = localStorage.getItem('theme') || 'dark';
applyTheme(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = body.classList.contains('bg-slate-900') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
});

function applyTheme(theme) {
    if (theme === 'light') {
        body.classList.remove('bg-rose-950', 'text-rose-100');
        body.classList.add('bg-[#F4F1EE]', 'text-[#5D101D]');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        themeToggle.classList.replace('bg-slate-800', 'bg-rose-200')
    } else {
        body.classList.remove('bg-[#F4F1EE]', 'text-[#5D101D]');
        body.classList.add('bg-rose-950', 'text-rose-100');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        themeToggle.classList.replace('bg-rose-200', 'bg-slate-800');
    }
    localStorage.setItem('theme', theme);
}


let wines = JSON.parse(localStorage.getItem('crimsonCellar')) || [];

const wineForm = document.getElementById('wineForm');
const inventoryTable = document.getElementById('inventoryTable');


if (wineForm) {
    wineForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newWine = {
            id: Date.now(),
            name: document.getElementById('wineName').value,
            category: document.getElementById('wineCategory').value,
            qty: parseInt(document.getElementById('wineQty').value),
            price: parseFloat(document.getElementById('winePrice').value)
        };
        wines.push(newWine);
        saveAndRender();
        wineForm.reset();
    });
}


function saveAndRender() {
    localStorage.setItem('crimsonCellar', JSON.stringify(wines));
    renderTable();
    updateStats();
    if (document.getElementById('stockChart')) { 
        renderChart(); 
    }
}

function renderTable() {
    if (!inventoryTable) return;
    
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filterCat = document.getElementById('filterCategory').value;

    const filtered = wines.filter(w => 
        w.name.toLowerCase().includes(searchTerm) && 
        (filterCat === "" || w.category === filterCat)
    );

    inventoryTable.innerHTML = filtered.map(w => `
        <tr class="border-b border-zinc-800 hover:bg-zinc-900/50">
            <td class="p-4 font-bold">${w.name}</td>
            <td class="p-4 text-zinc-400">${w.category}</td>
            <td class="p-4 ${w.qty < 5 ? 'text-red-500 font-bold' : ''}">${w.qty}</td>
            <td class="p-4">$${w.price}</td>
            <td class="p-4 whitespace-nowrap">
            <button onclick="editWine(${w.id})" class="text-blue-500 mr-4">Edit</button>
                <button onclick="deleteWine(${w.id})" class="text-red-500">Del</button>
            </td>
        </tr>
    `).join('');

    const hasLowStock = wines.some(w => w.qty < 5);
    const banner = document.getElementById('alertBanner');
    if (banner) banner.style.display = hasLowStock ? 'block' : 'none';
}

function deleteWine(id) {
    wines = wines.filter(w => w.id !== id);
    saveAndRender();
}

function editWine(id) {

    const wine = wines.find(w => w.id === id);
    if (!wine) return;


    const newName = prompt("Edit Wine Name:", wine.name);
    const newQty = prompt("Edit Quantity:", wine.qty);
    const newPrice = prompt("Edit Price:", wine.price);


    if (newName && newQty && newPrice) {
        wine.name = newName;
        wine.qty = parseInt(newQty);
        wine.price = parseFloat(newPrice);

        saveAndRender();
    }
}
function updateStats() {
    const total = wines.reduce((sum, w) => sum + (w.qty * w.price), 0);
    const totalBottles = wines.reduce((sum, w) => sum + w.qty, 0);

    const elements = {
        'totalValue': `$${total.toLocaleString()}`,
        'statValue': `$${total.toLocaleString()}`,
        'statItems': wines.length,
        'statBottles': totalBottles
    };

    for (let id in elements) {
        const el = document.getElementById(id);
        if (el) el.innerText = elements[id];
    }
}

if (document.getElementById('searchInput')) {
    ['searchInput', 'filterCategory'].forEach(id => {
        document.getElementById(id).addEventListener('input', renderTable);
    });
}


function renderChart() {
    const canvas = document.getElementById('stockChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const categories = [...new Set(wines.map(w => w.category))];
    const data = categories.map(cat => 
        wines.filter(w => w.category === cat).reduce((sum, w) => sum + w.qty, 0)
    );

    if (window.myChart) window.myChart.destroy();
    window.myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: categories,
            datasets: [{
                data: data,
                backgroundColor: ['#ef4444', '#f87171', '#fca5a5', '#fee2e2'],
                borderColor: '#18181b'
            }]
        },
        options: { 
            plugins: { 
                legend: { labels: { color: body.classList.contains('bg-white') ? 'black' : 'white' } } 
            } 
        }
    });
}

saveAndRender();