+++
style = "module"
weight = 7
title = "Detectando malware através da aquisição de imagens (iOS, Android)"
description = "Malwares mais avançados podem tentar detectar atividade forense e dificultar a detecção e a análise. Podemos precisar coletar dados do próprio dispositivo para análise."
+++

## Caso de Uso

O primeiro passo para detectar a presença de um malware num dispositivo é coletar os dados do próprio dispositivo para análise. Idealmente, os dados serão recuperados do dispositivo para um espaço seguro com o mínimo de perturbação ao dispositivo em si. Os malwares mais avançados podem tentar detectar atividade forense e deletar-se automaticamente para dificultar a detecção e a análise. 

## Objetivos

Após concluir este subtópico, os profissionais deverão ser capazes de fazer o seguinte:

- Faça o backup num dispositivo iOS ou Android para verificar se há malwares potenciais.
- Verifique os dados coletados no backup, por exemplo, examinando o registro de data e hora e metadados ou artefatos semelhantes.
- Analise os backups iOS e Android usando o MVT.


---
## Conteúdo
Para uma melhor visão acerca dos métodos de detecção e possíveis desafios, recomendamos que todos os alunos vejam [esta conversa](https://media.ccc.de/v/37c3-11874-einfuhrung_in_smartphone_malware_forensik) (originalmente em alemão, mas também traduzida em francês e inglês), que é uma boa introdução ao assunto e dura cerca de 50 minutos (mais a parte de perguntas e respostas).

### iOS, Android

Os sistemas operacionais de celulares são mais limitados/trancados do que os dos desktops, então, criar e trabalhar com um backup completo não é tão simples, e você pode não ser capaz de obter facilmente todas as informações de um dispositivo. Uma ferramenta completa mista para extração de dados de aparelhos celulares é a 🧰 [Mobile Verification Toolkit](https://mvt.re) (MVT) do Amnesty International Security Lab. A documentação completa está disponível no website do desenvolvedor, mas também existem explicações passo a passo, como [esta](https://www.youtube.com/watch?v=iLOSlHhGI9U) (em inglês, vídeo de 6 minutos). Tenha em mente que este passo a passo também inclui materiais que iremos abranger no próximo subtópico. Alternativamente, você também pode usar [este guia](https://pts-project.org/guides/g4/), que lhe mostrará como fazer backups tanto no iOS como no Android.

Quando se trata do iOS, você pode usar uma ferramenta chamada [libimobiledevice](https://libimobiledevice.org/) ou o iTunes para fazer um backup. Então, você poderá analisar este backup com o MVT.

Porém, detectar um malware num Android é um pouco mais complicado. Você pode usar uma ferramenta chamada [androidqf](https://github.com/botherder/androidqf) para capturar os logs. Veja [este artigo](https://securitylab.amnesty.org/latest/2023/09/fellowship-apkqf-simplifying-android-forensics/) para obter mais detalhes sobre a androidqf e saber porque é difícil fazer um backup sem antes ter conectado o aparelho Android a um outro computador.

Você pode instalar o MVT no Linux ou macOS. A maioria dos sistemas Linux possuem pip3, uma ferramenta usada para instalar pacotes Python, o que torna a instalação do MVT mais simples. No macOS, você tipicamente precisará instalar duas ferramentas - XCode e  Homebrew - antes de poder instalar o MVT. Você pode seguir as instruções [deste guia](https://docs.mvt.re/en/latest/install/) para instalar o MVT.

### MVT

Para os dispositivos móveis, a arquitetura do sistema torna o antimalware implantado no dispositivo menos eficaz. Contudo, o [Mobile Verification Toolkit](https://mvt.re) (MVT) fará uma varredura dos dados extraídos dos dispositivos Android ou iOS para verificar se há presença de vários malwares.

Na seção anterior, examinamos como fazer o backup num dispositivo usando o MVT. Após ter feito isso, você pode verificar o backup usando a ferramenta de linha de comando.

Porém, tenha em mente que o MVT possui algumas limitações:

* O MVT verifica o dispositivo para determinar se há presença dos IoCs conhecidos. Isto significa que pode apenas verificar a presença de malwares que possuem esses IoCs específicos. Ele não busca por outros heurísticos (tais como um sistema no qual foi feito jailbreak ou autômatos suspeitos nos scripts), que poderiam sugerir uma infecção.
* Para o iOS, o melhor a fazer é [ter acesso ao backup de um dispositivo, e então extrair os dados do backup](https://docs.mvt.re/en/latest/ios/backup/itunes/). Isto deve poder fornecer a maioria dos dados que estão disponíveis no dispositivo. (Existem maiores análises que podem ser feitas num dispositivo iOS no qual tenha sido feito um jailbreak, porém, isto não faz parte do escopo desta trilha de aprendizagem). Também vale a pena ressaltar que um backup codificado contém significativamente mais dados do que um não codificado. Sempre recomendamos trabalhar com os codificados, se possível.
* Para Android, a menos que o dispositivo esteja rooteado, você não poderá extrair tudo. 

Contudo, você pode obter muitos dos dados do dispositivo sem acesso root.
Para uma breve leitura sobre os IoCs que são verificados pelo MVT, como baixá-lo e como alimentar o MVT com novos dados, assim como uma lista de IoCs potenciais que você poderia utilizar nos seus esforços de detecção, consulte [esta subpágina na documentação MVT](https://docs.mvt.re/en/latest/iocs/).

## Prática

Para os exercícios práticos neste subtópico, primeiramente faça o backup do seu dispositivo (as instruções para cada plataforma estão destacadas abaixo), e responda as perguntas do tag "todos os sistemas".

#### iOS

Instalar o MVT no sistema operacional do seu computador. Siga as instruções destacadas [nesta seção](https://docs.mvt.re/en/latest/ios/install/) para fazer um backup, quer seja usando iTunes ou instalando, primeiramente, o [libimobiledevice](https://docs.mvt.re/en/latest/ios/install/).

#### Android

Instalar o MVT no sistema operacional do seu computador. Instalar [Androidqf](https://github.com/botherder/androidqf) e usá-lo para fazer um backup. 

#### Windows, macOS, Linux

Conduzir um backup do sistema operacional do seu desktop usando uma ferramenta da sua escolha. Você pode usar uma das ferramentas destacadas na seção acima sobre os recursos de aprendizagem.

#### Todos os sistemas

Verifique o seguinte no seu backup:

* Quais dados você obteve do dispositivo? Quais dados você não obteve?
* O que foi modificado mais recentemente?
* Os registros de data e hora foram preservados na cópia de aquisição dos dados?

## Teste de capacitação

Antes de proceder à verificação de competências do exercício, certifique-se de ter primeiramente efetuado o backup dos seus arquivos (conforme descrito na seção prática).  Após ter concluído isto, faça o seguinte:

#### Windows, macOS, Linux

Você efetuou um backup do sistema operacional do seu desktop. Abra-o e, dentro dele, encontre:

* A pasta de downloads
* Ao menos um arquivo executável
* Ao menos uma configuração de sistema ou um arquivo de configuração

Não há problema algum em usar o seu motor de busca preferido para tentar descobrir onde esses arquivos devem estar localizados no disco, e então, busque por eles no mesmo lugar, dentro do seu backup.

#### iOS

Se o backup do seu iOS foi codificado, use o MVT para decodificá-lo, seguindo [estas instruções](https://docs.mvt.re/en/latest/ios/backup/check/#decrypting-a-backup). Leia os resultados do comando para ter a certeza de que a decodificação foi efetuada com sucesso. 

Após ter decodificado o backup, peça que o MVT baixe o mais recente IoCs e use a ferramenta para verificar se há malware no backup.

#### Android

Peça que o MVT baixe os últimos IoCs e use-os para verificar o backup que você fez usando androidqf.


## Recursos de aprendizagem

{{% resource title="Perícia forense contra malwares em smartphones: Uma introdução" languages="A conversa original é em alemão, mas foi traduzida em francês e inglês. Os slides são em inglês." cost="Grátis" description="Uma conversa entre dois investigadores de malwares em celulares, que trabalham com jornalistas, durante a qual eles destacam as bases da perícia forense em termos de malwares em smartphones, como ela difere da que é realizada nos desktops e quais são as principais ferramentas e métodos utilizados." url="https://media.ccc.de/v/37c3-11874-einfuhrung_in_smartphone_malware_forensik" %}}

{{% resource title="Perícia forense em dispositivos móveis" languages="Inglês" cost="Grátis" description="Este guia abrangente foi inicialmente criado por Security Without Borders. Ele trata sobre como efetuar uma perícia e coleta de dados básicas em cada uma das principais plataformas." url="https://pellaeon.gitbook.io/mobile-forensics/" %}}

{{% resource title="Como fazer um backup de imagem Windows 10/11" languages="Inglês" cost="Grátis" description="Para analisar um sistema em busca de um malware, primeiramente devemos fazer uma cópia dos arquivos e pastas neste sistema. Este guia nos mostra como podemos fazer isso no Windows." url="https://www.computerworld.com/article/3655693/how-to-make-image-backup-windows-10-windows-11.html" %}}

{{% resource title="Como fazer backup num Mac ou Macbook" languages="Inglês" cost="Grátis" description="Este artigo se concentra nas imagens de disco no macOS." url="https://www.macworld.com/article/671336/how-to-back-up-a-mac-or-macbook.html" %}}

{{% resource title="Como fazer backup de todo o seu sistema Linux usando Rsync" languages="Inglês" cost="Grátis" description="Esta peça usa rsync, um utilitário de linha de comando muito poderoso que também pode ser usado para clonar um sistema Linux para fins de análise da imagem de disco subsequente." url="https://ostechnix.com/backup-entire-linux-system-using-rsync/" %}}

{{% resource title="MVT, Mobile Verification Toolkit" languages="Inglês" cost="Grátis" description="Uma ferramenta gratuita capaz de analisar backups de sistemas iOS e Android para buscar IoCs associados a infecções por malware ou spyware. Usado extensivamente em perícia forense de dispositivos para a sociedade civil." url="https://docs.mvt.re/en/latest/" %}}

{{% resource title="Fazer backup com iTunes" languages="Inglês" cost="Grátis" description="Este artigo na documentação MVT nos mostra como usar o iTunes para criar um backup que pode ser analisado subsequentemente com MVT.." url="https://docs.mvt.re/en/latest/ios/backup/itunes/" %}}

{{% resource title="Eu analisei meu telefone para verificar se o spyware Pegasus estava presente" languages="Inglês" cost="Grátis" description="Um vídeo passo a passo que ilustra como você pode usar o MVT para encontrar IoCs associados ao Pegasus no iOS." url="https://www.youtube.com/watch?v=iLOSlHhGI9U" %}}

{{% resource title="Guia de principiante - Como fazer backup num dispositivo móvel para fins de análise forense" languages="Inglês" cost="Grátis" description="Um guia introdutório sobre como usar ferramentas comuns para fazer um backup de dispositivos iOS e Android a fim de efetuar uma varredura posterior dos mesmos em busca de malware." url="https://pts-project.org/guides/g4/" %}}

{{% resource title="libimobiledevice" languages="Inglês" cost="Grátis" description="A homepage de uma livraria de software que pode ser usada para acessar e fazer backup de dispositivos iOS a partir de um dispositivo Windows, macOS ou Linux." url="https://libimobiledevice.org/" %}}

{{% resource title="Simplificando a Perícia Forense para Android" languages="Inglês" cost="Grátis" description="Um artigo escrito pela Amnesty Tech sobre como as ferramentas atuais podem ser usadas para fazer um backup de dispositivos Android para análise forense, e algumas ilustrações." url="https://securitylab.amnesty.org/latest/2023/09/fellowship-apkqf-simplifying-android-forensics/" %}}

{{% resource title="Instalar libimobiledevice" languages="Inglês" cost="Grátis" description="Um guia rápido sobre como instalar libimobiledevice para fins de investigação forense." url="https://docs.mvt.re/en/latest/ios/install/" %}}

{{% resource title="androidqf" languages="Inglês" cost="Grátis" description="Android Quick Forensics é uma ferramenta que pode ser usada para acessar facilmente os dados de um dispositivo Android para futura perícia forense, análise e busca por malware." url="https://github.com/botherder/androidqf" %}}

{{% resource title="Curso SANS sobre Aquisição Digital e Triagem Rápida" languages="Inglês" cost="cerca de US$ 8000 ou mais" description="Um curso bem longo, abrangente e caro sobre como obter e analisar dados de dispositivos móveis." url="https://www.sans.org/cyber-security-courses/digital-acquisition-rapid-triage/" %}}