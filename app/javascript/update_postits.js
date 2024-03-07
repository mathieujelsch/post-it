document.addEventListener("DOMContentLoaded", function() {

  function handlePostitTextChange(event) {
    const postitText = event.target;
    const postitId = postitText.closest(".postit-container").dataset.postitId;
    const newContent = postitText.value;

    fetch(`/postits/${postitId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').getAttribute('content')
      },
      body: JSON.stringify({ postit: { content: newContent } })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour du contenu du post-it.");
      }
    })
    .catch(error => {
      console.error("Une erreur s'est produite lors de la mise à jour du contenu du post-it.", error);
    });
  }

  document.addEventListener("input", function(event) {
    if (event.target.classList.contains("postit-text")) {
      handlePostitTextChange(event);
    }
  });

});
