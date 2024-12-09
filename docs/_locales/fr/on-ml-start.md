# file read

FR

Reads the contents of a file from the file system

```sig
files.read("/path/to/file.txt", "UTF-8")
```

## Parameters

* **path**: a string that contains the path to the file on disk
* **encoding**: the encoding of the file to be read

## Example

This example reads from a file on disk and prints the contents to the console.

```blocks
const contents = files.read("/path/to/file.txt", "UTF-8");
console.log(contents)
```

## See also
* [write file](./write-file)

```package
my-custom-extension=github:username/extension-repo
```