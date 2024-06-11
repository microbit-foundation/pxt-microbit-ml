# Experimental Makecode Extension to test machine learning integration with the micro:bit

This extension is experimental and is being used for testing purposes.

## Building locally

Ensure you have the required toolchain to build for V1 and V2
(arm-none-eabi-gcc, python, yotta, cmake, ninja, srec_cat) or docker.

```bash
git clone https://github.com/microbit-foundation/pxt-ml-extension-poc
cd pxt-ml-extension-poc
npm install pxt --no-save
npx pxt target microbit --no-save
npx pxt install
PXT_FORCE_LOCAL=1 PXT_NODOCKER=1 npx pxt
```

For the V1 build Yotta can hit the GitHub rate limits quite easily if the
project is built from a clean state more than once.
A V2-only build can be performed with the `PXT_COMPILE_SWITCHES=csv---mbcodal`
environmental variable.

```
PXT_FORCE_LOCAL=1 PXT_NODOCKER=1 PXT_COMPILE_SWITCHES=csv---mbcodal npx pxt
```

## Build flags

### Built-in ML model

The `MLRUNNER_USE_EXAMPLE_MODEL` flag can be configured as described in:
https://github.com/microbit-foundation/pxt-ml-runner-poc#built-in-ml-model

### Debug messages

To enable debug print from this extension, add the following into your
pxt.json file:

```json
{
    "yotta": {
        "config": {
            "ML_DEBUG_PRINT": 1
        }
    }
}
```


## License

This software made available under the MIT open source license.

[SPDX-License-Identifier: MIT](/LICENSE)

## Code of Conduct

Trust, partnership, simplicity and passion are our core values we live and breathe in our daily work life and within our projects. Our open-source projects are no exception. We have an active community which spans the globe and we welcome and encourage participation and contributions to our projects by everyone. We work to foster a positive, open, inclusive and supportive environment and trust that our community respects the micro:bit code of conduct. Please see our [code of conduct](https://www.microbit.org/safeguarding/) which outlines our expectations for all those that participate in our community and details on how to report any concerns and what would happen should breaches occur.

#### Metadata (used for search, rendering)

- for PXT/
<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>
