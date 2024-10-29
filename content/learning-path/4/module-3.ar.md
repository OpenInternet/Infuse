+++
style = "module"
weight = 3
title = "Authentication"
description = "In any website that has user logins, it’s important that the site protects user accounts from unauthorized access. We outline the most common areas of authentication where web application flaws appear"
+++

## Use Case

In any website that has user logins, it’s important that the site protects user accounts from unauthorized access, and also that the account credentials themselves are protected. This subtopic outlines the most common areas of authentication where web application flaws appear.

## Objectives

After completing this subtopic, practitioners should be able to do the following:

- Understand common types of authentication vulnerabilities
- Understand the potential impacts of those types of vulnerabilities
- Understand the mechanisms by which those vulnerabilities work
- Understand, in broad strokes, how those vulnerabilities can be prevented

---
## Main Section
Authentication is the process by which a user of a system proves that they are who they claim they are. It is the foundation upon which access control is built. Typically, a user will supply a piece of information that identifies them (username, email address, phone number, etc.) and a piece of secret information that validates that identity (commonly a password or passphrase, though alternative or additional methods such as a security keys, WebAuthn, and Passkeys are gaining popularity). This subtopic will cover a few vulnerability classes that are common and high-impact in web applications.

### Insecure password storage

If users are to log in to a site with a username and a password, the site must be able to validate that the user entered the correct password. Passwords must furthermore be stored securely in the application’s authentication database, because that database might be compromised due to SQL injection, lost backups, or even malicious or compromised members of the organization running the site. There are several approaches to storing passwords:

