+++
style = "module"
weight = 3
title = "Autenticação"
description = "Em qualquer site que tenha logins de usuários, é importante que o site proteja as contas de usuários contra acesso não autorizado e também que as próprias credenciais da conta sejam protegidas. Este subtópico descreve as áreas mais comuns de autenticação em que aparecem falhas nos aplicativos web."
+++

## Caso de Uso

Em qualquer site que tenha logins de usuários, é importante que o site proteja as contas de usuários contra acesso não autorizado e também que as próprias credenciais da conta sejam protegidas. Este subtópico descreve as áreas mais comuns de autenticação em que aparecem falhas nos aplicativos web.

## Objetivos 

Após concluir este subtópico, os profissionais deverão ser capazes de fazer o seguinte:

- Compreender os tipos comuns de vulnerabilidades de autenticação
- Compreender os possíveis impactos desses tipos de vulnerabilidades
- Compreender os mecanismos pelos quais essas vulnerabilidades funcionam
- Compreender, de forma geral, como essas vulnerabilidades podem ser prevenidas

---
## Conteúdo

A autenticação é o processo pelo qual um usuário de um sistema prova que é quem diz ser. É a base sobre a qual o controle de acesso é construído. Normalmente, um usuário fornece uma informação que o identifica (nome de usuário, e-mail, telefone etc.) e uma informação secreta que valida essa identidade (geralmente uma senha ou frase secreta, embora métodos alternativos ou adicionais, como chaves de segurança, WebAuthn e Passkeys, estejam ganhando popularidade). Neste subtópico, serão abordadas algumas classes de vulnerabilidades que são comuns e de alto impacto em aplicativos web.

### Armazenamento não seguro de senhas
Se os usuários tiverem que fazer login em um site com um nome de usuário e uma senha, o site deverá ser capaz de validar se o usuário digitou a senha correta. Além disso, as senhas devem ser armazenadas de forma segura no banco de dados de autenticação do aplicativo, pois esse banco de dados pode ser comprometido por injeção de SQL, perda de backups ou até mesmo por membros mal-intencionados ou infiltrados da organização que administra o site. Há várias abordagens para o armazenamento de senhas:

