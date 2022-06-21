function partager() {
    const contentTitre = document.getElementById("inpTitre").value;
    const contentMarque = document.getElementById("inpMarque").value;
    const contentDate = document.getElementById("inpDate").value;
    const contentPuissance = document.getElementById("inpPuissance").value;
    const contentDescri = document.getElementById("inpDescri").value;
    const contentError = document.getElementById("error");

    if (!contentTitre || !contentMarque || !contentDate || !contentPuissance) {
        contentError.innerHTML = "<p style='font-size:25px; color:white; text-align:center;'>Veuillez renseigner tous les champs obligatoires avant de valider l'opération</p>"
    } else {
        if (!localStorage.getItem("card")) {
            value = [{ "id": 1, "titre": contentTitre, "marque": contentMarque, "date": contentDate, "puissance": contentPuissance, "descri": contentDescri }];
            localStorage.setItem("card", JSON.stringify(value));
        } else {
            value = JSON.parse(localStorage.getItem("card"))
            value.push({ "id": JSON.parse(localStorage.getItem("card"))[JSON.parse(localStorage.getItem("card")).length - 1].id + 1, "titre": contentTitre, "marque": contentMarque, "date": contentDate, "puissance": contentPuissance, "descri": contentDescri });
            localStorage.setItem("card", JSON.stringify(value));
        }
        location.reload();
    }

}

document.addEventListener("DOMContentLoaded", async() => {
    if (window.location.pathname.endsWith("/partager.html")) {
        document.getElementById('result').innerHTML = navigator.deviceMemory || 'unknown'
        await mesPartages();
    }
});

function mesPartages() {
    const contentPartage = document.getElementById("partage");
    const value = JSON.parse(localStorage.getItem("card"));
    for (const actu of value) {
        contentPartage.innerHTML += `<div id="card-${actu.id}" class="card">
                                            <figure class="card__thumb">
                                                <img src="./images/mainImg.jpg" alt="Picture by Kyle Cottrell" class="card__image">
                                                <figcaption class="card__caption">
                                                    <h2 class="card__title">${actu.titre}</h2>
                                                    <p class="card__snippet">${actu.descri}</p>
                                                    <p class="card__snippet">Marque : ${actu.marque}</p>
                                                    <p class="card__snippet">Date : ${actu.date}</p>
                                                    <p class="card__snippet">Pui : ${actu.puissance} Ch</p>
                                                    <a onclick="modifier(${actu.id})" class="card__button">Modifier</a>
                                                    <a onclick="supprimer(${actu.id})" class="card__button">Supprimer</a>
                                                </figcaption>
                                            </figure>
                                        </div>`;
    }
}

function modifier(id) {
    if (id) {
        const value = JSON.parse(localStorage.getItem("card"));
        for (const actu of value) {
            if (id == actu.id) {
                const contentPartage = document.getElementById(`card-${actu.id}`);
                contentPartage.innerHTML = `<figure class="card__thumb">
                                                <img src="./images/mainImg.jpg" alt="Picture by Kyle Cottrell" class="card__image">
                                                <figcaption class="card__caption">
                                                    <label>Titre:</label>
                                                    <input id="titre-${actu.id}" class="card__title" type="text" placeholder="Titre" value="${actu.titre}">
                                                    <label>Description:</label>
                                                    <input id="descri-${actu.id}" class="card__snippet" type="text" placeholder="Description" value="${actu.descri}">
                                                    <label>Marque:</label>
                                                    <input id="marque-${actu.id}" class="card__snippet" type="text" placeholder="Marque" value="${actu.marque}">
                                                    <label>Date:</label>
                                                    <input id="date-${actu.id}" class="card__snippet" type="number" placeholder="Date" value="${actu.date}">
                                                    <label>Puissance:</label>
                                                    <input id="puissance-${actu.id}" class="card__snippet" type="number" placeholder="Puissance" value="${actu.puissance}">
                                                    <a onclick="location.reload()" class="card__button">Annuler</a>
                                                    <a onclick="modifValid(${actu.id})" class="card__button">Valider</a>
                                                </figcaption>
                                            </figure>`;
            }
        }
    }
}


function modifValid(id) {
    console.log(titre)
    const value = JSON.parse(localStorage.getItem("card"));
    if (id) {
        for (const actu of value) {
            if (id == actu.id) {
                const contentTitre = document.getElementById(`titre-${actu.id}`).value;
                const contentMarque = document.getElementById(`marque-${actu.id}`).value;
                const contentDate = document.getElementById(`date-${actu.id}`).value;
                const contentPuissance = document.getElementById(`puissance-${actu.id}`).value;
                const contentDescri = document.getElementById(`descri-${actu.id}`).value;
                let indexOf = value.indexOf(actu);
                let tab = value;
                let changeValue = { "id": actu.id, "titre": contentTitre, "marque": contentMarque, "date": contentDate, "puissance": contentPuissance, "descri": contentDescri };
                console.log(changeValue);
                tab.splice(indexOf, 1, changeValue);
                localStorage.setItem("card", JSON.stringify(tab));
            }
        }
    }
    location.reload();
}

function supprimer(id) {
    if (id) {
        const value = JSON.parse(localStorage.getItem("card"));
        for (const actu of value) {
            if (id == actu.id) {
                let indexOf = value.indexOf(actu);
                let tab = value;
                tab.splice(indexOf, 1);
                localStorage.setItem("card", JSON.stringify(tab));
            }
        }
    }
    location.reload();
}

document.addEventListener("DOMContentLoaded", async() => {
    if (window.location.pathname.endsWith("/voitures.html")) {
        await afficher();
    }
});

function afficher() {
    const contentContainer = document.getElementById("container");
    const value = JSON.parse(localStorage.getItem("card"));
    for (const actu of value) {
        contentContainer.innerHTML += `<div class="card">
                                            <figure class="card__thumb">
                                                <img src="./images/mainImg.jpg" alt="Picture by Kyle Cottrell" class="card__image">
                                                <figcaption class="card__caption">
                                                    <h2 class="card__title">${actu.titre}</h2>
                                                    <p class="card__snippet">${actu.descri}</p>
                                                    <p class="card__snippet">Marque : ${actu.marque}</p>
                                                    <p class="card__snippet">Date : ${actu.date}</p>
                                                    <p class="card__snippet">Pui : ${actu.puissance} Ch</p>
                                                </figcaption>
                                            </figure>
                                        </div>`;
    }
}



document.addEventListener("DOMContentLoaded", async() => {



    let camera_button = document.querySelector("#start-camera");
    let video = document.querySelector("#video");
    let click_button = document.querySelector("#click-photo");
    let canvas = document.querySelector("#canvas");

    camera_button.addEventListener('click', async function() {
        let stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        video.srcObject = stream;
    });

    click_button.addEventListener('click', function() {
        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
        let image_data_url = canvas.toDataURL('image/jpeg');

        console.log(image_data_url);

        let uri = image_data_url;
        let name = "photo.png";
        let link = document.createElement("a");
        link.download = name;
        link.href = uri;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        delete link;
    });




});