// ArtisanSearch.jsx
import React, { useState } from "react";
import axios from "axios";

const ArtisanSearch = () => {
    const [query, setQuery] = useState(""); // Search term
    const [artisans, setArtisans] = useState([]); // List of artisans
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(""); // Error handling state

    const handleSearch = async (e) => {
        e.preventDefault(); // Prevent form submission reload
        setLoading(true);
        setError(""); // Reset errors
        try {
            const response = await axios.get(`https://i-wanwok-backend.up.railway.app/administrator/artisans/search2/?query=${query}`);
            setArtisans(response.data); // Set artisan data
        } catch (err) {
            console.error(err);
            setError("There was an error while searching.");
        }
        setLoading(false);
    };

    return (
        <div>
            <h1>Search for Artisans</h1>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search by name, email, or phone"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)} // Update search term
                />
                <button type="submit" disabled={loading}>
                    {loading ? "Searching..." : "Search"}
                </button>
            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {artisans.length > 0 && !loading && (
                <ul>
                    {artisans.map((artisan) => (
                        <li key={artisan.id}>
                            <h3>{artisan.user} - {artisan.service}</h3>
                            <p>Email: {artisan.user.email}</p>
                            <p>Phone: {artisan.phone_number}</p>
                            <p>Experience: {artisan.experience} years</p>
                            <p>Pay: ${artisan.pay}</p>
                        </li>
                    ))}
                </ul>
            )}

            {artisans.length === 0 && !loading && (
                <p>No artisans found matching your search.</p>
            )}
        </div>
    );
};

export default ArtisanSearch;
