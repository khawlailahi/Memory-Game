document.addEventListener("DOMContentLoaded", () => {

    //our grid for the cards 
    const grid = document.querySelector('.grid')

    //cards that we chose 
    let selectedCards = [];

    //ids of the cards that we chose 
    let selectedCardsId = [];

    //time left element 
    let time = document.querySelector('#time')

    //varibale that will be decreasing as time passes
    let current = time.textContent

    //cards that we won (matched)
    let CardsWon = [];

    //displayed score 
    let score = document.querySelector('#score')

    //time interval varibale
    let timing

    //cards 
    const cards = [{
            name: 'choc',
            img: 'images/choc.png'
        }, {
            name: 'avocado',
            img: 'images/avocado.png'
        }, {
            name: 'donut',
            img: 'images/donut.png'
        }, {
            name: 'fries',
            img: 'images/fries.png'
        }, {
            name: 'pizza',
            img: 'images/pizza.png'
        }, {
            name: 'burger',
            img: 'images/burger.png'
        }, {
            name: 'yogurt',
            img: 'images/yogurt.png'
        }, {
            name: 'avocado',
            img: 'images/avocado.png'
        }, {
            name: 'chips',
            img: 'images/chips.png'
        }, {
            name: 'burger',
            img: 'images/burger.png'
        }, {
            name: 'choc',
            img: 'images/choc.png'
        }, {
            name: 'donut',
            img: 'images/donut.png'
        }, {
            name: 'chips',
            img: 'images/chips.png'
        }, {
            name: 'pizza',
            img: 'images/pizza.png'
        }, {
            name: 'yogurt',
            img: 'images/yogurt.png'
        }, {
            name: 'fries',
            img: 'images/fries.png'
        }, {
            name: 'candy',
            img: 'images/candy.png'
        }, {
            name: 'candy',
            img: 'images/candy.png'
        }

    ];



    //attaching click event on the start button 
    document.querySelector('#start').addEventListener('click', () => {
        document.querySelector('.intro').style.display = "none";
        let img = document.querySelector('#trainimage');
        document.querySelector('.pros').removeChild(img)
        document.querySelector('.wrapper').style.display = "block";
        current = 60;
        timing = setInterval(countdown, 1000);

    });

    //function to refresh game when the player wants to play again
    let exitt = function() {
            current = 60;
            time.textContent = current
                //removing the result pop up 
            document.getElementById('popUpBox').style.display = "none";
            document.getElementById('popUpOverlay').style.display = "none";

            //emptying the grid 
            var node = document.querySelector(".grid");
            node.querySelectorAll('*').forEach(n => n.remove());
            CardsWon = []
            selectedCardsId = []
            selectedCards = []
            score.textContent = CardsWon.length
                //recreating the board after reshuffle of the cards
            createBoard();
            let pic = document.querySelector('#resultpop')
            let button = document.querySelector('#resultpop')
            document.querySelector('#box').removeChild(pic)
            timing = setInterval(countdown, 1000);
        }
        // adding a click ent on the - train more - button to allow player another round 
    var btn = document.querySelector("#train");
    btn.addEventListener('click', exitt)

    // function to check and display the result (when time is up or when player matched all cards)
    function gameOver(status) {



        //displaying the result as a pop up 
        let popUpBox = document.getElementById('popUpBox');
        popUpBox.style.display = "block";
        document.getElementById('popUpOverlay').style.display = "block";
        let el = document.createElement("img");

        // if the player won 
        if (status) {
            document.querySelector('#result').textContent = " 🎉Congratulation!! 🎉"
            document.querySelector('#result1').textContent = " 🎊 You have a Good Memory  🎯"
            document.querySelector('#result2').textContent = "let's train some More! 💪"
                // el.setAttribute('src', "images/champ.jpg");
            el.setAttribute('src', "images/goodbrain.gif");
            el.setAttribute('id', "resultpop");
        }

        //if the player lost 
        else if (!status) {
            document.querySelector('#result').textContent = " ⚠️ Uh Oh! Time is Up ⏱️ "
            document.querySelector('#result1').textContent = "You Lost 😔 but it's okay "
            document.querySelector('#result2').textContent = "let's train some More! 💪"
            el.setAttribute('id', "resultpop");
            el.setAttribute('src', "images/train.gif");
        }
        //image sizing 
        el.style.width = "40%"
        el.style.height = "30%"
        let h1 = document.querySelector('#result2')
        h1.after(el)


    }

    // time counting and checking the result when time is up 
    function countdown() {
        // decreamenting the time and displaying it 
        current--;
        time.textContent = current
            //when time is up 
        if (current === 0) {

            //stoping the clock 
            clearInterval(timing);

            // checking the result
            if (CardsWon.length === cards.length / 2) {
                // winning 
                gameOver(true)
            }
            //losing 
            else gameOver(false)
        }
    }
    // disable click for popup (of result)
    document.getElementById('popUpOverlay').addEventListener('click', (e) => {
        console.log("clicked");
        e.preventDefault();
        return false;
    });


    //creating the board
    function createBoard() {
        // shuffeling the cards randomly 
        cards.sort(() => 0.5 - Math.random())

        for (let i = 0; i < cards.length; i++) {
            // creating and img element and adding it to the grid with a click event listener
            let card = document.createElement('img');
            card.setAttribute('src', 'images/game.jpg');
            card.setAttribute('data-id', i);
            card.addEventListener('click', function() {
                // if the cards are not matching flip back the card 
                if (this.style.opacity !== '0.5') {
                    flipCard(this)
                }
            })
            grid.appendChild(card)
        }
    }

    createBoard()

    function showSnackbar() {
        let snackbarDiv = document.getElementById("snackbar");
        snackbarDiv.classList.add("show");
        setTimeout(function() { snackbarDiv.className = snackbarDiv.className.replace("show", ""); }, 3000);
    }
    //checking for matching cards
    function isMatch() {

        let chosenCards = document.querySelectorAll('img');
        console.log(chosenCards)
            //chosing cards 
        const card1Id = selectedCardsId[0];
        const card2Id = selectedCardsId[1];
        let snackabar = document.getElementById('snackbar');
        // if matching 
        if (selectedCards[0] === selectedCards[1]) {
            showSnackbar();
            document.getElementById('snackbar').classList.remove('wrong');
            document.getElementById('snackbar').classList.add('right');
            document.getElementById('snackbar').innerHTML = "You Got a match! Good Job";
            //document.getElementById('snackbar').appendChild(msg);

            // marking the matching won cards with  lower opacity 
            chosenCards[card1Id].style.opacity = '0.5';
            chosenCards[card2Id].style.opacity = '0.5';

            // adding them to the won cards array
            CardsWon.push(chosenCards)
        } else {

            chosenCards[card2Id].setAttribute('src', "images/game.jpg");
            chosenCards[card1Id].setAttribute('src', "images/game.jpg");
            showSnackbar();
            document.getElementById('snackbar').classList.remove('right');
            document.getElementById('snackbar').classList.add('wrong');
            //let msg = document.createTextNode("");
            document.getElementById('snackbar').innerHTML = "Not a match ! let's try again";


        }
        //emptying the chosen cards and ids arrays 
        selectedCards = []
        selectedCardsId = []
        score.textContent = CardsWon.length
            // if all the cards are won displaying the result 
        if (CardsWon.length === cards.length / 2) {
            gameOver(true)
        }
    }

    //flipping the card 
    function flipCard(that) {
        //getting the id of the clicked card
        let cardId = that.getAttribute('data-id');
        //adding it to the chosen cards array 
        selectedCards.push(cards[cardId].name);

        //if the player started the game start the timing 
        // if (selectedCards.length === 1) {
        //     timing = setInterval(countdown, 1000);
        // }

        selectedCardsId.push(cardId);
        that.setAttribute('src', cards[cardId].img);

        //when the player has chose two cards check for a match 
        if (selectedCards.length === 2) {
            setTimeout(isMatch, 500);

        }
    }




})