- **Texto simples** \
  Obviamente, essa é a pior maneira de armazenar senhas. Isso significa armazenar os caracteres exatos que o usuário digitou ao configurar a senha. Se o banco de dados de senhas for comprometido, os invasores terão acesso total a todas as senhas de usuários. Essas senhas não só podem ser usadas para obter acesso ao próprio site, como também podem ser usadas em ataques [de reutilização de senha](https://en.wikipedia.org/wiki/Credential_stuffing) contra outros sites ou aplicativos.
- **Criptografia** \
  A solução óbvia para o armazenamento de senhas em texto simples é criptografar as senhas. No entanto, isso oferece apenas uma proteção modesta contra muitas ameaças. O aplicativo deve conhecer a chave de criptografia, e, portanto, a chave deve ser armazenada em algum lugar. Membros internos mal-intencionados ou infiltrados com acesso ao banco de dados quase certamente terão acesso à chave de criptografia. Além disso, há uma variedade de vulnerabilidades comuns em servidores web que podem permitir que invasores remotos obtenham acesso à chave. Quando alguém obtiver a chave de criptografia, poderá descobrir as senhas.
- **Hash** \
  Como visto, o servidor Web nunca precisa recuperar uma senha de usuário do armazenamento, ele só precisa saber se a senha que o usuário digitou é a mesma que a senha real do usuário. Há uma classe de algoritmos denominados hashes criptográficos que realizam uma transformação unidirecional nos dados. Exemplos desses algoritmos incluem MD5 e SHA. É efetivamente impossível, com base em um hash, determinar quais dados de origem geraram o hash. Infelizmente, as senhas tendem a ser bastante curtas, e as funções de hash criptográficas tendem a ser bastante rápidas. Para uma determinada função de hash, é possível fazer o hash de todas as senhas possíveis de um determinado comprimento e armazenar a senha e o hash resultantes. Então, com um hash de senha específico, é possível simplesmente procurar a senha que gerou esse hash. Em meados dos anos 2000, era viável calcular, armazenar e distribuir esses bancos de dados, chamados [tabelas arco-íris](https://pt.wikipedia.org/wiki/Tabela_arco-%C3%ADris), para uso geral. \
  Uma solução para o problema da tabela arco-íris é adicionar um pouco de dados ([chamado de sal](https://pt.wikipedia.org/wiki/Sal_(criptografia))) à senha antes de fazer o hash. Esses dados não precisam ser secretos ou de alta entropia, apenas precisam ser diferentes por usuário. Uma abordagem comum é fazer o hash do nome de usuário e da senha juntos. Uma tabela arco-íris para hashes de senha NTLM do Microsoft Windows com até 9 caracteres ocupa 6,7 TB. Se esses hashes de senha fossem salgados com até 5 caracteres alfanuméricos, essa tabela arco-íris aumentaria para mais de 6.000.000.000 TB. O problema com essa abordagem é que os hashes ainda são bastante rápidos e as placas de vídeo modernas são essencialmente supercomputadores maciçamente paralelos. Uma Nvidia RTX 4090 (uma placa de vídeo de ponta de 2022) pode computar quase 400.000.000.000 de hashes SHA salgados por segundo, permitindo que pessoas físicas decifrem a maioria das senhas em minutos ou horas. 

**Algoritmos especiais de armazenamento de senhas**
O problema com os hashes criptográficos é que eles foram projetados para serem rápidos e eficientes. A maior parte de seu uso é para verificar se os dados não foram adulterados. Esse problema já havia sido resolvido em 1976, com uma função de [crypt do Unix](https://www.usenix.org/legacy/publications/library/proceedings/usenix99/full_papers/provos/provos_html/node9.html) que salgava e criptografava a senha várias vezes para diminuir a força bruta. Não é de surpreender que esse algoritmo não resista aos recursos modernos da computação, mas a ideia geral ainda é usada atualmente com algoritmos especiais projetados para armazenar derivados de senhas. Esses algoritmos são projetados para usar recursos ajustáveis de CPU e memória, para fazer uma boa compensação entre desempenho e resistência à força bruta. Os bons algoritmos de manipulação de senhas incluem (em ordem decrescente de preferência) [scrypt, argon2, bcrypt e PBKDF2](https://www.latacora.com/blog/2018/04/03/cryptographic-right-answers/). Como medida de defesa em profundidade, é uma boa prática combinar a senha do usuário com um segredo que não esteja armazenado no próprio banco de dados. Por exemplo, o segredo pode ser codificado no próprio aplicativo. Isso provavelmente impedirá a recuperação da senha se apenas o banco de dados de senhas for perdido.

#### Experimente você mesmo!

Faça login no seu DVWA e certifique-se de que o nível de segurança está configurado como baixo. Navegue até a seção de Injeção de SQL e digite o seguinte na caixa de texto: \
\
`999' union all select user, password from users where '1'='1`

Isso retornará o nome e o sobrenome de todos os usuários que têm um `userid` de 999 (não há nenhum) e também o hash de nome de usuário e senha de todos os usuários. Use um site de pesquisa de hash na internet (por exemplo, https://www.whatsmyip.org/hash-lookup/) para pesquisar o hash da senha do usuário administrador. Que tipo de hash é usado para armazenar as senhas dos usuários do DVWA? Qual é a senha do usuário chamado “1337”?
Para obter mais informações sobre o manuseio de senhas, consulte a [folha de dicas de armazenamento de senhas da OWASP](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html).


### Redefinição de Senha

Se o usuário de um site esquecer sua senha, a maioria dos sites oferece uma maneira automatizada de o usuário verificar sua identidade para definir uma nova senha. O ideal é que esses métodos sejam aproximadamente tão seguros quanto o processo padrão de verificação de senha, no qual o usuário digita uma senha secreta que conhece em uma página da web, mas são significativamente menos convenientes.

A maioria dos sites presumirá que a conta de e-mail do usuário é razoavelmente segura e enviará por e-mail ao usuário um link que permitirá a redefinição da senha. Essa suposição provavelmente está correta para a grande maioria das contas de usuário na grande maioria dos sites. Os links de redefinição de senha (e, adicionalmente, os links de “login mágico”) devem ter as seguintes propriedades para minimizar o risco do usuário:

- Os links devem ser para a versão criptografada por TLS do site. (Observe que não há uma maneira viável de garantir que o e-mail em si seja criptografado em trânsito, mas o tráfego de rede do usuário final, como um usuário que acessa uma página da web, tem mais probabilidade de ser interceptado do que o tráfego entre servidores, como e-mails enviados de um servidor para outro).
- O link deve ter um token de acesso que contenha cerca de 128 bits de dados gerados aleatoriamente a partir de um gerador de números aleatórios com uma criptografia forte. Observe que 128 bits de dados ocuparão 172 ou mais caracteres quando codificados em uma URL. Não há nenhuma vantagem real em usar mais de 128 bits de dados, e o uso de 128 bits significa que não é necessária nenhuma proteção adicional de força bruta.
- O token de acesso deve ter um tempo limitado (por exemplo, expirar após uma hora) e ser de uso único. A natureza de uso único não apenas limita a capacidade de um invasor de alterar a senha de um usuário, mas também pode alertar o usuário caso um invasor consiga obter o token e alterar a senha do usuário.
- O token em si deve estar vinculado à conta do usuário, impedindo que os usuários usem o token para alterar a senha de outro usuário.

Os links de redefinição também podem ser enviados por SMS. É menos provável que o SMS seja interceptado do que o e-mail por hackers normais, mas é vulnerável à interceptação pelos governos do país em que o usuário se encontra. Se um token mais curto (por exemplo, um PIN) for enviado por SMS, é importante ter uma proteção forte contra força bruta na página que aceita o PIN, por exemplo, um tempo de vida do PIN de 10 minutos e limitação de taxa. Observe também que há [ataques DoS simples e lucrativos](https://www.openmindnetworks.com/blog/international-sms-fraud-by-brian-kelly-cto-and-co-founder/) que envolvem fazer com que um servidor envie mensagens SMS para um número de telefone escolhido pelo invasor. Ao executar um grande número de redefinições de senha por SMS, um invasor pode incorrer em altos custos para o operador do site e, possivelmente, ganhar dinheiro no processo.

Um método alternativo de redefinição de senha envolve fazer perguntas ao usuário para as quais tanto o site quanto o usuário sabem as respostas, mas que um invasor talvez não saiba. Esses métodos tendem a ser extremamente fracos ou extremamente fortes para verificar a identidade do usuário. As “perguntas secretas” padrão, como perguntar onde o usuário nasceu, o nome de solteira da mãe, a marca do primeiro carro etc., são bastante fracas. Em primeiro lugar, um invasor pode encontrar facilmente a resposta para essas perguntas. Em segundo lugar, a maioria delas é impossível de ser alterada, portanto, caso um invasor descubra uma resposta (mesmo comprometendo outro site), ele poderá usá-la repetidamente. Por fim, a maioria dessas perguntas tem apenas algumas respostas comuns. Por exemplo, se você perguntar a um coreano o nome de solteira de sua mãe, uma proporção significativa das respostas será “Kim” ou “Lee”. O outro tipo de pergunta secreta, mais seguro, envolve comunicações offline entre o site e o usuário. Exemplos disso são contas de serviços públicos e extratos bancários. Para que o usuário redefina sua senha, ele deve inserir, por exemplo, os valores da 3ª e 5ª transações em seu extrato bancário. O usuário teria direito a apenas algumas tentativas e, em seguida, precisaria realizar um processo de redefinição ainda menos conveniente com o atendimento ao cliente. Esse processo de redefinição pode ser muito seguro, embora, na era das declarações online, provavelmente seja menos seguro do que enviar um token por e-mail.

Para saber um pouco mais sobre a redefinição segura de senhas, consulte a folha de dicas da [OWASP sobre Esqueci minha senha](https://cheatsheetseries.owasp.org/cheatsheets/Forgot_Password_Cheat_Sheet.html). Para um estudo aprofundado das vulnerabilidades de autenticação e autorização, consulte a [Trilha de Aprendizagem de Avaliação de Segurança de Aplicativos Web](/en/learning-path/5/).

### Força da credencial

A maioria dos aplicativos web usa senhas para autenticação, embora técnicas como WebAuthentication usando chaves de segurança e sessões de autenticação extremamente longas combinadas com links de login por e-mail estejam ganhando popularidade. Se um site usa senhas, é importante que essas senhas sejam fortes. No entanto, a definição de uma senha “forte” mudou ao longo dos anos. Há três métodos principais que os invasores usam para atacar diretamente as senhas dos usuários:

1. **Adivinhação online usando reutilização de senha:** Nesse ataque, um invasor usa senhas conhecidas associadas ao usuário e simplesmente tenta essas senhas no formulário de login do site. Como muitas pessoas usam as mesmas senhas em vários sites, esse ataque pode ser devastadoramente eficaz. Os nomes de usuário e as senhas de sites comprometidos estão amplamente disponíveis na web pública, na Dark Web e à venda em sites privados. Os invasores podem simplesmente inserir todas as senhas conhecidas de um determinado usuário. Se o invasor tiver como alvo um pequeno número de usuários, esse ataque nem precisará de automação.
2. **Força bruta online via preenchimento de credenciais:** O “preenchimento de credenciais” é um tipo de ataque em que um cliente de software (seja um navegador web automatizado, como no caso do [Selenium](https://www.selenium.dev/), ou um script personalizado) tentará automaticamente fazer login no site de destino. Além disso, esses ataques podem usar um conjunto distribuído de servidores proxy para parecer que vêm de vários computadores diferentes. A taxa desses ataques geralmente é limitada pela velocidade do servidor web e pela latência da rede, portanto, os invasores geralmente têm o cuidado de escolher apenas as credenciais mais prováveis para tentar. Por exemplo, eles geralmente limitam os nomes de usuário a um conjunto específico ou a nomes de usuário conhecidos, caso haja uma [vulnerabilidade de enumeração de nomes de usuário](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/03-Identity_Management_Testing/04-Testing_for_Account_Enumeration_and_Guessable_User_Account) no site. (Vale ressaltar que, na maioria dos casos, a prevenção de enumeração de nomes de usuário é uma defesa em profundidade e não deve ser uma prioridade alta para aplicativos web). Além disso, o invasor tende a priorizar senhas mais prováveis, utilizando vazamentos de senhas para testar senhas reutilizadas e tentando aquelas mais comuns.
3. **Força bruta offline:** Se o invasor conseguir obter uma cópia do banco de dados de senhas do aplicativo (por exemplo, via injeção de SQL), é provável que tente realizar um ataque de força bruta nas credenciais armazenadas. Dependendo de como as credenciais são armazenadas e dos recursos de hardware do invasor, os invasores podem tentar centenas de trilhões de senhas por segundo ou apenas algumas centenas. De qualquer forma, quando o invasor tiver o banco de dados de senhas, o aplicativo não poderá detectar ou interromper o ataque. Em geral, os invasores priorizam as senhas prováveis nesse ataque, mas, se tiverem muitos recursos ou se o algoritmo de armazenamento de senhas for fraco, o invasor poderá começar a enumerar todas as senhas possíveis.

### Credential strength

Most web applications use passwords for authentication, though techniques like WebAuthentication using security keys and extremely long lived authentication sessions combined with login links via email are gaining popularity. If a website uses passwords, it’s important that those passwords be strong. However, the definition of a “strong” password has shifted over the years. There are three primary methods that attackers uses to directly attack user passwords:

1. **Online guessing using password reuse** In this attack, an attacker uses known passwords associated with the user, and simply tries those passwords in the site’s login form. Since many people use the same passwords across multiple websites, this attack can be devastatingly effective. Usernames and passwords from compromised sites are widely available on the public web, dark web, and for sale on private websites. Attackers can simply enter all the known passwords for a given user; if the attacker is targeting a small number of users, this attack doesn’t even require automation.
2. **Online brute-force via credential stuffing** “Credential stuffing” is a type of attack where a software client (either a scripted web browser via something like [Selenium](https://www.selenium.dev/) or a custom script) will automatically attempt to log in to the target site. Additionally, these attacks can use a distributed set of proxy servers to appear to come from a variety of different computers. The rate of these attacks is generally limited by the speed of the web server and network latency, so attackers will generally be careful to choose only the most likely credentials to try. For instance, they will often limit the usernames to a targeted set, or to known good usernames if there is a [username enumeration vulnerability](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/03-Identity_Management_Testing/04-Testing_for_Account_Enumeration_and_Guessable_User_Account) on the site. (Note that in most cases, preventing username enumeration is defense in depth, and should not be a high priority for web applications.) Additionally, the attacker will attempt to prioritize likely passwords, using passwords dumps to try reused passwords, and trying commonly-used passwords.
3. **Offline brute-force** If the attacker managed to acquire a copy of the application’s passwords database (for example via SQL injection), they will likely attempt to brute-force the stored credentials. Depending on how the credentials are stored and the attacker’s hardware capabilities, attackers may be able to try hundreds of trillions of passwords per second, or hundreds. In any case, once the attacker has the password database, the application cannot detect or stop the attack. Attackers will generally prioritize likely passwords in this attack, but if they are very well funded or if the password storage algorithm is weak, the attacker can start enumerating all possible passwords.

Desses ataques, os ataques virtuais são muito mais comuns. Idealmente, os aplicativos não seriam vulneráveis a injeções de SQL, os membros internos não seriam comprometidos ou agiriam de forma maliciosa, e os backups de banco de dados nunca seriam perdidos. No entanto, seria irresponsável ignorar a possibilidade de um ataque offline. Com base nisso, as prioridades de um aplicativo web devem ser (em ordem):

1. **Impedir a reutilização de senhas, especialmente senhas comprometidas conhecidas**: Isso é impossível de ser feito completamente e também pode apresentar problemas de interface do usuário. No entanto, existem serviços como os do [Have I Been Pwned](https://haveibeenpwned.com/) (em inglês, [assinaturas para uso da API](https://haveibeenpwned.com/API/Key) começam em US$40/ano), [Hold Security](https://holdsecurity.com/solutions/credential-integrity-service/), [SpyCloud](https://spycloud.com/products/consumer-ato-prevention/), entre outros, que podem informar se um determinado nome de usuário e senha apareceram em um vazamento de senhas. [Compilações de vazamentos de senhas](https://www.troyhunt.com/introducing-306-million-freely-downloadable-pwned-passwords/) também podem ser baixadas e verificadas localmente.
2. **Prevenir o uso de senhas comuns**: Páginas que permitem que os usuários definam suas senhas devem comparar a senha do usuário com uma lista das senhas mais comuns (geralmente obtidas de vazamentos de senhas). Algumas dessas listas estão disponíveis no GitHub. Observe que os invasores também usarão as mesmas listas, portanto, bloquear apenas as 100 ou 1000 senhas mais comuns provavelmente não será muito eficaz.
3. **Garantir que as senhas tenham entropia suficiente para resistir a ataques de força bruta**: Embora uma senha como `w)*l3` não seja comum, ela ainda pode ser descoberta rapidamente em um ataque de força bruta. A definição de um tamanho mínimo de senha pode ajudar a reduzir os ataques de força bruta.

Certamente, essas prioridades devem ser equilibradas com as necessidades do usuário, que pode precisar recorrer a um gerenciador de senhas ou, caso contrário, memorizar sua senha. Além disso, as senhas como método de autenticação apresentam várias limitações. A próxima seção aborda a autenticação multifatorial e alternativas às senhas.

Para mais informações sobre a força de senhas, consulte [este resumo das diretrizes de autenticação do NIST do governo dos EUA](https://blog.netwrix.com/2022/11/14/nist-password-guidelines/).


### Autenticação Multifatorial

Como você deve ter percebido na seção anterior, a segurança da senha é muito difícil. Isso piora quando você considera os ataques de engenharia social, como o phishing. 

#### Phishing e ataques relacionados

O [phishing](https://pt.wikipedia.org/wiki/Phishing) faz parte de uma classe de ataques de engenharia social que os invasores usam para atacar indivíduos. Embora o phishing possa ter muitos objetivos (como convencer os usuários a instalar malware em seus computadores ou transferir dinheiro para os invasores), o objetivo que nos interessa é roubar as senhas dos usuários. Embora o phishing geralmente se refira a ataques lançados por e-mail, técnicas semelhantes podem ser usadas em uma variedade de meios de comunicação, como SMS, WhatsApp, Signal e até mesmo QR Code.

Em uma campanha típica de phishing para roubo de credenciais, os invasores enviam e-mails às vítimas se passando por um site legítimo. O e-mail incluirá uma ação solicitada (como a solicitação de alteração de senha ou a confirmação de uma notificação), juntamente com um link para um site controlado pelo invasor, que apresenta uma página de login que parece legítima. Se a vítima clicar no link e, em seguida, inserir sua senha no site, a senha será enviada ao invasor. (Para mais informações sobre phishing, consulte a [trilha de aprendizagem Investigando Infraestruturas Maliciosas](/pt-br/learning-path/1/).)

Os ataques de phishing são de custo extremamente baixo para os invasores e tendem a ser extremamente eficazes. Quando o invasor tiver a senha da vítima, ele poderá fazer login no site de destino como se fosse a vítima. Com a preparação, o invasor pode usar a automação para executar imediatamente ações na conta da vítima, incluindo a alteração do endereço de e-mail e da senha do usuário para bloquear a vítima em sua própria conta. 

Considerando o perigo dos ataques de phishing e a total incapacidade da autenticação por senha de impedir o phishing, qualquer esquema de autenticação multifatorial deve ser avaliado em relação à sua resistência a phishing. 

#### Visão geral da autenticação multifatorial

Tradicionalmente, há três tipos de elementos (chamados fatores) que podem ser usados para autenticação:

- **Algo que você sabe**: A forma mais comum disso é a senha. Ela é algo que você (e, com sorte, somente você) sabe. Isso é muito popular porque é muito fácil gerar uma senha secreta e, em geral, fácil de alterar.
- **Algo que você tem**: A forma mais comum é uma chave. Ela é algo que você tem e que é difícil de reproduzir. É menos popular porque é fácil de perder, difícil de configurar inicialmente e difícil de mudar.
- **Algo que você é**: A forma mais conhecida é a impressão digital, mas o reconhecimento facial está cada vez mais popular. Eles são algo intrínseco a você. Elas são surpreendentemente fáceis de “perder” (como uma queimadura que danifica as impressões digitais), extremamente difíceis de alterar intencionalmente e a verificação tende a ser propensa a erros.

A MFA (autenticação multifatorial) combina dois ou mais desses fatores para fortalecer o sistema de autenticação. Há muitos exemplos de autenticação multifatorial na vida cotidiana. O uso de um caixa eletrônico requer algo que você tem (o cartão) e algo que você sabe (seu PIN). Muitos sistemas de controle de acesso a edifícios têm um crachá para abrir uma porta, mas esse crachá também mostra o rosto do portador do crachá em um visor que um guarda pode ver, combinando algo que você tem (o crachá) com algo que você é (seu rosto).

No restante desta subseção, discutiremos uma variedade de métodos comuns de MFA na web.

#### Perguntas Secretas
Embora isso tecnicamente não seja MFA (combina várias coisas que o usuário sabe), era muito popular no passado e ainda é usado em muitos contextos. O uso de perguntas secretas como parte da autenticação oferece algum grau de defesa contra a reutilização de senhas e ataques de adivinhação de senhas. Além disso, oferece muito pouca proteção. É quase inútil contra phishing. O site do invasor pode simplesmente tentar fazer login no site real e, em seguida, voltar atrás e fazer as perguntas secretas ao usuário. Além disso, conforme discutido na subseção Redefinição de Senha acima, as respostas da pergunta secreta são frequentemente adivinháveis. Por esses motivos, as perguntas secretas não são um método de MFA forte.

#### Códigos SMS

Um método real de MFA de uso comum é enviar um código por mensagem de texto ao usuário quando ele faz login e, em seguida, exigir esse código para concluir o processo de login. Isso combina algo que o usuário sabe (sua senha) com algo que ele tem (o telefone que recebe mensagens em um determinado número). Infelizmente, os códigos SMS são quase inúteis contra phishing. Quando o usuário fizer login no site falso controlado pelo invasor, o site falso fará login no site real. O site real enviará uma mensagem de texto ao usuário, e este, por sua vez, digitará o código no site falso. O site falso usa o código no site real e é então conectado como a vítima. Além disso, os ataques de [troca de SIM](https://en.wikipedia.org/wiki/SIM_swap_scam) podem permitir que os invasores assumam o controle do número de telefone da vítima, permitindo que o invasor receba mensagens SMS destinadas a ela. Por esses motivos, os códigos SMS não são um método de MFA forte para sites confidenciais ou importantes.

#### TOTP

TOTP significa Time-based One-Time Password (senha de uso único baseada em tempo). Para iniciar o sistema, o servidor e um dispositivo controlado pelo usuário trocam um segredo criptográfico (a “semente”) e sincronizam seus relógios. Então, quando um usuário deseja se autenticar em um site, o dispositivo do usuário executa uma operação criptográfica na semente e na hora atual, gerando um código que só é válido por segundos ou minutos. O servidor executa a mesma operação e a utiliza para verificar o código do usuário. No passado, o sistema TOTP mais comum era o RSA SecureIDs, que era caro. Atualmente, a maioria dos sistemas TOTP é executada em smartphones. Alguns exemplos são o Google Authenticator e o Authy. Independentemente disso, o TOTP funciona como algo que você tem (a semente TOTP) para fins de autenticação.

Assim como os códigos SMS, o TOTP também é vulnerável a phishing. O site falso controlado pelo invasor pode simplesmente solicitar ao usuário o código TOTP e usá-lo para fazer login no site real. Por esse motivo, o TOTP não é um método MFA forte para sites sensíveis ou importantes. Observe também que, se um usuário perder ou apagar o telefone, é improvável que ele consiga se autenticar no site, pois perdeu a semente do TOTP.

#### Chaves de Segurança
As chaves de segurança (às vezes chamadas de U2F, FIDO, WebAuthentication, Yubikeys etc.) são dispositivos que [implementam um protocolo de autenticação criptográfica](https://developers.yubico.com/U2F/Protocol_details/Overview.html). Quando você registra uma chave de segurança em um site, o site e a chave trocam a chave pública. Para autenticação subsequente, o servidor apresenta um desafio assinado ao dispositivo. O dispositivo verifica a assinatura do site e, em seguida, responde com uma resposta assinada. Por fim, o servidor verifica a assinatura do dispositivo. Isso prova para o servidor que você está de posse da chave que foi registrada inicialmente, tornando-a algo que você tem. Tradicionalmente, as chaves de segurança eram dispositivos autônomos que se comunicavam com um computador ou dispositivo móvel por USB ou NFC, embora o suporte ao uso de smartphones e computadores esteja disponível em algumas configurações.

Diferentemente das outras MFA discutidas aqui, as chaves de segurança são resistentes a phishing. A chave aqui é que o desafio assinado inclui a identidade do site que está solicitando a autenticação. Para um site válido, isso corresponderá a uma chave de site existente no dispositivo. Para um site semelhante, controlado por um invasor, o site não corresponderá a nenhuma chave de site existente e, portanto, não haverá MFA. Assim, o invasor pode ter a senha do usuário, mas não conseguirá concluir a autenticação no site de destino, pois não há como o invasor concluir o processo de MFA. Como ponto negativo, as chaves de segurança podem ser perdidas. Geralmente, os sites que usam chaves de segurança permitem que os usuários registrem várias chaves, de modo que, se uma delas for perdida ou danificada, uma cópia de segurança poderá ser usada.

#### Senhas de Uso Único

As senhas pré-geradas de uso único às vezes são usadas como backup para outros métodos de MFA e eram [usadas para aplicativos de alta segurança](https://www.researchgate.net/figure/A-typical-one-time-password-OTP-scheme-used-by-European-banks-Stahlberg-2007-p-2_fig3_49279643) antes do uso generalizado de smartphones. Os sites modernos frequentemente se referem a elas como “códigos de backup”. O servidor gerará uma lista de códigos, os armazenará e os apresentará ao usuário. O usuário geralmente imprime e armazena o papel em um local seguro. Toda vez que um código é usado, ele é marcado como inválido pelo servidor. Eles estão sujeitos aos mesmos pontos fracos do TOTP, mas têm a vantagem perversa de serem muito inconvenientes. Por isso, eles são frequentemente usados como backup para outros métodos de MFA. A esperança é que seu uso seja raro o suficiente para que, se um usuário for solicitado a inserir um código de backup, ele pare e examine minuciosamente o site solicitante, tornando menos provável que um ataque de phishing seja bem-sucedido. Exemplos de sites que usam códigos de backup são o [Gmail](https://support.google.com/accounts/answer/1187538?hl=pt-br&co=GENIE.Platform%3DDesktop) e o [GitHub](https://docs.github.com/pt/authentication/securing-your-account-with-two-factor-authentication-2fa/configuring-two-factor-authentication-recovery-methods). 

Para saber um pouco mais sobre autenticação, consulte a folha de [dicas de autenticação da OWASP](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html) e a [folha de dicas de MFA da OWASP](https://cheatsheetseries.owasp.org/cheatsheets/Multifactor_Authentication_Cheat_Sheet.html). Para um estudo mais detalhado, consulte a [Trilha de Aprendizagem de Avaliação de Segurança de Aplicativos Web](/en/learning-path/5/).


### Fixação de sessão

A [fixação de sessão](https://owasp.org/www-community/attacks/Session_fixation) é um conceito importante na segurança da web. Refere-se a um ataque em que um invasor define o identificador de sessão de um usuário (ID de sessão) com um valor conhecido pelo invasor. Isso pode ocorrer por vários meios, como ataques de phishing ou pela exploração de vulnerabilidades no aplicativo web. O ataque envolve adquirir um ID de sessão válido, persuadir um usuário a se autenticar com ele e, em seguida, assumir o controle da sessão aproveitando o ID de sessão conhecido. Isso exige que o invasor forneça um ID de sessão de aplicativo web genuína e manipule o navegador da pessoa-alvo para usá-la. Ele pode, então, sequestrar a sessão do usuário, obtendo acesso não autorizado à conta do usuário.

A fixação de sessão explora os pontos fracos na forma como um aplicativo web gerencia os IDs de sessão. Essencialmente, o aplicativo vulnerável não atribui um novo ID de sessão durante a autenticação do usuário, permitindo que o invasor utilize um ID de sessão existente. Diferentemente do Sequestro de Sessão, que ocorre após o login do usuário, a Fixação de Sessão estabelece o controle sobre uma sessão antes da autenticação do usuário.

Várias técnicas podem ser usadas para executar esse ataque, dependendo de como o aplicativo web lida com os tokens de sessão:

1. Token de sessão no argumento da URL: O invasor envia o ID da sessão para a vítima por meio de um link, fazendo com que a vítima acesse o site através da URL comprometida.
2. Token de sessão em um campo oculto do formulário: O invasor engana a vítima para que ela se autentique no servidor web alvo utilizando um formulário de login desenvolvido por ele, que pode estar hospedado em um servidor ilegítimo ou dentro de um e-mail com formatação HTML.
3. ID da sessão em um cookie:
  - Script do lado do cliente: Utiliza scripts do lado do cliente para injetar código malicioso, geralmente por meio de ataques de XSS (Cross-site Scripting), em um hiperlink, fixando um ID de sessão no cookie da pessoa-alvo usando a função document.cookie.
  - &lt;meta> tag: Outra forma de ataque de injeção de código, que é mais potente do que o XSS, pois não pode ser prontamente desativado ou negado pelos navegadores.
  - Resposta do cabeçalho HTTP: Explora as respostas do servidor para incorporar o ID da sessão no navegador da vítima, incluindo o parâmetro “Set-Cookie” na resposta do cabeçalho HTTP.

Muitas estruturas e bibliotecas da web oferecem recursos para ajudar os desenvolvedores a implementar o gerenciamento seguro de sessões, o que ajuda a atenuar as vulnerabilidades de fixação de sessão. Essas estruturas geralmente incluem mecanismos internos para gerar, armazenar e validar IDs de sessão. Elas podem permitir a configuração da expiração da sessão, a regeneração de IDs de sessão após a autenticação e a garantia da transmissão segura dos dados da sessão. No entanto, pode ser útil para os desenvolvedores implementar efetivamente essas práticas também no código de seus aplicativos, garantindo a configuração e o uso adequados para atenuar a fixação de sessão e outras vulnerabilidades. Atualizações regulares de bibliotecas e estruturas são fundamentais, pois elas podem conter correções ou melhorias relacionadas à segurança do gerenciamento de sessões.

#### Prevenção de Vulnerabilidades de Fixação de Sessão

Para a maioria dos administradores de servidores web, a melhor maneira de atenuar as vulnerabilidades de fixação de sessão é garantir que a pilha de software que você usa para autenticação contenha atenuações contra esses ataques e também esteja atualizada. Se você estiver usando uma biblioteca que tenha uma vulnerabilidade que permita a fixação de sessão, certifique-se de atualizá-la assim que possível.

Aplicativos web, bibliotecas e estruturas adotam várias medidas para atenuar os ataques de fixação de sessão. Isso inclui a geração de IDs de sessão aleatórios para cada sessão de usuário, a expiração de sessões após um período de inatividade e a implementação de medidas como a regeneração de ID de sessão após a autenticação. Seu aplicativo web deve sempre usar HTTPS para segurança e privacidade, além de oferecer uma camada adicional de proteção contra ataques de fixação de sessão: é muito mais difícil interceptar IDs de sessão em trânsito se a comunicação entre o cliente e o servidor for criptografada. Por fim, seu aplicativo web também deve rejeitar tokens de sessão impostos externamente, o que também ajudará a proteger contra esse tipo de ataque.

Se você for programar um aplicativo web com recursos de autenticação, recomendamos que leia [este artigo](https://secureteam.co.uk/articles/understanding-session-fixation-attacks/) e implemente as seguintes medidas recomendadas, que ajudam a proteger o aplicativo web contra ataques de fixação de sessão:

1. Evite aceitar IDs de sessão por meio de parâmetros GET ou POST, pois isso reduz o risco de exploração ao minimizar a dependência das vulnerabilidades do navegador. Além disso, todos os IDs de sessão devem ser gerados pelo servidor, eliminando qualquer necessidade de IDs de sessão propostos pelo cliente.
2. Após o login, inicie uma alteração na ID da sessão gerando uma nova ID no servidor e atualizando-a como um cookie. Ao mesmo tempo, invalide qualquer sessão existente associada ao usuário.
3. Incorpore uma funcionalidade de logout que permita aos usuários encerrar suas sessões imediatamente, garantindo assim o encerramento imediato da sessão no lado do servidor, em vez de simplesmente excluir o cookie do navegador. Além disso, implemente mecanismos de expiração de sessão para invalidar automaticamente os dados da sessão após um lapso de tempo predefinido, limitando assim a janela de oportunidade para que os invasores aproveitem as sessões comprometidas.


## Prática 

### Exercício 1: Controles de acesso quebrados

Acesse o site Try Hack Me, crie uma conta e vá até [a sala chamada OWASP Broken Access Control](https://tryhackme.com/r/room/owaspbrokenaccesscontrol) e siga as instruções.

### Exercício 2: Utilização de tabelas arco-íris para entender melhor os mecanismos não seguros de armazenamento de senhas (opcional)

Observação: _embora esse exercício ofereça uma ótima oportunidade de aprendizado sobre como os invasores podem decifrar senhas mal protegidas, ele exige bastante espaço livre em disco e usa uma ferramenta que só está disponível no Windows e no Linux. Como talvez nem todos os alunos consigam fazer esse exercício prático, nós o marcamos como opcional. Incentivamos os alunos que desejam saber mais sobre as tabelas arco-íris e o armazenamento seguro de senhas, tanto os que podem quanto os que não podem fazer o exercício abaixo, a consultar leituras adicionais em publicações [como esta](https://cybr.com/certifications-archives/hash-tables-rainbow-table-attacks-and-salts/)._

Ao autenticar usuários, precisamos de uma maneira de verificar se eles inseriram as credenciais corretas. A maneira mais fácil de fazer isso é armazenar a própria senha em um banco de dados. Isso é inseguro, pois qualquer pessoa com acesso a esse banco de dados poderia saber as senhas de texto simples dos usuários, e elas seriam reveladas em caso de vazamento ou vulnerabilidade do aplicativo. Uma proteção simples pode ser implementada armazenando [um valor de hash](https://pt.wikipedia.org/wiki/Fun%C3%A7%C3%A3o_hash_criptogr%C3%A1fica) da senha. Este exercício demonstrará como é fácil quebrar essa proteção e aprender senhas de texto simples a partir de valores com hash. **O objetivo deste exercício não é fazer com que os alunos acreditem que todos os mecanismos de autenticação podem ser facilmente violados, mas sim demonstrar como é fácil violar senhas que foram apenas transformadas em hash sem nenhum mecanismo de segurança adicional, como o sal.**

[As tabelas arco-íris](https://pt.wikipedia.org/wiki/Tabela_arco-%C3%ADris) são uma maneira inteligente de reduzir o tempo de computação em troca de espaço em disco ao tentar aplicar força bruta a uma senha com hash. Elas consistem em cadeias pré-calculadas de hashes que podem ser usadas para descobrir um valor hash (a senha de texto simples).

#### Exercício

Dado o valor de hash `168f3c743786fea2e04aeeee33e112da` , tente descobrir a senha usando tabelas arco-íris. Use o [RainbowCrack](http://project-rainbowcrack.com/). A maneira mais fácil de executar o RainbowCrack pode ser usar o [Kali Linux](https://www.kali.org/) em uma VM ou inicializado a partir de um LiveUSB (consulte os links na seção de Informações Básicas no início desta trilha de aprendizagem para obter mais informações). O algoritmo de hash é MD5 e o hash é sem sal.

_Dica_: a senha é alfanumérica em letras minúsculas, com no máximo 6 caracteres. Depois de instalar o RainbowCrack, você pode usar o seguinte comando para gerar a tabela necessária:

```
rtgen md5 loweralpha-numeric 1 6 0 3800 1000000 0
```
_(Opcional)_ Tente usar a tabela gerada para quebrar outro hash: `feadfd87d487818698d63aedf385c4e2`.

_Dica_: se isso não funcionar, você pode tentar gerar mais tabelas para aumentar a taxa de sucesso do seu conjunto de tabelas (cobertura). Basta alterar o quinto parâmetro do comando rtgen para diferentes valores (tente de 1 a 5).

Tente quebrar o seguinte hash salgado: `93e99d25dd6e8f524f23814908b6c039`


#### O passo a passo

A geração de uma tabela arco-íris requer a especificação de um algoritmo de hash a ser usado, o comprimento máximo dos valores de texto simples nos quais estamos interessados e seu conjunto de caracteres. Esses parâmetros influenciam apenas o tempo que leva para uma tabela ser gerada (quantidade de cálculos necessários).

As tabelas para senhas mais curtas com conjuntos de caracteres menores (por exemplo, somente letras minúsculas) levarão menos tempo para serem geradas do que as tabelas para senhas longas com números e caracteres especiais.

Além disso, você precisa escolher quantas cadeias gerar e de que comprimento. Esses parâmetros são mais complexos de explicar (consulte o [artigo técnico de Philippe Oechslin](https://www.iacr.org/archive/crypto2003/27290615/27290615.pdf) para mais informações), mas têm efeitos na cobertura da tabela.   Apenas um subconjunto de todos os valores possíveis de texto simples é incluído em cada tabela arco-íris.

Quanto maiores forem os valores desses parâmetros, maior e mais cara (em termos de tempo de CPU) será a tabela, mas também mais valores de texto simples poderão ser descobertos com ela.

Tabelas pré-calculadas para diferentes funções de hash, comprimentos de senha e conjuntos de caracteres podem ser baixados da internet ([por exemplo](https://freerainbowtables.com/)) ou obtidas em conferências de segurança de TI e encontros de hackers ([como em](https://dcddv.org/)). Para os fins deste exercício, vamos gerar as nossas próprias!

Você pode instalar o rainbowcrack em seu sistema ou usar o Kali Linux Live. No Kali, abra uma janela de terminal e execute:

```
sudo apt update
sudo apt install rainbowcrack
```

Isso instalará o software. Você pode usar o comando `rtgen` para gerar tabelas. De acordo [com este manual](http://project-rainbowcrack.com/generate.htm), o comando usa vários parâmetros:

```
rtgen hash_algorithm charset plaintext_len_min plaintext_len_max table_index chain_len chain_num part_index
```

Usaremos o MD5 como nosso algoritmo de hash. Procuraremos senhas com tamanho de 1 a 6 caracteres. Usaremos o conjunto de caracteres `loweralpha-numeric`, que inclui apenas letras minúsculas e números. Usaremos 3800 para o comprimento da corrente e 1000000 para o número de correntes.

Para gerar nossa primeira execução de tabela:

```
sudo rtgen md5 loweralpha-numeric 1 6 0 3800 1000000 0
```

Esse comando pode demorar um pouco para ser executado, dependendo da configuração de seu sistema.

Após a geração, é necessária mais uma etapa antes de podermos usar nossas novas tabelas:

```
sudo rtsort
```

Isso classificará os dados para tornar o uso da tabela mais rápido. O `rtcrack` se recusará a trabalhar com tabelas não classificadas.

Vamos tentar fazer o nosso primeiro hash:

```
rcrack . -h 168f3c743786fea2e04aeeee33e112da
```

Isso deve levar apenas um momento e revelar nossa senha em texto simples: 

```
1 rainbow tables found
memory available: 11361376665 bytes
memory for rainbow chain traverse: 60800 bytes per hash, 60800 bytes for 1 hashes
memory for rainbow table buffer: 2 x 16000016 bytes
disk: ./md5_loweralpha-numeric#1-6_0_3800x1000000_0.rt: 16000000 bytes read
disk: finished reading all files


plaintext of 168f3c743786fea2e04aeeee33e112da is 1nfus3


statistics
----------------------------------------------------------------
plaintext found:                             1 of 1
total time:                                  0.33 s
time of chain traverse:                      0.22 s
time of alarm check:                         0.11 s
time of disk read:                           0.00 s
hash & reduce calculation of chain traverse: 7216200
hash & reduce calculation of alarm check:    4133612
number of alarm:                             3194
performance of chain traverse:               32.80 million/s
performance of alarm check:                  36.91 million/s


result
----------------------------------------------------------------
168f3c743786fea2e04aeeee33e112da  1nfus3  hex:316e66757333
```

Sucesso! Agora, vamos tentar o nosso segundo hash:

```
rcrack . -h feadfd87d487818698d63aedf385c4e2
```

O resultado:

```
1 rainbow tables found
memory available: 11236982784 bytes
memory for rainbow chain traverse: 60800 bytes per hash, 60800 bytes for 1 hashes
memory for rainbow table buffer: 2 x 16000016 bytes
disk: ./md5_loweralpha-numeric#1-6_0_3800x1000000_0.rt: 16000000 bytes read
disk: finished reading all files


statistics
----------------------------------------------------------------
plaintext found:                             0 of 1
total time:                                  0.31 s
time of chain traverse:                      0.20 s
time of alarm check:                         0.11 s
time of disk read:                           0.00 s
hash & reduce calculation of chain traverse: 7216200
hash & reduce calculation of alarm check:    4238786
number of alarm:                             3324
performance of chain traverse:               36.08 million/s
performance of alarm check:                  37.18 million/s


result
----------------------------------------------------------------
feadfd87d487818698d63aedf385c4e2  <not found>  hex:<not found>
```

Não encontramos nosso hash nessa tabela. Vamos gerar mais algumas tabelas com a esperança de aumentar nossa cobertura. Usaremos o mesmo comando `rtgen`, alterando apenas o parâmetro  `table_index`:

```
sudo rtgen md5 loweralpha-numeric 1 6 1 3800 1000000 0
sudo rtgen md5 loweralpha-numeric 1 6 2 3800 1000000 0
sudo rtgen md5 loweralpha-numeric 1 6 3 3800 1000000 0
sudo rtgen md5 loweralpha-numeric 1 6 4 3800 1000000 0
sudo rtgen md5 loweralpha-numeric 1 6 5 3800 1000000 0
sudo rtsort .
```

Vamos tentar novamente:

```
rcrack . -h feadfd87d487818698d63aedf385c4e2
```

O resultado:

```
6 rainbow tables found
memory available: 10784174899 bytes
memory for rainbow chain traverse: 60800 bytes per hash, 60800 bytes for 1 hashes
memory for rainbow table buffer: 6 x 16000016 bytes
disk: ./md5_loweralpha-numeric#1-6_0_3800x1000000_0.rt: 16000000 bytes read
disk: ./md5_loweralpha-numeric#1-6_1_3800x1000000_0.rt: 16000000 bytes read
disk: ./md5_loweralpha-numeric#1-6_2_3800x1000000_0.rt: 16000000 bytes read
disk: ./md5_loweralpha-numeric#1-6_3_3800x1000000_0.rt: 16000000 bytes read
disk: ./md5_loweralpha-numeric#1-6_4_3800x1000000_0.rt: 16000000 bytes read
disk: ./md5_loweralpha-numeric#1-6_5_3800x1000000_0.rt: 16000000 bytes read
disk: finished reading all files
plaintext of feadfd87d487818698d63aedf385c4e2 is trolo0


statistics
----------------------------------------------------------------
plaintext found:                             1 of 1
total time:                                  0.54 s
time of chain traverse:                      0.41 s
time of alarm check:                         0.13 s
time of disk read:                           0.02 s
hash & reduce calculation of chain traverse: 14432400
hash & reduce calculation of alarm check:    4766264
number of alarm:                             4606
performance of chain traverse:               35.46 million/s
performance of alarm check:                  36.66 million/s


result
----------------------------------------------------------------
feadfd87d487818698d63aedf385c4e2  trolo0  hex:74726f6c6f30
```

Entendido! Tabelas adicionais aumentaram a cobertura e o hash foi descoberto.

Um aprimoramento do uso de hashing simples para proteção de senhas é chamado de “salgar” os hashes, ou seja, adicionar um segredo específico do aplicativo ao valor do texto simples. Isso aumenta o comprimento e o conjunto de caracteres do valor hash, tornando inviável uma abordagem de tabela arco-íris. Tentar o terceiro hash (com sal) dado neste exercício falhará com este método, pois exigiria tabelas arco-íris maiores do que as que podem ser geradas (e armazenadas) atualmente.

## Teste de capacitação

### Exercício 1: Recapitulação

Conclua o exercício que descrevemos acima: execute uma injeção de SQL no DVWA e compare os hashes que você descobriu com os que encontrou em um site de pesquisa de hash.

### Exercício 2: Teste de múltipla escolha

A autenticação quebrada representa uma ameaça significativa à segurança dos aplicativos web, permitindo que os invasores comprometam as credenciais do usuário, sequestrem sessões e obtenham acesso não autorizado a informações confidenciais. Neste conjunto de perguntas de múltipla escolha, você pode explorar o conceito de autenticação interrompida e se aprofundar nos vários riscos associados a essa vulnerabilidade. Além disso, se você tiver um mentor ou um colega, poderá examinar os diferentes tipos de falhas que podem levar ao comprometimento dos mecanismos de autenticação e discutir estratégias específicas de atenuação adaptadas para lidar com cada uma dessas vulnerabilidades de forma eficaz.

Com estas perguntas, aprimore seu conhecimento sobre a segurança de aplicativos web e aprenda a atenuar os riscos apresentados por uma autenticação interrompida:


**Questão 1**. O que é autenticação interrompida no contexto da segurança de aplicativos web? \

A) Uma vulnerabilidade que permite que os invasores executem código arbitrário no servidor. \
B) Uma exploração que concede acesso não autorizado a partes restritas de um aplicativo web. \
C) Um ponto fraco no mecanismo de autenticação de um aplicativo web, que leva ao comprometimento das credenciais do usuário. \
D) Uma falha de segurança que permite que os invasores interceptem a comunicação entre o cliente e o servidor.


{{< question title="Resposta" >}}
C) Um ponto fraco no mecanismo de autenticação de um aplicativo web, que leva ao comprometimento das credenciais do usuário.
{{< /question >}}

**Questão 2**. Quais são os possíveis riscos associados às vulnerabilidades de autenticação quebrada? \

A) Acesso não autorizado a dados confidenciais e contas de usuários. \
B) Exposição de tokens de sessão, levando a ataques de sequestro de sessão. \
C) Comprometimento das credenciais do usuário, incluindo senhas e tokens de autenticação. \
D) Todas as opções anteriores.

{{< question title="Resposta" >}}
D) Todas as opções anteriores.
{{< /question >}}

**Questão 3**. Qual das opções a seguir NÃO é um exemplo de mecanismo de atenuação para vulnerabilidades de autenticação interrompida? \

A) Implementar a autenticação multifatorial (MFA) para contas de usuários. \
B) Aplicar políticas de senhas fortes, incluindo a troca regular de senhas. \ 
C) Desativar o HTTPS para evitar a interceptação de credenciais de autenticação. \
D) Implementar mecanismos de bloqueio de contas para evitar ataques de força bruta.


{{< question title="Resposta" >}}
C) Desativar o HTTPS para evitar a interceptação de credenciais de autenticação. \
{{< /question >}}

**Questão 4**. Que tipo de falha pode levar a mecanismos de autenticação comprometidos, permitindo que invasores adivinhem ou quebrem senhas de usuários? \

A) Fixação de Sessão \
B) Falsificação de Solicitação Entre Sites (CSRF) \
C) Complexidade Insuficiente de Senha \
D) Cross-Site Scripting (XSS)


{{< question title="Resposta" >}}
C) Complexidade Insuficiente de Senha
{{< /question >}}

**Questão 5**. Qual é um exemplo específico de uma estratégia de mitigação para resolver a falha de complexidade insuficiente de senha? \

A) Implementar desafios CAPTCHA durante o processo de login. \
B) Aplicar requisitos de comprimento e complexidade de senha. \ 
C) Criptografar tokens de autenticação para evitar interceptação. \
D) Colocar em lista branca endereços IP confiáveis para acessar a página de login.


{{< question title="Resposta" >}}
B) Aplicar requisitos de comprimento e complexidade de senha.
{{< /question >}}

**Questão 6**. Qual estratégia de mitigação visa impedir que invasores explorem vulnerabilidades de fixação de sessão? \

A) Implementar mecanismos de expiração de sessão. \
B) Criptografar cookies de sessão usando HTTPS. \
C) Regenerar identificadores de sessão após autenticação bem-sucedida. \
D) Aplicar políticas de senhas fortes para as contas de usuário.


{{< question title="Resposta" >}}
C) Regenerar identificadores de sessão após autenticação bem-sucedida.
{{< /question >}}

**Questão 7**. Que tipo de falha pode levar a mecanismos de autenticação comprometidos, permitindo que invasores sequestrem sessões ativas de usuários? \

A) Expiração de Sessão Insuficiente \
B) Armazenamento de Token Inseguro  \
C) Cross-Site Scripting (XSS) \
D) Falsificação de Solicitação entre Sites (CSRF)

