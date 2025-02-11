+++
style = "module"
weight = 8
title = "Detección y determinación basadas en muestras"
+++

## Estudio de Caso

Imagine que tiene una muestra de un archivo y necesita determinar si es malicioso. El archivo puede haber sido enviado al objetivo por correo electrónico, redes sociales o mensajería instantánea, o transferido a través de medios extraíbles o de otro modo. El archivo en sí puede ser binario, un archivo comprimido, una página web capturada u otro formato. El objetivo principal es determinar si el archivo es malicioso. Además, es posible que pueda hallar información adicional útil para caracterizarlo. Sin embargo, para obtener más orientación, revise el [Análisis de Malware en la Ruta de Aprendizaje](/es/learning-path/3/).

## Objetivos

Después de completar este módulo, el profesional debe ser capaz de:

- Investigar archivos sospechosos utilizando plataformas de malware.
- Usar entornos aislados (*sandbox*) para ayudar a determinar si una muestra es maliciosa y qué efectos tiene.

---
## Sección Principal

Si necesita una evaluación más profunda de algunos archivos específicos, existen servicios en línea que escanearán un archivo específico o un conjunto de archivos en busca de malware. Si tiene un archivo que sospecha que es malicioso, puede cargarlo en el servicio de escaneo. Tenga en cuenta que estos servicios no mantienen confidencial el contenido de los archivos que envía. Evite enviar archivos que contengan información confidencial. Estos archivos pueden provenir de otros archivos adjuntos a correo electrónico o ser archivos descargados recientemente en el dispositivo de la persona blanco del ataque. Tenga en cuenta que, en muchos casos, la descarga inicial puede haberse hecho a través de *dropper*, un tipo de software malicioso ejecutable que instala el malware real. Si es posible, analice las fechas de creación/modificación/descarga de archivos para identificar los archivos que podrían haber sido descargados por el *dropper* inicial.

