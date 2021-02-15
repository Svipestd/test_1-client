import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setNews } from '../store/newsReducer';
import NewsCard from '../components/NewsCard';
import NewsForm from '../components/NewsForm';

import { Loader, Segment } from 'semantic-ui-react';

const News = () => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.authPage.user.token);
  const news = useSelector(state => state.newsPage.news);
  const isLoading = useSelector(state => state.app.isLoading);

  useEffect(() => {
    dispatch(setNews(token))
  }, [token, setNews])

  if (isLoading) {
    return <Loader active inline="centered" />
  }

  return (
    <>
      <Segment>
        <h2>Create news</h2>
        <NewsForm />
      </Segment>

      <Segment>
        <h2>Latest news</h2>
        {news.length < 1 && (
          <h5>Новостей нет...</h5>
        )}
        {isLoading
          ? <Loader active />
          : news.map(news => (
            <NewsCard key={news._id} news={news} />
          ))
        }
      </Segment>
    </>
  )
}

export default News;