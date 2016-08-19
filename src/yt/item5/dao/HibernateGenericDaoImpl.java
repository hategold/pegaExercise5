package yt.item5.dao;

import java.io.Serializable;
import java.util.List;

import org.springframework.orm.hibernate5.support.HibernateDaoSupport;
//import org.springframework.transaction.annotation.Transactional;

import yt.item5.bean.EntityInterface;

public class HibernateGenericDaoImpl<T extends EntityInterface, PK extends Serializable> extends HibernateDaoSupport implements GenericDao<T, PK> {

	private Class<T> entityType;

	public HibernateGenericDaoImpl() {
	};

	public HibernateGenericDaoImpl(Class<T> entityType) {
		this.entityType = entityType;
	}

	@Override
	public T getById(PK Id) {
		T selectedEntity = getHibernateTemplate().get(entityType, Id);
		return selectedEntity;
	}

//	@Transactional
	@Override
	public boolean deleteById(PK Id) {
		try {

			getHibernateTemplate().delete(getById(Id));
		} catch (IllegalArgumentException e) {
			System.out.println("delete Null entity");
			return false;
		}
		return true;
	}

//	@Transactional
	@Override
	public boolean delete(T t) {
		try {
			getHibernateTemplate().delete(t);
		} catch (IllegalArgumentException e) {
			System.out.println("delete Null entity");
			return false;
		}
		return true;
	}

//	@Transactional
	@Override
	public boolean update(T t) {
		System.out.println(t);
		getHibernateTemplate().update(t);
		return true;
	}

//	@Transactional
	@Override
	public boolean insert(T t) {
		getHibernateTemplate().save(t);
		return true;
	}

	@Override
	public List<T> findAll() {
		@SuppressWarnings("unchecked")
		List<T> entityList = (List<T>) getHibernateTemplate().find("From " + entityType.getName());

		return entityList;
	}

	@Override
	public List<T> findByCondition(String s) {
		@SuppressWarnings("unchecked")
		List<T> entityList = (List<T>) getHibernateTemplate().find("From " + entityType.getName() + " Where " + s);
		return entityList;
	}
}
