---
layout: post
title: "AOP using Unity Interceptors in a Web API Project"
description: ""
category: Programming
tags: [Web API, Unity, C#, Dependency Injection, Log4Net]
meta_description: 'AOP using Unity Interceptors in a C# Web API Project'
browser_title: 'AOP using Unity Interceptors in a Web API Project'
comments: true
banner_image: programming-banner-1.jpg
banner_image_alt: Banner Image
---
In part one we [configured Log4net logging with Unity]({% post_url 2015-06-09-logging-web-api-with-log4net-and-unity %}). In part two we used [AOP to add actions to Web API controllers]({% post_url 2015-06-10-add-logging-to-your-web-api-controllers-with-aop %}) without modifying the controllers code.

In part three we will do something similar to the components of our web API project. Using Unity we will inject behaviors into specific classes, that can execute before and after the method. In this particular example we will use it to log each method of a designated class using our ProfilingInterceptionBehavior.

## Step 1: Create a New Behavior

In the first step you will create a class that extends the IInterceptionBehavior interface. This will contain any code you want to execute before and after an intercepted method.

Remember you need a public property, to expose ILog, and a dependency attribute. This will allow Unity to inject our Log4Net logger into the behavior.

{% highlight java %}
[Dependency]
public ILog Log { get; set; }
{% endhighlight %}

In this example our behavior will log any exceptions thrown by the intercepted method.
<script src="https://gist.github.com/davidbreyer/f342d769264fdca81696.js"></script> 

## Step 2: Add Interception Extension to Unity Container

Now this won’t do anything until we give it a class to intercept. Which we will do in a Unity configuration. I use a class called UnityConfig to configure dependency injection for my web api projects.

In part one, Configuring Log4Net with Unity, we added several extensions to the Unity Container. It looked like this:

{% highlight java %}
var newContainer = new UnityContainer()
    .AddNewExtension<LogCreation>() //Custom extension that executes logger setup
    .AddNewExtension<Log4NetExtension>();
{% endhighlight %}

We will add a new extension, which requires the Unity Interception Extension nuget package.

{% highlight bash %}
PM> Install-Package Unity.Interception
{% endhighlight %}

Then update your Unity container creation to with the new extension.
{% highlight java %}
var newContainer = new UnityContainer()
    .AddNewExtension<LogCreation>() //Custom extension that executes logger setup
    .AddNewExtension<Log4NetExtension>()
    .AddNewExtension<Interception>();
{% endhighlight %}

## Step 3: Injecting the New Behavior into a Class

So now you want the behavior you created in step one to be invoked when calling a method in an intercepted class. This will be accomplished adding a few lines to a class registered in your Unity configuration. 

{% highlight java %}
container.RegisterType<IRepository, Repository>(new HierarchicalLifetimeManager()
, new Interceptor<InterfaceInterceptor>() //Interception technique
, new InterceptionBehavior<ProfilingInterceptionBehavior>()); //created in step 1.
{% endhighlight %}

## Step 4: Add Method Profiling to the Behavior

In the last step, the behavior method created above is updated to log the start, stop and elapsed time of a method. Any thrown exceptions are also logged.

<script src="https://gist.github.com/davidbreyer/fea59b42b9dc5198dd6d.js"></script>

## Reference: Interception Techniques

In step 2, we added an interceptor called InterfaceInterceptor to our Unity DI configuration. This is called an instance interceptor, and can proxy a class with a single interface. You can also use a VirtualMethodInterceptor, which is a type interceptor and where only methods marked virtual will be proxied. The interceptor techniques can be a topic by themselves, so you can read more about them in the Unity documentation.

[Unity Interception Techniques](https://msdn.microsoft.com/en-us/library/ff660861(v=pandp.20).aspx)