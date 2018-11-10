const data = [
    {
        question: 'Bacon or Kevin Bacon?',
        images: [
            'https://baconmockup.com/1240/775/',
            'https://static.parade.com/wp-content/uploads/2016/05/KevinBacon-FTR.jpg',
        ],
        buttonLabels: [
            'Bacon!',
            'Kevin Bacon!'
        ],
    },
    {
        question: 'Fig Newton or Olivia Newton John?',
        images: [
            'https://upload.wikimedia.org/wikipedia/commons/c/c9/Fig-Newtons-Stacked.jpg',
            'https://upload.wikimedia.org/wikipedia/commons/5/5e/Olivia_Newton_John_%286707495311%29_%28cropped_to_look_large%29.jpg'
        ],
        buttonLabels: [
            'Fig Newton!',
            'Olivia Newton John!'
        ],
    },
    {
        question: 'Raspberry or Halle Berry?',
        images: [
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5lJzqAHeZV1snPQDJF7X6BFdQx3ARa0sKDlIaVrjW36PL-LID1Q',
            'https://upload.wikimedia.org/wikipedia/commons/f/f8/Halle_Berry_10.jpg'
        ],
        buttonLabels: [
            'Raspberry!',
            'Halle Berry!'
        ],
    },
    {
        question: 'Brie or Brie Larson?',
        images: [
            'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Brie_1.jpg/640px-Brie_1.jpg',
            'https://upload.wikimedia.org/wikipedia/commons/6/64/Brie_Larson_%28cropped%29.jpg'
        ],
        buttonLabels: [
            'Brie!',
            'Brie Larson!'
        ],
    },
    {
        question: 'Carrot or Carrot Top?',
        images: [
            'http://res.publicdomainfiles.com/pdf_view/66/13920250219615.png',
            'https://upload.wikimedia.org/wikipedia/commons/8/8a/CarrotTop.jpg'
        ],
        buttonLabels: [
            'Carrot!',
            'Carrot Top!'
        ],
    },
    {
        question: 'Sugar or Sugar Ray Leonard?',
        images: [
            'https://c1.staticflickr.com/4/3002/2452033439_f2624766aa_b.jpg',
            'https://upload.wikimedia.org/wikipedia/commons/8/86/Sugar_Ray_Leonard.png'
        ],
        buttonLabels: [
            'Sugar!',
            'Sugar Ray Leonard!'
        ],
    },
    {
        question: 'Kidney Bean or Sean Bean?',
        images: [
            'https://upload.wikimedia.org/wikipedia/commons/0/0e/Reniform_kidney_bean_seeds.jpg',
            'https://c1.staticflickr.com/6/5464/9872004645_8dd05de1e5_b.jpg'
        ],
        buttonLabels: [
            'Kidney Bean!',
            'Sean Bean!'
        ],
    },
    {
        question: 'Ice or Vanilla Ice?',
        images: [
            'https://c1.staticflickr.com/4/3280/2591108804_194476beed_b.jpg',
            'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Vanilla_Ice_-_Too_Cold..._Too_Cold..._%285076391518%29.jpg/382px-Vanilla_Ice_-_Too_Cold..._Too_Cold..._%285076391518%29.jpg'
        ],
        buttonLabels: [
            'Ice!',
            'Vanilla Ice!'
        ],
    }
];

$(document).ready(() => {

    const $button1 = $('#choice1');
    const $button2 = $('#choice2');
    const $card = $('#card');
    const $cardBack = $('#card div.back');
    const $messageArea = $('div.message-area');
    const $questionArea = $('h4.question');
    let correctNumber = 0;

    function generateCard(imageSrc) {
        $cardBack.empty();
        const $imgBack = $('<img>', {
            class: 'img-fluid card card-back',
            src: imageSrc
        });
        $cardBack.append($imgBack);
    }

    function showMessage(message, isGood) {
        $messageArea.removeClass('bg-transparent');
        $messageArea.text(message);
        $messageArea.addClass(isGood ? 'good' : 'bad');
    }

    function clearMessage() {
        $messageArea.removeClass('good bad');
        $messageArea.text('');
        $messageArea.addClass('bg-transparent');
    }

    function genRandomNumber(min, max) {
        return Math.floor(Math.random() * max) + min;
    }

    function makeRandomCard() {
        const cardType = genRandomNumber(0, data.length);
        const pairing = data[cardType];
        const foodImage = pairing.images[0];
        const celebImage = pairing.images[1];
        $questionArea.text(pairing.question);
        $button1.text(pairing.buttonLabels[0]);
        $button2.text(pairing.buttonLabels[1]);

        correctNumber = genRandomNumber(1, 2);
        if (correctNumber === 1) {
            generateCard(foodImage);
        } else {
            generateCard(celebImage);
        }
    }

    function disableButtons() {
        $button1.prop('disabled', true);
        $button2.prop('disabled', true);
    }

    function enableButtons() {
        $button1.prop('disabled', false);
        $button2.prop('disabled', false);
    }

    $card.flip({
        trigger: 'manual'
    });

    makeRandomCard();

    function handleClick (event) {
        $card.flip(true);
        disableButtons();
        const choice = event.target.id[event.target.id.length - 1];
        if (parseInt(choice) === correctNumber) {
            showMessage('You chose well!', true);
        } else {
            showMessage('You chose poorly', false);
        }
        setTimeout(() => {
            clearMessage();
            $card.flip(false);
            setTimeout(() => {
                makeRandomCard();
                enableButtons();
            }, 500);            
        }, 1500);
    }

    $button1.click(handleClick);
    $button2.click(handleClick);

});
