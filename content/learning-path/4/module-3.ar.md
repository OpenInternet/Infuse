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




االموضوع الفرعي 3: المصادقة
حالة استخدام
في أي موقع ويب يشمل تسجيل دخول المستخدمين من المهم أن يحمي الموقع حسابات المستخدمين من الوصول غير المصرح به وأن تكون بيانات اعتماد الحساب نفسها محمية، ويحدد هذا الموضوع الفرعي المجالات الأكثر شيوعًا للمصادقة التي تظهر فيها عيوب تطبيقات الويب.
الأهداف 

بعد استكمال هذا الموضوع الفرعي، يجب أن يكون الممارسون قادرين على القيام بما يلي:
فهم الأنواع الشائعة من ثغرات المصادقة
فهم الآثار المحتملة لهذه الأنواع من الثغرات
فهم آليات عمل هذه الثغرات
فهم كيفية منع ثغرات هذه بشكل عام
العرض 
تُعدّ المصادقة هي العملية التي يُثبت من خلالها مستخدم النظام هويته، وهي الأساس الذي يستند إليه التحكم في الوصول. عادةً ما يقدم المستخدم جزءًا من المعلومات التي تُعرّف هويته (اسم المستخدم وعنوان البريد الإلكتروني ورقم الهاتف وما إلى ذلك)، ومعلومات سرية تتحقق من صحة تلك الهوية (عادةً ما تكون كلمة مرور أو عبارة مرور ولكن هناك طرق بديلة أو إضافية تكتسب شعبية مثل مفاتيح الأمان والمصادقة عبر الويب (WebAuthn) ومفاتيح المرور (Passkeys)). سيغطي هذا الموضوع الفرعي بعض فئات الثغرات الشائعة وذات التأثير العالي على تطبيقات الويب.
تخزين كلمة المرور بشكل غير آمن
إذا أراد المستخدمون تسجيل الدخول إلى موقع باسم مستخدم وكلمة مرور فيجب أن يكون الموقع قادرًا على التحقق من أن المستخدم أدخل كلمة المرور الصحيحة، وعلاوة على ذلك يجب تخزين كلمات المرور بشكل آمن في قاعدة بيانات مصادقة التطبيق لأن قاعدة البيانات هذه قد تتعرض للاختراق بفعل حقن لغة الاستعلامات البنيوية أو فقدان النسخ الاحتياطية أو حتى أعضاء خبيثين أو مُخترقين في المؤسسة التي تدير الموقع. وهناك عدة طرق لتخزين كلمات المرور:
نص عادي 
من الواضح أن هذه هي أسوأ طريقة لتخزين كلمات المرور لأنها تعني تخزين الأحرف الفعلية التي كتبها المستخدم عند إعداد كلمة المرور. وفي حالة اختراق قاعدة بيانات كلمات المرور سيتمكن المهاجمون من الوصول الكامل إلى جميع كلمات مرور المستخدم. لا يمكن استخدام كلمات المرور هذه للوصول إلى موقع الويب نفسه فحسب بل يمكن استخدامها في هجمات إعادة استخدام كلمة المرور ضد مواقع أو تطبيقات أخرى.
مشفرّة 
يتمثل الحل الواضح لتخزين كلمة مرور النص العادي هو في تشفير كلمات المرور، ولكن لا يوفر هذا سوى حماية متواضعة ضد العديد من التهديدات. ويجب أن يعرف التطبيق نفسه مفتاح التشفير وبالتالي يجب تخزين المفتاح في مكان ما. من شبه المؤكد أن يتمكن المطلّعون الخبيثون أو المُخترقون الذين لديهم حق الوصول إلى قاعدة البيانات من الوصول إلى مفتاح التشفير، وهناك أيضًا مجموعة متنوعة من الثغرات الأمنية الشائعة في خادم الويب والتي قد تسمح للمهاجمين عن بُعد بالوصول إلى المفتاح. وبمجرد حصول شخص ما على مفتاح التشفير سيكون قادرًا على معرفة كلمات المرور.
شفرة التجزئة 
كما اتضح لا يحتاج خادم الويب أبدًا إلى استرداد كلمة مرور المستخدم من التخزين بل يحتاج فقط إلى معرفة ما إذا كانت كلمة المرور التي أدخلها المستخدم هي نفس كلمة المرور الحقيقية للمستخدم، وهناك فئة من الخوارزميات يشار إليها باسم شفرة التجزئة التشفيرية التي تقوم بتحويل أحادي الاتجاه على البيانات. ومن الأمثلة على تلك الخوارزميات هي إم دي 5 (MD5) وSHA، ومن المستحيل فعليًا بالنظر إلى التجزئة تحديد بيانات المصدر التي ولدَّت التجزئة. لسوء الحظ تكون كلمات المرور عادةً قصيرة إلى حد ما وتميل دالات شفرة التجزئة التشفيرية إلى أن تكون سريعة للغاية، وبالنسبة لدالة تجزئة معينة من الممكن تجزئة كل كلمة مرور ممكنة بطول معين وتخزين كلمة المرور والتجزئة الناتجة. وبعد ذلك بالنظر إلى تجزئة كلمة مرور معينة يمكن للمرء ببساطة البحث عن كلمة المرور التي أنشأت هذه التجزئة. في منتصف العقد الأول من القرن الحادي والعشرين، كان من الممكن حساب وتخزين وتوزيع قواعد البيانات هذه التي تسمى جداول قوس قزح للاستخدام العام.
أحد حلول مشكلة جداول قوس قزح هو إضافة القليل من البيانات (تسمى التمليح) إلى كلمة المرور قبل شفرة تجزئتها، ولا يجب أن تكون هذه البيانات سرية أو مرتفعة الانتروبيا بشكل خاص بل يجب أن تكون مختلفة لكل مستخدم. يتمثل النهج الشائع في استخدام شفرة تجزئة اسم المستخدم وكلمة المرور معًا، ويحتوي جدول قوس قزح لكلمة مرور مايكروسوفت ويندوز مدير لان نيو تكنولوجي على شفرات تجزئة يصل طولها إلى 9 أحرف وتستوعب 6.7 تيرابايت. عند تمليح شفرة تجزئة كلمة المرور هذه فقط باستخدام 5 أحرف أبجدية رقمية سيرتفع جدول قوس قزح إلى أكثر من 6,000,000,000 تيرابايت. تكمّن المشكلة في هذا النهج في أن شفرة التجزئة لا تزال سريعة للغاية وأن بطاقات الرسومات الحديثة هي في الأساس أجهزة كمبيوتر فائقة متوازية على نطاق واسع، ويمكن لبطاقة إنفيدي آر تي إكس (Nvidia RTX) 4090 (بطاقة فيديو متطورة من عام 2022) حساب ما يقرب من 400,000,000,000 شفرة تجزئة إس إتش إيه مملحة في الثانية مما يسمح للأفراد العاديين باختراق معظم كلمات المرور في دقائق أو ساعات. 
خوارزميات تخزين كلمات المرور الخاصة 
تكمن المشكلة في شفرة التجزئة التشفيرية في أنها مصممة لتكون سريعة وفعالة، وتأتي معظم فائدتها من استخدامها في التحقق من أن البيانات لم يتم العبث بها. تمت معالجة هذه المشكلة منذ عام 1976 مع وظيفة تشفير يونكس التي قامت بتمليح وتشفير كلمة المرور عدة مرات لإبطاء طريقة القوة الغاشمة، ولا يثير الدهشة أن هذه الخوارزمية لن تصمد أمام موارد الحوسبة الحديثة ولكن الفكرة العامة لا تزال تُستخدم اليوم مع خوارزميات خاصة مصممة لتخزين مشتقات كلمة المرور. تم تصميم هذه الخوارزميات لتستفيد من وحدة المعالجة المركزية القابلة للضبط وموارد الذاكرة وللموازنة بشكل جيد بين الأداء ومقاومة القوة الغاشمة. تتضمن خوارزميات معالجة كلمة المرور الجيدة (بترتيب تفضيلي متناقص) سكريبت (scrypt) وآرغون 2 (argon2) وب كريبت ()bcrypt وب بي كيه دي إف 2 (PBKDF2). كإجراء دفاعي متقدم من المستحسن دمج كلمة مرور المستخدم مع سر لا يتم تخزينه في قاعدة البيانات نفسها، وعلى سبيل المثال يمكن ترميز السر في التطبيق نفسه. ومن المحتمل أن يمنع هذا استرداد كلمة المرور في حالة فقدان قاعدة بيانات كلمة المرور فقط.
جرب بنفسك!
سجّل الدخول إلى دي في دبليو إيه الخاص بك وتأكد من ضبط مستوى الأمان ليكون منخفضًا. ثم انتقل إلى قسم حقن لغة الاستعلامات البنيوية وأدخل ما يلي في مربع النص: 

