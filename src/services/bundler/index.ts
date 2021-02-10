import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";

const wasmURL = "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm";
let service: esbuild.Service;

const initialize = async () => {
  if (!service) {
    service = await esbuild.startService({
      worker: true,
      wasmURL,
    });
  }
};

export const bundle = async (rawCode: string) => {
  await initialize();

  const result = await service.build({
    entryPoints: ["index.js"],
    bundle: true,
    write: false,
    plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
    define: {
      "process.env.NODE_ENV": '"production"',
      global: "window",
    },
  });

  return result.outputFiles[0].text;
};
