---
style: module
title: Exercício de Capture-a-Bandeira (CTF)
description: Criamos um exercício do tipo Capture-a-Bandeira (CTF, do inglês *Capture the Flag*) no qual estudantes podem analisar um email de *phishing* e a sua infraestrutura associada. Ele pode ser usado como um exercício de prática ou de checagem de habilidades adicional.
weight: 10
---

Criamos um exercício do tipo Capture-a-Bandeira (CTF, do inglês *Capture the Flag*) no qual estudantes podem analisar um email de *phishing* e a sua infraestrutura associada. Ele pode ser usado como um exercício de prática ou de checagem de habilidades adicional, e pode ser lido abaixo.

Você está trabalhando na movimentada redação da Press, onde você atua como gerente de TI. Você está na sua mesa, com foco total em suas tarefas, rodeada por monitores. A sua colega, Alia da Contabilidade, corre para falar com você assim que te vê com uma expressão preocupada em seu rosto. Ela te diz que ela te encaminhou um email que alega ser do PayPal, exigindo uma ação imediata por conta de uma atividade suspeita na conta. A organização Press depende do PayPal para processar pagamentos associados a assinaturas. O seu interesse é fisgado assim que você reconhece o potencial para um ataque malicioso, e você começa uma investigação.

*Essa atividade exige a análise dos arquivos de um e-mail e uma página inicial fictícios para o seu seguimento. Baixe os arquivos aqui: {{< fontawesome "solid/download" >}} [Materais do CTF](/files/ctf-materials.zip)*

### Questão 1: Qual é o endereço de e-mail do remetente?

{{< question title="Instruções" open="true" >}}
Descubra como o endereço de e-mail do remetente seria exibido em um cliente de e-mail se essa mensagem fosse aberta.
{{< /question >}}

{{< question title="Dicas" >}}
Há várias formas de visualizar o e-mail da forma como ele seria exibido para o destinatário. A maneira mais direta seria abrir o arquivo em um cliente de e-mail, que é o que fizemos nos exemplos abaixo. No entanto, no contexto de uma ameaça direcionada, isso pode ser uma péssima ideia: o arquivo pode conter scripts que podem explorar vulnerabilidades em clientes de e-mail, coletar informações sobre o dispositivo, ou carregar recursos externos (como arquivos de mídia ou pixels de rastreamento), que podem revelar o seu endereço IP ao agressor. No caso deste exercício, é seguro abrir o arquivo EML em seu cliente de e-mail de escolha. Para casos reais, porém, considere as seguintes alternativas:

* Usar um cliente de e-mail em uma máquina virtual que pode ser revertida para uma cópia anterior segura
* Abrir o arquivo em um editor de texto e leia diretamente o conteúdo HTML
* Renomear o arquivo para `.mht` e abra-o em um navegador (considere usar uma máquina segura e isolada e se conectar a uma VPN para evitar a captura de seu endereço IP através de pixels de rastreamento)
* Usar um serviço online como <https://www.emlreader.com/> ou <https://www.encryptomatic.com/viewer/> para visualizar o e-mail. A ferramenta de análise de cabeçalho do MXToolBox <https://mxtoolbox.com/EmailHeaders.aspx> (utilizada mais à frente neste exercício) também renderiza o conteúdo HTML do e-mail se você incluí-lo com os cabeçalhos fornecidos.
* Usar uma ferramenta do eDiscovery que pode renderizar arquivos EML
* Hospedar o seu próprio serviço de renderização de arquivos EML, como <https://github.com/xme/emlrender>

Neste exercício, iremos abrir o e-mail (`paypal.eml`) em um cliente de e-mail.

![Captura de tela mostrando a pasta de arquivos do CTF aberta em um navegador de arquivos. Nós clicamos com o botão direito do mouse em cima do arquivo paypal.eml, clicamos em Abrir Com, e observamos duas sugestões de aplicativos compatíveis: Apple Mail e Thunderbird. Ambas as entradas estão destacadas na captura de tela.](/media/uploads/CTF1_open_in_mail_program-pt-br.png)

Observando o e-mail renderizado, podemos encontrar o aparente endereço de e-mail do remetente.

![Imagem de uma mensagem que parece ser do PayPal indicando que uma atividade suspeita foi detectada na conta associada ao endereço de e-mail de Alia. A mensagem contém um link para fazer uma verificação de conta. O endereço de e-mail exibido no remetente é paypal@service.com](/media/uploads/CTF2_sender_address.png)
{{< /question >}}

