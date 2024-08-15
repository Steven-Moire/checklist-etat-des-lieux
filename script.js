document.addEventListener("DOMContentLoaded", function() {
    fetch('items.json')
        .then(response => response.json())
        .then(data => {
            const checklist = document.getElementById('checklist');
            data.forEach(item => {
                const li = document.createElement('li');
                li.innerHTML = `<input type="checkbox" id="${item.id}" ${item.checked ? 'checked' : ''}> <label for="${item.id}">${item.label}</label>`;
                checklist.appendChild(li);

                const checkbox = document.getElementById(item.id);

                // Écouter le changement d'état de la case à cocher
                checkbox.addEventListener('change', function() {
                    item.checked = checkbox.checked;
                    updateJSON(data);
                });
            });
        })
        .catch(error => console.error('Erreur lors du chargement du JSON:', error));
});

function updateJSON(data) {
    fetch('update_items.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        console.log('Mise à jour réussie:', result);
    })
    .catch(error => {
        console.error('Erreur lors de la mise à jour du JSON:', error);
    });
}
