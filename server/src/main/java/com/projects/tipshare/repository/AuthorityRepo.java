package com.projects.tipshare.repository;

import com.projects.tipshare.model.Authority;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository for Authority entity.
 */

@Repository
public interface AuthorityRepo extends JpaRepository<Authority, String> {
}
