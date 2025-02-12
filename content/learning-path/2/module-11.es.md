+++
style = "module"
weight = 11
title = "Limpieza, cuidados posteriores, gestión de riesgos posteriores al incidente e intercambio de información"
description = "Si se encuentra malware o tráfico malicioso en el dispositivo de una persona objetivo, necesitamos proporcionar cuidado posterior correctivo o recomendaciones específicas."
+++

## Estudio de caso

Si se encuentra malware o tráfico malicioso en el dispositivo de una persona blanco de un posible ataque, necesitamos proporcionar cuidados posteriores o recomendaciones específicas para permitir que determine los próximos pasos apropiados a seguir.

## Objetivos

Después de completar este módulo, el profesional debe ser capaz de:

- Determinar el método adecuado de limpieza para el tipo de malware o indicador de compromiso encontrado.
- Realizar o guiar al cliente sobre los pasos de limpieza a seguir, incluyendo la eliminación de mecanismos de persistencia, herramientas de eliminación de malware, reinicios y restablecimientos de fábrica.
- Identificar situaciones en las que la limpieza no es posible y sean necesarios más consejos o acciones.
- Documentar y compartir los hallazgos.


---
## Sección Principal

Cuando descubra una infección de malware u otro indicador de compromiso en un dispositivo, la idea es trabajar con el propietario del mismo para devolverlo a un estado óptimo de funcionamiento. Proporcionar a su cliente el mejor apoyo informático pasa por considerar los objetivos de la persona y comprender a cabalidad la naturaleza de la amenaza encontrada en su dispositivo. La persona afectada puede estar interesada en deshacerse del malware lo más rápido posible para retomar sus actividades personales y de trabajo. De manera alternativa, podría preferir usar otro dispositivo mientras mantiene el infectado para investigar qué sucedió y quién fue el responsable del ataque.

### Volver a habilitar las funciones de seguridad del sistema operativo

