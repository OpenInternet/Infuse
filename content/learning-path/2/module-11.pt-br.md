+++
style = "module"
weight = 11
title = "Clean-up, after-care, post-incident risk management, and information sharing"
description = "Removing malware and supporting people post-infection can prove challenging. We look at some of the best ways to do so"
+++

## Use Case

If malware or malicious traffic is found on a targeted person’s device, we need to either provide remedial after-care or targeted recommendations to allow a client to determine appropriate next steps.

## Objectives

After completing this subtopic, practitioners should be able to do the following:

- Determine the appropriate clean-up method for the type of malware or indicator of compromise discovered
- Carry out or guide on remedial clean-up steps, including removal of persistence mechanisms, malware removal tools, reboots, factory resets
- Identify situations in which clean-up may not be possible and further advice or action may be necessary
- Document and share findings

---

## Main Section

### Re-enabling operating system security features

Earlier in this learning path we mentioned [some built-in operating system protections](/en/learning-path/2/module-4/#triagechecklists-to-check-for-missing-protections). If malware was able to run on a targeted person’s system just because some of those protections were disabled, then re-enabling them may help prevent malware from executing or doing any further damage. Some less sophisticated pieces of malware could therefore stop running or even be removed just by going into operating system settings and re-enabling protections. In case you are unable to re-enable these protections or if they are disabled again after some time, this is an indication that the malicious process is preventing the proper functioning of the operating system and further clean-up work or factory reset are required. Do note that in some instances you may find instances that OS protections have been disabled in order to install pirated software, which the user may not immediately communicate to you. It is helpful to know this scenario and to guide the client in risk-management decisions and find safer alternatives which preserve operating system integrity.

### Factory resets

Factory resets are often the simplest, cleanest way to clear up malware on a given device. If the user has backed up all data they want to keep in a cloud location or a backup drive and is able to reinstall their most-used applications after a factory reset, this is a preferable option for dealing with malware. If they are not certain of having backed up important data, you might assist them in completing a local or cloud backup. Note that malicious files may be found in backed up files (though they would be inert until executed), thus scanning backup folders with a reputable antivirus engine is advisable. Note that oftentimes application and other device configurations are not backed up, depending on the backup utility used. It’s always a good idea to test backups, for example by trying to restore the whole system or some key files from them, before doing a factory reset.

Many malware analysts prefer to use factory resets over other types of removal, since this gives them a far greater certainty that no traces of the malware remained on the targeted person’s systems. There always remains the risk that antivirus programs or operating systems’ built-in protections will not remove all malware, especially if it’s novel or rare; a factory reset will be far more effective at this. The only exception to this might be UEFI rootkits and malware which affects the device’s firmware rather than operating system; we’ve linked to some articles about this below.

### Malware removal (and when it is not possible)

Sometimes a factory reset is not feasible due to time constraints, technology constraints, or user comfort with the action. Depending on the nature of the malware, and how well understood it is, it may be feasible to remove it through automated or manual means. See the list of platform-specific advice below for general guidance.

In some cases, malware removal efforts may be ineffective. Built-in Android malware or cracked or jailbroken versions of an operating system are one example (see Android section below for more details). Hardware/firmware attacks are another class of malware which would be resistant to clean-up or factory reset efforts. These are relatively rare however they do occur, mainly only on PCs (Windows/Linux), thus are worth knowing about. Some are detectable by antiviruses, for instance see [ESET on the topic of a UEFI Rootkit discovered in the wild in 2018](https://www.eset.com/int/uefi-rootkit-cyber-attack-discovered/). Additional tips and advice from Microsoft on UEFI rootkit threat hunting is available from [BleepingComputer here](https://www.bleepingcomputer.com/news/security/microsoft-shares-guidance-to-detect-blacklotus-uefi-bootkit-attacks/).

### Platform-Specific Advice

#### Android

- Factory reset is available from the Settings menu or from recovery boot mode.
- Some malware/adware/spyware is embedded within the factory-provided Android operating system, as in the case of some low-cost and off-brand Android devices. An example of this is detailed in the technical report by [HUMAN Security on the BADBOX ad fraud botnet](https://www.humansecurity.com/hubfs/HUMAN_Report_BADBOX-and-PEACHPIT.pdf). Unfortunately, in most cases these devices cannot be cleaned by factory reset and are unredeemable by the average user and should be replaced with reputable brand devices, alas at a higher price point.
- Check if unprotected app sources were enabled by checking if any apps were granted permission to install APKs from ‘Unknown Sources’ in the Settings section. If yes, look for suspicious/unknown applications.
- Suspicious or malicious applications can be removed.
- Secure any Google accounts used to access the device.
- Ensure Google Play Protect is enabled and check scan results (from Google Play -> Menu -> Play Protect).
- Ensure that system components are up to date and security updates are installed. You can check the date of the device's security updates by looking in Settings -> About Phone -> Software Information (or Android Version) -> Android Security Patch Level. Check for updates by tapping on Google Play System Update. Note that older devices may receive limited security updates.

#### iOS/iPadOS

- Published research indicates that exploits against iOS live systems (including cases such as Pegasus) do not survive a device reboot (not a factory restart, but a simple power cycling on/off), so conducting a reboot is a good idea. As the threat actor may re-infect the device if using a zero-click exploit, regular rebooting is possibly prudent, as is Lockdown Mode, linked below. Keep in mind that this level of attack is still rare and high-cost. Note that maliciously configured or installed applications (e.g. stalkerware, find my phone functionality) or a compromised Apple ID account would still affect the device safety, so read on for further actions below.
- Uninstall suspicious or malicious apps.
- Consider enabling [Lockdown Mode](https://support.apple.com/en-us/105120).
- Ensure Apple iCloud account is private and not accessed by any other person. Any iOS user can use [Apple’s Safety Check](https://support.apple.com/guide/personal-safety/how-safety-check-works-ips2aad835e1/1.0/web/1.0) to audit whether others have access to any of their accounts.
- Check if the device is jailbroken. [Some advice provided](https://www.certosoftware.com/insights/how-to-tell-if-your-iphone-is-jailbroken/) by Certo Software includes checking for Cydia or Sileo or to utilize their free Certo Mobile Security app.
- Check for (unwanted) enrollment in Mobile Device Management (check under Settings -> General -> Profiles).
- Conduct a factory reset following [this guide](https://support.apple.com/en-gb/HT201274) (This will remove all photos, messages, and files on the phone. Unless backed up, they will be irretrievably lost).

#### Windows

- Factory reset is the preferable solution. Most devices which were purchased with Windows preinstalled will have a recovery partition from which you can perform a factory reset or a ‘refresh’ of the Operating System
- Running Antivirus in Windows ‘Safe Mode’ can be more effective at quarantining discovered infections. However, it may also miss ‘fileless’ malware which is in effect during normal OS operation.
- Check for persistence mechanisms of malware using SysInternals AutoRuns, disable them and confirm after cleanup activities that they have not-enabled.
- Some Antivirus creators provide a ‘rescue disk’ which allows you to boot into a temporary live system from which to carry out scans and malware removal activities. A list of reputable options is [provided here by TechRadar](https://www.techradar.com/best/best-antivirus-rescue-disk).
- Beware the many Windows ‘malware removal’ guides found online which appear to be customized for specific malware variants. Many of them are generic guides promoting the use of a proprietary tool which may itself be an unwanted software.

#### MacOS

- Factory reset is advisable, see [instructions from Apple here](https://support.apple.com/en-ug/HT212749).
- Commercial antivirus will have a clean-up and quarantine feature.
- Utilize [Objective-See tools ](https://objective-see.org/tools.html)such as Knock Knock and Kext Viewer to check for and disable unknown and persistent processes and kernel extensions.

### Post-Incident Risk Management and Information Sharing

Sharing your findings with your client and working with them to understand how malware infection may have occurred is an important step which allows them to update their risk management approach and understand the significance (or lack of significance) of the security incident.

Take as many detailed technical notes, screenshots, and samples (or, more likely, hashes thereof) and talk to your client about their threat model and to what degree you could share your findings with the wider community. Sharing your findings is particularly valuable if you found a novel threat or one that targets community members specifically based on certain work that they do; in this case, talking to others about malware hashes, infection vectors, and mitigation mechanisms will help protect those at highest risk from it. You can use some of the information from the [Documenting Findings](/en/learning-path/1/module-8/) section of the _Detecting, Investigating and Tracking Malicious Infrastructure_ learning path when authoring a brief report and when you consider disseminating it.

## Skill Check

Build either a flowchart or a checklist which could assist you in removing malware from a device and ensuring that you do not miss any steps. Discuss this flowchart or checklist with a peer or mentor to make sure that it’s accurate and you didn’t miss anything.

Write a brief paragraph explaining in what situations you would recommend that persons who were targeted by a successful malware infection change passwords to their main accounts (email, iCloud, social media, work) afterwards and how you would explain this to a person you are supporting. Run this paragraph by a peer or mentor who will check if your explanation is accurate.

## Learning Resources

{{% resource title="UEFI rootkit cyber attack discovered" languages="English" cost="Free" description="Analysis of a UEFI rootkit malware discovered in 2018, designed to persist even after OS reinstall." url="https://www.eset.com/int/uefi-rootkit-cyber-attack-discovered/" %}}

{{% resource title="Microsoft shares guidance to detect BlackLotus UEFI bootkit attacks" languages="English" cost="Free" description="Overview of the BlackLotus UEFI bootkit malware and steps to detect it, provided by Microsoft." url="https://www.bleepingcomputer.com/news/security/microsoft-shares-guidance-to-detect-blacklotus-uefi-bootkit-attacks/" %}}

{{% resource title="Trojans All the Way Down: BADBOX and PEACHPIT" languages="English" cost="Free" description="In-depth report on BADBOX and PEACHPIT, malware pre-installed at factories, emphasizing the importance of devices from reputable manufacturers." url="https://www.humansecurity.com/hubfs/HUMAN_Report_BADBOX-and-PEACHPIT.pdf" %}}

{{% resource title="How Safety Check on iPhone works to keep you safe" languages="English" cost="Free" description="Explanation of the iPhone Safety Check feature, allowing users to review and control shared information." url="https://support.apple.com/guide/personal-safety/how-safety-check-works-ips2aad835e1/1.0/web/1.0" %}}

{{% resource title="How to tell if your iPhone is jailbroken" languages="English" cost="Free" description="Guide to detecting whether an iOS device has been jailbroken using initial heuristics." url="https://www.certosoftware.com/insights/how-to-tell-if-your-iphone-is-jailbroken/" %}}

{{% resource title="How to factory reset your iPhone, iPad or iPod touch" languages="English" cost="Free" description="Guide on how to completely wipe an iOS device, ensuring removal of malware or malicious profiles." url="https://support.apple.com/en-gb/HT201274" %}}

{{% resource title="Best antivirus rescue disks of 2024" languages="English" cost="Free" description="List of tools for scanning and cleaning infected operating systems using external bootable drives." url="https://www.techradar.com/best/best-antivirus-rescue-disk" %}}

{{% resource title="Erase your Mac and reset it to factory settings" languages="English" cost="Free" description="Guide on how to completely wipe a macOS device to remove malware or malicious profiles." url="https://support.apple.com/en-ug/102664" %}}

{{% resource title="Objective-See Tools" languages="English" cost="Free" description="Collection of security tools for macOS developed by a reputable security researcher, used for detecting malware." url="https://objective-see.org/tools.html" %}}