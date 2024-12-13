+++
style = "module"
weight = 8
title = "Detecção e determinação baseada na amostra"
description = "Você tem uma amostra de um arquivo. O arquivo em si pode ser binário, comprimido, uma captura de página web ou ter outros formatos. O principal objetivo consiste em determinar se o arquivo é malicioso."
+++

## Caso de Uso

Você tem uma amostra de um arquivo e precisa determinar se é malicioso. Ele pode ter sido enviado ao alvo via e-mail, rede social ou mensagem instantânea, ou ainda, transferido através de um suporte de dados amovível ou por outro meio. O arquivo em si pode ser binário, comprimido, uma captura de página web ou ter outros formatos. O principal objetivo consiste em determinar se o arquivo é malicioso. Ademais, você pode ser capaz de determinar algumas informações características úteis sobre o arquivo, contudo, para maiores orientações, veja a [Trilha de Aprendizagem sobre Análise de Malware](/en/learning-path/3/).

## Objetivos

Após concluir este subtópico, os profissionais deverão ser capazes de fazer o seguinte:

- Investigar arquivos suspeitos usando plataformas de malware
- Usar sandbowes para ajudar a determinar se uma amostra é maliciosa e o que ela faz

---

## Conteúdo 

Se você precisar de uma avaliação mais aprofundada de alguns arquivos específicos, aqui estão alguns serviços online que irão verificar um arquivo específico ou um conjunto de arquivos em busca de malware. Se você tiver um arquivo que suspeita ser malicioso, você pode carregar o arquivo ao serviço de verificação. Note que esses serviços não protegem a confidencialidade do conteúdo dos arquivos que você carregar neles. Então, você não deve carregar nenhum arquivo que possa conter informações sensíveis. Esses arquivos podem vir em anexos de e-mail ou terem sido baixados recentemente no dispositivo da vítima. Note que, em muitos casos, o download inicial pode ser um dropper (um executável que instala o verdadeiro malware, e é mais fácil de personalizar do que o "verdadeiro" malware), e pode não ser reconhecido pelo software anti-malware. Se possível, analise os dados de criação/modificação/download do arquivo para identificar os arquivos que podem ser baixados pelo dropper inicial.

