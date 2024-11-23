export class DualMix {
  static ID = "dual-mix"

  static log(force, ...args) {
    console.log(this.ID, "|", ...args);
  }
}

/**
 * Notes:
 * - Potentially Useful Hooks:
 *   - changeSidebarTab (https://foundryvtt.com/api/functions/hookEvents.changeSidebarTab.html)
 *   - updatePlaylistSound <- updateDocument (https://foundryvtt.com/api/functions/hookEvents.updateDocument.html)
 * 
 * - Potentially Useful Classes:
 *   - PlaylistDirectory (https://foundryvtt.com/api/classes/client.PlaylistDirectory.html)
 */