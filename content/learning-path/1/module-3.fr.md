---
style: module
title: "Sécurité opérationnelle : manipulation sécuritaire des liens et de
  l'infrastructure"
description: Lorsque vous enquêtez sur des e-mails d'hameçonnage, des pièces
  jointes, des sites Web et d'autres infrastructures malveillantes, vous devez
  prendre des mesures proactives pour vous assurer que vous et les personnes que
  vous soutenez demeurez en sécurité. Assurez-vous d'étudier cette compétence
  et, si nécessaire, de mettre en place un environnement sûr avant d'interagir
  avec des e-mails ou des pages Web suspectes et malveillantes.
weight: 3
---

## Cas d'utilisation

Lorsque vous enquêtez sur des e-mails d'hameçonnage, des pièces jointes, des sites Web et d'autres infrastructures malveillantes, vous devez prendre des mesures proactives pour vous assurer que vous et les personnes que vous soutenez demeurez en sécurité. Vous devrez également savoir quoi indiquer au destinataire des messages chaque fois qu'il sera confronté à de tels incidents et comment il peut vous le signaler en toute sécurité pour leur traitement sans risquer de se compromettre.

Assurez-vous d'étudier cette compétence et, si nécessaire, de mettre en place un environnement sûr avant d'interagir avec des e-mails ou des pages Web suspectes et malveillantes.

## Objectifs

Après avoir terminé ce sous-thème, les participants devraient être en mesure de faire ce qui suit :

- Démontrer comment traiter en toute sécurité les e-mails et les URL malveillantes pendant l'enquête sur l'infrastructure malveillante ;
- Décrire les mesures qui devraient être prises pour éviter que leur adresse IP soit divulguée pendant une enquête ;
- Décrire les prochaines étapes immédiates lorsque vous soupçonnez qu'un compte a pu être compromis ;
- Neutraliser les URL en toute sécurité.

---

## Main Section

De nombreux e-mails d'hameçonnage et messages similaires n'essaient pas seulement d'obtenir que la personne ciblée clique sur un lien, mais peuvent également tenter de collecter des données à son sujet (nous en discutons plus en détail dans le sous-thème 6). Lors d'une enquête, il est important de gérer les messages et autres infrastructures avec précaution, afin de ne pas révéler trop d'informations sur votre identité, votre travail et votre organisation à un cybercriminel, ainsi que de protéger les appareils et les comptes.

### Précautions de base

Nous divisons généralement l'analyse en deux composantes : passive (sous-thèmes 4 et 5) et active (sous-thèmes 6 et 7). L'analyse passive ne doit pas inclure les contacts avec les serveurs d'un cybercriminel, contrairement à l'analyse active.

Il est important que les analystes comprennent quels types d'activités interagissent directement avec l'infrastructure malveillante et peuvent donc être détectés. Une fois que les analystes auront acquis cette compréhension, ils pourront adapter les méthodes qu'ils utilisent aux modèles de menace pertinents.

Nous vous recommandons de tenir compte des mesures de sécurité opérationnelles suivantes lorsque vous effectuez vos analyses :

### Environnement sécurisé

Selon la sophistication des attaques auxquelles vous faites face, la sensibilité de la machine, des données et des comptes que vous utilisez, et même la sensibilité de vos activités d'enquête et votre identité personnelle, vous devrez peut-être adopter un environnement sécurisé approprié pour effectuer des travaux d'enquête. Tenez compte des suggestions suivantes lorsque vous élaborez votre solution de sécurité :

- Utilisez un VPN de bonne réputation lorsque vous effectuez toute activité pouvant impliquer une interaction avec l'infrastructure malveillante afin d'éviter que votre adresse IP réelle soit enregistrée par le cybercriminel.
- Sélectionnez et utilisez un navigateur spécifique sur votre appareil pour le travail que vous préconfigurez afin de réduire le risque d'exécution de contenu actif malveillant sur votre appareil. [NoScript](https://noscript.net/) est une excellente extension de navigateur disponible sur les navigateurs basés sur Firefox et Chromium qui empêchera l'exécution de scripts, en vous permettant ainsi d'inspecter tout contenu actif avant son exécution.
- Envisagez d'utiliser un périphérique distinct pour votre analyse ou une machine virtuelle distincte. Cet appareil et cette machine virtuelle ne doivent pas être connectés à des comptes professionnels ou personnels, à un espace de stockage en réseau ou à des réseaux sensibles. Il ne doit pas contenir d'informations sensibles (sauf si vous découvrez de telles informations au cours de votre enquête).
- Configurez une adresse e-mail spéciale à laquelle les personnes ciblées peuvent transmettre les e-mails suspects qu'elles reçoivent. (Si ces personnes reçoivent des messages suspects d'une plateforme comme WhatsApp, elles peuvent envoyer une capture d'écran du message par e-mail). Cette adresse e-mail n'a pas besoin d'être unique pour chaque personne ciblée. Assurez-vous que ce compte est protégé par un mot de passe unique et une authentification à deux facteurs et empêchez votre client de messagerie de charger automatiquement du contenu externe tel que des images. En effet, les images chargées à partir d'un serveur peuvent alerter le cybercriminel qu'elles font l'objet d'une enquête et transformer une enquête passive en enquête active (voir le sous-thème 6 pour obtenir plus de détails) ;
- Assurez-vous d'avoir un PC protégé avec une protection anti-malware à jour pour protéger votre ordinateur traitant l'analyse des logiciels malveillants contre tout débordement potentiel d'infection de logiciels malveillants sur votre ordinateur.

### Neutraliser les URL

