let level = 5;
let health = 100;

const levelText = document.getElementById("levelText");
const healthText = document.getElementById("healthText");
const attackBtn = document.getElementById("attackBtn");
const levelBtn = document.getElementById("levelBtn");

function render() {
  levelText.textContent = String(level);
  healthText.textContent = String(health);

  // Optional: stop attacks at 0
  attackBtn.disabled = (health === 0);
  attackBtn.title = health === 0 ? "Health is already 0" : "";
}

attackBtn.addEventListener("click", () => {
  health = Math.max(0, health - 20);
  render();
});

levelBtn.addEventListener("click", () => {
  level += 1;
  render();
});

render();