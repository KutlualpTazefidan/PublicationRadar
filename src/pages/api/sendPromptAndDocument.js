export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { userPrompt } = req.body;
      const pdfFile = req.files.file; // Assuming you're using middleware like `next-connect` to handle `multipart/form-data`
  
      // Set up FormData to forward the file and user prompt to FastAPI
      const formData = new FormData();
      formData.append('file', pdfFile);
      formData.append('user_prompt', userPrompt);
  
      // Forward the request to FastAPI backend
      try {
        const apiResponse = await fetch('http://localhost:8000/your-fastapi-endpoint', {
          method: 'POST',
          body: formData,
        });
  
        if (!apiResponse.ok) {
          throw new Error(`Error from FastAPI: ${apiResponse.statusText}`);
        }
  
        const data = await apiResponse.json();
        return res.status(200).json(data);
      } catch (error) {
        console.error('Failed to send PDF to FastAPI:', error);
        return res.status(500).json({ message: 'Failed to process PDF' });
      }
    } else {
      // Handle any non-POST requests
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }