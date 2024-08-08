import { initializeQuestions } from './questionPage.js';
import { showTitleScreen } from './titlePage.js';

// Check if the user has already completed the questionnaire
const completed = localStorage.getItem('completed');

if (completed) {
    showTitleScreen();
} else {
    initializeQuestions();
}
