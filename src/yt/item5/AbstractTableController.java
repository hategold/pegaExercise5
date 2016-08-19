package yt.item5;

import java.io.IOException;
import java.io.Serializable;
import java.lang.reflect.Field;
import java.lang.reflect.ParameterizedType;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.context.ApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import yt.item5.bean.EntityInterface;
import yt.item5.service.GeneralService;

public abstract class AbstractTableController<T extends EntityInterface, PK extends Serializable> extends HttpServlet {

	private static final long serialVersionUID = 1L;

	public final Class<T> classType;

	protected final String INSERT_OR_EDIT_PAGE;

	protected final String LIST_PAGE;

	protected GeneralService<T, PK> generalService;

	@SuppressWarnings("unchecked")
	public AbstractTableController() {
		this.classType = (Class<T>) ((ParameterizedType) this.getClass().getGenericSuperclass()).getActualTypeArguments()[0];
		this.INSERT_OR_EDIT_PAGE = "/modify" + classType.getSimpleName() + ".jsp";
		this.LIST_PAGE = "/list" + classType.getSimpleName() + ".jsp";
	}

	@SuppressWarnings("unchecked")
	public PK parsePkFromReq(HttpServletRequest request) {
		return (PK) Integer.valueOf(checkString2Int(request.getParameter(classType.getSimpleName().toLowerCase() + "Id")));
	}

	public T buildEntityByReq(HttpServletRequest request) {
		T entity = null;
		try {
			entity = classType.newInstance();
		} catch (InstantiationException | IllegalAccessException e1) {
			e1.printStackTrace();
		}
		Field[] fields = classType.getDeclaredFields();

		for (Field field : fields) {
			try {
				if (field.getType().equals(String.class)) {//TODO stringUtils?
					field.setAccessible(true);
					field.set(entity, request.getParameter(field.getName()));
				} else if (field.getType().equals(int.class)) {
					field.setAccessible(true);
					field.set(entity, Integer.valueOf(request.getParameter(field.getName())));
				}

			} catch (IllegalArgumentException | IllegalAccessException e) {
				e.printStackTrace();
				System.out.println(field.getName());
			}
		}
		return entity;
	}

	public String dispatchToList(HttpServletRequest request) {
		request.setAttribute(classType.getSimpleName().toLowerCase() + "List", generalService.findAll());
		return LIST_PAGE;
	}

	public String dispatchToUpdate(HttpServletRequest request, T entity) {
		if (entity != null)
			request.setAttribute(entity.getClass().getSimpleName().toLowerCase(), entity);
		return INSERT_OR_EDIT_PAGE;
	};

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		initGeneralService();
		String forward = excuteAction(request.getParameter("action"), request);
		if (null == forward) {
			response.sendRedirect("/MavenWebExercise5/index.jsp"); // set to main page
			return;
		}
		request.getRequestDispatcher(forward).forward(request, response);
	}

	protected String excuteAction(String action, HttpServletRequest request) {
		try {
			switch (ActionEnum.valueOf(action.toUpperCase())) {
				case DELETE:
					generalService.deleteById(parsePkFromReq(request));
					return dispatchToList(request);
				case EDIT:

					T entity = generalService.getById(parsePkFromReq(request));

					if (entity == null) //got no data
						return dispatchToList(request);

					return dispatchToUpdate(request, entity);
				case INSERT:
					return dispatchToUpdate(request, null);
				default:
					break;
			}
		} catch (NullPointerException e) {
			e.printStackTrace();
		}
		return dispatchToList(request);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		initGeneralService();

		T entity = buildEntityByReq(request);

		if (isCreate(entity.getId())) {
			generalService.insert(entity);
			response.sendRedirect(buildListUrl(request)); //end post
			return;
		}

		generalService.update(entity);
		response.sendRedirect(buildListUrl(request));
	}

	public String buildListUrl(HttpServletRequest request) throws IOException {
		return "/MavenWebExercise5/" + this.getClass().getSimpleName() + "?action=list";
	}

	private boolean isCreate(int id) {
		return id == 0;
	}

	protected int checkString2Int(String s) {
		if (s != null && s.trim().length() > 0) {
			return Integer.valueOf(s);
		}
		return 0;
	}

	public GeneralService<T, PK> getGeneralService() {
		return generalService;
	}

	public void setGeneralService(GeneralService<T, PK> generalService) {
		this.generalService = generalService;
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	public void initGeneralService() {
		ApplicationContext context = WebApplicationContextUtils.getWebApplicationContext(getServletContext());
		this.generalService = (GeneralService) context.getBean(classType.getSimpleName().toLowerCase() + "Service");
	}
}
