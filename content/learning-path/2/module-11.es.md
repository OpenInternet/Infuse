+++
style = "module"
weight = 11
title = "Limpieza, cuidados posteriores, gestión de riesgos posteriores al incidente e intercambio de información"
+++

## Caso de Uso

Si se encuentra malware o tráfico malicioso en el dispositivo de una persona objetivo, necesitamos proporcionar cuidado posterior correctivo o recomendaciones específicas para permitir que un cliente determine los próximos pasos apropiados.

## Objetivos

Después de completar este subtema, el profesional debe ser capaz de realizar lo siguiente:

- Determinar el método adecuado de limpieza para el tipo de malware o indicador de compromiso encontrado.
- Realizar o guiar sobre los pasos de limpieza correctivos, incluyendo la eliminación de mecanismos de persistencia, herramientas de eliminación de malware, reinicios, restablecimientos de fábrica.
- Identificar situaciones en las que la limpieza puede no ser posible y pueden ser necesarios más consejos o acciones.
- Documentar y compartir los hallazgos .

---
## Sección Principal

Cuando descubras una infección de malware u otro indicador de compromiso en un dispositivo, querrás trabajar con el propietario del dispositivo afectado para devolver su dispositivo a un estado óptimo. Proporcionar el mejor soporte requiere considerar los objetivos de la persona y comprender la naturaleza de la amenaza encontrada en su dispositivo. La persona afectada puede estar interesada en deshacerse del malware lo más rápido posible para poder volver a su vida y trabajo, o, alternativamente, podría preferir usar otro dispositivo mientras mantiene el infectado para investigar qué sucedió y posiblemente quién fue el responsable.

### Volver a habilitar las funciones de seguridad del sistema operativo

