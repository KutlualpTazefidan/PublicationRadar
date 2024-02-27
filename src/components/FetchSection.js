'use client'
import { useState } from 'react'; // Import useState hook
import styles from "./FetchSection.module.css";
import { z } from "zod"
import {useForm} from "react-hook-form" 
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import FetchTable from './FetchTable'; // Adjust the path as necessary
 
const formSchema = z.object({
    // Assuming the first two fields for years are named 'year1' and 'year2'
    year1: z.coerce.number()
    .min(1910, { message: "Year must be between 1910 and 2024." })
    .max(2024, { message: "Year must be between 1910 and 2024." }),
    year2: z.coerce.number()
    .min(1910, { message: "Year must be between 1910 and 2024." })
    .max(2024, { message: "Year must be between 1910 and 2024." }),
    // The third field for the string, assuming it's 'someStringField'
    journal: z.string().min(2, {
    message: "Field must be at least 2 characters.",
    }),
})

const FetchSection=()=>{

  const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: {
        year1: 1910, // Default value for year1
        year2: 1910, // Default value for year2
        journal: "Science", // Default value for journal
      },
    })
    
  async function onSubmit(values) {
    console.log("values:",values)
    handleFetchData(values.year1,values.year2)
  }

  const [papers, setPapers] = useState([]);
  const [publications,setPublications] = useState([])
  const handleFetchData = async (year1,year2) => {
    try {
      console.log("fetching")
      const response = await fetch(`/api/fetchData?year1=${year1}&year2=${year2}`);
      // const response = await fetch('/api/dbTest');
      if (!response.ok) {
        throw new Error('Data fetching failed');
      }
      const data = await response.json();
      setPapers(data);
      const transformedData = data.map(pub => ({
        paper_id: pub.paper_id,
        title: pub.title,
        venue: pub.venue || "", // Use an empty string if venue is not provided
        year: pub.year,
        authors: pub.authors, // You might need to parse this if it's a JSON string
        abstract: pub.abstract && pub.abstract.length > 20 ? pub.abstract.substring(0, 20) + "..." : pub.abstract || "", // Check if abstract exists and truncate if necessary
        citation_count: pub.citation_count
      }));
      setPublications(transformedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return(
  <div className={styles.fetch_field}>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={styles.submit_field}>
        <div className={styles.input_fields}>
        <FormField control={form.control} name="year1" render={({field})=>{return <FormItem><FormLabel>Start Year</FormLabel><Input placeholder="Start Year" {...field} /><FormControl></FormControl><FormMessage/></FormItem>}}/>
        <FormField control={form.control} name="year2" render={({field})=>{return <FormItem><FormLabel>End Year</FormLabel><Input placeholder="End Year" {...field} /><FormControl></FormControl><FormMessage/></FormItem>}}/>
        <FormField control={form.control} name="journal" render={({field})=>{return <FormItem><FormLabel>Journal</FormLabel><Input placeholder="Journal" {...field}/><FormControl></FormControl><FormMessage/></FormItem>}}/>
        </div>
        <Button type='submit' className='w-full'>Submit</Button>
      </form>
    </Form>
    <FetchTable publications={publications}/>
  </div>)
}

export default FetchSection;