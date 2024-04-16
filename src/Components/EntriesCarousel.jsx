import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const EntriesCarousel = ({ entries }) => {
    const [newEntryVisible, setNewEntryVisible] = useState(false);

    const handleNewEntryClick = () => {
        setNewEntryVisible(!newEntryVisible);
    };

    return (
        <Slider>
            {entries.map((entry) => (
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
        </Slider>
    );
};

export default EntriesCarousel;
