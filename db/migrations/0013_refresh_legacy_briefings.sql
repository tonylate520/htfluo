UPDATE articles SET
title = 'UK REACH supplier questionnaire for textiles',
excerpt = 'Use a material-specific supplier questionnaire to collect current UK REACH evidence for fabrics, finishes, prints and accessories.',
body = '## Ask about the exact material
Send the questionnaire against a controlled fabric, trim, coating or colour code. Require the supplier to identify the manufacturing site and version assessed. A declaration covering all products from a company is difficult to connect to the garment being imported.

## Questions to include
- Full material composition and intentional additives
- Dyes, finishes, coatings and printing chemistry
- Applicable UK restriction list and review date
- Substance of very high concern screening
- Test reports with sample and method identity
- Subcontracted wet processing or finishing
- Recycled content and source controls
- Change-notification contact and timing

## Review the response
Check that the answer covers accessories such as zips, buttons, elastic, prints and decorative parts. Compare listed tests with the actual risk: a fabric test may not cover a plated metal trim or PVC print. Treat blank fields and confidential formulation claims as unresolved, not as negative results.

## Decide when to test
Use targeted testing for high-risk colours, coatings, water-repellent finishes, leather-like materials, metal parts and suppliers with incomplete controls. Record why declarations alone are sufficient for lower-risk components.

## Keep evidence current
Link approved responses to the bill of materials and production season. Reissue the questionnaire after supplier, factory, formulation, finish or recycled-content changes and when the relevant UK restriction or candidate list changes.',
updated_at = '2026-08-30', source_url = 'https://www.hse.gov.uk/reach/'
WHERE slug = 'uk-textiles-reach';

UPDATE articles SET
title = 'UK WEEE registration readiness checklist',
excerpt = 'Prepare product classification, producer-role and sales data before approaching a UK WEEE compliance scheme or registration route.',
body = '## Fix the producer role
Document which business first places the electrical equipment on the UK market. Review private-label, importer and distance-selling arrangements rather than relying only on the manufacturer name shown on the product.

## Prepare the product dataset
- Product and internal SKU
- Household or non-household status
- Applicable equipment category
- Unit and packaging weight method
- Battery inclusion and separate obligations
- First UK sale date
- Sales channel and responsible legal entity
- Expected annual volume

## Choose the operational route
Determine whether scheme membership or another registration route is required for the business and volume. Confirm reporting periods, financing, take-back and evidence responsibilities before the first sale. Keep written confirmation of the category and producer decision.

## Check markings and systems
Approve the crossed-out wheeled-bin marking and date-marking approach where applicable. Ensure ERP or marketplace exports can report weight and units by period without manual reconstruction.

## Registration release gate
Do not treat a submitted application as completion. Record the registration or scheme identifier, effective date, reporting owner and renewal calendar. Reassess after a category, weight, battery, legal entity, private label or fulfilment route changes.',
updated_at = '2026-08-30', source_url = 'https://www.gov.uk/guidance/electrical-and-electronic-equipment-eee-producer-responsibility'
WHERE slug = 'uk-electronics-weee';

UPDATE articles SET
title = 'UK RoHS supplier evidence review',
excerpt = 'Review supplier RoHS declarations for scope, material identity, exemptions and change control before accepting them into a UK technical file.',
body = '## Check document identity
The declaration should identify the supplier, component or material code, issue date and restricted-substance framework reviewed. Reject statements that refer only to RoHS compliant products without naming the part or evidence scope.

## Review points
- Exact part, grade and revision
- Restricted substances and concentration limits
- Homogeneous-material basis
- Exemptions used and validity
- Analytical report references
- Manufacturing site coverage
- Authorised signatory and issue date
- Supplier change-notification commitment

## Compare with the bill of materials
Map every safety or compliance-critical component to a current record. Pay special attention to solder, cables, connectors, plated parts, pigments, displays, batteries and recycled plastics. One finished-product statement should not hide missing evidence for high-risk materials.

## Escalate weak evidence
Request composition data or targeted testing when declarations are generic, old, unsigned or based on an unclear exemption. Record why the selected sample represents production.

## File and refresh
Maintain an evidence index showing owner and next review date. Recheck after part, supplier, site, formulation or exemption changes, and verify that the imported model still matches the approved component list.',
updated_at = '2026-08-30', source_url = 'https://www.gov.uk/guidance/rohs-compliance-and-guidance'
WHERE slug = 'uk-electronics-rohs';

