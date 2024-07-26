---
style: module
title: "Triage : décider quand enquêter"
description: "Lorsque vous recevez un message suspect, effectuez un triage initial afin de déterminer s'il est effectivement alveillant, de déterminer la meilleure réponse rapide pour le ou les destinataires ciblés, le cas échéant, et de déterminer si une enquête plus approfondie est nécessaire. Pour la plupart des messages, il suffit de mener des heuristiques de base pour séparer les menaces non iblées des menaces ciblées et identifier les actions de réduction des risques."
weight: 1
---

## Cas d'utilisation

Lorsque vous recevez un message suspect, effectuez un triage initial afin de déterminer s'il est effectivement malveillant, de déterminer la meilleure réponse rapide pour le ou les destinataires ciblés, le cas échéant, et de déterminer si une enquête plus approfondie est nécessaire. Pour la plupart des messages, il suffit de mener des heuristiques de base pour séparer les menaces non ciblées des menaces ciblées et identifier les actions de réduction des risques.

## Objectifs

Au terme de ce sous-thème, le participant devrait être en mesure de faire la distinction entre les e-mails légitimes, les courriers indésirables non ciblés ou les e-mails d'hameçonnage, et les e-mails ciblés en fonction de plusieurs indicateurs heuristiques.

---

## Connaissances de base

