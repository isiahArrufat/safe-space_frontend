import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import "../App.css";

const URL = import.meta.env.VITE_BASE_URL;

const Dashboard = () => {
  const { user } = useOutletContext(); 
  const [entries, setEntries] = useState([]);


  
  

  useEffect(() => {
      if (user.id) {
        fetch(`${URL}/api/entries`)
          .then(response => response.json())
          .then(data => setEntries(data))
          .catch(error => console.error("Error fetching entries:", error));
      }
    }, []);

  return (
    <div className="overscroll-none">
  {entries.map(entry => (
    <div key={entry.id} className="bg-white rounded-lg overflow-hidden shadow-md mb-4">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mood</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Body</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <tr className="hover:bg-gray-100">
            <td className="px-6 py-4">{entry.date}</td>
            <td className="px-6 py-4">{entry.mood}</td>
            <td className="px-6 py-4">{entry.title}</td>
            <td className="px-6 py-4">{entry.body}</td>
          </tr>
        </tbody>
      </table>
    </div>
  ))}
</div>
  );
};

export default Dashboard;

