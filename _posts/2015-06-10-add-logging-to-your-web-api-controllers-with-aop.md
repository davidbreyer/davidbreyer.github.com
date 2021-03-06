---
layout: post
title: "Add Logging to your Web API Controllers with AOP"
description: ""
category: Programming
tags: [Web API, Unity, C#, Dependency Injection, Log4Net]
meta_description: 'Add Logging to your Web API Controllers with AOP'
browser_title: 'Add Logging to your Web API Controllers with AOP'
comments: true
banner_image: programming-banner-2.jpg
banner_image_alt: Banner Image
---

<br/><br/>
In part one we [added a log4net log to our Web API project using Unity]({% post_url 2015-06-09-logging-web-api-with-log4net-and-unity %}).

In this part I will show how to create a filter that runs a function before and after a your controller method, how to inject log4net into the filter, and how to add the filter to your controllers. This part uses the same nuget packages as part one.

Step one is to create a web filter. In the example below there are three main parts.

1. ILog property that is marked with a dependency attribute.
2. OnActionExecuting will run before the requested controller method.
3. OnActionExected will run after the requested controller method.  
<br>

<script src="https://gist.github.com/davidbreyer/ff2bc4bfd0d8fd4131fc.js"></script>

If this filter executed now, the Log would be NULL. So in step two let’s use Unity to build up the filter. 

There are two components to using Unity to buildup the filter.

1. Add a class, UnityActionFilterProvider, to your project. This will buildup the filter when called from the FilterConfig.
2. Add the RegisterFilterProviders method to the FilterConfig.cs file in the Web API project.
<br>
<script src="https://gist.github.com/davidbreyer/973a5377debc079a6f15.js"></script>        

Then you call this from RegisterGlobalFilters in the FilterConfig.cs:
{% highlight java %}
public static void RegisterGlobalFilters(GlobalFilterCollection filters)
{
    filters.Add(new HandleErrorAttribute());
    RegisterFilterProviders(); //<-- register your logging filter.
}
{% endhighlight %}

At this point nothing will log until you add an attribute to any controllers you want to log. In the example below, notice the [LogActionWebApiFilter] attribute that is added to the ValuesController.
{% highlight java %}
[LogActionWebApiFilter]
public class ValuesController : ApiController
{
        
	// GET api/values
    public IEnumerable<string> Get()
    {
    	return new string[] { "value1", "value2" };
    }
}
{% endhighlight %}

Now calling the GET method of the values controller, will cause Log4Net to write to any logs you have configured.

In part three I will show how to use Unity and AOP to log other components of your web api project.