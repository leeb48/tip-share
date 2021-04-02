package com.projects.tipshare.repository;

import com.projects.tipshare.model.TipPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository for Tip Post Entity
 */
@Repository
public interface TipPostRepo extends JpaRepository<TipPost, Long> {
}
