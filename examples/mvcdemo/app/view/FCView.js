Ext.define('FCDemo.view.FCView' ,{
    extend: 'Ext.tab.Panel',
    alias: 'widget.charttabs',
    requires: ['FusionCharts.ui.Chart'],

    initComponent: function() {
        var chartData = {
            "chart": {
                  "caption" : "Weekly Sales Summary" ,
                  "xAxisName" : "Week",
                  "yAxisName" : "Sales",
                  "numberPrefix" : "$"
            },

            "data" :
             [
                  { "label" : "Week 1", "value" : "54400" },
                  { "label" : "Week 2", "value" : "59600" },
                  { "label" : "Week 3", "value" : "4000" },
                  { "label" : "Week 4", "value" : "35700" }
             ]
        };

        this.items = [
            {
                xtype: 'fusioncharts',
                title: 'JSON URL',
                chartType: 'Column3d',
                chartID: 'firstChart',
                chartWidth: '400',
                chartHeight: '400',
                debugMode: '0',
                JSONUrl: 'data/chartData.json',
            },
            {
                xtype: 'fusioncharts',
                title: 'JSON Object',
                height: 800, //Dimensions of the panel but not chart
                width: 800,
                JSONObject: chartData, //path to the json file from the webroot 
            }
        ];
        this.buttons = [
            {
                text: 'Update Type',
                action: 'updateType'
            },
            {
                text: 'Update Dimensions',
                action: 'updateDim'
            },
            {
                text: 'Update JSONUrl',
                action: 'updateJSON'
            }
        ];

        this.callParent(arguments);
    }
});
