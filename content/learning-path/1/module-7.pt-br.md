---
style: module
title: Investigação ativa - Análise de páginas web maliciosas
description: Este módulo te ensinará a analisar sites controlados por atacantes para que você entenda as ações deles ou vetores de ataque usados em ataques.
weight: 7
---

## Caso de uso

E-mails de *phishing* geralmente são apenas o primeiro passo em um ataque. A maioria tenta fazer com que a pessoa atacada visite uma página na web com um objetivo de ataque específico. Este módulo te ensinará a **examinar os sites controlados por atacantes para entender suas ações** e potencialmente **descobrir outras infraestruturas controladas por eles** ou vetores de ataque usados ​​em seus ataques. Observe que sites podem ser extremamente complicados, com comportamento que varia desde simples imitações para roubar credenciais até ataques complexos contra o navegador ou o próprio dispositivo de navegação.

Observe que interagir com sites maliciosos pode colocar quem os analisa em risco. Certifique-se de configurar e usar um ambiente isolado ([leia o Módulo 3](/pt-br/learning-path/1/module-3/)), e coletar e armazenar todas as páginas web de forma segura. Vale dizer, também, que esta habilidade é útil e acessória para a trilha de aprendizagem de Análise de Malware.

## Objetivos

Após concluir este subtópico, profissionais devem ser capazes de fazer o seguinte:

- Analisar os sites controlados por atacantes através da leitura do código-fonte usando os recursos de inspeção dos navegadores e opcionalmente usando ferramentas como interceptação de proxies ou depuradores de JavaScript.
- Descobrir com quais outras infraestruturas esses sites poderiam se conectar, procurando URLs, redirecionamentos, domínios vinculados e outros ativos ou identificadores.

---
## Seção principal
### Conhecimento fundamental

Tudo isso será significativamente mais fácil de praticar se você souber um pouco de JavaScript e HTML, embora esses não sejam pré-requisitos estritamente necessários.

Vale a pena destacar algumas diferenças básicas entre um e-mail e uma página web:

- As páginas web podem ser dinâmicas, então o servidor pode gerar uma página web diferente com base em variáveis ​​como o endereço IP do solicitante, navegador, hora do dia, etc.
- Os navegadores são capazes de processar mais elementos HTML do que os clientes de e-mail, e com menos proteções. Mais importante, navegadores podem executar JavaScript, algo que os clientes de e-mail não fazem.
- E-mails HTML são gerados quando o e-mail é enviado; a ação é iniciada pelo atacante. Com as páginas web, a ação é iniciada pelo visitante. Quando você vê uma página web maliciosa, o atacante pode sempre estar ciente de suas ações. Embora mecanismos como VPNs ou Tor possam impedir que o administrador da página web capture seu endereço IP, o próprio site pode conter referências vinculadas ao e-mail de phishing ou ser personalizado para cada destinatário. Dessa forma, o atacante saberá com um alto grau de certeza que apenas aqueles que tinham acesso ao e-mail de phishing visitariam a página web.

Por esse motivo, recomendamos analisar as páginas web somente em um ambiente seguro projetado especificamente para abrir arquivos potencialmente suspeitos, como uma máquina virtual ou uma *sandbox* ("caixa de areia" — um ambiente virtual seguro, isolado, e descartável). Além disso, discuta o modelo de ameaça específico do destinatário do e-mail para garantir que seja seguro para ele que você conduza mais atividades de análise que possam ser detectadas pelo atacante.

### Estudos de caso

Leia dois estudos de caso que analisam ataques de phishing que tiveram como alvo grupos da sociedade civil. Ambos os ataques foram parcialmente bem-sucedidos:

