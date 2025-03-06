// Initialisation des variables globales
let paquet = [];
let scoreJoueur = 0;
let scoreBanque = 0;
let compteurParties = 1;
let partiesGagnees = 0;
let partiesPerdues = 0;
let partiesNulles = 0;
let blackJacks = 0;
let stat = [];
let compteurManches = 1;
let flag = false;

let cartesTirees = []; // test

/* pour tirer une carte aléatoire */
function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function initialiserPaquet() {
  for (let i = 1; i <= 52; i++) {
    paquet.push(i);
  }
}

function tirerCarteAleatoire() {
  // Générer un index aléatoire
  const index = getRandomIntInclusive(0, paquet.length - 1);
  // Récupérer la carte à l'index alétoire
  const carte = paquet[index];
  console.log("Carte tirée du paquet :", carte);
  
  cartesTirees.push(carte); // test
  console.log("cartes retirées du paquet: ", cartesTirees);
  
  // Retirer la carte du paquet
  paquet.splice(index, 1);
  // Retourner la carte tirée
  return carte;
}

function valeurCarte(numeroCarte, destinataire) {
  let valeurCarte = numeroCarte % 13;
  if (valeurCarte == 1) {
    // Cas de l'as
    if (scoreJoueur + 11 > 21) {
      valeurCarte = 1;
    } else {
      valeurCarte = 11;
    }
  } else if (valeurCarte == 0 || valeurCarte > 10) {
    valeurCarte = 10; // Roi, Dame, Valet
  }
  return valeurCarte;
}

function afficherCarte(numeroCarte, destinataire) {
  console.log("Carte à afficher (function) :", numeroCarte);
  document.getElementById(destinataire).innerHTML +=
    "<img src='images/" + numeroCarte + ".jpg'>";
}

function initialiserPartie() {
  // Réinitialiser les variables de jeu
  scoreJoueur = 0;
  scoreBanque = 0;
  flag = false;

  // Effacer les conteneurs d'affichage des cartes
  document.getElementById("joueur").innerHTML = "";
  document.getElementById("banque").innerHTML = "";

  // Tirer une carte pour la banque
  const carteBanque = tirerCarteAleatoire();
  scoreBanque += valeurCarte(carteBanque, "banque");
  //console.log("Carte tirée pour la banque :", carteBanque);
  afficherCarte(carteBanque, "banque");
  // Tirer une carte pour le joueur
  const carteJoueur = tirerCarteAleatoire();
  scoreJoueur += valeurCarte(carteJoueur, "joueur");
  //console.log("Carte tirée pour le joueur :", carteJoueur);
  afficherCarte(carteJoueur, "joueur");

  // Afficher le numéro de la manche et de la partie
  document.getElementById("manche").innerHTML =
    "Manche : " + compteurManches + " -  Partie " + compteurParties;
  // Masquer le bouton "Continuer" et afficher les boutons "Carte" et "Reste"
  document.getElementById("continuer").style.display = "none";
  document.getElementById("carte").style.display = "block";
  document.getElementById("reste").style.display = "block";

  // Afficher les points de la banque et du  joueur
  document.getElementById("messageScoreBanque").innerHTML =
    "<p>La banque a " + scoreBanque + " points.</p>";
  document.getElementById("messageScoreJoueur").innerHTML =
    "<p>Vous avez " + scoreJoueur + " points. Carte ou reste ?</p>";
}



/* onclick BOUTON AJOUTER CARTE */
function ajoutCarteJoueur() {
  // Pour bloquer le bouton quand on a perdu ou gagné
  if (!flag) {
    // Tirer une carte aléatoire pour le joueur
    let nouvelleCarte = tirerCarteAleatoire();
    afficherCarte(nouvelleCarte, "joueur");

    console.log("Nouvelle carte ajoutée pour le joueur :", nouvelleCarte);

    scoreJoueur += valeurCarte(nouvelleCarte, "joueur");
    document.getElementById("messageScoreJoueur").innerHTML =
      "<p> Vous avez " + scoreJoueur + " points.</p>";

    if (scoreJoueur > 21) {
      window.alert("Vous avez perdu !");
      document.getElementById("messageScoreJoueur").innerHTML +=
        "<p>Vous avez perdu !</p>";
      flag = true;
      partiesPerdues++;
      document.getElementById("carte").style.display = "none";
      document.getElementById("reste").style.display = "none";
      document.getElementById("continuer").style.display = "block";
    } else if (scoreJoueur === 21) {
      window.alert("BlackJack!!!");
      document.getElementById("messageScoreJoueur").innerHTML +=
        "<p>BlackJack !!!</p>";
      flag = true;
      blackJacks++;
      partiesGagnees++;
      document.getElementById("carte").style.display = "none";
      document.getElementById("reste").style.display = "none";
      document.getElementById("continuer").style.display = "block";
    } else {
      document.getElementById("messageScoreJoueur").innerHTML +=
        "<p>Carte ou reste ?</p>";
    }
  }
  updateResultats();
}

