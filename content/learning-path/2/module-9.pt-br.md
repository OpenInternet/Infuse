+++
style = "module"
weight = 9
title = "Análise de documento malicioso"
description = "We learn how to triage and analyze potentially suspicious malicious documents"
+++

## Caso de Uso

Enquanto várias pessoas sabem que devem suspeitar de arquivos binários executáveis, os documentos Office nos formatos PDF, DOC, XLSX e ODT, que são usados diariamente, muitas vezes são utilizados de forma maliciosa, com conteúdo malicioso dinâmico ou explorações de aplicativos.

Este subtópico ensina os alunos a efetuarem a triagem e a análise de documentos potencialmente maliciosos.


## Objetivos 

Após concluir este subtópico, os profissionais deverão ser capazes de fazer o seguinte:

- Configurar uma máquina virtual REMnux para a análise do documento
- Desmantelar e analisar documentos PDF
- Desmantelar e analisar documentos Microsoft Office

---
## Conteúdo

Muitos agentes de ameaças podem usar documentos com cargas maliciosas como vetor de ataque. Leia [esta página](https://cyberhub.am/en/blog/2023/10/25/technical-writeup-malware-campaigns-targeting-armenian-infrastructure-and-users/) para ver um estudo de caso.

_Greater Internet Freedom_, um Projeto Internews, recentemente criou um pequeno curso sobre análise de documentos maliciosos. Leia as quatro partes do curso (listadas abaixo) a fim de concluir este subtópico.

Observe que algumas das ferramentas incluídas neste guia exigem que o Python esteja instalado no seu sistema. Os sistemas MacOS e Linux podem já ter o Python instalado por padrão. Se você estiver usando Windows, recomendamos [que configure um WSL (Windows Subsystem for Linux)](https://learn.microsoft.com/en-us/windows/wsl/install) e que utilize as ferramentas a partir dali.

[Parte 1 - Introdução e VMs (Máquinas Virtuais) - Internews Greater Internet Freedom](https://greaterinternetfreedom.org/course/part01-intro-and-vms/)\
[Parte 2 - Documentos PDF](https://greaterinternetfreedom.org/course/analysis-of-malicious-documents-part-02-pdf-documents/)\
[Parte 3 - Documentos Microsoft Office](https://greaterinternetfreedom.org/course/analysis-of-malicious-documents-part-03-microsoft-office-documents/)\
[Parte 4 - Medidas de defesa e Próximas etapas](https://greaterinternetfreedom.org/course/analysis-of-malicious-documents-part-04-defensive-measures-next-steps-and-closure/)

## Teste de capacitação

Complete todos os desafios do curso no link acima.

## Recursos de aprendizagem

{{% resource title="Análise de documentos maliciosos - Parte 01 - Introdução e VMs (Máquinas virtuais)" languages="Inglês" cost="Grátis" description="Apresenta o tópico acerca da análise de documentos maliciosos e mostra aos alunos como configurar uma VM apropriada à tarefa." url="https://greaterinternetfreedom.org/course/part01-intro-and-vms/" %}}

{{% resource title="Análise de documentos maliciosos - Parte 02 - Documentos PDF" languages="Inglês" cost="Grátis" description="Mostra de que forma as ferramentas do tipo editores de texto e desintegradores de PDF especializados podem ser usadas para analisar os arquivos neste formato a fim de buscar por elementos como scripts executáveis." url="https://greaterinternetfreedom.org/course/analysis-of-malicious-documents-part-02-pdf-documents/" %}}

{{% resource title="Análise de documentos maliciosos - Parte 03 - Documentos Microsoft Office" languages="Inglês" cost="Grátis" description="Examina a estrutura dos documentos Microsoft Office e como eles podem integrar conteúdo ativo." url="https://greaterinternetfreedom.org/course/analysis-of-malicious-documents-part-04-defensive-measures-next-steps-and-closure/" %}}

{{% resource title="Análise de documentos maliciosos - Parte 04 - Medidas defensivas, próximos passos e encerramento" languages="Inglês" cost="Grátis" description="Demonstra alguns passos e contramedidas que podemos tomar ao trabalharmos com documentos de fontes desconhecidas ou arquivos potencialmente maliciosos." url="https://greaterinternetfreedom.org/course/analysis-of-malicious-documents-part-03-microsoft-office-documents/" %}}

{{% resource title="Alisando PDFs maliciosos" languages="Inglês" cost="Grátis" description="Uma série de ferramentas que podemos usar para uma análise ainda mais aprofundada de arquivos PDF." url="https://resources.infosecinstitute.com/topics/hacking/analyzing-malicious-pdf/" %}}

{{% resource title="Como analisar arquivos Microsoft Office maliciosos" languages="Inglês" cost="Grátis" description="Um recurso adicional que mostra como os arquivos Microsoft Office podem entregar cargas úteis e como podemos detectá-los." url="https://intezer.com/blog/malware-analysis/analyze-malicious-microsoft-office-files/" %}}