- Human Rights Watch: [Irã: Comprometimento de ativistas, jornalistas, políticos financiado pelo Estado (em inglês)](https://www.hrw.org/news/2022/12/05/iran-state-backed-hacking-activists-journalists-politicians) (A seção introdutória é uma contextualização útil sobre táticas e motivações de atacantes; no entanto, concentre-se na seção _Technical Analysis of the Phishing Campaign_ para fins de aprendizado.)
- Bellingcat: [Açscensão de Guccifer? Campanha de phishing com duração de meses tem como alvo dezenas de jornalistas e ONGs com foco na Rússia (em inglês)](https://www.bellingcat.com/news/uk-and-europe/2019/08/10/guccifer-rising-months-long-phishing-campaign-on-protonmail-targets-dozens-of-russia-focused-journalists-and-ngos/)

Com o [estudo de caso da HRW](https://www.hrw.org/news/2022/12/05/iran-state-backed-hacking-activists-journalists-politicians) mencionado acima em mente, observe algumas características-chave de análise usadas em cada investigação. Algumas delas exigem habilidades técnicas, enquanto outras exigem pesquisa, pensamento crítico e habilidades interpessoais. Alguns dos métodos identificados no estudo de caso incluem:

- Os atacantes usaram um serviço encurtador de URL. Isso é comum para e-mails legítimos e ilegítimos. Você deve ser capaz de reconhecer encurtadores de URL e saber como expandi-los sempre que possível (por exemplo, usando o mecanismo embutido do encurtador, como adicionar um + ao final do URL, usando uma ferramenta de expansão como [Urlex](https://urlex.org/)), ou rastrear os estágios de redirecionamentos HTTP. Notavelmente, o atacante criou o seu próprio serviço de encurtador de URL neste caso, se passando (através de uma pequena mudança de digitação no domínio) por outro encurtador de URL conhecido.
- Foram registrados múltiplos domínios com a intenção de confundir o alvo (por exemplo, sharefilesonline[.]live, que faz referência aos nomes dos produtos da Microsoft: SharePoint e Live.com).
- Links exclusivos enviados para alvos individuais com um identificador de cinco caracteres (isso pode ser feito pelo uso de qualquer cadeia de caracteres exclusiva em um URL, geralmente dentro do caminho da URL ou passada em um parâmetro, por exemplo, após um '?').
- Usando força bruta para tentar todas as possíveis combinações de identificadores e URLs com cinco caracteres, os analistas puderam descobrir várias outras páginas usadas pela campanha de phishing. Eles se passaram por provedores de e-mail populares e usaram um kit de phishing que permite técnicas de evasão de autenticação multifatores (também conhecida como MFA — de _Multi-Factor Authentication_ — ou 2FA — _Two-Factor Authentication_).
- Os analistas entraram em contato com outras pessoas que poderiam ter sido alvo da mesma campanha para compartilhar ainda mais informações — dados de inteligência — sobre ameaças e entender melhor as técnicas do adversário.
- Os atacantes usaram táticas, como acessar dados e usar [Google Takeout](https://support.google.com/accounts/answer/3024190?hl=en) (uma ferramenta que permite que os usuários baixem todos os dados da própria conta Google).
- Os autores do relatório analisaram o histórico do Google Takeout e outros registros das pessoas que foram alvo do ataque. Isso os ajudou a rastrear a atividade ocorrida após o comprometimento, os nomes de dispositivos dos atacantes, assim como endereços IP dessas conexões.
- Os autores também compartilharam outros trabalhos de pesquisa e atribuição que conduziram:
 - Eles listaram pesquisas de grupos de inteligência de ameaças sobre grupos de ameaças persistentes avançadas (APA) (veja e salve nos seus links favoritos esta Planilha Google criada com contribuições coletivas [APT Group and Operations](https://docs.google.com/spreadsheets/d/1H9_xaxQHpWaa4O_Son4Gx0YOIzlcBWMsdvePFX68EKU/htmlview#)).
 - Eles analisaram códigos-fonte para identificar blocos de código reutilizados ou semelhantes em ameaças anteriormente pesquisadas.
 - Eles escreveram sobre outras táticas de atacantes, como se passar por organizadores de conferências/cúpulas ou figuras-chave de ONGs.
- Por fim, o relatório também compartilha indicadores técnicos de comprometimento.

### Inspeção automatizada de um site dentro de uma _sandbox_

O primeiro passo quando você estiver pronto para inspecionar um site vinculado a uma mensagem de phishing, pode ser olhar o site de forma segura. Isso envolve algum grau de interação com o site. Para o manuseio direto de um site potencialmente malicioso, você deve ter implementado precauções para ter um ambiente de trabalho seguro, conforme abordado no [Módulo 3](/pt-br/learning-path/1/module-3/). No entanto, você também pode usar ferramentas online para inspecionar um site em uma _sandbox_ remota segura:

- 🧰 Ferramentas como [UrlScan](https://urlscan.io/) permitem a execução de uma análise de um URL. Tome nota sobre alguns dos principais recursos que usaremos para interpretar os resultados:

    - Ao executar uma análise, escolha entre Public, Unlisted, or Private. Você pode ler uma explicação mais detalhada sobre as diferenças entre os tipos de análise na [documentação do UrlScan](https://urlscan.io/docs/api/), mas saiba de antemão que uma análise Public (a opção padrão) listará o URL na página inicial do UrlScan.
    - Imagem ao vivo do site (este pode ser o primeiro passo de uma triagem simples se o modelo de ameaça permitir que você inicie esta análise)
    - Informações de domínio e IP
    - Recursos carregados, incluindo scripts e AJAX (aba _HTTP_)
    - Elementos dinâmicos, cookies, variáveis ​​(aba _Behaviour_)
    - Redirecionamentos (se houver)
    - Indicadores como domínios, IPs, strings, hashes (aba _Indicators_)
        - Um hash é como uma pequena impressão digital de um arquivo — ele pode ser usado para identificar um arquivo único sem revelar seu conteúdo. Você pode calcular um hash usando [a linha de comando no Windows, macOS e Linux](https://techdocs.akamai.com/download-ctr/docs/verify-checksum).
    - Conteúdo, como formulários (aba _Content_)
    - Tecnologias usadas (como um CMS)
    - Vereditos (caso outros tenham sinalizado a URL como maliciosa)
    - Botão _Lookup_ para verificar o site em outros mecanismos de análise

- 🧰 [Hybrid Analysis](https://www.hybrid-analysis.com/) é uma sandbox hospedada que pode carregar uma página web em um ambiente de teste e comparar o comportamento do site com várias heurísticas de atividade maliciosa e verificar indicadores internos contra ameaças conhecidas. Observe alguns dos principais recursos e as habilidades necessárias para interpretar os resultados:
    - Após enviar uma URL, selecione o ambiente a ser usado como sandbox. Caso você selecione ‘Quick Scan’, uma execução completa do sandbox não ocorrerá, mas sim um conjunto menor de análises estáticas e verificações de indicadores.
- [VirusTotal](https://www.virustotal.com/) também pode analisar uma URL em busca de conteúdo malicioso. Note que Hybrid Analysis também inclui pesquisas do VirusTotal e considera uma gama mais ampla de problemas para determinar sua classificação.

Observe que um aplicativo web sofisticado pode detectar que uma solicitação vem dos intervalos de endereços IP dessas ferramentas e fornecer dados diferentes ou nenhum dado à solicitação, ao mesmo tempo em que fornece conteúdo malicioso a outros IPs.

### Ferramentas manuais e específicas para inspeção de um site

Uma das formas mais simples de analisarmos um site é [utilizando a ferramenta de inspeção do navegador](https://blog.hubspot.com/website/how-to-inspect), que usualmente quebra o site em diferentes partes menores, e pode identificar que partes do código o site solicita de qual servidor, e permite que modifiquemos o código para verificar, de forma automática e temporária, a mudança no layout e funcionalidade do site.

#### Força bruta

Como visto no artigo da Human Rights Watch linkado acima, utilizar meios programáticos para aplicar força bruta em URLs é uma técnica bastante comum durante OSINT. Há muitas ferramentas e abordagens possíveis de serem aprendidas:

- OWASP [DirBuster](https://gitlab.com/kalilinux/packages/dirbuster)
- Wordlist Generators: frequentemente usadas para descobertas de senha, listas de palavras são também utilizadas em ataques de força bruta em pastas e subdomínios. Tais listas trabalharão em conjunto com as ferramentas listadas anteriormente. Observe ferramentas como Crunch ([Tutorial 1](https://www.hackers-arise.com/post/creating-a-custom-wordlist-with-crunch) | [Tutorial 2](https://null-byte.wonderhowto.com/how-to/tutorial-create-wordlists-with-crunch-0165931/))

#### Análise de kits de phishing

A maioria dos ataques que você encontrará vai utilizar um kit previamente construído ou modificado de phishing, uma coleção de códigos e templates/modelos que permitem que atacantes construam um site convincente de phishing. Alguns destes kits possuem indicativos; muitos deles, por exemplo, utilizam de certos mecanismos para evitar serem [detectados e indexados por buscadores](https://arxiv.org/pdf/2210.08273.pdf), e podem até recusar carregamento a partir [do endereço IP de buscadores web ou empresas de segurança](https://blog.sucuri.net/2017/07/protecting-phishing-pages-via-htaccess.html).

Alguns kits de phishing também são capazes de burlar autenticação multifator, por exemplo, capturando um código que uma pessoa alvo digitou e imediatamente utilizando-o para fazer login na página real, como se fosse a própria pessoa. [Este artigo é um ótimo relatório](https://www.aon.com/cyber-solutions/aon_cyber_labs/bypassing-mfa-a-forensic-look-at-evilginx2-phishing-kit/) sobre como um um kit de phishing de código aberto utilizado por times de segurança que testam mecanismos de segurança podem capturar e utilizar dados de autenticação de 2 fatores (e o que pode ser feito para preveni-lo). Você também pode [conferir outro relatório de um kit de phishing](https://www.bleepingcomputer.com/news/security/w3ll-phishing-kit-hijacks-thousands-of-microsoft-365-accounts-bypasses-mfa/) (este kit foi escrito por cibercriminosos, e não por pesquisadores de segurança), com contorno de MFA (_Multifactor Authentication_) e técnicas fascinantes para evasão de detecção.

## Atividade prática

- [Leia o seguinte artigo](https://www.linkedin.com/pulse/security-analyst-skills-pt-1-qualifying-domains-craig-smith), que mostra como analisar uma página usando urlscan.io. Conduza as mesmas buscas e análises do artigo, e considere as formas como o autor chegou às conclusões alcançadas.
- [Leia atentamente uma segunda análise](https://www.linkedin.com/pulse/security-analyst-skills-pt-2-techniques-analyzing-web-craig-smith) do mesmo autor. Acompanhe os links fornecidos de VirusTotal, UrlScan, e Hybrid Analysis, e veja se consegue entender como ele chegou às conclusões do texto.

## Checagem de habilidades

- Complete a sala [Walking An Application](https://tryhackme.com/room/walkinganapplication) do TryHackMe.
- Dê uma olhada na [tarefa dois](https://tryhackme.com/room/activerecon) da sala Active Reconnaissance do TryHackMe.
- Analise um site malicioso (um domínio listado no [PhishTank](https://phishtank.org/), por exemplo) utilizando uma mistura de análise passiva e ativa, certificando-se de que a análise ativa seja feita em uma sandbox, ou com ferramentas como UrlScan. Responda às seguintes questões sobre o site, e discuta as respostas com colegas ou quem está te mentorando:
  - De quem é a infraestrutura que está hospedando o site?
  - Que outros domínios o site carrega, ou referencia? O que eles fazem?
  - Quando o domínio foi registrado?
  - (Opcional) Que software está sendo utilizado no site?
  - O site foi listado como malicioso por outras pessoas?
## Recursos de aprendizagem

{{% resource title="Irã: Comprometimento de ativistas, jornalistas, políticos financiado pelo Estado" languages="Inglês" cost="Grátis" description="Um bom relatório de análise de uma campanha de phishing bastante sofisticada que tinha como alvo grupos da sociedade civil. Ele inclui extensas discussões a respeito de infraestrutura e atribuição." url="https://www.hrw.org/news/2022/12/05/iran-state-backed-hacking-activists-journalists-politicians" %}}

{{% resource title="Ascensão de Guccifer? Campanha de phishing com duração de meses tem como alvo dezenas de jornalistas e ONGs com foco na Rússia" languages="Inglês" cost="Grátis" description="Um relatório de uma campanha de phishing anterior que tinha como alvo grupos da sociedade civil realizando trabalhos relacionados à Rússia. O ataque envolveu evasão de autenticação multi-fatores." url="https://www.bellingcat.com/news/uk-and-europe/2019/08/10/guccifer-rising-months-long-phishing-campaign-on-protonmail-targets-dozens-of-russia-focused-journalists-and-ngos/" %}}

{{% resource title="UrlScan" languages="Inglês" cost="Grátis, com algumas funcionalidades pagas" description="Uma plataforma na qual você submete uma URL para análise. A ferramenta analisará o site resultante, procurando por malware ou outros comportamentos estranhos." url="https://urlscan.io/" %}}

{{% resource title="Hybrid Analysis" languages="Inglês" cost="Grátis" description="Uma ferramenta capaz de analisar arquivos e links, tentando identificar conteúdo ou comportamento malicioso. Diferente do UrlScan, ele também pode inspecionar amostras de malware ou abrir arquivos executáveis." url="https://www.hybrid-analysis.com/" %}}

{{% resource title="Aprenda JavaScript" languages="Inglês" cost="Grátis" description="Além de HTML, a maioria das páginas web usa JavaScript. Apesar de não ser necessário se tornar um especialista em JavaScript, aprender um pouco de JavaScript é importante para entender o que sites estão fazendo." url="https://www.codecademy.com/learn/introduction-to-javascript" %}}

{{% resource title="Como inspecionar um elemento no Chrome, Safari, e Firefox" languages="Inglês" cost="Grátis" description="Todo grande navegador agora oferece uma funcionalidade de inspeção de elementos. Essa ferramenta te permite estudar e modificar componentes de código de uma página web. Este artigo oferece uma visão geral dessa funcionalidade, e mostra como ativá-la nos principais navegadores." url="https://blog.hubspot.com/website/how-to-inspect" %}}

{{% resource title="Exemplo 1 de análises de sites maliciosos" languages="Inglês" cost="Grátis" description="Um bom guia sobre como fazer uma análise inicial e triagem de sites para entendermos se ele é malicioso e se ele já foi categorizado dessa forma." url="https://infosecwriteups.com/analyzing-a-malicious-site-9fb8730be51b" %}}

{{% resource title="Exemplo 2 de análises de sites maliciosos" languages="Inglês" cost="Grátis" description="Outro bom guia sobre como fazer uma análise inicial e triagem de sites para entendermos se ele é malicioso e se ele já foi categorizado dessa forma." url="https://www.linkedin.com/pulse/security-analyst-skills-pt-2-techniques-analyzing-web-craig-smith" %}}

{{% resource title="Classificação de kits para phishing na web para detecção precoce por detentores de plataformas" languages="Inglês" cost="Grátis" description="Um artigo acadêmico que analisa kits de phishing, os mecanismos que alguns deles usam, e como podemos usar ferramentas como aprendizagem de máquina para detectá-los." url="https://arxiv.org/pdf/2210.08273.pdf" %}}

{{% resource title="Protegendo páginas de phishing via .htaccess" languages="Inglês" cost="Grátis" description="Páginas de phishing podem usar várias técnicas para tentar evadir a sua detecção. Uma delas acontece pelo uso de .htaccess, um arquivo que contém instruções para servidores web para excluir ou incluir certos intervalos de endereços IP." url="https://blog.sucuri.net/2017/07/protecting-phishing-pages-via-htaccess.html" %}}

{{% resource title="StalkPhish" languages="Inglês" cost="Grátis" description="Uma ferramenta projetada para automatizar a descoberta e identificação de kits de phishing." url="https://github.com/t4d/StalkPhish" %}}

{{% resource title="Contornando MFA: Uma perspectiva forense sobre o kit de phishing Evilginx2" languages="Inglês" cost="Grátis" description="Este artigo analisa um kit de phishing que encontrou uma forma de evadir algumas formas de autenticação multi-fatores. Ele analisa como isso é alcançado e lista formas de mitigar esses mecanismos." url="https://www.aon.com/cyber-solutions/aon_cyber_labs/bypassing-mfa-a-forensic-look-at-evilginx2-phishing-kit/" %}}

{{% resource title="Kit de phishing W3LL sequestra milhares de contas Microsoft 365, contorna MFA" languages="Inglês" cost="Grátis" description="Este artigo analisa um kit de phishing criado e vendido por criminosos que contém múltiplos mecanismos para frustrar tentativas de análise. Ele também usa técnicas de evasão de autenticação multi-fatores." url="https://www.bleepingcomputer.com/news/security/w3ll-phishing-kit-hijacks-thousands-of-microsoft-365-accounts-bypasses-mfa/" %}}