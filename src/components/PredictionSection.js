'use client'
import { useState } from 'react'; 
import styles from "./PredictionSection.module.css";
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import My2DPlot from './My2DPlot'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const PredictionSection=()=>{
  
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  const [topicLabels,setTopicLabels] = useState([])
  const [fetchedData,setFetchedData] = useState([])
  const [fetchedTestData,setFetchedTestData] = useState([])
  const [fetchedPredictionData,setFetchedPredictionData] = useState([])
  const [topicValueDate,setTopicValueDate] = useState([])
  const [topicValueCitationCount,setTopicValueCitationCount] = useState([])
  const [topicPredictions,setTopicPredictions] = useState([])

  async function onSubmit(values) {
    // console.log("values:",values)
    handleFetchTopicLabel()
    // handleFetchPrediction()
  }

  async function onPopoverSelect(currentValue) {
    setValue(currentValue === value ? "" : currentValue); // Update the selected value
    setOpen(false); // Close the popover
    handleFetchPrediction(currentValue); // Fetch details for the selected topic
  }



  const handleFetchTopicLabel = async () => {
    try {
      console.log("fetching")
      const response = await fetch(`/api/fetchTopicLabel`);
      // const response = await fetch('/api/dbTest');
      if (!response.ok) {
        throw new Error('Data fetching failed');
      }
      const data = await response.json();
      const transformedData = data.map(pub => ({
        value: pub.topic_list,
        label: pub.topic_list.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
      }));
      setTopicLabels(transformedData);
      console.log(topicLabels)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const handleFetchPrediction = async (currentValue) => {
    try {
      console.log("fetching")
      console.log(currentValue)
      const response = await fetch(`/api/fetchTopicValueAndPrediction?topic=${currentValue}`);
      // const response = await fetch('/api/dbTest');
      if (!response.ok) {
        throw new Error('Data fetching failed');
      }
      const { topicData, topicTestData,topicPredictions } = await response.json();

      const transformedTopicData = topicData.map(pub => ({
        publication_date: pub.publication_date,
        citation_count: pub.citation_count,
      }));

      const transformedTopicTestData = topicTestData.map(pub => ({
        publication_date: pub.publication_date,
        citation_count: pub.citation_count,
      }));

      const transformedTopicPredictions = topicPredictions.map(pub => ({
        publication_date: pub.publication_date,
        citation_count: pub.citation_count,
      }));

      setFetchedData(transformedTopicData)
      setFetchedTestData(transformedTopicTestData)
      setFetchedPredictionData(transformedTopicPredictions)

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return(
  <div className={styles.prediction_section}>
    {/* <div className={styles.plot3d}> 2d Plot </div> */}
    <Button className={styles.fetchTopicLabels} onClick={onSubmit}>Get Topic Label</Button>
    <div className={styles.dropdown}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {value
              ? topicLabels.find((topicLabel) => topicLabel.value === value)?.label
              : "Select a Topic ..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search for a Topic..." />
            <ScrollArea className="h-96">
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup>
                {topicLabels.map((topicLabel) => (
                  <CommandItem
                    key={topicLabel.value}
                    value={topicLabel.value}
                    onSelect={onPopoverSelect}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === topicLabel.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {topicLabel.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </ScrollArea>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
    <div className={styles.my2dplot}>
      {fetchedData?<My2DPlot data={fetchedData} testData={fetchedTestData}  predictionData={fetchedPredictionData} />:""}
    </div>
  </div>)
}

export default PredictionSection;