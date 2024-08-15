document.addEventListener('DOMContentLoaded', function() {
    fetch('items.json')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data.items)) {
          data.items.forEach(item => {
            // Traitement des éléments ici
            console.log(item.label);  // Affiche chaque label dans la console
          });
        } else {
          console.error('Les données JSON ne contiennent pas un tableau d\'items.');
        }
      })
      .catch(error => {
        console.error('Erreur lors du chargement du JSON:', error);
      });
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
