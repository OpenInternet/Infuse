+++
style = "module"
weight = 4
title = "Autorização"
description = "É essencial que o site proteja recursos e dados contra acesso não autorizado, garantindo que somente usuários com as permissões apropriadas possam usá-los ou interagir com eles."
+++

## Caso de Uso

Em qualquer site que possua usuários com diferentes níveis de permissões (como visualizadores e editores) ou que armazene informações confidenciais, é fundamental que o site proteja esses recursos e dados contra acessos não autorizados, garantindo que apenas usuários com as permissões apropriadas possam utilizá-los ou interagir com eles.

## Objetivos 

Após concluir este subtópico, os profissionais deverão ser capazes de fazer o seguinte:

* Compreender os tipos comuns de vulnerabilidades de autorização
* Compreender os possíveis impactos desses tipos de vulnerabilidades
* Compreender os mecanismos pelos quais essas vulnerabilidades funcionam
* Compreender, de forma geral, como essas vulnerabilidades podem ser prevenidas

---
## Conteúdo
### Conhecimentos básicos 

A autorização é o processo de garantir que um usuário de um sistema tenha permissão para realizar uma ação específica, como criar, ler, editar ou excluir dados, e de impedir essas ações caso o usuário não possua as permissões adequadas. Geralmente, esses são os controles de segurança mais fáceis de implementar e as vulnerabilidades mais simples de identificar. No entanto, embora sejam conceitualmente simples, tanto a implementação quanto a violação desses controles costumam ser tarefas complexas e propensas a erros.

Sempre que um aplicativo web carrega uma página com controle de acesso ou executa uma ação com controle de acesso, ela deve primeiro verificar se o usuário atual foi autenticado com sucesso e, em seguida, confirmar se o usuário possui as permissões necessárias. Geralmente, a lógica de autorização é altamente específica para cada aplicativo, o que significa que os frameworks web oferecem suporte limitado para isso. Como resultado, a lógica de autorização precisa ser adicionada manualmente a cada página. Às vezes, a lógica de autorização é implementada na lógica da página, e outras vezes, é implementada nas APIs que as páginas web chamam internamente. Em qualquer caso, se a lógica de autorização estiver ausente, usuários não autorizados poderão executar ações para as quais não deveriam ter permissão.

Para facilitar a comunicação sobre vulnerabilidades, as falhas de autorização são normalmente classificadas em três categorias.

### Autenticação ausente

Às vezes, os desenvolvedores deixam de verificar se o usuário está logado em uma página ou em um conjunto de páginas. Qualquer usuário na internet pode acessar as páginas pós-autenticação ou realizar ações que deveriam ser restritas a usuários autenticados. Essa classe de vulnerabilidade é frequentemente chamada de "navegação forçada" ou "referência direta a objetos". Existem várias formas pelas quais esse tipo de vulnerabilidade pode se manifestar.

Um padrão comum dessa vulnerabilidade é quando um site exibe um conjunto de links para usuários que não estão logados e outro conjunto de links para usuários autenticados. No entanto, nenhuma das páginas que exibem dados específicos do usuário ou realizam ações verifica se o usuário está devidamente autenticado. 

Outro padrão comum é que as páginas que renderizam dados no navegador possuem verificações de autenticação, mas as páginas que apenas processam dados (por exemplo, via um HTTP POST) não possuem. Isso geralmente é causado pelo fato de os desenvolvedores não terem um conhecimento profundo de como a web funciona e não perceberem que é muito fácil gerar solicitações HTTP arbitrárias. Com esse padrão, os usuários geralmente só podem ver os dados que estão autorizados a ver, mas podem executar qualquer ação no site e modificar os dados de outros usuários. Observe que, como os usuários podem ver e modificar seus próprios dados, é muito fácil para os invasores com uma conta descobrirem a falta de autenticação.

Um terceiro padrão comum é que páginas ou ações individuais, ou talvez seções do site, simplesmente não conseguem verificar a autenticação. Em geral, isso é resultado de uma supervisão do desenvolvedor.

### Escalonamento vertical de privilégios

