+++
style = "module"
weight = 1
title = "Setting up a malware analysis environment"
+++

## Use Case

Before you start analyzing any malware, you need to set up a safe environment to do so. Definitionally, malware does bad things to the systems it runs on. You do not want to run it on your primary system. Additionally, you likely will want to prevent the malware from actually making connections to the threat actor’s C&C (command and control) servers. Both of these mean that you should set up a virtual machine to use when performing malware analysis.

## Objectives

After completing this subtopic, the practitioner should be able to set up a virtual machine (VM) and take snapshots therein.

---

The exact setup you need depends on your analysis method and the operating system of the malware you’re analyzing. In most cases you can start with a pre-build linux VM like [REMnux](https://remnux.org/). See [Chapter 6 of the Field Guide to Incident Response for Civil Society and Media](https://internews.org/wp-content/uploads/2023/11/Field-Guide-to-Threat-Labs.pdf) for step-by-step instructions on how to configure it. For specific things (for example, dynamic analysis of iOS malware) you will need additional tools (for example, a jailbroken iPhone or iPad). VMs occasionally have vulnerabilities that allow software running in the VM to attack the host operating system. Most malware doesn’t even come close to this level of sophistication, but if in doubt, it’s safest to analyze malware on a separate physical device that is wiped afterwards.

To set up REMnux, we recommend that you follow the steps outlined in [Chapter 6 of the Field Guide to Incident Response for Civil Society and Media](https://internews.org/wp-content/uploads/2023/11/Field-Guide-to-Threat-Labs.pdf) and [download the VM](https://docs.remnux.org/install-distro/get-virtual-appliance)[^1]. This is an easy way to start which provides excellent isolation between your host system and the REMnux environment. Be careful not to share sensitive data from your host OS into the VM. Per the instructions linked above, take a snapshot of your VM once it’s been set up, and before you start working on any malware. You can use snapshots to return your VM to a known-good state before analyzing different pieces of malware and to isolate different clients from each other. For more information on VM snapshots in general, see [this article](https://www.nakivo.com/blog/vm-snapshot-vs-backup/).

While performing malware analysis, you may find that you want additional tools in your analysis VM. Go ahead and install and configure them, but note what you did. After you’re done with your analysis, you can load up your “clean” VM snapshot, install and configure the tool, and then make a new “clean” snapshot for your next malware analysis adventure.

In order to move malware files around, the standard practice is to put them in encrypted ZIP files. In this case, the encryption quality doesn’t matter. The point is not to keep the malware secret, so much as to prevent inadvertently unleashing it on other systems and to prevent anti-malware systems from detecting or deleting it. Feel free to include the password in the ZIP file name.

## Learning Resources

{{% resource title="Field Guide to incident response for civil society and media" languages="English" cost="Free" description="Guide on analyzing potentially malicious content, setting up virtual machines, and more." url="https://internews.org/wp-content/uploads/2023/11/Field-Guide-to-Threat-Labs.pdf" %}}

{{% resource title="REMnux" languages="English" cost="Free" description="Webpage for the REMnux Linux distro, widely used for malware analysis." url="https://remnux.org/" %}}

{{% resource title="Get the virtual appliance" languages="English" cost="Free" description="Guide on installing and running REMnux as a virtual machine." url="https://docs.remnux.org/install-distro/get-virtual-appliance" %}}

{{% resource title="The difference between snapshots and backups" languages="English" cost="Free" description="Article explaining the distinctions between VM snapshots and backups, crucial for managing and resetting VMs used in malware analysis." url="https://www.nakivo.com/blog/vm-snapshot-vs-backup/" %}}

## Practice

1. Download (if you haven’t already) virtual machine software (we recommend VirtualBox) and install REMnux.
2. Update REMnux, and take a VM snapshot.
3. Configure a single shared folder between your host and the REMnux VM.
4. Download a piece of random (presumably non-malicious) Windows software from something like download.cnet.com, and transfer it to the REMnux VM using an encrypted ZIP file. (If you have recently completed the Malware Detection learning path, you can re-use the same download).
5. Grab some malware from MalwareBazaar (**WARNING: this is live malware! Do not run it.**) and transfer it to the REMnux VM. (If you have recently completed the Malware Detection learning path, you can re-use the same download).

## Skill check

Go to the folder which your virtual machine uses to share files between the host and guest operating systems. Add a file there and then [compute a cryptographic hash](https://www.sentinelone.com/cybersecurity-101/hashing/) of this file in both operating systems. Make sure that the hashes match.

## Notes

[^1]: REMnux is not available on ARM processors such as Apple Silicon computers. While it is possible to virtualize across CPU architectures using emulators such as QEMU or UTM (VirtualBox does not currently support ARM architectures), performance will be slow and is not advised. It would make more sense to select another Linux distribution which supports your hardware and [install the necessary software packages ](https://www.digitalocean.com/community/tutorials/package-management-basics-apt-yum-dnf-pkg)to complete the activities, if they did not already come with the operating system. Kali Linux is a popular Linux distribution which will include or support many tools also found in REMnux. If you have an Apple Silicon device, you can use UTM ([https://mac.getutm.app/)](https://mac.getutm.app/)) to run the Apple Silicon (ARM64)[ Kali Installer](https://www.kali.org/get-kali/#kali-installer-images) image. Walkthrough guides are available from both[ UTM](https://docs.getutm.app/guides/kali/) and[ Kali](https://www.kali.org/docs/virtualization/install-utm-guest-vm/). At the time of writing, a bug affecting the installer process requires an additional step during installation of attaching a virtual serial terminal display – both walkthroughs describe this process. You can also obtain an[ ARM version of Kali for the Raspberry Pi](https://www.kali.org/get-kali/#kali-arm), with most models of Raspberry Pi supported.
