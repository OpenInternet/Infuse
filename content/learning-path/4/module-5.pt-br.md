+++
style = "module"
weight = 5
title = "Lógica do Aplicativo"
description = "Aqui aprendemos sobre vulnerabilidades de lógica de aplicativo, o que são e como proteger nosso site contra elas"
+++

## Caso de Uso

Em qualquer site interativo que imponha restrições aos tipos de ações que os usuários podem realizar, é importante que o site aplique corretamente essas restrições para evitar ações não intencionais (e potencialmente prejudiciais) por usuários maliciosos. 

## Objetivos 

Após concluir este subtópico, os profissionais deverão ser capazes de fazer o seguinte:

- Compreender o conceito de vulnerabilidades na lógica do aplicativo
- Identificar e compreender subclasses comuns de vulnerabilidades na lógica do aplicativo, incluindo:
  - Controles do lado do cliente
  - Falta de limitação de taxa/envios múltiplos
  - Inconsistências de arredondamento
  - Pular etapas do processo
  - Falsificação de solicitação entre sites


---
## Conteúdo 

Vulnerabilidades de lógica do aplicativo (frequentemente chamadas de vulnerabilidades de lógica de negócios) são uma classe de falhas pouco definida, que estão relacionadas aos processos realizados pelo próprio aplicativo, em vez de vulnerabilidades nas tecnologias subjacentes usadas pelo aplicativo. Se essa definição for confusa para você, saiba que você não está sozinho. O que constitui uma vulnerabilidade de lógica de negócios em comparação com outras classes de vulnerabilidades é um assunto amplamente debatido. A Infuse adota a posição de que a definição exata não é tão relevante, e que a praticidade é mais importante do que definições precisas. Incentivamos você a focar nas vulnerabilidades em si, a desenvolver uma visão das classes de vulnerabilidades que seja lógica para você e a manter flexibilidade na taxonomia ao discutir vulnerabilidades com outras pessoas.

Este subtópico abordará diversos exemplos de vulnerabilidades que, provavelmente, se enquadram na lógica do aplicativo. Como cada aplicativo é único, existem inúmeras possíveis vulnerabilidades de lógica do aplicativo. No entanto, esses exemplos abrangem algumas das mais comuns.

### Controles do lado do cliente

Em algumas situações, os aplicativos web impõem restrições sobre o que os usuários podem fazer, mas essas restrições são aplicadas pelo navegador, utilizando JavaScript ou recursos nativos dos elementos HTML. É fundamental que os desenvolvedores de sites reconheçam que tudo o que é enviado para o navegador pode ser visualizado, modificado ou ignorado por um invasor com habilidades intermediárias. Aqui estão alguns exemplos de controles do lado do cliente que podem ser facilmente desviados:

### Tamanho da entrada

Os elementos de entrada HTML possuem um atributo maxlength que se destina a limitar o número de caracteres digitados em um campo de entrada, por exemplo: `<input type="text" name="firstname" maxlength="20">`. Neste exemplo, se um usuário tentar inserir mais de 20 caracteres no campo de entrada, o navegador impedirá que isso aconteça. No entanto, isso é na verdade apenas um pedido educado, e não uma restrição real. Por exemplo:

- O usuário poderia utilizar a ferramenta de inspeção do navegador para modificar o DOM e remover a restrição de comprimento. 
- O usuário poderia salvar a página da web localmente, modificar o HTML para remover a restrição e, em seguida, carregar a página de volta no navegador.
- O usuário poderia ler o HTML e criar manualmente uma solicitação equivalente usando o `curl` (uma ferramenta de linha de comando para baixar recursos e transferir dados usando diversos protocolos), mas sem a restrição de comprimento.
- O usuário poderia usar uma ferramenta especializada chamada proxy interceptador para capturar a página da web do servidor antes de ela ser enviada ao navegador e remover a restrição antes de encaminhá-la ao navegador. Ou o usuário poderia usar a mesma ferramenta para capturar a solicitação do navegador antes de ser enviada ao servidor, editar a solicitação para incluir um valor mais longo e enviá-la ao servidor.

Essas técnicas de contorno geralmente funcionam para qualquer controle do lado do cliente. Mantenha isso em mente à medida que abordamos outros controles.

#### Validação de conteúdo de dados

Alguns desenvolvedores utilizam JavaScript para restringir os valores que podem ser inseridos em um formulário, ou usam controles HTML, como botões de rádio ou menus suspensos, para limitar as opções disponíveis. Nenhum desses controles é eficaz. Usando as mesmas técnicas descritas acima, os invasores podem remover as restrições em seus navegadores ou contorná-las para enviar qualquer dado que desejarem.

