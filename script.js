// Charger les items depuis le fichier JSON
fetch('items.json')
    .then(response => response.json())
    .then(data => {
        const checklist = document.getElementById('checklist');
        data.forEach((item, index) => {
            const li = document.createElement('li');
            const id = `item${index + 1}`;
            li.innerHTML = `<input type="checkbox" id="${id}"> <label for="${id}">${item}</label>`;
            checklist.appendChild(li);
        });
    })
    .catch(error => console.error('Erreur lors du chargement du JSON:', error));
