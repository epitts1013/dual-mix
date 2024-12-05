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