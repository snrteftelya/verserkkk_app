package org.example.repository;

import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.stereotype.Repository;

@Repository
public class VisitRepository {
    private final ConcurrentHashMap<String, Long> visitMap = new ConcurrentHashMap<>();

    public Optional<Long> findByUrl(String url) {
        return Optional.ofNullable(visitMap.get(url));
    }

    public void incrementVisit(String url) {
        visitMap.compute(url, (key, count) -> (count == null) ? 1L : count + 1);
    }

    public void deleteAll() {
        visitMap.clear();
    }
}