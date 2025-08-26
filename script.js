const stickerList = document.getElementById('sticker-list');
const inventoryList = document.getElementById('inventory-list');
const userFighters = document.getElementById('user-fighters');
const enemyFighters = document.getElementById('enemy-fighters');
const fightButton = document.getElementById('fight-button');
const fightLog = document.getElementById('fight-log');
const modal = document.getElementById('sticker-selection-modal');
const modalStickerList = document.getElementById('modal-sticker-list');
const confirmSelectionButton = document.getElementById('confirm-selection-button');
const coinAmount = document.getElementById('coin-amount');
const userHealthBar = document.getElementById('user-health-bar');
const userHealthText = document.getElementById('user-health-text');
const enemyHealthBar = document.getElementById('enemy-health-bar');
const enemyHealthText = document.getElementById('enemy-health-text');
const shopToggleButton = document.getElementById('shop-toggle-button');
const stickerShop = document.getElementById('sticker-shop');
const userFightersList = document.getElementById('user-fighters-list');
const enemyFightersList = document.getElementById('enemy-fighters-list');
const searchBar = document.getElementById('search-bar');
const rarityFilter = document.getElementById('rarity-filter');

searchBar.addEventListener('input', displayShopStickers);
rarityFilter.addEventListener('change', displayShopStickers);

const localStickers = [
    { name: '2016 Hack Camp', url: 'Stickers/2016 Hack Camp.svg', rarity: 'Common' },
    { name: '2018 Holidays', url: 'Stickers/2018 Holidays.svg', rarity: 'Common' },
    { name: '2020 Progress', url: 'Stickers/2020 Progress.png', rarity: 'Common' },
    { name: '2020 Storm The Hack', url: 'Stickers/2020 Storm The Hack.png', rarity: 'Rare' },
    { name: '2021 Design Awards', url: 'Stickers/2021 Design Awards.png', rarity: 'Rare' },
    { name: '2025 Summer of Making', url: 'Stickers/2025 Summer of Making.png', rarity: 'Epic' },
    { name: 'AI Safety Campfire', url: 'Stickers/AI Safety Campfire.png', rarity: 'Common' },
    { name: 'AI Safety Meme', url: 'Stickers/AI Safety Meme.png', rarity: 'Common' },
    { name: 'Adobe', url: 'Stickers/Adobe.svg', rarity: 'Common' },
    { name: 'Airlines', url: 'Stickers/Airlines.png', rarity: 'Common' },
    { name: 'All Fun Javascript', url: 'Stickers/All Fun Javascript.svg', rarity: 'Rare' },
    { name: 'Anxiety', url: 'Stickers/Anxiety.png', rarity: 'Common' },
    { name: 'Apocalypse', url: 'Stickers/Apocalypse.png', rarity: 'Epic' },
    { name: 'Arcade', url: 'Stickers/Arcade.png', rarity: 'Common' },
    { name: 'Arrpheus', url: 'Stickers/Arrpheus.png', rarity: 'Rare' },
    { name: 'Assemble', url: 'Stickers/Assemble.svg', rarity: 'Common' },
    { name: 'Athena Award Bow', url: 'Stickers/Athena Award Bow.png', rarity: 'Epic' },
    { name: 'Athena Award Orpheus', url: 'Stickers/Athena Award Orpheus.png', rarity: 'Epic' },
    { name: 'Athena Black', url: 'Stickers/Athena Black.png', rarity: 'Rare' },
    { name: 'Athena Sparkles', url: 'Stickers/Athena Sparkles.png', rarity: 'Rare' },
    { name: 'Black Lives Matter', url: 'Stickers/Black Lives Matter.svg', rarity: 'Common' },
    { name: 'Blot Robot', url: 'Stickers/Blot Robot.png', rarity: 'Rare' },
    { name: 'Blot', url: 'Stickers/Blot.png', rarity: 'Common' },
    { name: 'Boba Drops', url: 'Stickers/Boba Drops.png', rarity: 'Common' },
    { name: 'Bottle Caps', url: 'Stickers/Bottle Caps.png', rarity: 'Common' },
    { name: 'Burst', url: 'Stickers/Burst.png', rarity: 'Common' },
    { name: 'CAC', url: 'Stickers/CAC.png', rarity: 'Common' },
    { name: 'Cascade', url: 'Stickers/Cascade.png', rarity: 'Common' },
    { name: 'Cerberus on Laptop', url: 'Stickers/Cerberus on Laptop.png', rarity: 'Rare' },
    { name: 'Drake', url: 'Stickers/Drake.svg', rarity: 'Common' },
    { name: 'Duck on Boat', url: 'Stickers/Duck on Boat.png', rarity: 'Common' },
    { name: 'Emergency Meeting', url: 'Stickers/Emergency Meeting.svg', rarity: 'Rare' },
    { name: 'Epoch Among Us', url: 'Stickers/Epoch Among Us.png', rarity: 'Rare' },
    { name: 'Epoch Bubbly', url: 'Stickers/Epoch Bubbly.png', rarity: 'Common' },
    { name: 'Epoch H', url: 'Stickers/Epoch H.png', rarity: 'Common' },
    { name: 'Epoch', url: 'Stickers/Epoch.png', rarity: 'Common' },
    { name: 'FIRST Co-Branded No Ears', url: 'Stickers/FIRST Co-Branded No Ears.png', rarity: 'Rare' },
    { name: 'Find Out', url: 'Stickers/Find Out.png', rarity: 'Common' },
    { name: 'Friends', url: 'Stickers/Friends.svg', rarity: 'Common' },
    { name: 'From Myth to Mainframe', url: 'Stickers/From Myth to Mainframe.png', rarity: 'Epic' },
    { name: 'Game Lab Flask', url: 'Stickers/Game Lab Flask.png', rarity: 'Rare' },
    { name: 'Game Lab', url: 'Stickers/Game Lab.png', rarity: 'Common' },
    { name: 'Grab', url: 'Stickers/Grab.png', rarity: 'Common' },
    { name: 'Hack Club HQ', url: 'Stickers/Hack Club HQ.png', rarity: 'Rare' },
    { name: 'Hack Cola', url: 'Stickers/Hack Cola.svg', rarity: 'Common' }
];

