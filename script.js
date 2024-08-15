// Charger les items depuis le fichier JSON
fetch('items.json')
    .then(response => response.json())
    .then(data => {
        const checklist = document.getElementById('checklist');
        data.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `<input type="checkbox" id="${item.id}"> <label for="${item.id}">${item.label}</label>`;
            checklist.appendChild(li);
        });
    })
    .catch(error => console.error('Erreur lors du chargement du JSON:', error));
