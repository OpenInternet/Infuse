---
style: module
title: Seguridad Operacional - Manejo Seguro de enlaces e infraestructura
description: A medida que vaya investigando correos electrónicos, archivos
  adjuntos, sitios web y otras infraestructuras de phishing malintencionado,
  tendrá que tomar algunas medidas proactivas para asegurarse de que tanto usted
  como las personas a las que ayuda están a salvo. También tendrá que saber qué
  aconsejar al destinatario de los mensajes cuando se enfrente a este tipo de
  incidentes, y cómo puede informarle con seguridad para que se ocupe de ello
  sin comprometerse.
weight: 3
---

## Estudios de caso

A medida que vaya investigando correos electrónicos, archivos adjuntos, sitios web y otras infraestructuras de phishing malintencionado, tendrá que tomar algunas medidas proactivas para asegurarse de que tanto usted como las personas a las que ayuda, estén a salvo. También tendrá que saber qué aconsejar al destinatario de los mensajes cuando se enfrente a este tipo de incidentes, y cómo puede reportarle a usted sobre estos sin afectar su seguridad digital. 

Asegúrese de estudiar y desarrollar bien esta habilidad y, si es necesario, configure un entorno seguro antes de interactuar con correos electrónicos o páginas web sospechosos de ser maliciosos.

## Objetivos

Después de completar este módulo, el profesional debe ser capaz de:

- Demostrar cómo manejar de forma segura correos electrónicos y URL maliciosos durante la investigación de la infraestructura en cuestión;
- Describir a la persona a la que asiste qué medidas deberá tomar para evitar que su dirección IP se filtre mientras realiza una investigación;
- Describa los próximos pasos a dar cuando sospeche que una cuenta podría haberse sido vulnerada;
- Modifique o “desarme” las URL de manera segura y estandarizada para evitar accesos maliciosos accidentales a las mismas. Esto es lo que se conoce como “defang” en el término en inglés.

---
## Sección Principal

Muchos correos electrónicos de phishing y mensajes similares no solo intentan que las persona objeto de un ataque hagan clic en un enlace, sino que también buscan recopilar datos sobre ellas (discutimos esto con más profundidad en el módulo  6). Al realizar una investigación, es importante manejar con cuidado los mensajes y otras infraestructuras, para no revelar demasiada información sobre su identidad, trabajo y organización, así como para proteger los dispositivos y las cuentas.

### Precauciones básicas

Normalmente dividimos el análisis en dos componentes: pasivo (módulos 4 y 5) y activo (módulos 6 y 7). El análisis pasivo no debe incluir ningún contacto con los servidores de un atacante, mientras que el análisis activo sí.

Es importante que los analistas comprendan qué tipos de actividades interactúan directamente con la infraestructura del atacante y, por lo tanto, puedan detectarse. Una vez que los analistas tengan esto claro, podrán adaptar los métodos que utilizan a los modelos de amenazas relevantes.

Al realizar sus análisis, recomendamos tener en cuenta las siguientes precauciones de seguridad operacional:


### Entorno Seguro

Dependiendo de la sofisticación de los ataques a los que se enfrente, de la sensibilidad de la máquina, los datos y las cuentas que esté utilizando, e incluso de la sensibilidad de sus actividades de investigación y de su identidad personal, puede que necesite adoptar un entorno seguro apropiado para llevar a cabo su. Tenga en cuenta las siguientes sugerencias al crear su solución de seguridad:

- Use una VPN de buena reputación mientras realiza cualquier actividad que implique interactuar con la infraestructura del atacante para evitar que el este registre su IP real.
- Para este trabajo, seleccione y use un navegador específico en su dispositivo (que usted mismo configurará previamente) para reducir el riesgo de que contenido activo malicioso pueda ejecutarse en el mismo. NoScript es una excelente extensión de navegador disponible en navegadores basados en Firefox y Chromium que evita la ejecución de scripts. Con esta extensión podrá inspeccionar cualquier contenido activo antes de su ejecución.
- Considere la posibilidad de utilizar un dispositivo o una máquina virtual separada para su análisis. Este dispositivo o la máquina virtual no deben conectarse a ninguna cuenta profesional o personal, almacenamiento conectado a la red o redes confidenciales. No debe contener ninguna información confidencial (a menos que usted descubra dicha información durante el transcurso de su investigación).
- Configure una dirección de correo electrónico especial donde las personas que son blanco de posibles ataques puedan reenviar los correos electrónicos sospechosos que reciban. (Si reciben mensajes sospechosos de una plataforma como WhatsApp, pueden enviar una captura de pantalla del mensaje por correo electrónico). Esta dirección de correo electrónico no necesita ser única para cada persona objetivo. Asegúrese de que esta cuenta esté protegida por una contraseña única y la verificación en dos pasos. Además, evite que su cliente cargue automáticamente en el correo electrónico contenido externo, tales como imágenes. Esto se debe a que las imágenes que se cargan desde un servidor pueden alertar al atacante de que se le está investigando. Esto convertiría una investigación pasiva en una activa (consulte el módulo 6 para obtener más detalles);
- Asegúrese de tener su equipo protegido con un sistema de protección antimalware actualizado para protegerlo contra cualquier posible propagación de una infección de malware.

### Defanging URLs

