Ext.require([
    'FusionCharts.ui.Chart'
]);

Ext.onReady(function(){
    Ext.create('Ext.Window', {
	title: 'Demo 2',
	layout: 'fit',
	headerPosition: 'bottom',
        items: [
            {
		xtype: 'fusioncharts',
                chartType: 'Column3d',
                chartID: 'TestID',
                chartWidth: '400',
                chartHeight: '400',
                debugMode: '0',
                JSONUrl: 'data.json' //path to the json file from the webroot            
            }
        ]
    }).show();
});
