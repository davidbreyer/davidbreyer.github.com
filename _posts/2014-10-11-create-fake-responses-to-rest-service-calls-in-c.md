---
layout: post
title: "Create Fake Responses to REST Service Calls in C#"
description: ""
category: Programming
tags: [c#, Unit Testing, Web API]
meta_description: 'Create Fake Responses to REST Service Calls in C#'
browser_title: 'Create Fake Responses to REST Service Calls in C#'
comments: true
---


Creating mocks for your service calls is made easy with the use of the HttpClient and the FakeResponseHandler. The FakeResponseHandler inherits from the DelegatingHandler and will return a response based on the registered URI.

Here is a simple example of a proxy class that calls a REST service.

{% highlight java %}
public class Proxy
{
    [Dependency]
    public HttpClient client { get; set; }

    public async Task<ExampleDto> GetExample(int id)
    {
        var response = client.GetAsync(
        	string.Format("/api/restserviceexample/{0}", id))
            	.Result.Content.ReadAsAsync<ExampleDto>();

        return await response;
    }
}
{% endhighlight %}

This is a simple example, but it works for the purposes of showing how to call a fake REST service. As you can see GetExample will be calling the GET method of the RestServiceExample controller in Web API. Notice the [Dependency] tag above the client property. I am injecting the HttpClient using Microsoft Unity. Now let's assume we need to create a unit test for this method, but it relies on retrieving data from a service.

And here is a unit test that calls the GetExample method of the Proxy class. Notice the container.resolve in the test method. This will create an instance of the registered proxy class, and HttpClient, using dependency injection.

{% highlight java %}
[TestMethod]
public void TestProxy1()
{
    var proxy = Container.Resolve<Proxy>();

    var response = proxy.GetExample(1).Result;

    Assert.IsNotNull(response);
    Assert.AreEqual("Printer", response.Name);

} 
{% endhighlight %}

So, let's take a look at how to connect the Unit Test to our fake REST service.

First we add the FakeResponseHandler class to our test project. This class is generic enough that it will be reused to fake any REST service. Only the registration details will change in our test initialization method.

{% highlight java %}
public class FakeResponseHandler : DelegatingHandler
{
    private readonly Dictionary<Uri, HttpResponseMessage> 
    	_FakeResponses = new Dictionary<Uri, HttpResponseMessage>();
 
 
    public void AddFakeResponse(Uri uri, HttpResponseMessage responseMessage)
    {
        _FakeResponses.Add(uri, responseMessage);
    }
 
 
    protected override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request
    	, System.Threading.CancellationToken cancellationToken)
    {
        if (_FakeResponses.ContainsKey(request.RequestUri))
        {
            return Task.FromResult(_FakeResponses[request.RequestUri]);
        }
        else
        {
            return Task.FromResult(new HttpResponseMessage(HttpStatusCode.NotFound) 
            	{ RequestMessage = request });
        }
    }
}
{% endhighlight %}

Next I am going to should instantiate the fake response handler in the setup method of my unit test class. And add a Uri that I want the HttpClient to respond to, along with the desired status and content. 

{% highlight java %}
var fakeResponseHandler = new FakeResponseHandler();

fakeResponseHandler.AddFakeResponse(
	new Uri("http://example.org/api/restserviceexample/1"),
	new HttpResponseMessage(HttpStatusCode.OK)
	{
		Content = new ObjectContent<ExampleDto>(
			new ExampleDto
			{
				Id = 1,
				Name = "Printer"
			}, new JsonMediaTypeFormatter())
	});
{% endhighlight %}

Then I am going to register the HttpClient and FakeResponseHandler with Microsoft Unity.

{% highlight java %}
Container.RegisterType<HttpClient>(
	new InjectionFactory(x =>
	new HttpClient(fakeResponseHandler) 
		{ BaseAddress = new Uri("http://example.org/") }));
{% endhighlight %}

Now you should have an HttpClient that will respond to requests with fake data and response codes in your unit tests. Let's take a look at the entire test class.

{% highlight java %}
[TestClass]
public class UnitTest1
{
	public UnityContainer Container { get; set; }
	
	[TestInitialize]
	public void Setup()
	{
		Container = new UnityContainer();
 
		var fakeResponseHandler = new FakeResponseHandler();
		fakeResponseHandler.AddFakeResponse(
			new Uri("http://example.org/api/restserviceexample/1"),
			new HttpResponseMessage(HttpStatusCode.OK)
			{
				Content = new ObjectContent<ExampleDto>(
					new ExampleDto
					{
						Id = 1,
						Name = "Printer"
					}, new JsonMediaTypeFormatter())
			});
 
 
		Container.RegisterType<Proxy, Proxy>();
 
		Container.RegisterType<HttpClient>(
			new InjectionFactory(x =>
			new HttpClient(fakeResponseHandler) { 
				BaseAddress = new Uri("http://example.org/") }));
	}
	
	[TestMethod]
	public void TestProxy1()
	{
		var proxy = Container.Resolve<Proxy>();
 
		var response = proxy.GetExample(1).Result;
 
		Assert.IsNotNull(response);
			Assert.AreEqual("Printer", response.Name);
	}
}
{% endhighlight %}

This great thing about this method is there is no need to create a mock class for HttpClient. Just by registering your HttpClient in the Unity configuration, you can control whether to call real REST services, or fakes.