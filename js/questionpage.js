import { questions } from './questions.js';
import { showTitleScreen } from './titlePage.js';

let currentQuestionIndex = 0;
let answers = [];

const renderQuestion = () => {
    const root = document.getElementById('root');
    const currentQuestion = questions[currentQuestionIndex];

    let optionsHTML;
    if (currentQuestionIndex === 0) {
        // First question: Options act as submit buttons
        optionsHTML = currentQuestion.options.map((option, index) => `
            <div>
                <button id="option${index}" class="option-button">${option}</button>
            </div>
        `).join("");

        // Style the color of nth wordsin the question
        // Wrap the nth words in a span
        // Define indices for words to style
        const firstWordIndex = 3; 
        const secondWordIndex = 5; 
        const words = currentQuestion.question.split(' ');
        const styledWords = words.map((word, index) => {
            if (index === firstWordIndex || index === secondWordIndex) {
                return `<span class="highlighted-word">${word}</span>`;
            }
            return word;
        });
        const styledQuestion = styledWords.join(' ');

       root.innerHTML = `
       <div class="card-container">
            <div class="logo"><img src="../public/newL.png" alt="logo" /></div>
            <div class="question-card first-question-card">
                <div class="cross">
                    <img src="../public/cross.png" alt="" />
                </div>
                <h2 id="first-question">${styledQuestion}</h2>
                <div class="option-container">
                    ${optionsHTML}
                </div>
            </div>     
       </div>
       `;
    } else {

        // Subsequent questions: Options with a Next button
        optionsHTML = currentQuestion.options.map((option, index) => `
            <label>
                <div class="option-div">
                <input type="checkbox" id="option${index}" name="question${currentQuestionIndex}" value="${option}">
                ${option}
                </div>
            </label>
        `).join("");
        root.innerHTML = `
        <div class="card-container rem-cards">
            <div class="logo"><img src="../public/newL.png" alt="" /></div>
            <div class="question-card">
                <div class="cross">
                    <img src="../public/cross.png" alt="" />
                </div>
                <h2>${currentQuestion.question}</h2>
                <div class="option-container">
                    ${optionsHTML}
                    <button id="nextButton">
                    ${currentQuestionIndex == 1 ? 'Next' : 'Submit'}

                    </button>
                </div>
            </div>
        </div>
        `;
    }

    if (currentQuestionIndex === 0) {

        //event listeners to option buttons for the first question
        currentQuestion.options.forEach((option, index) => {
            document.getElementById(`option${index}`).onclick = () => handleOptionClick(option);
        });
    } else {

        //event listener to change bg color in div when option is selected/checked
        const checkboxes = document.querySelectorAll(`input[name="question${currentQuestionIndex}"]`);
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', (event) => {
                const optionDiv = event.target.parentElement;
                if (event.target.checked) {
                    optionDiv.classList.add('selected-option');  // Add the selected-option class
                } else {
                    optionDiv.classList.remove('selected-option');  // Remove the selected-option class
                }
            });
        });


        //event listener to Next button for subsequent questions
        
        document.getElementById('nextButton').onclick = () => {
            const selectedOptions = Array.from(document.querySelectorAll(`input[name="question${currentQuestionIndex}"]:checked`))
                .map(checkbox => checkbox.value);
            if (selectedOptions.length > 0) {
                handleOptionClick(selectedOptions);
            } else {
                alert('Please select at least one option.');
            }
        };
    }
};

const handleOptionClick = (selectedOptions) => {
    answers.push(selectedOptions);
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        renderQuestion();
    } else {
        localStorage.setItem('completed', 'true');
        localStorage.setItem('answers', JSON.stringify(answers));
        showTitleScreen();
    }
};


export const initializeQuestions = () => {
    renderQuestion();
};
