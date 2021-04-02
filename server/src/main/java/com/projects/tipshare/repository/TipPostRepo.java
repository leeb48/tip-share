package com.projects.tipshare.repository;

import com.projects.tipshare.model.TipPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

/**
 * Repository for Tip Post Entity
 */
@Repository
public interface TipPostRepo extends JpaRepository<TipPost, Long> {

    Set<TipPost> findByPlaceId(Long placeId);

}