{{< question title="Resposta" >}}
O endereço de e-mail exibido como endereço de e-mail do remetente é [paypal@service.com](mailto:paypal@service.com)
{{< /question >}}

### Questão 2: Qual é o assunto deste e-mail?

{{< question title="Instruções" open="true" >}}
À medida em que continuamos a analisar o e-mail, nós procuramos por mais características que podem ser indicativas de spam ou mensagens maliciosas. Vamos olhar para o assunto do e-mail e alguns outros indícios no corpo da mensagem! Se você está lendo o e-mail em um editor de texto, você vai encontrar a resposta na linha que começa com `Subject:`.
{{< /question >}}

{{< question title="Dicas" >}}
![Uma captura de tela do e-mail em questão, onde se destaca a linha do assunto. Ela diz "We called you and you didn't answer".](/media/uploads/CTF3_email_subject.png)

Aqui estão alguns pontos-chave nos quais você deve prestar a atenção em um e-mail de phishing:

* Senso de urgência
* Começo de mensagem incomum, estranho, que não se dirige a você pelo seu nome
* Erros gramaticais
* O endereço de e-mail do remetente ou as URLs do e-mail foram ofuscadas ou não correspondem ao site ao qual alegam pertencer
{{< /question >}}

{{< question title="Resposta" >}}
O assunto do e-mail é: _We called you, you didn't answer_
{{< /question >}}

### Questão 3: Qual ação foi requisitada?

{{< question title="Instruções" open="true" >}}
Quando analisamos um e-mail potencialmente malicioso, nós precisamos entender o que o remetente queria que nós fizéssemos. Qual ação você acredita que o remetente queria que o destinatário fizesse?
{{< /question >}}

{{< question title="Dicas" >}}
![Uma captura de tela do e-mail que destaca as seguintes frases do e-mail: "To activate the delivery, please confirm." e "Continue the delivery".](/media/uploads/CTF4_email_actions.png)
{{< /question >}}

{{< question title="Resposta" >}}
O remetente está tentando induzir o destinatário a clicar em um dos dois links no corpo da mensagem:
* "To activate the delivery, please confirm."
* "Continue the delivery"
{{< /question >}}

## Reconhecendo a ameaça

### Questão 4: Desativando ("defanging") o link de confirmação

{{< question title="Instruções" open="true" >}}
À medida em que nos aprofundamos na análise, precisamos entender a diferença entre links suspeitos. Quando nós os analisamos, nós os desativamos — ou seja, substituímos alguns caracteres para que o link não seja acidentalmente acessado ou não engatilhe alguma automação ou mecanismos de escaneamento de vírus. Links desativados não vão automaticamente se tornar links clicáveis, mas eles ainda retêm informações do link original, por exemplo, `hxxp[://]www[.]google[.]com`.
{{< /question >}}

