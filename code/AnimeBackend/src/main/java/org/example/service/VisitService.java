package org.example.service;

import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.example.repository.VisitRepository;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class VisitService {
    private final VisitRepository visitRepository;

    public VisitService(VisitRepository visitRepository) {
        this.visitRepository = visitRepository;
    }

    @PostConstruct
    public void init() {
        log.debug("Initializing Visit Cache");
        visitRepository.deleteAll();
    }

    public void incrementVisit(String url) {
        visitRepository.incrementVisit(url);
    }

    public long getVisitCount(String url) {
        return visitRepository.findByUrl(url).orElse(0L);
    }
}