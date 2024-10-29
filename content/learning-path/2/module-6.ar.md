+++
style = "module"
weight = 6
title = "Detecting malware through traffic analysis"
description = "This optional subtopic teaches you to use a Raspberry Pi to conduct traffic analysis while searching for potential malware"
+++

## Use Case

Most malware will make some sort of network connection, be it to connect to a command and control server for further instructions or exfiltrate data from a computer. While various tactics can be used by malware to avoid being detected by antivirus scanners, in many cases an analyst with access to all network traffic from the device can spot those suspicious network connections and analyze them to look for signs of malicious activity.

Use when you are able to set up an in-line traffic analysis solution, for instance by using a WiFi hotspot device running on a Raspberry Pi as in some of the tools discussed here. Other options could include making use of TAP or SPAN ports to capture traffic for all users of a local network, such as in an office space.

_Note to learners: this subtopic assumes that you have access to a Raspberry Pi. If this is not the case, you can skip it and move on to the next one._

## Objectives

After completing this subtopic, practitioners should be able to do the following:

- Discuss with the client the suggested approach of traffic analysis including explaining the process, the risks, and limitations of the action
- Select an appropriate network traffic analysis tool and implement it using the relevant hardware or software configuration
- Investigate and understand which rule sets or heuristics are being used by each given network traffic analysis approach and understand their strengths or weaknesses
- Read the results of flagged network flows and be able to triage which results require further investigation or risk-remediating action

---
## Main Section
Rather than looking at files and processes running on a device, malware can also be identified by the network communications it initiates or responds to. This approach has several advantages over device-based analysis as it is difficult for malware to avoid making network communications at some point, and, in some cases, allows you to investigate multiple devices at once.

### Traffic Capture using a Raspberry Pi

In this section, we will look at two tools: PiRogue Tool Suite and SpyGuard. Both of those tools require additional hardware (a small, low-cost computer called a Raspberry Pi and an SD card).

‼️ After learning skills on of either of the two tools, you should be able to:

- Install the selected tool on the SD Card of a Raspberry Pi and perform initial configuration
- Access the control panel for the tool
- Connect devices to the WiFi hotspot
- Identify devices connected to the hotspot (if connecting multiple devices at once)
- Read and interpret suspicious findings and triage which ones require risk remediation/further investigation
- Advanced: configure logging and notifications on the selected tool
- Advanced: Conduct traffic capture for further investigation

#### PiRogue tool suite

PiRogue tools suite is a set of software tools which turns the Raspberry Pi into a malware analysis station. It’s developed by the Defensive Lab Agency. It serves as an intermediary router, which sits between a device which you suspect might be infected and the internet, and captures and analyzes all of the servers and services the infected device attempts to communicate with. This can be used to detect potential malware activity.

