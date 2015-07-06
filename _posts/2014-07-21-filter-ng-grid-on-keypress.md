---
layout: post
title: "Filter ng-Grid on keypress"
description: "Instructions on how to setup filtering on ng-Grid with AngularJS."
category: Programming 
tags: [angularjs, ng-grid, javascript]
meta_description: 'Instructions on how to setup filtering on ng-Grid with AngularJS.'
browser_title: 'Filter ng-Grid on keypress'
comments: true
---

Ng-Grid is the easiest way to add a sortable and filterable grid to your web application. 
I have used jqGrid in the past and this is by far easier to work with. Today I am going to demonstrate
how to add filtering to your ng-Grid, and as a bonus I am going to do it on keypress. So the grid
will filter as you type in the search box without the need for a pesky button.

View the [Plunker here](http://plnkr.co/edit/EiprrH3M76KNw6y8jBCv?p=preview).

Let's start with a basic ng-Grid setup. Our controller will populate a list of people's names that will be displayed in a grid.

{% highlight javascript %}
var app = angular.module('myApp', ['ngGrid']);

app.controller('GridController', function($scope) {
  $scope.people = [{
    "name": "Albert Barron",
    "age": 24,
    "eyeColor": "blue",
    "gender": "male",
    "company": "VETRON"
  }, [ List truncated for readability ]
  }];

  $scope.gridOptions = {
    data: 'people'
  };
});
{% endhighlight %}

{% highlight html %}
<div ng-controller="GridController">
	<div class="gridStyle" ng-grid="gridOptions"></div>
</div>
{% endhighlight %}

{% highlight css %}
.gridStyle {
    border: 1px solid rgb(212,212,212);
    width: 800px; 
    height: 400px
}
{% endhighlight %}

Which should look like the following image on your page.

<img src = "{{ site.url }}/assets/nggridfilter/basicgrid.jpg" style="max-width: 625px" />

We will now add a field that will filter on the name field. The ng-change property will
designate what function to call on each keypress.

{% highlight html %}
<input class="peopleNameFilter" id="personNameFilter" type="text" ng-model="nameFilter" 
placeholder="Filter by Name" ng-change="filterName()">
{% endhighlight %}

{% highlight javascript %}
var app = angular.module('myApp', ['ngGrid']);

app.controller('GridController', function($scope) {
  $scope.people = [{
    "name": "Albert Barron",
    "age": 24,
    "eyeColor": "blue",
    "gender": "male",
    "company": "VETRON"
  }, [ List truncated for readability ]
  }];

  //Add the filter options to the scope.	
  $scope.filterOptions = {
    filterText: ''
  };

  //Set the filter options property of the grid to the filter options in the scope.
  $scope.gridOptions = {
    data: 'people',
    filterOptions: $scope.filterOptions
  };
  
  //This event will update the filter text.
  $scope.filterName = function() {
    var filterText = 'name:' + $scope.nameFilter;
    if (filterText !== 'name:') {
      $scope.filterOptions.filterText = filterText;
    } else {
      $scope.filterOptions.filterText = '';
    }
  };
});
{% endhighlight %}

As the user types the grid will show only the records that contain the field text. Clearing
the text box will once again show all the records.

<img src = "{{ site.url }}/assets/nggridfilter/gridfiltered.jpg" style="max-width: 625px" />

View the [Plunker here](http://plnkr.co/edit/EiprrH3M76KNw6y8jBCv?p=preview).
