+++
style = "module"
weight = 5
title = "Encontrar Vulnerabilidades en Aplicaciones Web"
description = "Una vez que haya aprendido sobre los diferentes tipos de vulnerabilidades, ¡es hora de buscarlas en las aplicaciones web que está probando! Para comenzar y obtener algo de práctica inicial, probará una aplicación web deliberadamente vulnerable"
+++

## Caso de Uso

Una vez que haya aprendido sobre los diferentes tipos de vulnerabilidades, ¡es hora de buscarlas en las aplicaciones web que está probando! Para comenzar y obtener algo de práctica inicial, probará una aplicación web deliberadamente vulnerable..

### Objetivos

Después de completar este subtema, los profesionales podrán encontrar vulnerabilidades en un sitio web real, en lugar de comprender las vulnerabilidades individuales de forma aislada.

---
## Sección Principal

Una vez completados los subtemas anteriores, debería tener una buena comprensión de vulnerabilidades individuales. Si bien esto puede ser suficiente para guiarlo en la reparación de vulnerabilidades o realizar análisis forenses en una vulneración de una aplicación web, no es suficiente si desea encontrar esas vulnerabilidades en una aplicación web. Si bien las prácticas de laboratorio anteriores se centraron en acertijos que lo desafiaban a activar una vulnerabilidad en una sola entrada, en una aplicación web real la mayoría de las entradas no serán vulnerables a nada. Su desafío será encontrar aquellas entradas raras que sean vulnerables.

