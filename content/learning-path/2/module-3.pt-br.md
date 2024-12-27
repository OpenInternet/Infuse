+++
style = "module"
weight = 3
title = "Como o malware funciona e os diferentes tipos de malware"
description = "Vírus, spyware, backdoors, ransomware e adware se comportam de forma diferente e são inspirados por motivações diferentes. Estudamos como eles diferem e como as infecções começam."
+++

## Caso de Uso

Para começar a trabalhar com um malware, precisamos, antes de mais nada, aprender quais são os seus diferentes tipos. Vírus, spyware, backdoors, ransomware, e adware comportam-se de forma diferente e são inspirados por diferentes motivações. Ter conhecimento disso ajudará o agente de suporte a classificar o tipo de malware detectado.

## Objetivos

Depois de terem concluído este subtópico, o profissional deve ser capaz de fazer o seguinte:

- Distinguir os diferentes tipos de malware
- Entender o que o malware é capaz de fazer
- Entender de que forma começam as infecções por malware
- Explicar o que são indicadores de comprometimento

---
## Conteúdo 

De forma geral, um malware é qualquer software utilizado para efetuar tarefas não autorizadas no computador ou dispositivo móvel de um usuário. A Wikipedia possui uma boa [introdução acerca dos malwares de modo geral.](https://pt.wikipedia.org/wiki/Malware)

### O que o malware faz?

O malware pode fazer tudo o que um software faz, mas possuem diversas capacidades em comum. Enquanto alguns malwares têm uma única finalidade, outros serão capazes de executar várias tarefas. Entre as capacidades mais frequentes, citamos:

* Limpeza ou encriptação de dados (ransomware). Na maioria das vezes, são executados por invasores motivados pelo dinheiro. Este malware tomará o controle do computador da pessoa alvo e negará o acesso aos seus dados até que um resgate seja pago.
* Roubo de dados. Um malware pode mandar dados de forma seletiva ou indiscriminada do computador da pessoa alvo ao computador controlado pelo invasor. É usado sozinho ou em conjunto com o ransomware. 
* Uso não autorizado dos recursos. Os hackers motivados pelo dinheiro frequentemente utilizarão um conjunto de computadores comprometidos para efetuar ações, como usar criptomoeda, enviar spams ou efetuar ataques de negação de serviço.
* Sequestro do navegador de um usuário Alguns malwares podem inserir propagandas em páginas web enquanto um usuário navega na internet, coletando receita publicitária. Outros podem roubar senhas ou cookies de sessão (o cookie que o autentica quando você está logado na sua conta), permitindo que os invasores tenham acesso às contas das pessoas nos websites. Alguns malwares roubarão senhas, extrairão cookies e outros tipos de dados sensíveis de um dispositivo e, depois, se deletarão automaticamente para tentar apagar quaisquer vestígios de infecção.
* Coletar a atividade do usuário. Os malwares mais sofisticados tentarão capturar as atividades da pessoa alvo, por meio da gravação de vídeo ou áudio, da captura do que está sendo digitado, da localização de um dispositivo móvel, etc. Isto é frequentemente utilizado para fins de espionagem/monitoramento ou extorsão.
* Controle interativo ou semi-interativo. Os malwares mais sofisticados terão capacidades mais abrangentes que permitirão ao invasor usar o dispositivo da pessoa alvo para atividades imprevistas. Um invasor pode mandar vários comandos através de um servidor de comando e controle ou de uma conexão direta, e o malware executará os comandos no dispositivo da pessoa alvo e entregar os resultados ao hacker. Isto é, frequentemente, utilizado para alvos importantes ou para lançar ataques futuros numa rede.

A lista acima não é exaustiva, mas destaca as capacidades mais comuns dos malwares. Para ter um ótimo resumo acerca dos principais malwares que foram descobertos no ano passado, consulte o post do Patrick Wardle no [The Mac Malware of 2023](https://objective-see.org/blog/blog_0x77.html). Este post descreve muitos conceitos sobre os quais trataremos mais tarde nesta trilha de aprendizagem (tais como os scans VirusTotal) e é uma fantástica introdução resumida acerca do universo dos malwares.

Talvez um dos malwares mais notáveis em termos de habilidades é o pacote NSO Group Pegasus, que foi construído propositalmente para efetuar uma vigilância discreta. Suas capacidades são listadas neste [documento de venda do Grupo NSO](https://www.documentcloud.org/documents/4599753-NSO-Pegasus.html).

Recomendamos fortemente que leia o Capítulo 5 do Guia Prático de resposta a incidentes para a sociedade civil e a mídia para obter um resumo relevante acerca dos malware e demais conceitos relacionados, inclusive:
- Ofuscação de código
- Tipos de malware
- Persistência
- Cadeias de infecção
- Comunicação de comando e controle
- Programas de antivírus
- Vulnerabilidades e explorações

### Como os dispositivos alvo são infectados? 

O malware penetra no dispositivo de uma pessoa de alguma forma. Os métodos para fazer isso vão desde enganar os usuários para que executem um software malicioso, até a exploração de software e serviços vulneráveis, inclusive verdadeiros ataques 0-clique.

#### Métodos para infectar Windows, macOS, e Linux

1. Executar diretamente programas maliciosos recebidos por meio de ataques de engenharia social 
   1. Phishing via email, SMS, WhatsApp, etc.
   2. Malware disfarçado de software legítimo, como no caso dos softwares piratas
   3. Malwares copiados de pendrives, etc.
2. Documentos que possuem malwares integrados, na maioria das vezes, documentos do Microsoft Office, mas também nos formatos PDF, páginas web, etc.
3. Documentos e páginas web que exploram bugs em softwares para instalar os malwares. Isto contorna os controles de segurança dos aplicativos e sistemas operacionais.
4. [Os ataques "zero-clique"](https://www.csoonline.com/article/572727/zero-click-attacks-explained-and-why-they-are-so-dangerous.html) que não requerem qualquer tipo de interação do usuário, mas permitem ao invasor atacar diretamente um aplicativo ou sistema operacional. Eles afetam tanto os sistemas operacionais de desktops como de dispositivos móveis.

Uma vez que a infecção inicial é realizada, a maioria dos malwares passarão por [vários estágios de infecção](https://community.fireeye.com/s/article/000002205).

#### Métodos para infectar iOS e Android

Os sistemas operacionais de laptops são um pouco diferentes dos desktops. Eles são normalmente mais fechados e restringem quais códigos podem ser executados neles. Isto significa que o malware também tem caminhos e métodos diferentes de infecção. Consulte a seção [arquitetura dos sistemas de smartphone](https://pellaeon.gitbook.io/mobile-forensics/smartphones/smartphone-system-architecture) do Guia de Perícia de Celulares para ter um bom resumo sobre o assunto.

As configurações de base do iOS e do Android somente permitem que o usuário execute os softwares baixados nas App Stores oficiais. Os malwares nessas plataformas foram instalados através de uma App Store (o que significa que não foram identificados durante as auditorias de segurança da Apple ou da Google) ou pela exploração de lacunas no iOS ou no Android que normalmente impedem a execução de códigos não autorizados. Alternativamente, alguns autores de malware também usam a engenharia social para convencer as pessoas alvo a instalarem perfis maliciosos ou outras configurações no dispositivo.

### Persistência

A maioria dos malwares que você encontrará no seu trabalho serão persistentes, ou capazes de serem executados automaticamente sempre que a pessoa alvo se conecta ou reinicia o sistema. Cada sistema operacional tem mecanismos que executam automaticamente determinados softwares ao fazer login, em instantes programados ou quando algo acontece (por exemplo, quando uma conexão à rede é estabelecida ou quando um programa é lançado). 

Os malwares podem usar uma grande variedade de técnicas de persistência, algumas delas são relativamente simples (tais como adicionar-se à lista de programas executados automaticamente ao fazer login) e outras, extremamente complexas e que tiram proveito de determinadas funcionalidades especializadas do sistema operacional. Se você quer saber mais sobre isso, consulte esta [análise profunda sobre o assunto](https://github.com/Karneades/malware-persistence/blob/master/README.md) e [esta lista avançada e abrangente](https://github.com/Karneades/awesome-malware-persistence) de técnicas de persistência. Muitas dessas técnicas incluem uma análise avançada que foge ligeiramente do escopo desta trilha de aprendizagem, mas ao mesmo tempo, é bom ter uma ideia geral acerca do que vem a ser a persistência e quais mecanismos podem ser usados.

Alguns malwares não visam a persistência. Em vez disso, eles executarão, extrairão os dados e desaparecerão ao fazer logout ou ao reiniciar. Se os invasores desejarem usar novamente as capacidades do malware, simplesmente reinstalarão o malware no sistema da pessoa.  Enquanto isso pode limitar o período de atividade no sistema e, consequentemente, os dados coletados, também torna o malware mais difícil de ser detectado, pois deixa poucos vestígios no sistema.

### Indicadores de Comprometimento

Ao ser instalado e ao realizar atividades maliciosas, o malware deixa IoCs, ou Indicadores de Comprometimento. Eles são frequentemente utilizados para identificar malwares específicos. Os IoCs incluem hashes criptográficas (vamos falar mais tarde sobre isso nesta trilha de aprendizagem) que representam arquivos executáveis específicos, mas também podem ser conexões a serviços de rede ou ao tráfego particular da rede, os padrões de execução, etc.

Para um breve resumo sobre o que são os IoCs e sob que forma se apresentam, [consulte o pp. 37-40](https://internews.org/resource/field-guide-to-incident-response-for-civil-society-and-media/) (de indicadores de comprometimento até neutralização) do Guia Prático de Resposta a Incidentes para Sociedade Civil e Mídia.

Para uma longa exposição sobre os IoCs e a sua utilização na resposta aos incidentes, veja [este webinário da CISA](https://www.youtube.com/watch?v=zs-AEaSd2vk) (Inglês, 46 minutos).

Veja os IoCs destacados na página 52 deste relatório da Amnesty sobre um spyware comercial poderoso: majoritariamente, tratam-se de nomes de domínio que foram usados como infraestrutura durante esta campanha de malware. Depois de ter feito isso, consulte [esta página](https://github.com/AmnestyTech/investigations), que coleta os IoCs de várias investigações conduzidas pela Amnesty Tech.

Existem várias formas de identificar um indicador de comprometimento. Entre elas, é possível verificar os logs de rede para ver se algum dispositivo tentou estabelecer contato com um domínio específico, e verificar também se algum arquivo num dispositivo é compatível com determinados hashes. Se você deseja saber mais sobre eles, recomendamos que consulte esses artigos da [Microsoft](https://www.microsoft.com/en-us/security/business/security-101/what-are-indicators-of-compromise-ioc) e [Fortinet](https://www.fortinet.com/resources/cyberglossary/indicators-of-compromise).

### Malware conhecido versus malware desconhecido

A grande maioria das infecções por malware que você encontrará ao longo da sua carreira, foram causadas por malwares conhecidos pela comunidade. Isto significa que uma outra pessoa já encontrou este malware e compartilhou as amostras de IoCs respectivas por meio de motores de análise de malware. Mas os cibercriminosos continuam a elaborar novos malwares e adaptar os programas existentes. Assim, sempre tem uma pequena chance que os dispositivos que você está investigando tenham sido infectados por um malware que ainda não tenha sido documentado. Se você estiver preocupado de que possa ser esse o caso, recomendamos que consulte a Trilha de Aprendizagem sobre a Análise de Malware, que o guiará sobre como analisar amostras desconhecidas para saber se são maliciosas.

E nem todos os malwares reconhecidos foram extensivamente documentados. Muitas das amostras que podem ser encontradas em sites como MalwareBazaar, podem ter IoCs associados a eles e são reconhecidos como sendo maliciosos, mas os analistas podem não ter documentado exatamente o que o malware faz. Se você encontrar uma amostra identificada por outros como maliciosa, mas que não possui a documentação suficiente e, assim sendo, você deseja saber um pouco mais sobre o seu funcionamento e o que faz, siga algumas diretrizes trazidas na trilha de aprendizagem sobre a análise.

## Prática

Tire um tempo para consultar a [lista de malwares recentemente](https://bazaar.abuse.ch/browse/) publicada pelo Malware Bazaar. Leia as descrições e comentários de diversas amostras de malware e anote que formas podem tomar, quais mecanismos de entrega utilizam e preferem. Algumas das amostras de malware possuem comentários relacionados a elas, examine-os também. Observe que nem todas as amostras de malware conterão detalhes como IoCs ou mecanismos de entrega.

Tenha em mente que o Malware Bazaar também contém alguns detalhes, como hashes, que serão abordados somente mais tarde nesta trilha de aprendizagem.

Não baixe quaisquer amostras por enquanto. Nesta fase, contente-se apenas de dar uma olhada nas descrições da amostra.

## Teste de capacitação

Trabalhe junto a um mentor ou colega, encontre dois ou três relatórios descrevendo infecções por malware na plataforma da sua escolha. Certifique-se de que esses relatórios incluem o IoCs. Se você não conseguir encontrar nenhum relatório, leia um dos que propomos a seguir:

* [HotRat: The Risks of Illegal Software Downloads and Hidden AutoHotkey Script Within (HotRat: Os riscos de baixar programas ilegais e os scripts AutoHotkey ocultos, em Inglês)](https://decoded.avast.io/martinchlumecky/hotrat-the-risks-of-illegal-software-downloads-and-hidden-autohotkey-script-within/)
* [Earth Preta Spear-Phishing Governments Worldwide (Inglês)](https://www.trendmicro.com/en_us/research/22/k/earth-preta-spear-phishing-governments-worldwide.html)
* [New SugarGh0st RAT targets Uzbekistan government and South Korea (New SugarGh0st RAT visa o governo do Uzbequistão e a Coreia do Norte, em Inglês)](https://blog.talosintelligence.com/new-sugargh0st-rat/)
* (este é bem extenso, apenas o utilize se for particularmente ambicioso) [Relatório da Amnesty Tech sobre o Predator](https://www.amnesty.org/en/documents/act10/7245/2023/en/)

Responda as seguintes perguntas para um desses relatórios:
* O que esse malware faz?
* Como ele penetra no sistema? Ele explora um bug existente para ser instalado? Requer uma ação do usuário para que possa ser instalado?
* Quais são os IoCs para este malware? Quais etapas poderíamos seguir para identificar esses IoCs num sistema ou rede infectados?

Fale sobre as suas respostas a todas essas perguntas com o seu colega ou mentor.


## Recursos de aprendizagem

{{% resource title="Capítulo sobre Malwares do Guia Prático para os Laboratórios de Ameaças (Capítulo 5)" languages="Inglês" cost="Grátis" description="Uma boa introdução acerca dos malwares, da perspectiva de um protetor digital para conhecer o que é um malware" url="https://internews.org/resource/field-guide-to-incident-response-for-civil-society-and-media/" %}}

{{% resource title="Malware - Wikipedia" languages="múltiplos" cost="Grátis" description="Uma boa introdução fundamental sobre o assunto, que explica alguns elementos básicos e os conceitos moderadamente avançados necessários" url="https://pt.wikipedia.org/wiki/Malware" %}}

{{% resource title="O Mac Malware de 2023" languages="Inglês" cost="Grátis" description="Um resumo importante do malware de macOS identificado em 2023. Inclui os tipos de malware, os vetores de infecção, os mecanismos de persistência e as metas." url="https://objective-see.org/blog/blog_0x77.html" %}}

{{% resource title="Documento de venda do Pegasus do grupo NSO" languages="Inglês" cost="Grátis" description="Este documento vazado descreve algumas capacidades do Pegasus, um spyware que visa os ativistas de direitos humanos, entre outros. Traz uma boa introdução sobre como o spyware é vendido e comercializado." url="https://www.documentcloud.org/documents/4599753-NSO-Pegasus.html" %}}

{{% resource title="Explicação sobre os Ataques de Clique Zero" languages="Inglês" cost="Grátis" description="Descreve o que é um ataque de clique zero, fala por que os hackers se interessam tanto por eles e por que são tão perigosos." url="https://www.csoonline.com/article/572727/zero-click-attacks-explained-and-why-they-are-so-dangerous.html" %}}

{{% resource title="Entender os indicadores de comprometimento para acionar a resposta ao incidente" languages="Inglês" cost="Grátis" description="Um vídeo feito pelo US CISA que traz um bom resumo e uma introdução sobre os IoCs e como podem ser usados pelos profissionais de resposta a incidentes." url="https://www.youtube.com/watch?v=zs-AEaSd2vk" %}}

{{% resource title="Guia de Prevenção e Manejo de Incidentes de Malware para Desktops e Laptops" languages="Inglês" cost="Grátis" description="Um guia antigo (2013) do US NIST que trata do assunto de forma bem abrangente." url="https://nvlpubs.nist.gov/nistpubs/specialpublications/nist.sp.800-83r1.pdf" %}}

{{% resource title="Arquitetura dos sistemas de smartphone" languages="Inglês" cost="Grátis" description="Veja como funcionam os sistemas operacionais dos smartphones e de que forma os malwares tomam conta deles." url="https://pellaeon.gitbook.io/mobile-forensics/smartphones/smartphone-system-architecture" %}}

{{% resource title="Os Arquivos Predator" languages="Inglês" cost="Grátis" description="Uma investigação de malware realizada pela Amnesty Tech; inclui listas de IoCs na página 52." url="https://www.amnesty.org/en/documents/act10/7245/2023/en/" %}}

{{% resource title="Indicadores das investigações feitas pela Amnesty International" languages="Nenhum (dataset)" cost="Grátis" description="Uma lista de IoCs coletados pela Amnesty durante as investigações." url="https://github.com/AmnestyTech/investigations" %}}

{{% resource title="Microsoft Security: Explicação sobre os indicadores de comprometimento." languages="Inglês" cost="Grátis" description="Um resumo sobre o que são os IoCs e que formas podem tomar." url="https://www.microsoft.com/en-us/security/business/security-101/what-are-indicators-of-compromise-ioc" %}}

{{% resource title="Glossário Fortinet: Indicadores de comprometimento" languages="Inglês" cost="Grátis" description="Mais um resumo bem útil sobre IoCs." url="https://www.fortinet.com/resources/cyberglossary/indicators-of-compromise" %}}