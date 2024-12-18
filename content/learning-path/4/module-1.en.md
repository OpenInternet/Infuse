+++
style = "module"
weight = 1
title = "Infrastructure Vulnerabilities"
description = "We introduce different types of infrastructure vulnerabilities and what impact they could have"
+++

## Use Case

While this learning path focuses on web application security, web applications run on top of numerous pieces of software infrastructure. Any vulnerability in the application’s underlying infrastructure will compromise the application. Understanding some infrastructure security is therefore part of understanding application security.

When inspecting a web application either for purposes of vulnerability assessment, security monitoring, or to investigate a compromise, the practitioner must understand the underlying stack of technology which provides the necessary environment for the application to run while looking for vulnerabilities in that stack.

## Objectives

After completing this subtopic, practitioners should be able to do the following:

- Understand common types of infrastructure software vulnerabilities
- Understand the potential impacts of those types of vulnerabilities
- Understand essentials of vulnerability frameworks

---
## Main Section
### Foundation Knowledge

Websites do not exist without some underlying software and hardware that takes care of the low level operations of handling requests serving the web content. This includes the underlying hardware and firmware, operating system, web server software, web application framework(s), and even unrelated software running on the machine. The security of a web application depends on the security of this infrastructure, even if developers of the website may have little visibility into or control over this infrastructure. Infrastructure vulnerabilities typically affect a large number of websites (possibly hundreds of millions), and are often assigned identifiers such as CVEs (for a more general introduction to what CVEs are, check out this [article](https://www.redhat.com/en/topics/security/what-is-cve)). These vulnerabilities could belong to almost any technical class, but from the point of view as a website operator, we only really care about their impact, not the underlying technical details. This is because we do not maintain the infrastructure software, we just deploy and configure it.

The impact of a vulnerability in infrastructure software can be nearly anything, but some issues and impacts that are likely to pop up include the types below.

### Denial of service (DoS)

A vulnerability may allow an attacker to crash a web server or cause it to be unresponsive due to excessive resource consumption. These vulnerabilities are typically exploited to knock a website offline or to extort money from website operators as part of a protection racket. Note that a determined and funded attacker can frequently rent time on a botnet of compromised computers to simply overwhelm a website with a huge number of requests; no vulnerability required. Some examples of DoS vulnerabilities include:

- [CVE-2011-3192](https://nvd.nist.gov/vuln/detail/CVE-2011-3192): A vulnerability in Apache where the client can request multiple subsections of a web page, resulting in large memory use on the server.
- [MS ADV190005](https://msrc.microsoft.com/update-guide/vulnerability/ADV190005): A vulnerability in Microsoft IIS allows an attacker to send a large number of settings variables in a HTTP/2 request, causing 100% CPU consumption on the server.

### Information leaks

Occasionally a web server can be coerced into returning excessive data in a response. Typically this will be due to the server allocating a large chunk of memory, then only partially writing data to that chunk, and sending the whole chunk to the client. This uninitialized memory could contain data from other requests or responses, or even internal memory from the web server. The most famous of these vulnerabilities is likely [Heartbleed (CVE-2014-0160)](https://en.wikipedia.org/wiki/Heartbleed). These vulnerabilities can be used to steal session tokens (allowing attackers to impersonate other users), machine identities in cloud environments (allowing attackers to access other cloud services as the web server), private SSL keys (allowing attackers to impersonate the web server and launch middle-person attacks), and any other data residing in the web server process’ memory.

### Remote code execution

This is the most archetypal type of infrastructure vulnerability. It most commonly occurs when an attacker’s request can overwrite data flow control structures in the server’s memory, causing the target to execute attacker-specified machine code. Fortunately, years of testing and subsequent fixing and secure coding practice improvement have made these vulnerabilities rate in the default configurations of extremely mature server infrastructure software like Apache and IIS. However, they are much more common in non-default configurations of common software and in less mature software. Here are two examples from 2023 ([example 1](https://www.bleepingcomputer.com/news/security/fortinet-warns-of-critical-rce-flaw-in-fortios-fortiproxy-devices/), [example 2](https://thehackernews.com/2023/05/critical-flaws-in-cisco-small-business.html)). Note that while buffer overflows may be the classic way of achieving remote code execution, there are other ways to do so as well. As with all infrastructure vulnerabilities, for the most part we are mainly concerned with what the impact is and whether a fix is available, and less with the technical details.

### Mitigating infrastructure software vulnerabilities

Infrastructure software with vulnerabilities is usually discovered via vulnerability-scanning software (there are many examples of such software, [check out this list](https://owasp.org/www-community/Vulnerability_Scanning_Tools)), notifications from vendors or configuration management systems, or via manual inspection of the deployed software on a server. Depending on the server environment, this software may be fully managed by a third party, automatically updated by software agents or deploy processes, or manually managed. Typically, if a vulnerability is patched, attackers can reverse-engineer the patch to discover the mechanism of the underlying vulnerability, so it is important to keep infrastructure software up to date.

## Skill Check

Look up 2 CVEs which are listed on [https://www.cve.org/](https://www.cve.org/) or another CVE database. Pick those which are both described in some depth (CVE databases usually link out to external writeups which contain such details) and have a vulnerability rating. Since CVEs can often be very technical, select those which deal with a topic or technology which you are comfortable with. Answer the following questions:

- Broadly speaking, what is the CVE about? What is the flaw or vulnerability that the attacker could exploit?
- Do you know of any people or organizations whose systems an adversary could exploit using this CVE? What if this CVE is combined with other vulnerabilities?
- Why do you think that the CVE has the score it has?

After you have looked up two CVEs which you found interesting, do a search in a CVE database for a tech product which you or people you are supporting are running, see what recent CVEs it had, and once again answer the questions listed above.

If you are self-hosting a web server, look up recent vulnerabilities. If you are running something like Drupal or Wordpress through a third-party provider, check up the vulnerabilities on those services as well and, through your provider’s dashboard (each provider will have a slightly different one) make sure that you are running the latest versions of those tools.

If possible, discuss your answers to those questions with a peer or mentor who will help verify that you’ve correctly understood the topic.

## Learning Resources

{{% resource title="What’s a CVE" languages="English" cost="Free" description="Introduction to CVEs (Common Vulnerabilities and Exposures) and their importance." url="https://www.redhat.com/en/topics/security/what-is-cve" %}}

{{% resource title="CVEs with a vulnerability score of 9.8" languages="English" cost="Free" description="Examples of CVEs with high vulnerability scores that can cause significant damage." url="https://www.bleepingcomputer.com/news/security/fortinet-warns-of-critical-rce-flaw-in-fortios-fortiproxy-devices, https://thehackernews.com/2023/05/critical-flaws-in-cisco-small-business.html" %}}

{{% resource title="OpenCVE" languages="English" cost="Free" description="Website and tool for subscribing to CVEs affecting different vendors." url="https://www.opencve.io/welcome" %}}

{{% resource title="SAFETAG vulnerability scanning" languages="English" cost="Free" description="Guide to vulnerability scanning using the SAFETAG methodology." url="https://safetag.org/methods/vulnerability_scanning" %}}

{{% resource title="Vulnerability Scanning Tools" languages="English" cost="Free" description="List of automated tools for web app vulnerability scanning, with various use cases and pricing models." url="https://owasp.org/www-community/Vulnerability_Scanning_Tools" %}}