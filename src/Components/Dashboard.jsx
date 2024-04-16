import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import "../App.css";

const URL = import.meta.env.VITE_BASE_URL;

const Dashboard = () => {
  const { user } = useOutletContext(); 
  const [entries, setEntries] = useState([]);


  
  

  useEffect(() => {
      if (user.id) {
        fetch(`${URL}/api/entries/${user.id}`)
          .then(response => response.json())
          .then(data => setEntries(data))
          .catch(error => console.error("Error fetching entries:", error));
      }
    }, []);

  return (
    <>
      {entries.length > 0 && (
        <div className="masonry grid gap-4 min-w-full">
          {entries.map(entry => (
            <div key={entry.id} className="bg-white shadow-md p-4 rounded-lg">
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
        </div>
      )}
    </>
  );
};

export default Dashboard;