{{< question title="Resposta" >}}
A) Expiração de Sessão Insuficiente
{{< /question >}}

**Questão 8**. Qual estratégia de mitigação resolve a falha de armazenamento inseguro de tokens ao gerenciar os tokens de autenticação de forma segura? \

A) Armazenar tokens em texto simples dentro de cookies no lado do cliente. \
B) Criptografar tokens usando um algoritmo de criptografia simétrica. \
C) Implementar algoritmos seguros de hash de senha. \
D) Usar cabeçalhos HTTP para transmitir tokens de autenticação.


{{< question title="Resposta" >}}
B) Criptografar tokens usando um algoritmo de criptografia simétrica. \
{{< /question >}}

**Questão 9**. Qual é um exemplo específico de uma estratégia de mitigação para prevenir ataques de fixação de sessão? \

A) Rotacionar identificadores de sessão após um login bem-sucedido.
B) Implementar autenticação multifatorial (MFA). \
C) Usar desafios CAPTCHA para verificar a autenticidade do usuário. \
D) Aplicar validação rigorosa de entrada no formulário de login.


{{< question title="Resposta" >}}
A) Rotacionar identificadores de sessão após um login bem-sucedido.
{{< /question >}}

**Questão 10**. Que tipo de falha pode levar a mecanismos de autenticação comprometidos, permitindo que invasores forjem solicitações para o aplicativo web enquanto estão autenticados como outro usuário?
A) Expiração de Sessão Insuficiente
B) Proteção Insuficiente na Camada de Transporte   
C) Cross-Site Scripting (XSS)   
D) Falsificação de Solicitação entre Sites (CSRF)


