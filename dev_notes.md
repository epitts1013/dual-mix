# Potentially Useful Hooks:
- changeSidebarTab (https://foundryvtt.com/api/functions/hookEvents.changeSidebarTab.html)
- updateDocument (https://foundryvtt.com/api/functions/hookEvents.updateDocument.html)
    - updatePlaylistSound - Playlist specific implementation of updateDocument
    - updatePlaylist - fires when a sound starts playing

# Potentially Useful Classes:
- Playlist (https://foundryvtt.com/api/classes/client.Playlist.html)
    - Playlist.playSound (https://foundryvtt.com/api/classes/client.Playlist.html#playSound)
- PlaylistSound (https://foundryvtt.com/api/classes/client.PlaylistSound.html)
    - Used as argument to Playlist.playSound
- PlaylistDirectory (https://foundryvtt.com/api/classes/client.PlaylistDirectory.html)
- Sound (https://foundryvtt.com/api/classes/foundry.audio.Sound.html)
    - Sound.fade (https://foundryvtt.com/api/classes/foundry.audio.Sound.html#fade)
- AudioHelper (https://foundryvtt.com/api/classes/foundry.audio.AudioHelper.html)
    - Singleton instance on game.audio
    - AudioHelper.playing (https://foundryvtt.com/api/classes/foundry.audio.AudioHelper.html#playing)
    - AudioHelper.preload (https://foundryvtt.com/api/classes/foundry.audio.AudioHelper.html#preload)

# Potentially Useful JS Methods:
- Promise.all (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)

# Potentially Useful Icons
- music (https://fontawesome.com/icons/music?f=classic&s=solid)
- music-slash (https://fontawesome.com/icons/music-slash?f=classic&s=solid)
- waveform-lines (https://fontawesome.com/icons/waveform-lines?f=classic&s=regular)
- sliders-up (https://fontawesome.com/icons/sliders-up?f=classic&s=regular)