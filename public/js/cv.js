let language;

function loadLangQuery() {
    let queryParams = new URLSearchParams(window.location.search);
    let lang = queryParams.get('lang');
    if (lang) {
        return lang;
    }
    return('de')
}

async function getLanguage() {
    const lang = localStorage.getItem('language')
    const res = await fetch(`./language/cv/${lang}.json`)
    const language = await res.json();
    changeLanguage(language);
}

function setLanguage(lang) {
    localStorage.setItem('language', lang);
}

function toggleLanguage() {
    const current = localStorage.getItem('language');
    if (current === 'en') {
        setLanguage('de');
    } else {
        setLanguage('en');
    }
    getLanguage();
}

const changeLanguage = (lang) => {
    const elements = document.querySelectorAll("[data-lang]");
    elements.forEach((e) => {
        const text = lang[e.getAttribute("data-lang")];
        if (!text) {
            console.warn(`key: ${e.getAttribute("data-lang")} is not defined in`)
        }
        e.textContent = lang[e.getAttribute("data-lang")];
    });
};

setLanguage(loadLangQuery())
getLanguage();



document.getElementById("languageToggle").addEventListener("click", () => toggleLanguage());