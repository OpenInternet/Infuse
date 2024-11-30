---
style: module
title: "Segurança operacional - Manuseio seguro de links e infraestrutura"
description: Durante a investigação de e-mails de phishing, anexos, sites e outras infraestruturas maliciosas, é importante tomar medidas proativas para garantir sua segurança, bem como das pessoas que estiver ajudando. Não deixe de estudar esta habilidade e, caso necessário, prepare um ambiente seguro antes de interagir com e-mails ou sites suspeitos e maliciosos.
weight: 3
---
## Caso de uso

Durante a investigação de e-mails de phishing, anexos, sites e outras infraestruturas maliciosas, é importante tomar medidas proativas para garantir sua segurança, bem como das pessoas que estiver ajudando. Além disso, é fundamental saber aconselhar bem as pessoas que receberam as mensagens suspeitas ao se envolverem em tais incidentes, e indicar formas de reportá-los com segurança, sem se comprometerem. Não deixe de estudar esta habilidade e, caso necessário, prepare um ambiente seguro antes de interagir com e-mails ou sites suspeitos e maliciosos.

## Objetivos

Após completar este módulo, profissionais serão capazes de:


- Demonstrar como manejar e-mails mal intencionados e URLs com segurança durante a investigação da infraestrutura maliciosa;
- Descrever os passos a serem tomados para a prevenção de vazamentos de endereços IP de máquinas/dispositivos comprometidos durante a condução de uma investigação;
- Traçar os próximos passos imediatos na suspeita de que uma conta tenha sido comprometida;
- “Desativar” (“defang”) URLs com segurança.

- - -

## Seção principal 

Muitos e-mails de phishing e mensagens similares não só tentam manipular a pessoa alvo a clicar em um link, como também podem tentar coletar dados sobre ela (sobre isso, discutiremos mais aprofundadamente no [Módulo 6](/pt-br/learning-path/1/module-6/)). Ao conduzir uma investigação, é imprescindível manejar mensagens e outras infraestruturas com cuidado para não revelar informação sobre identidade, trabalho e organização além do estritamente necessário, e para proteger dispositivos e contas.


### Precauções fundamentais

Geralmente, dividimos a análise em análise passiva ([Módulo 4](/pt-br/learning-path/1/module-4) e [Módulo 5](/pt-br/learning-path/1/module-5)) e análise ativa ([Módulo 6](/pt-br/learning-path/1/module-6) e [Módulo 7](/pt-br/learning-path/1/module-7)). A análise passiva não deve incluir nenhum contato com servidores de atacantes, diferentemente da análise ativa.

Para a análise, é importante entender que tipos de atividades interagem diretamente com a infraestrutura atacante, e podem, portanto, ser detectadas. Assim, profissionais poderão adaptar os métodos relevantes de modelagem de ameaças.

Recomendamos as seguintes precauções de segurança operacional ao conduzir análises:

### Ambiente seguro

Dependendo da sofisticação dos ataques, e da sensibilidade da máquina, dados e contas em uso, e até da suscetibilidade da investigação e identidade pessoal, você pode precisar de um ambiente seguro adequado para a condução de trabalho investigativo. Considere as seguintes sugestões ao construir sua solução de segurança:

