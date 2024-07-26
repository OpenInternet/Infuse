+++
style = "module"
weight = 6
title = "Detecting malware through traffic analysis"
description = "This optional subtopic teaches you to use a Raspberry Pi to conduct traffic analysis while searching for potential malware"
+++

## Use Case

Most malware will make some sort of network connection, be it to connect to a command and control server for further instructions or exfiltrate data from a computer. While various tactics can be used by malware to avoid being detected by antivirus scanners, in many cases an analyst with access to all network traffic from the device can spot those suspicious network connections and analyze them to look for signs of malicious activity.

Use when you are able to set up an in-line traffic analysis solution, for instance by using a WiFi hotspot device running on a Raspberry Pi as in some of the tools discussed here. Other options could include making use of TAP or SPAN ports to capture traffic for all users of a local network, such as in an office space.

_Note to learners: this subtopic assumes that you have access to a Raspberry Pi. If this is not the case, you can skip it and move on to the next one._

## Objectives

After completing this subtopic, practitioners should be able to do the following:

- Discuss with the client the suggested approach of traffic analysis including explaining the process, the risks, and limitations of the action
- Select an appropriate network traffic analysis tool and implement it using the relevant hardware or software configuration
- Investigate and understand which rule sets or heuristics are being used by each given network traffic analysis approach and understand their strengths or weaknesses
- Read the results of flagged network flows and be able to triage which results require further investigation or risk-remediating action

---
## Main Section
Rather than looking at files and processes running on a device, malware can also be identified by the network communications it initiates or responds to. This approach has several advantages over device-based analysis as it is difficult for malware to avoid making network communications at some point, and, in some cases, allows you to investigate multiple devices at once.

### Traffic Capture using a Raspberry Pi

In this section, we will look at two tools: PiRogue Tool Suite and SpyGuard. Both of those tools require additional hardware (a small, low-cost computer called a Raspberry Pi and an SD card).

‼️ After learning skills on of either of the two tools, you should be able to:

- Install the selected tool on the SD Card of a Raspberry Pi and perform initial configuration
- Access the control panel for the tool
- Connect devices to the WiFi hotspot
- Identify devices connected to the hotspot (if connecting multiple devices at once)
- Read and interpret suspicious findings and triage which ones require risk remediation/further investigation
- Advanced: configure logging and notifications on the selected tool
- Advanced: Conduct traffic capture for further investigation

#### PiRogue tool suite

PiRogue tools suite is a set of software tools which turns the Raspberry Pi into a malware analysis station. It’s developed by the Defensive Lab Agency. It serves as an intermediary router, which sits between a device which you suspect might be infected and the internet, and captures and analyzes all of the servers and services the infected device attempts to communicate with. This can be used to detect potential malware activity.

