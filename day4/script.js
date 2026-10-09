const textarea = document.getElementById('note-text');
const charCount = document.getElementById('char-count');
const wordCount = document.getElementById('word-count');
const themeToggle = document.getElementById('theme-toggle');
const clearBtn = document.getElementById('clear-btn');

function updateCounts() {
    const text = textarea.value;
    const chars = text.length;
    const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;

    charCount.textContent = `${chars} /200 characters`;
    wordCount.textContent = `${words} words`;

    charCount.classList.remove("warning", "over");
    if (chars > 200) {
    charCount.classList.add("over");
    } else if (chars > 180) {
    charCount.classList.add("warning");
    }
}

textarea.addEventListener('input', () => {
    // this runs every single time the user types/deletes a character 
    updateCounts();
    localStorage.setItem('draft', textarea.value);
});

const savedDraft = localStorage.getItem('draft');
if (savedDraft) {
    textarea.value = savedDraft;
}

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    themeToggle.textContent = 'Light mode';
}

updateCounts();

function clearNote() {
    textarea.value = '';
    updateCounts();
    localStorage.removeItem('draft');
}

clearBtn.addEventListener('click', clearNote);

textarea.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        clearNote();
    }
});

themeToggle.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark');

    if (isDark) {
        themeToggle.textContent = 'Light mode';
        localStorage.setItem('theme', 'dark');
    } else {
        themeToggle.textContent = 'Dark mode';
        localStorage.setItem('theme', 'light');
    }
}); 