{{< question title="Resposta" >}}
D) Falsificação de Solicitação entre Sites (CSRF)
{{< /question >}}



## Recursos de aprendizagem

{{% resource title="Preenchimento de Credenciais" languages="Inglês, árabe, chinês, espanhol, francês" cost="Grátis" description="Uma visão geral de um ataque no qual o invasor testa muitas combinações de login, por exemplo, aquelas provenientes de uma violação de dados" url="https://en.wikipedia.org/wiki/Credential_stuffing" %}}

{{% resource title="Função hash criptográfica" languages="31 idiomas" cost="Grátis" description="Uma visão geral do que são funções hash criptográficas e por que elas são tão importantes para a segurança." url="https://pt.wikipedia.org/wiki/Fun%C3%A7%C3%A3o_hash_criptogr%C3%A1fica" %}}

{{% resource title="Tabelas arco-íris" languages="21 idiomas" cost="Grátis" description="Uma lista de funções de hash pré-computadas que podem ser usadas na tentativa de forçar conteúdo criptografado por força bruta." url="https://pt.wikipedia.org/wiki/Tabela_arco-%C3%ADris" %}}

{{% resource title="Sal" languages="23 idiomas" cost="Grátis" description="Um sal consiste em um dado adicionado a uma senha ou outra informação antes de ser criptografada. Usá-lo torna muito mais difícil para um invasor utilizar tabelas arco-íris." url="https://pt.wikipedia.org/wiki/Sal_(criptografia)" %}}

