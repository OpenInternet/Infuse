+++
style = "module"
weight = 8
title = "Detección y determinación basadas en muestras"
+++

## Caso de Uso

Tienes una muestra de un archivo y necesita determinar si es malicioso. Esto puede haber sido enviado al objetivo por correo electrónico, redes sociales o mensajería instantánea, o transferido a través de medios extraíbles o de otro modo. El archivo en sí puede ser binario, un archivo comprimido, una página web capturada u otros formatos de archivo. El objetivo principal es determinar si el archivo es malicioso. Además, es posible que puedas determinar información adicional útil para caracterizar el archivo, sin embargo, para obtener más orientación, revisa el [Análisis de Malware en la Ruta de Aprendizaje](/es/learning-path/3/).

## Objetivos

Después de completar este subtema, el profesional debe ser capaz de realizar lo siguiente:

- Investigar archivos sospechosos utilizando plataformas de malware.
- Utiliza entornos Sandbox para ayudar a determinar si una muestra es maliciosa y qué hace.

---
## Sección Principal

Si necesita una evaluación más profunda de algunos archivos específicos, existen servicios en línea que escanearán un archivo específico o un conjunto de archivos en busca de malware. Si tienes un archivo que sospechas que es malicioso, puedes cargarlo en el servicio de escaneo. Ten en cuenta que estos servicios no mantienen confidencial el contenido de los archivos que envías. No debes enviar archivos que contengan información confidencial. Estos archivos pueden provenir de archivos adjuntos de correo electrónico o ser archivos descargados recientemente en el dispositivo de la víctima. Ten en cuenta que, en muchos casos, la descarga inicial puede ser un dropper (ejecutable que instala el malware real, a menudo más fácil de personalizar que el malware "real") y es posible que el software antimalware no lo reconozca. Si es posible, analiza las fechas de creación/modificación/descarga de archivos para identificar los archivos que podrían haber sido descargados por el dropper inicial.

