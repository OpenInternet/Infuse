---
style: module
title: Static analysis
description: Static analysis is the process of disassembling a binary file in
  order to understand what’s inside it. It’s quite labor-intensive and requires
  software engineering knowledge.
weight: 4
---

## Use Case

Static analysis is the process of disassembling a binary file in order to understand what’s inside it. It’s quite labor-intensive and requires software engineering knowledge. For this reason, most analysts will prefer to do dynamic analysis (which we focus on in Subtopic 3) instead. There are several reasons you might want to do static analysis, including when dynamic analysis isn’t yielding good results or if you do not want a potential adversary to know that you are in possession of and analyzing the file.

This subtopic looks at a very advanced skill and the guides it links to will take considerable time to complete. If you do not currently have the time to focus on it and instead want to figure out what to do with the results of dynamic analysis, skip to Subtopic 5.

## Objectives

After completing this subtopic, practitioners should be able to do the following:

- Understand in what cases static analysis might be more appropriate than dynamic analysis
- Be able to conduct basic static analysis in Windows or Android using off-the-shelf tools

---
## Main Section
Static analysis is the process of determining information about a piece of malware without running it. Technically, the basic file analysis you performed above is a form of static analysis. However, generally we refer to malware static analysis as learning about the actions that the malware will perform. This generally involves taking a compiled binary program, decompiling it, and then reading the resulting code. An alternative is dynamic analysis, when you run the malware and then observe its behavior.

Static analysis has some advantages over dynamic analysis. First off, since you don’t run the malware, you are less likely to be infected (and there are rare cases of malware which can escape a virtual machine or sandbox). Also, if you don’t run the malware, you’re unlikely to alert the threat actors that their malware has been discovered. Additionally, sophisticated malware may attempt to discover if it’s being analyzed when it’s run. If it determines that it’s being analyzed, it may change its behavior, leading to possible incorrect analysis.

On the other hand, static analysis can be very time-consuming and difficult, and malware authors can use a variety of obfuscation techniques (such as encryption, packing, and dynamically downloading later stages) to make static analysis more difficult.

While much of the focus in this learning path is on static analysis of compiled binary programs, bear in mind that much malware is easier to analyze, being written in HTML/JavaScript, shell scripting languages, etc.

### Windows

To start off in Windows static analysis, we will set aside REMnux and go through a set of tutorials on Windows malware reverse engineering. This tutorial does include a bit of dynamic analysis, but is heavily focused on static analysis. For consistency, you should go through the exercises outlined below. Remember that, if you find any tools that you like that aren’t part of REMnux, you can add them to your REMnux VM. (You can also start over at any time with a blank VM, if you want.)

{{% resource title="Windows malware reverse engineering 101" languages="English" cost="Free" description="Comprehensive courses on reverse engineering Windows malware." url="https://malwareunicorn.org/workshops/re101.html" %}}

{{% resource title="Windows malware reverse engineering 102" languages="English" cost="Free" description="Comprehensive courses on reverse engineering Windows malware." url="https://malwareunicorn.org/workshops/re102.html" %}}

{{% resource title="OpenSecurityTraining2 courses" languages="English" cost="Free, paid with instructor support" description="Courses on low-level system architecture and reversing." url="https://p.ost2.fyi/courses" %}}

{{% resource title="OpenSecurity’s learning path for malware analysis" languages="English" cost="Free" description="Learning path for malware analysis." url="https://opensecuritytraining.info/Malware%20Analysis.html" %}}

{{% resource title="Windows reversing using x64dbg" languages="Spanish" cost="Free" description="Video series on using x64dbg for reversing Windows malware." url="https://www.youtube.com/watch?v=Af5pvCl0CBE&list=PLn__CHOEZR1Ymxi2n4Q9G9I9kBYr6B4Ft" %}}

### Android

While Windows software is typically written in x86 or x64 assembler, binaries on Android typically target a virtual machine called the Android Runtime (ART), which is similar to the Java Virtual Machine. This ART bytecode can usually be automatically reversed into Java, as opposed to x86/x64 bytecode, which typically can only be machine-reversed into assembly. Before you get too excited, note that there are many obfuscation tools that can easily render the reverse-engineered Java code nearly unreadable, and also Android does support native code via the [NDK library](https://developer.android.com/ndk/guides). Note that most Android devices have ARM based architectures, not x86/x64, so you will need to learn ARM assembler to reverse-engineer most Android native code you’re likely to find.

You may also encounter the Kotlin programming language when learning about Android. Both Kotlin and Java compile to the same bytecode, and are very similar at a low-level. When performing static analysis on an Android application, the original programming language should not be significant. We recommend focusing on Java, because the decompilers available turn ART into Java, not Kotlin.

As with the Windows static analysis section this section on Android static analysis is anchored to an excellent and comprehensive, but not gentle, course. You will likely need to do additional studying in order to understand the material in the primary course.

{{% resource title="Android App Reverse Engineering 101" languages="English" cost="Free" description="Comprehensive course on reverse engineering Android applications." url="https://www.ragingrock.com/AndroidAppRE/" %}}

{{% resource title="How to statically analyze a suspicious Android app" languages="English" cost="Free" description="Intermediate introduction to static analysis of Android apps." url="https://pts-project.org/guides/g5/" %}}

{{% resource title="Codecademy’s Learn Java course" languages="English" cost="Free" description="Basic introduction to Java programming." url="https://www.codecademy.com/enrolled/courses/learn-java" %}}

{{% resource title="Build Your First Android App in Java" languages="English, Chinese, Indonesian, Japanese, Korean, Portuguese, Spanish" cost="Free" description="Basic course on building Android apps using Java." url="https://developer.android.com/codelabs/build-your-first-android-app" %}}


## Skill Check

Sit down with a peer or a mentor who has significant experience in passive investigation against servers on the internet. Then:

- Complete the [Basic Malware RE](https://tryhackme.com/room/basicmalwarere) (free) exercises on TryHackMe
- (Android only) Complete the exercises in [Android App Reverse Engineering 101](https://www.ragingrock.com/AndroidAppRE/)
- (Windows only) At this point, you should be somewhat familiar with disassembling Windows binaries, reading x86 assembly, and using that knowledge to understand what a program does. Go back to your REMnux VM and analyze the Windows malware you downloaded earlier. Feel free to go back over the above training material and do supplemental research as you do so!
