+++
style = "module"
weight = 5
title = "Forensic methods on live Windows and macOS systems"
+++

## Use Case

Direct inspection of a device can be necessary to understand what is happening on it and to identify suspicious processes, artifacts, or traffic. Go beyond scanning tools by using methods to take a deeper look at what is happening on a device.

## Objectives

After completing this subtopic, practitioners should be able to do the following:

- Understand ways of inspecting running processes and methods to sort out potentially suspicious processes
- Understand common persistence mechanisms and ways of checking for them
- Inspect network traffic for suspicious communications

---

Forensic methods require more knowledge about the internal operations of an operating system as well as developing an instinct for what is normal vs abnormal findings.

## Windows

The [Guide to Quick Forensics](https://pellaeon.gitbook.io/mobile-forensics/) provides a good introduction to forensic approaches to device inspection. The guide includes an introduction to the important suite of Sysinternals tools made available from Microsoft. Complete the guide sections on [Autoruns](https://pellaeon.gitbook.io/mobile-forensics/windows/autoruns), [Process Explorer](https://pellaeon.gitbook.io/mobile-forensics/windows/processes), and [TCPView](https://pellaeon.gitbook.io/mobile-forensics/windows/network).[^1]

After completing the guided activities, you should be able to:

- Understand what the [SysInternals suite](https://learn.microsoft.com/en-us/sysinternals/) is, and how to use some of the tools useful for forensic examination.
- Read and understand results from Sysinternals Autoruns tool and understand what are the different locations and methods for persistence (by understanding the different tabs displayed in the tool)
- Read and filter results from SysInternals Autoruns tools to identify only non-Microsoft, unsigned binaries, and how to check file hashes against VirusTotal
- Know how to read and understand results from Process Explorer, including how to check for running processes with unverified file signatures and how to check process hashes against VirusTotal.

Microsoft’s SysInternal tools are widely used and you will be able to find additional tutorials using them around the web, however the [Guide to Quick Forensics ](https://pellaeon.gitbook.io/mobile-forensics/)gives a good targeted introduction.

## MacOS

There are [some macOS tools](https://objective-see.org/tools.html) created by Objective-See which can help detect potentially suspicious activity on a system. Many of the Objective-See tools have an integrated VirusTotal search; this is a tool we will also mention more later on in this learning path. For a quick tutorial on VirusTotal, check out [chapter 7 of the field guide](https://internews.org/wp-content/uploads/2023/11/Field-Guide-to-Threat-Labs.pdf). We recommend that any learners who want to become more familiar with macOS look at the following tools:

- LuLu: a free and feature-rich firewall application for macOS. It can list all outgoing network connections, and, therefore, detect any attempts by malware to communicate with a server. Check out the whole [LuLu manual](https://objective-see.org/products/lulu.html), which shows how you can look up specific processes which try to make a network connection. If you are unsure about specific processes, you can also look it up on VirusTotal (LuLu has a built-in search) or search for it in your favorite search engine and see what others say about it.
- OverSight: A tool which alerts the user every time the microphone or webcam are enabled. If malware attempts to capture information through the microphone or camera, then the tool should alert a user or analyst thereof.
- KnockKnock and BlockBlock: Those two applications detect software which starts up when the user logs in to the system. It can therefore alert the user or analyst to malware which has persistence--or starts to run again on every restart. KnockKnock can provide a list of persistent software, while BlockBlock sends an alert every time a new persistent component is installed.
- KextViewer: A tool to review and inspect kernel extensions, packages which extend the core operating system code and run at the highest privilege level.

## Learning Resources

{{% resource title="Mobile forensics" languages="English" cost="Free" description="A comprehensive guide on how to conduct forensics and triage for many leading operating systems." url="https://pellaeon.gitbook.io/mobile-forensics/" %}}

{{% resource title="Sysinternals" languages="English" cost="Free" description="A series of excellent tools analysts can use to better understand what is happening on a Windows system." url="https://learn.microsoft.com/en-us/sysinternals/" %}}

{{% resource title="Objective-see tools" languages="English" cost="Free" description="Excellent security tools for macOS which can help detect malware infections or attempts to gather/ exfiltrate data." url="https://objective-see.org/tools.html" %}}

## Practice

### Windows and macOS

1. Open your operating system’s process manager and read through its outputs. Do you notice any processes which look out of place or which consume a weirdly high or low amount of resources? Note them down and search the web for them to learn more about them.
2. While tracking network connections as described in the Mobile Forensics Guide (articles for [Windows](https://pellaeon.gitbook.io/mobile-forensics/windows/network) and [macOS](https://pellaeon.gitbook.io/mobile-forensics/mac/network)), open one or two apps which connect to the internet and note which IP addresses they connect to. Is there anything surprising about any of those connections or IP addresses?
3. Look through startup items and separate them between those which come from your operating system vendor, those which come from other vendors. Look up three of them online to learn more about what they do. If you are working with a peer or mentor, discuss the findings with them.

### Android

Read through this guide: [Beginner guide - How to handle a potentially malicious mobile app - PiRogue tool suite (pts-project.org)](https://pts-project.org/guides/g3/)

## Skill Check

1. Download a recent piece of malware from Malware Bazaar. Upload it to a public sandbox (such as Triage) and check what it does on the system. \
   Write down your findings and then discuss them with a mentor or a peer who will make sure that you have performed the exercise correctly. \
   (Note: it may happen that the malware appears to ‘do nothing’. In that case, discuss this with a mentor and peer and try a different kind of malware.)
2. (Optional, additional exercise) Check out [this analysis](https://www.trendmicro.com/en_us/research/22/k/earth-preta-spear-phishing-governments-worldwide.html) from security company Trend Micro and compare it with [this report](https://tria.ge/240207-qlmmrahhgr/behavioral1) on Triage. Discuss those two with a mentor or peer, focusing on issues such as the ways in which both reports label TTPs and try to explain the malware. Talk about which format you find more readable and why. (Note: this malware, that Trend Micro calls ‘Earth Preta’, is also known as ‘Mustang Panda’, and has targeted media organizations and NGOs, most notably in Myanmar.)

## Notes

[^1]: Crowdstrike’s CrowdInspect tool is not actively maintained and may not have full functionality, thus we recommend focusing on the Microsoft tools referenced in the guide for this section. However you may still be able to obtain useful information using the tool and can gain similar types of insights as obtained from tools such as Process Explorer and TCPView
