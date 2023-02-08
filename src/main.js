const { invoke } = window.__TAURI__.tauri;

let greetInputEl;
let greetMsgEl;

async function greet() {
  // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
  greetMsgEl.textContent = await invoke("greet", { name: greetInputEl.value });
}

window.addEventListener("DOMContentLoaded", () => {
  greetInputEl = document.querySelector("#greet-input");
  greetMsgEl = document.querySelector("#greet-msg");
  document
    .querySelector("#greet-button")
    .addEventListener("click", () => greet());
});

/**
 * @type {import('@tauri-apps/api/updater').UpdaterConfig}
 * @see https://tauri.studio/en/docs/api/js/updater#updaterconfig
 * @see https://tauri.app/v1/api/config/#updaterconfig
 * @see https://tauri.app/fr/v1/guides/distribution/updater
*/

import { checkUpdate, installUpdate } from '@tauri-apps/api/updater'
import { relaunch } from '@tauri-apps/api/process'

try {
  const { shouldUpdate, manifest } = await checkUpdate()
  if (shouldUpdate) {
    // display dialog
    await installUpdate()
    // install complete, restart the app
    await relaunch()
  }
} catch (error) {
  console.log(error)
}