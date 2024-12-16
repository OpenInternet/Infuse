---
style: module
title: Pré-requisitos OPSEC para detecção de malware
weight: 2
description: Aprendemos como implementar uma política
    de segurança no ambiente computacional utilizado
    pelo profissional para detecção de malware.
---

## Caso de Uso

Este subtópico permitirá ao profissional garantir a segurança do processo e dos indivíduos envolvidos, bem como implementar uma política de segurança no ambiente informático utilizado pelo profissional para a detecção de malware.

## Objetivos

Após a conclusão deste subtópico, o profissional deve ser capaz de assegurar a confidencialidade e a integridade dos dados, o que inclui:

- A encriptação durante o armazenamento e a transferência
- A realização de checksums após a aquisição dos dados
- A não utilização de dispositivos nos quais haja uma suspeita de comprometimento
- A utilização de ambientes isolados
- Garantir a segurança dos dispositivos e servidores utilizados no processo
- Modelização de ameaças e avaliação de riscos
- A realização de backups e a criação de imagens de disco

---
## Conteúdo

A segurança operacional para a detecção de malware pode ser dividida entre preocupações relacionadas a cenários específicos:

- Interação direta com um dispositivo de status desconhecido
- A utilização de um "bom" dispositivo separado para interagir com um dispositivo de status desconhecido
- A interação com arquivos ou links de status desconhecido

### A utilização de um dispositivo de status desconhecido

Em muitos casos, você receberá um dispositivo e o cliente pedirá que você verifique se nele há um malware (ou você precisará fazer isso no seu próprio dispositivo).

Esteja ciente de que, caso o dispositivo esteja comprometido, as suas atividades podem ser monitoradas, e isso pode impactar os riscos e a segurança para o seu cliente. Tudo o que você digita no teclado, inclusive o acesso a contas ou conversas online, pode ser monitorado. Dispositivos de armazenamento externos, tais como discos externos ou pendrives, podem tornar-se alvos para a transferência de um código malicioso, e todas as conexões à rede podem ser utilizadas para difundir ou extrair código malicioso.

Observe também que a introdução de ferramentas de análise pode ativar uma "chave de emergência" em alguns malwares que tenham sido projetados para escapar da detecção e análise. Em tais casos, a captura de imagens de disco e demais registros periciais podem ser necessários para análises mais aprofundadas. Isto não é abrangido na presente trilha de aprendizagem, mas é abordado em [Analisando Malware](/en/learning-path/3/).

### Utilizar um "bom" dispositivo separado durante o processo de detecção de malware

Se você suspeitar que um dispositivo está infectado por um malware, você deve fazer o mínimo possível com ele, até que tenha maiores informações acerca do seu status. Por este motivo, você sempre deve usar um dispositivo para o qual não haja suspeita acerca de infecções por malware para realizar o tratamento de quaisquer informações sensíveis.

Se, por exemplo, uma pessoa para a qual presta suporte suspeitar que o seu laptop ou desktop tenha sido comprometido, peça que utilize somente o celular para comunicar-se com você. Normalmente, é uma boa ideia desligar o laptop ou desktop possivelmente comprometido, ou pelo menos, desconectá-lo da internet. Se o seu cliente vinculou as suas contas Signal, WhatsApp ou outras contas ao dispositivo potencialmente comprometido, pode ser uma boa ideia desvincular as mesmas (é preciso fazer isso a partir de um dispositivo no qual não haja suspeita de infecção), enquanto o processo de detecção é realizado.

### A interação com arquivos ou links de status desconhecido

Enquanto o processo de detecção é realizado, você pode encontrar links ou arquivos (quer se tratem de arquivos comuns ou executáveis) dos quais não tem certeza e dos quais você suspeita que possam estar jogando cargas de malware. Se você estiver copiando esses links ou arquivos de um dispositivo potencialmente comprometido para um dispositivo de análise, sempre existirá um risco de infectar também o seu dispositivo de análise. Para reduzir as probabilidades de infecção, recomendamos:

