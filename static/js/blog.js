// main.js
document.addEventListener('DOMContentLoaded', function() {
    // 网页访问计数功能
    fetch('https://blog.meekdai.com/Gmeek/plugins/GmeekVercount.js')
        .then(response => response.text())
        .then(script => {
            const scriptElement = document.createElement('script');
            scriptElement.textContent = script;
            document.head.appendChild(scriptElement);
        })
        .catch(error => {
            console.error('Error loading GmeekVercount.js:', error);
        });
});