import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export type Language = 'hu' | 'en';

const STORAGE_KEY = 'mf-lang';

const pairs = [
  ['Home', 'Főoldal'],
  ['About', 'Rólunk'],
  ['About us', 'Rólunk'],
  ['Services', 'Szolgáltatások'],
  ['References', 'Referenciák'],
  ['Machine Park', 'Géppark'],
  ['Contact', 'Kapcsolat'],
  ['Request a quote', 'Ajánlatkérés'],
  ['Request your quote.', 'Kérje ajánlatát.'],
  ['Precision in metal', 'Precízió a fémben'],
  ['Main navigation', 'Főmenü'],
  ['Mobile navigation', 'Mobil menü'],
  ['Language selector', 'Nyelvválasztó'],
  ['Theme mode', 'Megjelenés'],
  ['Dark / light', 'Sötét / világos'],
  ['Switch to light theme', 'Váltás világos témára'],
  ['Switch to dark theme', 'Váltás sötét témára'],
  ['Theme: light - click to switch', 'Téma: világos - kattintson a váltáshoz'],
  ['Theme: dark - click to switch', 'Téma: sötét - kattintson a váltáshoz'],
  ['Menu', 'Menü'],
  ['Hungarian', 'Magyar'],
  ['English', 'Angol'],
  ['Privacy policy', 'Adatvédelmi tájékoztató'],
  ['Quick links', 'Gyors linkek'],
  ['All rights reserved.', 'Minden jog fenntartva.'],
  ['MetalFusion. All rights reserved.', 'MetalFusion. Minden jog fenntartva.'],
  ['Precision machining · Budapest', 'Precíziós megmunkálás · Budapest'],
  ['CNC milling', 'CNC marás'],
  ['CNC turning', 'CNC esztergálás'],
  ['Secondary machining', 'Egyéb megmunkálás'],
  ['Assembly', 'Összeszerelés'],
  ['Quality assurance', 'Minőségbiztosítás'],
  ['Materials we machine', 'Anyagok, amelyekkel dolgozunk'],
  ['Steel and stainless steel', 'Acél, rozsdamentes acél'],
  ['Aluminium and brass', 'Alumínium, sárgaréz'],
  ['Engineering plastics', 'Műanyagok'],
  ['Budapest, District X, Kozma Street', 'Budapest 10. ker. Kozma utca'],
  ['1108 Budapest, Kozma Street', '1108 Budapest, Kozma utca'],
  ['MetalFusion home', 'MetalFusion főoldal'],

  ['Custom manufacturing • Precision • Reliability', 'Egyedi gyártás • Precízió • Megbízhatóság'],
  ['Custom low- and high-volume component manufacturing', 'Egyedi kis- és nagyszériás alkatrészgyártás'],
  ['high quality at a competitive price', 'magas minőségben, megfizethető áron'],
  ['Precision machining with modern equipment, experienced specialists and reliable', 'Precíziós megmunkálás modern gépparkkal, tapasztalt szakemberekkel és megbízható'],
  ['delivery dates.', 'határidővel.'],
  ['Precision machining with modern equipment, experienced specialists and reliable delivery dates.', 'Precíziós megmunkálás modern gépparkkal, tapasztalt szakemberekkel és megbízható határidővel.'],
  ['MetalFusion - Precision CNC component manufacturing in Budapest', 'MetalFusion — precíziós CNC alkatrészgyártás Budapesten'],
  ['MetalFusion – Precision CNC component manufacturing', 'MetalFusion – precíziós CNC alkatrészgyártás'],
  ['MetalFusion – Custom low- and high-volume CNC component manufacturing in Budapest. Precision machining and reliable delivery.', 'MetalFusion – egyedi kis- és nagyszériás CNC alkatrészgyártás Budapesten. Precíziós megmunkálás és megbízható szállítás.'],
  ['Custom low- and high-volume CNC component manufacturing in Budapest. Precision machining and reliable delivery.', 'Egyedi kis- és nagyszériás CNC alkatrészgyártás Budapesten. Precíziós megmunkálás és megbízható szállítás.'],
  ['Custom low- and high-volume CNC machining, prototype manufacturing and tooling from technical drawings or 3D models.', 'Egyedi kis- és nagyszériás CNC megmunkálás, prototípusgyártás és szerszámgyártás műhelyrajz vagy 3D modell alapján.'],
  ['Our services', 'Szolgáltatásaink'],
  ['Precision', 'Precizitás'],
  ['Reliability', 'Megbízhatóság'],
  ['Flexibility', 'Rugalmasság'],
  ['Experience', 'Tapasztalat'],
  ['Accurate, high-quality production on modern machining centres.', 'Pontosság és minőség modern megmunkálóközpontokkal.'],
  ['Clear deadlines, dependable delivery and predictable communication.', 'Tartjuk a határidőket, számíthat ránk.'],
  ['Tailored solutions for one-off parts, prototypes and series production.', 'Egyedi igényekre szabott megoldások.'],
  ['Years of metalworking knowledge across demanding industrial projects.', 'Évek óta a fémiparban, széleskörű szakértelemmel.'],
  ['Real solutions for real production projects', 'Valós megoldások, valós projektek'],
  ['View all references', 'Összes referencia megtekintése'],
  ['High-precision CNC milling on 3-, 4- and 5-axis machines', 'Nagy pontosságú CNC marás 3-, 4- és 5-tengelyes gépekkel'],
  ['Low- and high-volume turning for complex components', 'Kis- és nagyszériás esztergálás komplex alkatrészek gyártása'],
  ['Grinding, drilling, threading, welding and surface treatment', 'Köszörülés, fúrás, menetvágás, hegesztés, felületkezelés'],
  ['Machine builds, modules and complete industrial equipment', 'Gépösszeállítás, modulok és komplett berendezések'],
  ['3D measurement and precise quality control', 'Mérések 3D mérőgéppel, precíz minőségellenőrzés'],
  ['Request a', 'Kérjen'],
  ['quote', 'ajánlatot'],
  ['for your project', 'projektjére!'],
  ['Send a technical drawing or 3D model and we will respond within 24 hours.', 'Műhelyrajz vagy 3D modell, és 24 órán belül válaszolunk.'],

  ['Workshop, machines and engineers', 'Műhely, gépek, mérnökök'],
  ['through one partner.', '— egy partnerrel.'],
  ['Active workshop · since 2010', 'Aktív műhely · 2010 óta'],
  ['Complete mechanical manufacturing', 'Komplett mechanikai gyártás'],
  ['Who we are', 'Kik vagyunk'],
  ['About us - MetalFusion CNC workshop', 'Rólunk — MetalFusion CNC műhely'],
  ['For more than a decade, we have manufactured CNC components in Budapest. Complete mechanical production, precise execution and documented quality.', 'Több mint egy évtizede gyártunk CNC alkatrészeket Budapesten. Komplett mechanikai gyártás, precíz kivitelezés és dokumentált minőség.'],
  ['A partner that turns', 'Olyan partner, amelyik'],
  ['technical drawings into parts, not assumptions', 'a műhelyrajzból nem feltevést, hanem alkatrészt'],
  ['The principles behind our production.', 'Elvek, amelyek mentén gyártunk.'],
  ['Our principles', 'Elveink'],
  ['Our story', 'Történetünk'],
  ['15+ years, step by step.', '15+ év — lépésről lépésre.'],
  ['Workshop', 'Műhely'],
  ['Workshop & capabilities', 'Műhely & képességek'],
  ['Modern machines, disciplined process.', 'Korszerű géppark, fegyelmezett folyamat.'],
  ['Machine park', 'Géppark'],
  ['Materials', 'Anyagok'],
  ['Parameters', 'Paraméterek'],
  ['Let\'s talk', 'Beszéljünk'],
  ['Let\'s work together on your next project.', 'Dolgozzunk együtt a következő projektjén.'],
  ['Phone', 'Telefon'],
  ['Email', 'E-mail'],

  ['Machine Park - CNC machining centres and lathes | MetalFusion', 'Géppark — CNC megmunkálóközpontok és esztergagépek | MetalFusion'],
  ['Hurco and Doosan CNC machining centres, a Hwacheon driven-tool lathe and precision measuring equipment in our Budapest workshop.', 'Hurco és Doosan CNC megmunkálóközpontok, Hwacheon hajtott szerszámos eszterga és precíziós mérőeszközök budapesti műhelyünkben.'],
  ['Modern CNC capacity', 'Modern CNC kapacitás'],
  ['in our Budapest workshop.', 'budapesti műhelyünkben.'],
  ['machines in-house', 'gép a parkban'],
  ['CNC + auxiliary machines', 'CNC + segédgépek'],
  ['max axes', 'max tengely'],
  ['max rpm', 'max ford/perc'],
  ['spindle speed', 'orsófordulat'],
  ['mm tolerance', 'mm tűrés'],
  ['documented inspection', 'dokumentált mérés'],
  ['Machines', 'Gépek'],
  ['Milling', 'Marás'],
  ['Turning', 'Esztergálás'],
  ['Auxiliary', 'Segédgép'],
  ['Inspection', 'Mérés'],
  ['Production machines', 'Gyártó gépek'],
  ['Machining centres and lathes.', 'Megmunkálóközpontok és esztergák.'],
  ['axes', 'tengely'],
  ['Comparison', 'Összehasonlítás'],
  ['Which machine is best for which task?', 'Melyik gép, mire való?'],
  ['Machine', 'Gép'],
  ['Category', 'Kategória'],
  ['Axes', 'Tengely'],
  ['Work envelope / chuck', 'Munkatér / Tokmány'],
  ['Typical use', 'Tipikus felhasználás'],
  ['Inspection and documented quality.', 'Mérés és dokumentált minőség.'],
  ['Complex part? Let\'s review manufacturability.', 'Bonyolultabb darab? Egyeztessünk a megmunkálhatóságról.'],

  ['Services - CNC milling, turning and tooling | MetalFusion', 'Szolgáltatások — CNC marás, esztergálás, szerszámgyártás | MetalFusion'],
  ['CNC milling, turning, prototype manufacturing, low- and high-volume production, tooling and complete mechanical solutions from drawings or 3D models.', 'CNC marás, esztergálás, prototípusgyártás, kis- és nagyszériás gyártás, szerszámgyártás és komplett mechanikai megoldások rajz vagy 3D modell alapján.'],
  ['Complex manufacturing processes', 'Komplex gyártási folyamatok'],
  ['through one partner.', 'egy partnerrel.'],
  ['What we manufacture', 'Amit gyártunk'],
  ['Six services, one responsible partner.', 'Hat szolgáltatás, egy felelős partner.'],
  ['From briefing to delivery.', 'A briefingtől a szállításig.'],
  ['Process', 'Folyamat'],
  ['Briefing', 'Briefing'],
  ['Quotation', 'Ajánlat'],
  ['CAM & preparation', 'CAM & előkészítés'],
  ['Production', 'Gyártás'],
  ['Quality control', 'Minőségellenőrzés'],
  ['Delivery', 'Szállítás'],
  ['Material & tolerance', 'Anyag & tolerancia'],
  ['Materials and achievable precision.', 'Mivel és milyen pontossággal.'],
  ['Technical parameters', 'Műszaki paraméterek'],
  ['Custom design', 'Egyedi tervezés'],
  ['Complete assembly', 'Komplett részegység'],
  ['3- · 4-axis', '3- · 4-tengely'],
  ['10-10,000 pcs', '10 – 10 000 db'],
  ['±0.01 mm tolerance', '±0.01 mm tűréshatár'],
  ['5-axis CNC centre', '5-tengelyes CNC központ'],
  ['24h quote response', '24h válasz ajánlatkérésre'],
  ['STEP · IGES · DWG files', 'STEP · IGES · DWG fájlok'],
  ['1 to 10,000 pcs', '1 db-tól 10 000 db-ig'],
  ['3D coordinate measuring machine', '3D koordináta mérőgép'],
  ['Steel · aluminium · stainless', 'Acél · alumínium · rozsdamentes'],
  ['3-21 business day lead time', '3 – 21 munkanap átfutás'],
  ['Inspection report', 'Mérési jegyzőkönyv'],

  ['References - MetalFusion manufacturing projects', 'Referenciák — MetalFusion gyártási projektek'],
  ['Custom components and complete mechanical assemblies manufactured for pharmaceutical, medical technology and machine-building companies.', 'Egyedi alkatrészek és komplett mechanikai egységek gyógyszeripari, orvostechnikai és gépgyártó vállalatoknak.'],
  ['Real manufacturing projects', 'Valós gyártási projektek,'],
  ['for real customers.', 'valós ügyfeleknek.'],
  ['Filter by industry', 'Szűrés iparág szerint'],
  ['All', 'Mind'],
  ['Case studies', 'Esettanulmányok'],
  ['Completed projects.', 'Megvalósult projektek.'],
  ['Open gallery', 'Galéria megnyitása'],
  ['Workshop & components', 'Műhely & alkatrészek'],
  ['Snapshots from everyday production.', 'Pillanatképek a hétköznapokból.'],
  ['Industries', 'Iparágak'],
  ['A supplier for almost every industrial sector.', 'Beszállítóként szinte minden iparágban otthon.'],
  ['Looking for a supplier for a similar project?', 'Hasonló projekttel keres beszállítót?'],
  ['Pharmaceuticals', 'Gyógyszeripar'],
  ['Medical technology', 'Orvostechnika'],
  ['Machine building', 'Gépgyártás'],
  ['Packaging technology', 'Csomagolástechnika'],
  ['Food industry', 'Élelmiszeripar'],
  ['Plastics industry', 'Műanyagipar'],
  ['Construction hardware', 'Építőipari vasalat'],
  ['Prototype development', 'Prototípusfejlesztés'],

  ['Contact - MetalFusion quote request', 'Kapcsolat — MetalFusion ajánlatkérés'],
  ['Send your technical drawing or 3D model and we will respond within 24 hours. Phone, email and Budapest workshop contact details.', 'Küldje el műhelyrajzát vagy 3D modelljét, és 24 órán belül válaszolunk. Telefon, e-mail és budapesti műhely elérhetőségek.'],
  ['Quote request', 'Ajánlatkérés'],
  ['Prototype / small batch', 'Prototípus / kis széria'],
  ['Series production', 'Sorozatgyártás'],
  ['Workshop visit', 'Műhely-látogatás'],
  ['Other', 'Egyéb'],
  ['Workshop open', 'Műhely nyitva'],
  ['Someone is available now', 'Most felveszi valaki'],
  ['Opening soon', 'Hamarosan nyitunk'],
  ['In the workshop from 7:00', '7:00-kor a műhelyben'],
  ['Closed now', 'Most zárva'],
  ['Mon-Fri 7:00-16:00', 'H–P 7:00 – 16:00'],
  ['Quote request form', 'Ajánlatkérő űrlap'],
  ['Briefly describe the task.', 'Írja le röviden a feladatot.'],
  ['Name', 'Név'],
  ['Company', 'Cégnév'],
  ['Email address', 'E-mail cím'],
  ['Phone number', 'Telefonszám'],
  ['Topic', 'Téma'],
  ['Message', 'Üzenet'],
  ['John Smith', 'Kovács János'],
  ['Example Ltd.', 'Példa Kft.'],
  ['name@company.com', 'nev@cegnev.hu'],
  ['Material grade, quantity, deadline, attached drawing / 3D model availability...', 'Anyagminőség, mennyiség, határidő, csatolt műhelyrajz / 3D modell elérhetősége…'],
  ['Accepted file formats by email', 'Elfogadott fájlok az e-mailben'],
  ['Send quote request', 'Ajánlatkérés elküldése'],
  ['Opening hours', 'Nyitvatartás'],
  ['Mon-Fri', 'H – P'],
  ['Sat-Sun', 'Szo – V'],
  ['Closed', 'Zárva'],
  ['Directions in Google Maps', 'Útvonal Google Maps-ben'],
  ['FAQ', 'Gyakori kérdések'],
  ['Before you send a quote request.', 'Mielőtt elküldi az ajánlatkérést.'],
  ['Which file formats do you accept?', 'Milyen fájlformátumot fogadtok?'],
  ['What is the typical lead time?', 'Mennyi az átfutási idő?'],
  ['Do you accept a single prototype?', 'Vállaltok-e egyetlen prototípust?'],
  ['What is included in the quote?', 'Mit ír az ajánlatban?'],
  ['Can I visit the workshop?', 'Lehet-e a műhelyt meglátogatni?'],

  ['Privacy Policy - MetalFusion', 'Adatvédelmi tájékoztató — MetalFusion'],
  ['MetalFusion privacy information for contact form submissions and quote requests.', 'MetalFusion adatvédelmi tájékoztató kapcsolatfelvételhez és ajánlatkérésekhez.'],
  ['Privacy', 'Adatvédelem'],
  ['Privacy Policy', 'Adatvédelmi tájékoztató'],
  ['Data controller', 'Adatkezelő'],
  ['Site: 1108 Budapest, Kozma Street', 'Telephely: 1108 Budapest, Kozma utca'],
  ['Categories of data processed', 'A kezelt adatok köre'],
  ['Purpose of processing', 'Adatkezelés célja'],
  ['Legal basis', 'Adatkezelés jogalapja'],
  ['Retention period', 'Adatok megőrzési ideje'],
  ['Data processors', 'Adatfeldolgozók'],
  ['Rights of the data subject', 'Az érintett jogai'],
  ['Remedies', 'Jogorvoslat'],
  ['Cookies', 'Sütik (cookies)'],
  ['Last technical update: June 19, 2026.', 'Tájékoztató utolsó technikai frissítése: 2026. június 19.'],

  ['Have a manufacturing task? Request a quote.', 'Van egy gyártási feladata? Kérjen ajánlatot.'],
  ['Send us your drawing or 3D model and we will get back to you within 1-2 business days.', 'Küldje el a műhelyrajzot vagy 3D modellt, 1-2 munkanapon belül visszajelzünk.'],
  ['View services', 'Szolgáltatások megtekintése'],
  ['Custom low- and high-volume component manufacturing with modern machinery, experienced specialists and consistently high quality.', 'Egyedi kis- és nagyszériás alkatrészgyártás modern gépparkkal, tapasztalt szakemberekkel és folyamatosan magas minőségben.'],
  ['Years of metalworking knowledge across demanding industrial projects.', 'Évek óta a fémiparban, széleskörű szakértelemmel.'],
  ['Every part leaves the workshop with documented inspection results. Accuracy is not an option - it is the baseline.', 'Minden alkatrész dokumentált mérési eredménnyel kerül ki a műhelyből. A pontosság nem opció, hanem alapelvárás.'],
  ['We deliver what we commit to: on time, under clearly agreed conditions and with industrial predictability.', 'Amit ígérünk, azt teljesítjük: határidőre, leírt feltételekkel, ipari kiszámíthatósággal.'],
  ['Deadline reliability · 98%', 'Határidő · 98%'],
  ['From a single prototype to thousands of parts, with the same workshop discipline and attention to detail.', 'Egyetlen prototípustól több ezres szériáig ugyanazzal a műhelyfegyelemmel és figyelemmel dolgozunk.'],
  ['1 pc - 10,000 pcs', '1 db - 10 000 db'],
  ['More than a decade of metalworking for chemical, automotive and machine-building customers.', 'Több mint egy évtizednyi fémmegmunkálás vegyipari, járműipari és gépgyártó megrendelőknek.'],
  ['15+ years in business', '15+ év a piacon'],
  ['years of experience', 'év tapasztalat'],
  ['active production since 2010', 'aktív gyártás 2010 óta'],
  ['parts manufactured', 'legyártott alkatrész'],
  ['annual production volume', 'éves volumen'],
  ['active partners', 'aktív partner'],
  ['returning customers', 'visszatérő megrendelő'],
  ['The beginning', 'A kezdetek'],
  ['MetalFusion started in a small Budapest workshop, focused on precision custom manufacturing and building long-term customer trust.', 'A MetalFusion egy kis budapesti műhelyben indult, fókuszban a precíz egyedi gyártással és a partneri bizalom építésével.'],
  ['First CNC technology', 'Első CNC technológia'],
  ['With the first 3-axis CNC milling machine, we stepped up to more complex geometries and better repeatability.', 'Az első 3-tengelyes CNC marógép üzembe helyezésével új minőségi szintre léptünk: bonyolultabb geometriák, jobb ismételhetőség.'],
  ['Workshop expansion', 'Műhelybővítés'],
  ['Growing demand led us to a modern site in Kobanya, with more machines and more space for logistics and production.', 'A megnövekedett megrendelési igények miatt korszerű kőbányai telephelyre költöztünk, több géppel és nagyobb logisztikai térrel.'],
  ['5-axis machining', '5-tengelyes megmunkálás'],
  ['We expanded the machine park with a new 5-axis CNC centre for complex parts in a single setup and with fewer handling risks.', 'Új 5-tengelyes CNC központtal bővítettük a gépparkot: komplex alkatrészek egyetlen befogással, kisebb hibalehetőséggel.'],
  ['Today', 'Ma'],
  ['From milling and turning to assembly, we provide a complete mechanical manufacturing process through one responsible partner.', 'Marástól és esztergálástól az összeszerelésig komplett mechanikai gyártási folyamatot biztosítunk egy felelős partnerrel.'],
  ['Since 2010, MetalFusion has manufactured custom low- and high-volume metal components in Budapest. Modern machinery, experienced specialists and engineering thinking through a single point of contact.', 'A MetalFusion 2010 óta gyárt egyedi kis- és nagyszériás fémalkatrészeket Budapesten. Modern géppark, tapasztalt szakemberek, mérnöki gondolkodás egyetlen kapcsolaton keresztül.'],
  ['MetalFusion has manufactured custom metal components in Hungary since 2010. From the beginning, we have followed one principle: precision is not marketing language, it is something measurable.', 'A MetalFusion 2010 óta gyárt egyedi fémalkatrészeket Magyarországon. Indulás óta egy elven dolgozunk: a precizitás nem marketingszöveg, hanem mérhető kategória.'],
  ['We believe reliable manufacturing should be visible in the delivered part, not in a brochure. That is why every order is documented and every step has a responsible engineer behind it.', 'Hiszünk abban, hogy a megbízható gyártásnak az átadott alkatrészben kell látszania. Ezért minden megrendelést dokumentálunk, és minden lépés mögött felelős mérnök áll.'],
  ['Not slogans, but operating rules visible in every order from the first drawing review to the final inspection.', 'Nem szlogenek, hanem operatív szabályok, amelyek minden megrendelésben látszanak a rajzellenőrzéstől az utolsó mérésig.'],
  ["From a small workshop to a reliable industrial partner. Key milestones in MetalFusion's development.", 'Egy kis műhelyből megbízható ipari partnerré. A MetalFusion fejlődésének főbb mérföldkövei.'],
  ['MetalFusion CNC workshop in operation', 'MetalFusion CNC műhely üzem közben'],
  ['Budapest · Kobanya', 'Budapest · Kőbánya'],
  ['Everything a long-term industrial partner needs in one place, with one responsible contact.', 'Minden, amire egy hosszú távú ipari partnernek szüksége van: egy helyen, egy felelős kapcsolattartóval.'],
  ['3-axis CNC milling machine', '3-tengelyes CNC marógép'],
  ['4- and 5-axis CNC machining centre', '4- és 5-tengelyes CNC központ'],
  ['CNC lathe', 'CNC esztergagép'],
  ['Conventional lathes and milling machines', 'Hagyományos esztergák és marógépek'],
  ['Welding and assembly workstation', 'Hegesztő- és összeszerelő munkaállomás'],
  ['Structural and heat-treated steel', 'Szerkezeti és nemesített acél'],
  ['Stainless steel (V2A, V4A)', 'Rozsdamentes acél (V2A, V4A)'],
  ['Aluminium alloys', 'Alumínium ötvözetek'],
  ['Brass, copper and bronze', 'Sárgaréz, vörösréz, bronz'],
  ['Engineering plastics (POM, PA, PEEK)', 'Műszaki műanyagok (POM, PA, PEEK)'],
  ['Tolerance', 'Tűréshatár'],
  ['Batch size', 'Sorozatnagyság'],
  ['Workpiece', 'Munkadarab'],
  ['up to 1500 × 800 × 600 mm', '1500 × 800 × 600 mm-ig'],
  ['3-21 business days', '3-21 munkanap'],
  ['Let\'s work together on your next project.', 'Dolgozzunk együtt a következő projektjén.'],
  ['Send us your drawing or 3D model and we will respond with a quote within 24 hours.', 'Küldje el a műhelyrajzot vagy 3D modellt, és 24 órán belül ajánlattal jelentkezünk.'],

  ['3- and 4-axis machining centres for complex geometries.', '3- és 4-tengelyes megmunkálóközpontok komplex geometriákhoz.'],
  ['Milling of steel, aluminium, copper alloys and engineering plastics. We machine custom tools, housings, prototypes and production parts to tight tolerances.', 'Acél, alumínium, rézötvözetek és műanyagok marása. Egyedi szerszámokat, tokozatokat, prototípusokat és sorozatdarabokat munkálunk meg szoros tűréssel.'],
  ['3- and 4-axis machining centres', '3- és 4-tengelyes központok'],
  ['Steel · aluminium · copper · plastics', 'Acél · alumínium · réz · műanyag'],
  ['Tolerances down to ±0.01 mm', 'Tűrés akár ±0,01 mm'],
  ['Machining of shafts, bushings and turned components.', 'Tengelyek, perselyek és forgácsolt forgástestek megmunkálása.'],
  ['Shafts, bushings and complete turned parts are produced on CNC lathes with driven tooling. From one-off machining to high-volume production.', 'Tengelyek, perselyek és komplett forgástestek készülnek hajtott szerszámos CNC esztergákon, egyedi darabtól nagyszériáig.'],
  ['Driven-tool CNC lathe', 'Hajtott szerszámos CNC eszterga'],
  ['Diameter range Ø3-Ø250 mm', 'Átmérő tartomány Ø3-Ø250 mm'],
  ['Deburring and machining in one setup', 'Sorjázás és megmunkálás egy felfogásban'],
  ['Prototype manufacturing', 'Prototípusgyártás'],
  ['One-off parts from technical drawings or 3D models.', 'Egyedi darabok műhelyrajzból vagy 3D modellből.'],
  ['For new product development, we provide fast and accurate prototype manufacturing. From model to finished part in one workshop, with flexible scheduling.', 'Új termékfejlesztéshez gyors és pontos prototípusgyártást vállalunk, a modelltől a kész alkatrészig egy műhelyben, rugalmas ütemezéssel.'],
  ['STEP / IGES / DWG file support', 'STEP / IGES / DWG fájlok kezelése'],
  ['Fast turnaround', 'Gyors átfutás'],
  ['Engineer-to-engineer consultation', 'Mérnöki egyeztetés'],
  ['Tooling and fixture manufacturing', 'Szerszám- és készülékgyártás'],
  ['Moulds, forming tools, press tools and fixtures.', 'Öntő-, alakító-, sajtoló szerszámok és készülékek.'],
  ['We deliver complete solutions for shaped moulds, press tools, drilling templates and production fixtures, from design support to manufacturing.', 'Alakos öntőszerszámokhoz, sajtolószerszámokhoz, fúrósablonokhoz és gyártási készülékekhez adunk komplett megoldást a tervezéstámogatástól a gyártásig.'],
  ['Shaped moulds', 'Alakos öntőszerszámok'],
  ['Press and cutting tools', 'Sajtoló- és vágószerszámok'],
  ['Production fixtures and templates', 'Gyártási készülékek és sablonok'],
  ['Low- and high-volume production', 'Kis- és nagyszériás gyártás'],
  ['Reliable scheduling and consistent quality.', 'Megbízható ütemezés és állandó minőség.'],
  ['We also handle recurring weekly or monthly production runs. Each batch is checked for quality and delivered against fixed deadlines.', 'Heti vagy havi rendszerességű ismétlődő gyártásokat is vállalunk. Minden batch minőségellenőrzésen megy át, kötött határidőkkel.'],
  ['Series production from 10 to 10,000 pcs', 'Sorozatgyártás 10-10 000 db között'],
  ['Fixed deadlines', 'Kötött határidők'],
  ['Inspection report on request', 'Mérési jegyzőkönyv kérésre'],
  ['Full production of machines, assemblies and subassemblies.', 'Gépek, szerelvények és részegységek teljes legyártása.'],
  ['Complete mechanical production for packaging machines, medical devices and industrial equipment, including part manufacturing and assembly.', 'Csomagológépek, orvosi eszközök és ipari berendezések komplett mechanikai gyártása, alkatrészgyártással és összeszereléssel együtt.'],
  ['From design to assembly', 'Tervtől összeszerelésig'],
  ['One responsible partner', 'Egy felelős partner'],
  ['Documented production process', 'Dokumentált gyártási folyamat'],
  ['Own workshop, skilled specialists and documented processes through a single contact across the entire production chain.', 'Saját műhely, képzett szakemberek és dokumentált folyamatok egyetlen kapcsolattartón keresztül a teljes gyártási láncban.'],
  ['A clear six-step process. At every stage you know where your order stands and who the responsible engineer is.', 'Egyértelmű, hat lépésből álló folyamat. Minden szakaszban tudja, hol tart a megrendelése, és ki a felelős mérnök.'],
  ['Technical drawing, 3D model, quantity and deadline. A responsible engineer answers, not a call centre.', 'Műhelyrajz, 3D modell, mennyiség és határidő. Felelős mérnök válaszol, nem call center.'],
  ['A quote within 24 hours, with material cost, machining, deadline and options clearly broken down.', '24 órán belüli ajánlat, anyagköltséggel, megmunkálással, határidővel és opciókkal egyértelműen bontva.'],
  ['CAM & preparation', 'CAM & előkészítés'],
  ['Machining strategy, tool list and workholding. Everything is decided before the machine starts.', 'Megmunkálási stratégia, szerszámlista és befogás. Minden eldől még a gép indítása előtt.'],
  ['CNC milling, turning and secondary operations in our own workshop with a documented process.', 'CNC marás, esztergálás és kiegészítő műveletek saját műhelyben, dokumentált folyamatban.'],
  ['3D coordinate measurement, visual inspection and documented inspection reports on request.', '3D koordináta mérés, vizuális ellenőrzés és dokumentált mérési jegyzőkönyv kérésre.'],
  ['Packaging, delivery note, courier shipment or personal pickup according to your preference.', 'Csomagolás, szállítólevél, futárszállítás vagy személyes átvétel kérés szerint.'],
  ['From steel to engineering plastics, from prototypes to high-volume series, with engineering-level precision.', 'Acéltól a műszaki műanyagokig, prototípustól nagyszériáig, mérnöki pontossággal.'],
  ['Structural steel', 'Szerkezeti acél'],
  ['Heat-treated steel', 'Nemesített acél'],
  ['Stainless steel', 'Rozsdamentes acél'],
  ['Aluminium', 'Alumínium'],
  ['Brass · copper', 'Sárgaréz · vörösréz'],
  ['Dimensional accuracy', 'Méretpontosság'],
  ['Surface roughness', 'Felületi érdesség'],
  ['Workpiece size', 'Munkadarab méret'],
  ['Input files', 'Bemeneti fájlok'],
  ['Lead time', 'Átfutási idő'],
  ['Send us your drawing and we will respond with a quote within 24 hours.', 'Küldje el a rajzot, és 24 órán belül ajánlattal jelentkezünk.'],
  ['STEP, IGES, DWG or PDF. From a single part to thousands of pieces, with the same level of care.', 'STEP, IGES, DWG vagy PDF. Egyetlen alkatrésztől több ezer darabig ugyanazzal a gondossággal dolgozunk.'],

  ['3-axis CNC machining centre', '3-tengelyes CNC megmunkálóközpont'],
  ['Versatile compact milling capacity for accurate series production.', 'Sokoldalú kompakt marási kapacitás pontos sorozatgyártáshoz.'],
  ['The Hurco VM10i is a compact 3-axis machining centre used for precision milling of small and medium-sized parts. The WinMax control enables fast changeovers and intuitive programming.', 'A Hurco VM10i kompakt 3-tengelyes megmunkálóközpont kisebb és közepes alkatrészek precíz marásához. A WinMax vezérlés gyors átállást és intuitív programozást tesz lehetővé.'],
  ['Work envelope 660 × 406 × 508 mm', 'Munkatér 660 × 406 × 508 mm'],
  ['10,000 rpm', '10 000 ford/perc'],
  ['WinMax control', 'WinMax vezérlés'],
  ['Work envelope (X×Y×Z)', 'Munkatér (X×Y×Z)'],
  ['Spindle speed', 'Orsófordulat'],
  ['Control', 'Vezérlés'],
  ['Tool changer', 'Szerszámtár'],
  ['20 positions', '20 pozíció'],
  ['Custom milling', 'Egyedi marás'],
  ['Prototype', 'Prototípus'],
  ['Small series', 'Kisszéria'],
  ['4-axis CNC machining centre', '4-tengelyes CNC megmunkálóközpont'],
  ['Complex geometries machined in a single setup.', 'Komplex geometriák megmunkálása egyetlen befogással.'],
  ['The Hurco VMX24 4-axis machining centre offers a larger work envelope and a 12,000 rpm spindle. The fourth axis allows complex geometries to be produced in one setup, reducing handling error and lead time.', 'A Hurco VMX24 4-tengelyes megmunkálóközpont nagyobb munkateret és 12 000 ford/perc orsót kínál. A 4. tengely komplex geometriák gyártását teszi lehetővé egy befogásban, kevesebb kezelési hibával és rövidebb átfutással.'],
  ['Work envelope 610 × 508 × 610 mm', 'Munkatér 610 × 508 × 610 mm'],
  ['12,000 rpm', '12 000 ford/perc'],
  ['4th-axis option', '4. tengely opció'],
  ['24 positions', '24 pozíció'],
  ['4th axis', '4. tengely'],
  ['Complex geometry', 'Komplex geometria'],
  ['Single setup', 'Egy befogás'],
  ['CNC lathe with driven tools', 'CNC eszterga hajtott szerszámokkal'],
  ['Driven-tool turning for complete machined rotational parts.', 'Hajtott szerszámos esztergálás komplett forgástestekhez.'],
  ['The Hwacheon Cutex 160A is a driven-tool CNC lathe with Y-axis capability. Turning, milling and drilling operations can be completed in one setup for fast, accurate production of rotational components.', 'A Hwacheon Cutex 160A hajtott szerszámos CNC eszterga Y-tengely lehetőséggel. Az esztergálási, marási és fúrási műveletek egy befogásban végezhetők a forgástestek gyors és pontos gyártásához.'],
  ['Type', 'Típus'],
  ['Chuck', 'Tokmány'],
  ['Max diameter', 'Max átmérő'],
  ['Machining length', 'Megmunkálási hossz'],
  ['Extra', 'Extra'],
  ['Driven tools', 'Hajtott szerszámok'],
  ['Y-axis', 'Y-tengely'],
  ['Rotational parts', 'Forgástestek'],
  ['CNC lathe for larger shafts', 'CNC eszterga nagyobb tengelyekhez'],
  ['Machining of larger rotational parts and long shafts.', 'Nagyobb forgástestek és hosszú tengelyek megmunkálása.'],
  ['The Doosan Puma 2600 is a robust lathe with a large chuck and long machining travel. It is well suited for shafts, bushings and larger turned parts up to approximately one metre in length.', 'A Doosan Puma 2600 robusztus eszterga nagy tokmánnyal és hosszú megmunkálási úttal. Ideális tengelyekhez, perselyekhez és nagyobb forgástestekhez, körülbelül egy méteres munkadarabhosszig.'],
  ['For shaft production', 'Tengelygyártáshoz'],
  ['Use case', 'Felhasználás'],
  ['Shaft production', 'Tengelygyártás'],
  ['Large chuck', 'Nagy tokmány'],
  ['Long shafts', 'Hosszú tengelyek'],
  ['Robust', 'Robusztus'],
  ['Conventional milling machine', 'Hagyományos marógép'],
  ['Auxiliary and custom-operation machine', 'Segéd- és egyedi műveleti gép'],
  ['Fast setup changes, custom workholding and secondary operations.', 'Gyors átállás, egyedi felfogások és kiegészítő műveletek.'],
  ['Our conventional milling machine supports the CNC equipment with fast custom workholding, deburring, repairs and one-off tasks where CNC programming time would not be economical.', 'Hagyományos marógépünk a CNC gépeket támogatja gyors egyedi felfogásokkal, sorjázással, javításokkal és olyan egyedi feladatokkal, ahol a CNC programozási idő nem lenne gazdaságos.'],
  ['Work envelope', 'Munkatér'],
  ['Custom operations', 'Egyedi műveletek'],
  ['Strength', 'Erősség'],
  ['Fast setup changes', 'Gyors átállás'],
  ['Custom workholding', 'Egyedi felfogás'],
  ['Deburring', 'Sorjázás'],
  ['Repair', 'Javítás'],
  ['Measuring equipment', 'Mérőeszközök'],
  ['Quality control and documented measurement', 'Minőségellenőrzés és dokumentált mérés'],
  ['Documented, repeatable inspection after machining.', 'Dokumentált, ismételhető mérés megmunkálás után.'],
  ['Digital calipers, micrometers, height gauges and a coordinate measuring machine support repeatable inspection. Measurement results can be supplied in an inspection report on request.', 'Digitális tolómérők, mikrométerek, magasságmérő és koordináta mérőgép támogatja az ismételhető ellenőrzést. A mérési eredményeket kérésre mérési jegyzőkönyvben adjuk át.'],
  ['Digital calipers and micrometers', 'Digitális tolómérők és mikrométerek'],
  ['Tools', 'Eszközök'],
  ['Digital caliper, micrometer', 'Digitális tolómérő, mikrométer'],
  ['Height gauge', 'Magasságmérő'],
  ['Yes', 'Igen'],
  ['3D inspection', '3D mérés'],
  ['Coordinate measuring machine', 'Koordináta mérőgép'],
  ['Repeatable inspection', 'Ismételhető mérés'],
  ['3D CMM', '3D CMM'],
  ['Report', 'Jegyzőkönyv'],
  ['Documentation', 'Dokumentáció'],
  ['Custom', 'Egyedi'],
  ['Machine navigation', 'Gépek navigációja'],
  ['Hurco machining centres, a Hwacheon driven-tool lathe and a Doosan shaft lathe in one workshop.', 'Hurco megmunkálóközpontok, Hwacheon hajtott szerszámos eszterga és Doosan tengelyeszterga egyetlen műhelyben.'],
  ['A quick overview to match part size and operation type with the right machine.', 'Rövid áttekintés, amely alkatrészméret és művelettípus alapján segít a megfelelő gép kiválasztásában.'],
  ['Dimensional inspection during and after machining. We can verify part tolerances in an inspection report on request.', 'Méretellenőrzés megmunkálás közben és után. Kérésre mérési jegyzőkönyvben igazoljuk az alkatrészek tűréseit.'],
  ['Our manufacturability feedback can save time and material. Send us the model and we will walk through the machining strategy.', 'Gyárthatósági visszajelzéseink időt és anyagot spórolhatnak. Küldje el a modellt, és végigvesszük a megmunkálási stratégiát.'],

  ['Custom pharmaceutical packaging machine mechanics', 'Egyedi gyógyszercsomagoló gép komplett mechanikája'],
  ['Austrian pharmaceutical company', 'Osztrák gyógyszerészeti vállalat'],
  ['Complete mechanical manufacturing for a custom pharmaceutical packaging machine, built from stainless steel and aluminium structural elements to food-grade requirements.', 'Egyedi gyógyszercsomagoló berendezés teljes mechanikai gyártása rozsdamentes acél és alumínium szerkezeti elemekkel, élelmiszeripari követelmények szerint.'],
  ['Robot-arm gripper jaws', 'Robotkar megfogó pofák'],
  ['Automation partner', 'Automatizálási partner'],
  ['Precision gripper jaws for robotic arms, manufactured repeatably with documented inspection reports.', 'Precíziós megfogó pofák robotkarokhoz, ismételhető gyártással és dokumentált mérési jegyzőkönyvvel.'],
  ['Heavy-duty hinge', 'Nagy teherbírású zsanér'],
  ['Industrial equipment manufacturer', 'Ipari berendezésgyártó'],
  ['Steel industry', 'Acélipar'],
  ['Precision-machined stainless-steel component designed for high-load industrial use.', 'Magas terhelésű ipari felhasználásra tervezett, precízen megmunkált rozsdamentes acél alkatrész.'],
  ['Custom bending insert', 'Egyedi hajlító betét'],
  ['Manufacturing technology customer', 'Gyártástechnológiai megrendelő'],
  ['Metalworking', 'Fémipar'],
  ['Custom-geometry bending insert for metalworking machines, produced to tight tolerances.', 'Egyedi geometriájú hajlító betét fémmegmunkáló gépekhez, szoros tűréssel gyártva.'],
  ['A curated selection of completed work. Our industrial partners include pharmaceutical, medical technology and machine-building companies.', 'Válogatás megvalósult munkáinkból. Ipari partnereink között gyógyszeripari, orvostechnikai és gépgyártó vállalatok is vannak.'],
  ['Click a project cover image to open the full gallery.', 'Kattintson egy projekt borítóképére a teljes galéria megnyitásához.'],
  ['No reference case has been published for this industry yet.', 'Ehhez az iparághoz még nem publikáltunk referencia esetet.'],
  ['Show all', 'Mind mutatása'],
  ['Workshop & components', 'Műhely & alkatrészek'],
  ['A selection of machines, precision parts and work-in-progress moments. Click any image to enlarge it.', 'Válogatás gépekről, precíziós alkatrészekről és munka közbeni állapotokról. Kattintson bármelyik képre a nagyításhoz.'],
  ['Enlarge image', 'Kép nagyítása'],
  ['From pharmaceutical, medical technology and machine-building companies to the food industry, custom manufacturing needs appear everywhere.', 'A gyógyszeripari, orvostechnikai és gépgyártó vállalatoktól az élelmiszeriparig mindenhol megjelennek az egyedi gyártási igények.'],
  ['Send us your technical drawing or 3D model and we will respond with a quote within 24 hours.', 'Küldje el műhelyrajzát vagy 3D modelljét, és 24 órán belül ajánlattal jelentkezünk.'],

  ['Mon-Fri · 7:00-16:00', 'H-P · 7:00-16:00'],
  ['Guaranteed 24h response', 'Garantált 24h válasz'],
  ['By appointment', 'Időpont-egyeztetéssel'],
  ['Local time', 'Helyi idő'],
  ['Response time', 'Válaszidő'],
  ['Languages', 'Nyelvek'],
  ['< 24 hours', '< 24 óra'],
  ['Send a technical drawing, 3D model or PDF and a responsible engineer will get back to', 'Küldjön műhelyrajzot, 3D modellt vagy PDF-et, és egy felelős mérnök visszajelez'],
  ['you with a quote, manufacturability feedback and a realistic lead time.', 'árajánlattal, gyárthatósági visszajelzéssel és reális határidővel.'],
  ['Send a technical drawing, 3D model or PDF and a responsible engineer will get back to you with a quote, manufacturability feedback and a realistic lead time.', 'Küldjön műhelyrajzot, 3D modellt vagy PDF-et, és egy felelős mérnök visszajelez árajánlattal, gyárthatósági javaslattal és reális határidővel.'],
  ['The more details you provide - material, quantity, deadline and drawings - the more accurate our quote can be.', 'Minél több részletet ad meg - anyag, mennyiség, határidő és rajzok -, annál pontosabb ajánlatot tudunk adni.'],
  ['Your data will only be used to respond to your quote request.', 'Adatait kizárólag az ajánlatkérés megválaszolására használjuk.'],
  ['Your email client is open - please send the message and we will respond within 24 hours.', 'Megnyitottuk a levelezőprogramot - küldje el az üzenetet, és 24 órán belül válaszolunk.'],
  ['Visits to our District X workshop are welcome by prior appointment.', 'X. kerületi műhelyünkbe előzetes időpont-egyeztetés után szívesen várjuk.'],
  ['MetalFusion workshop', 'MetalFusion műhely'],
  ['A few answers to common questions. If something is missing, feel free to write to us.', 'Néhány válasz a leggyakoribb kérdésekre. Ha valami hiányzik, írjon bátran.'],
  ['STEP, IGES, DWG, STL, PDF and JPG - all common technical drawing and 3D model formats. If your file is larger than 10 MB, send a WeTransfer or Google Drive link.', 'STEP, IGES, DWG, STL, PDF és JPG - minden szokványos műhelyrajz és 3D modell formátum. Ha a fájl nagyobb 10 MB-nál, küldjön WeTransfer vagy Google Drive linket.'],
  ['Depending on the task, it is usually 3-21 business days. Simple parts can take only a few days, while complex series may take 2-3 weeks. The exact deadline is always stated in the quote.', 'A feladattól függően általában 3-21 munkanap. Egyszerű alkatrészek pár nap alatt elkészülhetnek, komplex sorozatoknál 2-3 hét is lehet. A pontos határidőt mindig az ajánlatban rögzítjük.'],
  ['Yes, we work from a single piece. For prototypes, we pay special attention to manufacturability so the part can be prepared for series production later.', 'Igen, egyetlen darabtól is dolgozunk. Prototípusoknál külön figyelünk a gyárthatóságra, hogy az alkatrész később sorozatgyártásra is előkészíthető legyen.'],
  ['Material cost, machining time, total price, deadline, payment terms, packaging and delivery. If there are options, we also list the alternatives.', 'Anyagköltség, megmunkálási idő, teljes ár, határidő, fizetési feltételek, csomagolás és szállítás. Ha vannak opciók, az alternatívákat is feltüntetjük.'],
  ['Yes, we are happy to welcome visitors by prior appointment. You can arrange a visit by phone or email.', 'Igen, előzetes időpont-egyeztetés után szívesen fogadunk látogatókat. Telefonon vagy e-mailben egyeztethető időpont.'],

  ['This notice summarizes the data processing framework for contact requests and quote requests submitted through the website. Missing company and service-provider details should be finalized before publication.', 'A tájékoztató a weboldalon keresztül történő kapcsolatfelvétel és ajánlatkérés adatkezelési kereteit foglalja össze. A hiányzó céges és szolgáltatói adatok véglegesítés előtt pontosítandók.'],
  ['This text requires legal and company-data review before publication. It does not include', 'Ez a szöveg publikálás előtt jogi és céges adategyeztetést igényel. Nem tartalmaz'],
  ['company details or processors that have not been verified in the project.', 'olyan cégadatot vagy adatfeldolgozót, amely nem szerepel igazoltan a projektben.'],
  ['1. Data controller', '1. Adatkezelő'],
  ['2. Categories of data processed', '2. A kezelt adatok köre'],
  ['3. Purpose of processing', '3. Adatkezelés célja'],
  ['4. Legal basis', '4. Adatkezelés jogalapja'],
  ['5. Retention period', '5. Adatok megőrzési ideje'],
  ['6. Data processors', '6. Adatfeldolgozók'],
  ['7. Rights of the data subject', '7. Az érintett jogai'],
  ['8. Remedies', '8. Jogorvoslat'],
  ['9. Cookies', '9. Sütik'],
  ['Email:', 'E-mail:'],
  ['Phone:', 'Telefon:'],
  ['Exact company name, registered seat, company registration number, tax number and', 'Pontos cégnév, székhely, cégjegyzékszám, adószám és'],
  ['representative must be requested from the client and added after confirmation.', 'képviselő az ügyféltől bekérendő, majd megerősítés után feltüntetendő.'],
  ['We only process data that you voluntarily provide via the contact form, by email or by', 'Kizárólag azokat az adatokat kezeljük, amelyeket Ön a kapcsolati űrlapon, e-mailben vagy'],
  ['phone. This typically includes:', 'telefonon önként megad. Ezek tipikusan:'],
  ['name,', 'név,'],
  ['email address,', 'e-mail cím,'],
  ['phone number, if provided,', 'telefonszám, ha megadja,'],
  ['other information included in the message, such as drawings or project descriptions.', 'az üzenetben szereplő egyéb információ, például rajzok vagy projektleírások.'],
  ['Data is processed to handle quote requests, contact enquiries and pre-contractual', 'Az adatokat ajánlatkérések, kapcsolatfelvételek és szerződéskötést megelőző'],
  ['communication. Data is not transferred to third parties for marketing purposes.', 'kommunikáció kezelésére használjuk. Az adatokat marketing célból nem adjuk át harmadik félnek.'],
  ['The legal basis for processing is Article 6(1)(b) GDPR (steps prior to entering into a', 'Az adatkezelés jogalapja a GDPR 6. cikk (1) bekezdés b) pontja (szerződéskötést megelőző'],
  ['contract) and Article 6(1)(a) GDPR (consent of the data subject).', 'lépések) és a GDPR 6. cikk (1) bekezdés a) pontja (az érintett hozzájárulása).'],
  ['The retention period for quote-request data depends on the specific business and legal', 'Az ajánlatkérési adatok megőrzési ideje a konkrét üzleti és jogi'],
  ["process. The final retention period should be confirmed based on the client's internal", 'folyamattól függ. A végleges megőrzési időt az ügyfél belső'],
  ['data-processing practice and legal review.', 'adatkezelési gyakorlata és jogi felülvizsgálat alapján kell megerősíteni.'],
  ['The specific processors connected to website operation, such as hosting and email', 'A weboldal üzemeltetéséhez kapcsolódó konkrét adatfeldolgozókat, például tárhely- és e-mail'],
  ['services, must be requested from the client.', 'szolgáltatókat az ügyféltől kell bekérni.'],
  ['You have the right to access your personal data, request rectification, erasure,', 'Ön jogosult hozzáférni személyes adataihoz, kérheti azok helyesbítését, törlését,'],
  ['restriction of processing, data portability and object to processing. You can exercise', 'az adatkezelés korlátozását, az adathordozhatóságot, valamint tiltakozhat az adatkezelés ellen. Jogait'],
  ['these rights in writing at', 'írásban gyakorolhatja a következő címen:'],
  ['If you believe that processing violates applicable law, you may lodge a complaint with', 'Ha úgy ítéli meg, hogy az adatkezelés sérti a vonatkozó jogszabályokat, panaszt tehet'],
  ['the Hungarian National Authority for Data Protection and Freedom of Information (NAIH,', 'a Nemzeti Adatvédelmi és Információszabadság Hatóságnál (NAIH,'],
  ['or turn to the courts.', 'vagy bírósághoz fordulhat.'],
  ['The current codebase does not include external analytics or marketing cookie', 'A jelenlegi kódbázis nem tartalmaz külső analitikai vagy marketing süti'],
  ['integrations. If measurement, advertising or embedded third-party services are added', 'integrációkat. Ha később mérési, hirdetési vagy beágyazott harmadik féltől származó szolgáltatások kerülnek be,'],
  ['later, the cookie notice and consent management must be updated accordingly.', 'a sütitájékoztatót és a hozzájárulás-kezelést ennek megfelelően frissíteni kell.'],

  ['404 - Page not found | MetalFusion', '404 – Az oldal nem található | MetalFusion'],
  ['Page not found.', 'Az oldal nem található.'],
  ['Back to home', 'Vissza a főoldalra'],
  ['The page you are looking for could not be found. Return to the home page.', 'A keresett oldal nem található. Térjen vissza a főoldalra.'],
] as const;