- **Plaintext** \
  This is obviously the worst way to store passwords. It means to store the exact characters that the user typed in when setting up the password. If the password database is compromised, attackers will have full access to all user passwords. Not only can these passwords be used to gain access to the website itself, but they can be used in [password reuse attacks](https://en.wikipedia.org/wiki/Credential_stuffing) against other sites or applications.
- **Encrypted** \
  The obvious solution to plaintext password storage is to encrypt the passwords. However, this offers only modest protection against many threats. The application itself must know the encryption key, and so the key must be stored somewhere. Malicious or compromised insiders with access to the database almost certainly will have access to the encryption key. Also, there are a variety of common web server vulnerabilities that could allow remote attackers to gain access to the key. Once somebody obtains the encryption key, they would be able to figure out the passwords.
- **Hashed** \
  As it turns out, the web server never needs to retrieve a user password from storage, it merely needs to know if the password that the user entered was the same as the user’s real password. There is a class of algorithms referred to as [cryptographic hashes](https://en.wikipedia.org/wiki/Cryptographic_hash_function) that perform a one-way transformation on data. Examples of these algorithms include MD5 and SHA. It is effectively impossible to, given a hash, determine what source data generated the hash. Unfortunately, passwords tend to be fairly short, and cryptographic hash functions tend to be quite fast. For a given hash function, it is possible to hash every possible password of a given length and store the resulting password and hash. Then, given a particular password hash, one can simply look up the password that generated this hash. In the mid 2000s, it was feasible to compute, store, and distribute these databases, called [rainbow tables](https://en.wikipedia.org/wiki/Rainbow_table), for general use. \
  One solution to the rainbow table problem is to add a bit of data ([called a salt](<https://en.wikipedia.org/wiki/Salt_(cryptography)>)) to the password before hashing it. This data doesn’t need to be secret or particularly high-entropy, it just needs to be different per user. A common approach is to hash the username and the password together. A rainbow table for Microsoft Windows NTLM password hashes up to 9 characters long takes up 6.7 TB. If those password hashes were salted with even 5 alphanumeric characters, that rainbow table would grow to over 6,000,000,000 TB. The problem with this approach is that hashes are still quite fast, and modern graphics cards are essentially massively parallel supercomputers. An Nvidia RTX 4090 (a high-end video card from 2022) can compute almost 400,000,000,000 salted SHA hashes a second, allowing private individuals to crack most passwords in minutes or hours.

**Special password storage algorithms** \
The problem with cryptographic hashes is that they are designed to be fast and efficient. Most of their use is in verifying that data hasn’t been tampered with. This problem had been addressed as early as 1976, with a [Unix crypt function](https://www.usenix.org/legacy/publications/library/proceedings/usenix99/full_papers/provos/provos_html/node9.html) that salted and encrypted the password multiple times to slow down brute-forcing. Unsurprisingly, this algorithm will not stand up to modern computing resources, but the general idea is still used today with special algorithms that are designed to store password derivatives. These algorithms are designed to take tunable CPU and memory resources, to make a good tradeoff between performance and brute-force resistance. Good password handling algorithms include (in decreasing order of preference) [scrypt, argon2, bcrypt, and PBKDF2](https://www.latacora.com/blog/2018/04/03/cryptographic-right-answers/). As a defense-in-depth measure, it’s a good practice to combine the user’s password with a secret that’s not stored in the database itself. For example, the secret can be hard-coded in the application itself. This will likely prevent password recovery if only the password database is lost.

#### Try it yourself!

Log into your DVWA and make sure the security level is set to low. Navigate to the SQL Injection section, and enter the following into the text box: \
 \
`​​999' union all select user, password from users where '1'='1`

This will return the first and last names of all users who have a `userid` of 999 (there are none), and also the username and password hash for all users. Use an online hash lookup site (e.g. [https://www.whatsmyip.org/hash-lookup/](https://www.whatsmyip.org/hash-lookup/)) to look up the admin user’s password hash. What kind of hash is used to store the DVWA users’ passwords? What is the password of the user named “1337”?

For more information on password handling, see the [OWASP password storage cheat sheet](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html).

### Password reset

If the user on a website forgets their password, most sites provide an automated way for the user to verify their identity in order to set a new password. Ideally, these methods are approximately as secure as the standard password verification process in which the user types in a secret password they know into a webpage, but are significantly less convenient.

Most sites will assume that the user’s email account is reasonably secure and email the user a link that will allow them to reset their password. This assumption is probably correct for the vast majority of user accounts on the vast majority of websites. Password reset links (and, additionally, “magic login” links) should have the following properties in order to minimize user risk:

- The links should be to the TLS encrypted version of the site. (Note that there is no feasible way to guarantee that the email itself is encrypted in transit, but end-user network traffic, such as a user accessing a webpage, is more likely to be intercepted than traffic between servers, such as emails sent from one server to another.)
- The link should have an access token that contains around 128 bits of randomly-generated data from a cryptographically strong random number generator. Note that 128 bits of data will take up 172 or more characters when encoded into a URL. There is no real advantage to using more than 128 bits of data, and using 128 bits means that no additional brute-force protection is required.
- The access token should be time-limited (e.g. expire after an hour) and single-use. The single-use nature not only limits the ability of an attacker to change a user’s password, but also may alert the user in the case that an attacker manages to obtain the token and change the user’s password.
- The token itself must be tied to the user’s account, preventing users from using the token to change another user’s password.

Reset links may also be sent via SMS. SMS is less likely to be intercepted than email by normal hackers, but is vulnerable to interception by governments in the country that the user is in. If a shorter token (e.g. a PIN) is sent via SMS, then it is important to have strong brute-force protection on the page that accepts the PIN, e.g. a 10 minute PIN lifetime and rate-limiting. Note as well that there are both [money-making and simple DoS attacks](https://www.openmindnetworks.com/blog/international-sms-fraud-by-brian-kelly-cto-and-co-founder/) that involve causing a server to send SMS messages to a phone number of an attacker’s choosing. By performing a large number of SMS password resets, an attacker can incur high costs for the website operator, potentially making money for themselves in the process.

An alternate method of performing password resets involves asking the user questions that both the website and user know the answers to, but that an attacker might not. These tend to be extremely weak, or extremely strong methods of verifying the user’s identity. Standard “secret questions” like asking where the user was born, their mother’s maiden name, the make of their first car, etc. are quite weak. First off, an attacker may be able to easily find the answer to those questions. Secondly, most of them are impossible to change, so in the event that an attacker does discover an answer (even by compromising another website), they will be able to use them again and again. Lastly, most of these questions only have a handful of common answers. For example, if you ask a Korean person their mother’s maiden name, a significant proportion of the answers will be “Kim” or “Lee”. The other, more secure type of secret question involves offline communications between the website and the user. Examples of this are things like utility bills and bank statements. For the user to reset their password, they would enter, for instance, the amounts of 3rd and 5th transactions in their bank statement. The user would only be allowed a few tries, and then would need to perform an even less convenient reset process with customer service. This reset process can be very secure, though in the days of online statements, it’s probably less secure than emailing a token.

For a bit more on secure password reset, see [the OWASP cheat sheet on Forgot Password](https://cheatsheetseries.owasp.org/cheatsheets/Forgot_Password_Cheat_Sheet.html). For an in-depth exploration of authentication and authorization vulnerabilities, see the [Web Application Security Assessment learning path](/en/learning-path/5/).

### Credential strength

Most web applications use passwords for authentication, though techniques like WebAuthentication using security keys and extremely long lived authentication sessions combined with login links via email are gaining popularity. If a website uses passwords, it’s important that those passwords be strong. However, the definition of a “strong” password has shifted over the years. There are three primary methods that attackers uses to directly attack user passwords:

1. **Online guessing using password reuse** In this attack, an attacker uses known passwords associated with the user, and simply tries those passwords in the site’s login form. Since many people use the same passwords across multiple websites, this attack can be devastatingly effective. Usernames and passwords from compromised sites are widely available on the public web, dark web, and for sale on private websites. Attackers can simply enter all the known passwords for a given user; if the attacker is targeting a small number of users, this attack doesn’t even require automation.
2. **Online brute-force via credential stuffing** “Credential stuffing” is a type of attack where a software client (either a scripted web browser via something like [Selenium](https://www.selenium.dev/) or a custom script) will automatically attempt to log in to the target site. Additionally, these attacks can use a distributed set of proxy servers to appear to come from a variety of different computers. The rate of these attacks is generally limited by the speed of the web server and network latency, so attackers will generally be careful to choose only the most likely credentials to try. For instance, they will often limit the usernames to a targeted set, or to known good usernames if there is a [username enumeration vulnerability](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/03-Identity_Management_Testing/04-Testing_for_Account_Enumeration_and_Guessable_User_Account) on the site. (Note that in most cases, preventing username enumeration is defense in depth, and should not be a high priority for web applications.) Additionally, the attacker will attempt to prioritize likely passwords, using passwords dumps to try reused passwords, and trying commonly-used passwords.
3. **Offline brute-force** If the attacker managed to acquire a copy of the application’s passwords database (for example via SQL injection), they will likely attempt to brute-force the stored credentials. Depending on how the credentials are stored and the attacker’s hardware capabilities, attackers may be able to try hundreds of trillions of passwords per second, or hundreds. In any case, once the attacker has the password database, the application cannot detect or stop the attack. Attackers will generally prioritize likely passwords in this attack, but if they are very well funded or if the password storage algorithm is weak, the attacker can start enumerating all possible passwords.

Of these attacks, the online attacks are much more common. Ideally, applications would not be vulnerable to SQL injections, insiders would not get compromised or act maliciously, and database backups would never be lost. However, it would be irresponsible to ignore the possibility of an offline attack. Given this, the priorities of a web application should be (in order):

1. **Prevent password reuse, especially with known compromised passwords** This is impossible to do completely, and also can present user interface issues. However, there are services such as those from [Have I Been Pwned](https://haveibeenpwned.com/) (English, [subscriptions for API use start at US$40/year](https://haveibeenpwned.com/API/Key)), [Hold Security](https://holdsecurity.com/solutions/credential-integrity-service/), [SpyCloud](https://spycloud.com/products/consumer-ato-prevention/), etc that can tell you if a particular username and password have appeared in a password dump. [Password dump compilations](https://www.troyhunt.com/introducing-306-million-freely-downloadable-pwned-passwords/) can also be downloaded and checked locally.
2. **Prevent the use of common passwords** Pages that allow users to set their password should compare the user’s password against a list of the most common passwords (usually obtained from password dumps). Some of those lists are available on [GitHub](https://github.com/danielmiessler/SecLists/tree/master/Passwords/Common-Credentials). Note that attackers will use the same lists, so merely blocking the 100 or 1000 most common passwords is unlikely to be very effective.
3. **Ensure passwords have enough entropy to resist brute-force attacks** Even though something like “w)\*l3” is not a common password, it will be quickly discovered in a brute-force attack. Setting a minimum password length can help mitigate brute-force attacks.

Of course, these priorities must be balanced against the requirements of the user to either use a password manager or to remember their password. Also, passwords as an authentication method are fairly problematic; the next section covers multifactor authentication and password alternatives.

For more information on password strength, see [this summary of the US Government’s NIST authentication guidelines](https://blog.netwrix.com/2022/11/14/nist-password-guidelines/).

### Multifactor Authentication

As you may have surmised from the previous section, password security is very difficult. It gets worse when you consider social engineering attacks such as phishing.

#### Phishing and Related Attacks

[Phishing](https://en.wikipedia.org/wiki/Phishing) is one of a class of social engineering attacks that attackers use to attack individuals. Although phishing can have many aims (such as convincing users to install malware on their computer or transfer money to attackers), the goal we care about is stealing users’ passwords. Although phishing usually refers to attacks launched via email, similar techniques can be used over a variety of communications mediums, such as SMS, WhatsApp, Signal, and even QR codes.

In a typical credential phishing campaign, attackers will send emails to their victims purporting to be sent from a legitimate website. The email will contain a call to action (such as requiring a password change or acknowledging a notification) with a link to an attacker-controlled website that has a legitimate-looking login page. If a victim clicks the link, and then enters their password on the website, the site sends their password to the attacker. (For much more on phishing, see the [Investigating Malicious Infrastructure Learning Path](/en/learning-path/1/).)

Phishing attacks are extremely low cost for attackers, and tend to be extremely effective. Once the attacker has the victim’s password, they can log into the target website as the victim. With preparation, the attacker can use automation to immediately perform actions on the victim’s account, including changing the user’s email address and password to lock the victim out of their own account.

Given the danger of phishing attacks, and the complete inability to password authentication to stop phishing, any multifactor authentication scheme should be evaluated against its phishing resistance.

#### Multifactor Authentication Overview

Traditionally, there are three types of things (called factors) that can be used for authentication:

- **Something you know** The most common form of this is the password; it is a thing that you (and hopefully only you) know. This is very popular because it’s very easy to generate a secret password, and generally easy to change.
- **Something you have** The most common form of this is a key; it is a thing that you have that is hard to reproduce. This is less popular because it’s easy to lose, hard to set up initially, and hard to change.
- **Something you are** The most commonly-known form of this is a fingerprint, but facial recognition is increasingly popular; it’s something intrinsic to you. These are surprisingly easy to “lose” (such as a burn damaging fingerprints, extremely difficult to change intentionally, and verification tends to be error prone.

MFA (multifactor authentication) combines two or more of these factors together to strengthen a system’s authentication system. There are many examples of multifactor authentication in everyday life. Using an ATM requires something you have (the card) and something you know (your PIN). Many building access control systems have a badge to open a door, but that badge also brings up the badge holder’s face on a display that a guard can see, combining something you have (the badge) with something you are (your face).

In the remainder of this subsection, we’ll discuss a variety of common web MFA methods.

#### Secret Questions

Although this is technically not MFA (it combines multiple things that the user knows), it was very popular in the past, and is still in use in many contexts. Using secret questions as part of authentication does provide some degree of defense against password reuse and password guessing attacks. Beyond that, it provides very little protection. It is almost worthless against phishing. The attacker’s website can simply attempt to log into the real website, and then turn around and ask the user the secret questions. Additionally, as discussed in the Password Reset subsection above, the secret question answers are frequently guessable. For these reasons, secret questions are not a strong MFA method.

#### SMS Codes

An actual MFA method in common use is to text the user a code when they log in, then require that code to complete the login process. This combines something the user knows (their password) with something they have (the phone that receives messages at a certain number). Unfortunately, SMS codes are almost worthless against phishing. When the user logs into the attacker controlled fake website, the fake website will log into the real website. The real website will text the user, and the user then enters the code into the fake website. The fake site then uses the code on the real site, and is then logged in as the victim. Additionally, [SIM swapping](https://en.wikipedia.org/wiki/SIM_swap_scam) attacks can allow attackers to take over a victim’s phone number, allowing the attacker to receive SMS messages intended for the victim. For these reasons, SMS codes are not a strong MFA method for sensitive or important websites.

#### TOTP

TOTP stands for Time-based One-Time Password. To initiate the system, the server and a device controlled by the user exchange a cryptographic secret (the “seed”) and synchronize their clocks. Then, when a user wishes to authenticate to a website, the user’s device performs a cryptographic operation on the seed and the current time, generating a code that’s only good for seconds or minutes. The server performs the same operation, and uses that to check the user’s code. In the past, the most common TOTP system was RSA SecureIDs, which were expensive. Now, most TOTP systems run on smartphones. Examples include Google Authenticator and Authy. Regardless, TOTP functions as something you have (the TOTP seed) for purposes of authentication.

Like SMS codes, TOTP is also vulnerable to phishing. The attacker-controlled fake site can simply ask the user for their TOTP code and use it to log into the real site. For this reason, TOTP is not a strong MFA method for sensitive or important websites. Also note that if a user loses or wipes their phone, they are unlikely to be able to authenticate to the site, as they have lost their TOTP seed.

#### Security Keys

Security keys (sometimes referred to as U2F, FIDO, WebAuthentication, Yubikeys, etc) are devices that implement a [cryptographic authentication protocol](https://developers.yubico.com/U2F/Protocol_details/Overview.html). When you register a security key with a website, the site and the key exchange public key. For subsequent authentication, the server presents a signed challenge to the device. The device verifies the site’s signature, and then responds with a signed response. Finally, the server verifies the device’s signature. This proves to the server that you are in possession of the key that was registered initially, making it something you have. Traditionally, security keys were stand-alone devices that talked to a computer or mobile device over USB or NFC, although support for using smartphones and computers is available in some configurations.

Unlike the other MFA discussed here, security keys are resistant to phishing. The key here is that the signed challenge includes the identity of the website requesting authentication. For a valid site, this will match an existing site key on the device. For a lookalike attacker-controlled site, the site will not match any existing site key, and so no MFA will take place. So, the attacker may have the user’s password, but they will not be able to complete authentication to the target website, as there’s no way for the attacker to complete the MFA process. On the minus side, security keys can be lost. Generally, sites that use security keys will allow users to register multiple keys, so that if one is lost or damaged, a back-up can be used.

#### Single-use passwords

Pre-generated single use passwords are sometimes used as a backup for other MFA methods, and were [used for high-security applications](https://www.researchgate.net/figure/A-typical-one-time-password-OTP-scheme-used-by-European-banks-Stahlberg-2007-p-2_fig3_49279643) before the widespread use of smartphones. Modern websites will frequently refer to these as “backup codes.” The server will generate a list of codes, store them, and present them to the user. The user would generally print them out and store the paper in a secure location. Each time a code is used, it is marked as invalid by the server. These are subject to the same weaknesses as TOTP, but have a perverse advantage of being very inconvenient. As such, they are frequently used as a backup for other MFA methods. The hope is that their use is rare enough that, if a user is prompted to enter a backup code, they will stop and highly scrutinize the requesting website, making a phishing attack less likely to succeed. Examples of sites using backup codes are [Gmail](https://support.google.com/accounts/answer/1187538?hl=en&co=GENIE.Platform%3DDesktop) and [GitHub](https://docs.github.com/en/authentication/securing-your-account-with-two-factor-authentication-2fa/configuring-two-factor-authentication-recovery-methods).

For a bit more authentication, see [the OWASP authentication cheat sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html) and [the OWASP MFA cheat sheet](https://cheatsheetseries.owasp.org/cheatsheets/Multifactor_Authentication_Cheat_Sheet.html). For an in-depth exploration, see the <span style="text-decoration:underline;">Web Application Security Assessment learning path</span>.

### Session fixation

[Session fixation](https://owasp.org/www-community/attacks/Session_fixation#:~:text=Session%20Fixation%20is%20an%20attack,specifically%20the%20vulnerable%20web%20application.) is an important concept in web security. It refers to an attack where an attacker sets a user's session identifier (session ID) to a value known to the attacker. This can occur through various means, such as phishing attacks or by exploiting vulnerabilities in the web application. The attack involves acquiring a valid session ID, persuading a user to authenticate with it, and then taking over the session by leveraging the known session ID. This requires the attacker to supply a genuine web application session ID and manipulate the targeted person’s browser into using it. They can then hijack the user's session, gaining unauthorized access to the user's account.

Session fixation exploits weaknesses in how a web application manages session IDs. Essentially, the vulnerable application fails to assign a new session ID during user authentication, enabling the attacker to utilize an existing session ID. Unlike Session Hijacking, which occurs after user login, Session Fixation establishes control over a session before user authentication.

Various techniques can be used to execute this attack, depending on how the web application handles session tokens:

1. Session token in the URL argument: The attacker sends the Session ID to the victim via a hyperlink, leading the victim to access the site through the malicious URL.
2. Session token in a hidden form field: The attacker tricks the targeted person into authenticating on the target web server using a login form developed by the attacker, potentially hosted on an illegitimate server or within an HTML-formatted email.
3. Session ID in a cookie:

- Client-side script: Utilizes client-side scripting to inject malicious code, often via Cross-site Scripting (XSS) attacks, into a hyperlink, fixing a Session ID in the targeted person’s cookie using the document.cookie function.
- &lt;meta> tag: Another form of code injection attack, which is more potent than XSS as it cannot be readily disabled or denied by browsers.
- HTTP header response: Exploits server responses to embed the Session ID in the victim's browser by including the "Set-Cookie" parameter in the HTTP header response.

Many web frameworks and libraries offer features to aid developers in implementing secure session management, which helps to mitigate session fixation vulnerabilities. These frameworks often include built-in mechanisms for generating, storing, and validating session IDs. They may allow for configuring session expiration, regenerating session IDs upon authentication, and ensuring secure transmission of session data. However, it could be useful for developers to effectively implement these practices within their application code as well, ensuring proper configuration and usage to mitigate session fixation and other vulnerabilities. Regular updates to libraries and frameworks are crucial, as they may contain patches or improvements related to session management security.

#### Preventing Session Fixation Vulnerabilities

For most web server administrators, the best way of mitigating for session fixation vulnerabilities is to make sure that the software stack you use for authentication contains mitigations against such attacks and also up to date. If you are using a library which has a vulnerability which allows for session fixation, make sure to upgrade it as soon as you can.

Web apps, libraries, and frameworks take several steps to mitigate session fixation attacks. Those include generating random session IDs for each user session, expiring sessions after a period of inactivity, and implementing measures like session ID regeneration upon authentication. Your web app should always be using HTTPS for security and privacy, and it likewise offers an additional layer of protection against session fixation attacks: it’s much harder to intercept session IDs in transit if communication between the client and server is encrypted. Finally, your web app should also reject externally imposed session tokens, which will also help protect against this type of attack.

If you are going to be coding a web app with authentication capabilities, we recommend that read through [this article](https://secureteam.co.uk/2018/11/25/understanding-session-fixation-attacks/) and implement the following measures it recommends, which help protect the web application against session fixation attacks:

1. Avoid accepting Session IDs via GET or POST parameters, as this mitigates the risk of exploitation by minimizing reliance on browser vulnerabilities. Additionally, all Session IDs should be server-generated, eliminating any need for client-proposed Session IDs.
2. Post-login, initiate a Session ID change by generating a new one on the server and updating it as a cookie. Concurrently, invalidate any existing session associated with the user.
3. Incorporate a logout functionality empowering users to terminate their sessions promptly, thereby ensuring immediate server-side session termination instead of merely deleting the browser cookie. Additionally, implement session expiration mechanisms to automatically invalidate session data after a predefined time-lapse, thus limiting the window of opportunity for attackers to leverage compromised sessions.


## Practice

### Exercise 1: Broken access controls

Go to the Try Hack Me website, create an account, and go through the room called[ OWASP Broken Access Control](https://tryhackme.com/room/owaspbrokenaccesscontrol) and follow the instructions.

### Exercise 2: Using rainbow tables to better understand insecure password storage mechanisms (optional)

Note: _while this exercise provides a great learning opportunity on how adversaries could crack badly secured passwords, it does require quite a bit of free disk space and uses a tool which is only available on Windows and Linux. Since not all learners might be able to do this practice exercise, we have marked it as clearly optional. We encourage learners who want to learn more about rainbow tables and secure password storage, both those who can and cannot do the below exercise, to consult further reading through posts such as [this one](https://cybr.com/certifications-archives/hash-tables-rainbow-table-attacks-and-salts/)._

When authenticating users we need a way to verify whether they entered correct credentials. The easiest way of doing that is to store the password itself in a database. This is insecure, as anyone with access to that database could learn users’ plaintext passwords, and they would be revealed in case of a leak or application vulnerability. A simple protection can be implemented by storing a [hash value](https://en.wikipedia.org/wiki/Cryptographic_hash_function) of the password instead. This exercise will demonstrate how easy it is to break such protection and learn plaintext passwords from hashed values. **The point of this exercise is not to make learners believe that all authentication mechanisms can be easily broken but rather to demonstrate how easy it is to break passwords which have only been hashed without any additional security mechanisms such as salting.**

[Rainbow tables](https://en.wikipedia.org/wiki/Rainbow_table) are a smart way of reducing computation time in exchange for disk space when trying to brute-force a hashed password. They consist of pre-calculated chains of hashes that can be used to discover a hashed value (the plaintext password).

#### The exercise

Given the hash value of `168f3c743786fea2e04aeeee33e112da` , try to discover the password using rainbow tables. 🌈 Use RainbowCrack ([http://project-rainbowcrack.com/](http://project-rainbowcrack.com/)). The easiest way to run RainbowCrack might be to use Kali Linux ([https://www.kali.org/](https://www.kali.org/)) in a VM or booted from a LiveUSB (refer to the links in _Basic information_ section at the beginning of this learning path for more info). The hashing algorithm is MD5 and the hash is unsalted.

_Hint:_ the password is lowercase alphanumeric, max. 6 characters. Once you’ve installed RainbowCrack you can use the following command to generate the required table:

```
rtgen md5 loweralpha-numeric 1 6 0 3800 1000000 0
```

\_(Optional) \_Try to use the generated table to break another hash: `feadfd87d487818698d63aedf385c4e2`.

_Hint:_ If that fails you can try to generate more tables to increase the success rate of your table set (coverage). Just change the fifth parameter of the `rtgen` command to different values (try 1-5).

Try to break the following salted hash: `93e99d25dd6e8f524f23814908b6c039`

#### The walkthrough

Generating a rainbow table requires specifying a hash algorithm to use, maximum length of the plaintext values were interested in and their character set. Those parameters only influence the time it takes for a table to be generated (amount of computation required).

Tables for shorter passwords with smaller character sets (eg. only lowercase letters) will take a shorter time to generate than tables for long passwords with numbers and special characters.

Additionally, you need to choose how many chains to generate and of what length. Those parameters are more complex to explain (see [Philippe Oechslin's whitepaper](https://www.iacr.org/archive/crypto2003/27290615/27290615.pdf) for more background) but have effects on coverage of the table. Only a subset of all possible plaintext values is included in each rainbow table.

The bigger the values of these parameters, the larger and more costly (in terms of CPU time) the table is, but also the more plaintext values can be discovered using it.

Pre-calculated tables for different hash functions, password lengths and character sets can be downloaded from the Internet (eg. [https://freerainbowtables.com/](https://freerainbowtables.com/)) or obtained at IT security conferences and hacker camps (see [https://dcddv.org/](https://dcddv.org/)). For the purposes of this exercise we'll generate our own!

You can install rainbowcrack on your system or use Kali Linux Live. For Kali, open a terminal window and run:

```
sudo apt update
sudo apt install rainbowcrack
```

This will install the software. You can use the `rtgen` command to generate tables. According to [its manual](http://project-rainbowcrack.com/generate.htm) the command takes quite a few parameters:

```
rtgen hash_algorithm charset plaintext_len_min plaintext_len_max table_index chain_len chain_num part_index
```

We'll use MD5 as our hash algorithm. We'll be looking for passwords of length from 1 to 6 characters. We'll use the `loweralpha-numeric` charset, which includes lowercase letters and numbers only. We're going to use 3800 for chain length, 1000000 for number of chains.

To generate our first table run:

```
sudo rtgen md5 loweralpha-numeric 1 6 0 3800 1000000 0
```

This command might take a while to execute, depending on your system configuration.

After generation, one more step is required before we can use our new tables:

```
sudo rtsort
```

This will sort the data to make using the table faster. `rtcrack` will refuse to work with unsorted tables.

Let's take a crack at our first hash:

```
rcrack . -h 168f3c743786fea2e04aeeee33e112da
```

This should take just a moment and reveal our plaintext password:

```
1 rainbow tables found
memory available: 11361376665 bytes
memory for rainbow chain traverse: 60800 bytes per hash, 60800 bytes for 1 hashes
memory for rainbow table buffer: 2 x 16000016 bytes
disk: ./md5_loweralpha-numeric#1-6_0_3800x1000000_0.rt: 16000000 bytes read
disk: finished reading all files


plaintext of 168f3c743786fea2e04aeeee33e112da is 1nfus3


statistics
----------------------------------------------------------------
plaintext found:                             1 of 1
total time:                                  0.33 s
time of chain traverse:                      0.22 s
time of alarm check:                         0.11 s
time of disk read:                           0.00 s
hash & reduce calculation of chain traverse: 7216200
hash & reduce calculation of alarm check:    4133612
number of alarm:                             3194
performance of chain traverse:               32.80 million/s
performance of alarm check:                  36.91 million/s


result
----------------------------------------------------------------
168f3c743786fea2e04aeeee33e112da  1nfus3  hex:316e66757333
```

Success! Now let's try our second hash:

```
rcrack . -h feadfd87d487818698d63aedf385c4e2
```

The result:

```
1 rainbow tables found
memory available: 11236982784 bytes
memory for rainbow chain traverse: 60800 bytes per hash, 60800 bytes for 1 hashes
memory for rainbow table buffer: 2 x 16000016 bytes
disk: ./md5_loweralpha-numeric#1-6_0_3800x1000000_0.rt: 16000000 bytes read
disk: finished reading all files


statistics
----------------------------------------------------------------
plaintext found:                             0 of 1
total time:                                  0.31 s
time of chain traverse:                      0.20 s
time of alarm check:                         0.11 s
time of disk read:                           0.00 s
hash & reduce calculation of chain traverse: 7216200
hash & reduce calculation of alarm check:    4238786
number of alarm:                             3324
performance of chain traverse:               36.08 million/s
performance of alarm check:                  37.18 million/s


result
----------------------------------------------------------------
feadfd87d487818698d63aedf385c4e2  <not found>  hex:<not found>
```

We didn't find our hash in this table. Let's generate a few more tables with the hope of increasing our coverage. We'll use the same `rtgen` command, only changing the `table_index` parameter:

```
sudo rtgen md5 loweralpha-numeric 1 6 1 3800 1000000 0
sudo rtgen md5 loweralpha-numeric 1 6 2 3800 1000000 0
sudo rtgen md5 loweralpha-numeric 1 6 3 3800 1000000 0
sudo rtgen md5 loweralpha-numeric 1 6 4 3800 1000000 0
sudo rtgen md5 loweralpha-numeric 1 6 5 3800 1000000 0
sudo rtsort .
```

Let's try again:

```
rcrack . -h feadfd87d487818698d63aedf385c4e2
```

The result:

```
6 rainbow tables found
memory available: 10784174899 bytes
memory for rainbow chain traverse: 60800 bytes per hash, 60800 bytes for 1 hashes
memory for rainbow table buffer: 6 x 16000016 bytes
disk: ./md5_loweralpha-numeric#1-6_0_3800x1000000_0.rt: 16000000 bytes read
disk: ./md5_loweralpha-numeric#1-6_1_3800x1000000_0.rt: 16000000 bytes read
disk: ./md5_loweralpha-numeric#1-6_2_3800x1000000_0.rt: 16000000 bytes read
disk: ./md5_loweralpha-numeric#1-6_3_3800x1000000_0.rt: 16000000 bytes read
disk: ./md5_loweralpha-numeric#1-6_4_3800x1000000_0.rt: 16000000 bytes read
disk: ./md5_loweralpha-numeric#1-6_5_3800x1000000_0.rt: 16000000 bytes read
disk: finished reading all files
plaintext of feadfd87d487818698d63aedf385c4e2 is trolo0


statistics
----------------------------------------------------------------
plaintext found:                             1 of 1
total time:                                  0.54 s
time of chain traverse:                      0.41 s
time of alarm check:                         0.13 s
time of disk read:                           0.02 s
hash & reduce calculation of chain traverse: 14432400
hash & reduce calculation of alarm check:    4766264
number of alarm:                             4606
performance of chain traverse:               35.46 million/s
performance of alarm check:                  36.66 million/s


result
----------------------------------------------------------------
feadfd87d487818698d63aedf385c4e2  trolo0  hex:74726f6c6f30
```

Got it! Additional tables increased the coverage and the hash was found out.

An improvement on using simple hashing for password protection is called “salting” the hashes – adding an application-specific secret to the plaintext value. That increases the length and character set of the hashed value, making a rainbow table approach infeasible. Trying the third (salted) hash given in this exercise will fail with this method as it would require rainbow tables bigger than can be currently generated (and stored).

## Skill Check

### Exercise 1: recap

Complete the exercise we described above: carry out a SQL injection on DVWA and compare the hashes you discovered to those you found on a hash lookup site.

### Exercise 2: multiple choice quiz

Broken authentication represents a significant threat to the security of web applications, allowing attackers to compromise user credentials, hijack sessions, and gain unauthorized access to sensitive information. In this set of multiple-choice questions, you can explore the concept of broken authentication and delve into the various risks associated with this vulnerability. Additionally, if you have a mentor or with a peer you can examine different types of flaws that can lead to compromised authentication mechanisms and discuss specific mitigation strategies tailored to address each of these vulnerabilities effectively.

Enhance your understanding of web application security and learn how to mitigate the risks posed by broken authentication with these questions:

**Question 1**. What is broken authentication in the context of web application security?

A) A vulnerability that allows attackers to execute arbitrary code on the server.\
B) An exploit that grants unauthorized access to restricted parts of a web application.\
C) A weakness in the authentication mechanism of a web application, leading to compromised user credentials.\
D) A security flaw that enables attackers to intercept communication between the client and server.

{{< question title="Answer" >}}
1. B) A weakness in the authentication mechanism of a web application, leading to compromised user credentials.
{{< /question >}}

**Question 2**. What are the potential risks associated with broken authentication vulnerabilities?

A) Unauthorized access to sensitive data and user accounts.\
B) Exposure of session tokens, leading to session hijacking attacks.\
C) Compromise of user credentials, including passwords and authentication tokens.\
D) All of the above.

{{< question title="Answer" >}}
2. D) All of the above.
{{< /question >}}

**Question 3**. Which of the following is NOT an example of a mitigation mechanism for broken authentication vulnerabilities?

A) Implementing multi-factor authentication (MFA) for user accounts.\
B) Enforcing strong password policies, including regular password rotation.\
C) Disabling HTTPS to prevent interception of authentication credentials.\
D) Implementing account lockout mechanisms to prevent brute force attacks.

{{< question title="Answer" >}}
3. C) Disabling HTTPS to prevent interception of authentication credentials.
{{< /question >}}

**Question 4**. Which type of flaw may lead to compromised authentication mechanisms by allowing attackers to guess or crack user passwords?

A) Session Fixation\
B) Cross-Site Request Forgery (CSRF)\
C) Insufficient Password Complexity\
D) Cross-Site Scripting (XSS)

{{< question title="Answer" >}}
4. C) Insufficient Password Complexity
{{< /question >}}

**Question 5**. What is a specific example of a mitigation strategy for addressing the flaw of insufficient password complexity?

A) Implementing CAPTCHA challenges during the login process.\
B) Enforcing password length and complexity requirements.\
C) Encrypting authentication tokens to prevent interception.\
D) Whitelisting trusted IP addresses for accessing the login page.

{{< question title="Answer" >}}
5. B) Enforcing password length and complexity requirements.
{{< /question >}}

**Question 6**. Which mitigation strategy aims to prevent attackers from exploiting session fixation vulnerabilities?

A) Implementing session timeout mechanisms.\
B) Encrypting session cookies using HTTPS.\
C) Regenerating session identifiers after successful authentication.\
D) Enforcing strong password policies for user accounts.

{{< question title="Answer" >}}
6. C) Regenerating session identifiers after successful authentication.
{{< /question >}}

**Question 7**. What type of flaw may lead to compromised authentication mechanisms by allowing attackers to hijack active user sessions?

A) Insufficient Session Expiration\
B) Insecure Token Storage\
C) Cross-Site Scripting (XSS)\
D) Cross-Site Request Forgery (CSRF)

