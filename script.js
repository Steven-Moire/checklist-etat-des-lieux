document.addEventListener("DOMContentLoaded", function() {
    // Charger les items depuis le fichier JSON
    fetch('items.json')
        .then(response => response.json())
        .then(data => {
            const checklist = document.getElementById('checklist');
            data.forEach((item, index) => {
                const id = `item${index + 1}`;
                const li = document.createElement('li');
                li.innerHTML = `<input type="checkbox" id="${id}" data-index="${index}"> <label for="${id}">${item}</label>`;
                checklist.appendChild(li);

                const checkbox = document.getElementById(id);

                // Vérifier si l'item est enregistré dans le localStorage et restaurer l'état
                const savedState = localStorage.getItem(id);
                if (savedState !== null) {
                    checkbox.checked = savedState === 'true';
                }

                // Écouter le changement d'état de la case à cocher
                checkbox.addEventListener('change', function() {
                    localStorage.setItem(id, checkbox.checked);
                });
            });
        })
        .catch(error => console.error('Erreur lors du chargement du JSON:', error));
});
