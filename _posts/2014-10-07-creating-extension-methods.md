---
layout: post
title: "Creating Extension Methods"
description: "How to create extension methods in C#"
category: Programming 
tags: [c#, c# basics]
meta_description: 'How to create extension methods in C#'
browser_title: 'Creating Extension Methods'
comments: true
---

A useful feature of C# is the ability to add functionality to existing classes. For example, you might want a reverse function on the String class. You would then be able to call your new function this way: myString.Reverse().


Here is an example of an extension class.

{% highlight java %}
public static class MyExtensions
{
	public static string Reverse(this String str)
    {
    	char[] charArray = str.ToCharArray();
        Array.Reverse(charArray);
        return new string(charArray);
    }
}


//Example usage
var myString = “Hello World”;
var myStringReversed = myString.Reverse(); //Will return “dlroW olleH"

{% endhighlight %}

Notice that the class and the Reverse function are both marked static. This is required to create an extension method. The parameter, this String str, is how C# knows that the String class is the one the extension applies too.


You can also create extension methods that accept a parameter.

{% highlight java %}
public static string ReplaceSpacesWith(this String str, string replacementValue)
{
	return str.Replace(" ", replacementValue);
}
{% endhighlight %}

And this can be called by, myString.ReplaceSpacesWith(“#”). 

{% highlight java %}
//Example usage
var myString = “Hello World”;
var myStringWithHashes = myString.ReplaceSpacesWith(“#"); //Will return “Hello#World"
{% endhighlight %}

Extension methods are simple to create and useful for adding functionality to an existing class. Just remember that the extension class must be marked static and have a reference to the class you are extending. And the extension method must be static and the first parameter must contain this and the class your extending.
