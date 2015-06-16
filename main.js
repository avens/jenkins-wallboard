// GLOBALES
var G_TIMER;
var G_BOOLEAN_NORMAL = true;


// REFRESH
function reloadPage() {
	if (G_TIMER) {
		location.reload();
	}
}
;


function manageRefresh() {
	console.log($("#refreshToggle").val());

	if ($("#refreshToggle").val() === 'on') {
		$.cookie('refreshing', 'on');
		G_TIMER = setTimeout("reloadPage()", 60000);
	}
	else {
		$.cookie('refreshing', 'off');
		clearInterval(G_TIMER);
		G_TIMER = null;
	}

}
;


$(document).ready(function () {
	console.log("function : document.ready");

	$("#refreshToggle").change(manageRefresh);
});


$(document).bind("pagechange", function (e, data) {
	console.log(["pagechange Data: ", data]);

	try {
		$("#refreshToggle").val($.cookie('refreshing')).slider('refresh');
	}
	catch (e) {
	}
	;

	manageRefresh();

	getJenkinsJobs();

});