O escalonamento vertical de privilégios ocorre quando usuários menos poderosos podem executar ações mais poderosas no site. Isso geralmente é causado pelo fato de o site verificar o status da autenticação, mas não verificar as permissões. Foi mencionado acima que as estruturas geralmente não incluem funções incorporadas para autorização, mas muitas realizam verificações de autenticação. Se uma página (ou site inteiro) executar corretamente as verificações de autenticação, mas não as de permissões, isso geralmente resulta em um aumento vertical de privilégios. 

Um exemplo de escalonamento vertical de privilégios pode ser em um fórum na internet com usuários comuns e moderadores. Quando os usuários comuns fazem login, eles podem criar mensagens e editar suas próprias mensagens. Quando os moderadores fazem login, eles também podem criar publicações e editar suas próprias publicações, mas também podem ocultar as publicações de outros usuários e banir usuários. Se os usuários comuns puderem editar a URL ou alterar os parâmetros do formulário para também ocultar publicações de usuários ou banir usuários, isso seria um escalonamento vertical de privilégios.

Os padrões que levam ao escalonamento vertical de privilégios são essencialmente os mesmos que levam à falta de autenticação, exceto pelo fato de que os usuários precisam estar conectados.

#### Experimente você mesmo!

Faça login no DVWA e verifique se o nível de segurança está definido como baixo e se você está conectado como administrador (é melhor fazer logout e login novamente usando as credenciais “admin:password”). Navegue até a página “Authorisation Bypass”. Se não conseguir ver essa página na barra esquerda e tiver a versão mais atualizada do DVWA, isso significa que você não está conectado como administrador.

Depois disso, abra uma janela de navegação privada ou outro navegador e faça login no seu DVWA como o usuário “gordonb” e observe que o desvio de autorização não aparece na barra de navegação do gordonb. Você consegue descobrir como acessar o desvio de autorização como gordonb? (Se estiver com problemas, lembre-se de que as vulnerabilidades de autorização geralmente são muito simples. Não pense demais.)

### Escalonamento horizontal de privilégios

O escalonamento horizontal de privilégios ocorre quando os usuários podem visualizar ou executar ações nos dados de outros usuários, quando esses outros usuários têm o mesmo nível de acesso. 
Um exemplo de escalonamento horizontal de privilégios pode ser o fórum na internet mencionado acima. Se um usuário comum puder editar as publicações de outros usuários, isso seria um escalonamento horizontal de privilégios. 

Com o escalonamento horizontal de privilégios, há três padrões principais de desenvolvimento que levam à vulnerabilidade. O primeiro é que as páginas verificam se os usuários estão conectados e se têm o nível de acesso correto, mas falham completamente na verificação das permissões no nível dos dados. Normalmente, isso fará com que todo o site, ou uma seção inteira do site, fique vulnerável. O segundo é que as páginas ou ações individuais não verificam as permissões no nível de dados devido a um descuido do desenvolvedor. Por fim, ocasionalmente, os sites passarão o ID do usuário em um parâmetro de URL ou em um campo de formulário oculto, em vez de fazer a leitura na sessão do servidor. O usuário final pode modificar facilmente esses parâmetros, o que geralmente resulta em aumento de privilégios.

### Prevenção de vulnerabilidades de autorização

Conforme observado acima, as duas causas principais das vulnerabilidades de autorização tendem a ser a falta de conscientização do desenvolvedor (portanto, sites inteiros ou seções de sites sem os controles adequados) ou a falta de consistência na implementação de controles. Como o suporte à estrutura é geralmente ruim, os desenvolvedores geralmente precisam implementar seus próprios controles do zero. Aqui estão algumas dicas a considerar:

- Tente criar camadas e simplificar o processo de verificação das permissões do usuário. Na medida em que seu framework oferecer funções para suportar a autorização, utilize-as. Funções consistentes para verificar a autorização do usuário são menos propensas a erros do que uma lógica complexa.
- Para usuários com permissões extremamente elevadas, considere utilizar um site separado totalmente dedicado a eles. Por exemplo, www.exemplo.com para usuários comuns e admin.exemplo.com para usuários administrativos.
- Para verificações de permissões em nível de dados, ter diretrizes consistentes para os desenvolvedores pode reduzir erros. Por exemplo, uma regra que determine que todo acesso a dados deve ocorrer por meio de chamadas de API, que cada função da API inclua um parâmetro de ID de usuário, e que todas as APIs que recebam um ID de usuário utilizem-no nas consultas ao banco de dados. Ter regras consistentes como essa facilita a prevenção e a identificação de erros de autorização.

