document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:3000/items')
      .then(response => response.json())
      .then(data => {
        const checklist = document.getElementById('checklist');
        data.items.forEach((item) => {
          const id = item.id;
          const li = document.createElement('li');
          li.innerHTML = `<input type="checkbox" id="${id}" ${item.checked ? 'checked' : ''}> <label for="${id}">${item.label}</label>`;
          checklist.appendChild(li);
  
          // Restaurer l'état des cases cochées
          const checkbox = document.getElementById(id);
          checkbox.addEventListener('change', () => {
            const isChecked = checkbox.checked;
            fetch('http://localhost:3000/items', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ id, label: item.label, checked: isChecked })
            })
            .then(response => response.json())
            .then(result => {
              console.log('État mis à jour:', result);
            })
            .catch(error => console.error('Erreur lors de la mise à jour:', error));
          });
        });
      })
      .catch(error => console.error('Erreur lors du chargement des items:', error));
  });
  