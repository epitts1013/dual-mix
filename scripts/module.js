import { DualMix } from "./dual-mix.js";
import { disableSoundControls, injectMixer, injectMixerToggleButtons } from "./mixer-utils.js";

Hooks.once('init', () => {
  DualMix.initialize();
  DualMix.log(false, 'Initialized!')
});

Hooks.on('renderPlaylistDirectory', async (playlistDirectory, html) => {
  if (game.user.hasRole(CONST.USER_ROLES.ASSISTANT)) {
    injectMixerToggleButtons(playlistDirectory, html);
    disableSoundControls(html);
    await injectMixer(playlistDirectory, html);  
  }
});

Hooks.on('userConnected', async (user, connected) => {
  ui.notifications.info("DUAL-MIX.notifications.info.resyncing-audio", {
    localize: true,
    console: false,
  });

  DualMix.log(false, "Re-synchronizing audio");
  if (game.user.hasRole(CONST.USER_ROLES.GAMEMASTER) && connected) {
    DualMix.log("User is delegate for audio re-synchronization");
  }
});