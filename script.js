// Les questions sont stockées dans des objets regroupés dans un tableau.
        const questions = [
            {
                texte: "Quels mots sont recommandés pour déclarer une variable ?",
                choix: ["var", "let", "const"],
                reponsesCorrectes: ["let", "const"],
                choixMultiples: true
            },
            {
                texte: "Quels éléments sont des types primitifs ?",
                choix: ["string", "boolean", "array", "number"],
                reponsesCorrectes: ["string", "boolean", "number"],
                choixMultiples: true
            },
            {
                texte: "Combien vaut 2 + 3 ?",
                choix: ["5", "23", "6"],
                reponsesCorrectes: ["5"],
                choixMultiples: false
            },
            {
                texte: "Quel est le type de la valeur true ?",
                choix: ["string", "boolean", "number"],
                reponsesCorrectes: ["boolean"],
                choixMultiples: false
            },
            {
                texte: "Quelles instructions peuvent afficher un message dans la page ou à l'écran ?",
                choix: ["alert()", "console.log()", "document.write()"],
                reponsesCorrectes: ["alert()", "document.write()"],
                choixMultiples: true
            }
        ];

        // Cette fonction affiche les questions et leurs choix dans la page.
        function afficherQuestions() {
            let contenu = "";

            for (let i = 0; i < questions.length; i++) {
                const type = questions[i].choixMultiples ? "checkbox" : "radio";
                contenu += "<fieldset>";
                contenu += "<legend>Question " + (i + 1) + " : " + questions[i].texte + "</legend>";

                for (let j = 0; j < questions[i].choix.length; j++) {
                    const choix = questions[i].choix[j];
                    contenu += "<label><input type='" + type + "' name='q" + (i + 1) + "' value='" + choix + "'> ";
                    contenu += choix + "</label>";
                }

                contenu += "</fieldset>";
            }

            document.getElementById("questions").innerHTML = contenu;
        }

        // Compare les réponses choisies avec les bonnes réponses.
        function reponseEstCorrecte(reponsesChoisies, bonnesReponses) {
            if (reponsesChoisies.length !== bonnesReponses.length) {
                return false;
            }

            for (let i = 0; i < bonnesReponses.length; i++) {
                if (reponsesChoisies.indexOf(bonnesReponses[i]) === -1) {
                    return false;
                }
            }

            return true;
        }

        // Ouvre une nouvelle fenêtre pour le corrigé ou le résultat.
        function ouvrirFenetre(titre, contenu, hauteur) {
            const fenetre = window.open("", "_blank", "width=700,height=" + hauteur + ",resizable=yes,scrollbars=yes");

            if (fenetre === null) {
                alert("Autorise les fenêtres pop-up pour afficher cette page.");
                return;
            }

            fenetre.document.open();
            fenetre.document.write("<!DOCTYPE html><html lang='fr'><head><meta charset='UTF-8'><title>" + titre + "</title>");
            fenetre.document.write("<style>body{font-family:Arial,sans-serif;margin:24px;line-height:1.5}h1{color:#17365d}.correcte{color:green;text-decoration:underline;font-weight:bold}</style>");
            fenetre.document.write("</head><body><h1>" + titre + "</h1>" + contenu + "</body></html>");
            fenetre.document.close();
        }

        function initialiserQCM() {
            document.getElementById("formQCM").reset();
            document.getElementById("messageQCM").textContent = "Le QCM a été réinitialisé.";
        }

        function afficherCorrige() {
            let contenu = "<p>Les bonnes réponses sont soulignées en vert.</p>";

            for (let i = 0; i < questions.length; i++) {
                contenu += "<h2>Question " + (i + 1) + " : " + questions[i].texte + "</h2><ul>";

                for (let j = 0; j < questions[i].choix.length; j++) {
                    const choix = questions[i].choix[j];
                    const estBonne = questions[i].reponsesCorrectes.indexOf(choix) !== -1;

                    if (estBonne) {
                        contenu += "<li class='correcte'>" + choix + "</li>";
                    } else {
                        contenu += "<li>" + choix + "</li>";
                    }
                }

                contenu += "</ul>";
            }

            const hauteur = Math.min(850, 200 + questions.length * 115);
            ouvrirFenetre("Corrigé du QCM", contenu, hauteur);
        }

        function afficherResultat() {
            let contenu = "<ul>";
            let score = 0;

            for (let i = 0; i < questions.length; i++) {
                const casesCochees = document.querySelectorAll("input[name='q" + (i + 1) + "']:checked");
                const reponsesChoisies = [];

                for (let j = 0; j < casesCochees.length; j++) {
                    reponsesChoisies.push(casesCochees[j].value);
                }

                if (reponsesChoisies.length === 0) {
                    contenu += "<li>La question " + (i + 1) + " : aucune réponse.</li>";
                } else if (reponseEstCorrecte(reponsesChoisies, questions[i].reponsesCorrectes)) {
                    contenu += "<li>La réponse à la question " + (i + 1) + " est correcte.</li>";
                    score++;
                } else {
                    contenu += "<li>La réponse à la question " + (i + 1) + " est incorrecte.</li>";
                }
            }

            contenu += "</ul><p><strong>Score : " + score + " / " + questions.length + "</strong></p>";
            const hauteur = Math.min(650, 180 + questions.length * 65);
            ouvrirFenetre("Résultat du QCM", contenu, hauteur);
        }

        function verifierEmail() {
            const email = document.getElementById("email").value.trim();
            const positionArobase = email.indexOf("@");
            const positionPoint = email.indexOf(".", positionArobase + 1);
            const partieAvantArobase = email.substring(0, positionArobase);
            const partieApresPoint = email.substring(positionPoint + 1);
            const contientLettreOuChiffre = /[a-z0-9]/i.test(partieAvantArobase);

            const emailValide = positionArobase > 0
                && email.lastIndexOf("@") === positionArobase
                && contientLettreOuChiffre
                && positionPoint > positionArobase + 1
                && partieApresPoint.length > 0;

            if (emailValide) {
                document.getElementById("resultatEmail").textContent = "L'adresse email semble valide.";
            } else {
                document.getElementById("resultatEmail").textContent = "L'adresse email n'est pas valide.";
            }
        }

        // La fonction trier reçoit une liste et retourne une nouvelle liste triée.
        function trier(liste) {
            const resultat = liste.slice();

            for (let i = 0; i < resultat.length; i++) {
                for (let j = 0; j < resultat.length - 1; j++) {
                    if (resultat[j] > resultat[j + 1]) {
                        const temporaire = resultat[j];
                        resultat[j] = resultat[j + 1];
                        resultat[j + 1] = temporaire;
                    }
                }
            }

            return resultat;
        }

        function trierListe() {
            const texte = document.getElementById("listeNombres").value;
            const morceaux = texte.split(",");
            const nombres = [];

            for (let i = 0; i < morceaux.length; i++) {
                const morceau = morceaux[i].trim();

                if (morceau === "" || isNaN(Number(morceau))) {
                    document.getElementById("resultatTri").textContent = "Entre uniquement des nombres séparés par des virgules.";
                    return;
                }

                nombres.push(Number(morceau));
            }

            const listeTriee = trier(nombres);
            document.getElementById("resultatTri").textContent = "Liste triée : " + listeTriee.join(", ");
        }

        function additionnerDurees() {
            let totalSecondes = 0;

            for (let i = 1; i <= 3; i++) {
                const heures = Number(document.getElementById("h" + i).value);
                const minutes = Number(document.getElementById("m" + i).value);
                const secondes = Number(document.getElementById("s" + i).value);
                totalSecondes += heures * 3600 + minutes * 60 + secondes;
            }

            const secondesParJour = 24 * 60 * 60;
            const secondesParHeure = 60 * 60;
            const secondesParMinute = 60;

            const jours = Math.floor(totalSecondes / secondesParJour);
            totalSecondes = totalSecondes % secondesParJour;
            const heures = Math.floor(totalSecondes / secondesParHeure);
            totalSecondes = totalSecondes % secondesParHeure;
            const minutes = Math.floor(totalSecondes / secondesParMinute);
            const secondes = totalSecondes % secondesParMinute;

            document.getElementById("resultatDurees").textContent =
                "Somme : " + jours + " jour(s), " + heures + " heure(s), "
                + minutes + " minute(s) et " + secondes + " seconde(s).";
        }

        afficherQuestions();
