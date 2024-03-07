document.addEventListener('DOMContentLoaded', function() {
  // Votre code JavaScript ici
  document.getElementById("generateButton").addEventListener("click", function() {
    const postitContent = document.querySelector(".postit-text").value;

    fetch("/postits", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').getAttribute('content')
      },
      body: JSON.stringify({ postit: { content: "" } })
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Erreur lors de la génération du post-it.");
      }
    })
    .then(data => {
      const postitDiv = document.createElement("div");
      postitDiv.classList.add("postit-container");
      postitDiv.dataset.postitId = data.id;

      const postitImg = document.createElement("img");
      postitImg.src = "/assets/postit.png";
      postitImg.width = 200;
      postitImg.height = 200;
      postitImg.setAttribute("alt", "");
      postitDiv.appendChild(postitImg);

      const postitText = document.createElement("textarea");
      postitText.classList.add("postit-text");
      postitText.setAttribute("maxlength", "100");
      postitText.value = postitContent;
      postitDiv.appendChild(postitText);

      document.getElementById("postitContainer").appendChild(postitDiv);
    })
    .catch(error => {
      console.error("Une erreur s'est produite lors de la génération du post-it.", error);
    });

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
});
