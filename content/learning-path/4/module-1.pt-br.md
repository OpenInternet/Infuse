+++
style = "module"
weight = 1
title = "Vulnerabilidades de infraestrutura"
description = "Ao inspecionar um aplicativo web para fins de avaliação de vulnerabilidade, o profissional deve entender a estrutura subjacente da tecnologia e, ao mesmo tempo, procurar vulnerabilidades nessa estrutura."
+++

## Caso de Uso

Embora esta trilha de aprendizagem se concentre na segurança de aplicativos web, os aplicativos web são executados sobre várias partes da infraestrutura de software. Qualquer vulnerabilidade na infraestrutura subjacente do aplicativo comprometerá o aplicativo. Portanto, compreender a segurança de algumas infraestruturas faz parte da compreensão da segurança dos aplicativos.

Ao inspecionar um aplicativo web para fins de avaliação de vulnerabilidade, monitoramento de segurança ou para investigar um comprometimento, o profissional deve entender a estrutura subjacente da tecnologia que fornece o ambiente necessário para a execução do aplicativo e, ao mesmo tempo, procurar vulnerabilidades nessa estrutura.

## Objetivos

Após concluir este subtópico, os profissionais deverão ser capazes de fazer o seguinte:

- Entender os tipos comuns de vulnerabilidades de softwares de infraestrutura
- Compreender os possíveis impactos desses tipos de vulnerabilidades
- Compreender os fundamentos das estruturas de vulnerabilidade

---
## Conteúdo 
### Conhecimentos básicos

