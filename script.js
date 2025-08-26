const stickerList = document.getElementById('sticker-list');
const inventoryList = document.getElementById('inventory-list');
const userFighters = document.getElementById('user-fighters');
const enemyFighters = document.getElementById('enemy-fighters');
const fightButton = document.getElementById('fight-button');
const modal = document.getElementById('sticker-selection-modal');
const modalStickerList = document.getElementById('modal-sticker-list');
const confirmSelectionButton = document.getElementById('confirm-selection-button');

const localStickers = [
    { name: '2016 Hack Camp', url: 'Stickers/2016 Hack Camp.svg' },
    { name: '2018 Holidays', url: 'Stickers/2018 Holidays.svg' },
    { name: '2020 Progress', url: 'Stickers/2020 Progress.png' },
    { name: '2020 Storm The Hack', url: 'Stickers/2020 Storm The Hack.png' },
    { name: '2021 Design Awards', url: 'Stickers/2021 Design Awards.png' },
    { name: '2025 Summer of Making', url: 'Stickers/2025 Summer of Making.png' },
    { name: 'AI Safety Campfire', url: 'Stickers/AI Safety Campfire.png' },
    { name: 'AI Safety Meme', url: 'Stickers/AI Safety Meme.png' },
    { name: 'Adobe', url: 'Stickers/Adobe.svg' },
    { name: 'Airlines', url: 'Stickers/Airlines.png' },
    { name: 'All Fun Javascript', url: 'Stickers/All Fun Javascript.svg' },
    { name: 'Anxiety', url: 'Stickers/Anxiety.png' },
    { name: 'Apocalypse', url: 'Stickers/Apocalypse.png' },
    { name: 'Arcade', url: 'Stickers/Arcade.png' },
    { name: 'Arrpheus', url: 'Stickers/Arrpheus.png' },
    { name: 'Assemble', url: 'Stickers/Assemble.svg' },
    { name: 'Athena Award Bow', url: 'Stickers/Athena Award Bow.png' },
    { name: 'Athena Award Orpheus', url: 'Stickers/Athena Award Orpheus.png' }
];

let userInventory = [];
let enemyInventory = [];
let allStickers = [];
let selectedStickers = [];

function initializeGame() {
    allStickers = localStickers;
    showInitialStickerSelection();
}

function showInitialStickerSelection() {
    modal.style.display = 'block';
    modalStickerList.innerHTML = ''; // Clear previous content

    if (allStickers.length === 0) {
        modalStickerList.innerHTML = '<p>No stickers found to choose from. The shop might be empty!</p>';
        return;
    }

    allStickers.forEach(sticker => {
        const stickerElement = createStickerElement(sticker);
        stickerElement.addEventListener('click', () => toggleStickerSelection(sticker, stickerElement));
        modalStickerList.appendChild(stickerElement);
    });
}

function toggleStickerSelection(sticker, element) {
    const index = selectedStickers.findIndex(s => s.name === sticker.name);
    if (index > -1) {
        selectedStickers.splice(index, 1);
        element.classList.remove('selected');
    } else {
        if (selectedStickers.length < 5) {
            selectedStickers.push(sticker);
            element.classList.add('selected');
        } else {
            alert('You can only select 5 stickers.');
        }
    }
    confirmSelectionButton.disabled = selectedStickers.length !== 5;
}

confirmSelectionButton.addEventListener('click', () => {
    userInventory = selectedStickers.map(sticker => ({
        ...sticker,
        level: 1,
        attack: 1,
        defense: 1,
        intelligence: 1
    }));
    modal.style.display = 'none';
    displayStickers(allStickers);
    updateInventoryDisplay();
    setupEnemyTeam();
});


function displayStickers(stickers) {
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
    // Add hover for stats - basic implementation
    const statsPreview = document.createElement('div');
    statsPreview.classList.add('stats-preview');
    statsPreview.innerHTML = `
        <p>ATK: 1</p>
        <p>DEF: 1</p>
        <p>INT: 1</p>
    `;
    statsPreview.style.display = 'none'; // Hide by default
    stickerElement.appendChild(statsPreview);

    stickerElement.addEventListener('mouseover', () => {
        statsPreview.style.display = 'block';
    });
    stickerElement.addEventListener('mouseout', () => {
        statsPreview.style.display = 'none';
    });

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
    userFighters.innerHTML = '<h3>Your Team</h3>';

    userInventory.forEach(sticker => {
        const inventoryStickerElement = createStickerElement(sticker);
        inventoryStickerElement.innerHTML += `
            <div class="stats">
                <p>Level: ${sticker.level}</p>
                <p>ATK: ${sticker.attack}</p>
                <p>DEF: ${sticker.defense}</p>
                <p>INT: ${sticker.intelligence}</p>
            </div>
        `;
        inventoryList.appendChild(inventoryStickerElement);

        const fighterStickerElement = createStickerElement(sticker);
        fighterStickerElement.innerHTML += `
            <div class="stats">
                <p>Lvl: ${sticker.level}</p>
                <p>A: ${sticker.attack} D: ${sticker.defense}</p>
            </div>
        `;
        userFighters.appendChild(fighterStickerElement);
    });
}

function setupEnemyTeam() {
    const shuffled = [...allStickers].sort(() => 0.5 - Math.random());
    const enemyTeam = shuffled.slice(0, 5);

    enemyInventory = enemyTeam.map(sticker => ({
        ...sticker,
        level: 1,
        attack: 1,
        defense: 1,
        intelligence: 1
    }));

    updateEnemyFightersDisplay();
}

function updateEnemyFightersDisplay() {
    enemyFighters.innerHTML = '<h3>Enemy Team</h3>';
    enemyInventory.forEach(sticker => {
        const stickerElement = createStickerElement(sticker);
        enemyFighters.appendChild(stickerElement);
    });
}

// Start the game using local data
initializeGame();