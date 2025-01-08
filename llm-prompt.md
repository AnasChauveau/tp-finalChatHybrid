Lien chatGpt : https://chatgpt.com/share/677e9f4a-0ce0-8007-9f7e-e3ff4cc02b8b

J'ai commencé par lui expliquer la situation, que je créer une appli avec expo et que j'attends de lui qu'il créer les fonctionnalités demandés

Ensuite je lui expliqué l'architecture de mon code et ce que j'attendais de lui dans un premier temps:
    soit création d'un splashScreen avec un message spécifique
    ajout d'une page d'accueil avec un fond d'une couleur variable ainsi qu'une luminosité variable en fonction du niveau de batterie

Il m'a alors créé une page app.tsx et une autre home.tsx


J'ai ensuite eu des erreurs avec useNavigate, alors je lui ai demandé d'utiliser expo-router

Il a donc supprimer app.tsx et réécri le programme avec une page splash.tsx en plus


Je lui ai ensuite fourni mon fichier _layout.tsx et je l'ai demandé de l'adapter

J'ai ensuite eu des problèmes à cause de la suppression de index.tsx j'ai donc renommé home.tsx en index.tsx puis j'en ai informé chat.gpt

C'est là qu'il a voulu recréer app.tsx et qu'il à changer _layout.tsx avec du un code d'autant moins fonctionnel

Je lui ai donc fait remarquer, mais il a continuer à coder dans une direction étrange


J'ai donc décidé de reprendre le code qu'il avait fait avant et de lui renvoyer le contenue de chacun de mes fichiers

Il a alors bien enregistré le nouveau contenu


Je lui ai alors demandé de retirer le bouton index qui gère le splash screen

Ce qu'il n'a pas réussi après plusieurs essais


Je lui ai ensuite demander d'utiliser la expo-brightness pour gérer la partie luminosité

Bien que le code à l'air bon cela n'a pas l'air de fonctionner


Je suis donc passer à l'étape suivante et l'ai demander de créer les boutons du menu "chat" "dog" "click" et "quit"

Le bouton quit ne s'afficher pas car il a besoin d'une page pour faire parti des Tabs.screen


Je lui demandé de trouvé une solution mais je n'ai rien eu de fonctionnel

Je suis passer à la prochaine étape

J'ai ajouter la méthode pour la couleur de fond et la batterie au fichier chat dog et click que chatgpt à créé


J'ai donc demander à chatGpt de modifier la page chat pour qu'elle affiche une image et lance un audio en plus de gérer un compteur

il m'a alors modifier la page chat et fait ajouter expo-av


j'ai ensuite eu des erreurs avec le chemin pour l'image et l'audio du chat

chatgpt à trouver le bon chemin et tous fonctionne


J'ai ensuite demager à chatGpt de me faire la page dog avec une image venant d'une api ainsi qu'avec une méthode pour envoyé un sms en plus d'un compteur

J'ai précisé que la page click affichera les compteurs de chat et dog et pourra les réinitialiser

la page dog à l'air plus ou moins ok mais le temps est écoulé