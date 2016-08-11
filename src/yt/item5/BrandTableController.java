package yt.item5;

import java.util.Map;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;

import yt.item5.bean.Brand;
import yt.item5.factory.CountryMapFactory;

/**
 * Servlet implementation class BrandTableController
 */
@WebServlet("/BrandTableController")
public class BrandTableController extends AbstractTableController<Brand, Integer> {

	private Map<CountryCode, String> countryMap;

	private static final long serialVersionUID = 1L;

	public static final String LIST_BRANDS = "/listBrands.jsp";

	public static final String INSERT_OR_EDIT_BRANDS = "/modifyBrand.jsp";

	public static final String COUNTRY_CODE_FILE = "/countryCodeToFullName";

	public BrandTableController() {
		super(LIST_BRANDS, INSERT_OR_EDIT_BRANDS, Brand.class);
		this.countryMap = (new CountryMapFactory()).createCountryMap(COUNTRY_CODE_FILE);
	}

	@Override
	public Integer parsePkFromReq(HttpServletRequest request) {
		return checkString2Int(request.getParameter("brandId"));
	}

	@Override
	public Brand buildEntityByReq(HttpServletRequest request) {
		Brand brand = new Brand(request.getParameter("brandName"));
		brand.setBrandId(parsePkFromReq(request)).setCountry(request.getParameter("country")).setWebsite(request.getParameter("website"));
		return brand;
	}

	@Override
	public String dispatchToUpdate(HttpServletRequest request, Brand brand) {
		request.setAttribute("countryCodeMap", countryMap);
		return super.dispatchToUpdate(request, brand);
	}

}
