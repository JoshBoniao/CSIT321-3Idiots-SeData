package com.csit321g3._idiots.sedata.Service;

import com.csit321g3._idiots.sedata.entity.ConsentRecord;
import com.csit321g3._idiots.sedata.Repository.ConsentRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ConsentRecordService {

    @Autowired
    private ConsentRecordRepository consentRecordRepository;

    // Create
    public ConsentRecord createConsentRecord(ConsentRecord record) {
        if (record.getDecided_at() == null) {
            record.setDecided_at(LocalDateTime.now());
        }
        return consentRecordRepository.save(record);
    }

    // Read All
    public List<ConsentRecord> getAllConsentRecords() {
        return consentRecordRepository.findAll();
    }

    // Read by ID
    public Optional<ConsentRecord> getConsentRecordById(int id) {
        return consentRecordRepository.findById(id);
    }

    // Update
    public ConsentRecord updateConsentRecord(int id, ConsentRecord newRecord) {
        return consentRecordRepository.findById(id).map(existing -> {
            existing.setNotice_id(newRecord.getNotice_id());
            existing.setStudent_id(newRecord.getStudent_id());
            existing.setDecision(newRecord.getDecision());
            if (newRecord.getDecided_at() != null) {
                existing.setDecided_at(newRecord.getDecided_at());
            }
            return consentRecordRepository.save(existing);
        }).orElse(null);
    }

    // Delete
    public boolean deleteConsentRecord(int id) {
        if (consentRecordRepository.existsById(id)) {
            consentRecordRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