Anteriormente en esta ruta de aprendizaje mencionamos [algunas protecciones integradas del sistema operativo](/es/learning-path/2/module-4/#triagelistas-de-verificación-para-verificar-si-faltan-protecciones). Si el malware pudo ejecutarse en el sistema de una persona objetivo solo porque algunas de esas protecciones estaban deshabilitadas, volver a habilitarlas puede ayudar a evitar que el malware se ejecute o cause más daños. Por lo tanto, algunas piezas de malware menos sofisticadas podrían dejar de ejecutarse o incluso eliminarse, simplemente accediendo a la configuración del sistema operativo y volviendo a habilitar las protecciones. En caso de que no pueda volver a habilitar estas protecciones o se desactiven nuevamente después de algún tiempo, esto indica que el proceso malicioso está impidiendo el funcionamiento adecuado del sistema operativo y se requiere un trabajo de limpieza adicional o un restablecimiento de fábrica. Tenga en cuenta que en algunos casos puede ser que las protecciones del sistema operativo se hayan desactivado para instalar un *software* pirata, algo que su cliente puede no haberle comunicado de inmediato. Es útil conocer este escenario y guiar al cliente en sus decisiones sobre gestión de riesgos y encontrar alternativas más seguras que preserven la integridad del sistema operativo.

### Restablecimientos de fábrica

Los restablecimientos de fábrica son a menudo la forma más simple y limpia de eliminar el malware en un dispositivo determinado. Si el usuario ha realizado el respaldo de todos los datos que desea conservar en un lugar en la nube o en una unidad de respaldo y puede reinstalar sus aplicaciones más utilizadas después de un restablecimiento de fábrica, esta es una opción preferible para tratar con el malware. Si no está seguro de haber realizado el respaldo de los datos importantes, usted puedes ayudarle a completar un respaldo local o hacerlo en la nube. Tenga en cuenta que los archivos maliciosos pueden encontrarse en carpetas respaldadas (aunque estarían inactivas hasta que se ejecuten), por lo que se recomienda escanear las carpetas de respaldo con un motor antivirus de buena reputación. Tenga en cuenta que, a menudo, no se respaldan las configuraciones de aplicaciones y otros dispositivos, dependiendo de la utilidad del respaldo utilizado. Siempre es buena idea probar los respaldos, por ejemplo, intentando restaurar todo el sistema o algunos archivos clave, antes de realizar un restablecimiento de fábrica.

Muchos analistas de malware prefieren usar restablecimientos de fábrica antes que otros tipos de eliminación, ya que estos les proporcionan una mayor certeza de que no quedarán rastros del malware en los sistemas de la persona objetivo. Siempre existe el riesgo de que los programas antivirus o las protecciones integradas del sistema operativo no eliminen todo el malware, especialmente si es novedoso o raro; en este sentido, un restablecimiento de fábrica será mucho más efectivo. La única excepción podría ser los rootkits UEFI y el malware que afecta el programa fijo (*firmware*) del dispositivo en lugar del sistema operativo. Más abajo hay enlaces de artículos que tratan este tema.

### Eliminación de malware (y qué hacer cuándo no es posible)

A veces, un restablecimiento de fábrica no es factible debido a limitaciones de tiempo otecnológicas, o porque el usuario no se siente cómodo con la acción. Dependiendo de la naturaleza del malware y de qué tanto se sepa de él, puede ser factible eliminarlo mediante medios automatizados o manuales. A continuación, revise la lista de consejos específicos de la plataforma para obtener orientación general.

En algunos casos, los esfuerzos de eliminación de malware pueden resultar ineficaces. Un ejemplo es el malware integrado en Android o las versiones crackeadas o con jailbreak de un sistema operativo (consulte la sección de Android a continuación para obtener más detalles). Los ataques de hardware/firmware son otra clase de malware que serían resistente a los esfuerzos de limpieza o restablecimientos de fábrica. Aunque estos son relativamente raros, sin embargo ocurren, principalmente en PC (Windows/Linux), por lo que vale la pena conocerlos bien. Algunos son detectables por los antivirus; consulte [ESET sobre el tema de Rootkit UEFI descubierto por primera vez en 2018](https://www.eset.com/int/uefi-rootkit-cyber-attack-discovered/). Algunos consejos y sugerencias adicionales de Microsoft sobre la caza de amenazas de rootkit UEFI pueden encontrarse en [BleepingComputer aquí](https://www.bleepingcomputer.com/news/security/microsoft-shares-guidance-to-detect-blacklotus-uefi-bootkit-attacks/).

### Asesoramiento Específico de la Plataforma

#### Android

- El restablecimiento de fábrica está disponible desde el menú Configuración o desde el botón de iniciar en modo de recuperación.
- Parte del malware/adware/spyware está integrado en el sistema operativo Android proporcionado por la fábrica, como en el caso de algunos dispositivos Android de bajo costo y sin marca. Un ejemplo de esto se detalla en el informe técnico de [HUMAN Security sobre la botnet de fraude publicitario BADBOX](https://www.humansecurity.com/hubfs/HUMAN_Report_BADBOX-and-PEACHPIT.pdf). Desafortunadamente, en la mayoría de los casos, estos dispositivos no se pueden limpiar mediante un restablecimiento de fábrica y son irreparables para el usuario promedio, por lo que deberían ser reemplazados con dispositivos de marcas reconocidas, aunque a un precio más elevado, desafortundamente.
- Verifique si se habilitaron fuentes de aplicaciones no protegidas verificando si alguna aplicación recibió permiso para instalar APK de “Fuentes Desconocidas” en la sección Configuración. En caso afirmativo, busque aplicaciones sospechosas o desconocidas.
- Las aplicaciones sospechosas o maliciosas pueden ser eliminadas.
- Proteja cualquier cuenta de Google utilizada para acceder al dispositivo.
- Asegúrese de que Google Play Protect esté habilitado y verifique los resultados del escaneo (desde Google Play -> Menú -> Play Protect).
- Asegúrese de que los componentes del sistema estén actualizados y de que se instalen las actualizaciones de seguridad. Puede verificar la fecha de las actualizaciones de seguridad del dispositivo buscando en Configuración -> Acerca del Teléfono -> Información del Software (o Versión de Android) -> Nivel de Parche de Seguridad de Android. Busque actualizaciones pulsando en Actualización del Sistema de Google Play. Tenga en cuenta que los dispositivos más antiguos pueden recibir actualizaciones de seguridad limitadas.


#### iOS/iPadOS

- Las investigaciones publicadas indican que los exploits contra sistemas en vivo iOS (incluidos algunos casos como Pegasus) no sobreviven al reinicio del dispositivo, por lo que reiniciarlo es una buena idea. Como el autor de la amenaza puede volver a infectar el dispositivo si utiliza un exploit sin clic, posiblemente sea prudente reiniciarlo periódicamente, al igual que el Modo de Bloqueo, vinculado a continuación. Tenga en cuenta que este nivel de ataque sigue siendo poco común y costoso, y que las aplicaciones configuradas o instaladas maliciosamente (por ejemplo, stalkerware, funcionalidades de encontrar mi teléfono, etc) o una cuenta de Apple ID comprometida, aún podrían afectar la seguridad del dispositivo, por lo tanto, siga leyendo para conocer que otras acciones podría realizar:
- Desinstalas aplicaciones sospechosas o maliciosas.
- Considera habilitar el [Modo de Bloqueo](https://support.apple.com/en-us/105120).
- Asegurarse de que la cuenta de Apple iCloud sea privada y que ninguna otra persona pueda acceder a ella. Cualquier usuario de iOS puede utilizar [Comprobación de Seguridad de Apple](https://support.apple.com/guide/personal-safety/how-safety-check-works-ips2aad835e1/1.0/web/1.0) para auditar si otros tienen acceso a alguna de sus cuentas.
- Verificar si el dispositivo tiene *jailbreak*. [Algunos consejos proporcionados](https://www.certosoftware.com/insights/how-to-tell-if-your-iphone-is-jailbroken/) por Certo Software incluyen buscar Cydia o Sileo o utilizar su aplicación gratuita Certo Mobile Security.
- Verificar (no deseada) registro en Administración de Dispositivos Móviles (verificar en Configuraciones -> General -> Perfiles).
- Realizar un restablecimiento de fábrica siguiendo [esta guía](https://support.apple.com/en-gb/HT201274) (Esto eliminará todas las fotos, mensajes y archivos del teléfono. A menos que se haya hecho un respaldo, se perderán irremediablemente).

#### Windows

- El restablecimiento de fábrica es la solución preferible. La mayoría de los dispositivos que se compraron con Windows preinstalado tendrán una partición de recuperación desde la cual podrá realizar un restablecimiento de fábrica o una “actualización” del sistema operativo.
- Ejecutar Antivirus en el “Modo seguro” de Windows puede ser más eficaz para poner en cuarentena las infecciones descubiertas. Sin embargo, también puede pasar por alto el malware sin fichero o *“fileless”* que está activo durante el funcionamiento normal del sistema operativo.
- Verificar los mecanismos de persistencia del malware utilizando SysInternals AutoRuns. Desactívelos y una vez realizada la limpieza confirme que no se hayan vuelto a habilitar.
- Algunos creadores de antivirus entregan un “disco de rescate” que le permite al dispositivo arrancar en un sistema temporal en vivo desde el cual realizar escaneos y actividades de eliminación de malware. Una lista de opciones confiables es 
[proporcionada aquí por TechRadar](https://www.techradar.com/best/best-antivirus-rescue-disk).
- Tenga cuidado con las numerosas guías de “eliminación de malware” de Windows que se encuentran en línea y que parecen estar personalizadas para variantes específicas de malware. Muchas de ellas son guías genéricas que promueven el uso de una herramienta propietaria que puede ser en sí misma un software no deseado.

#### Mac OS

- Se recomienda el restablecimiento de fábrica; revise las [instrucciones de Apple aquí](https://support.apple.com/en-ug/HT212749).
- Los antivirus comerciales tendrán una función de limpieza y cuarentena.
- Utilice herramientas [Objective-See tools](https://objective-see.org/tools.html) como _Knock Knock_ y _Kext Viewer_ para buscar y deshabilitar procesos y extensiones del *kernel* desconocidos y persistentes.

### Gestión de Riesgos Posteriores al Incidente e Intercambio de Información

Compartir sus hallazgos con su cliente y trabajar con este para comprender mejor cómo pudo haber ocurrido la infección por malware es un paso importante que le permitirá actualizar su enfoque de gestión de riesgos y comprender la importancia (o insignificancia) del incidente de seguridad vivido.

Tome notas técnicas detalladas, capturas de pantalla y muestras (o, más probable, *hashes* de estas) y hable con su cliente sobre su modelo de amenazas y si le  autoriza a compartir sus hallazgos con la comunidad en general. Compartir los resultados de su investigación es particularmente valioso, sobretodo si encontró una amenaza nueva o una que específicamente apunta a miembros de la comunidad por el tipo de trabajo que realizan. En estos casos, hablar con otras personas sobre los *hashes* de malware, los vectores de infección y los mecanismos de mitigación ayudará a proteger a quienes corren mayor riesgo de ataques a su seguridad digital. Puede utilizar parte de la información contenida en la sección [Documentación de Hallazgos](/es/learning-path/1/module-8/) de apartado sobre Detección, Investigación y Seguimiento de Infraestructura Maliciosa de la ruta de aprendizaje al elaborar su informe y considere difundirlo.

## Verificación de habilidades

Elabore un diagrama de flujo o una lista de verificación que pueda ayudarle a eliminar malware de un dispositivo y asegurarse de que no omite ningún paso. Discuta este diagrama de flujo o lista de verificación con un compañero/a o mentor/a para asegurarse de que sea preciso y de que no falta nada.

Escriba un breve párrafo explicando en qué situaciones recomendaría a las personas que fueron objeto de una infección de malware cambiar las contraseñas de sus cuentas principales (correo electrónico, iCloud, redes sociales, trabajo). Haga referencia también a cómo se lo explicaría a su cliente. Comparta lo que ha escrito con un compañero/a o mentor/a para que comprueben si su explicación es precisa.


## Recursos de Aprendizaje

{{% resource title="Se descubre un ciberataque de rootkit UEFI" description="En 2018 un análisis realizado por una empresa de seguridad que describe un rootkit UEFI: una pieza de malware incrustada en un nivel inferior al del sistema operativo, por lo que no sería destruida con una simple reinstalación del sistema operativo" languages="Inglés" cost="Gratis" url="https://www.eset.com/int/uefi-rootkit-cyber-attack-discovered/" %}}
{{% resource title="Microsoft comparte orientación para detectar ataques de bootkit BlackLotus UEFI" description="Una visión general de otra pieza de malware que opera a un nivel inferior al sistema operativo y los pasos para detectarlo suministrados por Microsoft." languages="Inglés" cost="Gratis" url="https://www.bleepingcomputer.com/news/security/microsoft-shares-guidance-to-detect-blacklotus-uefi-bootkit-attacks/" %}}
{{% resource title="Troyanos Una Amenaza Persistente: BADBOX y PEACHPIT" description="Un informe detallado que examina el malware que está preinstalado en dispositivos, muy probablemente de fábrica, y por lo tanto extremadamente difícil de eliminar. Buen ejemplo de por qué los dispositivos utilizados para trabajos sensibles deben provenir de fabricantes acreditados" languages="Inglés" cost="Gratis" url="https://www.humansecurity.com/hubfs/HUMAN_Report_BADBOX-and-PEACHPIT.pdf" %}}
{{% resource title="Cómo funciona Safety Check en iPhone para mantenerte seguro" description="Explicación de una característica de iOS que permite a cualquier usuario revisar qué información están compartiendo con otros y, si es necesario, evitar que se comparta." languages="Inglés" cost="Gratis" url="https://support.apple.com/guide/personal-safety/how-safety-check-works-ips2aad835e1/1.0/web/1.0" %}}
{{% resource title="Cómo saber si tu iPhone tiene *jailbreak*" description="Un vistazo rápido a algunas heurísticas iniciales que puedes realizar para comprobar si tu dispositivo iOS tiene *jailbreak*" languages="Inglés" cost="Gratis" url="https://www.certosoftware.com/insights/how-to-tell-if-your-iphone-is-jailbroken/" %}}
{{% resource title="Cómo realizar el restablecimiento de fábrica de tu iPhone, iPad o iPod touch" description="Una guía rápida sobre cómo borrar completamente un dispositivo iOS,  proporcionando una reconfirmación adicional de que se eliminó cualquier malware o perfil malicioso." languages="Inglés" cost="Gratis" url="https://support.apple.com/en-gb/HT201274" %}}
{{% resource title="Los mejores discos de rescate antivirus de 2024" description="Una lista de herramientas que puede utilizar para escanear y limpiar un sistema operativo infectado mientras arranca desde una unidad externa" languages="Inglés" cost="Gratis" url="https://www.techradar.com/best/best-antivirus-rescue-disk" %}}
{{% resource title="Borra tu Mac y restablécela a la configuración de fábrica" description="Una guía rápida sobre cómo borrar completamente un dispositivo macOS, que debería proporcionar una reconfirmación adicional de que se eliminó cualquier malware o perfil malicioso" languages="Inglés" cost="Gratis" url="https://support.apple.com/en-ug/102664" %}}
{{% resource title="Herramientas Objective-see" description="Una serie de herramientas de seguridad para macOS, desarrolladas por un investigador de seguridad de gran reputación, que pueden utilizarse para detectar malware" languages="Inglés" cost="Gratis" url="https://objective-see.org/tools.html" %}}