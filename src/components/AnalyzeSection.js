'use client'
import { useState } from 'react'; // Import useState hook
import styles from "./AnalyzeSection.module.css";
import FileUpload from './FileUpload';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const AnalyzeSection=()=>{
    
  const [pdfUrl, setPdfUrl] = useState('');
  const [userPrompt, setUserPrompt] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);

  const [documentName,setDocumentName] = useState("")
  const [analysisData,setAnalysisData] = useState([])

  const getAnalyzedData = async ()=>{
      try {
        console.log("fetching")
        const response = await fetch(`/api/analyzedData`);
        if (!response.ok) {
          throw new Error('Data fetching failed');
        }
        const data = await response.json();
        setDocumentName(data[0]?.filename); 
        const transformedData = data.map(pub => ({
          document_key: pub.document_key,
          alignment_rating: pub.alignment_rating,
          analysis_content: pub.analysis_content,
        }));
        setAnalysisData(transformedData);
        console.log(analysisData)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };  
  async function sendAnalysisData(){
    if (!uploadedFile || !userPrompt) {
      alert("Please upload a PDF file before analysis and a user prompt.");
      return;
    }

    const formData = new FormData();
    formData.append('file', uploadedFile);
    formData.append('user_prompt', userPrompt);

    try {
      const response = await fetch('http://127.0.0.1:8000/v1/publication/process-pdf/', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to analyze PDF');
      }

      const result = await response.json();
      console.log('Analysis Result:', result);
    } catch (error) {
      console.error('Error analyzing PDF:', error);
    }
  }

  const handleFileUpload = (file) => {
    setUploadedFile(file);
    // Create a Blob URL for previewing the PDF
    const url = URL.createObjectURL(file);
    setPdfUrl(url);
  };

  const handleUserPromptChange = (event) => {
    setUserPrompt(event.target.value);
    // console.log(userPrompt)
  };
  
  function getRatingClass(rating) {
    switch (rating) {
      case 5:
        return 'excellentRating';
      case 4:
        return 'goodRating';
      case 3:
        return 'averageRating';
      case 2:
        return 'poorRating';
      case 1:
        return 'badRating';
      // No default case as all ratings are covered
    }
  }
  console.log("pdfUrl:",pdfUrl)
  return(
  <div className={styles.analyze_field}>
    <div className={styles.analyze_field_top}>
      <div className={styles.upload_file}>
      <FileUpload onFileUpload={handleFileUpload} />
      </div>
      <div className={styles.user_prompt}>
        <label htmlFor="userPrompt" className="text-sm font-medium">User Prompt</label>
        <Input id="userPrompt" placeholder="Enter your prompt here" value={userPrompt} onChange={handleUserPromptChange}  />
      </div>
      <Button className={styles.analyze_button} onClick={sendAnalysisData}>Analyze PDF</Button>
      <Button className={styles.analyze_button} onClick={getAnalyzedData}>Get Analysis Results</Button>
    </div>
    <div className={styles.results_container}>
    {pdfUrl && (
      <div className={styles.pdf_view}>
        <iframe src={pdfUrl} style={{ width: '100%', height: '100%' }}></iframe>
      </div>
    )}
    <div className={styles.analysis_results}>
      <span className={styles.filename}>{documentName}</span>
      {analysisData.map((data, index) => (
        <div key={index} 
        className={`${styles.glasscard} ${styles[getRatingClass(data.alignment_rating)]}`}
        >
          <div className={styles.card_title}>
            <h3>Chapter: {data.document_key}</h3>
            <p>Alignment Rating: {data.alignment_rating}</p>
          </div>
          <p>{data.analysis_content.slice(22)}</p>
        </div>
      ))}
    </div>
    </div>
  </div>
  )
}

export default AnalyzeSection;