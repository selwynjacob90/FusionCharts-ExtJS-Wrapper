Ext.define('FCDemo.controller.FCController', {
    extend: 'Ext.app.Controller',

    views: ['FCView'],

    init: function() {
    	this.control({
           'charttabs button[action=updateType]': {
                click: this.updateChartType
            },

           'charttabs button[action=updateDim]': {
                click: this.updateChartDimensions
            },

           'charttabs button[action=updateJSON]': {
                click: this.updateChartJSONUrl
            },
    	});
    },

    updateChartType: function(btnEvent) {
        currentChart = Ext.ComponentQuery.query('fusioncharts')[0];
        currentChart.updateChartType('Pie3D');
    },

    updateChartDimensions: function(btnEvent) {
        currentChart = Ext.ComponentQuery.query('fusioncharts')[0];
        currentChart.updateChartDimensions('200', '200');
    },

    updateChartJSONUrl: function(btnEvent) {
        currentChart = Ext.ComponentQuery.query('fusioncharts')[0];
        currentChart.updateChartJSONUrl('data/chartData1.json');
    }
});