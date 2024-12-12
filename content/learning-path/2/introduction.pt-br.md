---
style: introduction
title: Introduction
description: "Read the learning path overview, objectives, associated threats, and prerequisites"
weight: 1
---

## Resumo

Esta trilha de aprendizagem abrange conhecimentos de nível intermediário e as competências necessárias para detectar e identificar malwares, quer seja numa determinada amostra ou que estejam operando ativamente num sistema ou numa variedade de plataformas de dispositivos. A diferença entre malware e software pode ser bem sutil, e uma análise detalhada dos processos e binários, a fim de determinar com certeza o que é um malware, requer, por vezes, uma experiência mais avançada. Contudo, as competências abrangidas no presente percurso lhe darão um bom norte em termos de detecção. Esta trilha de aprendizagem abrange:

- As competências transversais ("soft skills") e considerações éticas para lidar com as pessoas potencialmente alvos de malware
- A proteção da privacidade e dos dados do cliente
- As ferramentas de pronto uso para a detecção de malware Métodos estáticos e dinâmicos de investigação de uma amostra, a fim de determinar se é maliciosa
- Métodos baseados em rede para a investigação de uma amostra, a fim de determinar se é maliciosa
- Recolhimento de dados para a análise de um dispositivo potencialmente infectado, e retenção segura de amostras para análises futuras
- O que fazer após a descoberta de um malware: Investigação, limpeza e gerenciamento de riscos
- Limpeza dos sistemas infectados pelo malware

## Introdução
 
📕 Os adversários, principalmente de estado, por muito tempo usaram malwares para atacar grupos da sociedade civil. Esses ataques conseguiram [fechar um site de notícias](https://www.amnesty.org/en/latest/research/2016/12/how-a-hacking-campaign-helped-shut-down-an-award-winning-news-site/), com hackers "de aluguel" tomando as rédeas de grandes contratos estatais, conforme mostrado em artigos sobre os mercenários cibernéticos baseados na Índia pelo [The New Yorker](https://www.newyorker.com/news/annals-of-crime/a-confession-exposes-indias-secret-hacking-industry), [Reuters](https://www.reuters.com/investigates/special-report/usa-hackers-litigation/) e [Citizen Lab](https://citizenlab.ca/2020/06/dark-basin-uncovering-a-massive-hack-for-hire-operation/).
 
No início dos anos 2020, spywares como [Predator](https://eic.network/projects/predator-files.html)  e, [especialmente o Pegasus](https://www.amnesty.org/en/latest/news/2022/03/the-pegasus-project-how-amnesty-tech-uncovered-the-spyware-scandal-new-video/), dominaram as manchetes, ambos visando jornalistas, ativistas e políticos. Enquanto a maioria dos malwares é bem mais banal e costuma ter propagandas ou promover a criptomoeda, a existência de malwares sofisticados, patrocinados pelo estado, significa que muitos ativistas da sociedade civil serão, muito provavelmente, alvo de infecções potenciais.

## Objetivo

Os profissionais aprenderão a:

- Praticar as competências transversais ("soft skills") e as considerações éticas para abordar as pessoas potencialmente alvos de malware
- Tomar medidas para proteger os dados e a privacidade do cliente
- Utilizar eficazmente as ferramentas de pronto uso para a detecção de malware Utilizar métodos estáticos e dinâmicos de investigação de uma amostra, a fim de determinar se é maliciosa
- Utilizar métodos baseados em rede para a investigação de uma amostra, a fim de determinar se é maliciosa
- Investigar documentos do Microsoft Office a fim de determinar se são potencialmente maliciosos
- Recolher dados para a análise de um dispositivo potencialmente infectado, e reter de forma segura as amostras para análises futuras
- Realizar as tarefas pós-detecção, inclusive planejar a investigação, a limpeza e o gerenciamento dos riscos

## Quais ameaças esta competência ajuda a atenuar ou a tratar?

As competências relativas à detecção de malwares podem ajudar:

- No comprometimento das contas, sites ou dispositivos
- Nas infecções por malware (ransomware, spyware, adware, etc.)
- Na investigação de possíveis comprometimentos 

## Quais são os pré-requisitos?

- Competências básicas de TI: Compreensão de conceitos como imagens de disco, arquivos executáveis e os diferentes tipos de malwares
- Compreensão acerca das práticas de proteção/fortalecimento dos Sistemas Operacionais mais comuns, e uso avançado do Sistema Operacional da sua plataforma.
- Conhecimento acerca dos comandos básicos: Ser capaz de executar comandos da linha de comando e entender quais são as sintaxes da linha de comando.

## Quais dispositivos ou softwares são necessários para os exercícios?

Dependendo do caso, você pode implementar as etapas de detecção diretamente no dispositivo alvo, mas em outros casos, você pode precisar de uma máquina adicional, configurada para a análise. Neste caso, aconselhamos:

- Para o primeiro dispositivo (alvo): Ao menos um dispositivo dotado de Windows, macOS, Linux, Android, or iOS, no qual você poderá investigar se há a presença de malware
- Para o segundo dispositivo (de análise): Um outro dispositivo dotado de Windows, macOS, ou Linux, que você poderá usar para fazer as análises no primeiro dispositivo. A análise de dispositivos dotados de iOS com o uso da ferramenta só é possível (até o presente momento) usando macOS ou Linux
- Espaço de armazenamento suficiente, quer seja no segundo dispositivo ou num dispositivo externo, para salvar um backup total do primeiro dispositivo (caso sejam necessárias imagens e perícia)

(Opcional) Para a módulo 6, você precisará de acesso a um Raspberry Pi.


## Trilhas de aprendizagem relacionadas

Assim como tudo o que diz respeito à segurança, esta trilha de aprendizagem beneficia e contribui para a formação de conhecimentos nas áreas relacionadas. Nomeadamente, as seguintes trilhas de formação conjugam-se bem com o presente:

 - [Analisando Malwares](/en/learning-path/3/): Analisar o malware de forma isolada para entender como funciona e o que faz. Ademais, esta trilha de aprendizagem tem uma abordagem ideal para principiantes e intermediários em termos de determinação estática, dinâmica e baseada em rede da possível malignidade de uma dada amostra; caso tais métodos não sejam suficientes para determinar de forma conclusiva, a seguinte trilha de aprendizagem abrange competências adicionais de análise.
 - [Detecção, Investigação e Rastreamento de uma Infraestrutura Maliciosa](/pt-br/learning-path/1/): O malware alvo geralmente se comunica com uma infraestrutura de comando e controle, extração ou entrega. Esta trilha de aprendizagem o ajudará a investigar e a entender esta infraestrutura.
 - [Fundamentais de Segurança de um Aplicativo Web](/en/learning-path/4): Alguns malwares são entregues como aplicativos web ou explorador de navegador. Algumas das competências abrangidas nesta trilha de aprendizagem o ajudarão a detectar e a analisar o malware infiltrado no navegador web.