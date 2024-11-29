---
style: introduction
title: Introdução
description: Leia o resumo da trilha de aprendizagem, objetivos, ameaças relacionadas e pré-requisitos
weight: 1
---

## Resumo

Mensagens de *phishing* (ou seja, mensagens que tentam "fisgar" a atenção de um alvo através da utilização de uma "isca") são frequentemente relacionadas a infraestruturas maliciosas, com intuito de roubar e utilizar credenciais de login para acessar sistemas pessoais ou organizacionais, comprometer o navegador ou aproveitar uma brecha em dispositivos via engenharia social. Trata-se de uma das técnicas mais comuns utilizadas por atores maliciosos que querem comprometer ONGs. Não raro, uma ONG que recebe tal tipo de mensagem pode achar difícil garantir que ela é suspeita, além de desconhecer a identidade e objetivo de onde vem o ataque. Se o envio parece autêntico, conferi-lo com a provável pessoa que enviou a mensagem por outro meio de comunicação que não pela mensagem em si pode ser a maneira mais prática de verificar sua legitimidade. Caso a pessoa remetente não possa ser contatada, ou a mensagem de fato não seja legítima, pode ser importante analisá-la com maior profundidade. Isso poderia evitar com que o ataque comprometa o sistema de uma ONG, prevenir ações maliciosas futuras, e alertar pessoas da comunidade em relação às pessoas atacantes e suas táticas, técnicas e procedimentos (TTPs). Os resultados das investigações, então, devem ser frequentemente compartilhados, seja por relatórios oficiais ou redes de contato, ou discussões informais entre profissionais de segurança de ONGs.

