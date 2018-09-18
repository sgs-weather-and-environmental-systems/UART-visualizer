/*
*  Boilerplate code for creating custom actions
*/
document.addEventListener('gc-nav-ready', function() {
	/* 
	*   Add custom actions for menu items using the following API:
	*
	*   function gc.nav.registryAction(id, runable, [isAvailable], [isVisible]);
	*
	*   param id - uniquely identifies the action, and should correspond to the action property of the menuaction widget.
	*   param runable - function that performs the custom action.
	*   param isAvailable - (optional) - function called when the menu action is about to appear.  Return false to disable the action, or true to enable it.
	*   param isVisible - (optional) - function called when the menu action is about to appear.  Return false to hide the action, or true to make it visible.
	*/
	// For example,
	// gc.nav.registerAction('myCustomCloseAction', function() { window.close(); }, function() { return true; }, function() { return true; });
	// Alternatively, to programmatically disable a menu action at any time use:
	// gc.nav.disableAction('myCustomCloseAction);	then enable it again using:  gc.nav.enableAction('myCustomCloseAction'); 
	gc.nav.registerAction('ti_widget_menuaction_download', {
		run: function() {
			window.open('https://dev.ti.com/gallery/info/mmwave/mmWave_Demo_Visualizer/', '_blank');
		},
		isAvailable: function() {
			return true;
		},
		isVisible: function() {
			return true;
		}
	});
	gc.nav.registerAction('ti_widget_menuaction_userguide', {
		run: function() {
			window.open('http://www.ti.com/lit/pdf/swru529', '_blank');
		},
		isAvailable: function() {
			return true;
		},
		isVisible: function() {
			return true;
		}
	});
});