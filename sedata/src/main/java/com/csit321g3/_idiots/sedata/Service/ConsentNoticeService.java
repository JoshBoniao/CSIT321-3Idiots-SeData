package com.csit321g3._idiots.sedata.Service;

import com.csit321g3._idiots.sedata.entity.ConsentNotice;
import com.csit321g3._idiots.sedata.Repository.ConsentNoticeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ConsentNoticeService {

    @Autowired
    private ConsentNoticeRepository consentNoticeRepository;

    // Create
    public ConsentNotice createConsentNotice(ConsentNotice notice) {
        if (notice.getCreated_at() == null) {
            notice.setCreated_at(LocalDateTime.now());
        }
        return consentNoticeRepository.save(notice);
    }

    // Read All
    public List<ConsentNotice> getAllConsentNotices() {
        return consentNoticeRepository.findAll();
    }

    // Read by ID
    public Optional<ConsentNotice> getConsentNoticeById(int id) {
        return consentNoticeRepository.findById(id);
    }

    // Update
    public ConsentNotice updateConsentNotice(int id, ConsentNotice newNotice) {
        return consentNoticeRepository.findById(id).map(existing -> {
            existing.setAssessment_id(newNotice.getAssessment_id());
            existing.setData_collected(newNotice.getData_collected());
            existing.setPurpose(newNotice.getPurpose());
            existing.setStored_in(newNotice.getStored_in());
            existing.setRetention_days(newNotice.getRetention_days());
            if (newNotice.getCreated_at() != null) {
                existing.setCreated_at(newNotice.getCreated_at());
            }
            return consentNoticeRepository.save(existing);
        }).orElse(null);
    }

    // Delete
    public boolean deleteConsentNotice(int id) {
        if (consentNoticeRepository.existsById(id)) {
            consentNoticeRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
