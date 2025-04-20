import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function App() {
    const [image, setImage] = useState(null);
    const [result, setResult] = useState('');
    const [audio, setAudio] = useState('');

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async () => {
        if (!image) {
            alert("Please select an image first.");
            return;
        }

        const formData = new FormData();
        formData.append('image', image); // Must match Flask key

        try {
            const res = await axios.post('http://localhost:5000/upload', formData, {
                responseType: 'blob', // Important for audio files
            });

            const audioBlob = new Blob([res.data], { type: 'audio/mp3' });
            const audioUrl = URL.createObjectURL(audioBlob);

            setResult("Medicines extracted. Play the audio below.");
            setAudio(audioUrl);
        } catch (err) {
            console.error("Upload failed:", err);
            setResult("Failed to process the image.");
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <h1 className="text-3xl font-bold mb-4">🩺 Medical Prescription Reader</h1>
            <Input type="file" accept="image/*" onChange={handleImageChange} className="mb-4" />
            <Button onClick={handleSubmit}>Upload & Recognize</Button>

            {result && (
                <div className="mt-6 text-center">
                    <p className="text-xl mb-2">{result}</p>
                    {audio && (
                        <audio controls className="mt-4">
                            <source src={audio} type="audio/mp3" />
                            Your browser does not support the audio element.
                        </audio>
                    )}
                </div>
            )}
        </div>
    );
}