const enToHu = new Map<string, string>(pairs);
const huToEn = new Map<string, string>(pairs.map(([en, hu]) => [hu, en]));

function readInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'hu';
  const saved = window.localStorage.getItem(STORAGE_KEY);
  return saved === 'en' || saved === 'hu' ? saved : 'hu';
}

function preserveSpacing(original: string, translated: string): string {
  const leading = original.match(/^\s*/)?.[0] ?? '';
  const trailing = original.match(/\s*$/)?.[0] ?? '';
  return `${leading}${translated}${trailing}`;
}

export function translateText(value: string, lang: Language): string {
  const trimmed = value.trim();
  if (!trimmed) return value;
  const translated = lang === 'hu' ? enToHu.get(trimmed) : huToEn.get(trimmed);
  if (translated) return preserveSpacing(value, translated);
  return value;
}

function translateDynamic(value: string, lang: Language): string {
  const trimmed = value.trim();
  if (lang === 'hu') {
    const copyright = trimmed.match(/^© (\d{4}) MetalFusion\. All rights reserved\.$/);
    if (copyright) {
      return preserveSpacing(value, `© ${copyright[1]} MetalFusion. Minden jog fenntartva.`);
    }
    const quoteFor = trimmed.match(/^Request a quote for (.+)$/);
    if (quoteFor) {
      const item = translateText(quoteFor[1], 'hu').trim();
      return preserveSpacing(value, `Ajánlatkérés: ${item}`);
    }
    const galleryFor = trimmed.match(/^Open gallery for (.+)$/);
    if (galleryFor) {
      const item = translateText(galleryFor[1], 'hu').trim();
      return preserveSpacing(value, `${item} galéria megnyitása`);
    }
    const enlargeImage = trimmed.match(/^Enlarge image: (.+)$/);
    if (enlargeImage) {
      const item = translateText(enlargeImage[1], 'hu').trim();
      return preserveSpacing(value, `Kép nagyítása: ${item}`);
    }
    const projectMatch = trimmed.match(/^(.+) - (\d+) projects?$/);
    if (projectMatch) {
      const industry = translateText(projectMatch[1], 'hu').trim();
      return preserveSpacing(value, `${industry} — ${projectMatch[2]} projekt`);
    }
    const imageMatch = trimmed.match(/^(\d+) images$/);
    if (imageMatch) return preserveSpacing(value, `${imageMatch[1]} kép`);
    const inOperation = trimmed.match(/^In operation since (.+)$/);
    if (inOperation) return preserveSpacing(value, `Üzemben ${inOperation[1]} óta`);
  }
  if (lang === 'en') {
    const copyright = trimmed.match(/^© (\d{4}) MetalFusion\. Minden jog fenntartva\.$/);
    if (copyright) {
      return preserveSpacing(value, `© ${copyright[1]} MetalFusion. All rights reserved.`);
    }
    const quoteFor = trimmed.match(/^Ajánlatkérés: (.+)$/);
    if (quoteFor) {
      const item = translateText(quoteFor[1], 'en').trim();
      return preserveSpacing(value, `Request a quote for ${item}`);
    }
    const galleryFor = trimmed.match(/^(.+) galéria megnyitása$/);
    if (galleryFor) {
      const item = translateText(galleryFor[1], 'en').trim();
      return preserveSpacing(value, `Open gallery for ${item}`);
    }
    const enlargeImage = trimmed.match(/^Kép nagyítása: (.+)$/);
    if (enlargeImage) {
      const item = translateText(enlargeImage[1], 'en').trim();
      return preserveSpacing(value, `Enlarge image: ${item}`);
    }
    const projectMatch = trimmed.match(/^(.+) — (\d+) projekt$/);
    if (projectMatch) {
      const industry = translateText(projectMatch[1], 'en').trim();
      return preserveSpacing(value, `${industry} - ${projectMatch[2]} projects`);
    }
    const imageMatch = trimmed.match(/^(\d+) kép$/);
    if (imageMatch) return preserveSpacing(value, `${imageMatch[1]} images`);
    const inOperation = trimmed.match(/^Üzemben (.+) óta$/);
    if (inOperation) return preserveSpacing(value, `In operation since ${inOperation[1]}`);
  }
  return value;
}

