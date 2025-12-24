const gameData = [
    { emoji: "🍎", word: "Apple" },
    { emoji: "🐶", word: "Dog" },
    { emoji: "🚗", word: "Car" },
    { emoji: "☀️", word: "Sun" },
    { emoji: "🐱", word: "Cat" },
    { emoji: "🍌", word: "Banana" },
    { emoji: "🏠", word: "House" },
    { emoji: "🌳", word: "Tree" },
    { emoji: "🎈", word: "Balloon" },
    { emoji: "🍦", word: "Ice Cream" },
    { emoji: "🐘", word: "Elephant" },
    { emoji: "🦋", word: "Butterfly" }
];

let score = 0;
let currentQuestion = {};

function initGame() {
    const optionsContainer = document.getElementById('options');
    const emojiDisplay = document.getElementById('target-emoji');

    // 1. Pilih soal acak
    currentQuestion = gameData[Math.floor(Math.random() * gameData.length)];
    emojiDisplay.textContent = currentQuestion.emoji;

    // 2. Buat pilihan jawaban (1 benar, 3 salah)
    let choices = [currentQuestion.word];
    while (choices.length < 4) {
        let randomWord = gameData[Math.floor(Math.random() * gameData.length)].word;
        if (!choices.includes(randomWord)) {
            choices.push(randomWord);
        }
    }

    // 3. Acak posisi tombol jawaban
    choices.sort(() => Math.random() - 0.5);

    // 4. Tampilkan tombol ke layar
    optionsContainer.innerHTML = '';
    choices.forEach(choice => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = choice;
        btn.onclick = () => checkAnswer(choice, btn);
        optionsContainer.appendChild(btn);
    });
}

function checkAnswer(selected, button) {
    const allButtons = document.querySelectorAll('.option-btn');
    // Matikan semua tombol agar pemain tidak klik berkali-kali
    allButtons.forEach(btn => btn.disabled = true);

    if (selected === currentQuestion.word) {
        button.classList.add('correct');
        score += 10;
        document.getElementById('score').textContent = score;
        
        // Tunggu 1 detik lalu pindah soal
        setTimeout(initGame, 1000);
    } else {
        button.classList.add('wrong');
        
        // Tunjukkan jawaban yang benar
        allButtons.forEach(btn => {
            if(btn.textContent === currentQuestion.word) {
                btn.classList.add('correct');
            }
        });

        // Tunggu 1.5 detik agar anak bisa melihat jawaban yang benar
        setTimeout(initGame, 1500);
    }
}

// Mulai game saat halaman dimuat
window.onload = initGame;