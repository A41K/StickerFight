const stickerList = document.getElementById('sticker-list');
const inventoryList = document.getElementById('inventory-list');
const userFighters = document.getElementById('user-fighters');
const enemyFighters = document.getElementById('enemy-fighters');
const fightButton = document.getElementById('fight-button');

const apiBaseUrl = 'https://corsproxy.io/?' + encodeURIComponent('https://stickers.dld.hackclub.app/api/all');

let userInventory = [];
let enemyInventory = [];

async function fetchStickers() {
    try {
        const response = await fetch(apiBaseUrl);
        const data = await response.json();
        // Log the response to see its structure
        console.log('API Response:', data);
        // Check if data is an array, if not, try to find the array in the response
        const stickers = Array.isArray(data) ? data : data.stickers || [];
        displayStickers(stickers);
    } catch (error) {
        console.error('Error fetching stickers:', error);
        stickerList.innerHTML = '<p>Error loading stickers. Please try again later.</p>';
    }
}

function displayStickers(stickers) {
    if (!Array.isArray(stickers)) {
        console.error('Expected an array of stickers, got:', stickers);
        return;
    }
    
    stickerList.innerHTML = '';
    stickers.forEach(sticker => {
        const stickerElement = createStickerElement(sticker);
        stickerElement.addEventListener('click', () => addStickerToInventory(sticker));
        stickerList.appendChild(stickerElement);
    });
}

function createStickerElement(sticker) {
    const stickerElement = document.createElement('div');
    stickerElement.classList.add('sticker');
    stickerElement.innerHTML = `
        <img src="${sticker.url}" alt="${sticker.name}">
        <p>${sticker.name}</p>
    `;
    return stickerElement;
}

function addStickerToInventory(sticker) {
    if (userInventory.length >= 5) {
        alert('Your inventory is full! (Max 5 stickers)');
        return;
    }
    userInventory.push({
        ...sticker,
        level: 1,
        attack: 1,
        defense: 1,
        intelligence: 1
    });
    updateInventoryDisplay();
}

function updateInventoryDisplay() {
    inventoryList.innerHTML = '';
    userInventory.forEach(sticker => {
        const stickerElement = createStickerElement(sticker);
        stickerElement.innerHTML += `
            <div class="stats">
                <p>Level: ${sticker.level}</p>
                <p>ATK: ${sticker.attack}</p>
                <p>DEF: ${sticker.defense}</p>
                <p>INT: ${sticker.intelligence}</p>
            </div>
        `;
        inventoryList.appendChild(stickerElement);
    });
}

// Start fetching stickers when the page loads
fetchStickers();