- Use uma VPN com boa reputação na possibilidade de interações com infraestruturas mal intencionadas, para evitar que seu IP seja registrado pela pessoa atacante.
- Utilize um navegador pré configurado e específico em seu dispositivo somente para este fim, para reduzir o risco de que o conteúdo malicioso ativo seja operado no dispositivo. [NoScript](https://noscript.net/) é uma excelente extensão de navegador, disponível no Firefox e em navegadores baseados em Chromium, que impedirá a execução de scripts, inspecionando previamente qualquer conteúdo malicioso ativo.
- Tente usar um dispositivo dedicado à análise, ou uma máquina virtual, os quais não devem ser conectados a nenhuma conta empresarial ou pessoal, e/ou possuir armazenamento conectado à rede pública ou rede pessoal. O dispositivo ou máquina não deve conter nenhuma informação sensível (a menos que você descubra essas informações durante a investigação).
- Configure um endereço de e-mail específico para o qual pessoas alvo possam encaminhar e-mails suspeitos recebidos (caso a mensagem tenha sido recebida via aplicativos como WhatsApp, uma captura de tela poderá ser enviada por e-mail). Este e-mail não precisa ser único para cada pessoa alvo. Garanta que a conta esteja protegida por uma senha exclusiva, e com autenticação de dois fatores habilitada, e configure o cliente de e-mail para prevenir que conteúdos externos, como imagens, sejam baixados automaticamente, pois são baixadas por um servidor que pode alertar a pessoa atacante sobre a investigação em andamento, tornando a investigação passiva em ativa (acesse o Módulo 6 para mais detalhes);
- Certifique-se de que seu computador esteja protegido e atualizado contra malwares para precaver seu computador contra qualquer potencial infecção.

### Desativando URLs

Conforme for documentando URLs potencialmente maliciosas, uma prática comum consiste em “desativar” (ou “tirar os caninos”, “remover as garras” em tradução livre e literal) URLs para que links clicáveis não sejam gerados automaticamente. Isso poderia levar pessoas (você, ou quem quer que esteja colaborando) a clicarem neles sem querer, ou então instigar tráfego para a URL de sua máquina local. Algumas aplicações, como as de mensageria, também geram prévias de links automaticamente (“puxando” o conteúdo de um servidor). Desativar URLs previne que isso aconteça.

Para isso, geralmente se substitui a seção de protocolo da URL com um equivalente inválido, e os pontos finais da URL são envolvidos por colchetes. Por exemplo:

| URL “ativa”                                                      | URL desativada                  |
|--------------------------------------------------------------------|-----------------------------------|
| [https://www.site-malicioso.com.br](https://www.site-malicioso.com.br)   | hxxps://www[.]site-malicioso[.]com[.]br |
| ftp://192.168.12.20                                                | fxp://192[.]168[.]12[.]20          |

A desativação pode ser feita manualmente utilizando-se um editor de texto como o NotePad, Textedit, ou Gedit. Há ainda ferramentas como [https://defang.me/ (em inglês)](https://defang.me/), e similares no [CyberChef (em inglês)](https://gchq.github.io/CyberChef).

### Comunicação com pessoas alvo e passos imediatos durante um incidente

Caso haja suspeitas de que atacantes tenham obtido acesso ao e-mail ou conta da pessoa alvo (resultante de um ataque de phishing com sucesso, talvez), ou então de que a máquina que ela utiliza esteja sendo monitorada (provavelmente por conta de malware, via anexo malicioso), peça à pessoa alvo para que não utilize a máquina e a conta enquanto se investiga sobre o que está acontecendo. Se possível, comunique-se com a pessoa alvo através de outra conta e dispositivo, por exemplo, Signal ou WhatsApp no dispositivo pessoal, caso a suspeita esteja no dispositivo de trabalho.

Se as suspeitas são de que as contas da pessoa alvo tenham sido comprometidas, peça para que ela mude imediatamente as senhas, e force o “deslogamento” (logout) da conta de todas as localidades (a maioria dos serviços possui tal configuração). Isso deve inviabilizar outros acessos indevidos por parte da pessoa atacante. No entanto, isso alertará que a pessoa alvo percebeu algo errado, e a pessoa atacante pode já ter baixado uma quantidade significativa de dados da conta em questão.

Caso a suspeita seja de que o dispositivo da pessoa alvo tenha sido comprometida, peça para que ela mude as senhas em um outro dispositivo, e evite usar o dispositivo comprometido até que a investigação seja finalizada. Siga os passos reforçados na trilha de aprendizagem de [Detecção de Malware](/pt-br/learning-path/2/).

## Atividade prática

- Com o VPN desabilitado (caso seja seguro), acesse algum site que mostre seu endereço IP (procure por “qual é meu IP” em seu mecanismo de busca favorito). Reflita sobre o que poderia acontecer caso atacantes soubessem de seu endereço IP. O endereço pertence a alguma empresa ou escritório? \
  Em seguida, habilite uma VPN bem reconhecida e cheque seu endereço IP mais uma vez. \
  Por fim, [leia sobre vazamentos de DNS (em inglês)](https://mullvad.net/en/help/all-about-dns-servers-and-privacy) e teste se a VPN está vazando informações de DNS (a maioria das VPNs possuem sites próprios que fazem estes testes, você pode usar seu mecanismo de busca favorito para encontrá-los!).
- Desative a URL de [https://www.wikipedia.org/](https://www.wikipedia.org/). Cole a URL desativada na barra de endereços do navegador e pressione Enter. Caso a página não seja carregada, significa que você desativou o link direitinho (o navegador pode exibir resultados de busca pelo endereço, o que é um comportamento comum).

## Checagem de habilidades

- Peça para colegas ou para a pessoa mentora que criem um web token de bug gerado [no Canarytokens (em inglês)](https://canarytokens.org/generate#). Abra o web bug na sua máquina de análise. Isso fará com que a outra pessoa receba informações pelo e-mail utilizado para cadastrar o web bug, incluindo seu endereço IP e uma breve descrição do navegador chamado agente de usuário. Discuta estes resultados: caso estivesse conduzindo uma análise ativa, pessoas atacantes provavelmente também teriam acesso a suas informações, já que você estaria usando a mesma máquina para se conectar aos servidores controlados por elas.

## Recursos de aprendizagem

{{% resource title="NoScript" languages="Inglês" cost="Grátis" description="Extensão de navegador para Firefox e aqueles baseados em Chromium, com filtragem de permissões de execução de JavaScript. Ao lidar com sites potencialmente maliciosos, a extensão permite que a página seja carregada enquanto ela desabilita muitas das funcionalidades potencialmente nocivas." url="https://noscript.net/" %}}

{{% resource title="Defang.me" languages="Inglês" cost="Grátis" description="Ferramenta que automaticamente desativa URLs e endereços IP." url="https://defang.me/" %}}

{{% resource title="CyberChef" languages="Inglês" cost="Grátis" description="Ferramenta abrangente que possibilita a conversão de diferentes formatos, também capaz de desativar automaticamente URLs e endereços IP." url="https://gchq.github.io/CyberChef/" %}}