Houve diversos casos em que ONGs conduziram excelentes investigações de infraestruturas maliciosas. Isso inclui um esforço conjunto entre Bellingcat e outros grupos de setores privados [investigando ataques de phishing contra organizações focadas em assuntos relacionados à Rússia (em inglês)](https://www.bellingcat.com/news/uk-and-europe/2019/08/10/guccifer-rising-months-long-phishing-campaign-on-protonmail-targets-dozens-of-russia-focused-journalists-and-ngos/), bem como [um projeto da Human Rights Watch com a Anistia Internacional (em inglês)](https://www.hrw.org/the-day-in-human-rights/2022/12/05) que [rastreou tentativas de phishing (em inglês)](https://www.hrw.org/news/2022/12/05/iran-state-backed-hacking-activists-journalists-politicians) atribuídas ao governo iraniano.

Os ataques investigados nesta seção geralmente começam com uma mensagem de phishing. A pessoa alvo recebe uma mensagem (por e-mail, WhatsApp, ou outro meio), que tenta convencê-la a clicar em um link. Às vezes, o motivo do contato se dá pela relação da pessoa alvo com algum grupo da sociedade civil, a partir da qual atacantes esperam se embrenhar mais profundamente nos sistemas da organização. Em outros casos, atacantes miram diretamente pesquisadores ou freelancers.

Uma mensagem de phishing geralmente tenta induzir a pessoa alvo a utilizar suas credenciais, como usuário e senha (como nos ataques documentados por Bellingcat e HRW), baixar malware ou, em alguns casos, contornar o sistema de segurança para acessar informações diretamente via navegador, ou ainda instalar malware automaticamente. As seções “Investigação passiva: análise de URLs, hostnames e endereços IP” e “Investigação passiva: análise de cabeçalhos de e-mails” cobrem estas fases de um ataque.

Quando alguém recebe uma mensagem de phishing crível, ou então sofre danos por conta de um software malicioso, talvez seja necessário identificar a infraestrutura (servidores, sites, etc.) utilizada por quem realizou o ataque. Ataques com alvo usando infraestruturas comprometidas ou dedicadas são relativamente raros, e a seção “Triagem” te ajudará a determinar se faz sentido fazer análises. Ao iniciar esta trilha de aprendizagem, é interessante possuir um entendimento geral prévio sobre gerenciamento de incidentes.

Antes de acessar qualquer site controlado por atacantes, ou fazer download de qualquer malware para fins de análise, é importante aprender a fazê-lo com segurança. Esta trilha de aprendizagem considera tanto técnicas de investigação passiva, que não contatam o servidor de atacantes, e portanto dificilmente vai alertá-les sobre o andamento de uma investigação, quanto técnicas de investigação ativa, que sim, contatam servidores. Uma vez que você tenha aprendido sobre como investigar passivamente, você poderá passar às técnicas ativas para acessar os sites linkados às mensagens de phishing, e analisá-los para descobrir mais a fundo sobre a infraestrutura controlada por atacantes. Este é o assunto abordado na seção “Investigação ativa: análise de sites maliciosos”.

Caso a pessoa atacante consiga infectar o dispositivo da pessoa alvo ou organização, o malware provavelmente se comunicará com um servidor de comando e controle (C2 ou C&C). Descobrir quais servidores C2 são usados nos ataques e como eles funcionam são temas da trilha de aprendizagem de Análise de malware. A análise de malwares é outra habilidade possível de ser usada para descobrir mais infraestruturas de ataque.

Para melhor apoiar tanto a pessoa que você estará ajudando quanto a comunidade, é importante documentar e compartilhar descobertas, o que consta na seção “Documentando descobertas”. Há várias comunidades com enfoque em compartilhamento de ameaças e informações dentre os espaços ocupados por ONGs, no entanto, discorrer sobre elas não faz parte do escopo desta trilha.

Por fim, é importante reconhecer que muitas das técnicas de investigação nesta trilha de aprendizagem podem alertar atacantes de que há uma investigação em andamento, ou mesmo colocar a pessoa investigadora – ou a comunidade – em risco. Dividimos as técnicas entre métodos passivos e ativos. Tenha cautela ao considerar métodos ativos de investigação, e avise a organização/indivídue antes de iniciar, para que possam discutir sobre modelagem de ameaças e permitir que façam escolhas conscientes acerca da continuidade das investigações.

A investigação passiva (apropriada para todos os casos):

- Utiliza informações que a pessoa alvo já tem;
- Não envolve comunicação com a infraestrutura de ataque;
- É geralmente mais simples;
- Geralmente não alerta as pessoas atacantes sobre o andamento de uma investigação;
- Mais segura.

A investigação ativa:

- É geralmente utilizada apenas para casos relacionados a lançamentos de malware e servidores de comando-e-controle;
- Envolve interação com a infraestrutura atacante;
- Frequentemente requer mais habilidades e investigações aprofundadas;
  - “Jogo de gato e rato” com atacante;
- Pode alertar atacantes de que estão sob investigação;
- Aumenta o risco de que a pessoa investigadora tenha sistemas ou informações comprometidas ou se torne um alvo.

## Objetivos

Profissionais vão aprender a:

- Fazer triagem de e-mails para entender se são maliciosos/vale a pena investigá-los com profundidade;
- Entender métodos de ataque e atacantes;
- Analisar cabeçalhos de e-mails para identificar infraestruturas de ataque;
- Analisar páginas iniciais maliciosas;
- Documentar e reportar investigações;
- Iniciar ações de derrubada para reduzir danos.

## A que ameaças essa habilidade visa mitigar ou responder?

Competências em investigação, rastreio e detecção de infraestruturas maliciosas podem ajudar a lidar com:

- Ataques de phishing com alvo;
- Phishings baseados em serviços de mensagens;
- Infraestruturas relativas a phishing.

## Quais são os pré-requisitos?

- Entendimento básico de linha de comando em principais sistemas operacionais de sua escolha. Caso queira aprender ou reforçar noções básicas de linha de comando, recomendamos [este (em inglês)](https://www.git-tower.com/blog/command-line-cheat-sheet/) e [este guia](https://github.com/jlevy/the-art-of-command-line/blob/master/README-pt.md). Se estiver buscando por uma introdução geral, recomendamos completar o capítulo 4 do [Guia de campo para labs de ameaças (em inglês)](https://internews.org/wp-content/uploads/2023/11/Field-Guide-to-Threat-Labs.pdf).
- Entendimento básico de HTML e JavaScript. Seja para aprender sobre eles do zero, ou refrescar conhecimento, recomendamos a [documentação de desenvolvimento web da MDN](https://developer.mozilla.org/pt-BR/docs/Learn). 
- Entendimento básico sobre como os repositórios Git funcionam e como interagir com eles. Embora conhecimento minucioso de Git e plataformas baseadas em Git como GitHub e GitLab não seja mandatório, pode ser útil para todas as trilhas de aprendizagem, já que muitas ferramentas e recursos são hospedados neles, e você ocasionalmente pode acabar tendo que atualizar repositórios locais ou até criar suas próprias branches. Caso não tenha experiência com tais plataformas, recomendamos começar com qualquer um destes recursos:
  - [Pro Git Book](https://git-scm.com/book/pt-br/v2) (disponível em 17 línguas) - Os capítulos 1-3, além dos tópicos selecionados em outros capítulos, fornecerão uma excelente introdução;
  - [git - guia prático](https://rogerdudler.github.io/git-guide/index.pt_BR.html) (disponível em 16 línguas) é uma tabela de consulta com comandos do Git. Útil para quando se tem um conceito geral do Git, mas precisa de referências rápidas de comandos e sintaxe;
  - [Uma referência visual de Git](https://marklodato.github.io/visual-git-guide/index-pt.html) (disponível em 14 línguas) - Referência visual mais avançada sobre o entendimento do fluxo de Git e seus comandos;
- [GitHub Skills (em inglês)](https://skills.github.com/)
- [GitLab Git Essentials (em inglês)](https://levelup.gitlab.com/courses/gitlab-with-git-essentials-s2)

## Que dispositivos ou programas são necessários para os exercícios?

- Nenhum hardware particularmente especializado ou poderoso será necessário para completar esta trilha de aprendizagem. Qualquer computador moderno servirá. Embora as ferramentas desta trilha tenham sido testadas apenas em arquiteturas x86, a maioria, senão todas, devem funcionar também em sistemas ARM, como em Raspberry Pi ou computadores Mac com Apple Silicon.
- Muitas das ferramentas desta trilha de aprendizagem funcionam melhor em sistemas operacionais Unix, ou seja, é mais prático utilizar Linux, dispositivos macOS, ou Windows com WSL (Subsistema do Windows para Linux).
- Caso esteja utilizando Windows, você precisará instalar o WSL para conseguir rodar algumas das ferramentas citadas a seguir.
- Caso esteja utilizando macOS, recomenda-se instalar o [Homebrew](https://brew.sh/), ou [Macports](https://www.macports.org/), gerenciadores de pacotes capazes de automatizar o processo de instalação de algumas ferramentas no decorrer da trilha de aprendizagem.
- Ambos WSL e Linux têm gerenciadores de pacotes embutidos que podem ser utilizados para instalações das ferramentas citadas a seguir.
- A melhor forma de analisar infraestruturas maliciosas é a partir do uso de dispositivos dedicados, algum que não seja utilizado para outros trabalhos sensíveis, e não esteja com sessão iniciada em contas de trabalho ou conta sensível. Se não puder usar um dispositivo dedicado à análises, é possível usar uma máquina virtual. Caso esteja utilizando-a pela primeira vez, leia [este guia rápido (em inglês)](https://ubuntu.com/tutorials/how-to-run-ubuntu-desktop-on-a-virtual-machine-using-virtualbox#1-overview) de como rodar a interface amigável Ubuntu Linux em uma máquina virtual.

## Trilhas de aprendizagem relacionadas

Esta trilha oferece uma fantástica introdução às demais trilhas de aprendizagem. Depois de completá-la, recomendamos que estudantes sigam as trilhas [Detectando Malware](/en/learning-path/2/) ou [Fundamentos de Segurança Web](/en/learning-path/4/).

## Outros recursos e links

{{% resource title="Fluxo de trabalho de suporte: O cliente recebeu um e-mail suspeito ou de phishing" languages="Inglês" cost="Grátis" description="Documentação comunitária do canal de ajuda da Access Now para orientação de resposta a incidentes envolvendo e-mails suspeitos ou de phishing." url="https://accessnowhelpline.gitlab.io/community-documentation/58-Suspicious_Phishing_Email.html#" %}}

{{% resource title="Lista com todos os tipos de registros de DNS" languages="Inglês, chinês, japonês, coreano, russo, sérvio, ucraniano, esperanto, húngaro, vietnamita, italiano, espanhol, francês" cost="Grátis" description="Inclui (quase?) todos os tipos de registros de DNS." url="https://en.wikipedia.org/wiki/List_of_DNS_record_types" %}}

{{% resource title="Reportagens da Anistia Internacional sobre campanhas de phishing" languages="Múltiplas, de acordo com a reportagem" cost="Grátis" description="Reportagens com exemplos de campanhas de phishing que tiveram como alvo defensores de direitos humanos, ativistas e jornalistas." url="https://www.amnesty.org/en/search/phishing/" %}}
