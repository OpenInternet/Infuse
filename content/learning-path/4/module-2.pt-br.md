+++
style = "module"
weight = 2
title = "Validação de Dados"
description = "Uma classe comum de vulnerabilidades em aplicativos web está relacionada à forma como o aplicativo processa os dados fornecidos pelos usuários do site"
+++

## Caso de Uso

Uma classe comum de vulnerabilidades em aplicativos web está relacionada à forma como o aplicativo processa os dados fornecidos pelos usuários do site. Essa classe de vulnerabilidades é comumente explorada por invasores para assumir o controle total de sites-alvo e, frequentemente, pode ser descoberta por meio de técnicas automatizadas. Compreender os mecanismos das vulnerabilidades de validação de dados também é extremamente útil para desmistificar tópicos complexos de segurança.

## Objetivos 

Após concluir este subtópico, os profissionais deverão ser capazes de fazer o seguinte:

- Compreender os tipos comuns de vulnerabilidades de validação de dados
- Compreender os possíveis impactos desses tipos de vulnerabilidades
- Compreender os mecanismos pelos quais essas vulnerabilidades funcionam
- Compreender, de forma geral, como essas vulnerabilidades podem ser prevenidas


---
## Conteúdo 

Nossa primeira classe de vulnerabilidades específicas de aplicativos web abrange aquelas relacionadas à validação de dados. Existem muitos tipos diferentes de vulnerabilidades de validação de dados, e elas podem ocorrer em qualquer sistema que processe entradas. Geralmente, essas vulnerabilidades ocorrem quando o aplicativo faz suposições implícitas sobre o comprimento e/ou conteúdo dos dados que recebe. Quando a entrada é recebida e/ou processada, os dados "escapam" de seu contexto original e se tornam código em seu novo contexto. Vamos falar sobre como isso funciona, suas consequências e como corrigir a vulnerabilidade para cada tipo específico. Certifique-se de ler na ordem, pois as seções se baseiam nas anteriores.

### Cross-Site Scripting (XSS)

O nome "cross-site scripting" é um vestígio de como os primeiros exploits de XSS funcionavam. Um nome mais adequado poderia ser "injeção de JavaScript", mas o nome antigo permanece por razões históricas. O XSS ocorre quando um navegador interpreta a entrada do usuário como JavaScript. Isso permite que um invasor, em certa medida, controle o navegador da pessoa alvo no contexto do site de destino. O invasor pode roubar os cookies da pessoa alvo, permitindo que ele a imite no site. Além disso, o invasor pode extrair automaticamente quaisquer dados da pessoa alvo do site de destino e também pode realizar ações no site alvo como se fosse o usuário. Por fim, o invasor pode modificar a aparência do site para a pessoa alvo, como, por exemplo, exibindo uma página falsa de reautenticação que envia as credenciais do usuário para o invasor ou solicitando o download de malware disfarçado de um site confiável.

Embora esse ataque seja poderoso, há limites. O invasor está limitado a controlar o conteúdo do site de destino dentro do contexto do navegador do usuário. O invasor não pode interagir com outros sites, e suas ações são limitadas pelas funcionalidades de segurança do navegador. 

Mecanicamente, esse ataque funciona quando um aplicativo web recebe dados do usuário e, em seguida, integra esses dados diretamente em uma página da web. Considere um site de fórum de discussão que permite aos usuários escolherem um nome de exibição:


![AUma caixa de texto vazia em um site onde o usuário pode inserir texto, com um botão clicável denominado "Enviar" abaixo](/media/uploads/web_fundamentals_empty_box.png)

Esta página da web simples possui o seguinte código HTML:

{{< highlight html >}}
<html><body><form>
  Nome: <input name="disp_name"><br>
  <input type="submit">
</form></html>
{{< / highlight >}}

Quando recebe um nome do usuário, ele o exibe da seguinte forma:

![A mesma caixa de texto, mas agora com o texto "Alice" nela](/media/uploads/web_fundamentals_Alice_box.png)

usando o seguinte código HTML:
{{< highlight html >}}
<html><body><form>
  Nome: <input name="disp_name" value="Alice"><br>
  <input type="submit">
</form></html>
{{< / highlight >}}

