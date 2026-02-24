import './CVBuilderMainContainer.css';
import { memo } from 'react';
import CVBuilderBtns from './CVBuilderBtns';

import Section from './Section';
import InputPair from './InputPair';
import TextAreaField from './TextAreaField';
import SingleFieldSection from './SingleFieldSection';
import PairWithTextAreaSection from './PairWithTextAreaSection';

function CVBuilderMainContainer({ onUpdate, cvData, setCvData, initialValues }) {
  return (
    <div className="cv-page-wrapper">
      <div className="cv-document">
        <header className="cv-header">
          <h1 className="cv-title">CV Editor</h1>
          <div className="header-line"></div>
        </header>

        <form className="cv-form">
          {/* Personal Section */}
          <Section title="Informații Personale">
            <InputPair
              field1={{ label: 'Nume Complet', name: 'personal.name', placeholder: 'Your Name' }}
              field2={{
                label: 'Numar de telefon',
                name: 'personal.phone',
                placeholder: 'Phone number',
              }}
              onChange={onUpdate}
            />
            <InputPair
              field1={{
                label: 'Locație',
                name: 'personal.location',
                placeholder: 'ex: Iasi, Romania',
              }}
              field2={{
                label: 'Email',
                name: 'personal.email',
                type: 'email',
                placeholder: 'ex: your.email@example.com',
              }}
              onChange={onUpdate}
            />
            <InputPair
              field1={{
                label: 'Github',
                name: 'personal.github',
                placeholder: 'ex: your-github-username',
              }}
              field2={{
                label: 'Linkedin',
                name: 'personal.linkedin',
                placeholder: 'ex: your-linkedin-profile',
              }}
              onChange={onUpdate}
            />
          </Section>

          {/* Experience Section */}
          <Section title="Experiență Profesională">
            <InputPair
              field1={{
                label: 'Rol',
                name: 'experience.0.role',
                placeholder: 'ex: Full Stack - Intern',
              }}
              field2={{
                label: 'Companie',
                name: 'experience.0.company',
                placeholder: 'ex: Cognizant',
              }}
              onChange={onUpdate}
            />
            <InputPair
              field1={{ label: 'Date', name: 'experience.0.date', placeholder: 'ex: 2020 - 2021' }}
              field2={{
                label: 'Locatie',
                name: 'experience.0.location',
                placeholder: 'ex: Iasi, Romania',
              }}
              onChange={onUpdate}
            />
            <TextAreaField
              label="Descriere"
              name="experience.0.description"
              placeholder="Descrie task-urile tale..."
              onChange={onUpdate}
            />
          </Section>

          {/* Education Section */}
          <Section title="Educație">
            <InputPair
              field1={{
                label: 'Instituție',
                name: 'education.0.university',
                placeholder: 'ex: UAIC Iasi',
              }}
              field2={{
                label: 'Diplomă',
                name: 'education.0.degree',
                placeholder: "ex: Master's Degree",
              }}
              onChange={onUpdate}
            />
            <InputPair
              field1={{
                label: 'Locatie',
                name: 'education.0.location',
                placeholder: 'ex: Iasi, Romania',
              }}
              field2={{ label: 'Data', name: 'education.0.date', placeholder: 'ex: 2020 - 2021' }}
              onChange={onUpdate}
            />
            <TextAreaField
              label="Descriere"
              name="education.0.description"
              placeholder="Descrie task-urile tale..."
              onChange={onUpdate}
            />
          </Section>

          {/* Skills Section */}
          <Section title="Abilități">
            <InputPair
              field1={{
                label: 'Hard Skills',
                name: 'skills.hard',
                placeholder: 'AWS, Terraform, Docker...',
                fullWidth: true,
              }}
              onChange={onUpdate}
            />
            <InputPair
              field1={{
                label: 'Soft Skills',
                name: 'skills.soft',
                placeholder: 'Punctualitate, Comunicare, Leadership...',
                fullWidth: true,
              }}
              onChange={onUpdate}
            />
          </Section>

          {/* Projects Section */}
          <PairWithTextAreaSection
            title="Proiecte Personale"
            field1={{
              label: 'Titlu Proiect',
              name: 'projects.0.title',
              placeholder: 'ex: KeyStroke',
            }}
            field2={{
              label: 'Tehnologii (Stack)',
              name: 'projects.0.stack',
              placeholder: 'ex: MongoDB, Express...',
            }}
            textAreaLabel="Descriere Proiect"
            textAreaName="projects.0.description"
            textAreaPlaceholder="Descrie task-urile tale..."
            onChange={onUpdate}
          />

          {/* Certificates Section */}
          <SingleFieldSection
            title="Certificates and Trainings"
            fieldName="certificates"
            placeholder="ex: AWS Certified, Google Cloud Training..."
            onChange={onUpdate}
          />

          {/* Volunteering Section */}
          <PairWithTextAreaSection
            title="Voluntariat & Training"
            field1={{
              label: 'Organizație & Rol',
              name: 'volunteering.0.role',
              placeholder: 'ex: ASII - Project Management',
            }}
            field2={{ label: 'Data', name: 'volunteering.0.date', placeholder: 'ex: 2020 - 2021' }}
            textAreaLabel="Descriere"
            textAreaName="volunteering.0.description"
            textAreaPlaceholder="Descrie task-urile tale..."
            onChange={onUpdate}
          />

          {/* Languages Section */}
          <SingleFieldSection
            title="Languages"
            fieldName="languages"
            placeholder="ex: English - C1, French - B2"
            onChange={onUpdate}
          />

          {/* Interests Section */}
          <SingleFieldSection
            title="Interests"
            fieldName="interests"
            placeholder="ex: Reading, Traveling, Photography"
            onChange={onUpdate}
          />

          <CVBuilderBtns cvData={cvData} setCvData={setCvData} initialValues={initialValues} />
        </form>
      </div>
    </div>
  );
}

export default memo(CVBuilderMainContainer);