​​999' union all select user, password from users where '1'='1
سيؤدي هذا إلى عرض الاسمين الأول والأخير لجميع المستخدمين الذين لديهم userid يكون 999 (لا يوجد أي واحد) وكذلك شفرة التجزئة لاسم المستخدم وكلمة المرور لجميع المستخدمين. استخدم موقع بحث شفرة تجزئة عبر الإنترنت (على https://www.whatsmyip.org/hash-lookup/) للبحث عن تجزئة كلمة مرور المستخدم المسؤول، ما نوع التجزئة المستخدمة لتخزين كلمات مرور مستخدمي دي في دبليو إيه؟ ما هي كلمة مرور المستخدم المسمى "1337"؟
لمزيد من المعلومات حول التعامل مع كلمة المرور، راجع ورقة معلومات تخزين كلمة مرور مشروع أمان تطبيق الويب المفتوح.
إعادة تعيين كلمة السر
إذا نسي المستخدم على موقع الويب كلمة المرور الخاصة به توفر معظم المواقع طريقة آلية للمستخدم للتحقق من هويته من أجل تعيين كلمة مرور جديدة، ومن الناحية المثالية تكون هذه الطرق آمنة تقريبًا بقدر عملية التحقق من كلمة المرور القياسية التي يكتب فيها المستخدم كلمة مرور سرية يعرفها في صفحة ويب ولكنها أقل سهولة بشكل ملحوظ.
ستفترض معظم المواقع أن حساب البريد الإلكتروني للمستخدم آمن بشكل معقول وترسل إلى المستخدم رابطًا يسمح له بإعادة تعيين كلمة المرور الخاصة به، وربما يكون هذا الافتراض صحيحًا بالنسبة للغالبية العظمى من حسابات المستخدمين على الغالبية العظمى من مواقع الويب. يجب أن تحتوي روابط إعادة تعيين كلمة المرور (بالإضافة إلى روابط "تسجيل الدخول السحري") على الخصائص التالية من أجل تقليل مخاطر المستخدم:
يجب أن تكون روابط بروتوكول أمان طبقة النقل إلى الإصدار المشفر من الموقع. (لاحظ أنه لا توجد طريقة مجدية لضمان تشفير البريد الإلكتروني نفسه أثناء النقل ولكن من المرجح أن يتم اعتراض حركة مرور شبكة المستخدم النهائي مثل قيام المستخدم بالوصول إلى صفحة ويب أكثر من حركة المرور بين الخوادم مثل رسائل البريد الإلكتروني المرسلة من خادم إلى آخر.)
يجب أن يحتوي الرابط على رمز وصول يضم حوالي 128 بت من البيانات التي تم إنشاؤها عشوائيًا من مولد أرقام عشوائية قوي مشفر، ولاحظ أن 128 بت من البيانات تشغل 172 محرفًا أو أكثر عند ترميزها في عنوان موقع الويب. لا توجد ميزة حقيقية لاستخدام أكثر من 128 بت من البيانات واستخدام 128 بت يعني عدم الحاجة إلى حماية إضافية من القوة الغاشمة.
يجب أن يكون رمز الوصول محدودًا زمنيًا (على سبيل المثال تنتهي صلاحيته بعد ساعة) وأن يكون للاستخدام مرة واحدة، ولا تحد حقيقة أنها مخصصة للاستخدام مرة واحدة من قدرة المهاجم على تغيير كلمة مرور المستخدم فحسب بل قد تنبه المستخدم أيضًا في حالة تمكن المهاجم من الحصول على الرمز المميز وتغيير كلمة مرور المستخدم.
يجب ربط الرمز المميز نفسه بحساب المستخدم مما يمنع المستخدمين من استخدام الرمز المميز لتغيير كلمة مرور مستخدم آخر.
قد يتم أيضًا إرسال روابط إعادة التعيين عبر الرسائل النصية القصيرة، ومن غير المرجح أن يتم اعتراض الرسائل النصية القصيرة من البريد الإلكتروني من قبل المتسللين العاديين ولكن يمكن أن تعترضها الحكومات في البلد الذي يتواجد فيه المستخدم. إذا تم إرسال رمز مميز أقصر (مثل رقم التعريف الشخصي (PIN)) عبر الرسائل النصية القصيرة، من المهم أن يكون لديك حماية قوية من القوة الغاشمة على الصفحة التي تقبل رقم التعريف الشخصي (PIN) على سبيل المثال عمر رقم التعريف الشخصي (PIN) لمدة 10 دقائق وحد المعدل. لاحظ أيضًا أن هناك هجمات لكسب المال وهجمات حجب الخدمة بسيطة تتضمن جعل الخادم يرسل رسائل نصية قصيرة إلى رقم هاتف يختاره المهاجم، ومن خلال إجراء عدد كبير من عمليات إعادة تعيين كلمة مرور الرسائل النصية القصيرة، يمكن للمهاجم أن يتسبب بتكاليف عالية لمشغل موقع الويب مما قد يؤدي إلى كسب المال لصالحه في هذه العملية.
تتضمن الطريقة البديلة لإجراء إعادة تعيين كلمة المرور طرح أسئلة على المستخدم يعرف كل من موقع الويب والمستخدم إجاباتها ولكن قد لا يعرفها المهاجم، وتميل هذه الطرق إلى أن تكون ضعيفة أو قوية للغاية للتحقق من هوية المستخدم. وتُعدّ "الأسئلة السرية" القياسية مثل السؤال عن مكان ولادة المستخدم، واسم والدته قبل الزواج، وطراز سيارته الأولى وما إلى ذلك ضعيفة للغاية. ففي البداية قد يتمكن المهاجم من العثور بسهولة على إجابة لهذه الأسئلة، وثانيًا من المستحيل تغيير معظمها لذلك في حالة اكتشاف المهاجم إجابة (حتى عن طريق اختراق موقع ويب آخر) فسيكون قادرًا على استخدامها مرارًا وتكرارًا. وفي النهاية لمعظم هذه الأسئلة عدد محدود من الإجابات الشائعة، وعلى سبيل المثال إذا سألت شخصًا كوريًا عن اسم والدته قبل الزواج، فستكون نسبة كبيرة من الإجابات "كيم" أو "لي". يتضمن النوع الآخر الأكثر أمانًا من الأسئلة السرية التواصل دون اتصال بالإنترنت بين موقع الويب والمستخدم، ومن الأمثلة على ذلك أشياء مثل فواتير الخدمات العامة والكشوف المصرفية. كي يتمكن المستخدم من إعادة تعيين كلمة المرور الخاصة به سيدخل على سبيل المثال مبالغ المعاملات الثالثة والخامسة في كشف حسابه المصرفي. لن يُسمح للمستخدم إلا ببضع محاولات ثم سيحتاج إلى إجراء عملية إعادة تعيين أقل راحة مع خدمة العملاء، ويمكن أن تكون عملية إعادة التعيين هذه آمنة للغاية على الرغم من أنها في أيام الكشوف عبر الإنترنت ربما تكون أقل أمانًا من إرسال رمز مميز عبر البريد الإلكتروني.
لمزيد من المعلومات حول إعادة تعيين كلمة المرور الآمنة، راجع ورقة معلومات مرجعية لمشروع أمان تطبيق الويب المفتوح حول نسيت كلمة المرور. للحصول على استكشاف متعمّق لثغرات المصادقة والتخويل راجع مسار تعلّم تقييم أمان تطبيقات الويب.
قوة الاعتماد
تستخدم معظم تطبيقات الويب كلمات مرور للمصادقة على الرغم من أنه تتزايد شعبية تقنيات مثل المصادقة عبر الويب (WebAuthentication) باستخدام مفاتيح الأمان وجلسات المصادقة طويلة الأمد جدًا جنبًا إلى جنب مع روابط تسجيل الدخول عبر البريد الإلكتروني. في حال استخدام موقع الويب لكلمات مرور فمن المهم أن تكون كلمات المرور هذه قوية، ولكن قد تغير تعريف كلمة المرور "القوية" على مر السنين. هناك ثلاث طرق أساسية يستخدمها المهاجمون لاستهداف كلمات مرور المستخدم مباشرة:
التخمين عبر الإنترنت على أساس إعادة استخدام كلمة المرور: حيث يستخدم المهاجم في هذا الهجوم كلمات مرور معروفة متعلقة بالمستخدم ويحاول ببساطة استخدام كلمات المرور هذه في نموذج تسجيل الدخول إلى الموقع، ونظرًا لأن العديد من الأشخاص يستخدمون نفس كلمات المرور عبر مواقع ويب متعددة فقد يكون هذا الهجوم فعالًا بشكل مدمر. تتوفر أسماء المستخدمين وكلمات المرور من المواقع المخترقة على نطاق واسع على الويب العام والويب المظلم وللبيع على مواقع الويب الخاصة، ويمكن للمهاجمين ببساطة إدخال جميع كلمات المرور المعروفة لمستخدم معين، أما إذا كان المهاجم يستهدف عددًا صغيرًا من المستخدمين فإن هذا الهجوم لا يتطلب حتى الأتمتة.
الاختراق بطريقة القوة الغاشمة عبر الإنترنت من خلال حشو بيانات الاعتماد: وهو نوع هجوم يحاول فيه عميل برنامج (إما متصفح ويب نصي عبر شيء مثل سيلينيوم (Selenium) أو برنامج نصي مخصص) تلقائيًا تسجيل الدخول إلى الموقع المستهدف، وبالإضافة إلى ذلك يمكن أن تستخدم هذه الهجمات مجموعة موزعة من الخوادم الوكيلة لتبدو وكأنها تأتي من مجموعة متنوعة من أجهزة الكمبيوتر المختلفة. يكون معدل هذه الهجمات محدودًا عمومًا بسرعة خادم الويب ووقت استجابة الشبكة ولذلك سيكون المهاجمون حريصين عمومًا على اختيار بيانات الاعتماد الأكثر احتمالًا للمحاولة فقط. على سبيل المثال غالبًا ما يقصرون أسماء المستخدمين على مجموعة مستهدفة أو ضمن مجموعة أسماء مستخدمين سليمة معروفة إذا كانت هناك ثغرة أمنية في تعداد أسماء المستخدمين على الموقع. (لاحظ أنه في معظم الحالات يكون منع تعداد اسم المستخدم دفاعًا متعمقًا ويجب ألا يكون أولوية عالية لتطبيقات الويب.) بالإضافة إلى ذلك، سيحاول المهاجم تحديد أولويات كلمات المرور المحتملة باستخدام تفريغ كلمات المرور لتجربة كلمات المرور المعاد استخدامها وتجربة كلمات المرور شائعة الاستخدام.
القوة الغاشمة دون اتصال: إذا تمكن المهاجم من الحصول على نسخة من قاعدة بيانات كلمات مرور التطبيق (على سبيل المثال عن طريق حقن لغة الاستعلامات البنيوية) فمن المحتمل أن يحاول استخدام القوة الغاشمة لاستخراج بيانات الاعتماد المخزنة. وحسب كيفية تخزين بيانات الاعتماد وقدرات أجهزة المهاجم قد يتمكن المهاجمون من تجربة مئات تريليونات كلمات المرور في الثانية أو مئات منها. على أي حال بمجرد امتلاك المهاجم قاعدة بيانات كلمة المرور لا يمكن للتطبيق اكتشاف الهجوم أو إيقافه، وسيعطي المهاجمون عمومًا الأولوية لكلمات المرور المحتملة في هذا الهجوم ولكن إذا كانت ممولة جيدًا أو إذا كانت خوارزمية تخزين كلمة المرور ضعيفة فيمكن للمهاجم البدء في تعداد جميع كلمات المرور المحتملة.
من بين هذه الهجمات تُعدّ الهجمات عبر الإنترنت أكثر شيوعًا، ومن الناحية المثالية لن تكون التطبيقات عُرضة لحقن لغة الاستعلامات البنيوية ولن يتعرض المطلعون للاختراق ولن يقوموا بأشياء خبيثة ولن تضيع النسخ الاحتياطية لقاعدة البيانات أبدًا. لكن سيكون من غير المسؤول تجاهل إمكانية حدوث هجوم غير يتم دون الاتصال بالإنترنت، وبالنظر إلى ذلك يجب أن تكون أولويات تطبيق الويب (بالترتيب):
منع إعادة استخدام كلمة المرور وبالأخص بالنسبة لكلمات المرور المخترقة المعروفة: لكن هذا أمر مستحيل القيام به تمامًا ويمكن أيضًا أن يتسبب بمشكلات في واجهة المستخدم. لكن هناك خدمات مثل هاف آي بن بوند (Have I Been Pwned) (الإنجليزية، تبدأ الاشتراكات في استخدام واجهة برمجة التطبيقات بسعر 40 دولارًا أمريكيًا في السنة)، وهولد سيكيوريتي (Hold Security) وسباي كلاود (SpyCloud)وما إلى ذلك التي يمكن أن تخبرك ما إذا كان اسم مستخدم وكلمة مرور معينين قد ظهرا في تفريغ كلمة المرور. ويمكن أيضًا تنزيل تجميعات كلمات المرور المفرّغة والتحقق منها محليًا.
منع استخدام كلمات المرور الشائعة: حيث يجب أن تقارن الصفحات التي تسمح للمستخدمين بتعيين كلمة المرور الخاصة بهم كلمة مرور المستخدم مقابل قائمة بكلمات المرور الأكثر شيوعًا (عادة ما يتم الحصول عليها من عمليات تفريغ كلمات المرور). وبعض هذه القوائم متاحة على غت هب (GitHub). لاحظ أن المهاجمين سيستخدمون ذات القوائم لذلك من غير المرجح أن يكون حظر أكثر 100 أو 1000 مرور شيوعًا فعّالًا للغاية.
تأكد من أن كلمات المرور تحتوي على ما يكفي من الإنتروبيا لمقاومة هجمات القوة الغاشمة: على الرغم من أن شيئًا مثل "w)*l3" ليس كلمة مرور شائعة إلا أنه سيتم اكتشافه بسرعة من خلال هجوم بالقوة الغاشمة، ويمكن أن يساعد تعيين الحد الأدنى لطول كلمة المرور في التخفيف من هجمات القوة الغاشمة.
بالطبع يجب تحقيق التوازن بين هذه الأولويات ومتطلبات المستخدم إما لاستخدام مدير كلمات المرور أو لتذكر كلمة المرور الخاصة به. كما أن كلمات المرور بصفتها طريقة مصادقة تُمثل مشكلة إلى حد ما ويغطي القسم التالي المصادقة متعددة العوامل وبدائلها.
لمزيد من المعلومات حول قوة كلمة المرور، راجع هذا الملخص لإرشادات المصادقة من المعهد الوطني للمعايير والتكنولوجيا الخاص بالحكومة الأمريكية.
مصادقة متعددة العوامل
كما يتضح من القسم السابق فإن أمان كلمة المرور صعب للغاية، ويزداد الأمر سوءًا عندما تفكر في هجمات الهندسة الاجتماعية مثل التصيد الاحتيالي. 
التصيد الاحتيالي والهجمات ذات الصلة
يُعدّ التصيد الاحتيالي أحد فئات هجمات الهندسة الاجتماعية التي يستخدمها المهاجمون لمهاجمة الأفراد، وعلى الرغم من أنه يمكن أن يكون للتصيد الاحتيالي العديد من الأهداف (مثل إقناع المستخدمين بتثبيت برمجيات ضارة على أجهزة الكمبيوتر الخاصة بهم أو تحويل الأموال إلى المهاجمين)، إلا أن الهدف الذي نهتم به هو سرقة كلمات مرور المستخدمين. وعلى الرغم من أن التصيد الاحتيالي يُشير عادةً إلى الهجمات التي يتم شنها عبر البريد الإلكتروني إلا أنه يمكن استخدام تقنيات مماثلة عبر مجموعة متنوعة من وسائل الاتصالات، مثل الرسائل النصية القصيرة (SMS) وواتساب (WhatsApp) وسيغنال (Signal) وحتى رموز الاستجابة السريعة (QR). 
في حملة تصيد احتيالي نموذجية لبيانات الاعتماد سيرسل المهاجمون رسائل بريد إلكتروني إلى ضحاياهم يزعمون إرسالها من موقع ويب سليم، وسيحتوي البريد الإلكتروني على عبارة تحث المستخدم على اتخاذ إجراء (مثل طلب تغيير كلمة المرور أو الإقرار بإشعار) مع رابط إلى موقع ويب يتحكم فيه المهاجم ويحتوي على صفحة تسجيل دخول تبدو سليمة. إذا نقر أحد الضحايا على الرابط ثم أدخل كلمة المرور الخاصة به على موقع الويب سيرسل الموقع كلمة المرور الخاصة به إلى المهاجم. (لمزيد من المعلومات حول التصيد الاحتيالي، انظر التحقيق في مسار تعلّم البنية التحتية الضارة.)
تُعدّ هجمات التصيد الاحتيالي منخفضة التكلفة للغاية بالنسبة للمهاجمين وتميل إلى أن تكون فعالة للغاية، وبمجرد أن يحصل المهاجم على كلمة مرور الضحية يمكنه تسجيل الدخول إلى موقع الويب المستهدف بصفته ضحية. مع التحضير يمكن للمهاجم استخدام الأتمتة لتنفيذ الإجراءات على الفور على حساب الضحية بما في ذلك تغيير عنوان البريد الإلكتروني للمستخدم وكلمة المرور لقفل الضحية خارج حسابه الخاص. 
نظرًا لخطر هجمات التصيد الاحتيالي وعدم القدرة الكاملة على مصادقة كلمة المرور لإيقاف التصيد الاحتيالي يجب تقييم أي مخطط مصادقة متعدد العوامل مقابل مقاومة التصيد الاحتيالي. 
لمحة عامة عن المصادقة متعددة العوامل
هناك ثلاثة أنواع من الأمور (تسمى العوامل) التي يمكن استخدامها للمصادقة:
شيء تعرفه: أكثر أمثلة ذلك شيوعًا هي كلمة المرور، وهي أمر تعرفه أنت (ونأمل أن تعرفه أنت فقط)، وهو شائع جدًا لأنه من السهل جدًا إنشاء كلمة مرور سرية ومن السهل تغييرها بشكل عام.
شيء لديك: أكثر أمثلة ذلك الشيء شيوعًا هو مفتاح، وهو شيء لديك يصعب تكراره، وهو أقل شيوعًا لأنه من السهل خسارته ويصعب إعداده في البداية ويصعب تغييره.
شيء منك: أكثر أمثلة ذلك الشيء شيوعًا هو بصمة الإصبع ولكن التعرف على الوجه أصبح شائعًا بشكل متزايد وهو شيء جوهري بالنسبة لك، ومن السهل بشكل مدهش "فقدانها" (مثل تعرض بصمات الأصابع للأذى نتيجة الاحتراق، ومن الصعب للغاية تغييرها عن قصد وعادة ما يمكن أن تحصل أخطاء في عملية التحقق.
تجمع المصادقة متعددة العوامل بين اثنين أو أكثر من هذه العوامل معًا لتعزيز نظام المصادقة الخاص بالنظام، وهناك العديد من الأمثلة على المصادقة متعددة العوامل في الحياة اليومية. يتطلب استخدام ماكينة الصراف الآلي شيئًا لديك (هو البطاقة) وشيئًا تعرفه (رقم التعريف الشخصي الخاص بك). تحتوي العديد من أنظمة التحكم في الوصول إلى المبنى على شارة لفتح الباب ولكن هذه الشارة تظهر أيضًا وجه حامل الشارة على شاشة يمكن للحارس رؤيتها وتجمع بين شيء لديك (الشارة) وشيء منك (وجهك).
في الجزء المتبقي من هذا القسم الفرعي سنناقش مجموعة متنوعة من طرق المصادقة متعددة العوامل الشائعة للويب.
الأسئلة السرية
على الرغم من أن هذا من الناحية الفنية ليس مصادقة متعددة العوامل (لأنها تجمع بين أشياء متعددة يعرفها المستخدم)، إلا أن استخدامها كان شائعًا جدًا في الماضي ولا تزال قيد الاستخدام في العديد من السياقات. كما يوفر استخدام الأسئلة السرية كجزء من المصادقة درجة معينة من الدفاع ضد إعادة استخدام كلمة المرور وهجمات تخمين كلمة المرور، ويوفر حماية ضعيفة جدًا ولا قيمة لها تقريبًا ضد التصيد الاحتيالي. ويمكن لموقع المهاجم ببساطة محاولة تسجيل الدخول إلى موقع الويب الحقيقي ثم الانتقال وطرح الأسئلة السرية على المستخدم، وبالإضافة إلى ذلك كما تمت مناقشته في القسم الفرعي لإعادة تعيين كلمة المرور أعلاه غالبًا ما تكون إجابات الأسئلة السرية قابلة للتخمين. ولهذه الأسباب فإن الأسئلة السرية ليست طريقة قوية للمصادقة متعددة العوامل.
رموز الرسائل النصية القصيرة
تتمثل طريقة المصادقة متعددة العوامل الفعلية شائعة الاستخدام في إرسال رمز إلى المستخدم عند تسجيل الدخول ثم طلب هذا الرمز لإكمال عملية تسجيل الدخول، ويجمع بين شيء يعرفه المستخدم (كلمة المرور الخاصة به) وشيء يملكه (الهاتف الذي يتلقى الرسائل على رقم معين)، لكن لسوء الحظ فإن رموز الرسائل النصية القصيرة لا قيمة لها تقريبًا أمام التصيد الاحتيالي. عندما يقوم المستخدم بتسجيل الدخول إلى موقع الويب المزيف الذي يتحكم فيه المهاجم سيقوم موقع الويب المزيف بتسجيل الدخول إلى موقع الويب الحقيقي، وسيقوم موقع الويب الحقيقي بإرسال رسالة نصية إلى المستخدم ثم يقوم المستخدم بإدخال الرمز في موقع الويب المزيف. يستخدم الموقع المزيف بعدها الرمز الموجود على الموقع الحقيقي ثم يسجل الدخول بصفته الضحية. بالإضافة إلى ذلك يمكن أن تسمح هجمات تبديل بطاقات سيم (SIM) للمهاجمين بالاستيلاء على رقم هاتف الضحية مما يسمح للمهاجم بتلقي رسائل نصية قصيرة مخصصة للضحية. ولهذه الأسباب لا تُعدّ رموز الرسائل النصية القصيرة طريقة متعددة العوامل قوية لمواقع الويب الحساسة أو المهمة.
كلمات مرور تستخدم مرة واحدة ولفترة زمنية محدودة
عند استخدام كلمات المرور التي تستخدم لمرة واحدة ولفترة زمنية محدودة (Time-based One-Time Password أو اختصارًا TOTP)، خلال بدء النظام يقوم الخادم والجهاز الذي يتحكم فيه المستخدم بتبادل رمز تشفير سري ("القيمة الأولية") ومزامنة الساعات. وبعد ذلك عندما يرغب المستخدم في المصادقة على موقع ويب يقوم جهاز المستخدم بإجراء عملية تشفير على القيمة الأولية والوقت الحالي مما يؤدي إلى إنشاء رمز يصلح فقط لثواني أو دقائق. يؤدي الخادم العملية ذاتها ويستخدمها للتحقق من رمز المستخدم. في الماضي كان نظام كلمات المرور التي تستخدم مرة واحدة ولفترة زمنية محدودة الأكثر شيوعًا هو المعرّفات الآمنة من آر إس إيه (RSA SecureIDs) والذي كان باهظ الثمن، لكن تعمل معظم أنظمة كلمات المرور التي تستخدم لمرة واحدة اليوم على الهواتف الذكية. ومن الأمثلة على ذلك غوغل أوثنتيكيتر (Google Authenticator) وأوثي (Authy). وبغض النظر يعمل نظام كلمات المرور التي تستخدم لمرة واحدة لديك بحيث يكون شيئًا لديك (القيمة الأولية للنظام) لأغراض المصادقة.
مثل رموز الرسائل النصية القصيرة تُعدّ كلمات مرور تستخدم مرة واحدة ولفترة زمنية محدودة عُرضة أيضًا للتصيد الاحتيالي، ويمكن للموقع المزيف الذي يتحكم فيه المهاجم ببساطة أن يطلب من المستخدم رمز كلمة المرور التي تستخدم لمرة واحدة الخاص به واستخدامه لتسجيل الدخول إلى الموقع الحقيقي. ولهذا السبب، ليست كلمات المرور التي تستخدم مرة واحدة ولفترة زمنية محدودة طريقة مصادقة متعددة العوامل قوية لمواقع الويب الحساسة أو المهمة. لاحظ أيضًا أنه إذا فقد المستخدم هاتفه أو مسحه فمن غير المرجح أن يتمكن من المصادقة على الموقع حيث فقد القيم الأولية الخاصة به لكلمات المرور التي تستخدم لمرة واحدة ولفترة زمنية محدودة.
مفاتيح الأمان
مفاتيح الأمان (يشار إليها أحيانًا باسم المعامل الثاني الشامل (U2F) وإف آي دي أوْ (FIDO) أو وويب أوثنتكيشن ويوبيكيز (Yubikeys) وما إلى ذلك) هي أجهزة تُنفذ بروتوكول مصادقة التشفير. عند تسجيل مفتاح أمان مع موقع ويب، يقوم الموقع والمفتاح بتبادل مفتاح عام، وفي عمليات المصادقة اللاحقة يُقدم الخادم تحديًا موقّعًا إلى الجهاز، حيث يتحقق الجهاز من توقيع المَوقع ثم يستجيب باستخدام استجابة موقّعة، وأخيرًا يتحقق الخادم من توقيع الجهاز. يُثبت هذا للخادم أنك تمتلك المفتاح الذي تم تسجيله في البداية مما يجعله شيئًا تملكه. وتقليديًا كانت مفاتيح الأمان عبارة عن أجهزة قائمة بذاتها تتحدث إلى جهاز كمبيوتر أو جهاز محمول عبر الناقل التسلسلي العالمي (USB) أو الاتصال بالحقل القريب (NFC) على الرغم من أن دعم استخدام الهواتف الذكية وأجهزة الكمبيوتر متاح في بعض التكوينات.
على عكس طرق المصادقة متعددة العوامل الأخرى التي تمت مناقشتها هنا تُعدّ مفاتيح الأمان مقاومة للتصيد الاحتيالي، وتتمثل الفكرة هنا بأن التحدي الموقّع يتضمن هوية موقع الويب الذي يطلب المصادقة. بالنسبة لموقع سليم سيتطابق هذا مع مفتاح موقع موجود على الجهاز، وبالنسبة للموقع الذي يتحكم فيه المهاجمون لن يتطابق الموقع مع أي مفتاح موقع حالي وبالتالي لن يتم إجراء مصادقة متعددة العوامل. لذلك قد يكون لدى المهاجم كلمة مرور المستخدم ولكنه لن يتمكن من إكمال المصادقة على موقع الويب المستهدف حيث لا توجد طريقة للمهاجم لإكمال عملية المصادقة متعددة العوامل، لكن من الناحية السلبية يمكن فقدان مفاتيح الأمان، وبشكل عام ستسمح المواقع التي تستخدم مفاتيح الأمان للمستخدمين بتسجيل مفاتيح متعددة بحيث في حالة فقدان أحدها أو تلفه يمكن استخدام نسخة احتياطية.
كلمات المرور المخصصة للاستخدام مرة واحدة
تُستخدم كلمات المرور المخصصة للاستخدام لمرة واحدة التي تم إنشاؤها مسبقًا في بعض الأحيان كنسخة احتياطية لطرق المصادقة متعددة العوامل الأخرى، وسبق استخدامها للتطبيقات عالية الأمان قبل انتشار استخدام الهواتف الذكية. تُشير مواقع الويب الحديثة في كثير من الأحيان إلى هذه باسم "الرموز الاحتياطية"، حيث يقوم الخادم بإنشاء قائمة بالرموز وتخزينها وتقديمها إلى المستخدم. يقوم المستخدم عمومًا بطباعتها وتخزين الورق في مكان آمن، وفي كل مرة يُستخدم فيها رمز توضع عليه علامة أنه غير صالح من قبل الخادم. وتُعدّ هذه عُرضة لذات نقاط ضعف كلمات مرور تستخدم مرة واحدة ولفترة زمنية محدودة ولكن لديها ميزة ضارة لكونها غير مريحة للغاية، وعلى هذا النحو تُستخدم بشكل متكرر لتكون بديلًا احتياطيًا لطرق المصادقة متعددة العوامل الأخرى. نأمل أن يكون استخدامها نادرًا بما يكفي بحيث إذا طُلب من المستخدم إدخال رمز احتياطي أن يتوقف ويدقق في موقع الويب مقدم الطلب مما يجعل أرجحية نجاح هجوم التصيد الاحتيالي أقل. ومن الأمثلة على المواقع التي تستخدم رموز الاحتياطية البديلة هي جيميل (Gmail) وغت هب. 
لأجل مصادقة إضافية راجع ورقة المعلومات المرجعية حول المصادقة من مشروع أمان تطبيق الويب المفتوح وورقة المعلومات المرجعية للمصادقة متعددة العوامل من مشروع أمان تطبيق الويب المفتوح. لأجل استكشاف متعمّق راجع مسار تعلّم تقييم أمان تطبيقات الويب.
تثبيت الجلسة
يُعدّ تثبيت الجلسة مفهومًا ذا أهمية في أمان الويب، ويشير إلى هجوم يقوم فيه المهاجم بتعيين معرّف جلسة المستخدم إلى قيمة يعرفها المهاجم. ويمكن أن يحدث هذا من خلال وسائل مختلفة مثل هجمات التصيد الاحتيالي أو من خلال استغلال ثغرات في تطبيق الويب. يتضمن الهجوم الحصول على معرّف جلسة فعّال وإقناع المستخدم بالمصادقة عليه ثم الاستيلاء على الجلسة من خلال الاستفادة من معرّف الجلسة الذي أصبح معروفًا. ويتطلب ذلك من المهاجم توفير معرّف جلسة تطبيق ويب حقيقي والتلاعب بمتصفح الشخص المستهدف كي يقوم باستخدامه، ثم يمكنه الاستيلاء على جلسة المستخدم والتمتع بالوصول غير المصرّح به إلى حساب المستخدم.
يستغل تثبيت الجلسة نقاط الضعف في كيفية إدارة تطبيق الويب لمعرّفات الجلسة، وبشكل أساسي يفشل التطبيق الضعيف في تعيين معرّف جلسة جديد أثناء مصادقة المستخدم مما يُمكّن المهاجم من استخدام معرّف جلسة قائم بالفعل. وعلى عكس اختطاف الجلسة الذي يحدث بعد تسجيل دخول المستخدم، يسمح تثبيت الجلسة بالتحكم في الجلسة قبل مصادقة المستخدم.
يمكن استخدام تقنيات مختلفة لتنفيذ هذا الهجوم حسب كيفية تعامل تطبيق الويب مع رموز الجلسة:
رمز الجلسة في وسيطة عنوان موقع الويب: يُرسل المهاجم معرّف الجلسة إلى الضحية عبر رابط تشعبي مما يؤدي بالضحية إلى الوصول إلى الموقع من خلال عنوان موقع الويب الضار.
رمز الجلسة في حقل نموذج مخفي: يخدع المهاجم الشخص المستهدف في المصادقة على خادم الويب المستهدف باستخدام نموذج تسجيل الدخول الذي طوره المهاجم والذي يحتمل أن يكون مستضافًا على خادم غير شرعي أو ضمن بريد إلكتروني بتنسيق لغة تمييز النص التشعبي.
معرّف الجلسة في ملف تعريف الارتباط:
البرنامج النصي من جانب العميل: يستخدم البرمجة النصية من جانب العميل لحقن التعليمات البرمجية الضارة، غالبًا عبر هجمات البرمجة النصية عبر المواقع في ارتباط تشعبي ويُحدد معرّف الجلسة في ملف تعريف ارتباط الشخص المستهدف باستخدام وظيفة document.cookie.
وسم <meta>: شكل آخر من أشكال هجوم حقن التعليمات البرمجية وهو أكثر فعالية من البرمجة النصية عبر المواقع حيث لا يمكن تعطيله أو رفضه بسهولة من قبل المتصفحات.
استجابة رأس بروتوكول نقل النص التشعبي: يستغل استجابات الخادم لتضمين معرّف الجلسة في متصفح الضحية من خلال تضمين معلمة "Set-Cookie" في استجابة رأس بروتوكول نقل النص التشعبي.

تُقدم العديد من أطر عمل الويب والمكتبات ميزات لمساعدة المطورين في تنفيذ إدارة جلسة آمنة مما يساعد على التخفيف من ثغرات تثبيت الجلسة، وغالبًا ما تتضمن هذه الأطر آليات مدمجة لإنشاء معرّفات الجلسة وتخزينها والتحقق من صحتها. قد تسمح بتكوين انتهاء صلاحية الجلسة، وتجديد معرّفات الجلسة عند المصادقة وضمان النقل الآمن لبيانات الجلسة، ولكن قد يكون من المفيد للمطورين تنفيذ هذه الممارسات بفعالية ضمن رمز التطبيق الخاص بهم أيضًا، مما يضمن التكوين والاستخدام المناسبين للتخفيف من ثغرة تثبيت الجلسة والثغرات الأخرى، كما تُعد التحديثات المنتظمة للمكتبات وأطر العمل أمرًا بالغ الأهمية لأنها قد تحتوي على تحديثات تصحيح أو تحسينات تتعلق بأمن إدارة الجلسة.

الوقاية من ثغرات تثبيت الجلسة
بالنسبة لمعظم مسؤولي خادم الويب، تُعدّ أفضل طريقة للتخفيف من ثغرات تثبيت الجلسة هي التأكد من أن حزمة البرامج التي تستخدمها للمصادقة تحتوي على طرق تخفيف من الهجمات المشابهة وأنها أيضًا محدّثة، وإذا كنت تستخدم مكتبة بها ثغرة تسمح بتثبيت الجلسة فتأكد من ترقيتها في أقرب وقت ممكن.
تتخذ تطبيقات الويب والمكتبات وأطر العمل عدة خطوات للتخفيف من هجمات تثبيت الجلسة، وتشمل هذه الإجراءات إنشاء معرّفات جلسة عشوائية لكل جلسة مستخدم وتنتهي صلاحية الجلسات بعد فترة من عدم النشاط وتُنفذ تدابير مثل تجديد معرّف الجلسة عند المصادقة. يجب أن يستخدم تطبيق الويب الخاص بك دائمًا بروتوكول نقل النص التشعبي الآمن لأجل حفظ الأمان والخصوصية ولأنه بالمثل يوفر طبقة إضافية من الحماية ضد هجمات تثبيت الجلسة: من الصعب جدًا اعتراض معرّفات الجلسة أثناء النقل إذا كان الاتصال بين العميل والخادم مشفرًا. وفي النهاية يجب أن يرفض تطبيق الويب الخاص بك أيضًا الرموز المميزة للجلسة المفروضة خارجيًا والتي ستساعد أيضًا في الحماية ضد هذا النوع من الهجمات.
إذا كنت ستقوم بترميز تطبيق ويب بقدرات المصادقة فإننا نوصي بقراءة هذه المقالة وتنفيذ التدابير التالية التي توصي بها، والتي تساعد على حماية تطبيق الويب من هجمات تثبيت الجلسة:

تجنّب قبول معرّفات الجلسة عبر معلمات GET أو POST لأن هذا يقلل من مخاطر الاستغلال عن طريق تقليل الاعتماد على ثغرات المتصفح، وبالإضافة إلى ذلك يجب أن يتم إنشاء جميع معرّفات الجلسة بواسطة الخادم مما يلغي أي حاجة إلى معرّفات الجلسة المقترحة من العميل.
بعد تسجيل الدخول ابدأ تغيير معرّف الجلسة عن طريق إنشاء معرّف جديد على الخادم وتحديثه ليكون ملف تعريف ارتباط، وفي الوقت نفسه قم بإبطال أي جلسة موجودة مرتبطة بالمستخدم.
ضمّن وظيفة تسجيل خروج تُمكّن المستخدمين من إنهاء جلساتهم على الفور وبالتالي ضمان الإنهاء الفوري للجلسة من جانب الخادم بدلًا من مجرد حذف ملف تعريف ارتباط المتصفح، وبالإضافة إلى ذلك نفّ آليات انتهاء الجلسة لإبطال بيانات الجلسة تلقائيًا بعد فترة زمنية محددة مسبقًا مما يحد من فرصة المهاجمين للاستفادة من الجلسات المخترقة.
موارد التعلّم
[تلخص جميع الروابط في العرض بالإضافة إلى أي موارد إضافية لتضمينها]
اختبار مهارة

التمرين 1: ملخص

أكمل التمرين الذي وصفناه أعلاه، ثم أجر حقن لغة الاستعلامات البنيوية على دي في دبليو إيه وقارن شفرات التجزئة التي اكتشفتها بتلك التي وجدتها على موقع بحث شفرات التجزئة.

التمرين 2: اختبار خيارات متعددة
تُمثل المصادقة المعطلة تهديدًا كبيرًا لأمن تطبيقات الويب مما يسمح للمهاجمين باختراق بيانات اعتماد المستخدم واختطاف الجلسات والوصول غير المصرح به إلى المعلومات الحساسة، وفي هذه المجموعة من الأسئلة متعددة الخيارات يمكنك استكشاف مفهوم المصادقة المعطلة والخوض في المخاطر المختلفة المرتبطة بهذه الثغرة. بالإضافة إلى ذلك إذا كنت تعمل مع مُرشِد أو زميل يمكنك فحص أنواع مختلفة من العيوب التي يمكن أن تؤدي إلى اختراق آليات المصادقة ومناقشة استراتيجيات تخفيف محددة مصممة لمعالجة كل من هذه الثغرات بشكل فعال.

عزز فهمك لأمن تطبيقات الويب وتعلّم كيفية التخفيف من المخاطر التي تشكلها المصادقة المعطلة من خلال هذه الأسئلة:

السؤال 1. ما هي المصادقة المعطلة في سياق أمن تطبيقات الويب؟
أ) ثغرة تسمح للمهاجمين بتنفيذ تعليمات برمجية عشوائية على الخادم.   
ب) ثغرة يمكن استغلالها تتيح الوصول غير المصرح به إلى الأجزاء المقيدة من تطبيق الويب.   
ج) نقطة ضعف في آلية المصادقة لتطبيق الويب تؤدي إلى اختراق بيانات اعتماد المستخدم.   
د) ثغرة تمكن المهاجمين من اعتراض الاتصالات بين العميل والخادم.

