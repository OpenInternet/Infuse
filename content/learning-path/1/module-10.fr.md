---
style: module
title: Exercice Capture The Flag
description: Nous avons également conçu un exercice Capture The Flag dans lequel
  les apprenants peuvent analyser un e-mail de phishing et l'infrastructure à
  laquelle il est lié. L'exercice peut être utilisé comme pratique
  supplémentaire ou comme exercice de vérification des compétences, et peut être
  trouvé ici.
weight: 10
---

Nous avons également conçu un exercice Capture The Flag dans lequel les apprenants peuvent analyser un e-mail de phishing et l'infrastructure à laquelle il est lié. L'exercice peut être utilisé comme pratique supplémentaire ou comme exercice de vérification des compétences, et peut être trouvé ci-dessous.

Vous êtes assis dans la salle de rédaction animée de la presse où vous travaillez en tant qu'administrateur IT, concentré sur vos tâches entouré de moniteurs lumineux. Votre collègue Alia du service comptable arrive en courant avec une expression préoccupée, vous informant qu'elle a transmis un e-mail prétendant être de PayPal, l'incitant à agir immédiatement en raison d'une activité de compte suspecte. L'organisation de la presse compte sur PayPal pour le traitement des paiements d'abonnement. Votre intérêt est immédiatement attisé lorsque vous reconnaissez le potentiel d'une attaque malveillante, et vous commencez une enquête.

_Cette activité utilise un exemple d'e-mail et de page de destination nécessaires à cette activité. Téléchargez les fichiers ici: {{< fontawesome "solid/download" >}} [Matériaux CTF](/files/ctf-materials.zip)_

### Question 1 : Quelle est l'adresse e-mail de l'expéditeur de l'e-mail?

{{< question title="Instructions" open="true" >}}
Découvrez comment l'adresse de l'expéditeur apparaîtrait dans le client e-mail si l'e-mail était ouvert.
{{< /question >}}

{{< question title="Indications" >}}
Il existe plusieurs façons de voir à quoi ressemblerait l'e-mail pour le destinataire. La manière la plus simple est d'ouvrir le fichier dans un client de messagerie, ce que nous avons fait dans les exemples ci-dessous. Cependant, dans le contexte d'une menace ciblée, cela peut être une mauvaise idée, au cas où le fichier contiendrait des scripts qui pourraient exploiter les clients de messagerie, collecter des informations sur le périphérique ou charger des ressources externes (comme des images/pixels de suivi) qui révèlent votre adresse IP à l'attaquant. Dans le cadre de cette démonstration, il est sûr d'ouvrir le fichier EML dans votre client e-mail, mais pour un travail en direct, envisagez quelques alternatives :