Para ayudar en esto, es útil tener una estructura mental que guíe sus pruebas. Esto le servirá para organizar sus pensamientos y notas sobre lo que está probando y también puede servir como lista de verificación. ¡No subestime el poder de una lista de verificación! Las listas de verificación son la razón por la que los viajes aéreos son seguros, y la [introducción de listas de verificación en las unidades de cuidados intensivos de los hospitales de un estado de EE. UU. redujo las tasas de infección en 2/3, y en más de un año y medio salvó más de 1.500 vidas](https://www.newyorker.com/magazine/2007/12/10/the-checklist). Cualquier tarea compleja y propensa a errores se beneficiará enormemente de una lista de verificación, y probar aplicaciones web es extremadamente complejo y propenso a errores.

### Objetivos de práctica

Para este subtema, probará una aplicación web deliberadamente vulnerable. Intentará encontrar todas las vulnerabilidades en la aplicación y documentarlas.

Para empezar, necesitarás una aplicación para realizar la prueba. Una (mala) opción sería encontrar algún sitio web aleatorio en Internet e intentar acceder a él. Esta no es una buena idea por dos razones. La primera es que no es ético (incluso si tus intenciones son buenas, ¿qué pasa si dañas accidentalmente el sitio?) y, dependiendo de dónde vivas, probablemente sea ilegal. La segunda es que, especialmente al principio, es imposible saber la diferencia entre un sitio que es seguro y que uno no sea bueno realizando pruebas.

La solución a esto es practicar en un [sitio que sea intencionalmente vulnerable](https://owasp.org/www-project-vulnerable-web-applications-directory/). Estos sitios están creados expresamente para que las personas practiquen la búsqueda y explotación de vulnerabilidades. Es ético y legal probarlos (la mayoría se pueden descargar para que usted los pruebe en su propia computadora) y tienen ciertas vulnerabilidades conocidas, para que pueda evaluar su éxito. Para este subtema usaremos la aplicación web vulnerable [OWASP Juice Shop](https://owasp.org/www-project-juice-shop/) .

### Organizando sus pruebas

A continuación, necesitará una metodología para guiar sus pruebas. A medida que adquiera experiencia, probablemente comenzará a desarrollar su propia estructura y procedimientos que funcionen bien para su estilo de trabajo preferido. Sin embargo, al principio necesitarás una para empezar. Para esta ruta de aprendizaje, utilizaremos [una metodología escrita por Tanner Prynn](https://github.com/tprynn/web-methodology), que está en línea con los estándares utilizados por la mayoría de las prácticas profesionales de pruebas de penetración de aplicaciones web. Este documento metodológico es un buen compromiso entre brevedad (compare sus 23 páginas impresas con las 465 de la guía de pruebas OWASP) y exhaustividad. No contiene todas las vulnerabilidades posibles ni tiene una guía completa para probar las vulnerabilidades que cubre, pero debería ser suficiente para permitirle aprovechar la experiencia que tiene.

Además de tener una estructura y una lista de verificación de lo que ha probado, es extremadamente importante que tome notas detalladas. Las notas estructuradas, como una lista de verificación, solo llegan hasta cierto punto. A continuación se muestran algunos ejemplos de cómo utilizar notas de formato libre:

- Quizás esté en medio de algunas pruebas específicas y observe algún comportamiento extraño en el sitio. No interrumpa sus pruebas enfocadas, tome nota e investigue el comportamiento extraño más tarde.
- Quizás no comprenda cómo funciona una parte del sitio; tome nota de eso. Si está trabajando con el propietario del sitio, puede hacerle un montón de preguntas a la vez en lugar de molestarlo durante todo el día. O tal vez la forma en que funciona esa parte del sitio quedará clara a medida que avance por el resto del sitio.
- Quizás encuentre un lugar para ingresar datos, pero no es inmediatamente obvio dónde se utilizan esos datos. Tome nota de ello. Quizás encuentres dónde aparecen esos datos más adelante; si es así, deberá consultar ambas páginas web cuando pruebe esa entrada.
- Mantenga siempre notas sobre cualquier lugar donde el sitio no funcione correctamente. Los necesitará para su informe.
- A veces estará _seguro_ de que una entrada en particular es vulnerable a algo, pero tendrá dificultades para descubrir qué o cómo. Escriba lo que ha probado y luego continúe. Unas pocas horas o una noche de descanso pueden brindarle una nueva perspectiva.

### Informe

Finalmente, para que su arduo trabajo sea útil para cualquiera, debe documentar las vulnerabilidades que encuentre. Generalmente probarás el sitio web de otra persona y producirá algún tipo de informe, ya sea formal o informal. De todos modos, algunos de los objetivos principales del informe deben ser comunicar:

- Qué fue probado
- Qué _no_ se probó y por qué
- Para cada vulnerabilidad encontrada:
  - Dónde estaba ubicada la vulnerabilidad
  - Cómo activar la vulnerabilidad para su posterior reproducción
  - Cuál es el riesgo/impacto de seguridad de la vulnerabilidad
  - Recomendaciones para solucionar la vulnerabilidad

Por lo general, los informes tendrán una sección introductoria que habla sobre lo que se probó y lo que no, y luego otra sección que contiene detalles de cada vulnerabilidad encontrada. Profundicemos en cada sección.

La sección introductoria normalmente contiene información sobre la aplicación probada. Detalles como la URL de la aplicación, el entorno en el que se probó (por ejemplo, producción versus pre-producción) y el rango de fechas en el que se realizó la prueba son todos importantes, lo que permite a los desarrolladores del sitio web contextualizar las pruebas en función de sus ciclos de desarrollo y lanzamiento.

También es importante incluir información sobre los objetivos de la prueba. Para algunas pruebas, el objetivo podría ser probar únicamente vulnerabilidades que podrían resultar en una toma completa de la infraestructura del servidor web. Para otros, el objetivo podría ser realizar una prueba muy exhaustiva y completa. Para la mayoría de las pruebas de aplicaciones web, la prueba debe completarse dentro de un período de tiempo determinado y el objetivo es identificar vulnerabilidades, tantas y tan impactantes como sea posible en ese tiempo. Incluir esta información cruza la línea entre describir lo que se probó y lo que no se probó.

Finalmente, si se excluyó algún tipo de prueba, alguna partes del sitio no se probaron o si hubo otras restricciones que impidieron que se alcanzaran los objetivos de la prueba, es importante anotarlos en el informe. De esa manera, los propietarios del sitio no estarán al tanto de áreas que podrían contener vulnerabilidades desconocidas.

Los informes de evaluación de seguridad de aplicaciones web normalmente tendrán otra sección que enumera los detalles de cada vulnerabilidad encontrada. Esta es la parte más importante del informe y es importante que sea clara y comprensible. Por lo general, esto toma la forma de una lista para cada vulnerabilidad que incluye cosas como:

- Lugar: Una URL y un parámetro, solo una URL y/o una línea de código (si se conoce). Todo esto ayudará a los desarrolladores y desarrolladoras a encontrar el código que contiene la vulnerabilidad. Tenga en cuenta que algunas vulnerabilidades pueden existir en varios lugares, en cuyo caso normalmente está bien documentar varias ubicaciones. En algunos casos, puede existir una vulnerabilidad en todo el sitio web. En otros, puede que exista en demasiados lugares para documentarlo, pero no en todas partes. En cualquier caso, el objetivo es la claridad; el lector debe comprender cuál de los casos anteriores existe.
- Cómo activar la vulnerabilidad: A menudo denominada "pasos de reproducción", esta es una descripción de cómo desencadenar la vulnerabilidad. Esto es invaluable para los equipos de desarrollo que intentan corregir la vulnerabilidad. En algunos casos, esto puede ser tan simple como una URL (por ejemplo, algo como “Visita [http://victim.com/search?q=&lt;script&gt;alert(‘xss’)&lt;/script&gt;](http://victim.com/search?q=)), en otros casos, es posible que se requieran varias etapas de configuración. Lo ideal es que los pasos de reproducción sean claros y reproducibles.
- Calificación de riesgo: Las clasificaciones de riesgo son algo subjetivas y a menudo requieren datos que no están fácilmente disponibles para la persona que realiza la prueba (como la importancia relativa de este sitio web en particular para el propietario del sitio). Sin embargo, deben ser al menos coherentes internamente dentro de un informe. Generalmente se utiliza una escala de calificación, como por ejemplo:
  - Crítico: Vulnerabilidades extremadamente graves que pueden resultar en un vulneración fácil de la aplicación, como la ejecución remota de código o inyección SQL explotable por cualquier persona a través de Internet. Si, al encontrar una vulnerabilidad, su primer pensamiento es "¿cómo es que esta aplicación no mina Bitcoin ni envía spam?" Probablemente sea un riesgo crítico.
  - Alto: Vulnerabilidades graves que resultan en un compromiso menos completo y/o son más difíciles de explotar. Algunos ejemplos podrían ser la inyección SQL que sólo es explotable por usuarios internos, la mayoría de las vulnerabilidades de autorización o [XSS que se puede propagar de un sitio o cliente vulnerable a otro](https://en.wikipedia.org/wiki/Samy_%28computer_worm%29). Si su primer pensamiento al encontrar una vulnerabilidad es informarle al propietario del sitio de inmediato, probablemente sea un alto riesgo.
  - Medio: Vulnerabilidades cuya explotación solo resultaría en un compromiso parcial de la aplicación, o tendrían un alto impacto pero son muy difíciles de explotar (como un ataque de sincronización que requeriría muchos miles de millones de solicitudes). La mayoría de las vulnerabilidades XSS y CSRF, y la divulgación parcial de información (como problemas menores de autorización o la mayor parte de la divulgación del código fuente) se incluyen en esta clasificación. Por lo general, se trata de vulnerabilidades que es importante solucionar, pero no constituyen una emergencia.
  - Bajo: Vulnerabilidades que sí tienen un impacto en la aplicación, pero ese impacto es bastante menor. Por lo general, se trata de cosas como divulgaciones de información menores, problemas que facilitan un poco la explotación de otras vulnerabilidades (como la falta de limitación de velocidad) o el incumplimiento de las mejores prácticas que no tiene un impacto real.
  - Informativo: Estos incluyen vulnerabilidades que en realidad no son explotables pero que podrían convertirse en problemas en el futuro, errores funcionales sin impacto en la seguridad u otros problemas no relacionados con la seguridad.

A veces se utilizará un método más estructurado para llegar a una calificación de riesgo, como [CVSS](https://www.ibm.com/docs/en/qsip/7.5?topic=vulnerabilities-common-vulnerability-scoring-system-cvss). Tenga en cuenta que estos métodos son lo suficientemente inflexibles como para generar a veces calificaciones de riesgo que no reflejan la realidad, o lo suficientemente flexibles como para no proporcionar ninguna coherencia significativa. Para obtener más orientación sobre cómo determinar las calificaciones de riesgo, consulte [la metodología de calificación de riesgo de OWASP](https://owasp.org/www-community/OWASP_Risk_Rating_Methodology) y las pautas de calificación de riesgo para programas de recompensas por errores como [Bugcrowd](https://bugcrowd.com/vulnerability-rating-taxonomy).

- Recomendación: Como alguien que debería saber más sobre seguridad web que el propietario o propietaria del sitio web, probablemente tenga buenos consejos sobre cómo solucionar un problema en particular. Generalmente, no sabrá lo suficiente sobre los aspectos internos de la aplicación para brindar orientación específica, pero en algunos casos podrá hacerlo. Sin embargo, normalmente debería proporcionar consejos generales, por ejemplo, utilizar la codificación de salida para corregir XSS o parámetros enlazados para corregir SQLi. Tenga en cuenta que, en muchos casos, es posible que las personas propietarias del sitio no puedan seguir exactamente sus consejos. Esto es sólo una realidad del desarrollo de aplicaciones y, en general, no es algo que deba tomarse como algo personal.

Si bien lo anterior representa una cantidad mínima razonable de información para incluir en un informe, está bien (y a menudo es bueno) incluir más. Las empresas profesionales de evaluación de la seguridad a veces elaboran informes que están a disposición del público. Leerlos puede proporcionarle inspiración para sus propios informes, así como información sobre las vulnerabilidades que pueden existir y sus clasificaciones de riesgo. [Este GitHub](https://github.com/juliocesarfort/public-pentesting-reports/tree/master) contiene un gran repositorio de informes públicos. Tenga en cuenta que muchos informes públicos no incluyen detalles de vulnerabilidad, pero algunos (como los siguientes) sí lo hacen:

- [Bishop Fox - Winston Privacy](https://github.com/juliocesarfort/public-pentesting-reports/blob/master/Bishop%20Fox/Bishop%20Fox%20Assessment%20Report%20-%20Winston%20Privacy.pdf)
- [Cure53 - 1Password](https://github.com/juliocesarfort/public-pentesting-reports/blob/master/Cure53/Cure53-1PW18-report.pdf)
- [DoyenSec - Gravity Platform](https://github.com/juliocesarfort/public-pentesting-reports/blob/master/Doyensec/Doyensec_Gravitational_GravityPlatform_Q22019.pdf)
- [iSEC - phpMyAdmin](https://github.com/juliocesarfort/public-pentesting-reports/blob/master/iSEC/NCC_Group_-_phpMyAdmin.pdf)

Una última nota sobre los informes: Es muy importante que documente los hallazgos en su informe mientras realiza la prueba. Por lo general, los evaluadores y evaluadoras con poca experiencia querrán seguir realizando pruebas, pensando que será fácil redactar el informe más adelante. Esto es falso. Terminan sus pruebas y luego luchan por completar su informe, y a menudo necesitan regresar y hacer más pruebas para completar su informe. Puede parecer ineficiente dejar de realizar pruebas y escribir una vulnerabilidad en su informe, especialmente si tiene que actualizar esa vulnerabilidad más adelante. Sin embargo, es más eficiente hacer exactamente esto.

## Práctica

La mayor parte de esta ruta de aprendizaje es esta práctica. Aquí reunirá todas las técnicas que aprendió en subtemas anteriores para encontrar vulnerabilidades en una aplicación web real. Deberías esperar que esto te lleve algo de tiempo. Por lo general, a una persona profesional capacitada le tomaría hasta una semana evaluar completamente una aplicación como Juice Shop, y usted aún no es una persona profesional capacitada. Es posible que se encuentre luchando; eso es normal. Resista la tentación de buscar tutoriales u hojas de respuestas, o de consultar las siguientes secciones de esta ruta de aprendizaje. La lucha es una parte natural e importante del proceso de aprendizaje.

1. [Instale Juice Shop](https://hub.docker.com/r/bkimminich/juice-shop/#docker-container) (usar Docker es el método más sencillo)
2. De forma predeterminada, Juice Shop tiene vulnerabilidades peligrosas desactivadas. ¡Esas son las vulnerabilidades más importantes que hay que encontrar! Querrá [cambiar la configuración](https://pwning.owasp-juice.shop/companion-guide/latest/part4/customization.html) para configurar safetyOverride en verdadero. Mientras lo hace, incluya también todos los indicadores de configuración en [quiet.yml](https://github.com/juice-shop/juice-shop/blob/master/config/quiet.yml).
3. Prepare su entorno de prueba:
    - Burp o cualquier proxy que prefieras
    - Uno o más perfiles de navegador para realizar pruebas.
    - Una metodología de referencia
    - Los inicios de un informe
    - Sus documentos de notas
4. ¡Empiece a probar! Recuerde ser metódico, tomar notas detalladas y documentar las vulnerabilidades a medida que las encuentre. Recuerde que puede haber vulnerabilidades que no existen en el sitio, entradas que no son vulnerables a nada y múltiples instancias de algunos tipos de vulnerabilidades.

No debería esperar encontrar todos los casos de cada vulnerabilidad. Inténtelo, pero no se decepcione si no lo hace. Además, trate de no cuestionarse demasiado acerca de si realizó las pruebas lo suficientemente exhaustivas o no. Es [literalmente imposible](https://es.wikipedia.org/wiki/Teor%C3%ADa_de_la_computabilidad) saber con seguridad que ha encontrado todas las vulnerabilidades en todas las aplicaciones, excepto en las más limitadas.

En su lugar, siga la metodología e intente probar minuciosamente el sitio web. Si tiene cosas que revisar de sus notas, revíselas brevemente, pero no dedique mucho tiempo a esas cosas. Recuerde, esto es sólo una práctica.

## Verificación de Habilidades

Si tiene un mentor o mentora, revise su informe de práctica con él. Probablemente le resultará útil consultar uno o más artículos que contienen vulnerabilidades que otras personas han encontrado, [aquí tiene uno](https://pwning.owasp-juice.shop/companion-guide/latest/part2/README.html). Tenga en cuenta que Juice Shop contiene muchos desafíos. Los desafíos implican principalmente la explotación de vulnerabilidades. Lo mejor que puedes hacer es que tu mentor o mentora te dé pistas sobre las vulnerabilidades que pasaste por alto, por ejemplo, en qué página se encuentran, y luego intenta encontrarlas tú mismo. Si está realmente estancado, pídale a su mentor o mentora que le acompañe a través de la vulnerabilidad.

Si no tiene un mentor o mentora a, puede ser autodidacta para este subtema. Simplemente puede realizar las actividades anteriores. En lugar de recibir una pista de su mentor o mentora, observe brevemente los desafíos e intente descubrir la vulnerabilidad asociada. Nuevamente, si está realmente estancado, existen numerosos tutoriales, tanto escritos como en formato de video.

## Recursos de Aprendizaje

{{% resource title="La Lista de Verificación" description="Un artículo sobre la importancia de utilizar listas de verificación en muchas profesiones diferentes." languages="Inglés" cost="Gratis para los primeros artículos de la publicación, los posteriores requieren suscripción" url="https://www.newyorker.com/magazine/2007/12/10/the-checklist" %}}

{{% resource title="Directorio de aplicaciones web vulnerables de OWASP" description="Una colección de aplicaciones web con vulnerabilidades conocidas que se pueden utilizar para probar las habilidades de evaluación web y pruebas de penetración." languages="Inglés" cost="Gratis" url="https://owasp.org/www-project-vulnerable-web-applications-directory/" %}}

{{% resource title="Metodología para pruebas de seguridad de aplicaciones web de alta calidad" description="Una lista completa (y, para citar al autor, "con opiniones") de cuestiones que un protector digital debe revisar al evaluar la seguridad de las aplicaciones web." languages="Inglés" cost="Gratis" url="https://github.com/tprynn/web-methodology/wiki" %}}

{{% resource title="Samy (gusano)" description="Un ejemplo de un código malicioso que aprovechó las vulnerabilidades XSS" languages="Inglés, Árabe, Chino, Indonesio, Lombardo" cost="Gratis" url="https://en.wikipedia.org/wiki/Samy_(computer_worm)" %}}

{{% resource title="Una descripción general de CVSS" description="Un vistazo rápido al sistema común de puntuación de vulnerabilidades, un enfoque estructurado utilizado para calificar la gravedad de las vulnerabilidades." languages="Árabe, búlgaro, catalán, checo, danés, alemán, griego, inglés, español, finlandés, francés, croata, húngaro, italiano, hebreo, japonés, coreano, kazajo, holandés, noruego, polaco, portugués, rumano, ruso, eslovaco, Esloveno, serbio, sueco, tailandés, turco, vietnamita, chino simplificado, chino tradicional" cost="Gratis" url="https://www.ibm.com/docs/es/qsip/7.5?topic=vulnerabilities-common-vulnerability-scoring-system-cvss" %}}

{{% resource title="Metodología de calificación de riesgo OWASP" description="Hay muchas formas diferentes de calificar los riesgos de vulnerabilidades y exploits, y OWASP crea una de ellas, que se describe aquí en detalle." languages="Inglés" cost="Gratis" url="https://owasp.org/www-community/OWASP_Risk_Rating_Methodology" %}}

{{% resource title="Taxonomía de vulnerabilidad de Bugcrowd" description="Otra forma de rastrear riesgos de vulnerabilidades, esta vez por Bugcrowd" languages="Inglés" cost="Gratis" url="https://bugcrowd.com/vulnerability-rating-taxonomy" %}}

{{% resource title="Informes públicos de pruebas de penetración" description="Una lista pública de informes de pruebas de penetración elaborados." languages="Inglés" cost="Gratis" url="https://github.com/juliocesarfort/public-pentesting-reports/tree/master" %}}