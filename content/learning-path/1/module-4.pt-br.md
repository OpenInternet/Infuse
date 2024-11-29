---
style: module
title: "Investigação passiva - Análise de URLs, hostnames, e endereços IP"
description: "As habilidades descritas neste módulo podem ser utilizadas para iniciar uma investigação passiva de servidores na internet. Uma investigação passiva é aquela em que nenhum site é carregado, sobre a qual buscam-se apenas dados públicos disponíveis a partir de ferramentas de inteligência de fontes abertas (OSINT, de “open source intelligence”) e recursos que podem nos dar detalhes sobre as “pegadas digitais” de uma infraestrutura de ataque sem que percebam que estão sob investigação"
weight: 4
---

## Caso de uso

As habilidades descritas neste subtópico podem ser utilizadas para **iniciar uma investigação passiva de servidores na internet**. Uma investigação passiva é aquela em que nenhum site é carregado, sobre a qual buscam-se apenas dados públicos disponíveis. Assim, atacantes não receberão alertas sobre as visitas ao site, nem saberão que uma investigação está em andamento. A partir da avaliação de domínio e informação de IP, uma pessoa investigadora pode **gerar informação técnica valiosa sobre o ataque**, útil para educar a comunidade, compartilhar informação de ameaças, descobrir infraestruturas de ataque relacionadas e contextualizá-las de acordo com padrões mais abrangentes.

Algumas destas habilidades podem ser necessárias em uma triagem inicial, por exemplo, para ajudar na decisão sobre um link ser malicioso ou não. Também serão muito úteis durante uma análise aprofundada de cabeçalhos de e-mails, descrita na próxima seção.

## Objetivos

Após completar este subtópico, profissionais serão capazes de:

- Entender a estrutura de uma URL;
- Compreender os tipos de registro DNS, o que é WHOIS, e as diferenças entre IPv4 e IPv6;
- Conduzir reconhecimento básico de domínios;
- Identificar proxies reversos comuns que “escondem” endereços IP originais para fins de proteção contra DDoS (ataques de rede distribuídos com objetivo de negação de serviço) ou otimização de entrega, como CloudFlare, Akamai, e Fastly;
- Descobrir/enumerar subdomínios.
- - -

## Seção principal

A investigação passiva faz uso de ferramentas e recursos de inteligência de fontes abertas (OSINT), que podem nos dar muitos detalhes sobre as “pegadas digitais” de uma infraestrutura de ataque sem que percebam que estão sob investigação.

### Conhecimento fundamental

Nos aprofundaremos no básico de URLs, DNS, e IPv4/IPv6. Se você se sente confortável com esses conceitos, excelente! Pule para a seção de “Fluxo de trabalho”. Caso contrário, dê uma lida nos documentos e recursos a seguir:

- Construção de uma URL
  - É importante saber ler uma URL e entender o significado de suas partes, incluindo esquema, subdomínios, domínio primário, domínios de nível superior (“top-level domains”), e a identificação do caminho ou parâmetros de uma URL. Caso precise revisar o conhecimento, acesse [esta página da MDN (em inglês)](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/What_is_a_URL).
