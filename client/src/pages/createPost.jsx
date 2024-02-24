import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { preview } from "../assets"
import { FormField, Loading } from "../components"
import { getRandomPrompt } from "../utils"
import { FaImage } from "react-icons/fa"


const CreatePost = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '',
        prompt: '',
        photo: '',
    })

    const [generatingImg, setGeneratingImg] = useState(false);
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.prompt && form.photo) {
            setLoading(true);
            try {
                const response = await fetch('hhttp://localhost:8080/api/v1/post', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ ...form }),
                });

                await response.json();
                alert('Success');
                navigate('/');
            } catch (err) {
                alert(err);
            } finally {
                setLoading(false);
            }
        } else {
            alert('Please generate an image with proper prompt');
        }
    };
    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSurpriseMe = () => {
        const randomPrompt = getRandomPrompt(form.prompt);
        setForm({ ...form, prompt: randomPrompt });
    };

    const generateImage = async () => {
        if (form.prompt) {
            try {
                setGeneratingImg(true);
                const response = await fetch('http://localhost:8080/api/v1/artistic', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        prompt: form.prompt,
                    }),
                });

                const data = await response.json();
                setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
            } catch (err) {
                alert(err);
            } finally {
                setGeneratingImg(false);
            }
        } else {
            alert('Please provide proper prompt');
        }
    };
    return (
        <div>
            <section className="mx-auto">
                <h1 className="font-bold text-purple-700 text-lg">
                    Create
                </h1>
                <p className="mt-2 text-gray-600">
                    Unleash your creativity and craft mesmerizing,
                    visually captivating images with ArtisticText!
                    Join our vibrant community of artists and
                    embark on a journey of boundless
                    imagination. From fantastical landscapes
                    to surreal dreamscapes, bring your
                    wildest visions to life and share them
                    with the world. Let ArtisticText be your
                    canvas as you explore the depths of your
                    artistic expression and inspire others
                    with your stunning creations.
                    Join us today and spark a wave of
                    creativity that knows no limits!
                </p>
                <form className="mt-16" onSubmit={handleSubmit()}>
                    <div className="flex flex-col gap-5">
                        <FormField
                            labelName="Your name"
                            type="text"
                            name="name"
                            placeholder="eg. John Doe"
                            value={form.name}
                            handleChange={handleChange}
                        />
                        <FormField
                            labelName="Prompt"
                            type="text"
                            name="prompt"
                            placeholder="eg. Create a la-la land"
                            value={form.prompt}
                            handleChange={handleChange}
                            isSurpriseMe
                            handleSurpriseMe={handleSurpriseMe}
                        />
                        <div className="relative bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
                            {form.photo ? (
                                <img
                                    src={form.photo}
                                    alt={form.prompt}
                                    className="w-full h-full object-contain"
                                />
                            ) : (
                                <img
                                    src={preview}
                                    alt="preview"
                                    className="w-9/12 h-9/12 object-contain opacity-40"
                                />
                            )}

                            {generatingImg && (
                                <div className="absolute inset-0 z-0 flex justify-center
                                items-center bg-[rgba(0,0,0,0.5)] rounded-lg"
                                >
                                    <Loading />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="mt-5 flex gap-5 text-center align-center justify-center">
                        <button
                            type="button"
                            onClick={generateImage}
                            className=" text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                        >
                            {generatingImg ? 'Generating...' : 'Generate'}
                        </button>
                    </div>

                    <div className="mt-10 align-center text-center">
                        <p className="mt-2 text-gray-600 text-[14px]">** Once you have created the image you want, you can share it with others in the community **</p>
                        <button
                            type="submit"
                            className="mt-3 text-white bg-purple-800 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                        >
                            {loading ? 'Sharing...' : 'Share with the Community'}
                        </button>
                    </div>

                </form>
            </section>
        </div >
    )
}

export default CreatePost