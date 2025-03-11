import logo from './logo.svg';
import './App.css';
import { Auth } from "./components/auth";
import { db } from "./config/firebase";
import { useEffect, useState } from 'react';
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";

function App() {
  const [thumbnailList, setThumbnailList] = useState([]);

  const [newThumbnailName, setNewThumbnailName] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [isTrending, setIsTrending] = useState(false);

  const [updatedName, setUpdatedName] = useState("");

  const thumbnailCollectionRef = collection(db, "thumbnail");

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

  const deleteThumbnail = async (id) => {
    const thumbnailDoc = doc(db, "thumbnail", id);
    await deleteDoc(thumbnailDoc);
  }

  const updateThumbnailName = async (id) => {
    const thumbnailDoc = doc(db, "thumbnail", id);
    await updateDoc(thumbnailDoc, { name: updatedName  });
  }

  useEffect(() => {
    getThumbnailList();
  }, [])

  const onSubmitThumbnail = async () => {
    try {
      await addDoc(thumbnailCollectionRef, {
        name: newThumbnailName, 
        releaseDate: newReleaseDate, 
        trending: isTrending});

        getThumbnailList();
    } catch (err) {
        console.error(err);
    }
  }

  return (
     <div className='App'><Auth/>
     <div>
      <input placeholder='Thumbnail Title...' onChange={(e) => setNewThumbnailName(e.target.value)}/>
      <input placeholder='Release Date...' type='number' onChange={(e) => setNewReleaseDate(Number(e.target.value))}/>
      <input type='checkbox' checked={isTrending} onChange={(e) => setIsTrending(e.target.checked)}/>
      <label>Trending</label>
      <button onClick={onSubmitThumbnail}>Submit Thumbnail</button>
     </div>
      <div>
        {thumbnailList.map((thumbnail) => (
          <div>
            <h1 style={{color: thumbnail.trending ? "green" : "red"}}>{thumbnail.name}</h1>
            <p>{thumbnail.releaseDate}</p>
            <button onClick={() => deleteThumbnail(thumbnail.id)}>Delete Thumbnail</button>
            <input placeholder='New Name...' onChange={(e) => setUpdatedName(e.target.value)} />
            <button onClick={() => updateThumbnailName(thumbnail.id)}>Update Name</button>
          </div>
        ))}
      </div>  
    </div>);
}

export default App;