السؤال 2. ما هي المخاطر المحتملة المرتبطة بثغرات المصادقة المعطلة؟
أ) الوصول غير المصرح به إلى البيانات الحساسة وحسابات المستخدمين.
ب) كشف رموز الجلسة مما يؤدي إلى هجمات اختطاف الجلسة.   
ج) اختراق بيانات اعتماد المستخدم بما في ذلك كلمات المرور ورموز المصادقة.   
د) كل ما سبق

السؤال 3. أي مما يلي ليس مثالًا على آلية التخفيف لثغرات المصادقة المعطلة؟
أ) تنفيذ المصادقة متعددة العوامل لحسابات المستخدمين.  
ب) فرض سياسات قوية لكلمة المرور بما في ذلك التغيير المنتظم لكلمات المرور.  
ج) تعطيل بروتوكول نقل النص التشعبي الآمن لمنع اعتراض بيانات اعتماد المصادقة.
د) تنفيذ آليات تأمين الحساب لمنع هجمات القوة الغاشمة.

السؤال 4. ما نوع الخلل الذي قد يؤدي إلى اختراق آليات المصادقة ويسمح للمهاجمين بتخمين كلمات مرور المستخدم أو اختراقها؟
أ) تثبيت الجلسة
ب) تزييف طلب مواقع مشتركة  
ج) عدم كفاية تعقيد كلمة المرور   
د) البرمجة النصية عبر الموقع

