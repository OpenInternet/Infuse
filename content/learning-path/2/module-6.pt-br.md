+++
style = "module"
weight = 6
title = "Detectando malware através da análise de tráfego"
description = "This optional subtopic teaches you to use a Raspberry Pi to conduct traffic analysis while searching for potential malware"
+++

## Caso de Uso

A maioria dos malwares tentarão estabelecer algum tipo de conexão à rede, conectar-se a um comando e controlar o servidor para dar maiores instruções, ou extrair dados de um computador. Enquanto várias táticas podem ser usadas pelos malwares para evitar que sejam detectados pelos motores de verificação de antivírus, em muitos casos, um analista com acesso a todo o tráfego da rede a partir do dispositivo, pode identificar essas conexões às redes suspeitas e analisá-las para buscar sinais de atividade maliciosa. 

Use isso quando você for capaz de configurar uma solução de análise de tráfego em linha, por exemplo, usando um dispositivo com hotspot WiFi funcionando com Raspberry Pi, como em algumas ferramentas sobre as quais falamos no presente percurso. Outras opções podem incluir usar portas TAP ou SPAN para capturar o tráfego de todos os usuários de uma rede local, como num espaço de escritório.

_Nota para os alunos: este subtópico presume que você tenha acesso ao Raspberry Pi. Se não for este o caso, você pode pular e passar ao próximo._

## Objetivos 

Após concluir este subtópico, os profissionais deverão ser capazes de fazer o seguinte:

- Falar com o cliente sobre a abordagem de análise de tráfego sugerida, não esquecendo de explicar o processo, os riscos e as limitações da ação
- Selecionar uma ferramenta de análise de tráfego apropriada e implementá-la usando as configurações de hardware ou software pertinentes
- Investigar e entender quais conjuntos de regras ou heurísticas estão sendo usadas por cada abordagem de análise de tráfego de rede e entender seus pontos fortes e fracos
- Ler os resultados de fluxos de rede sinalizados e ser capaz de efetuar uma triagem para saber quais resultados requerem investigações aprofundadas ou ações de remediação de risco

---
## Conteúdo
Em vez de procurar por arquivos e processos que estão sendo executados num dispositivo, os malwares também podem ser identificados pelas comunicações que iniciam com a rede ou às quais respondem. Esta abordagem oferece várias vantagens em comparação à análise com base no dispositivo, pois é difícil para um malware evitar estabelecer comunicações com a rede num dado momento e, em alguns casos, você poderá até mesmo investigar vários dispositivos ao mesmo tempo.

### Captura de Tráfego usando um Raspberry Pi
Nesta seção, vamos ver duas ferramentas: o pacote de ferramentas PiRogue e SpyGuard. Ambas essas ferramentas requerem hardware adicional (um computador pequeno e barato, chamado Raspberry Pi e um cartão SD).

‼️ Após ter assimilado os conhecimentos sobre uma dessas duas ferramentas, você deve ser capaz de:

- Instalar a ferramenta selecionada no cartão SD do Raspberry Pi e efetuar as configurações iniciais
- Acessar o painel de controle da ferramenta
- Conectar os dispositivos ao hotspot WiFi
- Identificar os dispositivos conectados ao hotspot (se vários dispositivos forem conectados ao mesmo tempo)
- Ler e interpretar as descobertas suspeitas e selecionar quais requerem investigações aprofundadas ou medidas de remediação de risco
- Avançado: configurar o logging e as notificações na ferramenta selecionada
- Avançado: Efetuar a captura do tráfego para investigações aprofundadas

#### Pacote de Ferramentas PiRogue

O pacote de ferramentas PiRogue é um conjunto de ferramentas que transforma o Raspberry Pi numa estação de análise de malware. Foi desenvolvido pela Defensive Lab Agency. Serve como roteador intermediário, que fica entre o dispositivo que você suspeita estar infectado e a internet, e captura e analisa todos os servidores e serviços com os quais o dispositivo infectado tenta se comunicar. Isto pode ser usado para identificar atividade de malware potencial.

