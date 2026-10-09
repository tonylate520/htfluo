INSERT OR IGNORE INTO articles (slug,title,excerpt,body,category,market_id,product_id,published_at,updated_at,source_url) VALUES
('eu-electronics-declaration-of-conformity','How to prepare an EU Declaration of Conformity for electronics','Build a model-specific declaration that names the responsible manufacturer, applicable EU legislation and the evidence used to support CE marking.','## What the declaration does
The EU Declaration of Conformity is the manufacturer''s signed statement that the identified product meets the applicable Union harmonisation legislation. It is not a laboratory certificate and should not be drafted by copying a supplier template before the product scope and conformity route are settled.

## Identify the product precisely
Use the commercial model, type or batch information needed to distinguish the declared product from other variants. Align this identity with the rating label, technical file, test reports and customer documentation. If several models share one declaration, document the technical basis for grouping them and make the covered variants unambiguous.

## Required drafting inputs
- Manufacturer name and full postal address
- Product identification and, where useful, a product image
- Statement that the declaration is issued under the manufacturer''s sole responsibility
- Applicable EU legislation for the exact product functions
- Harmonised standards or other technical specifications actually used
- Notified-body details and certificate where that route applies
- Signatory name, function, place, date and signature

## Cross-check before signature
Compare every legislative reference and standard edition with the applicability matrix and reports. Do not list directives simply because they often apply to electronics. Confirm that radio, EMC, electrical safety, RoHS and other claims match the marketed configuration and that referenced evidence has no unresolved failures or model mismatches.

## Language and availability
Provide translations where required by the destination authority or applicable legislation and keep the signed master under document control. The declaration, or a simplified declaration where legislation permits it, should be supplied or made available in the required manner. Define a retention owner and ensure an authority request can be answered after distributors, staff or systems change.

## Change trigger
Reissue or review the declaration after changes to model identity, manufacturer details, applicable law, standards, safety-critical components, radio parameters or conformity-assessment route. Updating the date without reassessing the evidence does not keep a declaration current.','Documentation','eu','electronics','2026-08-17','2026-08-17','https://single-market-economy.ec.europa.eu/single-market/ce-marking_en'),

('eu-radio-equipment-red-assessment','EU Radio Equipment Directive assessment for connected devices','Map every radio function, safety risk and spectrum use to the RED evidence needed for the final connected product.','## Confirm that the product is radio equipment
List each intentional radio interface, frequency range, antenna and operating mode. Bluetooth, Wi-Fi, cellular, NFC, proprietary links and radio modules can bring a product into the Radio Equipment Directive even when connectivity is not its primary selling point. Record any equipment or function-specific exclusions.

## Work through the essential requirements
The assessment should address protection of health and safety, electromagnetic compatibility and effective use of radio spectrum. Additional essential requirements can apply to particular categories or features. Connected-device security, privacy, fraud protection, emergency services and software controls require a current applicability review rather than a legacy radio test plan.

## Evidence map
- Final hardware, enclosure, antenna and power configuration
- Supported bands, power levels and simultaneous-transmission modes
- Radio, EMC and safety standards with current editions
- RF exposure assessment for intended users and installation distances
- Firmware and software controls that affect compliance
- Module approvals plus host integration and final-product evidence
- User restrictions, installation information and destination limitations

## Module integration is not the end
A module certificate can reduce work but does not automatically cover the host product, antenna change, simultaneous transmission, exposure conditions or final emissions. Compare the module''s approved conditions with the actual integration and document every difference.

## Software and production control
Control firmware versions, regional settings and updates that can change frequency, duty cycle or output power. Prevent users or service tools from enabling unauthorised modes. Connect production checks to the assessed RF path, antenna, shielding and software configuration.

## Launch decision
Release only when the technical documentation, EU Declaration of Conformity, CE marking, economic-operator details and instructions agree with the final product. Reassess after antenna, enclosure, power, radio module, firmware or intended-use changes.','Certification','eu','electronics','2026-08-17','2026-08-17','https://single-market-economy.ec.europa.eu/sectors/electrical-and-electronic-engineering-industries-eei/radio-equipment-directive-red_en'),

('eu-food-contact-member-state-rules','When EU food-contact materials need a member-state rule review','Union-wide food-contact rules are only the first layer; material-specific national measures can change the evidence needed in each destination.','## Why the destination still matters
The EU framework sets general safety, traceability and manufacturing principles, and some materials have harmonised specific measures. Other materials and issues remain partly regulated through national legislation or official recommendations. A conclusion for one member state should not be assumed to cover every EU destination.

## Start with material and market
Break the finished article into plastics, paper and board, metals, coatings, inks, adhesives, silicones, rubber, recycled inputs and other layers. List the member states where the product will be placed on the market. Use that matrix to identify national composition rules, positive lists, limits, declarations, testing conventions and language requirements.

## National review file
- Exact material and article description
- Target member states and distribution route
- Applicable EU measures and identified regulatory gaps
- National legal texts or competent-authority guidance
- Substance restrictions, purity criteria and migration limits
- Required declarations, language and supporting records
- Differences that require destination-specific SKUs or instructions

## Avoid false harmonisation
A supplier statement saying EU compliant may address only the Plastics Regulation or a limited material layer. Ask which jurisdictions, materials and use conditions were evaluated. For paper, inks, coatings or complex multi-material articles, document why the selected national reference is relevant and whether other destinations take a different approach.

## Testing strategy
Do not create a separate broad test panel for every country without first mapping the rules. Combine common conditions where technically justified, then add analytes or documentation for national differences. Keep the test rationale connected to food type, time, temperature and article construction.

## Commercial decision
Resolve national gaps before promising EU-wide distribution. Where evidence is incomplete, narrow the destination list, restrict intended use or commission specialist review. Monitor national measures because a Union-level source alone will not reveal every change.','Market access','eu','food-contact','2026-08-17','2026-08-17','https://food.ec.europa.eu/food-safety/chemical-safety/food-contact-materials/legislation_en'),

('eu-textile-non-preferential-origin','Non-preferential origin records for textile imports into the EU','Determine textile origin from the applicable production rule and retain manufacturing evidence that supports customs declarations and markings.','## Origin is a legal conclusion
Country of shipment, supplier address and the location of final packing do not necessarily determine non-preferential origin. The conclusion depends on the product classification and the last substantial, economically justified processing carried out in an equipped undertaking. Textile-specific processing rules can make the manufacturing sequence decisive.

## Fix classification and production flow
Confirm the customs classification of the finished textile article, then map yarn production, fabric formation, dyeing, printing, cutting, sewing and finishing by country. Identify which operation is relied on to confer origin and check it against the applicable rule rather than using a generic made in statement.

## Evidence pack
- Finished-product tariff classification and rationale
- Bill of materials with material origins
- Factory names and countries for each production stage
- Purchase orders, production records and subcontractor evidence
- Cutting, sewing, knitting, weaving or other processing details
- Cost and value information where the rule requires it
- Supplier origin declaration with product and period clearly identified

## Keep customs and consumer data aligned
The customs origin conclusion should agree with invoice descriptions, import declarations, packaging and any voluntary origin claim. Preferential origin under a trade agreement is a separate analysis with separate evidence; eligibility for tariff preference should not be inferred from the non-preferential marking conclusion.

## Supplier verification
Ask suppliers to explain the manufacturing facts behind their origin statement. A certificate that merely repeats the country is weak if it omits material sourcing and processing. Use contractual change notification for factory, fabric and subcontractor changes.

## Review triggers
Recheck origin when classification, production sequence, factory, fabric source or trade route changes. Preserve the rule version and decision date so a customs query can be answered with the facts in force for the imported shipment.','Customs','eu','textiles','2026-08-17','2026-08-17','https://taxation-customs.ec.europa.eu/customs-4/international-affairs/origin-goods/non-preferential-origin_en'),

('us-electronics-energy-conservation','US federal energy standards review for electronic products','Screen covered products early, then align the DOE test procedure, certification data and marketed basic model before import.','## Screen for a covered product
Do not assume that a small electronic device falls outside federal energy rules. Review the product''s function against current Department of Energy covered consumer products and commercial or industrial equipment. External power supplies, battery chargers and equipment embedded in a larger system may require a separate analysis.

## Define the regulated model
Identify the basic model and all individual models represented by it. Grouping decisions should be supported by design and performance facts, not only a shared marketing family. Record rated input, output, operating modes, controls, accessories and software settings that can affect measured energy use.

## Compliance workflow
- Confirm the applicable conservation standard and effective date
- Select the current DOE test procedure and required representations
- Define the tested or represented basic model
- Use an appropriate laboratory and controlled production sample
- Review sampling, calculations and any permitted alternative method
- Submit required certification data before distribution where applicable
- Align labels, catalogues and online energy claims with certified values

## Imports and private labels
Assign responsibility among manufacturer, importer and private-label owner. Contract terms should cover model identity, test access, certification submission, design changes and record retention. A supplier''s overseas report may not use the applicable DOE method or represent the imported configuration.

## Software-controlled performance
Document default modes and controls that influence energy consumption. Firmware updates, regional settings or user-selectable modes can undermine the represented result. Compliance settings should persist in normal distribution and use, not only during a prepared laboratory test.

## Change control
Reassess after changes to power supply, battery, charger, control board, firmware, capacity or represented performance. Hold shipment when certification records and marketed model numbers do not match.','Testing','us','electronics','2026-08-17','2026-08-17','https://www.energy.gov/eere/buildings/appliance-and-equipment-standards-program'),

('us-electronics-importer-compliance-file','Building a US electronics importer compliance file','Organize federal, state, customs and supplier evidence around the exact imported electronic model and responsible US business.','## Start with agency jurisdiction
US electronics can involve the FCC, CPSC, Department of Energy, customs authorities and state rules. Build an applicability matrix from the product''s radio functions, intended users, power system, materials and claims. Record why a rule is applicable or excluded rather than storing unrelated certificates.

## Fix the imported identity
Use one controlled model mapping across purchase orders, invoices, FCC records, test reports, packaging and online listings. Document private-label relationships and supplier engineering numbers. Customs or agency review becomes slower when the importer cannot connect the retail model to the tested construction.

## Core file
- Product specification, photographs and model hierarchy
- Agency applicability and responsible-party matrix
- FCC authorization and host-integration evidence where relevant
- Product safety risk assessment and applicable certificates
- Energy-efficiency test and certification records where applicable
- Origin analysis, entry description and marking approval
- State chemical or warning assessment
- Supplier declarations, change notices and production controls

## Test the evidence chain
Check laboratory scope, sample configuration, standards, dates and pass criteria. Supplier documents should identify the exact component or finished product. Translate technical findings into release conditions: approved antennas, power supplies, warnings, labels and firmware.

## Entry readiness
Align invoice and packing-list descriptions with product function and model. Keep regulatory records accessible before arrival rather than requesting them after a hold. Define who answers agency questions and who can obtain confidential supplier data quickly.

## Maintain the file
Use change control for components, enclosure, software, factory and claims. Review complaints and corrective actions by production lot. An importer file is operational only when it identifies owners, open gaps and the next review trigger.','Documentation','us','electronics','2026-08-17','2026-08-17','https://www.cpsc.gov/Business--Manufacturing/Business-Education'),

('us-food-contact-gmp-controls','US good manufacturing practice controls for food-contact articles','Translate the general GMP expectation in 21 CFR 174.5 into controlled materials, processes, specifications and release records.','## GMP supports the regulatory conclusion
A substance may have a lawful food-contact basis, but the finished material must also be manufactured at a purity suitable for its intended use and used only in the amount reasonably required to achieve its technical effect. The compliance file should connect formulation status to repeatable production controls.

## Define approved inputs
Maintain controlled specifications for resins, additives, colorants, coatings, inks, adhesives and processing aids. Identify supplier, grade, relevant purity or food-contact limitation and change-notification requirement. Receiving controls should prevent an unapproved substitute from entering production.

## Process controls
- Master formulation and permitted tolerances
- Mixing, curing, drying and temperature parameters
- Controls for rework, recycled inputs and contamination
- Cleaning and line-clearance procedures
- In-process checks and finished-product release criteria
- Lot coding linking raw materials to shipped articles
- Nonconformance, investigation and corrective-action records

## Match controls to intended use
Temperature, food type, duration and repeated use affect which substances and process residues matter. Define manufacturing limits that preserve the basis used in the regulatory status assessment and migration evaluation. A process change can alter residuals even when the ingredient list is unchanged.

## Supplier and contract manufacturing oversight
Quality agreements should identify specifications, records, audit rights and change communication. Verify that contract manufacturers use the approved formulation and process. A customer-facing status letter cannot compensate for uncontrolled production.

## Release and review
Release each lot against defined acceptance criteria and retain records for investigation. Review GMP controls after formulation, equipment, site, supplier, recycled-content or use-condition changes, and when complaints suggest taste, odour, contamination or migration problems.','Manufacturing','us','food-contact','2026-08-17','2026-08-17','https://www.ecfr.gov/current/title-21/chapter-I/subchapter-B/part-174'),

('us-textile-country-of-origin-label','US country-of-origin labeling for textile products','Connect the textile origin determination to a conspicuous, durable label and consistent import documentation before production artwork is released.','## Determine origin before writing the label
Textile origin can depend on fibre, yarn, fabric and assembly operations under product-specific rules. Map the manufacturing sequence and confirm classification before accepting a supplier''s proposed country. Cutting, sewing, knitting and other operations do not have the same effect for every product.

## Label placement and form
Review the requirements that apply to the textile product and its construction. Country-of-origin information must be legible, conspicuous and sufficiently permanent for the required period. Placement can be product-specific, and packaging information does not always replace a label on the article.

## Artwork inputs
- Exact US origin conclusion and supporting rule
- Manufacturer or dealer identity information as applicable
- Fibre content and care-label data controlled from the same SKU
- Required wording and language
- Label material, attachment method and durability evidence
- Placement approval on the finished product
- Treatment of sets, reversible products and packaged goods

## Import-document consistency
Compare the sewn label with invoices, packing lists, entry data and product pages. A mismatch can create a customs issue even when one version is correct. Do not confuse preferential trade-agreement eligibility with the origin statement required on the product.

## Supplier evidence
Retain factory and production facts behind the declared country, not only a signed conclusion. Use change notifications for factory moves, subcontracting, fabric sourcing and construction changes. Sample bulk production to confirm the approved label is attached to the correct SKU.

## Release gate
Hold production when origin analysis is incomplete, proposed wording is ambiguous, or placement is hidden by normal packaging or use. Preserve the decision and artwork version for the shipment record.','Labeling','us','textiles','2026-08-17','2026-08-17','https://www.cbp.gov/trade/rulings/informed-compliance-publications/marking-country-origin-us-imports'),

('uk-electronics-importer-identification','UK importer identification for electronic products','Decide who is the UK importer, then place and retain the required identity information without breaking the product evidence chain.','## Identify the importer from the transaction
The importer is determined by the supply arrangement and applicable product legislation, not by whichever company is convenient to print on the label. Map the manufacturer, buyer, customs declarant, fulfilment provider and first UK business placing the product on the market. Record separate arrangements for Great Britain and Northern Ireland where relevant.

## Information to control
Confirm the required importer name, registered trade name or mark and contact address under each applicable regime. Decide whether information must appear on the product, packaging or accompanying document and whether any transitional placement option remains available. Use an address where official correspondence can be received and acted on.

## Importer file
- Written role and territory determination
- Manufacturer and product model mapping
- Importer legal name, address and artwork approval
- Declaration and conformity evidence access
- Verification of markings and instructions
- Complaint, incident and authority-contact procedure
- Retention and change-control responsibilities

## Verify before placing on the market
The importer should check that the manufacturer completed the conformity assessment, prepared technical documentation and declaration, applied required markings and supplied traceability and safety information. Missing evidence should become a release hold, not a promise to collect documents later.

## Online and private-label sales
Keep marketplace seller data, product listings and physical product information consistent. A fulfilment or platform service does not automatically assume the importer obligation. Private labeling can also change the economic-operator analysis and should be reviewed before artwork is approved.

## Change triggers
Reassess after changes to seller, Incoterms, fulfilment route, territory, private label or UK business entity. Update both artwork and internal responsibility records so the contact shown with the product remains able to perform the importer duties.','Market access','uk','electronics','2026-08-17','2026-08-17','https://www.gov.uk/guidance/product-safety-for-businesses-a-to-z-of-industry-guidance'),

('uk-food-contact-declaration-of-compliance','Preparing a UK food-contact Declaration of Compliance','Tie the declaration to the exact material, lawful basis, migration evidence and safe-use conditions for the relevant UK market.','## Define the declaration scope
Identify the finished article or intermediate material, supplier grade, production site and date or batch range covered. Separate Great Britain and Northern Ireland requirements where the underlying rules or references differ. Avoid broad declarations that cannot be tied to the material purchased by the customer.

## Build from supporting evidence
The declaration should be the readable conclusion of a controlled file containing composition data, supplier evidence, regulatory review, migration testing, GMP information and intended-use assumptions. Confirm that every cited restriction or limit is addressed for the final material construction.

## Drafting inputs
- Business identity and address of the issuing operator
- Precise material or article identification
- Date and document version
- Statement of compliance with the applicable framework
- Substances with restrictions and relevant supporting information
- Food types, time and temperature conditions covered
- Functional-barrier, repeat-use or other limitations
- Information needed by the downstream user to remain compliant

## Review the use claim
Compare the declaration with sales claims and instructions. Evidence for room-temperature dry food does not support hot-fill, fatty food, microwave or repeated-use claims. State exclusions plainly enough for the customer to select and use the article correctly.

## Confidential information
Protect formulation details while still giving the downstream business sufficient information to perform its compliance work. Use controlled substance references or direct confidential exchange where necessary. A declaration that omits all restricted-substance information may be unusable even if the supplier holds data internally.

## Reissue triggers
Review after formulation, supplier, production process, recycled-content, test method, legal reference or intended-use changes. Keep the signed version and supporting records linked to shipped lots.','Documentation','uk','food-contact','2026-08-17','2026-08-17','https://www.food.gov.uk/business-guidance/food-contact-materials-regulations'),

('uk-children-clothing-safety','UK children clothing safety review before launch','Assess cords, small parts, flammability, chemicals and foreseeable behaviour against the final garment and its real age range.','## Define the child user
Use sizing, design, marketing images and likely behaviour to identify the age group. A garment promoted as family, novelty or costume wear can still be a children''s product. Consider climbing, running, mouthing, pulling and sleeping where foreseeable.

## Mechanical hazards
Review drawstrings, functional cords, decorative cords, toggles, buttons, sequins, zips and sharp components. Measure and test the final construction, including after laundering or reasonable wear. Small detachable parts are particularly important for younger children, while waist and hood cords can create snagging or strangulation hazards.

## Safety evidence
- Product specification and intended age range
- Cord, drawstring and attachment measurements
- Small-component strength and accessibility results
- Fabric and finished-garment flammability review
- Chemical evidence for dyes, prints and metal accessories
- Warning, sizing and care information
- Production sampling and batch traceability plan

## Standards and risk assessment
Use relevant standards to support the assessment, but verify their scope and edition. A cord standard does not address flammability or chemical exposure. Record hazards outside the selected methods and explain how design, testing or information controls them.

## Design before warning
Remove avoidable cords, sharp points and detachable decorations rather than relying on supervision warnings. Check that decorative features do not undermine safety after washing. Warnings should not contradict the product''s appearance or likely use.

## Bulk-production release
Inspect production measurements, attachments and material substitutions against the approved sample. Keep complaint and incident procedures ready to identify affected lots and take corrective action. Reassess after trim, construction, age grading or supplier changes.','Product safety','uk','textiles','2026-08-17','2026-08-17','https://www.gov.uk/guidance/product-safety-advice-for-businesses'),

('uk-textile-rules-of-origin-evidence','UK textile rules-of-origin evidence for importers','Map materials and manufacturing operations to the relevant origin rule, then retain enough supplier evidence to support customs treatment.','## Choose the origin question
Separate non-preferential origin, used for matters such as general customs origin, from preferential origin claimed under a trade agreement. A product can have one non-preferential origin yet fail to qualify for a tariff preference because the agreement uses a different product-specific rule.

## Classify and map production
Confirm the finished textile classification and the countries where fibre, yarn, fabric, dyeing, cutting, sewing and finishing occur. Read the rule for that tariff heading and agreement. Terms such as manufacture from yarn, double transformation, value limit and specific process must be applied to actual production facts.

## Supplier evidence file
- Finished-product tariff code and origin rule
- Bill of materials with tariff codes and origin status
- Yarn, fabric and trim supplier declarations
- Factory and subcontractor production records
- Cutting, sewing, knitting, weaving and finishing locations
- Value calculations where the rule uses thresholds
- Proof-of-origin document and validity checks

## Do not rely on shipment route
Direct shipment from a partner country does not prove origin. Transshipment, warehousing and minimal operations can affect evidence requirements without conferring origin. Verify the producer and processing rather than the exporter''s address alone.

## Claims and record retention
Check that invoice statements or other proof use the correct wording, reference and period. Ensure the person making the claim has the evidence and authority required. Retain the calculation, supplier documents and rule version for the relevant customs retention period.

## Change control
Recalculate after factory, fabric, yarn, trim, value or classification changes. If evidence is incomplete, do not claim preferential duty merely because the commercial supplier expects eligibility.','Customs','uk','textiles','2026-08-17','2026-08-17','https://www.gov.uk/guidance/check-your-goods-meet-the-rules-of-origin');

UPDATE articles
SET source_url = 'https://www.food.gov.uk/business-guidance/food-contact-materials-regulations'
WHERE source_url = 'https://www.food.gov.uk/business-guidance/food-contact-materials';

UPDATE requirements
SET official_url = 'https://www.food.gov.uk/business-guidance/food-contact-materials-regulations'
WHERE official_url = 'https://www.food.gov.uk/business-guidance/food-contact-materials';

UPDATE source_documents
SET source_url = 'https://www.food.gov.uk/business-guidance/food-contact-materials-regulations'
WHERE source_url = 'https://www.food.gov.uk/business-guidance/food-contact-materials';
