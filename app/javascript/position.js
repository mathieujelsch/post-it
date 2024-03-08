document.addEventListener('DOMContentLoaded', function() {
    fetch("/postits", { method: "GET" })
    .then(response => response.json())
    .then(data => {
        data.forEach(postit => {
            const postitDiv = document.querySelector(`[data-postit-id="${postit.id}"]`);
            if (postitDiv) {
                postitDiv.style.left = postit.coord_x + 'px';
                postitDiv.style.top = postit.coord_y + 'px';
            }
        });
    })
    .catch(error => {
        console.error('Erreur lors du chargement des coordonnées des post-it.', error);
    });

});
