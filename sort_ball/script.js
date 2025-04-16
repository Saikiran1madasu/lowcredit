const $reloadBtn = document.querySelector('.reload-btn');
const $box = document.querySelector('.box');
const $allRectangle = document.querySelectorAll('.rectangle');
const $numberOfRectangles = $allRectangle.length - 1;
const $bodyOverlay = document.querySelector('.body-overlay');

let $activeBall = null;
let $score = 0;

$reloadBtn.addEventListener('click', () => {
    location.reload();
});

const chooseBall = (e) => {
    const parent = e.target.parentElement;

    if ($activeBall === null) {
        if (parent.childElementCount > 0 && parent.firstElementChild.classList.contains('ball')) {
            parent.firstElementChild.classList.toggle('ball-active');
            $activeBall = parent.firstElementChild;

            if ($activeBall.classList.contains('ball-error')) {
                $activeBall.classList.remove('ball-error');
            }
        } else if (e.target.classList.contains('rectangle') && e.target.childElementCount > 0) {
            e.target.firstElementChild.classList.toggle('ball-active');
            $activeBall = e.target.firstElementChild;
        }
    } else {
        moveBallToSelectedRectangle(e);
    }
};

const moveBallToSelectedRectangle = (e) => {
    let target = e.target;

    if (target === $activeBall || target === $activeBall.parentElement.children[1] || target === $activeBall.parentElement.children[2]) {
        $activeBall.classList.remove('ball-active');
        $activeBall = null;
    }

    if (target.classList.contains('rectangle') && target.childElementCount < 3 && $activeBall !== null) {
        const el = document.createElement('div');
        el.setAttribute('title', $activeBall.title);
        el.className = $activeBall.className;
        el.classList.remove('ball-active');

        target.prepend(el);
        $activeBall.remove();
        $activeBall = null;
    } else if (target.parentElement.classList.contains('rectangle') && target.parentElement.childElementCount < 3) {
        const el = document.createElement('div');
        el.setAttribute('title', $activeBall.title);
        el.className = $activeBall.className;
        el.classList.remove('ball-active');

        target.parentElement.prepend(el);
        $activeBall.remove();
        $activeBall = null;
    }
};

const checkingSortBalls = () => {
    const colorOfRectangles = [];

    for (const element of $allRectangle) {
        if (element.childElementCount === 3) {
            const titleBall = element.children[1].title;

            if (titleBall === element.firstElementChild.title && titleBall === element.lastElementChild.title) {
                $score++;
                colorOfRectangles.push(titleBall);
            }
        }
        if (colorOfRectangles.length === $numberOfRectangles) {
            $bodyOverlay.style.display = "flex";
        }
    }
};

$box.addEventListener('click', (e) => {
    chooseBall(e);
    checkingSortBalls();
});