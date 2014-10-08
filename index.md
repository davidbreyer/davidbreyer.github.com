---
layout: page
title: Home
section: Home
top: David Breyer
tagline: Science created him. Now Chuck Norris must destroy him.
---
{% include JB/setup %}

<h1 class="emphnext">Willkommen</h1>

<p><img class="inset right" style="margin-top: -3em;" src="./assets/david_breyer.png" title="David Breyer" alt="Photo of David Breyer in Český Krumlov." width="120px" /></p>
<p>
I'm David Breyer and I am a professional programmer, part-time traveler, and amateur photographer. When I am not biking through the Czech Republic or having a beer at Oktoberfest, I reside in Cincinnati, Ohio. 
</p>

<p>
You can find more information about me on <a href="http://www.linkedin.com/in/davidbreyer">LinkedIn</a> or follow my very infrequent musings on <a href="https://twitter.com/DavidBreyer">Twitter</a>.
You can also get my iOS app, <a href="http://www.yellinglizard.com">Quiz Your Lizard</a>, on the App Store. Let me know what you think.
</p>

<p>Recent Posts</p>
<ul class="posts">
  {% for post in site.posts %}
    <li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
  {% endfor %}
</ul>

