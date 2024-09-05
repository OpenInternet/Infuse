---
style: introduction
title: Introduction
description: Read the learning path overview, objectives, associated threats, and prerequisites
weight: 1
---

## Overview

This learning path will prepare you to start on the journey of analyzing malware. Note that this is one of the hardest areas of security to master, but incremental progress will give results. The general goal of malware analysis is to characterize new malware, both brand new malware and variants of existing ones. The desired end result is a characterization of the capabilities of the malware, a guess at what threat actor(s) is using it, and a set of IoCs (indicators of compromise) that will allow others to detect the malware.

A few things to keep in mind as you go through this learning path:

- Take the prerequisites seriously. You must have a solid base of knowledge to build on.
- This learning path covers two platforms (Windows, Android). It’s probably best to focus on one platform at once. Although the general concepts apply across all platforms, the specific techniques and tools can differ greatly. If you don’t have much reverse engineering and low-level debugging experience, we recommend getting started with Windows, because there are many more resources for Windows program analysis.
- Don’t be afraid to ask for help. Organizations like CiviCERT can help you connect with others who can collaborate with you in analyzing novel malware.

## Objective

Practitioners will learn how to:

- Set up a malware analysis environment
- Distinguish between different types of files
- Conduct basic dynamic analysis in a sandbox
- Conduct basic static analysis
- Write up findings and share indicators of compromise

## What threats does this skill mitigate or respond to?

Device compromises and data exfiltration through desktop and mobile malware

## What are the prerequisites?

This learning path is an advanced one. Prior to undertaking it, learners should:

- Complete the _Detecting Malware_ learning path, which covers the fundamentals of malware. Typically, you would only use the information you will learn below to perform further analysis on suspected malware that was not detected using existing IoCs, so this learning path can be viewed as a continuation of Detecting Malware.
- Complete the _[Investigating, Tracking, Detecting Malicious Infrastructure](/en/learning-path/1/) learning path_, which teaches fundamentals about DNS, email, and HTTP that you will need to understand malware behavior
- Based on both the platform and malware you’re analyzing, you are likely to need some programming and operating system knowledge. In addition to basic command line skills, you will need to know a bit about the programming languages and security architectures present on major operating systems. Examples may include C/C++ and x86 assembly for Windows, Java or Kotlin for Android, etc.
- (optional) Depending on the malware, you might also need to be able to read scripting languages such as Perl, PowerShell, bash, etc. The sections for each platform should include links to some resources to support this, but you may need to do research and study outside of the learning path depending on what you’re analyzing.

## What devices or software do you need for the exercises?

You will require a device which is powerful enough to run a virtual machine. We recommend using a machine with an x86 processor and at least 8GB of RAM.

You will require sufficient free disk space and bandwidth to be able to run and install a Linux virtual machine. While REMNux and Kali Linux are ideal, other distributions could also work, though they might require additional work with manually installing tools.

If you already have your own malware analysis virtual machine environment set up, you can use it. If not, we will guide you through the setup process in subtopic 1.

## Related learning paths

We strongly recommend treating the [Detecting Malware](/en/learning-path/2/) and [Detecting, Tracking, Investigating Malicious Infrastructure](/en/learning-path/1/) learning paths as prerequisites to this one.
Some malware is delivered as a web application or a browser exploit. Some of the skills covered in the [Web Security Fundamentals](/en/learning-path/4/) learning path will help you with web-based malware analysis.
