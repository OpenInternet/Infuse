---
style: module
title: Interpersonal skills for detecting malware
description: Before you start looking into any malware, you need to set up a
  safe environment to do so. Since malware does bad things to the systems it
  runs on, you do not want to run it on your primary system
weight: 1
---

## Use Case

Before you start analyzing any malware, you need to set up a safe environment to do so. Definitionally, malware does bad things to the systems it runs on. You do not want to run it on your primary system. Additionally, you likely will want to prevent the malware from actually making connections to the threat actor’s C&C (command and control) servers. Both of these mean that you should set up a virtual machine to use when performing malware analysis.

## Objectives

After completing this subtopic, practitioners will be able to support those who might have received or clicked on malicious links or emails in a more responsible way.

Practitioners should also be able to do the following:

- Explain the scope of the work and what information they would gather
- Provide assurance to the client on their safety and the safety of their data
- Prepare a simple confidentiality agreement with a client, if necessary
- Navigate a triage discussion to help identify when further investigation and detection work is necessary

---

## Main Section
### Foundational knowledge

The Security Education Companion contains a multitude of advice on thoughtful, careful, harm-reducing ways to interact as a technology helper. If you are not already familiar with this type of content, we highly advise a review at [Security Education 101](https://www.securityeducationcompanion.org/articles).

After reading through the above resources, you should be able to:

- Understand how risk assessment is important in every interaction
- Understand the risks of touching people’s devices or gaining access to their accounts;
- Understand the risks of engaging in fear-mongering discourse
- Understand your own limitations, both in terms of technical ability but also your suitability to support a given person or community and any risks inherent in doing so
- Avoid injecting preferences for platforms, technology, open-source vs closed-source, etc, into helper interactions.

### Path-specific Knowledge

Once you are familiar with the above foundational knowledge, take some time to think about particular interpersonal skills which might be needed for this specific learning path. Every learning path and intervention are slightly different; each one might bring with it different narratives or concerns by learners.

You should be able to:

- Remember how those who create malware aim not just to obtain data but also scare people into thinking that they are perpetually surveilled. Malware attacks targeting civil society often serve the purpose of both data collection and intimidation
- Recognize that many targeted people will have very sensitive data on their devices, which could pertain to both their personal and professional lives. Malware detection and investigation will be a stressful process for them because they both need to worry about what information about them might have been leaked to adversaries and they need to hand over control of devices to digital protectors who support them, which could make them feel even more vulnerable. Be ready to discuss your data handling practices, including the ways in which you encrypt the drive on which you are doing the detection and how you plan to handle and delete their data once the process is complete;
- Understand that many people working in civil society are aware of the risks they personally face, but are extremely concerned about family, friends, and sources whose data might have been leaked or who might be targeted
- Talk to people about any potential risks involved in the malware detection process (adversaries could find out about it, they might lose access to their devices, the process might not yield any satisfying results)
- Understand that technical knowledge, skill levels, and resources vary widely between people. One civil society group might find it easy to lock down devices and reduce the chances of malware infections, while others might struggle to even find devices which still receive software updates
- Be ready to explain how the same method of analysis can sometimes yield lots of data and sometimes very little, be able to manage expectations accordingly;
- Appreciate that some civil society groups would like to sign an NDA or similar agreement prior to sharing much of their data or devices.

Note that the other subtopics in this learning path also contain advice on developing interpersonal skills in order to deliver thoughtful, harm-reducing support on this subject.

### Understand: Harm Reduction & Operational Security

By the time a malware sample has been shared with you, it is possible that harm has been caused to the targeted person. The malware might have captured data, and the targeted person may also be impacted by the psychosocial impact of being targeted or watched. It’s important to support the intended targeted person while, at the same time, avoiding causing harm to yourself during active interaction with malicious content.

Harm reduction for the targeted person should start with collecting some information on the actions they took and the circumstances in which they interacted with their devices. You might ask different sets of questions for people you know well, such as colleagues, versus beneficiaries whom you know less about. Some questions worth asking include: What is their threat model? Are they an anonymous blogger? A dissident in exile attempting to hide their location?

The answers to these questions will both help provide useful harm reduction support and aid in your investigations. As you progress in analysis and understanding of the malicious content, update the targeted person especially insofar as is relevant to harm reduction.

For operational security to protect yourself while working with malicious emails, complete subtopic 3 (Safe Handling of Links and Infrastructure) of the learning path on detecting, tracking, and investigating malicious infrastructure.

### Understand: Detection, Negative Findings, and Paranoia

Spyware is an extremely invasive attack against individuals, families, communities, and movements. Understand that the information and analysis - whether positive or negative - which you provide to a client may be extremely consequential and inform risk decisions which they take with their devices. As such, it is important to be clear about the true scope and significance of any detection work and determination which you provide to them.

Outside of highly controlled and monitored device environments, modern OS platforms remain difficult to fully assess for compromise and infections especially in case sophisticated zero-day attacks may be utilized. As such, you are never able to make a 100% definitive determination of the absence of malware on a device. You can only state that using the technique you have deployed, and with the skills you have, you were unable to find malware. This does not mean malware is absent, only that the tests used did not identify any.

At the same time, we know that paranoia is a common phenomenon in which the feeling of surveillance (warranted or not) is a persistent negative mental experience for public-facing activists, journalists, leaders, or other clients you may be working with. It is necessary to walk a fine line in determining a balance between providing useful technical evidence to update on the odds and probabilities that surveillance is occuring, while neither stoking a sense of false confidence nor an unfounded fear of personalized surveillance.

### Triage the situation as well as the device

Triage is the necessary step in which you gather information and use it to decide when to invest time in further investigation. While effective triage relies on technical knowledge and instincts, it also requires interpersonal skills to empathetically engage a client, take their concerns seriously, listen actively, and understand the situation they are in.

During initial conversations, seek to ascertain:

- Is there a particular reason they want their device checked, or is it a general fear, curiosity, suspicion, or act of prudence?
- Specific reasons and explanations will help you target your search, for instance:
  - Change in device performance
  - A physical incident, such as a device being handled by someone else, or being seized and returned by law enforcement
  - A digital incident, such as software or an application being installed, or a suspicious link being clicked
  - A warning, indicator, or security alert

There are many alternative explanations for device misperformance, such as old or faulty hardware, software bugs, lack of updates, undesirable configurations. Of course, malware infection and compromise can also exist alongside these explanations. So finding misconfigurations, noting out of date software or low device resources is not sufficient to reject the malware hypothesis.

Use a combination of interpersonal questioning and interaction with your client as well as access to the device (where possible and appropriate) to determine when detailed follow-up is necessary. And when it is not possible for you to conduct investigations yourself either due to your own limited time, resources, and ability, it is always desirable to share resources which will allow your contact to take steps to investigate and secure their devices themselves.

The exact setup you need depends on your analysis method and the operating system of the malware you’re analyzing. In most cases you can start with a pre-build linux VM like [REMnux](https://remnux.org/). See [Chapter 6 of the Field Guide to Incident Response for Civil Society and Media](https://internews.org/wp-content/uploads/2023/11/Field-Guide-to-Threat-Labs.pdf) for step-by-step instructions on how to configure it. For specific things (for example, dynamic analysis of iOS malware) you will need additional tools (for example, a jailbroken iPhone or iPad). VMs occasionally have vulnerabilities that allow software running in the VM to attack the host operating system. Most malware doesn’t even come close to this level of sophistication, but if in doubt, it’s safest to analyze malware on a separate physical device that is wiped afterwards.

To set up REMnux, we recommend that you follow the steps outlined in [Chapter 6 of the Field Guide to Incident Response for Civil Society and Media](https://internews.org/wp-content/uploads/2023/11/Field-Guide-to-Threat-Labs.pdf) and [download the VM](https://docs.remnux.org/install-distro/get-virtual-appliance)[^1]. This is an easy way to start which provides excellent isolation between your host system and the REMnux environment. Be careful not to share sensitive data from your host OS into the VM. Per the instructions linked above, take a snapshot of your VM once it’s been set up, and before you start working on any malware. You can use snapshots to return your VM to a known-good state before analyzing different pieces of malware and to isolate different clients from each other. For more information on VM snapshots in general, see [this article](https://www.nakivo.com/blog/vm-snapshot-vs-backup/).

While performing malware analysis, you may find that you want additional tools in your analysis VM. Go ahead and install and configure them, but note what you did. After you’re done with your analysis, you can load up your “clean” VM snapshot, install and configure the tool, and then make a new “clean” snapshot for your next malware analysis adventure.

In order to move malware files around, the standard practice is to put them in encrypted ZIP files. In this case, the encryption quality doesn’t matter. The point is not to keep the malware secret, so much as to prevent inadvertently unleashing it on other systems and to prevent anti-malware systems from detecting or deleting it. Feel free to include the password in the ZIP file name.

## Practice

Reflect on and answer/discuss the following with peers, colleagues, friends, or a mentor. If available and if appropriate, talk to a ‘client’ you have worked with before to ask their input and experiences on some of these questions.

- Describe how touching and gaining access to someone's device might present unforeseen risks.
- Imagine you are assisting someone with sensitive data on their device. How would you approach a discussion with this person regarding your access and data handling.
- Why is it impossible to say that a device is free from malware?
- How does understanding a person’s specific threat model impact your harm-reduction efforts, for instance if they are an anonymous blogger or dissident in exile?
- How do you navigate providing factual technical evidence according to your ability, while balancing the need not to provide false confidence while also not fostering paranoia?
- Describe your own abilities and limitations in conducting malware detection work. After making a first attempt at this description, attempt to add further nuance and accuracy to your description.
  - What might be the risks if you proceed without this recognition of your limitations?
- Role Play an interaction in which you report to a client on finding active malware on a device.

## Skill check

With a Mentor or Peer

- Explain to your mentor/peer or peer group your responses to the above Practice questions.
- Role play some of the interactions described in the above Practice questions:
  - Initial discussion with a client
  - Discussing their threat model
  - Describing a negative finding (no malware) including an explanation of the limitations of the assessment
  - Informing of a positive finding (malware found)
- If available, have someone watch your actual interactions and incident response process with a client and provide feedback on how you navigate the interpersonal elements of the interaction

## Learning Resources

{{% resource title="التوعية الأمنية 1012" description="مورد مجتمعي شائع حول كيفية تدريس الأمن الرقمي والتحدث عنه" languages="اللغة الإنجليزية" cost="مجاني" url="https://www.securityeducationcompanion.org/article" %}}
الموضوع الفرعي 1: مهارات التعامل مع الآخرين للكشف عن البرمجيات الضارة
حالة استخدام
قبل البدء في تحليل أي برمجيات ضارة، تحتاج إلى إعداد بيئة آمنة للقيام بذلك لأن البرمجيات الضارة كما يتضح من اسمها تسبب ضررًا للأنظمة التي تعمل عليها، لذا لا تقم بتشغيلها على نظامك الأساسي. بالإضافة إلى ذلك، من المحتمل أن ترغب في منع البرمجيات الضارة من إجراء اتصالات فعلية بخوادم الأوامر والتحكم الخاصة بممثل التهديد. كلا هذين الأمرين يعنيان أنه يجب عليك إعداد آلة افتراضية لاستخدامها عند إجراء تحليل البرمجيات الخبيثة.
الأهداف 

بعد الانتهاء من هذا الموضوع الفرعي، سيتمكن الممارسون بطريقة أكثر مسؤولية من مساعدة أولئك الذين ربما تلقوا أو نقروا على الروابط الضارة أو رسائل البريد الإلكتروني.
يجب أن يكون الممارسون قادرين أيضًا على القيام بما يلي:
شرح نطاق العمل والمعلومات التي سيجمعونها
تقديم ضمانات للعميل بشأن سلامته وسلامة بياناته
إعداد اتفاقية سرية بسيطة مع العميل إذا لزم الأمر
قيادة نقاش التصنيف (الترياج) للمساعدة في تحديد متى يكون من الضروري إجراء مزيد من التحقيق وأعمال الكشف.
العرض 
المعرفة الأساسية
يحتوي "رفيق التعليم الأمني" على العديد من النصائح حول طرق التفاعل الواعية والحذرة والمُقللة للأضرار كمعاون تكنولوجي. إذا لم تكن على دراية بهذا النوع من المحتوى، فإننا ننصح بشدة بإجراء مراجعة في التوعية الأمنية 101.

بعد قراءة الموارد المذكورة أعلاه، ستصبح قادرًا على:
فهم مدى أهمية تقييم المخاطر في كل تفاعل.
فهم مخاطر العبث بأجهزة الآخرين أو الوصول إلى حساباتهم.
فهم مخاطر الانخراط في الخطاب الذي يثير الخوف.
فهم حدودك ليس فقط من حيث القدرة الفنية ولكن أيضًا من حيث ملاءمتك لدعم شخص أو مجتمع معين وأي مخاطر ناتجة عن القيام بذلك.
تجنّب إدخال تفضيلات المنصات والتكنولوجيا والمصدر المفتوح مقابل المصدر المغلق وما إلى ذلك في تفاعلات المساعد.
📋المعرفة المتعلقة بالمسار 
بمجرد أن تكون على دراية بالمعرفة الأساسية المذكورة أعلاه، عليك قضاء بعض الوقت للتفكير في مهارات معينة للتعامل مع الآخرين قد تكون مطلوبة لمسار التعلّم المحدد هذا. يختلف كل مسار تعلّم وتدخل اختلافًا طفيفًا وقد يرى المتعلمون في كل واحد منها سرديات أو مخاوف مختلفة. 
يجب أن تكون قادرًا على:
تذكر كيف أن أولئك الذين ينشؤون البرمجيات الضارة لا يهدفون فقط إلى الحصول على البيانات ولكن أيضًا تخويف الناس للاعتقاد بأنهم يخضعون للمراقبة بصورة دائمة، وغالبًا ما تخدم هجمات البرمجيات الضارة التي تستهدف المجتمع المدني غرض جمع البيانات والترهيب.
إدراك أن العديد من الأشخاص المستهدفين سيكون لديهم بيانات حساسة للغاية على أجهزتهم يمكن أن تتعلق بحياتهم الشخصية والمهنية. وسيكون كشف البرمجيات الضارة وفحصها عملية مرهقة لأنهم أولًا بحاجة إلى القلق بشأن المعلومات المتعلقة بهم التي قد تكون قد تسربت إلى المتطفلين وثانيًا يحتاجون إلى منح التحكم في أجهزتهم إلى حماة رقميين يدعمونهم مما يزيد من شعورهم بأنهم عُرضة للخطر. عليك الاستعداد لمناقشة ممارساتك في معالجة البيانات بما فيها ذلك الطرق التي تقوم من خلالها بتشفير محرك الأقراص الذي تجري عملية الكشف عليه وكيفية تخطيطك للتعامل مع بياناتهم وحذفها بمجرد اكتمال العملية.
فهم أن العديد من الأشخاص العاملين في المجتمع المدني يُدركون المخاطر التي يواجهونها شخصيًا ولكنهم قلقون للغاية بشأن العائلة والأصدقاء والمصادر التي قد تكون بياناتها مُسربة أو قد تكون مستهدفة.
التحدث إلى الأشخاص بشأن أي مخاطر مُحتملة تنطوي عليها عملية كشف البرمجيات الضارة (يمكن للمتطفلين اكتشافها، وقد يفقدون الوصول إلى أجهزتهم، وقد لا تُسفر العملية عن أي نتائج مرضية)
فهم أن المعرفة الفنية ومستويات المهارات والموارد تختلف اختلافًا كبيرًا بين الأشخاص. قد تجد إحدى مجموعات المجتمع المدني أنه من السهل تأمين الأجهزة وتقليل فرص الإصابة بالبرمجيات الضارة، بينما قد تجد مجموعات أخرى صعوبة في العثور على الأجهزة التي لا تزال تتلقى تحديثات البرامج.
الاستعداد لشرح كيف يمكن لنفس طريقة التحليل أن تسفر في بعض الأحيان عن الكثير من البيانات وأحيانًا عن القليل جدًا فقط، وأن تتمكن من إدارة التوقعات وفقًا لذلك.
مراعاة أن بعض مجموعات المجتمع المدني ترغب في التوقيع على اتفاقية عدم الإفصاح أو اتفاقية مماثلة قبل مشاركة الكثير من بياناتها أو أجهزتها. 
لاحظ أن المواضيع الفرعية الأخرى في مسار التعلّم هذا تحتوي أيضًا على نصائح حول تطوير المهارات التعامل مع الآخرين من أجل تقديم دعم مدروس يُقلل الضرر حول هذا الموضوع. 
راعي الحد من الأضرار والأمن التشغيلي
بحلول الوقت الذي تحصل فيه على عينة البرمجية الضارة، من المحتمل أن يكون الضرر قد لحق بالشخص المستهدف وقد تكون البرمجيات الضارة قد سجلت بيانات ويمكن أن يتأثر الشخص المستهدف أيضًا نفسيًا واجتماعيًا بسبب التعرض للاستهداف أو المراقبة. من المهم دعم الشخص المستهدف المقصود مع تجنب التسبب بضرر لنفسك في الوقت نفسه الذي تتفاعل فيه بصورة نشطة مع المحتوى الضار.
يجب أن يبدأ الحد من الضرر للشخص المستهدف بجمع بعض المعلومات حول الأشياء التي قام بها والظروف التي كان يتفاعل فيها مع أجهزته. قد تسأل مجموعات مختلفة من الأسئلة للأشخاص الذين تعرفهم جيدًا، مثل الزملاء مقابل المستفيدين الذين تعرفهم بشكل سطحي. وتتضمن بعض الأسئلة التي تستحق طرحها ما يلي: ما هو نموذج التهديدات؟ هل هو مؤلف مدوّنة مجهول؟ هل هو معارض في المنفى يحاول إخفاء موقعه؟
ستساعد الإجابات على هذه الأسئلة في توفير دعم مفيد للحد من الضرر والمساعدة في عمليات الفحص التي تؤديها. مع إحرازك تقدمًا في تحليل وفهم المحتوى الضار عليك إعلام الشخص المستهدف بالمستجدات وبالأخص فيما يتعلق بالحد من الضرر.
من أجل الأمان التشغيلي وحماية نفسك أثناء العمل مع رسائل البريد الإلكتروني الضارة، استكمل الموضوع الفرعي 3 (التعامل الآمن مع الروابط والبنية التحتية) لمسار التعلّم حول اكتشاف التحتية لأساسية الضارة وتتبعها وفحصها.
راعي الكشف والنتائج السلبية والذعر
برمجيات التجسس عبارةً عن هجوم شديد الاجتياح ضد الأفراد والأسر والمجتمعات والحركات. عليك فهم أن المعلومات والتحليلات سواء كانت إيجابية أو سلبية التي تقدمها للعميل قد تكون ذات عواقب وخيمة للغاية وتوفر أساس قرارات المخاطر التي يتخذونها باستخدام أجهزتهم. على هذا النحو، من المهم أن تعرف بوضوح النطاق الحقيقي وأهمية أي عمل تُجريه يتعلق بالكشف أو التحديد بالنسبة لهم. 
خارج البيئات التي تتم مراقبتها والسيطرة عليها بشكل مكثف، تظل أنظمة التشغيل الحديثة صعبة التقييم بشكل كامل من حيث التعرض للاختراق والعدوى، خاصة في حالة استخدام هجمات يوم الصفر المتطورة. على هذا النحو، لن تتمكن أبدًا من الوصول إلى تحديد جازم بنسبة 100 ٪ بشأن عدم وجود برمجيات ضارة على الجهاز. يمكنك فقط ذكر أنه باستخدام التقنية التي طبقتها واستنادًا إلى المهارات المتاحة لديك لم تتمكن من العثور على البرمجيات الضارة. ولا يعني ذلك عدم وجود برمجيات ضارة، وإنما فقط أن الاختبارات المستخدمة لم تُحدد أيًا منها.
وفي الوقت نفسه نعلم أن الذعر ظاهرة شائعة يكون فيها الشعور بالخضوع للمراقبة سواء مبررًا أم لا هي تجربة ذهنية سلبية مستمرة لدى النشطاء المكشوفين على العامة أو الصحفيين أو القادة أو العملاء الآخرين الذين قد تعمل معهم. من الضروري مراعاة الحفاظ على الاعتدال الدقيق بين تقديم أدلة تقنية مفيدة لمشاركة المستجدات بشأن الاحتمالات والإمكانيات التي تُحدثها المراقبة، في حين تتجنب إذكاء الشعور الزائف بالثقة أو خوف التعرض للرقابة الشخصية الذي لا أساس له من الصحة. 
صنّف الموقف وكذلك الجهاز

يُعدّ التصنيف (الترياج) خطوة ضرورية تجمع فيها المعلومات وتستخدمها لتحديد متى عليك استثمار الوقت لأداء عمليات الفحص الإضافية وفي حين أن تصنيف الترياج الفعّال يعتمد على المعرفة والبديهة الفنية فإنه يحتاج أيضًا إلى مهارات التعامل مع الآخرين لإشراك العميل بشكل تعاطفي وأخذ مخاوفه على محمل الجد والاستماع إليه بصورة جيدة ومراعاة الموقف الذي يعيشه.

أثناء المحادثات الأولية، حاول التأكد مما يلي:
هل هناك سبب معين يجعلهم يريدون فحص أجهزتهم، أم هو مجرد خوف عام أو فضول أو شك أو مجرد حذر؟ 
ستساعدك الأسباب والتفسيرات المحددة على توجيه بحثك، على سبيل المثال:
تغير في أداء الجهاز 
حادث مادي يشمل على سبيل المثال تعامل شخص آخر مع الجهاز، أو مصادرة السلطات له ومن ثم إعادته
حادث رقمي يشمل على سبيل المثال تثبيت برنامج أو تطبيق، أو الضغط على رابط مشبوه
تحذير أو مؤشر أو تنبيه أمني

توجد العديد من التفسيرات البديلة لسوء أداء الجهاز، مثل الأجهزة القديمة أو أجزاءها المعيبة أو أخطاء البرامج أو نقص التحديثات أو التكوينات غير المرغوب فيها وبالطبع يمكن أن تكون الإصابات بالبرمجيات الضارة والثغرات هذه موجودةً إلى جانب هذه التفسيرات. لذا قد لا يكفي لرفض فرضية وجود برمجيات ضارة العثور على تكوينات خاطئة أو اكتشاف برامج قديمة أو ضعف موارد الجهاز.

استخدم مزيجًا من مهارات التعامل مع الآخرين والتفاعل مع عميلك بالإضافة إلى الوصول إلى الجهاز (حيثما كان ذلك ممكنًا ومناسبًا) لتحديد متى تكون المتابعة المفصّلة ضرورية. وعندما يتعذر عليك إجراء الفحوص بنفسك بسبب محدودية وقتك أو مواردك أو قدراتك، يُستحسن دائمًا مشاركة الموارد التي ستسمح للجهة التي تتواصل معها باتخاذ خطوات لفحص وتأمين أجهزتهم بأنفسهم.

يعتمد الإعداد الدقيق الذي تحتاجه على طريقة التحليل ونظام تشغيل البرمجيات الضارة التي تُحللها، وفي معظم الحالات يمكنك البدء بجهاز لينوكس ظاهري مسبق الإعداد مثل ريمنوكس (REMnux). انظر الفصل 6 من الدليل الميداني للاستجابة لحوادث المجتمع المدني ووسائل الإعلام للاطلاع على التعليمات خطوة بخطوة حول كيفية تكوينه. بالنسبة للأمور الخاصة (على سبيل المثال، التحليل الديناميكي للبرمجيات الضارة التي تستهدف نظام آي أو إس) ستحتاج إلى أدوات إضافية (على سبيل المثال، جهاز آيفون (iPhone) أو آيباد (iPad) مُخترق الحماية). تحتوي الأجهزة الظاهرية أحيانًا على ثغرات تسمح للبرمجيات التي تعمل في الجهاز الظاهري بمهاجمة نظام التشغيل المضيف. لا تقترب معظم البرمجيات الضارة حتى من مستوى التطور هذا، ولكن في حال الشك من الأسلم تحليل البرمجيات الضارة على جهاز مادي منفصل يمكنك مسحه بعد انتهاء العملية. 

كي تقوم بإعداد ريمنوكس، نوصيك باتباع الخطوات الموضحة في الفصل 6 من الدليل الميداني للاستجابة لحوادث المجتمع المدني ووسائل الإعلام وتنزيل الجهاز الظاهري. هذه طريقة سهلة للبدء توفر عزلًا ممتازًا بين نظام المضيف وبيئة ريمنوكس. احرص على عدم مشاركة البيانات الحساسة من نظام التشغيل المضيف في الجهاز الظاهري. وفقًا للتعليمات المذكورة في الرابط أعلاه، التقط لقطة لجهازك الظاهري بمجرد إعداده وقبل البدء في العمل على أي برمجيات ضارة. يمكنك استخدام اللقطات لإعادة جهازك الظاهري إلى حالة جيدة معروفة قبل تحليل أجزاء مختلفة من البرمجيات الضارة وعزل وكلاء مختلفين عن بعضهم البعض. لمزيد من المعلومات حول لقطات الأجهزة الظاهرية بشكل عام، راجع هذه المقالة.

أثناء إجراء تحليل البرمجيات الضارة، قد تجد حاجة إلى أدوات إضافية في الجهاز الظاهري المخصص للتحميل لذا بإمكانك بتثبيتها وتكوينها ولكن سجّل ما تفعله. بعد الانتهاء من تحليلك، يمكنك تحميل لقطة الجهاز الظاهري "النظيفة" وتثبيت الأداة وتكوينها ثم إنشاء لقطة "نظيفة" جديدة لخوض مغامرة تحليل البرمجية الضارة التالية.

تُعدّ الممارسة القياسية لنقل ملفات البرمجيات الضارة هي وضعها في ملفات مضغوطة مشفرة ولكن لا أهمية لجودة التشفير في هذه الحالة. ليس الهدف الحفاظ على سرية البرمجيات الضارة بقدر ما هو منع إطلاقها عن غير قصد على الأنظمة الأخرى ومنع أنظمة مكافحة البرمجيات الضارة من اكتشافها أو حذفها. بإمكانك تضمين كلمة المرور في اسم الملف المضغوط.
موارد التعلّم
[تلخص جميع الروابط في العرض بالإضافة إلى أي موارد إضافية لتضمينها]
الممارسة
فكر بما يلي وأجب عليه أو ناقشه مع النظراء أو الزملاء أو الأصدقاء أو مرشِد. إذا كان ذلك متاحًا ومناسبًا، تحدث إلى "عميل" عملت معه سابقًا لطلب مدخلاته وخبراته حول بعض هذه الأسئلة.
صِف كيف يمكن أن يؤدي العبث بجهاز شخص ما والوصول إليه إلى مخاطر غير متوقعة.
تخيل أنك تساعد شخصًا ما لديه بيانات حساسة على أجهزته. كيف ستُجري مناقشة مع هذا الشخص فيما يتعلق بوصولك إلى البيانات ومعالجتها.
لمَ من المستحيل قول إن الجهاز خالٍ من البرمجيات الضارة؟ 
كيف يؤثر فهم نموذج التهديد المحدد للشخص على جهودك للحد من الضرر، على سبيل المثال إذا كان مدونًا مجهول الهوية أو معارضًا في المنفى؟ 
كيف تتعامل مع تقديم أدلة تقنية واقعية وفقًا لقدرتك مع موازنة الحاجة إلى عدم توفير ثقة زائفة وعدم تعزيز الذعر أيضًا؟
صِف قدراتك وحدودك في إجراء أعمال كشف البرمجيات الضارة. بعد إجراء المحاولة الأولى في هذا الوصف، حاول إضافة فروق دقيقة إضافية ودقة إلى وصفك.
ما المخاطر التي قد تترتب على المضي قدمًا دون هذا الإقرار بقيودك؟
مثل دور تفاعل تقوم فيه بإبلاغ العميل عن العثور على برمجيات ضارة نشطة على جهاز.
اختبار مهارة

مع مرشِد أو نظير
اشرح لمعلمك أو نظيرك أو مجموعة نظراءك إجاباتك على أسئلة التدريب المذكورة أعلاه. 
مثل دور بعض التفاعلات الموضّحة في أسئلة الممارسة أعلاه:
المناقشة الأولية مع العميل
مناقشة نموذج التهديد الخاص بهم
وصف نتيجة سلبية (عدم العثور على برمجيات ضارة) بما في ذلك شرح لقيود التقييم
الإبلاغ عن نتيجة إيجابية (العثور على برمجيات ضارة)
إذا كان ذلك متاحًا، اطلب من شخص ما مراقبة تفاعلاتك الفعلية وعملية الاستجابة للحوادث مع العميل وتقديم ملاحظات حول كيفية التعامل مع جوانب التعامل والتفاعل مع الآخرين.

## Notes

[^1]: REMnux is not available on ARM processors such as Apple Silicon computers. While it is possible to virtualize across CPU architectures using emulators such as QEMU or UTM (VirtualBox does not currently support ARM architectures), performance will be slow and is not advised. It would make more sense to select another Linux distribution which supports your hardware and install the necessary software packages to complete the activities, if they did not already come with the operating system. Kali Linux is a popular Linux distribution which will include or support many tools also found in REMnux. If you have an Apple Silicon device, you can use UTM (https://mac.getutm.app/) to run the Apple Silicon (ARM64) Kali Installer image. Walkthrough guides are available from both UTM and Kali. At the time of writing, a bug affecting the installer process requires an additional step during installation of attaching a virtual serial terminal display – both walkthroughs describe this process. You can also obtain an ARM version of Kali for the Raspberry Pi, with most models of Raspberry Pi supported. 