Si prefieres no compartir un archivo completo con un servicio en línea, pero aun así deseas verificar si alguna vez se ha enviado, simplemente puedes cargar un hash del archivo. Un hash es como una huella digital corta de un archivo: se puede utilizar para identificar un archivo único sin revelar su contenido. Para obtener más información sobre _hashes_, consulta la sección "_Hashes_" en el Capítulo 7 de la [Guía de Campo para Respuesta a Incidentes para la Sociedad Civil y Medios](https://internews.org/resource/field-guide-to-incident-response-for-civil-society-and-media/). La actividad de la guía supone que el usuario está aprendiendo en un sistema operativo Linux, por lo que deberás buscar la utilidad de línea de comandos que utilizarás para obtener una suma SHA en la plataforma elegida, por ejemplo, usando shasum o openssl en MacOS o usando Get-FileHash o certutil en PowerShell.

Un servicio popular de inteligencia de malware es [VirusTotal](https://www.virustotal.com/) de Google. VirusTotal escaneará un archivo con varios escáneres antimalware e informará los resultados. También puede buscar _hashes_ de archivos o URL. VirusTotal es de uso gratuito, sujeto a restricciones de volumen. Para obtener una descripción detallada y actividad, completa la sección **"Utilizando VirusTotal"** del Capítulo 7 del documento de Internews’ [Guía de Campo para Respuesta a Incidentes para la Sociedad Civil y Medios](https://internews.org/resource/field-guide-to-incident-response-for-civil-society-and-media/).

Después de leer el capítulo anterior, deberías poder:

- Comprender lo que significa enviar una muestra a VirusTotal (compartir tu muestra con clientes de pago de VirusTotal) y poder decidir si es apropiado hacerlo.
- Enviar un archivo o verificar un registro mediante _hash_ y leer las pestañas Detecciones, Detalles, Relaciones, Comportamiento y Comunidad en VirusTotal.

### Sandboxes

Los entornos Sandbox proporcionan un entorno virtual que simula una computadora común que captura registros detallados de las actividades que ocurren en la memoria y en el disco. Generalmente, esto permite una forma segura y automatizada de iniciar el análisis de malware y comprender las acciones e intenciones de un archivo.

Varios servicios de sandbox comerciales de acceso gratuito incluyen [Hybrid Analysis](https://www.hybrid-analysis.com/), [Any.Run](https://any.run/), [Joe Sandbox](https://www.joesandbox.com/), y [Triage](https://tria.ge/). Estos servicios ejecutan archivos que les envías y realizan análisis dinámico. Esto tiene grandes ventajas al poder detectar heurísticamente nuevo malware y también al poder evaluar varias etapas del malware. Ten en cuenta que las muestras enviadas serán recopiladas y estarán disponibles para clientes de pago y analistas.

Cuckoo Sandbox es una herramienta de análisis de malware en un sandbox de código abierto y gratuita que puedes autohospedar. CERT-EE en Estonia ofrece una versión gratuita alojada en línea: [Cuckoo V2](https://cuckoo.cert.ee/), [Cuckoo V3](https://cuckoo-hatch.cert.ee/).

Para obtener más información sobre el uso de Sandboxes para la detección de muestras, completa la sección "Sandboxes" en el Capítulo 10 de Internews’ [Guía de Campo para Respuesta a Incidentes para la Sociedad Civil y Medios](https://internews.org/resource/field-guide-to-incident-response-for-civil-society-and-media/), que utiliza el Triage sandbox como ejemplo.

Después de completar la actividad, deberías poder:

- Enviar un archivo a sandbox.
- Seleccionar o configurar un entorno operativo apropiado para sandbox.
- Decidir si las redes deben deshabilitarse o emularse.
- Lee la visión general de los resultados, incluidas las detecciones automáticas.
- Tener una comprensión general de las otras categorías de información que se presentan en el análisis del sandbox. Con el propósito de detección, no es necesaria una comprensión detallada, pero para el Análisis de Malware o la caza de amenazas deberás comprenderlos más a fondo.

Puedes encontrar un análisis más detallado sobre las Sandboxes en la ruta de aprendizaje de Análisis de Malware de Infuse.

Ten en cuenta que el malware avanzado puede iniciar verificaciones para descubrir si se encuentra en un entorno virtualizado / sandbox, por lo que puede comportarse de manera diferente según el entorno, por lo que ningún entorno sandbox será 100% confiable.

Para obtener más información sobre los tipos de técnicas que utiliza el Análisis Híbrido, puede aprender a realizar tu propio Análisis de Malware híbrido (estático y dinámico) en la ruta de aprendizaje de Análisis de Malware.

## Práctica

1. Encuentra o crea un archivo de texto sin formato en tu sistema y luego calcula su hash sha256. Después de haber hecho eso, cambia el archivo editándolo en un editor de texto sin formato y agregándole un solo carácter. Calcula su hash sha256 nuevamente.
2. Descarga un ejecutable desconocido de Windows desde un sitio como download.cnet.com. Envíalo a VirusTotal o analízalo con Hybrid Analysis. Ten en cuenta que los instaladores pueden marcarse incorrectamente como maliciosos debido a la naturaleza de su funcionamiento. Piensa por qué podría estar sucediendo esto y, si es posible, discútelo con un compañero o mentor.
3. Encuentra el hash de una pieza de malware bien conocido (puedes hacerlo navegando en un sitio que contenga hashes de malware, ¡no es necesario que descargues la muestra y genera el hash tú misma!) y súbelo a VirusTotal. Explica lo que ves y lo que sucedió.

## Verificación de habilidades

Independientemente (o con un mentor)

1. Explora muestras de malware enviadas recientemente en Malware Bazaar. Copia los _hashes_ de 3 a 5 muestras que hayas detectado y pégalos en la búsqueda de VirusTotal. ¿Cuáles son los resultados? Cada uno de esos _hashes_ debe ser detectado como malicioso por al menos un par de motores de detección de malware de VirusTotal. Si ninguno de los _hashes_ es detectado como malicioso o reconocido por VirusTotal, entonces es probable que hayas cometido algún error en algún lugar y vale la pena tomarse un momento para volver a seguir tus pasos.

Con un Compañero o un Mentor

1. Pídele a un compañero o mentor que seleccione alrededor de 10 archivos aleatorios, que podrían ser, por ejemplo, imágenes. Luego tomarán el _hash_ sha256 de 3 archivos seleccionados al azar y te enviarán tanto los archivos como los hashes. Identifica cuáles de esos 10 archivos coinciden con los _hashes_ y solicita a tu compañero o mentor que revise tu trabajo.

## Recursos Educativos

{{% resource title="Verificar la suma de comprobación SHA256" description="Una guía rápida sobre cómo usar la línea de comando para verificar las sumas de comprobación sha256 para archivos" languages="Inglés" cost="Gratis" url="https://techdocs.akamai.com/download-ctr/docs/verify-checksum" %}}
{{% resource title="VirusTotal" description="Un servicio web donde los usuarios pueden enviar archivos o hashes de estos para compararlos con malware conocido utilizando una amplia variedad de motores de detección de malware. Propiedad de Alphabet/Google" languages="Inglés" cost="Gratis, con limitación de peticiones" url="https://www.virustotal.com/gui/home/upload" %}}
{{% resource title="Hybrid Analysis" description="Un servicio algo similar a VirusTotal, pero que también puede realizar análisis dinámicos (ejecutando el archivo y observando lo que sucede)" languages="Inglés" cost="Gratis, con funciones premium" url="https://www.hybrid-analysis.com/" %}}
{{% resource title="Any.run" description="Sandbox comercial" languages="Gratis sólo para uso no comercial" cost="Inglés" url="https://any.run/" %}}
{{% resource title="Joe Sandbox" description="Sandbox comercial" languages="Gratis para cuentas públicas (los resultados del análisis se publicarán en el sitio web)" cost="Inglés" url="https://www.joesandbox.com/#windows" %}}
{{% resource title="Cuckoo Sandbox, recurso 1" description="Un servicio sandbox gestionado por el Estonian CERT (Equipo de Respuesta a Emergencias Informáticas)" languages="Gratis" cost="Inglés" url="https://cuckoo.cert.ee/" %}}
{{% resource title="Cuckoo Sandbox, recurso 2" description="Un servicio sandbox gestionado por el Estonian CERT (Equipo de Respuesta a Emergencias Informáticas)" languages="Gratis" cost="Inglés" url="https://cuckoo-hatch.cert.ee/" %}}
{{% resource title="Windows Sandbox" description="Una potente herramienta sandbox integrada en Windows" languages="Requiere Windows Pro, Education o Enterprise" cost="Varios idiomas" url="https://learn.microsoft.com/en-us/windows/security/application-security/application-isolation/windows-sandbox/windows-sandbox-overview" %}}