Os sites não existem sem um software e um hardware subjacentes que cuidam das operações de baixo nível de tratamento das solicitações que atendem ao conteúdo web. Isso inclui o hardware e o firmware subjacentes, o sistema operacional, o software do servidor web, a(s) estrutura(s) do(s) aplicativo(s) web e até mesmo softwares não relacionados em execução no computador. A segurança de um aplicativo web depende da segurança dessa infraestrutura, mesmo que os desenvolvedores do site tenham pouca visibilidade ou controle sobre essa infraestrutura. As vulnerabilidades de infraestrutura normalmente afetam um grande número de sites (possivelmente centenas de milhões) e, muitas vezes, recebem identificadores como CVEs (para uma introdução mais geral sobre o que são CVEs, consulte este [artigo](https://www.redhat.com/pt-br/topics/security/what-is-cve)). Essas vulnerabilidades podem pertencer a praticamente qualquer classe técnica, mas, do ponto de vista de um operador de site, só nos importamos com o impacto delas, não com os detalhes técnicos subjacentes. Isso ocorre porque não mantemos o software de infraestrutura, apenas o implementamos e configuramos. 

O impacto de uma vulnerabilidade no software de infraestrutura pode ser praticamente qualquer coisa, mas alguns problemas e impactos que provavelmente surgirão incluem os tipos abaixo.


### Negação de serviço (DoS)

Uma vulnerabilidade pode permitir que um invasor trave um servidor web ou faça com que ele deixe de responder devido ao consumo excessivo de recursos. Essas vulnerabilidades são normalmente exploradas para colocar um site offline ou para extorquir dinheiro dos operadores do site como parte de um esquema de proteção. Observe que um invasor determinado e financiado pode frequentemente alugar tempo em uma botnet de computadores comprometidos para simplesmente sobrecarregar um site com um grande número de solicitações; não é necessária nenhuma vulnerabilidade. Alguns exemplos de vulnerabilidades de DoS incluem:

- [CVE-2011-3192](https://nvd.nist.gov/vuln/detail/CVE-2011-3192): Uma vulnerabilidade no Apache em que o cliente pode solicitar várias subseções de uma página da web, resultando em grande uso de memória no servidor.
- [MS ADV190005](https://msrc.microsoft.com/update-guide/vulnerability/ADV190005): Uma vulnerabilidade no Microsoft IIS permite que um invasor envie um grande número de variáveis de configuração em uma solicitação HTTP/2, causando 100% de consumo de CPU no servidor.

### Vazamentos de informações

Ocasionalmente, um servidor web pode ser coagido a retornar dados excessivos em uma resposta. Normalmente, isso se deve ao fato de o servidor alocar uma grande parte da memória e, em seguida, gravar apenas parcialmente os dados nessa parte e enviar toda a parte para o cliente. Essa memória não inicializada pode conter dados de outras solicitações ou respostas, ou até mesmo a memória interna do servidor web. A mais famosa dessas vulnerabilidades é provavelmente o [Heartbleed (CVE-2014-0160)](https://pt.wikipedia.org/wiki/Heartbleed). Essas vulnerabilidades podem ser usadas para roubar tokens de sessão (permitindo que os invasores se passem por outros usuários), identidades de máquinas em ambientes de nuvem (permitindo que os invasores acessem outros serviços de nuvem como o servidor web), chaves SSL privadas (permitindo que os invasores se passem pelo servidor web e iniciem ataques de intermediários) e quaisquer outros dados que residam na memória do processo do servidor web.

### Execução de código remoto
Esse é o tipo mais arquetípico de vulnerabilidade de infraestrutura. Isso ocorre mais comumente quando a solicitação de um invasor pode sobrescrever estruturas de controle de fluxo de dados na memória do servidor, fazendo com que o alvo execute o código de máquina especificado pelo invasor. Felizmente, anos de testes, correções subsequentes e aprimoramento da prática de codificação segura fizeram com que essas vulnerabilidades fossem classificadas nas configurações padrão de softwares de infraestrutura de servidor extremamente maduros, como o Apache e o IIS. No entanto, eles são muito mais comuns em configurações não padrão de softwares comuns e em softwares menos maduros. Aqui estão dois exemplos de 2023 ([exemplo 1](https://www.bleepingcomputer.com/news/security/fortinet-warns-of-critical-rce-flaw-in-fortios-fortiproxy-devices/), [exemplo 2](https://thehackernews.com/2023/05/critical-flaws-in-cisco-small-business.html)). Observe que, embora os estouros de buffer possam ser a maneira clássica de obter a execução remota de código, também há outras maneiras de fazer isso. Como acontece com todas as vulnerabilidades de infraestrutura, na maioria das vezes nos preocupamos principalmente com o impacto e com a disponibilidade de uma correção, e menos com os detalhes técnicos.

### Mitigação de vulnerabilidades de softwares de infraestrutura

O software de infraestrutura com vulnerabilidades geralmente é descoberto por meio de um software de verificação de vulnerabilidades (há muitos exemplos desse tipo de software, [confira esta lista](https://owasp.org/www-community/Vulnerability_Scanning_Tools)), notificações de fornecedores ou sistemas de gerenciamento de configuração ou por meio de inspeção manual do software implantado em um servidor. Dependendo do ambiente do servidor, esse software pode ser totalmente gerenciado por terceiros, atualizado automaticamente por agentes de software ou processos de implantação, ou gerenciado manualmente. Normalmente, se uma vulnerabilidade for corrigida, os invasores podem fazer engenharia reversa da correção para descobrir o mecanismo da vulnerabilidade subjacente, por isso é importante manter o software de infraestrutura atualizado.



## Skill Check

Look up 2 CVEs which are listed on [https://www.cve.org/](https://www.cve.org/) or another CVE database. Pick those which are both described in some depth (CVE databases usually link out to external writeups which contain such details) and have a vulnerability rating. Since CVEs can often be very technical, select those which deal with a topic or technology which you are comfortable with. Answer the following questions:

- Broadly speaking, what is the CVE about? What is the flaw or vulnerability that the attacker could exploit?
- Do you know of any people or organizations whose systems an adversary could exploit using this CVE? What if this CVE is combined with other vulnerabilities?
- Why do you think that the CVE has the score it has?

After you have looked up two CVEs which you found interesting, do a search in a CVE database for a tech product which you or people you are supporting are running, see what recent CVEs it had, and once again answer the questions listed above.

If you are self-hosting a web server, look up recent vulnerabilities. If you are running something like Drupal or Wordpress through a third-party provider, check up the vulnerabilities on those services as well and, through your provider’s dashboard (each provider will have a slightly different one) make sure that you are running the latest versions of those tools.

If possible, discuss your answers to those questions with a peer or mentor who will help verify that you’ve correctly understood the topic.

## Learning Resources

{{% resource title="What’s a CVE" languages="English" cost="Free" description="Introduction to CVEs (Common Vulnerabilities and Exposures) and their importance." url="https://www.redhat.com/en/topics/security/what-is-cve" %}}

{{% resource title="CVEs with a vulnerability score of 9.8" languages="English" cost="Free" description="Examples of CVEs with high vulnerability scores that can cause significant damage." url="https://www.bleepingcomputer.com/news/security/fortinet-warns-of-critical-rce-flaw-in-fortios-fortiproxy-devices, https://thehackernews.com/2023/05/critical-flaws-in-cisco-small-business.html" %}}

{{% resource title="OpenCVE" languages="English" cost="Free" description="Website and tool for subscribing to CVEs affecting different vendors." url="https://www.opencve.io/welcome" %}}

{{% resource title="SAFETAG vulnerability scanning" languages="English" cost="Free" description="Guide to vulnerability scanning using the SAFETAG methodology." url="https://safetag.org/methods/vulnerability_scanning" %}}

{{% resource title="Vulnerability Scanning Tools" languages="English" cost="Free" description="List of automated tools for web app vulnerability scanning, with various use cases and pricing models." url="https://owasp.org/www-community/Vulnerability_Scanning_Tools" %}}