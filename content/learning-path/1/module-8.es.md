---
style: module
title: Documentación de los hallazgos
description: Este módulo le enseña cómo escribir y compartir los resultados de
  su investigación e incluya indicadores de compromiso (IoC) apropiados.
weight: 8
---

## Estudio de caso

Puede haber varias razones por las que las organizaciones de la sociedad civil no comparten sus hallazgos. Puede que no tengan el tiempo para hacerlo carecer de tiempo para hacerlo, pueden estar preocupados por compartir muestras de malware o indicadores de compromiso, o simplemente pueden carecer de la experiencia necesaria sobre cómo documentar de manera responsable los resultados de una investigación de malware. Este módulo aborda este último punto.

Antes de adentrarse en  este módulo, asegúrese de haber leído detenidamente y comprendido los dos artículos (de Amnistía/HRW y de Bellingcat) presentados en el módulo 7.

## Objetivos

Al terminar este módulo, el profesional debe ser capaz:

- Realizar una redacción rápida de una investigación
- Seleccionar indicadores apropiados de riesgos y daños y compartirlos de manera responsable
- Comprender la mejor manera de difundir los resultados de un informe

---
## Sección Principal

A medida que investigue la infraestructura maliciosa asociada con una campaña de phishing en particular u otra amenaza, es imperativo que tome notas detalladas sobre lo que está haciendo y lo que descubre, porque podría olvidarse de pequeños detalles que podrían  ser importantes. Además, es probable que los atacantes cambien su infraestructura (por ejemplo, cambien de servidor) durante su investigación. Por lo tanto, debe anotartomar lo que está haciendo y lo que descubre. Incluya toda la información que recopile, incluso los resultados de consultas de DNS/ whois, correos electrónicos y páginas web de atacantes (fuente completa y capturas de pantalla, etc). El formato exacto de estas notas no es importante, pero si deben ser exhaustivas.

A medida que avance su investigación, comience a llevar notas de análisis más detalladas y realizar un rastreo de los hallazgos más importantes. También es bueno hacer un rastreo por separado, ya que es probable que sus notas se vuelvan muy largas y difíciles de manejar. En las notas de hallazgos significativos apunte sus conclusiones sobre varias piezas de infraestructura y las conexiones entre ellas. Piense en esto como piezas clave que que probablemente querrá presentar en su informe final. Al igual que con sus notas sin filtrar, el formato de estas notas no es significativo, pero a muchas personas les gusta usar [Maltego](https://www.maltego.com/) para documentar su trabajo.

Finalmente, cuando haya concluido su investigación, es hora de escribir su informe.

Este informe deberá contener un relato fáctico de lo que sucedió y qué infraestructura se utilizó, así como sus impresiones y conclusiones. En virtud de que seguramente su investigación se desencadenó por algún tipo de ataque de ingeniería social (por correo electrónico, SMS, WhatsApp, etc.), usted hará bien en anotar cualquier conclusión a la que haga llegado en relación con la naturaleza del ataque. ¿Fue un ataque dirigido? Si es posible, ¿puede identificar a otras personas que recibieron el mensaje? ¿Qué técnicas utilizó el atacante para intentar engañar a la persona objeto de su agresión?

Dependiendo de la audiencia, es posible que también desee tener en cuenta las acciones de la persona contra quien se dirigió el ataque y cualquier conclusión que haya sacado sobre el conocimiento de la situación por parte del atacante. ¿Siguieron enlaces, introdujeron información confidencial en sitios web controlados por atacantes, descargaron archivos adjuntos, abrieron archivos adjuntos, etc.? ¿Qué tan probable es que hayan rastreado sus acciones y las de la persona objetivo? Tenga en cuenta que si la víctima introdujo credenciales o abrió malware, se justifica una investigación más profunda y un esfuerzo de descontaminación (fuera del alcance de esta ruta de aprendizaje).

Una vez que haya creado un informe y lo haya compartido con su cliente (si corresponde), hay un par de cosas que puede hacer con él:


- Compartirlo con sus compañeros defensores digitales de la sociedad civil
- Darlo a conocer al mundo

Puede hacer una o ambas cosas. Si estaba trabajando con un cliente cuyo dispositivo se vio afectado, por supuesto, deberá asegurarse de que esta persona se sienta cómoda compartiendo el informe. Lo mejor es obtener su autorización por escrito.

Si es miembro de una organización como [CiviCERT](https://www.civicert.org/), ese es un gran lugar para compartir sus hallazgos. Es probable que los demás miembros lean su informe, proporcionen comentarios y tomen medidas al respecto.

También puede publicar sus hallazgos en un blog o en algún lugar como GitHub. Esto requiere poco esfuerzo, pero también puede ser limitado en su impacto. Sin embargo, su informe puede ser invaluable para alguien que está investigando un caso similar. 

## Comprobación de habilidades

Tome uno de los correos electrónicos de phishing o correos electrónicos maliciosos dirigidos que analizó en el módulo 2 o un dominio que encontró en [PhishTank](https://phishtank.org/) (tenga cuidado al analizar este último, debe suponer que todos los dominios enumerados allí son maliciosos). También puede usar un correo electrónico o dominio que haya analizado en un módulo anterior. Imagine y planifique cómo sería que escribiría para describir la campaña detrás de esos correos electrónicos. Dado que este ejercicio de informe no se compartirá con nadie, no dude en inventar algunos detalles. A continuación, escriba algunas notas que resuman el contenido de su informe.

Si está trabajando con un compañero/a o un mentor/a, discuta sus notas con ellos. Juntos deberían verificar algunas cosas como estas:

- ¿Las notas describen con precisión el tipo de ataque?
- ¿El informe contiene y presenta información de una manera que podría ser útil para otros en el espacio de la sociedad civil, por ejemplo, mediante la inclusión de indicadores de compromiso (IoC)?
- ¿Resume en el informe sus hallazgos de manera responsable, por ejemplo, modificando las URL y redactando datos confidenciales sobre las personas blanco de los ataques?

## Recursos de Aprendizaje

{{% resource title="Maltego" description="Hay una versión comunitaria gratuita para uso no comercial. La versión Pro cuesta 999 USD al año. Maltego puede utilizarse para la representación visual de los hallazgos y facilitar la identificación de conexiones entre distintos indicadores." url="https://www.maltego.com/" %}}
{{% resource title="¿Guccifer Rising? Campaña de phishing de meses de duración en ProtonMail dirigida a decenas  de ONGs y periodistas interesados en el tema de Rusia" description="(Compartido anteriormente en esta ruta de aprendizaje) Este es un informe muy completo sobre una importante campaña de phishing. No sienta la necesidad de hacer el suyo tan completo, pero úselo para inspirarse." languages="Inglés" cost="Gratis" url="https://www.bellingcat.com/news/uk-and-europe/2019/08/10/guccifer-rising-months-long-phishing-campaign-on-protonmail-targets-dozens-of-russia-focused-journalists-and-ngos/" %}}
{{% resource title="Iran: Jaqueo respaldado por el Estado contra, activistas, periodistas y políticos" description="(Compartido anteriormente en esta ruta de aprendizaje) Otro excelente artículo y resumen de una investigación. Una vez más, es probable que el suyo sea menos exhaustivo, pero este es un buen ejemplo." languages="Inglés" cost="Gratis" url="https://www.hrw.org/news/2022/12/05/iran-state-backed-hacking-activists-journalists-politicians" %}}
