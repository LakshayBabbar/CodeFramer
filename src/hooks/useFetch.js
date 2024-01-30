import { db } from "../../lib/firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { useEffect } from "react";

const useFetch = (username) => {
  useEffect(() => {
    const fetchData = async () => {
      const ref = collection(db, "users");
      const q = query(ref, where("username", "==", username));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc)=>({
        ...doc.data(), id: doc.id
      }))
      data.map(async(elem)=>{
        const projectQ = query(collection(db,`users/${elem.id}/projects`));
        const projectDetails = await getDocs(projectQ);
        const projectInfo = projectDetails.docs.map((doc)=>({
          ...doc.data(), id: doc.id
        }))
        return projectInfo
      })
    }
    fetchData();
  }, [username]);
}

export default useFetch;