- Encurtadores de URL
  - Algumas mensagens maliciosas podem utilizar um encurtador de URL para esconder o link “real”. Para obter o destino final do link, há serviços online como [unshorten.me (em inglês)](https://unshorten.me/). Note, porém, que desencurtar uma URL pode alertar atacantes de que uma investigação está sendo conduzida, tornando-a uma análise ativa;
- DNS
  - [Introdução ao Domain Name System (em português)](https://aws.amazon.com/pt/route53/what-is-dns/?nc1=h_ls)
  - [Tipos de registro de DNS (em português)](https://www.cloudflare.com/pt-br/learning/dns/dns-records/)
  - WHOIS - É interessante compreender como registros WHOIS são criados e armazenados, como lê-los, e inquirir o registro WHOIS para quaisquer domínios. Para maiores informações, acesse [este guia (em inglês)](https://www.domain.com/blog/what-is-whois-and-how-is-it-used/).
- IPv4/IPv6
  - [O que é IPv4? (em inglês)](https://bluecatnetworks.com/glossary/what-is-ipv4/)
  - [Diferenças entre IPv4 e IPv6 (em inglês)](https://www.geeksforgeeks.org/differences-between-ipv4-and-ipv6/)
  - [Entendendo endereços IP (em inglês)](https://www.enterprisenetworkingplanet.com/standards-protocols/understanding-ip-addresses/)
- Para complementar endereços IP, é útil ler sobre [números de portas (em inglês)](https://www.techtarget.com/searchnetworking/definition/port-number).

### Fluxo de trabalho: ferramentas & competências

Investigações passivas de IP/DNS podem ser divididas em várias categorias.

#### Coleta de informações essenciais de IP/DNS

Na investigação, um dos primeiros passos a serem tomados é obter informações iniciais acerca de domínios e hosts. Diversas ferramentas podem ajudar:

- WHOIS

  Registros WHOIS são publicamente acessíveis e contêm informações úteis sobre um determinado domínio. Aprenda a utilizar, por exemplo, ferramentas web como [ARIN whois (em inglês)](https://search.arin.net/rdap/), [who.is (em inglês)](https://who.is/)) ou [serviços via linha de comando (em inglês)](https://www.arin.net/resources/registry/whois/rws/cli/) para visualizar registros WHOIS, e aprenda a tirar conclusões a partir da informação de quem solicitou o registro (caso tenha sido divulgada), de quem fez o registro, data do registro e os nameservers (servidores de nomes) que indicam onde estão hospedados os registros oficiais para a zona de DNS.

  WHOIS também pode ser executado com um endereço na tentativa de identificar a empresa responsável pelo IP, isto é, a empresa de hospedagem que está atendendo o site.

- dig & host

  **dig** é uma ferramenta de linha de comando pré-instalada ou disponível para os principais sistemas operacionais, que permite a busca (siga o [tutorial aqui, em inglês](https://phoenixnap.com/kb/linux-dig-command-examples)) de registros DNS de qualquer domínio, diferenciando-o entre diferentes tipos de registro. Embora este tutorial contenha muitos elementos da sintaxe do **dig**, a busca por tipos de registro A (hostname) e MX (para troca de e-mails) é mais comum. dig é bem popular entre analistas por ser simples e fácil de automatizar. **host** (acesse o [tutorial em inglês](https://www.geeksforgeeks.org/host-command-in-linux-with-examples/)) é outra ferramenta de linha de comando, que rapidamente converte um hostname em um endereço IP com sintaxe mais simples ainda. Ainda, há muitas alternativas ao dig, com mais funcionalidades ou melhor legibilidade, [como o doggo (em inglês)](https://github.com/mr-karan/doggo).

  Procure por nameservers/servidores de nome de proxy reverso de distribuição comum, como os oferecidos por Akamai (por exemplo, a1-64.akam.net), CloudFlare (por exemplo, eve.ns.cloudflare.com), Fastly (por exemplo, ns3.fastly.net), pois eles ocultarão o IP real do servidor de origem. Após algum tempo, você será capaz de reconhecer facilmente muitos destes proxies. Por exemplo, se você rodar o comando `dig` para buscar por theguardian.com, verá que ele é mantido por servidores da Fastly (pelo menos no momento em que isso foi escrito).

- geoIP

  Endereços de IP são mais ou menos vinculados a localidades físicas. Isso significa que, se você conhece um endereço IP, [você pode descobrir](https://www.maxmind.com/en/geoip-demo) (demo de pesquisa MaxMind GeoIP) com alguma certeza, em que lugar do mundo (país, região) está o dispositivo que utiliza tal endereço. Note que a precisão de pesquisas com base em IPs pode variar enormemente: às vezes, é possível rastrear um endereço IP até alcançar uma organização específica, enquanto que em outras vezes só se consegue uma granularidade a nível de país.

🛠️ Reserve um tempo para praticar usando esses serviços. Você poderia, por exemplo, pesquisar seu próprio site ou o da organização da qual faz parte.

#### Descoberta de informações ocultas de DNS/IP

Há uma variedade de formas de se obter informação adicional sobre hosts de um domínio. Perceba, no entanto, que a maioria destas técnicas funciona de vez em quando, e frequentemente falha. Caso uma delas não funcione, não se sinta desencorajade. Alguns destes métodos incluem:

- Uso de transferência de zona DNS. Uma funcionalidade (muitas vezes desabilitada na internet) de servidores de DNS autoritativo é fornecer o conjunto inteiro de registros DNS para um determinado domínio, para sincronizar servidores de réplica com o servidor primário. Leia [este guia (em inglês)](https://0xffsec.com/handbook/information-gathering/subdomain-enumeration/) sobre como utilizar dig e outras ferramentas para desvendar subdomínios com base na transferência de zona DNS.
- Subdomínios por força bruta. É possível supor subdomínios usando uma lista de prefixos comuns e solicitando os endereços IP ao servidor DNS (por exemplo, webmail.attacker.com, vpn.attacker.com, remoteaccess.attacker.com, etc.). Podemos encontrar domínios “escondidos” enquanto o servidor disponibiliza uma resposta NXDOMAIN (domínio inexistente, ou “no such domain”) para hostnames inexistentes. [O guia sobre enumeração de subdomínios (em inglês)](https://0xffsec.com/handbook/information-gathering/subdomain-enumeration/) também lista algumas dessas ferramentas de força bruta.
- Pesquisa reversa de endereços IP adjacentes. Alguns servidores DNS permitem a pesquisa de um hostname para um endereço IP específico. Geralmente, infraestruturas auto hospedadas existem em um bloco pequeno de endereços IP. Dito isso, em alguns casos, é possível pesquisar pelos hostnames de endereços IP próximos (127.0.0.1-127.0.0.254, por exemplo) a partir do endereço IP de hostname (127.0.0.5, por exemplo).

Existem ferramentas que utilizam estas e outras técnicas para descobrir recursos de rede adicionais. Uma delas, ainda em desenvolvimento, é o [Fierce (em inglês)](https://www.kali.org/tools/fierce/). Outra ferramenta popular é o [DNSRecon (em inglês)](https://securitytrails.com/blog/dnsrecon-tool). Este [post de blog que descreve o DNSRecon (em inglês)](https://securitytrails.com/blog/dnsrecon-tool#content-alternatives-to-dnsrecon) também inclui uma lista com outras ferramentas populares de enumeração de DNS.

#### Melhores informações sobre IP/DNS com serviços de escaneamento de rede

Ao conseguir informações acerca do identificador (domínios e IPs), você pode aprofundar a pesquisa utilizando serviços que permitem investigações adicionais sobre o host e quaisquer atividades relacionadas.

Aprenda a visualizar portas abertas, serviços ativos, banner de serviços de um dado IP usando inúmeros serviços de varredura de inteligência da web. É importante notar que continua sendo uma técnica de investigação passiva, uma vez que tais serviços escaneiam a web repetidamente para obter conjuntos de dados, e que você não iniciará atividades novas na infraestrutura de interesse:

- Use [Censys Search (em inglês)](https://search.censys.io/) para observar portas abertas, serviços em andamento, certificados TLS, e mais, para um determinado IP.
- Use [Shodan (em inglês)](https://shodan.io) (a assinatura é exigida para algumas funcionalidades, bem como o uso de filtros em buscas; acesse [a referência (em inglês)](https://www.shodan.io/search/filters) e [exemplos (em inglês)](https://www.shodan.io/search/examples) para mais informações sobre os serviços rodando em um servidor pelo endereço IP. Além disso, Shodan também realiza buscas por todos os servidores que rodam serviços com um banner específico.
- Use [DNS Dumpster (em inglês)](https://dnsdumpster.com/) para buscar potenciais superfícies de ataque de serviços voltados para a internet.

Serviços similares e bancos de dados podem ajudar a identificar as atividades e o histórico de um determinado servidor/serviço.

Outros serviços de escaneamento também reúnem **histórico de DNS**, para consultar outras _resoluções_ de domínio ou subdomínio para um determinado IP ou domínio, quando apareceram/desapareceram, e assim por diante.

- [Security Trails (em inglês)](https://securitytrails.com/)
- [Microsoft Defender XDR (em inglês)](https://www.microsoft.com/en-us/security/business/solutions/extended-detection-response-xdr)(anteriormente RiskIQ) fornece histórico limitado de DNS e resoluções de dados para clientes free-tier (nível gratuito).

#### Melhores informações sobre IP/DNS com bancos de dados de inteligência de ameaças

Muitos serviços coletam indicadores de ameaça e histórico de comportamento malicioso. Caso precise garantir que nenhuma atividade de escaneamento seja iniciada (o que tornaria a investigação ativa), certifique-se de que você não inicie um novo escaneamento na busca (o VirusTotal permite a análise de uma URL, por exemplo, induzindo um novo escaneamento de uma URL, assim, iniciando atividade possível de ser detectada).

- [Alienvault OTX (em inglês)](https://otx.alienvault.com/) é um recurso open source para indicadores maliciosos voltado para a comunidade. Buscar um IP ou nome de host trará informações OSINT úteis, bem como registros de quaisquer atividades maliciosas previamente obtidas.
- [Mandiant Advantage (em inglês)](https://www.mandiant.com/multi-vendor-security-platform-free-access) (de propriedade do Google) fornece funcionalidades de busca limitadas em nível gratuito.

#### Busca por certificados

Atualmente, quase todo site usa HTTPS, o qual utiliza uma tecnologia conhecida como TLS (Transport Layer Security, ou segurança da camada de transporte). Sites maliciosos a utilizam também, em parte debochando da crença de pessoas usuárias de que HTTPS junto ao símbolo de cadeado na barra de endereço do navegador significa que o site está seguro, independentemente de outros fatores.

Certificados TLS devem ser assinados por uma Autoridade de Certificação (CA) para que tanto o certificado em si quanto o navegador o julguem ser confiável. Assim, uma quantidade substancial de dados sobre o domínio pode estar disponível para a investigação na busca por infraestruturas compartilhadas, subdomínios, identificadores e outros recursos.

Dados provenientes de certificados são publicamente disponibilizados graças à prática da Transparência de Certificados (CT), em que Autoridades de Certificação incluem todos os certificados emitidos para logs/registros públicos invioláveis. Entender esse sistema pode se mostrar útil — veja um resumo no [site da Certificate Transparency (em inglês)](https://certificate.transparency.dev/) ou examine o resumo técnico de [Como CT funciona (em inglês)](https://certificate.transparency.dev/howctworks/). Isso ajuda quem quer aprender mais sobre rastreio e detecção de infraestruturas maliciosas com um entendimento abrangente do sistema.

O uso prático de busca por certificados envolve procurar domínios, subdomínios, IPs, identificar informações relevantes como datas e informações correlacionadas encontradas nos certificados emitidos.

Leia atentamente o [guia sobre certificados (em inglês)](https://www.osintcurio.us/2019/03/12/certificates-the-osint-gift-that-keeps-on-giving/), que descreve campos chave de investigação e buscas utilizando Censys e Shodan, e veja o [vídeo de 10 minutos no YouTube (em inglês)](https://www.youtube.com/watch?v=XHltHamQVoA) com a mesma pesquisa utilizando [crt.sh (em inglês)](https://crt.sh/). Ser capaz de utilizar essas três ferramentas de busca é bem vantajoso. Em particular, assegure-se de entender:

- Que campos são relevantes em um certificado ao conduzir uma investigação;
- Como realizar buscas dentre tais campos em plataformas variadas;
- Como identificar subdomínios, IPs de hosts, domínios alternativos emitidos para um certificado.

Perceba que a sintaxe da API de busca do Censys mudou em 2021, e algumas buscas nos tutoriais citados anteriormente não funcionarão. Por exemplo, em vez de `parsed.names:`, simplesmente utilize `names:`.
Muitas ferramentas foram construídas em torno dos registros/logs de transparência de certificados. Tente, por exemplo, enumerar subdomínios utilizando [MassDNS](https://github.com/blechschmidt/massdns#reconnaissance-by-brute-forcing-subdomains). Instruções sobre como usar scripts/ct.py estão na página README (“Leia-me”, em tradução livre).

Censys possui outras referências de leitura relacionadas a técnicas avançadas de rastreio e caça a atores de ameaças no texto [Rastreamento de infraestrutura persistente avançada (em inglês)](https://censys.com/advanced-persistent-infrastructure-tracking/).

**Pontos de atenção**

Ao utilizar ferramentas como WHOIS, você encontrará muitos endereços encobertos pelo Cloudflare ou serviços correlatos. Significa que administradores do endereço estão hospedando-o parcialmente utilizando um serviço terceirizado para manter anonimato ou como proteção contra ataques de negação de serviço, por exemplo. De maneira similar, muitos domínios usam serviços de privacidade para garantir que seus dados não fiquem visíveis no WHOIS. Algumas pessoas também colocam dados falsos no WHOIS. Se este for o caso, a análise do endereço não produzirá boas informações (exceto, talvez, pela data de criação do domínio), e será necessário utilizar formas alternativas de análise.

Muitas URLs maliciosas em e-mails de phishing usam (às vezes múltiplos) redirecionamentos, ou seja, a URL de partida pode ser menos relevante para a análise. Identificar redirecionamentos e outros IPs envolvidos exigirão interação ativa com a URL, assunto coberto pela habilidade de investigação ativa.

Atacantes podem hospedar seus próprios servidores DNS e rastrear solicitações de acesso. Sendo assim, as solicitações podem não ser “passivas”, e podem alertar atacantes sobre a investigação em andamento. Tome cuidado especialmente com hostnames que podem conter identificadores, como r2378r233yr39wjwr.example.com.

## Atividade prática

Escolha um domínio aleatório, certificando-se de que ele não esteja hospedado por uma proxy de distribuição de conteúdo/reversa como Cloudflare (é possível descobrir isso por meio de ferramentas como dig e a opção de NS ao buscar nameservers). Utilizando as ferramentas citadas, investigue o domínio, e tente explicar:

- Onde o domínio está registrado e, caso a informação esteja disponível, quem o registrou?
- Qual é o endereço IP do domínio?
- Quem gerencia este endereço IP?
- Onde se localiza o servidor?
- (Caso haja acesso ao Shodan/Censys) Que serviços estão rodando nesse servidor?
- Que outros domínios estão hospedados no mesmo IP?
- Consegue encontrar subdomínios para esse domínio?

## Checagem de habilidades

Faça os seguintes exercícios com colegas ou uma pessoa mentora mais experientes em investigação passiva de servidores na internet:

- Complete o room (ou “sala”, em tradução adaptada) [do reconhecimento passivo (em inglês)](https://tryhackme.com/room/passiverecon) no TryHackMe.
- Faça o exercício da seção “Atividade prática”, idealmente com um domínio diferente, e repasse o processo e descobertas com a pessoa par ou mentora. Peça para que revisem seu trabalho e comentem sobre o processo e os resultados obtidos. Pode ser um bom exercício discutir especificamente como encontrar subdomínios existentes no domínio, e sobre a precisão das pesquisas com geoIP relacionadas a estes domínios. Como atividade extra, fuce as configurações avançadas do dig e monte uma automação básica, por exemplo, solicitando uma lista de domínios a partir de um arquivo de texto, e forneça informações sobre eles.
- Caso tenha uma mensagem real de phishing (ou, alternativamente, use um domínio de phishing no [PhishTank (em inglês; o nome vem de um trocadilho com “tanque de peixes”, ou “fish tank”)](https://phishtank.org/) e o analise — perceba que o site coleta domínios, e não mensagens. 

## Recursos de aprendizagem

{{% resource title="O que é uma URL?" languages="Chinês, inglês, francês, japonês, coreano, russo, espanhol" cost="Grátis" description="Resumo sobre o que são URLs, como são construídas, e que funcionalidades adicionais (âncoras, etc.) elas podem ter." url="https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/What_is_a_URL" %}}

{{% resource title="Introdução ao DNS" languages="Vídeo em inglês, texto em árabe, indonésio, alemão, espanhol, francês, italiano, português, vietnamita, turco, russo, tailandês, japonês, coreano, chinês, taiwanês" cost="Grátis" description="Resumo básico sobre o funcionamento de DNS." url="https://aws.amazon.com/route53/what-is-dns/" %}}

{{% resource title="Resumo sobre tipos de registro DNS" languages="Inglês, alemão, espanhol, francês, italiano, japonês, coreano, português, taiwanês, mandarim" cost="Grátis" description="Inclui os tipos de registro mais e menos comuns." url="https://www.cloudflare.com/learning/dns/dns-records/" %}}

{{% resource title="Usando o comando dig" languages="Inglês" cost="Grátis" description="Como consultar informações sobre endereços IP." url="https://phoenixnap.com/kb/linux-dig-command-examples" %}}

{{% resource title="doggo" languages="Inglês" cost="Grátis" description="Uma alternativa ao comando dig, com funcionalidade similar e formato de saída diferente." url="https://github.com/mr-karan/doggo" %}}

{{% resource title="Comando host em Linux, com exemplos" languages="Inglês" cost="Grátis" description="Guia de como usar o comando host no Linux, outra ferramenta comum para análise de servidores e outros tipos de infraestrutura." url="https://www.geeksforgeeks.org/host-command-in-linux-with-examples/" %}}

{{% resource title="Reconhecimento adicional do DNS: DNSRecon (Recurso 1)" languages="Inglês" cost="Grátis" description="Várias ferramentas de automação de busca por servidores relacionados." url="https://securitytrails.com/blog/dnsrecon-tool" %}}

{{% resource title="Reconhecimento adicional do DNS: Fierce (Recurso 2)" languages="Inglês" cost="Grátis" description="Várias ferramentas de automação de busca por servidores relacionados." url="https://www.kali.org/tools/fierce/" %}}

{{% resource title="Reconhecimento adicional do DNS: Fierce (Recurso 3)" languages="Inglês" cost="Grátis" description="Várias ferramentas de automação de busca por servidores relacionados." url="https://salsa.debian.org/pkg-security-team/fierce" %}}

{{% resource title="Reconhecimento adicional do DNS: VirusTotal (Recurso 4)" languages="Inglês" cost="Grátis" description="Várias ferramentas de automação de busca por servidores relacionados." url="https://docs.virustotal.com/docs/how-it-works" %}}

{{% resource title="GeoIP" languages="Inglês" cost="Grátis para consultas limitadas" description="Busque a (provável) localização física de um servidor através do endereço  IP." url="https://www.maxmind.com/en/geoip-demo" %}}

{{% resource title="whois/RDAP: busca de who.is" languages="Inglês" cost="Grátis" description="Informações de propriedade de um domínio ou endereço IP." url="https://who.is/" %}}

{{% resource title="whois/RDAP: busca de ARIN RDAP" languages="Inglês" cost="Grátis" description="Informações de propriedade de um domínio ou endereço IP." url="https://search.arin.net/rdap/" %}}

{{% resource title="whois/RDAP: consulta de ICANN" languages="Inglês" cost="Grátis" description="Informações de propriedade de um domínio ou endereço IP." url="https://lookup.icann.org/en" %}}

{{% resource title="O que é WHOIS e como ele é usado" languages="Inglês" cost="Grátis" description="Resumo sobre o que é o banco de dados whois, e quais são as suas possíveis limitações." url="https://www.domain.com/blog/what-is-whois-and-how-is-it-used/" %}}

{{% resource title="O guia definitivo do banco de dados WHOIS" languages="Inglês" cost="Grátis" description="Uma perspectiva sobre pra quê whois pode (e não pode) ser utilizado." url="https://domainnamestat.com/blog/the-ultimate-guide-to-the-whois-database" %}}

{{% resource title="O que é um endereço IPv4?" languages="Inglês" cost="Grátis" description="Há dois tipos de endereços IP, IPv4 e IPv6. Este guia fornece uma introdução ao IPv4." url="https://bluecatnetworks.com/glossary/what-is-ipv4/" %}}

{{% resource title="Diferenças entre IPv4 e IPv6" languages="Inglês" cost="Grátis" description="Diferenças mais marcantes entre os dois tipos de endereços IP." url="https://www.geeksforgeeks.org/differences-between-ipv4-and-ipv6/" %}}

{{% resource title="Entendendo endereços IP" languages="Inglês" cost="Grátis" description="Breve introdução do que são endereços IP, e quais são os seus diferentes tipos." url="https://www.enterprisenetworkingplanet.com/standards-protocols/understanding-ip-addresses/" %}}

{{% resource title="O que são números de portas e como eles funcionam?" languages="Inglês" cost="Grátis" description="Breve introdução a números de portas, incluindo uma lista com as principais." url="https://www.techtarget.com/searchnetworking/definition/port-number" %}}

{{% resource title="Enumeração de subdomínios: guia definitivo" languages="Inglês" cost="Grátis" description="Guia contendo diversas técnicas de enumeração (descoberta) de subdomínios que um domínio específico possui. Vale a pena lembrar que nem todas as técnicas servirão para todos os domínios/servidores." url="https://0xffsec.com/handbook/information-gathering/subdomain-enumeration/" %}}

{{% resource title="Serviços de Inteligência de ameaças com histórico de DNS: trilha de segurança" languages="Inglês" cost="Grátis, com funcionalidades premium (trilha de segurança) / Grátis (Microsoft Defender)" description="Serviços que performam escaneamento de DNS e incluem histórico; analistas que os utilizam podem saber se certos sites ou endereços foram alterados ou mudaram." url="https://securitytrails.com/" %}}

{{% resource title="Serviços de Inteligência de ameaças com histórico de DNS: Microsoft XDR" languages="Inglês" cost="Grátis, com funcionalidades premium (trilha de segurança) / Grátis (Microsoft Defender)" description="Serviços que performam escaneamento de DNS e incluem histórico; analistas que os utilizam podem saber se certos sites ou endereços foram alterados ou mudaram." url="https://www.microsoft.com/en-us/security/business/solutions/extended-detection-response-xdr" %}}

{{% resource title="Alienvault OTX" languages="Inglês" cost="Grátis" description="Serviço que compila inteligência de ameaças e indicadores apresentados pela comunidade." url="https://otx.alienvault.com/" %}}

{{% resource title="Vantagens da Mandiant" languages="Inglês" cost="Algumas funcionalidades disponíveis no nível gratuito" description="Serviço de inteligência de ameaças, atualmente de propriedade do Google." url="https://www.mandiant.com/multi-vendor-security-platform-free-access" %}}

{{% resource title="Shodan" languages="Inglês" cost="Nível gratuito, Básico por $49, Maior volume disponível em assinaturas mensais" description="Mostra informações em serviços executados em servidores a partir do endereço IP, podendo também buscar pelos servidores que rodam um serviço com um determinado banner." url="https://www.shodan.io/" %}}

{{% resource title="Buscador Censys" languages="Inglês" cost="Grátis" description="Ferramenta de monitoramento de portas abertas, serviços em andamento, certificados TLS, e mais, para um dado IP." url="https://search.censys.io/" %}}

{{% resource title="DNS Dumpster" languages="Inglês" cost="Grátis" description="Ferramenta utilizada para buscar prováveis superfícies de ataque em serviços de internet voltados para a internet." url="https://dnsdumpster.com/" %}}

{{% resource title="DNS Checker" languages="Inglês" cost="Grátis" description="‘Canivete suíço’ de pesquisas por DNS e IPs — permite várias buscas rápidas de domínio/DNS, IP, e registros de e-mails." url="https://dnschecker.org/all-tools.php" %}}

{{% resource title="MXToolbox" languages="Inglês" cost="Grátis" description="‘Canivete suíço’ de pesquisas por DNS e IPs — permite várias buscas rápidas de domínio/DNS, IP, e registros de e-mails." url="https://mxtoolbox.com/SuperTool.aspx" %}}

{{% resource title="Como funciona a transparência de certificados" languages="Inglês" cost="Grátis" description="Breve introdução sobre o que é a transparência de certificados, que problemas ele busca resolver, e como ele funciona." url="https://certificate.transparency.dev/howctworks/" %}}

{{% resource title="Certificados: o presente OSINT que continua valendo a pena (versão textual)" languages="Inglês" cost="Grátis" description="Guia para análise de como utilizar ferramentas como Shodan para buscar por certificados e obter bons dados sobre os servidores web em investigação." url="https://www.osintcurio.us/2019/03/12/certificates-the-osint-gift-that-keeps-on-giving/" %}}

{{% resource title="Certificados: o presente OSINT que continua valendo a pena (versão em vídeo)" languages="Inglês" cost="Grátis" description="Guia para análise de como utilizar ferramentas como Shodan para buscar por certificados e obter bons dados sobre os servidores web em investigação." url="https://www.youtube.com/watch?v=XHltHamQVoA" %}}

{{% resource title="crt.sh" languages="Inglês" cost="Grátis" description="Engenharia de busca com foco em certificados." url="https://crt.sh/" %}}

{{% resource title="massdns" languages="Inglês" cost="Grátis" description="Ferramenta para pesquisas de força bruta por subdomínios." url="https://github.com/blechschmidt/massdns#reconnaissance-by-brute-forcing-subdomains" %}}

{{% resource title="Rastreamento de infraestrutura persistente avançada" languages="Inglês" cost="Grátis" description="Guia com vários métodos que podem ser utilizados para rastrear infraestruturas atacantes, e também contempla busca por certificados." url="https://cobaltstrike.com/downloads/csmanual38.pdf" %}}