//1. Al click del bottone Play deve partire il gioco [*];
//2. Nascondere la scritta con la classe hidden [*];
//3. Far vedere il container-grid rimuovendo la classe hidden [*];
//4. Prelevare la scelta difficoltà dell'utente, salvare il numero delle celle all'interno di una variabile gridBoxes [*];
//5. Generare 16 numeri casuali non ripetuti compresi tra 1 e gridBoxes [];
//6. Generare le celle da 1 a gridBoxes in base alla difficoltà. Per ogni cella:
    // - creare l'elemento HTML [*];
    // - aggiungere la classe grid-box [*];
    // - inserire lo span con il numero corrispondente [*];
    // - appendere la cella generata al container [*];

//7. Al click di una delle celle []:
    // Se il numero della cella è presente nell'array delle bombe:
        // La cella si colora di rosso
        // Stampare il punteggio (numero di tentativi corretti)
        // Fine gioco
    //Altrimenti:
        // La cella si colora di azzurro
        // Il numero della cella viene salvato nell'array di numeri corretti
        // Se la lunghezza dell'array di numeri corretti è uguale ai tentativi massimi:
            // L'utente ha vinto

let selectedCells = [];

const playButton = document.querySelector("button");
playButton.addEventListener("click", function () {

    document.getElementById("hidden-title").classList.add("hidden");

    const gridContainer = document.querySelector(".grid-container");
    gridContainer.classList.remove("hidden");
    gridContainer.innerHTML = "";
    const resultText = document.getElementById("result");
    resultText.innerHTML = "";
    gridContainer.style.pointerEvents = "initial";
    selectedCells = [];

    const difficults = document.getElementById("difficolta").value;
    console.log(difficults);

    let gridBoxes = 0;
    if (difficults === "easy") {
        gridBoxes = 100;
    } else if (difficults === "medium") {
        gridBoxes = 81;
    } else if (difficults === "crazy") {
        gridBoxes = 49;
    }

    const bombsNumber = 16;
    const bombsArray = generateRndNumbers(bombsNumber, gridBoxes);
    console.log(bombsArray);
    const attempts = gridBoxes - bombsNumber;

    const bombBoxes = document.getElementsByClassName("bomb-box");
    for (let i = 1; i <= gridBoxes; i++) {

        const gridNumber = i;
        
        const newElement = document.createElement("div");
        
        newElement.innerHTML = `<span>${gridNumber}</span>`;
    
        if (difficults === "easy") {
            newElement.classList.add("grid-box");
        } else if (difficults === "medium") {
            newElement.classList.add("grid-box2");
        } else if (difficults === "crazy") {
            newElement.classList.add("grid-box3");
        }
        
        newElement.addEventListener("click", function() {

            const selectedNumber = parseInt(this.querySelector("span").textContent);

            if (bombsArray.includes(selectedNumber)) {
                this.classList.add("bomb-box");
                const result = document.getElementById("result");
                result.classList.remove("hidden");
                result.innerHTML = `Hai perso cojone! Il tuo punteggio è: ${selectedCells.length}`;
                gridContainer.style.pointerEvents = "none";
            } else {  
                this.classList.add("active");
                selectedCells.push(selectedNumber);
                this.style.pointerEvents = "none";
                if (selectedCells.length >= attempts ) {
                    const result = document.getElementById("result");
                    result.classList.remove("hidden");
                    result.innerHTML = `Hai vinto!`;
                }
            }

            // console.log(selectedCells);
        });

        gridContainer.append(newElement);
    }
});


// FUNCTIONS
/**
 * Description -> Generare numeri random non ripetuti
 * @param {any} numberOfBombs -> Quantità di numeri random da generare (bombsNumber)
 * @param {any} numbersRange -> Range di numeri da generare (da 1 a gridBoxes)
 * @returns {any} -> Array di bombe
 */
function generateRndNumbers (numberOfBombs, numbersRange) {
    const bombsArray = [];
    while (bombsArray.length < 16) {
        const randomNumber = getRndInteger(numberOfBombs, numbersRange);
        if (!bombsArray.includes(randomNumber)) {
            bombsArray.push(randomNumber);
        }
    }
    
    return bombsArray;
}

function getRndInteger (min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}