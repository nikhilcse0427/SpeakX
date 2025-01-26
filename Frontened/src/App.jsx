import { useState, useEffect } from 'react';
import ProjectTitle from './components/ProjectTitle.jsx';
import SearchSection from './components/SearchSection.jsx';
import './App.css';

function App() {
  const [data, setData] = useState([]); // Store fetched data
  const [filteredData, setFilteredData] = useState([]); // Filtered data based on search
  const [searchQuery, setSearchQuery] = useState(''); // Store search input
  const [filterType, setFilterType] = useState(''); // Store selected filter for question type
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
  const itemsPerPage = 5; // Items per page

  // Fetch data on component mount
  useEffect(() => {
    fetch('http://localhost:8000/api', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, 'jsondata');
        setData(data); // Store the fetched data
        setFilteredData(data); // Set initial filtered data to fetched data
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // Handle search functionality
  const handleSearch = (searchTerm) => {
    setSearchQuery(searchTerm);
    filterData(searchTerm, filterType); // Filter data with the search query and current type filter
    setCurrentPage(1); // Reset pagination to the first page
  };

  // Handle filter by question type
  const handleFilterType = (type) => {
    setFilterType(type);
    filterData(searchQuery, type); // Filter data with the current search query and selected type filter
    setCurrentPage(1); // Reset pagination to the first page
  };

  // Filter data based on both search and type
  const filterData = (searchTerm, type) => {
    const filtered = data.filter((item) => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = type ? item.type.toLowerCase() === type.toLowerCase() : true;
      return matchesSearch && matchesType;
    });
    setFilteredData(filtered); // Update filtered results
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Handle page change
  // const handlePageChange = (pageNumber) => {
  //   setCurrentPage(pageNumber);
  // };

  return (
    <div>
      <center>
        <ProjectTitle />
        <SearchSection onSearch={handleSearch} />
      </center>

      {/* Filter by Type */}
      <div className="filter-container">
        <label htmlFor="filter-type">Filter by Type:</label>
        <select
          id="filter-type"
          value={filterType}
          onChange={(e) => handleFilterType(e.target.value)}
        >
          <option value="">All</option>
          <option value="ANAGRAM">ANAGRAM</option>
          <option value="MCQ">MCQ</option>
          <option value="READ_ALONG">MCQ</option>
       
        </select>
      </div>

      <div className="results-container">
        {currentItems.length > 0 ? (
          currentItems.map((item) => (
            <div key={item._id.$oid} className="result-card">
              <h3 className="result-title">{item.title}</h3>
              <p className="result-type">Type: {item.type}</p>
              <p className="result-anagram-type">
                Anagram Type: {item.anagramType || 'N/A'}
              </p>
              <p className="result-solution">
                Solution: <span>{item.solution}</span>
              </p>
              <div className="result-blocks">
                <strong>Blocks:</strong>
                <ul>
                  {item.blocks.map((block, index) => (
                    <li key={index}>
                      {block.text} {block.isAnswer ? '(Answer)' : ''} {block.showInOption ? '(Visible)' : ''}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="result-sibling">
                Sibling ID: {item.siblingId ? item.siblingId.$oid : 'N/A'}
              </p>
            </div>
          ))
        ) : (
          <p className="no-results">No results found for {searchQuery}.</p>
        )}
      </div>

      
    </div>
  );
}

export default App;