Al documentar URLs potencialmente maliciosas, es una práctica común desarmar (´defang´) la URL. Esto evita que los sistemas de notas o documentación generen automáticamente enlaces en los que se pueda clicar que involuntariamente le lleven a usted o sus colaboradores a hacer clic en el enlace y se inicie el tráfico a la URL desde su dispositivo de trabajo. Algunas aplicaciones, como los messengers, previsualizan automáticamente los enlaces. Para hacerlo obtienen el contenido de un servidor. La modificación de las URLs les impide llevar a cabo esta acción.

Esto se hace comúnmente reemplazando la sección de protocolo de la URL con un equivalente no válido y cubriendo los puntos en la URL con [corchetes]. Por ejemplo:


| Desde URL en directo                                               | A URL desarmada                   |
|--------------------------------------------------------------------|-----------------------------------|
| https://www.sitio-malicioso.com                                    | hxxps://www[.]sito-malicioso[.]com |
| ftp://192.168.12.20                                                | fxp://192[.]168[.]12[.]20          |

Esto puede hacerse manualmente utilizando un editor sólo de texto como NotePad, Textedit o Gedit. También vea herramientas como <https://defang.me/> o busque Defang en [CyberChef](https://gchq.github.io/CyberChef).

### Comunicación con las personas objetivo y medidas inmediatas durante un incidente

Si sospecha que un atacante podría haber obtenido acceso al correo electrónico o la cuenta de mensajería de la persona a la que asiste o está monitoreando su dispositivo (el primero escenario podría haber sido el resultado de un ataque de phishing exitoso, mientras que el segundo podría ser causado por malware, por ejemplo, al ejecutar un archivo adjunto malicioso), pídale que no use ni la cuenta ni el equipo hasta que usted pueda averiguar qué está pasando. Si es posible, comuníquense a través de otra cuenta y otro dispositivo, por ejemplo, Signal o WhatsApp en su equipo personal.

Si sospecha que las cuentas de una persona objetivo podrían haber sido vulneradas, pídale que cambie inmediatamente sus contraseñas y obligue a la cuenta a cerrar sesión en todas las demás ubicaciones (la mayoría de los servicios principales tienen una configuración para esto). Esto debería ser suficiente para evitar que el atacante tenga más acceso a la cuenta. Sin embargo, dicha acción alertará al atacante de que la persona a la que intenta afectar se ha dado cuenta de que algo anda mal. Es posible que el atacante ya haya descargado una cantidad significativa de datos de la cuenta.

Si sospecha que el dispositivo de una persona objetivo ha sido vulnerado, pídale que cambie las contraseñas de su cuenta en un dispositivo diferente y evite usar ese dispositivo hasta que se complete la investigación. Siga los pasos descritos en la ruta de aprendizaje [Detección de Malware](https://infuse.quest/es/learning-path/2/).

## Practique

- Con su VPN desactivado (si es seguro hacerlo), vaya a un sitio web que muestre su dirección IP (esos sitios web son fáciles de encontrar, solo busque “cuál es mi IP” en su motor de búsqueda favorito). Piense en lo que sucedería si un atacante se enterara de su dirección IP: ¿su dirección IP pertenece a una empresa o a una oficina?  
    Después de esto, active una VPN de buena reputación y compruebe una vez más cuál es su dirección IP.  
    Finalmente, [lea sobre las fugas de DNS](https://mullvad.net/en/help/all-about-dns-servers-and-privacy) y pruebe si su VPN está filtrando información de DNS (la mayoría de las VPN tienen su propio sitio web que prueba las fugas de DNS, ¡puede usar su motor de búsqueda favorito para encontrarlo!).
- Desarme (defang) la dirección URL de <https://www.wikipedia.org/>. Pegue la URL modificada en la barra de direcciones de su navegador y pulse la tecla Intro. Si la página web no se carga, significa que ha modificado correctamente la URL (el navegador puede intentar buscar la URL modificada en un motor de búsqueda, lo cual es completamente normal).

## Comprobación de Habilidades

- Trabaje con un compañero/a o mentor/a que le enviará un token de rastreador web generado [aquí](https://canarytokens.org/generate). Abra este rastreador web en su máquina de análisis. Una vez que lo haya hecho, su compañero o mentor recibirá información sobre la dirección de correo electrónico con la que registró el rastreador, incluida su dirección IP y una breve descripción de su navegador web llamado agente de usuario. Discuta esos resultados con su compañero o mentor: si estuviera realizando un análisis activo, es probable que el atacante también vea esos detalles, ya que estaría utilizando esa máquina para conectarse a los servidores que controla.

## Recursos de Aprendizaje

{{% resource title="NoScript" description="Una extensión para navegadores Firefox y Chromium que permite bloquear o habilitar de forma selectiva la ejecución de JavaScript.  Cuando se examinan sitios web potencialmente maliciosos, le permite cargar el sitio y al mismo tiempo, deshabilitar gran parte de su funcionalidad potencialmente dañina." languages="Inglés" cost="Gratis" url="https://noscript.net/" %}}
{{% resource title="Defang.me" description="Una herramienta que automáticamente desconecta URL y direcciones IP" languages="Inglés" cost="Gratis" url="https://defang.me/" %}}
{{% resource title="CyberChef" description="Una herramienta completa para conversiones entre diferentes formatos, también capaz de desconectar automáticamente URL y direcciones IP" languages="Inglés" cost="Gratis" url="https://gchq.github.io/CyberChef/" %}}
