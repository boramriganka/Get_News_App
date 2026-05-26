const { spawnSync } = require("child_process");
const path = require("path");

const major = Number(process.versions.node.split(".")[0]);
const existingOptions = process.env.NODE_OPTIONS || "";
const legacyProvider = "--openssl-legacy-provider";

if (major >= 17 && !existingOptions.split(/\s+/).includes(legacyProvider)) {
  const result = spawnSync(
    process.execPath,
    [path.join(__dirname, "../node_modules/react-scripts/scripts/build.js")],
    {
      env: {
        ...process.env,
        NODE_OPTIONS: [existingOptions, legacyProvider].filter(Boolean).join(" "),
      },
      stdio: "inherit",
    }
  );

  if (result.error) {
    throw result.error;
  }

  process.exit(result.status || 0);
}

require("react-scripts/scripts/build");
