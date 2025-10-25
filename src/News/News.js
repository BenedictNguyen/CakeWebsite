import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import apiUrls from '../backend/mockAPI';
import '../News/News.css'
import Menu from '../components/Menu/menu';

const News = () => {
    const { id } = useParams();
    const [eventData, setEventData] = useState(null);
    const [newsData, setNewsData] = useState([]);
    const [sliderData, setSliderData] = useState([]);
    const [informationListData, setInformationListData] = useState([]);
    const [otherInformationData, setOtherInformationData] = useState([]);
    const [sidebarData, setSidebarData] = useState([]);
  
    useEffect(() => {
      fetch('http://localhost:5001/api/posts')
        .then(response => response.json())
        .then(data => setNewsData(data));
  
      fetch('http://localhost:5001/api/studyabroad_info')
        .then(response => response.json())
        .then(data => setInformationListData(data));
  
      fetch('http://localhost:5001/api/event_centre')
        .then(response => response.json())
        .then(data => setSidebarData(data));
  
      fetch(apiUrls.schoolSystem)
        .then(response => response.json())
        .then(data => {
          setSliderData(data);
          if (id) {
            const event = data.find(item => item.id === Number(id));
            setEventData(event);
          } else if (data.length > 0) {
            setEventData(data[0]);
          }
        });
    }, [id]);
  
    if (!eventData) return <div>Loading...</div>;
  
    return (
      <div className="news-system-container">
        <Header />
        <div className="news-menu">
          <Menu />
        </div>
        <div className="news-system-body">
          <div className='news-body-title'>
            <h1 className='news-body-title1'>
              TIN TỨC
            </h1>
            <h1 className='news-body-title2'>SỰ KIỆN TRUNG TÂM</h1>
          </div>
          <div className="content-column">
            {id ? (
              <>
                <h1 className="news-title">{eventData.title}</h1>
                <img src={eventData.imageUrl} alt={eventData.title} className="news-image" />
                <section className="news-info">
                  <p>{eventData.content}</p>
                </section>
              </>
            ) : (
              <>
                <div className="information-list">
                  <div className="information-column">
                    {informationListData.map((news) => (
                      <div key={news.id} className="info-item">
                        <img src={news.image_url} alt={news.name} className="news-image" />
                        <div className="news-info">
                          <Link to={`/xemchitiet/information/${news.id}`} className="sidebar-title-button">
                            <h1>{news.title}</h1>
                          </Link>
                          <p>{news.summary}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
            <div className="divider"></div>
          </div>
  
          <div className="sidebar-column">
            <div className="sidebar-row">
              <ul>
                {sidebarData.map((event) => (
                  <li key={event.id}>
                    <img src={event.image_url} alt={event.name} className="sidebar-info-image" />
                    <div className="event-info">
                      <Link to={`/xemchitiet/events/${event.id}`} className="sidebar-title-button">
                        <h1>{event.title}</h1>
                      </Link>
                      <p>{event.summary}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  };
export default News;