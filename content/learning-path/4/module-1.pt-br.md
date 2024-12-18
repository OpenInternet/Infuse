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

### Teste de capacitação

Pesquise 2 CVEs que estão listados em [https://www.cve.org/](https://www.cve.org/) ou em outro banco de dados de CVEs. Escolha aqueles que são descritos em detalhes (os bancos de dados de CVEs geralmente fornecem links para relatos externos que contêm tais informações) e possuem uma classificação de vulnerabilidade. Como os CVEs podem ser frequentemente muito técnicos, selecione aqueles que tratam de um tópico ou tecnologia com os quais você esteja familiarizado. Responda às seguintes perguntas:

- De maneira geral, sobre o que é o CVE? Qual é a falha ou vulnerabilidade que o invasor poderia explorar?
- Você conhece alguma pessoa ou organização cujos sistemas um invasor poderia explorar utilizando este CVE? E se este CVE for combinado com outras vulnerabilidades?
- Por que você acha que o CVE tem a pontuação que possui?

Após procurar dois CVEs que você achou interessantes, faça uma pesquisa em um banco de dados de CVEs sobre um produto tecnológico que você ou pessoas que você está auxiliando estão utilizando. Verifique os CVEs recentes relacionados a esse produto e, em seguida, responda novamente às perguntas listadas acima.
Se você está hospedando um servidor web por conta própria, pesquise vulnerabilidades recentes. Se você estiver utilizando algo como Drupal ou WordPress por meio de um provedor terceirizado, verifique as vulnerabilidades nesses serviços também e, através do painel de controle do seu provedor (cada provedor terá um painel ligeiramente diferente), certifique-se de que está executando as versões mais recentes dessas ferramentas. 

Se possível, discuta suas respostas a essas perguntas com um colega ou mentor que possa ajudar a verificar se você compreendeu corretamente o tópico.



## Recursos de aprendizagem

{{% resource title="O que é um CVE?" languages="Português" cost="Grátis" description="Uma boa introdução ao que são as CVEs (Vulnerabilidades e Exposições Comuns) e por que elas são importantes" url="https://www.redhat.com/pt-br/topics/security/what-is-cve" %}}

{{% resource title="CVEs com uma pontuação de vulnerabilidade de 9,8" languages="Inglês" cost="Grátis" description="Aqui estão dois exemplos de CVEs que tiveram pontuações de vulnerabilidade muito altas, o que significa que os invasores que os exploram podem causar muitos danos." url="https://www.bleepingcomputer.com/news/security/fortinet-warns-of-critical-rce-flaw-in-fortios-fortiproxy-devices, https://thehackernews.com/2023/05/critical-flaws-in-cisco-small-business.html" %}}

{{% resource title="CVE.org" languages="Inglês" cost="Grátis" description="Um site (e ferramenta autônoma) que permite que você assine CVEs que afetam diferentes fornecedores. Observe que nem todas as vulnerabilidades recebem CVEs." url="https://www.opencve.io/welcome" %}}

{{% resource title="Varredura de vulnerabilidades SAFETAG" languages="Inglês" cost="Grátis" description="Um guia para a varredura de vulnerabilidades que usa a metodologia SAFETAG e contém muitas atividades discretas" url="https://safetag.org/methods/vulnerability_scanning" %}}

{{% resource title="Ferramentas de verificação de vulnerabilidades" languages="Inglês" cost="Grátis" description="Uma lista de ferramentas automatizadas que os protetores digitais podem usar para procurar vulnerabilidades em aplicativos web. Ferramentas diferentes funcionam para casos de uso distintos e possuem modelos de precificação variados, sendo muitas delas de código aberto." url="https://owasp.org/www-community/Vulnerability_Scanning_Tools" %}}