Até aqui, tudo bem. Agora, o que acontece se o usuário inserir uma entrada mais complexa, como:
{{< highlight html >}}
Alice"><script>alert("Propriedade de Alice")</script><i q="
{{< / highlight >}}

Quando a página da web é gerada, ela fica um pouco diferente:

![Um alerta em uma página da web que diz "Propriedade de Alice"](/media/uploads/web_fundamentals_owned_by_Alice_alert.png)

Como isso aconteceu?
<!-- We changed the content somewhat from the original learning path, since it used its own highlighting for code colors and not the built-in syntax highlighting
original text: Let’s use some color to highlight what’s going on. Remember, the web application is just treating the user input as text, it has no idea about the colors. -->
{{< highlight html >}}
Alice"><script>alert("Propriedade de Alice")</script><i q="
{{< / highlight >}}

O aplicativo simplesmente pega a entrada do usuário e a coloca literalmente no HTML que gera. Do ponto de vista do aplicativo web e do navegador, tudo é apenas texto sem diferenciação.

{{< highlight html >}}
<html><body><form>
  Nome: <input name="disp_name" value="Alice"><script>alert("Propriedade de
    Alice")</script><i q=""><br>
  <input type="submit">
</form></html>
{{< / highlight >}}

Observe o `">` depois de `value="Alice"`. Isso indica ao navegador que o atributo value da tag de entrada HTML está completo, e então a tag de entrada está completa. Em seguida, o texto em azul é uma tag de script que executa o JavaScript que exibe uma caixa de alerta. Finalmente, o `<i q="` é apenas uma limpeza que evita que a página da web exiba os restos da tag de entrada original. Podemos usar realce e formatação de cores diferentes para mostrar como o navegador interpreta a página da web gerada:

<!-- We can use different color highlighting and formatting to show how the browser interprets the generated web page: -->
{{< highlight html >}}
<html><body><form>
  Nome: <input name="disp_name" value="Alice"><script>alert("Propriedade de
    Alice")</script>
  <i q=""><br>
  <input type="submit">
</form></html>
{{< / highlight >}}

Na verdade, essa demonstração de XSS não faz nada malicioso, e a única pessoa afetada é a própria Alice. No entanto, se nossa invasora Alice puder fazer com que outra pessoa veja seu nome de exibição e seu JavaScript fizer algo mal-intencionado, ela terá um ataque real a realizar.

#### Experimente você mesmo!

Faça login no DVWA e verifique se o nível de segurança está definido como baixo (consulte a seção “Configuração” na introdução desta trilha de aprendizagem para obter mais informações sobre isso). Navegue até a seção “XSS (Refletido)”. A entrada “Qual é o seu nome?” é vulnerável ao XSS. Tente inserir um nome que faça com que uma caixa de alerta JavaScript seja exibida quando você clicar no botão "Enviar".

_Se você ficar preso em algum exercício do DVWA e quiser uma dica, basta clicar no botão "View Help" no canto inferior direito da tela para receber dicas.._

![Uma captura de tela do DVWA, com a página "Vulnerability: Reflected Cross Site Scripting (XSS)" atualmente carregada](/media/uploads/web_fundamentals_reflected_XSS_screenshot.png)


### Prevenção de XSS

Para evitar XSS, a melhor técnica a ser usada é a chamada codificação de saída. Observe que, no exemplo acima, o ataque foi ativado com o uso dos caracteres `"` e `>`. No contexto de uma página da web, esses caracteres controlam a estrutura da página. Em HTML, todos esses caracteres podem ser codificados, de modo que o navegador da web saiba como exibir uma aspa dupla ou uma colchete angular, em vez de modificar a estrutura da página. Nesse caso, se os dados de Alice fossem codificados na saída antes de serem integrados à página da web, isso geraria o seguinte HTML:

{{< highlight html >}}
<html><body><form>
  Name: <input name="disp_name" value="Alice&quot;&gt;&lt;script&gt;alert(&quot;Propriedade de  Alice&quot;)&lt;/script&gt;&lt;i q=&quot;"><br>
  <input type="submit">
</form></html>
{{< / highlight >}}

que seria exibido da seguinte forma
![Uma caixa de texto que diz Alice"><script>alert("Pr](/media/uploads/web_fundamentals_Alice_script_box.png)

A codificação de saída depende do contexto em que os dados serão usados. Para HTML, você codificaria entidades HTML nos dados. Para dados que seriam incluídos em um bloco de JavaScript, seria usada uma codificação diferente. Se os dados do usuário fossem usados em uma consulta ao banco de dados, outro tipo de codificação seria usado. Os frameworks e bibliotecas web devem ter funções para realizar a codificação de saída para você; é melhor usar essas funções (esperançosamente) maduras do que tentar escrevê-las você mesmo desde os princípios básicos. 

Para mais informações sobre XSS, consulte o guia da [OWASP sobre XSS](https://owasp.org/www-community/attacks/xss/). Para um estudo mais detalhado, consulte a [Trilha de Aprendizagem de Avaliação de Segurança de Aplicativos Web](/en/learning-path/5/).

### SInjeção de SQL (SQLi)

Enquanto o XSS permite que os dados do usuário escapem de seu contexto e sejam interpretados como HTML e JavaScript no navegador da vítima, a injeção de SQL permite que os dados do usuário escapem de seu contexto e sejam interpretados como SQL no banco de dados do aplicativo web. A maioria dos aplicativos web utiliza um banco de dados back-end para armazenar e recuperar dados. Normalmente, eles utilizam SQL para realizar o acesso a esses dados. A injeção de SQL pode ocorrer quando os dados do usuário são interpolados em uma consulta. 

Como o SQL controlado pelo invasor é executado no ambiente do servidor, as vulnerabilidades de injeção de SQL geralmente são muito mais perigosas do que o XSS. Enquanto uma vulnerabilidade de XSS permite que um invasor ataque outros usuários, possivelmente por meio de engenharia social, a injeção de SQL pode dar ao invasor acesso de leitura e escrita a todos os dados dos usuários no site. O invasor também pode ler e gravar qualquer outro dado armazenado no banco de dados que o aplicativo web conseguir acessar. Frequentemente, o invasor pode usar o acesso SQL para obter a capacidade de executar comandos no próprio servidor de banco de dados, ganhando acesso remoto completo à infraestrutura back-end do site.

Como a injeção de SQL funciona? Considere um aplicativo web, onde há uma plataforma de tickets que lista o nome, descrição e versão de cada ferramenta em uma categoria. O usuário também estaria enviando um parâmetro de id; isso pode até estar contido na URL da página que faz a solicitação. Talvez o código que gera o SQL para recuperar esses dados seja algo como:

{{< highlight sql >}}
$sql = 'select productid, name, description, version from products where categoryid='+request_params['id']
{{< / highlight >}}

Quando um usuário envia um parâmetro de `id` como `1` ou `32`, tudo está bem, e obtemos uma consulta como:
{{< highlight sql >}}
 select toolid, name, description, version
   from tools
  where categoryid=32
{{< / highlight >}}

No entanto, o problema começa quando um usuário curioso envia um `id` como `2-1` e observa que recebe os mesmos resultados de um `id` como `1`:

{{< highlight sql >}}
 select toolid, name, description, version
   from tools
  where categoryid=2-1
{{< / highlight >}}

Isso mostra ao invasor que o aplicativo é vulnerável à injeção de SQL. Isso faz com que o aplicativo interprete a entrada do usuário como código (executando a expressão `2-1`) em vez de dados (buscando uma categoria cujo ID seja literalmente “2-1”). Após um pouco de investigação, o invasor envia um `id` de `-1 union all select 1, username, password, 1.0 from admin_users`. Isso resulta em uma consulta SQL assim: 

{{< highlight sql >}}
 select toolid, name, description, version
   from tools
  where toolid=-1
union all
 select 1, username, password, 1.0
   from admin_users
{{< / highlight >}}

O que essa consulta faz é buscar todas as ferramentas que têm um `id` de categoria igual a `-1` (o que provavelmente é nenhuma delas), e então adicionar a essa lista os nomes de usuário e senhas dos usuários administradores da plataforma de tickets. O aplicativo então formata isso como uma tabela HTML legível e a envia de volta para o usuário que solicitou os dados. Isso não apenas permitirá que o invasor faça login diretamente no sistema de tickets, mas, se algum desses usuários reutilizar suas senhas, o invasor poderá ter acesso a outros sistemas na mesma organização.

#### Experimente você mesmo!

Faça login no seu DVWA e certifique-se de que o nível de segurança está configurado como baixo. Navegue até a página de "Injeção de SQL" (SQL injection) e teste com a entrada. Você consegue fazer com que a página retorne a lista de todas as contas de usuário? Você consegue usar a função “union all” para recuperar dados de outras tabelas, como a tabela chamada “information_schema.tables”?

### Prevenção de Injeção de SQL

Ao contrário do XSS, a codificação de saída não é uma maneira confiável de prevenir a injeção de SQL. Observe que, nos exemplos acima, o invasor usa caracteres como espaço e - para alterar o contexto dos dados, passando de dados na consulta SQL para a estrutura da própria consulta. Uma combinação de filtragem de entrada sensível ao tipo e codificação de saída pode prevenir a injeção de SQL em teoria, mas, na prática, essa abordagem é muito pouco confiável.

Em vez disso, podemos usar um recurso de cada mecanismo de banco de dados que ignora completamente parte da análise inicial da consulta. Esse tipo de consulta é chamado de consulta parametrizada, e o uso dela é frequentemente chamado de vinculação de parâmetros. Em vez de enviar ao banco de dados uma string de texto que contém tanto a estrutura da consulta quanto os dados do usuário, enviamos uma string que contém a estrutura da consulta com espaços reservados para os dados. Juntamente com essa string, enviamos os dados para cada espaço reservado. Dessa forma, os dados do usuário nunca são interpretados no contexto SQL. Independentemente do que seja enviado, serão tratados exclusivamente como dados. Isso não apenas protege contra a injeção de SQL, como também torna as consultas ao banco de dados um pouco mais rápidas.

Para mais informações sobre injeção de SQL, consulte o [guia da OWASP sobre o assunto](https://owasp.org/www-community/attacks/SQL_Injection). Para um estudo mais detalhado, consulte a [Trilha de Aprendizagem de Avaliação de Segurança de Aplicativos Web](/en/learning-path/5/).


### Injeção de caminho/travessia de diretório/inclusão de arquivo local

Esta classe de vulnerabilidades envolve o envio de dados pelo usuário para um aplicativo web, com o objetivo de subverter suas interações com o sistema de arquivos. Com esse tipo de vulnerabilidade, o invasor pode manipular ou controlar o caminho de um arquivo que o aplicativo web está acessando, seja para leitura ou gravação, o que pode lhe conceder acesso total a qualquer arquivo que o servidor web tenha permissão para ler ou modificar. Dependendo do que está armazenado no servidor web, isso pode conceder diferentes permissões ao invasor. No entanto, os alvos mais comuns são os arquivos de configuração, que frequentemente armazenam credenciais de bancos de dados e outros serviços de rede externos, além do código-fonte do próprio aplicativo. 

Considere um aplicativo que armazena dados diretamente no sistema de arquivos, ao invés de usar um banco de dados. Por exemplo, um site que oferece suporte a vários idiomas e armazena as traduções em arquivos. Talvez o código da página inicial seja assim:

{{< highlight html >}}
<?
function localize($content, $lang) {
	return fread("../config/lang/"+$lang+"/"+$content);
}
?>
<html>
<head><title><?= localize($_GET("pg")+".title",$_GET("hl"))?></title></head>
<body><?= localize($_GET("pg"), $_GET("hl"))?></body>
</html>
{{< / highlight >}}

Observe que ele pega parâmetros da string da URL e os usa para ler arquivos do sistema de arquivos, incluindo seu conteúdo na página.


Quando você acessa `http://www.example.com/?hl=en-us&pg=main`, o servidor procura pelos arquivos `../config/lang/en-us/main.title` e `../config/lang/en-us/main`. Talvez o HTML resultante seja assim:

{{< highlight html >}}
<html>
<head><title>Site legal: Principal</title></head>
<body><h1>Olá, mundo!</h1></body>
</html>
{{< / highlight >}}

Agora, o que acontece se, em vez disso, visitarmos `http://www.example.com/?hl=../../../../../../../../&pg=../etc/passwd?` O site procurará por `../config/lang/../../../../../../../../&pg=../etc/passwd.title` e `../config/lang/../../../../../../../../&pg=../etc/passwd`. É improvável que o servidor encontre o primeiro arquivo, mas caso ele ignore o erro, a página gerada pode se parecer com a seguinte:


{{< highlight html >}}
<html>
<head><title></title></head>
<body>nobody:*:-2:-2:Unprivileged User:/var/empty:/usr/bin/false
root:*:0:0:System Administrator:/var/root:/bin/sh
daemon:*:1:1:System Services:/var/root:/usr/bin/false
</body>
</html>
{{< / highlight >}}

Em qualquer sistema Unix moderno, acessar o arquivo `/etc/passwd` não é um grande problema, mas se o invasor conseguir forçar a leitura de outros arquivos no sistema (talvez um arquivo de configuração ou algo como `/home/dev/vpn-credentials.txt`), as consequências podem ser bastante graves. Pior ainda seria um site que permite que os usuários façam upload de arquivos, mas o usuário pode manipular o local do arquivo para que seja um código (por exemplo, .php, .asp etc.) dentro da raiz da web. Nesse caso, o invasor pode carregar um [shell da web](https://en.wikipedia.org/wiki/Web_shell) e executar comandos no servidor web.

#### Experimente você mesmo!

Faça login no seu DVWA e certifique-se de que o nível de segurança está configurado como baixo. Acesse a página “File Inclusion” (Inclusão de arquivos) e teste a URL que você acessa quando clica em um arquivo. É possível recuperar o arquivo `/etc/passwd`? 

### Prevenção de injeção de caminho

Em grande parte, o melhor conselho para evitar esse tipo de ataque é “não use o sistema de arquivos no código do seu aplicativo”. Embora esse conselho seja eficaz, nem sempre é prático. Uma opção híbrida seria armazenar os nomes dos arquivos em um banco de dados e aceitar índices do banco de dados fornecidos pelo usuário. No exemplo acima, o banco de dados poderia ter uma estrutura semelhante a:


<table>
  <tr>
   <td>idioma
   </td>
   <td>página
   </td>
   <td>tipo
   </td>
   <td>local
   </td>
  </tr>
  <tr>
   <td><code>en-us</code>
   </td>
   <td><code>main</code>
   </td>
   <td><code>title</code>
   </td>
   <td><code>../config/lang/en-us/main.title</code>
   </td>
  </tr>
  <tr>
   <td><code>en-us</code>
   </td>
   <td><code>main</code>
   </td>
   <td><code>body</code>
   </td>
   <td><code>../config/lang/en-us/main</code>
   </td>
  </tr>
</table>

Se isso não for viável, o site deve usar e aceitar apenas um conjunto muito limitado de caracteres (como letras e números) para os componentes de nomes de arquivos especificados pelo usuário. Isso ainda pode permitir que os usuários leiam ou gravem arquivos arbitrários dentro de um diretório específico. Portanto, os desenvolvedores do aplicativo devem garantir que os arquivos nesse diretório não sejam executáveis pelo servidor web e que não contenham dados sensíveis ou informações de configuração críticas.

Para mais informações sobre injeção de caminho, consulte o [guia da OWASP sobre o assunto](https://owasp.org/www-community/attacks/Path_Traversal). Para um estudo mais detalhado, consulte a [Trilha de Aprendizagem de Avaliação de Segurança de Aplicativos Web](/en/learning-path/5/).

### Injeção de shell/injeção de comando

A injeção de shell é semelhante à injeção de caminho, pois envolve as interações do aplicativo com o sistema operacional. Nesse caso, porém, o aplicativo está executando diretamente um comando do shell ou vários comandos, e é possível que um invasor altere quais comandos são executados. O impacto de uma injeção de shell é extremamente alto, permitindo que o invasor execute seus próprios comandos no hardware do servidor web subjacente. O comprometimento total do aplicativo web é praticamente garantido. Com o tempo, é provável que haja comprometimento de outras infraestruturas no ambiente do servidor.

Considere um aplicativo que permite que os usuários verifiquem a conectividade de rede com outros sistemas a partir do servidor web. Aqui está um código para uma página PHP mínima que faz isso:

{{< highlight html >}}
<html>
<head><title>Verificação da conectividade da rede</title></head>
<body>
	<h1>Verificação da conectividade da rede</h1>
	<form method="GET">
		<input name="host">
		<input type="submit">
	</form>
<?
	if ($_GET("host")) {
		print("	<h2>Resultados</h2>\r<pre>".shell_exec("ping -c 3 ".$_GET("host"))."</pre>");
	}
?>
</body>
</html>
{{< / highlight >}}


Se o usuário digitar “8.8.8.8”, a página usará a função shell_exec para executar o comando `ping -c 3 8.8.8.8`, e o HTML resultante terá a seguinte aparência:

{{< highlight html >}}
<html>
<head><title>Verificação da conectividade da rede</title></head>
<body>
	<h1>Verificação da conectividade da rede</h1>
	<form method="GET">
		<input name="host">
		<input type="submit">
	</form>
<h2>Resultados</h2>
<pre>PING 8.8.8.8 (8.8.8.8): 56 data bytes
64 bytes from 8.8.8.8: icmp_seq=0 ttl=119 time=7.266 ms
64 bytes from 8.8.8.8: icmp_seq=1 ttl=119 time=8.681 ms
64 bytes from 8.8.8.8: icmp_seq=2 ttl=119 time=12.481 ms

--- 8.8.8.8 ping statistics ---
3 packets transmitted, 3 packets received, 0.0% packet loss
round-trip min/avg/max/stddev = 7.266/9.476/12.481/2.202 ms</pre>
</body>
</html>
{{< / highlight >}}

Super prático! No entanto, o que acontecerá se, em vez disso, o usuário digitar `8.8.8.8; ls -1 /`? O comando do shell executado será `ping -c 3 8.8.8.8; ls -1 /`, e a página da web resultante terá a seguinte aparência:

{{< highlight html >}}
<html>
<head><title>Verificação da conectividade da rede</title></head>
<body>
	<h1>Verificação da conectividade da rede</h1>
	<form method="GET">
		<input name="host">
		<input type="submit">
	</form>
<h2><h2>Resultados</h2></h2>
<pre>PING 8.8.8.8 (8.8.8.8): 56 data bytes
64 bytes from 8.8.8.8: icmp_seq=0 ttl=119 time=5.611 ms
64 bytes from 8.8.8.8: icmp_seq=1 ttl=119 time=11.918 ms
64 bytes from 8.8.8.8: icmp_seq=2 ttl=119 time=9.519 ms

--- 8.8.8.8 ping statistics ---
3 packets transmitted, 3 packets received, 0.0% packet loss
round-trip min/avg/max/stddev = 5.611/9.016/11.918/2.599 ms
Applications
Library
System
Users
Volumes
bin
cores
dev
etc
home
opt
private
sbin
tmp
usr
var</pre>
</body>
</html>
{{< / highlight >}}

O que aconteceu? O shell viu o comando para pingar 8.8.8.8 e, em seguida, um ponto e vírgula. Na maioria dos shells do tipo Unix, o comando ponto e vírgula separa comandos individuais que são executados juntos em uma linha. Assim, o shell executou o comando ping e, em seguida, executou o próximo comando para listar o conteúdo do diretório raiz. Ele reuniu a saída de ambos os comandos e, em seguida, retornou esses resultados ao servidor web. 

Obviamente, algo assim poderia ser usado para recuperar praticamente qualquer arquivo do servidor web (por exemplo, usando o comando “cat”). O invasor poderia fazer com que o servidor web baixasse arquivos (inclusive executáveis) de outros servidores e, em seguida, executasse esses comandos. Esses executáveis baixados podem ser exploits que permitem ao invasor escalar os privilégios do usuário do servidor web para um usuário administrativo (por exemplo, system ou root), dando ao invasor controle total sobre o servidor web.

#### Experimente você mesmo!

Faça login no seu DVWA e certifique-se de que o nível de segurança está configurado como baixo. Navegue até a página "Injeção de Comando" e experimente com a entrada. Você consegue listar o conteúdo do diretório raiz do servidor web? 

### Prevenção de Injeção de Shell

Assim como na injeção de caminho, a melhor forma de prevenir a injeção de shell é "não fazer isso". Ao contrário da injeção de caminho, o conselho de não executar comandos de shell a partir do servidor web não deve ser considerado uma solução definitiva. As outras alternativas (como validação de dados de entrada) são difíceis de implementar corretamente e podem ser impossíveis caso o aplicativo precise permitir algum tipo de entrada não trivial. 

Para mais informações sobre injeção de shell, consulte o guia da [OWASP sobre o assunto](https://owasp.org/www-community/attacks/Command_Injection) e o [guia da OWASP sobre como preveni-la](https://cheatsheetseries.owasp.org/cheatsheets/OS_Command_Injection_Defense_Cheat_Sheet.html). Para um estudo mais detalhado, consulte a [Trilha de Aprendizagem de Avaliação de Segurança de Aplicativos Web](/en/learning-path/5/).

## Skill Check

### Teste de capacitação

#### Exercício 1: Recapitulação

(Esta é uma recapitulação do exercício descrito acima no subtópico)
Acesse a instalação do DVWA. Defina o nível de dificuldade como “baixo” (low) e conclua as seções a seguir:

- XSS (refletido)
- Injeção de SQL
- Inclusão de arquivos
- Injeção de comando

Para cada uma das seções a seguir, sua tarefa é encontrar e explorar a vulnerabilidade conforme descrito na respectiva página do DVWA. Como você talvez não tenha muita experiência com JavaScript, SQL ou linhas de comando, não há problema algum em usar orientações (existem muitas na internet que abordam o DVWA) ou guias para ajudá-lo nos exercícios. Apenas certifique-se de que, em vez de simplesmente copiar e colar comandos dos guias passo a passo, você pode realmente explicar o que cada página do DVWA faz e qual é a vulnerabilidade.


### Exercício 2: Teste de múltipla escolha
	 	 	 	
A validação de dados é um aspecto crítico da segurança de aplicativos web, garantindo que os dados de entrada sejam seguros, devidamente formatados e livres de intenções maliciosas. A falha em implementar uma validação de dados adequada pode deixar os aplicativos web vulneráveis a exploits. As questões a seguir exploram a importância da validação de dados em aplicativos web e as técnicas para evitar vulnerabilidades de validação de dados.

Se possível, discuta suas respostas a essas perguntas com um colega ou mentor que possa ajudar a verificar se você compreendeu corretamente o tópico.


**Questão 1**

Qual é uma consequência comum da falha na implementação da validação de dados adequada em um aplicativo web?

A) Aumento do desempenho do servidor\
B) Experiência aprimorada do usuário\
C) Vulnerabilidade a ataques de injeção de SQL\
D) Melhoria da integridade dos dados\

{{< question title="Chave de respostas" >}}

**Resposta correta da questão 1**: C) Vulnerabilidade a ataques de injeção de SQL

Explicação:

A) Incorreta. O fato de não implementar a validação de dados adequada normalmente não leva a um aumento no desempenho do servidor.\
B) Incorreta. Embora a validação de dados adequada contribua para uma melhor experiência do usuário ao evitar erros, sua ausência não melhora a experiência do usuário.\
C) Correta. Sem a validação adequada dos dados, os aplicativos web ficam vulneráveis a ataques de injeção de SQL, em que os invasores podem manipular as consultas ao banco de dados injetando código SQL malicioso.\
D) Incorreta. A validação de dados ajuda a manter a integridade dos dados, mas sua ausência não melhora a integridade dos dados.
{{< /question >}}

