---
style: module
title: Documentación de los hallazgos
description: Este módulo le enseña cómo escribir y compartir los resultados de su investigación e incluya indicadores de compromiso (IoC) apropiados.
weight: 8
---

## Estudios de caso

Puede haber varias razones por las que las organizaciones de la sociedad civil no informan ni comparten sus hallazgos. Pueden carecer de tiempo para hacerlo, pueden estar preocupados por compartir muestras de malware o indicadores de compromiso, o simplemente pueden carecer de la experiencia sobre cómo documentar de manera responsable los hallazgos de una investigación de malware. Este subtema aborda el último punto.

Antes de completar este subtema, asegúrese de haber leído detenidamente y comprendido los dos artículos (de Amnistía/HRW y de Bellingcat) descritos en el subtema 7.

## Objetivos

Después de completar esta subhabilidad, el profesional debe ser capaz de hacer lo siguiente:

- Realizar una redacción rápida de una investigación
- Seleccionar indicadores apropiados de compromiso y compartirlos de manera responsable
- Comprender la mejor manera de difundir los resultados de un artículo

---
## Sección Principal

A medida que investiga la infraestructura maliciosa asociada con una campaña de phishing en particular u otra amenaza, es imperativo que mantenga notas detalladas. Es posible que olvide pequeños detalles que resultan ser importantes. Además, es probable que los actores de amenazas cambien su infraestructura (por ejemplo, cambien de servidor) durante su investigación. Por lo tanto, debe tomar notas tanto de lo que estás haciendo como de lo que descubre. Incluya toda la información que recopile, incluso los resultados de consultas de DNS/ whois, correos electrónicos y páginas web de atacantes (fuente completa y capturas de pantalla), etc. El formato exacto de estas notas no es importante, pero deben ser exhaustivas.

A medida que avance su investigación, querrá comenzar a llevar notas de análisis más detalladas y realizar un rastreo de sus hallazgos importantes. También puede documentarlos en sus notas detalladas, pero incluso es bueno hacer un rastreo por separado, ya que es probable que sus notas detalladas se vuelvan muy largas y difíciles de manejar. Sus notas de hallazgos significativos deben contener sus conclusiones sobre varias piezas de infraestructura y las conexiones entre ellas. Piense en ello como si contuvieran cosas que probablemente querrá mantener en su informe final. Al igual que con sus notas sin filtrar, el formato de estas notas no es significativo, pero a muchas personas les gusta usar [Maltego](https://www.maltego.com/) para documentar las conexiones.

Finalmente, cuando haya concluido su investigación, es hora de escribir su informe.

El informe debe contener un relato fáctico de lo que sucedió y qué infraestructura se utilizó, así como sus impresiones y conclusiones. En general, esta investigación se desencadenará por algún tipo de ataque de ingeniería social (por correo electrónico, SMS, WhatsApp, etc.). En ese caso, querrá anotar cualquier conclusión que haya sacado sobre la naturaleza del ataque. ¿Estaba dirigido? Si es posible, ¿puede identificar a otras personas que recibieron el mensaje? ¿Qué técnicas utilizó el atacante para intentar engañar a la persona objetivo?

Dependiendo de la audiencia, es posible que también desee tener en cuenta las acciones de la persona objetivo y cualquier conclusión que haya sacado sobre el conocimiento de la situación por parte del atacante. ¿Siguieron enlaces, introdujeron información confidencial en sitios web controlados por atacantes, descargaron archivos adjuntos, abrieron archivos adjuntos, etc.? ¿Qué tan probable es que se hayan rastreado sus acciones y las de la persona objetivo? Tenga en cuenta que si la víctima introdujo credenciales o abrió malware, se justifica una investigación más profunda y un esfuerzo de descontaminación (fuera del alcance de esterutao de aprendizaje).

Una vez que haya creado un informe y lo haya compartido con su cliente (si corresponde), hay un par de cosas que puede hacer con él:

- Compártalo con sus compañeros defensores digitales de la sociedad civil
- Publíquelo al mundo

Puede hacer una o ambas cosas. Si estaba trabajando con un cliente cuyo dispositivo se vio comprometido, por supuesto, deberá asegurarse de que se sienta cómodo compartiendo el informe. Lo mejor es obtener su aprobación por escrito.

Si es miembro de una organización como [CiviCERT](https://www.civicert.org/), ese es un gran lugar para compartir sus hallazgos. Es probable que los demás miembros lean su informe, proporcionen comentarios y tomen medidas al respecto.

También puede publicar sus hallazgos en un blog o en algún lugar como GitHub. Esto requiere poco esfuerzo, pero también puede ser limitado en su impacto. Sin embargo, su informe puede ser invaluable para alguien que está investigando un conjunto similar de infraestructura.

## Comprobación de Habilidades

Tome uno de los correos electrónicos de phishing o correos electrónicos maliciosos dirigidos que discutió en el Subtema 2 o un dominio que encontró en [PhishTank](https://phishtank.org/) (tenga cuidado al analizar este último, suponga que todos los dominios enumerados allí son maliciosos). También puede usar un correo electrónico o dominio que haya analizado en un subtema anterior. Imagine y planifique cómo sería un informe que describa la campaña más amplia detrás de esos correos electrónicos. Dado que el informe no se compartirá con nadie, no dude en inventar algunos detalles. A continuación, escriba algunas notas que resuman/describan ese informe.

Si está trabajando con un compañero o un mentor, discuta esas notas con ellos. Deben verificar algunas cosas:

- ¿Las notas describen con precisión el tipo de ataque?
- ¿El informe contiene y presenta información de una manera que podría ser útil para otros en el espacio de la sociedad civil, por ejemplo, mediante la inclusión de indicadores de compromiso (IoC)?
- ¿Resume en el informe sus hallazgos de manera responsable, por ejemplo, modificando las URL y redactando datos confidenciales sobre las personas objetivo?

## Recursos de Aprendizaje

{{% resource title="Maltego" description="Maltego puede utilizarse para la representación visual de los hallazgos y facilitar la identificación de conexiones entre distintos indicadores." languages="Inglés" cost="Existe una versión comunitaria gratuita para uso no comercial, mientras que las versiones Pro cuestan 999 USD al año." url="https://www.maltego.com/" %}}
{{% resource title="¿Guccifer Rising? Campaña de phishing de meses de duración en ProtonMail está dirigida a docenas de periodistas y ONG de Rusia" description="(Compartido anteriormente en esterutao de aprendizaje) Este es un informe muy completo sobre una importante campaña de phishing. No sienta la necesidad de hacer el suyo tan completo, pero siéntase libre de inspirarse en él." languages="Inglés" cost="Gratis" url="https://www.bellingcat.com/news/uk-and-europe/2019/08/10/guccifer-rising-months-long-phishing-campaign-on-protonmail-targets-dozens-of-russia-focused-journalists-and-ngos/" %}}
{{% resource title="Iran: Jaqueo, respaldado por el Estado, de Activistas, Periodistas y Políticos" description="(Compartido anteriormente en esterutao de aprendizaje) Otro gran artículo y resumen de una investigación. Una vez más, es probable que el suyo sea menos exhaustivo, pero este es un gran ejemplo." languages="Inglés" cost="Gratis" url="https://www.hrw.org/news/2022/12/05/iran-state-backed-hacking-activists-journalists-politicians" %}}