السؤال 5. ما هو المثال المحدد لاستراتيجية التخفيف لمعالجة عيب عدم كفاية تعقيد كلمة المرور؟
أ) تنفيذ تحديات اختبار كابتشا أثناء عملية تسجيل الدخول.   
ب) فرض متطلبات طول كلمة المرور وتعقيدها.  
ج) تشفير رموز المصادقة لمنع الاعتراض.  
د) إدراج عناوين بروتوكول الإنترنت الموثوقة في القائمة البيضاء للوصول إلى صفحة تسجيل الدخول.

السؤال 6. ما هي استراتيجية التخفيف التي تهدف إلى منع المهاجمين من استغلال ثغرات تثبيت الجلسة؟
أ) تنفيذ آليات مهلة الجلسة.
ب) تشفير ملفات تعريف الارتباط للجلسة باستخدام بروتوكول نقل النص التشعبي الآمن.   
ج) تجديد معرّفات الجلسة بعد نجاح المصادقة.
د) فرض سياسات كلمة مرور قوية لحسابات المستخدمين.

السؤال 7. ما نوع الخلل الذي قد يؤدي إلى اختراق آليات المصادقة من خلال السماح للمهاجمين باختطاف جلسات المستخدم النشطة؟
أ) فترة انتهاء صلاحية الجلسة غير ملائمة   
ب) تخزين الرمز المميز غير آمن   
ج) البرمجة النصية عبر الموقع   
د) تزييف طلب المواقع المشتركة