{{% resource title="Crypt tradicional" languages="Inglês" cost="Grátis" description="Um breve olhar sobre os primeiros algoritmos usados para criptografar senhas na década de 1970. Não é mais utilizado." url="https://www.usenix.org/legacy/publications/library/proceedings/usenix99/full_papers/provos/provos_html/node9.html" %}}

{{% resource title="Respostas criptográficas corretas" languages="Inglês" cost="Grátis" description="Uma lista das soluções criptográficas que seria prudente usar nos dias de hoje." url="https://www.latacora.com/blog/2018/04/03/cryptographic-right-answers/" %}}

{{% resource title="Pesquisa de hash" languages="Inglês" cost="Grátis" description="Uma ferramenta que faz pesquisas reversas de hashes e pode ser útil para trabalhar com DVWA e ferramentas semelhantes." url="https://www.whatsmyip.org/hash-lookup/" %}}

{{% resource title="Guia de Armazenamento de Senhas e Guia de Senha Esquecida, Recurso 1" languages="Inglês" cost="Grátis" description="Uma série de práticas recomendadas sobre como armazenar senhas criptografadas e sobre como gerenciar a recuperação de senhas." url="https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html" %}}

{{% resource title="Guia de Armazenamento de Senhas e Guia de Senha Esquecida, Recurso 2" languages="Inglês" cost="Grátis" description="Uma série de práticas recomendadas sobre como armazenar senhas criptografadas e sobre como gerenciar a recuperação de senhas." url="https://cheatsheetseries.owasp.org/cheatsheets/Forgot_Password_Cheat_Sheet.html" %}}

