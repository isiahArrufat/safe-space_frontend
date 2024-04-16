import { useOutletContext } from "react-router-dom";
import EntriesCarousel from './EntriesCarousel'; 



const ProfilePage = () => {
    const { user } = useOutletContext();

    return (
        <div className="flex flex-col h-screen">
            <h1>My Entries</h1>
            <div className="flex-grow">
                {user && (
                    <div className="flex flex-col h-full">
                        {/* Entries Carousel */}
                        <div className="flex-grow">
                            <EntriesCarousel />
                        </div>
                        {/* Buttons for publish, edit, delete */}
                        <div className="flex justify-center p-4">
                            <button className="mr-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Publish</button>
                            <button className="mx-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">Edit</button>
                            <button className="ml-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;
