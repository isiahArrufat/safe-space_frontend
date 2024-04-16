import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewEntryForm = () => {
    const navigate = useNavigate();
    const { user } = useOutletContext();

    const [entry, setEntry] = useState({
        date: "",
        title: "",
        mood: "",
        publish: false,
        body: "",
    });

    const addEntry = () => {
        fetch(`${API}/entries`, {
            method: "POST",
            body: JSON.stringify(entry),
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(() => {
            navigate(`/dashboard`);
        })
        .catch((error) => console.error("catch", error));
    };

    const handleTextChange = (event) => {
        setEntry({ ...entry, [event.target.id]: event.target.value });
    };
    
    const handleCheckboxChange = () => {
        setEntry({ ...entry, publish: !entry.publish });
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        addEntry();
    };

    return (
        user && (
            <div className="New">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="date">Date:</label>
                    <input
                        id="date"
                        value={entry.date}
                        type="text"
                        onChange={handleTextChange}
                        placeholder="Date"
                        required
                    />
                    <label htmlFor="title">Title:</label>
                    <input
                        id="title"
                        type="text"
                        value={entry.title}
                        placeholder="Title"
                        onChange={handleTextChange}
                    />
                    <label htmlFor="mood">Mood:</label>
                    <input
                        id="mood"
                        type="text"
                        name="mood"
                        value={entry.mood}
                        placeholder="Mood"
                        onChange={handleTextChange}
                    />
                    <label htmlFor="publish">Publish:</label>
                    <input
                        id="publish"
                        type="checkbox"
                        onChange={handleCheckboxChange}
                        checked={entry.publish}
                    />
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={entry.body || ""}
                        onChange={handleTextChange}
                        placeholder="Write Entry Here..."
                    />
                    <br />
                    <input type="submit" />
                </form>
            </div>
        )
    );
};

export default NewEntryForm;
