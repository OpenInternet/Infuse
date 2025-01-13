---
style: module
title: Interpersonal skills for detecting malware
description: In almost every intervention or support case, practitioners will be working directly with persons affected by an attack or attempted attack. This can often be a stressful and anxiety-inducing experience for targeted persons, and every practitioner should know how to mitigate those pressures.
weight: 1
---
## Use Case

In almost every intervention or support case, practitioners will be working directly with persons affected by an attack or attempted attack. This can often be a stressful and anxiety-inducing experience for targeted persons, and every practitioner should know how to mitigate those pressures.

## Objectives

After completing this subtopic, practitioners will be able to support those who might have received or clicked on malicious links or emails in a more responsible way.

Practitioners should also be able to do the following:

* Explain the scope of the work and what information they would gather
* Provide assurance to the client on their safety and the safety of their data
* Prepare a simple confidentiality agreement with a client, if necessary
* Navigate a triage discussion to help identify when further investigation and detection work is necessary

- - -

## Main Section

### Foundational knowledge

The Security Education Companion contains a multitude of advice on thoughtful, careful, harm-reducing ways to interact as a technology helper. If you are not already familiar with this type of content, we highly advise a review at [Security Education 101](https://www.securityeducationcompanion.org/articles).

After reading through the above resources, you should be able to:

* Understand how risk assessment is important in every interaction
* Understand the risks of touching people’s devices or gaining access to their accounts;
* Understand the risks of engaging in fear-mongering discourse
* Understand your own limitations, both in terms of technical ability but also your suitability to support a given person or community and any risks inherent in doing so
* Avoid injecting preferences for platforms, technology, open-source vs closed-source, etc, into helper interactions.

### Path-specific Knowledge

Once you are familiar with the above foundational knowledge, take some time to think about particular interpersonal skills which might be needed for this specific learning path. Every learning path and intervention are slightly different; each one might bring with it different narratives or concerns by learners.

You should be able to:

* Remember how those who create malware aim not just to obtain data but also scare people into thinking that they are perpetually surveilled. Malware attacks targeting civil society often serve the purpose of both data collection and intimidation
* Recognize that many targeted people will have very sensitive data on their devices, which could pertain to both their personal and professional lives. Malware detection and investigation will be a stressful process for them because they both need to worry about what information about them might have been leaked to adversaries and they need to hand over control of devices to digital protectors who support them, which could make them feel even more vulnerable. Be ready to discuss your data handling practices, including the ways in which you encrypt the drive on which you are doing the detection and how you plan to handle and delete their data once the process is complete;
* Understand that many people working in civil society are aware of the risks they personally face, but are extremely concerned about family, friends, and sources whose data might have been leaked or who might be targeted
* Talk to people about any potential risks involved in the malware detection process (adversaries could find out about it, they might lose access to their devices, the process might not yield any satisfying results)
* Understand that technical knowledge, skill levels, and resources vary widely between people. One civil society group might find it easy to lock down devices and reduce the chances of malware infections, while others might struggle to even find devices which still receive software updates
* Be ready to explain how the same method of analysis can sometimes yield lots of data and sometimes very little, be able to manage expectations accordingly;
* Appreciate that some civil society groups would like to sign an NDA or similar agreement prior to sharing much of their data or devices.

Note that the other subtopics in this learning path also contain advice on developing interpersonal skills in order to deliver thoughtful, harm-reducing support on this subject.

### Understand: Harm Reduction & Operational Security

By the time a malware sample has been shared with you, it is possible that harm has been caused to the targeted person. The malware might have captured data, and the targeted person may also be impacted by the psychosocial impact of being targeted or watched. It’s important to support the intended targeted person while, at the same time, avoiding causing harm to yourself during active interaction with malicious content.

Harm reduction for the targeted person should start with collecting some information on the actions they took and the circumstances in which they interacted with their devices. You might ask different sets of questions for people you know well, such as colleagues, versus beneficiaries whom you know less about. Some questions worth asking include: What is their threat model? Are they an anonymous blogger? A dissident in exile attempting to hide their location?

The answers to these questions will both help provide useful harm reduction support and aid in your investigations. As you progress in analysis and understanding of the malicious content, update the targeted person especially insofar as is relevant to harm reduction.

For operational security to protect yourself while working with malicious emails, complete [subtopic 3](https://infuse.quest/en/learning-path/1/module-3/) (Safe Handling of Links and Infrastructure) of the learning path on detecting, tracking, and investigating malicious infrastructure.

### Understand: Detection, Negative Findings, and Paranoia

Spyware is an extremely invasive attack against individuals, families, communities, and movements. Understand that the information and analysis - whether positive or negative - which you provide to a client may be extremely consequential and inform risk decisions which they take with their devices. As such, it is important to be clear about the true scope and significance of any detection work and determination which you provide to them.

Outside of highly controlled and monitored device environments, modern OS platforms remain difficult to fully assess for compromise and infections especially in case sophisticated zero-day attacks may be utilized. As such, you are never able to make a 100% definitive determination of the absence of malware on a device. You can only state that using the technique you have deployed, and with the skills you have, you were unable to find malware. This does not mean malware is absent, only that the tests used did not identify any.

At the same time, we know that paranoia is a common phenomenon in which the feeling of surveillance (warranted or not) is a persistent negative mental experience for public-facing activists, journalists, leaders, or other clients you may be working with. It is necessary to walk a fine line in determining a balance between providing useful technical evidence to update on the odds and probabilities that surveillance is occuring, while neither stoking a sense of false confidence nor an unfounded fear of personalized surveillance.

### Triage the situation as well as the device

Triage is the necessary step in which you gather information and use it to decide when to invest time in further investigation. While effective triage relies on technical knowledge and instincts, it also requires interpersonal skills to empathetically engage a client, take their concerns seriously, listen actively, and understand the situation they are in.

During initial conversations, seek to ascertain:

* Is there a particular reason they want their device checked, or is it a general fear, curiosity, suspicion, or act of prudence?
* Specific reasons and explanations will help you target your search, for instance:

  * Change in device performance
  * A physical incident, such as a device being handled by someone else, or being seized and returned by law enforcement
  * A digital incident, such as software or an application being installed, or a suspicious link being clicked
  * A warning, indicator, or security alert

There are many alternative explanations for device misperformance, such as old or faulty hardware, software bugs, lack of updates, undesirable configurations. Of course, malware infection and compromise can also exist alongside these explanations. So finding misconfigurations, noting out of date software or low device resources is not sufficient to reject the malware hypothesis.

Use a combination of interpersonal questioning and interaction with your client as well as access to the device (where possible and appropriate) to determine when detailed follow-up is necessary. And when it is not possible for you to conduct investigations yourself either due to your own limited time, resources, and ability, it is always desirable to share resources which will allow your contact to take steps to investigate and secure their devices themselves.

The exact setup you need depends on your analysis method and the operating system of the malware you’re analyzing. In most cases you can start with a pre-build linux VM like [REMnux](https://remnux.org/). See [Chapter 6 of the Field Guide to Incident Response for Civil Society and Media](https://internews.org/resource/field-guide-to-incident-response-for-civil-society-and-media/) for step-by-step instructions on how to configure it. For specific things (for example, dynamic analysis of iOS malware) you will need additional tools (for example, a jailbroken iPhone or iPad). VMs occasionally have vulnerabilities that allow software running in the VM to attack the host operating system. Most malware doesn’t even come close to this level of sophistication, but if in doubt, it’s safest to analyze malware on a separate physical device that is wiped afterwards.

To set up REMnux, we recommend that you follow the steps outlined in [Chapter 6 of the Field Guide to Incident Response for Civil Society and Media](https://internews.org/resource/field-guide-to-incident-response-for-civil-society-and-media/) and [download the VM](https://docs.remnux.org/install-distro/get-virtual-appliance)[^1]. This is an easy way to start which provides excellent isolation between your host system and the REMnux environment. Be careful not to share sensitive data from your host OS into the VM. Per the instructions linked above, take a snapshot of your VM once it’s been set up, and before you start working on any malware. You can use snapshots to return your VM to a known-good state before analyzing different pieces of malware and to isolate different clients from each other. For more information on VM snapshots in general, see [this article](https://www.nakivo.com/blog/vm-snapshot-vs-backup/).

While performing malware analysis, you may find that you want additional tools in your analysis VM. Go ahead and install and configure them, but note what you did. After you’re done with your analysis, you can load up your “clean” VM snapshot, install and configure the tool, and then make a new “clean” snapshot for your next malware analysis adventure.

In order to move malware files around, the standard practice is to put them in encrypted ZIP files. In this case, the encryption quality doesn’t matter. The point is not to keep the malware secret, so much as to prevent inadvertently unleashing it on other systems and to prevent anti-malware systems from detecting or deleting it. Feel free to include the password in the ZIP file name.

## Practice

Reflect on and answer/discuss the following with peers, colleagues, friends, or a mentor. If available and if appropriate, talk to a ‘client’ you have worked with before to ask their input and experiences on some of these questions.

* Describe how touching and gaining access to someone's device might present unforeseen risks.
* Imagine you are assisting someone with sensitive data on their device. How would you approach a discussion with this person regarding your access and data handling?
* Why is it impossible to say that a device is free from malware?
* How does understanding a person’s specific threat model impact your harm-reduction efforts, for instance if they are an anonymous blogger or dissident in exile?
* How do you navigate providing factual technical evidence according to your ability, while balancing the need not to provide false confidence while also not fostering paranoia?
* Describe your own abilities and limitations in conducting malware detection work. After making a first attempt at this description, attempt to add further nuance and accuracy to your description.
  * What might be the risks if you proceed without this recognition of your limitations?
* Roleplay an interaction in which you report to a client on finding active malware on a device.

## Skill check

With a Mentor or Peer

* Explain to your mentor/peer or peer group your responses to the above Practice questions.
* Role play some of the interactions described in the above Practice questions:

  * Initial discussion with a client
  * Discussing their threat model
  * Describing a negative finding (no malware) including an explanation of the limitations of the assessment
  * Informing of a positive finding (malware found)
* If available, have someone watch your actual interactions and incident response process with a client and provide feedback on how you navigate the interpersonal elements of the interaction

## Learning Resources

{{% resource title="Security Education 101" languages="English" cost="Free" description="A popular community resource on how to teach and talk about digital security" url="https://www.securityeducationcompanion.org/articles" %}}

## Notes

[^1]: REMnux is not available on ARM processors such as Apple Silicon computers. While it is possible to virtualize across CPU architectures using emulators such as QEMU or UTM (VirtualBox does not currently support ARM architectures), performance will be slow and is not advised. It would make more sense to select another Linux distribution which supports your hardware and install the necessary software packages to complete the activities, if they did not already come with the operating system. Kali Linux is a popular Linux distribution which will include or support many tools also found in REMnux. If you have an Apple Silicon device, you can use UTM (https://mac.getutm.app/) to run the Apple Silicon (ARM64) Kali Installer image. Walkthrough guides are available from both UTM and Kali. At the time of writing, a bug affecting the installer process requires an additional step during installation of attaching a virtual serial terminal display – both walkthroughs describe this process. You can also obtain an ARM version of Kali for the Raspberry Pi, with most models of Raspberry Pi supported.
