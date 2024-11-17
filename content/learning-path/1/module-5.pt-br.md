---
style: module
title: “Investigação passiva - Análise de cabeçalhos de e-mail”
description: “O subtópico te ensinará a analisar extensos metadados contendo a origem de um e-mail, os servidores pelos quais ele passou, informações sobre possíveis checagens de spam, e muito mais. Os metadados podem integrar uma parte fundamental de qualquer investigação aprofundada sobre e-mails potencialmente mal-intencionados.”
weight: 5
---

## Caso de uso

E-mails são muito mais do que parecem ser. Este subtópico te ensinará a **analisar extensos metadados** contendo a origem de um e-mail, os servidores pelos quais ele passou, informações sobre possíveis checagens de spam, e muito mais. Os metadados podem integrar uma parte fundamental de qualquer investigação aprofundada sobre e-mails potencialmente mal-intencionados.

Use esta habilidade após ou junto do subtópico de [Triagem](#subtopic-4-passive-investigation-analyze-urls-hostnames-and-ip-addresses) nesta trilha de aprendizagem. Algumas dessas competências podem ser exigidas no processo de triagem para decidir se uma mensagem é, de fato, suspeita.

Uma vez que cabeçalhos de e-mails podem conter referências a outros domínios e infraestruturas, profissionais devem ter passado pelo subtópico 4, que envolve a análise de informações de domínio/IP.

## Objetivos

Após completar este subtópico, profissionais serão capazes de:

- Extrair cabeçalhos completos de um e-mail que tenham recebido ou estejam analisando;
- Analisar os cabeçados extraídos, prestando atenção:
  - à identidade do servidor ou servidores que enviaram o e-mail;
  - a qualquer informação acerca de dados de SPF ou DKIM contidos nestes cabeçalhos;
  - à possibilidade de qualquer informação do cabeçalho ter sido forjado
- - -

Todo e-mail possui cabeçalho, com metadados essenciais sobre remetente, destinatário e o e-mail em si. Nesta seção, trabalharemos com os cabeçalhos de e-mails, entendendo como podemos analisá-los, e de que maneira eles podem ser falsificados. Isso requer conhecimento prévio.

## Conhecimento básico

Leia os recursos e documentos a seguir para se familiarizar um pouco (ou revisar o conhecimento) acerca de cabeçalhos de e-mails, e protocolos SPF e DKIM.

- Entenda [o que são cabeçalhos de e-mails](https://support.google.com/mail/answer/29436?hl=pt-BR&sjid=168222457786878862-SA) e como podemos analisá-los em múltiplos sistemas
- Entenda o básico sobre falsificação de e-mails e o uso de SPF e DKIM para combatê-la
  - Aprenda sobre [falsificação de e-mails e como identificá-la (em inglês)](https://docs.sendgrid.com/glossary/spoofing)
  - Aprenda sobre o Sender Policy Framework (“Framework de Política de Remetente”, em tradução livre) e seu objetivo de prevenir que o endereço de remetente seja forjado.
    - Use dig/doggo para buscar registros válidos de SPF (é possível fazê-lo [rodando o comando dig com o argumento `txt` (em inglês)](https://easydmarc.com/tools/spf-lookup#how-to-check-spf-record-via-command-line-via-dig-tool)), analise seu conteúdo (acesse um guia [aqui, em inglês](https://support.mailessentials.gfi.com/hc/en-us/articles/360015116520-How-to-check-and-read-a-Sender-Policy-Framework-record-for-a-domain)) e responda as seguintes questões:


      - Qual a versão utilizada de SPF?
      - Que domínios de remetentes estão autorizados para o domínio do e-mail?
      - Que mecanismo (ou política) se aplica a todes es “outres” remetentes?
      - Há outros mecanismos (ou políticas) definidos no registro?
    - Use [https://mxtoolbox.com/spf.aspx (em inglês)](https://mxtoolbox.com/spf.aspx) para conduzir uma busca, e teste o registro SPF de um domínio protegido. Você pode procurar pelos registros de sua própria organização, por exemplo, através da pesquisa pelo domínio principal.
  - Aprenda sobre [DomainKeys Identified Mail (DKIM), em inglês](https://docs.sendgrid.com/ui/account-and-settings/dkim-records) e, sendo um padrão de autenticação, de que forma ele é usado para prevenir falsificação de e-mails.
    - Use [https://mxtoolbox.com/dkim.aspx (em inglês)](https://mxtoolbox.com/dkim.aspx) para buscar um domínio autenticado por DKIM. Você pode procurar pelos registros de sua própria organização, por exemplo, através da busca pelo domínio principal.
- **(Avançado)** Familiarize-se com várias técnicas e mecanismos de filtros de spam para identificá-los, bem como e-mails suspeitos.
  - Consulte a [lista de módulos (e seletores) disponíveis com apoio de RSPAMD (em inglês)](https://rspamd.com/doc/modules/)

## Seção principal
### Análise de cabeçalhos

O [time da Nebraska GenCyber criou um guia rápido e abrangente sobre cabeçalhos de e-mails (em inglês)](https://mlhale.github.io/nebraska-gencyber-modules/phishing/email-headeranalysis/#email-headers), recomendado para todo mundo que queira aprender sobre o assunto.

Conforme for analisando cabeçalhos, você aprenderá bastante sobre diferentes domínios envolvidos na configuração de um e-mail. Uma vez de posse de uma lista de tais domínios, é possível usar as mesmas ferramentas da seção anterior (dig, whois, geoIP, e outras) para aprofundar o aprendizado.

Administradores de sistemas que usam domínios de ambiente de trabalho como Google Workspace e Microsoft 365 frequentemente possuem acesso a ferramentas de busca de logs e registros, possíveis de serem utilizados para varrer sistemas em busca de identificadores encontrados em cabeçalhos de e-mail (como no caso de domínios suspeitos), que podem ajudá-les a descobrir quem, se este for o caso, tornou-se alvo em sua organização. Veja as documentações do [Google](https://support.google.com/a/answer/2618874?hl=pt-BR&fl=1&sjid=7619119996016038770-SA) e da [Microsoft](https://learn.microsoft.com/pt-br/exchange/monitoring/monitoring) em relação a buscas por logs. Note que tais funcionalidades de busca são usualmente restritas a contas empresariais ou corporativas.

## Pratique

Após a leitura de todos os materiais da [análise de cabeçalho de e-mail da Nebraska GenCyber (em inglês)](https://mlhale.github.io/nebraska-gencyber-modules/phishing/email-headeranalysis/), faça os exercícios ali propostos. O site possui problemas com links, muitas vezes inviabilizando acesso direto às atividades, porém, elas podem ser baixadas [por este link](https://github.com/MLHale/nebraska-gencyber-modules/tree/master/phishing/email-headers).

## Checagem de habilidades

Encontre um e-mail na sua caixa de entrada, ou pasta de spam. Ou então peça para que uma pessoa par ou mentora te envie cabeçalhos de e-mail recebidos recentemente. Analise-os usando as mesmas técnicas descritas na parte “Pratique”, incluindo o carregamento deles na ferramenta [Google Admin Toolbox Message Header](https://toolbox.googleapps.com/apps/messageheader/?lang=pt-BR). Em seguida, responda às questões 1, 2, 3 e 5 descritas na [seção de investigação (em inglês)](https://mlhale.github.io/nebraska-gencyber-modules/phishing/email-headeranalysis/#investigation) do guia de análise de cabeçalhos de e-mails da Nebraska GenCyber, dessa vez usando os cabeçalhos dos e-mails encontrados, não dos exemplos do guia.

## Recursos de aprendizagem

{{% resource title="O que são cabeçalhos de e-mails?" languages="Inglês" cost="Grátis" description="Boa introdução a cabeçalhos de e-mails. Destaca três importantes grupos e inclui uma lista de guias com passo a passo para diferentes MUAs (Mail User Agent, ou “cliente de e-mail”, em tradução livre)." url="https://mailtrap.io/blog/email-headers/" %}}

{{% resource title="Visualizando cabeçalhos completos de e-mail" languages="Múltiplos" cost="Grátis" description="Como trabalhar com cabeçalhos de e-mails em diferentes sistemas (Gmail, Outlook, Apple Mail, Thunderbird, etc)." url="https://support.google.com/mail/answer/29436?hl=en" %}}

{{% resource title="Conferindo cabeçalhos SPF com a ferramenta dig" languages="Inglês" cost="Grátis" description="Guia rápido de como checar cabeçalhos SPF usando dig, uma ferramenta pré-instalada na maioria dos sistemas Unix." url="https://easydmarc.com/tools/spf-lookup#how-to-check-spf-record-via-command-line-via-dig-tool" %}}

{{% resource title="Como checar e interpretar um registro Sender Policy Framework para um domínio" languages="Inglês" cost="Grátis" description="Como checar cabeçalhos SPF usando nslookup, uma ferramenta alternativa ao dig, e como interpretar os resultados." url="https://support.mailessentials.gfi.com/hc/en-us/articles/360015116520-How-to-check-and-read-a-Sender-Policy-Framework-record-for-a-domain" %}}

{{% resource title="Curso do time da Nebraska GenCyber de cabeçalhos de e-mails" languages="Inglês" cost="Grátis" description="Curso abrangente de como analizar cabeçalhos de e-mails na investigação de potenciais casos de phishing." url="https://mlhale.github.io/nebraska-gencyber-modules/phishing/email-headeranalysis/#email-headers" %}}

{{% resource title="Exemplos de atividades para o guia da Nebraska GenCyber." languages="Inglês" cost="Grátis" description="Exercícios hospedados no GitHub." url="https://github.com/MLHale/nebraska-gencyber-modules/tree/master/phishing/email-headers" %}}

{{% resource title="Conferindo cabeçalhos de e-mails no Proton Mail" languages="Inglês" cost="Grátis" description="Guia de como conferir cabeçalhos de e-mails no Proton Mail." url="https://proton.me/support/check-email-headers" %}}

{{% resource title="Analisando cabeçalhos de e-mails no Zoho" languages="Inglês" cost="Grátis" description="Guia de como ler cabeçalhos de e-mails no Zoho." url="https://www.zoho.com/mail/help/mail-options.html#alink1" %}}

{{% resource title="Ferramentas para análise de cabeçalhos de e-mails, parte 1" languages="Inglês" cost="Grátis" description="Links de diversas ferramentas para extração e examinação de cabeçalhos de e-mails, essenciais para análise de potenciais e-mails maliciosos." url="https://mxtoolbox.com/EmailHeaders.aspx" %}}

{{% resource title="Ferramentas para análise de cabeçalhos de e-mails, parte 2" languages="Inglês" cost="Grátis" description="Links de diversas ferramentas para extração e examinação de cabeçalhos de e-mails, essenciais para análise de potenciais e-mails maliciosos." url="https://github.com/keraattin/EmailAnalyzer" %}}

{{% resource title="Ferramentas para análise de cabeçalhos de e-mails, parte 3" languages="Inglês" cost="Grátis" description="Links de diversas ferramentas para extração e examinação de cabeçalhos de e-mails, essenciais para análise de potenciais e-mails maliciosos." url="https://github.com/umair9747/headmail" %}}

{{% resource title="Ferramentas para análise de cabeçalhos de e-mails, parte 4" languages="Inglês" cost="Grátis" description="Links de diversas ferramentas para extração e examinação de cabeçalhos de e-mails, essenciais para análise de potenciais e-mails maliciosos." url="https://github.com/cyberdefenders/email-header-analyzer" %}}

{{% resource title="Introdução à falsificação de e-mails, artigo 1" languages="Múltiplas" cost="Grátis" description="Vários artigos contendo o básico sobre falsificação de e-mails." url="https://en.wikipedia.org/wiki/Email_spoofing" %}}

{{% resource title="Introdução à falsificação de e-mails, artigo 2" languages="Inglês" cost="Grátis" description="Vários artigos contendo o básico sobre falsificação de e-mails." url="https://docs.sendgrid.com/glossary/spoofing" %}}

{{% resource title="Introdução à falsificação de e-mails, artigo 3" languages="Inglês" cost="Grátis" description="Vários artigos contendo o básico sobre falsificação de e-mails." url="https://www.fortinet.com/resources/cyberglossary/email-spoofing" %}}

{{% resource title="Avaliando cabeçalhos 'Recebidos'" languages="Inglês" cost="Grátis" description="Como utilizar cabeçalhos de e-mails para buscar o servidor remetente." url="https://www.techlicious.com/how-to/how-to-tell-if-email-has-been-spoofed/" %}}

{{% resource title="Análise de potenciais cabeçalhos ‘Recebidos’ forjados" languages="Inglês" cost="Grátis" description="Como identificar cabeçalhos 'Recebidos' falsos." url="https://luxsci.com/blog/analyzing-forged-email-message.html" %}}

{{% resource title="Observando um possível cabeçalho de e-mail de phishing" languages="Inglês" cost="Grátis" description="Análise mais detalhada dos cabeçalhos de e-mails em mensagens de phishing." url="https://www.linkedin.com/pulse/anatomy-phishing-email-whats-header-penelope-raquel-bise-" %}}

{{% resource title="Encontre mensagens com a Pesquisa de registro de e-mail" languages="Português" cost="Documentação gratuita, ferramentas disponíveis apenas para contas corporativas/empresariais" description="Descreve como administradores com contas empresariais do Google podem monitorar registros de mensagens." url="https://support.google.com/a/answer/2618874?hl=pt-BR&fl=1&sjid=11639880525202383695-SA" %}}

{{% resource title="Monitoramento, denúncia e rastreio de mensagem com Exchange Online" languages="Inglês" cost=”Documentação gratuita, ferramentas disponíveis apenas para contas corporativas/empresariais" description="Descreve como administradores com contas empresariais da Microsoft podem monitorar registros de mensagens." url="https://learn.microsoft.com/en-us/exchange/monitoring/monitoring" %}}