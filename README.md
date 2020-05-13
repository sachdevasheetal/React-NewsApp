# React-NewsApp

## Introduction
A webapp to display top headlines for both New York Times and Guardian News. Based on the selection by the user, the top-headlines should be for any of the following domains – world, politics, business, technology and sports. Each such article can be shared by the user on Facebook, Twitter or via Email.The user can open up any of the article and have the option to share it on either Facebook or Twitter
or via Email. For each article, after expanding, the user can even add comments on the articles if they like. The user can also search for any keyword to read articles about any topic of his/her choice with autosuggestions available for his/her search query.Webapp also supports adding articles to and removing articles from the Bookmark tab.

## Features
* **Tabs** : There are 6 different tabs/sections namely – Home, World, Politics, Business, Technology, Sports. Each of these sections/tabs display the top articles from any domain (for the Home tab) or the top articles belonging to the selected section/tab. The articles from each domain change based on the tab selected. The share button is clickable and opens up a modal for sharing on twitter, facebook or email.

* **Detailed Article Page** : All articles are clickable and open a detailed view of the article. Each article has a comment-box using CommentBox.io API that is UNIQUE to that article.

* **AutoSuggest on Search** : The user can search for any keyword to look up articles related to that keyword from either Guardian News or NY Times depending on his/her selection using microsoft bing autosuggest API.

* **Favorites/Bookmark Tab** : From the homepage of the website, the detailed article page and the search result page, the user can navigate to the bookmarks tab.

This is a responsive webapp and so adjusts itself in mobile view.

## Screenshots
<p align="center">
<img width="700" height="400" src="React%20Home.PNG">
 </p>
 <br/>
 <p align="center">
<img width="700" height="400" src="React%20Bookmark.PNG">
 </p>
