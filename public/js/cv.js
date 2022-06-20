const loadLangQuery = () => {
    let queryParams = new URLSearchParams(window.location.search);
    let lang = queryParams.get('lang');
    if (lang) {
        return lang;
    }
    return('de')
}

const getLanguage = () => {
    const lang = localStorage.getItem('language');
    fetch(`./language/cv/${lang}.json`)
        .then(res => res.json())
        .then(json => changeLanguage(json));
}

const setLanguage = (lang) => {
    localStorage.setItem('language', lang);
}

const toggleLanguage = () => {
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