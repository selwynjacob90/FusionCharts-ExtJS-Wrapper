---
title: Getting started with FusionCharts Ext JS extension
---

# Getting Started Guide

This is a wrapper around FusionCharts which lets you use FusionCharts charts as native ExtJS components.
You can use FusionChats ExtJS component in either ExtJS MVC way or as a normal ExtJS application.

## Usage

- Download and extract the contents of the plugin. It contains the FusionCharts ExtJS plugin and a couple of examples. 
- Copy the FusionCharts directory to your ExtJS application root
- Require the plugin wherever you want to use FusionCharts ExtJS component

      Ext.define('FCDemo.view.FCView' ,{
         extend: 'Ext.tab.Panel',
         requires: ['FusionCharts.core.Chart'] ...
      })
  
  or

      Ext.require(['FusionCharts.core.Chart'])

- Use the FusionCharts component inside your application the way you would use any other ExtJS component.
- The xtype of the component is `fusioncharts`.
      
      Ext.create('Ext.container.Viewport', {
            layout: 'fit',
            items: [
                {
                   xtype: 'fusioncharts',
                   title: 'JSON URL',
                   chartType: 'Column3d',
                   chartID: 'firstChart',
                   chartWidth: '400',
                   chartHeight: '400',
                   debugMode: '0',
                   JSONUrl: 'data/chartData.json',
                }
            ]
      });

- Only one of `JSONUrl` or `JSONObject` are mandatory and defaults are set for the other options if not specified
- Only one of `JSONUrl` or `JSONObject` should be used but if both are used, `JSONObject` overrides the `JSONUrl` data
- The following options are consumed by the fusioncharts component

  - `chartType` - Type of Chart. Defaults to Column2D
  - `chartID` - If you want to reference you chart elsewhere, you need to mention this and it has to unqiue for each chart
  - `chartWidth` - Default is set to 100%
  - `chartHeight` - Default is set to 100%
  - `debugMode` - Default is set to 0 [debug mode off]
  - `JSONUrl` - Path to the JSON file from the webroot or a url to JSON source
  - `JSONData` - JSON Object

## Updating Charts

You can update your chart type, dimnesions, JSONUrl and JSONObject anytime using the following utility methods

- updateChartType(newType) -> Updates the chart type 

      //query for fusioncharts xtype [if you have more than one chart use array subscript]
      currentChart = Ext.ComponentQuery.query('fusioncharts'); 
      currentChart.updateChartType('Pie3D');

- updateChartDimensions(newWidth, newHeight) -> Updates the chart dimensions

      currentChart = Ext.ComponentQuery.query('fusioncharts');
      //if the dimensions are in pixels, just specify the number without px suffix 
      //but if they are in percentages, suffix the % character
      currentChart.updateChartDimensions('200', '200');

- updateChartJSONUrl(newUrl) -> Updates the path to the JSONUrl

      currentChart = Ext.ComponentQuery.query('fusioncharts');
      currentChart.updateChartJSONUrl('data/chartData.json');

- updateChartJSONObject(newObj) -> Updates the JSONObject from which the chart reads the data

      currentChart = Ext.ComponentQuery.query('fusioncharts');
      currentChart.updateChartJSONObject('someJSObj');