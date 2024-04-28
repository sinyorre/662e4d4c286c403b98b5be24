async function getWebsiteData() {
    const res = await fetch(`http://hekimrandevum-env.eba-md56hm3n.eu-central-1.elasticbeanstalk.com/users/${process.env.USER_ID}/websites`);

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export default async function Home() {

    const data = await getWebsiteData();

    let mainCard = null;
    let intensivesCards = null;
    let testimonialsCard = null;

    if (data) {
        const {contents} = data;
        // todo map li çözüm eklenilmeli
        contents.forEach(content => {
            if (content.type === "MainCard") {
                mainCard = content;
            } else if (content.type === "IncentivesCard") {
                intensivesCards = content
            } else if (content.type === "TestimonialsCard") {
                testimonialsCard = content
            }
        })
    }

    function renderTestimonialCard(index) {
        return (
            <div
                className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6">
                <div className="w-full flex mb-4 items-center">
                    <div
                        className="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                        {
                            testimonialsCard.data[index].avatar && testimonialsCard.data[index].avatar !== "" &&
                            <img src={testimonialsCard.data[index].avatar}
                                 alt=""/>
                        }
                    </div>
                    <div className="flex-grow pl-3">
                        <h6 className="font-bold text-sm uppercase text-gray-600">{testimonialsCard.data[index].name}</h6>
                    </div>
                </div>
                <div className="w-full">
                    <p className="text-sm leading-tight">
                                                                    <span
                                                                        className="text-lg leading-none italic font-bold text-gray-400 mr-1">"</span>
                        {testimonialsCard.data[index].comment}
                        <span
                            className="text-lg leading-none italic font-bold text-gray-400 ml-1">"</span>
                    </p>
                </div>
            </div>
        );
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between">
            <div className="w-full flex flex-col p-10 gap-5 md:w-10/12">
                {
                    mainCard && (
                        <div className="flex flex-col justify-center items-center shadow-sm md:flex-row md:shadow-xl">
                            <div className="flex flex-none">
                                <img className="h-auto max-w-sm md:max-w-md"
                                     src={mainCard.image}
                                     alt="image description"
                                />
                            </div>
                            <div className="flex flex-col max-w-sm p-2 md:grow md:max-w-full">
                                <div
                                    className="flex flex-col w-full justify-center items-center mt-3 md:w-3/4 md:ml-7 md:items-start md:mt-0">
                                    <h1 className="text-6xl font-bold text-gray-600 text-center md:text-left">{mainCard.title}</h1>
                                    <p className="font-light text-xl mt-4 text-center md:text-left">{mainCard.description}</p>
                                    <button
                                        type="button"
                                        className="mt-7 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 md:text-base"
                                    >
                                        Randevu Al
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                }
                {
                    intensivesCards && (
                        <div className="flex flex-col w-full md:flex-row gap-10 mt-10 mb-10 py-10 px-4 shadow-sm">
                            {intensivesCards.data.map(card => (
                                <div
                                    className="flex flex-col items-center gap-5">
                                    <h2 className="font-sans font-bold text-4xl text-gray-600 text-center">{card.title ? card.title : ''}</h2>
                                    <p className="text-lg text-center font-light">{card.description ? card.description : ''}</p>
                                </div>
                            ))}
                        </div>
                    )
                }
                {
                    <div className="min-w-screen bg-gray-50 flex justify-center">
                        <div
                            className="w-full bg-white md:py-24 text-gray-800">
                            <div className="w-full max-w-6xl mx-auto">
                                <div className="text-center max-w-xl mx-auto">
                                    <h1 className="text-6xl md:text-7xl font-bold mb-5 text-gray-600">
                                        Sizden Gelenler
                                    </h1>
                                    <h3 className="text-xl mb-5 font-light">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                    </h3>
                                    <div className="text-center mb-10">
                                        <span className="inline-block w-1 h-1 rounded-full bg-blue-700 ml-1"/>
                                        <span className="inline-block w-3 h-1 rounded-full bg-blue-700 ml-1"/>
                                        <span className="inline-block w-40 h-1 rounded-full bg-blue-700"/>
                                        <span className="inline-block w-3 h-1 rounded-full bg-blue-700 ml-1"/>
                                        <span className="inline-block w-1 h-1 rounded-full bg-blue-700 ml-1"/>
                                    </div>
                                </div>
                                <div className="-mx-3 md:flex items-start">
                                    <div className="px-3 md:w-1/3">
                                        {
                                            [0, 3, 6].map(index => {
                                                if (testimonialsCard.data[index]) {
                                                    return renderTestimonialCard(index)
                                                }
                                            })
                                        }
                                    </div>
                                    <div className="px-3 md:w-1/3">
                                        {
                                            [1, 4, 7].map(index => {
                                                if (testimonialsCard.data[index]) {
                                                    return renderTestimonialCard(index)
                                                }
                                            })
                                        }
                                    </div>
                                    <div className="px-3 md:w-1/3">
                                        {
                                            [2, 5, 8].map(index => {
                                                if (testimonialsCard.data[index]) {
                                                    return renderTestimonialCard(index)
                                                }
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </main>
    )
}