Uma subclasse comum desse tipo de vulnerabilidade está relacionada ao redimensionamento de imagens. Ocasionalmente, os desenvolvedores implementam uma funcionalidade em um site que redimensiona imagens no lado do servidor para exibição otimizada em uma determinada resolução. Geralmente, a URL será algo assim: `http://example.com/image?imgname=file.gif&width=640&height=480`. Esses scripts geralmente funcionam da seguinte maneira: alocam um espaço de armazenamento na memória para conter a imagem redimensionada, ajustam o arquivo especificado para o novo tamanho e, em seguida, retornam os dados da imagem para o navegador. No exemplo acima, a memória alocada geralmente seria de cerca de 1,2 megabytes. No entanto, se um usuário enviasse uma solicitação com largura e altura de 100.000, o servidor tentaria alocar 10 gigabytes. Ao enviar repetidamente tais solicitações, um invasor pode facilmente sobrecarregar até mesmo um servidor web poderoso. Os desenvolvedores devem, no mínimo, impor um tamanho máximo no lado do servidor e considerar transferir o processo de redimensionamento para um servidor isolado, de forma que sobrecarregar esse servidor não afete o servidor principal.

#### Desabilitando controles

Às vezes, os desenvolvedores usam JavaScript para desabilitar certos controles em uma página da web até que determinadas condições sejam atendidas. Por exemplo, o usuário pode precisar resolver um CAPTCHA ou aguardar um determinado período de tempo antes de enviar um formulário ou clicar em um link. Usando as técnicas mencionadas acima, um invasor pode simplesmente remover ou contornar esses controles.

#### Dados sensíveis armazenados no lado do cliente

Às vezes, os desenvolvedores incluem dados sensíveis em uma página da web que são secretos ou controlam algo que não deveria estar sob o controle do usuário. Um exemplo disso seria tentar restringir os dados que um usuário vê, ocultando dados secretos usando o atributo CSS display=none, colocando-os em comentários HTML ou utilizando outros mecanismos. O usuário pode ver esses dados simplesmente visualizando o código-fonte HTML da página da web. Um exemplo de controle no lado do cliente ao incluir dados que não devem ser editados em campos de formulário ocultos. Por exemplo, nos primórdios do e-commerce, as lojas virtuais frequentemente incluíam o preço de um item em uma entrada de formulário HTML oculta, que era então enviada para um carrinho de compras de terceiros. Usando as técnicas discutidas no tópico “tamanho da entrada”, os usuários podem modificar facilmente o valor desse campo oculto e adquiri-lo pelo valor que desejarem. (Você deve se lembrar que outro exemplo desse tipo de vulnerabilidade foi discutido no tópico “escalonamento horizontal de privilégios” acima).

#### Prevenção de vulnerabilidades de controle no lado do cliente

ão há nada de inerentemente ruim em realizar a validação de entrada no lado do cliente, mas os desenvolvedores devem entender que são apenas conveniências da interface do usuário. Toda a validação e os cálculos confidenciais devem ser realizados no servidor, não no cliente.

### Falta de limitação de taxa/envios múltiplos

Uma classe de vulnerabilidade da lógica do aplicativo é uma restrição implícita ao número de vezes ou à frequência com que uma solicitação pode ser enviada. A primeira é frequentemente utilizada de forma inadequada quando o servidor executa operações caras ou abusivas, como a inserção de dados em um banco de dados com muitos índices, o envio de e-mails ou mensagens SMS ou a manipulação geral de grandes quantidades de dados. A vulnerabilidade de redimensionamento de imagens discutida acima seria outro exemplo disso. Em geral, os desenvolvedores não pensam na taxa em que os usuários enviam essas solicitações como uma restrição da lógica do aplicativo a ser imposta e, ainda assim, ela se encaixa na classe de vulnerabilidade. 

Há muitos métodos para limitar a taxa de solicitações, mas os únicos que são realmente eficazes são aqueles que são aplicados no site do servidor. Para operações caras, vários sistemas de filas podem ser usados para garantir que apenas um pequeno número dessas operações possa ser realizado de uma só vez. Sistemas mais complexos envolvendo CAPTCHAs, limitação de taxa por conta e por endereço IP podem ser necessários para operações frequentemente abusadas. 

Um caso relacionado são as solicitações que devem ser enviadas apenas uma ou algumas vezes. Um exemplo pode ser um site de helpdesk que permite que os usuários gerem um número de ticket. Se um usuário puder, por exemplo, registrar 20 tickets e vincular todos eles a um caso/intervenção específico, isso terá um efeito negativo para os proprietários do site! 

### Inconsistências de arredondamento
Uma classe interessante de vulnerabilidades tem a ver com a forma como várias operações lidam com as frações. Essa classe de vulnerabilidade foi apresentada em filmes como _Superman 3_ e _Como Enlouquecer Seu Chefe_, mas ainda ocorre em várias aplicações financeiras. Se dois aplicativos permitem a transferência de dinheiro entre si, a forma de lidar com centavos fracionários pode ser importante. Se um aplicativo arredondar centavos em frações e outro truncá-los, um invasor poderá transferir repetidamente 1,9 centavos do aplicativo de truncamento para o aplicativo de arredondamento. Cada transferência custará ao usuário 1 centavo (1,9 truncado) e lhe renderá 2 centavos (1,9 arredondado).

Há muitas maneiras de evitar vulnerabilidades no arredondamento. A mais simples é rejeitar transações com valores fracionados. Como alternativa, é possível aceitar totalmente as moedas fracionadas. Por fim, se for necessário arredondar/truncar/etc., é preciso fazer o trabalho árduo de garantir que o manuseio das frações seja consistente.

