import { build } from "esbuild";
import { glob } from "glob";
import { sassPlugin } from "esbuild-sass-plugin";
import manifestPlugin from "esbuild-plugin-manifest";
import path from "path";
import { copy } from "esbuild-plugin-copy";

const buildClient = async () => {
  const entryPoints = await Promise.all([
    glob("./functions/**/*.scss"),
    glob("./functions/*/*.client.ts"),
  ]).then((paths) => paths.flat());

  return build({
    entryPoints,
    bundle: true,
    outdir: "dist/public",
    plugins: [
      sassPlugin(),
      manifestPlugin({
        // NOTE: This is always relative to `outdir`
        filename: "../../server/client-manifest.json",
        useEntrypointKeys: true,
        generate: (entries) =>
          Object.fromEntries(
            Object.entries(entries).map(([from, to]) => [
              from,
              `public/${path.basename(to)}`,
            ])
          ),
      }),
    ],
    loader: {
      ".ts": "tsx",
      ".scss": "css",
    },
    entryNames: "[name].[hash]",
    minify: true,
    sourcemap: "linked",
    platform: "browser",
    format: "esm",
    splitting: true,
    minify: true,
    sourcemap: true,
  });
};

const buildServer = () => {
  const entryPoints = glob.sync("./functions/*/*.server.ts");

  build({
    entryPoints,
    bundle: true,
    platform: "node",
    target: "node20",
    outdir: "dist/functions",
    external: ["@azure/functions-core"],
    minify: true,
    sourcemap: true,
    entryNames: "[dir]/index",
    plugins: [
      copy({
        assets: [
          { from: "./server/package.json", to: "../package.json" },
          {
            from: "./server/local.settings.json",
            to: "../local.settings.json",
          },
          { from: "./server/host.json", to: "../host.json" },
        ],
      }),
    ],
  });
};

buildClient()
  .then(() => {
    console.log("Client build completed. Building server... 🏗️");
    return buildServer();
  })
  .then(() => {
    console.log("Server build completed. 👷‍♂️");
  })
  .catch((error) => {
    console.error("Build failed:", error);
    process.exit(1);
  });
