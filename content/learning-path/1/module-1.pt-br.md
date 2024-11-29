---
style: module
title: "Triagem - Decidindo quando investigar"
description: "Ao receber mensagem suspeita, ainda que encaminhada, conduza uma triagem inicial para determinar se de fato ela é mal intencionada e, no caso de ser com alvo, descobrir a maneira mais rápida de reagir, averiguando se uma investigação mais aprofundada se faz necessária. Para a maioria dessas mensagens, uma heurística básica para separar as ameaças com e sem alvo e a definição de ações de redução de danos é o suficiente."
weight: 1
---
## Caso de uso

Ao receber mensagem suspeita, ainda que encaminhada, conduza uma triagem inicial para determinar se de fato ela é mal intencionada e, no caso de ser com alvo, descobrir a maneira mais rápida de reagir, averiguando se uma investigação mais aprofundada se faz necessária. Para a maioria dessas mensagens, uma heurística básica para separar as ameaças com e sem alvo e a definição de ações de redução de danos é o suficiente.

## Objetivos

Após completar este subtópico, e tendo como base alguns indicadores heurísticos, a distinção entre e-mails legítimos, spam, e-mails de phishing e aqueles com alvo deve ser nítida.

- - -

## Conhecimento fundamental

A pessoa profissional deve ser capaz de reconhecer técnicas comuns de e-mails de phishing e objetivos de atacantes, além de detectar indícios de mensagens de phishing. Caso seja necessário reforçar estes conhecimentos, experimente o [Teste sobre phishing](https://phishingquiz.withgoogle.com/?hl=pt-BR).

Abordagens de tecnologia de baixo custo para determinar se uma mensagem realmente foi enviada por alguém que você conhece costuma ser a forma mais simples e rápida de constatar a autenticidade da mensagem. Um bom exemplo deste tipo de abordagem é confirmar o envio e legitimidade do e-mail suspeito (considerando que tenha vindo de alguém que você conhece) em outro canal de comunicação, como aplicativos de mensagens instantâneas. 

Além disso, dê uma lida nestes artigos com exemplos de táticas e técnicas enganosas de uso comum em mensagens de phishing: [6 ataques comuns de phishing e como se progeter contra eles (em inglês)](https://www.tripwire.com/state-of-security/6-common-phishing-attacks-and-how-to-protect-against-them) e [5 técnicas comuns de phishings (vadesecure.com, em inglês)](https://www.vadesecure.com/en/blog/5-common-phishing-techniques).

## Critérios práticos de triagem

Infelizmente, spam e phishing sem alvo são realidade recorrente na internet. A investigação de mensagens e infraestruturas maliciosas relacionadas é um exercício prático e útil em uma pequena parcela de casos. Considere os seguintes critérios para definir se vale a pena gastar tempo investigando a mensagem e a infraestrutura:

* Mira: a mensagem foi customizada (com a ajuda da engenharia social e conhecimento prévio sobre a identidade da pessoa alvo) para aumentar as chances de sucesso da ação planejada (pelo clique em um link, download de um anexo malicioso)?
* Ameaça: qual o objetivo da mensagem/campanha? Quais são os contextos de riscos/ameaça da pessoa alvo, organização, ou comunidade?
* Valor da intervenção: qual o valor de seguir investigando e intervindo? A interrupção da infraestrutura atacante teria impacto significativo na contenção de ataques atuais ou futuros? Quais as chances de que a mesma infraestrutura maliciosa seja reutilizada? A exposição/atribuição ao público dificultaria a condução de outros ataques? A exposição pública do ataque ajudaria outras pessoas alvo que poderiam ser comprometidas?
* Investimento: de quanto tempo e quantos recursos atacantes precisaram para criar a mensagem? Foi necessário criar domínios e infraestruturas?
* Singularidade: a mensagem é exclusiva? O mesmo texto pode ser encontrado a partir de citações em mecanismos de busca?

Uma regra geral é que *apenas mensagens com alvo usualmente são dignas de investigação*. Muitos e-mails de phishing ou spam têm qualidade baixa ou são enviados em massa, muitas vezes por adversáries que podem ter motivações financeiras, mas não miraram em organizações especificamente por conta do trabalho relacionado a direitos humanos ou sociedade civil. Sendo assim, é pouco provável que ataquem ONGs no futuro, e um registro das atividades deles não seria tão benéfico para a comunidade.

Provavelmente, atacantes que enviam mensagens em massa ou de baixa qualidade são pegos por meio de testes e regras automatizados, e simplesmente ajustam as mensagens conforme necessidade, em contraste aos ataques com alvo, que requerem investimento muito maior. Pessoas adversárias que enviam mensagens com alvo frequentemente têm motivações geopolíticas, e utilizam phishing como parte de uma campanha híbrida mais ampla, que poderia ser direcionada a outras ONGs. Investigar mensagens com alvo pode, portanto, ajudar a revelar campanhas maiores.

⚠️ Lembre-se: caso necessário, e você não se sinta confiante em responder à altura do nível de risco ou análise de uma mensagem maliciosa, busque ajuda de parcerias da [CiviCERT](https://www.civicert.org/), ou através de organizações de suporte listadas na [Digital First Aid Kit (“Kit de primeiros socorros digitais”)](https://digitalfirstaid.org/pt/).

⚠️ Ao considerar ou conduzir de fato uma investigação, garanta um equilíbrio entre redução de danos e suporte de quaisquer alvos, como aquelas listadas na [Recuperação de possível conta comprometida (securityinabox.org)](https://securityinabox.org/pt/communication/account-compromise/).

## Checagem de habilidades

Dedique algum tempo ao quiz do [Shira (em inglês)](https://shira.app/) até que se sinta apte a passar nos testes confortavelmente, e reconhecer phishing em diversas categorias de apps.

## Recursos de aprendizagem

{{% resource title="Shira, criado por Horizontal" languages="Inglês, espanhol, mandarim" cost="Grátis" description="Quiz online com amostras de e-mails que usuáries devem determinar se são maliciosos ou não." url="https://shira.app/" %}}

{{% resource title="Phishing Quiz, criado por Jigsaw" languages="27 idiomas, incluindo português" cost="Grátis" description="Teste online com amostras de e-mails que usuáries devem determinar se são maliciosos ou não." url="https://phishingquiz.withgoogle.com/?hl=pt-BR" %}}

{{% resource title="6 ataques comuns de phishing e como se proteger contra eles" languages="Inglês" cost="Grátis" description="Um resumo de alguns dos ataques comuns de phishing, incluindo métodos mais sofisticados." url="https://www.tripwire.com/state-of-security/6-common-phishing-attacks-and-how-to-protect-against-them" %}}

{{% resource title="5 técnicas comuns de phishing" languages="Inglês" cost="Grátis" description="Perspectiva sobre algumas técnicas utilizadas por atacantes para tornar os e-mails mais convincentes e indetectáveis." url="https://www.vadesecure.com/en/blog/5-common-phishing-techniques" %}}

{{% resource title="CiviCERT" languages="Inglês" cost="Grátis" description="Rede de organizações da sociedade civil e grupos de resposta rápida que se concentram em ataques cibernéticos e similares." url="https://www.civicert.org/" %}}

{{% resource title="Kit de primeiros socorros digitais" languages="Árabe, espanhol, farsi, francês, indonésio, armênio, quirguistanês, burmês, português, russo, albanês, tailandês, ucraniano" cost="Grátis" description="Guia de apoio a protetores digitais que lidam com uma variedade de problemas." url="https://digitalfirstaid.org/pt/" %}}

{{% resource title="Recuperação de possível conta comprometida" languages="Árabe, indonésio, inglês, espanhol, farsi, francês, português, russo, tailandês, turco, vietnamita, chinês, tibetano, quemer, burmês" cost="Grátis" description="Guia com passos imediatos e a longo prazo no comprometimento de contas digitais." url="https://securityinabox.org/pt/communication/account-compromise/" %}}
