---
layout: post-sidebar
title: "Looping Through Jekyll Files and Collections"
post_date: "March 3rd, 2016"
author_id: evan_neises
post_category: "Information Technology"
post_category_link: "it_category"
comments: True
related_post: [
	
]
---
Using Jekyll to create a static blog site has proved to be challenging, but extremely beneficial. One feature that is very useful with Jekyll is the ability to create layouts and display pages with the same look and feel as others.<!--endpreview--> This helps consistency and cuts down code duplication. One useful example of this is looping through items in a file or collection of files and displaying them on a page. I will explain how this site utilizes that capability and the issues encountered along the way while setting it up.
<br><br>
I started off adding a <a href="http://yaml.org/">YAML</a> file in the _data folder to store information for everyone who has written blog posts for this site. An example of the original layout looks something like this: <br>
<pre><code>
- name: John Smith
	  bio: Born and raised in Louisville, Kentucky.
	  image_file: john.jpg

- name: Jane Doe
	  bio: I like long walks on the beach.
	  image_file: jane.jpg
</code></pre>
<br><br>
I then used a FOR loop to display each author on the Guest Authors page:<br>
<pre><code>
&#123;&#37; for author in site.data.authors &#37;&#125;
  &#123;&#123; author.name &#125;&#125;
  &#123;&#123; author.bio &#125;&#125;
  &#123;&#123; author.image_file &#125;&#125;
&#123;&#37; endfor &#37;&#125;
</code></pre>
<br><br>
This method works great for displaying all of the authors stored in the _data folder, but poses a new problem. What happens when you want to tie each author to the posts they wrote without any hard-coding? Well, Jekyll has a way to do this also, but it requires some modifications. The new authors yml file now looks like this: <br>
<pre><code>
john_smith:
 	name: John Smith
	bio: Born and raised in Louisville, Kentucky.
 	image_file: john.jpg

jane_doe:
	name: Jane Doe
	bio: I like long walks on the beach.
	image_file: jane.jpg
</code></pre>
<br><br>
Now, you can assign the authors in the yml file to the posts that they wrote as shown below:<br>
<pre><code>
&#123;&#37; for post in site.posts &#37;&#125;
   &#123;&#123; assign author = site.data.authors[post.author] }}
   &#123;&#123; post.title &#125;&#125;
   &#123;&#123; author.name &#125;&#125;
   &#123;&#123; post.excerpt &#125;&#125;
&#123;&#37; endfor &#37;&#125;
</code></pre>
<br><br>
Problem solved, right? Not exactly. Now, the other page that is used to display all of the authors will not display the information anymore. What we want is to be able to connect authors to the posts they wrote on one page, while displaying their information on another page. There are some solutions online that recommend using nested FOR loops to achieve this when displaying information from a file in the _data folder. This is possible but it gets a little messy. In this case, the best solution was to use a <a href="https://jekyllrb.com/docs/collections/">collection</a> instead.
<br><br>
First, I removed the _data folder and authors.yml file inside it (since they are no longer needed when using a collection). I then added the following to my _config.yml file:<br>
<pre><code>
Collections:
	Authors:
</code></pre>
<br><br>
Once you’ve done this, you can create a new _authors folder and start adding a new file for each author on the site, similar to the one below (john_smith.md).<br>
<pre><code>
---
author_id: john_smith
name: John Smith
image_file: jsmith.jpg
---
This is my author bio explaining who I am and what I like.
</code></pre>
<br><br>
You can add as many attributes to the markdown in the header as you like. You can then access and display each author’s information using a FOR loop &#123;&#37; for author in site.authors &#37;&#125; and then &#123;&#123; author.name &#125;&#125;, &#123;&#123; author.content &#125;&#125;, etc. Finally, to attach the author to the posts that they wrote you can use the following code:<br>
<pre><code>
&#123;&#37; for post in site.posts &#37;&#125;
   &#123;&#123; assign author = site.authors | where:”author_id”, post.author_id | first }}
   &#123;&#123; post.title &#125;&#125;
   &#123;&#123; author.name &#125;&#125;
   &#123;&#123; post.excerpt &#125;&#125;
&#123;&#37; endfor &#37;&#125;
</code></pre>
<br>
Make sure to add the author_id to the markdown in each post, so the connection can be made between the author and their posts.
<br><br>
If you would like to add/update anything to this post, feel free to leave a comment below and I will make sure the appropriate changes are made. Thanks!
