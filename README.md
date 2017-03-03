#Project 4: VPESTS - A Virtual Pet Simulator! (created by Barrett Quan)

![](https://github.com/yeahbq/project_04-vpets-/blob/master/Screen%20Shot%202017-03-03%20at%2010.40.05%20AM.png)


##Getting Started

###Installation
A google account is required to use VPESTS. On the home page, click
to login, and you will be redirected to google to confirm your login
credentials. A compatible web browser is required to play VPESTS.

###Instructions
Experience a blast from the past as you feed, train and clean up your VPESTS
poop. Revisit the hype from 20 years ago that captivated the wallets of
all '90s families. Click on the corresponding buttons to feed or train 
your VPEST. When the VPESTS can no longer be fed or trained, you will be
shown a sad face. The VPESTS hunger and strength will be reduced over time
and need to be replenished. Marvel at the wonders of VPESTS evolution, as
he or she can take on a few form and species given the right amount of time
and care is put in!

###MVP
-Oauth login (google)
-VPESTS tied to account login
-Mongoose to CRUD user data / vpest data
-Buttons to +/- vpests stats
-Deployed online using Heroku
-VPESTS evolutions depending on met conditions
-Animated sprites

##Workflow

###User Stories
[User Stories](https://github.com/yeahbq/project_04-vpets-/blob/master/vpests-userstories.JPG)

###Waffle.io
[VPESTS Waffleboard](https://waffle.io/yeahbq/project_04-vpets-)

###Wire Frames
[Wire Frames](https://github.com/yeahbq/project_04-vpets-/blob/master/vpests-wireframes.JPG)

###Technologies Used
*Angular 1.5
*Body-Parser
*CSS3
*Dot-ENV
*ES6
*Express
*Express-Session
*.git / GitHub
*Google+ Oauth
*Handlebars Templating
*Heroku Online Deployment
*j5.js / j5.play
*JavaScript
*Method-Override
*MongoDB / Mongoose
*Node.js
*Path
*Request

###General Approach
For this project sprint, I closely followed Agile Deployment methods
to brainstorm, create a back log, work on the top things of the back log, 
then repeat the whole process again. I spent the first day wireframing,
writing user stories and creating routes/data schemas. Initially the entire
project was written in jQuery and reached MVP before it was completely
refactored into Angular.

###Unsolved Problems
*Configuring routes and redirects to be a true SPA
*Repeatedly refreshing page sometimes kicks you to create new VPEST
*Animation cancelling on first initial page load

###Additional Features
*Utilizing canvas to dynamically animate sprites
*Refactoring animation functions to dynamically animate based off of species
*Additional evolutions factoring in care mistakes
*Multiplayer battling
*Training mini game to actually increase strength

