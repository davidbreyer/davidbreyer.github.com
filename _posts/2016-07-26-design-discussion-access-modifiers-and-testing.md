---
layout: post
title: "Improve Code Maintainability by Using the Correct Accessibility Level"
description: ""
category: Programming
tags: [C#, Unit Testing, Architecture, SOLID, Open closed principle, Code Quality]
meta_description: 'Improve Code Maintainability by using the Correct Accessibility Level'
browser_title: 'Improve Code Maintainability by using the Correct Accessibility Level'
comments: true
banner_image: programming-banner-5.jpg
banner_image_alt: Banner Image
---

Most developers I have talked to use just Public or Private access modifiers. Public for 
methods that should be called by an external class. While private is used for internal methods.
 I am going to tell you why you should care about creating protected or internal methods.

<img src = "{{ site.url }}/assets/graphs/modifiergraph.png" style="max-width: 400px" /> 

Let's take a look at the three other modifiers.

1. Protected - Available to derived classes.
2. Internal - Can be accessed by in any class in the assembly. Or via a friend class.
3. Protected Internal - Either functions as protected or internal (not both).

Using correct access modifiers will improve code quality by making it
 easier to test and extend, which makes it more maintainable.

### Unit Testing:<br/>
Without some tricks using reflection the only way to test a private method is to 
call the public method which makes use of your private methods.
 Which means testing your private method now goes through an extra step (and logic)
and in my opinion is a less effective test. As it lacks the granularity that is the very nature of unit testing. 
Which is to independently scrutinize the smallest testable part of your code. 

Protected methods are easier to test than private by creating an accessor method in your unit test project.

Private functions are more difficult to unit test.

{% highlight javascript %}
private int add(int x, int y)
{
    return x + y;
}
{% endhighlight %}

Change your private method to protected. Functions similar to private. But now testable and extendable.

{% highlight javascript %}
protected virtual int add(int x, int y)
{
    return x + y;
}
{% endhighlight %}

So our Unit Test looks something like this.

{% highlight javascript %}
public class MyTestExtender : ClassToTest
{
    public int AddAccessor(int x, int y)
    {
        return this.add(x, y);
    }
}

[TestMethod]
public void AddOneAndOneTest()
{
    var testClass = new MyTestExtender();

    var actual = testClass.AddAccessor(1, 1);

    Assert.AreEqual(2, actual);
}
{% endhighlight %}

### Extensibility:<br/>
The second reason to use protected over private is you can leave your class open for extension. 
If you are believer in the *open/close principle* than marking your methods *protected virtual* 
allow for overriding a method and extending functionality of your classes.
Which gives your code greater maintainability.

Additionally virtual methods have for more advanced extensibility available. 
Such as using the VirtualMethodInterceptor with Unity. 
Which I discussed a bit in my [Log4Net with Unity Interceptor articles]({% post_url 2015-07-01-aop-using-unity-interceptors-in-a-web-api-project %}).

### What about internal?
So I never mentioned internal or why you would want to use it. Internal can be used for unit testing, since you can give 
access to internal methods to another project. It's my second choice after protected though.

Using the InternalsVisibleTo attribute you can give another assembly access to your internal methods. Where they would 
normally be accessible by the current assembly.

{% highlight javascript %}
[assembly: InternalsVisableTo("MyTestProject")]
class ClassToTest
{
    internal int Add(int x, int y)
    {
        return x + y;
    }
}
{% endhighlight %}

While there may be a reason this is preferrable. I am less inclined to use Internal since the classes you are testing now 
contain configuration used by a test project. I would rather have all test configuration be in the Unit Testing project.

I am not saying this is the right solution all the time. Indeed there are plenty of uses for Private. But you can 
be aware of the benefits of lesser used access modifiers. Unit tests and allowing for extension will greatly 
improve the quality of your code.

