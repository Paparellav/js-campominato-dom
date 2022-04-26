const playButton = document.querySelector("button");
playButton.addEventListener("click", function () {

    document.getElementById("hidden-title").classList.add("hidden");

    const gridContainer = document.querySelector(".grid-container");
    gridContainer.classList.remove("hidden");
    gridContainer.innerHTML = "";

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

    for (let i = 1; i <= gridBoxes; i++) {

        const gridNumber = i;
        
        //2. Creare un elemento html
        const newElement = document.createElement("div");
        // console.log(newElement);
    
        //3. Aggiungere lo span al div creato pocanzi
        newElement.innerHTML = `<span>${gridNumber}</span>`;
    
        //4. Assegnare la classe grid-box
        if (difficults === "easy") {
            newElement.classList.add("grid-box");
        } else if (difficults === "medium") {
            newElement.classList.add("grid-box2");
        } else if (difficults === "crazy") {
            newElement.classList.add("grid-box3");
        }
        
        // aggiungo all'elmento appena creato la gestione del click
        
        newElement.addEventListener("click", function() {
            this.classList.toggle("active");
        });
    
        // appendo questo elemnto al contenitore
        gridContainer.append(newElement);  
    }
});