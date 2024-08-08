export const showTitleScreen = () => {
    const root = document.getElementById('root');
    
    const answers = JSON.parse(localStorage.getItem('answers'));
    // let answersHTML = '';
    // if (answers) {
    //     answersHTML = answers.map((answer, index) => `
    //         <p>Question ${index + 1} Answer(s): ${Array.isArray(answer) ? answer.join(', ') : answer}</p>
    //     `).join("");
    // }

    root.innerHTML = `
    <div id="app">
        <div class="menubar">
            <div class="logo"><img src="./public/logo.svg" alt=""></div>
            <div class="line"></div>
            <button>Join waitlist</button>
            <div class="line"></div>
            <div class="menu-btn"><img src="./public/menu-btn.svg" alt=""></div>
        </div>
        <div class="title_screen">
            <div class="main_title">An AI-powered <br> trading platform that <br> works as your <br> 
                personal assistant</div>
            <div class="sub_title">Research to investing, all-in-one place</div>
            
        </div>
    </div>
    `;
};
