window.onload = function(){
    let alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

    let catagories; // Array of topics
    let chosenCategory; // Selected catagory
    // let getHint; // Word getHint
    let word; // Selected word
    let guess; // Guess
    let guesses = [ ]; // Stored guesses
    let lives; // Lives
    let counter; // Count correct guesses
    let space; // Number of space in word '-'

    let showLives = document.getElementById("mylives");
    let showCatagory = document.getElementById("catagory");            // SS
    let getHint = document.getElementById("hint");
    let showClue = document.getElementById("clue");

    // create alphabet ul
    let buttons = function(){
        myButtons = document.getElementById("buttons");
        letters = document.createElement("ul");
        
        for(let i =0; i <alphabet.length; i++){
            letters.id = 'alphabet';
            list = document.createElement('li');
            list.id = 'letter';
            list.innerHTML = alphabet[i];
            check();
            myButtons.appendChild(letters);
            letters.appendChild(list);
        }
    }

    // Select Catagory
    let selctCat = function(){
        if(chosenCategory === catagories[0]){
            catagoryName.innerHTML = "The Chosen Catagory Is Premier League Folltball Teams";
        }else if(chosenCategory === catagories[1]){
            catagoryName.innerHTML = "The Chosen Catagory Is Films";
        }else if(chosenCategory === catagories[2]){
            catagoryName.innerHTML = "The Chosen Catagory Is Cities";
        }
    }

    // Create guesses ul
    result = function(){
        wordHolder = document.getElementById("hold");
        correct = document.createElement("ul");

        for(let i =0; i <word.length; i++){
            correct.setAttribute('id', 'my-word');
            guess = document.createElement('li');
            guess.setAttribute('class', 'guess');

            if(word[i] === "-"){
                guess.innerHTML = "-";
                space = 1;
            }else{
                guess.innerHTML = "-";
            }

            guesses.push(guess);
            wordHolder.appendChild(correct);
            correct.appendChild(guess);
        }
    }

    // Show lives
    comments = function(){
        showLives.innerHTML = "You have " + lives + " lives";

        if(lives <1){
            showLives.innerHTML = "Game Over";
        }

        for(let i =0; i <guesses.length; i++){
            if(counter + space === guesses.length){
                showLives.innerHTML = "You Win!";
            }
        }
    }

    // Animate man
    let animate = function(){
        let drawMe = lives;
        drawArray[drawMe]();
    }

    // Hangman
    canvas = function(){
        myStickman = document.getElementById("stickman");
        context = myStickman.getContext('2d');
        context.beginPath();
        context.strokeStyle = "#fff";
        context.lineWidth = 2;
    };

    head = function(){
        myStickman = document.getElementById("stickman");
        context = myStickman.getContext('2d');
        context.beginPath();
        context.arc(60, 25, 10, 0, Math.PI*2, true);
        context.stroke();
    }

    draw = function($pathFromx, $pathFromy, $pathTox, $pathToy){
        context.moveTo($pathFromx, $pathFromy);
        context.lineTo($pathTox, $pathToy);
        context.stroke();
    }

    frame1 = function(){
        draw(0, 150, 150, 150);
    };
    frame2 = function(){
        draw(10, 0, 10, 600);
    };
    frame3 = function(){
        draw(0, 5, 70, 5);
    };
    frame4 = function(){
        draw(60, 5, 60, 15);
    };

    torso = function(){
        draw(60, 36, 60, 70);
    };

    rightArm = function(){
        draw(60, 46, 100, 50);
    };
    leftArm = function(){
        draw(60, 46, 20, 50);
    };
    rightLeg = function(){
        draw(60, 70, 100, 100);
    };
    leftLeg = function(){
        draw(60, 70, 20, 100);
    };

    drawArray = [rightLeg, leftLeg, rightArm, leftArm, torso, head, frame4, frame3, frame2, frame1];

    // OnClick Function
    check = function(){
        list.onclick = function(){
            let guess = (this.innerHTML);
        
            this.setAttribute("class", "active");
            this.onclick = null;

            for(let i =0; i<word.length; i++){
                if(word[i] === guess){
                    guesses[i].innerHTML = guess;
                    counter += 1;
                }
            }

            let j = (word.indexOf(guess));

            if(j === -1){
                lives -= 1;
                comments();
                animate();
            }else{
                comments();
            }
        }
    }

    // Play
    play = function(){
        catagories = [
            ["everton", "liverpool", "swansea", "chelsea", "hull", "manchester-city", "newcastle-united"],
            ["alien", "dirty-harry", "gladiator", "finding-nemo", "jaws"],
            ["manchester", "milan", "madrid", "amsterdam", "prague"]
        ];

        chosenCategory = catagories[Math.floor(Math.random() * catagories.length)];
        word = chosenCategory[Math.floor(Math.random() * chosenCategory.length)];
        word = word.replace(/\s/g, "-");
        console.log(word);
        buttons();
        guesses = [ ];
        lives = 10;
        counter = 0;
        space = 0;
        result();
        comments();

        // selectCat();
        canvas();
    }
    
    play();

    // Hint
    hint.onclick = function(){
        hints = [
            ["Based in Mersyside", "Based in Mersyside", "First Welsh team to reach the Premier League",
            "Owned by a russian Billionaire", "Once manage by Phil Brown", "2013 FA Cup runners up", "Gazza's first club"],
            ["Science-Fiction horror film", "1971 American action film", "Historical drama", "Animated Fish", "Giant great white shark"],
            ["Northern city in the UK", "Home of AC and Inter", "Spanish capital", "Netherlands capital", "Czech Republic capital"]
        ];

        let catagoryIndex = catagories.indexOf(chosenCategory);
        let hintIndex = chosenCategory.indexOf(word);
        showClue.innerHTML = "Clue: - " + hints [catagoryIndex][hintIndex];
    }

    // Reset
    document.getElementById('reset').onclick = function(){
        correct.parentNode.removeChild(correct);
        letters.parentNode.removeChild(letters);
        showClue.innerHTML = "";
        context.clearRect(0, 0, 400, 400);
        play();
    }
}