**Questão 2**

Qual das opções a seguir é um mecanismo eficaz para prevenir ataques de cross-site scripting (XSS) em aplicativos web?

A) Usar texto simples para armazenar dados sensíveis\
B) Escapar a entrada do usuário antes de exibi-la\
C) Armazenar senhas de usuários em texto simples\
D) Desabilitar a criptografia HTTPS

{{< question title="Chave de respostas" >}}
**Resposta correta da questão 2**: B) Escapar a entrada do usuário antes de exibi-la

Explicação:

A) Incorreta. O uso de texto sem formatação para armazenar dados confidenciais não impede ataques de XSS; na verdade, aumenta o risco de exposição dos dados.\
B) Correta. O escape da entrada do usuário antes de exibi-la ajuda a atenuar os ataques de XSS, tornando inofensivos quaisquer scripts potencialmente maliciosos, impedindo-os de serem executados nos navegadores dos usuários.\
C) Incorreta. Armazenar senhas de usuários em texto simples é um risco de segurança e não está relacionado à prevenção de ataques XSS.\
D) Incorreta. Desabilitar a criptografia HTTPS expõe dados sensíveis à interceptação e não previne ataques XSS.

{{< /question >}}

**Questão 3**

Qual técnica é eficaz na prevenção de ataques de injeção de SQL em aplicativos web?