let userInventory = [];
let enemyInventory = [];
let allStickers = [];
let selectedStickers = [];
let userCoins = 100;
let userHealth = 100;
let enemyHealth = 100;

const rarityStats = {
    'Common': { min: 1, max: 5, price: 25 },
    'Uncommon': { min: 5, max: 10, price: 50 },
    'Rare': { min: 10, max: 20, price: 100 },
    'Epic': { min: 20, max: 30, price: 200 }
};

function getRandomStat(rarity = 'Common') {
    const stats = rarityStats[rarity];
    return Math.floor(Math.random() * (stats.max - stats.min + 1)) + stats.min;
}

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
        const epicCount = selectedStickers.filter(s => s.rarity === 'Epic').length;
        const rareCount = selectedStickers.filter(s => s.rarity === 'Rare').length;

        if (sticker.rarity === 'Epic' && epicCount >= 1) {
            alert('You can only select one Epic sticker.');
            return;
        }

        if (sticker.rarity === 'Rare' && rareCount >= 2) {
            alert('You can only select up to two Rare stickers.');
            return;
        }

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
        attack: getRandomStat(sticker.rarity),
        defense: getRandomStat(sticker.rarity),
        intelligence: 1
    }));
    modal.style.display = 'none';
    displayShopStickers();
    updateInventoryDisplay();
    setupEnemyTeam();
});

function displayShopStickers() {
    const searchTerm = searchBar.value.toLowerCase();
    const selectedRarity = rarityFilter.value;
    stickerList.innerHTML = '';

    const inventoryStickerNames = userInventory.map(s => s.name);

    allStickers
        .filter(sticker => !inventoryStickerNames.includes(sticker.name))
        .filter(sticker => sticker.name.toLowerCase().includes(searchTerm))
        .filter(sticker => selectedRarity === 'all' || sticker.rarity === selectedRarity)
        .forEach(sticker => {
            const stickerElement = createStickerElement(sticker);
            const price = rarityStats[sticker.rarity].price;
            stickerElement.innerHTML += `<button class="buy-button" data-name="${sticker.name}">Buy (${price})</button>`;
            stickerList.appendChild(stickerElement);
        });
}