{{< question title="Answer" >}}
7. A) Insufficient Session Expiration
{{< /question >}}

**Question 8**. Which mitigation strategy addresses the flaw of insecure token storage by securely managing authentication tokens?

A) Storing tokens in plaintext within client-side cookies.\
B) Encrypting tokens using a symmetric encryption algorithm.\
C) Implementing secure password hashing algorithms.\
D) Using HTTP headers for transmitting authentication tokens.

{{< question title="Answer" >}}
8. B) Encrypting tokens using a symmetric encryption algorithm.
{{< /question >}}

**Question 9**. What is a specific example of a mitigation strategy for preventing session fixation attacks?

A) Rotating session identifiers after a successful login.\
B) Implementing multi-factor authentication (MFA).\
C) Using CAPTCHA challenges to verify user authenticity.\
D) Enforcing strict input validation on the login form.

{{< question title="Answer" >}}
9. A) Rotating session identifiers after a successful login.
{{< /question >}}

**Question 10**. What type of flaw may lead to compromised authentication mechanisms by allowing attackers to forge requests to the web application while authenticated as another user?

A) Insufficient Session Expiration\
B) Insufficient Transport Layer Protection\
C) Cross-Site Scripting (XSS)\
D) Cross-Site Request Forgery (CSRF)

{{< question title="Answer" >}}
10. D) Cross-Site Request Forgery (CSRF)
{{< /question >}}




