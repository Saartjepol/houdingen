let hunger = 100;
let thirst = 100;
let happiness = 100;
let duckName = localStorage.getItem("duckName") || null;

const hungerEl = document.getElementById("hunger");
const thirstEl = document.getElementById("thirst");
const happinessEl = document.getElementById("happiness");
const duckImg = document.getElementById("duck");
const statusMsg = document.getElementById("statusMessage");

function updateStats() {
  hungerEl.textContent = hunger;
  thirstEl.textContent = thirst;
  happinessEl.textContent = happiness;


  

  if (hunger <= 0 || thirst <= 0) {
    duckImg.src = "images/dead.jpg";
    statusMsg.textContent = `${duckName || "Je eend"} is overleden 💀`;
    document.getElementById("gameOverSound").play();
    clearInterval(gameLoop);
    return;
  }

  
  if (hunger < 30 && thirst < 30) {
    statusMsg.textContent = `${duckName || "Je eend"} is hongerig én dorstig `;
    duckImg.src = "images/sad.jpg";
  } else if (hunger < 30) {
    statusMsg.textContent = `${duckName || "Je eend"} heeft veel trek `;
    duckImg.src = "images/sad.jpg";
  } else if (thirst < 30) {
    statusMsg.textContent = `${duckName || "Je eend"} wil dringend water `;
    duckImg.src = "images/thirsty.jpg";
  } else if (happiness < 25) {
    statusMsg.textContent = `${duckName || "Je eend"} voelt zich alleen `;
    duckImg.src = "iamges/sad.jpg";
  } else if (happiness < 50) {
    statusMsg.textContent = `${duckName || "Je eend"} wil wat aandacht `;
    duckImg.src = "images/sad.jpg";
  } else if (hunger > 80 && thirst > 80 && happiness > 80) {
    statusMsg.textContent = `${duckName || "Je eend"} is dolgelukkig `;
    duckImg.src = "images/happy.jpg";
  } else {
    statusMsg.textContent = `${duckName || "Je eend"} kijkt rustig rond `;
    duckImg.src = "images/happy.jpg";
  }
}

function feedDuck() {
  hunger = Math.min(hunger + 20, 100);
  happiness = Math.min(happiness + 5, 100);
  document.getElementById("eatSound").play();
  updateStats();
}

function giveWater() {
  thirst = Math.min(thirst + 20, 100);
  happiness = Math.min(happiness + 3, 100);
  document.getElementById("drinkSound").play();
  updateStats();
}

function petDuck() {
  happiness = Math.min(happiness + 10, 100);
  document.getElementById("petSound").play();
  updateStats();
}

function setDuckName() {
  const input = document.getElementById("nameInput").value.trim();
  if (input) {
    duckName = input;
    localStorage.setItem("duckName", duckName);
    document.getElementById("duckNameTitle").textContent = duckName;
    document.getElementById("nameInputArea").style.display = "none";
  }
}

function resetDuckName() {
  localStorage.removeItem("duckName");
  location.reload();
}

if (duckName) {
  document.getElementById("duckNameTitle").textContent = duckName;
  document.getElementById("nameInputArea").style.display = "none";
}


const gameLoop = setInterval(() => {
  hunger = Math.max(hunger - 3, 0);
  thirst = Math.max(thirst - 4, 0);
  happiness = Math.max(happiness - 2, 0);
  updateStats();
}, 3000);

updateStats();
