document.addEventListener('DOMContentLoaded', function() {
  fetch("/postits", { method: "GET" })
    .then(response => response.json())
    .then(data => {
      data.forEach(postit => {
        const postitDiv = document.createElement("div");
        postitDiv.classList.add("postit-container");
        postitDiv.dataset.postitId = postit.id;

        const postitImg = document.createElement("img");
        postitImg.src = "/assets/postit.png";
        postitImg.width = 200;
        postitImg.height = 200;
        postitImg.setAttribute("alt", "");
        postitDiv.appendChild(postitImg);

        const postitText = document.createElement("textarea");
        postitText.classList.add("postit-text");
        postitText.setAttribute("maxlength", "100");
        postitText.value = postit.content; // Remplir le contenu du post-it
        postitDiv.appendChild(postitText);

        document.getElementById("postitContainer").appendChild(postitDiv);
      });
    })
    .catch(error => {
      console.error("Une erreur s'est produite lors du chargement des post-it.", error);
    });

});
