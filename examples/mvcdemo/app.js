Ext.application({
    name: 'FCDemo',
    requires: ['FusionCharts.ui.Chart'],
    appFolder: 'app',
    controllers: ['FCController'],

    launch: function() {

        //create main view port
        Ext.create('Ext.panel.Panel', {
        renderTo: Ext.getBody(),
        height: 800,
        width: 800,
            items: [
              {
                xtype: 'charttabs',
              }
            ]
        });

    }
});