Lorsque vous documentez des URL potentiellement malveillantes, il est pratique courante de « neutraliser » l'URL afin que les applications que vous utilisez pour les notes ou la documentation ne génèrent pas automatiquement des liens cliquables qui risqueraient de vous mener (ou qui que ce soit avec qui vous collaborez) à cliquer involontairement sur le lien ou à générer du trafic vers l'URL à partir de votre machine de travail. Certaines applications, par exemple les messageries, prévisualisent également automatiquement les liens (et extraient le contenu d'un serveur pour le faire). La neutralisation des URL les empêche de le faire.

Ceci est généralement réalisé en remplaçant la section de protocole de l'URL par un équivalent non valide, et en incluant des points dans l'URL avec des \[crochets\]. Par exemple :

| D'une URL active                 | Vers une URL neutralisée             |
| :------------------------------- | :----------------------------------- |
| https://www.site-malveillant.com | hxxps://www[.]site-malveillant[.]com |
| ftp://192.168.12.20              | fxp://192[.]168[.]12[.]20            |

Cela peut être fait manuellement en utilisant un éditeur de texte comme NotePad, Textedit ou Gedit. Consultez également les utilitaires comme [https://defang.me/](https://defang.me/) ou recherchez des outils de neutralisation (Defang) dans [CyberChef](https://gchq.github.io/CyberChef).

### Communiquer avec les personnes ciblées et déterminer les prochaines étapes immédiates lors d'un incident

Si vous soupçonnez qu'un cybercriminel a pu accéder au compte de messagerie ou à la boîte de réception de la personne ciblée ou surveille sa machine (la première situation peut être le résultat d'une attaque d'hameçonnage réussie, tandis que la seconde peut être causée par un logiciel malveillant, par exemple en exécutant une pièce jointe malveillante), demandez à la personne ciblée de ne pas utiliser la machine et le compte concernés jusqu'à ce que vous puissiez examiner la situation. Si possible, communiquez avec la personne ciblée au moyen d'un autre compte et d'un autre appareil, par exemple, Signal ou WhatsApp sur son appareil personnel.

Si vous soupçonnez que les comptes d'une personne ciblée ont été compromis, demandez-lui de changer immédiatement ses mots de passe et de forcer le compte à se déconnecter de tous les autres emplacements (la plupart des principaux services ont un paramètre qui le permet). Cela devrait empêcher le cybercriminel d'avoir accès au compte. Il sera toutefois informé que la personne ciblée a réalisé une opération indiquant que quelque chose ne va pas. Le cybercriminel a peut-être déjà téléchargé une quantité importante de données du compte.

Si vous soupçonnez que l'appareil d'une personne ciblée a été compromis, demandez-lui de modifier les mots de passe de son compte sur un autre appareil et d'éviter d'utiliser cet appareil jusqu'à ce qu'une enquête soit effectuée. Suivez les étapes décrites dans le parcours d'apprentissage Détection des logiciels malveillants.

## Pratique

- Lorsque votre VPN est désactivé (s'il est sûr de le faire), accédez à un site Web qui affiche votre adresse IP (ces sites Web sont faciles à trouver, il suffit de chercher « Quelle est mon adresse IP » dans votre moteur de recherche préféré). Pensez à ce qui se passerait si un cybercriminel apprenait votre adresse IP : votre adresse IP appartient-elle à une entreprise ou à un bureau? \
  Ensuite, activez un VPN fiable et vérifiez à nouveau votre adresse IP. \
  Enfin, [informez-vous sur les fuites DNS](https://mullvad.net/en/help/all-about-dns-servers-and-privacy) et vérifiez si votre VPN divulgue des informations DNS (la plupart des VPN ont leur propre site Web qui teste les fuites DNS, vous pouvez utiliser votre moteur de recherche préféré pour le trouver).
- Neutralisez l'URL pour [https://www.wikipedia.org/](https://www.wikipedia.org/). Collez l'URL neutralisée dans la barre d'adresse de votre navigateur Web et appuyez sur Entrée. Si le navigateur refuse de charger la page Web, cela signifie que vous avez correctement neutralisé l'URL (le navigateur Web pourrait plutôt essayer de rechercher l'URL neutralisée dans un moteur de recherche, c'est un comportement complètement normal).

## Contrôle de compétence

- Travaillez avec un pair ou un mentor qui vous enverra un jeton de bug Web généré [ici](https://canarytokens.org/generate). Ouvrez ce bug Web sur votre machine d'analyse. Une fois que vous le faites, votre pair ou votre mentor recevra des informations sur l'adresse e-mail avec laquelle il a enregistré le bug Web, y compris votre adresse IP et une brève description de votre navigateur Web appelé agent utilisateur. Discutez de ces résultats avec votre pair ou votre mentor : si vous effectuiez une analyse active, le cybercriminel verrait probablement ces détails également, puisque vous utiliseriez cette machine pour vous connecter aux serveurs qu'il contrôle.

## Ressources d'apprentissage

{{% resource title="NoScript" description="Une extension de navigateur pour les navigateurs Firefox et Chromium, qui vous permet de bloquer ou de permettre l'exécution de JavaScript de manière sélective. Lorsque vous consultez des sites Web potentiellement malveillants, elle vous permet de charger le site tout en neutralisant une grande partie de ses fonctionnalités potentiellement dommageables." languages="Anglais" cost="Gratuit" url="https://noscript.net/" %}}
{{% resource title="Defang.me" description="Un outil qui neutralise automatiquement les URL et les adresses IP" languages="Anglais" cost="Gratuit" url="https://defang.me/" %}}
{{% resource title="CyberChef" description="Un outil complet pour convertir différents formats, qui permet également de neutraliser automatiquement les URL et les adresses IP" languages="Anglais" cost="Gratuit" url="https://gchq.github.io/CyberChef/" %}}


