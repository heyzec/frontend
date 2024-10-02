// @ts-check: Show errors in this js file
const sassPlugin = require('esbuild-sass-plugin').sassPlugin;
// @ts-expect-error haha
const esbuild = require("esbuild");
// @ts-expect-error haha
const polyfillNode = require("esbuild-plugin-polyfill-node").polyfillNode;

async function main() {
  const webviewCtx = await esbuild.context({
    entryPoints: ["./src/index.tsx"],
    bundle: true,
    format: "esm",
    platform: "browser",
    sourcemap: true,
    outfile: "./out/webview.js",
    external: ["public"],
    loader: {
      '.woff': 'file',
      '.woff2': 'file',
      '.ttf': 'file',
      '.svg': 'file',
      '.jpg': 'file',
      '.wasm': 'file',
    },
    plugins: [
      sassPlugin(),
      polyfillNode({
        polyfills: {
          fs: true,
        },
        // globals: {
        //   __filename: true,
        //   __dirname: true,
        // }
      }),
    ],
    define: {
      // Needed for the web environment
      // Inject these globals manually as esbuild-plugin-polyfill-node is not doing it so
      __filename: JSON.stringify("/index.js"),
      __dirname: JSON.stringify("/"),
    },
  });

  // Run both configurations at the same time

  if (process.argv.includes("--watch")) {
    await webviewCtx.watch();
    console.log("Watching files...");
  } else {
    Promise.all([webviewCtx.rebuild()]).then(() => {
      console.log("Builds completed successfully.");
      process.exit(0);
    });
  }
}

main();
