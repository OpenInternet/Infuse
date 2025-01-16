---
style: introduction
title: Introduction
description: Read the learning path overview, objectives, associated threats,
  and prerequisites
weight: 1
---

## Overview

This learning path covers intermediate-level knowledge and skills needed to detect and identify malware either from a given sample, or actively operating on a device on a variety of device platforms. The distinction between malware and software can be very subtle, and a detailed analysis of processes and binaries to ultimately determine what is malware sometimes requires advanced-level expertise. However, the skills covered here will give you a start in detection efforts. This learning path covers:

- Soft skills and ethical considerations for engaging with people potentially targeted by malware
- Protecting client’s’ privacy and data
- Off-the-shelf malware detection tools
- Static and dynamic methods of investigating a sample to determine if it is malicious
- Network-based methods of investigating a sample to determine if it is malicious
- Collecting data for analysis from a potentially infected device and safe retention of samples for further analysis
- What to do after malware discovery: Investigation, clean-up, and risk management
- Clean-up of malware from infected systems

## Background reading

📕 Adversaries, especially state-based ones, have long used malware to attack civil society groups. Such attacks managed to [shut down a news site](https://www.amnesty.org/en/latest/research/2016/12/how-a-hacking-campaign-helped-shut-down-an-award-winning-news-site/), with hacking-for-hire outfits taking in major state contracts, as shown in those pieces on India’s cyber mercenaries by [The New Yorker](https://www.newyorker.com/news/annals-of-crime/a-confession-exposes-indias-secret-hacking-industry), [Reuters](https://www.reuters.com/investigates/special-report/usa-hackers-litigation/), and [Citizen Lab](https://citizenlab.ca/2020/06/dark-basin-uncovering-a-massive-hack-for-hire-operation/).

In the early 2020s, commercially produced spyware such as [Predator ](https://eic.network/projects/predator-files.html)and [especially Pegasus](https://www.amnesty.org/en/latest/news/2022/03/the-pegasus-project-how-amnesty-tech-uncovered-the-spyware-scandal-new-video/) dominated the headlines, with both of them regularly targeting journalists, activists, and politicians. While most malware is much more mundane and used to deliver ads or mine for cryptocurrency, the existence of sophisticated, state-sponsored malware means that many civil society activists will likely be very concerned about any potential infections.

## Objective

Practitioners will learn how to:

- Practice soft skills and ethical considerations for engaging with people potentially targeted by malware
- Take steps to protect client’s privacy and data
- Usefully utilize off-the-shelf malware detection tools
- Utilize static and dynamic methods of investigating a sample to determine if it is malicious
- Utilize network-based methods of investigating a sample to determine if it is malicious
- Investigate Microsoft Office Documents to determine if they are potentially malicious
- Collect data for analysis from a potentially infected device and safely retain samples for further analysis
- Carry out post-detection work, including planning for investigation, clean-up, and risk management

## What threats does this skill mitigate or respond to?

Malware detection skills can help respond to:

- Device, website, account compromise
- Malware infections (ransomware, spyware, adware etc)
- Investigating possibility of compromise

## What are the prerequisites?

- Basic IT skills: Understanding concepts such as disk images, executable files, and different types of malware
- Understanding of common Operating System protection/hardening practices and ‘power-user’ usage of your chosen OS platform.
- Basic command line knowledge: Being able to run commands from the command line and understanding what command line arguments syntax are.

## What devices or software do you need for the exercises?

Depending on the scenario, you may be implementing detection steps directly on the concerned device, while in other cases you may need a separate machine configured for analysis, in which case the following is advised:

- First device (device of concern): At least one device running Windows, macOS, Linux, Android, or iOS on which you will look for malware
- Second device (analysis device): Another device running Windows, macOS, or Linux which you can use to run scans on the first device. Scanning iOS devices using the covered toolset is only possible (at time of writing) via macOS or Linux
- Enough storage space either on the second device or on an external hard drive/ solid state drive to back up the entirety of the first device (in case imaging and forensics are required)

(Optional) For a part of module 6 alone, you will need access to a Raspberry Pi.

## Related learning paths

Like all of security, this learning path benefits and is benefited by knowledge in related areas. Notably, the following learning paths synergize well with this one:

- [Analyzing Malware](/en/learning-path/3/): Taking malware apart to understand how it functions and what it does. In addition, this learning path contains beginner-to-intermediate approaches to static, dynamic, and network-based determination of whether a given sample is malicious; in cases such methods are not sufficient for a determination, additional analysis skills are covered in this subsequent learning path.
- [Detecting, Investigating and Tracking Malicious Infrastructure](/en/learning-path/1/): Targeted malware generally communicates with command & control, exfiltration, or delivery infrastructure. This learning path will help with investigating and understanding this infrastructure.
- [Web Application Security Fundamentals](/en/learning-path/4/): Some malware is delivered as a web application or a browser exploit. Some of the skills covered in this learning path will help you with browser-based malware detection and analysis.
