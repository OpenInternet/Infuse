+++
style = "introduction"
weight = 1
title = "Introdução"
description = "Leia a visão geral do trilha de aprendizagem, objetivos, ameaças associadas e pré-requisitos"
+++

**Contribuintes**

Michał "czesiek" Czyżewski (<https://czesiek.net>)

Yana Ghahramanyan

## Resumo

Há muitas maneiras de os invasores tentarem atacar sites, incluindo:

* Negação de expressão: remoção de site, desfiguração de site, negação de serviço
* Acesso a dados confidenciais: exploração de controles de acesso ou outras vulnerabilidades para acessar informações, por exemplo, em bancos de dados de aplicativos, arquivos ou sistemas privados, caixas de entrada privadas ou áreas de membros
* Implantação de malware (ataques do tipo “watering hole”): uso do acesso a um site para inserir código malicioso ou enganoso com o objetivo de atingir os dispositivos dos visitantes
* Movimento lateral (comprometimento de outros sistemas): obtenção de acesso a servidores inteiros, infraestrutura de nuvem, infraestrutura empresarial ou residencial
* Observação de visitantes: obtenção de informações sobre IPs ou identidades de visitantes de um site ou usuários de um aplicativo web
* Comprometimento da cadeia de suprimentos: comprometimento dos serviços de distribuição de software, dos processos de desenvolvimento ou das bibliotecas de componentes para atingir objetivos maliciosos direcionados aos usuários do software alvo
* Falsificação de identidade de sites: com o objetivo de phishing, danos à reputação e distribuição de malware/spyware
* Injeção de tráfego (ataques de downgrade): exploração de pontos fracos na configuração da infraestrutura ou nas comunicações visando inserir conteúdo malicioso em um tráfego originalmente legítimo

A segurança de aplicativos web é um domínio profundo de conhecimento técnico com muitas áreas de especialização. Esta trilha de aprendizagem fornecerá a você uma compreensão geral das vulnerabilidades de aplicativos web e como funcionam algumas das mais comuns. Ele vai ajudar você a entender os tipos de vulnerabilidades que normalmente existem nos aplicativos web, os recursos que essas vulnerabilidades oferecem aos invasores e como, em geral, eliminar ou atenuar essas vulnerabilidades. 


**O que é um aplicativo web?**

Os aplicativos web referem-se a uma categoria mais ampla de software que executa serviços dinâmicos disponíveis na web. Uma página da web é um tipo de aplicativo web, embora uma página HTML estática geralmente não seja considerada um aplicativo. Os aplicativos web geralmente envolvem algum tipo de processamento, armazenamento e recuperação de dados do lado do cliente e/ou do lado do servidor, com conteúdo dinâmico. Eles geralmente dependem de infraestrutura, como bancos de dados, servidores adicionais ou serviços em nuvem (incluindo 'código sem servidor'). Plataformas CMS comuns, como WordPress ou Drupal, são aplicativos web. Muitas organizações utilizam diversos aplicativos para atender a funcionalidades internas ou externas, como um banco de dados de membros, uma ferramenta de gestão de relacionamento com clientes, um sistema de informações de saúde, um sistema de emissão de tickets, ferramentas operacionais internas, entre outros. Algumas organizações desenvolvem seus próprios aplicativos web personalizados, adequados às suas próprias finalidades. As principais plataformas de serviços da internet, como MailChimp, Slack, Canva, X etc. também são aplicativos web e sua segurança também afeta seus usuários. No entanto, essas grandes entidades têm suas próprias equipes de segurança e programas de recompensa por bugs que conduzem ou incentivam análises profissionais de segurança de aplicativos web para elas. Por outro lado, as organizações menores para as quais você pode estar trabalhando geralmente não têm os recursos para realizar análises de segurança de aplicativos web e você pode ser o primeiro a fazer isso.

**O que são vulnerabilidades?**

Há muitos tipos de falhas que podem aparecer em qualquer sistema complicado. Normalmente, pensamos nelas como bugs regulares em que o sistema permite que seus usuários façam menos do que o pretendido. Algo como “quando clico em ‘adicionar ao carrinho’, o site simplesmente mostra uma página de erro”. No entanto, algumas falhas permitem que os usuários façam mais do que o pretendido. Quando essas falhas afetam negativamente o sistema ou seus outros usuários, consideramos essas falhas como vulnerabilidades. Exemplos de vulnerabilidades incluem falhas que permitiriam que um usuário lesse ou modificasse os dados de outros usuários, assumisse o controle da infraestrutura subjacente de um site, negasse o uso de um sistema para outros usuários etc. Ao pensar em vulnerabilidades, é útil agrupá-las por tipo. Esta trilha de aprendizagem oferece uma visão geral das classes de vulnerabilidades comuns de aplicativos web e como um invasor pode usá-las para prejudicar um site ou seus usuários.

## Objetivo

Os profissionais aprenderão os conceitos fundamentais de segurança de aplicativos web, com a base necessária para a pesquisa de outros tópicos sobre segurança de aplicativos web. Os profissionais serão capazes de compreender os principais conceitos de segurança de aplicativos web, incluindo:

* Vulnerabilidades de infraestrutura
* Validação de dados
* Autenticação
* Autorização
* Vulnerabilidades da lógica comercial 


## Quais ameaças esta competência ajuda a atenuar ou a tratar?

- Comprometimento de aplicativos web
- Controle de contas de aplicativos web
- Negação de serviço de aplicativos web
- Ataques do tipo "Watering Hole"


## Quais são os pré-requisitos?

- Familiaridade básica com HTML, como o layout básico de um documento HTML e a capacidade de ler HTML simples. Para uma ótima introdução, dê uma olhada na [MDN](https://developer.mozilla.org/pt-BR/docs/Learn).
- Conceitos básicos de linguagem de programação e capacidade de ler JavaScript simples. Recomendamos a [introdução da MDN](https://developer.mozilla.org/pt-BR/docs/Learn/JavaScript) ao tópico.
- Conhecimento básico de como o HTTP funciona, como um navegador se comunica com um site e como são as solicitações e respostas HTTP. Para uma introdução a esses tópicos, recomendamos [este artigo](https://www.cloudflare.com/pt-br/learning/ddos/glossary/hypertext-transfer-protocol-http/) e [este](https://developer.mozilla.org/pt-BR/docs/Learn/Forms/Sending_and_retrieving_form_data).
- Conhecimento básico de SQL, apenas o suficiente para saber o que é e como formular um comando simples. Para uma introdução, consulte [sqlzoo](https://sqlzoo.net/wiki/SQL_Tutorial).
- Familiaridade básica com o funcionamento da linha de comando em um sistema operacional de sua escolha e como executar comandos nela. Para uma boa introdução, consulte a [MDN](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Understanding_client-side_tools/Command_line).
- Há um exercício de verificação de habilidades no subtópico de autorização que requer conhecimento básico da linguagem de programação Python (embora seja um código muito simples que deve ser lido por quem domina outras linguagens também). Se você não estiver familiarizado com linguagens de programação, pode pular esse exercício.


## Quais dispositivos ou softwares são necessários para os exercícios?

Para completar essa trilha de aprendizagem, usaremos um site chamado DVWA (Damn Vulnerable Web App). O DVWA é um aplicativo web que é intencionalmente exposto a várias vulnerabilidades. Requer uma configuração mínima para ser usado e está disponível online para uma experiência de configuração zero.

Há várias maneiras de executar o DVWA. As melhores instruções atuais de instalação podem ser encontradas no [repositório DVWA GitHub](https://github.com/digininja/DVWA). Conforme destacado na seção Aviso dessa página, o DVWA não deve ser instalado de forma a expô-lo à internet aberta.  As opções para executá-lo incluem: 

- A abordagem mais simples, se você preferir ou não puder instalar o DVWA localmente, é acessá-lo na instância hospedada online no [TryHackMe](https://tryhackme.com/room/dvwa). Se você se inscrever em uma conta gratuita, iniciar uma máquina DVWA no link e, em seguida, iniciar uma Attack Box, poderá concluir todos os exercícios diretamente do seu navegador.
  - Usar um servidor web hospedado localmente em sua própria máquina ou em uma máquina virtual. O DVWA usa uma estrutura PHP/MySQL (ou MariaDB), portanto, o aplicativo pode ser executado em qualquer dispositivo com esses serviços web. Isso pode ser feito da seguinte maneira:
    - Usar uma máquina virtual para criar um sistema operacional Linux a partir do qual você vai (A) instalar uma pilha de servidor web local e configurar o DVWA como faria com qualquer aplicativo PHP/MySQL seguindo as instruções [deste vídeo](https://youtu.be/Yzksa_WjnY0), (B) utilizar o [script de instalação do Linux](https://github.com/digininja/DVWA?tab=readme-ov-file#automated-installation-%EF%B8%8F) fornecido no leia-me do repositório ou (C) se estiver usando o Kali Linux, instalar o DVWA a partir do repositório de código-fonte do Kali usando `sudo apt-get install dvwa`. 
    - A virtualização em dispositivos x86 pode ser feita com um hipervisor, como o Virtualbox
    - Utilize o MacOS Apple Silicon (M1/M2/M3), que pode executar máquinas virtuais usando o [UTM](https://mac.getutm.app/) ou o VMWare Fusion Player (com a licença de uso [pessoal gratuita](https://www.vmware.com/products/fusion/fusion-evaluation.html)) e a versão do Apple Silicon Installer do sistema operacional desejado (por exemplo, [Kali Linux](https://www.kali.org/get-kali/#kali-installer-images)). Use as [etapas de solução de problemas](https://docs.getutm.app/guides/kali/) no Guia UTM caso tenha um problema de tela preta.
    - Para obter um guia sobre como configurar máquinas virtuais, siga o capítulo 6 deste[ Guia de campo para resposta a incidentes para a sociedade civil e a mídia](https://internews.org/resource/field-guide-to-incident-response-for-civil-society-and-media/), mas baixe uma imagem do Kali Linux em vez de uma do REMNux (ou use outros tutoriais escritos para sua plataforma)
  - Transformar seu computador em um servidor web usando o [XAMPP](https://www.apachefriends.org/) (Windows ou Linux) ou o [MAMP](https://www.mamp.info/en/windows/) (macOS, incluindo o Apple Silicon) e seguindo as instruções de configuração mostradas [neste vídeo](https://youtu.be/Yzksa_WjnY0). 
- Como alternativa, se você estiver familiarizado com o Docker ou outras tecnologias de conteinerização, siga as [instruções do Docker](https://github.com/digininja/DVWA) no repositório DVWA 

Antes de iniciar qualquer um dos exercícios, lembre-se de fazer login no DVWA (as credenciais padrão são admin / password) e certifique-se de que o nível de segurança está configurado como "Baixo".

![DVWA com configuração de baixo nível de segurança](/media/uploads/dvwa-setting1.png)

Um exercício prático exige que você instale e use uma ferramenta conhecida como rainbowcrack. Devido aos altos requisitos de sistema e ao fato de que a ferramenta só funciona no Linux e no Windows, optamos por tornar esse exercício opcional. Como o objetivo principal desse exercício é ilustrar um conceito de segurança, os alunos que não puderem ou não quiserem concluí-lo ainda poderão terminar toda a trilha de aprendizagem.

Um exercício opcional requer conhecimentos básicos de Python e uma instalação do Python. Este exercício pode ser ignorado por alunos que não estejam familiarizados com o Python ou que não o tenham instalado em seus sistemas.


## Trilhas de aprendizagem relacionadas

Essa trilha de aprendizagem fornece um guia interno consistente e independente para a segurança de aplicativos web. Ela deve ser lida em poucas sessões e fornece a base necessária para aprofundar o aprendizado sobre segurança de aplicativos web. As trilhas de aprendizagem de acompanhamento sugeridas incluem:

- [Trilha de Aprendizagem de Avaliação de Segurança de Aplicativos Web](/en/learning-path/5/): Esta trilha de aprendizagem lhe ensinará o conhecimento detalhado e as habilidades práticas necessárias para testar um site em busca de vulnerabilidades. Essa é a maneira mais eficaz de identificar os pontos fracos de um aplicativo web antes que os invasores o façam. Esta trilha de aprendizagem dos Fundamentos de Segurança de Aplicativos Web preparará você para se envolver efetivamente com o conhecimento especializado necessário.
- [Trilha de aprendizagem de Fortalecimento de Aplicativos Web, Análise Forense e Resposta a Incidentes](/en/learning-path/6/) Essa trilha de aprendizagem prepara você para responder a ataques contra um aplicativo web. Para se preparar e responder a ataques, você precisa ter um conhecimento prático de quais podem ser esses ataques. Esta trilha de aprendizagem dos Fundamentos de Segurança de Aplicativos Web deve fornecer a você informações suficientes para entender quais informações serão necessárias para detectar ataques contra um site e como reconhecer e responder a ataques em andamento.