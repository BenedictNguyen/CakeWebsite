import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import apiUrls from '../../backend/mockAPI';
import '../Singapore/index.css'; 
import Menu from '../../components/Menu/menu';

const Sing = () => {
  const { id } = useParams();
  const [eventData, setEventData] = useState(null);
  const [studyAbroadData, setStudyAbroadData] = useState([]);
  const [sliderData, setSliderData] = useState([]);
  const [informationListData, setInformationListData] = useState([]);
  const [otherInformationData, setOtherInformationData] = useState([]);
  const [sidebarData, setSidebarData] = useState([]);

  useEffect(() => {
    fetch(apiUrls.schoolSystem)
      .then(response => response.json())
      .then(data => {
        setSliderData(data);
        if (id) {
          const event = data.find(item => item.id === id);
          setEventData(event);
        } else if (data.length > 0) {
          setEventData(data[0]);
        }
      });

    fetch(apiUrls.faker_2)
      .then(response => response.json())
      .then(data => setStudyAbroadData(data));

    fetch(apiUrls.schoolSystem)
      .then(response => response.json())
      .then(data => {
        const duHocSingData = data.filter(item => item.category === 'Du học Singapore');
        setInformationListData(duHocSingData);
      });

    fetch(apiUrls.otherContent)
      .then(response => response.json())
      .then(data => setSidebarData(data));

    fetch(apiUrls.faker_2)
      .then(response => response.json())
      .then(data => {
        const otherInfoData = data.filter(item => item.category === 'Du học Singapore');
        setOtherInformationData(otherInfoData);
      });
  }, [id]);

  if (!eventData) return <div>Loading...</div>;

  return (
    <div className="sing-system-container">
      <Header />
      <div className="sing-menu">
        <Menu />
      </div>
      <div className="sing-system-body">
        <div className='sing-body-title'>
          <h1 className='sing-body-title1'>
            DU HỌC SINGAPORE
          </h1>
          <h1 className='sing-body-title2'>THÔNG TIN KHÁC</h1>
        </div>
        <div className="content-column">
          {id ? (
            <>
              <h1 className="sing-title">{eventData.title}</h1>
              <img src={eventData.image_url} alt={eventData.title} className="sing-image" />
              <section className="sing-info">
                <p>{eventData.content}</p>
              </section>
            </>
          ) : (
            <>
              <div className="information-list">
                <div className="information-column">
                  {informationListData.map((policy) => (
                    <div key={policy.id} className="info-item">
                      <img src={policy.image_url} alt={policy.name} className="school-image" />
                      <div className="school-info">
                        <Link to={`/xemchitiet/schoolsystem/${policy.id}`} className="sidebar-title-button">
                          <h1>{policy.title}</h1>
                        </Link>
                        <p>{policy.summary}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="information-column">
                  {otherInformationData.map((policy) => (
                    <div key={policy.id} className="info-item">
                      <img src={policy.image_url} alt={policy.name} className="school-image" />
                      <div className="school-info">
                        <Link to={`/xemchitiet/schoolsystem/${policy.id}`} className="sidebar-title-button">
                          <h1>{policy.title}</h1>
                        </Link>
                        <p>{policy.summary}</p>
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
              {sidebarData.map((policy) => (
                <li key={policy.id}>
                  <img src={policy.image_url} alt={policy.name} className="sidebar-school-image" />
                  <div className="school-info">
                    <Link to={`/xemchitiet/schoolsystem/${policy.id}`} className="sidebar-title-button">
                      <h1>{policy.title}</h1>
                    </Link>
                    <p>{policy.summary}</p>
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

export default Sing;