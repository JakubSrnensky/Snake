
    //lisener
    document.addEventListener('keydown', keyPush);
    

    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");

    let buttonPlay = document.getElementById("button");

    //snake
    const snakeHead = 30;
    const foodSize = 20;
    let snakeSpeed = snakeHead;
    let snakePositionX = snakeHead * 9;
    let snakePositionY = snakeHead * 15;
    let velocityX = 0
    let velocityY = -1;

    //snake tail
    let tail = [];
    let tailLength = 1;

    //score
    let score = document.getElementById("score");
    let scoreNumber = 0;

    let gameIsRunning = true;;

    //dead
    let deadField = document.getElementById("dead");


    //gameover
    function gameOver(){
        deadField.classList.add("show");
        buttonPlay.classList.add("show");
        stopGame();
        gameIsRunning = false;
    }

    // papu
    let foodPositionX = 0;
    let foodPositionY = 0;
    
    function resetFood(){
        foodPositionX = Math.floor(Math.random()*11)*snakeHead;
        foodPositionY = Math.floor(Math.random()*11)*snakeHead;
    }
    resetFood();

    //vykreslení všehomíra
    function drawAll(){
        draw("#493362", 0, 0, canvas.width, canvas.height); // pozadí bílé
        collisionFood(); // kolize papu

        // tail
		tail.forEach((snakePart) =>
			draw("#F9868E", snakePart.x, snakePart.y, snakeHead, snakeHead)
		);

        draw("#F76470", snakePositionX, snakePositionY, snakeHead, snakeHead, 100, 75, 50, 0, 2 * Math.PI); // snake
    }

    function draw(color, x, y, width, height){
        ctx.fillStyle = color;
        ctx.fillRect(x, y, width, height)
    }

    //hrajeme si
    function moveSnake(){
        snakePositionX += snakeSpeed * velocityX;
        snakePositionY += snakeSpeed * velocityY;
        collisionWall(); // kolize zdi    
       
        
        tail.forEach((snakePart) => {
			if (snakePart.x === snakePositionX && snakePart.y === snakePositionY) {
				gameOver();
			}
		});

    // tail
    tail.push({ x: snakePositionX, y: snakePositionY });

    // forget earliest parts of snake
    tail = tail.slice(-1 * tailLength);

    }

    // kolize Wall
    function collisionWall(){
        if( snakePositionX < 0){
            gameOver();
        }
       
        if( snakePositionX > canvas.width - snakeHead){
            gameOver();
        }

        if( snakePositionY < 0){
            gameOver();
        }
        
        if( snakePositionY > canvas.height - snakeHead){
            gameOver();
        }

    }

    //požírání jídla hadem
    function collisionFood(){
       draw("#00D9D9", foodPositionX + 5, foodPositionY + 5, foodSize, foodSize);
        if(snakePositionX === foodPositionX && snakePositionY === foodPositionY){
            resetFood();
            tailLength++;
            score.textContent = ++scoreNumber;
        }   
    }

    // stopne hru (enter)
    function stopGame(){
        velocityX = 0;
        velocityY = 0;
    }


    function keyPush(event){
            switch(event.key){
                case "ArrowUp":
                    if( velocityY !== 1){
                        velocityY = -1;
                        velocityX = 0;
                    }
                    break;
                case "ArrowDown":
                    if( velocityY !== -1){
                        velocityY = 1;
                        velocityX = 0;
                    }
                    break;
                case "ArrowLeft":
                    if( velocityX !== 1){
                        velocityX = -1;
                        velocityY = 0;
                    }
                    break;
                case "ArrowRight":
                    if( velocityX !== -1){
                        velocityX = 1;
                        velocityY = 0;
                    }
                    break;
                case "Enter":
                if (!gameIsRunning) location.reload();
                    break;
                default:
                    break;
            }
        }

        
    function playAgain(){
        if (!gameIsRunning) location.reload();
    };

        function gameLoop(){
            if (gameIsRunning) {  
                drawAll();
                moveSnake();
			    setTimeout(gameLoop, 1500 / 15);
		    }
    }

    gameLoop();
