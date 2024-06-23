//
//

import { useRef, useState } from "react";
import { USE_windowSize } from "../../../hooks/USE_windowSize";
import USE_fetchTagUsages from "../../../hooks/fetch/USE_fetchTagUsages";
import USE_fetchProfiles from "../../../hooks/fetch/USE_fetchProfiles";
import USE_fetchCategories from "../../../hooks/fetch/USE_fetchCategories";
import Normal_NAV from "../../../components/Nav/Normal_NAV/Normal_NAV";
import {
  SimplePageContent_WRAP,
  SimplePage_MAIN,
  SimplePage_SIDE,
  Simple_BLOCK,
} from "../SimplePage_COMPS";
import { Header } from "../../../components/Header/Header";
import { Breadcrumbs } from "../../../components/Header/Breadcrumbs/Breadcrumbs";

export default function Privacy_PAGE() {
  const { width } = USE_windowSize();
  const [search, SET_search] = useState("");

  const { tagUsages, LOADING_tagUsages, tagUsages_ERROR } = USE_fetchTagUsages();
  const { profiles, LOADING_profiles, profiles_ERROR } = USE_fetchProfiles();
  const { categories, LOADING_categories, categories_ERROR, available_CATEGORIES } =
    USE_fetchCategories();

  const nav_REF = useRef(null);

  return (
    <>
      <Normal_NAV
        tagUsages={tagUsages}
        search={search}
        SET_search={SET_search}
        categories={available_CATEGORIES}
        profiles={profiles}
        nav_REF={nav_REF}
      />
      <SimplePageContent_WRAP>
        <SimplePage_MAIN>
          <Header padding={false}>
            <Breadcrumbs texts_ARR={["Homepage", "Attributions"]} urls_ARR={["#"]} />
            <h1>Privacy</h1>
          </Header>

          {/* Inhaltsübersicht */}
          <Simple_BLOCK>
            <h3>Inhaltsübersicht</h3>
            <ul>
              <li>
                <a href="#preamble">Präambel</a>
              </li>
              <li>
                <a href="#verantwortlicher">Verantwortlicher</a>
              </li>
              <li>
                <a href="#uebersicht-der-verarbeitungen">Übersicht der Verarbeitungen</a>
              </li>
              <li>
                <a href="#massgebliche-rechtsgrundlagen">Maßgebliche Rechtsgrundlagen</a>
              </li>
              <li>
                <a href="#sicherheitsmassnahmen">Sicherheitsmaßnahmen</a>
              </li>
              <li>
                <a href="#uebermittlung-von-personenbezogenen-daten">
                  Übermittlung von personenbezogenen Daten
                </a>
              </li>
              <li>
                <a href="#internationale-datentransfers">Internationale Datentransfers</a>
              </li>
              <li>
                <a href="#allgemeine-informationen-zur-datenspeicherung-und-loeschung">
                  Allgemeine Informationen zur Datenspeicherung und Löschung
                </a>
              </li>
              <li>
                <a href="#rechte-der-betroffenen-personen">Rechte der betroffenen Personen</a>
              </li>
              <li>
                <a href="#bereitstellung-des-onlineangebots-und-webhosting">
                  Bereitstellung des Onlineangebots und Webhosting
                </a>
              </li>
              <li>
                <a href="#einsatz-von-cookies">Einsatz von Cookies</a>
              </li>
              <li>
                <a href="#kontakt-und-anfrageverwaltung">Kontakt- und Anfrageverwaltung</a>
              </li>
              <li>
                <a href="#umfragen-und-befragungen">Umfragen und Befragungen</a>
              </li>
              <li>
                <a href="#webanalyse-monitoring-und-optimierung">
                  Webanalyse, Monitoring und Optimierung
                </a>
              </li>
              <li>
                <a href="#praesenzen-in-sozialen-netzwerken-social-media">
                  Präsenzen in sozialen Netzwerken (Social Media)
                </a>
              </li>
              <li>
                <a href="#aenderung-und-aktualisierung">Änderung und Aktualisierung</a>
              </li>
              <li>
                <a href="#begriffsdefinitionen">Begriffsdefinitionen</a>
              </li>
            </ul>
          </Simple_BLOCK>

          {/* Präambel */}
          <Simple_BLOCK>
            <h3>Verantwortlicher</h3>
            <p>
              Domas Sirbike
              <br />
              Kumamotostrasse 3<br />
              69115, Heidelberg, Deutschland
              <br />
              <br />
              Vertretungsberechtigte Personen: Geschäftsführer
              <br />
              E-Mail-Adresse: domassirbike@gmail.com
            </p>
          </Simple_BLOCK>

          {/* Übersicht der Verarbeitungen */}
          <Simple_BLOCK>
            <h3>Übersicht der Verarbeitungen</h3>
            <p>
              Die nachfolgende Übersicht fasst die Arten der verarbeiteten Daten und die Zwecke
              ihrer Verarbeitung zusammen und verweist auf die betroffenen Personen.
              <br />
              <br />
              <strong>Arten der verarbeiteten Daten:</strong>
              <ul>
                <li>- Bestandsdaten</li>
                <li>- Kontaktdaten</li>
                <li>- Inhaltsdaten</li>
                <li>- Nutzungsdaten</li>
                <li>- Meta-, Kommunikations- und Verfahrensdaten</li>
                <li>- Protokolldaten</li>
              </ul>
              <br />
              <strong>Kategorien betroffener Personen:</strong>
              <ul>
                <li>- Kommunikationspartner</li>
                <li>- Nutzer</li>
                <li>- Teilnehmer</li>
              </ul>
              <br />
              <strong>Zwecke der Verarbeitung:</strong>
              <ul>
                <li>- Kommunikation</li>
                <li>- Sicherheitsmaßnahmen</li>
                <li>- Reichweitenmessung</li>
                <li>- Organisations- und Verwaltungsverfahren</li>
                <li>- Feedback</li>
                <li>- Umfragen und Fragebögen</li>
                <li>- Profile mit nutzerbezogenen Informationen</li>
                <li>- Bereitstellung unseres Onlineangebots und Nutzerfreundlichkeit</li>
                <li>- Informationstechnische Infrastruktur</li>
                <li>- Öffentlichkeitsarbeit</li>
              </ul>
            </p>
          </Simple_BLOCK>

          {/* Maßgebliche Rechtsgrundlagen */}
          <Simple_BLOCK>
            <h3>Maßgebliche Rechtsgrundlagen</h3>
            <p>
              Maßgebliche Rechtsgrundlagen nach der DSGVO: Im Folgenden erhalten Sie eine Übersicht
              der Rechtsgrundlagen der DSGVO, auf deren Basis wir personenbezogene Daten
              verarbeiten. Bitte nehmen Sie zur Kenntnis, dass neben den Regelungen der DSGVO
              nationale Datenschutzvorgaben in Ihrem bzw. unserem Wohn- oder Sitzland gelten können.
              Sollten ferner im Einzelfall speziellere Rechtsgrundlagen maßgeblich sein, teilen wir
              Ihnen diese in der Datenschutzerklärung mit.
              <br />
              <br />
              <strong>Einwilligung (Art. 6 Abs. 1 S. 1 lit. a) DSGVO):</strong> Die betroffene
              Person hat ihre Einwilligung in die Verarbeitung der sie betreffenden
              personenbezogenen Daten für einen spezifischen Zweck oder mehrere bestimmte Zwecke
              gegeben.
              <br />
              <br />
              <strong>
                Vertragserfüllung und vorvertragliche Anfragen (Art. 6 Abs. 1 S. 1 lit. b) DSGVO):
              </strong>{" "}
              Die Verarbeitung ist für die Erfüllung eines Vertrags, dessen Vertragspartei die
              betroffene Person ist, oder zur Durchführung vorvertraglicher Maßnahmen erforderlich,
              die auf Anfrage der betroffenen Person erfolgen.
              <br />
              <br />
              <strong>Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f) DSGVO):</strong> Die
              Verarbeitung ist zur Wahrung der berechtigten Interessen des Verantwortlichen oder
              eines Dritten notwendig, vorausgesetzt, dass die Interessen, Grundrechte und
              Grundfreiheiten der betroffenen Person, die den Schutz personenbezogener Daten
              verlangen, nicht überwiegen.
              <br />
              <br />
              Nationale Datenschutzregelungen in Deutschland: Zusätzlich zu den
              Datenschutzregelungen der DSGVO gelten nationale Regelungen zum Datenschutz in
              Deutschland. Hierzu gehört insbesondere das Gesetz zum Schutz vor Missbrauch
              personenbezogener Daten bei der Datenverarbeitung (Bundesdatenschutzgesetz – BDSG).
              Das BDSG enthält insbesondere Spezialregelungen zum Recht auf Auskunft, zum Recht auf
              Löschung, zum Widerspruchsrecht, zur Verarbeitung besonderer Kategorien
              personenbezogener Daten, zur Verarbeitung für andere Zwecke und zur Übermittlung sowie
              automatisierten Entscheidungsfindung im Einzelfall einschließlich Profiling. Ferner
              können Landesdatenschutzgesetze der einzelnen Bundesländer zur Anwendung gelangen.
              <br />
              <br />
              Hinweis auf Geltung DSGVO und Schweizer DSG: Diese Datenschutzhinweise dienen sowohl
              der Informationserteilung nach dem Schweizer DSG als auch nach der
              Datenschutzgrundverordnung (DSGVO). Aus diesem Grund bitten wir Sie zu beachten, dass
              aufgrund der breiteren räumlichen Anwendung und Verständlichkeit die Begriffe der
              DSGVO verwendet werden. Insbesondere statt der im Schweizer DSG verwendeten Begriffe
              „Bearbeitung" von „Personendaten", "überwiegendes Interesse" und "besonders
              schützenswerte Personendaten" werden die in der DSGVO verwendeten Begriffe
              „Verarbeitung" von „personenbezogenen Daten" sowie "berechtigtes Interesse" und
              "besondere Kategorien von Daten" verwendet. Die gesetzliche Bedeutung der Begriffe
              wird jedoch im Rahmen der Geltung des Schweizer DSG weiterhin nach dem Schweizer DSG
              bestimmt.
            </p>
          </Simple_BLOCK>

          {/* Sicherheitsmaßnahmen */}
          <Simple_BLOCK>
            <h3>Sicherheitsmaßnahmen</h3>
            <p>
              Wir treffen nach Maßgabe der gesetzlichen Vorgaben unter Berücksichtigung des Stands
              der Technik, der Implementierungskosten und der Art, des Umfangs, der Umstände und der
              Zwecke der Verarbeitung sowie der unterschiedlichen Eintrittswahrscheinlichkeiten und
              des Ausmaßes der Bedrohung der Rechte und Freiheiten natürlicher Personen geeignete
              technische und organisatorische Maßnahmen, um ein dem Risiko angemessenes Schutzniveau
              zu gewährleisten.
              <br />
              <br />
              Zu den Maßnahmen gehören insbesondere die Sicherung der Vertraulichkeit, Integrität
              und Verfügbarkeit von Daten durch Kontrolle des physischen und elektronischen Zugangs
              zu den Daten als auch des sie betreffenden Zugriffs, der Eingabe, der Weitergabe, der
              Sicherung der Verfügbarkeit und ihrer Trennung. Des Weiteren haben wir Verfahren
              eingerichtet, die eine Wahrnehmung von Betroffenenrechten, die Löschung von Daten und
              Reaktionen auf die Gefährdung der Daten gewährleisten. Ferner berücksichtigen wir den
              Schutz personenbezogener Daten bereits bei der Entwicklung bzw. Auswahl von Hardware,
              Software sowie Verfahren entsprechend dem Prinzip des Datenschutzes, durch
              Technikgestaltung und durch datenschutzfreundliche Voreinstellungen.
              <br />
              <br />
              Sicherung von Online-Verbindungen durch TLS-/SSL-Verschlüsselungstechnologie (HTTPS):
              Um die Daten der Nutzer, die über unsere Online-Dienste übertragen werden, vor
              unerlaubten Zugriffen zu schützen, setzen wir auf die
              TLS-/SSL-Verschlüsselungstechnologie. Secure Sockets Layer (SSL) und Transport Layer
              Security (TLS) sind die Eckpfeiler der sicheren Datenübertragung im Internet. Diese
              Technologien verschlüsseln die Informationen, die zwischen der Website oder App und
              dem Browser des Nutzers (oder zwischen zwei Servern) übertragen werden, wodurch die
              Daten vor unbefugtem Zugriff geschützt sind. TLS, als die weiterentwickelte und
              sicherere Version von SSL, gewährleistet, dass alle Datenübertragungen den höchsten
              Sicherheitsstandards entsprechen. Wenn eine Website durch ein SSL-/TLS-Zertifikat
              gesichert ist, wird dies durch die Anzeige von HTTPS in der URL signalisiert. Dies
              dient als ein Indikator für die Nutzer, dass ihre Daten sicher und verschlüsselt
              übertragen werden.
            </p>
          </Simple_BLOCK>

          {/* Übermittlung von personenbezogenen Daten */}
          <Simple_BLOCK>
            <h3>Übermittlung von personenbezogenen Daten</h3>
            <p>
              Im Rahmen unserer Verarbeitung von personenbezogenen Daten kommt es vor, dass diese an
              andere Stellen, Unternehmen, rechtlich selbstständige Organisationseinheiten oder
              Personen übermittelt beziehungsweise ihnen gegenüber offengelegt werden. Zu den
              Empfängern dieser Daten können z. B. mit IT-Aufgaben beauftragte Dienstleister gehören
              oder Anbieter von Diensten und Inhalten, die in eine Website eingebunden sind. In
              solchen Fällen beachten wir die gesetzlichen Vorgaben und schließen insbesondere
              entsprechende Verträge bzw. Vereinbarungen, die dem Schutz Ihrer Daten dienen, mit den
              Empfängern Ihrer Daten ab.
            </p>
          </Simple_BLOCK>

          {/* Internationale Datentransfers */}
          <Simple_BLOCK>
            <h3>Internationale Datentransfers</h3>
            <p>
              Datenverarbeitung in Drittländern: Sofern wir Daten in einem Drittland (d. h.,
              außerhalb der Europäischen Union (EU), des Europäischen Wirtschaftsraums (EWR))
              verarbeiten oder die Verarbeitung im Rahmen der Inanspruchnahme von Diensten Dritter
              oder der Offenlegung bzw. Übermittlung von Daten an andere Personen, Stellen oder
              Unternehmen stattfindet, erfolgt dies nur im Einklang mit den gesetzlichen Vorgaben.
              Sofern das Datenschutzniveau in dem Drittland mittels eines Angemessenheitsbeschlusses
              anerkannt wurde (Art. 45 DSGVO), dient dieser als Grundlage des Datentransfers. Im
              Übrigen erfolgen Datentransfers nur dann, wenn das Datenschutzniveau anderweitig
              gesichert ist, insbesondere durch Standardvertragsklauseln (Art. 46 Abs. 2 lit. c)
              DSGVO), ausdrückliche Einwilligung oder im Fall vertraglicher oder gesetzlich
              erforderlicher Übermittlung (Art. 49 Abs. 1 DSGVO). Im Übrigen teilen wir Ihnen die
              Grundlagen der Drittlandübermittlung bei den einzelnen Anbietern aus dem Drittland
              mit, wobei die Angemessenheitsbeschlüsse als Grundlagen vorrangig gelten.
              Informationen zu Drittlandtransfers und vorliegenden Angemessenheitsbeschlüssen können
              dem Informationsangebot der EU-Kommission entnommen werden:{" "}
              <a href="https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection_en?prefLang=de">
                https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection_en?prefLang=de
              </a>
              .
              <br />
              <br />
              EU-US Trans-Atlantic Data Privacy Framework: Im Rahmen des sogenannten „Data Privacy
              Framework" (DPF) hat die EU-Kommission das Datenschutzniveau ebenfalls für bestimmte
              Unternehmen aus den USA im Rahmen der Angemessenheitsbeschlusses vom 10.07.2023 als
              sicher anerkannt. Die Liste der zertifizierten Unternehmen als auch weitere
              Informationen zu dem DPF können Sie der Website des Handelsministeriums der USA unter{" "}
              <a href="https://www.dataprivacyframework.gov/">
                https://www.dataprivacyframework.gov/
              </a>{" "}
              (in Englisch) entnehmen. Wir informieren Sie im Rahmen der Datenschutzhinweise, welche
              von uns eingesetzten Diensteanbieter unter dem Data Privacy Framework zertifiziert
              sind.
            </p>
          </Simple_BLOCK>

          {/* Allgemeine Informationen zur Datenspeicherung und Löschung */}
          <Simple_BLOCK>
            <h3>Allgemeine Informationen zur Datenspeicherung und Löschung</h3>
            <p>
              Wir löschen personenbezogene Daten, die wir verarbeiten, gemäß den gesetzlichen
              Bestimmungen, sobald die zugrundeliegenden Einwilligungen widerrufen werden oder keine
              weiteren rechtlichen Grundlagen für die Verarbeitung bestehen. Dies betrifft Fälle, in
              denen der ursprüngliche Verarbeitungszweck entfällt oder die Daten nicht mehr benötigt
              werden. Ausnahmen von dieser Regelung bestehen, wenn gesetzliche Pflichten oder
              besondere Interessen eine längere Aufbewahrung oder Archivierung der Daten erfordern.
              <br />
              <br />
              Insbesondere müssen Daten, die aus handels- oder steuerrechtlichen Gründen aufbewahrt
              werden müssen oder deren Speicherung notwendig ist zur Rechtsverfolgung oder zum
              Schutz der Rechte anderer natürlicher oder juristischer Personen, entsprechend
              archiviert werden.
              <br />
              <br />
              Unsere Datenschutzhinweise enthalten zusätzliche Informationen zur Aufbewahrung und
              Löschung von Daten, die speziell für bestimmte Verarbeitungsprozesse gelten.
              <br />
              <br />
              Bei mehreren Angaben zur Aufbewahrungsdauer oder Löschungsfristen eines Datums, ist
              stets die längste Frist maßgeblich.
              <br />
              <br />
              Beginnt eine Frist nicht ausdrücklich zu einem bestimmten Datum und beträgt sie
              mindestens ein Jahr, so startet sie automatisch am Ende des Kalenderjahres, in dem das
              fristauslösende Ereignis eingetreten ist. Im Fall laufender Vertragsverhältnisse, in
              deren Rahmen Daten gespeichert werden, ist das fristauslösende Ereignis der Zeitpunkt
              des Wirksamwerdens der Kündigung oder sonstige Beendigung des Rechtsverhältnisses.
              <br />
              <br />
              Daten, die nicht mehr für den ursprünglich vorgesehenen Zweck, sondern aufgrund
              gesetzlicher Vorgaben oder anderer Gründe aufbewahrt werden, verarbeiten wir
              ausschließlich zu den Gründen, die ihre Aufbewahrung rechtfertigen.
              <br />
              <br />
              Weitere Hinweise zu Verarbeitungsprozessen, Verfahren und Diensten:
              <br />
              <br />
              <strong>Aufbewahrung und Löschung von Daten:</strong> Die folgenden allgemeinen
              Fristen gelten für die Aufbewahrung und Archivierung nach deutschem Recht:
              <ul>
                <li>
                  10 Jahre - Aufbewahrungsfrist für Bücher und Aufzeichnungen, Jahresabschlüsse,
                  Inventare, Lageberichte, Eröffnungsbilanz sowie die zu ihrem Verständnis
                  erforderlichen Arbeitsanweisungen und sonstigen Organisationsunterlagen,
                  Buchungsbelege und Rechnungen (§ 147 Abs. 3 i. V. m. Abs. 1 Nr. 1, 4 und 4a AO, §
                  14b Abs. 1 UStG, § 257 Abs. 1 Nr. 1 u. 4, Abs. 4 HGB).
                </li>
                <li>
                  6 Jahre - Übrige Geschäftsunterlagen: empfangene Handels- oder Geschäftsbriefe,
                  Wiedergaben der abgesandten Handels- oder Geschäftsbriefe, sonstige Unterlagen,
                  soweit sie für die Besteuerung von Bedeutung sind, z. B. Stundenlohnzettel,
                  Betriebsabrechnungsbögen, Kalkulationsunterlagen, Preisauszeichnungen, aber auch
                  Lohnabrechnungsunterlagen, soweit sie nicht bereits Buchungsbelege sind und
                  Kassenstreifen (§ 147 Abs. 3 i. V. m. Abs. 1 Nr. 2, 3, 5 AO, § 257 Abs. 1 Nr. 2 u.
                  3, Abs. 4 HGB).
                </li>
                <li>
                  3 Jahre - Daten, die erforderlich sind, um potenzielle Gewährleistungs- und
                  Schadensersatzansprüche oder ähnliche vertragliche Ansprüche und Rechte zu
                  berücksichtigen sowie damit verbundene Anfragen zu bearbeiten, basierend auf
                  früheren Geschäftserfahrungen und üblichen Branchenpraktiken, werden für die Dauer
                  der regulären gesetzlichen Verjährungsfrist von drei Jahren gespeichert (§§ 195,
                  199 BGB).
                </li>
              </ul>
            </p>
          </Simple_BLOCK>

          {/* Rechte der betroffenen Personen */}
          <Simple_BLOCK>
            <h3>Rechte der betroffenen Personen</h3>
            <ul>
              <li>
                <strong>Widerspruchsrecht:</strong> Sie haben das Recht, aus Gründen, die sich aus
                Ihrer besonderen Situation ergeben, jederzeit gegen die Verarbeitung der Sie
                betreffenden personenbezogenen Daten, die aufgrund von Art. 6 Abs. 1 lit. e oder f
                DSGVO erfolgt, Widerspruch einzulegen; dies gilt auch für ein auf diese Bestimmungen
                gestütztes Profiling. Bei Direktwerbung können Sie ebenfalls jederzeit Widerspruch
                einlegen.
              </li>
              <br />
              <li>
                <strong>Widerrufsrecht bei Einwilligungen:</strong> Sie haben das Recht, erteilte
                Einwilligungen jederzeit zu widerrufen.
              </li>
              <br />
              <li>
                <strong>Auskunftsrecht:</strong> Sie haben das Recht, eine Bestätigung darüber zu
                verlangen, ob betreffende Daten verarbeitet werden, und auf Auskunft über diese
                Daten sowie auf weitere gesetzlich vorgeschriebene Informationen und Kopien der
                Daten.
              </li>
              <br />
              <li>
                <strong>Recht auf Berichtigung:</strong> Sie haben das Recht, die Vervollständigung
                oder Berichtigung der Sie betreffenden unrichtigen Daten zu verlangen.
              </li>
              <br />
              <li>
                <strong>Recht auf Löschung und Einschränkung der Verarbeitung:</strong> Sie haben
                das Recht, unter bestimmten Voraussetzungen die Löschung oder Einschränkung der
                Verarbeitung der Sie betreffenden Daten zu verlangen.
              </li>
              <br />
              <li>
                <strong>Recht auf Datenübertragbarkeit:</strong> Sie haben das Recht, die Sie
                betreffenden Daten, die Sie uns bereitgestellt haben, in einem strukturierten,
                gängigen und maschinenlesbaren Format zu erhalten oder deren Übermittlung an einen
                anderen Verantwortlichen zu fordern.
              </li>
              <br />
              <li>
                <strong>Beschwerde bei Aufsichtsbehörde:</strong> Sie haben das Recht, unbeschadet
                anderer verwaltungsrechtlicher oder gerichtlicher Rechtsbehelfe, eine Beschwerde bei
                einer Aufsichtsbehörde, insbesondere in dem Mitgliedstaat Ihres Aufenthaltsorts,
                Ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes, einzulegen, wenn Sie
                der Ansicht sind, dass die Verarbeitung der Sie betreffenden personenbezogenen Daten
                gegen die DSGVO verstößt.
              </li>
            </ul>
          </Simple_BLOCK>

          {/* Bereitstellung des Onlineangebots und Webhosting */}
          <Simple_BLOCK>
            <h3>Bereitstellung des Onlineangebots und Webhosting</h3>
            <p>
              Wir verarbeiten die Daten der Nutzer, um ihnen unsere Online-Dienste zur Verfügung
              stellen zu können. Zu diesem Zweck verarbeiten wir die IP-Adresse des Nutzers, die
              notwendig ist, um die Inhalte und Funktionen unserer Online-Dienste an den Browser
              oder das Endgerät der Nutzer zu übermitteln.
              <br />
              <br />
              <strong>Verarbeitete Datenarten:</strong> Nutzungsdaten (z. B. Seitenaufrufe und
              Verweildauer, Klickpfade, Nutzungsintensität und -frequenz, verwendete Gerätetypen und
              Betriebssysteme, Interaktionen mit Inhalten und Funktionen); Meta-, Kommunikations-
              und Verfahrensdaten (z. B. IP-Adressen, Zeitangaben, Identifikationsnummern,
              beteiligte Personen). Protokolldaten (z. B. Logfiles betreffend Logins oder den Abruf
              von Daten oder Zugriffszeiten).
              <br />
              <br />
              <strong>Betroffene Personen:</strong> Nutzer (z. B. Webseitenbesucher, Nutzer von
              Onlinediensten).
              <br />
              <br />
              <strong>Zwecke der Verarbeitung:</strong> Bereitstellung unseres Onlineangebots und
              Nutzerfreundlichkeit; Informationstechnische Infrastruktur (Betrieb und Bereitstellung
              von Informationssystemen und technischen Geräten (Computer, Server etc.)).
              Sicherheitsmaßnahmen.
              <br />
              <br />
              <strong>Aufbewahrung und Löschung:</strong> Löschung entsprechend Angaben im Abschnitt
              "Allgemeine Informationen zur Datenspeicherung und Löschung".
              <br />
              <br />
              <strong>Rechtsgrundlagen:</strong> Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f)
              DSGVO).
              <br />
              <br />
              <strong>
                Weitere Hinweise zu Verarbeitungsprozessen, Verfahren und Diensten:
              </strong>{" "}
              Erhebung von Zugriffsdaten und Logfiles: Der Zugriff auf unser Onlineangebot wird in
              Form von sogenannten "Server-Logfiles" protokolliert. Zu den Serverlogfiles können die
              Adresse und der Name der abgerufenen Webseiten und Dateien, Datum und Uhrzeit des
              Abrufs, übertragene Datenmengen, Meldung über erfolgreichen Abruf, Browsertyp nebst
              Version, das Betriebssystem des Nutzers, Referrer URL (die zuvor besuchte Seite) und
              im Regelfall IP-Adressen und der anfragende Provider gehören. Die Serverlogfiles
              können zum einen zu Sicherheitszwecken eingesetzt werden, z. B. um eine Überlastung
              der Server zu vermeiden (insbesondere im Fall von missbräuchlichen Angriffen,
              sogenannten DDoS-Attacken), und zum anderen, um die Auslastung der Server und ihre
              Stabilität sicherzustellen; Rechtsgrundlagen: Berechtigte Interessen (Art. 6 Abs. 1 S.
              1 lit. f) DSGVO). Löschung von Daten: Logfile-Informationen werden für die Dauer von
              maximal 30 Tagen gespeichert und danach gelöscht oder anonymisiert. Daten, deren
              weitere Aufbewahrung zu Beweiszwecken erforderlich ist, sind bis zur endgültigen
              Klärung des jeweiligen Vorfalls von der Löschung ausgenommen.
            </p>
          </Simple_BLOCK>

          {/* Einsatz von Cookies */}
          <Simple_BLOCK>
            <h3>Einsatz von Cookies</h3>
            <p>
              Cookies sind kleine Textdateien bzw. sonstige Speichervermerke, die Informationen auf
              Endgeräten speichern und aus ihnen auslesen. Zum Beispiel, um den Log-in-Status in
              einem Nutzerkonto, einen Warenkorbinhalt in einem E-Shop, die aufgerufenen Inhalte
              oder verwendete Funktionen eines Onlineangebots zu speichern. Cookies können ferner in
              Bezug auf unterschiedliche Anliegen Einsatz finden, etwa zu Zwecken der
              Funktionsfähigkeit, der Sicherheit und des Komforts von Onlineangeboten sowie der
              Erstellung von Analysen der Besucherströme.
              <br />
              <br />
              <strong>Hinweise zur Einwilligung:</strong> Wir setzen Cookies im Einklang mit den
              gesetzlichen Vorschriften ein. Daher holen wir von den Nutzern eine vorhergehende
              Einwilligung ein, es sei denn, sie ist laut Gesetzeslage nicht gefordert. Eine
              Erlaubnis ist insbesondere nicht notwendig, wenn das Speichern und das Auslesen der
              Informationen, also auch von Cookies, unbedingt erforderlich sind, um den Nutzern
              einen von ihnen ausdrücklich gewünschten Telemediendienst (also unser Onlineangebot)
              zur Verfügung zu stellen. Die widerrufliche Einwilligung wird ihnen gegenüber deutlich
              kommuniziert und enthält die Informationen zur jeweiligen Cookie-Nutzung.
              <br />
              <br />
              <strong>Hinweise zu datenschutzrechtlichen Rechtsgrundlagen:</strong> Auf welcher
              datenschutzrechtlichen Grundlage wir die personenbezogenen Daten der Nutzer mithilfe
              von Cookies verarbeiten, hängt davon ab, ob wir sie um eine Einwilligung bitten. Falls
              die Nutzer akzeptieren, ist die Rechtsgrundlage der Verarbeitung ihrer Daten die
              erklärte Einwilligung. Andernfalls werden die mithilfe von Cookies verarbeiteten Daten
              auf Grundlage unserer berechtigten Interessen (z. B. an einem betriebswirtschaftlichen
              Betrieb unseres Onlineangebots und der Verbesserung seiner Nutzbarkeit) verarbeitet
              oder, falls dies im Rahmen der Erfüllung unserer vertraglichen Pflichten erfolgt, wenn
              der Einsatz von Cookies erforderlich ist, um unseren vertraglichen Verpflichtungen
              nachzukommen. Zu welchen Zwecken die Cookies von uns verwertet werden, darüber klären
              wir im Laufe dieser Datenschutzerklärung oder im Rahmen von unseren Einwilligungs- und
              Verarbeitungsprozessen auf.
              <br />
              <br />
              <strong>Speicherdauer:</strong> Im Hinblick auf die Speicherdauer werden die folgenden
              Arten von Cookies unterschieden:
              <ul>
                <li>
                  <strong>Temporäre Cookies (auch: Session- oder Sitzungscookies):</strong>{" "}
                  Temporäre Cookies werden spätestens gelöscht, nachdem ein Nutzer ein Onlineangebot
                  verlassen und sein Endgerät (z. B. Browser oder mobile Applikation) geschlossen
                  hat.
                </li>
                <li>
                  <strong>Permanente Cookies:</strong> Permanente Cookies bleiben auch nach dem
                  Schließen des Endgeräts gespeichert. So können beispielsweise der Log-in-Status
                  gespeichert und bevorzugte Inhalte direkt angezeigt werden, wenn der Nutzer eine
                  Website erneut besucht. Ebenso können die mithilfe von Cookies erhobenen
                  Nutzerdaten zur Reichweitenmessung Verwendung finden. Sofern wir Nutzern keine
                  expliziten Angaben zur Art und Speicherdauer von Cookies mitteilen (z. B. im
                  Rahmen der Einholung der Einwilligung), sollten sie davon ausgehen, dass diese
                  permanent sind und die Speicherdauer bis zu zwei Jahre betragen kann.
                </li>
              </ul>
              <br />
              <br />
              <strong>Allgemeine Hinweise zum Widerruf und Widerspruch (Opt-out):</strong> Nutzer
              können die von ihnen abgegebenen Einwilligungen jederzeit widerrufen und zudem einen
              Widerspruch gegen die Verarbeitung entsprechend den gesetzlichen Vorgaben, auch
              mittels der Privatsphäre-Einstellungen ihres Browsers, erklären.
              <br />
              <br />
              <strong>Verarbeitete Datenarten:</strong> Meta-, Kommunikations- und Verfahrensdaten
              (z. B. IP-Adressen, Zeitangaben, Identifikationsnummern, beteiligte Personen).
              <br />
              <br />
              <strong>Betroffene Personen:</strong> Nutzer (z. B. Webseitenbesucher, Nutzer von
              Onlinediensten).
              <br />
              <br />
              <strong>Rechtsgrundlagen:</strong> Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f)
              DSGVO). Einwilligung (Art. 6 Abs. 1 S. 1 lit. a) DSGVO).
              <br />
              <br />
              <strong>
                Weitere Hinweise zu Verarbeitungsprozessen, Verfahren und Diensten:
              </strong>{" "}
              Verarbeitung von Cookie-Daten auf Grundlage einer Einwilligung: Wir setzen eine
              Einwilligungs-Management-Lösung ein, bei der die Einwilligung der Nutzer zur
              Verwendung von Cookies oder zu den im Rahmen der Einwilligungs-Management-Lösung
              genannten Verfahren und Anbietern eingeholt wird. Dieses Verfahren dient der
              Einholung, Protokollierung, Verwaltung und dem Widerruf von Einwilligungen,
              insbesondere bezogen auf den Einsatz von Cookies und vergleichbaren Technologien, die
              zur Speicherung, zum Auslesen und zur Verarbeitung von Informationen auf den
              Endgeräten der Nutzer eingesetzt werden. Im Rahmen dieses Verfahrens werden die
              Einwilligungen der Nutzer für die Nutzung von Cookies und die damit verbundenen
              Verarbeitungen von Informationen, einschließlich der im
              Einwilligungs-Management-Verfahren genannten spezifischen Verarbeitungen und Anbieter,
              eingeholt. Die Nutzer haben zudem die Möglichkeit, ihre Einwilligungen zu verwalten
              und zu widerrufen. Die Einwilligungserklärungen werden gespeichert, um eine erneute
              Abfrage zu vermeiden und den Nachweis der Einwilligung gemäß der gesetzlichen
              Anforderungen führen zu können. Die Speicherung erfolgt serverseitig und/oder in einem
              Cookie (sogenanntes Opt-In-Cookie) oder mittels vergleichbarer Technologien, um die
              Einwilligung einem spezifischen Nutzer oder dessen Gerät zuordnen zu können. Sofern
              keine spezifischen Angaben zu den Anbietern von Einwilligungs-Management-Diensten
              vorliegen, gelten folgende allgemeine Hinweise: Die Dauer der Speicherung der
              Einwilligung beträgt bis zu zwei Jahre. Dabei wird ein pseudonymer
              Nutzer-Identifikator erstellt, der zusammen mit dem Zeitpunkt der Einwilligung, den
              Angaben zum Umfang der Einwilligung (z. B. betreffende Kategorien von Cookies und/oder
              Diensteanbieter) sowie Informationen über den Browser, das System und das verwendete
              Endgerät gespeichert wird; Rechtsgrundlagen: Einwilligung (Art. 6 Abs. 1 S. 1 lit. a)
              DSGVO).
            </p>
          </Simple_BLOCK>

          {/* Kontakt- und Anfrageverwaltung */}
          <Simple_BLOCK>
            <h3>Kontakt- und Anfrageverwaltung</h3>
            <p>
              Bei der Kontaktaufnahme mit uns (z. B. per Post, Kontaktformular, E-Mail, Telefon oder
              via soziale Medien) sowie im Rahmen bestehender Nutzer- und Geschäftsbeziehungen
              werden die Angaben der anfragenden Personen verarbeitet, soweit dies zur Beantwortung
              der Kontaktanfragen und etwaiger angefragter Maßnahmen erforderlich ist.
              <br />
              <br />
              <strong>Verarbeitete Datenarten:</strong> Bestandsdaten (z. B. der vollständige Name,
              Wohnadresse, Kontaktinformationen, Kundennummer, etc.); Kontaktdaten (z. B. Post- und
              E-Mail-Adressen oder Telefonnummern); Inhaltsdaten (z. B. textliche oder bildliche
              Nachrichten und Beiträge sowie die sie betreffenden Informationen, wie z. B. Angaben
              zur Autorenschaft oder Zeitpunkt der Erstellung); Nutzungsdaten (z. B. Seitenaufrufe
              und Verweildauer, Klickpfade, Nutzungsintensität und -frequenz, verwendete Gerätetypen
              und Betriebssysteme, Interaktionen mit Inhalten und Funktionen). Meta-,
              Kommunikations- und Verfahrensdaten (z. B. IP-Adressen, Zeitangaben,
              Identifikationsnummern, beteiligte Personen).
              <br />
              <br />
              <strong>Betroffene Personen:</strong> Kommunikationspartner.
              <br />
              <br />
              <strong>Zwecke der Verarbeitung:</strong> Kommunikation; Organisations- und
              Verwaltungsverfahren; Feedback (z. B. Sammeln von Feedback via Online-Formular).
              Bereitstellung unseres Onlineangebotes und Nutzerfreundlichkeit.
              <br />
              <br />
              <strong>Aufbewahrung und Löschung:</strong> Löschung entsprechend Angaben im Abschnitt
              "Allgemeine Informationen zur Datenspeicherung und Löschung".
              <br />
              <br />
              <strong>Rechtsgrundlagen:</strong> Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f)
              DSGVO). Vertragserfüllung und vorvertragliche Anfragen (Art. 6 Abs. 1 S. 1 lit. b)
              DSGVO).
              <br />
              <br />
              <strong>
                Weitere Hinweise zu Verarbeitungsprozessen, Verfahren und Diensten:
              </strong>{" "}
              Kontaktformular: Bei Kontaktaufnahme über unser Kontaktformular, per E-Mail oder
              anderen Kommunikationswegen, verarbeiten wir die uns übermittelten personenbezogenen
              Daten zur Beantwortung und Bearbeitung des jeweiligen Anliegens. Dies umfasst in der
              Regel Angaben wie Name, Kontaktinformationen und gegebenenfalls weitere Informationen,
              die uns mitgeteilt werden und zur angemessenen Bearbeitung erforderlich sind. Wir
              nutzen diese Daten ausschließlich für den angegebenen Zweck der Kontaktaufnahme und
              Kommunikation; Rechtsgrundlagen: Vertragserfüllung und vorvertragliche Anfragen (Art.
              6 Abs. 1 S. 1 lit. b) DSGVO), Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f)
              DSGVO).
            </p>
          </Simple_BLOCK>

          {/* Umfragen und Befragungen */}
          <Simple_BLOCK>
            <h3>Umfragen und Befragungen</h3>
            <p>
              Wir führen Umfragen und Befragungen durch, um Informationen für den jeweils
              kommunizierten Umfrage- bzw. Befragungszweck zu sammeln. Die von uns durchgeführten
              Umfragen und Befragungen (nachfolgend "Befragungen") werden anonym ausgewertet. Eine
              Verarbeitung personenbezogener Daten erfolgt nur insoweit, als dies zur Bereitstellung
              und technischen Durchführung der Umfragen erforderlich ist (z. B. Verarbeitung der
              IP-Adresse, um die Umfrage im Browser des Nutzers darzustellen oder mithilfe eines
              Cookies eine Wiederaufnahme der Umfrage zu ermöglichen).
              <br />
              <br />
              <strong>Verarbeitete Datenarten:</strong> Bestandsdaten (z. B. der vollständige Name,
              Wohnadresse, Kontaktinformationen, Kundennummer, etc.); Kontaktdaten (z. B. Post- und
              E-Mail-Adressen oder Telefonnummern); Inhaltsdaten (z. B. textliche oder bildliche
              Nachrichten und Beiträge sowie die sie betreffenden Informationen, wie z. B. Angaben
              zur Autorenschaft oder Zeitpunkt der Erstellung). Nutzungsdaten (z. B. Seitenaufrufe
              und Verweildauer, Klickpfade, Nutzungsintensität und -frequenz, verwendete Gerätetypen
              und Betriebssysteme, Interaktionen mit Inhalten und Funktionen).
              <br />
              <br />
              <strong>Betroffene Personen:</strong> Teilnehmer.
              <br />
              <br />
              <strong>Zwecke der Verarbeitung:</strong> Feedback (z. B. Sammeln von Feedback via
              Online-Formular). Umfragen und Fragebögen (z. B. Umfragen mit Eingabemöglichkeiten,
              Multiple-Choice-Fragen).
              <br />
              <br />
              <strong>Aufbewahrung und Löschung:</strong> Löschung entsprechend Angaben im Abschnitt
              "Allgemeine Informationen zur Datenspeicherung und Löschung".
              <br />
              <br />
              <strong>Rechtsgrundlagen:</strong> Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f)
              DSGVO).
            </p>
          </Simple_BLOCK>

          {/* Kommentare und Beiträge */}
          <Simple_BLOCK>
            <h3>Webanalyse, Monitoring und Optimierung</h3>
            <p>
              Die Webanalyse (auch als „Reichweitenmessung“ bezeichnet) dient der Auswertung der
              Besucherströme unseres Onlineangebots und kann Verhalten, Interessen oder
              demografische Informationen zu den Besuchern, wie beispielsweise Alter oder
              Geschlecht, als pseudonyme Werte umfassen. Mithilfe der Reichweitenanalyse können wir
              zum Beispiel erkennen, zu welcher Zeit unser Onlineangebot oder dessen Funktionen
              beziehungsweise Inhalte am häufigsten genutzt werden, oder zur Wiederverwendung
              einladen.
              <br />
              <br />
              Neben der Webanalyse können wir auch Testverfahren einsetzen, um etwa unterschiedliche
              Versionen unseres Onlineangebots oder seiner Bestandteile zu testen und zu optimieren.
              <br />
              <br />
              Sofern nachfolgend nicht anders angegeben, können zu diesen Zwecken Profile, also zu
              einem Nutzungsvorgang zusammengefasste Daten, angelegt und Informationen in einem
              Browser bzw. in einem Endgerät gespeichert und dann ausgelesen werden. Zu den
              erhobenen Angaben gehören insbesondere besuchte Websites und dort genutzte Elemente
              sowie technische Auskünfte, wie etwa der verwendete Browser, das benutzte
              Computersystem sowie Angaben zu Nutzungszeiten.
              <br />
              <br />
              Darüber hinaus werden die IP-Adressen der Nutzer gespeichert. Jedoch nutzen wir ein
              IP-Masking-Verfahren (d. h. Pseudonymisierung durch Kürzung der IP-Adresse) zum Schutz
              der Nutzer. Generell werden die im Rahmen von Webanalyse, A/B-Testings und Optimierung
              keine Klardaten der Nutzer (wie z. B. E-Mail-Adressen oder Namen) gespeichert, sondern
              Pseudonyme. Das heißt, wir als auch die Anbieter der eingesetzten Software kennen
              nicht die tatsächliche Identität der Nutzer, sondern nur die zum Zweck der jeweiligen
              Verfahren in deren Profilen gespeicherten Angaben.
              <br />
              <br />
              <strong>Hinweise zu Rechtsgrundlagen:</strong> Sofern wir die Nutzer um deren
              Einwilligung in den Einsatz der Drittanbieter bitten, stellt die Rechtsgrundlage der
              Datenverarbeitung die Einwilligung dar. Ansonsten werden die Nutzerdaten auf Grundlage
              unserer berechtigten Interessen (d. h. Interesse an effizienten, wirtschaftlichen und
              empfängerfreundlichen Leistungen) verarbeitet. In diesem Zusammenhang möchten wir Sie
              auch auf die Informationen zur Verwendung von Cookies in dieser Datenschutzerklärung
              hinweisen.
              <br />
              <br />
              <strong>Verarbeitete Datenarten:</strong> Nutzungsdaten (z. B. Seitenaufrufe und
              Verweildauer, Klickpfade, Nutzungsintensität und -frequenz, verwendete Gerätetypen und
              Betriebssysteme, Interaktionen mit Inhalten und Funktionen). Meta-, Kommunikations-
              und Verfahrensdaten (z. B. IP-Adressen, Zeitangaben, Identifikationsnummern,
              beteiligte Personen).
            </p>
          </Simple_BLOCK>

          {/* Kommentare und Beiträge */}
          <Simple_BLOCK>
            <h3>Webanalyse, Monitoring und Optimierung</h3>
            <p>
              Die Webanalyse (auch als „Reichweitenmessung" bezeichnet) dient der Auswertung der
              Besucherströme unseres Onlineangebots und kann Verhalten, Interessen oder
              demografische Informationen zu den Besuchern, wie beispielsweise Alter oder
              Geschlecht, als pseudonyme Werte umfassen. Mithilfe der Reichweitenanalyse können wir
              zum Beispiel erkennen, zu welcher Zeit unser Onlineangebot oder dessen Funktionen
              beziehungsweise Inhalte am häufigsten genutzt werden, oder zur Wiederverwendung
              einladen. Ebenso ist es uns möglich, nachzuvollziehen, welche Bereiche der Optimierung
              bedürfen.
              <br />
              <br />
              Neben der Webanalyse können wir auch Testverfahren einsetzen, um etwa unterschiedliche
              Versionen unseres Onlineangebots oder seiner Bestandteile zu testen und zu optimieren.
              <br />
              <br />
              Sofern nachfolgend nicht anders angegeben, können zu diesen Zwecken Profile, also zu
              einem Nutzungsvorgang zusammengefasste Daten, angelegt und Informationen in einem
              Browser bzw. in einem Endgerät gespeichert und dann ausgelesen werden. Zu den
              erhobenen Angaben gehören insbesondere besuchte Websites und dort genutzte Elemente
              sowie technische Auskünfte, wie etwa der verwendete Browser, das benutzte
              Computersystem sowie Angaben zu Nutzungszeiten. Sofern sich Nutzer in die Erhebung
              ihrer Standortdaten uns gegenüber oder gegenüber den Anbietern der von uns
              eingesetzten Dienste einverstanden erklärt haben, ist auch die Verarbeitung von
              Standortdaten möglich.
              <br />
              <br />
              Darüber hinaus werden die IP-Adressen der Nutzer gespeichert. Jedoch nutzen wir ein
              IP-Masking-Verfahren (d. h. Pseudonymisierung durch Kürzung der IP-Adresse) zum Schutz
              der Nutzer. Generell werden die im Rahmen von Webanalyse, A/B-Testings und Optimierung
              keine Klardaten der Nutzer (wie z. B. E-Mail-Adressen oder Namen) gespeichert, sondern
              Pseudonyme. Das heißt, wir als auch die Anbieter der eingesetzten Software kennen
              nicht die tatsächliche Identität der Nutzer, sondern nur die zum Zweck der jeweiligen
              Verfahren in deren Profilen gespeicherten Angaben.
              <br />
              <br />
              Hinweise zu Rechtsgrundlagen: Sofern wir die Nutzer um deren Einwilligung in den
              Einsatz der Drittanbieter bitten, stellt die Rechtsgrundlage der Datenverarbeitung die
              Einwilligung dar. Ansonsten werden die Nutzerdaten auf Grundlage unserer berechtigten
              Interessen (d. h. Interesse an effizienten, wirtschaftlichen und empfängerfreundlichen
              Leistungen) verarbeitet. In diesem Zusammenhang möchten wir Sie auch auf die
              Informationen zur Verwendung von Cookies in dieser Datenschutzerklärung hinweisen.
              <br />
              <br />
              Verarbeitete Datenarten: Nutzungsdaten (z. B. Seitenaufrufe und Verweildauer,
              Klickpfade, Nutzungsintensität und -frequenz, verwendete Gerätetypen und
              Betriebssysteme, Interaktionen mit Inhalten und Funktionen). Meta-, Kommunikations-
              und Verfahrensdaten (z. B. IP-Adressen, Zeitangaben, Identifikationsnummern,
              beteiligte Personen).
              <br />
              <br />
              Betroffene Personen: Nutzer (z. B. Webseitenbesucher, Nutzer von Onlinediensten).
              <br />
              <br />
              Zwecke der Verarbeitung: Reichweitenmessung (z. B. Zugriffsstatistiken, Erkennung
              wiederkehrender Besucher); Profile mit nutzerbezogenen Informationen (Erstellen von
              Nutzerprofilen). Bereitstellung unseres Onlineangebotes und Nutzerfreundlichkeit.
              <br />
              <br />
              Aufbewahrung und Löschung: Löschung entsprechend Angaben im Abschnitt "Allgemeine
              Informationen zur Datenspeicherung und Löschung". Speicherung von Cookies von bis zu 2
              Jahren (Sofern nicht anders angegeben, können Cookies und ähnliche Speichermethoden
              für einen Zeitraum von zwei Jahren auf den Geräten der Nutzer gespeichert werden.).
              <br />
              <br />
              Sicherheitsmaßnahmen: IP-Masking (Pseudonymisierung der IP-Adresse).
              <br />
              <br />
              Rechtsgrundlagen: Einwilligung (Art. 6 Abs. 1 S. 1 lit. a) DSGVO). Berechtigte
              Interessen (Art. 6 Abs. 1 S. 1 lit. f) DSGVO).
              <br />
              <br />
              Weitere Hinweise zu Verarbeitungsprozessen, Verfahren und Diensten:
              <br />
              <br />
              Google Analytics: Wir verwenden Google Analytics zur Messung und Analyse der Nutzung
              unseres Onlineangebotes auf der Grundlage einer pseudonymen
              Nutzeridentifikationsnummer. Diese Identifikationsnummer enthält keine eindeutigen
              Daten, wie Namen oder E-Mail-Adressen. Sie dient dazu, Analyseinformationen einem
              Endgerät zuzuordnen, um zu erkennen, welche Inhalte die Nutzer innerhalb eines oder
              verschiedener Nutzungsvorgänge aufgerufen haben, welche Suchbegriffe sie verwendet
              haben, diese erneut aufgerufen haben oder mit unserem Onlineangebot interagiert haben.
              Ebenso werden der Zeitpunkt der Nutzung und deren Dauer gespeichert, sowie die Quellen
              der Nutzer, die auf unser Onlineangebot verweisen und technische Aspekte ihrer
              Endgeräte und Browser.
              <br />
              <br />
              Dabei werden pseudonyme Profile von Nutzern mit Informationen aus der Nutzung
              verschiedener Geräte erstellt, wobei Cookies eingesetzt werden können. Google
              Analytics protokolliert und speichert keine individuellen IP-Adressen für EU-Nutzer.
              Analytics stellt jedoch grobe geografische Standortdaten bereit, indem es die
              folgenden Metadaten von IP-Adressen ableitet: Stadt (und der abgeleitete Breiten- und
              Längengrad der Stadt), Kontinent, Land, Region, Subkontinent (und ID-basierte
              Gegenstücke). Beim EU-Datenverkehr werden die IP-Adressdaten ausschließlich für diese
              Ableitung von Geolokalisierungsdaten verwendet, bevor sie sofort gelöscht werden. Sie
              werden nicht protokolliert, sind nicht zugänglich und werden nicht für weitere
              Verwendungszwecke genutzt. Wenn Google Analytics Messdaten sammelt, werden alle
              IP-Abfragen auf EU-basierten Servern durchgeführt, bevor der Verkehr zur Verarbeitung
              an Analytics-Server weitergeleitet wird; Dienstanbieter: Google Ireland Limited,
              Gordon House, Barrow Street, Dublin 4, Irland; Rechtsgrundlagen: Einwilligung (Art. 6
              Abs. 1 S. 1 lit. a) DSGVO); Website:
              https://marketingplatform.google.com/intl/de/about/analytics/; Sicherheitsmaßnahmen:
              IP-Masking (Pseudonymisierung der IP-Adresse); Datenschutzerklärung:
              https://policies.google.com/privacy; Auftragsverarbeitungsvertrag:
              https://business.safety.google/adsprocessorterms/; Grundlage Drittlandtransfers: Data
              Privacy Framework (DPF); Widerspruchsmöglichkeit (Opt-Out): Opt-Out-Plugin:
              https://tools.google.com/dlpage/gaoptout?hl=de, Einstellungen für die Darstellung von
              Werbeeinblendungen: https://myadcenter.google.com/personalizationoff. Weitere
              Informationen: https://business.safety.google/adsservices/ (Arten der Verarbeitung
              sowie der verarbeiteten Daten).
            </p>
          </Simple_BLOCK>

          {/* Webanalyse, Monitoring und Optimierung */}
          <Simple_BLOCK>
            <h3>Webanalyse, Monitoring und Optimierung</h3>
            <p>
              Die Webanalyse (auch als „Reichweitenmessung" bezeichnet) dient der Auswertung der
              Besucherströme unseres Onlineangebots und kann Verhalten, Interessen oder
              demografische Informationen zu den Besuchern, wie beispielsweise Alter oder
              Geschlecht, als pseudonyme Werte umfassen. Mithilfe der Reichweitenanalyse können wir
              zum Beispiel erkennen, zu welcher Zeit unser Onlineangebot oder dessen Funktionen
              beziehungsweise Inhalte am häufigsten genutzt werden, oder zur Wiederverwendung
              einladen. Ebenso ist es uns möglich, nachzuvollziehen, welche Bereiche der Optimierung
              bedürfen.
              <br /> <br />
              Neben der Webanalyse können wir auch Testverfahren einsetzen, um etwa unterschiedliche
              Versionen unseres Onlineangebots oder seiner Bestandteile zu testen und zu optimieren.
              <br /> <br />
              Sofern nachfolgend nicht anders angegeben, können zu diesen Zwecken Profile, also zu
              einem Nutzungsvorgang zusammengefasste Daten, angelegt und Informationen in einem
              Browser bzw. in einem Endgerät gespeichert und dann ausgelesen werden. Zu den
              erhobenen Angaben gehören insbesondere besuchte Websites und dort genutzte Elemente
              sowie technische Auskünfte, wie etwa der verwendete Browser, das benutzte
              Computersystem sowie Angaben zu Nutzungszeiten. Sofern sich Nutzer in die Erhebung
              ihrer Standortdaten uns gegenüber oder gegenüber den Anbietern der von uns
              eingesetzten Dienste einverstanden erklärt haben, ist auch die Verarbeitung von
              Standortdaten möglich.
              <br /> <br />
              Darüber hinaus werden die IP-Adressen der Nutzer gespeichert. Jedoch nutzen wir ein
              IP-Masking-Verfahren (d. h. Pseudonymisierung durch Kürzung der IP-Adresse) zum Schutz
              der Nutzer. Generell werden die im Rahmen von Webanalyse, A/B-Testings und Optimierung
              keine Klardaten der Nutzer (wie z. B. E-Mail-Adressen oder Namen) gespeichert, sondern
              Pseudonyme. Das heißt, wir als auch die Anbieter der eingesetzten Software kennen
              nicht die tatsächliche Identität der Nutzer, sondern nur die zum Zweck der jeweiligen
              Verfahren in deren Profilen gespeicherten Angaben.
              <br /> <br />
              Hinweise zu Rechtsgrundlagen: Sofern wir die Nutzer um deren Einwilligung in den
              Einsatz der Drittanbieter bitten, stellt die Rechtsgrundlage der Datenverarbeitung die
              Einwilligung dar. Ansonsten werden die Nutzerdaten auf Grundlage unserer berechtigten
              Interessen (d. h. Interesse an effizienten, wirtschaftlichen und empfängerfreundlichen
              Leistungen) verarbeitet. In diesem Zusammenhang möchten wir Sie auch auf die
              Informationen zur Verwendung von Cookies in dieser Datenschutzerklärung hinweisen.
              <br /> <br />
              <strong>Verarbeitete Datenarten:</strong> Nutzungsdaten (z. B. Seitenaufrufe und
              Verweildauer, Klickpfade, Nutzungsintensität und -frequenz, verwendete Gerätetypen und
              Betriebssysteme, Interaktionen mit Inhalten und Funktionen). Meta-, Kommunikations-
              und Verfahrensdaten (z. B. IP-Adressen, Zeitangaben, Identifikationsnummern,
              beteiligte Personen).
              <br /> <br />
              <strong>Betroffene Personen:</strong> Nutzer (z. B. Webseitenbesucher, Nutzer von
              Onlinediensten).
              <br /> <br />
              <strong>Zwecke der Verarbeitung:</strong> Reichweitenmessung (z. B.
              Zugriffsstatistiken, Erkennung wiederkehrender Besucher); Profile mit nutzerbezogenen
              Informationen (Erstellen von Nutzerprofilen). Bereitstellung unseres Onlineangebotes
              und Nutzerfreundlichkeit.
              <br /> <br />
              <strong>Aufbewahrung und Löschung:</strong> Löschung entsprechend Angaben im Abschnitt
              "Allgemeine Informationen zur Datenspeicherung und Löschung". Speicherung von Cookies
              von bis zu 2 Jahren (Sofern nicht anders angegeben, können Cookies und ähnliche
              Speichermethoden für einen Zeitraum von zwei Jahren auf den Geräten der Nutzer
              gespeichert werden.).
              <br /> <br />
              <strong>Sicherheitsmaßnahmen:</strong> IP-Masking (Pseudonymisierung der IP-Adresse).
              <br /> <br />
              <strong>Rechtsgrundlagen:</strong> Einwilligung (Art. 6 Abs. 1 S. 1 lit. a) DSGVO).
              Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f) DSGVO).
              <br /> <br />
              <strong>
                Weitere Hinweise zu Verarbeitungsprozessen, Verfahren und Diensten:
              </strong>{" "}
              Google Analytics: Wir verwenden Google Analytics zur Messung und Analyse der Nutzung
              unseres Onlineangebots auf der Grundlage einer pseudonymen
              Nutzeridentifikationsnummer. Diese Identifikationsnummer enthält keine eindeutigen
              Daten, wie Namen oder E-Mail-Adressen. Sie dient dazu, Analyseinformationen einem
              Endgerät zuzuordnen, um zu erkennen, welche Inhalte die Nutzer innerhalb eines oder
              verschiedener Nutzungsvorgänge aufgerufen haben, welche Suchbegriffe sie verwendet
              haben, diese erneut aufgerufen haben oder mit unserem Onlineangebot interagiert haben.
              Ebenso werden der Zeitpunkt der Nutzung und deren Dauer gespeichert, sowie die Quellen
              der Nutzer, die auf unser Onlineangebot verweisen und technische Aspekte ihrer
              Endgeräte und Browser.
              <br /> <br />
              Dabei werden pseudonyme Profile von Nutzern mit Informationen aus der Nutzung
              verschiedener Geräte erstellt, wobei Cookies eingesetzt werden können. Google
              Analytics protokolliert und speichert keine individuellen IP-Adressen für EU-Nutzer.
              Analytics stellt jedoch grobe geografische Standortdaten bereit, indem es die
              folgenden Metadaten von IP-Adressen ableitet: Stadt (und der abgeleitete Breiten- und
              Längengrad der Stadt), Kontinent, Land, Region, Subkontinent (und ID-basierte
              Gegenstücke). Beim EU-Datenverkehr werden die IP-Adressdaten ausschließlich für diese
              Ableitung von Geolokalisierungsdaten verwendet, bevor sie sofort gelöscht werden. Sie
              werden nicht protokolliert, sind nicht zugänglich und werden nicht für weitere
              Verwendungszwecke genutzt. Wenn Google Analytics Messdaten sammelt, werden alle
              IP-Abfragen auf EU-basierten Servern durchgeführt, bevor der Verkehr zur Verarbeitung
              an Analytics-Server weitergeleitet wird; Dienstanbieter: Google Ireland Limited,
              Gordon House, Barrow Street, Dublin 4, Irland; Rechtsgrundlagen: Einwilligung (Art. 6
              Abs. 1 S. 1 lit. a) DSGVO); Website:
              <a href="https://marketingplatform.google.com/intl/de/about/analytics/">
                https://marketingplatform.google.com/intl/de/about/analytics/
              </a>
              ;
              <br /> <br />
              <strong>Sicherheitsmaßnahmen:</strong> IP-Masking (Pseudonymisierung der IP-Adresse);{" "}
              <br /> <br />
              <strong>Datenschutzerklärung: </strong>
              <a href="https://policies.google.com/privacy">
                https://policies.google.com/privacy
              </a>; <br /> <br />
              <strong>Auftragsverarbeitungsvertrag: </strong>
              <a href="https://business.safety.google/adsprocessorterms/">
                https://business.safety.google/adsprocessorterms/
              </a>
              <br />
              <br />
              <strong>Grundlage Drittlandtransfers: </strong> Data Privacy Framework (DPF); <br />{" "}
              <br />
              <strong>Widerspruchsmöglichkeit (Opt-Out): </strong> Opt-Out-Plugin:
              <a href="https://tools.google.com/dlpage/gaoptout?hl=de">
                https://tools.google.com/dlpage/gaoptout?hl=de
              </a>{" "}
              <br />
              <br />
              <strong>Einstellungen für die Darstellung von Werbeeinblendungen: </strong>
              <a href="https://myadcenter.google.com/personalizationoff">
                https://myadcenter.google.com/personalizationoff
              </a>
              .
              <br />
              <br />
              <strong>Weitere Informationen: </strong>
              <a href="https://business.safety.google/adsservices/">
                https://business.safety.google/adsservices
              </a>{" "}
              (Arten der Verarbeitung sowie der verarbeiteten Daten).
            </p>
          </Simple_BLOCK>

          {/* Präsenzen in sozialen Netzwerken (Social Media) */}
          <Simple_BLOCK>
            <h3>Präsenzen in sozialen Netzwerken (Social Media)</h3>
            <p>
              Wir unterhalten Onlinepräsenzen innerhalb sozialer Netzwerke und verarbeiten in diesem
              Rahmen Nutzerdaten, um mit den dort aktiven Nutzern zu kommunizieren oder
              Informationen über uns anzubieten.
              <br />
              <br />
              Wir weisen darauf hin, dass dabei Nutzerdaten außerhalb des Raumes der Europäischen
              Union verarbeitet werden können. Hierdurch können sich für die Nutzer Risiken ergeben,
              weil so zum Beispiel die Durchsetzung der Nutzerrechte erschwert werden könnte.
              <br />
              <br />
              Ferner werden die Daten der Nutzer innerhalb sozialer Netzwerke im Regelfall für
              Marktforschungs- und Werbezwecke verarbeitet. So können beispielsweise anhand des
              Nutzungsverhaltens und sich daraus ergebender Interessen der Nutzer Nutzungsprofile
              erstellt werden. Letztere finden möglicherweise wiederum Verwendung, um etwa
              Werbeanzeigen innerhalb und außerhalb der Netzwerke zu schalten, die mutmaßlich den
              Interessen der Nutzer entsprechen. Daher werden im Regelfall Cookies auf den Rechnern
              der Nutzer gespeichert, in denen das Nutzungsverhalten und die Interessen der Nutzer
              gespeichert werden. Zudem können in den Nutzungsprofilen auch Daten unabhängig der von
              den Nutzern verwendeten Geräten gespeichert werden (insbesondere, wenn sie Mitglieder
              der jeweiligen Plattformen und dort eingeloggt sind).
              <br />
              <br />
              Für eine detaillierte Darstellung der jeweiligen Verarbeitungsformen und der
              Widerspruchsmöglichkeiten (Opt-out) verweisen wir auf die Datenschutzerklärungen und
              Angaben der Betreiber der jeweiligen Netzwerke.
              <br />
              <br />
              Auch im Fall von Auskunftsanfragen und der Geltendmachung von Betroffenenrechten
              weisen wir darauf hin, dass diese am effektivsten bei den Anbietern geltend gemacht
              werden können. Nur Letztere haben jeweils Zugriff auf die Nutzerdaten und können
              direkt entsprechende Maßnahmen ergreifen und Auskünfte geben. Sollten Sie dennoch
              Hilfe benötigen, dann können Sie sich an uns wenden.
              <br />
              <br />
              <strong>Verarbeitete Datenarten:</strong> Kontaktdaten (z. B. Post- und
              E-Mail-Adressen oder Telefonnummern); Inhaltsdaten (z. B. textliche oder bildliche
              Nachrichten und Beiträge sowie die sie betreffenden Informationen, wie z. B. Angaben
              zur Autorenschaft oder Zeitpunkt der Erstellung). Nutzungsdaten (z. B. Seitenaufrufe
              und Verweildauer, Klickpfade, Nutzungsintensität und -frequenz, verwendete Gerätetypen
              und Betriebssysteme, Interaktionen mit Inhalten und Funktionen).
              <br />
              <br />
              <strong>Betroffene Personen:</strong> Nutzer (z. B. Webseitenbesucher, Nutzer von
              Onlinediensten).
              <br />
              <br />
              <strong>Zwecke der Verarbeitung:</strong> Kommunikation; Feedback (z. B. Sammeln von
              Feedback via Online-Formular). Öffentlichkeitsarbeit.
              <br />
              <br />
              <strong>Aufbewahrung und Löschung:</strong> Löschung entsprechend Angaben im Abschnitt
              "Allgemeine Informationen zur Datenspeicherung und Löschung".
              <br />
              <br />
              <strong>Rechtsgrundlagen:</strong> Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f)
              DSGVO).
              <br />
              <br />
              <strong>
                Weitere Hinweise zu Verarbeitungsprozessen, Verfahren und Diensten:
              </strong>{" "}
              Instagram: Soziales Netzwerk, ermöglicht das Teilen von Fotos und Videos, das
              Kommentieren und Favorisieren von Beiträgen, Nachrichtenversand, Abonnieren von
              Profilen und Seiten; Dienstanbieter: Meta Platforms Ireland Limited, Merrion Road,
              Dublin 4, D04 X2K5, Irland; Rechtsgrundlagen: Berechtigte Interessen (Art. 6 Abs. 1 S.
              1 lit. f) DSGVO); Website:{" "}
              <a href="https://www.instagram.com">https://www.instagram.com</a>;
              Datenschutzerklärung:{" "}
              <a href="https://privacycenter.instagram.com/policy/">
                https://privacycenter.instagram.com/policy/
              </a>
              . Grundlage Drittlandtransfers: Data Privacy Framework (DPF).
              <br />
              <br />
              <strong>Facebook-Seiten:</strong> Profile innerhalb des sozialen Netzwerks Facebook -
              Wir sind gemeinsam mit Meta Platforms Ireland Limited für die Erhebung (jedoch nicht
              die weitere Verarbeitung) von Daten der Besucher unserer Facebook-Seite (sog.
              "Fanpage") verantwortlich. Zu diesen Daten gehören Informationen zu den Arten von
              Inhalten, die Nutzer sich ansehen oder mit denen sie interagieren, oder die von ihnen
              vorgenommenen Handlungen (siehe unter „Von dir und anderen getätigte und
              bereitgestellte Dinge" in der Facebook-Datenrichtlinie:
              <a href="https://www.facebook.com/privacy/policy/">
                https://www.facebook.com/privacy/policy/
              </a>
              ), sowie Informationen über die von den Nutzern genutzten Geräte (z. B. IP-Adressen,
              Betriebssystem, Browsertyp, Spracheinstellungen, Cookie-Daten; siehe unter
              „Geräteinformationen" in der Facebook-Datenrichtlinie:
              <a href="https://www.facebook.com/privacy/policy/">
                https://www.facebook.com/privacy/policy/
              </a>
              ). Wie in der Facebook-Datenrichtlinie unter „Wie verwenden wir diese Informationen?"
              erläutert, erhebt und verwendet Facebook Informationen auch, um Analysedienste, so
              genannte "Seiten-Insights", für Seitenbetreiber bereitzustellen, damit diese
              Erkenntnisse darüber erhalten, wie Personen mit ihren Seiten und mit den mit ihnen
              verbundenen Inhalten interagieren. Wir haben mit Facebook eine spezielle Vereinbarung
              abgeschlossen ("Informationen zu Seiten-Insights",
              <a href="https://www.facebook.com/legal/terms/page_controller_addendum">
                https://www.facebook.com/legal/terms/page_controller_addendum
              </a>
              ), in der insbesondere geregelt wird, welche Sicherheitsmaßnahmen Facebook beachten
              muss und in der Facebook sich bereit erklärt hat die Betroffenenrechte zu erfüllen (d.
              h. Nutzer können z. B. Auskünfte oder Löschungsanfragen direkt an Facebook richten).
              Die Rechte der Nutzer (insbesondere auf Auskunft, Löschung, Widerspruch und Beschwerde
              bei zuständiger Aufsichtsbehörde), werden durch die Vereinbarungen mit Facebook nicht
              eingeschränkt. Weitere Hinweise finden sich in den "Informationen zu Seiten-Insights"
              (
              <a href="https://www.facebook.com/legal/terms/information_about_page_insights_data">
                https://www.facebook.com/legal/terms/information_about_page_insights_data
              </a>
              ). Die gemeinsame Verantwortlichkeit beschränkt sich auf die Erhebung durch und
              Übermittlung von Daten an Meta Platforms Ireland Limited, ein Unternehmen mit Sitz in
              der EU. Die weitere Verarbeitung der Daten liegt in der alleinigen Verantwortung von
              Meta Platforms Ireland Limited, was insbesondere die Übermittlung der Daten an die
              Muttergesellschaft Meta Platforms, Inc. in den USA betrifft; Dienstanbieter: Meta
              Platforms Ireland Limited, Merrion Road, Dublin 4, D04 X2K5, Irland; Rechtsgrundlagen:
              Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f) DSGVO.
              <br />
              <br />
              Weitere Hinweise zu Verarbeitungsprozessen, Verfahren und Diensten:
              <br />
              <br />
              Instagram: Soziales Netzwerk, ermöglicht das Teilen von Fotos und Videos, das
              Kommentieren und Favorisieren von Beiträgen, Nachrichtenversand, Abonnieren von
              Profilen und Seiten; <u>Dienstanbieter:</u> Meta Platforms Ireland Limited, Merrion
              Road, Dublin 4, D04 X2K5, Irland; <strong>Rechtsgrundlagen:</strong> Berechtigte
              Interessen (Art. 6 Abs. 1 S. 1 lit. f) DSGVO); <strong>Website:</strong>{" "}
              <a href="https://www.instagram.com">https://www.instagram.com</a>;{" "}
              <strong>Datenschutzerklärung:</strong>{" "}
              <a href="https://privacycenter.instagram.com/policy/">
                https://privacycenter.instagram.com/policy/
              </a>
              . <strong>Grundlage Drittlandtransfers:</strong> Data Privacy Framework (DPF).
              <br />
              <br />
              Facebook-Seiten: Profile innerhalb des sozialen Netzwerks Facebook - Wir sind
              gemeinsam mit Meta Platforms Ireland Limited für die Erhebung (jedoch nicht die
              weitere Verarbeitung) von Daten der Besucher unserer Facebook-Seite (sog. "Fanpage")
              verantwortlich. Zu diesen Daten gehören Informationen zu den Arten von Inhalten, die
              Nutzer sich ansehen oder mit denen sie interagieren, oder die von ihnen vorgenommenen
              Handlungen (siehe unter „Von dir und anderen getätigte und bereitgestellte Dinge" in
              der Facebook-Datenrichtlinie:{" "}
              <a href="https://www.facebook.com/privacy/policy/">
                https://www.facebook.com/privacy/policy/
              </a>
              ), sowie Informationen über die von den Nutzern genutzten Geräte (z. B. IP-Adressen,
              Betriebssystem, Browsertyp, Spracheinstellungen, Cookie-Daten; siehe unter
              „Geräteinformationen" in der Facebook-Datenrichtlinie:{" "}
              <a href="https://www.facebook.com/privacy/policy/">
                https://www.facebook.com/privacy/policy/
              </a>
              ). Wie in der Facebook-Datenrichtlinie unter „Wie verwenden wir diese Informationen?"
              erläutert, erhebt und verwendet Facebook Informationen auch, um Analysedienste, so
              genannte "Seiten-Insights", für Seitenbetreiber bereitzustellen, damit diese
              Erkenntnisse darüber erhalten, wie Personen mit ihren Seiten und mit den mit ihnen
              verbundenen Inhalten interagieren. Wir haben mit Facebook eine spezielle Vereinbarung
              abgeschlossen ("Informationen zu Seiten-Insights",{" "}
              <a href="https://www.facebook.com/legal/terms/page_controller_addendum">
                https://www.facebook.com/legal/terms/page_controller_addendum
              </a>
              ), in der insbesondere geregelt wird, welche Sicherheitsmaßnahmen Facebook beachten
              muss und in der Facebook sich bereit erklärt hat die Betroffenenrechte zu erfüllen (d.
              h. Nutzer können z. B. Auskünfte oder Löschungsanfragen direkt an Facebook richten).
              Die Rechte der Nutzer (insbesondere auf Auskunft, Löschung, Widerspruch und Beschwerde
              bei zuständiger Aufsichtsbehörde), werden durch die Vereinbarungen mit Facebook nicht
              eingeschränkt. Weitere Hinweise finden sich in den "Informationen zu Seiten-Insights"
              (
              <a href="https://www.facebook.com/legal/terms/information_about_page_insights_data">
                https://www.facebook.com/legal/terms/information_about_page_insights_data
              </a>
              ). Die gemeinsame Verantwortlichkeit beschränkt sich auf die Erhebung durch und
              Übermittlung von Daten an Meta Platforms Ireland Limited, ein Unternehmen mit Sitz in
              der EU. Die weitere Verarbeitung der Daten liegt in der alleinigen Verantwortung von
              Meta Platforms Ireland Limited, was insbesondere die Übermittlung der Daten an die
              Muttergesellschaft Meta Platforms, Inc. in den USA betrifft;{" "}
              <strong>Dienstanbieter:</strong> Meta Platforms Ireland Limited, Merrion Road, Dublin
              4, D04 X2K5, Irland; <strong>Rechtsgrundlagen:</strong> Berechtigte Interessen (Art. 6
              Abs. 1 S. 1 lit. f) DSGVO); <strong>Website:</strong>{" "}
              <a href="https://www.facebook.com">https://www.facebook.com</a>;{" "}
              <strong>Datenschutzerklärung:</strong>{" "}
              <a href="https://www.facebook.com/privacy/policy/">
                https://www.facebook.com/privacy/policy/
              </a>
              . <strong>Grundlage Drittlandtransfers:</strong> Data Privacy Framework (DPF).
              <br />
              <br />
              Snapchat: Soziales Netzwerk, ermöglicht das Teilen von Fotos und Videos, das
              Kommentieren und Favorisieren von Beiträgen, Nachrichtenversand, Abonnieren von
              Profilen und Seiten; <strong>Dienstanbieter:</strong> Snap Inc., 3000 31st Street,
              Santa Monica, California 90405 USA; <strong>Rechtsgrundlagen:</strong> Berechtigte
              Interessen (Art. 6 Abs. 1 S. 1 lit. f) DSGVO); <strong>Website:</strong>{" "}
              <a href="https://www.snapchat.com/">https://www.snapchat.com/</a>;{" "}
              <strong>Datenschutzerklärung:</strong>{" "}
              <a href="https://www.snap.com/de-DE/privacy/privacy-policy">
                https://www.snap.com/de-DE/privacy/privacy-policy
              </a>
              . <strong>Grundlage Drittlandtransfers:</strong> Standardvertragsklauseln (
              <a href="https://www.snap.com/en-US/terms/standard-contractual-clauses">
                https://www.snap.com/en-US/terms/standard-contractual-clauses
              </a>
              ).
              <br />
              <br />
              TikTok: Soziales Netzwerk, ermöglicht das Teilen von Fotos und Videos, das
              Kommentieren und Favorisieren von Beiträgen, Nachrichtenversand, Abonnieren von
              Accounts; <strong>Dienstanbieter:</strong> TikTok Technology Limited, 10 Earlsfort
              Terrace, Dublin, D02 T380, Irland und TikTok Information Technologies UK Limited,
              Kaleidoscope, 4 Lindsey Street, London, United Kingdom, EC1A 9HP;{" "}
              <strong>Rechtsgrundlagen:</strong> Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f)
              DSGVO); <strong>Website:</strong>{" "}
              <a href="https://www.tiktok.com">https://www.tiktok.com</a>.{" "}
              <strong>Datenschutzerklärung:</strong>{" "}
              <a href="https://www.tiktok.com/de/privacy-policy">
                https://www.tiktok.com/de/privacy-policy
              </a>
              .<br />
              <br />
              X: Soziales Netzwerk; <strong>Dienstanbieter:</strong> Twitter International Company,
              One Cumberland Place, Fenian Street, Dublin 2 D02 AX07, Irland;{" "}
              <strong>Rechtsgrundlagen:</strong> Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f)
              DSGVO); <strong>Website:</strong> <a href="https://x.com">https://x.com</a>.{" "}
              <strong>Datenschutzerklärung:</strong>{" "}
              <a href="https://x.com/de/privacy">https://x.com/de/privacy</a>.
            </p>
          </Simple_BLOCK>

          {/* Änderung und Aktualisierung */}
          <Simple_BLOCK>
            <h3>Änderung und Aktualisierung</h3>
            <p>
              Wir bitten Sie, sich regelmäßig über den Inhalt unserer Datenschutzerklärung zu
              informieren. Wir passen die Datenschutzerklärung an, sobald die Änderungen der von uns
              durchgeführten Datenverarbeitungen dies erforderlich machen. Wir informieren Sie,
              sobald durch die Änderungen eine Mitwirkungshandlung Ihrerseits (z. B. Einwilligung)
              oder eine sonstige individuelle Benachrichtigung erforderlich wird.
              <br />
              <br />
              Sofern wir in dieser Datenschutzerklärung Adressen und Kontaktinformationen von
              Unternehmen und Organisationen angeben, bitten wir zu beachten, dass die Adressen sich
              über die Zeit ändern können und bitten die Angaben vor Kontaktaufnahme zu prüfen.
            </p>
          </Simple_BLOCK>

          {/* Begriffsdefinitionen */}
          <Simple_BLOCK>
            <h3>Begriffsdefinitionen</h3>
            <p>
              In diesem Abschnitt erhalten Sie eine Übersicht über die in dieser
              Datenschutzerklärung verwendeten Begrifflichkeiten. Soweit die Begrifflichkeiten
              gesetzlich definiert sind, gelten deren gesetzliche Definitionen. Die nachfolgenden
              Erläuterungen sollen dagegen vor allem dem Verständnis dienen.
              <br />
              <br />
              <strong>Bestandsdaten:</strong> Bestandsdaten umfassen wesentliche Informationen, die
              für die Identifikation und Verwaltung von Vertragspartnern, Benutzerkonten, Profilen
              und ähnlichen Zuordnungen notwendig sind. Diese Daten können u.a. persönliche und
              demografische Angaben wie Namen, Kontaktinformationen (Adressen, Telefonnummern,
              E-Mail-Adressen), Geburtsdaten und spezifische Identifikatoren (Benutzer-IDs)
              beinhalten. Bestandsdaten bilden die Grundlage für jegliche formelle Interaktion
              zwischen Personen und Diensten, Einrichtungen oder Systemen, indem sie eine eindeutige
              Zuordnung und Kommunikation ermöglichen.
              <br />
              <br />
              <strong>Inhaltsdaten:</strong> Inhaltsdaten umfassen Informationen, die im Zuge der
              Erstellung, Bearbeitung und Veröffentlichung von Inhalten aller Art generiert werden.
              Diese Kategorie von Daten kann Texte, Bilder, Videos, Audiodateien und andere
              multimediale Inhalte einschließen, die auf verschiedenen Plattformen und Medien
              veröffentlicht werden. Inhaltsdaten sind nicht nur auf den eigentlichen Inhalt
              beschränkt, sondern beinhalten auch Metadaten, die Informationen über den Inhalt
              selbst liefern, wie Tags, Beschreibungen, Autoreninformationen und
              Veröffentlichungsdaten.
              <br />
              <br />
              <strong>Kontaktdaten:</strong> Kontaktdaten sind essentielle Informationen, die die
              Kommunikation mit Personen oder Organisationen ermöglichen. Sie umfassen u.a.
              Telefonnummern, postalische Adressen und E-Mail-Adressen, sowie Kommunikationsmittel
              wie soziale Medien-Handles und Instant-Messaging-Identifikatoren.
              <br />
              <br />
              <strong>Meta-, Kommunikations- und Verfahrensdaten:</strong> Meta-, Kommunikations-
              und Verfahrensdaten sind Kategorien, die Informationen über die Art und Weise
              enthalten, wie Daten verarbeitet, übermittelt und verwaltet werden. Meta-Daten, auch
              bekannt als Daten über Daten, umfassen Informationen, die den Kontext, die Herkunft
              und die Struktur anderer Daten beschreiben. Sie können Angaben zur Dateigröße, dem
              Erstellungsdatum, dem Autor eines Dokuments und den Änderungshistorien beinhalten.
              Kommunikationsdaten erfassen den Austausch von Informationen zwischen Nutzern über
              verschiedene Kanäle, wie E-Mail-Verkehr, Anrufprotokolle, Nachrichten in sozialen
              Netzwerken und Chat-Verläufe, inklusive der beteiligten Personen, Zeitstempel und
              Übertragungswege. Verfahrensdaten beschreiben die Prozesse und Abläufe innerhalb von
              Systemen oder Organisationen, einschließlich Workflow-Dokumentationen, Protokolle von
              Transaktionen und Aktivitäten, sowie Audit-Logs, die zur Nachverfolgung und
              Überprüfung von Vorgängen verwendet werden.
              <br />
              <br />
              <strong>Nutzungsdaten:</strong> Nutzungsdaten beziehen sich auf Informationen, die
              erfassen, wie Nutzer mit digitalen Produkten, Dienstleistungen oder Plattformen
              interagieren. Diese Daten umfassen eine breite Palette von Informationen, die
              aufzeigen, wie Nutzer Anwendungen nutzen, welche Funktionen sie bevorzugen, wie lange
              sie auf bestimmten Seiten verweilen und über welche Pfade sie durch eine Anwendung
              navigieren. Nutzungsdaten können auch die Häufigkeit der Nutzung, Zeitstempel von
              Aktivitäten, IP-Adressen, Geräteinformationen und Standortdaten einschließen. Sie sind
              besonders wertvoll für die Analyse des Nutzerverhaltens, die Optimierung von
              Benutzererfahrungen, das Personalisieren von Inhalten und das Verbessern von Produkten
              oder Dienstleistungen. Darüber hinaus spielen Nutzungsdaten eine entscheidende Rolle
              beim Erkennen von Trends, Vorlieben und möglichen Problembereichen innerhalb digitaler
              Angebote.
              <br />
              <br />
              <strong>Personenbezogene Daten:</strong> "Personenbezogene Daten" sind alle
              Informationen, die sich auf eine identifizierte oder identifizierbare natürliche
              Person (im Folgenden "betroffene Person") beziehen; als identifizierbar wird eine
              natürliche Person angesehen, die direkt oder indirekt, insbesondere mittels Zuordnung
              zu einer Kennung wie einem Namen, zu einer Kennnummer, zu Standortdaten, zu einer
              Online-Kennung (z. B. Cookie) oder zu einem oder mehreren besonderen Merkmalen
              identifiziert werden kann, die Ausdruck der physischen, physiologischen, genetischen,
              psychischen, wirtschaftlichen, kulturellen oder sozialen Identität dieser natürlichen
              Person sind.
              <br />
              <br />
              <strong>Profile mit nutzerbezogenen Informationen:</strong> Die Verarbeitung von
              "Profilen mit nutzerbezogenen Informationen", bzw. kurz "Profilen" umfasst jede Art
              der automatisierten Verarbeitung personenbezogener Daten, die darin besteht, dass
              diese personenbezogenen Daten verwendet werden, um bestimmte persönliche Aspekte, die
              sich auf eine natürliche Person beziehen (je nach Art der Profilbildung können dazu
              unterschiedliche Informationen betreffend die Demographie, Verhalten und Interessen,
              wie z. B. die Interaktion mit Webseiten und deren Inhalten, etc.) zu analysieren, zu
              bewerten oder, um sie vorherzusagen (z. B. die Interessen an bestimmten Inhalten oder
              Produkten, das Klickverhalten auf einer Webseite oder den Aufenthaltsort). Zu Zwecken
              des Profilings werden häufig Cookies und Web-Beacons eingesetzt.
              <br />
              <br />
              <strong>Protokolldaten:</strong> Protokolldaten sind Informationen über Ereignisse
              oder Aktivitäten, die in einem System oder Netzwerk protokolliert wurden. Diese Daten
              enthalten typischerweise Informationen wie Zeitstempel, IP-Adressen, Benutzeraktionen,
              Fehlermeldungen und andere Details über die Nutzung oder den Betrieb eines Systems.
              Protokolldaten werden oft zur Analyse von Systemproblemen, zur Sicherheitsüberwachung
              oder zur Erstellung von Leistungsberichten verwendet.
              <br />
              <br />
              <strong>Reichweitenmessung:</strong> Die Reichweitenmessung (auch als Web Analytics
              bezeichnet) dient der Auswertung der Besucherströme eines Onlineangebotes und kann das
              Verhalten oder Interessen der Besucher an bestimmten Informationen, wie z. B. Inhalten
              von Webseiten, umfassen. Mit Hilfe der Reichweitenanalyse können Betreiber von
              Onlineangeboten z. B. erkennen, zu welcher Zeit Nutzer ihre Webseiten besuchen und für
              welche Inhalte sie sich interessieren. Dadurch können sie z. B. die Inhalte der
              Webseiten besser an die Bedürfnisse ihrer Besucher anpassen. Zu Zwecken der
              Reichweitenanalyse werden häufig pseudonyme Cookies und Web-Beacons eingesetzt, um
              wiederkehrende Besucher zu erkennen und so genauere Analysen zur Nutzung eines
              Onlineangebotes zu erhalten.
              <br />
              <br />
              <strong>Verantwortlicher:</strong> Als "Verantwortlicher" wird die natürliche oder
              juristische Person, Behörde, Einrichtung oder andere Stelle, die allein oder gemeinsam
              mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten
              entscheidet, bezeichnet.
              <br />
              <br />
              <strong>Verarbeitung:</strong> "Verarbeitung" ist jeder mit oder ohne Hilfe
              automatisierter Verfahren ausgeführte Vorgang oder jede solche Vorgangsreihe im
              Zusammenhang mit personenbezogenen Daten. Der Begriff reicht weit und umfasst
              praktisch jeden Umgang mit Daten, sei es das Erheben, das Auswerten, das Speichern,
              das Übermitteln oder das Löschen.
            </p>
          </Simple_BLOCK>
        </SimplePage_MAIN>

        {width > 1000 && <SimplePage_SIDE />}
      </SimplePageContent_WRAP>
    </>
  );
}