Le participant devrait être en mesure de reconnaître les techniques des e-mails d'hameçonnage courantes et les objectifs des cybercriminels. Il devrait être en mesure de repérer les signes révélateurs courants d'un message d'hameçonnage. Si vous avez besoin de vous rafraîchir la mémoire sur ce sujet, consultez le [questionnaire sur l'hameçonnage](https://phishingquiz.withgoogle.com/) de Jigsaw.

Les approches peu techniques pour déterminer si un message a été envoyé par une personne que vous connaissez sont souvent le moyen le plus simple et le plus rapide de déterminer si le message en question est authentique. Un bon exemple d'une telle approche low tech est le suivi avec l'expéditeur d'un e-mail potentiellement suspect (en supposant que vous le connaissez) sur un autre support de communication comme une messagerie instantanée pour vous assurer que c'est bien cette personne qui a envoyé l'e-mail et que celui-ci est légitime.

Consultez également ces deux articles contenant des exemples de tactiques et de techniques trompeuses couramment utilisées dans les messages d'hameçonnage : [6 attaques d'hameçonnage courantes](https://www.tripwire.com/state-of-security/6-common-phishing-attacks-and-how-to-protect-against-them) et [5 techniques d'hameçonnage courantes (vadesecure.com)](https://www.vadesecure.com/en/blog/5-common-phishing-techniques).

Critères pratiques de triage

Le spam et les messages d'hameçonnage non ciblés sont une triste réalité sur Internet. Enquêter sur les messages et les infrastructures malveillantes associées n'est qu'un exercice pratique et utile dans un petit nombre de cas. Tenez compte des critères suivants pour décider s'il vaut la peine d'examiner le message et l'infrastructure connexe :

- Ciblage : le message a-t-il été personnalisé (affichage de l'ingénierie sociale et de la connaissance préalable de l'identité de la personne ciblée) pour augmenter la probabilité qu'elle effectue l'action prévue (par exemple, cliquer sur un lien, télécharger une pièce jointe malveillante)?
- Menace : quel est l'objectif visé par le message ou la campagne? Quel est le contexte de risque/menace de la personne, de l'organisation ou de la collectivité ciblée?
- Valeur de l'intervention : quel est l'intérêt d'enquêter et d'intervenir davantage? L'interruption de l'infrastructure des cybercriminels aurait-elle une incidence valable sur l'endiguement des attaques actuelles ou futures? Quelle est la probabilité que la même infrastructure malveillante soit réutilisée? L'exposition/attribution publique la rendrait-elle moins susceptible de mener d'autres attaques? L'exposition publique contribuerait-elle à alerter d'autres cibles qui pourraient être compromises?
- Investissement : de combien de temps et de ressources un cybercriminel a-t-il besoin pour créer ce message? Ont-ils par exemple créé de nouveaux domaines et de nouvelles infrastructures?
- Unicité : le message est-il unique? Le même texte peut-il être trouvé en recherchant des citations du message sur les moteurs de recherche?

Une règle générale veut que _seuls les messages ciblés valent généralement la peine d'être étudiés_. De nombreux e-mails de spam ou d'hameçonnage s'avèrent de mauvaise qualité ou envoyés en masse. Ceux-ci sont généralement envoyés par des cybercriminels qui pourraient avoir des motifs financiers, mais qui n'ont pas ciblé l'organisation spécifiquement en raison de son travail en matière de droits de la personne ou de société civile. Ils sont donc moins susceptibles d'attaquer les ONG à l'avenir, et un compte rendu de leurs activités serait moins bénéfique pour la communauté.

Les cybercriminels qui utilisent des messages de moindre qualité ou envoyés en masse sont également susceptibles d'être attrapés par des tests et des règles automatisés, et de changer simplement de messagerie, contrairement à ceux qui poursuivent des attaques ciblées nécessitant un investissement beaucoup plus important. Les cybercriminels qui envoient des messages ciblés ont souvent des motivations (géo)politiques et peuvent utiliser l'hameçonnage dans le cadre d'une campagne hybride plus large, qui pourrait également s'adresser à d'autres ONG. Enquêter sur les messages ciblés peut donc souvent contribuer à découvrir de telles campagnes.

⚠️ N'oubliez pas que si vous avez besoin d'une aide supplémentaire et que vous ne vous sentez pas en mesure de répondre au niveau de risque ou aux besoins d'analyse d'un message malveillant, contactez les [membres de CiviCERT](https://www.civicert.org/) ou les fournisseurs d'assistance énumérés dans la [trousse à outils numériques](https://digitalfirstaid.org/).

⚠️ Lorsque vous envisagez ou menez une enquête, assurez-vous de trouver un équilibre entre les besoins en matière de réduction des dommages et de soutenir tout objectif visant à mettre en œuvre des mesures de réduction des dommages en temps opportun, comme celles énumérées dans la section [Récupérer un compte éventuellement compromis (securityinabox.org)](https://securityinabox.org/en/communication/account-compromise/).

### Contrôle de compétence

Passez du temps sur le questionnaire d'hameçonnage de [Shira](https://shira.app/) jusqu'à ce que vous ayez l'impression de pouvoir réussir les tests et de reconnaître avec précision l'hameçonnage dans plusieurs catégories d'applications. \

Discutez des deux situations suivantes avec un pair ou un mentor :

- Un utilisateur reçoit un e-mail suspect qui s'adresse à lui par son nom complet et fait référence à une boutique en ligne qu'il visite parfois pour effectuer des achats. Demandez à votre pair ou mentor pourquoi il ne s'agit peut-être pas d'un e-mail ciblé.
- Réponse possible : la base de données des clients de cette boutique a pu être piratée, ce qui aurait permis aux cybercriminels d'envoyer des e-mails « personnalisés » à tous les clients.
- Un utilisateur reçoit un e-mail et vous concluez que l'expéditeur est un acteur malveillant connu qui peut avoir une raison de le cibler. Cependant, l'e-mail ne contient pas de lien ou de pièce jointe. Discutez-en avec votre pair ou mentor et donnez deux raisons pour lesquelles cela pourrait être le cas.
  - Réponses possibles : l'expéditeur peut avoir fait une erreur. Ou l'expéditeur peut attendre que le destinataire envoie une réponse et seulement ensuite envoyer un fichier malveillant ou un lien, après qu'une relation de confiance a été construite. (Ce scénario peut se produire.)

### Ressources d'apprentissage

{{% resource title="Shira par Horizontal" description="Un questionnaire en ligne comprenant des exemples d'e-mails, où l'utilisateur doit déterminer s'ils sont malveillants ou non" languages="Anglais, espagnol, mandarin" cost="Gratuit" url="https://shira.app" %}}
{{% resource title="Questionnaire d'hameçonnage par Jigsaw" description="Un questionnaire en ligne comprenant des exemples d'e-mails, où l'utilisateur doit déterminer s'ils sont malveillants ou non" languages="27 langues" cost="Gratuit" url="Jigsaw | Questionnaire d'hameçonnage" %}}
{{% resource title="6 attaques d'hameçonnage courantes et comment s'en protéger" description="Un résumé de certaines attaques d'hameçonnage courantes, qui comprend également des méthodes plus sophistiquées utilisées par les cybercriminels" languages="Anglais" cost="Gratuit" url="https://www.tripwire.com/state-of-security/6-common-phishing-attacks-and-how-to-protect-against-them" %}}
{{% resource title="5 techniques courantes d'hameçonnage" description="Quelques techniques utilisées par les cybercriminels pour rendre les e-mails d'hameçonnage plus convaincants et échapper occasionnellement à la détection" languages="Anglais" cost="Gratuit" url="https://www.vadesecure.com/en/blog/5-common-phishing-techniques" %}}
{{% resource title="CiviCERT" description="Un réseau d'organisations de la société civile et de groupes d'intervention rapide qui se concentrent sur les cyberattaques et les menaces similaires" languages="Anglais" cost="Gratuit" url="https://www.civicert.org/" %}}
{{% resource title="Trousse à outils numérique" description="Un guide complet de soutien des protecteurs numériques qui aborde divers sujets" languages="Arabe, espagnol, farsi, français, indonésien, arménien, kirghize, birman, portugais, russe, albanais, thaï, ukrainien" cost="Gratuit" url="https://digitalfirstaid.org/en/index.html" %}}
{{% resource title="Récupérer un compte éventuellement compromis" description="Un guide concernant les mesures immédiates et à long terme à prendre lorsqu'un compte s'avère compromis" languages="Arabe, indonésien, anglais, espagnol, farsi, français, portugais, russe, thaï, turc, vietnamien, chinois, tibétain, khmer, birman" cost="Gratuit" url="https://securityinabox.org/en/communication/account-compromise/" %}}
