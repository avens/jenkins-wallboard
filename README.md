# jenkins-wallboard

A radiator web application for displaying jenkins jobs status on a Wallboard or a widescreen TV.

Very helpfull for agile developpers teams (SCRUM).

## main screenshot
![Wallboard screenshot](https://github.com/avens/jenkins-wallboard/blob/master/wallboard.png?raw=true)

## features
* **high visibility** - wide colored squarred shapes according to jenkins status
* **realtime** - autorefresh mode every 60 seconds
* **current building jobs** - blinking effect for running jobs
* **details** - job detail on squarred shape click

## prerequisites
* **for using jsonp** - because you are trusting in your own private developpement team LAN : start Jenkins server with the following Java setting : java -jar -Dhudson.model.Api.INSECURE=true jenkins.war

## details
* **third-party libraries** - JQuery (1.10.2), JQuery Cookie (1.4.0) and JQuery Mobile (1.4.0) are used
* **config.js** - contains labels and URL constants
* **main.js** - manages loading and refreshing main page
* **main.css** - decorates div elements
* **jenkins.job.js** - gets, sorts and displays jenkins jobs data
