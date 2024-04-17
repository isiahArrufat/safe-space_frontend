import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NewEntryForm from "./NewEntryForm";

const EntriesCarousel = ({ user }) => {
    const [newEntryVisible, setNewEntryVisible] = useState(false);
    const [userEntries, setUserEntries] = useState([]);


  
  
console.log(user);
  useEffect(() => {
      if (user.id) {
        fetch(`${URL}/api/entries/${user.id}`)
          .then(response => response.json())
          .then(data => setUserEntries(data))
          .catch(error => console.error("Error fetching entries:", error));
      }
    }, []);

    const handleNewEntryClick = () => {
        setNewEntryVisible(!newEntryVisible);
    };

    return (
       <div>
            {userEntries.map((entry) => (
                <div key={entry.id} className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mood</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Body</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap">{entry.date}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{entry.mood}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{entry.title}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{entry.body}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            ))}
            {newEntryVisible && (
                <div className="overflow-x-auto">
                    <NewEntryForm />
                </div>
            )}
            <button onClick={handleNewEntryClick}>New Entry</button>
        </div>
        
    );
};

export default EntriesCarousel;
