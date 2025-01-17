import './footer.css';

function Footer() {
  return (
    <div className="footer">
      <div className="footer-container">
        <p className="footer-text">© {new Date().getFullYear()} MyWebsite. All rights reserved.</p>
        <div className="footer-links">
          <a href="/#" className="footer-link">Privacy Policy</a>
          <a href="/#" className="footer-link">Terms of Service</a>
          <a href="/#" className="footer-link">Contact Us</a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
