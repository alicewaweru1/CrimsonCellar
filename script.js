
function toggleTheme() {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}


let inventory = JSON.parse(localStorage.getItem('crimsonCellarData')) || [];

function addWine() {
    const name = document.getElementById('wineName').value;
    const qty = parseInt(document.getElementById('wineQty').value);
    const price = parseFloat(document.getElementById('winePrice').value);

    if (name && !isNaN(qty) && !isNaN(price)) {
        inventory.push({ name, qty, price });
        saveAndRender();
        document.getElementById('wineName').value = '';
        document.getElementById('wineQty').value = '';
        document.getElementById('winePrice').value = '';
    }
}

function deleteWine(index) {
    inventory.splice(index, 1);
    saveAndRender();
}

function saveAndRender() {
    localStorage.setItem('crimsonCellarData', JSON.stringify(inventory));
    renderInventory();
}

function renderInventory() {
    const tableBody = document.getElementById('inventoryTable');
    if (!tableBody) return;

    let rows = '';
    let grandTotalValue = 0;
    let anyLowStock = false;

    inventory.forEach((item, index) => {
        const itemTotal = item.qty * item.price;
        grandTotalValue += itemTotal;
        
        let status = item.qty <= 0 ? 'Out of Stock' : (item.qty < 5 ? 'Low Stock' : 'In Stock');
        let color = item.qty <= 0 ? 'text-red-500' : (item.qty < 5 ? 'text-orange-500' : 'text-green-500');
        if (item.qty < 5) anyLowStock = true;

        rows += `
            <tr class="border-t dark:border-gray-700">
                <td class="p-4 font-bold">${item.name}</td>
                <td class="p-4 text-center">${item.qty}</td>
                <td class="p-4 text-center">$${itemTotal.toFixed(2)}</td>
                <td class="p-4 text-center font-bold ${color}">${status}</td>
                <td class="p-4 text-right">
                    <button onclick="deleteWine(${index})" class="text-red-500 font-bold hover:underline">Delete</button>
                </td>
            </tr>`;
    });

    tableBody.innerHTML = rows || '<tr><td colspan="5" class="p-10 text-center opacity-50">Cellar is empty.</td></tr>';
    document.getElementById('totalValue').innerText =' $${grandTotalValue.toFixed(2)}';
    
    const alertBanner = document.getElementById('lowStockAlert');
    if (alertBanner) {
        anyLowStock ? alertBanner.classList.remove('hidden') : alertBanner.classList.add('hidden');
    }
}


renderInventory();