import './CVBuilderMainContainer.css';

export default function CVBuilderMainContainer({ cvData, onUpdate }) {
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
                  name="name"
                  type="text"
                  value={cvData.personal.name}
                  onChange={onUpdate}
                  className="cv-field"
                />
              </div>

              <div className="cv-input-group">
                <label>Numar de telefon</label>
                <input
                  name="phone"
                  type="text"
                  value={cvData.personal.phone}
                  onChange={onUpdate}
                  className="cv-field"
                />
              </div>

              <div className="cv-input-group">
                <label>Locație</label>
                <input
                  name="location"
                  type="text"
                  value={cvData.personal.location}
                  onChange={onUpdate}
                  className="cv-field"
                />
              </div>

              <div className="cv-input-group">
                <label>Email</label>
                <input
                  name="email"
                  type="email"
                  value={cvData.personal.email}
                  onChange={onUpdate}
                  className="cv-field"
                />
              </div>

              <div className="cv-input-group">
                <label>Github</label>
                <input
                  name="github"
                  type="text"
                  value={cvData.personal.github}
                  onChange={onUpdate}
                  className="cv-field"
                />
              </div>

              <div className="cv-input-group">
                <label>Linkedin</label>
                <input
                  name="linkedin"
                  type="text"
                  value={cvData.personal.linkedin}
                  onChange={onUpdate}
                  className="cv-field"
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
                  name="expRole"
                  type="text"
                  className="cv-field"
                  placeholder="ex: Full Stack - Intern"
                  onChange={onUpdate}
                />
              </div>
              <div className="cv-input-group">
                <label>Companie</label>
                <input
                  name="expCompany"
                  type="text"
                  className="cv-field"
                  placeholder="ex: Cognizant"
                  onChange={onUpdate}
                />
              </div>

              <div className="cv-input-group">
                <label>Date</label>
                <input
                  name="expDate"
                  type="text"
                  className="cv-field"
                  placeholder="ex: 2020 - 2021"
                  onChange={onUpdate}
                />
              </div>

              <div className="cv-input-group">
                <label>Locatie</label>
                <input
                  name="expLocation"
                  type="text"
                  className="cv-field"
                  placeholder="ex: Iasi, Romania"
                  onChange={onUpdate}
                />
              </div>

              <div className="cv-input-group full-width">
                <label>Descriere</label>
                <textarea
                  name="expDesc"
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
                <input name="eduUni" type="text" className="cv-field" placeholder="ex: UAIC Iasi" />
              </div>
              <div className="cv-input-group">
                <label>Diplomă</label>
                <input
                  name="eduDegree"
                  type="text"
                  className="cv-field"
                  placeholder="ex: Master's Degree"
                  onChange={onUpdate}
                />
              </div>

              <div className="cv-input-group">
                <label>Locatie</label>
                <input
                  name="eduLocation"
                  type="text"
                  className="cv-field"
                  placeholder="ex: Iasi, Romania"
                  onChange={onUpdate}
                />
              </div>

              <div className="cv-input-group">
                <label>Data</label>
                <input
                  name="eduDate"
                  type="text"
                  className="cv-field"
                  placeholder="ex: 2020 - 2021"
                  onChange={onUpdate}
                />
              </div>

              <div className="cv-input-group">
                <label>Descriere</label>
                <textarea
                  name="eduDesc"
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
                  name="hardSkills"
                  type="text"
                  className="cv-field"
                  placeholder="AWS, Terraform, Docker..."
                  onChange={onUpdate}
                />
              </div>
              <div className="cv-input-group full-width">
                <label>Soft Skills</label>
                <input
                  name="softSkills"
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
                  name="projTitle"
                  type="text"
                  className="cv-field"
                  placeholder="ex: KeyStroke"
                  onChange={onUpdate}
                />
              </div>
              <div className="cv-input-group">
                <label>Tehnologii (Stack)</label>
                <input
                  name="projStack"
                  type="text"
                  className="cv-field"
                  placeholder="ex: MongoDB, Express..."
                  onChange={onUpdate}
                />
              </div>

              <div className="cv-input-group">
                <label>Descriere Proiect</label>
                <textarea
                  name="projDesc"
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
            <div className="cv-input-group full-width">
              <input
                name="certificates"
                type="text"
                className="cv-field"
                placeholder="ex: AWS Certified, Google Cloud Training..."
                onChange={onUpdate}
              />
            </div>
          </section>

          <section className="cv-section">
            <h2 className="section-label">Voluntariat & Training</h2>
            <div className="cv-input-group full-width">
              <label>Organizație & Rol</label>
              <input
                name="volRole"
                type="text"
                className="cv-field"
                placeholder="ex: ASII - Project Management"
                onChange={onUpdate}
              />
            </div>

            <div className="cv-input-group full-width">
              <label>Data</label>
              <input
                name="volDate"
                type="text"
                className="cv-field"
                placeholder="ex: 2020 - 2021"
                onChange={onUpdate}
              />
            </div>

            <div className="cv-input-group full-width">
              <label>Descriere</label>
              <textarea
                name="volDesc"
                className="cv-field cv-textarea"
                rows="3"
                placeholder="Descrie task-urile tale..."
                onChange={onUpdate}
              ></textarea>
            </div>
          </section>

          <section className="cv-section">
            <h2 className="section-label">Languages</h2>
            <div className="cv-input-group full-width">
              <input
                name="languages"
                type="text"
                className="cv-field"
                placeholder="ex: English - C1, French - B2"
                onChange={onUpdate}
              />
            </div>
          </section>

          <section className="cv-section">
            <h2 className="section-label">Interests</h2>
            <div className="cv-input-group full-width">
              <input
                name="interests"
                type="text"
                className="cv-field"
                placeholder="ex: Reading, Traveling, Photography"
                onChange={onUpdate}
              />
            </div>
          </section>

          <button type="submit" className="cv-save-btn">
            Generează CV Final
          </button>
        </form>
      </div>
    </div>
  );
}