UPDATE articles SET
title = 'Responding to an FDA food-contact import query',
excerpt = 'Organize product identity, regulatory basis and intended-use evidence so an FDA admissibility question can be answered without rebuilding the file.',
body = '## Triage the question
Identify the shipment, entry line, product description and exact information requested. Freeze the affected lot while the importer, broker, supplier and regulatory owner agree on one response path.

## Response package
- Invoice, packing list and entry identifiers
- Manufacturer, importer and material grade
- Finished article description and intended food use
- Formulation or controlled composition reference
- Applicable regulation, FCN or exemption
- Time and temperature conditions
- Migration, purity or GMP evidence
- Lot and manufacturing-site traceability

## Explain the evidence chain
Show how the imported article matches the supplier letter and lawful basis. Do not submit a resin clearance as if it covered unidentified colourants, coatings or recycled inputs. Where formulation information is confidential, arrange a direct supplier response while keeping model and lot references consistent.

## Control communications
Use one owner for submissions and keep a dated copy of every document provided. Correct inconsistent descriptions before adding more evidence. Avoid claims broader than the supported food types or conditions of use.

## Close and learn
Record the outcome, release conditions and corrective actions. Update commercial descriptions, supplier requirements or pre-shipment checks so the same ambiguity does not recur on the next entry.',
updated_at = '2026-08-30', source_url = 'https://www.fda.gov/industry/import-program-food-and-drug-administration-fda'
WHERE slug = 'us-fcm-import';

UPDATE articles SET
title = 'Maintaining certificates for children textile products',
excerpt = 'Keep children product certificates aligned with current test reports, production lots, factories and material variants after initial launch.',
body = '## Treat certification as a live record
A certificate is only useful when it still describes the product being manufactured. Link retail model, age grade, factory, production date and applicable rules to the reports supporting the current construction.

## Maintenance file
- Current certificate and revision history
- Applicable rule matrix
- Accepted laboratory reports
- Material, colour and trim coverage
- Factory and production-lot mapping
- Tracking-label information
- Supplier and engineering change notices
- Complaint and corrective-action records

## Review product changes
Assess new fabrics, dyes, prints, buttons, zips, decorations and size ranges before production. Decide whether existing evidence covers the variant or whether new testing and a revised certificate are required. Record the comparison instead of grouping variants by name alone.

## Check availability
Confirm that importers, distributors and retailers can access the certificate in the required manner and that model identifiers match invoices and listings. Remove obsolete certificates from shared folders and supplier portals.

## Reissue triggers
Reissue after a material, factory, rule, laboratory report, age grade or product-identity change that affects the certified scope. Link any recall or corrective action to the certificate versions and lots involved.',
updated_at = '2026-08-30', source_url = 'https://www.cpsc.gov/Business--Manufacturing/Testing-Certification'
WHERE slug = 'us-textiles-children';

UPDATE articles SET
title = 'Proposition 65 supplier data for electronics',
excerpt = 'Collect useful California chemical and material data from electronics suppliers before deciding whether exposure analysis or a warning is needed.',
body = '## Ask for more than a warning statement
Request data for the exact component, material and formulation. A supplier statement that a product may require a Proposition 65 warning does not identify the listed chemical, concentration or exposure route needed for a defensible assessment.

## Supplier request
- Component, grade and manufacturing-site identity
- Listed chemical name and CAS number
- Concentration or analytical result
- Material location and accessibility
- Normal and foreseeable use conditions
- Date and Proposition 65 list version reviewed
- Test method and detection limit
- Change-notification obligation

## Prioritise components
Focus on cables, PVC, solder, batteries, coatings, adhesives, plastics and plated metal parts likely to create user exposure. Separate occupational, installation and consumer scenarios where they differ.

## Make the decision internally
Use supplier data as an input to the exposure assessment, not as a transfer of responsibility. Document the route, frequency and duration assumptions and the basis for warning or no-warning treatment.

## Keep channels aligned
Control California warning text across product, packaging, website and marketplace listings. Reassess after component, supplier, formulation, use or distribution changes and retain the underlying supplier version.',
updated_at = '2026-08-30', source_url = 'https://oehha.ca.gov/proposition-65'
WHERE slug = 'us-electronics-prop65';

