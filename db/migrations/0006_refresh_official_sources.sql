UPDATE requirements SET official_url = CASE official_url
  WHEN 'https://www.ftc.gov/business-guidance/industry/textiles-wool-fur' THEN 'https://www.ecfr.gov/current/title-16/chapter-I/subchapter-C/part-303'
  WHEN 'https://single-market-economy.ec.europa.eu/sectors/textiles-ecosystem/textile-labelling_en' THEN 'https://eur-lex.europa.eu/eli/reg/2011/1007/oj/eng'
  WHEN 'https://commission.europa.eu/business-economy-euro/doing-business-eu/eu-product-safety-and-labelling/product-safety/general-product-safety-regulation_en' THEN 'https://eur-lex.europa.eu/eli/reg/2023/988/oj/eng'
  WHEN 'https://food.ec.europa.eu/food-safety/chemical-safety/food-contact-materials/plastic-food-contact-materials_en' THEN 'https://eur-lex.europa.eu/eli/reg/2011/10/oj/eng'
  WHEN 'https://www.fda.gov/food/packaging-food-contact-substances-fcs/food-contact-substances-notifications' THEN 'https://www.hfpappexternal.fda.gov/scripts/fdcc/index.cfm?set=FCN'
  WHEN 'https://www.fda.gov/food/packaging-food-contact-substances-fcs/guidance-regulatory-guidance-food-contact-substances' THEN 'https://www.ecfr.gov/current/title-21/chapter-I/subchapter-B/part-174'
  WHEN 'https://www.fda.gov/food/packaging-food-contact-substances-fcs' THEN 'https://www.ecfr.gov/current/title-21/chapter-I/subchapter-B/part-174'
END
WHERE official_url IN (
  'https://www.ftc.gov/business-guidance/industry/textiles-wool-fur',
  'https://single-market-economy.ec.europa.eu/sectors/textiles-ecosystem/textile-labelling_en',
  'https://commission.europa.eu/business-economy-euro/doing-business-eu/eu-product-safety-and-labelling/product-safety/general-product-safety-regulation_en',
  'https://food.ec.europa.eu/food-safety/chemical-safety/food-contact-materials/plastic-food-contact-materials_en',
  'https://www.fda.gov/food/packaging-food-contact-substances-fcs/food-contact-substances-notifications',
  'https://www.fda.gov/food/packaging-food-contact-substances-fcs/guidance-regulatory-guidance-food-contact-substances',
  'https://www.fda.gov/food/packaging-food-contact-substances-fcs'
);

UPDATE articles SET source_url = CASE source_url
  WHEN 'https://www.ftc.gov/business-guidance/industry/textiles-wool-fur' THEN 'https://www.ecfr.gov/current/title-16/chapter-I/subchapter-C/part-303'
  WHEN 'https://single-market-economy.ec.europa.eu/sectors/textiles-ecosystem/textile-labelling_en' THEN 'https://eur-lex.europa.eu/eli/reg/2011/1007/oj/eng'
  WHEN 'https://commission.europa.eu/business-economy-euro/doing-business-eu/eu-product-safety-and-labelling/product-safety/general-product-safety-regulation_en' THEN 'https://eur-lex.europa.eu/eli/reg/2023/988/oj/eng'
  WHEN 'https://food.ec.europa.eu/food-safety/chemical-safety/food-contact-materials/plastic-food-contact-materials_en' THEN 'https://eur-lex.europa.eu/eli/reg/2011/10/oj/eng'
  WHEN 'https://www.fda.gov/food/packaging-food-contact-substances-fcs/food-contact-substances-notifications' THEN 'https://www.hfpappexternal.fda.gov/scripts/fdcc/index.cfm?set=FCN'
  WHEN 'https://www.fda.gov/food/packaging-food-contact-substances-fcs' THEN 'https://www.ecfr.gov/current/title-21/chapter-I/subchapter-B/part-174'
END
WHERE source_url IN (
  'https://www.ftc.gov/business-guidance/industry/textiles-wool-fur',
  'https://single-market-economy.ec.europa.eu/sectors/textiles-ecosystem/textile-labelling_en',
  'https://commission.europa.eu/business-economy-euro/doing-business-eu/eu-product-safety-and-labelling/product-safety/general-product-safety-regulation_en',
  'https://food.ec.europa.eu/food-safety/chemical-safety/food-contact-materials/plastic-food-contact-materials_en',
  'https://www.fda.gov/food/packaging-food-contact-substances-fcs/food-contact-substances-notifications',
  'https://www.fda.gov/food/packaging-food-contact-substances-fcs'
);

UPDATE source_documents SET
  source_url = CASE source_url
    WHEN 'https://www.ftc.gov/business-guidance/industry/textiles-wool-fur' THEN 'https://www.ecfr.gov/current/title-16/chapter-I/subchapter-C/part-303'
    WHEN 'https://single-market-economy.ec.europa.eu/sectors/textiles-ecosystem/textile-labelling_en' THEN 'https://eur-lex.europa.eu/eli/reg/2011/1007/oj/eng'
    WHEN 'https://commission.europa.eu/business-economy-euro/doing-business-eu/eu-product-safety-and-labelling/product-safety/general-product-safety-regulation_en' THEN 'https://eur-lex.europa.eu/eli/reg/2023/988/oj/eng'
    WHEN 'https://food.ec.europa.eu/food-safety/chemical-safety/food-contact-materials/plastic-food-contact-materials_en' THEN 'https://eur-lex.europa.eu/eli/reg/2011/10/oj/eng'
    WHEN 'https://www.fda.gov/food/packaging-food-contact-substances-fcs/food-contact-substances-notifications' THEN 'https://www.hfpappexternal.fda.gov/scripts/fdcc/index.cfm?set=FCN'
    WHEN 'https://www.fda.gov/food/packaging-food-contact-substances-fcs/guidance-regulatory-guidance-food-contact-substances' THEN 'https://www.ecfr.gov/current/title-21/chapter-I/subchapter-B/part-174'
    WHEN 'https://www.fda.gov/food/packaging-food-contact-substances-fcs' THEN 'https://www.ecfr.gov/current/title-21/chapter-I/subchapter-B/part-174'
  END,
  content_hash = NULL,
  latest_excerpt = NULL,
  last_http_status = NULL,
  last_error = NULL,
  checked_at = '2026-08-15'
WHERE source_url IN (
  'https://www.ftc.gov/business-guidance/industry/textiles-wool-fur',
  'https://single-market-economy.ec.europa.eu/sectors/textiles-ecosystem/textile-labelling_en',
  'https://commission.europa.eu/business-economy-euro/doing-business-eu/eu-product-safety-and-labelling/product-safety/general-product-safety-regulation_en',
  'https://food.ec.europa.eu/food-safety/chemical-safety/food-contact-materials/plastic-food-contact-materials_en',
  'https://www.fda.gov/food/packaging-food-contact-substances-fcs/food-contact-substances-notifications',
  'https://www.fda.gov/food/packaging-food-contact-substances-fcs/guidance-regulatory-guidance-food-contact-substances',
  'https://www.fda.gov/food/packaging-food-contact-substances-fcs'
);
