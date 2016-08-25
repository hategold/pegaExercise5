<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<!-- 新增判斷，避免直接存取listbrand -->
<html>
<head>

<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>

<link href="bootstrap/css/bootstrap.min.css" rel="stylesheet"
	type="text/css" />
<script type="text/javascript" src="bootstrap/js/bootstrap.min.js"></script>
<script type="text/javascript" src="jsLib/bootbox.min.js"></script>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Brands Records</title>

</head>
<body>

	<div class="container">
		<div class="row" id="up-padding">
			<div class="col-xs-12 col-md-12 col-lg-12 vcenter">
				<div style="height: 4em;"></div>
			</div>
		</div>

		<div class="row">
			<div class="col-md-8 col-md-offset-2">
				<table class="table table-bordered" id="brandTable"
					servlet="BrandTableController">
					<caption>ShoesBrands</caption>
					<thead>
						<tr>
							<!-- colTag & otherAttribute is label for js dom control. -->
							<th><div colTag="input" colType="text" colName="brandId"
									otherAttribute="readonly">BrandId</div></th>
							<th><div colTag="input" colType="text" colName="brandName"
									otherAttribute="required">BrandName</div></th>
							<th><div colTag="input" colType="text" colName="website">Website</div></th>
							<th><div colTag="select" colName="country">Country</div></th>
							<th colspan="3">Action</th>
						</tr>
					</thead>
					<tbody>
						<!-- insert Js table 
					<td><a
									href="ShoesTableController.do?action=list&brandId=<c:out value="${brand.getBrandId() }"/>"><button
											type="button" class="btn btn-primary">Shoes List</button></a></td>
					
					-->
					</tbody>
				</table>
			</div>
		</div>
		<div class="row">
			<p class="col-md-offset-2">
				<button type="button" class="btn btn-success" name="create">Add
					Shoes Brands</button>
				<!--  
						<a href="BrandTableController.do?action=insert"><button
						type="button" class="btn btn-success" name="create">Add
						Shoes Brands</button></a>-->
			</p>
		</div>
	</div>

	<script type="text/javascript" src="js/CrudEventHandler.js"></script>
	<script type="text/javascript" src="js/AjaxController.js"></script>
	<script type="text/javascript" src="js/DomBuilder.js"></script>


</body>

</html>
