---
layout: post
title: "Basic Array Operations in Apple Swift"
description: ""
category: Programming
tags: [XCode, Swift, Apple]
meta_description: 'Basic Array Operations in Apple Swift'
browser_title: 'Basic Array Operations in Apple Swift'
comments: true
---

Create, Update, and Filter a Generic Array in Apple Swift.

The code
{% highlight javascript %}
//
//  main.swift
//  ConsoleApp1

import Foundation

var cityList = Array<String>()
cityList.append("Vienna")
cityList.append("Munich")
cityList.append("Berlin")
cityList.append("Prague")

println("Number of elements in city list:")
println(cityList.count)

//Create a filtered list of elements that match the specified criteria
let filtered = cityList.filter({$0 == "Prague"})
println("Number of elements in filtered list:")
println(filtered.count)

println("Enumerate city list:")
for item in cityList
{
    println(item)
}
{% endhighlight %}

The output:
{% highlight ruby %}
Number of elements in city list:
4
Number of elements in filtered list:
1
Enumerate city list:
Vienna
Munich
Berlin
Prague

{% endhighlight %}