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
const shopToggle = document.getElementById('shop-toggle');
const stickerListContainer = document.getElementById('sticker-list-container');

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
    { name: 'Athena Award Orpheus', url: 'Stickers/Athena Award Orpheus.png' },
    { name: 'Athena Black', url: 'Stickers/Athena Black.png' },
    { name: 'Athena Sparkles', url: 'Stickers/Athena Sparkles.png' },
    { name: 'Black Lives Matter', url: 'Stickers/Black Lives Matter.svg' },
    { name: 'Blot Robot', url: 'Stickers/Blot Robot.png' },
    { name: 'Blot', url: 'Stickers/Blot.png' },
    { name: 'Boba Drops', url: 'Stickers/Boba Drops.png' },
    { name: 'Bottle Caps', url: 'Stickers/Bottle Caps.png' },
    { name: 'Burst', url: 'Stickers/Burst.png' },
    { name: 'CAC', url: 'Stickers/CAC.png' },
    { name: 'Cascade', url: 'Stickers/Cascade.png' },
    { name: 'Cerberus on Laptop', url: 'Stickers/Cerberus on Laptop.png' },
    { name: 'Drake', url: 'Stickers/Drake.svg' },
    { name: 'Duck on Boat', url: 'Stickers/Duck on Boat.png' },
    { name: 'Emergency Meeting', url: 'Stickers/Emergency Meeting.svg' },
    { name: 'Epoch Among Us', url: 'Stickers/Epoch Among Us.png' },
    { name: 'Epoch Bubbly', url: 'Stickers/Epoch Bubbly.png' },
    { name: 'Epoch H', url: 'Stickers/Epoch H.png' },
    { name: 'Epoch', url: 'Stickers/Epoch.png' },
    { name: 'FIRST Co-Branded No Ears', url: 'Stickers/FIRST Co-Branded No Ears.png' },
    { name: 'Find Out', url: 'Stickers/Find Out.png' },
    { name: 'Friends', url: 'Stickers/Friends.svg' },
    { name: 'From Myth to Mainframe', url: 'Stickers/From Myth to Mainframe.png' },
    { name: 'Game Lab Flask', url: 'Stickers/Game Lab Flask.png' },
    { name: 'Game Lab', url: 'Stickers/Game Lab.png' },
    { name: 'Grab', url: 'Stickers/Grab.png' },
    { name: 'Hack Club HQ', url: 'Stickers/Hack Club HQ.png' },
    { name: 'Hack Cola', url: 'Stickers/Hack Cola.svg' }
];

let userInventory = [];
let enemyInventory = [];
let allStickers = [];
let selectedStickers = [];
let userCoins = 100;
let userHealth = 100;
let enemyHealth = 100;

shopToggle.addEventListener('click', () => {
    const isVisible = stickerListContainer.style.display !== 'none';
    stickerListContainer.style.display = isVisible ? 'none' : 'block';
});

function getRandomStat(min = 1, max = 5) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
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
        attack: getRandomStat(),
        defense: getRandomStat(),
        intelligence: 1
    }));
    modal.style.display = 'none';
    displayStickers(allStickers.map(s => ({ ...s, price: 50 }))); // Add price to shop stickers
    updateInventoryDisplay();
    setupEnemyTeam();
});


function displayStickers(stickers) {
    stickerList.innerHTML = '';
    stickers.forEach(sticker => {
        const stickerElement = createStickerElement(sticker);
        stickerElement.innerHTML += `<button class="buy-button" data-name="${sticker.name}">Buy (50)</button>`;
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
        attack: getRandomStat(),
        defense: getRandomStat(),
        intelligence: 1
    });
    updateInventoryDisplay();
}

function buySticker(stickerName) {
    const stickerToBuy = allStickers.find(s => s.name === stickerName);
    const price = 50; // All stickers cost 50 for now

    if (userCoins >= price && userInventory.length < 5) {
        userCoins -= price;
        coinAmount.textContent = userCoins;
        addStickerToInventory(stickerToBuy);
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
    userFighters.innerHTML = '<h3>Your Team</h3>';

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

function upgradeSticker(index) {
    const sticker = userInventory[index];
    const cost = sticker.level * 10;

    if (userCoins >= cost) {
        userCoins -= cost;
        sticker.level++;
        sticker.attack += getRandomStat(1, 3);
        sticker.defense += getRandomStat(1, 3);
        coinAmount.textContent = userCoins;
        updateInventoryDisplay();
    } else {
        alert("Not enough coins to upgrade!");
    }
}

inventoryList.addEventListener('click', function(event) {
    if (event.target.classList.contains('upgrade-button')) {
        const index = event.target.dataset.index;
        upgradeSticker(index);
    }
});

function setupEnemyTeam() {
    const shuffled = [...allStickers].sort(() => 0.5 - Math.random());
    const enemyTeam = shuffled.slice(0, 5);

    enemyInventory = enemyTeam.map(sticker => ({
        ...sticker,
        level: 1,
        attack: getRandomStat(),
        defense: getRandomStat(),
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
    userHealthText.textContent = `${userHealth}/100`;
    enemyHealthBar.style.width = `${enemyHealth}%`;
    enemyHealthText.textContent = `${enemyHealth}/100`;

    // Log the round's events
    let roundLog = `You dealt ${userTotalAttack} damage. The enemy dealt ${enemyTotalAttack} damage.<br>`;
    fightLog.innerHTML = `<p>${roundLog}</p>`;

    // Check for a winner
    if (userHealth <= 0) {
        fightLog.innerHTML += "<p><strong>You have been defeated!</strong></p>";
        fightButton.disabled = true;
    } else if (enemyHealth <= 0) {
        const coinsWon = 50;
        userCoins += coinsWon;
        coinAmount.textContent = userCoins;
        fightLog.innerHTML += `<p><strong>You are victorious!</strong> You earned ${coinsWon} coins.</p>`;
        fightButton.disabled = true;
    }
}

fightButton.addEventListener('click', fight);

// Start the game using local data
initializeGame();