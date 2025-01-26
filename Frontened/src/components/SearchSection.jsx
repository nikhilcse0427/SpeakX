/* eslint-disable react/prop-types */
// import { FaSearch } from 'react-icons/fa';
// import Styles from './SearchSection.module.css';

// function SearchSection() {
//   return (
//     <div>
//       <div className={Styles['input-wrapper']}>
//         <FaSearch id="search-icon" className={Styles['search-icon']} style={{ fontSize: 24 }} />
//         <input className={Styles['search-input']} type="text" placeholder="Type to search..." />
//       </div>
//     </div>
//   );
// }

// export default SearchSection;


import { FaSearch } from 'react-icons/fa';
import Styles from './SearchSection.module.css';

function SearchSection({ onSearch }) {
  return (
    <div>
      <div className={Styles['input-wrapper']}>
        <FaSearch id="search-icon" className={Styles['search-icon']} style={{ fontSize: 24 }} />
        <input
          className={Styles['search-input']}
          type="text"
          placeholder="Type to search..."
          onChange={(e) => onSearch(e.target.value)} // Trigger onSearch with the search term
        />
      </div>
    </div>
  );
}

export default SearchSection;
