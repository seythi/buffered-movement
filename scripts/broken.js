"use strict"
var movebuffer = [];

Hooks.once("init", () => {
	libWrapper.register('buffered-movement', 'game.dnd5e.entities.KeyboardManager.prototype._handleMovement', function ( ...args) { //overide _handleMovement
    	if ( !this._moveKeys.size ) return;
        // Get controlled objects
        let objects = layer.placeables.filter(o => o._controlled);
        if ( objects.length === 0 ) return;
        // Define movement offsets and get moved directions
        const directions = this._moveKeys;
        let dx = 0;
        let dy = 0;
        // Assign movement offsets
        if ( directions.has("left") ) dx -= 1;
        if ( directions.has("up") ) dy -= 1;
        if ( directions.has("right") ) dx += 1;
        if ( directions.has("down") ) dy += 1;
        this._moveKeys.clear();
        //^ this is all the same as usual
        movebuffer.push({dx, dy}); //push the movement direction to the queue
    	return ; 
	});

    setInterval
});
Hooks.once('ready', () => {
    if(!game.modules.get('lib-wrapper')?.active && game.user.isGM)
        ui.notifications.error("Module XYZ requires the 'libWrapper' module. Please install and activate it.");
});