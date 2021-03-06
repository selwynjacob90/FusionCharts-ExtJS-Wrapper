/**
* This is a wrapper around FusionCharts which lets you use FusionCharts charts as native ExtJS components.
* You can use FusionChats ExtJS component in either ExtJS MVC way or as a normal ExtJS application.
*
* ## Usage
* 1. Download and extract the contents of the plugin. It contains the FusionCharts ExtJS plugin and a couple of examples. 
* 2. Copy the FusionCharts directory to your ExtJS application root
* 3. Require the plugin wherever you want to use FusionCharts ExtJS component
*    example: 
*     Ext.define('FCDemo.view.FCView' ,{
*       extend: 'Ext.tab.Panel',
*       requires: ['FusionCharts.ui.Chart'] ...
*   or
*     Ext.require(['FusionCharts.ui.Chart'])
* 3. Use the FusionCharts component inside your application just like any other ExtJS component where the xtype of the component is fusioncharts.
*         Ext.create('Ext.container.Viewport', {
*            layout: 'fit',
*            items: [
*                {
*                   xtype: 'fusioncharts',
*                   title: 'JSON URL',
*                   chartType: 'Column3d',
*                   chartID: 'firstChart',
*                   chartWidth: '400',
*                   chartHeight: '400',
*                   debugMode: '0',
*                   JSONUrl: 'data/chartData.json',
*                }
*            ]
*         });
* 4. Only JSONUrl or JSONObject are mandatory and defaults are set for the other options if not specified
* 5. Only one of JSONUrl or JSONObject should be used but if both are used, JSONObject overrides the JSONUrl data
* 6. The following options are consumed by the fusioncharts component
*    a) chartType - Type of Chart. Defaults to Column2D
*    b) chartID - If you want to reference you chart elsewhere, you need to mention this and it has to unqiue for each chart
*    c) chartWidth - Default is set to 100%
*    d) chartHeigh - Default is set to 100%
*    e) debugMode - Default is set to 0 [debug mode off]
*    f) JSONUrl - Path to the JSON file from the webroot or a url to JSON source
*    g) JSONData - JSON Object
*
* ## Updating Charts
*  You can update your chart type, dimnesions, JSONUrl and JSONObject anytime using the following utility methods
*  1. updateChartType(newType) -> Updates the chart type 
*  2. updateChartDimensions(newWidth, newHeight) -> Updates the chart dimensions
*  3. updateChartJSONUrl(newUrl) -> Updates the path to the JSONUrl
*  4. updateChartJSONObject(newObj) -> Updates the JSONObject from which the chart reads the data
*/
Ext.define('FusionCharts.ui.Chart', {
    
    extend: 'Ext.Component', // subclass Ext.Component
    alias: 'widget.fusioncharts', // this component will have an xtype of 'widget.fc'
    autoEl: {
        tag: 'div',
        cls: 'fusioncharts-ext-wrapper'
    },
    requires: [
     'FusionCharts.ui.FusionCharts',
    ],


    /**
    * @cfg {String[]} chartType
    * Set the default chart type to Column 2D, if chartType is not set
    */
    chartType: 'Column2D',

    /**
    * @cfg {String[]} chartWidth
    * Set the default chart width to 100% of the container, if chartWidth is not set
    */
    chartWidth: '100%',

    /**
    * @cfg {String[]} chartHeight
    * Set the default chart height to 100% of the container, if chartHeight is not set
    */
    chartHeight: '100%',

    /**
    * @cfg {String[]} debugMode
    * Set the default debug mode to o (off), if debugMode is not set
    */
    debugMode: '0',

    /**
    * Is fired when the fusioncharts component is fired.
    * sets up error handlers, default values and calls the method 
    * to draw the chart.
    * @private 
    */ 
    onRender: function(data) {
      this.callParent(arguments);
      Ext.Error.handle = this._errorHandler;
      chartData = this._populateDefaults()
      this._drawChart(chartData);
    },
    
    /** 
    *Logs the error to the browser console
    * @param {String} the error message to display
    * @private
    */  
    _errorHandler: function(msg){
      console.error(msg);
      return true;
    }, 

    /**
    * This method populates unset values with the defaults
    * @private
    */
    _populateDefaults: function(){
      me = this;
      me = Ext.override({
        chartType: this.chartType,
        chartWidth: this.chartWidth,
        chartHeight: this.chartHeight,
        chartID: Math.floor(Math.random()*100000),
        debugMode: this.debugMode
      }, me)
      
      return me;
    },

    /**
    * Uses the FusionCharts constructor and methods to draw the chart based on the provided 
    * chart data.
    * @param {Object} the chart data
    * @private
    */
    _drawChart: function(chartData) {
      fcWrapper = chartData.getEl();
      //create a div under fusioncharts-ext-wrapper where the chart will be drawn
      fcContainer = new Ext.Element(document.createElement('div'));
      fcContainer.addCls('fusioncharts-container');
      fcWrapper.appendChild(fcContainer);
      this.chartContainer = fcContainer.dom.id;

      if(typeof(chartData.JSONUrl) === 'undefined' && typeof(chartData.JSONObject) === 'undefined'){
        Ext.Error.raise("Please specify a valid JSON URL or Object");
      }
      //create and render the chart
      //chartid is a unique random number 
      var Chart = new FusionCharts(chartData.chartType, chartData.chartID, chartData.chartWidth, chartData.chartHeight, chartData.debugMode);
      
      if(chartData.JSONUrl){
        Chart.setJSONUrl(chartData.JSONUrl);
      }
      
      //if both JSONURL and JSONObject are specified, then JSONObject takes precedence
      if(chartData.JSONObject){
        Chart.setJSONData(chartData.JSONObject);
      }
      
      Chart.render(this.chartContainer);
    },

    /**
    * This method updates the chart type by disposing the current chart
    * and creating a new one with the new chart type while preserving all the old chart
    * properties
    * @param {String} chartType 
    */
    updateChartType: function(newType){
      currentChart = FusionCharts(this.chartID);
      currentChart.dispose()
      newChart = new FusionCharts(newType, this.chartID, this.chartWidth, this.chartHeight, this.debugMode);
      
      if(this.JSONUrl){
        newChart.setJSONUrl(this.JSONUrl);
      }
      
      //if both JSONURL and JSONObject are specified, then JSONObject takes precedence
      if(this.JSONObject){
        newChart.setJSONData(this.JSONObject);
      }
      newChart.render(this.chartContainer);
    },

    /**
    * This method updates the chart dimensions
    * @param {String} newWidth, 
    * @param {String} newHeight
    */
    updateChartDimensions: function(newWidth, newHeight){
      currentChart = FusionCharts(this.chartID);
      this.chartWidth = newWidth;
      this.chartHeight = newHeight;
      currentChart.resizeTo(newWidth, newHeight);
    },

    /**
    * This methods updates the chart JSONUrl
    * @param {String} newJSONUrl
    */
    updateChartJSONUrl: function(newJSONUrl){
      currentChart = FusionCharts(this.chartID);
      this.JSONUrl = newJSONUrl;
      currentChart.setJSONUrl(newJSONUrl);
    },

    /**
    * This method updates the JSONObject from which the chart data is read
    * @param {String} newJSONObj
    */
    updateChartJSONObject: function(newJSONObj){
      currentChart = FusionCharts(this.chartID);
      this.JSONObject = newJSONObj;
      currentChart.setJSONData(newJSONObj);
    }

});