Anteriormente en esta ruta de aprendizaje mencionamos [algunas protecciones integradas del sistema operativo](/es/learning-path/2/module-4/#triagelistas-de-verificación-para-verificar-si-faltan-protecciones). Si el malware pudo ejecutarse en el sistema de una persona objetivo solo porque algunas de esas protecciones estaban deshabilitadas, volver a habilitarlas puede ayudar a evitar que el malware se ejecute o cause más daños. Por lo tanto, algunas piezas de malware menos sofisticadas podrían dejar de ejecutarse o incluso eliminarse simplemente accediendo a la configuración del sistema operativo y volviendo a habilitar las protecciones. En caso de que no puedas volver a habilitar estas protecciones o si se desactivan nuevamente después de algún tiempo, esto indica que el proceso malicioso está impidiendo el funcionamiento adecuado del sistema operativo y se requiere un trabajo de limpieza adicional o un restablecimiento de fábrica. Ten en cuenta que en algunos casos puedes encontrar instancias en las que las protecciones del sistema operativo se hayan desactivado para instalar software pirata, lo cual el usuario puede no comunicarte de inmediato. Es útil conocer este escenario y guiar al cliente en decisiones de gestión de riesgos y encontrar alternativas más seguras que preserven la integridad del sistema operativo.

### Restablecimientos de fábrica

Los restablecimientos de fábrica son a menudo la forma más simple y limpia de eliminar el malware en un dispositivo determinado. Si el usuario ha realizado el respaldo de todos los datos que desea conservar en un lugar en la nube o en una unidad de respaldo y puede reinstalar sus aplicaciones más utilizadas después de un restablecimiento de fábrica, esta es una opción preferible para tratar con el malware. Si no están seguros de haber realizado el respaldo de los datos importantes, puedes ayudarles a completar un respaldo local o en la nube. Ten en cuenta que los archivos maliciosos pueden encontrarse en archivos respaldados (aunque estarían inactivos hasta que se ejecuten), por lo que se recomienda escanear las carpetas de respaldo con un motor antivirus de reputación. Ten en cuenta que, a menudo, no se respalda las configuraciones de aplicaciones y otros dispositivos, dependiendo de la utilidad de respaldo utilizada. Siempre es buena idea probar los respaldos, por ejemplo, intentando restaurar todo el sistema o algunos archivos clave de ellos, antes de realizar un restablecimiento de fábrica.

Muchos analistas de malware prefieren usar restablecimientos de fábrica sobre en lugar de otros tipos de eliminación, ya que esto les proporciona una mayor certeza de que no quedaron rastros del malware en los sistemas de la persona objetivo. Siempre existe el riesgo de que los programas antivirus o las protecciones integradas del sistema operativo no eliminen todo el malware, especialmente si es novedoso o raro; un restablecimiento de fábrica será mucho más efectivo en este sentido. La única excepción a esto podría ser los rootkits UEFI y el malware que afecta el firmware del dispositivo en lugar del sistema operativo; hemos vinculado algunos artículos sobre esto más abajo.

### Eliminación de malware (y cuándo no es posible)

A veces, un restablecimiento de fábrica no es factible debido a limitaciones de tiempo, limitaciones tecnológicas o la comodidad del usuario con la acción. Dependiendo de la naturaleza del malware y de qué tan bien se comprenda, puede ser factible eliminarlo mediante medios automatizados o manuales. Revisa la lista de consejos específicos de la plataforma a continuación para obtener orientación general.

En algunos casos, los esfuerzos de eliminación de malware pueden resultar ineficaces. Un ejemplo es el malware integrado en Android o las versiones crackeadas o con jailbreak de un sistema operativo (consulte la sección de Android a continuación para obtener más detalles). Los ataques de hardware/firmware son otra clase de malware que sería resistente a los esfuerzos de limpieza o restablecimiento de fábrica. Estos son relativamente raros, sin embargo ocurren, principalmente sólo en PC (Windows/Linux), por lo que vale la pena conocerlos. Algunos son detectables por los antivirus; consulta [ESET sobre el tema de Rootkit UEFI descubierto por primera vez en 2018](https://www.eset.com/int/uefi-rootkit-cyber-attack-discovered/). Consejos y sugerencias adicionales de Microsoft sobre la caza de amenazas de rootkit UEFI están disponibles en [BleepingComputer aquí](https://www.bleepingcomputer.com/news/security/microsoft-shares-guidance-to-detect-blacklotus-uefi-bootkit-attacks/).

### Asesoramiento Específico de la Plataforma

#### Android

- El restablecimiento de fábrica está disponible desde el menú Configuración o desde iniciar en modo de recuperación.
- Parte del malware/adware/spyware está integrado en el sistema operativo Android proporcionado de fábrica, como en el caso de algunos dispositivos Android de bajo costo y sin marca. Un ejemplo de esto se detalla en el informe técnico de [HUMAN Security sobre la botnet de fraude publicitario BADBOX](https://www.humansecurity.com/hubfs/HUMAN_Report_BADBOX-and-PEACHPIT.pdf). Desafortunadamente, en la mayoría de los casos, estos dispositivos no pueden ser limpiados mediante un restablecimiento de fábrica y son irreparables para el usuario promedio, por lo que deberían ser reemplazados con dispositivos de marcas reconocidas, desgraciadamente a un precio más elevado.
- Verifica si se habilitaron fuentes de aplicaciones no protegidas verificando si alguna aplicación recibió permiso para instalar APK de "Fuentes Desconocidas" en la sección Configuración. En caso afirmativo, busca aplicaciones sospechosas o desconocidas.
- Las aplicaciones sospechosas o maliciosas pueden ser eliminadas.
- Protege cualquier cuenta de Google utilizada para acceder al dispositivo.
- Asegúrate de que Google Play Protect esté habilitado y verifica los resultados del escaneo (desde Google Play -> Menú -> Play Protect).
- Asegúrate de que los componentes del sistema estén actualizados y de que se instalen las actualizaciones de seguridad. Puedes verificar la fecha de las actualizaciones de seguridad del dispositivo buscando en Configuración -> Acerca del Teléfono -> Información del Software (o Versión de Android) -> Nivel de Parche de Seguridad de Android. Busca actualizaciones tocando en Actualización del Sistema de Google Play. Ten en cuenta que los dispositivos más antiguos pueden recibir actualizaciones de seguridad limitadas.

#### iOS/iPadOS

- Las investigaciones publicadas indican que los exploits contra sistemas en vivo iOS (incluidos casos como Pegasus) no sobreviven al reinicio del dispositivo (no a un restablecimiento de fábrica, sino a un simple ciclo de encendido/apagado), por lo que realizar un reinicio es una buena idea. Como el autor de la amenaza puede volver a infectar el dispositivo si utiliza un exploit sin clic, posiblemente sea prudente reiniciar periódicamente, al igual que el Modo de Bloqueo, vinculado a continuación. Ten en cuenta que este nivel de ataque sigue siendo poco común y costoso. Ten en cuenta que las aplicaciones configuradas o instaladas maliciosamente (por ejemplo, stalkerware, funcionalidades de encontrar mi teléfono) o una cuenta de Apple ID comprometida aún podrían afectar la seguridad del dispositivo, por lo tanto, sigue leyendo para obtener más acciones a continuación.
- Desinstala aplicaciones sospechosas o maliciosas.
- Considera habilitar el [Modo de Bloqueo](https://support.apple.com/en-us/105120).
- Asegúrate de que la cuenta de Apple iCloud sea privada y que ninguna otra persona pueda acceder a ella. Cualquier usuario de iOS puede utilizar [Comprobación de Seguridad de Apple](https://support.apple.com/guide/personal-safety/how-safety-check-works-ips2aad835e1/1.0/web/1.0) para auditar si otros tienen acceso a alguna de tus cuentas.
- Verifica si el dispositivo tiene jailbreak. [Algunos consejos proporcionados](https://www.certosoftware.com/insights/how-to-tell-if-your-iphone-is-jailbroken/) por Certo Software incluyen buscar Cydia o Sileo o utilizar su aplicación gratuita Certo Mobile Security.
- Verificar (no deseada) registro en Administración de Dispositivos Móviles (verificar en Configuraciones -> General -> Perfiles).
- Realice un restablecimiento de fábrica siguiendo [esta guía](https://support.apple.com/en-gb/HT201274) (Esto eliminará todas las fotos, mensajes y archivos del teléfono. A menos que se haya hecho un respaldo, se perderán irremediablemente).

#### Windows

- El restablecimiento de fábrica es la solución preferible. La mayoría de los dispositivos que se compraron con Windows preinstalado tendrán una partición de recuperación desde la cual podrá realizar un restablecimiento de fábrica o una "actualización" del sistema operativo.
- Ejecutar Antivirus en el "Modo seguro" de Windows puede ser más eficaz para poner en cuarentena las infecciones descubiertas. Sin embargo, también puede pasar por alto el malware "fileless" que está activo durante el funcionamiento normal del sistema operativo.
- Verifica los mecanismos de persistencia del malware utilizando _SysInternals AutoRuns_, desactívalos y confirma después de las actividades de limpieza que no se hayan vuelto a habilitar.
- Algunos creadores de antivirus entregan un "disco de rescate" que te permite arrancar en un sistema temporal en vivo desde el cual realizar escaneos y actividades de eliminación de malware. Una lista de opciones renombradas es [proporcionada aquí por TechRadar](https://www.techradar.com/best/best-antivirus-rescue-disk).
- Ten cuidado con las numerosas guías de "eliminación de malware" de Windows que se encuentran en línea y que parecen estar personalizadas para variantes específicas de malware. Muchas de ellas son guías genéricas que promueven el uso de una herramienta propietaria que puede ser en sí misma un software no deseado.

#### Mac OS

- Se recomienda el restablecimiento de fábrica; revisa las [instrucciones de Apple aquí](https://support.apple.com/en-ug/HT212749).
- Los antivirus comerciales tendrán una función de limpieza y cuarentena.
- Utilice herramientas [Objective-See tools](https://objective-see.org/tools.html) como _Knock Knock_ y _Kext Viewer_ para buscar y deshabilitar procesos y extensiones del kernel desconocidos y persistentes.

### Gestión de Riesgos Posteriores al Incidente e Intercambio de Información

Compartir tus hallazgos con tu cliente y trabajar con ellos para comprender cómo pudo haber ocurrido la infección por malware es un paso importante que les permite actualizar su enfoque de gestión de riesgos y comprender la importancia (o insignificancia) del incidente de seguridad.

Toma notas técnicas detalladas, capturas de pantalla y muestras (o, más probable, _hashes_ de estas) y habla con tu cliente sobre su modelado de amenazas y en qué medida podrías compartir tus hallazgos con la comunidad en general. Compartir tus hallazgos es particularmente valioso si encontraste una amenaza novedosa o una que específicamente apunta a miembros de la comunidad basándose en cierto trabajo que realizan. en este caso, hablar con otras personas sobre los _hashes_ de malware, los vectores de infección y los mecanismos de mitigación ayudará a proteger a quienes corren mayor riesgo. Puedes utilizar parte de la información de la sección [Documentación de Hallazgos](/es/learning-path/1/module-8/) de la sección Detección, Investigación y Seguimiento de Infraestructura Maliciosa de la ruta de aprendizaje cuando elabores un informe breve y cuando consideres su difusión.

## Verificación de habilidades

Elabora un diagrama de flujo o una lista de verificación que pueda ayudarte a eliminar malware de un dispositivo y garantizar que no omitas ningún paso. Discute este diagrama de flujo o lista de verificación con un compañero o mentor para asegurarte de que sea preciso y de que no se haya perdido nada.  

Escribe un breve párrafo explicando en qué situaciones recomendarías que las personas que fueron objetivo de una infección de malware exitosa cambien las contraseñas de sus cuentas principales (correo electrónico, iCloud, redes sociales, trabajo) posteriormente, cómo se lo explicaría a una persona a la que está proporcionándole soporte. Presenta este párrafo a un compañero o mentor que comprobará si tu explicación es precisa.

## Recursos Educativos

{{% resource title="Se descubre un ciberataque de rootkit UEFI" description="En 2018 un análisis realizado por una empresa de seguridad que describe un rootkit UEFI: una pieza de malware incrustada en un nivel inferior al del sistema operativo, por lo que no sería destruida con una simple reinstalación del sistema operativo" languages="Inglés" cost="Gratis" url="https://www.eset.com/int/uefi-rootkit-cyber-attack-discovered/" %}}
{{% resource title="Microsoft comparte orientación para detectar ataques de bootkit BlackLotus UEFI" description="Una visión general de otro, más reciente, pieza de malware que opera a un nivel inferior al sistema operativo, junto con los pasos que un analista podría tomar para detectarlo" languages="Inglés" cost="Gratis" url="https://www.bleepingcomputer.com/news/security/microsoft-shares-guidance-to-detect-blacklotus-uefi-bootkit-attacks/" %}}
{{% resource title="Troyanos Una Amena Persistente: BADBOX y PEACHPIT" description="Un informe detallado que examina el malware que está preinstalado en dispositivos, muy probablemente de fábrica, y por lo tanto es extremadamente difícil de eliminar. Buen ejemplo de por qué los dispositivos utilizados para trabajos sensibles deben provenir de fabricantes acreditados" languages="Inglés" cost="Gratis" url="https://www.humansecurity.com/hubfs/HUMAN_Report_BADBOX-and-PEACHPIT.pdf" %}}
{{% resource title="Cómo funciona Safety Check en iPhone para mantenerte seguro" description="Una característica de iOS que permite a cualquier usuario revisar qué información están compartiendo con otros y, si es necesario, evitar que se comparta." languages="Inglés" cost="Gratis" url="https://support.apple.com/guide/personal-safety/how-safety-check-works-ips2aad835e1/1.0/web/1.0" %}}
{{% resource title="Cómo saber si tu iPhone tiene jailbreak" description="Un vistazo rápido a algunas heurísticas iniciales que puedes realizar para comprobar si tu dispositivo iOS tiene jailbreak" languages="Inglés" cost="Gratis" url="https://www.certosoftware.com/insights/how-to-tell-if-your-iphone-is-jailbroken/" %}}
{{% resource title="Cómo realizar el restablecimiento de fábrica de tu iPhone, iPad o iPod touch" description="Una guía rápida sobre cómo borrar completamente un dispositivo iOS, que debería proporcionar una reconfirmación adicional de que se eliminó cualquier malware o perfil malicioso" languages="Inglés" cost="Gratis" url="https://support.apple.com/en-gb/HT201274" %}}
{{% resource title="Los mejores discos de rescate antivirus de 2024" description="Una lista de herramientas que puedes utilizar para escanear y limpiar un sistema operativo infectado mientras arranca desde una unidad externa" languages="Inglés" cost="Gratis" url="https://www.techradar.com/best/best-antivirus-rescue-disk" %}}
{{% resource title="Borra tu Mac y restablécela a la configuración de fábrica" description="Una guía rápida sobre cómo borrar completamente un dispositivo macOS, que debería proporcionar una reconfirmación adicional de que se eliminó cualquier malware o perfil malicioso" languages="Inglés" cost="Gratis" url="https://support.apple.com/en-ug/102664" %}}
{{% resource title="Herramientas Objective-see" description="Una serie de herramientas de seguridad para macOS, desarrolladas por un investigador de seguridad de gran reputación, que pueden utilizarse para detectar malware" languages="Inglés" cost="Gratis" url="https://objective-see.org/tools.html" %}}