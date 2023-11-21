"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddTopic() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !description) {
            alert("Title and description are required.");
            return;
        }

        try {
            const res = await fetch("http://localhost:3000/api/topics", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ title, description }),
            });

            if (res.ok) {
                router.push("/");
            } else {
                throw new Error("Failed to create a topic");
            }
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold mb-4">Topic Form</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    className="border border-slate-500 px-8 py-2"
                    type="text"
                    placeholder="Topic Title"
                />

                <input
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    className="border border-slate-500 px-8 py-2"
                    type="text"
                    placeholder="Topic Description"
                />

                <button
                    type="submit"
                    className="bg-green-600 font-bold text-white py-3 px-6 w-fit"
                >
                    Add Topic
                </button>
            </form>
        </div>
    );

}