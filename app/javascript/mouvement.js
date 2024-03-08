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
        }
      }

      function handleMouseUp() {
        if (selectedPostIt) {
          const newX = parseInt(selectedPostIt.style.left, 10);
          const newY = parseInt(selectedPostIt.style.top, 10);
          const postitId = selectedPostIt.dataset.postitId;
          const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

          const poubelleRect = document.querySelector(".poubelle").getBoundingClientRect();
          const postitX = newX + selectedPostIt.offsetWidth / 2;
          const postitY = newY + selectedPostIt.offsetHeight / 2;

          // Si le post-it est dans la poubelle, le supprimer
          if (
            postitX >= poubelleRect.left &&
            postitX <= poubelleRect.right &&
            postitY >= poubelleRect.top &&
            postitY <= poubelleRect.bottom
          ) {
            deletePostit(postitId, selectedPostIt);
            selectedPostIt.remove();
          }
          
          fetch(`/postits/${postitId}`, {
              method: "PATCH", // Utilisation de la méthode PATCH pour mettre à jour les coordonnées
              headers: {
                  "Content-Type": "application/json",
                  "X-CSRF-Token": token
              },
              body: JSON.stringify({
                  coord_x: newX,
                  coord_y: newY
              })
          })
          .then(response => {
              if (!response.ok) {
                  console.error("Erreur lors de la mise à jour du post-it.");
              }
          })
          .catch(error => {
              console.error("Une erreur s'est produite lors de la mise à jour du post-it.", error);
          });

          selectedPostIt.classList.remove("selected");
          selectedPostIt = null;
          document.removeEventListener("mousemove", handleMouseMove);
          document.removeEventListener("mouseup", handleMouseUp);
        }
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
});
