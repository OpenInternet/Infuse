+++
style = "module"
weight = 4
title = "Etapas iniciais e verificações para a detecção de malware"
description = "This subtopic looks at the ways in which we can conduct initial triage and check for malware when we are handed a potentially infected device"
+++

## Caso de Uso

Existe um dispositivo cujo status de segurança é desconhecido e o seu usuário quer investigar a possibilidade de infecção ou comprometimento prévio. Talvez você tenha recebido este dispositivo fisicamente, ou talvez preste suporte remotamente. Use ferramentas de análise padronizadas ou integradas, assim como verificações de integridade para identificar, analisar e buscar Indicadores de Comprometimento (IoC) para identificar uma violação ou um determinado malware suspeito.

## Objetivos 

Após concluir este subtópico, os profissionais deverão ser capazes de fazer o seguinte:

- Usar ferramentas de detecção populares, como antivírus ou as ferramentas integradas ao seu sistema operacional para auxiliá-lo na análise.
- Entender algumas proteções básicas anti-malware existentes nos sistemas operacionais modernos e saber como verificar se estão funcionando ou se foram desativadas.

---
## Conteúdo 
### Anti-malware padronizados (todas as plataformas)

O método menos trabalhoso para detectar um malware conhecido, consiste simplesmente em efetuar um scan de malware para examinar o sistema do dispositivo do cliente em tempo real. Note que a qualidade dos produtos antivírus pode variar amplamente, mas a maioria deles consegue detectar grande parte dos malware conhecidos. Abaixo seguem os links de algumas das ferramentas de verificação de malware mais comuns:

- 🧰 Windows: [Microsoft Defender](https://apps.microsoft.com/store/detail/microsoft-defender/9P6PMZTM93LR) é gratuito e integrado ao Windows. Vários antivírus comercializados popularmente podem ser usados, cada um oferece prós e contras. Aqui, sugerimos MalwareBytes. Também considere instalar AdwCleaner de MalwareBytes, para remover Adwares e Programas Potencialmente Indesejados[^1].
- 🧰 MacOS: Também recomendamos usar [Malwarebytes](https://www.malwarebytes.com/mac). [Avast Free Antivirus](https://www.avast.com/en-us/free-antivirus-download) também é uma boa opção gratuita.
- 🧰 Linux: [ClamAV](https://www.clamav.net/) é um antivírus open-source para Linux. Também está disponível em outras plataformas.
- 🧰 Android: Android: Diversos provedores, como [LookOut ](https://www.lookout.com/)p fornecem antivírus grauitos ou pagos para Android, assim como proteções adicionais para celulares. ClamAV está implantado no Android no app [Hypatia](https://f-droid.org/en/packages/us.spotco.malwarescanner/) via [F-Droid](https://f-droid.org/en/).
  - [Google Play Protect](https://support.google.com/googleplay/answer/2812853?hl=en) fará uma varredura dos aplicativos do seu telefone, até mesmo os que não foram baixados pela Google Play Store. Clique no link para mais detalhes e diretrizes sobre como iniciar uma verificação.

💡 Em comparação aos sistemas operacionais dos desktops, o antivírus padrão do Android é mais limitado em termos de capacidades; ele pode verificar todos os aplicativos instalados, mas não é capaz de verificar possíveis spywares avançados que estejam escondidos no sistema. Ademais, pode não ser capaz de remover os malwares detectados.

- 🧰 iOS: Não existem ferramentas abrangentes de verificação de malware para iOS. A segurança integrada no iOS significa que os aplicativos não são capazes de verificar outros aplicativos instalados. Diversos fornecedores de antivírus possuem aplicativos para iOS, mas estes tendem a ter outras funções, tais como bloquear sites de phishing ou verificar se o telefone está atualizado. 

### Conselhos e habilidades para utilizar os antivírus padrão na detecção de Malware

Uma das primeiras etapas ao buscar por um malware consiste em instalar um programa de antivírus deixar que ele faça uma verificação do sistema. Após a finalização desta verificação, a maioria dos programas gerará algum tipo de log que fornecerá informações adicionais sobre os resultados da verificação. Recomendamos que você os examine de mais perto. Se os programas de antivírus detectarem um arquivo suspeito, eles podem colocá-lo em 'quarentena', o que significa que o arquivo será isolado do resto do sistema operacional, para que não seja aberto por acidente ou cause algum estrago. Se você deseja fazer uma análise mais aprofundada deste arquivo, você pode precisar tirá-lo da quarentena; verifique a documentação do seu programa de antivírus neste tópico.

Tenha em mente que os malwares modernos nem sempre envolvem arquivos maliciosos. Em vez disso, podem apresentar-se sob a forma de scripts legítimos que efetuam tarefas maliciosas que se tornaram persistentes de alguma forma. Os aplicativos de antivírus verificarão tais tarefas; assim, nos logs fornecidos, não espere obter somente 'arquivos'. 

Esteja ciente das limitações dos programas de antivírus e por que não são uma cura total contra os malwares. Diferentes programas de antivírus usam diferentes motores de detecção. Alguns motores detectarão alguns tipos de vírus e outros malwares, mas nenhum deles é 100% eficaz. 

Por este motivo, caso você disponha de uma amostra, talvez seja preferível fazer o upload de arquivos potencialmente suspeitos no VirusTotal, que verifica o arquivo usando uma sequência de motores disponíveis no mercado e fornece outras informações que podem ajudá-lo a determinar se um dado arquivo é malicioso. Observe que se você fizer o upload de um arquivo ao Virus Total, ele permanecerá no site e poderá ser baixado (e pesquisado) por qualquer pessoa que tenha uma conta paga neste site. Assim, se você estiver lidando com arquivos que contenham informações potencialmente sensíveis ou se você não quiser que este arquivo analisado se torne público, é melhor gerar um hash do arquivo[^2] e pesquisar por isso no VirusTotal. Finalmente, lembre-se que VirusTotal usa somente motores estáticos e, dessa forma, a sua detecção pode ser menos eficiente do que a de um antivírus que funcione em tempo real num sistema. Veja o [Suptópico 8](/pt-br/learning-path/2/module-8/) acerca da Detecção baseada numa amostra para saber mais sobre esta habilidade. Para mais informações sobre as capacidades do VirusTotal, conclua a atividade no [Capítulo 7 do Guia Prático de Resposta a Incidentes para Sociedade Civil e Mídia](https://internews.org/wp-content/uploads/2023/11/Field-Guide-to-Threat-Labs.pdf).

Enquanto os motores de antivírus modernos tentam procurar por comportamentos semelhantes aos de um malware e bloqueia os executáveis que preenchem esses critérios, os testes realizados ainda são relativamente rudimentares. Na maioria das vezes, os antivírus reconhecem um malware com base nos IoCs que foram enviados a ele; assim, ele raramente consegue identificar um malware recente ou menos conhecido.

Ademais, os adversários muitas vezes testarão os seus malwares contra os antivírus mais conhecidos e modificar os seus malwares para que não possam ser facilmente detectados, por exemplo, usando a ofuscação, a codificação, a compressão e a encriptação. Alguns malwares tentarão desativar os programas de antivírus ou se auto-adicionarem a uma lista de exceção para não serem identificados durante o processo de identificação. Outros malwares podem enganar os usuários e fazer com que os desativem. Por isso, recomendamos que instale um novo programa de antivírus num sistema potencialmente comprometido e efetue uma verificação com ele. Você pode desinstalar o programa depois.

Quando você encontra um malware ou adware no computador de alguém, inclusive nos casos em que se trata de um malware ou adware comum, é melhor trabalhar com o dono do dispositivo para entender como o malware pode ter sido instalado (descrito no [Subtópico 10](pt-br/learning-path/2/module-10/)) e, então limpar a infecção (descrito no [Subtópico 11](pt-br/learning-path/2/module-11/)). Entender como o malware foi instalado pode evidenciar falhas de controle, falta de conhecimento acerca dos comportamentos de risco, ou até mesmo problemas relacionados à supply chain (ex.: dispositivos vendidos com programas potencialmente indesejáveis pré-instalados), e isso tudo pode ser conversado e resolvido.

### Triagem/Checklists para verificar proteções em falta

Todos os sistemas operacionais modernos usam alguma forma de proteção integrada, ou os chamados 'jardins murados' (tais como as app stores ou Smart Screen), que restringem os usuários a arquivos executáveis que o sistema reconhece como sendo seguros. Ao verificar para ver se essas proteções foram desativadas, removidas ou colocadas em modo de erro, você poderá obter um valioso indicativo de triagem, que pode significar que um comprometimento maior pode já ter ocorrido. Se nenhuma dessas proteções estiver funcionando, isso não significa necessariamente que elas foram desativadas por um malware; um usuário pode tê-las desativado manualmente para poder executar um determinado software, por exemplo, ou podem ter sido visadas por um ataque de engenharia social que os convenceu de desativar algumas dessas funcionalidades. Se você reativar essas proteções, isso provavelmente impedirá a maioria dos malwares de funcionar, ou ao menos restringirá os danos que podem causar ao sistema.

Uma coisa que você pode fazer em todos os sistemas é verificar todos os navegadores web que estão instalados, e ver se possuem alguma nova extensão que você não reconhece. Se tiverem alguma extensão, efetue uma pesquisa na web para ver o que fazem, se podem ser potencialmente maliciosas e, se for este o caso, que tipo de malware pode tê-las instalado.[^3]

Para todos os dispositivos, recomendamos que consulte esta [rápida checklist de triagem](https://pts-project.org/guides/g6/#identifying-compromised-devices).

#### Windows

Verifique o [Windows Defender Security Center](https://learn.microsoft.com/en-us/windows/security/operating-system-security/system-security/windows-defender-security-center/windows-defender-security-cente) (ou Windows Security), que lhe fornece um breve resumo de todas as configurações Windows Security, inclusive mostrando se o Windows Defender está ativo e funcionando naquele momento. Observe que as funcionalidades dos antivírus Windows Defender podem ser automaticamente desativadas caso você instale um antivírus terceiro. Este é o comportamento esperado. Em qualquer dos casos, um programa malicioso pode ter conseguido adicionar-se à lista de exceção ("allowlist"), instruindo o anti-malware a não verificá-lo. Você pode verificar se não há exceções indesejadas no Windows Defender aplicando [essas instruções](https://support.microsoft.com/en-us/windows/add-an-exclusion-to-windows-security-811816c0-4dfd-af4a-47e4-c301afe13b26#ID0EBF=Windows_11), e outros produtos anti-malware terceiros podem oferecer o mesmo tipo de funcionalidade. O painel de configurações permitirá que você verifique o status de várias outras proteções integradas, tais como a Proteção Baseada na Reputação, o Isolamento de núcleo e o Secure boot (inicialização segura), entre outros.

O Windows usa o Smart App Control (antigamente chamado SmartScreen, antes do Windows 11, que hoje é uma versão baseada na web do produto integrado no Navegador Edge) como mecanismo de verificação da reputação dos executáveis antes de serem executados. Consulte o Smart App Control (Win 11) nas configurações Windows Security para verificar caso tenha sido desativado. Procure pelas configurações Smart Screen nas versões mais antigas do Windows.

#### MacOS

- O macOS tem diversos mecanismos que visam impedir a execução de malwares. Apesar disso, um agente malicioso pode encontrar formas de contornar esses mecanismos. Leia [sobre as diferentes proteções](https://support.apple.com/guide/security/protecting-against-malware-sec469d47bd8/web) existentes no macOS. Este [guia avançado](https://redcanary.com/blog/gatekeeper/) fornece uma lista detalhada das proteções macOS e as bases de dados que utilizam. Os usuários avançados podem procurar por atividades inabituais nesta base de dados, através de um trabalho de perícia aprofundado que vai muito além do escopo desta trilha de aprendizagem.
- Um dos mais importantes mecanismos anti-malware no macOS é chamado de Gatekeeper. Todo sistema macOS deve ter ativado o Gatekeeper, especialmente para dispositivos que executam dados sensíveis. [Contudo, já houve casos em que o malware desativou as proteções Gatekeeper](https://www.zdnet.com/article/macos-malware-disables-gatekeeper-to-deploy-malicious-payloads/), para que conseguisse executar códigos maliciosos nos sistemas macOS. Os usuários podem ter sido visados por ataques de engenharia social que os convenceram de desativar esta funcionalidade. Você pode executar “spctl --status” no Terminal macOS para ver se o Gatekeeper, sua medida padrão de proteção contra malwares, está ativada ou desativada.[^4] Se o Gatekeeper estiver desativado, ative-o (isto impedirá a maioria dos malwares de continuarem a funcionar) e investigue, talvez [verificando o histórico da linha de comando](https://www.macworld.com/article/351872/how-to-look-at-your-command-history-list-in-macoss-terminal.html), para ver como isso pode ter acontecido.

#### iOS

- O iOS permite o carregamento de perfis de cliente. Eles são tipicamente utilizados para conectar-se a redes corporativas ou universitárias, mas um adversário pode, potencialmente, usá-los para interceptar o seu tráfego. Vá às configurações do seu dispositivo iOS e [verifique](https://support.apple.com/guide/iphone/install-or-remove-configuration-profiles-iph6c493b19/ios) se algum perfil foi instalado. Se algum perfil parecer suspeito e o usuário não se lembra de tê-lo instalado, isso pode ser um sinal de atividade maliciosa. Neste caso, é bom documentar tudo o que encontrar sobre este perfil, tire capturas de tela, e remova-o.
- O iOS também possui atalhos, que são tipicamente usados para automatizar determinadas funções no dispositivo, tais como comprimir imagens ou converter texto. O aplicativo é geralmente muito bom para descrever quais atalhos funcionam com linguagem simples ([ainda que alguns atalhos permitam a execução de JavaScript personalizado](https://support.apple.com/guide/shortcuts/advanced-shortcuts-settings-apdfeb05586f/ios)). Assim como no caso dos perfis, se você perceber a presença de atalhos que possam parecer suspeitos (tenha em mente que cada versão de iOS pode instalar novos atalhos, então, é melhor ler sobre isso também), documente-os por meio de capturas de tela e remova-os. De modo geral, é incrivelmente difícil para um malware instalar perfis ou atalhos personalizados; é muito mais fácil para o invasor simplesmente carregá-los por meio da engenharia social ou através de um breve acesso a um dispositivo desbloqueado.
- Considere a segurança da conta iCloud dos usuários, pois um comprometimento desta conta pode acarretar acesso a dados significativos presentes no dipositivo iOS. Efetue uma revisão completa da segurança do Apple ID do usuário, e faça mudanças como alteração de senha, autenticação de dois fatores, remoção de acesso ao aplicativo e a desvinculação a outros dispositivos, se necessário. O Safety Check da Apple contém uma [funcionalidade de revisão](https://support.apple.com/guide/personal-safety/how-safety-check-works-ips2aad835e1/web) que pode ajudá-lo com isso.
- Por vezes, os adversários enviarão mensagens de texto ou iMessages com links maliciosos às pessoas alvo. Este link, caso tenha sido clicado, pode conter um malware ou uma carga de engenharia social. É uma boa ideia percorrer as iMessages e mensagens de texto mais recentes para ver se alguma delas contém links suspeitos ou outro conteúdo suspeito.
- Para mais informações sobre os fundamentais de triagem, consulte o [capítulo 12 do guia prático](https://internews.org/wp-content/uploads/2023/11/Field-Guide-to-Threat-Labs.pdf).
- Alguns adversários tentam adicionar um novo dispositivo que controlam a lista de dispositivos vinculados a um sistema de mensagem da pessoa alvo, como WhatsApp ou Signal. Dessa forma, todas as mensagens que a pessoa alvo enviar ou receber serão copiadas também ao dispositivo do adversário. Este ataque é normalmente causado por um adversário que tenha acesso físico direto ao dispositivo, e não por um malware; mas verificar a presença de dispositivos desconhecidos que possam estar vinculados ao [WhatsApp](https://faq.whatsapp.com/378279804439436?helpref=faq_content), [Signal](https://support.signal.org/hc/en-us/articles/360007320551-Linked-Devices), [Telegram](https://telegram.org/blog/sessions-and-2-step-verification), e outros sistemas de mensagem instantânea também deve ser parte do processo de triagem.

#### Android

- Para Android, leia o [capítulo 8 do guia prático](https://internews.org/wp-content/uploads/2023/11/Field-Guide-to-Threat-Labs.pdf), que mostra como você pode fazer uma triagem dos aplicativos potencialmente suspeitos, consultando as diferentes permissões (tais como, o acesso às suas fotos, à câmera ou ao microfone) que solicitam.
- Verifique os aplicativos que exercem um controle maior sobre o dispositivo, examinando os apps listados e ativados nas configurações Apps de administração do dispositivo no Android. O usuário deve saber quais aplicativos possuem tais privilégios - normalmente, tratam-se de apps corporativas ou apps oficiais de roubo do dispositivo que permitem a exclusão remota. Caso apps não reconhecidos tenham recebido permissões de administrador, desative-os e conduza maiores investigações.
- Instalar Fontes Desconhecidas é uma outra permissão Android que pode ser concedida a um aplicativo para permitir que ele instale outros aplicativos. Isto permite contornar a proteção 'jardim murado' das App stores oficiais, como Google Play Store ou Galaxy Store. Em alguns casos, isto pode ser desejável, como no caso da App store de open source F-Droid. Contudo, se você notar que o Bluetooth, um serviço de mensagens instantâneas, um aplicativo de arquivos ou de envio/transferência recebeu esta permissão, isto indica que o dono do dispositivo instalou aplicativos fora das fontes seguras de aplicativos e, consequentemente, serão necessárias investigações mais aprofundadas.
- Por vezes, os adversários enviarão mensagens de texto com links maliciosos às pessoas alvo. Este link, caso tenha sido clicado, pode conter um malware ou uma carga de engenharia social. É uma boa ideia percorrer as mensagens de texto mais recentes para ver se alguma delas contém links suspeitos ou outro conteúdo suspeito.
- Verifique as Informações do App para saber se é possível desinstalá-lo. Se não for possível, trata-se de um aplicativo pré-instalado. Isto ainda pode ser um problema (alguns telefones mais baratos possuem malwares pré-instalados), mas exclui a hipótese de monitoramento. Para os telefones mais caros, esta hipótese é ainda menos provável.
- [Verifique](https://support.google.com/android/answer/2812853?hl=en) se Google Play Protect está ativado.
- Alguns adversários tentam adicionar um novo dispositivo que controlam a lista de dispositivos vinculados a um sistema de mensagem da pessoa alvo, como WhatsApp ou Signal. Dessa forma, todas as mensagens que a pessoa alvo enviar ou receber serão copiadas também ao dispositivo do adversário. Este ataque é normalmente causado por um adversário que tenha acesso físico direto ao dispositivo, e não por um malware; mas verificar a presença de dispositivos desconhecidos que possam estar vinculados ao [WhatsApp](https://faq.whatsapp.com/378279804439436?helpref=faq_content), [Signal](https://support.signal.org/hc/en-us/articles/360007320551-Linked-Devices), [Telegram](https://telegram.org/blog/sessions-and-2-step-verification), e outros sistemas de mensagem instantânea também deve ser parte do processo de triagem.

Vale a pena ter em mente que as configurações de segurança variam entre as diferentes versões de iOS e de Android. As versões mais recentes do iOS, por exemplo, requerem que os perfis sejam assinados digitalmente, pois isto torna mais difícil aos adversários tirarem proveito deles. Da mesma forma, muitas atualizações de softwares mudam a forma com a qual o sistema lida com as permissões ou notificações. Uma boa regra é a de que versões sucessivas de iOS e Android geralmente possuem exigências mais rigorosas em termos de segurança quando se trata de autômatos, aplicativos e permissões.

## Practice

### Windows e macOS

1. Windows: consulte o Windows Defender Security Center. Você nota algo suspeito?
2. macOS: use a linha de comando para verificar se Gatekeeper está ativado.


### Android e iOS

1. Examine vários dos seus aplicativos para saber quais permissões possuem. Existem aplicativos que você não reconhece ou algum que lhe pede muitas permissões? No Android: algum desses aplicativos que você não reconhece é pré-instalado?
2. Somente para iOS: verifique o seu dispositivo e veja se existem atalhos e perfis instalados que você não reconhece.
3. Use um motor de busca e insira o texto completo de uma mensagem de texto suspeita ou estranha que você recebeu. Se você não recebeu nenhuma mensagem estranha ou suspeita, pesquise por uma mensagem padrão da sua operadora. Quais informações você consegue encontrar online sobre o número que lhe mandou esta mensagem e sobre a própria mensagem em si?

## Teste de capacitação

### Android e iOS

1. Android: Leia a [documentação sobre as permissões para Android](https://developer.android.com/guide/topics/permissions/overview). Você não precisa entender o código fonte, o objetivo é somente ter uma compreensão geral sobre como funcionam as permissões. \
   Pense no que um aplicativo malicioso é capaz de fazer e quais dados poderia extrair com as permissões destacadas nas especificações Android, e também sobre quais etapas são tomadas pelo sistema operacional para minimizar o risco de que os aplicativos abusem de tais permissões. Escreva uma lista com cinco a dez ações que um aplicativo malicioso que possui vastas permissões de sistema poderia fazer, e anote duas a três situações indesejáveis que poderiam ser evitadas ao adotar as melhores práticas relativas às permissões dadas aos aplicativos. \
   Se você estiver trabalhando com um colega ou mentor, fale com eles sobre a lista acima, e faça com que se certifiquem de que você entendeu o que são as permissões do app, como poderia haver um abuso relativo a elas, e como os mecanismos de mitigação do Android podem evitar que isso aconteça.

2. iOS: Leia a descrição do [iOS Lockdown Mode](https://support.apple.com/en-us/HT212650), uma configuração especial para indivíduos com alto risco de serem alvo de ataques, especialmente através de spywares mercenários. Liste algumas respostas às seguintes perguntas. Lembre-se de que não há respostas certas ou erradas a essas perguntas, pois o Modo Lockdown, assim como todos os demais mecanismos de segurança, visa estabelecer um equilíbrio entre segurança e usabilidade. Algumas dessas perguntas requerem um conhecimento mais aprofundado acerca de ataques anteriores ao iOS (recomendamos que os alunos pesquisem sobre 'jailbreak' enquanto estiverem investigando sobre o assunto) e podem exigir algumas buscas adicionais.
   1. Por que o Modo Lockdown bloqueia a maioria dos anexos no Apple Messages? Por que ele não os bloqueia em aplicativos como WhatsApp?
   2. Você consegue pensar num motivo que faz com que o Modo Lockdown restrinja algumas funcionalidades na navegação web?
   3. O Modo Lockdown, uma vez ativado, não permite a instalação de perfis personalizados. Por que você acha que os perfis que foram instalados antes que o usuário ativasse o Modo Lockdown ainda conseguem funcionar?

Se você estiver trabalhando com um colega ou mentor, fale com eles sobre as suas respostas às perguntas acima e peça com que se certifiquem de que você entendeu o que é o Modo Lockdown.

## Recursos de aprendizagem

{{% resource title="Windows Defender" languages="Múltiplos" cost="Gratuito com uma licença Windows ativa" description="Uma solução anti-malware feita pela Microsoft, disponível gratuitamente para todos os usuários de Windows." url="https://apps.microsoft.com/detail/microsoft-defender/9P6PMZTM93LR?hl=en-us&gl=US" %}}

{{% resource title="MalwareBytes" languages="Múltiplos" cost="Gratuito com funcionalidades premium" description="Um antivírus de verificação popular frequentemente usado na sociedade civil." url="https://www.malwarebytes.com/" %}}

{{% resource title="Avast" languages="Múltiplos" cost="Gratuito com funcionalidades premium" description="Um outro antivírus de verificação com uma boa oferta gratuita." url="https://www.avast.com/en-us/Grátis-antivirus-download#pc" %}}

{{% resource title="ClamAV" languages="Múltiplos" description="Um verificador de vírus open source." url="https://www.clamav.net/" %}}

{{% resource title="Lookout" languages="Múltiplos" cost="Várias ofertas de preços" description="Uma empresa bem conhecida que fornece serviços de segurança para Android." url="https://www.lookout.com/" %}}

{{% resource title="Hypatia" languages="Inglês" cost="Grátis" description="Um verificador de malware open source para Android, baseado no ClamAV." url="https://f-droid.org/en/packages/us.spotco.malwarescanner/" %}}

{{% resource title="Google Play Protect" languages="Múltiplos" cost="Grátis" description="Uma breve documentação sobre o Google Play Protect, uma ferramenta de segurança adicional e altamente recomendada para Android." url="https://support.google.com/googleplay/answer/2812853?hl=en" %}}

{{% resource title="Identificando dispositivos comprometidos: um guia intermediário" languages="Inglês" cost="Grátis" description="Alguns sinais rápidos pelos quais podemos procurar quando estamos tentando descobrir se um dispositivo está potencialmente copmprometido por um malware. Observe que as etapas a seguir são apenas um começo, e não substituem uma verificação e análise aprofundadas." url="https://pts-project.org/guides/g6/#identifying-compromised-devices" %}}

{{% resource title="Windows Security" languages="Múltiplos" cost="Gratuito em cada instalação Windows" description="Um ponto central num sistema operacional Windows onde você pode verificar num piscar de olhos quais medidas de segurança foram ativadas e quais não foram." url="https://learn.microsoft.com/en-us/windows/security/operating-system-security/system-security/windows-defender-security-center/windows-defender-security-center" %}}

{{% resource title="Proteção contra malware para macOS" languages="Múltiplos" cost="Grátis" description="Um artigo da Apple que destaca alguns dos mecanismos de segurança presentes no macOS." url="https://support.apple.com/en-gb/guide/security/sec469d47bd8/web" %}}

{{% resource title="Gatekeeping on macOS" languages="Inglês" cost="Grátis" description="Um artigo mais detalhado que descreve como funciona o Gatekeeper, um mecanismo de segurança chave do macOS." url="https://redcanary.com/blog/gatekeeper/" %}}

{{% resource title="Um trojan macOS desativa o Gatekeeper para implantar cargas maliciosas" languages="Inglês" cost="Grátis" description="Um caso de estudo sobre como um malware conseguiu desativar os mecanismos de segurança macOS para se espalhar no sistema." url="https://www.zdnet.com/article/macos-malware-disables-gatekeeper-to-deploy-malicious-payloads/" %}}

{{% resource title="Como consultar a sua lista de histórico de comandos no terminal macOS" languages="Inglês" cost="Grátis" description="Um breve guia sobre como buscar o histórico de linhas de comando no terminal macOS, o que pode ser útil se você está tentando descobrir quais comandos anteriores foram inscritos e se algum deles afetou os seus mecanismos de segurança." url="https://www.macworld.com/article/351872/how-to-look-at-your-command-history-list-in-macoss-terminal.html" %}}

{{% resource title="Mecanismos e verificações de segurança iOS" languages="Múltiplos" cost="Gratuito com os sistemas macOS e iOS" description="Introdução acerca das proteções relativas à privacidade e à segurança:" url="https://support.apple.com/en-is/guide/iphone/iph6e7d349d1/17.0/ios/17.0" %}}

{{% resource title="Mecanismos e verificações de segurança iOS" languages="Múltiplos" cost="Gratuito com os sistemas macOS e iOS" description="Controlar as permissões de rastreamento dos aplicativos no iPhone:" url="https://support.apple.com/en-is/guide/iphone/iph4f4cbd242/ios" %}}

{{% resource title="Mecanismos e verificações de segurança iOS" languages="Múltiplos" cost="Gratuito com os sistemas macOS e iOS" description="Como a Verificação de Segurança do iPhone funciona para preservar a sua segurança:" url="https://support.apple.com/en-is/guide/personal-safety/ips2aad835e1/web" %}}

{{% resource title="Verificar os dispositivos vinculados ao WhatsApp" languages="Inglês, com aplicativos e guias de ajuda localizados em vários outros idiomas" cost="Grátis" description="Articles for:" url="https://faq.whatsapp.com/378279804439436?helpref=faq_content" %}}

{{% resource title="Verificar os dispositivos vinculados ao Signal" languages="Inglês, com aplicativos e guias de ajuda localizados em vários outros idiomas" cost="Grátis" description="Articles for:" url="https://support.signal.org/hc/en-us/articles/360007320551-Linked-Devices" %}}

{{% resource title="Verificar os dispositivos vinculados ao Telegram" languages="Inglês, com aplicativos e guias de ajuda localizados em vários outros idiomas" cost="Grátis" description="Articles for:" url="https://telegram.org/blog/sessions-and-2-step-verification" %}}


## Notes

[^1]:  Um Programa Potencialmente Indesejado é algo que o usuário não quer no seu sistema, ainda que possa tê-lo baixado e executado voluntariamente. Isso pode incluir programas que enganam acerca da sua funcionalidade ou que exibem várias propagandas.
[^2]: Um hash é como uma breve impressão digital de um arquivo - pode ser usado para identificar um arquivo único, sem revelar o seu conteúdo. Você pode calcular um hash usando [a linha de comando no Windows, macOS, e Linux](https://techdocs.akamai.com/download-ctr/docs/verify-checksum).
[^3]: Ter uma extensão maliciosa no seu sistema não necessariamente significa que você tem outros tipos de malware. Um hacker também pode usar a engenharia social para convencer um usuário a instalar um malware.
[^4]: Se você deseja saber mais sobre o comando spctl, que é responsável pelo Gatekeeper, execute "man spctl" no Terminal macOS para ver a página de manual/documentação.