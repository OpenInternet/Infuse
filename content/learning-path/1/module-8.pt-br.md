---
style: module
title: Registrando descobertas
description: Este módulo te ensinará a escrever um relatório e compartilhar os resultados da sua investigação, incluindo os indicadores de comprometimento (IoCs) adequados.
weight: 8
---

## Caso de uso

Organizações da sociedade civil podem escolher não compartilhar as suas descobertas por vários motivos. Talvez lhes falte tempo, ou talvez elas estejam preocupadas com o processo de compartilhar amostras de malware ou indicadores de comprometimento. Ou talvez elas não tenham a perícia necessária para documentar — de forma responsável – as suas descobertas após uma investigação de malware. Este módulo falará sobre essa última situação.

Antes de concluir este módulo, certifique-se de que você leu e entendeu completamente os relatórios escritos por Amnesty/HRW e Bellingcat que destscamos no [Módulo 7](/pt-br/learning-path/1/module-7).

## Objetivos

Após concluir este módulo, profissionais devem ser capazes de:

- Escrever um relatório curto sobre uma investigação;
- Selecionar os indicadores de comprometimento apropriados e compartilhá-los de forma responsável;
- Entender como melhor compartilhar as descobertas de um relatório.

---

## Seção principal
À medida em que você investiga a infraestrutura associada a uma campanha de phishing ou qualquer outra ameaça, é fundamental que você anote tudo — talvez você se esqueça de detalhes que podem se tornar importantes lá na frente. Além disso, atacantes podem mudar a infraestrutura que estão usando (por exemplo, desligando os servidores) durante a sua investigação! Por isso, você deve anotar tudo que você faz e tudo que você descobrir. Isso inclui todas as informações que você coletar, incluindo coisas como resultados de consultas WHOIS ou DNS, e-mails dos atacantes, páginas web (código-fonte e capturas de tela), etc. O formato dessas anotações não é importante, mas elas devem ser detalhadas e fáceis de entender.