If you are interested in running those tools, check out the author’s [excellent documentation](https://pts-project.org/docs/prologue/introduction/). We recommend starting with the beginner’s guide, which looks at [how to set up a PiRogue](https://pts-project.org/guides/g1/) and [how to conduct your first analyses](https://pts-project.org/guides/g2/).

#### SpyGuard

An alternative tool, called SpyGuard, also runs on the Raspberry Pi or other Linux devices and also works as an intermediary router. In contrast to the PiRogue Tool Suite, which primarily focuses on more advanced network analysis, SpyGuard focuses on scanning network traffic for known IoCs and [potentially suspicious behavior](https://github.com/SpyGuard/SpyGuard/wiki/Detection-methods-and-IOCs) such as contacting recently registered domains or using unusual ports. SpyGuard is forked from another project called TinyCheck which was originally designed for a French women’s shelter to detect traces of stalkerware (malware used to non-consensually spy on people, often installed by abusive partners) on mobile devices. Its capabilities have, however, expanded and it can now be used to test for many other types of malware. You can read more about SpyGuard [on its github page](https://github.com/SpyGuard/SpyGuard/).

### Other Approaches

#### Outbound Firewalls

Using a ‘noisy’ device firewall which asks permission for every process requesting to send internet traffic is a useful, though cumbersome, way to identify processes which are making network connections and potentially identify suspicious communications. This does require a level of familiarity with common processes on your chosen platform in order to identify non-suspicious processes, as well as ability to research IP blocks and DNS lookups. Leaving this active on a client’s computer may not always be the best approach as it is difficult to properly investigate every process, however as a practitioner of digital security it is useful to be able to conduct this work and it may be worth it on your own device or when investigating a clients’ device. Some endpoint firewalls in this class include:

- MacOS
  - [LuLu ](https://objective-see.org/products/lulu.html)(Open Source, Free)
  - [Little Snitch](https://www.obdev.at/products/littlesnitch) (Paid) or [Little Snitch Mini](https://www.obdev.at/products/index.html) (Proprietary, Free)
- Windows
  - [PortMaster ](https://safing.io/)(Open Source, Free/Paid version available with network history/investigation feature)
  - [GlassWire](https://www.glasswire.com/) (Proprietary Free/Paid Version available)
- Android
  - [NetGuard](https://github.com/M66B/NetGuard) (Open Source Free/Freemium version available with traffic capture/history)
  - [AFWall+ ](https://github.com/ukanth/afwall)(Open Source, Free)
- Linux
  - [OpenSnitch](https://github.com/evilsocket/opensnitch) (Open Source, Free)

Outbound firewalls can be a bit difficult to get the hang of at first. The signal to noise ratio is far from optimal and we recommend first working alongside others who have experience with such tools before heavily relying on them in your own analysis.

#### 3rd Party Traffic Analysis

Traffic can be captured and filtered or analyzed by 3rd parties. One such semi-automated service is [Emergency VPN](https://www.civilsphereproject.org/emergency-vpn), run by the Civilsphere project at the Czech Technical University. A VPN profile can be generated and installed on any platform. After connecting to the VPN and running device traffic through it for 24 hours, the Emergency VPN service will automatically send a machine-generated analysis flagging any initial findings. Subsequently the traffic from the device will be retained and analyzed manually by a staff analyst and a manual report sent in case of malicious findings. This is a way of outsourcing analysis skills when needed. Ensure you or your client understands the privacy implications and are comfortable with the risks associated with external traffic capture.

If you have a moment to do so and are all right with the privacy implications of sharing your data with the Emergency VPN team, we recommend that you read a bit more about the service, run it for a few days, and analyze the data you receive afterwards. Once you have done so, you should be able to:

- Understand how the Emergency VPN service works
- Request an Emergency VPN profile and install it on your selected platform
- Read through and understand the first automated Emergency VPN report and parse results to identify any suspicious findings for further investigations

In other cases, if you are working with an external analyst, they may request you go through a similar VPN-based process or run a utility to capture network traffic most commonly into a PCAP file (Packet CAPture) for sharing and external review.

#### Manual Traffic Analysis & Organizational Monitoring

If you are ready to take this skill further, you will need to develop skills around traffic capture, filtering, and analysis using tools such as Suricata, Zeek, and Wireshark. See some suggested resources for learning these below:

- [Malware-traffic-analysis.net](https://www.malware-traffic-analysis.net/) - Contains years of blog and tutorial write-ups including PCAP files for practicing detection and analysis skills
- Course: [Network Security Monitoring with Suricata ](https://www.pluralsight.com/courses/network-security-monitoring-suricata)(Pluralsight, Free)
- Course: [Threat Hunting Training course ](https://www.activecountermeasures.com/hunt-training/)(Active Countermeasures, uses AC-Hunter CE, offered live monthly)

Consider also learning the organizational deployments of such tools across various categories, for instance using [Security Onion](https://github.com/Security-Onion-Solutions/securityonion), [pfsense](https://www.pfsense.org/)/[Opensense](https://opnsense.org/), [AC-Hunter CE](https://www.activecountermeasures.com/ac-hunter-community-edition/), [RITA](https://github.com/activecm/rita), and [Wazuh](https://wazuh.com/).

### Understand: Limitations & Privacy

As with all the approaches in this learning path, there are strengths and weaknesses to each method of malware detection and will only be effective when used with the proper skills, experience, and sometimes requires access to the right threat feeds or rulesets. Network analysis is no different.

Traffic analysis approaches combine hard rules such as ‘_this IP is known malicious_’ along with heuristic rules such as ‘_unusual amount of outbound traffic to new IP_’ or ‘_unexpected port/protocol usage’_. Since the former approach relies on IoCs, it can only catch known and well-documented malware. While the latter heuristic approaches may be able to catch novel malware, it often requires additional analysis skills to capture and manually review traffic in a tool like Wireshark while using additional rules and IoCs to hunt for specific threats. Several resources for learning additional analysis skills are linked in the resource table below.

Some sophisticated malware could exfiltrate data or contact servers in very subtle or obfuscated ways, which further complicates analysis.

Understand as well that intercepting traffic of a client’s device may expose online activities or other private information about the person. Most device traffic will be TLS encrypted; this means that an analyst would not be able to capture private messages or passwords. Still, there remains a substantial amount of private information which could be captured, including the services somebody uses, the domains they visit, and potentially sensitive pages they browse or services they use. Some tools will display live traffic flows on a dashboard while using the tool, which could potentially surface private information in a group setting. Ensure your client understands the process you are offering to them and handle any information collected with utmost confidentiality and OPSEC.

## Skill Check

Set up PiRogue on a Raspberry Pi and check the traffic from one device. Ideally, this would be a test device on which you have installed a lot of random apps. Try to understand the output and the alerts PiRogue is giving. Note down at least three different types of outputs, explain what you think they mean, and discuss them with a mentor or peer.


## Learning Resources

{{% resource title="Pirogue Tool Suite Documentation" languages="English" cost="Free" description="The documentation for PiRogue tool suite." url="https://pts-project.org/docs/prologue/introduction/" %}}

{{% resource title="PiRogue Tool Suite Guides" languages="English" cost="Free" description="Additional set of guides for PiRogue tool suite." url="https://pts-project.org/docs/" %}}

{{% resource title="SpyGuard wiki" languages="English" cost="Free" description="The documentation for SpyGuard." url="https://github.com/SpyGuard/SpyGuard/wiki" %}}

{{% resource title="Malware Traffic Analysis" languages="English" cost="" description="Advanced resource with sample PCAP files for those who wish to develop traffic analysis skills." url="https://www.malware-traffic-analysis.net/" %}}

{{% resource title="Emergency VPN" languages="English" cost="Free" description="A project by CivilSphere, which allows you to connect to a special VPN collecting your device’s internet data for detailed reports." url="https://www.civilsphereproject.org/emergency-vpn" %}}

{{% resource title="Threat Hunting Training Course" languages="English" cost="Free" description="A free, one day course on analyzing and interpreting network data for threat hunting." url="https://www.activecountermeasures.com/hunt-training/" %}}

{{% resource title="Course on network security monitoring with Suricata" languages="English" cost="Free" description="A free course on how to use Suricata, a commonly used open source threat detection tool." url="https://www.pluralsight.com/courses/network-security-monitoring-suricata" %}}

{{% resource title="Outbound firewalls" languages="Various" cost="Most are either free or have free versions available" description="An outbound firewall analyzes outbound traffic and connects to servers. Includes tools like LuLu, Little Snitch, PortMaster, GlassWire, NetGuard, AFWall+, and OpenSnitch." url="" %}}

<ul>
<li>macOS:
  <ul>
    <li><a href="https://objective-see.org/products/lulu.html">LuLu</a> (Open Source, Free)</li>
    <li><a href="https://www.obdev.at/products/littlesnitch">Little Snitch</a> (Paid) or <a href="https://www.obdev.at/products/index.html">Little Snitch Mini</a> (Proprietary, Free)</li>
  </ul>
</li>
<li>Windows:
  <ul>
    <li><a href="https://safing.io/">PortMaster</a> (Open Source, Free/Paid version available)</li>
    <li><a href="https://www.glasswire.com/">GlassWire</a> (Proprietary, Free/Paid Version available)</li>
  </ul>
</li>
<li>Android:
  <ul>
    <li><a href="https://github.com/M66B/NetGuard">NetGuard</a> (Open Source Free/Freemium version available)</li>
    <li><a href="https://github.com/ukanth/afwall">AFWall+</a> (Open Source, Free)</li>
  </ul>
</li>
<li>Linux:
  <ul>
    <li><a href="https://github.com/evilsocket/opensnitch">OpenSnitch</a> (Open Source, Free)</li>
  </ul>
</li>
</ul>

{{% resource title="Threat hunting platforms" languages="Several" cost="" description="Several platforms using network data to detect threats within systems, including Security Onion, pfSense, OPNsense, AC Hunter Community Edition, RITA, Wazuh, and Suricata." url="" %}}

<ul>
  <li><a href="https://github.com/Security-Onion-Solutions/securityonion">Security Onion</a></li>
  <li><a href="https://www.pfsense.org/">pfSense</a></li>
  <li><a href="https://opnsense.org/">OPNsense</a></li>
  <li><a href="https://www.activecountermeasures.com/ac-hunter-community-edition/">AC Hunter Community Edition</a></li>
  <li><a href="https://github.com/activecm/rita">RITA</a></li>
  <li><a href="https://wazuh.com/">Wazuh</a></li>
  <li><a href="https://suricata.io/features/">Suricata</a></li>
</ul>


