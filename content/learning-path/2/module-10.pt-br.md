+++
style = "module"
weight = 10
title = "Descobrindo de onde veio o malware "
description = "We look at how we can use timestamps and metadata to figure out where malware originated"
+++

## Caso de Uso

Nenhum malware aparece espontaneamente no dispositivo da pessoa visada. Ele sempre vem de algum lugar. Por vezes, é um pouco óbvio: a pessoa visada percebe que o link no qual clicou é malicioso. Em outros casos, o vetor de infecção é um pouco menos óbvio. Saber de onde veio a infecção pode ser algo importante para a gestão de riscos futuros. A fonte inicial de infecção não tinha um alvo, a pessoa pode apenas ter sido vítima de uma gangue que tem somente a intenção de ganhar dinheiro. Por outro lado, se a infecção inicial veio de um ataque de engenharia social sofisticado, é possível que continuem a enfrentar ataques futuros do mesmo autor das ameaças.

## Objetivos

Após concluir este subtópico, os profissionais deverão ser capazes de fazer o seguinte:

- Entender como os registros de data e hora funcionam em desktops e dispositivos móveis
- Examinar os metadados do sistema operacional para saber de onde os arquivos maliciosos foram baixados

---

## Conteúdo
### Registros de data e hora de Arquivos

A primeira etapa em rastrear a origem do ataque consiste em estabelecer o horário em que o malware foi instalado. Se você identificou o arquivo de malware que foi baixado, você pode usar os registros de data e hora do arquivo. Isto é mais difícil do que você imagina, primeiro, porque os registros de data e hora dos arquivos de sistema são complicados. O caminho mais curto seria começar com a hora de criação do primeiro arquivo que foi baixado. Tenha em mente que os documentos extraídos dos arquivos têm horas de criação diferentes; é importante começar com o próprio arquivo que foi baixado.

