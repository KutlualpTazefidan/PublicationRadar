"use client";
import styles from "./page.module.css";
import { Exo } from "next/font/google";
const exo = Exo({ subsets: ["latin"] });

export default function Home() {
  // const [airportsData, setAirportsData] = useState([]);
  // const [unfilteredAirportsData, setUnfilteredAirportsData] = useState([]);
  // const [airline_codes, setAirlineCodes] = useState([]);
  // const [airline_names, setAirlineNames] = useState([]);
  // const [orgAirports, setOrgAirports] = useState([]);
  // const [renderTriggerAirline, setRenderTriggerAirline] = useState(false);

  // Retrieving store items to see if they changed
  // const { departure_airport, arrival_airport, departure_time, arrival_time } =
    // useSnapshot(storage);

  // Storing files on local storage
  // const [localObjectsStorage, setLocalObjectsStorage] = useLocalStorageState(
    // "FlightDelayStorage",
    // { defaultValue: storage }
  // );

  // function getItem(key) {
    // const localStore = localStorage.getItem(key);
    // if (localStore !== null) {
      // return JSON.parse(localStore);
    // }
    // return null;
  // }

  // useEffect(() => {
  //   // retrieve data from local storage
  //   const retrievedStorage = getItem("FlightDelayStorage");
  //   if (retrievedStorage) {
  //     storage.departure_airport = retrievedStorage.departure_airport;
  //     storage.arrival_airport = retrievedStorage.arrival_airport;
  //     storage.departure_time = retrievedStorage.departure_time;
  //     storage.arrival_time = retrievedStorage.arrival_time;
  //     setLocalObjectsStorage(storage);
  //   }
  //   // Import airport data
  //   async function fetchDataFromJson() {
  //     try {
  //       const [
  //         airportsDataResponse,
  //         orgAirportsResponse,
  //         airlineCodesResponse,
  //       ] = await Promise.all([
  //         fetch("./data/airportsdata.json").then((response) => response.json()),
  //         fetch("./data/airports_in_org_dataset.json").then((response) =>
  //           response.json()
  //         ),
  //         fetch("./data/airline_codes.json").then((response) =>
  //           response.json()
  //         ),
  //       ]);
  //       setUnfilteredAirportsData(airportsDataResponse);
  //       setOrgAirports(orgAirportsResponse.airports);
  //       setAirlineCodes(airlineCodesResponse.airline_code);

  //       // console.log(
  //       //   "hello3a",
  //       //   orgAirports.includes(unfilteredAirportsData["CMN"].iata)
  //       // );
  //     } catch (error) {
  //       console.error("Error fetching JSON data:", error);
  //     }
  //   }
  //   fetchDataFromJson();
  // }, []);

  // useEffect(() => {
  //   const filteredData = {};
  //   Object.keys(unfilteredAirportsData).forEach((airportCode) => {
  //     const airport = unfilteredAirportsData[airportCode];
  //     if (orgAirports.includes(airport.iata)) {
  //       filteredData[airportCode] = airport;
  //     }
  //   });
  //   console.log("hello_5_fil", filteredData);
  //   // console.log("hello_5_fil", filtered_data);
  //   setAirportsData(filteredData);
  // }, [unfilteredAirportsData]);

  // useEffect(() => {
  //   const translations = [];

  //   // Loop through the list of airline codes and translate them
  //   airline_codes.forEach((code) => {
  //     const airline = airlineCodeTranslator.findWhere({ iata: code });
  //     if (airline) {
  //       translations.push(airline.get("name"));
  //     } else {
  //       translations.push(code); // Handle cases where the code is not found
  //     }
  //   });

  //   setAirlineNames(translations.slice().sort());
  //   console.log("codes", airline_codes);
  // }, [airline_codes]);

  // useEffect(() => {
  //   setLocalObjectsStorage(storage);
  // }, [renderTriggerAirline]);
  return (
    <>
      <main className={styles.main}>
        <header className={styles.page_title}>Analysis of Scientific Publications</header>
        <nav className={styles.glasscard_nav}>
          <ul>
            <li>Fetch</li>
            <li>Cluster</li>
            <li>Predict</li>
            <li>Analyze</li>
          </ul>
        </nav>
      </main>
    </>
  );
}