{{% resource title="Fraude de SMS internacional" languages="Inglês" cost="Grátis" description="Um exemplo de como as mensagens SMS podem ser usadas de forma abusiva por invasores e um bom estudo de caso sobre o motivo pelo qual não devemos responder com SMS para fins de autenticação." url="https://www.openmindnetworks.com/blog/international-sms-fraud-by-brian-kelly-cto-and-co-founder/" %}}

{{% resource title="Selenium" languages="Inglês" cost="Grátis" description="Uma ferramenta para automatizar tarefas do navegador da web que pode ser usada para testes." url="https://www.selenium.dev/" %}}

{{% resource title="Teste de Enumeração de Conta e Conta de Usuário Adivinháve" languages="Inglês" cost="Grátis" description="Outro fluxo de trabalho para teste de segurança de aplicativos web, desta vez para verificar se é possível fazer com que o aplicativo enumere nomes de usuário." url="https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/03-Identity_Management_Testing/04-Testing_for_Account_Enumeration_and_Guessable_User_Account" %}}

{{% resource title="Have I Been Pwned" languages="Inglês" cost="Gratuito para pequenas quantidades de consultas" description="Um serviço fantástico e de boa reputação para verificar se um determinado nome de usuário foi mencionado em alguma violação de dados." url="https://haveibeenpwned.com/" %}}

