---
style: module
title: Competências interpessoais para a detecção de malware
description: Antes de você começar a analisar qualquer malware,
  você precisa configurar um ambiente seguro. Os malwares prejudica
  os sistemas nos quais funcionam e você não deve fazê-lo funcionar
  no seu sistema primário.
weight: 1
---
## Caso de Uso

Antes de você começar a analisar qualquer malware, você precisa configurar um ambiente seguro. Os malwares, como sua própria definição nos sugere, prejudica os sistemas nos quais funcionam. Você não deve fazê-lo funcionar no seu sistema primário. Ademais, você deve impedir que o malware estabeleça conexões com os servidores C\&C (comando e controle) do agente da ameaça. Nestes casos, você deverá configurar uma máquina virtual para usar sempre que for efetuar uma análise de malware.

## Objetivos

Após a conclusão deste subtópico, os profissionais serão capazes de prestar suporte de forma responsável para os alvos que receberam e-mails ou clicaram em links maliciosos.

Os profissionais também deverão ser capazes de:

* Explicar o âmbito do trabalho e as informações coletadas
* Tranquilizar o cliente acerca da sua própria segurança e da segurança dos seus dados
* Preparar um acordo de confidencialidade simples com o cliente, se necessário
* Estabelecer um diálogo de triagem para ajudar a determinar quando são necessárias investigações mais aprofundadas

- - -

## Conteúdo

### Conhecimentos básicos