export function translateValue(value: string, lang: Language): string {
  const direct = translateText(value, lang);
  return direct === value ? translateDynamic(value, lang) : direct;
}

function applyLanguageToDom(lang: Language): void {
  if (typeof document === 'undefined') return;
  document.documentElement.lang = lang;
  document.documentElement.dataset.lang = lang;

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent) return NodeFilter.FILTER_REJECT;
      if (['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(parent.tagName)) return NodeFilter.FILTER_REJECT;
      return node.textContent?.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    },
  });

  const textNodes: Text[] = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode as Text);
  textNodes.forEach((node) => {
    if (!node.textContent) return;
    const next = translateValue(node.textContent, lang);
    if (next !== node.textContent) node.textContent = next;
  });

  const attrNames = ['aria-label', 'title', 'placeholder', 'alt'];
  document.querySelectorAll<HTMLElement>('*').forEach((el) => {
    attrNames.forEach((attr) => {
      const current = el.getAttribute(attr);
      if (!current) return;
      const next = translateValue(current, lang);
      if (next !== current) el.setAttribute(attr, next);
    });
  });

  document.querySelectorAll<HTMLMetaElement>('meta[content]').forEach((meta) => {
    const current = meta.getAttribute('content');
    if (!current) return;
    const next = translateValue(current, lang);
    if (next !== current) meta.setAttribute('content', next);
  });

  const title = translateValue(document.title, lang);
  if (title !== document.title) document.title = title;
}

interface LanguageContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (value: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => readInitialLanguage());

  const setLang = useCallback((next: Language) => {
    setLangState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  useEffect(() => {
    applyLanguageToDom(lang);
    const observer = new MutationObserver(() => {
      window.requestAnimationFrame(() => applyLanguageToDom(lang));
    });
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ['aria-label', 'title', 'placeholder', 'alt', 'content'],
    });
    return () => observer.disconnect();
  }, [lang]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      setLang,
      t: (text: string) => translateValue(text, lang),
    }),
    [lang, setLang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider');
  return ctx;
}