Para uma autenticação um pouco mais robusta, consulte o [guia de autorização da OWASP](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html). Para um estudo mais detalhado, consulte a [Trilha de Aprendizagem de Avaliação de Segurança de Aplicativos Web](/en/learning-path/5/).

## Prática

Leia este [relatório de vulnerabilidade](https://eaton-works.com/2023/06/06/honda-ecommerce-hack/) e certifique-se de que você entendeu quais vulnerabilidades de autenticação ou autorização estão sendo exploradas aqui.


## Teste de capacitação

### Exercício 1: Recapitulação

Conclua o exercício de desvio de autorização do DVWA, conforme descrito acima.

### Exercício 2: Teste de múltipla escolha

**Questão 1**. Qual é o propósito principal da autorização em um sistema? \

A) Autenticar usuários \
B) Garantir a integridade dos dados \
C) Verificar permissões de usuários \
D) Criptografar informações sensíveis


{{< question title="Resposta" >}}
C) Verificar permissões de usuários
{{< /question >}}

**Questão 2**. Qual tipo de vulnerabilidade ocorre quando os desenvolvedores não verificam se um usuário está autenticado em determinadas páginas? \

A) Escalonamento vertical de privilégios \
B) Escalonamento horizontal de privilégios \
C) Autenticação Ausente \
D) Navegação Forçada


{{< question title="Resposta" >}}
C) Autenticação Ausente
{{< /question >}}

**Questão 3**. Qual é um padrão comum de vulnerabilidade de autenticação ausente mencionado no texto do subtópico? \

A) Falha ao verificar permissões em ações de nível de dados \
B) Passar IDs de usuários em parâmetros de URL \
C) Permitir que os usuários modifiquem seus próprios dados \
D) Exibir links diferentes com base no status de login do usuário

{{< question title="Resposta" >}}
D) Exibir links diferentes com base no status de login do usuário
{{< /question >}}

**Questão 4**. Qual é o resultado de uma vulnerabilidade de escalonamento vertical de privilégios? \

A) Os usuários podem acessar dados não autorizados \
B) Usuários com menos privilégios podem realizar ações poderosas para as quais não foram autorizados \
C) Os usuários podem editar os dados de outros usuários sem permissão \
D) O site inteiro se torna vulnerável a ataques


{{< question title="Resposta" >}}
B) Usuários com menos privilégios podem realizar ações poderosas para as quais não foram autorizados
{{< /question >}}


**Questão 5**. No contexto de escalonamento horizontal de privilégios, qual é uma causa comum de vulnerabilidade, de acordo com o texto do subtópico? \

A) Falta de conscientização dos desenvolvedores \
B) Implementação inconsistente de controles \
C) Passar IDs de usuários em parâmetros de URL \
D) Protocolos de criptografia insuficientes


{{< question title="Resposta" >}}
B) Implementação inconsistente de controles
{{< /question >}}


**Questão 6**. Como os desenvolvedores podem prevenir vulnerabilidades de autorização de acordo com o texto do subtópico? \

A) Utilizar uma lógica complexa para verificações de autorização \
B) Confiar unicamente no suporte do framework \
C) Implementar seus próprios controles de forma consistente \
D) Ignorar verificações de permissões em nível de dados


{{< question title="Resposta" >}}
C) Implementar seus próprios controles de forma consistente
{{< /question >}}

**Questão 7**. Qual das seguintes opções NÃO é uma dica mencionada no texto para prevenir vulnerabilidades de autorização? \

A) Camada e simplificação do processo de verificação das permissões do usuário \
B) Usar sites separados para usuários comuns e administradores \
C) Confiar unicamente nas funções do framework para autorização \
D) Estabelecer diretrizes consistentes para os desenvolvedores no acesso a dados

{{< question title="Resposta" >}}
C) Confiar unicamente nas funções do framework para autorização
{{< /question >}}

**Questão 8**. Qual é a importância da consistência na implementação de controles de autorização? \

A) Aumenta a complexidade do sistema \
B) Reduz a probabilidade de erros \
C) Limita o acesso a certos usuários \
D) Torna as verificações de autorização mais difíceis


