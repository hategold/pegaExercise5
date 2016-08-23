pageVariable = {};
var domBuilder = {
	name : "domBuilder",
	tableName : "",
	tableAttributeName : [],
	tableServlet : "",
	buildTableByAjax : function(responseJson) {
		var tableName = this.tableName;
		var tableAttributeName = this.tableAttributeName;
		var tableServlet = this.tableServlet;
		$("#" + tableName + " tbody").children().replaceWith("");
		$.each(responseJson, function(index, record) {

					$("#" + tableName + " tbody").append($("<tr>").attr("id",
							record[tableAttributeName[0]]));
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
	createNewRowForm : function(rowMap, tableName) {
		$("#" + tableName + " tr:last").after("<tr></tr>");
		var targetTr = $("#" + tableName + " tr:last");
		rowMap.forEach(function(item, key) {

					targetTr.append("<td><" + item.tag
							+ (item.type ? " type=\"" + item.type + "\"" : "")
							+ " name = \"" + key + "\" "
							+ (item.otherAttribute ? item.otherAttribute : "")
							+ ">" + "</td>");
					if (item.tag == "select") {
						if (!pageVariable[key + 'Map']) {
							buildOptionsByAjax(key, $("select[name='" + key
											+ "']"));
						} else {
							buildOptionsByGlobalVar(key, $("select[name='"
											+ key + "']"));
						}
					}
				});
		targetTr.append(inputOkButton);
		targetTr.append(inputCancelButton);

	},
	updateNewRowForm : function(rowMap, rowSelector) {

		rowSelector.hide();
		var attributeArray = this.tableAttributeName;
		var targetTr = $("<tr>");
		var tdArray = rowSelector.find("td");
		var i;
		for (i = 0; i < attributeArray.length; i++) {
			var key = attributeArray[i];
			var item = rowMap.get(key);
			var tmpTd = $("<td>");
			var tmpTag = $("<" + item.tag + ">");
			tmpTag.attr("type", item.input).attr("name", key).appendTo(tmpTd);

			item.otherAttribute ? tmpTag.prop(item.otherAttribute, true) : "";

			if (item.tag == "select") {
				if (!pageVariable[key + 'Map']) {
					buildOptionsByAjax(key, tmpTag);
				} else {
					buildOptionsByGlobalVar(key, tmpTag);
				}
			}
			tmpTag.value = $(tdArray[i]).text();
			tmpTag.val($(tdArray[i]).text());
			targetTr.append(tmpTd);

		}

		cancelButtonForUpdate = $(inputCancelButton)
		cancelButtonForUpdate.children("button").attr("target",
				rowSelector.attr("id"));

		targetTr.append(inputOkButton);
		targetTr.append(cancelButtonForUpdate);
		rowSelector.after(targetTr);
	},
	formToEntity : function(selector, responseJson) {
		var thisTr = $("<tr>");
		this.tableAttributeName.forEach(function(element) {
					$("<td>").text(responseJson[element]).appendTo(thisTr);
				});
		thisTr.attr('id', responseJson[this.tableAttributeName[0]]);
		selector.replaceWith(thisTr);
	},
	deleteRowForm : function(selector) {
		selector.replaceWith("");
	},
	checkThis : function() {
		return (this);
	}
}

function buildOptionsByGlobalVar(mapName, selector) {
	setOptionsByJson(pageVariable[mapName + "Map"], selector);
}

function buildOptionsByAjax(mapName, selector) {
	var proxy = {};
	var jsonMap = ajaxUtil.makeAjaxRequest("countryCode.jsp", null, proxy,
			function(response) {

				pageVariable[mapName + "Map"] = response;
				setOptionsByJson(response, selector);
			})
}

function setOptionsByJson(jsonMap, selector) {
	$.each(jsonMap, function(key, value) {
				$("<option>").val(key).text(value).appendTo(selector);
			});
	selector.val(selector.value);// Ajax load Async, so save in value earlier
	// and then save to val()
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

function deleteSelectedRow() {
}

var inputOkButton = '<td><button type="button" class="btn btn-primary inputOk" name="inputOk" type="submit">OK</button></td>';
var inputCancelButton = '<td><button type="button" class="btn btn-default inputCancel" name="inputCancel">Cancel</button></td>';