الموضوع الفرعي 2: التحقق من صحة البيانات
حالة استخدام
تتعلق فئة شائعة من الثغرات في تطبيقات الويب بالطريقة التي يعالج بها التطبيق البيانات التي يقدمها مستخدمو الموقع، ويكثر استخدام فئة الثغرات الأمنية هذه من قبل المهاجمين للتحكم بالكامل بمواقع الويب المستهدفة، وغالبًا ما يمكن اكتشافها عبر التقنيات الآلية. يُعدّ فهم آليات ثغرات التحقق من صحة البيانات مفيدًا للغاية أيضًا لتوضيح مواضيع الأمان المعقدة.
الأهداف 

بعد استكمال هذا الموضوع الفرعي، يجب أن يكون الممارسون قادرين على القيام بما يلي:
فهم الأنواع الشائعة من ثغرات التحقق من صحة البيانات
فهم الآثار المحتملة لهذه الأنواع من الثغرات
فهم آليات عمل هذه الثغرات
فهم كيفية منع ثغرات هذه بشكل عام
العرض 

تشمل الفئة الأولى من الثغرات الأمنية الخاصة بتطبيقات الويب تلك المتعلقة بالتحقق من صحة البيانات، وهناك العديد من الأنواع المختلفة من ثغرات التحقق من صحة البيانات ويمكن أن تحدث في أي نظام يعالج الإدخال. بشكل عام تحدث هذه الثغرات عندما يفترض التطبيق ضمنًا أمورًا حول طول و/أو محتوى البيانات التي يتم إرسالها، وعند استلام المدخلات و/أو معالجتها "تُفلت" البيانات من سياقها المقصود وتصبح رمزًا في سياقها الجديد. وسنتحدث عن كيفية نجاح ذلك وعواقبه وكيفية إصلاح الثغرة الأمنية لكل نوع محدد، وتأكد من أن تقرأ بالترتيب لأن جميع الأقسام مرتبطة بالأقسام التي تسبقها.