A) Usar consultas SQL dinâmicas\
B) Empregar sanitização de entrada e consultas parametrizadas\
C) Armazenar dados confidenciais em texto simples\
D) Desativar mensagens de erro

{{< question title="Chave de respostas" >}}

**Resposta correta da questão 3: B) Empregar sanitização de entrada e consultas parametrizadas

Explicação:

A) Incorreta. Usar consultas SQL dinâmicas sem validação e sanitização adequadas de entrada aumenta o risco de ataques de injeção de SQL.\
B) Correta. O emprego de sanitização de entrada e de consultas parametrizadas ajuda a evitar ataques de injeção de SQL, garantindo que a entrada do usuário seja tratada como dados e não como código executável, neutralizando assim as tentativas maliciosas de injeção de SQL.\
C) Incorreta. O armazenamento de dados confidenciais em texto simples aumenta o risco de exposição dos dados, mas não impede diretamente os ataques de injeção de SQL.\
D) Incorreta. A desativação das mensagens de erro pode ocultar possíveis vulnerabilidades dos invasores, mas não resolve a causa principal das vulnerabilidades de injeção de SQL.

{{< /question >}}

**Questão 4**

Qual das seguintes afirmações explica melhor como a validação adequada de dados ajuda a evitar ataques de injeção de comando na segurança de aplicativos web?

