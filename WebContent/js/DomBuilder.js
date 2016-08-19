var domBuilder = {
	name : "domBuilder",
	tableName : "",
	tableAttributeName : [],
	tableServlet : "",
	buildTableByAjax : function(responseJson) {
		var tableName = this.tableName;
		var tableAttributeName = this.tableAttributeName;
		var tableServlet = this.tableServlet;
		$.each(responseJson, function(index, record) {

					$("#" + tableName + " tr:last").after("<tr></tr>");
					var i;
					for (i = 0; i < tableAttributeName.length; i++) {
						$("#" + tableName + " tr:last").append("<td>"
								+ record[tableAttributeName[i]] + "</td>")

					}
					appendUpdate($("#" + tableName + " tr:last"), tableServlet
									+ '.do?action=edit&'
									+ tableAttributeName[0] + '='
									+ record[tableAttributeName[0]])
					appendDelete($("#" + tableName + " tr:last"), tableServlet
									+ '.do?action=delete&'
									+ tableAttributeName[0] + '='
									+ record[tableAttributeName[0]])
				})
	},
	createNewRow : function(rowMap, tableName) {
		$("#" + tableName + " tr:last").after("<tr></tr>");
		rowMap.forEach(function() {
				});
	}
}

function appendDelete(element, url) {
	element
			.append('<td><a href="'
					+ url
					+ '" class="confirm"><button type="button" class="btn btn-danger delete" name="delete">Delete</button></a></td>')
}

function appendUpdate(element, url) {
	element
			.append('<td><a href='
					+ url
					+ '><button type="button" class="btn btn-primary" name="update">Update</button></a></td>')
}

var inputOkButton = '<td><button type="button" class="btn btn-default inputOk" name="inputOk">OK</button></td>';
var inputCancelButton = '<td><button type="button" class="btn btn-primary inputCancel" name="inputCancel">Cancel</button></td>';