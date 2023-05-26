import './index.css'
import Searchfield from './components/SearchField';

function App() {

  return (
    <div className="container mx-auto p-8 m-10">
      <Searchfield
      labelName="Search cards"
      type="text"
      name="text"
      placeholder="Search cards"
      /* value={searchText}
      handleChange={handleSearchChange} *//>
    </div>
  );
}

export default App
