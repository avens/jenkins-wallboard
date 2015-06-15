# jenkins-wallboard

Web application for displaying jenkins jobs status on a Wallboard or a widescreen TV.
Very helpfull for agile developpers teams.

## main screenshot
![Wallboard screenshot](https://github.com/avens/jenkins-wallboard/blob/master/wallboard.png?raw=true)

## prerequisites
* **for using jsonp** - because you are in your own private developpement team LAN : start Jenkins server with the following Java setting : java -jar -Dhudson.model.Api.INSECURE=true jenkins.war

## features
* **visibility** - wide colored squarred shapes according to jenkins status
* **realtime** - autorefresh mode
* **current building jobs** - caracterized by blinking effect