Conforme a sua investigação avança, você também deve manter um documento separado com as anotações mais importantes para que você não perca vista de descobertas mais significativas. Você também pode escrever sobre elas nas suas anotações mais detalhadas, mas é bom listá-las separadamente, já que o documento detalhado pode se tornar muito longo. As suas anotações sobre descobertas significativas devem conter conclusões sobre várias partes da infraestrutura e as conexões entre elas. Pense nesse documento como o documento com tudo que você quer relatar em um relatório final. Já para as suas anotações sem filtro, apesar do formato não ser importante, muitas pessoas usam a ferramenta [Maltego](https://www.maltego.com/) para registrar conexões.

O seu relatório também deve conter indicadores técnicos específicos: isso pode incluir URLs, endereços IP, endereços de e-mail, números de telefone, e outros identificadores que foram usados ou que descrevem os atacantes. Esses indicadores se tornarão referências importantes para outros analistas ou alvos: se eles encontrarem alguma campanha de phishing com os mesmos indicadores ou indicadores similares, é possível que ela foi executada pelo mesmo atacante — ou que elas tenham sido alvo da mesma campanha. Esses indicadores geralmente são listados no fim de um relatório de ameaça ou compilados em um repositório online.

Os seus indicadores devem ser específicos o suficiente para serem úteis para outros analisras: se um atacante usar Google Drive para hospedar os arquivos maliciosos, usar "Google Drive" como um indicador pode ser muito vago (ao invés disso, você poderia falar sobre como o atacante usou serviços de terceiros em uma parte mais descritiva do seu relatório). Não se esqueça que listas de indicadores raramente são completas: elas capturam apenas os endereços IP e URLs que você encontrou em sua investigação. É bem possível que atacantes estejam usando muitos outros que foram detectados.

Em alguns lugares, analistas farão uma distinção entre indicadores de ataque (IoAs), que sugerem que houve uma tentativa de ataque, e indicadores de comprometimento (IoCs), que sugerem que um ataque obteve sucesso. Muito da indústria, no entanto, usa o termo "indicadores de comprometimento" (IoCs) para descrever as duas situações — incluindo espaços e comunidades relacionados a direitos humanos.

Por fim, assim que você concluir a sua investigação, você deve escrever um relatório.

Este relatório deve conter uma descrição factual sobre que aconteceu e que infraestrutura foi usada, assim como as suas impressões e conclusões. Geralmente, essa investigação pode ser engatalhada por um ataque de engenharia social (via e-mail, SMS, WhatsApp). Nesse caso, você deve descrever quaisquer descobertas sobre a natureza do ataque. Esse foi um ataque direcionado? Se possível, você pode listar outras pessoas que receberam a mesma mensagem? Que técnicas o atacante usou para criar uma isca que figasse a pessoa que foi alvo dessa campanha?

Dependendo do público-alvo, talvez você queira descrever as ações tomadas pelo alvo e quaisquer conclusões que você tenha tirado sobre o grau de conhecimento do atacante sobre a situação. O alvo clicou em links, inseriu informações sensíveis em um site controlado pelo atacante, fez o download ou abriu anexos? Qual é a probabilidade das suas ações e das ações da pessoa-alvo terem sido rastreadas? Note que, se a pessoa-alvo inseriu credenciais em um site infectado ou abriu um arquivo malicioso, uma investigação mais profunda e esforços de remediação se tornarão necessários (mas isso está fora do escopo desta trilha de aprendizagem).

Uma vez que você tenha escrito e compartilhado um relatório com o seu cliente (se aplicável), há algumas coisas que você pode fazer com ele:

- Compartilhá-lo com outros defensores digitais da sociedade civil;
- Publicá-lo online.

Esses passos não são obrigatórios. Se você estiver trabalhando com un cliente cujos dispositivos foram comprometidos, você deve se certificar de que ele se sente confortável com o compartilhamento do relatório. Lembre-se de obter a aprovação do seu cliente por escrito.

Se você fizer parte de uma organização como [CiviCERT](https://www.civicert.org/), saiba que esse é um ótimo lugar para compartilhar as suas descobertas. Outros membros provavelmente lerão o seu relatório, submeterão comentários, e o levarão em conta para ações futuras.

Você também pode publicar as suas descobertas em um blog ou em uma plataforma como GitHub. Isso requer um pouco mais de esforço, mas também pode ter um impacto limitado. No entanto, lembre-se que o seu relatório pode ser importante para uma pessoa que está investigando o mesmo conjunto de infraestruturas maliciosas que você.

## Checagem de habilidade

Pegue um dos e-mails de phishing ou e-mails maliciosos que você analisou no [Módulo 2](/pt-br/learning-path/1/module-3) ou um domínio que você encontrou no [PhishTank](https://phishtank.org/) (muito cuidado ao analisar conteúdo desta plataforma, e assuma que todos os domínios listados ali são maliciosos). Você também pode usar um e-mail ou domínio que você analisou em um módulo anterior. Imagine como você escreveria um relatório descrevendo uma campanha mais ampla por trás desses e-mails. Já que o relatório não será compartilhado com ninguém, sinta-se à vontade para inventar alguns detalhes. Em seguida, escreva um resumo dos pontos principais do relatório.

Se você está estudando com o auxílio de colegas ou uma pessoa mentora, discuta as suas anotações com eles. Eles devem prestar a atenção em algumas coisas:

- As suas anotações descrevem com precisão o tipo de ataque relatado?
- O relatório contém e apresenta informações que podem ser úteis em espaços da sociedade civil, como por exemplo, indicadores de comprometimento (IoCs)?
- O relatório resume as suas descobertas de forma responsável, por exemplo, desabilitando URLs e censurando dados sensíveis das pessoas-alvo?

## Recursos de aprendizagem

{{% resource title="Maltego" languages="Inglês" cost="Grátis para uso não-comercial, com uma versão profissional paga" description="Maltego pode ser usado para criar uma representação visual das suas descobertas, tornando a identificação de conexões entre indicadores diferentes mais fácil." url="https://www.maltego.com/" %}}

{{% resource title="Ascensão de Guccifer? Campanha de phishing com duração de meses tem como alvo dezenas de jornalistas e ONGs com foco na Rússia" languages="Inglês" cost="Grátis" description="Um relatório detalhado de uma grande campanha de phishing. Você não precisa escrever um relatório tão completo, mas use-o como inspiração para relatórios futuros." url="https://www.bellingcat.com/news/uk-and-europe/2019/08/10/guccifer-rising-months-long-phishing-campaign-on-protonmail-targets-dozens-of-russia-focused-journalists-and-ngos/" %}}

{{% resource title="Irã: Comprometimento de ativistas, jornalistas, políticos financiado pelo Estado" languages="Inglês" cost="Grátis" description="Outro ótimo relatório e resumo de uma investigação. Mais uma vez, o seu será menos detalhado, mas esse é um ótimo exemplo!" url="https://www.hrw.org/news/2022/12/05/iran-state-backed-hacking-activists-journalists-politicians" %}}


