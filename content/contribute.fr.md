---
title: Contribuer
weight: 3
navbar: true
---

## Envoyer des contributions et des commentaires

Infuse est open source ! Nous accueillons favorablement tous les efforts que vous faites pour signaler des problèmes, proposer des collaborations à l'élaboration de contenu, contribuer directement au contenu, ajouter de nouvelles ressources, apporter des corrections ou fournir d'autres traductions. Une coalition d'organisations ([Conexo](https://conexo.org/), [DefendDefenders](https://defenddefenders.org/) et [Internews](https://internews.org/)) maintient le site et examinera toutes les contributions. Veuillez prévoir jusqu'à deux semaines pour obtenir une réponse et sachez qu'il peut y avoir des limites dans les mesures qui peuvent être prises pour répondre aux commentaires. Vous pouvez envoyer des commentaires généraux et des demandes d'assistance à [contact@infuse.quest](mailto:contact@infuse.quest) afin de contacter les responsables du projet.

Cette page fournit un aperçu des façons de contribuer directement à Infuse. Il y a deux façons de le faire : éditer du texte directement sur GitHub, ou éditer à travers le système de gestion de contenu (CMS) fourni.

## Édition directe sur GitHub

Le site Infuse est hébergé sur GitHub, vous pouvez donc suggérer des modifications en cliquant sur l'endroit qui indique « Modifier cette page sur GitHub » sur n'importe quelle page du module du parcours d'apprentissage (comme indiqué ci-dessous). Notez que cela nécessite que vous ayez un compte GitHub.

![Top of a learning path module page with an arrow pointing to a link that says "Edit this Page on GitHub" ](/media/uploads/contribute-1.png)

Le lien ci-dessus devrait vous conduire à la page GitHub qui contient le parcours d'apprentissage que vous venez de visiter. Tous les parcours sont composés en utilisant Markdown (vous pouvez voir une feuille de calcul sur Markdown [ici](https://www.markdownguide.org/basic-syntax/)). Une fois sur la page, cliquez sur le bouton « modifier », qui présente un petit logo de crayon.

![GitHub page for learning path 1 module 4 with a green arrow pointing at the edit button, represented by a pencil icon](/media/uploads/contribute-2.png)

Lorsque vous terminez de modifier la page, appuyez simplement sur « enregistrer ». Cela devrait automatiquement créer une requête pull GitHub que vous pouvez ensuite soumettre à notre équipe pour qu'elle l'examine et, espérons-le, la fusionne avec le site principal !

## Édition à partir du système de gestion de contenu

Une autre méthode pour éditer Infuse dans le navigateur avec une interface conviviale consiste à soumettre des modifications ou du nouveau contenu via le système de gestion de contenu à l'adresse [https://infuse.quest/admin](https://infuse.quest/admin). Vous devrez ensuite vous connecter au backend en utilisant un compte GitHub et autoriser l'application à lire et à écrire à partir de votre propre compte GitHub. Si vous voulez savoir ce qui se passe sous le capot : cette application gère la création d'une copie du site sur votre propre compte GitHub et enregistre toutes les modifications apportées à votre copie, puis, lorsque vous souhaitez soumettre ces changements à l'équipe de développement, elle créera une requête pull GitHub que nous pourrons examiner.

![](/media/uploads/contribute-3.png)

Une fois connecté(e), vous pouvez modifier directement le contenu du site en naviguant vers la page correspondante. Dans la section des *collections*, vous pouvez accéder aux parcours d'apprentissage et passer au module spécifique que vous souhaitez modifier.

![](/media/uploads/contribute-4.png)

Une fois que vous avez sélectionné le module que vous souhaitez modifier, vous devez ouvrir la fenêtre de l'éditeur illustrée ci-dessous. Voici quelques éléments à savoir concernant l'utilisation de l'éditeur :

![](/media/uploads/contribute-5.png)

1. **Flux de travail pour enregistrer** : une fois que vous avez terminé d'apporter des changements, appuyez sur le bouton Enregistrer. Cela mettra la page en mode Brouillon. À ce stade, vous pouvez continuer de travailler sur la page ultérieurement, mais l'équipe Infuse ne sera pas alertée de vos modifications. Dès que vous le souhaitez, vous pouvez passer au statut « *En cours d'examen* », qui ouvrira une requête pull vers le dépôt principal d'Infuse.  
2. **Sélecteur de langue** : les traductions peuvent être faites ou mises à jour en sélectionnant la langue appropriée dans ce menu déroulant. Si vous souhaitez traduire une nouvelle langue, envoyez-nous un courrier électronique à l'adresse contact@infuse.quest !  
3. **Sélecteur d'éditeur** : l'éditeur de texte enrichi vous permettra d'utiliser les boutons du panneau pour contrôler le style, tandis que la sélection de Markdown nécessite que vous éditiez dans un codage Markdown correct.

