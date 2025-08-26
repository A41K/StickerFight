// ... existing code ...
const rarityStats = {
    "Common": { min: 5, max: 10, price: 10 },
    "Uncommon": { min: 10, max: 15, price: 25 },
    "Rare": { min: 15, max: 25, price: 50 },
    "Epic": { min: 25, max: 40, price: 100 }
};

const localStickers = [
    { id: 1, name: "2016 Hack Camp", image: "Stickers/2016 Hack Camp.svg", rarity: "Common" },
    { id: 2, name: "2018 Holidays", image: "Stickers/2018 Holidays.svg", rarity: "Common" },
    { id: 3, name: "2020 Progress", image: "Stickers/2020 Progress.png", rarity: "Uncommon" },
    { id: 4, name: "2020 Storm The Hack", image: "Stickers/2020 Storm The Hack.png", rarity: "Rare" },
    { id: 5, name: "2021 Design Awards", image: "Stickers/2021 Design Awards.png", rarity: "Rare" },
    { id: 6, name: "2025 Summer of Making", image: "Stickers/2025 Summer of Making.png", rarity: "Epic" },
    { id: 7, name: "AI Safety Campfire", image: "Stickers/AI Safety Campfire.png", rarity: "Uncommon" },
    { id: 8, name: "AI Safety Meme", image: "Stickers/AI Safety Meme.png", rarity: "Common" },
    { id: 9, name: "Adobe", image: "Stickers/Adobe.svg", rarity: "Rare" },
    { id: 10, name: "Airlines", image: "Stickers/Airlines.png", rarity: "Uncommon" },
    { id: 11, name: "All Fun Javascript", image: "Stickers/All Fun Javascript.svg", rarity: "Common" },
    { id: 12, name: "Anxiety", image: "Stickers/Anxiety.png", rarity: "Common" },
    { id: 13, name: "Apocalypse", image: "Stickers/Apocalypse.png", rarity: "Rare" },
    { id: 14, name: "Arcade", image: "Stickers/Arcade.png", rarity: "Uncommon" },
    { id: 15, name: "Arrpheus", image: "Stickers/Arrpheus.png", rarity: "Epic" },
    { id: 16, name: "Assemble", image: "Stickers/Assemble.svg", rarity: "Rare" },
    { id: 17, name: "Athena Award Bow", image: "Stickers/Athena Award Bow.png", rarity: "Epic" },
    { id: 18, name: "Athena Award Orpheus", image: "Stickers/Athena Award Orpheus.png", rarity: "Epic" },
    { id: 19, name: "Athena Black", image: "Stickers/Athena Black.png", rarity: "Uncommon" },
    { id: 20, name: "Athena Sparkles", image: "Stickers/Athena Sparkles.png", rarity: "Rare" }
];

let stickers = [];
let userInventory = [];
// ... existing code ...