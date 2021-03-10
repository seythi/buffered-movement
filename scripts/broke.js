"use strict"
var movebuffer = [];
var moving = false;
Hooks.once("init", () => {
	libWrapper.register('buffered-movement', 'game.dnd5e.entities.KeyboardManager.prototype._onMovement', function ( ...args) { //overide _handleMovement
    	if ( !canvas.ready || up || modifiers.hasFocus ) return;
        event.preventDefault();
        // Handle CTRL+A
        if ( (modifiers.key === "a") && modifiers.isCtrl ) return this._onKeyA(event, up, modifiers);
        // Reset move keys after a delay of 50ms or greater
        const now = Date.now();
        const delta = now - this._moveTime;
        if ( delta > 10 ) this._moveKeys.clear();
        // Track the movement set
        const directions = this.moveKeys[modifiers.key];
        for ( let d of directions ) {
          this._moveKeys.add(d);
        }
        // Handle canvas pan using CTRL
        if ( modifiers.isCtrl ) {
          if ( ["w", "a", "s", "d"].includes(modifiers.key) ) return;
          return this._handleCanvasPan();
        }
        movebuffer.push([event])
        setTimeout(10)
        this._moveTime = now;
        if(!moving)
        {
            moving = true;
            moveloop();
        }
    	return ; 
	});

    () => {
        
    }
});
Hooks.once('ready', () => {
    if(!game.modules.get('lib-wrapper')?.active && game.user.isGM)
        ui.notifications.error("Module XYZ requires the 'libWrapper' module. Please install and activate it.");
});
async function moveloop() {
    while (movebuffer.length != 0)
    {
        const layer = canvas.activeLayer;
        if ( layer instanceof TokenLayer || layer instanceof TilesLayer ) {
            setTimeout(() => this._handleMovement(movebuffer.shift(), layer), 50);
        }
    }
    
}