Se você estiver interessado em utilizar estas ferramentas, consulte a [excelente documentação](https://pts-project.org/docs/prologue/introduction/) fornecida pelo autor. Recomendamos que comece com o guia de principiantes, que fala sobre [como configurar o PiRogue](https://pts-project.org/guides/g1/) e [como conduzir a sua primeira análise](https://pts-project.org/guides/g2/).

#### SpyGuard

Uma ferramenta alternativa, chamada SpyGuard, também pode ser executada no Raspberry Pi ou outro dispositivo Linux e também funciona como roteador intermediário. Em contraste com o Pacote de Ferramentas PiRogue, que se concentra principalmente nas análises de rede mais avançadas, o SpyGuard se concentra em verificar o tráfego da rede para buscar IoCs conhecidos e [comportamento potencialmente suspeito](https://github.com/SpyGuard/SpyGuard/wiki/Detection-methods-and-IOCs), como o estabelecimento de contato com domínios registrados recentemente ou o uso de portas inabituais. Spyguard é uma ramificação de um outro projeto chamado TinyCheck, que foi originalmente concebido por um abrigo de mulheres francesas para detectar vestígios de stalkerware (um malware usado para espiar as pessoas de forma não consensual, muitas vezes instalado por parceiros abusivos) nos dispositivos móveis. Porém, as suas capacidades se expandiram e ele agora pode ser usado para testar muitos outros tipos de malware. Você pode ler um pouco mais sobre o SpyGuard [na sua página github](https://github.com/SpyGuard/SpyGuard/).

### Outras Abordagens

#### Firewalls de saída

Usar um dispositivo de firewall 'barulhento', que pede permissão para cada processo que solicite o envio do tráfego internet é uma forma útil, porém incômoda de identificar os processos que estão fazendo conexões à rede e, potencialmente, identificar comunicações suspeitas. Isto requer um nível de familiaridade com processos comuns na plataforma da sua escolha, a fim de identificar processos não suspeitos, assim como a capacidade de pesquisar por blocos de IP e efetuar consultas de DNS. Deixar isto ativo no computador de um cliente pode nem sempre ser a melhor ideia, pois é difícil investigar adequadamente cada processo, contudo, como profissional da segurança digital, é útil saber realizar este trabalho e pode valer a pena fazer isso no seu próprio dispositivo ou quando estiver investigando o dispositivo de um cliente. Alguns firewalls de endpoint nesta categoria incluem:

* MacOS
  * [LuLu](https://objective-see.org/products/lulu.html) (Open Source, Gratuito)
  * [Little Snitch](https://www.obdev.at/products/littlesnitch) (Pago) ou [Little Snitch Mini](https://www.obdev.at/products/index.html) (Proprietário, Gratuito)
* Windows
  * [PortMaster](https://safing.io/) (Open Source, versões Gratuita/Paga disponíveis, com funcionalidade de histórico/investigação de rede)
  * [GlassWire](https://www.glasswire.com/) (Proprietário, versões Gratuita/Paga disponíveis)
* Android
  * [NetGuard](https://github.com/M66B/NetGuard) (Open Source Gratuito/versão Freemium disponível com captura/histórico de tráfego)
  * [AFWall+](https://github.com/ukanth/afwall) (Open Source, Gratuito)
* Linux
  * [OpenSnitch](https://github.com/evilsocket/opensnitch) (Open Source, Gratuito)


Firewalls de saída podem ser difíceis de entender à primeira vista. A relação sinal-ruído está longe de ser a melhor, e nós primeiramente recomendamos que trabalhe junto de pessoas que possuem a devida experiência com tais ferramentas antes de contar com eles para a sua própria análise.

#### Análise de Tráfego de Terceiros

O tráfego pode ser capturado e filtrado ou analisado por terceiros. Um dos serviços semi-automatizados é o [Emergency VPN](https://www.civilsphereproject.org/emergency-vpn), executado pelo projeto Civilsphere na Czech Technical University. Um perfil VPN pode ser gerado e instalado em qualquer plataforma. Após ter-se conectado ao VPN e ter deixado correr o tráfego no dispositivo durante 24 horas, o serviço Emergency VPN enviará automaticamente uma análise gerada automaticamente que sinalizará quaisquer descobertas iniciais. Subsequentemente, o tráfego do dispositivo será retido e analisado manualmente por um analista, e um relatório manual será enviado caso alguma descoberta maliciosa tenha sido feita. Esta é uma forma de terceirizar as habilidades de análise quando necessário. Certifique-se de que você o seu cliente entendem as consequências à privacidade e esteja confortável com riscos relacionados à captura externa de tráfego.

Se você tiver um momento para fazer isso e estiver confortável com as consequências em termos de privacidade ao compartilhar os seus dados com a equipe Emergency VPN, recomendamos que você leia mais sobre o serviço, utilize-o durante alguns dias e analise os dados que receberá depois. Após ter feito isso, você deve ser capaz de:

- Entender como funciona o serviço Emergency VPN
- Solicitar um perfil Emergency VPN e instalá-lo na sua plataforma selecionada
- Ler e entender o primeiro relatório automatizado Emergency VPN e analisar os resultados para identificar quaisquer descobertas suspeitas para conduzir investigações mais aprofundadas

Em outros casos, se você estiver trabalhando com um analista externo, ele pode pedir que você execute um processo VPN semelhante ou que execute um utilitário para que possa capturar o tráfego da rede, geralmente num arquivo PCAP (Packet CAPture), para compartilhamento e revisão externa.

#### Análise Manual de Tráfego & Monitoramento Organizacional

Se você estiver disposto a levar esta habilidade ainda mais adiante, você precisará desenvolver habilidades sobre captura de tráfego, filtragem e análise, usando ferramentas como Suricata, Zeek, e Wireshark. Veja abaixo alguns recursos sugeridos para aprender mais sobre isso:

- [Malware-traffic-analysis.net](https://www.malware-traffic-analysis.net/) -  Contém anos de blogs e tutoriais, inclusive arquivos PCAP para praticar as habilidades de detecção e análise
- Curso: [Network Security Monitoring with Suricat ](https://www.pluralsight.com/courses/network-security-monitoring-suricata) (Monitoramento de Segurança da Rede com Suricata) (Pluralsight, Gratuito) 
- Curso: [Threat Hunting Training course](https://www.activecountermeasures.com/hunt-training/) (Treinamento de Caça às Ameaças)

Considere também aprender sobre as implantações organizacionais de tais ferramentas em diversas categorias, por exemplo, usando [Security Onion](https://github.com/Security-Onion-Solutions/securityonion), [pfsense](https://www.pfsense.org/)/[Opensense](https://opnsense.org/), [AC-Hunter CE](https://www.activecountermeasures.com/ac-hunter-community-edition/), [RITA](https://github.com/activecm/rita), e [Wazuh](https://wazuh.com/).

### Entender: Limitações & Privacidade

Assim como com tudo o que é abordado nesta trilha de aprendizagem, existem pontos fortes e fracos em cada método de detecção de malware, e eles somente serão eficazes de usados em conjunto com as capacidades e a experiência adequadas, e por vezes requerem acesso aos canais certos de ameaças ou ao conjunto de regras. A análise da rede não é diferente.

A abordagem de análise de tráfego combina regras rigorosas como *este IP é conhecido por ser malicioso*, juntamente a regras mais heurísticas como *tráfego de saída inabitual a um novo IP* ou *uso inesperado de porta/protocolo*. Devido ao fato de a antiga abordagem basear-se nos IoCs, ela pode apenas identificar malwares bem conhecidos e documentados. Enquanto a abordagem heurística mais recente pode ser capaz de identificar um novo malware, ela muitas vezes requer capacidades de análise adicionais para capturar e examinar manualmente o tráfego numa ferramenta como Wireshark, ao mesmo tempo em que usa regras adicionais e IoCs para caçar ameaças específicas. Diversos recursos para aprender habilidades de análise adicionais estão adicionados em links na tabela de recursos abaixo.

Alguns malwares mais sofisticados podem extrair dados ou servidores de contato de formas bem sutis e ocultas, o que muitas vezes complica a análise.

Entenda também que a interceptação do tráfego no dispositivo de um cliente pode expor atividades online ou outras informações privadas sobre a pessoa. A maioria do tráfego do dispositivo terá codificação TLS; isto significa que um analista não seria capaz de captar mensagens privadas ou senhas. Ainda assim, existe uma quantidade substancial de informações privadas que podem ser capturadas, incluindo os serviços que uma pessoa usa, os domínios que visita e, potencialmente, as páginas sensíveis que pesquisa ou os serviços que utilizam. Algumas ferramentas mostrarão fluxos de tráfego ao vivo num painel de controle enquanto a ferramenta está sendo utilizada, e isso pode, potencialmente, trazer à tona informações privadas numa configuração de grupo. Certifique-se de que o seu cliente entende o processo que você está propondo e trate das informações coletadas com o máximo de confidencialidade e OPSEC.

## Teste de capacitação

Configure o PiRogue num Raspberry Pi e verifique o tráfego de um dispositivo. Idealmente, este deveria ser um dispositivo de teste no qual você instalou um monte de aplicativos aleatórios. Tente entender os resultados e os alertas que o PiRogue está dando. Anote ao menos três diferentes tipos de resultados, explique o que você pensa que significam e fale sobre eles com o seu mentor ou colega.

## Recursos de aprendizagem

{{% resource title="Documentação sobre o Pacote de Ferramentas Pirogue" languages="Inglês" cost="Grátis" description="A documentação sobre o pacote de ferramentas PiRogue." url="https://pts-project.org/docs/prologue/introduction/" %}}

{{% resource title="Guias sobre o Pacote de Ferramentas Pirogue" languages="Inglês" cost="Grátis" description="Guias adicionais sobre o Pacote de Ferramentas Pirogue." url="https://pts-project.org/docs/" %}}

{{% resource title="SpyGuard wiki" languages="Inglês" cost="Grátis" description="A documentação para o SpyGuard." url="https://github.com/SpyGuard/SpyGuard/wiki" %}}

{{% resource title="Análise de Tráfego de Malware" languages="Inglês" cost="Grátis" description="Um recurso adicional com amostras de arquivos PCAP para os que desejarem ir mais além na sua jornada de desenvolvimento e aperfeiçoamento das habilidades de análise de tráfego." url="https://www.malware-traffic-analysis.net/" %}}

{{% resource title="Emergency VPN" languages="Inglês" cost="Grátis" description="Um projeto por CivilSphere, que lhe permite conectar-se a um VPN especial que coleta os dados de conectividade à internet do seu dispositivo e faz um compilado de relatórios sobre eles." url="https://www.civilsphereproject.org/emergency-vpn" %}}

{{% resource title="Curso de Treinamento para a Caça às Ameaças" languages="Inglês" cost="Grátis" description="Um curso gratuito de um dia sobre a análise e a interpretação dos dados de rede para a caça às ameaças." url="https://www.activecountermeasures.com/hunt-training/" %}}

{{% resource title="Curso sobre monitoramento da segurança da rede com Suricata" languages="Inglês" cost="Grátis" description="Um curso gratuito sobre como usar Suricata, uma ferramenta open source de detecção de ameaças frequentemente utilizada." url="https://www.pluralsight.com/courses/network-security-monitoring-suricata" %}}

{{% resource title="Firewalls de saída" languages="Vários" cost="A maioria é gratuito ou possui versões gratuitas" description="Um firewall de saída é um programa instalado num computador que analisa todo o tráfego deixado e todos os servidores aos quais se conecta. Apesar de ser capaz de coletar muitos dados, a proporção sinal/ruído também pode ser pior do que com outras ferramentas." url="https://" %}}

<ul>
<li>macOS:
  <ul>
    <li><a href="https://objective-see.org/products/lulu.html">LuLu</a> (Open Source, Grátis)</li>
    <li><a href="https://www.obdev.at/products/littlesnitch">Little Snitch</a> (Pago) or <a href="https://www.obdev.at/products/index.html">Little Snitch Mini</a> (Proprietário, Grátis)</li>
  </ul>
</li>
<li>Windows:
  <ul>
    <li><a href="https://safing.io/">PortMaster</a> (Open Source, versões Gratuita/Paga disponíveis, com funcionalidade de histórico/investigação de rede)</li>
    <li><a href="https://www.glasswire.com/">GlassWire</a> (Proprietário, versões Gratuita/Paga disponíveis)</li>
  </ul>
</li>
<li>Android:
  <ul>
    <li><a href="https://github.com/M66B/NetGuard">NetGuard</a> (Open Source Gratuito/versão Freemium disponível com captura/histórico de tráfego)</li>
    <li><a href="https://github.com/ukanth/afwall">AFWall+</a> (Open Source, Gratuito)</li>
  </ul>
</li>
<li>Linux:
  <ul>
    <li><a href="https://github.com/evilsocket/opensnitch">OpenSnitch</a> (Open Source, Gratuito)</li>
  </ul>
</li>
</ul>

{{% resource title="Plataformas de Caça às Ameaças" languages="Vários" cost="Grátis" description="Aqui, nós apresentamos diversas plataformas que usam dados para detectar possíveis ameaças dentro de um sistema." url="https://" %}}

<ul>
  <li><a href="https://github.com/Security-Onion-Solutions/securityonion">Security Onion</a></li>
  <li><a href="https://www.pfsense.org/">pfSense</a></li>
  <li><a href="https://opnsense.org/">OPNsense</a></li>
  <li><a href="https://www.activecountermeasures.com/ac-hunter-community-edition/">AC Hunter Community Edition</a></li>
  <li><a href="https://github.com/activecm/rita">RITA</a></li>
  <li><a href="https://wazuh.com/">Wazuh</a></li>
  <li><a href="https://suricata.io/features/">Suricata</a></li>
</ul>



