---
style: module
title: Investigação ativa - Analisando e-mails maliciosos
description: Seja através de pura engenharia social, phishing, ou envio de malware, e-mails maliciosos podem ser bem complexos. Este módulo te ensinará como interpretá-los e entendê-los, e como encontrar a sua infraestrutura relacionada.
weight: 6
---

## Caso de uso

Este módulo te ensinará como **interpretar e entender e-mails maliciosos** e **encontrar a infraestrutura para a qual eles apontam**. Quer eles sejam pura engenharia social, *phishing*, ou entrega de *malware*, emails maliciosos podem ser bem complexos. Embora o objetivo imediato desta competência seja identificar a infraestrutura do atacante, habilidades avançadas de desconstrução de e-mails complexos também são uma boa preparação para entender as campanhas de atacantes, e são uma boa introdução para analisar *malware* mais complicado. Algumas dessas técnicas também podem **te ajudar a analisar mensagens suspeitas enviadas por outros meios, como o WhatsApp**.

Observe que, durante a investigação ativa, pode ser necessário executar ações que alertarão o atacante sobre a investigação (ou, pelo menos, que alguém está interagindo com a armadilha dele). Considere se esse é ou não um custo aceitável para concluir uma investigação.

É melhor fazer esse tipo de análise a partir de uma máquina virtual ou dispositivo dedicado. Para proteção adicional, pode ser uma boa ideia usar uma VPN com boa reputação, para que seu endereço IP não vaze quando você estiver conduzindo uma investigação ativa.

Este módulo lida com a análise do _corpo_ de um e-mail malicioso, enquanto o módulo [Investigação passiva - Análise de cabeçalhos de e-mail](/pt-br/learning-path/1/module-5/) lida com o _cabeçalho_ do e-mail. Para investigações adequadas, convém usar as duas habilidades. Observe que a análise dos conteúdos e comportamentos dos anexos de e-mail é abordada na trilha de aprendizagem de Análise de Malware.

## Objetivos

Após concluir este subtópico, profissionais devem ser capazes de fazer o seguinte:

- Analisar o código HTML de um e-mail e entender o básico de MIME;
- Entender e detectar pixels de rastreamento e conteúdo ativo semelhante;
- Usar ferramentas como VirusTotal e URLScan para avaliar a presença de conteúdo malicioso em anexos e em URLs.

---
## Seção principal

### Conhecimento fundamental: E-mails HTML e MIME

Para praticar isto, você precisa entender o básico de e-mails HTML e MIME. Se achar necessário relembrar um pouco desse tópico, consulte alguns dos recursos sobre os tópicos-chave abaixo:

- A maioria dos e-mails é enviada no formato HTML, que permite o uso de vários métodos inteligentes de apresentação e enganação por *phishers* (pessoas que utilizam "iscas" para "fisgar" os seus alvos).
- Embora não seja necessário ser capaz de escrever HTML ou projetar páginas web, você deve se sentir confiante na sua capacidade de abrir e analisar o código-fonte de um email HTML, e entender os seus elementos mais essenciais. Para fazer isso, leia esta introdução a [MIME](<https://learn.microsoft.com/en-us/previous-versions/office/developer/exchange-server-2010/aa494197(v=exchg.140)>) e e-mails HTML.
- Saber algo sobre HTML é inevitável, e recursos como [W3Schools](https://www.w3schools.com/html/) podem te oferecer um bom ponto de partida. Observe também que alguns clientes de e-mail (por exemplo, Outlook) não te permitem baixar todo o corpo do e-mail.
- MIME é um padrão da Internet que estende o formato de e-mails além dos e-mails de texto simples e permite texto em conjuntos de caracteres que não sejam ASCII, anexos que não são em formato de texto, corpos de mensagens com várias partes e informações de cabeçalho em conjuntos de caracteres que não são ASCII. Funcionalidades MIME podem ser abusadas para ocultar conteúdo e anexar conteúdo malicioso. [Este artigo da Wikipédia](https://en.wikipedia.org/wiki/MIME) fornece uma boa introdução inicial.

### Identificando potenciais ameaças: Imagens incorporadas e Pixels rastreadores

Ao investigar e-mails potencialmente maliciosos para descobrir infraestrutura de atacantes, não procure apenas por links e anexos. Os atacantes podem incluir rastreadores em seus e-mails, assim como os profissionais de marketing. [Este artigo para profissionais de marketing](https://www.nutshell.com/blog/email-tracking-pixels-101-how-do-tracking-pixels-work) explica como funciona o rastreamento de e-mail. Observe que qualquer recurso carregado na Web, não apenas imagens, pode ser usado para rastreamento. Revise os tipos de informações que podem ser obtidas através de um pixel rastreador ou um elemento rastreador, incluindo informações de IP (geolocalização) e dados únicos de navegador. A Internews criou um exercício de treinamento (descrito na seção de prática abaixo) que ajudará você a se familiarizar com os rastreadores e algumas das informações que eles podem identificar.

### Ferramentas e fluxo de trabalho para análise de e-mails maliciosos

Após entender os conceitos fundamentais e as ameaças em potencial, você precisa de um fluxo de trabalho e ferramentas para análise.

- O fluxo de trabalho [Suspicious Phishing Email](https://communitydocs.accessnow.org/58-Suspicious_Phishing_Email.html) criado por Access Now fornece uma abordagem sistemática para avaliar e-mails suspeitos. Ele inclui um processo de avaliação em etapas, desde a observação inicial até a categorização e criação de relatórios de ameaças.
- [VirusTotal](https://virustotal.com/) pode ser usado para avaliar URLs e anexos quanto a existência de conteúdo malicioso conhecido. Observe que URLs e arquivos enviados podem ser acessados ​​por outros usuários e podem levar o atacante a ser alertado sobre a análise que está sendo realizada nele. Isso geralmente é um risco apenas durante campanhas muito direcionadas; em outras, os adversários geralmente assumem que alguém detectou e está analisando seus padrões de ataque.
- Confira [algumas das ferramentas de análise de email listadas neste artigo](https://intezer.com/blog/incident-response/automate-analysis-phishing-email-files/). Elas podem investigar o conteúdo e os anexos de e-mails e várias delas são baseadas em linha de comando, o que ajuda analistas que estão investigando o conteúdo criado por atores sofisticados, que podem tentar criar mensagens de maneiras que exploram falhas de segurança nos programas de e-mail. O artigo também detalha algumas técnicas que os atores maliciosos usam para frustrar a análise. [Este artigo](https://blog.joshlemon.com.au/analysing-malicious-email-files-d85d8ff76a91), de forma similar, analisa como converter arquivos do Outlook para texto puro e analisá-los através de um bloco de notas ou linha de comando, para reduzir a superfície de ataque de emails maliciosos que exploram os bugs do Outlook.

## Atividade prática

- Leia os dois estudos de caso abaixo na íntegra, observando todos os elementos novos para você, e que podem exigir prática adicional:
 - [Analyzing Malicious Email Files | por Josh Lemon | Medium](https://blog.joshlemon.com.au/analysing-malicious-email-files-d85d8ff76a91)
 - [Analyzing Malicious Emails. An intro to analyzing a phishing email | por Kyle Bubp | Medium](https://medium.com/@kylebubp/analyzing-malicious-emails-fb4ddcf0663e)
- Um projeto da Internews, com foco na segurança de jornalistas [criou um exercício de simulação](https://internews.org/resource/guide-to-facilitating-a-technical-simulation-with-canary-tokens/) para ajudar as pessoas a entender melhor e praticar o trabalho com rastreadores. Leia o projeto e complete alguns dos exercícios.

## Checagem de habilidades

Peça para colegas ou quem está te mentorando te enviar um e-mail. Idealmente, o e-mail conteria vários elementos, como pixels rastreadores, anexos, e links que se beneficiariam de uma análise aprofundada. Como alternativa, entre em sua própria caixa de entrada e escolha um e-mail que (esperamos que) não seja malicioso. Use as habilidades usadas neste módulo para analisá-lo:

- Você pode ler os cabeçalhos do e-mail para descobrir o endereço do remetente?
- Você pode confirmar a autenticidade do remetente? É provável que o e-mail tenha sido falsificado?
- Qual infraestrutura foi usada na entrega da mensagem?
- Qual conteúdo ativo (MIME, pixels rastreadores) está incluído no e-mail?
- Quais dados podem ser vazados se alguém abrir e interagir com o e-mail?
- O que o remetente quer que você faça ao receber o e-mail?

Discuta suas respostas para as perguntas acima com seu colega ou mentor.

## Recursos de aprendizagem

{{% resource title="Introdução a e-mails HTML" languages="Múltiplos" cost="Grátis" description="Uma breve introdução ao conceito de enviar e-mails que contêm HTML." url="https://en.wikipedia.org/wiki/HTML_email" %}}

{{% resource title="Introdução ao MIME" languages="Múltiplos" cost="Grátis" description="Uma breve introdução ao formato MIME de mensagens." url="https://en.wikipedia.org/wiki/MIME" %}}

{{% resource title="Como incluir imagens em e-mails" languages="Inglês" cost="Grátis" description="Apesar de ser uma página feita para quem envia e-mails, ela fala sobre técnicas que um atacante poderia usar para incorporar uma imagem em e-mails." url="https://mailchimp.com/resources/embed-image-in-email/" %}}

{{% resource title="Aprenda HTML" languages="Múltiplos (tradução automática)" cost="Grátis" description="A maioria dos e-mails maliciosos de phishing usam HTML para enganar pessoas. Para que possamos extrair URLs (e, por consequência, os endereços dos servidores), você precisará aprender um pouco de HTML." url="https://www.w3schools.com/html/" %}}

{{% resource title="Introdução a pixels rastreadores" languages="Inglês" cost="Grátis" description="Ao investigar e-mails potencialmente maliciosos para rastrear infraestruturas maliciosas, não analise apenas links ou anexos. Atacantes podem incluir rastradores em seus e-mails, da mesma forma que e-mails de marketing. Este artigo para equipes de marketing explica como esse rastreamento funciona. Note que qualquer recurso provindo da web pode ser usado para rastreio." url="https://www.nutshell.com/blog/email-tracking-pixels-101-how-do-tracking-pixels-work" %}}

{{% resource title="VirusTotal" languages="Interface principal em inglês" cost="Grátis, com algumas limitações, e funcionalidades adicionais pagas" description="Uma ferramenta para avaliar se URLs e anexos contêm ameaças conhecidas. Tenha em mente que outros usuários podem acessar URLs e arquivos submetidos na plataforma." url="https://www.virustotal.com/gui/home/url" %}}

{{% resource title="Fluxo de trabalho para e-mails maliciosos" languages="Múltiplos" cost="Grátis" description="Um manual de procedimentos para a avaliação de um e-mail suspeito." url="https://communitydocs.accessnow.org/58-Suspicious_Phishing_Email.html" %}}

{{% resource title="Manual de investigação de e-mails maliciosos do Microsoft Exchange" languages="Inglês" cost="Grátis" description="Um manual para investigar e-mails maliciosos usando um ambiente do Microsoft Exchange (em que o investigador tem acesso de administrador)." url="https://learn.microsoft.com/en-us/security/operations/incident-response-playbook-phishing" %}}

{{% resource title="Exemplo 1 de análises de malware de e-mails" languages="Inglês" cost="Grátis" description="Análises de exemplos de e-mails de *phishing*. Inclui uma análise de arquivos HTML com scripts e conteúdo maliciosos incorporados e codificados." url="https://medium.com/@kylebubp/analyzing-malicious-emails-fb4ddcf0663e" %}}

{{% resource title="Exemplo 2 de análises de malware de e-mails" languages="Inglês" cost="Grátis" description="Análises de exemplos de e-mails de *phishing*. Inclui uma análise de arquivos HTML com scripts e conteúdo maliciosos incorporados e codificados." url="https://www.vadesecure.com/en/blog/m365-phishing-email-analysis-eevilcorp" %}}

{{% resource title="Exemplo 3 de análises de malware de e-mails" languages="Inglês" cost="Grátis" description="Já que e-mails podem explorar furos de segurança em clientes de e-mail, esse guia demonstra como melhor analisá-los usando ferramentas de linha de comando e editores de texto." url="https://intezer.com/blog/incident-response/automate-analysis-phishing-email-files/" %}}

{{% resource title="Exemplo 4 de análises de malware de e-mails" languages="Inglês" cost="Grátis" description="Já que e-mails podem explorar furos de segurança em clientes de e-mail, esse guia demonstra como melhor analisá-los usando ferramentas de linha de comando e editores de texto." url="https://blog.joshlemon.com.au/analysing-malicious-email-files-d85d8ff76a91" %}}