A) A validação de dados restringe a entrada a caracteres e padrões predefinidos, minimizando, assim, a probabilidade de comandos mal-intencionados serem injetados no aplicativo.\
B) Técnicas de validação adequadas, como sanitização de entrada e consultas parametrizadas, ajudam a neutralizar comandos mal-intencionados incorporados nas entradas do usuário, mitigando assim as vulnerabilidades de injeção de comando.\
C) A implementação de métodos de validação, como verificações de comprimento de entrada e lista branca de caracteres aceitáveis, reduz a superfície de ataque e impede a execução de comandos não autorizados no aplicativo web.\
D) Todas as opções anteriores.


{{< question title="Resposta" >}}
**Resposta correta da questão 4**: D) Todas as opções anteriores.
{{< /question >}}

## Learning Resources

{{% resource title="Guias da OWASP sobre vulnerabilidades: Injeção de SQL" languages="Inglês" cost="Grátis" description="Ótimos resumos sobre diferentes vulnerabilidades, incluindo exemplos" url="https://owasp.org/www-community/attacks/SQL_Injection" %}}

{{% resource title="Guias da OWASP sobre vulnerabilidades: XSS" languages="Inglês" cost="Grátis" description="Ótimos resumos sobre diferentes vulnerabilidades, incluindo exemplos" url="https://owasp.org/www-community/attacks/xss/" %}}

{{% resource title="Guias da OWASP sobre vulnerabilidades: Travessia de caminho" languages="Inglês" cost="Grátis" description="Ótimos resumos sobre diferentes vulnerabilidades, incluindo exemplos" url="https://owasp.org/www-community/attacks/Path_Traversal" %}}

{{% resource title="Guias da OWASP sobre vulnerabilidades: Injeção de comando" languages="Inglês" cost="Grátis" description="Ótimos resumos sobre diferentes vulnerabilidades, incluindo exemplos" url="https://owasp.org/www-community/attacks/Command_Injection" %}}

{{% resource title="Folha de dicas de injeçcomando ão de do sistema operacional" languages="Inglês" cost="Grátis" description="Uma visão geral rápida dos diferentes comandos do sistema operacional que podem ser usados para injeção." url="https://cheatsheetseries.owasp.org/cheatsheets/OS_Command_Injection_Defense_Cheat_Sheet.html" %}}

{{% resource title="Web shells" languages="Inglês, curdo, chinês, coreano, francês, lombardo, hindi, malaiala" cost="Grátis" description="Uma visão geral rápida do que é um web shell e como ele pode ser usado em ataques." url="https://en.wikipedia.org/wiki/Web_shell" %}}