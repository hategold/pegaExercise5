pageVariable = {};// global value similar to cookie

var domBuilder = {
	name : "domBuilder",
	tableName : "",
	tableAttributeName : [],
	tableServlet : "",// on button too
	superEntityString : "",// on button
	superEntityParm : {},
	buildTag : function(tag) {
		return $('<' + tag + '>');
	},
	appendToHtml : function(inner, outter) {
		return inner.appendTo(outter);
	},
	packHtml : function(tag, opParams) {// opParams={innerElement,text,attrs,outterElement}
		// attrs=[{name:'',value:''}...]

		var htmlCmp = $('<' + tag + '>');
		if (opParams) {
			if (opParams.innerElement) {
				opParams.innerElement.appendTo(htmlCmp);
			}
			if (opParams.text) {
				htmlCmp.text(opParams.text);
			}
			if (opParams.attrs) {
				$.each(opParams.attrs, function(index, element) {
							htmlCmp.attr(element.name, element.value)
						})
			}
		}
		return htmlCmp;

	},

	initSuperEntityString : function() {
		this.superEntityString = decodeURIComponent(window.location.search
				.substring(1));
		this.superEntityParm['idName'] = this.superEntityString.split('=')[0];
		this.superEntityParm['idValue'] = this.superEntityString.split('=')[1];
	},
	deleteSelectRow : function(selector) {
		selector.closest('tr').remove();
	},
	deleteSelectDom : function(selector) {
		selector.remove();
	},
	initializeListener : function(model) {
		var that = domBuilder;

	},
	inputOkButton : $('<button>').attr('type', 'button submit').attr('class',
			'btn btn-primary inputOk').attr('name', 'inputOk').text('OK'),
	inputCancelButton : $('<button type="button" class="btn btn-default inputCancel" name="inputCancel">Cancel</button>')
			.clone(),

	deleteButton : $('<button>').attr('type', 'button').attr('class',
			'btn btn-danger delete').attr('name', 'delete').text('Delete'),
	updateButton : $('<button type="button" class="btn btn-primary" name="update">Update</button>')

	// appendDelete : function(element, idName, idValue) {
	//
	// $('<td>')
	// .append($('<a>')
	// .attr(
	// 'href',
	// this.tableServlet + '.do?action=delete&'
	// + idName + '=' + idValue + '&'
	// + this.superEntityString)
	// .attr('class', 'confirm')
	// .append('<button type="button" class="btn btn-danger delete"
	// name="delete">Delete</button>'))
	// .appendTo(element);
	//
	// },
	// appendUpdate : function(element, idName, idValue) {
	// $('<td>')
	// .append($('<a>')
	// .attr(
	// 'href',
	// this.tableServlet + '.do?action=edit&' + idName
	// + '=' + idValue + '&'
	// + this.superEntityString)
	// .append('<button type="button" class="btn btn-primary"
	// name="update">Update</button>'))
	// .appendTo(element);
	//
	// },
	// appendSubTableBtn : function(element, idName, idValue) {
	// $('<td>')
	// .append($('<a>').attr('href',
	// 'listShoes.jsp?' + idName + '=' + idValue)
	// // ???listJsp
	// .append('<button type="button" class="btn btn-primary"
	// name="ShoesList">ShoesList</button>'))
	// .appendTo(element);
	// },
	// appendButtons : function(element, idName, idValue) {
	// this.appendUpdate(element, idName, idValue);
	// this.appendDelete(element, idName, idValue);
	// if (!this.superEntityString) {
	// this.appendSubTableBtn(element, idName, idValue);
	// }
	// }

}

function buildOptionsByGlobalVar(mapName, selector) {
	setOptionsByJson(pageVariable[mapName + "Map"], selector);// options
}

function buildOptionsByAjax(mapName, selector) {
	var proxy = {};
	var jsonMap = ajaxUtil.makeAjaxRequest(mapName + "Map.jsp", null, proxy,
			function(response) {
				pageVariable[mapName + "Map"] = response;
				setOptionsByJson(response, selector);
			})
}

function setOptionsByJson(jsonMap, selector) {
	$.each(jsonMap, function(key, value) {
				$("<option>").val(key).text(value).appendTo(selector);
			});
	if (selector.value) {
		selector.val(selector.value);// Ajax load Async, so save in value
		// earlier
	}// and then save to val()
}
