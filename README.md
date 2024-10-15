# tstl-attribution-plugin

A transformer for Typescript-To-Lua which can be used to add attribution to output files.

## Usage

First, install with npm:

```bash
npm i --save-dev @adamraichu/tstl-attribution-plugin
```

Then, add the plugin to your `tsconfig.json`:

```jsonc
// tsconfig.json
{
  // [...]
  "tstl": {
    // [...]
    "luaPlugins": [
      {
        "name": "@adamraichu/tstl-attribution-plugin",
        "comment": "-- Hello world!"
      }
    ]
  }
}
```

Now, when you run `tstl`, the output file will have the comment `-- Hello world!` prepended to it.

If you forget to put the newline character (`\n`) at the end of your comment, the plugin will add it for you. Other than that, there is no validation! So double check that anything you put in there is valid lua syntax.
