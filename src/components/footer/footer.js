import React from "react";
import '../footer/footer.css';
import HomeIcon from '@mui/icons-material/Home';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import Logo from '../../assets/logo1.png';

const Footer = () => {

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
        <div className="footerColumn contact address">
            <h3>Liên hệ</h3>
            <p><HomeIcon className="footerIcon" /> Địa chỉ: 10/3 Nguyễn Thị Minh Khai, p.Đakao, Q1, TP.HCM</p>
            <p><EmailIcon className="footerIcon" /> Email: info@uniglobe.edu.vn</p>
            <p><PhoneIcon className="footerIcon" /> Điện thoại: (028) 35 173 345</p>
        </div>

        <div className="footerColumn map">
            <h3>Vị trí</h3>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.7391160498707!2d106.69319411513969!3d10.776889492309532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f4bbdddb0d1%3A0xf92831b0f7dff56f!2zMTAvMyBOZ3V5ZW4gVGhpIFBoaXRobiBLaGFpLCBQaC4gRGFrYW8sIFF1w6F0IDE!5e0!3m2!1sen!2s!4v1676632934161!5m2!1sen!2s"
                width="300"
                height="200"
                allowFullScreen=""
                loading="lazy"
                title="Vị trí trên bản đồ"
            ></iframe>
        </div>

        <div className="footerColumn logo">
            <div className="logoContainer">
                <img src={Logo} alt="Logo" className="logoImage" />
            </div>
        </div>

        <div className="footer-copyright">
            <p>© {currentYear} Copy rights UNIGLOBE ENGLISH CENTRE. All Rights Reserved</p>
        </div>
    </footer>
  );
};

export default Footer;