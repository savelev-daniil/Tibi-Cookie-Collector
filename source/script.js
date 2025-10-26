const player = document.getElementById('player'); // Player element
const itemsContainer = document.getElementById('game-field'); // Container for game items
let itemCount = 3; // Initial number of items on screen

const scoreElement = document.getElementById('score'); // Score display element
let score = 0; // Current score

// Creates a new item (cookie) on the game field
function createNewItem() {
  const newItem = document.createElement('div');
  newItem.classList.add('item');
  itemsContainer.appendChild(newItem);
  randomizeItemPosition(newItem);
}

// Places an item at a random position within the game field
function randomizeItemPosition(item) {
  const fieldWidth = itemsContainer.clientWidth;
  const fieldHeight = itemsContainer.clientHeight;
  const x = getRandomInt(20, fieldWidth - 40);
  const y = getRandomInt(20, fieldHeight - 40);
  item.style.left = `${x}px`;
  item.style.top = `${y}px`;
}

// Returns a random integer within the specified range
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Create initial items on the field
for (let i = 0; i < itemCount; i++) {
  createNewItem();
}

// Mouse move event handler — moves the player element following the cursor
document.addEventListener('mousemove', (e) => {
  const x = e.clientX;
  const y = e.clientY;
  player.style.transform = `translate(${x - 25}px, ${y - 25}px)`;
});

// Game loop (runs every 100ms): checks collisions and maintains item count
setInterval(() => {
  const items = document.querySelectorAll('.item');

  // Check for collisions between player and items
  items.forEach(item => {
    const playerRect = player.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();

    // Check if rectangles overlap (collision detection)
    if (
      playerRect.left < itemRect.right &&
      playerRect.right > itemRect.left &&
      playerRect.top < itemRect.bottom &&
      playerRect.bottom > itemRect.top
    ) {
      item.remove(); // Remove collected item
      score++; // Increment score
      scoreElement.textContent = score; // Update score display
    }
  });

  // If there are fewer items than required, create a new one
  if (document.querySelectorAll('.item').length < itemCount) {
    createNewItem();
  }
}, 100);