{{< question title="Dicas" >}}
Você pode desativar um link em um editor de texto. Aqui nós usaremos o [CyberChef](https://gchq.github.io/CyberChef) para desativar a URL já que também usaremos CyberChef em outras etapas. CyberChef é um aplicativo web com um grande número de funcionalidades que podem te ajudar na análise de dados relacionados a segurança. Aqui está [uma breve introdução](https://udel.codes/cyberchef.html) ao seu layout e às suas funcionalidades.

Como parte deste exercício, mexa com o CyberChef e desative o link que diz "Please confirm" no e-mail anexado.

![Captura de tela demonstrando a captura de um link suspeito através da seleção da frase "please confirm" no corpo da mensagem renderizado. O botão esquerdo do mouse foi clicado, revelando um menu no qual devemos selecionar uma opção chamada Copiar Link.](/media/uploads/CTF5_copylink-pt-br.png)

Primeiro, nós copiamos o link do e-mail.

![Captura de tela do CyberChef. Na barra de busca, digitamos "defang". Uma opção de nome "Defang URL" aparece como primeira opção.](/media/uploads/CTF6_defang.png)

Em seguida, nós arrastamos a opção "Defang URL" do CyberChef para a seção de "Recipe".


![Captura de tela do CyberChef demonstrando os resultados da funcionalidade "Defang URL". Pedimos para que ele desativasse pontos, o indicativo do protocolo HTTP, e o elemento ://. Obtemos como resposta hxxps[://]d[.]pr/mUxkOm.](/media/uploads/CTF7_defanged.png)

Assim que colarmos a URL no campo de entrada do CyberChef, a ferramenta automaticamente gera uma saída com a versão desativada da URL.
{{< /question >}}

{{< question title="Resposta" >}}
`hxxps[://]d[.]pr/mUxkOm`
{{< /question >}}

### Questão 5: Use CyberChef para extrair e desativar todos os links no e-mail

{{< question title="Instruções" open="true" >}}
Você pode usar o CyberChef para realizar muitas tarefas diferentes de análise. Dessa vez, encontre e descreva um fluxo de trabalho para facilmente extrair e desativar todos os links do e-mail.
{{< /question >}}

{{< question title="Resposta" >}}
Você pode usar uma "receita" — ou uma série de etapas interconectadas — no CyberChef para realizar uma análise mais ocmplexa. Para obter e desativar todas as URLs em uma mensagem, tudo que você precisa fazer é usar uma receita com os fluxos de trabalho "Extract URLs" e "Defang URLs", e colar o conteúdo do e-mail (copiado de um editor de texto) como entrada. Se você selecionar a opção "Unique" abaixo de "Extract URLs", você verá que os resultados são diferentes dos demonstrados na captura de tela, e ele irá responder com uma única URL, a mesma que você desativou acima. O fato de que é apenas uma URL, repetida várias vezes, dentro do e-mail é uma ótima notícia para nós — isso vai tornar a nossa análise muito mais fácil.

![Captura de tela do CyberChef demonstrando os resultados de uma receita que combina a funcionalidade "Extract URLs" com a funcionalidade "Defang URL". Colamos o conteúdo do arquivo e pedimos para que ele desativasse pontos, o indicativo do protocolo HTTP, e o elemento ://. Recebemos uma lista de 5 links — todos são a repetição de uma mesma saída, hxxps[://]d[.]pr/mUxkOm.](/media/uploads/CTF9_cyberchef.png)
{{< /question >}}

## Investigação passiva de URLs, nomes de hosts, e endereços IP

### Questão 6: Quando a URL desativada na Questão 4 foi submetida ao VirusTotal?

{{< question title="Dicas" >}}
Para as próximas questões, usaremos o [VirusTotal](https://www.virustotal.com/). VirusTotal é um serviço online que funciona como um escaneador de segurança para links e arquivos suspeitos. Pense nele como um inspetor digital. Você pode enviar um arquivo ou colar uma URL, e o VirusTotal o escaneará usando motores de antivírus e checadores de sites de várias empresas de segurança diferentes. Ele também fará algumas análises adicionais. Isso te dará uma análise geral que te permitirá entender se o arquivo ou site é potencialmente malicioso. Essa ferramenta é valiosa na identificação de ameaças em potencial antes que você abra um anexo ou clique em um link. Ele também exibe metadados sobre os arquivos enviados, o que pode ser útil. Aqui nós usaremos todo o histórico de entradas para descobrir quando um indicador malicioso foi observado pela primeira vez.

Cole a URL da Questão 4 no VirusTotal (dessa vez, você vai precisar da URL inteira, e não da versão desativada). Abra a aba "Details" e leia o histórico de captura da URL.

![Captura de tela do histórico do Virus Total mostrando que a primeira submissão aconteceu em 20 de agosto de 2018, às 14:20:40 UTC.](/media/uploads/CFT9_VirusTotal.png)
{{< /question >}}

{{< question title="Resposta" >}}
20 de agosto de 2018.
{{< /question >}}

### Questão 7: Qual é o endereço IP que VirusTotal indica como o endereço IP atribuiído ("Serving IP Address") à URL que desativamos na Questão 4?

{{< question title="Dicas" >}}
Ao analisar a aba "Details" no VirusTotal, procure pelo endereço IP atribuído ("Serving IP Address").

![Captura de tela mostrando uma resposta HTTP, uma URL final e um endereço de IP atribuído (52.89.102.146).](/media/uploads/CTF10_VirusTotalIP.png)
{{< /question >}}

{{< question title="Resposta" >}}
52.89.102.146
{{< /question >}}

### Questão 8: Quantos fornecedores ("vendors") no VirusTotal detectaram essa URL como maliciosa?

{{< question title="Instruções" open="true" >}}
Ao visualizar a URL no VirusTotal, dê uma olhada em todas as informações na aba "Detection". Para mais informações sobre o que o VirusTotal considera detecção e que metodologias ele usa, leia [a sua documentação](https://docs.virustotal.com/).
{{< /question >}}

{{< question title="Resposta" >}}
5 fornecedores.
{{< /question >}}

### Questão 9: Em qual registrador foi registrado o domínio que desativamos na Questão 4?

{{< question title="Instruções" open="true" >}}
Para buscar informações relacionadas ao registro de um domínio, nós podemos usar uma consulta WHOIS. Você pode realizar tal consulta através da linha de comando em seu dispositivo ou por um aplicativo dedicado.
{{< /question >}}

{{< question title="Dicas" >}}
Aqui nós usamos um site de consulta WHOIS para extrair essa informação.

![Captura de tela de uma consulta WHOIS mostrando que, para o domínio d.pr, as informações de registro são: registrado com Internet Technology Solutions em 13 de outubro de 2010, atualizado em 22 de novembro de 2023.](/media/uploads/CTF11_whois.png "image_tooltip")
{{< /question >}}

{{< question title="Resposta" >}}
Internet Technology Solutions
{{< /question >}}

### Questão 10: Qual é a localização geográfica do endereço IP atribuído que identificamos? 

{{< question title="Instruções" open="true" >}}
Endereços IP têm uma ligação "fraca" com localizações geográficas, como cidades ou distritos. Há vários serviços online nos quais você pode fazer consultas sobre endereços IP e descobrir mais sobre a sua possível localização. Apesar desse tipo de checagem não ser perfeita — às vezes, ela pode ser errônea —, ela ainda é uma parte importante de investigações sobre infraestruturas maliciosas.

É interessante comparar a informação que você coleta através de uma consulta WHOIS com a informação que você recebe através de buscas de localizações de endereços IP. Talvez você descubra que o endereço IP que você está investigando pertence a um provedor de serviços de VPN ou uma grande empresa de tecnologia como Google — se esse for o caso, então você não vai muito longe com essas investigações; a localização do endereço IP provavelmente corresponderá a um dos parques de servidores dessas empresas, e talvez isso tenha pouca relação com a pessoa ou entidade que você está investigando.

![Captura de tela de uma consulta geográfica de endereço IP, mostrando que a sua origem é de Portland, Oregon, nos Estados Unidos.](/media/uploads/CTF12_geoIP.png "image_tooltip")
{{< /question >}}

{{< question title="Resposta" >}}
Portland, Oregon, Estados Unidos
{{< /question >}}

## Investigação passiva de cabeçalhos de e-mail

### Questão 11: Qual é o caminho de volta ("return path") do e-mail inicial?

{{< question title="Instruções" open="true" >}}
Nas próximas questões, usaremos uma ferramenta chamada [MxToolbox](https://mxtoolbox.com/). Ela é uma ferramenta que pode te ajudar a analisar cabeçalhos de e-mail, nomes de host, identificação de spam ("spam status"), e muito mais. Vamos nos focar na sua [ferramenta de análise de cabeçalho](https://mxtoolbox.com/EmailHeaders.aspx). Com ela, você pode copiar e colar todos os cabeçalhos de um e-mail (ou até mesmo o e-mail inteiro) e executar algumas análises básicas.
{{< /question >}}

{{< question title="Dicas" >}}
Primeiro, abra o e-mail usando um editor de texto de sua escolha e copie todo o seu conteúdo. Depois, cole o conteúdo na ferramenta de análise de cabeçalho ("Analyze Headers") do MxToolbox.

![Captura de tela demonstrando o conteúdo do e-mail colado no campo de texto do MxToolbox.](/media/uploads/CTF8_MX_analyzer.png)

Uma vez que você aperte o botão "Analyze Header", você conseguirá visualizar o caminho de volta.

![Captura de tela da análise realizada pelo MxToolbox. Ele identificou o caminho de volta como paparazi@rjttznyzjjzydnillquh.designclub.uk.com.](/media/uploads/CTF13_return_path.png)
{{< /question >}}

{{< question title="Resposta" >}}
`paparazi@rjttznyzjjzydnillquh.designclub.uk.com`
{{< /question >}}

### Questão 12: Qual foi o primeiro salto realizado pelo e-mail? Qual é o servidor SMTP do e-mail?

{{< question title="Instruções" open="true" >}}
Abra o arquivo `mx-toolbox-header-analysis.pdf` e dê uma olhada na seção de transmissão de informação ("relay information").

![Captura de tela do MxToolbox mostrando que o primeiro salto se deu em efianalytics.com 216.244.76.116.](/media/uploads/CTF14_relay.png)
The address of the mail server

![Captura de tela do MxToolbox mostrando que o servidor SMTP é 2002:a59:ce05:0:b0:2d3:3de5:67a9.](/media/uploads/CTF15_address.png)
{{< /question >}}

{{< question title="Resposta" >}}
Primeiro salto: efianalytics.com 216.244.76.116

Servidor SMTP: `2002:a59:ce05:0:b0:2d3:3de5:67a9`
{{< /question >}}

## Investigação ativa de páginas web maliciosas

### Questão 13: Qual é a `victimID` presente no código do site? 

{{< question title="Instruções" open="true" >}}
Se o destinatário do e-mail clicasse no link, ele seria direcionado para uma página inicial. Abra o arquivo `paypal.html` em um editor de texto, dê uma olhada no código-fonte e procure pela `victimID`. Use o CyberChef para decodificá-lo e encontrar uma cadeia de caracteres.
{{< /question >}}

{{< question title="Dicas" >}}
Neste exercício, você encontrará uma cadeia de caracteres codificada em Base64. Base64 é uma técnica de transformação de texto com várias utilidades, mas nesse caso, a ideia é ofuscar a cadeia de caracteres: essa informação ainda está lá, mas está armazenada de uma forma que não pode ser facilmente encontrada por pessoas, ou através de uma simples busca textual. Se essa é a primeira vez que você vê algo em Base64,  é uma boa ideia [aprender um pouco mais sobre Base64 e outras formas de ofuscação de informação](https://anithaana3.medium.com/common-text-encoding-methods-for-code-obfuscation-9399757eb5c3). Autores de malware gostam de ofuscar algumas palavras ou cadeias de caracteres dentro de seus programas usando técnicas como Base64 para torná-los mais difíceis de se analisar.

CyberChef é capaz de codificar e decodificar texto em Base64. Vamos abrir, mais uma vez, o código anexado da página de phishing (`.html`).

![Captura de tela do código HTML sendo aberto no Notepad.](/media/uploads/CTF16_open_webpage_notepad-pt-br.png)

Busque pelo termo "victimID" no código-fonte.

![Captura de tela mostrando uma busca pelo termo victimID no editor de texto, que retorna uma linha HTML. VGgxc18xc19WSDFZaDFuZ19FbTNpbA](/media/uploads/CTF17_searchID.png)

Podemos, então, colar o valor que descobrimos no CyberChef. A ferramenta tem uma funcionalidade de varinha mágica que automaticamente detecta e converte codificações—nós podemos usar isso!

![Captura de tela destacando a funcionalidade de varinha mágica.](/media/uploads/CTF19_cyberchef_wand.png)

Uhul! A varinha mágica detectou que a entrada foi codificada com Base64 e a decodificou automaticamente, nos dando a resposta!

![Captura de tela da saída da decodificação do CyberChef: Th1s_1s_pH1sh1ng_Em3il](/media/uploads/CTF18_cyberchef_result.png)
{{< /question >}}

{{< question title="Resposta" >}}
Th1s_1s_pH1sh1ng_Em3il
{{< /question >}}

## Outros recursos e links

{{% resource title="Documentação da comunidade da linha de emergência Access Now para atendimentos a situações de e-mails suspeitos ou phishing" languages="Inglês" cost="Grátis" description="Cliente recebe um e-mail suspeito ou phishing" url="https://accessnowhelpline.gitlab.io/community-documentation/58-Suspicious_Phishing_Email.html#" %}}

{{% resource title="Lista de todos os tipos de registros DNS" languages="Inglês, chinês, japonês, coreano, russo, sérvio, ucraniano, esperanto, húngaro, vietnamita, italiano, espanhol, francês" cost="Grátis" description="Lista (quase?) todos os tipos de registros DNS" url="https://en.wikipedia.org/wiki/List_of_DNS_record_types" %}}

{{% resource title="Relatórios da Amnesty sobre campanhas de phishing" languages="Vários, dependendo do relatório" cost="Grátis" description="Uma lista de exemplos de campanhas direcionadas de phishing contra jornalistas, ativistas, e defensores de direitos humanos" url="https://www.amnesty.org/en/search/phishing/" %}}
