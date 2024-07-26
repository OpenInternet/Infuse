---
style: module
title: Conditions préalables de l'OPSEC pour détecter les logiciels malveillants
weight: 2
---
## Cas d'utilisation

Ce sous-thème permettra au participant d'assurer la sécurité du processus et des personnes impliquées, et de mettre en œuvre une politique de sécurité dans l'environnement informatique que le participant utilise pour la détection de logiciels malveillants.

## Objectifs

Après avoir terminé ce sous-thème, le participant devrait être en mesure d'assurer la confidentialité et l'intégrité des données, ce qui comprend :

- Chiffrement pendant le stockage et le transfert
- Effectuer des sommes de contrôle après les acquisitions de données
- Ne pas utiliser d'appareils soupçonnés d'être compromis
- Utiliser des environnements fragilisés
- Assurer la sécurité des appareils et des serveurs utilisés dans le processus
- Modélisation des menaces et évaluation des risques
- Effectuer des sauvegardes et l'image du disque

---
## Section Principale

La sécurité opérationnelle pour la détection des logiciels malveillants peut être divisée en préoccupations liées à des scénarios spécifiques :

- Interaction directe avec un appareil de statut inconnu
- Utilisation d'un dispositif « correct » distinct pour interagir avec un dispositif dont le statut est inconnu
- Interaction avec des fichiers ou des liens de statut inconnu

### Utilisation d'un appareil dont le statut est inconnu

Dans de nombreux cas, nous vous demanderons d'inspecter un appareil à la recherche de logiciels malveillants (ou vous devrez peut-être le faire sur votre propre appareil).

Sachez que si l'appareil est compromis, vos activités peuvent être surveillées, ce qui peut avoir un impact sur le risque et la sécurité de votre client. Toute saisie d'information, y compris l’accès aux comptes en ligne ou aux communications, peut être saisie. Les périphériques de stockage externes tels que les disques durs ou les clés USB peuvent devenir des cibles de transfert de code malveillant, et toute connexion réseau peut être utilisée pour propager ou exfiltrer le code malveillant.

Notez également que l'introduction d'outils d'analyse peut déclencher un « kill switch » sur certains logiciels malveillants qui a été conçu pour échapper à la détection et à l'analyse. Dans de tels cas, la capture d'une image disque et d'autres enregistrements d'investigation peut être nécessaire pour assurer une analyse plus approfondie. Cela n'est pas abordé dans ce parcours d'apprentissage, mais dans le parcours [Analyse des logiciels malveillants](/fr/learning-path/3/).

### Utilisation d'un appareil distinct pendant le processus de détection des logiciels malveillants

Si vous soupçonnez qu'un appareil est infecté par des logiciels malveillants, vous devez en faire le moins possible jusqu'à ce que vous en sachiez plus sur son statut. Pour cette raison, vous devez toujours utiliser un appareil sur lequel vous ne soupçonnez aucune infection de logiciels malveillants pour traiter toute information sensible.

Si, par exemple, une personne que vous assistez soupçonne que son ordinateur portable ou de bureau a été compromis, demandez-lui d'utiliser son téléphone mobile pour communiquer avec vous. Il est généralement judicieux d'éteindre l'ordinateur portable ou de bureau potentiellement compromis ou au moins de le déconnecter d'Internet. Si la personne concernée a lié son compte Signal, WhatsApp ou d'autres comptes à l'appareil potentiellement compromis, il peut être judicieux de les dissocier (à partir d'un appareil que vous ne soupçonnez pas d'être compromis) pendant le processus de détection.

### Interaction avec des fichiers ou des liens de statut inconnu

Lorsque vous passez par le processus de détection de logiciels malveillants, vous pouvez rencontrer des liens ou des fichiers (soit des fichiers ordinaires ou des fichiers exécutables) concernant lesquels vous avez des doutes et que vous soupçonnez de fournir des charges utiles de logiciels malveillants. Si vous copiez ces liens ou fichiers d'un appareil potentiellement compromis vers un appareil d'analyse, il y a toujours un risque qu'ils puissent également infecter votre appareil d'analyse. Afin de réduire les risques, nous recommandons ce qui suit :