If you are interested in running those tools, check out the author’s [excellent documentation](https://pts-project.org/docs/prologue/introduction/). We recommend starting with the beginner’s guide, which looks at [how to set up a PiRogue](https://pts-project.org/guides/g1/) and [how to conduct your first analyses](https://pts-project.org/guides/g2/).

#### SpyGuard

An alternative tool, called SpyGuard, also runs on the Raspberry Pi or other Linux devices and also works as an intermediary router. In contrast to the PiRogue Tool Suite, which primarily focuses on more advanced network analysis, SpyGuard focuses on scanning network traffic for known IoCs and [potentially suspicious behavior](https://github.com/SpyGuard/SpyGuard/wiki/Detection-methods-and-IOCs) such as contacting recently registered domains or using unusual ports. SpyGuard is forked from another project called TinyCheck which was originally designed for a French women’s shelter to detect traces of stalkerware (malware used to non-consensually spy on people, often installed by abusive partners) on mobile devices. Its capabilities have, however, expanded and it can now be used to test for many other types of malware. You can read more about SpyGuard [on its github page](https://github.com/SpyGuard/SpyGuard/).

### Other Approaches

#### Outbound Firewalls

Using a ‘noisy’ device firewall which asks permission for every process requesting to send internet traffic is a useful, though cumbersome, way to identify processes which are making network connections and potentially identify suspicious communications. This does require a level of familiarity with common processes on your chosen platform in order to identify non-suspicious processes, as well as ability to research IP blocks and DNS lookups. Leaving this active on a client’s computer may not always be the best approach as it is difficult to properly investigate every process, however as a practitioner of digital security it is useful to be able to conduct this work and it may be worth it on your own device or when investigating a clients’ device. Some endpoint firewalls in this class include:

- MacOS
  - [LuLu ](https://objective-see.org/products/lulu.html)(Open Source, Free)
  - [Little Snitch](https://www.obdev.at/products/littlesnitch) (Paid) or [Little Snitch Mini](https://www.obdev.at/products/index.html) (Proprietary, Free)
- Windows
  - [PortMaster ](https://safing.io/)(Open Source, Free/Paid version available with network history/investigation feature)
  - [GlassWire](https://www.glasswire.com/) (Proprietary Free/Paid Version available)
- Android
  - [NetGuard](https://github.com/M66B/NetGuard) (Open Source Free/Freemium version available with traffic capture/history)
  - [AFWall+ ](https://github.com/ukanth/afwall)(Open Source, Free)
- Linux
  - [OpenSnitch](https://github.com/evilsocket/opensnitch) (Open Source, Free)

Outbound firewalls can be a bit difficult to get the hang of at first. The signal to noise ratio is far from optimal and we recommend first working alongside others who have experience with such tools before heavily relying on them in your own analysis.

#### 3rd Party Traffic Analysis

Traffic can be captured and filtered or analyzed by 3rd parties. One such semi-automated service is [Emergency VPN](https://www.civilsphereproject.org/emergency-vpn), run by the Civilsphere project at the Czech Technical University. A VPN profile can be generated and installed on any platform. After connecting to the VPN and running device traffic through it for 24 hours, the Emergency VPN service will automatically send a machine-generated analysis flagging any initial findings. Subsequently the traffic from the device will be retained and analyzed manually by a staff analyst and a manual report sent in case of malicious findings. This is a way of outsourcing analysis skills when needed. Ensure you or your client understands the privacy implications and are comfortable with the risks associated with external traffic capture.

If you have a moment to do so and are all right with the privacy implications of sharing your data with the Emergency VPN team, we recommend that you read a bit more about the service, run it for a few days, and analyze the data you receive afterwards. Once you have done so, you should be able to:

- Understand how the Emergency VPN service works
- Request an Emergency VPN profile and install it on your selected platform
- Read through and understand the first automated Emergency VPN report and parse results to identify any suspicious findings for further investigations

In other cases, if you are working with an external analyst, they may request you go through a similar VPN-based process or run a utility to capture network traffic most commonly into a PCAP file (Packet CAPture) for sharing and external review.

#### Manual Traffic Analysis & Organizational Monitoring

If you are ready to take this skill further, you will need to develop skills around traffic capture, filtering, and analysis using tools such as Suricata, Zeek, and Wireshark. See some suggested resources for learning these below:

- [Malware-traffic-analysis.net](https://www.malware-traffic-analysis.net/) - Contains years of blog and tutorial write-ups including PCAP files for practicing detection and analysis skills
- Course: [Network Security Monitoring with Suricata ](https://www.pluralsight.com/courses/network-security-monitoring-suricata)(Pluralsight, Free)
- Course: [Threat Hunting Training course ](https://www.activecountermeasures.com/hunt-training/)(Active Countermeasures, uses AC-Hunter CE, offered live monthly)

Consider also learning the organizational deployments of such tools across various categories, for instance using [Security Onion](https://github.com/Security-Onion-Solutions/securityonion), [pfsense](https://www.pfsense.org/)/[Opensense](https://opnsense.org/), [AC-Hunter CE](https://www.activecountermeasures.com/ac-hunter-community-edition/), [RITA](https://github.com/activecm/rita), and [Wazuh](https://wazuh.com/).

### Understand: Limitations & Privacy

As with all the approaches in this learning path, there are strengths and weaknesses to each method of malware detection and will only be effective when used with the proper skills, experience, and sometimes requires access to the right threat feeds or rulesets. Network analysis is no different.

Traffic analysis approaches combine hard rules such as ‘_this IP is known malicious_’ along with heuristic rules such as ‘_unusual amount of outbound traffic to new IP_’ or ‘_unexpected port/protocol usage’_. Since the former approach relies on IoCs, it can only catch known and well-documented malware. While the latter heuristic approaches may be able to catch novel malware, it often requires additional analysis skills to capture and manually review traffic in a tool like Wireshark while using additional rules and IoCs to hunt for specific threats. Several resources for learning additional analysis skills are linked in the resource table below.

Some sophisticated malware could exfiltrate data or contact servers in very subtle or obfuscated ways, which further complicates analysis.

Understand as well that intercepting traffic of a client’s device may expose online activities or other private information about the person. Most device traffic will be TLS encrypted; this means that an analyst would not be able to capture private messages or passwords. Still, there remains a substantial amount of private information which could be captured, including the services somebody uses, the domains they visit, and potentially sensitive pages they browse or services they use. Some tools will display live traffic flows on a dashboard while using the tool, which could potentially surface private information in a group setting. Ensure your client understands the process you are offering to them and handle any information collected with utmost confidentiality and OPSEC.

## Skill Check

Set up PiRogue on a Raspberry Pi and check the traffic from one device. Ideally, this would be a test device on which you have installed a lot of random apps. Try to understand the output and the alerts PiRogue is giving. Note down at least three different types of outputs, explain what you think they mean, and discuss them with a mentor or peer.



الموضوع الفرعي 5 ب:كشف البرمجيات الضارة من خلال تحليل حركة المرور
حالة استخدام
ستقوم معظم البرمجيات الضارة بإجراء اتصال بالشبكة سواء كان ذلك للاتصال بخادم الأوامر والتحكم للحصول على مزيد من التعليمات أو تسريب البيانات من جهاز الكمبيوتر. في حين يمكن استخدام تكتيكات مختلفة من قبل البرمجيات الضارة لتجنب اكتشافها بواسطة فاحصات مكافحة الفيروسات، يمكن للمحلل في كثير من الحالات الوصول إلى كامل حركة مرور الشبكة من الجهاز لاكتشاف اتصالات الشبكة المشبوهة هذه وتحليلها بحثًا عن علامات النشاط الضار. 
استخدمه عندما تكون قادرًا على إعداد حل لتحليل حركة المرور عبر الإنترنت، على سبيل المثال باستخدام جهاز نقطة اتصال واي فاي يعمل على رازبيري باي كما هو الحال في بعض الأدوات التي تمت مناقشتها هنا. يمكن أن تشمل الخيارات الأخرى استخدام منافذ اختبار الوصول أو محلل المنافذ المبدل لتسجيل حركة مرور جميع مستخدمي الشبكة المحلية كما هو الحال في المساحات المكتبية.
ملاحظة للمتعلمين: يفترض هذا الموضوع الفرعي أنه لديك رازبيري باي ولكن إذا لم يكن هذا هو الحال يمكنك تخطيه والانتقال إلى الخطوة التالية.
الأهداف 

بعد استكمال هذا الموضوع الفرعي، يجب أن يكون الممارسون قادرين على القيام بما يلي:
ناقش مع العميل النهج المقترح لتحليل حركة المرور بما في ذلك شرح العملية والمخاطر والقيود المفروضة على الإجراء
حدد أداة مناسبة لتحليل حركة مرور الشبكة وقم بتنفيذها باستخدام تكوين الأجهزة أو البرامج ذات الصلة
فحص وفهم مجموعات القواعد أو التحليلات التجريبية المستخدمة في كل نهج تحليل شبكة معين وفهم نقاط قوتها أو ضعفها
قراءة نتائج تدفقات الشبكة التي تم الإبلاغ عنها والتمكّن من تصنيف النتائج التي تتطلب الفحص الإضافي أو إجراءات معالجة المخاطر
العرض 
بدلًا من النظر إلى الملفات والعمليات التي تعمل على جهاز ما، يمكن أيضًا تحديد البرمجيات الضارة من خلال اتصالات الشبكة التي تباشرها أو تستجيب لها، ويتمتع هذا النهج بالعديد من المزايا مقارنة بالتحليل القائم على الجهاز حيث يصعب على البرمجيات الضارة تجنب إجراء اتصالات الشبكة في مرحلة ما وفي بعض الحالات يسمح لك بفحص أجهزة متعددة في وقت واحد. 
تسجيل حركة المرور باستخدام رازبيري باي
في هذا القسم، سنلقي نظرة على أداتين هما مجموعة أدوات باي روغ (PiRogue) وسباي غارد (SpyGuard) وكلتاهما تتطلبان أجهزة إضافية (كمبيوتر صغير ومنخفض التكلفة يسمى رازبيري باي وبطاقة إس دي (SD)).
‼️ بعد تعلّم المهارات على أي من هاتين الأداتين، يجب أن تكون قادرًا على:
تثبيت الأداة المحددة على بطاقة إس دي لجهاز رازبيري باي وإجراء التكوين الأولي
الوصول إلى لوحة تحكم الأداة
توصيل الأجهزة بنقطة اتصال واي فاي
تحديد الأجهزة المتصلة بنقطة الاتصال (في حالة توصيل أجهزة متعددة في وقت واحد)
قراءة وتفسير النتائج المشبوهة والتصنيف التي تتطلب معالجة المخاطر/الفحص الإضافي
متقدم: تكوين التسجيل والإشعارات على الأداة المحددة
متقدّم: التقاط حركة المرور لإجراء فحوص إضافية
مجموعة أدوات باي روغ
تُعدّ مجموعة أدوات باي روغ هي مجموعة من الأدوات البرمجية التي تحول رازبيري باي إلى محطة لتحليل البرمجيات الضارة وهي أداة طورتها دفنسف لاب إيجنسي (Defensive Lab Agency) وهي بمثابة جهاز راوتر وسيط يقع بين جهاز تشتبه بأنه قد يكون مصابًا وبين الإنترنت، ويسجل ويحلل جميع الخوادم والخدمات التي يحاول الجهاز المصاب الاتصال بها. يمكن استخدامها للكشف عن نشاط البرمجيات الضارة المحتملة.
إذا كنت مهتمًا بتشغيل هذه الأدوات، اطلّع على الوثائق الممتازة التي كتبها المنشئ. نوصي بالبدء بدليل المبتدئين الذي يبحث في كيفية إعداد باي روغ وكيفية إجراء تحليلاتك الأولى.
سباي غارد
أداة بديلة تسمى سباي غارد تعمل أيضًا على رازبيري باي أو أجهزة لينوكس الأخرى وتؤدي أيضًا وظيفة راوتر وسيط وعلى النقيض من مجموعة أدوات باي روغ التي تركز بشكل أساسي على تحليل الشبكة الأكثر تقدمًا، تُركز سباي غارد على فحص حركة مرور الشبكة بحثًا عن مؤشرات الاختراق المعروفة والسلوك المشبوه المحتمل مثل الاتصال بالنطاقات المسجلة مؤخرًا أو استخدام منافذ غير معتادة. تعد أداة سباي غارد فرعًا من مشروع آخر يسمى تايني تشك (TinyCheck) الذي صُمم في الأصل لمأوى للنساء الفرنسيات للكشف عن آثار برمجيات المطاردة (البرمجيات الضارة المستخدمة للتجسس على الأشخاص دون موافقتهم التي غالبًا ما يتم تثبيتها من قبل شركاء مسيئين) على الأجهزة المحمولة. لكن قدراته توسّعت ويمكن استخدامه الآن لاختبار العديد من أنواع البرمجيات الضارة الأخرى ويمكنك قراءة المزيد عن سباي غارد على صفحة غيت هب (github) خاصته.
مقاربات أخرى
جدران حماية الاتصالات الصادرة
يُعدّ من المفيد استخدام جدار حماية جهاز "متطلّب" يطلب الإذن في كل مرة تطلب فيها عملية إرسال حركة مرور عبر الإنترنت حتى لو كان ذلك مرهقًا لأجل تحديد العمليات التي تجري اتصالات بالشبكة وربما تحدد الاتصالات المشبوهة. يتطلب ذلك مستوى إلمام بالعمليات الشائعة على المنصة التي اخترتها من أجل كشف العمليات غير المشبوهة بالإضافة إلى القدرة على البحث عن كتل بروتوكول الإنترنت وعمليات بحث نظام أسماء المجالات. قد لا يكون تركه نشطًا على كمبيوتر العميل هو أفضل نهج دائمًا لأنه من الصعب فحص كل عملية بصورة صحيحة، ولكن بصفتك ممارس أمن رقمي من المفيد أن تكون قادرًا على إجراء هذا العمل وقد يكون الأمر يستحق القيام به على جهازك الخاص أو عند فحص جهاز العميل. تشمل بعض جدران حماية نقاط النهاية في هذه الفئة ما يلي:
ماك أو إس
لولو (مفتوح المصدر، مجانًا)
ليتل سنيتش (Little Snitch) (مدفوع) أو ليتل سنيتش ميني (Little Snitch Mini) (خاص، مجانًا)
ويندوز
بورت ماستر (PortMaster)(مفتوح المصدر، إصدار مجاني/مدفوع متاح مع ميزات سجل الشبكة/فحص)
غلاس واير (GlassWire) (نسخة مجانية/مدفوعة متاحة)
أندرويد
نت غارد (NetGuard) (نسخة مجانية مفتوحة المصدر/فريميوم متوفرة مع تسجيل/سجل حركة المرور)
إيه إف وول+ (AFWall+ )(مفتوح المصدر، مجانًا)
لينوكس
أوبن سنيتش (OpenSnitch) (مفتوح المصدر، مجانًا)

قد يكون من الصعب بعض الشيء التمكّن من جدران حماية الاتصالات الصادرة في البداية لأن نسبة المعلومات المطلوبة مقابل غير المطلوبة بعيدة عن المثالية ونوصي أولًا بالعمل جنبًا إلى جنب مع الآخرين الذين لديهم خبرة في مثل هذه الأدوات قبل الاعتماد عليها بشكل كبير في تحليلك الخاص.
تحليل حركة مرور الطرف الثالث
يمكن التقاط حركة المرور وتصفيتها أو تحليلها من قبل أطراف ثالثة وإحدى هذه الخدمات شبه الآلية هي إميرجنسي في ب إن (Emergency VPN) التي يديرها مشروع سيفيل سفير (Civilsphere) في الجامعة التقنية التشيكية (Czech Technical University). يمكن إنشاء ملف تعريف شبكة ظاهرية خاصة وتثبيته على أي منصة وبعد الاتصال بالشبكة الافتراضية الخاصة وتمرير حركة مرور الجهاز خلالها لمدة 24 ساعة، ستقوم خدمة إميرجنسي في ب إن تلقائيًا بإرسال تحليل تم إنشاؤه آليًا للإبلاغ عن أي نتائج أولية. تُحفظ بعدها بحركة المرور المسجلة من الجهاز وتُحلل يدويًا من قبل أحد الموظفين المحللين ويُرسل تقرير يدوي في حالة وجود نتائج ضارة. هذه طريقة استعانة بمصادر خارجية لمهارات التحليل عند الحاجة وعليك أن تتأكد من أنك أنت أو عميلك تفهمان الآثار المترتبة على الخصوصية وأنكما مرتاحان للمخاطر المرتبطة بتسجيل حركة المرور الخارجية.
إذا كانت لديك الوقت للقيام بذلك وكنت لا تمانع التبعات المترتبة على الخصوصية نتيجة مشاركة بياناتك مع فريق إميرجنسي في ب إن، فإننا نوصيك بقراءة المزيد عن الخدمة وتشغيلها لبضعة أيام وتحليل البيانات التي تتلقاها بعد ذلك، وبمجرد قيامك بذلك يجب أن تكون قادرًا على:
فهم كيفية عمل خدمة إميرجنسي في ب إن في حالات الطوارئ
طلب ملف تعريف إميرجنسي في ب إن وبتثبيته على المنصة التي اخترتها
قراءة وفهم أول تقرير إميرجنسي في ب إن تلقائي وتحليل النتائج لتحديد أي نتائج مشبوهة لإجراء فحوص إضافية

في حالات أخرى، إذا كنت تعمل مع محلل خارجي فقد يُطلب منك إجراء عملية مماثلة تجري من خلال شبكة ظاهرية خاصة أو تشغيل أداة مساعدة لتسجيل حركة مرور الشبكة كما جرت العادة في ملف ب سي إيه ب (PCAP) لمشاركته ومراجعته خارجيًا.
التحليل اليدوي لحركة المرور والمراقبة التنظيمية
إذا كنت مستعدًا لتطوير هذه المهارة أكثر، فستحتاج إلى تطوير مهارات متعلقة بالتقاط حركة المرور وتصفيتها وتحليلها باستخدام أدوات مثل سوريكاتا (Suricata) وزيك (Zeek) وواير شارك (Wireshark)، ويمكنك الاطلاع على بعض الموارد المقترحة لمعرفة ما يلي:
يضم موقع Malware-traffic-analysis.net سنوات من المدوّنات والأدلة التعليمية المكتوبة بما في ذلك ملفات ب سي إيه ب للتمرن على مهارات الكشف والتحليل
دورة: مراقبة أمن الشبكة باستخدام سوريكاتا (بلورالسايت (Pluralsight)، مجانًا) 
دورة: دورة تدريبية لصيد التهديدات (تدابير مضادة نشطة، تستخدم إيه سي هنتر سي إي (AC-Hunter CE)، وتقدم شهريًا بصورة مباشرة)
يجب أن تُراعي أيضًا تعلم عمليات النشر التنظيمية لهذه الأدوات عبر فئات مختلفة، على سبيل المثال باستخدام سيكيوريتي أنيون (Security Onion) وب إف سينس (pfsense)/أوبن سنس (Opensense) وإيه سي هنتر سي إي (AC-Hunter CE) و آر إيه تي إيه (RITA) ووازو (Wazuh).
راعي القيود والخصوصية
كما هو الحال مع جميع المقاربات في مسار التعلّم هذا، توجد نقاط قوة وضعف لكل طريقة كشف عن البرمجيات الضارة ولن تكون فعالة إلا عند استخدامها مع المهارات والخبرات المناسبة وتتطلب أحيانًا الوصول إلى خلاصات التهديد أو مجموعات القواعد الصحيحة ولا يختلف تحليل الشبكة.
تجمع مناهج تحليل حركة المرور بين القواعد الصارمة مثل "عنوان بروتوكول الإنترنت هذا يعرف بأنه ضار" جنبًا إلى جنب مع قواعد التحليل التجريبي مثل "كمية غير عادية من حركة المرور الصادرة إلى عنوان بروتوكول إنترنت جديد" أو "استخدام غير متوقع للمنفذ/البروتوكول". نظرًا لاعتماد النهج الأول على مؤشرات الاختراق، لا يمكنه إلا التقاط البرمجيات الضارة المعروفة والموثقة جيدًا. في حين أن الأساليب الاستكشافية الأخيرة قد تكون قادرة على التقاط برمجيات ضارة جديدة، إلا أنها غالبًا ما تتطلب مهارات تحليل إضافية لالتقاط حركة المرور ومراجعتها يدويًا في أداة مثل وايرشارك أثناء استخدام قواعد إضافية ومؤشرات الاختراق للبحث عن تهديدات محددة. توجد روابط لعدد من موارد تعلم مهارات تحليل إضافية في جدول الموارد أدناه.
يمكن لبعض البرمجيات الضارة المتطورة تسريب البيانات أو الاتصال بالخوادم بطرق خفية أو شديدة الطمس مما يزيد من تعقيد التحليل.
عليك أن تفهم أيضًا أن اعتراض حركة مرور جهاز العميل قد يكشف الأنشطة عبر الإنترنت أو غيرها من المعلومات الخاصة بالشخص. سيجري تشفير معظم حركة مرور الجهاز بنوع بروتوكول أمان طبقة النقل (TLS) وهذا يعني أن المحلل لن يكون قادرًا على التقاط الرسائل الخاصة أو كلمات المرور. لكن لا يزال هناك قدر كبير من المعلومات الخاصة التي يمكن التقاطها بما في ذلك الخدمات التي يستخدمها شخص ما والنطاقات التي يزورها والصفحات الحساسة التي يتصفحها أو الخدمات التي يستخدمها. ستعرض بعض الأدوات تدفقات حركة المرور المباشرة على لوحة المعلومات أثناء استخدام الأداة والتي من المحتمل أن تظهر معلومات خاصة في إعداد المجموعة. تأكد من أن عميلك يفهم العملية التي تقدمها له وأنك تتعامل مع أي معلومات يتم جمعها بأقصى قدر من السرية والأمان التشغيلي.
موارد التعلّم
[تلخص جميع الروابط في العرض بالإضافة إلى أي موارد إضافية لتضمينها]
اختبار مهارة
أعد جهاز باي روغ على رازبيري باي وتحقق من حركة المرور من جهاز واحد ومن الناحية المثالية يجب أن يكون هذا جهاز اختبار قمت بتثبيت الكثير من التطبيقات العشوائية عليه. حاول أن تفهم المعطيات والتنبيهات التي تقدمها أداة باي روغ. دوِّن ثلاثة أنواع مختلفة على الأقل من المعطيات واشرح ما تعتقد أنها تعنيه ثم ناقشها مع مرشد أو زميل.

## Learning Resources

{{% resource title="Pirogue Tool Suite Documentation" languages="English" cost="Free" description="The documentation for PiRogue tool suite." url="https://pts-project.org/docs/prologue/introduction/" %}}

{{% resource title="PiRogue Tool Suite Guides" languages="English" cost="Free" description="Additional set of guides for PiRogue tool suite." url="https://pts-project.org/docs/" %}}

{{% resource title="SpyGuard wiki" languages="English" cost="Free" description="The documentation for SpyGuard." url="https://github.com/SpyGuard/SpyGuard/wiki" %}}

{{% resource title="Malware Traffic Analysis" languages="English" cost="Free" description="Advanced resource with sample PCAP files for those who wish to develop traffic analysis skills." url="https://www.malware-traffic-analysis.net/" %}}

{{% resource title="Emergency VPN" languages="English" cost="Free" description="A project by CivilSphere, which allows you to connect to a special VPN collecting your device’s internet data for detailed reports." url="https://www.civilsphereproject.org/emergency-vpn" %}}

{{% resource title="Threat Hunting Training Course" languages="English" cost="Free" description="A free, one day course on analyzing and interpreting network data for threat hunting." url="https://www.activecountermeasures.com/hunt-training/" %}}

{{% resource title="Course on network security monitoring with Suricata" languages="English" cost="Free" description="A free course on how to use Suricata, a commonly used open source threat detection tool." url="https://www.pluralsight.com/courses/network-security-monitoring-suricata" %}}

{{% resource title="Outbound firewalls" languages="Various" cost="Most are either free or have free versions available" description="An outbound firewall analyzes outbound traffic and connects to servers. Includes tools like LuLu, Little Snitch, PortMaster, GlassWire, NetGuard, AFWall+, and OpenSnitch." url="https://" %}}

<ul>
<li>macOS:
  <ul>
    <li><a href="https://objective-see.org/products/lulu.html">LuLu</a> (Open Source, Free)</li>
    <li><a href="https://www.obdev.at/products/littlesnitch">Little Snitch</a> (Paid) or <a href="https://www.obdev.at/products/index.html">Little Snitch Mini</a> (Proprietary, Free)</li>
  </ul>
</li>
<li>Windows:
  <ul>
    <li><a href="https://safing.io/">PortMaster</a> (Open Source, Free/Paid version available)</li>
    <li><a href="https://www.glasswire.com/">GlassWire</a> (Proprietary, Free/Paid Version available)</li>
  </ul>
</li>
<li>Android:
  <ul>
    <li><a href="https://github.com/M66B/NetGuard">NetGuard</a> (Open Source Free/Freemium version available)</li>
    <li><a href="https://github.com/ukanth/afwall">AFWall+</a> (Open Source, Free)</li>
  </ul>
</li>
<li>Linux:
  <ul>
    <li><a href="https://github.com/evilsocket/opensnitch">OpenSnitch</a> (Open Source, Free)</li>
  </ul>
</li>
</ul>

{{% resource title="Threat hunting platforms" languages="Several" cost="Free" description="Several platforms using network data to detect threats within systems, including Security Onion, pfSense, OPNsense, AC Hunter Community Edition, RITA, Wazuh, and Suricata." url="https://" %}}

<ul>
  <li><a href="https://github.com/Security-Onion-Solutions/securityonion">Security Onion</a></li>
  <li><a href="https://www.pfsense.org/">pfSense</a></li>
  <li><a href="https://opnsense.org/">OPNsense</a></li>
  <li><a href="https://www.activecountermeasures.com/ac-hunter-community-edition/">AC Hunter Community Edition</a></li>
  <li><a href="https://github.com/activecm/rita">RITA</a></li>
  <li><a href="https://wazuh.com/">Wazuh</a></li>
  <li><a href="https://suricata.io/features/">Suricata</a></li>
</ul>