UPDATE articles SET
title = 'Releasing US apparel care label artwork',
excerpt = 'Use a documented artwork release that connects the finished garment care instruction to testing, placement and the correct SKU.',
body = '## Freeze the garment specification
Approve fabric, lining, print, finish, trim and construction before finalising the care label. The instruction should reflect the assembled garment and a reasonable care method, not only the supplier recommendation for the main fabric.

## Artwork release inputs
- SKU and product description
- Supported washing and drying method
- Bleaching, ironing and professional-care instruction
- Test or technical basis
- Approved symbols and wording
- Fibre and origin information shown nearby
- Label material, attachment and placement
- Destination and language version

## Proof the label
Check sequence, spelling, symbols, legibility and permanence. Compare the sewn-label proof with packaging and online care claims. Verify that the artwork is mapped to the correct colour and construction variant.

## Sample production
Inspect bulk garments for label attachment, readability and correct SKU allocation. Test likely laundering where printing, transfer labels or attachment durability could fail.

## Control revisions
Block superseded artwork at the printer and factory. Reopen the care decision after fabric, dye, finish, trim, construction or supplier changes and retain a production sample or clear image with the release record.',
updated_at = '2026-08-30', source_url = 'https://www.ftc.gov/business-guidance/resources/clothes-captioning-complying-care-labeling-rule'
WHERE slug = 'us-textiles-care-label';

UPDATE articles SET
title = 'EU WEEE registration launch checklist',
excerpt = 'Coordinate national producer registration, scheme evidence, product weights and sales reporting before electronics go live in an EU destination.',
body = '## Plan country by country
List every member state where the equipment will be sold and identify the producer for that route. Distance sales, importers and private-label arrangements can produce different answers, so do not use one registration decision for all EU markets.

## Registration inputs
- Producer legal entity and contact details
- Equipment category and product description
- Household or professional status
- Unit and material weight methodology
- Battery inclusion
- Expected launch date and annual volume
- Authorised representative where required
- Compliance scheme or national-register route

## Build reporting data before launch
Assign stable product codes and weights in the sales system. Confirm that marketplace, distributor and direct sales can be separated by destination and reporting period. Document how returns and corrections are handled.

## Check product information
Approve the crossed-out-bin marking and any required date or producer identification. Keep registration evidence separate from CE documentation while linking both to the same model.

## Launch gate
Record registration numbers, effective dates, scheme agreements, financing route and reporting owner. Reassess before entering a new country or changing seller, fulfilment model, equipment category, weight or battery configuration.',
updated_at = '2026-08-30', source_url = 'https://environment.ec.europa.eu/topics/waste-and-recycling/waste-electrical-and-electronic-equipment-weee_en'
WHERE slug = 'eu-electronics-weee';

UPDATE articles SET
title = 'REACH test planning for apparel materials',
excerpt = 'Choose risk-based chemical tests from the apparel bill of materials, finish chemistry, supplier evidence and intended user.',
body = '## Start with material risk
Map fabrics, prints, coatings, foam, elastic, metal trims, artificial leather, packaging and recycled inputs. Record fibre, colour, finish, supplier and intended user. The same test panel is not equally useful for every component.

## Build the analyte plan
- Applicable restrictions for the article and use
- Substance of very high concern concerns
- Known dye, finish and coating chemistry
- Metal plating and skin-contact duration
- PVC, rubber and plasticiser risk
- Water-repellent or stain-resistant treatment
- Recycled-content contaminants
- Children or vulnerable-user exposure

## Select representative samples
Choose worst cases by colour, finish, material composition and supplier. Explain how tested samples cover untested variants. Composite testing can hide a failing component and should be used only when the method and decision allow it.

## Read the full report
Verify sample identity, extraction, method, detection limit and restricted-substance list version. Investigate unexpected detections and borderline results rather than relying solely on the laboratory pass field.

## Maintain coverage
Connect reports to approved material codes and supplier declarations. Reassess after colour, finish, factory, trim, supplier or recycled-content changes and when the applicable restriction list changes.',
updated_at = '2026-08-30', source_url = 'https://environment.ec.europa.eu/topics/chemicals/reach-regulation_en'
WHERE slug = 'eu-textiles-reach';
