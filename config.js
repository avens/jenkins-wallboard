var G_CONFIG = {
	titlePart1: 'Jenkins Wallboard : ',
	titlePart2: ' Jobs',
	loadingText: 'Jobs update in progress',
	jenkinsJobsRequest: 'http://myjenkinserver.priv.de:8080/jenkins/api/json?&pretty=true&tree=jobs[name,color,builds[number,url,changeSet[items[author[fullName]]]]]'
};