السؤال 8. ما هي استراتيجية التخفيف التي تعالج عيب تخزين الرموز غير الآمنة من خلال إدارة رموز المصادقة بشكل آمن؟
أ) تخزين الرموز في نص عادي داخل ملفات تعريف الارتباط من جانب العميل.   
ب) تشفير الرموز باستخدام خوارزمية تشفير متماثلة.   
ج) تنفيذ خوارزميات تجزئة كلمة المرور الآمنة.   
د) استخدام رؤوس بروتوكول نقل النص التشعبي لنقل رموز المصادقة.

السؤال 9. ما هو المثال المحدد لاستراتيجية التخفيف لمنع هجمات تثبيت الجلسة؟
أ) تبديل معرّفات الجلسة بعد نجاح تسجيل الدخول.   
ب) تنفيذ المصادقة متعددة الخطوات   
ج) استخدام تحديات اختبار كابتشا للتحقق من صحة المستخدم.   
د) فرض التحقق الصارم من صحة المدخلات في نموذج تسجيل الدخول.

السؤال 10. ما نوع الخلل الذي قد يؤدي إلى اختراق آليات المصادقة من خلال السماح للمهاجمين بتزوير الطلبات إلى تطبيق الويب أثناء المصادقة بصفته مستخدمًا آخر؟
أ) فترة انتهاء صلاحية الجلسة غير ملائمة
ب) حماية طبقة النقل غير كافية   
ج) البرمجة النصية عبر الموقع   
د) تزييف طلب المواقع المشتركة
    
