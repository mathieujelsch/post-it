document.addEventListener('DOMContentLoaded', function() {

  let selectedPostIt = null; // Variable pour stocker le post-it sélectionné

  function handleMouseDown(event) {
    const postitContainer = event.target.closest(".postit-container");
    if (postitContainer) {
      selectedPostIt = postitContainer;
      selectedPostIt.classList.add("selected");
      const initialX = event.clientX - selectedPostIt.offsetLeft;
      const initialY = event.clientY - selectedPostIt.offsetTop;

      function handleMouseMove(event) {
        if (selectedPostIt) {
          const newX = event.clientX - initialX;
          const newY = event.clientY - initialY;
          selectedPostIt.style.left = newX + "px";
          selectedPostIt.style.top = newY + "px";

           // Coordonnées du coin supérieur gauche du post-it
          const postitX = newX + selectedPostIt.offsetWidth / 2;
          const postitY = newY + selectedPostIt.offsetHeight / 2;

          const postitId = selectedPostIt.dataset.postitId;
          localStorage.setItem(`postit_${postitId}_coordinates`, JSON.stringify({ x: newX, y: newY }));
          console.log(`Coordonnées du post-it ${postitId}: x=${newX}, y=${newY}`);

          // Coordonnées de la poubelle
          const poubelleRect = document.querySelector(".poubelle").getBoundingClientRect();

          if (
            postitX >= poubelleRect.left &&
            postitX <= poubelleRect.right &&
            postitY >= poubelleRect.top &&
            postitY <= poubelleRect.bottom
          ) {

            const postitId = selectedPostIt.dataset.postitId; // récupérer l'ID du post-it
            deletePostit(postitId, selectedPostIt);

            // Supprimer le post-it
            selectedPostIt.remove();
            selectedPostIt = null;

            window.getSelection().removeAllRanges();
          }
        }
      }

      function handleMouseUp() {
        selectedPostIt.classList.remove("selected");
        selectedPostIt = null;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      }

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }
  }

  document.addEventListener("mousedown", handleMouseDown);

  function deletePostit(postitId, postitDiv) {
    const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    fetch(`/postits/${postitId}`, {
        method: "DELETE",
        headers: {
            "X-CSRF-Token": token
        }
    })
    .then(response => {
        if (response.ok) {
            postitDiv.remove(); // Supprimer la div du DOM
        } else {
            console.error("Erreur lors de la suppression du post-it.");
        }
    })
    .catch(error => {
        console.error("Une erreur s'est produite lors de la suppression du post-it.", error);
    });
  }

  function restorePostItCoordinates() {
    const postItContainers = document.querySelectorAll(".postit-container");
    postItContainers.forEach(postItContainer => {
      const postitId = postItContainer.dataset.postitId;
      const coordinates = localStorage.getItem(`postit_${postitId}_coordinates`);
      if (coordinates) {
        const { x, y } = JSON.parse(coordinates);
        postItContainer.style.left = x + "px";
        postItContainer.style.top = y + "px";
      }
    });
  }

  // Appeler la fonction pour restaurer les coordonnées au chargement de la page
  restorePostItCoordinates();

});
