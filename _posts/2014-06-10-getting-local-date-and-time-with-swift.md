---
layout: post
title: "Getting Local Date and Time with Swift"
description: ""
category: Programming
tags: [XCode, Swift, Apple]
meta_description: 'Getting Local Date and Time with Swift'
browser_title: 'Getting Local Date and Time with Swift'
comments: true
---

The following will display the coordinated universal time and the local system date and time using Swift.

The code
{% highlight javascript %}
//
//  main.swift
//  ConsoleApp1


import Foundation

let date = NSDate();
let dateFormatter = NSDateFormatter()
//To prevent displaying either date or time, set the desired style to NoStyle.
dateFormatter.timeStyle = NSDateFormatterStyle.MediumStyle //Set time style
dateFormatter.dateStyle = NSDateFormatterStyle.MediumStyle //Set date style
dateFormatter.timeZone = NSTimeZone()
let localDate = dateFormatter.stringFromDate(date)

println("UTC Time")
println(date)
println("Local Time")
println(localDate)
{% endhighlight %}

The output:
{% highlight ruby %}
UTC Time
2014-06-10 19:55:26 +0000
Local Time
Jun 10, 2014, 3:55:26 PM
{% endhighlight %}