{{% resource title="Apresentando 306 milhões de pwned para download gratuito" languages="Inglês" cost="Grátis" description="Um post no blog de Troy Hunt, fundador do Have I Been Pwned, sobre como ele encontrou milhões de senhas vazadas e como essa base de dados poderia ser utilizada." url="https://www.troyhunt.com/introducing-306-million-Grátisly-downloadable-pwned-passwords/" %}}

{{% resource title="Credenciais comuns" languages="Inglês" cost="Grátis" description="Listas de credenciais comumente usadas, como senhas." url="https://github.com/danielmiessler/SecLists/tree/master/Passwords/Common-Credentials" %}}

{{% resource title="Diretrizes de senha do NIST" languages="Inglês" cost="Grátis" description="Uma postagem de blog que descreve algumas das diretrizes de senha do NIST e os motivos por trás delas." url="https://blog.netwrix.com/2022/11/14/nist-password-guidelines/" %}}

{{% resource title="Phishing" languages="76 idiomas" cost="Grátis" description="Uma visão geral dos ataques de phishing, sua história e métodos frequentemente usados por invasores." url="https://pt.wikipedia.org/wiki/Phishing" %}}

{{% resource title="Golpe de troca de SIM" languages="Inglês, chinês, japonês, malaiala, alemão, espanhol" cost="Grátis" description="Um tipo de golpe no qual um invasor obtém o controle do cartão SIM de uma pessoa-alvo. Esse é um dos principais motivos para não confiar na autenticação via SMS." url="https://en.wikipedia.org/wiki/SIM_swap_scam" %}}

