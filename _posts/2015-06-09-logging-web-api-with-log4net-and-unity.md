---
layout: post
title: "Configuring Log4Net with Unity"
description: ""
category: Programming
tags: [Unity, C#, Dependency Injection, Log4Net]
meta_description: 'Configuring Log4Net with Unity in a C# Project'
browser_title: 'Configuring Log4Net with Unity'
comments: true
---

<br/><br/>
This is part one of a three part series on adding logging to a Web API project using AOP (Aspect Oriented Programming). The following code is a simple way to inject logging into your web api project using log4net and Microsoft Unity.

I used the following Nuget packages.

{% highlight bash %}
PM> Install-Package Unity
PM> Install-Package log4net
PM> Install-Package UnityLog4NetExtension
{% endhighlight %}

The first thing you need is to do is setup Log4net. Below you will find the code for a basic log4net setup method.

<script src="https://gist.github.com/davidbreyer/7cc138efbc7c7932a053.js"></script>

Add a log creation class that inherits UnityContainerExtension. This will allow Unity to create and config your log file, rather than calling the logger setup in the global.asax.

{% highlight java %}
public class LogCreation : UnityContainerExtension
{
     protected override void Initialize()
     {
         Logger.Setup();
     }
}
{% endhighlight %}

Register Log4Net with your Unity Container. Typically found in the UnityConfig.cs.


{% highlight java %}
var container =  new UnityContainer()
                .AddNewExtension<LogCreation>()
                .AddNewExtension<Log4NetExtension>(); //UnityLog4netExtension
{% endhighlight %}

Below is an example of my basic Microsoft Unity configuration file.

<script src="https://gist.github.com/davidbreyer/498cc8d427cdfb855f36.js"></script>

In the next post I will document on how to [add logging to your controllers with AOP]({% post_url 2015-06-10-add-logging-to-your-web-api-controllers-with-aop %}).