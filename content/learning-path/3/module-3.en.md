+++
style = "module"
weight = 3
title = "Sandboxes and dynamic analysis"
description = "Dynamic analysis is the process of running a piece of malware and observing what it does. The easiest way of doing this is by running a piece of software in a safe, isolated environment called a sandbox."
+++

## Use Case

Dynamic analysis is the process of running a piece of malware and observing what it does. The easiest way of doing dynamic analysis is by running a piece of software in a sandbox. A sandbox is a safe, isolated environment which opens a potentially malicious file, URL, or program and generates a huge amount of data on it. This subtopic looks at sandbox analysis, what it can and cannot do, and how to do it.

## Objectives

After completing this subtopic, practitioners should be able to do the following:

- Understand the use case for and limitations of dynamic analysis
- Understand the advantages and limitations of sandboxes
- Open a suspicious file, URL, or program in a sandbox
- Be able to perform some basic dynamic analysis on either Windows or Android binaries using off-the-shelf tools

---
## Main Section
### Dynamic analysis

When you conduct dynamic analysis on a potentially suspicious file, you will open and execute the file in a specialized tool and observe what this file does, whether it tries to access other files, if it makes network connections, and the like. Static analysis, outlined in subtopic 4, on the other hand, disassembles the file rather than opening or executing it.

Depending on the situation, dynamic analysis can be easier or harder than static analysis, and it can also be more or less accurate. In practice, a combination of static and dynamic analysis will likely produce the best results. Most dynamic analysis will also involve some static analysis, so the line between the two techniques is often blurred.

The general setup for dynamic analysis includes a sandbox in which the malware is run, a debugger to control and monitor program execution, system monitoring to watch for changes to the sandbox system’s state, and something to mediate internet access to block, observe, and/or modify network traffic. These might all exist on one system, or they might be separate virtual or physical devices. For example, you may use a jailbroken iPhone as your sandbox, one tool for remote debugging and system monitoring, and another tool for internet mediation. Not all systems may be used in every situation, for example you might just capture network traffic and monitor system changes without using a debugger.

