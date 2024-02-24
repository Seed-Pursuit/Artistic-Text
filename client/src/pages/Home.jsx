import React, { useState, useEffect } from "react"
import { Card, FormField, Loading } from "../components";

const RenderCards = ({ data, title }) => {
    if (data?.length > 0) {
        return (
            data.map((post) => <Card key={post._id} {...post} />)
        );
    }

    return (
        <h2 className="mt-5 font-bold text-[#6469ff] text-xl uppercase">{title}</h2>
    );
};


const Home = () => {
    const [loading, setLoading] = useState(false);
    const [allPosts, setAllPosts] = useState(null);
    const [error, setError] = useState(null);
    const [searchText, setSearchText] = useState('');


    return (
        <div>
            <section className="max-w-7x1 mx-auto">
                <div className="font-bold text-black text-lg">Scrapbook</div>
                <p className="mt-2 text-gray-600">Browse images created by ML model</p>

                <div className="mt-16">
                    <FormField

                    />
                </div>
                <div className="mt-10">
                    {
                        loading ? (
                            <div>
                                <Loading />
                            </div>
                        ) : (
                            <>
                                {
                                    searchText && (
                                        <h2 className="font-medium text-gray-600 text-xl mb-3">
                                            Showing results for <span >{searchText}</span>
                                        </h2>
                                    )
                                }
                                <div className="grid grid-col-4 gap-3">
                                    {
                                        searchText ? (
                                            <RenderCards
                                                data={[]}
                                                title="No results found"

                                            />
                                        ) : (
                                            <RenderCards
                                                data={[]}
                                                title="No posts available"
                                            />
                                        )
                                    }
                                </div>
                            </>
                        )
                    }
                </div>
            </section>
        </div>
    )
}

export default Home