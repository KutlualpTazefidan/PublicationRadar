'use client'
import { useState } from 'react'; // Import useState hook
import styles from "./ClusterSection.module.css";
import { z } from "zod"
import {useForm} from "react-hook-form" 
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
 
import dynamic from 'next/dynamic';
const My3DChartNoSSR = dynamic(() => import('./My3DScatterPlot'), { ssr: false });

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

const ClusterSection=()=>{

  const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: {
        year1: 1910, // Default value for year1
        year2: 1910, // Default value for year2
        journal: "Science", // Default value for journal
      },
    })
    
  async function onSubmit(values) {
    // console.log("values:",values)
    handleFetchData()
  }

  const [publications,setPublications] = useState([])
  const handleFetchData = async () => {
    try {
      console.log("fetching")
      const response = await fetch(`/api/clusterData`);
      // const response = await fetch('/api/dbTest');
      if (!response.ok) {
        throw new Error('Data fetching failed');
      }
      const data = await response.json();
      const transformedData = data.map(pub => ({
        title: pub.title,
        year: pub.year,
        topic_list: pub.topic_list && pub.topic_list.length > 30 ? pub.topic_list.substring(0, 30) + "..." : pub.topic_list || "",
        x_vector: pub.x_vector,
        y_vector: pub.y_vector,
        z_vector: pub.z_vector,
      }));
      setPublications(transformedData);
      console.log(publications)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return(
  <div className={styles.graph_field}>
    <div className={styles.plot3d}>
      {publications.length > 0 && <My3DChartNoSSR data={publications} />}
    </div>
    <Button className={styles.fetchEmbeddings} onClick={onSubmit}>Get Clusters</Button>
  </div>)
}

export default ClusterSection;