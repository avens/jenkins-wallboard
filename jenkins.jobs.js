/* global G_CONFIG */

function getJenkinsJobs()
{
	console.log("function : getJenkinsJobs");

	$.mobile.loading("show", {
		text: G_CONFIG.loadingText,
		textVisible: true,
		theme: "b",
		html: ""
	});

	$.ajax({
		url: G_CONFIG.jenkinsJobsRequest,
		type: "GET",
		cache: false,
		jsonp: "jsonp",
		dataType: "jsonp",
		jsonpCallback: "jenkinsJobsCallback",
		error: function (jqXHR, textStatus, errorThrown) {
			console.log(errorThrown);
		}
	});
}

function jenkinsJobsCallback(data)
{
	console.log("function : jenkinsJobsCallback");

	$("#idTitle").text(G_CONFIG.titlePart1 + data.jobs.length + G_CONFIG.titlePart2);

	generateJobsTemplates(data);
}

function generateJobsTemplates(data)
{
	console.log("function : generateJobsTemplates");

	var jobsTemplatesHtml = '';
	var colorsLegendHtml = '';

	var jobColor = '';
	var jobName = '';
	var jobAuthorName = '';
	var jobConsoleUrl = '';

	function sortingByJobColor(a, b) {
		var nameA = a.color.toLowerCase(), nameB = b.color.toLowerCase();

		if (nameA > nameB)
			return -1;
		if (nameA < nameB)
			return 1;
		return 0;
	}
	;

	var i = 0;
	var j = 0;
	$.each(data.jobs.sort(sortingByJobColor), function (key, value)
	{
		jobColor = '';
		jobName = '';
		jobAuthorName = '';

		i++;
		j++;

		if (i === 1) {
			jobsTemplatesHtml += '<div class="ui-block-a">';
		}
		else if (i === 2) {
			jobsTemplatesHtml += '<div class="ui-block-b">';
		}
		else if (i === 3) {
			jobsTemplatesHtml += '<div class="ui-block-c">';
		}
		else if (i === 4) {
			jobsTemplatesHtml += '<div class="ui-block-d">';
		}
		else if (i === 5) {
			jobsTemplatesHtml += '<div class="ui-block-e">';
			i = 0;
		}

		jobColor = value.color;
		jobName = value.name;

		if (typeof value.builds[0] === 'undefined') {
		}
		else {
			$.each(value.builds, function (cle1, valeur1) {
				jobConsoleUrl = value.builds[0].url;

				if (typeof valeur1.changeSet.items[0] === 'undefined') {
				}
				else {
					$.each(valeur1.changeSet.items, function (cle2, valeur2) {
						if (typeof valeur2.author === 'undefined') {
						}
						else {
							jobAuthorName = valeur2.author.fullName;
							return false;
						}
					});
				}
			});
		}

		jobsTemplatesHtml += '<div class="job ' + jobColor + '" data-action="#IDAREMPLACERPARLURL#">';
		jobsTemplatesHtml += '<div class="jobTitle">' + jobName + '</div>';
		jobsTemplatesHtml += '<div class="jobLabel">' + jobAuthorName + '</div>';
		jobsTemplatesHtml += '</div>';
		jobsTemplatesHtml += '</div>';

		jobsTemplatesHtml = jobsTemplatesHtml.replace('#IDAREMPLACERPARLURL#', jobConsoleUrl.substr(0, jobConsoleUrl.indexOf('/jenkins', 0)).concat(':8080') + jobConsoleUrl.substr(jobConsoleUrl.indexOf('/jenkins', 0), jobConsoleUrl.length) + 'logText/progressiveText?start=0');

	});

	$('.job').unbind('click');

	$("#idJobs").html(jobsTemplatesHtml);

	$('.job').bind('click', function (ev) {

		console.log('click', ev);
		console.log('data-action', $(ev.target).parent().data('action'));

		$('#popupConsoleOutput iframe').attr('src', $(ev.target).parent().data('action'));
		$('#popupConsoleOutput').popup("open");
	});

	colorsLegendHtml += '<div class="legend blue">SUCCESS</div>';
	colorsLegendHtml += '<div class="legend yellow">UNSTABLE</div>';
	colorsLegendHtml += '<div class="legend red">FAILURE</div>';
	colorsLegendHtml += '<div class="legend disabled">DISABLED</div>';
	colorsLegendHtml += '<div class="legend grey">TIMEOUT (grey)</div>';
	colorsLegendHtml += '<div class="legend notbuilt">NOTBUILT</div>';
	colorsLegendHtml += '<div class="legend aborted">ABORTED</div>';
	$("#idLegend").html(colorsLegendHtml);

	setInterval(animeJobs, 700);

	$.mobile.loading("hide");
}

function animeJobs() {
	if (G_BOOLEAN_NORMAL) {
		$('.blue_anime').removeClass('anime_effect');
		$('.blue_anime').addClass('anime_none');
		$('.yellow_anime').removeClass('anime_effect');
		$('.yellow_anime').addClass('anime_none');
		$('.red_anime').removeClass('anime_effect');
		$('.red_anime').addClass('anime_none');
		$('.disabled_anime').removeClass('anime_effect');
		$('.disabled_anime').addClass('anime_none');
		$('.grey_anime').removeClass('anime_effect');
		$('.grey_anime').addClass('anime_none');
		$('.notbuilt_anime').removeClass('anime_effect');
		$('.notbuilt_anime').addClass('anime_none');
		$('.aborted_anime').removeClass('anime_effect');
		$('.aborted_anime').addClass('anime_none');
	}
	else {
		$('.blue_anime').removeClass('anime_none');
		$('.blue_anime').addClass('anime_effect');
		$('.yellow_anime').removeClass('anime_none');
		$('.yellow_anime').addClass('anime_effect');
		$('.red_anime').removeClass('anime_none');
		$('.red_anime').addClass('anime_effect');
		$('.disabled_anime').removeClass('anime_none');
		$('.disabled_anime').addClass('anime_effect');
		$('.grey_anime').removeClass('anime_none');
		$('.grey_anime').addClass('anime_effect');
		$('.notbuilt_anime').removeClass('anime_none');
		$('.notbuilt_anime').addClass('anime_effect');
		$('.aborted_anime').removeClass('anime_none');
		$('.aborted_anime').addClass('anime_effect');
	}
	G_BOOLEAN_NORMAL = !G_BOOLEAN_NORMAL;
}