#### Windows, macOS, Linux
Para mais informações sobre os registros de data e hora dos arquivos de sistema de desktops, veja [este documento técnico do SANS sobre o Windows](https://www.sans.org/white-papers/36842/), [esta descrição dos quase infinitos registros de hora no MacOS](https://forensic4cast.com/2016/10/macos-timestamps-from-extended-attributes-and-spotlight/), [esta descrição sobre os registros de data e hora no Linux](https://linuxhandbook.com/file-timestamps/) e [uma maneira de ver a hora da criação de um arquivo no ext4](https://blog.roberthallam.org/2018/01/file-creation-time-on-ext4-linux/).

#### iOS, Android

Para os dispositivos móveis, o MVT fornece informações de registro de data e hora. Para o iOS, [isto está descrito na documentação](https://docs.mvt.re/en/latest/ios/records/). Para Android, são extraídas menos informações e você pode ter de efetuar averiguações no dispositivo.

O app [Google Files](https://play.google.com/store/apps/details?id=com.google.android.apps.nbu.files&hl=en_US&gl=US) mostrará a hora modificada de um arquivo a partir do menu reticências (...) de cada arquivo.

Tenha em mente que o malware que afeta os dispositivos móveis são menos óbvios em termos de vestígios acessíveis deixados no sistema. A forma mais comum de infecção dos dispositivos móveis é através de aplicativos sideloaded falsos, apps maliciosos na Apple/Google Store, ou através de exploradores de navegadores internet que ganham acesso ao dispositivo antes de baixarem quaisquer arquivos. Nos últimos casos, os arquivos maliciosos podem não aparecer nos diretórios usuais de download.

### Mensagens/Downloads Suspeitos

Quer você encontre ou não um arquivo malicioso, a próxima etapa consiste em saber de onde veio. Existem várias informações que você pode coletar e procurar.

Em alguns sistemas operacionais, os downloads estão associados à sua fonte. Isto significa que os arquivos podem conter metadados que mostram de qual servidor foram baixados. [Este guia](https://winaero.com/beware-chromium-based-browsers-save-download-origin-url-for-files/) mostra como averiguar tais informações no Windows e Linux, enquanto [este](https://osxdaily.com/2010/10/12/find-out-where-a-file-was-downloaded-from/) mostra como averiguar no macOS. Tais metadados mostrarão o servidor a partir do qual o arquivo foi baixado, mas não o que causou o download[^1]. Tenha também em mente que o link no qual a pessoa visada clicou pode não ser o URL de download, em razão dos redirecionamentos.

Em seguida, procure por e-mails, mensagens, etc. que podem ter motivado o download. Você pode usar qualquer registro de data e hora e informações de URL que identificou anteriormente para auxiliá-lo na busca.

## Teste de capacitação

Para ao menos cinco arquivos da sua pasta de downloads:

- Escreva todos os registros de data e hora que contêm e o que podem indicar.
- Se possível, encontre os atributos estendidos ou os metadados que descrevem de qual URL ou serviço foram baixados (nos nossos testes, nem todos os arquivos possuíam informações sobre os URL nos seus metadados, então, não se preocupe se você não conseguir encontrá-los).

Peça que um colega ou mentor verifique o seu trabalho e certifique-se de que leu corretamente todos os metadados.

No Android, instale um app (não malicioso) e use o gerenciador de arquivos para encontrar as propriedades do aplicativo e ver o que você consegue aprender sobre ele. Se você tiver acesso a um telefone Android, baixe o aplicativo fora do Google Play e faça a mesma coisa. Peça que um colega ou mentor verifique o seu trabalho e certifique-se de que leu corretamente todas as propriedades do aplicativo.


## Recursos de aprendizagem

{{% resource title="Registros de data e hora dos arquivos de sistema: O que os fazem funcionar?" languages="Inglês" cost="Grátis" description="Um resumo geral sobre o que são os registros de data e hora, o quão transferíveis são e como funcionam, a nível um tanto técnico. Majoritariamente direcionado ao Windows." url="https://www.sans.org/white-papers/36842/" %}}

{{% resource title="Os registros de data e hora do macOS a partir de atributos estendidos e Spotlight" languages="Inglês" cost="Grátis" description="Um guia sobre como usar metadados avançados no macOS para encontrar diferentes registros de data e hora de arquivos e o que eles significam." url="https://forensic4cast.com/2016/10/macos-timestamps-from-extended-attributes-and-spotlight/" %}}

{{% resource title="Registros de data e hora no Linux: Explicação sobre atime, mtime, ctime" languages="Inglês" cost="Grátis" description="O Linux tem diferentes tipos de registro de data e hora. Este artigo explica como interpretá-los." url="https://linuxhandbook.com/file-timestamps/" %}}

{{% resource title="Hora de criação do arquivo no ext4 Linux" languages="Inglês" cost="Grátis" description="O sistema de arquivo mais moderno usado pelo Linux se chama ext4. Este artigo fala sobre como o ext4 gerencia os registros de data e hora e como encontrar informações detalhadas sobre a criação dos arquivos." url="https://blog.roberthallam.org/2018/01/file-creation-time-on-ext4-linux/" %}}

{{% resource title="Registros extraídos por mvt-ios" languages="Inglês" cost="Grátis" description="Examina o que os arquivos MVT geram quando estão analisando os dumps iOS e como lê-los." url="https://docs.mvt.re/en/latest/ios/records/" %}}

{{% resource title="Arquivos pelo Google" languages="Múltiplos" cost="Grátis" description="Um app Android que dá acesso a metadados avançados dos arquivos." url="https://play.google.com/store/apps/details?id=com.google.android.apps.nbu.files&hl=en_US&gl=US" %}}

{{% resource title="Mark of the Web, de Read Team’s Perspective" languages="Inglês" cost="Grátis" description="Apresenta Mark of the Web, uma bandeira no Windows que sugere que um arquivo foi baixado da web e requer medidas de segurança especiais ao ser aberto." url="https://outflank.nl/blog/2020/03/30/mark-of-the-web-from-a-red-teams-perspective/" %}}

{{% resource title="Atenção: Os navegadores baseados no Chromium salvam o URL de origem dos arquivos baixados" languages="Inglês" cost="Grátis" description="Trata sobre como os sistemas Linux e Windows às vezes salvam metadados do URL do qual um arquivo foi baixado." url="https://winaero.com/beware-chromium-based-browsers-save-download-origin-url-for-files/" %}}

{{% resource title="Descubra de onde um arquivo foi baixado no macOS" languages="Inglês" cost="Grátis" description="Os arquivos macOS que foram baixados do URL geralmente possuem o URL integrado nos seus metadados. Isto mostra como extrair o dito URL." url="https://osxdaily.com/2010/10/12/find-out-where-a-file-was-downloaded-from/" %}}


[^1]:
    No Windows, você também verá um número correspondente a um ID de Zona. As Zonas associadas aos arquivos baixados são as seguintes:

    ZoneId=1: Intranet Local
    ZoneId=2: Sites de confiança
    ZoneId=3: Internet
    ZoneId=4: Sites restritos