// onClick Bouton Reste -> ajout carte banque
function reste() {
  // pour bloquer bouton quand on a perdu ou gagné
  if (!flag) {
    let nombreTirages = 0;
    while (scoreBanque < 17 && nombreTirages < 5) {
      let nouvelleCarte = tirerCarteAleatoire();
      afficherCarte(nouvelleCarte, "banque");

      console.log("Nouvelle carte ajoutée pour la banque :", nouvelleCarte);
      
      scoreBanque += valeurCarte(nouvelleCarte, "banque");
      document.getElementById("messageScoreBanque").innerHTML =
        "<p>La Banque a " + scoreBanque + " points</p>";
      nombreTirages++;
    }
    if (scoreBanque > 21 || scoreJoueur > scoreBanque) {
      document.getElementById("messageScoreJoueur").innerHTML +=
        "<p>Vous avez gagné la partie !</p>";
      partiesGagnees++;
      window.alert("Vous avez gagné!");
    } else if (scoreJoueur === scoreBanque) {
      document.getElementById("messageScoreJoueur").innerHTML +=
        "<p>Match nul !</p>";
        partiesNulles++;
        partiesPerdues++;
    } else {
      document.getElementById("messageScoreJoueur").innerHTML +=
        "<p>Vous avez perdu !</p>";
      partiesPerdues++;
    }
    flag = true;
    document.getElementById("carte").style.display = "none";
    document.getElementById("reste").style.display = "none";
    document.getElementById("continuer").style.display = "block";
    
  }
  updateResultats();
}

// OnClick bouton Nouvelle partie
function nouvellePartie() {
  location.reload();
}

// Fonction pour continuer à jouer après chaque partie
function continuer() {
  // Incrémenter le compteur de parties
  compteurParties++;
  // vérifier si la partie en cours est la 3eme partie:
  if (compteurParties > 3) {
    document.getElementById("continuer").style.display = "none";
    stat.push([partiesGagnees, blackJacks, partiesPerdues, partiesNulles]);
    // Affichage des statistiques de la manche précédente
    afficherStatistiques();
    console.log(
      "Statistiques mises à jour :",
      partiesGagnees,
      blackJacks,
      partiesPerdues,
      partiesNulles
    );
    // Appel à la fonction nouvelleManche pour passer à la prochaine manche
    nouvelleManche();
  } else {
    // Afficher le numéro de la manche et de la partie
    document.getElementById("manche").innerHTML =
      "Manche : " + compteurManches + " -  Partie " + compteurParties;
    // Masquer le bouton "Continuer" et afficher les boutons "Carte" et "Reste"
    document.getElementById("continuer").style.display = "none";
    document.getElementById("carte").style.display = "block";
    document.getElementById("reste").style.display = "block";
    // Initialiser une nouvelle partie
    paquet = [];
    cartesTirees = []; // test
    initialiserPaquet();
    console.log("nouveau paquet de cartes : ", paquet);
    initialiserPartie();
  }
}

// Fonction pour passer à la prochaine manche
function nouvelleManche() {
  // Réinitialiser le compteur de parties
  compteurParties = 1;
  // Incrémenter le compteur de manches
  compteurManches++;
  // Réinitialiser les compteurs pour la nouvelle manche
  partiesGagnees = 0;
  partiesPerdues = 0;
  blackJacks = 0;
  partiesNulles = 0;
  // Réinitialiser le flag
  flag = false;
  // Afficher un messge indiquant le numéro de la nouvelle manche
  document.getElementById("manche").innerHTML =
    "Manche : " + compteurManches + " -  Partie " + compteurParties;
  // Initialiser une nouvelle partie
  paquet = [];
  cartesTirees = []; // test
  initialiserPaquet();
  console.log("nouveau paquet de cartes : ", paquet);
  initialiserPartie();
  // Masquer le bouton "Continuer" et afficher les boutons "Carte" et "Reste"
  document.getElementById("continuer").style.display = "none";
  document.getElementById("carte").style.display = "block";
  document.getElementById("reste").style.display = "block";
}

// Fonction qui affiche les statistiques de la manche en cours
function updateResultats() {
  // Afficher les statistiques de la partie en cours
  document.getElementById("win").innerHTML =
    "Parties gagnées: " + partiesGagnees;
  document.getElementById("blackjack").innerHTML =
    "dont blackjack: " + blackJacks;
  document.getElementById("lost").innerHTML =
    "Parties perdues: " + partiesPerdues + "dont nulles: " + partiesNulles;
}

// Fonction qui affiche les statistiques des manches précédentes
function afficherStatistiques() {
  let message = "";
  for (let i = 0; i < stat.length; i++) {
    let manche = i + 1;
    message += "Manche " + manche + ": " 
      +  "Victoires: " + stat[i][0] 
      + "(dont " + stat[i][1] + " blackjack) - " 
      + "Défaites: " + stat[i][2] 
      + "(dont nulles: " + stat[i][3] + ")<br>";
  }
  document.getElementsByClassName("statistiques")[0].innerHTML = message;
}


// Lancer le jeu en initialisant le paquet et la première partie
window.onload = function () {
  initialiserPaquet();
  console.log("Paquet de cartes : ", paquet);
  initialiserPartie();
};
