---
layout: page
title: Home
tagline: Supporting tagline
---
{% include JB/setup %}

<h1 class="emphnext">Welcome</h1>

I'm David Breyer, programmer, traveler, avid gamer, and hobbyist photographer. I 
use this site to keep records of things that interest me.

<ul class="posts">
  {% for post in site.posts %}
    <li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
  {% endfor %}
</ul>
