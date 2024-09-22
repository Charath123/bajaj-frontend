import React, { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState(null);
  const [filter, setFilter] = useState([]);

  // Handles form submission and API request
  const handleSubmit = async () => {
    try {
      // Replace curly quotes with straight quotes
      const sanitizedInput = input.replace(/"|"/g, '"');

      // Parse the input JSON
      const jsonData = JSON.parse(sanitizedInput);

      // Make the POST request
      const res = await fetch("https://bajaj-bakend-btkh.vercel.app/bfhl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: jsonData.data,
          file_b64: jsonData.file_b64,
        }),
      });

      // Handle any errors in the response
      if (!res.ok) {
        throw new Error("HTTP error " + res.status);
      }

      // Parse and set the response
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Handles changes in the dropdown (multiselect)
  const handleFilterChange = (e) => {
    const options = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setFilter(options);
  };

  // Render the response based on selected options
  const renderResponse = () => {
    if (!response) return null;
    return (
      <div>
        {filter.includes("Numbers") && (
          <div>Numbers: {response.numbers.join(", ")}</div>
        )}
        {filter.includes("Alphabets") && (
          <div>Alphabets: {response.alphabets.join(", ")}</div>
        )}
        {filter.includes("Highest Lowercase") && (
          <div>
            Highest Lowercase Alphabet: {response.highest_lowercase_alphabet}
          </div>
        )}
        {filter.includes("File Valid") && (
          <div>File Valid: {response.file_valid.toString()}</div>
        )}
        {filter.includes("File MIME Type") && (
          <div>File MIME Type: {response.file_mime_type}</div>
        )}
        {filter.includes("File Size (KB)") && (
          <div>File Size (KB): {response.file_size_kb}</div>
        )}
      </div>
    );
  };

  return (
    <div>
      <textarea value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={handleSubmit}>Submit</button>

      <select multiple onChange={handleFilterChange}>
        <option value="Numbers">Numbers</option>
        <option value="Alphabets">Alphabets</option>
        <option value="Highest Lowercase">Highest Lowercase Alphabet</option>
        <option value="File Valid">File Valid</option>
        <option value="File MIME Type">File MIME Type</option>
        <option value="File Size (KB)">File Size (KB)</option>
      </select>

      {renderResponse()}
    </div>
  );
}

export default App;
