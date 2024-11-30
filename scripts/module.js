export class DualMix {
  static ID = 'dual-mix'

  static FLAGS = {
    IN_MIXER: 'in-mixer',
    ACTIVE_SOUND: 'active-sound'
  }

  static ICONS = {
    SLIDERS: 'fa-regular fa-sliders-up',
    XMARK: 'fa-solid fa-circle-xmark',
    LOADING: 'fa-duotone fa-solid fa-loader fa-spin-pulse'
  }

  static TEMPLATES = {
    MIXER: `modules/${this.ID}/templates/mixer.hbs`
  }

  static SETTINGS = {
    DEV_LOGGING: 'developer-logging'
  }

  static log(force, ...args) {
    const devLoggingEnabled = game.settings.get(this.ID, this.SETTINGS.DEV_LOGGING);

    if (devLoggingEnabled || force) {
      console.log(this.ID, "|", ...args);
    }
  }

  static initialize() {
    game.settings.register(this.ID, this.SETTINGS.DEV_LOGGING, {
      name: `DUAL-MIX.settings.${this.SETTINGS.DEV_LOGGING}.name`,
      hint: `DUAL-MIX.settings.${this.SETTINGS.DEV_LOGGING}.hint`,
      type: Boolean,
      default: false,
      scope: 'client',
      config: true
    })
  }
}

Hooks.once('init', () => {
  DualMix.initialize();
  DualMix.log(false, 'Initialized!')
})

Hooks.on('renderPlaylistDirectory', async (playlistDirectory, html) => {
  if (game.user.hasRole(CONST.USER_ROLES.ASSISTANT)) {
    injectMixerToggleButtons(playlistDirectory, html);
    await injectMixer(playlistDirectory, html);  
  }
});

Hooks.on('userConnected', async (user, connected) => {
  if (game.user.hasRole(CONST.USER_ROLES.GAMEMASTER) && connected) {

  }
});

/**
 * Get the sound controls on each sound in the playlist directory and add the mixer button
 * @param {PlaylistDirectory} playlistDirectory
 * @param {jQuery} html
 */
function injectMixerToggleButtons(playlistDirectory, html) {
  html.find('.directory-list [data-sound-id]').each((index, element) => {
    const soundElement = $(element);

    const inMixer = Playlist
      .get(soundElement.data('playlist-id'))
      .getEmbeddedDocument('sounds', soundElement.data('sound-id'))
      .getFlag(DualMix.ID, DualMix.FLAGS.IN_MIXER);

    const soundControls = soundElement.find('.sound-controls');
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
 * @param {PlaylistDirectory} playlistDirectory
 * @param {jQuery} html
 */
async function injectMixer(playlistDirectory, html) {
  const soundsInMixer = playlistDirectory.documents
    .flatMap((playlist) => playlist.getEmbeddedCollection('sounds').contents)
    .filter((sound) => sound.getFlag(DualMix.ID, DualMix.FLAGS.IN_MIXER));

  if (soundsInMixer.length === 0) return;

  const mixerHtml = await renderTemplate(DualMix.TEMPLATES.MIXER, { soundsInMixer });
  html.append(mixerHtml);

  html.on('click', '#dual-mix-mixer [data-action="mixer-fade-in"]', async (event) => await handleMixerFadeIn(event));
  html.on('click', '#dual-mix-mixer [data-action="mixer-remove"]', async (event) => await handleMixerToggle(event, playlistDirectory));
}

async function handleMixerToggle(event, playlistDirectory) {
  // TODO: Get mixer status
  const mixerPlaying = false;
  
  const eventTarget = $(event.currentTarget);
  const { playlistId, soundId } = eventTarget.parents("[data-sound-id]").data();
  const sound = Playlist.get(playlistId).getEmbeddedDocument("sounds", soundId);
  
  const inMixer = sound.getFlag(DualMix.ID, DualMix.FLAGS.IN_MIXER);
  if (mixerPlaying && !inMixer) {
      ui.notifications.warn("DUAL-MIX.warnings.mixer-playing", {
          localize: true,
          console: false,
      });
      return;
  }
  await sound.setFlag(DualMix.ID, DualMix.FLAGS.IN_MIXER, !inMixer);

  playlistDirectory.render();
}

async function handleMixerFadeIn(event) {
  DualMix.log(false, "handleMixerFadeIn");
}