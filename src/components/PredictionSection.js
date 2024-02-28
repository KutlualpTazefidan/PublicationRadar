'use client'
import { useState } from 'react'; // Import useState hook
import styles from "./ClusterSection.module.css";
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"

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

  async function onSubmit(values) {
    // console.log("values:",values)
    handleFetchTopicLabel()
  }

  const [topicLabels,setTopicLabels] = useState([])
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

  return(
  <div className={styles.graph_field}>
    {/* <div className={styles.plot3d}> 2d Plot </div> */}
    <Button className={styles.fetchEmbeddings} onClick={onSubmit}>Get Topic Label</Button>
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? topicLabels.find((topicLabel) => topicLabel.value === value)?.label
            : "Select a Topic ..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search for a Topic..." />
          <ScrollArea className="h-96">
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {topicLabels.map((topicLabel) => (
                <CommandItem
                  key={topicLabel.value}
                  value={topicLabel.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
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
  </div>)
}

export default PredictionSection;