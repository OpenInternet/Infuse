+++
style = "module"
weight = 11
title = "Limpeza, cuidados posteriores, gerenciamento de riscos pós-incidente e compartilhamento de informações"
description = "Se um malware ou algum tráfego malicioso for encontrado no dispositivo da pessoa alvo, precisaremos fornecer recomendações específicas"
+++

## Caso de Uso

Se um malware ou algum tráfego malicioso for encontrado no dispositivo da pessoa alvo, precisaremos fornecer cuidados corretivos posteriores ou recomendações específicas para permitir que o cliente determine as próximas etapas apropriadas

## Objetivos 

Após concluir este subtópico, os profissionais deverão ser capazes de fazer o seguinte:

- Determinar o método apropriado de limpeza para o tipo de malware ou indicador de comprometimento descoberto.
- Efetuar ou guiar as etapas de cuidados corretivos posteriores, incluindo a remoção dos mecanismos de persistência, as ferramentas de remoção de malware, os reboots, as reinicializações de fábrica.
- Identificar situações nas quais a limpeza pode não ser possível e determinar quando um aconselhamento ou ações aprofundadas podem ser necessários.
- Documentar e compartilhar as descobertas. 

---

## Conteúdo

### Reativar as funcionalidades de segurança do sistema operacional

Anteriormente nesta trilha de aprendizagem, [nós mencionamos algumas proteções integradas ao sistema operacional](/pt-br/learning-path/2/module-4/#triagemchecklists-para-verificar-proteções-em-falta). Se o malware conseguiu ser executado no dispositivo da pessoa alvo somente porque uma dessas proteções foi desativada, então, reativá-las pode ajudar a evitar que o malware seja executado ou provoque danos mais sérios. Alguns malwares menos sofisticados podem parar de funcionar ou até mesmo serem removidos, simplesmente, indo até às configurações do sistema e reativando as proteções. Caso você não consiga reativar essas proteções ou caso elas tenham sido desativadas novamente após algum tempo, isto indica que o processo malicioso está impedindo o funcionamento adequado do sistema operacional; assim, uma limpeza aprofundada ou a reinicialização de fábrica serão necessários. Observe que em alguns casos, você descobrirá que as proteções do sistema operacional foram desativadas com o intuito de instalar um software pirateado, e isso, o usuário pode não comunicar a você imediatamente. É útil saber dessa hipótese para que você consiga guiar o cliente em decisões de gerenciamento de riscos e encontrar alternativas seguras que preservem a integridade do sistema operacional.

### Reinicializações de fábrica

As reinicializações de fábrica são, muitas vezes, a forma mais simples de limpar um malware de um dado dispositivo. Se o usuário fez o backup de todos os dados que desejam conservar num servidor cloud, ou num disco externo, e for capaz de reinstalar os aplicativos mais usados após uma reinicialização de fábrica, talvez seja esta a opção mais recomendável para lidar com o malware. Se o cliente não estiver certo de possuir o backup de dados importantes, você pode ajudá-los a realizar um backup local ou em cloud. Tenha em mente que os arquivos maliciosos podem ser encontrados em backups (ainda que inertes até que sejam executados), por isso, recomenda-se efetuar uma verificação aprofundada de todas as pastas do backup, utilizando um antivírus de renome. Note que, muitas vezes, os aplicativos e outras configurações do dispositivo não são salvos no backup, dependendo do utilitário de backup utilizado. Sempre é bom testar os backups, por exemplo, tentando restaurar todo o sistema ou alguns arquivos essenciais dele, antes de efetuar uma reinicialização completa de fábrica.

Muitos analistas de malware preferem adotar as reinicializações de fábrica como método de remoção, pois isto dá a eles uma maior certeza de que não há vestígios de malware nos sistemas da pessoa alvo. Sempre há um risco de que os programas de antivírus ou as proteções integradas ao sistema operacional não consigam remover todo o malware, especialmente se trata-se de um malware novo ou raro; assim, a reinicialização de fábrica será certamente um método mais eficiente. A única exceção a isso podem ser os rootkits UEFI e os malwares que afetam o firmware do dispositivo em vez do sistema operacional; estão listados abaixo alguns artigos a respeito.

### Remoção de malware (e quando isto não é possível)

Por vezes, uma reinicialização de fábrica não é possível em virtude de limitações de tempo, de tecnologia ou do quão confortável o usuário se sente com isso. Dependendo da natureza do malware, e do quão conhecido ele é, talvez seja possível removê-lo através de meios automatizados ou manuais. Veja abaixo a lista de conselhos específicos em função da plataforma para obter uma orientação geral.

Em alguns casos, os esforços na remoção do malware serão ineficazes. Um malware integrado no Android ou em versões de um sistema operacional que passou por jailbreak são um dos exemplos desses casos (veja abaixo a seção Android para mais detalhes). Os ataques a hardware/firmware são uma outra classe de malware que pode ser resistente aos esforços de limpeza ou à reinicialização de fábrica. Ainda que raramente, isto ainda ocorre, principalmente e somente em PCs (Windows/Linux), por isso vale a pena saber mais sobre isso. Alguns são detectáveis por programas de antivírus, por exemplo, veja o [ESET sobre um Rootkit UEDI descoberto em 2018](https://www.eset.com/int/uefi-rootkit-cyber-attack-discovered/). Mais dicas e conselhos da Microsoft sobre a caça às ameaças do rootkit UEFI estão disponíveis no [BleepingComputer, aqui](https://www.bleepingcomputer.com/news/security/microsoft-shares-guidance-to-detect-blacklotus-uefi-bootkit-attacks/).

### Conselhos específicos à plataforma

#### Android

* A reinicialização de fábrica está disponível no menu Configurações ou no modo de inicialização.
* Alguns malware/adware/spyware estão integrados ao sistema operacional Android de fábrica, como é o caso em alguns dispositivos Android baratos ou de marca desconhecida. Um exemplo disso está detalhado no relatório do [HUMAN Security on the BADBOX ad fraud botnet](https://www.humansecurity.com/hubfs/HUMAN_Report_BADBOX-and-PEACHPIT.pdf). Infelizmente, na maioria dos casos, esses dispositivos não podem ser limpos pela reinicialização de fábrica e são irrecuperáveis pelo usuário médio e devem ser substituídos por dispositivos de marca, por uma faixa de preço mais elevada.
* Verifique se fontes de app desprotegidas foram ativadas, verificando se quaisquer aplicativos receberam permissão para instalar APKs de 'Fontes Desconhecidas' na seção Configurações. Se sim, busque por aplicativos suspeitos/desconhecidos. 
* Os aplicativos suspeitos ou maliciosos podem ser removidos.
* Proteja todas as contas Google usadas para acessar o dispositivo.
* Certifique-se de que Google Play Protect está ativado e verifique os resultados da verificação (no Google Play -> Menu -> Play Protect).
* Certifique-se de que os componentes do sistema estão atualizados e de que as atualizações de segurança foram instaladas. Você pode verificar a data nas atualizações de segurança do dispositivo, basta ir às Configurações -> Sobre o telefone -> Informações do software (o Versão Android) -> Nível de Patch de Segurança Android. Verifique as atualizações digitando Atualizações de Sistema Google Play. Tenha em mente que os dispositivos mais antigos podem receber atualizações de segurança limitadas.

#### iOS/iPadOS

* Pesquisas publicadas indicam que os exploradores contra os sistemas ativos iOS (inclusive casos como o Pegasus) não resistem a um reboot do dispositivo (não é uma reinicialização de fábrica, mas um simples on/off), então, fazer um reboot é uma boa ideia. Devido ao fato de o agente da ameaça poder reinfectar o dispositivo se estiver usando um explorador de zero-clique, a reinicialização regular é possivelmente prudente, assim como o Modo Lockdown, listado abaixo. Tenha em mente que este nível de ataque ainda é raro e oneroso. Note que os aplicativos configurados ou instalados maliciosamente (ex.: stalkerware, a funcionalidade encontrar meu telefone), ou uma conta Apple ID comprometida ainda afetaria a segurança do dispositivo, então leia abaixo para maiores detalhes sobre as ações a efetuar.
* Desinstale os apps suspeitos ou maliciosos.
* Considere ativar o [Modo Lockdown](https://support.apple.com/en-us/105120).
* Certifique-se de que a conta Apple iCloud é privada e não acessível por outra pessoa. Qualquer usuário iOS pode usar o [Apple Safety Check](https://support.apple.com/guide/personal-safety/how-safety-check-works-ips2aad835e1/1.0/web/1.0) para auditar se outros têm acesso a qualquer das suas contas.
* Verifique se foi feito jailbreak no dispositivo. [Alguns conselhos fornecidos](https://www.certosoftware.com/insights/how-to-tell-if-your-iphone-is-jailbroken/) por Certo Software incluem verificar por Cydia ou Sileo ou utilizar o seu app gratuito Certo Mobile Security.
* Verifique registros (indesejáveis) na Gestão do Dispositivo Móvel (vá em Configurações -> Geral -> Perfis).
* Efetue uma reinicialização de fábrica seguindo [este guia](https://support.apple.com/en-gb/HT201274) (Isto removerá todas as fotos, mensagens e arquivos do telefone. A menos que um backup tenha sido feito, tudo isso será definitivamente perdido).

#### Windows

- A restauração de fábrica é uma melhor solução. A maioria dos dispositivos que foram adquiridos com Windows pré-instalado, terão uma partição de recuperação a partir da qual você pode realizar uma reinicialização de fábrica ou uma 'atualização' do Sistema Operacional
- Executar um Antivírus no 'Modo de Segurança' Windows pode ser mais eficaz para as infecções em quarentena que foram descobertas. Contudo, isso também pode acabar não identificando os malwares 'sem arquivo', que são efetivos durante a operação normal do sistema operacional.
- Verifique os mecanismos de persistência do malware usando SysInternals AutoRuns, desative-os e certifique-se, após as atividades de limpeza, de que não foram reativados.
- Alguns criadores de Antivírus fornecem um 'disco de recuperação' que lhe permite inicializar com um sistema ativo temporário no qual você poderá efetuar os scans e as atividades de remoção de malware. Uma lista de opções bem conceituadas é [fornecida aqui, por TechRadar](https://www.techradar.com/best/best-antivirus-rescue-disk).
- Cuidado com muitos dos "guias de remoção de malware para Windows" encontrados na internet, que parece serem personalizados para variantes específicas de malware. Muitos deles são guias genéricos que promovem o uso de uma determinada ferramenta que pode ser um software indesejável.

#### MacOS

- A reinicialização de fábrica é recomendável, veja [aqui as instruções da Apple](https://support.apple.com/en-ug/HT212749).
- Os antivírus comerciais possuem uma funcionalidade de limpeza e de quarentena.
- Utilize [as ferramentas Objective-See](https://objective-see.org/tools.html) tais como Knock Knock e Kext Viewer para verificar e desativar quaisquer processos persistentes e extensões kernel.

### Compartilhamento de informações e Gerenciamento de riscos pós-incidente

Compartilhar as suas descobertas com o seu cliente e trabalhar com eles para entender de que forma a infecção por malware pode ter ocorrido é uma etapa importante que lhes permite atualizar suas abordagens de gerenciamento de riscos e entender a significância (ou a insignificância) do incidente de segurança.

Faça o máximo possível de anotações técnicas, capturas de tela e amostras (ou seus hashes) e converse com o seu cliente sobre o seu modelo de ameaça e a que nível você pode compartilhar as suas descobertas com a comunidade de forma mais ampla. Compartilhar as suas descobertas é algo particularmente valioso se você encontrar uma nova ameaça ou alguma que vise os membros da comunidade, especificamente com base no trabalho que fazem; neste caso, falar com os outros sobre os hashes de malware, os vetores de infecção e os mecanismos de mitigação o ajudará a proteger as pessoas que correm o maior risco. Você pode usar alguma informação da seção Descobertas dos [Documentos da trilha](/pt-br/learning-path/1/module-8) de aprendizagem Detectando, Investigando e Rastreando Infraestruturas Maliciosas quando redigir um breve relatório e quando considerar a sua disseminação.

## Teste de capacitação

Faça um fluxograma ou uma lista de verificação que pode ajudá-lo a remover malware de um dispositivo e certificar-se de não ter pulado nenhuma etapa. Fale sobre este fluxograma ou lista de verificação com o seu colega ou mentor para ter a certeza de que está correta e de que você não deixou nada de lado.

Escreva um breve parágrafo explicando em quais situações você recomenda que as pessoas que foram visadas por uma infecção bem-sucedida de malware troquem as senhas das suas principais contas (e-mail, iCloud, redes sociais, trabalho) depois do ataque e como você explicaria isso a uma pessoa à qual presta suporte. Mostre esse parágrafo a um colega ou mentor, que verificará se a sua explicação é correta.

## Recursos de aprendizagem

{{% resource title="Descoberta de um ciberataque do Rootkit UEFI" languages="Inglês" cost="Grátis" description="Uma análise feita em 2018 por uma empresa de segurança que descreve um rootkit UEFI: um malware integrado num nível inferior ao sistema operacional, para que não seja destruído por uma simples reinstalação do sistema operacional." url="https://www.eset.com/int/uefi-rootkit-cyber-attack-discovered/" %}}

{{% resource title="A Microsoft compartilha orientações para detectar os ataques bootkit do BlackLotus UEFI" languages="Inglês" cost="Grátis" description="Um panorama geral acerca de um outro malware mais recente, que opera num nível inferior ao do sistema operacional, juntamente com outras etapas que um analista pode efetuar a fim de detectá-lo." url="https://www.bleepingcomputer.com/news/security/microsoft-shares-guidance-to-detect-blacklotus-uefi-bootkit-attacks/" %}}

{{% resource title="Tudo sobre os Trojans: BADBOX e PEACHPIT" languages="Inglês" cost="Grátis" description="Um relatório aprofundado que examina os malwares pré-instalados nos dispositivos, mais provavelmente já de fábrica, o que faz com que sejam extremamente difíceis de serem removidos. Um bom exemplo que mostra o motivo de os dispositivos usados para trabalhos sensíveis serem de fabricantes bem conceituados." url="https://www.humansecurity.com/hubfs/HUMAN_Report_BADBOX-and-PEACHPIT.pdf" %}}

{{% resource title="De que forma as verificações de segurança do seu iPhone ajudam a preservar a sua segurança" languages="Inglês" cost="Grátis" description="Uma funcionalidade do iOS que permite que qualquer usuário possa examinar quais informações estão compartilhando e se é necessário cessar este compartilhamento." url="https://support.apple.com/guide/personal-safety/how-safety-check-works-ips2aad835e1/1.0/web/1.0" %}}

{{% resource title="Como saber se o seu iPhone sofreu um jaibreak" languages="Inglês" cost="Grátis" description="Um breve resumo sobre alguns heurísticos iniciais que você pode fazer para verificar se o seu dispositivo iOS sofreu um jailbreak." url="https://www.certosoftware.com/insights/how-to-tell-if-your-iphone-is-jailbroken/" %}}

{{% resource title="Como efetuar uma reinicialização de fábrica no seu iPhone, iPad ou iPod touch" languages="Inglês" cost="Grátis" description="Um breve guia que fala sobre como limpar completamente um dispositivo iOS, o que deve trazer uma maior certeza de que qualquer malware ou perfil malicioso foi devidamente removido." url="https://support.apple.com/en-gb/HT201274" %}}

{{% resource title="Os melhores discos de recuperação antivírus de 2024" languages="Inglês" cost="Grátis" description="Uma lista de ferramentas que você pode usar para efetuar um scan e limpar um sistema operacional infectado, durante a reinicialização de um drive externo." url="https://www.techradar.com/best/best-antivirus-rescue-disk" %}}

{{% resource title="Apague o seu Mac e efetue uma reinicialização com as configurações de fábrica" languages="Inglês" cost="Grátis" description="Um breve guia que fala sobre como limpar completamente um dispositivo macOS, o que deve trazer uma maior certeza de que qualquer malware ou perfil malicioso foi devidamente removido." url="https://support.apple.com/en-ug/102664" %}}

{{% resource title="Ferramentas Objective-see" languages="Inglês" cost="Grátis" description="Uma série de ferramentas de segurança para macOS, desenvolvidas por um pesquisador de renome em matéria de segurança, e que podem ser usadas para detectar a presença de malware." url="https://objective-see.org/tools.html" %}}