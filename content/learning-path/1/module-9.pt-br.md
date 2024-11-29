---
style: module
title: Resposta - Derrubada de Infraestrutura
description: Neste módulo, falaremos sobre formas de denunciar conteúdo e comportamento abusivo e outros mecanismos de navegação segura e sumidouro. Eles incluem contatar o provedor de infraestrutura para denunciarmos o seu uso malicioso para que ela possa ser derrubada.
weight: 9
---

## Caso de uso
Nos subtópicos anteriores, nós estudamos como identificar infraestruturas que hospedam conteúdo malicioso — seja ele *spam* (conteúdo indesejado de envio em massa), *malware*, ou *phishing* (uma "isca" para "fisgar" a atenção de alguém). Uma vez que essa infraestrutura seja identificada com sucesso, nós precisamos alertar outras pessoas sobre essa ocorrrência. Neste subtópico, falaremos sobre formas de denunciar conteúdo e comportamento abusivo e outros mecanismos de navegação segura e *sinkhole* (sumidouro). Eles incluem contatar o provedor de infraestrutura para denunciarmos o seu uso malicioso para que ela possa ser derrubada.

Você deve combinar essas técnicas e esforços com atividades maiores de resposta a incidentes e aproximação de comunidades que também podem ter recebido ataques direcionados provindos da mesma infraestrutura.

## Objetivos

Após o estudo deste subtópico, profissionais devem ser capazes de:

- Demonstrar um entendimento básico sobre o processo de denúncia e compilação de denúncias em bancos de dados;
- Identificar bancos de dados de denúncias que listam URLs e domínios suspeitos de serem maliciosos;
- Consultar informações e fazer submissões a tais bancos de dados;
- Identificar e usar mecanismos de denúncias de abuso de grandes provedores de infraestrutura.

---
## Seção principal
### Denunciando abuso em grandes provedores de serviços

Muitas ocorrências de infraestruturas maliciosas são hospedadas em grandes provedores de serviços preocupados em manter os seus sistemas seguros, estáveis, reputáveis, combatendo ameaças cibernéticas. Provedores de serviços responsáveis oferecem mecanismos efetivos de denúncia de abusos; usar esses mecanismos pode resultar em uma pronta derrubada de infraestruturas ativas.

Vamos aprender como encontrar e usar esses mecanismos de denúncia de abuso. Os contatos de equipes que recebem e gerenciam denúncias podem ser encontrados das seguintes formas:

- Consultando registros WHOIS de um domínio. Eles listarão um endereço de e-mail e número de telefone para denúncias.
- Buscando por contatos para denúncias de um endereço IP específico no [RIPEstat](https://stat.ripe.net/app/launchpad).
- Usando um utilitário escrito em Python ou uma consulta de *host* (o hospedeiro, ou seja, aquele que hospeda a infraestrutura) como descrito em *Abusix Abuse Contacts Database’s [Getting Started](https://docs.abusix.com/abuse-contact-db/5BScLdS3SxHV1giQYpXpKm/getting-started/rGzH6UQZpzjXBhqtjNqRee)* (em inglês).
- Pesquisando em buscadores para encontrar contatos que podem não estar listados nos bancos de dados citados ou obtidos pelos mecanismos que mencionamos, como é o caso do [Twilio](https://www.twilio.com/help/abuse) e do [Mailchimp](https://mailchimp.com/contact/abuse/). 

Lembre-se, é possível que vários provedores de serviços estejam envolvidos com a atividade maliciosa que você está investigando. Por exemplo, uma página inicial utilizada como isca (para *phishing*) pode ser denunciada tanto para o serviço de hospedagem web quanto para o serviço de registro de domínios.

Agora vamos entender como escrever um relatório com todas as informações técnicas que você coletou. O seu relatório deve incluir detalhes suficientes para que o provedor ou provedores de serviço sejam capazes de identificar quais contas estão envolvidas com a distribuição de conteúdo malicioso. Isso pode incluir:
- URLs do conteúdo
- Endereços IP do conteúdo hospedado
- Qualquer outro identificador relevante para o serviço
- Quaisquer arquivos ou cópias do conteúdo
- Capturas de tela
- Cabeçalhos de e-mail, se relevantes
- Resultados positivos, ou outros indicadores de ameaça, após escaneamento de conteúdo 
- De que forma o serviço ou recurso está sendo violado

Certifique-se de que você não está compartilhando informações sensíveis relacionadas a você ou aos clientes alvos do conteúdo malicioso.

Embora seja improvável que provedores de serviços compartilhem com você mais informações sobre a conta distribuindo conteúdo abusivo, você pode tentar requisitar mais detalhes caso isso seja útil para as suas investigações.

Em alguns casos, empresas de serviços de internet e tecnologia se esforçam para coordenar ações com a sociedade civil contra ataques direcionados e podem oferecer suporte adicional. Pode ser interessante falar com alguém [membro do CiviCERT](https://www.civicert.org) para pedir o contato de um funcionário da empresa para ajuda em investigações e respostas mais rápidas.

Note que, em muitos casos, a infraestrutura maliciosa está hospedada em contas comprometidas em servidores de entidades não-relacionadas ao ataque (por exemplo, uma conta do Google comprometida, um site invadido, ou um aparelho infectado controlado de forma coordenada por uma *botnet* — uma rede formada por robôs).

Se você está procurando por inspiração para escrever um e-mail para um provedor de infraestrutura, dê uma olhada nos modelos criados pela *Access Now Helpline*:

- Modelo de e-mail [para o registrador de um domínio malicioso](https://accessnowhelpline.gitlab.io/community-documentation/259-Disable_Malicious_Server_registrar.html)
- Modelo de e-mail [para um provedor de hospedagem](https://accessnowhelpline.gitlab.io/community-documentation/260-Disable_Malicious_Server_hosting_provider.html)
- Modelo de e-mail [para um cliente](https://accessnowhelpline.gitlab.io/community-documentation/261-Disable_Malicious_Server_client.html), pedindo a sua permissão para que você possa compartilhar Indicadores de Comprometimento (IoCs) com a comunidade

### Navegação segura, sumidouros, e listas de bloqueio

Além de contatar equipes de combate à abuso para derrubar conteúdo malicioso, você pode usar vários mecanismos para submeter informações sobre infraestruturas maliciosas e outros indicadores maliciosos a bases de dado usadas por listas de bloqueio, que por sua vez são integradas em ferramentas e serviços populares.

O mesmo princípio se aplica a plataformas de redes sociais e mensagens, e elas dependem desses mecanismos de denúncia (e outros serviços de segurança complementares).

Vamos aprender sobre algumas dessas listas de bloqueio, onde elas são integradas, e como realizar submissões:

- [Google Safe Browsing](https://safebrowsing.google.com/safebrowsing/report_general/)
- [PhishTank](https://phishtank.org/)
- [Abuse IP DB](https://www.abuseipdb.com/)
- [Phishing Database](https://github.com/mitchellkrogza/Phishing.Database#additions) (Envie submissões via GitHub)
- Algumas formas de denúncia de bancos de dados de ameaças mais específicas são oferecidas por [abuse.ch](https://abuse.ch) e exigem autenticação para submissões, como [URLhaus](https://urlhaus.abuse.ch/), [ThreatFox](https://threatfox.abuse.ch/), e [SSL Blacklist](https://sslbl.abuse.ch/).
- Denuncie iniciativas de phishing no Discord ao [phish.gg](https://docs.phish.gg/) (ou adicione um servidor ao serviço).

## Atividade prática

- Encontre os contatos de equipes de combate à abuso de três empresas de hospedagem web, incluindo pelo menos uma grande plataforma de hospedagem (como AWS, GCP, Azure, Oracle Cloud, e Alibaba Cloud). Procure por quaisquer informações que eles oferecem em seus processos de denúncia de abuso.
- Investigue como bancos de dados de abuso e Google Safe Browsing funcionam. Liste as ferramentas e serviços que se integram a esses mecanismos.
- Crie um diagrama e uma lista contendo links e ações relevantes que devem ser tomadas caso se enfrente um incidente com uma infraestrutura maliciosa ativa.

## Checagem de habilidades

Trabalhe com quem está te mentorando ou colegas que tenham alguma experiência na derrubada de infraestrutura maliciosa. Complete as seguintes tarefas com eles:

- Prepare todas as provas (endereços IP, *hashes*, domínios, e qualquer outra evidência) que você precisaria para submeter uma denúncia. Se você já tem um exemplo de infraestrutura maliciosa em mente, colete essas informações sobre essa infraestrutura. Se você não tem, colete essas informações de uma página legítima (mas não submeta uma denúncia). Discuta essas informações com o seu par ou mentor — eles verificarão se você coletou as informações certas e as documentou de forma adequada.

- Explique como provedores de navegação segura, bancos de dados de abuso, e listas de bloqueio funcionam. Se você tem um exemplo de infraestrutura maliciosa acessível, submeta-o para um banco de dados ou provedor. Se você não tem, visite a página de um provedor e revise o processo de submissão com o seu mentor ou par, explicando como você prepararia as informações requisitas sem submetê-las.

- Peça para que o seu mentor ou par liste três provedores de hospedagem web, serviços em nuvem, entre outros. Para cada um deles, encontre os contatos ou mecanismos de denúncia.

- Converse com o seu mentor ou par sobre os riscos estratégicos e pessoais de se iniciar uma derrubada, compartilhar dados sobre os seus clientes, e potencialmente alertar um atacante de uma análise crítica sobre o seu ataque. Escreva uma cena em que você comunica essas considerações ao alvo do ataque.

## Recursos de aprendizagem

{{% resource title="RIPEstat launchpad" languages="Inglês, espanhol, árabe, russo, francês, persa, italiano, turco" cost="Grátis" description="Um serviço que te permite consultar e listar mecanismos de denúncia relevantes." url="https://stat.ripe.net/app/launchpad" %}}

{{% resource title="Introdução - Abusix" languages="Inglês" cost="Grátis" description="Uma introdução ao banco de dados chamado Abuse Contact" url="https://docs.abusix.com/abuse-contact-db/5BScLdS3SxHV1giQYpXpKm/getting-started/rGzH6UQZpzjXBhqtjNqRee" %}}

{{% resource title="Canal de denúncias do Twilio" languages="Inglês" cost="Gratuito" description="Você você denunciar ligações ou mensagens SMS indesejadas enviadas por números de telefone do Twilio aqui." url="https://www.twilio.com/en-us/help/abuse" %}}

{{% resource title="Canal de denúncia do Mailchimp" languages="Inglês" cost="Grátis" description="Você você denunciar abusos na plataforma do Mailchimp aqui." url="https://mailchimp.com/contact/abuse/" %}}

{{% resource title="CiviCERT" languages="Inglês" cost="Grátis" description="Uma rede de profissionais de segurança que ajudam a sociedade civil na resposta a questões de segurança digital." url="https://www.civicert.org/" %}}

{{% resource title="Modelos de e-mail que podemos usar para denunciar atividade maliciosa" languages="Inglês" cost="Grátis" description="Três modelos de e-mail que podem te ajudar a escrever uma mensagem para provedores de serviços ou clientes para informá-los sobre a presença de uma infraestrutura maliciosa. Registradores de domínio: [Link](https://accessnowhelpline.gitlab.io/community-documentation/259-Disable_Malicious_Server_registrar.html), provedores de hospedagem: [Link](https://accessnowhelpline.gitlab.io/community-documentation/260-Disable_Malicious_Server_hosting_provider.html), clientes: [Link](https://accessnowhelpline.gitlab.io/community-documentation/261-Disable_Malicious_Server_client.html)" %}}

{{% resource title="Submeter uma denúncia ao SafeBrowsing" languages="Inglês" cost="Grátis" description="Canal de denúncias da ferramenta do SafeBrowsing, um banco de dados mantido pelo Google que alcança muitos usuários." url="https://safebrowsing.google.com/safebrowsing/report_general/" %}}

{{% resource title="PhishTank" languages="Inglês" cost="Grátis" description="Uma lista colaborativa de sites para submissão de infraestrutura de *phishing* que permite que usuários procurem e submetam URLs." url="https://phishtank.org/" %}}

{{% resource title="AbusiveIP" languages="Inglês" cost="Grátis" description="Site que permite que usários procurem e denunciem endereços IP relacionados a comportamentos maliciosos." url="https://www.abuseipdb.com/" %}}

{{% resource title="Phishing Database" languages="Inglês" cost="Grátis" description="Mais um banco de dados colaborativo de domínios e links suspeitos de *phishing*." url="https://github.com/mitchellkrogza/Phishing.Database#additions" %}}

{{% resource title="Abuse.ch" languages="Inglês" cost="Grátis" description="Uma plataforma da comunidade focada em compartilhamento de inteligência relacionada a *malware* e *botnets*." url="https://abuse.ch/" %}}

{{% resource title="Phish.gg" languages="Inglês" cost="Grátis" description="Um serviço para denunciar phishing em plataformas como o Discord." url="https://docs.phish.gg/docs/get-started/welcome/" %}}