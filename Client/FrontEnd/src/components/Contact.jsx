import "../styles/contact.css";

function Contact() {
  return (
    <div className="contact-container">
      <div className="glassy-card">
        <div className="contact-card">
          <img src="team_member_1.jpg" alt="Team Member 1" />
          <h2>John Doe</h2>
          <p>Frontend Developer</p>
          <p>Email: john@example.com</p>
          <p>
            GitHub:{" "}
            <a
              href="https://github.com/johndoe"
              target="_blank"
              rel="noopener noreferrer"
            >
              johndoe
            </a>
          </p>
          <p>
            LinkedIn:{" "}
            <a
              href="https://www.linkedin.com/in/johndoe"
              target="_blank"
              rel="noopener noreferrer"
            >
              johndoe
            </a>
          </p>
        </div>
      </div>
      <div className="glassy-card">
        <div className="contact-card">
          <img src="..\..\public\team_member_2.jpeg" alt="Team Member 2" />
          <h2>Vaidik Pandya</h2>
          <p>Web Developer</p>
          <p>Email: vaidik24pandya@gmail.com</p>
          <p>
            GitHub:{" "}
            <a
              href="https://github.com/vaidik24"
              target="_blank"
              rel="noopener noreferrer"
            >
              Vaidik24
            </a>
          </p>
          <p>
            LinkedIn:{" "}
            <a
              href="https://www.linkedin.com/in/vaidik-pandya/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Vaidik24
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