{{% resource title="Visão geral do U2F" languages="Inglês" cost="Grátis" description="Uma análise mais detalhada de como funciona o U2F, um método de autenticação popular que se baseia em ferramentas como chaves de segurança físicas." url="https://developers.yubico.com/U2F/Protocol_details/Overview.html" %}}

{{% resource title="Códigos de backup de autenticação de dois fatores: Google" languages="vários" cost="Grátis" description="Há ocasiões em que o método principal de autenticação de dois fatores é perdido ou destruído. Nesses casos, o usuário precisará usar um método de backup. Esses artigos demonstram como o Google e o GitHub gerenciam esses backups." url="https://support.google.com/accounts/answer/1187538?hl=pt-br&co=GENIE.Platform%3DDesktop" %}}

{{% resource title="Códigos de backup de autenticação de dois fatores: Github" languages="vários" cost="Grátis" description="Há ocasiões em que o método principal de autenticação de dois fatores é perdido ou destruído. Nesses casos, o usuário precisará usar um método de backup. Esses artigos demonstram como o Google e o GitHub gerenciam esses backups." url="https://docs.github.com/pt/authentication/securing-your-account-with-two-factor-authentication-2fa/configuring-two-factor-authentication-recovery-methods" %}}

{{% resource title="Dicas sobre autenticação multifatorial" languages="Inglês" cost="Grátis" description="Uma visão geral do que é a autenticação multifatorial e quais práticas recomendadas devemos adotar ao implementá-la." url="https://cheatsheetseries.owasp.org/cheatsheets/Multifactor_Authentication_Cheat_Sheet.html" %}}