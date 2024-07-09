import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";



const News = (props) => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)

    /*document.title = `${this.capitalizeFirstLetter(props.category)}-Daily News Dose`;*/

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }



    const updateNews = async () => {
        props.setProgress(0);
        let url = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=6baed97887824e6486f8ceb04b6452bf&page=1&pageSize=${props.pageSize}`;
        setLoading(true)
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json()
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)

        props.setProgress(100);

    }

    useEffect(() => {
        updateNews();
    }, [])


    const handlePrevClick = async () => {
        setPage(page - 1)
        updateNews();
    }

    const handleNextClick = async () => {
        setPage(page + 1)
        updateNews();
    }

    const fetchMoreData = async () => {

        let url = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=6baed97887824e6486f8ceb04b6452bf&page=${page + 1}&pageSize=${props.pageSize}`;
        setPage(page + 1)
        let data = await fetch(url);
        let parsedData = await data.json()
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
        setLoading(false)


    };


    return (
        <div className="container">
            <h2 classNmae="text-center" style={{ margin: '35px 0px', marginTop: '90px' }}>InfoPulse- Top {capitalizeFirstLetter(props.category)} Headlines</h2>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >
                <div className="row my-4 mx-3">
                    {articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <Newsitem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} />
                        </div>
                    })}


                </div>
            </InfiniteScroll>







        </div>

    )
}


News.defaultProps = {
    pageSize: 2,
    category: 'general'
}

News.propTypes = {
    pageSize: 6,
    category: PropTypes.string,
}

export default News