- Utiliser une machine virtuelle sur votre appareil d'analyse pour y ouvrir les fichiers. De cette façon, même si vous ouvrez un lien ou un fichier malveillant et qu'il infecte votre système, les dommages seront contenus dans votre machine virtuelle
- Utiliser des services Web et de bacs à sable (nous en parlerons plus tard dans ce parcours d'apprentissage)
- Neutraliser (defang) toutes les URL (voir la section correspondante sous le sous-thème 3 dans le parcours d'apprentissage sur les infrastructures malveillantes)
- Stocker tous les fichiers potentiellement suspects dans des dossiers compressés et protégés par mot de passe. Cela empêche leur ouverture accidentelle ou leur analyse par les outils du système d'exploitation, par exemple, lorsqu'il indexe les dossiers. Le mot de passe n'a pas besoin d'être complexe. Il peut littéralement être de type « ABC ». L'objectif est d'empêcher les ouvertures automatiques ou accidentelles du fichier.

Pour obtenir un examen plus approfondi du sujet, consultez le guide de la Defensive Lab Agency sur la [façon de traiter un appareil potentiellement compromis](https://pts-project.org/guides/g6/), en particulier :

- Isoler les appareils Android et iOS
- Procédures pour envoyer et recevoir physiquement des appareils compromis à des fins d'analyse si vous travaillez avec (ou êtes vous-même) une équipe d'analyse technique à distance
- Conseils d'introduction sur la chaîne de contrôle lors de l'analyse des appareils

Ce dernier terme sur la chaîne de contrôle fait référence aux meilleures pratiques en matière de criminalistique numérique et de réponse aux incidents pour enregistrer la manipulation d'un appareil afin de préserver les preuves et de permettre aux preuves recueillies d'être utilisées dans toute procédure judiciaire potentielle. L'article lié fournit une bonne introduction aux meilleures pratiques générales que vous pouvez suivre au cas où vous devriez traiter des preuves qui pourraient être utilisées dans un scénario ayant un fardeau de la preuve plus élevé.

## Pratique

Mettre en place une machine virtuelle exécutant REmnux, avec [les étapes décrites dans le Guide d'intervention sur le terrain pour la société civile et les médias (chapitre 6, à partir de la page 30).](https://internews.org/wp-content/uploads/2023/11/Field-Guide-to-Threat-Labs.pdf)

## Contrôle de compétence

Après avoir configuré votre MV REmnux, installez et connectez-vous à un VPN de bonne réputation. Assurez-vous que votre système principal n'est pas connecté à un VPN ou à un serveur différent de votre instance REmnux. Demandez à votre pair ou mentor de vous envoyer un jeton canari de bug Web qui sera ouvert uniquement dans REmnux, via un navigateur Web de votre choix. (Si vous ne connaissez pas encore les jetons canaris, [consultez ce guide](https://docs.google.com/document/d/14YViryXq2id2PaLeT91KxS-u67-26BDuLPTP_O5BHTM/edit?usp=sharing) que nous avons créé sur la façon dont vous pouvez les utiliser dans les formations de sécurité.)

Quelle adresse IP a-t-il déclenchée ? Quel agent utilisateur ?

Parlez à votre pair ou mentor des données qui restent dans votre machine virtuelle et de celles qui ne s'y trouvent pas. Si vous avez lancé un logiciel malveillant dans votre machine virtuelle et qu'il a contacté un serveur, cela passera-t-il par votre VPN ou votre connexion réseau résidentielle/de bureau ?

## Ressources d'apprentisage

{{% resource title="Guide intermédiaire : Comment gérer un appareil potentiellement compromis" description="Un guide étape par étape sur la façon de gérer les appareils avec iOS ou Android qui, selon vous, pourraient contenir des logiciels malveillants avant de commencer le travail de détection" languages="Anglais" cost="Gratuit" url="https://pts-project.org/guides/g6/" %}}
{{% resource title="Chapitre sur les machines virtuelles du Guide d'intervention sur le terrain pour la société civile et les médias (chapitre 6)" description="Une introduction générale à la façon dont les analystes de logiciels malveillants peuvent travailler avec des machines virtuelles et une installation de la distribution Linux" languages="Anglais" cost="Gratuit" url="https://internews.org/wp-content/uploads/2023/11/Field-Guide-to-Threat-Labs.pdf" %}}
{{% resource title="Simulation technique avec des jetons canaris" description="Un guide sur l'utilisation des jetons canaris, un outil de sécurité offensif, pour simuler les traqueurs de logiciels malveillants. Peut être très utile pour enseigner aux défenseurs quelles données peuvent être facilement exfiltrées" languages="Anglais" cost="Gratuit" url="https://docs.google.com/document/d/14YViryXq2id2PaLeT91KxS-u67-26BDuLPTP_O5BHTM/edit?usp=sharing" %}}