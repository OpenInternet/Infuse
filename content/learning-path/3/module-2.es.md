+++
style = "module"
weight = 2
title = "Basic file analysis"
+++

## Use Case

Once you have a piece of malware on your analysis VM, the next step is to figure out what’s in it. A piece of malware may use multiple files; in this case you would use the techniques in this section for each file. There are a few different ways to get an idea of what kind of file you’re dealing with. Note that some malware is tricky about this, hiding malicious content in innocuous files or making files that are several valid types at once (a classic example being the GIFAR, which is a file that is both a valid image and also a valid Java applet). Because of this, when evaluating malware files, we need to perform a deeper analysis of file types and contents. Beyond basic file extensions, we’ll examine file headers and signatures, as well as string contents.

## Objectives

After completing this subtopic, the practitioner should be able to do the following:

- Understand file extensions, headers, and metadata
- Use off-the-shelf tools that detect file types

---

## File Extension

For many operating systems, file extensions are very important to how the system treats the file. File names (and thus extensions) are not actually part of the file, but part of the file metadata in the filesystem. As such, they are easily changed, and don’t actually reveal anything critical about the content of the file. That said, they’re a good first step in analysis. There is a practically unlimited set of file extensions (they’re just letters at the end of a filename), and there is no enforced registry. There can be no exhaustive list of extensions, and many extensions have multiple possible meanings. That said, here are some lists:

- [Common file extensions from Microsoft](https://support.microsoft.com/windows/common-file-name-extensions-in-windows-da4a4430-8e76-89c5-59f7-1cdbbc75cb01) (multiple languages, free)
- [Large list of file extensions from Wikipedia](https://en.wikipedia.org/wiki/List_of_filename_extensions) (English, Japanese, and Korean, free)
- [Large list of file extensions from the maker of TrID](https://mark0.net/soft-trid-deflist.html), a file identification program (English, free)

## Headers

Many file formats have distinctive data structures that are unique to their file format. Usually, this is at the start of the file, but sometimes it appears in other places. For example, GIF files start with the string “GIF89a” (or, less commonly, “GIF87a”), while Windows executables (PE format) start with “MZ”. These headers are critical, as most (if not all) software that uses a file will not process the file without the correct signatures. For example, if you try to run a file that ends in “.exe” in Windows, but the file doesn’t contain a proper PE file header, Windows will not execute the file.

## Beyond standard headers

In many cases, it is possible to determine more about a file format by looking at additional file content. For example, both regular ZIP archives and Java archive (JAR) files are in ZIP format. If you rename a .jar file to .zip, standard ZIP tools will extract it just fine. However, all JAR files will have strings in them (such as “MANIFEST.MF”) that not all ZIP files will.

In some cases, files won’t even have the same basic format, but it will be difficult to distinguish between them. For example, both Java bytecode and Mach-O binaries start with the byte sequence 0xCAFEBABE. [Here is the code](https://github.com/file/file/blob/master/magic/Magdir/cafebabe) which the file command uses in order to tell the two of them apart: as you can see, it requires many heuristics.

## Tools

Since the number of file types is immense, it makes sense to use a tool with a database of file types. The most common of these is the “file” command in linux. [Since it’s open-source](https://github.com/file/file), you can see how it came to a particular decision about a particular file. A similar tool is [TrID](https://mark0.net/soft-trid-e.html). While it’s not open-source, you may be able to get better results on certain files,

Another useful tool for file analysis is the “strings” command. This unix utility will print out all the ASCII strings in a file, which can be incredibly useful for spotting patterns such as URLs. While this won’t work well on encrypted, compressed, or encoded data, it can be useful.

Lastly, a hex editor will display binary files in a human-readable format. Typically they will display both a hexadecimal and ascii representation of the file data, which can be helpful in detecting patterns. There are many hex editors, [Wikipedia has a comparison of some](https://en.wikipedia.org/wiki/Comparison_of_hex_editors), and REMnux comes with a hex editor called [wxHexEditor](https://www.wxhexeditor.org/home.php).

For a more advanced guide on how to capture and do preliminary analysis on an Android app, we recommend checking out [this excellent guide](https://pts-project.org/guides/g3/) from PiRogue tool suite.

## Reverse engineering file formats

Here’s [a quick article on static reverse engineering of file formats](https://en.wikibooks.org/wiki/Reverse_Engineering/File_Formats). Read through it and make sure that you have understood it. If possible, discuss this article with a mentor or someone else with deep knowledge of file format reverse engineering.

## Learning Resources

{{% resource title="Common file name extensions in Windows" languages="English" cost="Free" description="Guide by Microsoft outlining commonly encountered file extensions in Windows." url="https://support.microsoft.com/en-us/windows/common-file-name-extensions-in-windows-da4a4430-8e76-89c5-59f7-1cdbbc75cb01" %}}

{{% resource title="List of filename extensions | Wikipedia" languages="English, Japanese, Korean" cost="Free" description="Comprehensive list of file extensions used by various software." url="https://en.wikipedia.org/wiki/List_of_filename_extensions" %}}

{{% resource title="TrID" languages="English" cost="Free" description="Program for Windows and Linux to identify file types based on binary signatures." url="https://mark0.net/soft-trid-e.html" %}}

{{% resource title="File extensions and file type definitions" languages="English" cost="Free" description="TrID’s list of over 16,000 known file extensions." url="https://mark0.net/soft-trid-deflist.html" %}}

{{% resource title="File" languages="English" cost="Free" description="Command line program for Unix-like systems to identify files by type." url="https://github.com/file/file" %}}

{{% resource title="Comparison of hex editors" languages="English, Simplified Chinese, Croatian, Spanish" cost="Free" description="List and comparison of hex editors for directly editing binary files." url="https://en.wikipedia.org/wiki/Comparison_of_hex_editors" %}}

{{% resource title="wxHexEditor" languages="English" cost="Free" description="Official webpage of the hex editor supplied with REMnux." url="https://www.wxhexeditor.org/home.php" %}}

{{% resource title="Wikibooks/ Reverse Engineering File Formats" languages="English" cost="Free" description="Comprehensive guide to reverse engineering file formats." url="https://en.wikibooks.org/wiki/Reverse_Engineering/File_Formats" %}}

{{% resource title="Beginner guide: how to handle a potentially malicious mobile app" languages="English" cost="Free" description="Introduction to handling suspicious Android apps with initial data collection and analysis steps." url="https://pts-project.org/guides/g3/" %}}

## Practice

Complete the [Malware Introductory](https://tryhackme.com/room/malmalintroductory) (free) exercises on TryHackMe

## Skill Check

Open up the REMNux VM you set up in the previous subtopic’s practice exercises.

Conduct the following tasks:

1. Transfer a non-malicious non-executable file to it directly from the host operating system.
2. In addition to that, download either a malicious file from [Malware Bazaar](https://bazaar.abuse.ch/) or a (hopefully non-malicious) exe file from elsewhere. Identify the format of both the non-executable file you downloaded in the previous step and the current executable file using the `file` command.
3. Open the two files you have just run the `file` command on in a hex editor. Do you see any major differences between them, especially in how the files start?
4. Download a .docx file from the Internet (again, Malware Bazaar should work here). Open it in a hex editor to confirm it starts with ‘PK’. Then use the unzip command on it and confirm it is actually a zip file.
5. Do the same for an .apk file (this is an Android package file).

Show the work above to a mentor or peer who will confirm that you have correctly carried out the exercises.
