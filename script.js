// Oggetto frutti -> codice
const fruits = {
  "ANANAS": 2,
  "ARANCE PREMIUM": 317,
  "AVOCADO HASS (qt.)": 17,
  "BANANE": 1,
  "BANANE BIO FAIRTRADE": 201,
  "CASTAGNE": 74,
  "CAVOLO CAPPUCCIO": 53,
  "CAVOLO CAPPUCCIO A PUNTA": 76,
  "CAVOLFIORI": 77,
  "CETRIOLI": 66,
  "CETRIOLI BARATTIERI": 88,
  "CETRIOLI OLANDESI": 59,
  "FICHI": 24,
  "FINOCCHI": 87,
  "KIWI GREEN": 10,
  "LATTUGA GENTILE": 71,
  "LATTUGA ICEBERG": 263,
  "LIMONI": 5,
  "MANGO (qt.)": 21,
  "MANDARINI": 129,
  "MELAGRANA": 223,
  "MELANZANE": 68,
  "MELANZANE STRIATE": 85,
  "MELE GALA (rosse)": 35,
  "MELE GOLDEN (verdi)": 125,
  "MELONE LISCIO MANTOVANO (no)": 37,
  "MELONE GIALLO": 108,
  "MELONE RETATO": 16,
  "MELONE VERDE": 36,
  "PAPAYA FORMOSA": 332,
  "PATATE DOLCI": 86,
  "PATATE GIALLE SILA IGP (1,5Kg)": 81570,
  "PEPERONE GIALLO": 95,
  "PEPERONE ROSSO": 96,
  "PERE SANTA MARIA": 13,
  "PERE WILLIAMS BIANCHE": 238,
  "PESCHE GIALLE": 244,
  "PESCHE NOCI GIALLE": 222,
  "PESCHE TABACCHIERE": 34,
  "POMODORO COSTOLUTO": 65,
  "POMODORO CUORE DI BUE": 80,
  "POMODORO GRAPPOLO": 255,
  "POMODORO OBLUNGO INSALATARO (48001)": 58,
  "POMPELMO ROSA": 41,
  "RADICCHIO LUNGO PRECOCE": 91,
  "SUSINE NERE": 225,
  "SUSINE OCTOBER SUN": 128,
  "SACCHETTO ORTOFRUTTA": 4,
  "UVA ITALIA IGP (gialla)": 48,
  "UVA RED GLOBE (rossa)": 26,
  "ZENZERO": 200,
  "ZUCCA DELICIA": 293,
  "ZUCCHINE": 60
};

// Popola la tabella nella pagina tabella.html
function populateTable() {
  const tableBody = document.getElementById("fruit-table");
  if (!tableBody) return; // se non siamo in tabella.html esce

  for (let fruit in fruits) {
    const row = document.createElement("tr");
    const codeCell = document.createElement("td");
    codeCell.textContent = fruits[fruit];
    const fruitCell = document.createElement("td");
    fruitCell.textContent = fruit;
    row.appendChild(codeCell);
    row.appendChild(fruitCell);
    tableBody.appendChild(row);
  }
}

// Gestione del gioco nella pagina gioco.html
function setupGame() {
  const startBtn = document.getElementById("start-btn");
  const gameContent = document.getElementById("game-content");
  const fruitNameDiv = document.getElementById("fruit-name");
  const userInput = document.getElementById("user-input");
  const checkBtn = document.getElementById("check-btn");
  const resultDiv = document.getElementById("result");
  const nextBtn = document.getElementById("next-btn");
  const statsDiv = document.getElementById("stats");
  const endScreen = document.getElementById("end-screen");
  const finalStats = document.getElementById("final-stats");
  const restartBtn = document.getElementById("restart-btn");
  const answerSection = document.getElementById("answer-section"); // <<--- qui serviva

  if (!startBtn) return; // se non siamo in gioco.html esce

  let shuffledFruits = [];
  let currentIndex = 0;
  let correctAnswers = 0;

  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  // Avvio gioco
  startBtn.addEventListener("click", () => {
    startBtn.classList.add("hidden");
    endScreen.classList.add("hidden");
    gameContent.classList.remove("hidden");

    shuffledFruits = shuffle(Object.keys(fruits));
    currentIndex = 0;
    correctAnswers = 0;
    showFruit();
  });

  // Mostra il frutto corrente
  function showFruit() {
    if (currentIndex < shuffledFruits.length) {
        fruitNameDiv.innerHTML = `Frutto:  ${shuffledFruits[currentIndex]}<br><br>` + `${currentIndex + 1}/${shuffledFruits.length}`;
        userInput.value = "";
        resultDiv.classList.add("hidden");
        statsDiv.classList.add("hidden");
        nextBtn.classList.add("hidden");
        answerSection.classList.remove("hidden");
    } else {
      endGame();
    }
  }

  // Controllo risposta
  checkBtn.addEventListener("click", () => {
    const currentFruit = shuffledFruits[currentIndex];
    const correctCode = fruits[currentFruit];
    const userCode = parseInt(userInput.value);

    resultDiv.classList.remove("hidden");
    statsDiv.classList.remove("hidden");
    answerSection.classList.add("hidden");

    if (userCode === correctCode) {
      resultDiv.textContent = "Risposta giusta!";
      resultDiv.classList.remove("error");
      resultDiv.classList.add("success");
      correctAnswers++;
    } else {
      resultDiv.textContent = "Risposta sbagliata!";
      resultDiv.classList.remove("success");
      resultDiv.classList.add("error");
    }

    nextBtn.classList.remove("hidden");
    updateStats();
  });

  // Passa al prossimo frutto
  nextBtn.addEventListener("click", () => {
    currentIndex++;
    showFruit();
  });

  // Statistiche dopo ogni risposta
  function updateStats() {
    let fruitName = shuffledFruits[currentIndex]; 
    let lastCorrectCode; 
    if(currentIndex > 0){
        lastCorrectCode = fruits[fruitName];
    }else{
        fruitName = shuffledFruits[0]; 
        lastCorrectCode = fruits[fruitName];
    }

    statsDiv.innerHTML =
        `Codice giusto: ${lastCorrectCode}<br>` +
        `Risposte giuste: ${correctAnswers}<br>` +
        `Percentuale: ${Math.round((correctAnswers / (currentIndex + 1)) * 100) || 0}%<br><br>` 
  }

  // Fine gioco
  function endGame() {
    gameContent.classList.add("hidden");
    endScreen.classList.remove("hidden");
    finalStats.innerHTML =
      `STATISTICHE FINALI:<br><br>` +  `Numero risposte corrette: ${correctAnswers}/${shuffledFruits.length}<br>` +
      `Percentuale risposte corrette: ${Math.round((correctAnswers / shuffledFruits.length) * 100)}%`;
  }

  // Restart
  restartBtn.addEventListener("click", () => {
    endScreen.classList.add("hidden");
    startBtn.classList.remove("hidden");
  });
}