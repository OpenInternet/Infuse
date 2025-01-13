---
style: module
title: OPSEC prerequisites for detecting malware
weight: 2
description: When you set up your malware detection environment, it's a good idea to create some rules and processes to reduce the risk of any security breaches
---

## Use Case

Before you start analyzing any malware, you need to set up a safe environment to do so. Definitionally, malware does bad things to the systems it runs on. You do not want to run it on your primary system. Additionally, you likely will want to prevent the malware from actually making connections to the threat actor’s C&C (command and control) servers. Both of these mean that you should set up a virtual machine to use when performing malware analysis.

## Objectives

After completing this subtopic, the practitioner should be able to ensure the confidentiality and integrity of data, which includes:

- Encryption during storage and transfer
- Doing checksums after data acquisitions
- Not using devices suspected of being compromised
- Using air-gapped environments
- Ensuring security of the devices and servers used in the process
- Threat modeling and risk assessment
- Conducting backups and disk imaging

---
## Main Section
Operational security for detecting malware can be divided into concerns related to specific scenarios:

- Directly interacting with a device of unknown status
- Using a separate ‘good’ device to interact with a device of unknown status
- Interacting with files or links of unknown status

### Using a device of unknown status

In many cases you will be handed a device and asked to inspect it for malware (or you may need to do this to your own device).

Be aware that in case the device is compromised, your activities may be monitored, which may impact risk and safety for your client. Any keystrokes including access to online accounts or communications may be captured. External storage devices such as hard drives or USB flash drives may become targets for transfer of malicious code, and any network connections may be used to further spread or exfiltrate malicious code.

Note as well that introducing analysis tools can trigger a ‘kill switch’ on some malware which has been designed to evade detection and analysis. In such cases, capturing a disk image and other forensic records may be necessary for further analysis. This is not covered in this learning path but is covered in [Analyzing Malware](/en/learning-path/3/).

### Using a separate ‘good’ device during the malware detection process

If you suspect that a device is infected with malware, you should do as little as possible with it until you learn more about its status. For this reason, you should always use a device where you do not suspect any malware infections to handle any sensitive information.

If, for example, a person you are supporting suspects that their laptop or desktop might have been compromised, ask them to just use their mobile phone to communicate with you. It’s usually a good idea to shut down the potentially compromised laptop or desktop or at least disconnect it from the internet. If your beneficiary has tied their Signal, WhatsApp, and other accounts to the potentially compromised device, it might be a good idea to unlink those (doing so from a device that you do not suspect to be compromised) while the detection process is ongoing.

### Interacting with files or links of unknown status

When going through the malware detection process, you might encounter links or files (either ordinary files or executable files) you are unsure about and which you suspect might be delivering malware payloads. If you are copying those links or files from a potentially compromised device to an analysis device, there’s always a risk that they could also infect your analysis device. In order to reduce the chances of this happening, we recommend:

- Using a virtual machine on your analysis device and only opening the files there. This way, even if you open a malicious link or file and it infects your system, the damage will be contained to your virtual machine
- Using web-based services and sandboxes (we will cover them more later on in this learning path)
- Defanging all URLs (see the relevant section under Subtopic 3 in the malicious infrastructure learning path)
- Storing all potentially suspicious files in compressed and password protected folders. This prevents them from being opened by accident or scanned by operating system tools when they, for example, index folders. The password does not need to be complex; it can literally be “ABC.” All it needs to do is prevent automated or accidental opens of the file.

For a deeper look at the topic, review the guide by Defensive Lab Agency on how to [handle a potentially compromised device](https://pts-project.org/guides/g6/), in particular:

- Isolating Android and iOS devices
- Procedures for physically sending and receiving compromised devices for analysis in case you are working with (or yourself serving as) a remote technical analysis team
- Introductory tips on chain of custody during device analysis

This last term on chain of custody refers to best practice in digital forensics and incident response to record the handling of a device in order to preserve evidence and allow evidence collected to be used in any potential legal proceedings. The linked article provides a good introduction to general-purpose best practices you can follow in case you are in a position to be handling evidence which might be used in a scenario with a higher burden of proof on evidence.

## Practice

Set up a VM running REmnux, with [the steps outlined in the Field Guide to incident response for civil society and media (chapter 6, starting on page 30).](https://internews.org/resource/field-guide-to-incident-response-for-civil-society-and-media/)

## Skill Check

After you have set up your REmnux VM, install and then connect to a reputable VPN. Make sure that your main system is either not connected to a VPN or to a different server than your REmnux instance. Ask your peer or mentor to send you a web bug canary token which will be opened just in REmnux, through a web browser of your choice. (If you are not yet familiar with canary tokens, [check out this guide](https://internews.org/resource/guide-to-facilitating-a-technical-simulation-with-canary-tokens/) we created on how you could use them in security trainings.)

Which IP address did it trigger? What user agent?

Talk to your peer / mentor about what data stays on your VM and what doesn’t. If you ran a piece of malware in your VM which contacted a server, would this go through your VPN or home/ office network connection?

## Learning Resources

{{% resource title="Intermediate guide - How to handle a potentially compromised device" languages="English" cost="Free" description="A step-by-step guide on how to handle devices with iOS or Android which you suspect might have malware on them prior to starting detection work" url="https://pts-project.org/guides/g6/" %}}

{{% resource title="Virtual machine chapter of the Field Guide to incident response for civil society and media (chapter 6)" languages="English" cost="Free" description="An introductory overview of how malware analysts can start working with virtual machines and an installation of the Linux distribution" url="https://internews.org/resource/field-guide-to-incident-response-for-civil-society-and-media/" %}}

{{% resource title="Technical simulation with canary tokens" languages="English" cost="Free" description="A guide on how to use canary tokens, an offensive security tool, to simulate malware trackers. Can be very useful in teaching defenders what data can be easily exfiltrated" url="https://internews.org/resource/guide-to-facilitating-a-technical-simulation-with-canary-tokens/" %}}