function createStickerElement(sticker) {
    const stickerElement = document.createElement('div');
    stickerElement.classList.add('sticker');
    stickerElement.innerHTML = `
        <img src="${sticker.url}" alt="${sticker.name}">
        <p>${sticker.name}</p>
        <p class="rarity ${sticker.rarity.toLowerCase()}">${sticker.rarity}</p>
    `;
    const statsPreview = document.createElement('div');
    statsPreview.classList.add('stats-preview');

    if (sticker.attack !== undefined) {
        statsPreview.innerHTML = `
            <p>ATK: ${sticker.attack}</p>
            <p>DEF: ${sticker.defense}</p>
            <p>INT: ${sticker.intelligence}</p>
        `;
    } else {
        const rarity = sticker.rarity || 'Common';
        const statRange = rarityStats[rarity];
        statsPreview.innerHTML = `
            <p>ATK: ${statRange.min}-${statRange.max}</p>
            <p>DEF: ${statRange.min}-${statRange.max}</p>
            <p>INT: 1</p>
        `;
    }
    
    statsPreview.style.display = 'none';
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
        attack: getRandomStat(sticker.rarity),
        defense: getRandomStat(sticker.rarity),
        intelligence: 1
    });
    updateInventoryDisplay();
}

function buySticker(stickerName) {
    const stickerToBuy = allStickers.find(s => s.name === stickerName);
    const price = rarityStats[stickerToBuy.rarity].price;

    if (userCoins >= price && userInventory.length < 5) {
        userCoins -= price;
        coinAmount.textContent = userCoins;
        addStickerToInventory(stickerToBuy);
        displayShopStickers();
    } else if (userInventory.length >= 5) {
        alert('Your inventory is full!');
    } else {
        alert('Not enough coins!');
    }
}

stickerList.addEventListener('click', function(event) {
    if (event.target.classList.contains('buy-button')) {
        const stickerName = event.target.dataset.name;
        buySticker(stickerName);
    }
});

function updateInventoryDisplay() {
    inventoryList.innerHTML = '';
    userFightersList.innerHTML = '';

    userInventory.forEach((sticker, index) => {
        const inventoryStickerElement = createStickerElement(sticker);
        inventoryStickerElement.innerHTML += `
            <div class="stats">
                <p>Level: ${sticker.level}</p>
                <p>ATK: ${sticker.attack}</p>
                <p>DEF: ${sticker.defense}</p>
                <p>INT: ${sticker.intelligence}</p>
            </div>
            <button class="upgrade-button" data-index="${index}">Upgrade</button>
            <button class="sell-button" data-index="${index}">Sell</button>
        `;
        inventoryList.appendChild(inventoryStickerElement);

        const fighterStickerElement = createStickerElement(sticker);
        fighterStickerElement.innerHTML += `
            <div class="stats">
                <p>Lvl: ${sticker.level}</p>
                <p>A: ${sticker.attack} D: ${sticker.defense}</p>
            </div>
        `;
        userFightersList.appendChild(fighterStickerElement);
    });
}

function upgradeSticker(index) {
    const sticker = userInventory[index];
    const cost = sticker.level * 10;

    if (userCoins >= cost) {
        userCoins -= cost;
        sticker.level++;
        sticker.attack += Math.floor(Math.random() * 3) + 1;
        sticker.defense += Math.floor(Math.random() * 3) + 1;
        coinAmount.textContent = userCoins;
        updateInventoryDisplay();
    } else {
        alert("Not enough coins to upgrade!");
    }
}

function sellSticker(index) {
    const stickerToSell = userInventory[index];
    const sellPrice = Math.floor(rarityStats[stickerToSell.rarity].price / 2);

    userCoins += sellPrice;
    coinAmount.textContent = userCoins;

    userInventory.splice(index, 1);
    updateInventoryDisplay();
}

inventoryList.addEventListener('click', function(event) {
    if (event.target.classList.contains('upgrade-button')) {
        const index = event.target.dataset.index;
        upgradeSticker(index);
    }
    if (event.target.classList.contains('sell-button')) {
        const index = event.target.dataset.index;
        sellSticker(index);
    }
});

