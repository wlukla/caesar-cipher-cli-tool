# caesar-cipher-cli-tool

## About

Caesar cipher cli tool is made for command line encoding/decoding strings and text files with Caesar cipher.

## How to install

1. Clone this repo to your local machine.
2. Go to folder.
3. Run `npm install`.

## How to use

Run `node caesar-cli` in your command line with following required options:

- `-s, --shift <shift size>` - set letters shift size
- `-a, --action <encode|decode>` - set action to perform (only `encode` and `decode` available)

Then you write string you want to encode/decode and hit enter to see result.

If you want to process files you should copy them into project folder and use following optional arguments:

- `-i, --input <input file path>` - set path to input file
- `-o, --output <output file path>'` - set path to output file

## Examples

- `node caesar-cli -s 1 -a encode` - encode string with shift in one letter
- `node caesar-cli --shift 1 --action encode` - same as previous
- `node caesar-cli -s 1 -a encode -i input.txt -o output.txt` - encode file _input.txt_ with shift in one letter and save result into _output.txt_
- `node caesar-cli --shift 1 --action encode --input input.txt --output output.txt` - same as previous
