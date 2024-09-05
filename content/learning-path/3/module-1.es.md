+++
style = "module"
weight = 1
title = "Configuración de un entorno de análisis de malware"
description = "Antes de comenzar a analizar cualquier malware, debe configurar un entorno seguro para hacerlo. Definitivamente, el malware daña los sistemas en los que se ejecuta"
+++

## Caso práctico

Antes de comenzar a analizar cualquier malware, debe configurar un entorno seguro para hacerlo. Definitivamente, el malware daña los sistemas en los que se ejecuta. No desees ejecutarlo en tu sistema principal. Además, probablemente querrás evitar que el malware realmente establezca conexiones con los servidores de C&C (comando y control) del autor de amenazas. Ambos significan que debes configurar una máquina virtual para utilizarla al realizar análisis de malware.

## Objetivos

Después de completar este subtema, el profesional debe poder configurar una máquina virtual (VM) y tomar instantáneas (snapshots) en ella.

---
## Sección Principal

La configuración exacta que necesitas depende de tu método de análisis y del sistema operativo del malware que estés analizando. En la mayoría de los casos, puedes comenzar con una máquina virtual Linux preconfigurada como [REMnux](https://remnux.org/). Consulta el [Capítulo 6 de la Guía de Campo para Respuesta a Incidente para la Sociedad Civil y Medios](https://internews.org/wp-content/uploads/2023/11/Field-Guide-to-Threat-Labs.pdf) para obtener instrucciones paso a paso sobre cómo realizar la configuración. Para cosas específicas (por ejemplo, análisis dinámico de malware de iOS) necesitarás herramientas adicionales (por ejemplo, un iPhone o iPad con jailbreak). Las máquinas virtuales ocasionalmente tienen vulnerabilidades que permiten que el software que se ejecuta en la máquina virtual ataque el sistema operativo host. La mayoría del malware ni siquiera se acerca a este nivel de sofisticación, pero en caso de duda, lo más seguro es analizar el malware en un dispositivo físico separado que se borre posteriormente.

Para configurar REMnux, recomendamos que sigas los pasos descritos en el [Capítulo 6 de la Guía de Campo para Respuesta a Incidentes para la Sociedad Civil y Medios](https://internews.org/wp-content/uploads/2023/11/Field-Guide-to-Threat-Labs.pdf) y [descargues la VM (Máquina Virtual)](https://docs.remnux.org/install-distro/get-virtual-appliance)<sup><sup>[\[1\]](#footnote-1)</sup></sup>. Esta es una manera fácil de comenzar que proporciona un excelente aislamiento entre su sistema host y el entorno REMnux. Tenga cuidado de no compartir datos confidenciales de su sistema operativo host en la máquina virtual. De acuerdo con las instrucciones vinculadas anteriormente, tome una instantánea (snapshot) de su máquina virtual una vez que se haya configurado y antes de comenzar a trabajar en cualquier malware. Puedes utilizar snapshots para volver a tu máquina virtual válida conocida antes de analizar diferentes piezas de malware y aislar diferentes clientes entre sí. Para obtener más información sobre snapshots de VM en general, revisa [este artículo](https://www.nakivo.com/blog/vm-snapshot-vs-backup/).

Mientras realiza el análisis de malware, es posible que desee herramientas adicionales en su máquina virtual de análisis. Adelante, instálelos y configúrelos, pero tenga en cuenta lo que hizo. Después de que hayas terminado tu análisis, puedes subir tu snapshot "limpio" de la VM , instalar y configurar la herramienta, y luego crear un nuevo snapshot "limpio" para tu próxima aventura de análisis de malware.

Para mover archivos de malware, la práctica estándar es colocarlos en archivos ZIP cifrados. En este caso, la calidad del cifrado no importa. El objetivo no es tanto mantener en secreto el malware, sino más bien evitar liberarlo involuntariamente en otros sistemas y prevenir que los sistemas antimalware lo detecten o lo eliminen. No dudes en incluir la contraseña en el nombre del archivo ZIP.

## Práctica

1. Descargue (si aún no lo ha hecho) el software de la máquina virtual (recomendamos VirtualBox) e instale REMnux.
2. Actualice REMnux y tome una instantánea de VM.
3. Configure una única carpeta compartida entre su host y la máquina virtual REMnux.
4. Descargue un software de Windows aleatorio (presumiblemente no malicioso) de algo como download.cnet.com y transfiéralo a la máquina virtual REMnux utilizando un archivo ZIP cifrado. (Si ha completado recientemente la ruta de aprendizaje Detección de Malware, puede reutilizar la misma descarga).
5. Coge un poco de malware de MalwareBazaar (¡**ADVERTENCIA: este es un malware activo! No lo ejecute.**) y transfiéralo a la máquina virtual REMnux. (Si ha completado recientemente la ruta de aprendizaje Detección de Malware, puede reutilizar la misma descarga).

## Verificación de habilidades

Vaya a la carpeta que utiliza su máquina virtual para compartir archivos entre los sistemas operativos host e invitado. Agregue un archivo allí y luego [calcule un hash criptográfico](https://www.sentinelone.com/cybersecurity-101/hashing/) de este archivo en ambos sistemas operativos. Asegúrate de que los hashes coincidan.

## Learning Resources

{{% resource title="Guía de campo para la respuesta a incidentes para la sociedad civil y los medios de comunicación" description="Una guía sobre cómo analizar contenido potencialmente malicioso, configurar máquinas virtuales y más" languages="Inglés" cost="Gratis" url="https://internews.org/wp-content/uploads/2023/11/Field-Guide-to-Threat-Labs.pdf" %}}

{{% resource title="REMnux" description="La página web de la distribución REMnux Linux, que a menudo se utiliza para el análisis de malware" languages="El sitio web y la documentación de la distribución están en inglés; varias herramientas con la distribución en sí pueden estar localizadas en otros idiomas." cost="Gratis" url="https://remnux.org/" %}}

{{% resource title="Obtenga el dispositivo virtual" description="Una guía sobre cómo instalar y ejecutar REMnux como máquina virtual" languages="Inglés" cost="Gratis" url="https://docs.remnux.org/install-distro/get-virtual-appliance" %}}

{{% resource title="La diferencia entre instantáneas y copias de seguridad (backups)" description="Un artículo que destaca cómo una máquina virtual puede contener tanto instantáneas como copias de seguridad, y la diferencia entre ellas. Comprender ambos hará que sea mucho más fácil administrar y restablecer las máquinas virtuales utilizadas para el análisis de malware." languages="Inglés" cost="Gratis" url="https://www.nakivo.com/blog/vm-snapshot-vs-backup/" %}}

## Notes

[^1]: REMnux no está disponible en procesadores ARM como las computadoras Apple Silicon. Si bien es posible virtualizar en distintas arquitecturas de CPU mediante emuladores como QEMU o UTM (VirtualBox actualmente no es compatible con arquitecturas ARM), el rendimiento será lento y no se recomienda. Tendría más sentido seleccionar otra distribución de Linux que sea compatible con su hardware e [instalar los paquetes de software necesarios](https://www.digitalocean.com/community/tutorials/package-management-basics-apt-yum-dnf-pkg) para completar las actividades, si aún no vienen con el sistema operativo. Kali Linux es una distribución de Linux popular que incluirá o admitirá muchas herramientas que también se encuentran en REMnux. Si tienes un dispositivo Apple Silicon, puedes usar UTM ([https://mac.getutm.app/)](https://mac.getutm.app/)) para ejecutar la imagen [Kali Installer](https://www.kali.org/get-kali/#kali-installer-images) de Apple Silicon (ARM64). Las guías paso a paso están disponibles tanto en [UTM](https://docs.getutm.app/guides/kali/) como en [Kali](https://www.kali.org/docs/virtualization/install-utm-guest-vm/). Al momento de escribir este artículo, un error que afecta el proceso de instalación requiere un paso adicional durante la instalación de adjuntar una pantalla de terminal serial virtual; ambos tutoriales describen este proceso. También puedes obtener una [versión ARM de Kali para Raspberry Pi](https://www.kali.org/get-kali/#kali-arm), que es compatible con la mayoría de los modelos de Raspberry Pi.