{{< question title="Resposta" >}}
B) Reduz a probabilidade de erros
{{< /question >}}

**Questão 9**. Qual é um exemplo fornecido no texto do subtópico para a vulnerabilidade de escalonamento vertical de privilégios? \

A) Modificar parâmetros de URL para escalar privilégios \
B) Permitir que usuários visualizem dados de outros usuários \
C) Passar IDs de usuários em campos de formulário ocultos \
D) Usuários regulares ganhando acesso a funcionalidades administrativas


{{< question title="Resposta" >}}
D) Usuários regulares ganhando acesso a funcionalidades administrativas
{{< /question >}}

**Questão 10**. Qual categoria de vulnerabilidade envolve usuários realizando ações nos dados de outros usuários com o mesmo nível de acesso? \

A) Autenticação Ausente \
B) Escalonamento vertical de privilégios \
C) Escalonamento horizontal de privilégios \
D) Navegação Forçada

{{< question title="Resposta" >}}
C) Escalonamento horizontal de privilégios
{{< /question >}}



### Exercício 3 (opcional, apenas para aqueles que têm familiaridade com o Python básico): Desafio de encontrar bugs no código

O código simula um aplicativo web vulnerável com uma vulnerabilidade de escalonamento horizontal de privilégios. A vulnerabilidade está no fato de que a função delete_profile verifica apenas a permissão de gravação do usuário atual, mas não verifica se o usuário atual está autorizado a excluir os perfis de outros usuários. Isso permite que qualquer usuário com permissão de gravação exclua o perfil de qualquer outro usuário, independentemente das permissões do próprio usuário.


{{< highlight python >}}
# Instrução de importação para a função print (Python 3.x)
from __future__ import print_function

# Dados do usuário (substitua pelos seus próprios dados de teste)
users = {
    "admin": {"id": 1, "username": "admin", "permissions": ["read", "write", "delete"]},
    "user1": {"id": 2, "username": "user1", "permissions": ["read", "write"]},
    "user2": {"id": 3, "username": "user2", "permissions": ["read", "write"]},
}

# Função para simular a obtenção do perfil de um usuário
def get_profile(username):
    if username not in users:
        return None
    return users[username]

# Função para simular a exclusão do perfil de um usuário (vulnerável)
def delete_profile(username, current_user):
    if "write" in current_user["permissions"]:
        if username in users:
            del users[username]
            return f"User '{username}' deleted successfully."
        else:
            return f"User '{username}' not found."
    else:
        return "Permission denied: You do not have permission to delete users."

# Casos de teste (modifique conforme necessário)
current_user = users["user1"]  # Simulate a user with write permission
target_username = "user2"  # Simulate the target user

# Tente excluir o perfil da vítima
result = delete_profile(target_username, current_user)

# Imprima o resultado (saída esperada: "Permissão negada: Você não tem permissão para excluir usuários.")
print(result)
{{< / highlight >}}

**Encontre e corrija a vulnerabilidade na função `delete_profile`.**

{{< question title="Chave de respostas e explicação" >}}
A vulnerabilidade está no fato de que a função `delete_profile` verifica apenas a permissão de gravação do usuário atual, mas não verifica se o usuário atual está autorizado a excluir os perfis de outros usuários. Isso permite que qualquer usuário com permissão de gravação exclua o perfil de qualquer outro usuário, independentemente das permissões do próprio usuário.

Para corrigir a vulnerabilidade, você poderia:
1. Verificar se o usuário atual tem a permissão de "excluir" especificamente. 
2. Implementar controle de acesso baseado em funções (RBAC) para restringir a exclusão com base nas funções dos usuários.
3. Incluir verificações adicionais para confirmar a legitimidade da solicitação de exclusão.

{{< /question >}}


## Recursos de aprendizagem

{{% resource title="Authorization cheat sheet" languages="Inglês" cost="Grátis" description="Um olhar sobre algumas das melhores práticas de autorização." url="https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html" %}}

{{% resource title="Honda eCommerce hack" languages="EngliInglêssh" cost="Grátis" description="Um artigo demonstrando como encontrar certas vulnerabilidades em sites com autenticação ou autorização inadequada." url="https://eaton-works.com/2023/06/06/honda-ecommerce-hack/" %}}