البرمجة النصية عبر المواقع (Cross site scripting أو XSS)
يأتي اسم "البرمجة النصية عبر المواقع" من طريقة عمل العمليات السابقة لاستغلال ثغرات البرمجة النصية عبر المواقع، ومن المرجح أن اسم "حقن جافا سكريبت" أفضل لوصفها ولكن الاسم القديم يبقى لأسباب تاريخية. تحدث البرمجة النصية عبر المواقع عندما يفسر المتصفح إدخال المستخدم على أنه جافا سكريبت، ويسمح هذا للمهاجم إلى حد ما بالتحكم في متصفح الويب الخاص بالشخص المستهدف في سياق موقع الويب المستهدف. يمكن للمهاجم سرقة ملفات تعريف الارتباط الخاصة بالشخص المستهدف مما يسمح للمهاجم بانتحال شخصيته على الموقع. بالإضافة إلى ذلك، يمكن للمهاجم استخراج أي من بيانات الشخص المستهدف تلقائيًا من موقع الويب المستهدف ويمكنه بالمثل تنفيذ إجراءات على الموقع المستهدف مثل المستخدم. وأخيرًا يمكن للمهاجم تغيير مظهر موقع الويب للشخص المستهدف على سبيل المثال عرض صفحة إعادة مصادقة مزيفة ترسل بيانات اعتماد المستخدم إلى المهاجم أو تطلب منهم تنزيل برمجيات ضارة يُزعم أنها تأتي من موقع موثوق به.
في حين أن هذا الهجوم قوي إلاّ أن هناك حدودًا، ويقتصر المهاجم على التحكم في محتوى موقع الويب المستهدف في سياق متصفح المستخدم، ولا يمكن للمهاجم التفاعل مع مواقع الويب الأخرى وتقتصر إجراءاته على ميزات أمان المتصفح. 
يعمل هذا الهجوم من الناحية الميكانيكية من خلال تطبيق ويب يتلقى بيانات المستخدم ثم يدمج بيانات المستخدم هذه مباشرة في صفحة ويب. فكر في حالة موقع منتدى مناقشة يسمح للمستخدمين باختيار الاسم المعروض:

تحتوي صفحة الويب غير الفاخرة هذه على رمز لغة تمييز النص التشعبي التالي:
<{1>html><{2>body><{3>form>
  Name: <{2>input name="disp_name"><{7>br>
  <{1>input type="submit">
</{1>form></{2>html>

عندما يتلقى اسمًا من المستخدم فإنه يعرضه في النموذج:

باستخدام لغة تمييز النص التشعبي التالية:

<{1>html><{2>body><{3>form>
  Name: <{2>input name="disp_name" value="Alice"><{11>br>
  <{1>input type="submit">
</form></html>

تبدو الأمور على خير حتى الآن، ولكن ماذا سيحدث إذا أدخل المستخدم بعض المدخلات الأكثر صعوبة، مثل:
Alice"><script>alert("Owned by Alice")</script><i q="
عند إنشاء صفحة الويب ستبدو مختلفة بعض الشيء:

كيف حصل ذلك؟ لنستخدم بعض الألوان لتسليط الضوء على ما يحدث، وتذكر أن تطبيق الويب يتعامل فقط مع مدخلات المستخدم كنص وليس لديه أي فكرة عن الألوان.
Alice"><script>alert("Owned by Alice")</script><i q="
يأخذ التطبيق ببساطة المدخلات من المستخدم ويضعها حرفيًا ضمن لغة تمييز النص التشعبي التي يولدها ومن وجهة نظر تطبيق الويب ومتصفح الويب كله مجرد نص غير متمايز.
<html><body><form>
  Name: <input name="disp_name" value="Alice"><script>alert("Owned by
    Alice")</script><i q=""><br>
  <input type="submit">
</form></html>

لاحظ "> باللون الأحمر.  تخبر هذه العلامة المتصفح باكتمال سمة قيمة إدخال لغة تمييز النص التشعبي ووسم الإدخال بعد ذلك. يأتي النص باللون الأزرق بعده على شكل علامة نصية تُشغل جافا سكريبت التي تظهر مربع تنبيه. أخيرًا يُستخدم <i q=" لأغراض التنظيف حيث يمنع صفحة الويب من عرض بقايا وسم الإدخال الأصلي، ويمكننا استخدام تمييز وتنسيق ألوان مختلفة لإظهار كيفية تفسير المتصفح لصفحة الويب التي تم إنشاؤها:
<{1>html><{2>body><{3>form>
  Name: <{2>input name="disp_name" value="Alice"><{11>script>alert("Owned by
    Alice")</{3>script>
  <{1>i q=""><{4>br>
  <{1>input type="submit">
</{1>form></{2>html>

كما هو الحال لا يتسبب مثال البرمجة النصية عبر المواقع هذا بأي شيء ضار والشخص الوحيد المتأثر هو أليس (Alice) نفسها، ولكن إذا تمكنت مهاجمتنا أليس من جعل شخص آخر يرى اسمها المعروض وكانت جافا سكريبت الخاصة بها تتسبب بشيء ضار فسيكون بإمكانها أداء هجوم حقيقي.
جرب بنفسك!
سجّل الدخول إلى دي في دبليو إيه الخاص بك وتأكد من تعيين مستوى الأمان ليكون منخفضًا (انظر قسم "الإعداد" في مقدمة مسار التعلّم هذا لمزيد من المعلومات). انتقل إلى قسم "البرمجة النصية عبر المواقع (المعكوس)" سترى أن حقل إدخال “What’s your name?” معرّض لثغرة البرمجة النصية عبر المواقع> جرّب بعدها إدخال اسم يتسبب في ظهور مربع تنبيه جافا سكريبت عند النقر على زر "إرسال".

الوقاية من البرمجة النصية عبر المواقع
وتسمى أفضل تقنية لمنع البرمجة النصية عبر المواقع يمكن استخدامها هي ترميز الإخراج، ولاحظ أنه في المثال أعلاه تم تمكين الهجوم من خلال استخدام المحرفين " و >، حيث تتحكم هذه المحارف في بنية الصفحة في سياق صفحات الويب. في لغة تمييز النص التشعبي يمكن ترميز جميع هذه المحارف بحيث يعرف متصفح الويب أن يعرض اقتباسًا مزدوجًا أو قوس زاوية بدلًا من تعديل بنية الصفحة، وفي هذه الحالة إذا تم ترميز بيانات أليس قبل دمجها في صفحة الويب فسيتم إنشاء لغة تمييز النص التشعبي التالية:
<{1>html><{2>body><{3>form>
  Name: <{2>input name="disp_name" value="Alice&quot;&gt;&lt;script&gt;alert(&quot;Owned by Alice&quot;)&lt;/script&gt;&lt;i q=&quot;"><{27>br>
  <{1>input type="submit">
</{1>form></{2>html>

والتي من شأنها أن تعرض ما يلي:

يعتمد ترميز المخرجات على السياق الذي سيتم فيه استخدام البيانات، وبالنسبة للغة تمييز النص التشعبي يمكنك ترميز كيانات لغة تمييز النص التشعبي في البيانات. أما بالنسبة للبيانات التي سيتم تضمينها في كتلة جافا سكريبت سيتم استخدام ترميز مختلف. في حال كان من المقرر استخدام بيانات المستخدم في استعلام قاعدة بيانات فسيتم استخدام نوع آخر من الترميز، ويجب أن تحتوي أطر الويب والمكتبات على وظائف لأداء ترميز الخرج لك ومن الأفضل (نأمل) استخدام هذه الوظائف المتقدمة بدلًا من محاولة كتابتها بالاستناد إلى المبادئ الأولى. 
لمزيد من المعلومات حول البرمجة النصية عبر المواقع، راجع دليل مشروع أمان تطبيق الويب المفتوح للبرمجة النصية عبر المواقع (XSS) ولأجل دراسة متعمقة راجع مسار تعلّم تقييم أمان تطبيقات الويب.
حقن لغة الاستعلامات البنيوية (SQLi)
حيث تسمح البرمجة النصية عبر المواقع لبيانات المستخدم بالخروج من سياقها وتفسيرها على أنها لغة تمييز النص التشعبي وجافا سكريبت في متصفح الويب الخاص بالضحية، يسمح حقن لغة الاستعلامات البنيوية  لبيانات المستخدم بالخروج من سياقها وتفسيرها على أنها لغة الاستعلامات البنيوية في قاعدة بيانات تطبيق الويب. وتستخدم معظم تطبيقات الويب قاعدة بيانات خلفية لتخزين البيانات واستردادها، حيث عادة ما تستخدم لغة الاستعلامات البنيوية لتحقيق الوصول إلى البيانات هذا ويمكن أن يحدث حقن لغة الاستعلامات البنيوية عند استكمال بيانات المستخدم في استعلام. 
نظرًا لأن لغة الاستعلامات البنيوية التي يتحكم فيها المهاجم تعمل في بيئة الخادم، فإن ثغرات حقن لغة الاستعلام البنيوية تكون عمومًا أكثر خطورة من البرمجة النصية عبر المواقع. وبينما تسمح ثغرة البرمجة النصية عبر المواقع للمهاجم باستهداف المستخدمين الآخرين ربما من خلال نوع من الانتحال بالهندسة الاجتماعية ويمكن لحقن لغة الاستعلامات البنيوية أن يمنح المهاجم حق الوصول للقراءة والكتابة إلى جميع بيانات المستخدم على الموقع. يمكن للمهاجم أيضًا قراءة وكتابة أي بيانات أخرى مخزنة في قاعدة البيانات التي يمكن لتطبيق الويب تقييمها، وفي كثير من الأحيان يمكن للمهاجم استخدام وصول لغة الاستعلامات البنيوية للحصول على القدرة على تشغيل الأوامر على خادم قاعدة البيانات نفسه والوصول بشكل كامل عن بُعد إلى البنية التحتية الخلفية للموقع.
كيف يعمل حقن لغة الاستعلامات البنيوية؟ فكر في تطبيق ويب توجد فيه منصة تذاكر تسرد اسم كل أداة ووصفها وإصدارها في فئة، حيث سيقوم المستخدم أيضًا بإرسال معلمة معرف وقد تكون موجودة في عنوان موقع ويب للصفحة التي تقدم الطلب، كما يبدو الكود البرمجية التي تنشئ لغة الاستعلام البنيوية التي تسترد هذه البيانات كما يلي:
$sql = 'select productid, name, description, version from products where categoryid='+request_params['id']
عندما يرسل المستخدم معلمة id  مثل 1 أو 32 سيكون كل شيء على ما يرام وسنحصل على استعلام مثل:
 select toolid, name, description, version
   from tools
  where categoryid=32

لكن تبدأ المشكلة عندما يرسل مستخدم فضولي استعلام id 2-1 للأرقام 2-1 ويلحظ أنه يحصل على نفس ذات نتائج استعلام id  للرقم1:
 select toolid, name, description, version
   from tools
  where categoryid=2-1

يُوضح هذا للمهاجم أن التطبيق عرضة لحقن لغة الاستعلامات البنيوية، فهو يفسر مدخلاتهم على أنها تعليمة برمجية (تنفيذ التعبير 2-1) بدلًا من بيانات (البحث عن فئة يكون معرفها حرفيًا "2-1"). بعد القليل من البحث يرسلون استعلام id  يضم -1 union all select 1, username, password, 1.0 from admin_users وينتج عن ذلك استعلام لغة استعلامات بنيوية تضم: 
 select toolid, name, description, version
   from tools
  where toolid=-1
union all
 select 1, username, password, 1.0
   from admin_users

ما يفعله هذا الاستعلام هو البحث عن جميع الأدوات التي تحتوي على معرّف فئة -1 (والذي ربما لا يكون أيًا منها) ثم أضف إلى تلك القائمة أسماء المستخدمين وكلمات المرور للمستخدمين المسؤولين عن منصة التذاكر، ثم يقوم التطبيق بتنسيق هذا بشكل جدول لغة تمييز النص التشعبي ملائم وقابل للقراءة ويعيده إلى المستخدم الذي يطلب البيانات. لن يسمح هذا للمهاجم فقط بتسجيل الدخول إلى نظام التذاكر ولكن إذا أعاد أي من هؤلاء المستخدمين استخدام كلمات المرور الخاصة بهم فقد يتمكن المهاجم من الوصول إلى أنظمة أخرى في نفس المؤسسة.
جرب بنفسك!
سجّل الدخول إلى دي في دبليو إيه الخاص بك وتأكد من ضبط مستوى الأمان ليكون منخفضًا. انتقل إلى صفحة "حقن لغة الاستعلامات البنيوية" وجرب الإدخال. هل يمكنك أن تتسبب بجعل الصفحة تعيد قائمة بجميع حسابات المستخدمين؟ هل يمكنك استخدام تقنية “union all” لاسترداد البيانات من الجداول الأخرى مثل الجدول المسمى “information_schema.tables”؟
الوقاية من حقن لغة الاستعلامات البنيوية
على عكس البرمجة النصية عبر المواقع، ترميز الخرج ليس طريقة موثوقة لمنع حقن لغة الاستعلامات البنيوية. لاحظ أنه في الأمثلة أعلاه يستخدم المهاجم المسافة و الـ - لتغيير سياق بياناته من سياق البيانات في استعلام لغة الاستعلامات البنيوية إلى سياق بنية الاستعلام نفسه، ويمكن لمزيج من ترشيح المدخلات المدرك للنوع وترميز المخرجات أن يمنع حقن لغة الاستعلامات البنيوية من الناحية النظرية، ولكن من الناحية العملية لا يمكن الاعتماد على هذا النهج. 
بدلًا من ذلك يمكننا استخدام ميزة لكل محرك قاعدة بيانات تتخطى تمامًا بعض التحليل الأولي للاستعلام، يُطلق على هذا النوع من الاستعلامات اسم الاستعلام المعلمي، واستخدامه يُسمى عادةً بربط المعلمات. بدلًا من إرسال قاعدة البيانات سلسلة نصية تحتوي على كل من بنية الاستعلام وبيانات المستخدم نُرسل سلسلة واحدة تحتوي على بنية الاستعلام مع عناصر نائبة فيها للبيانات. وإلى جانب هذه السلسلة نُرسل البيانات لكل عنصر نائب، وبهذه الطريقة لا يتم تحليل بيانات المستخدم أبدًا في سياق لغة الاستعلامات البنيوية، وبغض النظر عما يرسلونه سيتم التعامل معها حصريًا على أنها بيانات، مم لا يسمح بالحماية من حقن لغة الاستعلامات البنيوية فحسب بل يجعل استعلامات قاعدة البيانات أسرع قليلًا.
لمزيد من المعلومات حول حقن لغة الاستعلامات البنيوية، راجع دليل مشروع أمان تطبيق الويب المفتوح،  ولأجل نظرة متعمّقة راجع مسار تعلّم تقييم أمان تطبيقات الويب.
حقن المسار/اجتياز الدليل/تضمين الملف المحلي
تتضمن هذه الفئة من الثغرات الأمنية قيام المستخدم بإرسال تطبيق ويب يُخرّب تفاعلات التطبيق مع نظام الملفات، وباستخدام هذا النوع من الثغرات الأمنية يمكن للمهاجم التأثير أو التحكم في اسم مسار الملف الذي يقرأ منه تطبيق الويب أو يكتب فيه مما قد يمنح المهاجم حق الوصول الكامل إلى أي ملف يمكن لخادم الويب قراءته أو كتابته. حسب ما يُخزن على خادم الويب قد يمنح هذا قدرات مختلفة للمهاجم، ولكن الأهداف الشائعة هي ملفات التكوين التي غالبًا ما تحتوي على بيانات اعتماد لقواعد البيانات وخدمات الشبكة الخارجية الأخرى ورمز المصدر للتطبيق نفسه. 

فكر في تطبيق يحتفظ ببعض البيانات على نظام الملفات بدلًا من قاعدة بيانات، على سبيل المثال موقع متعدد اللغات يبقي التوطين في الملفات، ومن المحتمل أن يبدو رمز الصفحة الرئيسية كما يلي:


<?
function localize($content, $lang) {
	return fread("../config/lang/"+$lang+"/"+$content);
}
?>
<{1>html>
<{1>head><{2>title><?= {3>localize($_GET("pg")+".title",$_GET("hl")) ?></{15>title></{16>head>
<{1>body><?= {2>localize($_GET("pg"), $_GET("hl")) ?></{11>body>
</{1>html>
لاحظ أنه يأخذ المعلمات من سلسلة عنوان موقع ويب ويستخدمها لقراءة الملفات من نظام الملفات بما في ذلك محتواها في الصفحة.

عند تحميل http://www.example.com/?hl=en-us&pg=main, the server looks for ../config/lang/en-us/main.title and ../config/lang/en-us/main. ربما يبدو ناتج لغة تمييز النص التشعبي كما يلي:
<{1>html>
<{1>head><{2>title>Cool site: Main</{4>title></{5>head>
<{1>body><{2>h1>Hello, world!</{4>h1></{5>body>
</{1>html>

الآن ماذا سيحدث إذا قمنا بدلًا من ذلك بزيارة http://www.example.com/?hl=../../../../../../../../&pg=../etc/passwd? سيبحث الموقع عن ../config/lang/../../../../../../../../&pg=../etc/passwd.title and ../config/lang/../../../../../../../../&pg=../etc/passwd. من غير المحتمل العثور على الأول ولكن على افتراض أن الخادم تجاهل الخطأ قد نحصل على صفحة ويب تبدو كما يلي:
<{1>html>
<{1>head><{2>title></{3>title></{4>head>
<{1>body>nobody:*:-2:-2:Unprivileged User:/var/empty:/usr/bin/false
root:*:0:0:System Administrator:/var/root:/bin/sh
daemon:*:1:1:System Services:/var/root:/usr/bin/false
</{1>body>
</{1>html>
في أي نظام حديث يُشابه يونكس لا يُعدّ الاستيلاء على /etc/passwd أمرًا كبيرًا ولكن إذا تمكن المهاجم من فرض ملفات أخرى على النظام بالقوة الغاشمة (ربما ملف تكوين أو شيء من هذا القبيل /home/dev/vpn-credentials.txt)، فقد تكون النتائج سيئة للغاية، والأسوأ من ذلك هو موقع يسمح للمستخدمين بتحميل الملفات ولكن يمكن للمستخدم التلاعب بموقع الملف ليصبح تعليمة برمجية (على سبيل المثال .php، .asp، وما إلى ذلك) داخل جذر الويب. في هذه الحالة، يمكن للمهاجم تحميل ويب شل وتشغيل الأوامر على خادم الويب.
جرب بنفسك!
سجّل الدخول إلى دي في دبليو إيه الخاص بك وتأكد من ضبط مستوى الأمان ليكون منخفضًا. انتقل إلى صفحة "File Inclusion (تضمين الملف)" وجرب عنوان موقع ويب الذي تزوره عند النقر على ملف. هل يمكنك استرداد ملف /etc/passwd؟ 
الوقاية من حقن المسار
إلى حد كبير تُعدّ أفضل نصائح لمنع هذا النوع من الهجمات هي "ألا تستخدم نظام الملفات في التعليمات البرمجية للتطبيق الخاص بك." وفي حين أن هذه النصيحة فعالة إلا أنها ليست عملية دائمًا، ويمكن أن يكون الحل المختلط هو تخزين أسماء الملفات في قاعدة بيانات وقبول طلبات فهرسة قاعدة البيانات من المستخدم. وفي المثال أعلاه يمكن أن تبدو قاعدة البيانات بالشكل التالي:
إذا لم يكن ذلك ممكنًا فيجب على الموقع استخدام وقبول مجموعة محدودة جدًا من المحارف (مثل الأحرف والأرقام) لمكونات اسم الملف التي يحددها المستخدم، وسيظل من المحتمل أن يسمح هذا للمستخدمين بقراءة أو كتابة ملفات عشوائية داخل دليل محدد، لذلك يجب على مطوري التطبيقات التأكد من أن الملفات الموجودة في هذا الدليل غير قابلة للتنفيذ بواسطة خادم الويب وأنه لا توجد بيانات حساسة أو معلومات تكوين مهمة فيه.
لمزيد من المعلومات حول حقن المسار، راجع دليل مشروع أمان تطبيق الويب المفتوح حول هذا الموضوع ولأجل دراسة متعمقة راجع مسار تعلّم تقييم أمان تطبيقات الويب.
حقن شل/حقن الأوامر
يشبه حقن شل حقن المسار من حيث أنه يتضمن تفاعلات التطبيق مع نظام التشغيل، وفي هذه الحالة يقوم التطبيق مباشرة بتنفيذ أمر شل أو عدة أوامر ومن الممكن للمهاجم تغيير الأوامر التي يتم تنفيذها. تأثير حقن شل مرتفع للغاية وقد يسمح للمهاجم بتشغيل الأوامر الخاصة به على أجهزة خادم الويب الأساسية ويكاد يكون الاختراق الكامل لتطبيق الويب مضمونًا، ومع مرور الوقت من المحتمل أن يطرأ اختراق للبنية التحتية الأخرى في بيئة الخادم.
فكر في تطبيق يسمح للمستخدمين بالتحقق من اتصال الشبكة بالأنظمة الأخرى من خادم الويب، وإليك الحد الأدنى من التعليمات البرمجية لصفحة من نوع المعالج المسبق للنصوص الفائقة (PHP) التي تقوم بذلك:
<{1>html>
<{1>head><{2>title>Network connectivity check</{4>title></{5>head>
<{1>body>
	<{1>h1>Network connectivity check</{3>h1>
	<{1>form method="GET">
		<{1>input name="host">
		<{1>input type="submit">
	</{1>form>
<?
	if ($_GET("host")) {
		print("	<{2>h2>Results</{4>h2>\r<{5>pre>".shell_exec("ping -c 3 ".$_GET("host"))."</{7>pre>");
	}
?>
</{1>body>
</{1>html>

إذا أدخل المستخدمون "8.8.8.8"، تستخدم الصفحة الدالة shell_exec لتشغيل الأمر ping -c 3 8.8.8.8 وتبدو لغة تمييز النص التشعبي الناتج شيئًا يشابه ما يلي:
<{1>html>
<{1>head><{2>title>Network connectivity check</{4>title></{5>head>
<{1>body>
	<{1>h1>Network connectivity check</{3>h1>
	<{1>form method="GET">
		<{1>input name="host">
		<{1>input type="submit">
	</{1>form>
<{1>h2>Results</{3>h2>
<{1>pre>PING 8.8.8.8 (8.8.8.8): 56 data bytes
64 bytes from 8.8.8.8: icmp_seq=0 ttl=119 time=7.266 ms
64 bytes from 8.8.8.8: icmp_seq=1 ttl=119 time=8.681 ms
64 bytes from 8.8.8.8: icmp_seq=2 ttl=119 time=12.481 ms

--- 8.8.8.8 ping statistics ---
3 packets transmitted, 3 packets received, 0.0% packet loss
round-trip min/avg/max/stddev = 7.266/9.476/12.481/2.202 ms</{2>pre>
</{1>body>
</{1>html>

مفيد للغاية! ولكن ماذا سيحدث إذا أدخل المستخدم “8.8.8.8; ls -1 /” بدلًا من ذلك؟ سيكون تشغيل أمر شل هوping -c 3 8.8.8.8; ls -1 / وستبدو صفحة الويب الناتجة كما يلي:
<{1>html>
<{1>head><{2>title>Network connectivity check</{4>title></{5>head>
<{1>body>
	<{1>h1>Network connectivity check</{3>h1>
	<{1>form method="GET">
		<{1>input name="host">
		<{1>input type="submit">
	</{1>form>
<{1>h2>Results</{3>h2>
<{1>pre>PING 8.8.8.8 (8.8.8.8): 56 data bytes
64 bytes from 8.8.8.8: icmp_seq=0 ttl=119 time=5.611 ms
64 bytes from 8.8.8.8: icmp_seq=1 ttl=119 time=11.918 ms
64 bytes from 8.8.8.8: icmp_seq=2 ttl=119 time=9.519 ms

--- 8.8.8.8 ping statistics ---
3 packets transmitted, 3 packets received, 0.0% packet loss
round-trip min/avg/max/stddev = 5.611/9.016/11.918/2.599 ms
Applications
Library
System
Users
Volumes
bin
cores
dev
etc
home
opt
private
sbin
tmp
usr
var</{2>pre>
</{1>body>
</{1>html>

ماذا حدث؟ يرى الشل أمر اختبار اتصال (ping) 8.8.8.8 ثم فاصلة منقوطة، وفي معظم أنواع شل الشبيهة بنظام يونكس يفصل أمر الفاصلة المنقوطة الأوامر الفردية التي تم تشغيلها معًا على سطر واحد. ولذلك قامت شل بتشغيل أمر اختبار الاتصال ثم قامت بتشغيل الأمر التالي لسرد محتويات الدليل الجذر، حيث تجمع مخرجات كلا الأمرين ثم أعادت تلك النتائج إلى خادم الويب. 
من الواضح أنه يمكن استخدام شيء من هذا القبيل لاسترداد أي ملف تقريبًا من خادم الويب (على سبيل المثال، باستخدام أمر"cat")، وقد يتسبب المهاجم في قيام خادم الويب بتنزيل الملفات (بما في ذلك الملفات التنفيذية) من خوادم أخرى ثم تشغيل هذه الأوامر. ويمكن أن تكون هذه الملفات التنفيذية التي تم تنزيلها عبارة عن ثغرات تسمح للمهاجم بتصعيد الصلاحيات من مستخدم خادم الويب إلى مستخدم إداري (مثل النظام أو الجذر) مما يمنح المهاجم السيطرة الكاملة على خادم الويب.
جرب بنفسك!
سجّل الدخول إلى دي في دبليو إيه الخاص بك وتأكد من ضبط مستوى الأمان ليكون منخفضًا. ثم انتقل إلى صفحة "حقن الأوامر (Command Injection)"، وجرب الإدخال هل يمكنك سرد محتويات الدليل الجذر لخادم الويب؟ 
الوقاية من حقن شل
كما هو الحال مع حقن المسار فإن أفضل طريقة لمنع حقن الشل هي "لا تفعل ذلك"، وعلى عكس حقن المسار لا ينبغي أن تكون النصيحة عدم تشغيل أوامر شل من خادم الويب أمرًا يُعتمد بالكامل. ومن الصعب تنفيذ البدائل الأخرى (مثل التحقق من صحة بيانات الإدخال) بشكل صحيح وقد يكون ذلك مستحيلًا إذا كان التطبيق يحتاج إلى السماح بأي نوع من المدخلات غير البسيطة. 
لمزيد من المعلومات حول حقن شل راجع دليل مشروع أمان تطبيق الويب المفتوح عليه ودليل مشروع أمان تطبيق الويب المفتوح حول منعه ولأجل استكشاف متعمّق راجع مسار تعلّم تقييم أمان تطبيقات الويب.
موارد التعلّم
[تلخص جميع الروابط في العرض بالإضافة إلى أي موارد إضافية لتضمينها]
اختبار مهارة

التمرين 1: ملخص

(هذا ملخص للتمرين الموضح أعلاه في الموضوع الفرعي)
انتقل إلى نسخة دي في دبليو إيه الخاصة بك، واضبط مستوى الصعوبة ليكون "منخفض" وأكمل الأقسام التالية:

البرمجة النصية عبر المواقع (معكوسة)
حقن لغة الاستعلامات البنيوية
تضمين الملف
حقن الأوامر

بالنسبة لكل قسم من الأقسام التالية تتمثل مهمتك في العثور على الثغرة الأمنية واستغلالها كما هو موضح في صفحة دي في دبليو إيه المعنية، ونظرًا لأنه قد لا يكون لديك الكثير من الخبرة في جافا سكريبت أو لغة الاستعلامات البنيوية أو سطور الأوامر فلا بأس من استخدام أدلة التوجيه خطوة بخطوة (هناك العديد من الأدلة عبر الإنترنت التي تنظر إلى دي في دبليو إيه) أو الأدلة لمساعدتك في التمارين. وتأكد فقط أنه بدلًا من مجرد نسخ ولصق الأوامر من أدلة التوجيه خطوة بخطوة أن تقوم في الواقع بشرح ما تفعله كل صفحة دي في دبليو إيه وماهية الثغرات.

التمرين 2: اختبار خيارات متعددة
	 	 	 	
يُعدّ التحقق من صحة البيانات جانبًا مهمًا من جوانب أمان تطبيقات الويب يضمن أن بيانات الإدخال آمنة ومهيأة بشكل صحيح وخالية من النوايا الخبيثة، ويمكن أن يؤدي الفشل في تنفيذ التحقق الكافي من صحة البيانات إلى ترك تطبيقات الويب عرضة لمختلف عمليات الاستغلال. وتستكشف الأسئلة التالية أهمية التحقق من صحة البيانات في تطبيقات وتقنيات الويب الوقاية من ثغرات التحقق من صحة البيانات.
وإذا كان ذلك ممكنًا ناقش إجاباتك على هذه الأسئلة مع زميل أو مرشد يساعد في التحقق من فهمك للموضوع بشكل صحيح.
السؤال 1
ما هي النتيجة الشائعة للفشل في أداء التحقق المناسب من صحة البيانات في تطبيق الويب؟
أ) زيادة أداء الخادم
ب) تجربة مستخدم محسنة
ج) هجمات حقن لغة الاستعلامات البنيوية
د) تحسين سلامة البيانات

السؤال 2
أي مما يلي يُعدّ آلية فعّالة لمنع هجمات البرمجة النصية عبر المواقع في تطبيقات الويب؟
أ) استخدام النص العادي لتخزين البيانات الحساسة
ب) إلغاء مدخلات المستخدم قبل عرضها
ج) تخزين كلمات مرور المستخدم في النص العادي
د) تعطيل تشفير بروتوكول نقل النص التشعبي الآمن

السؤال 3
ما هي التقنية الفعالة في منع هجمات حقن لغة الاستعلامات البنيوية في تطبيقات الويب؟
أ) استخدام استعلامات لغة الاستعلامات البنيوية الديناميكية
ب) استخدام تعقيم الإدخالات والاستعلامات المعيارية
ج) تخزين البيانات الحساسة في نص عادي
د) تعطيل رسائل الخطأ

السؤال 4
أي من العبارات التالية تشرح بأفضل صورة كيف يساعد التحقق من صحة البيانات بشكل صحيح في منع هجمات حقن الأوامر في أمان تطبيقات الويب؟
أ) يُقيد التحقق من صحة البيانات الإدخال ضمن محارف وأنماط محددة مسبقًا مما يقلل من احتمال حقن الأوامر الضارة في التطبيق.
ب) تُساعد تقنيات التحقق المناسبة مثل تعقيم الإدخالات والاستعلامات ذات المعلمات على تحييد الأوامر الضارة المضمنة في مدخلات المستخدم وبالتالي التخفيف من ثغرات حقن الأوامر.
ج) يؤدي تنفيذ طرق التحقق من الصحة مثل فحوصات طول الإدخال ووضع قائمة بيضاء بالأحرف المقبولة إلى تقليل الأجزاء المعرضة للهجوم ومنع تنفيذ الأوامر غير المصرح بها داخل تطبيق الويب.
د) كل ما سبق

مفتاح الإجابات
الإجابة الصحيحة عن السؤال 1: ج) هجمات حقن لغة الاستعلامات البنيوية
الشرح:
أ) غير صحيح. عادة لا يؤدي الفشل في تنفيذ التحقق المناسب من صحة البيانات إلى تحسين أداء الخادم.
ب) غير صحيح. في حين أن التحقق المناسب من صحة البيانات يساهم في تحسين تجربة المستخدم من خلال منع الأخطاء لا يعزز غيابها من تجربة المستخدم.
ج) صحيح. دون التحقق من صحة البيانات بشكل صحيح، تكون تطبيقات الويب عرضة لهجمات حقن لغة الاستعلامات البنيوية حيث يمكن للمهاجمين التعامل مع استعلامات قاعدة البيانات عن طريق حقن تعليمات ضارة بلغة الاستعلامات البنيوية.
د) غير صحيح. يُساعد التحقق من صحة البيانات في الحفاظ على سلامة البيانات ولكن لا يحسن غيابها من سلامة البيانات.

الإجابة الصحيحة عن السؤال 2: ب) إلغاء مدخلات المستخدم قبل عرضها
الشرح:
أ) غير صحيح. لا يمنع استخدام النص العادي لتخزين البيانات الحساسة هجمات البرمجة النصية عبر المواقع وإنما في الواقع يزيد من خطر تعرض البيانات.
ب) صحيح. يساعد إلغاء إدخال المستخدم قبل عرضه على التخفيف من هجمات البرمجة النصية عبر المواقع من خلال جعل أي برامج نصية ضارة محتملة غير ضارة وبالتالي منعها من التنفيذ في متصفحات المستخدمين.
ج) غير صحيح. يعد تخزين كلمات مرور المستخدم في نص عادي خطرًا أمنيًا ولا علاقة له بمنع هجمات البرمجة النصية عبر المواقع.
د) غير صحيح. يؤدي تعطيل تشفير بروتوكول نقل النص التشعبي الآمن إلى تعريض البيانات الحساسة للاعتراض ولا يمنع هجمات البرمجة النصية عبر المواقع.
الإجابة الصحيحة عن السؤال 3: ب) توظيف تعقيم الإدخالات ومعلمات الاستعلام
الشرح:
أ) غير صحيح. يؤدي استخدام استعلامات لغة الاستعلامات البنيوية الديناميكية دون التحقق من صحة المدخلات وتعقيمها بشكل صحيح إلى زيادة خطر هجمات حقن لغة الاستعلامات البنيوية.
ب) صحيح. يساعد استخدام تعقيم المدخلات والاستعلامات ذات المعلمات على منع هجمات حقن لغة الاستعلامات البنيوية من خلال ضمان التعامل مع مدخلات المستخدم على أنها بيانات بدلًا من تعليمات برمجية قابلة للتنفيذ وبالتالي تُحيّد محاولات حقن لغة الاستعلامات البنيوية الضارة.
ج) غير صحيح. يزيد تخزين البيانات الحساسة في نص عادي من خطر تعرض البيانات ولكنه لا يمنع هجمات حقن لغة الاستعلامات البنيوية بشكل مباشر.
د) غير صحيح. قد يؤدي تعطيل رسائل الخطأ إلى إخفاء الثغرات الأمنية المحتملة عن المهاجمين ولكنه لا يعالج السبب الجذري لثغرات حقن لغة الاستعلامات البنيوية.
الإجابة الصحيحة عن السؤال 4: د) كل ما سبق




## Learning Resources

{{% resource title="Credential stuffing" languages="English, Arabic, Chinese, Spanish, French" cost="Free" description="Overview of an attack where adversaries test many login combinations, often from data breaches." url="https://en.wikipedia.org/wiki/Credential_stuffing" %}}

{{% resource title="Cryptographic hash function" languages="31 languages" cost="Free" description="Overview of cryptographic hash functions and their importance to security." url="https://en.wikipedia.org/wiki/Cryptographic_hash_function" %}}

{{% resource title="Rainbow table" languages="21 languages" cost="Free" description="List of precomputed hash functions used in brute-forcing encrypted content." url="https://en.wikipedia.org/wiki/Rainbow_table" %}}

{{% resource title="Salt" languages="23 languages" cost="Free" description="Explanation of a salt added to passwords before encryption to prevent rainbow table attacks." url="https://en.wikipedia.org/wiki/Salt_(cryptography)" %}}

{{% resource title="Traditional crypt" languages="English" cost="Free" description="Overview of early password encryption algorithms from the 1970s, no longer in use." url="https://www.usenix.org/legacy/publications/library/proceedings/usenix99/full_papers/provos/provos_html/node9.html" %}}

{{% resource title="Cryptographic right answers" languages="English" cost="Free" description="List of recommended cryptographic solutions for modern use." url="https://www.latacora.com/blog/2018/04/03/cryptographic-right-answers/" %}}

{{% resource title="Hash lookup" languages="English" cost="Free" description="Tool for reverse lookup of hashes, useful for working with tools like DVWA." url="https://www.whatsmyip.org/hash-lookup/" %}}

{{% resource title="Password storage cheat sheet & Forgot password cheat sheet" languages="English" cost="Free" description="Best practices for storing encrypted passwords and managing password recovery." url="https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html" url2="https://cheatsheetseries.owasp.org/cheatsheets/Forgot_Password_Cheat_Sheet.html" %}}

{{% resource title="International SMS Fraud" languages="English" cost="Free" description="Case study on SMS abuse by adversaries and reasons not to rely on SMS for authentication." url="https://www.openmindnetworks.com/blog/international-sms-fraud-by-brian-kelly-cto-and-co-founder/" %}}

{{% resource title="Selenium" languages="English" cost="Free" description="Tool for automating web browser tasks, useful for testing." url="https://www.selenium.dev/" %}}

{{% resource title="Testing for Account Enumeration and Guessable User Account" languages="English" cost="Free" description="Workflow for testing web app security to see if it's possible to enumerate usernames." url="https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/03-Identity_Management_Testing/04-Testing_for_Account_Enumeration_and_Guessable_User_Account" %}}

{{% resource title="Have I Been Pwned" languages="English" cost="Free for low volumes of queries" description="Service to check if a username has been featured in any data breaches." url="https://haveibeenpwned.com/" %}}

{{% resource title="Introducing 306 Million Freely Downloadable Pwned Passwords" languages="English" cost="Free" description="Blog post by Troy Hunt on finding millions of leaked passwords and their implications." url="https://www.troyhunt.com/introducing-306-million-freely-downloadable-pwned-passwords/" %}}

{{% resource title="Common credentials" languages="English" cost="Free" description="Lists of commonly used credentials, like passwords." url="https://github.com/danielmiessler/SecLists/tree/master/Passwords/Common-Credentials" %}}

{{% resource title="NIST password guidelines" languages="English" cost="Free" description="Blog post outlining NIST password guidelines and their rationale." url="https://blog.netwrix.com/2022/11/14/nist-password-guidelines/" %}}

{{% resource title="Phishing" languages="76 languages" cost="Free" description="Overview of phishing attacks, their history, and methods used by adversaries." url="https://en.wikipedia.org/wiki/Phishing" %}}

{{% resource title="SIM swap scam" languages="English, Chinese, Japanese, Malayalam, German, Spanish" cost="Free" description="Overview of SIM swap scams and reasons not to rely on SMS-based authentication." url="https://en.wikipedia.org/wiki/SIM_swap_scam" %}}

{{% resource title="U2F Technical Overview" languages="English" cost="Free" description="Detailed look at U2F authentication method using physical security keys." url="https://developers.yubico.com/U2F/Protocol_details/Overview.html" %}}

{{% resource title="Two factor authentication backup codes" languages="English" cost="Free" description="Guides on managing backup methods for two factor authentication by Google and GitHub." url="https://support.google.com/accounts/answer/1187538?hl=en&co=GENIE.Platform%3DDesktop" url2="https://docs.github.com/en/authentication/securing-your-account-with-two-factor-authentication-2fa/configuring-two-factor-authentication-recovery-methods" %}}

{{% resource title="Multifactor authentication cheat sheet" languages="English" cost="Free" description="Overview of multifactor authentication and best practices for implementation." url="https://cheatsheetseries.owasp.org/cheatsheets/Multifactor_Authentication_Cheat_Sheet.html" %}}