## Ajouter des images

Parfois, lorsque nous ajoutons du contenu au site, nous voulons également inclure des images.

Pour ajouter des images au site Infuse, vous devez d'abord les importer dans le dossier /static/media/uploads. C'est là que nous conservons toutes les images pour les parcours d'apprentissage et autres contenus. Vous pouvez les importer manuellement via GitHub ou via l'onglet « Médias » dans le CMS.

Pour importer une image via GitHub, il suffit de l'ajouter au dossier ci-dessus.

![](/media/uploads/contribute-6.png)

Sinon, si vous préférez utiliser le CMS pour ajouter vos fichiers, vous pouvez utiliser l'onglet « Médias » (troisième à partir de la gauche) dans le coin supérieur gauche du CMS.

![](/media/uploads/contribute-7.png)

Nous pouvons également insérer des images dans le contenu de la page, soit via le CMS ou via Markdown !

Pour ajouter une image dans le CMS, cliquez simplement sur le petit « + » lorsque vous éditez un document.

![](/media/uploads/contribute-8.png)

Cela vous permettra d'insérer une image soit en parcourant un dossier d'images dans le CMS, soit en ajoutant un lien.

![](/media/uploads/contribute-9.png)

Si vous voulez insérer l'image à partir d'une URL, n'oubliez pas d'utiliser des liens relatifs. Donc, au lieu de saisir `https://infuse.quest/media/uploads/CFT2_sender_address.png` ou `https://github.com/OpenInternet/Infuse/blob/main/static/media/uploads/CFT2_sender_address.png`, saisissez simplement `/media/uploads/CFT2_sender_address.png`

![](/media/uploads/contribute-10.png)

Le CMS vous demandera deux choses de plus lorsque vous insérerez des images : un titre et un texte alternatif. Nous laissons généralement le titre vide. Le texte alternatif, par contre, doit être renseigné pour toutes les images, sauf pour celles qui ont un but purement décoratif. Ce texte est utilisé pour décrire l'image avec des mots afin que les personnes qui sont malvoyantes ou qui ne peuvent pas charger l'image pour d'autres raisons (en cas de bande passante Internet plus faible) puissent toujours en comprendre la nature. Consultez [cet article](https://fr.semrush.com/blog/texte-alternatif/) pour obtenir une introduction rapide à l'écriture d'un bon texte alternatif.

Si vous préférez insérer l'image en mode Markdown, voici le code à utiliser :

`![texte alternatif](lien relatif)`

Voici donc un exemple de code Markdown que nous avons utilisé :

`![Une zone de texte vide sur un site Web où l'utilisateur peut saisir du texte, avec un bouton Envoyer](/media/uploads/web_fundamentals_empty_box.png)`

## Développer de nouveaux parcours et modules d'apprentissage

Vous souhaitez élaborer un parcours d'apprentissage supplémentaire ou ajouter un nouveau module à un parcours existant ? Si c'est le cas, veuillez contacter [contact@infuse.quest](mailto:contact@infuse.quest) pour obtenir des indications sur la façon de faire en utilisant le cadre de travail Infuse.

Quelques éléments à prendre en compte :

* Les sujets du parcours d'apprentissage devraient couvrir l'expertise technique spécialisée (ETS). Pour en savoir plus sur la façon dont Infuse définit l'ETS, cliquez ici. Ils devraient également être applicables aux protecteurs numériques travaillant avec les communautés à risque.  
* Les parcours et modules d'apprentissage devraient suivre, dans une large mesure ou entièrement, la même structure que ceux qui ont été développés. Cette structure et ce cadre ont été soigneusement élaborés dans le cadre d'un processus de conception collaborative.  
* Les parcours d'apprentissage doivent comporter une combinaison de contenus théoriques et pratiques.  
* Dans la mesure du possible, les parcours d'apprentissage devraient se rattacher à des ressources externes pertinentes disponibles dans plusieurs langues.