Si prefiere no compartir un archivo completo con un servicio en línea, pero aun así desea verificar si alguna vez se ha enviado, simplemente puede cargar un *hash* del archivo. Un *hash* es como una huella digital corta de un archivo: se puede utilizar para identificar un archivo único sin revelar su contenido. Para obtener más información sobre *hashes*, consulta la sección *“Hashes”* en el Capítulo 7 de la [Guía de Campo para Respuesta a Incidentes para la Sociedad Civil y Medios](https://internews.org/resource/field-guide-to-incident-response-for-civil-society-and-media/). La actividad de la guía supone que el estudiante está aprendiendo en un sistema operativo Linux, por lo que deberá buscar la utilidad de línea de comandos que utilizará para obtener una suma SHA en la plataforma elegida, por ejemplo, usando shasum o openssl en MacOS o usando Get-FileHash o certutil en PowerShell.

Un servicio popular de inteligencia de malware es [VirusTotal](https://www.virustotal.com/) de Google. VirusTotal escaneará un archivo con varios escáneres antimalware e informará de los resultados. También puede buscar *hashes* de archivos o URL. VirusTotal es de uso gratuito pero sujeto a restricciones de volumen. Para obtener una descripción detallada, completa la sección **“Utilizando VirusTotal”** del Capítulo 7 del documento de Internews’ [Guía de Campo para Respuesta a Incidentes para la Sociedad Civil y Medios](https://internews.org/resource/field-guide-to-incident-response-for-civil-society-and-media/).

Después de leer el capítulo anterior, debería poder:

- Comprender lo que significa enviar una muestra a VirusTotal (compartir tu muestra con clientes de pago de VirusTotal) y poder decidir si es apropiado hacerlo.
- Enviar un archivo o verificar un registro mediante _hash_ y leer las pestañas Detecciones, Detalles, Relaciones, Comportamiento y Comunidad en VirusTotal.

### Sandboxes (entornos aislados)

Los entornos aislados (*Sandbox*) proporcionan un espacio virtual que simula una computadora común que captura registros detallados de las actividades que ocurren en la memoria y en el disco. Generalmente, esto permite una forma segura y automatizada de iniciar el análisis de malware y entender las acciones e intenciones de un archivo.

Varios servicios de entornos aislados (*sandbox*) comerciales de acceso gratuito incluyen [Hybrid Analysis](https://www.hybrid-analysis.com/), [Any.Run](https://any.run/), [Joe Sandbox](https://www.joesandbox.com/), y [Triage](https://tria.ge/). Estos servicios ejecutan archivos que les envían y realizan análisis dinámico. Esto tiene la gran  ventaja de poder detectar heurísticamente nuevo malware y también evaluar varias etapas del malware. Tenga en cuenta que las muestras enviadas serán recopiladas y estarán disponibles para analistas y clientes de pago.

Cuckoo Sandbox es una herramienta gratuita de análisis de malware en un sandbox de código abierto que puede auto-hospedar. CERT-EE en Estonia ofrece una versión gratuita alojada en línea: [Cuckoo V2](https://cuckoo.cert.ee/), [Cuckoo V3](https://cuckoo-hatch.cert.ee/).

Para obtener más información sobre el uso de entornos aislados o *Sandboxes* para la detección de muestras, complete la sección **“Sandboxes”** en el Capítulo 10 de Internews’ [Guía de Campo para Respuesta a Incidentes para la Sociedad Civil y Medios](https://internews.org/resource/field-guide-to-incident-response-for-civil-society-and-media/), que utiliza el Triage sandbox como ejemplo.

Después de completar la actividad, debería poder:

- Enviar un archivo a un entorno aislado o *sandbox*.
- Seleccionar o configurar un entorno operativo apropiado para *sandbox*.
- Decidir si las redes deben deshabilitarse o imitarse.
- Leer la visión general de los resultados, incluidas las detecciones automáticas.
- Tener una comprensión general de las otras categorías de información que se presentan en el análisis del *sandbox*. Con el propósito de detección, no es necesaria una comprensión detallada, pero para el Análisis de Malware o la caza de amenazas deberá comprenderlos más a fondo.

Puede encontrar un análisis más detallado sobre las *Sandboxes* en la ruta de aprendizaje de Análisis de Malware de Infuse.

Tenga en cuenta que el malware avanzado puede iniciar verificaciones para descubrir si se encuentra en un entorno virtualizado / sandbox, por lo que puede comportarse de manera diferente según dicho entorno, por lo que ningún espacio *sandbox* será 100% confiable.

Para obtener más información sobre los tipos de técnicas que utiliza el Análisis Híbrido, puede aprender a realizar su propio Análisis de Malware híbrido (estático y dinámico) en la ruta de aprendizaje de Análisis de Malware.


## Práctica

1. Encuentre o cree un archivo de texto sin formato en su sistema y luego calcule su hash sha256. Después de haber hecho eso, cambie el archivo editándolo en un editor de texto sin formato agregándole un solo carácter. Calcule su hash sha256 nuevamente.
2. Descarge un ejecutable desconocido de Windows desde un sitio como download.cnet.com. Envíelo a VirusTotal o analícelo con Hybrid Analysis. Tenga en cuenta que los instaladores pueden marcarse incorrectamente como maliciosos debido a la naturaleza de su funcionamiento. Piense por qué podría estar sucediendo esto y, si es posible, discútalo con un compañero/a o mentor/a.
3. Encuentre el hash de una pieza de malware bien conocido (puede hacerlo navegando en un sitio que contenga *hashes* de malware, ¡no es necesario que descargue la muestra, genere el *hash* usted!) y súbalo a VirusTotal. Explique lo que ha visto y lo que sucedió.

## Verificación de habilidades

Independientemente (o con un mentor)

1. Explore muestras de malware enviadas recientemente en Malware Bazaar. Copie los *hashes* de 3 a 5 muestras que haya detectado y péguelos en la búsqueda de VirusTotal. ¿Cuáles son los resultados? Cada uno de esos *hashes* debe ser detectado como malicioso por al menos un par de motores de detección de malware de VirusTotal. Si ninguno de los *hashes* es detectado como malicioso o reconocido por VirusTotal, entonces es probable que haya cometido un error en algún lugar y vale la pena que se tome un momento para reperit los pasos.

Con un compañero/a o mentor/a

1. Pídale a un compañero/a o mentor/a que seleccione alrededor de 10 archivos aleatorios, que podrían ser, por ejemplo, imágenes. Luego tomen el hash sha256 de 3 archivos seleccionados al azar y les enviarán tanto los archivos como los hashes. Identifique cuáles de esos 10 archivos coinciden con los hashes y solicite a su compañero/a o mentor/a que revise su trabajo.

## Recursos de Aprendizaje

{{% resource title="Verificar la suma de comprobación SHA256" description="Una guía rápida sobre cómo usar la línea de comando para verificar las sumas de comprobación sha256 para archivos." languages="Inglés" cost="Gratis" url="https://techdocs.akamai.com/download-ctr/docs/verify-checksum" %}}
{{% resource title="VirusTotal" description="Un servicio web donde los usuarios pueden enviar archivos o hashes para compararlos con malware conocido, utilizando una amplia variedad de motores de detección de malware. Propiedad de Alphabet/Google." languages="Inglés" cost="Gratis" url="https://www.virustotal.com/gui/home/upload" %}}
{{% resource title="Hybrid Analysis" description="Un servicio algo similar a VirusTotal, pero que también puede realizar análisis dinámicos." languages="Inglés" cost="Gratis, con funciones premium" url="https://www.hybrid-analysis.com/" %}}
{{% resource title="Any.run" description="Servicio de *sandbox* para analizar malware." languages="Gratuito para uso no comercial" cost="Inglés" url="https://any.run/" %}}
{{% resource title="Joe Sandbox" description="Servicio comercial de *sandbox* para analizar malware." languages="Inglés" cost="Gratuito para cuentas públicas (los resultados se publican en la página web)" url="https://www.joesandbox.com/#windows" %}}
{{% resource title="Cuckoo Sandbox, recurso 1" description="Un servicio *sandbox* gestionado por el Estonian CERT (Equipo de Respuesta a Emergencias Informáticas)" languages="Inglés" cost="Gratis" url="https://cuckoo.cert.ee/" %}}
{{% resource title="Cuckoo Sandbox, recurso 2" description="Un servicio *sandbox* gestionado por el Estonian CERT (Equipo de Respuesta a Emergencias Informáticas)" languages="Inglés" cost="Gratis" url="https://cuckoo-hatch.cert.ee/" %}}
{{% resource title="Windows Sandbox" description="Una potente herramienta *sandbox* integrada en Windows" languages="Varios idiomas" cost="Requiere Windows Pro, Education o Enterprise" url="https://learn.microsoft.com/en-us/windows/security/application-security/application-isolation/windows-sandbox/windows-sandbox-overview" %}}
