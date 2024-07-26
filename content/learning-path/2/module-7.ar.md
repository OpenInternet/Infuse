+++
style = "module"
weight = 7
title = "Detecting malware through image acquisition (iOS, Android)"
+++

## Use Case

The first step in detecting malware on a device is to collect data from the device itself for analysis. Ideally the data will be retrieved from the device to a safe space with minimal disruption to the device itself. More advanced malware may attempt to detect forensic activity and delete itself to hamper detection and analysis.

## Objectives

After completing this subtopic, practitioners should be able to do the following:

- Discuss with the client the suggested approach of traffic analysis including explaining the process, the risks, and limitations of the action
- Select an appropriate network traffic analysis tool and implement it using the relevant hardware or software configuration
- Investigate and understand which rule sets or heuristics are being used by each given network traffic analysis approach and understand their strengths or weaknesses
- Read the results of flagged network flows and be able to triage which results require further investigation or risk-remediating action

---

For a broader view of malware detection methods and possible challenges, we recommend that all Learners take a look [at this talk](https://media.ccc.de/v/37c3-11874-einfuhrung_in_smartphone_malware_forensik) (it’s originally in German but also translated into French and English), which is a great introduction to the topic and lasts around 50 minutes (plus questions and answers).

## iOS, Android

Mobile operating systems are typically more limited/locked down than desktop ones, so creating and working with a full backup is not as straightforward, and you may not be able to easily get all information from a device. A full-featured cross platform tool for mobile data extraction is the Amnesty International Security Lab’s 🧰 [Mobile Verification Toolkit](https://mvt.re) (MVT). Full documentation is available on their web site, but there are also walkthroughs, for example [this one](https://www.youtube.com/watch?v=iLOSlHhGI9U) (English, 6 minute video). Do note that this latter walkthrough also includes materials we will cover in the next subtopic. Alternatively, you can also use [this guide](https://pts-project.org/guides/g4/) which will show you how to do backups on both iOS and Android.

When it comes to OS, you can use a tool called [libimobiledevice](https://libimobiledevice.org/) or iTunes to make a backup. This backup you can then analyze using MVT.

Detecting malware on Android is a little more complicated. You can use a tool called [androidqf](https://github.com/botherder/androidqf) to capture logs. See [this write-up](https://securitylab.amnesty.org/latest/2023/09/fellowship-apkqf-simplifying-android-forensics/) for more details on androidqf and why it’s difficult to do a backup without first connecting an Android device to another computer.

You can install MVT on Linux or macOS. Most Linux systems have pip3, a tool used to install Python packages, which makes installing MVT somewhat straightforward. On macOS, you will typically need to install two tools—XCode and Homebrew—first before being able to install MVT. You can follow the instructions in [this guide](https://docs.mvt.re/en/latest/install/) to install MVT.

## iOS, Android

🧰 For mobile devices, the system architecture makes on-device antimalware software less effective. However, the [Mobile Verification Toolkit](https://mvt.re) (MVT) will scan an Android or iOS device’s extracted data for various malware.

In the previous section, we went over backing up a device with MVT. Once you have done so, you can scan the backup using the command line tool.

Do note, however, that MVT has some limitations:

- MVT checks the device backup against known IoCs. This means that it can only check for malware that has those specific IoCs. It does not look for other heuristics (such as a jailbroken system or suspicious automations or scripts) which might suggest an infection.
- For iOS the best approach is to [gain access to a device backup, and then extract the data from the backup](https://docs.mvt.re/en/latest/ios/backup/itunes/). This should provide most of the data that is available on the device. (There is further analysis work which could be conducted on a jailbroken iOS device, though this falls outside of the scope of this learning path). It’s also worth noting that an encrypted backup contains significantly more data than an unencrypted one. We recommend always working with the former, if possible.
- For Android, unless the device is rooted, you will not be able to extract everything. However, you can get much of the device’s data without root access.

For a quick read on the IoCs that MVT checks for, how to download and give MVT new IoC data, and a list of potential IoCs you could use in your detection efforts, check out [this sub-page in the MVT documentation.](https://docs.mvt.re/en/latest/iocs/)

## Learning Resources

{{% resource title="Smartphone malware forensics: An introduction" languages="Original talk is in German, translated into French and English. Slides are in English." cost="Free" description="A talk by two mobile malware researchers outlining smartphone malware forensics basics, tools, and methods." url="https://media.ccc.de/v/37c3-11874-einfuhrung_in_smartphone_malware_forensik" %}}

{{% resource title="Mobile forensics" languages="English" cost="Free" description="Comprehensive guide by Security Without Borders on mobile forensics across major platforms." url="https://pellaeon.gitbook.io/mobile-forensics/" %}}

{{% resource title="How to make a Windows 10/11 image backup" languages="English" cost="Free" description="Guide on creating a system backup for malware analysis on Windows." url="https://www.computerworld.com/article/3655693/how-to-make-image-backup-windows-10-windows-11.html" %}}

{{% resource title="How to back up a Mac or Macbook" languages="English" cost="Free" description="Article focusing on disk images for macOS backups." url="https://www.macworld.com/article/671336/how-to-back-up-a-mac-or-macbook.html" %}}

{{% resource title="How To Backup Your Entire Linux System Using Rsync" languages="English" cost="Free" description="Guide on using rsync to clone a Linux system for forensic analysis." url="https://ostechnix.com/backup-entire-linux-system-using-rsync/" %}}

{{% resource title="MVT, mobile verification toolkit" languages="English" cost="Free" description="Tool to analyze iOS and Android backups for malware IoCs." url="https://docs.mvt.re/en/latest/" %}}

{{% resource title="Backing up with iTunes" languages="English" cost="Free" description="Using iTunes to create iOS backups for analysis with MVT." url="https://docs.mvt.re/en/latest/ios/backup/itunes/" %}}

{{% resource title="I analyzed my phone for Pegasus spyware" languages="English" cost="Free" description="Video guide using MVT to find IoCs related to Pegasus on iOS." url="https://www.youtube.com/watch?v=iLOSlHhGI9U" %}}

{{% resource title="Beginner guide - How to backup a mobile device for forensic analysis purpose" languages="English" cost="Free" description="Introductory guide on using tools to backup iOS and Android devices for malware scanning." url="https://pts-project.org/guides/g4/" %}}

{{% resource title="libimobiledevice" languages="English" cost="Free" description="Software library to access and backup iOS devices from Windows, macOS, or Linux." url="https://libimobiledevice.org/" %}}

{{% resource title="Simplifying Android Forensics" languages="English" cost="Free" description="Write-up on tools for Android device backups and their limitations." url="https://securitylab.amnesty.org/latest/2023/09/fellowship-apkqf-simplifying-android-forensics/" %}}

{{% resource title="Install libimobiledevice" languages="English" cost="Free" description="Guide on installing libimobiledevice for forensic investigations." url="https://docs.mvt.re/en/latest/ios/install/" %}}

{{% resource title="androidqf" languages="English" cost="Free" description="Tool for accessing data from Android devices for forensic analysis." url="https://github.com/botherder/androidqf" %}}

{{% resource title="SANS Course on Digital Acquisition and Rapid Triage" languages="English" cost="around 8000+ USD" description="Comprehensive course on acquiring and analyzing data from mobile devices." url="https://www.sans.org/cyber-security-courses/digital-acquisition-rapid-triage/" %}}

## Practice

For the practice exercises in this subtopic, first backup your device (instructions for each platform are outlined below), and then answer the questions under the “all systems” tag.

### iOS

Install MVT on your desktop operating system. Follow the directions outlined in [this section](https://docs.mvt.re/en/latest/ios/install/) to make a backup, either by using iTunes or by first installing [libimobiledevice](https://docs.mvt.re/en/latest/ios/install/).

### Android

Install MVT on your desktop operating system. Install [Androidqf](https://github.com/botherder/androidqf) and use it to make a backup.

### Windows, macOS, Linux

Conduct a backup of your desktop operating system using a tool of your choice. You can use one of the tools outlined in the learning resources section above.

### All systems

Check for the following in your backup:

- What data did you get from the device? What data did you not get?
- What was most recently modified?
- Are the timestamps preserved in the data acquisition copy?

## Skill Check

Prior to doing the skill check portion of the exercise, make sure that you have first backed up your files (as described in the practice section). Once you have completed this, do the following:

### Windows, macOS, Linux

You have completed a backup of your desktop operating system. Open it and within it, find:

- The downloads folder
- At least one executable file
- At least one system settings or configuration file

It is perfectly all right to use your favorite search engine to figure out where those files and folders should be located on a disk and then search for them in the same location, just within your backup.

### iOS

If your iOS backup has been encrypted, use MVT to decrypt it by following [these instructions](https://docs.mvt.re/en/latest/ios/backup/check/#decrypting-a-backup). Read the output of the command to make sure that the decryption has run successfully.

After you have decrypted the backup, ask MVT to download the newest IoCs and then use the tool to scan the backup for malware.

### Android

Ask MVT to download the latest IoCs and then use it to scan the backup you made using androidqf.
