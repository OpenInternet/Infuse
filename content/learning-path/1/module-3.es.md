---
style: module
title: "Seguridad Operacional - Manejo Seguro de enlaces e infraestructura"
description: "A medida que vaya investigando correos electrónicos, archivos adjuntos, sitios web y otras infraestructuras de phishing malintencionado, tendrá que tomar algunas medidas proactivas para asegurarse de que tanto usted como las personas a las que ayuda están a salvo. También tendrá que saber qué aconsejar al destinatario de los mensajes cuando se enfrente a este tipo de incidentes, y cómo puede informarle con seguridad para que se ocupe de ello sin comprometerse."
weight: 3
---

## Estudios de caso

A medida que vaya investigando correos electrónicos, archivos adjuntos, sitios web y otras infraestructuras de phishing malintencionado, tendrá que tomar algunas medidas proactivas para asegurarse de que tanto usted como las personas a las que ayuda están a salvo. También tendrá que saber qué aconsejar al destinatario de los mensajes cuando se enfrente a este tipo de incidentes, y cómo puede informarle con seguridad para que se ocupe de ello sin comprometerse.

Asegúrese de estudiar esta habilidad y, si es necesario, configure un entorno seguro antes de interactuar con correos electrónicos o páginas web sospechosos de ser maliciosos.

## Objetivos

Después de completar esta subtarea, el profesional debe ser capaz de hacer lo siguiente:

- Demostrar cómo manejar de forma segura correos electrónicos y URL maliciosos durante la investigación de la infraestructura maliciosa;
- Describir qué medidas deben tomar para evitar que se filtre su dirección IP mientras realizan una investigación;
- Describa los próximos pasos inmediatos cuando sospeche que una cuenta podría haberse visto comprometida;
- URL de 'defang' seguras.

---
## Sección Principal

Muchos correos electrónicos de phishing y mensajes similares no solo intentan que la persona objetivo haga clic en un enlace, sino que también pueden intentar recopilar datos sobre ellos (discutimos esto con más profundidad en el subtema 6). Al realizar una investigación, es importante manejar los mensajes y otra infraestructura con cuidado, para no revelar demasiada información sobre su identidad, trabajo y organización a un atacante, así como para proteger los dispositivos y las cuentas.

### Precauciones básicas

Normalmente dividimos el análisis en dos componentes: pasivo (subtemas 4 y 5) y activo (subtemas 6 y 7). El análisis pasivo no debe incluir ningún contacto con los servidores de un atacante, mientras que el análisis activo sí.  

Es importante que los analistas comprendan qué tipos de actividades interactúan directamente con la infraestructura del atacante y, por lo tanto, pueden detectarse. Una vez que los analistas obtengan esta comprensión, podrán adaptar los métodos que utilizan a los modelos de amenazas relevantes.

Recomendamos tener en cuenta las siguientes precauciones de seguridad operacional al realizar sus análisis:

### Entorno Seguro

Dependiendo de la sofisticación de los ataques a los que se enfrente, de la sensibilidad de la máquina, los datos y las cuentas que esté utilizando, e incluso de la sensibilidad de sus actividades de investigación y de su identidad personal, puede que necesite adoptar un entorno seguro apropiado para llevar a cabo el trabajo de investigación. Tenga en cuenta las siguientes sugerencias al crear su solución de seguridad:

- Use una VPN de buena reputación mientras realiza cualquier actividad que pueda implicar interactuar con la infraestructura del atacante para evitar que el atacante registre su IP real.
- Seleccione y utilice un navegador específico en su dispositivo para este trabajo, que usted configurará previamente para reducir el riesgo de que se ejecute contenido activo malicioso en su dispositivo. [NoScript](https://noscript.net/) es una excelente extensión de navegador disponible en navegadores basados en Firefox y Chromium que evitará la ejecución de scripts, lo que le permitirá inspeccionar cualquier contenido activo antes de la ejecución.
- Considere la posibilidad de utilizar un dispositivo separado para su análisis o una máquina virtual separada. Este dispositivo y máquina virtual no deben conectarse a ninguna cuenta laboral o personal, almacenamiento conectado a la red o redes confidenciales. No debe contener ninguna información confidencial (a menos que descubra dicha información durante su investigación).
- Configure una dirección de correo electrónico especial donde las personas objetivo puedan reenviar los correos electrónicos sospechosos que reciban. (Si reciben mensajes sospechosos de una plataforma como WhatsApp, pueden enviar una captura de pantalla del mensaje por correo electrónico). Esta dirección de correo electrónico no necesita ser única para cada persona objetivo. Asegúrese de que esta cuenta esté protegida por una contraseña única y una autenticación de dos factores y evite que su cliente de correo electrónico cargue automáticamente contenido externo, como imágenes. Esto se debe a que las imágenes que se cargan desde un servidor pueden alertar al atacante de que están siendo investigadas y convertir una investigación de pasiva a activa (consulte el subtema 6 para obtener más detalles);
- Asegúrese de tener un equipo protegido con una protección antimalware actualizada para proteger su equipo contra cualquier posible propagación de una infección de malware a su equipo.

### Defanging URLs

Al documentar URLs potencialmente maliciosas, es una práctica común 'defang' (desarmar) la URL para que las aplicaciones que utiliza para notas o documentación no generen automáticamente enlaces clicables que involuntariamente le lleven a usted (o a cualquier persona con la que esté colaborando) a hacer clic en el enlace o instigar de otro modo el tráfico a la URL desde su máquina de trabajo. Algunas aplicaciones, por ejemplo messengers, también previsualizan automáticamente los enlaces (y obtienen el contenido de un servidor para hacerlo). La modificación de las URL les impide hacerlo.

Esto se hace comúnmente reemplazando la sección de protocolo de la URL con un equivalente no válido y cubriendo los puntos en la URL con \[corchetes\]. Por ejemplo:

| Desde URL en directo                                               | A URL desarmada                   |
|--------------------------------------------------------------------|-----------------------------------|
| [https://www.sitio-malicioso.com](https://www.malicious-site.com)  | hxxps://www[.]sito-malicioso[.]com |
| ftp://192.168.12.20                                                | fxp://192[.]168[.]12[.]20          |

Esto puede hacerse manualmente utilizando un editor sólo de texto como NotePad, Textedit o Gedit. También vea utilidades como <https://defang.me/> o busque herramientas Defang en [CyberChef](https://gchq.github.io/CyberChef).

### Comunicación con las personas objetivo y medidas inmediatas durante un incidente

Si sospecha que un atacante podría haber obtenido acceso al correo electrónico o la cuenta de mensajería de la persona objetivo o está monitoreando su máquina (el primero podría haber sido el resultado de un ataque de phishing exitoso, mientras que el segundo podría ser causado por malware, por ejemplo, al ejecutar un archivo adjunto malicioso), pídale a la persona objetivo que no use esa máquina y cuenta hasta que pueda averiguar qué está pasando. Si es posible, comuníquese con la persona objetivo a través de otra cuenta y otro dispositivo, por ejemplo, Signal o WhatsApp en su dispositivo personal.

Si sospecha que las cuentas de una persona objetivo podrían haberse visto comprometidas, pídale que cambie inmediatamente sus contraseñas y obligue a la cuenta a cerrar sesión en todas las demás ubicaciones (la mayoría de los servicios principales tienen una configuración como esta). Esto debería evitar que el atacante tenga más acceso a la cuenta. Sin embargo, les alertará de que la persona objetivo se ha dado cuenta de que algo está mal. Es posible que el atacante ya haya descargado una cantidad significativa de datos de la cuenta.

Si sospecha que el dispositivo de una persona objetivo se ha visto comprometido, pídale que cambie las contraseñas de su cuenta en un dispositivo diferente y evite usar ese dispositivo hasta que se complete una investigación. Siga los pasos descritos en ruta de aprendizaje [Detección de Malware](https://infuse.quest/es/learning-path/2/)

## Practique

- Con su VPN activada (si es seguro hacerlo), vaya a un sitio web que muestre su dirección IP (esos sitios web son fáciles de encontrar, solo busque “cuál es mi IP” en su motor de búsqueda favorito). Piense en lo que sucedería si un atacante se enterara de su dirección IP: ¿su dirección IP pertenece a una empresa o a una oficina?  
    Después de esto, active una VPN de buena reputación y compruebe una vez más cuál es su dirección IP.  
    Finalmente, [lea sobre las fugas de DNS](https://mullvad.net/en/help/all-about-dns-servers-and-privacy) y pruebe si su VPN está filtrando información de DNS (la mayoría de las VPN tienen su propio sitio web que prueba las fugas de DNS, ¡puede usar su motor de búsqueda favorito para encontrarlo!).
- Desarme (defang) la dirección URL de <https://www.wikipedia.org/>. Pegue la URL modificada en la barra de direcciones de su navegador y pulse Intro. Si se niega a cargar la página web, significa que ha modificado correctamente la URL (el navegador puede intentar buscar la URL modificada en un motor de búsqueda, lo cual es completamente normal).

## Comprobación de Habilidades

- Trabaje con un compañero o mentor que le enviará un token de error web generado [aquí](https://canarytokens.org/generate). Abra este error web en su máquina de análisis. Una vez que lo haya hecho, su compañero o mentor recibirá información sobre la dirección de correo electrónico con la que registró el error web, incluida su dirección IP y una breve descripción de su navegador web llamado agente de usuario. Discuta esos resultados con su compañero o mentor: si estuviera realizando un análisis activo, es probable que el atacante también vea esos detalles, ya que estaría utilizando esa máquina para conectarse a los servidores que controla.

## Recursos de Aprendizaje

{{% resource title="NoScript" description="Una extensión para navegadores Firefox y Chromium que permite bloquear o habilitar de forma selectiva la ejecución de JavaScript.  Cuando se examinan sitios web potencialmente maliciosos, le permite cargar el sitio y al mismo tiempo, deshabilitar gran parte de su funcionalidad potencialmente dañina." languages="Inglés" cost="Gratis" url="https://noscript.net/" %}}
{{% resource title="Defang.me" description="Una herramienta que automáticamente desconecta URL y direcciones IP" languages="Inglés" cost="Gratis" url="https://defang.me/" %}}
{{% resource title="CyberChef" description="Una herramienta completa para convertir entre diferentes formatos, también capaz de desconectar automáticamente URL y direcciones IP" languages="Inglés" cost="Gratis" url="https://gchq.github.io/CyberChef/" %}}
