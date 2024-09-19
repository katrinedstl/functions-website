import { build, context } from "esbuild";
import { glob } from "glob";
import { sassPlugin } from "esbuild-sass-plugin";
import manifestPlugin from "esbuild-plugin-manifest";
import path from "path";
import { copy } from "esbuild-plugin-copy";
import globImport from "esbuild-plugin-glob-import";

const isDev = process.env.NODE_ENV === "development";

// NOTE: Custom logger to surpress warnings, this is to avoid bloated build logs caused by third party code
const silentLogger = {
  warn: () => {},
  info: () => {},
  error: console.error,
};

const buildClient = async () => {
  const entryPoints = await Promise.all([
    glob("./shared-ui/style.ts"),
    glob("./functions/**/*.scss"),
    glob("./functions/*/*.client.ts"),
  ]).then((paths) => paths.flat());

  const buildOptions = {
    entryPoints,
    bundle: true,
    outdir: "dist/public",
    plugins: [
      globImport(),
      sassPlugin({
        logger: silentLogger,
      }),
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
    entryNames: isDev ? "[name]" : "[name].[hash]",
    minify: !isDev,
    sourcemap: true,
    platform: "browser",
    format: "esm",
    splitting: true,
    loader: {
      ".woff": "file",
      ".woff2": "file",
    },
  };

  if (isDev) {
    const ctx = await context(buildOptions);
    await ctx.watch();
    console.log("Watching client files for changes...");
  } else {
    return build(buildOptions);
  }
};

const buildServer = async () => {
  const entryPoints = glob.sync("./functions/*/*.server.ts");

  const buildOptions = {
    entryPoints,
    bundle: true,
    platform: "node",
    target: "node20",
    outdir: "dist/functions",
    external: ["@azure/functions-core"],
    minify: !isDev,
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
  };

  if (isDev) {
    const ctx = await context(buildOptions);
    await ctx.watch();
    console.log("Watching server files for changes...");
  } else {
    return build(buildOptions);
  }
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
