import './CVBuilderMainContainer.css';
import { memo } from 'react';

function CVBuilderMainContainer({ onUpdate }) {
  return (
    <div className="cv-page-wrapper">
      <div className="cv-document">
        <header className="cv-header">
          <h1 className="cv-title">CV Editor</h1>
          <div className="header-line"></div>
        </header>

        <form className="cv-form">
          <section className="cv-section">
            <h2 className="section-label">Informații Personale</h2>
            <div className="cv-grid">
              <div className="cv-input-group">
                <label>Nume Complet</label>
                <input
                  name="personal.name"
                  type="text"
                  onChange={onUpdate}
                  className="cv-field"
                  placeholder="Your Name"
                />
              </div>

              <div className="cv-input-group">
                <label>Numar de telefon</label>
                <input
                  name="personal.phone"
                  type="text"
                  onChange={onUpdate}
                  className="cv-field"
                  placeholder="Phone number"
                />
              </div>

              <div className="cv-input-group">
                <label>Locație</label>
                <input
                  name="personal.location"
                  type="text"
                  onChange={onUpdate}
                  className="cv-field"
                  placeholder="ex: Iasi, Romania"
                />
              </div>

              <div className="cv-input-group">
                <label>Email</label>
                <input
                  name="personal.email"
                  type="email"
                  onChange={onUpdate}
                  className="cv-field"
                  placeholder="ex: your.email@example.com"
                />
              </div>

              <div className="cv-input-group">
                <label>Github</label>
                <input
                  name="personal.github"
                  type="text"
                  onChange={onUpdate}
                  className="cv-field"
                  placeholder="ex: your-github-username"
                />
              </div>

              <div className="cv-input-group">
                <label>Linkedin</label>
                <input
                  name="personal.linkedin"
                  type="text"
                  onChange={onUpdate}
                  className="cv-field"
                  placeholder="ex: your-linkedin-profile"
                />
              </div>
            </div>
          </section>

          <section className="cv-section">
            <h2 className="section-label">Experiență Profesională</h2>
            <div className="cv-grid">
              <div className="cv-input-group">
                <label>Rol</label>
                <input
                  name="experience.0.role"
                  type="text"
                  className="cv-field"
                  placeholder="ex: Full Stack - Intern"
                  onChange={onUpdate}
                />
              </div>
              <div className="cv-input-group">
                <label>Companie</label>
                <input
                  name="experience.0.company"
                  type="text"
                  className="cv-field"
                  placeholder="ex: Cognizant"
                  onChange={onUpdate}
                />
              </div>

              <div className="cv-input-group">
                <label>Date</label>
                <input
                  name="experience.0.date"
                  type="text"
                  className="cv-field"
                  placeholder="ex: 2020 - 2021"
                  onChange={onUpdate}
                />
              </div>

              <div className="cv-input-group">
                <label>Locatie</label>
                <input
                  name="experience.0.location"
                  type="text"
                  className="cv-field"
                  placeholder="ex: Iasi, Romania"
                  onChange={onUpdate}
                />
              </div>

              <div className="cv-input-group full-width">
                <label>Descriere</label>
                <textarea
                  name="experience.0.description"
                  className="cv-field cv-textarea"
                  rows="3"
                  placeholder="Descrie task-urile tale..."
                  onChange={onUpdate}
                ></textarea>
              </div>
            </div>
          </section>

          <section className="cv-section">
            <h2 className="section-label">Educație</h2>
            <div className="cv-grid">
              <div className="cv-input-group">
                <label>Instituție</label>
                <input
                  name="education.0.university"
                  type="text"
                  className="cv-field"
                  placeholder="ex: UAIC Iasi"
                  onChange={onUpdate}
                />
              </div>
              <div className="cv-input-group">
                <label>Diplomă</label>
                <input
                  name="education.0.degree"
                  type="text"
                  className="cv-field"
                  placeholder="ex: Master's Degree"
                  onChange={onUpdate}
                />
              </div>

              <div className="cv-input-group">
                <label>Locatie</label>
                <input
                  name="education.0.location"
                  type="text"
                  className="cv-field"
                  placeholder="ex: Iasi, Romania"
                  onChange={onUpdate}
                />
              </div>

              <div className="cv-input-group">
                <label>Data</label>
                <input
                  name="education.0.date"
                  type="text"
                  className="cv-field"
                  placeholder="ex: 2020 - 2021"
                  onChange={onUpdate}
                />
              </div>

              <div className="cv-input-group">
                <label>Descriere</label>
                <textarea
                  name="education.0.description"
                  className="cv-field cv-textarea"
                  rows="3"
                  placeholder="Descrie task-urile tale..."
                  onChange={onUpdate}
                ></textarea>
              </div>
            </div>
          </section>

          <section className="cv-section">
            <h2 className="section-label">Abilități</h2>
            <div className="cv-grid">
              <div className="cv-input-group full-width">
                <label>Hard Skills</label>
                <input
                  name="skills.hard"
                  type="text"
                  className="cv-field"
                  placeholder="AWS, Terraform, Docker..."
                  onChange={onUpdate}
                />
              </div>
              <div className="cv-input-group full-width">
                <label>Soft Skills</label>
                <input
                  name="skills.soft"
                  type="text"
                  className="cv-field"
                  placeholder="Punctualitate, Comunicare, Leadership..."
                  onChange={onUpdate}
                />
              </div>
            </div>
          </section>

          <section className="cv-section">
            <h2 className="section-label">Proiecte Personale</h2>
            <div className="cv-grid">
              <div className="cv-input-group">
                <label>Titlu Proiect</label>
                <input
                  name="projects.0.title"
                  type="text"
                  className="cv-field"
                  placeholder="ex: KeyStroke"
                  onChange={onUpdate}
                />
              </div>
              <div className="cv-input-group">
                <label>Tehnologii (Stack)</label>
                <input
                  name="projects.0.stack"
                  type="text"
                  className="cv-field"
                  placeholder="ex: MongoDB, Express..."
                  onChange={onUpdate}
                />
              </div>

              <div className="cv-input-group">
                <label>Descriere Proiect</label>
                <textarea
                  name="projects.0.description"
                  className="cv-field cv-textarea"
                  rows="3"
                  placeholder="Descrie task-urile tale..."
                  onChange={onUpdate}
                ></textarea>
              </div>
            </div>
          </section>

          <section className="cv-section">
            <h2 className="section-label">Cerificates and Trainings</h2>
            <div className="cv-grid">
              <div className="cv-input-group full-width">
                <input
                  name="certificates"
                  type="text"
                  className="cv-field"
                  placeholder="ex: AWS Certified, Google Cloud Training..."
                  onChange={onUpdate}
                />
              </div>
            </div>
          </section>

          <section className="cv-section">
            <h2 className="section-label">Voluntariat & Training</h2>
            <div className="cv-grid">
              <div className="cv-input-group full-width">
                <label>Organizație & Rol</label>
                <input
                  name="volunteering.0.role"
                  type="text"
                  className="cv-field"
                  placeholder="ex: ASII - Project Management"
                  onChange={onUpdate}
                />
              </div>

              <div className="cv-input-group full-width">
                <label>Data</label>
                <input
                  name="volunteering.0.date"
                  type="text"
                  className="cv-field"
                  placeholder="ex: 2020 - 2021"
                  onChange={onUpdate}
                />
              </div>

              <div className="cv-input-group full-width">
                <label>Descriere</label>
                <textarea
                  name="volunteering.0.description"
                  className="cv-field cv-textarea"
                  rows="3"
                  placeholder="Descrie task-urile tale..."
                  onChange={onUpdate}
                ></textarea>
              </div>
            </div>
          </section>

          <section className="cv-section">
            <h2 className="section-label">Languages</h2>
            <div className="cv-grid">
              <div className="cv-input-group full-width">
                <input
                  name="languages"
                  type="text"
                  className="cv-field"
                  placeholder="ex: English - C1, French - B2"
                  onChange={onUpdate}
                />
              </div>
            </div>
          </section>

          <section className="cv-section">
            <h2 className="section-label">Interests</h2>
            <div className="cv-grid">
              <div className="cv-input-group full-width">
                <input
                  name="interests"
                  type="text"
                  className="cv-field"
                  placeholder="ex: Reading, Traveling, Photography"
                  onChange={onUpdate}
                />
              </div>
            </div>
          </section>

          <div className="cv-buttons">
            <button type="submit" className="cv-btn">
              Salveaza progresul
            </button>
            <button type="submit" className="cv-btn">
              Descarcă
            </button>
            <button type="submit" className="cv-btn">
              Reseteaza
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default memo(CVBuilderMainContainer);
