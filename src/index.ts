import * as ts from "typescript";
import * as tstl from "typescript-to-lua";

class AttributionPlugin implements tstl.Plugin {
  beforeEmit(program: ts.Program, options: tstl.CompilerOptions, emitHost: tstl.EmitHost, result: tstl.EmitFile[]) {
    console.log("Loading attribution plugin...");
    if (!Object.keys(options).includes("luaPlugins")) {
      console.warn("No `luaPlugins` option found in compiler options. Skipping attribution plugin.");
      return;
    }

    let comment = findPluginOptions(options.luaPlugins).comment;
    if (typeof comment !== "string") {
      console.warn("`comment` setting for plugin must be a string. Skipping...");
      return;
    }

    if (!comment.endsWith("\n")) {
      // Just in case someone forgets. Definitely never happened to me...
      comment += "\n";
    }

    for (const file of result) {
      file.code = comment + file.code;
    }

    console.log("Attribution plugin complete!");
  }
}

function findPluginOptions(plugins: tstl.LuaPluginImport[]): tstl.LuaPluginImport {
  for (var i = 0; i < plugins.length; i++) {
    if (plugins[i].$DEVID$ === "adamraichu-attribution-plugin") {
      return plugins[i];
    }

    if (plugins[i].name === "@adamraichu/tstl-attribution-plugin") {
      return plugins[i];
    }

    console.warn("No configuration found for attribution plugin. (Which makes no sense.) Skipping...");
    console.warn("Please open an issue at https://github.com/adamraichu/tstl-attribution-plugin/issues/new that includes your tsconfig.json and package.json.");
    return { name: "___no_settings_found_somehow___", comment: "" };
  }
}

const plugin = new AttributionPlugin();
export default plugin;
