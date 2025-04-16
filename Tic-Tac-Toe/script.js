document.addEventListener('DOMContentLoaded', () => {
    let boxes = document.querySelectorAll('.box');
    let resetBtn = document.querySelector('#reset');
    let newGameBtn = document.querySelector('#new-btn');
    let turnO = true;
    let isMachineMode = false;
    let turnIndicator = document.createElement('h2');
    let friendModeBtn = document.querySelector('#friend-mode');
    let machineModeBtn = document.querySelector('#machine-mode');
    let msgContainer = document.querySelector('.msg-container');
    let msg = document.querySelector('#msg');

    document.body.insertBefore(turnIndicator, document.querySelector('main'));

    const winPatterns = [
        [0, 1, 2], [0, 3, 6], [0, 4, 8], [1, 4, 7], [2, 5, 8],
        [2, 4, 6], [3, 4, 5], [6, 7, 8]
    ];

    const updateTurnIndicator = () => {
        turnIndicator.innerText = turnO 
            ? "Player 1's turn (O)" 
            : isMachineMode 
                ? "AI is thinking..." 
                : "Player 2's turn (X)";
    };

    friendModeBtn.addEventListener('click', () => {
        isMachineMode = false;
        friendModeBtn.classList.add('active');
        machineModeBtn.classList.remove('active');
        resetGame();
    });

    machineModeBtn.addEventListener('click', () => {
        isMachineMode = true;
        machineModeBtn.classList.add('active');
        friendModeBtn.classList.remove('active');
        resetGame();
    });

    const checkWinner = () => {
        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (boxes[a].innerText && 
                boxes[a].innerText === boxes[b].innerText && 
                boxes[b].innerText === boxes[c].innerText) {
                showWinner(boxes[a].innerText);
                return;
            }
        }

        if ([...boxes].every(box => box.innerText)) {
            msg.innerText = 'Match Drawn';
            msgContainer.classList.remove('hide');
            turnIndicator.innerText = "Game Over!";
        }
    };

    const showWinner = (winner) => {
        msg.innerText = `Congratulations, Winner is ${winner}`;
        msgContainer.classList.remove('hide');
        turnIndicator.innerText = "Game Over!";
        boxes.forEach(box => box.disabled = true);
    };

    const resetGame = () => {
        turnO = true;
        boxes.forEach(box => {
            box.disabled = false;
            box.innerText = "";
        });
        msgContainer.classList.add('hide');
        turnIndicator.innerText = "Player 1's turn (O)";
    };

    boxes.forEach(box => {
        box.addEventListener('click', () => {
            if (!box.innerText && msgContainer.classList.contains('hide')) {
                box.innerText = turnO ? 'O' : 'X';
                box.style.color = turnO ? 'blue' : 'red';
                turnO = !turnO;
                box.disabled = true;

                checkWinner();
                if (isMachineMode && !turnO && msgContainer.classList.contains('hide')) {
                    setTimeout(machineMove, 500);
                }
                updateTurnIndicator();
            }
        });
    });

    const machineMove = () => {
        let availableBoxes = [...boxes].filter(box => !box.innerText);
        if (availableBoxes.length === 0) return;

        availableBoxes[Math.floor(Math.random() * availableBoxes.length)].innerText = 'X';
        turnO = true;
        checkWinner();
        updateTurnIndicator();
    };

    resetBtn.addEventListener('click', resetGame);
    newGameBtn.addEventListener('click', resetGame);

    updateTurnIndicator();
});