import logo from './logo.svg';
import './App.css';
import { Auth } from "./components/auth";
import { db } from "./config/firebase";
import { useEffect, useState } from 'react';
import { getDocs, collection } from "firebase/firestore";

function App() {
  const [thumbnailList, setThumbnailList] = useState([]);

  const thumbnailCollectionRef = collection(db, "thumbnail");

  useEffect(() => {
    const getThumbnailList = async () => {
      try {
        const data = await getDocs(thumbnailCollectionRef);
        const filteredData = data.docs.map((doc) => ({...doc.data(), id: doc.id,}))
        // console.log(filteredData);
        setThumbnailList(filteredData);
      } catch (err) {
          console.error(err);
      }
    }
    getThumbnailList();
  }, [])

  return (
     <div className='App'><Auth/>
      <div>
        {thumbnailList.map((thumbnail) => (
          <div>
            <h1 style={{color: thumbnail.trending ? "green" : "red"}}>{thumbnail.name}</h1>
            <p>{thumbnail.releaseDate}</p>
          </div>
        ))}
      </div>  
    </div>);
}

export default App;
