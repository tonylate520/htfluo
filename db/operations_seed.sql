INSERT OR IGNORE INTO agencies (id,market_id,name,website) VALUES
('eu-commission','eu','European Commission','https://commission.europa.eu/'),
('us-fcc','us','Federal Communications Commission','https://www.fcc.gov/'),
('us-ftc','us','Federal Trade Commission','https://www.ftc.gov/'),
('us-fda','us','Food and Drug Administration','https://www.fda.gov/'),
('uk-opss','uk','Office for Product Safety and Standards','https://www.gov.uk/government/organisations/office-for-product-safety-and-standards'),
('uk-fsa','uk','Food Standards Agency','https://www.food.gov.uk/');

INSERT OR IGNORE INTO certifications (id,market_id,name,summary,official_url) VALUES
('ce','eu','CE marking','EU conformity marking used for products covered by harmonised legislation.','https://single-market-economy.ec.europa.eu/single-market/ce-marking_en'),
('fcc','us','FCC equipment authorization','US authorization framework for radio-frequency devices.','https://www.fcc.gov/engineering-technology/laboratory-division/general/equipment-authorization'),
('ukca','uk','UKCA marking','UK conformity marking route for products placed on the Great Britain market.','https://www.gov.uk/guidance/using-the-ukca-marking');

INSERT OR IGNORE INTO tariffs (market_id,hs_prefix,description,indicative_duty_rate,source_url,last_verified_at) VALUES
('us','85','Electrical machinery and equipment',3.0,'https://hts.usitc.gov/','2026-08-15'),
('us','61','Knitted apparel',12.0,'https://hts.usitc.gov/','2026-08-15'),
('eu','85','Electrical machinery and equipment',3.0,'https://taxation-customs.ec.europa.eu/customs-4/calculation-customs-duties/customs-tariff/eu-customs-tariff-taric_en','2026-08-15'),
('eu','61','Knitted apparel',12.0,'https://taxation-customs.ec.europa.eu/customs-4/calculation-customs-duties/customs-tariff/eu-customs-tariff-taric_en','2026-08-15'),
('uk','85','Electrical machinery and equipment',3.0,'https://www.gov.uk/trade-tariff','2026-08-15'),
('uk','61','Knitted apparel',12.0,'https://www.gov.uk/trade-tariff','2026-08-15');

INSERT OR IGNORE INTO source_documents (requirement_id,title,source_url,checked_at)
SELECT id,title,official_url,last_verified_at FROM requirements;

INSERT INTO audit_logs (entity_type,entity_id,action,actor)
SELECT 'requirement',CAST(id AS TEXT),'seeded','system' FROM requirements
WHERE NOT EXISTS (SELECT 1 FROM audit_logs WHERE entity_type='requirement' AND entity_id=CAST(requirements.id AS TEXT) AND action='seeded');
