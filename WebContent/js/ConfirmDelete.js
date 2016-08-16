$(document).on("click", ".confirm", function(e) {
	var link = $(this).attr("href");
	e.preventDefault();
	bootbox.confirm({
		title : "確定要刪除這筆紀錄?",
		message : "Are you sure?",
		callback : function(result) {
			if (result) {
				window.location = link;
			}
		},
		size : "big"
	});
});