مفتاح الإجابات
1. ب) نقطة ضعف في آلية المصادقة لتطبيق الويب تؤدي إلى اختراق بيانات اعتماد المستخدم.
2. د) كل ما سبق
3. ج) تعطيل بروتوكول نقل النص التشعبي الآمن لمنع اعتراض بيانات اعتماد المصادقة.
4. ج) عدم كفاية تعقيد كلمة المرور
5. ب) فرض متطلبات طول كلمة المرور وتعقيدها.
6. ج) تجديد معرّفات الجلسة بعد نجاح المصادقة.
7. أ) فترة انتهاء صلاحية الجلسة غير ملائمة
8. ب) تشفير الرموز باستخدام خوارزمية تشفير متماثلة.
9. أ) تبديل معرّفات الجلسة بعد نجاح تسجيل الدخول.
10. د) تزييف طلب المواقع المشتركة



التمرين 3: اكتشاف كلمة مرور باستخدام جداول قوس قزح
بالنظر إلى قيمة شفرة تجزئة 168f3c743786fea2e04aeeee33e112da، حاول اكتشاف كلمة المرور باستخدام جداول قوس قزح. 🌈 استخدام رينبوكراك (RainbowCrack) (http://project-rainbowcrack.com/). قد تكون أسهل طريقة لتشغيل رينبوكراك هي استخدام كالي لينوكس (https://www.kali.org/) في جهاز ظاهري أو إقلاعه من لايف يو إس بي (LiveUSB) (راجع الروابط في قسم المعلومات الأساسية في بداية مسار التعلّم هذا لمزيد من المعلومات). خوارزمية شفرة التجزئة هي إم دي 5 وشفرة التجزئة غير مملحة.

تلميح: كلمة المرور أبجدية رقمية بأحرف صغيرة بحد أقصى 6 أحرف، وبمجرد تثبيت رينبوكراك، يمكنك استخدام الأمر التالي لإنشاء الجدول المطلوب:

rtgen md5 loweralpha-numeric 1 6 0 3800 1000000 0

(اختياري) حاول استخدام الجدول الذي تم إنشاؤه لتفكيك شفرة تجزئة أخرى: feadfd87d487818698d63aedf385c4e2.

تلميح: إذا فشل ذلك يمكنك محاولة إنشاء المزيد من الجداول لزيادة معدل نجاح مجموعة جدولك (التغطية). ما عليك سوى تغيير المعلمة الخامسة لتصبح أمر rtgen إلى قيم مختلفة (جرب 1-5).

حاول تفكيك شفرة التجزئة المملحة التالية: 93e99d25dd6e8f524f23814908b6c039.






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