* Usar uma máquina virtual no seu dispositivo de análise, e apenas abrir os arquivos nela. Dessa forma, ainda que você abra um link ou arquivo malicioso e o seu sistema seja infectado, o dano ficará limitado à sua máquina virtual
* Usar serviços baseados em rede ou sandboxes (falaremos mais sobre isso nesta trilha de aprendizagem)
* Neutralizar todos os URL (veja a seção relevante no Subtópico 3, na trilha de aprendizagem sobre as infraestruturas maliciosas)
* Armazenar todos os arquivos potencialmente suspeitos em pastas comprimidas e protegidas por senha. Isto evitará que sejam abertas por acidente ou averiguadas por sistemas operacionais quando eles, por exemplo, indexam pastas. A senha não precisa ser complexa; pode ser, literalmente, "ABC". A sua única função é impedir a abertura automática ou acidental do arquivo.

Para conhecer mais sobre este assunto, veja o guia da Defensive Lab Agency sobre como [manusear um dispositivo potencialmente comprometido](https://pts-project.org/guides/g6/), principalmente:

* Isolando dispositivos Android e iOS
* Procedimentos para mandar e receber fisicamente os dispositivos comprometidos para análise, caso esteja trabalhando com (ou servindo de) uma equipe remota de análise técnica
* Dicas introdutórias da cadeia de custódia durante a análise do dispositivo

Este último termo na cadeia de custódia refere-se às melhores práticas em termos de perícia digital e resposta a incidentes para registrar o processamento de um dispositivo, a fim de preservar as provas e permitir que as provas coletadas possam ser usadas no caso de potenciais ações judiciais. O artigo disponível no link a consultar fornece uma boa introdução acerca das melhores práticas, de modo geral, que você pode aplicar caso venha a processar provas que possam ser usadas num cenário mais pesado.

## Prática

Configurar uma VM com REMnux, conforme as [etapas destacadas no Guia Prático de Resposta a Incidentes para Sociedade Civil e Mídia (capítulo 6, começando na página 30)](https://internews.org/wp-content/uploads/2023/11/Field-Guide-to-Threat-Labs.pdf).

## Teste de capacitação

Depois de ter configurado a sua VM REMnux, instale e conecte-se a um VPN idôneo. Certifique-se de que o seu sistema principal não está conectado a um VPN ou a um servidor outro que o seu REMnux. Peça que o seu colega ou mentor envie um canarytoken de bug web, que será somente aberto no REMnux, por meio de um navegador web da sua escolha. (Se você ainda não for familiarizado com os canarytokens, [consulte este guia](https://internews.org/resource/guide-to-facilitating-a-technical-simulation-with-canary-tokens/) que nós criamos sobre como poderá fazer uso deles no âmbito das formações de segurança).

Qual endereço IP foi visado? Qual agente de usuário?

Fale com o seu colega / mentor sobre quais dados ficarão na sua VM e quais não ficarão. Se você executar um malware que entrou em contato com um servidor na sua VM, será que isso passaria pela conexão VPN da sua casa/escritório?

## Learning Resources

{{% resource title="Guia intermediário - Como manusear um dispositivo potencialmente comprometido" languages="Inglês" cost="Grátis" description="Um guia passo a passo sobre como manusear dispositivos Android ou iOS para os quais suspeita a presença de um malware, antes de iniciar o processo de detecção" url="https://pts-project.org/guides/g6/" %}}

{{% resource title="Capítulo sobre as máquinas virtuais no Guia Prático de Resposta a Incidentes para Sociedade Civil e Mídia (capítulo 6)" languages="Inglês" cost="Grátis" description="Um resumo introdutório sobre como os analistas de malware podem começar a trabalhar com máquinas virtuais e a instalação da distribuição Linux" url="https://internews.org/wp-content/uploads/2023/11/Field-Guide-to-Threat-Labs.pdf" %}}

{{% resource title="Simulação técnica com canarytokens" languages="Inglês" cost="Grátis" description="Um guia sobre como usar canarytokens, uma ferramenta de segurança ofensiva, para simular rastreadores de malwares. Pode ser muito útil para ensinar os defensores sobre quais dados podem ser facilmente extraídos" url="https://internews.org/resource/guide-to-facilitating-a-technical-simulation-with-canary-tokens/" %}}