+++
style = "module"
weight = 5
title = "Métodos de perícia dos sistemas Windows e macOS "
description = "A inspeção direta do dispositivo pode ser necessária para identificar processos suspeitos, artefatos ou tráfego. Verificar de forma mais aprofundada o que está acontecendo com o dispositivo."
+++

## Caso de Uso

A inspeção direta do dispositivo pode ser necessária para entender o que está acontecendo e para identificar processos suspeitos, artefatos ou tráfego. Vá além das ferramentas de varredura e utilize métodos para verificar de forma mais aprofundada o que está acontecendo com o dispositivo.

## Objetivos 

Após concluir este subtópico, os profissionais deverão ser capazes de fazer o seguinte:

* Entender formas de inspecionar os métodos e processos em andamento para identificar processos potencialmente suspeitos
* Entender os mecanismos comum de persistência e as maneiras de verificá-los
* Inspecionar o tráfego da rede para detectar comunicações suspeitas

---
## Conteúdo 
Os métodos de perícia requerem um conhecimento maior sobre as operações internas de um sistema operacional, assim como um instinto mais aguçado ao identificar e diferenciar o que é normal e o que não é.

### Windows

O [Guia Rápido de Perícia](https://pellaeon.gitbook.io/mobile-forensics/pt-br) fornece uma boa introdução acerca das abordagens periciais na inspeção de um dispositivo.  O guia inclui uma introdução às importantes ferramentas Sysinternals, disponibilizadas pela Microsoft. Conclua as seções do guia sobre [Autoruns](https://pellaeon.gitbook.io/mobile-forensics/pt-br/windows/autoruns), [Process Explorer](https://pellaeon.gitbook.io/mobile-forensics/pt-br/windows/processes), e [TCPView](https://pellaeon.gitbook.io/mobile-forensics/pt-br/windows/network).[^1]

Após finalizar as atividades guiadas, você deverá ser capaz de:

* Entender o que é o pacote [SysInternals](https://learn.microsoft.com/pt-br/sysinternals/) e como usar algumas ferramentas úteis à análise pericial.
* Ler e entender os resultados da ferramenta Sysinternals Autoruns, e entender quais são as diferentes localizações e métodos de persistência (entendendo as diferentes abas exibidas no dispositivo).
* Ler e filtrar os resultados das ferramentas Sysinternals Autoruns para identificar somente as que não são Microsoft, os binários sem assinatura, e como verificar os hashes de arquivo contra VirusTotal.
* Saber como ler e entender os resultados do Process Explorer, inclusive como checar os processos em andamento com assinaturas de arquivo não verificadas e como verificar os hashes de processos contra VirusTotal.

As ferramentas SysInternal da Microsoft são amplamente usadas e você poderá encontrar na internet tutoriais adicionais que as utilizam, contudo, o [Guia Rápido de Perícia](https://pellaeon.gitbook.io/mobile-forensics/pt-br) fornece uma boa introdução.

### MacOS

Existem [algumas ferramentas macOS](https://objective-see.org/tools.html) criadas por Objective-See que podem ajudar a detectar atividades potencialmente suspeitas no sistema. Muitas das ferramentas Objective-See possuem uma busca VirusTotal; nós falaremos mais sobre esta ferramenta posteriormente nesta trilha de aprendizagem. Para ver um rápido tutorial sobre VirusTotal, consulte o [capítulo 7 do guia prático](https://internews.org/resource/field-guide-to-incident-response-for-civil-society-and-media/). Recomendamos que todos os alunos que desejam conhecer melhor o macOS consultem as seguintes ferramentas:

* LuLu: um aplicativo de firewall gratuito e rico em funcionalidades para macOS. Ele pode listar todas as conexões à rede em curso e, assim sendo, detectar quaisquer tentativas de comunicação entre o malware e o servidor. Consulte todo o [manual LuLu](https://objective-see.org/products/lulu.html), que mostra como você pode pesquisar por processos específicos que tentam estabelecer uma conexão à rede. Se você não tiver certeza sobre os processos específicos, você também pode pesquisar no VirusTotal (LuLu possui uma pesquisa integrada) ou pesquisar sobre eles no motor de busca da sua preferência e ver o que as outras pessoas falam sobre isso.
* OverSight: Uma ferramenta que alerta o usuário sempre que o microfone ou a webcam estiverem ativados. Se um malware tentar capturar informações através do microfone ou da câmera, a ferramenta deverá alertar o usuário ou o analista.
* KnockKnock e BlockBlock: Esses dois aplicativos detectam os softwares que são lançados quando o usuário faz login no sistema. Assim, ele pode alertar o usuário ou analista de que há presença de malware com persistência -- ou começar a ser executado novamente a cada reinicialização. KnockKnock pode fornecer uma lista de softwares persistentes, enquanto BlockBlock envia um alerta sempre que um novo componente persistente é instalado.
* KextViewer: Uma ferramenta para examinar e inspecionar as extensões kernel, pacotes que ampliam o código central do sistema operacional e funcionam com o mais elevado nível de privilégio.

## Prática

### Windows e macOS

1. Abra o gerenciador de processos do seu sistema operacional e leia os seus resultados. Você nota algum processo que possa parecer fora do lugar ou que consuma uma quantidade estranhamente alta de recursos? Anote-os e pesquise na internet para saber mais sobre eles.
2. Ao buscar conexões de rede conforme descrito no Guia de Perícia Forense para Dispositivos Móveis (artigos para [Windows](https://pellaeon.gitbook.io/mobile-forensics/pt-br/windows/network) e [macOS](https://pellaeon.gitbook.io/mobile-forensics/mac/network)), abra um ou dois aplicativos que se conectam à internet e anote a quais endereços IP eles se conectam. Existe algo surpreendente sobre alguma dessas conexões ou endereços IP?
3. Busque entre os itens que são lançados na inicialização e separe-os entre os que já vieram de fábrica no seu sistema operacional e os que vieram de outras fontes. Procure por três deles online para saber mais sobre o que fazem. Se você estiver trabalhando com um colega ou mentor, fale sobre as suas descobertas com eles.

### Android

Leia este guia: [Guia de principiantes - Como lidar com um app de celular potencialmente malicioso - Pacote de ferramentas PiRogue (pts-project.org)](https://pts-project.org/guides/g3/)

## Teste de capacitação

1. Baixe uma peça de malware recente no Malware Bazaar. Carregue-o num sandbox público (como o Triage) e verifique o que ele faz no sistema.
   Escreva as suas descobertas e converse sobre elas com um mentor ou colega que saberão certificar se você executou este exercício corretamente. 
   (Observação: pode ser que o malware pareça "não fazer nada". Neste caso, fale com o seu mentor ou colega e tente um outro tipo de malware.)
2. (Opcional, exercício adicional) Verifique [esta análise](https://www.trendmicro.com/en_us/research/22/k/earth-preta-spear-phishing-governments-worldwide.html) da empresa de segurança Trend Micro e compare-a com [este relatório](https://tria.ge/240207-qlmmrahhgr/behavioral1) no Triage. Fale sobre isso com um mentor ou colega e concentre-se em questões como as formas pelas quais ambos etiquetam os TTP e tente explicar o malware. Fale sobre qual formato você acha mais legível e o porquê. (Nota: este malware, chamado de 'Earth Preta' pela Trend Micro, também é conhecido como 'Mustang Prada' e visou as organizações de mídia e as ONG, principalmente em Myanmar.)

## Learning Resources

{{% resource title="Perícia forense em dispositivos móveis" languages="Inglês" cost="Grátis" description="Um guia abrangente sobre como realizar perícia forense e triagem na maioria dos principais sistemas operacionais." url="https://pellaeon.gitbook.io/mobile-forensics/" %}}

{{% resource title="Sysinternals" languages="Inglês" cost="Grátis" description="Uma série de excelentes ferramentas que os analistas podem usar para entender melhor o que está acontecendo com um sistema Windows." url="https://learn.microsoft.com/pt-br/sysinternals/" %}}

{{% resource title="Ferramentas Objective-see" languages="Inglês" cost="Grátis" description="Ferramentas de segurança excelentes para macOS que podem ajudar a detectar infecções por malware ou tentativas para obter/extrair dados." url="https://objective-see.org/tools.html" %}}

## Notes

[^1]: A ferramenta CrowdInspect de Crowdstrike não possui uma manutenção ativa e pode não oferecer uma funcionalidade completa, assim, nós recomendamos que se concentre nas ferramentas Microsoft referenciadas nesta seção do guia. Contudo, você ainda poderá obter informações úteis graças à ferramenta, e também ter ideias semelhantes com o uso de ferramentas como Process Explorer e TCPView