Se você preferir não compartilhar um arquivo completo num serviço online, mas ainda quer verificar se um dropper foi enviado, você pode simplesmente carregar um hash do arquivo. Um hash é como uma breve impressão digital de um arquivo - pode ser usado para identificar um arquivo único, sem revelar o seu conteúdo. Para mais informações sobre os hashes, vá à seção "Hashes" no Capítulo 7 do [Guia Prático de Resposta a Incidentes para Sociedade Civil e Mídia](https://internews.org/resource/field-guide-to-incident-response-for-civil-society-and-media/). A atividade do guia presume que o usuário está aprendendo num sistema operacional Linux, então, você precisará consultar o utilitário da linha de comando a ser utilizado para obter uma soma SHA na plataforma da sua escolha, por exemplo, usando o `shasum` ou `openssl` no MacOS, ou usando `Get-FileHash` ou certutil no PowerShell.

Um serviço popular de inteligência relacionada a malwares é o [VirusTotal](https://www.virustotal.com/) do Google. VirusTotal pode verificar um arquivo com um certo número de scanners anti-malware, e devolver os resultados das verificações. Também pode ser usado para verificar hashes de arquivos ou URL. VirusTotal é gratuito, mas pode ter limitações de volume. Para uma descrição e atividade detalhadas, conclua a seção "Usando VirusTotal" no Capítulo 7 do [Guia Prático de Resposta a Incidentes para Sociedade Civil e Mídia](https://internews.org/resource/field-guide-to-incident-response-for-civil-society-and-media/).

Após ter lido o capítulo acima, você deve ser capaz de:
* Entender o que acontece ao fazer upload de uma amostra no VirusTotal (que compartilha a sua amostra com os clientes pagos de VirusTotal) e poder decidir se é apropriado fazê-lo
* Enviar um arquivo ou verificar um registro por hash e ler as abas Detecções, Detalhes, Relações, Comportamento e Comunidade no VirusTotal.


### Sandboxes

Sandoboxes proporciona um ambiente virtual que simula um computador comum que captura logs detalhados de atividades que ocorrem na memória e no disco. Isto geralmente permite uma forma segura e automatizada para inicializar a análise de malware e entender as ações e intenções de um arquivo. 

Alguns dos serviços de sandbox gratuitos e comercialmente disponíveis são [Hybrid Analysis](https://www.hybrid-analysis.com/), [Any.Run](https://any.run/), [Joe Sandbox](https://www.joesandbox.com/), e [Triage](https://tria.ge/). Esses serviços executam arquivos que você envia e efetuam uma análise dinâmica. Fornece grandes vantagens por ser capaz de detectar de forma heurística novos malwares, e também por ser capaz de avaliar diferentes estágios de malware. Esteja ciente de que as amostras enviadas serão coletadas e tornar-se-ão disponíveis aos clientes pagos e analistas. 

Cuckoo Sandbox é uma ferramenta sandbox open source gratuita de análise de malware, que você pode auto-hospedar. CERT-EE na Estônia oferece uma versão gratuita hospedada online: [Cuckoo V2](https://cuckoo.cert.ee/), [Cuckoo V3)](https://cuckoo-hatch.cert.ee/).

Para saber mais sobre o uso de Sandboxes para a detecção de amostras, conclua a seção "Sandboxes" no Capítulo 10 do [Guia Prático de Resposta a Incidentes para Sociedade Civil e Mídia](https://internews.org/resource/field-guide-to-incident-response-for-civil-society-and-media/), que usa o sandbox Triage como exemplo

Após finalizar a atividade, você deverá ser capaz de:

* Enviar um arquivo a um sandbox
* Selecionar ou configurar um ambiente de trabalho apropriado para a sandbox
* Decidir se o networking deve ser desativado ou emulado
* Ler o resumo geral dos resultados, inclusive as detecções automáticas
* Ter um conhecimento geral acerca das demais categorias de informação que são apresentadas na análise da sandbox. Para fins de detecção, um conhecimento detalhado não é necessário, mas para a Análise de Malware ou a caça às ameaças, você precisará entender esses elementos de forma mais aprofundada.

Você pode mergulhar mais no assunto de Sandboxes na [trilha de aprendizagem Análise de Malware](/en/learning-path/3/).

Tenha em mente que os malwares avançados podem iniciar verificações para descobrir se trata-se de um ambiente virtualizado/sandbox e, consequentemente, comportarem-se de forma diferente, dependendo do ambiente, porém, nenhum ambiente sandbox é 100% seguro.

Para saber mais sobre os tipos de técnicas usadas por Hybrid Analysis, você pode aprender como fazer a sua própria análise de malware híbrida (estática e dinâmica) na [trilha de aprendizagem Análise de Malware](/en/learning-path/3/).

## Prática 

1. Encontre ou crie um arquivo de texto simples sem formatação no seu sistema, e calcule o seu hash sha256. Após ter feito isso, edite o arquivo num editor de texto simples, acrescentando a ele um único caractere. Calcule novamente o seu hash sha256.
2. Obtenha um executável Windows obscuro de um site tipo download.cnet.com. Carregue-o no VirusTotal ou analise-o com Hybrid Analysis.  Tenha em mente que os programas de instalação podem ser marcados incorretamente como maliciosos em virtude da natureza da operação que executam. Pense no motivo para isto estar acontecendo e, se possível, converse sobre o assunto com um colega ou mentor.
3. Encontre o hash de uma peça de malware bem conhecida (você pode fazer isso pesquisando num site que contenha hashes de malware, não precisa baixar a amostra e fazer o hash!) e fazer o upload no VirusTotal. Explique o que você vê e o que aconteceu.

## Teste de capacitação

Independentemente (ou com um mentor)

1. Pesquise as amostras de malware enviadas recentemente no Malware Bazaar. Copie os hashes de 3-5 amostras que você detectou e copie-os na pesquisa VirusTotal. Quais são os resultados? Cada um desses hashes deve ser detectado como malicioso por, ao menos, alguns motores de detecção de malware do VirusTotal. Se nenhum dos hashes forem detectados como maliciosos ou reconhecidos por VirusTotal, é provável que você tenha cometido um erro em algum lugar, então, nesse caso, vale a pena tirar um momento para rever as suas ações!

Com um Colega ou Mentor

1. Peça que um colega ou mentor selecione cerca de 10 arquivos aleatórios, que podem ser imagens, por exemplo. Então, eles pegarão o hash sha256 de 3 arquivos selecionados aleatoriamente e enviarão a você os arquivos e os hashes. Determine entre esses 10 arquivos os que correspondem aos hashes e peça que o seu colega ou mentor verifique o seu trabalho.

## Learning Resources

{{% resource title="Verifique SHA256 checksum" languages="Inglês" cost="Grátis" description="Um guia rápido sobre como usar a linha de comando para verificar arquivos sha256 checksums." url="https://techdocs.akamai.com/download-ctr/docs/verify-checksum" %}}

{{% resource title="VirusTotal" languages="Inglês" cost="Gratuito, com limites de tarifas" description="Um serviço web no qual os usuários podem fazer o upload de arquivos ou hashes e verificá-los para identificar algum malware conhecido, entre uma vasta gama de motores de detecção de malware. Propriedade de Alphabet/ Google." url="https://www.virustotal.com/gui/home/upload" %}}

{{% resource title="Hybrid Analysis" languages="Inglês" cost="Gratuito, com funcionalidades premium" description="Um serviço um tanto semelhante ao de VirusTotal, mas que também é capaz de efetuar uma análise dinâmica (executar o arquivo e observar o que acontece)." url="https://www.hybrid-analysis.com/" %}}

{{% resource title="Any.run" languages="Inglês" cost="Gratuito, apenas para uso não comercial" description="Um sandbox comercial." url="https://any.run/" %}}

{{% resource title="Joe Sandbox" languages="Inglês" cost="Gratuito para contas públicas (os resultados da análise serão publicados no website)" description="Um sandbox comercial." url="https://www.joesandbox.com/#windows" %}}

{{% resource title="Cuckoo Sandbox" languages="Inglês" cost="Grátis" description="Um serviço de sandbox operado pelo CERT (Computer Emergency  Response Team) da Estônia." url="https://cuckoo.cert.ee/" %}}

{{% resource title="Windows Sandbox" languages="Muitos idiomas" cost="Requer Windows Pro, Education, ou Enterprise" description="Uma poderosa ferramenta sandbox integrada ao Windows." url="https://learn.microsoft.com/en-us/windows/security/application-security/application-isolation/windows-sandbox/windows-sandbox-overview" %}}