- Utiliser un client de messagerie dans une machine virtuelle pouvant être restaurée à une capture instantanée sûre
- Ouvrir le fichier dans un éditeur de texte et lire directement le contenu HTML
- Renommer le fichier en .mht et l'ouvrir dans un navigateur web (envisagez d'utiliser une machine isolée et de vous connecter à un VPN pour éviter la collecte d'IP par les pixels de suivi)
- Utiliser un service en ligne tel que [https://www.emlreader.com/](https://www.emlreader.com/) ou [https://www.encryptomatic.com/viewer/](https://www.encryptomatic.com/viewer/) pour afficher l'e-mail. L'analyseur d'en-têtes e-mail de MXToolBox [https://mxtoolbox.com/EmailHeaders.aspx](https://mxtoolbox.com/EmailHeaders.aspx) (utilisé plus tard dans cette démonstration) rendra également le contenu HTML si vous l'incluez dans les en-têtes copiés.
- Utiliser un outil d'eDiscovery capable de rendre les fichiers EML
- Auto-héberger votre propre service pour rendre les fichiers EML, tel que [https://github.com/xme/emlrender](https://github.com/xme/emlrender)

Dans cette démonstration, nous allons simplement ouvrir l'e-mail (paypal.eml) dans un programme de messagerie.

![Menu contextuel de Windows affichant l'option Ouvrir avec -> Outlook](/media/uploads/CTF1_open_in_mail_program.png)

En examinant l'e-mail, nous voyons l'adresse e-mail visible de l'expéditeur

![Image d'un prétendu e-mail de Paypal indiquant une activité suspecte sur le compte avec un lien pour vérifier le compte. L'e-mail provient de paypal@service.com](/media/uploads/CTF2_sender_address.png)
{{< /question >}}

{{< question title="Réponse" >}}
L'adresse e-mail de l'expéditeur est : paypal@service.com
{{< /question >}}

### Question 2 : Quel est le sujet de cet e-mail?

{{< question title="Instructions" open="true" >}}
En continuant d'examiner l'e-mail, recherchons d'autres caractéristiques qui pourraient indiquer qu'il s'agit de messages de spam ou malveillants. Regardons le sujet et d'autres signes dans le texte ! Si vous lisez l'e-mail dans un éditeur de texte, vous le trouverez dans la ligne Objet : .
{{< /question >}}

{{< question title="Indications" >}}
![Une capture d'écran de l'e-mail en question, mettant en évidence sa ligne d'objet](/media/uploads/CTF3_email_subject.png)

Voici quelques points clés à surveiller dans un e-mail de phishing :

- Sens d'urgence
- Ouverture étrange, ne vous adresse pas par votre nom
- Erreurs de grammaire
- L'adresse de l'expéditeur ou les URL dans l'e-mail sont obscurcies ou ne correspondent pas au site Web prétendu dans l'e-mail
  {{< /question >}}

{{< question title="Réponse" >}}
Le sujet de l'e-mail est : _We called you and you didn't answer_
{{< /question >}}

### Question 3 : Quelle action est demandée?

{{< question title="Instructions" open="true" >}}
Lorsque nous examinons un e-mail potentiellement malveillant, nous devons également comprendre ce que l'expéditeur voulait que nous fassions. Quelle action supposez-vous que l'expéditeur voulait que le destinataire fasse?
{{< /question >}}

{{< question title="Indications" >}}
![Une capture d'écran de l'e-mail avec les éléments suivants soulignés: "detected suspicious activity", "payments have been suspended", "complete account verification" "resume payments"](/media/uploads/CTF4_email_actions.png)
{{< /question >}}

{{< question title="Réponse" >}}
Cliquer sur l'un des deux liens dans l'e-mail.
{{< /question >}}

## Reconnaissance de la menace

### Question 4 : Défuser le lien "Confirmer"

{{< question title="Instructions" open="true" >}}
En approfondissant l'analyse, la première étape consiste à comprendre la différence entre les liens suspects. Lorsque nous analysons des liens potentiellement suspects, nous les défaisons généralement - cela signifie remplacer certains caractères pour que le lien ne puisse pas être cliqué accidentellement ou ne déclenche pas de mécanismes automatisés de scan de liens ou de virus. Défuser les liens est considéré comme une bonne pratique dans les enquêtes de sécurité. Les liens défusés ne deviendront pas automatiquement des liens cliquables mais conserveront néanmoins les informations de lien d'origine, par exemple hxxp[://]www[.]google[.]com.
{{< /question >}}

{{< question title="Indications" >}}
Vous pouvez défuser un lien dans un éditeur de texte. Ici, nous utiliserons [CyberChef](gchq.github.io/CyberChef) pour défuser l'URL car nous utiliserons également CyberChef pour d'autres étapes. CyberChef est une application web avec de nombreuses fonctions qui peuvent vous aider à analyser des données liées à la sécurité. Voici une [brève introduction](https://udel.codes/cyberchef.html) à son interface et à ses fonctions.

Dans le cadre de cet exercice, jouez avec CyberChef et défusez le lien "please confirm" de l'e-mail joint.

![Une capture d'écran montrant comment faire un clic droit sur un e-mail, puis appuyer sur « copier le lien »](/media/uploads/CTF5_copylink.png)
Tout d'abord, copiez le lien hypertexte de l'e-mail.

![Une capture d'écran de CyberChef, avec « defang » tapé dans sa barre de recherche](/media/uploads/CTF6_defang.png)
Ensuite, prenez l'entrée "Defang URL" de CyberChef et faites-la glisser dans la section "Recette"

![Une capture d'écran de CyberChef qui a réussi à défusé un e-mail](/media/uploads/CTF7_defanged.png)

Une fois que vous avez collé l'URL dans la section d'entrée de CyberChef, il générera automatiquement une version défusée de celle-ci.
{{< /question >}}

{{< question title="Réponse" >}}
hxxps[://]d[.]pr/mUxkOm
{{< /question >}}

### Question 5 : Utilisez CyberChef pour extraire et défuser tous les liens dans l'e-mail

{{< question title="Instructions" open="true" >}}
Vous pouvez utiliser CyberChef pour effectuer de nombreuses tâches d'analyse différentes. Cette fois, trouvez et décrivez un flux de travail pour extraire facilement et défuser tous les liens de l'e-mail.
{{< /question >}}

{{< question title="Réponse" >}}
Vous pouvez utiliser une "recette" - ou une série d'étapes connectées - dans CyberChef pour effectuer une analyse plus complexe. Pour extraire et défuser tous les URL du message, il vous suffit d'exécuter une recette avec les flux de travail "extraire les URL" et "défuser les URL" et de coller le contenu complet de l'e-mail (copié depuis un éditeur de texte brut) en tant qu'entrée. Si vous cochez la case "unique" sous "extraire les URL", vous verrez que les résultats différeront de ceux de la capture d'écran, et qu'un seul URL sera affiché, celui que vous avez défusé ci-dessus. Le fait qu'il n'y ait qu'un seul URL, répété plusieurs fois, dans l'e-mail est une bonne nouvelle pour nous - cela rendra notre analyse beaucoup plus simple.

![Capture d'écran d'une recette CyberChef qui extrait d'abord toutes les URL d'un fichier texte, puis les nettoie](/media/uploads/CTF9_cyberchef.png)
{{< /question >}}

## Investigation passive des URL, noms d'hôte et adresses IP

### Question 6 : À quelle date le lien défusé de la question 4 a-t-il été soumis à VirusTotal?

{{< question title="Indications" >}}
Pour les prochaines questions, nous utiliserons [VirusTotal](https://www.virustotal.com/). C'est un service en ligne qui agit comme un scanner de sécurité pour les fichiers et les URL suspects. Pensez-y comme un inspecteur numérique. Vous pouvez télécharger un fichier ou fournir une URL, et VirusTotal le scanne avec des moteurs antivirus et des vérificateurs de sites web de dizaines de différentes entreprises de sécurité. Il effectue également des analyses supplémentaires. Cela vous donne un aperçu rapide de la probabilité que le fichier ou le site web soit malveillant. C'est un outil précieux pour vous aider à identifier les menaces potentielles avant d'ouvrir une pièce jointe ou de cliquer sur un lien. Il contient également des métadonnées sur les fichiers qui peuvent être utiles. Ici, nous utiliserons l'historique d'entrée pour savoir quand un indicateur malveillant a été observé pour la première fois.

Collez l'URL de la question 4 dans VirusTotal (cette fois, vous devez coller l'URL complète, pas la version défusée). Allez à l'onglet "détails" et regardez l'historique de capture de l'URL.

![Une capture d'écran de l'historique de VirusTotal, montrant trois dates : première soumission, dernière soumission, dernière analyse](/media/uploads/CTF9_VirusTotal.png)
{{< /question >}}

{{< question title="Réponse" >}}
08/20/2018
{{< /question >}}

### Question 7 : Quelle adresse IP de service VirusTotal donne-t-elle pour l'URL dégradée de la question 4?

{{< question title="Indications" >}}
En regardant également l'onglet "détails" dans VirusTotal, recherchez l'adresse IP de service.

![Une capture d'écran de VirusTotal montrant une réponse HTTP, avec l'URL finale et l'adresse IP de service fournies](/media/uploads/CTF10_VirusTotalIP.png)
{{< /question >}}

{{< question title="Réponse" >}}
52.89.102.146
{{< /question >}}

### Question 8 : Combien de fournisseurs sur VirusTotal détectent cette URL comme malveillante?

{{< question title="Instructions" open="true" >}}
Lors de la visualisation de l'URL dans VirusTotal, recherchez tous les détails sous l'onglet "détection". Pour une plongée plus profonde dans ce que VirusTotal entend par détection et quelles sont ses méthodologies, consultez [sa documentation](https://docs.virustotal.com/).
{{< /question >}}

{{< question title="Réponse" >}}
5 Fournisseurs
{{< /question >}}

### Question 9 : Dans quel registraire le domaine dégradé de la question 4 a-t-il été enregistré?

{{< question title="Instructions" open="true" >}}
Pour rechercher des informations liées à l'enregistrement d'un domaine, vous pouvez utiliser une recherche whois. Vous pouvez effectuer une telle recherche soit via un outil de ligne de commande sur votre appareil, soit via une application dédiée.
{{< /question >}}

{{< question title="Indications" >}}
Ici, nous utilisons un site whois pour l'extraire

![capture d'écran d'une recherche WHOIS du domaine d.pr](/media/uploads/CTF11_whois.png)
{{< /question >}}

{{< question title="Réponse" >}}
Internet Technology Solutions
{{< /question >}}

### Question 10 : Où se situe géographiquement l'adresse IP de service que vous avez identifiée grâce à VirusTotal?

{{< question title="Instructions" open="true" >}}
Les adresses IP sont vaguement liées à des emplacements géographiques, comme des villes ou des districts. Il existe de nombreux services en ligne où vous pouvez saisir une adresse IP et en apprendre davantage sur l'endroit où elle est le plus susceptible de se trouver. Bien que ce type de vérification ne soit pas parfait et puisse parfois commettre des erreurs, il peut néanmoins constituer une partie importante des enquêtes sur l'infrastructure malveillante.

Il est intéressant de comparer les informations que vous recevez d'une recherche whois avec celles que vous recevez des recherches de localisation IP. Vous pourriez découvrir que l'adresse IP que vous essayez d'investiguer appartient à un fournisseur de VPN ou à une grande entreprise technologique comme Google - dans ce cas, vous n'apprendrez pas grand-chose de ces enquêtes ; l'emplacement IP correspondra probablement à l'un des centres de serveurs de ces entreprises et pourrait avoir peu à voir avec l'emplacement de la personne ou de l'entité que vous essayez d'investiguer.

![Capture d'écran d'une recherche geoIP d'une adresse IP, montrant qu'elle provient de Portland, Oregon](/media/uploads/CTF12_geoIP.png)
{{< /question >}}

{{< question title="Réponse" >}}
Portland, Oregon, États-Unis
{{< /question >}}

## Investigation passive des en-têtes d'e-mail

### Question 11 : Quel est le chemin de retour du premier e-mail que vous avez examiné?

{{< question title="Instructions" open="true" >}}
Pour les questions suivantes, nous utiliserons un outil appelé [MxToolbox](https://mxtoolbox.com/). C'est un outil qui peut analyser les en-têtes d'e-mail, les noms d'hôtes, le statut du spam, et bien plus encore. Nous nous concentrerons sur sa fonction d'analyse d'en-têtes, dans laquelle vous pouvez copier et coller tous les en-têtes d'un e-mail (ou même l'e-mail entier !) et effectuer quelques analyses de base dessus.
{{< /question >}}

{{< question title="Indications" >}}
Tout d'abord, ouvrez l'e-mail à l'aide d'un éditeur de texte de votre choix et copiez son contenu. Ensuite, collez-le dans l'outil "Analyze Headers" de MxToolbox

![Une capture d'écran des en-têtes d'e-mails collés dans MX Toolbox Analyzer](/media/uploads/CTF8_MX_analyzer.png)

Une fois que vous avez cliqué sur "Analyze Header", vous pouvez voir le chemin de retour

![capture d'écran de MX Toolbox donnant un chemin de retour complexe basé sur les en-têtes analysés](/media/uploads/CTF13_return_path.png)
{{< /question >}}

{{< question title="Réponse" >}}
paparazi@rjttznyzjjzydnillquh.designclub.uk.com
{{< /question >}}

### Question 12 : Quel sont le premier saut et l'adresse du serveur SMTP de cet e-mail?

{{< question title="Instructions" open="true" >}}
Allez dans le fichier "mx-toolbox-header-analysis", regardez la section des informations de relais.

![Une autre capture d'écran des analyses de la boîte à outils MX, avec un relais initial mis en évidence](/media/uploads/CTF14_relay.png)
L'adresse du serveur de messagerie

![Une autre capture d'écran des analyses de la boîte à outils MX, avec l'adresse du relais en surbrillance](/media/uploads/CTF15_address.png)
{{< /question >}}

{{< question title="Réponse" >}}
Premier saut : efianalytics.com 216.244.76.116

SMTP : `2002:a59:ce05:0:b0:2d3:3de5:67a9`
{{< /question >}}

## Investigation active des pages web malveillantes

### Question 13 : Quel est l'identifiant de la victime présent dans le code du site web?

{{< question title="Instructions" open="true" >}}
Si le destinataire de l'e-mail a cliqué sur le lien, il serait arrivé sur une page de destination. Allez dans le fichier du package d'activités pour ouvrir "paypal.html", examinez le code source et recherchez l'identifiant de la victime. Utilisez CyberChef pour le décoder afin de trouver une chaîne de texte.
{{< /question >}}

{{< question title="Indications" >}}
Dans cet exercice, vous rencontrerez une chaîne de texte encodée en Base64. Base64 est une technique de transformation de texte ayant de nombreuses utilisations, mais dans ce cas, elle vise à obscurcir une chaîne de texte : la chaîne est toujours là, mais elle est enregistrée d'une manière qui ne peut pas être facilement repérée par l'œil humain ou par une simple recherche de texte. Si c'est la première fois que vous rencontrez Base64 dans votre travail, il vaut la peine d'en lire [un peu plus à ce sujet et sur d'autres formats d'obfuscation](https://anithaana3.medium.com/common-text-encoding-methods-for-code-obfuscation-9399757eb5c3). Les auteurs de logiciels malveillants aiment obscurcir certains textes dans leurs programmes en utilisant une technique comme Base64 pour rendre l'analyse plus difficile.

CyberChef peut encoder et décoder du texte en Base64.

Nous ouvrons à nouveau le code de la page de phishing (.html) joint

![Capture d'écran d'un fichier HTML sur lequel on clique avec le bouton droit de la souris dans l'Explorateur Windows, puis on l'ouvre dans le Bloc-notes](/media/uploads/CTF16_open_webpage_notepad.png)

nous recherchons l'identifiant de la victime dans le code source
![Capture d'écran d'une personne effectuant une recherche dans le fichier texte brut ouvert dans le Bloc-notes et trouvant un élément de données appelé « victimID »](/media/uploads/CTF17_searchID.png)

Ensuite, nous pouvons coller la valeur que nous avons découverte dans CyberChef. L'outil dispose d'une fonction baguette magique qui détecte et convertit automatiquement l'encodage - nous pourrions l'utiliser !

![Une capture d'écran de la fonction baguette magique de CyberChef](/media/uploads/CTF19_cyberchef_wand.png)

Hourra ! La baguette magique a détecté que l'entrée est encodée avec Base64 et l'a décodée automatiquement, nous donnant la réponse !

![Une capture d'écran de CyberChef décodant l'entrée Base64 en texte brut](/media/uploads/CTF18_cyberchef_result.png)
{{< /question >}}

{{< question title="Réponse" >}}
Th1s_1s_pH1sh1ng_Em3il
{{< /question >}}

## Autres ressources et liens

{{% resource title="Documentation de la communauté de la ligne d'assistance Access Now pour répondre aux e-mails suspects/phishing" languages="Anglais" cost="Gratuit" description="Client reçoit un e-mail suspect/à caractère de phishing" url="https://accessnowhelpline.gitlab.io/community-documentation/58-Suspicious_Phishing_Email.html#" %}}

{{% resource title="Liste de tous les types d'enregistrements DNS" languages="Anglais, Chinois, Japonais, Coréen, Russe, Serbe, Ukrainien, Espéranto, Hongrois, Vietnamien, Italien, Espagnol, Français" cost="Gratuit" description="Inclut (presque?) tous les types d'enregistrements DNS." url="https://fr.wikipedia.org/wiki/Liste_des_enregistrements_DNS" %}}

{{% resource title="Rapports d'Amnesty sur les campagnes de phishing" languages="Multiples, selon le rapport" cost="Gratuit" description="Une liste d'exemples de la façon dont une campagne de phishing ciblée contre les défenseurs des droits humains, les activistes et les journalistes se présente" url="https://www.amnesty.org/en/search/phishing/" %}}
