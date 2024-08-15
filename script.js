document.addEventListener("DOMContentLoaded", function() {
    // Charger les items depuis le fichier JSON
    fetch('items.json')
        .then(response => response.json())
        .then(data => {
            const checklist = document.getElementById('checklist');
            data.forEach((item, index) => {
                const id = `item${index + 1}`;
                const li = document.createElement('li');
                li.innerHTML = `<input type="checkbox" id="${id}"> <label for="${id}">${item}</label>`;
                checklist.appendChild(li);

                // Récupérer la case à cocher
                const checkbox = document.getElementById(id);
                
                // Restaurer l'état des cases cochées depuis le localStorage
                const isChecked = localStorage.getItem(id) === 'true';
                checkbox.checked = isChecked;

                // Sauvegarder l'état dans le localStorage à chaque changement
                checkbox.addEventListener('change', () => {
                    localStorage.setItem(id, checkbox.checked);
                });
            });
        })
        .catch(error => console.error('Erreur lors du chargement du JSON:', error));
});
