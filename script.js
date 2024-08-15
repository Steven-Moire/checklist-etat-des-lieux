document.addEventListener('DOMContentLoaded', function() {
    fetch('items.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur réseau lors du chargement du fichier JSON.');
        }
        return response.json();
      })
      .then(data => {
        // Vérifiez que data.items est un tableau
        if (Array.isArray(data.items)) {
          const checklist = document.getElementById('checklist');
          data.items.forEach((item, index) => {
            const id = `item${index + 1}`;
            const li = document.createElement('li');
            li.innerHTML = `<input type="checkbox" id="${id}"> <label for="${id}">${item.label}</label>`;
            checklist.appendChild(li);
  
            // Restaurer l'état des cases cochées
            const checkbox = document.getElementById(id);
            const isChecked = localStorage.getItem(id) === 'true';
            checkbox.checked = isChecked;
  
            // Sauvegarder l'état dans le localStorage à chaque changement
            checkbox.addEventListener('change', () => {
              localStorage.setItem(id, checkbox.checked);
            });
          });
        } else {
          console.error('Les données JSON ne contiennent pas un tableau d\'items.');
        }
      })
      .catch(error => console.error('Erreur lors du chargement du JSON:', error));
  });
  

function updateJSON(data) {
    fetch('items.json', { // Chemin relatif à la racine
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