### Pular etapas do processo

Muitas vezes, os sites têm processos que são apresentados aos usuários como uma série de etapas. Embora a intenção dos desenvolvedores possa ser fazer com que o usuário passe por cada etapa, muitas vezes o aplicativo ainda permitirá que os usuários concluam o processo sem passar por cada etapa. Considere um site de compras online que permite aos usuários adicionar itens ao carrinho, especificar suas opções de entrega, especificar suas informações de pagamento e, finalmente, concluir a transação. Não é incomum que sites reais realizem a transação se o usuário simplesmente seguir os dois primeiros passos e depois ir diretamente para a página de transação completa. Embora isso seja raro em sites de comércio eletrônico reais, não é incomum em várias plataformas de e-learning, onde o usuário pode deixar de assistir aos vídeos chatos e ir diretamente para a página que marca sua participação como concluída.

### Falsificação de solicitação entre sites

Nossa última vulnerabilidade de lógica de aplicativo é frequentemente considerada uma classe de vulnerabilidade própria, mas a incluímos aqui por conveniência. A essência do CSRF (cross site request forgery) é que, em algumas situações, os navegadores da web enviarão a um site os cookies do usuário para cada solicitação para esse site, independentemente do site que gerou a solicitação. Se um site malicioso, ao ser visitado por um usuário, gerar uma solicitação fraudulenta para um site-alvo, e o usuário estiver logado no site-alvo, então o site-alvo executará a ação solicitada como se fosse o próprio usuário, mesmo que o usuário não tenha intencionalmente disparado a solicitação.

Como exemplo, considere um site em que o mecanismo de redefinição de senha é o envio de um e-mail com um link que permite que você altere sua senha. Isso é bastante normal. Imagine que o mesmo site tenha uma página que permita que você altere seu endereço de e-mail e, se você simplesmente acessar example.com/changeemail?new=123@attacker.com, ele alterará seu endereço de e-mail para o endereço especificado. Finalmente, imagine que o site attacker.com foi projetado para exibir uma sequência interminável de fotos de animais adoráveis. No entanto, existe um detalhe. O botão “próximo” na parte inferior da página é na verdade o link acima. Se um usuário estiver conectado ao example.com, visitar o site attacker.com e clicar no botão “próximo”, seu endereço de e-mail será alterado e o invasor poderá redefinir imediatamente a senha do usuário, obtendo o controle da conta. 

#### Experimente você mesmo!

Faça login no seu DVWA e certifique-se de que o nível de segurança está configurado como baixo. Navegue até a página “CSRF” e tente gerar uma página da web que altere a senha do usuário conectado. Vale notar que, se você estiver usando um navegador web atualizado, ele pode automaticamente impor restrições aos atributos SameSite dos cookies de sessão, o que pode impedir o funcionamento do laboratório. Se isso acontecer, não se preocupe e ignore este exercício, pois esse é um comportamento normal e esperado do navegador.

### Prevenção de CSRF
A maneira mais eficaz de impedir o CSRF é definir explicitamente o atributo SameSite dos cookies de sessão como Lax ou Strict e garantir que qualquer solicitação que altere os dados só os altere se for enviada com HTTP POST. Outros métodos podem funcionar, mas são mais complexos. 

Para obter mais informações sobre CSRF, consulte a [página da OWASP sobre](https://owasp.org/www-community/attacks/csrf) o assunto e a [folha de dicas de proteção contra CSRF da OWASP](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html). 
Para um estudo aprofundado sobre CSRF e outras vulnerabilidades de lógica do aplicativo, consulte a [Trilha de Aprendizagem de Avaliação de Segurança de Aplicativos Web](/en/learning-path/5/).

## Teste de capacitação

Para esta seção, decidimos ignorar a verificação de habilidades por um motivo muito simples: os navegadores da web estão atualmente alterando suas políticas para que as políticas de cookies SameSite sejam agora Lax por padrão, o que deve impedir automaticamente o funcionamento de muitos ataques CSRF. Por esse motivo, os exercícios que sugerimos podem não funcionar mais no futuro.
Se ainda assim você quiser fazer algum tipo de exercício de verificação de habilidades, experimente o laboratório DVWA do link acima para ver se funciona. Se isso não funcionar, converse brevemente com um colega ou mentor para entender por que as mudanças nas configurações padrão dos navegadores impedem o funcionamento do laboratório. Peça a eles que confirmem se você entendeu corretamente o tema.

## Recursos de aprendizagem

{{% resource title="Falsificação de solicitação entre sites" languages="Inglês" cost="Grátis" description="Um guia da OWASP sobre a vulnerabilidade, como ela funciona e quais medidas preventivas funcionam e não funcionam." url="https://owasp.org/www-community/attacks/csrf" %}}

{{% resource title="Folha de dicas para prevenção de falsificação de solicitações entre site" languages="Inglês" cost="Grátis" description="Uma lista de possíveis atenuações para CSRF, quais são incentivadas e quais são desencorajadas." url="https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html" %}}