function setupEnemyTeam() {
    const shuffled = [...allStickers].sort(() => 0.5 - Math.random());
    const enemyTeam = shuffled.slice(0, 5);

    enemyInventory = enemyTeam.map(sticker => ({
        ...sticker,
        level: 1,
        attack: getRandomStat(sticker.rarity),
        defense: getRandomStat(sticker.rarity),
        intelligence: 1
    }));

    updateEnemyFightersDisplay();
}

function updateEnemyFightersDisplay() {
    enemyFightersList.innerHTML = '';
    enemyInventory.forEach(sticker => {
        const stickerElement = createStickerElement(sticker);
        stickerElement.innerHTML += `
            <div class="stats">
                <p>Lvl: ${sticker.level}</p>
                <p>A: ${sticker.attack} D: ${sticker.defense}</p>
            </div>
        `;
        enemyFightersList.appendChild(stickerElement);
    });
}

function fight() {
    if (userInventory.length === 0 || enemyInventory.length === 0 || userHealth <= 0 || enemyHealth <= 0) {
        fightLog.innerHTML = "<p>The battle is over or teams are not ready.</p>";
        return;
    }

    // Calculate total attack for both teams
    const userTotalAttack = userInventory.reduce((total, sticker) => total + sticker.attack, 0);
    const enemyTotalAttack = enemyInventory.reduce((total, sticker) => total + sticker.attack, 0);

    // Simulate the round
    enemyHealth -= userTotalAttack;
    userHealth -= enemyTotalAttack;

    // Ensure health doesn't go below zero
    if (userHealth < 0) userHealth = 0;
    if (enemyHealth < 0) enemyHealth = 0;

    // Update health bars and text
    userHealthBar.style.width = `${userHealth}%`;
    userHealthText.textContent = `HP: ${userHealth}/100`;
    enemyHealthBar.style.width = `${enemyHealth}%`;
    enemyHealthText.textContent = `HP: ${enemyHealth}/100`;

    // Log the round's events
    const roundLog = document.createElement('div');
    roundLog.classList.add('log-entry');
    roundLog.innerHTML = `You dealt ${userTotalAttack} damage. The enemy dealt ${enemyTotalAttack} damage.`;
    fightLog.appendChild(roundLog);
    fightLog.scrollTop = fightLog.scrollHeight; // Scroll to the bottom

    // Check for a winner
    if (userHealth <= 0) {
        const endLog = document.createElement('div');
        endLog.classList.add('log-entry');
        endLog.innerHTML = "<strong>You have been defeated!</strong>";
        fightLog.appendChild(endLog);
        fightButton.textContent = "Rematch";
        fightButton.disabled = false;
        fightButton.removeEventListener('click', fight);
        fightButton.addEventListener('click', resetFight);
    } else if (enemyHealth <= 0) {
        const coinsWon = 50;
        userCoins += coinsWon;
        coinAmount.textContent = userCoins;
        const endLog = document.createElement('div');
        endLog.classList.add('log-entry');
        endLog.innerHTML = `<strong>You are victorious!</strong> You earned ${coinsWon} coins.`;
        fightLog.appendChild(endLog);
        fightButton.textContent = "Rematch";
        fightButton.disabled = false;
        fightButton.removeEventListener('click', fight);
        fightButton.addEventListener('click', resetFight);
    }
}

function resetFight() {
    userHealth = 100;
    enemyHealth = 100;
    userHealthBar.style.width = '100%';
    userHealthText.textContent = `HP: 100/100`;
    enemyHealthBar.style.width = '100%';
    enemyHealthText.textContent = `HP: 100/100`;
    fightLog.innerHTML = '';
    setupEnemyTeam();
    fightButton.textContent = "Fight!";
    fightButton.removeEventListener('click', resetFight);
    fightButton.addEventListener('click', fight);
}

shopToggleButton.addEventListener('click', () => {
    stickerShop.classList.toggle('collapsed');
});

fightButton.addEventListener('click', fight);

// Start the game using local data
initializeGame();