O Security Education Companion contém vários conselhos em termos de interações atenciosas, cuidadosas e capazes de limitar os danos, no papel de assistente tecnológico. Se você ainda não está familiarizado com este tipo de conteúdo, recomendamos fortemente que você consulte o [Security Education 101](https://www.securityeducationcompanion.org/articles).

* Após ter lido os recursos acima, você deve ser capaz de:
* Entender de que forma a avaliação dos riscos é importante em todas as interações
* Entender os riscos inerentes ao fato de manipular os dispositivos das pessoas ou de ter acesso às suas contas;
* Entender os riscos ao adotar um discurso alarmista
* Entender suas próprias limitações, tanto em termos de capacidades técnicas como em termos de aptidão para prestar suporte a uma dada pessoa ou comunidade, bem como os riscos inerentes
* Evitar sugerir preferências em termos de plataformas, tecnologias, open-source vs closed-source, etc., no âmbito das suas interações no papel de assistente.

### Conhecimentos específicos do Percurso

Depois que você estiver familiarizado com os conhecimentos básicos acima, reflita atentamente sobre quais capacidades interpessoais podem ser necessárias para esta trilha de aprendizagem específica. Cada trilha de aprendizagem e cada intervenção são diferentes; cada uma deve ter sua própria narrativa e suas próprias preocupações. 

Você deve ser capaz de:

* Lembrar-se de que os criadores do malware não pretendem apenas obter dados, mas também assustar as pessoas e fazer com que pensem que estão sendo observadas perpetuamente. Os ataques de malwares que têm por alvo a sociedade civil, geralmente têm o objetivo de coletar dados e intimidar
* Reconhecer que muitas pessoas que são alvo de malware possuem dados extremamente sensíveis armazenados nos seus dispositivos, que poderiam impactar tanto a sua vida pessoal como profissional. A detecção e investigação de malware será um processo estressante para eles, porque precisam se preocupar sobre quais informações podem ter possivelmente vazado aos adversários, e devem dar o controle dos dispositivos a protetores digitais que prestam o devido suporte, o que pode fazer com que se sintam ainda mais vulneráveis. Esteja pronto para falar sobre práticas de tratamento de dados, inclusive as formas de criptografar o drive no qual está fazendo a detecção e de que forma pretende processar e deletar os dados após a finalização do processo;
* Entenda que muitas pessoas que trabalham na sociedade civil estão cientes dos riscos que enfrentam a nível pessoal, mas também se preocupam demais com a família, amigos e fontes às quais os dados podem ter vazado ou que podem ser visadas
* Fale com as pessoas sobre quaisquer riscos potenciais envolvendo o processo de detecção de malware (os adversários podem descobrir, o acesso aos dispositivos pode ser perdido, o processo pode não ter um resultado satisfatório)
* Entenda que os conhecimentos técnicos, os níveis de competências e os recursos variam amplamente de pessoa para pessoa. Um grupo da sociedade civil pode considerar fácil a tarefa de bloquear os dispositivos e reduzir as chances de infecção por malware, enquanto outros podem ter dificuldade até mesmo em encontrar dispositivos que ainda recebam atualizações de software
* Esteja sempre pronto para explicar de que forma um mesmo método de análise pode, por vezes, produzir muitos dados e, por outras, muito poucos, e esteja disposto a lidar com as expectativas do cliente em função do resultado;
* Considere o fato de que alguns grupos da sociedade civil podem querer assinar um NDA (acordo de confidencialidade) ou equivalente antes de compartilharem seus dados ou dispositivos. 

Lembre-se de que os outros subtópicos desta trilha de aprendizagem também fornecem conselhos sobre o desenvolvimento de habilidades interpessoais, a fim de prestar um suporte atencioso e voltado à redução dos danos neste contexto. 


### Entender: Redução dos Danos & Segurança Operacional

Quando uma amostra de malware é compartilhada com você, é possível que o dano já tenha sido causado à pessoa alvo do mesmo. O malware pode já ter colhido os dados, e a pessoa também pode sofrer do impacto psicológico inerente ao fato de ser um alvo monitorado. É importante dar o apoio necessário à pessoa alvo, ao mesmo tempo em que evita danos à si mesmo durante a interação ativa com o conteúdo malicioso.

A redução dos danos para a pessoa alvo deve começar com a coleta de algumas informações sobre as ações tomadas e as circunstâncias nas quais interagem com os dispositivos em questão. Você pode fazer algumas perguntas às pessoas que conhece bem, como os colegas, e outras perguntas às pessoas que conhece menos. Aqui estão algumas perguntas que devem ser feitas: Qual é o modelo da ameaça? Por acaso trata-se de um blogueiro anônimo? Um dissidente exilado que está tentando ocultar a sua localização?

As respostas a tais perguntas o ajudarão a reduzir eficazmente os danos e a conduzir as suas investigações. Conforme avança na sua análise e entende o conteúdo malicioso, não deixe de atualizar a pessoa alvo, especialmente no tocante à redução dos danos.

Quanto à segurança operacional, para proteger-se enquanto trabalha com e-mails maliciosos, conclua o subtópico 3 (Manuseio Seguro dos Links e Infraestrutura) da trilha de aprendizagem acerca da detecção, monitoramento e investigação de infraestrutura maliciosa.


### Entender: Detecção, Descobertas Negativas e Paranoia

O spyware é um ataque extremamente invasivo contra indivíduos, famílias, comunidades e movimentos. Entenda que a informação e a análise - quer seja positiva ou negativa - que fornece a um cliente pode ser extremamente consequencial, e informe-o acerca das decisões arriscadas que podem tomar com relação aos seus dispositivos. Desse modo, é importante ser sempre claro acerca do verdadeiro alcance e significância de qualquer trabalho de detecção e determinação que fornece aos clientes.

Fora dos ambientes altamente controlados e dos dispositivos monitorados, as plataformas de sistema operacional mais modernas são mais difíceis de serem acessadas integralmente no tocante à investigação de algum comprometimento ou infecção, especialmente se ataques sofisticados de dia-zero forem utilizados. Assim, você nunca será capaz de determinar com 100% de certeza se um dispositivo está livre de malware. Você pode apenas afirmar que, usando a técnica que você implementou, e com as competências que possui, não conseguiu encontrar malware. Isto não significa que não há malware, apenas que os testes utilizados não conseguiram identificar a presença de um.

Ao mesmo tempo, sabemos que a paranoia é um fenômeno comum, no qual a sensação de estar sendo observado (justificada ou não) é uma experiência negativa enfrentada pelos ativistas, jornalistas, líderes políticos ou demais clientes para os quais está trabalhando. É preciso andar sobre uma linha tênue ao determinar um equilíbrio entre fornecer provas técnicas eficazes para conhecer as probabilidades de um monitoramento ativo, e a consciência de que não se pode ter um excesso de confiança nem um medo infundado de ser monitorado. 


### Triagem da situação e do dispositivo

A triagem é uma etapa necessária, durante a qual você coleta informações e as utiliza para decidir se deve investir tempo em investigações mais aprofundadas. Enquanto a triagem efetiva conta com conhecimentos técnicos e instintos, também requer habilidades interpessoais para abordar o cliente com empatia, levar a sério suas preocupações, escutá-lo ativamente e entender a situação na qual se encontra.

* Durante as conversas iniciais, procure averiguar:
* Existe algum motivo em especial que faz com que o cliente queira verificar o seu dispositivo, ou trata-se apenas de um medo geral, de curiosidade, de alguma suspeita ou mera prudência? 
* Motivos e explicações específicos o ajudarão a determinar precisamente o alvo da sua busca, por exemplo:
  * Alguma mudança no desempenho do dispositivo 
  * Um incidente físico, como o manuseio do dispositivo por terceiros, ou sua retenção e restituição pelas autoridades
  * Um incidente técnico, como a instalação de um software ou aplicativo, ou o fato de ter clicado num link suspeito
  * Um aviso, um indicador ou um alerta de segurança

Existem muitas explicações alternativas para a alteração do desempenho de um dispositivo, tais como hardware obsoleto ou defeituoso, bugs de software, falta de atualizações, configurações inadequadas. E, é claro, a infecção e comprometimento por um malware também existe e faz parte dos fatores que podem explicar a diminuição do desempenho do dispositivo. Então, a descoberta de falhas nas configurações, de softwares não atualizados ou de baixos recursos do dispositivo não é suficiente para refutar a hipótese de um malware.

Use uma combinação de questionamento interpessoal e interação com o seu cliente, além de ter acesso ao dispositivo em questão (se possível e apropriado), a fim de determinar quando um acompanhamento aprofundado será necessário. E, quando não for possível conduzir investigações, quer seja em virtude de tempo limitado, de falta de recursos ou de habilidades, sempre é preferível compartilhar recursos que permitirão ao seu contato tomar as medidas necessárias para investigar e proteger seus dispositivos.

A configuração exata de que precisa depende do seu método de análise e do sistema operacional do malware que você está analisando. Na maioria dos casos, você pode começar com uma VM Linux pré-configurada, como [REMnux](https://remnux.org/). Consulte o [Capítulo 6 do Guia Prático de Resposta a Incidentes para Sociedade Civil e Mídia](https://internews.org/wp-content/uploads/2023/11/Field-Guide-to-Threat-Labs.pdf) para obter instruções passo a passo sobre como configurá-la. Para coisas mais específicas (por exemplo, análise dinâmica do malware iOS), você precisará de ferramentas adicionais (tais como um iPhone ou iPad no qual tenha sido feito um jailbreak). As VM (máquinas virtuais) ocasionalmente possuem vulnerabilidades que permitem que os softwares que operam nas VM ataquem o sistema operacional hospedeiro. A maioria dos malwares sequer chegam perto deste nível de sofisticação, mas na dúvida, é mais seguro analisar o malware num dispositivo físico diferente, que será limpo posteriormente.

Para configurar o REMnux, recomendamos que siga os passos destacados no [Capítulo 6 do Guia Prático de Resposta a Incidentes para Sociedade Civil e Mídia](https://internews.org/wp-content/uploads/2023/11/Field-Guide-to-Threat-Labs.pdf) e [baixe a VM](https://docs.remnux.org/install-distro/get-virtual-appliance)[^1]. Esta é uma maneira fácil de começar e que proporciona uma proteção excelente e uma isolação eficaz entre o seu sistema hospedeiro e o ambiente REMnux. Cuide para não compartilhar dados sensíveis do seu sistema operacional hospedeiro com a VM. Conforme as instruções acima, faça uma captura da sua VM quando tiver sido configurada, e antes de começar a trabalhar com qualquer malware. Você pode usar as capturas para fazer com que a sua VM volte para um bom estado de funcionamento anterior, como estava antes de analisar os diferentes malwares, e isolar os diferentes clientes uns dos outros. Para mais informações sobre capturas de VM em geral, veja [este artigo](https://www.nakivo.com/blog/vm-snapshot-vs-backup/).

Enquanto você realiza a análise do malware, pode acabar precisando de ferramentas adicionais na sua VM de análise. Instale-as e configure-as, mas anote o que fez. Uma vez que finalizou a análise, você pode carregar a sua captura "limpa" de VM, instalar e configurar a ferramenta, e fazer uma nova captura "limpa" para a sua próxima análise.

Para mover os malwares, a prática padrão consiste em colocá-los em arquivos ZIP criptografados. Neste caso, a qualidade da encriptação é irrelevante. O principal é não guardar secreto o malware, a fim de prevenir seu lançamento não intencional em outros sistemas, e também para evitar que os sistemas anti-malware os detectem ou os deletem. Sinta-se livre para incluir uma senha no nome do arquivo ZIP.

## Prática

Reflita e responda/dialogue sobre os pontos a seguir com seus pares, colegas, amigos ou um mentor. Se disponível e adequado, fale com um 'cliente' com o qual trabalhou anteriormente a fim de perguntar a ele sobre sua opinião e experiências com relação a algumas dessas questões.

* Descreva de que forma manusear e ter acesso ao dispositivo de alguém pode apresentar riscos imprevistos.
* Imagine que você está prestando suporte para uma pessoa que possui dados sensíveis no seu dispositivo. Como você abordaria o diálogo com esta pessoa com relação ao acesso e tratamento dos dados?
* Por que é impossível dizer que um dispositivo está livre de malware?
* De que forma a compreensão acerca do modelo específico de ameaça de uma pessoa impacta os seus esforços em prol da redução dos danos, por exemplo, se tratar-se de um blogueiro anônimo ou de um dissidente exilado? 
* Como você oscila entre fornecer provas técnicas concretas, conforme a sua competência, ao mesmo tempo em que equilibra a balança entre não dar uma falsa confiança nem deixar o cliente paranoico?
* Descreva as suas próprias capacidades e limitações para a realização da detecção de malware
* Depois de tentar descrever este ponto, procure acrescentar mais nuances e precisão à sua descrição.
  * Quais podem ser os riscos caso você continue sem reconhecer as suas limitações?
* Encene uma interação na qual você relata ao cliente uma descoberta de malware ativo num dispositivo.


## Teste de capacitação

Com um Mentor ou Colega

* Explique ao seu mentor/colega ou grupo de colegas as suas respostas às questões Práticas acima.
* Encene algumas interações descritas nas questões Práticas acima:
  * Diálogo inicial com o cliente
  * Explicação do modelo de ameaça
  * Descrição de uma descoberta negativa (ausência de malware), inclusive uma explicação acerca das limitações da avaliação
  * Informação acerca de uma descoberta positiva (presença de malware)
* Se possível, peça que alguém assista as suas interações atuais e o seu processo de resposta a incidentes com o cliente e forneça um feedback sobre a sua forma de oscilar entre os diferentes elementos interpessoais da interação

## Learning Resources

{{% resource title="Security Education 101" languages="Inglês" cost="Grátis" description="Um recurso popular sobre como ensinar e falar sobre segurança digital" url="https://www.securityeducationcompanion.org/articles" %}}

## Notes

[^1]: REMnux não está disponível em processadores ARM, como os computadores Apple Silicon. Enquanto é possível virtualizar as arquiteturas CPU usando emuladores como QEMU ou UTM (o VirtualBox não funciona atualmente em arquiteturas ARM), o desempenho será afetado e isso não é recomendado. Seria muito mais sensato selecionar uma outra distribuição Linux que seja suportada pelo seu hardware, e [instalar os pacotes de software necessários](https://www.digitalocean.com/community/tutorials/package-management-basics-apt-yum-dnf-pkg) para completar as atividades, se já não vierem instalados no sistema operacional. Kali Linux é uma distribuição de Linux que inclui ou suporta diversas ferramentas também encontradas no REMnux. Se você possui um dispositivo Apple Silicon, você pode usar [UTM](https://mac.getutm.app/) para fazer funcionar a imagem do instalador Apple Silicon (ARM64) [Kali Installer](https://www.kali.org/get-kali/#kali-installer-images). Guias passo a passo também estão disponíveis para [UTM](https://docs.getutm.app/guides/kali/) e [Kali](https://www.kali.org/docs/virtualization/install-utm-guest-vm/). No presente momento, um bug que afeta o processo de instalação requer uma etapa adicional durante a anexação de um terminal virtual ambos os guias descrevem este processo. Você também pode obter uma [kali-armversão ARM do Kali para o Raspberry Pi](https://www.kali.org/get-kali/#kali-arm), e a maioria dos modelos de Raspberry Pi são suportados. 