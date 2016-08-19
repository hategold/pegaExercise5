package yt.item5;

import java.io.IOException;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;

import yt.item5.bean.Brand;
import yt.item5.bean.Shoes;

/**
 * Servlet implementation class ShoesTableController
 */
@WebServlet("/ShoesTableController")
public class ShoesTableController extends AbstractTableController<Shoes, Integer> {

	private static final long serialVersionUID = 1L;

	@Override
	public Shoes buildEntityByReq(HttpServletRequest request) {
		return super.buildEntityByReq(request).setBrand(generalService.buildFkEntity(Integer.valueOf(request.getParameter("brandId"))));

	}

	@Override
	public String dispatchToUpdate(HttpServletRequest request, Shoes shoes) {
		shoes = generalService.processUpdate(shoes, Integer.valueOf(request.getParameter("brandId")));
		if (shoes == null)
			return dispatchToList(request);

		request.setAttribute("brand", shoes.getBrand());
		return super.dispatchToUpdate(request, shoes);
	}

	@Override
	public String dispatchToList(HttpServletRequest request) {//§ï¯Â²îrequest?
		Brand brand = generalService.buildFkEntity(Integer.valueOf(request.getParameter("brandId")));
		if (brand == null)
			return null;
		request.setAttribute("brand", brand);
		request.setAttribute("shoesList", generalService.findByCondition("brandId =" + String.valueOf(brand.getBrandId())));
		return LIST_PAGE;
	}

	@Override
	public String buildListUrl(HttpServletRequest request) throws IOException {
		return super.buildListUrl(request) + "&brandId=" + request.getParameter("brandId");
	}

}
