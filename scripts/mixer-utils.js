import { DualMix } from "./dual-mix.js";

/**
 * Get the sound controls on each sound in the playlist directory and add the mixer button
 * @param {PlaylistDirectory} playlistDirectory SidebarDirectory object for the playlist directory
 * @param {jQuery} html jQuery object containing playlist directory html
 */
export function injectMixerToggleButtons(playlistDirectory, html) {
  html.find('.directory-list [data-sound-id]').each((index, element) => {
    const soundElement = $(element);

    const inMixer = Playlist
      .get(soundElement.data('playlist-id'))
      .getEmbeddedDocument('sounds', soundElement.data('sound-id'))
      .getFlag(DualMix.ID, DualMix.FLAGS.IN_MIXER);

    const soundControls = soundElement.find('.sound-controls');
    DualMix.log(false, soundControls)
    soundControls.addClass('mixer-enabled');
    soundControls.prepend(`
      <a 
        class="sound-control fa-regular fa-waveform-lines ${!inMixer && 'inactive'}"
        data-action="mixer-toggle"
        data-tooltip="DUAL-MIX.sound-controls.tooltips.${inMixer ? 'remove-track' : 'add-track'}"
      ></a>
    `);
  });

  html.on('click', '[data-action="mixer-toggle"]', async (event) => await handleMixerToggle(event, playlistDirectory));
}

/**
 * Injects the Mixer into the playlist sidebar tab if any tracks have been added to the mixer
 * @param {PlaylistDirectory} playlistDirectory SidebarDirectory object for the playlist directory
 * @param {jQuery} html jQuery object containing playlist directory html
 */
export async function injectMixer(playlistDirectory, html) {
  const soundsInMixer = playlistDirectory.documents
    .flatMap((playlist) => playlist.getEmbeddedCollection('sounds').contents)
    .filter((sound) => sound.getFlag(DualMix.ID, DualMix.FLAGS.IN_MIXER));

  if (soundsInMixer.length === 0) return;

  const mixerHtml = await renderTemplate(DualMix.TEMPLATES.MIXER, { soundsInMixer });
  html.append(mixerHtml);

  html.on('click', '#dual-mix-mixer [data-action="mixer-fade-in"]', async (event) => await _handleMixerFadeIn(event));
  html.on('click', '#dual-mix-mixer [data-action="mixer-remove"]', async (event) => await _handleMixerToggle(event, playlistDirectory));
}

/**
 * Disable audio controls for sounds that have been added to the Mixer, since the Mixer
 * takes control of sound playback
 * @param {jQuery} html jQuery object containing playlist directory html
 */
export function disableSoundControls(html) {

}

async function _handleMixerToggle(event, playlistDirectory) {
  const eventTarget = $(event.currentTarget);
  const { playlistId, soundId } = eventTarget.parents("[data-sound-id]").data();
  const sound = Playlist.get(playlistId).getEmbeddedDocument("sounds", soundId);
  
  const inMixer = sound.getFlag(DualMix.ID, DualMix.FLAGS.IN_MIXER);
  await sound.setFlag(DualMix.ID, DualMix.FLAGS.IN_MIXER, !inMixer);

  playlistDirectory.render();
}

async function _handleMixerFadeIn(event) {
  DualMix.log(false, "handleMixerFadeIn");
}