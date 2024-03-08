

  // Votre code JavaScript ici
  document.getElementById("generateButton").addEventListener("click", function() {

    const postitDiv = document.createElement("div");
    postitDiv.classList.add("postit-container");

    const postitImg = document.createElement("img");
    postitImg.src = "/assets/postit.png";
    postitImg.width = 200;
    postitImg.height = 200;
    postitImg.setAttribute("alt", "");
    postitDiv.appendChild(postitImg);

    const postitText = document.createElement("textarea");
    postitText.classList.add("postit-text");
    postitText.setAttribute("maxlength", "100");
    postitDiv.appendChild(postitText);

    document.getElementById("postitContainer").appendChild(postitDiv);

  });



  document.getElementById("generateButton").addEventListener("click", function() {
    fetch('/postits', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': Rails.csrfToken() // Pour Rails, assurez-vous d'inclure le jeton CSRF
      },
      body: JSON.stringify({}) // Aucune donnée n'est nécessaire dans le corps de la requête puisque vous voulez juste créer un postit vide
    })
    .catch(error => {
      console.error('Error:', error);
    });
  });