There are many different methods in which we could conduct dynamic analysis, including by opening up the executable in a sandbox and checking the network connections it makes. For a great resource on detecting malware through the network traffic it generates, check out [this guide](https://malware-traffic-analysis.net/).

In theory, dynamic analysis could tip off a threat actor that you are analyzing their malware. In practice, adversaries often expect their malware to be analyzed and it is very rare to encounter completely novel malware in your career. With the exception of some very sensitive cases, we would not worry about this risk.

### Sandboxes

A (malware) sandbox is a safe environment in which you can open and run a file or an URL. It is essentially a custom-designed virtual machine that is launched before the file or URL is opened, and is then shut down after a certain amount of time.

All the activities in the sandbox, such as files that are opened or created as well as network connections made, are recorded and accessible through an activity report. The activity report can help you understand whether the file or URL was malicious. It can also help you link malware to previously seen activities, for example based on specific network connections or files that are created.

Running known malware inside a sandbox can also be very helpful as you are learning more about malware. It helps you understand what malware does and what changes it makes on the system. For example, a lot of malware when initially run tries to ensure persistence so that it will still run following a reboot. These persistence methods are something you can look for when you perform manual forensics on a possible infected device.

A lot of malware has anti-sandbox features built in: when the malware detects it is running inside a sandbox environment, it will terminate or sometimes do something harmless to confuse the analysis. Moreover, some malware is designed to only run if specific conditions are met, for example a specific version of the operating system, or an IP address located in a specific country. Sandboxes are often updated to respond to anti-sandbox methods and many sandboxes let you choose the certain properties.

This is important to keep in mind when reading a sandbox report: a lack of malicious activity doesn’t automatically mean the file or URL isn’t malicious. On the other hand, if malicious activity was shown, you can be certain that the file or URL was malicious.

Check out [Chapter 10 of the Field Guide to incident response for civil society and media](https://internews.org/resource/field-guide-to-incident-response-for-civil-society-and-media/) for a more in-depth introduction to sandboxes.

It is possible to run a sandbox locally. [Cuckoo](https://cuckoosandbox.org/) is an open source sandbox that has been around for many years. A [new version](https://github.com/cert-ee/cuckoo3) is being developed but is not yet recommended for production use at the time of writing (July 2024).

While running a sandbox locally gives you full control of the environment and means you can keep your files and URLs fully private, it can be quite a lot of work to set up and maintain. Thankfully, there are many online sandboxes available, such as [ANY.RUN](https://any.run/), [Hybrid Analysis](https://www.hybrid-analysis.com/), [Joe Sandbox](https://www.joesandbox.com/), [Triage](https://tria.ge/) and even an online version of [Cuckoo](https://cuckoo.cert.ee/). All of them have free versions that allow you to upload malware and URLs, though some do require registration. Do keep in mind that if you use a free version, anything you run inside a sandbox will be publicly available. This can be a concern if you don’t want to tip off an adversary or are dealing with very private data, such as potentially infected confidential documents.

### Dynamic analysis of Windows binaries

We recommend starting out with an overview class, this time from [OpenSecurityTraining](https://opensecuritytraining.info/Training.html). Their [Malware Dynamic Analysis](https://opensecuritytraining.info/MalwareDynamicAnalysis.html) class includes slides, lab materials, and videos, and it covers setup, analysis, and creating IoCs.

### Dynamic analysis of Android binaries

Many tools can be used to dynamically analyze Android binaries. Those include some of the sandboxes outlined above and [Frida](https://frida.re/docs/android/) (check out [this tool](https://github.com/nccgroup/house) for a GUI frontend to Frida).

PiRogue Tool Suite (outlined in the detecting malware learning path) can also [do excellent dynamic analysis](https://pts-project.org/guides/g8/) of Android binaries, though some of those analysis methods require you to first root your device.

## Skill Check

### General

1. Go to the ‘Sandbox’ section in Chapter 10 of the [Field Guide to incident response for civil society and media](https://internews.org/resource/field-guide-to-incident-response-for-civil-society-and-media/) and do exercises 10.2 to 10.4. In the last exercise, make sure you run at least one macOS and Android malware sample each.
2. In the same chapter, skip to the ‘Analyzing links’ subsection and do exercise 10.12.

### Windows-specific

Perform dynamic analysis on a piece of non-malicious Windows software. It probably includes an installer, which will perform similar actions to malware. What files does it create? What registry keys does it create? What network traffic does it send?

## Learning Resources

{{% resource title="Chapter 10, Field Guide to incident response for civil society and media" languages="English" cost="Free" description="In-depth look at using sandboxes to analyze email payloads." url="https://internews.org/resource/field-guide-to-incident-response-for-civil-society-and-media/" %}}

{{% resource title="Any.run" languages="English" cost="Free only for non-commercial use" description="Commercial sandbox for analyzing malware." url="https://any.run/" %}}

{{% resource title="Joe Sandbox" languages="English" cost="Free for public accounts (results published on website)" description="Commercial sandbox service for malware analysis." url="https://www.joesandbox.com/#windows" %}}

{{% resource title="Cuckoo Sandbox" languages="English" cost="Free" description="Sandbox service by Estonian CERT for malware analysis." url="https://cuckoo.cert.ee/" %}}

{{% resource title="Hybrid Analysis" languages="English" cost="Free" description="Sandbox service by CrowdStrike mixing static and dynamic analysis." url="https://www.hybrid-analysis.com/" %}}

{{% resource title="Triage sandbox" languages="English" cost="Registration required" description="Community-driven sandbox for analyzing malware." url="https://tria.ge/" %}}

{{% resource title="Online class on malware dynamic analysis" languages="English" cost="Free" description="Three-day class on dynamic malware analysis." url="https://opensecuritytraining.info/MalwareDynamicAnalysis.html" %}}

{{% resource title="Case study 1: Dynamic Analysis of a Windows Malicious Self-Propagating Binary" languages="English" cost="Free" description="Blogpost demonstrating dynamic analysis of a Windows binary." url="https://www.keysight.com/blogs/tech/nwvs/2022/06/10/dynamic-analysis-of-a-windows-malicious-self-propagating-binary" %}}

{{% resource title="Case study 2: Configuring a Windows Domain to Dynamically Analyze an Obfuscated Lateral Movement Tool" languages="English" cost="Free" description="Case study on dynamic analysis of obfuscated malware in a Windows domain." url="https://www.real-sec.com/2020/07/configuring-a-windows-domain-to-dynamically-analyze-an-obfuscatedlateral-movement-tool/" %}}

{{% resource title="Case study 3: Starting dynamic analysis on a Windows x64 rootkit" languages="English" cost="Free" description="In-depth look at dynamic analysis of Windows rootkits." url="https://medium.com/@0x4ndr3/starting-dynamic-analysis-on-a-windows-x64-rootkit-8c7a74871fda" %}}

{{% resource title="Malware traffic analysis" languages="English" cost="Free" description="Guide on using captured network packets to analyze malware." url="https://malware-traffic-analysis.net/" %}}

{{% resource title="Hack The Box course on mobile penetration testing" languages="English" cost="Free" description="Introduction to mobile malware dynamic analysis." url="https://www.hackthebox.com/blog/intro-to-mobile-pentesting" %}}

{{% resource title="Hack The Box: Intro to Android Exploitation" languages="English" cost="Free" description="Exercises on mobile application penetration testing." url="https://app.hackthebox.com/tracks/Intro-to-Android-Exploitation" %}}

{{% resource title="Frida and House for Android" languages="English" cost="Free" description="Tools for dynamic monitoring and debugging of Android apps." url="https://frida.re/docs/android/" %}}

{{% resource title="House" languages="English" cost="Free" description="Interface to Frida for Android app analysis." url="https://github.com/nccgroup/house" %}}

{{% resource title="Advanced guide - How to use PiRogue to intercept the TLS traffic of a mobile app" languages="English" cost="Free" description="Instructions on using PiRogue Tool Suite for dynamic analysis of Android binaries." url="https://pts-project.org/guides/g8/" %}}