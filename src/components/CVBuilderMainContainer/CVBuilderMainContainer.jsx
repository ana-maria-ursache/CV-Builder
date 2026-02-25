import './CVBuilderMainContainer.css';
import { memo } from 'react';
import CVBuilderBtns from './CVBuilderBtns';

import Section from './Section';
import InputPair from './InputPair';
import TextAreaField from './TextAreaField';
import SingleFieldSection from './SingleFieldSection';
import PairWithTextAreaSection from './PairWithTextAreaSection';

import { useTranslation } from 'react-i18next';

function CVBuilderMainContainer({ onUpdate, cvData, initialValues }) {
  const { t } = useTranslation();

  return (
    <div className="cv-page-wrapper">
      <div className="cv-document">
        <header className="cv-header">
          <h1 className="cv-title">{t('cv-editor')}</h1>
          <div className="header-line"></div>
        </header>

        <form className="cv-form">
          {/* Personal Section */}
          <Section title={t('personal-info')}>
            <InputPair
              field1={{ label: t('nume'), name: 'personal.name', placeholder: t('nume') }}
              field2={{
                label: t('phone-number'),
                name: 'personal.phone',
                placeholder: t('phone-number'),
              }}
              onChange={onUpdate}
            />
            <InputPair
              field1={{
                label: t('location'),
                name: 'personal.location',
                placeholder: t('location-placeholder'),
              }}
              field2={{
                label: t('email'),
                name: 'personal.email',
                type: 'email',
                placeholder: t('email-placeholder'),
              }}
              onChange={onUpdate}
            />
            <InputPair
              field1={{
                label: 'Github',
                name: 'personal.github',
                placeholder: t('github-placeholder'),
              }}
              field2={{
                label: 'Linkedin',
                name: 'personal.linkedin',
                placeholder: t('linkedin-placeholder'),
              }}
              onChange={onUpdate}
            />
          </Section>

          {/* Experience Section */}
          <Section title={t('work-experience')}>
            <InputPair
              field1={{
                label: t('role'),
                name: 'experience.0.role',
                placeholder: 'ex: Full Stack - Intern',
              }}
              field2={{
                label: t('company'),
                name: 'experience.0.company',
                placeholder: 'ex: Cognizant',
              }}
              onChange={onUpdate}
            />
            <InputPair
              field1={{ label: t('date'), name: 'experience.0.date', placeholder: 'ex: 2020 - 2021' }}
              field2={{
                label: t('location'),
                name: 'experience.0.location',
                placeholder: t('location-placeholder'),
              }}
              onChange={onUpdate}
            />
            <TextAreaField
              label={t('description')}
              name="experience.0.description"
              placeholder="Descrie task-urile tale..."
              onChange={onUpdate}
            />
          </Section>

          {/* Education Section */}
          <Section title={t('education')}>
            <InputPair
              field1={{
                label: t('university'),
                name: 'education.0.university',
                placeholder: 'ex: UAIC Iasi',
              }}
              field2={{
                label: t('degree'),
                name: 'education.0.degree',
                placeholder: "ex: Master's Degree",
              }}
              onChange={onUpdate}
            />
            <InputPair
              field1={{
                label: t('location'),
                name: 'education.0.location',
                placeholder: t('location-placeholder'),
              }}
              field2={{ label: t('date'), name: 'education.0.date', placeholder: 'ex: 2020 - 2021' }}
              onChange={onUpdate}
            />
            <TextAreaField
              label={t('description')}
              name="education.0.description"
              placeholder={t('description-placeholder')}
              onChange={onUpdate}
            />
          </Section>

          {/* Skills Section */}
          <Section title={t('skills')}>
            <InputPair
              field1={{
                label: t('hard-skills'),
                name: 'skills.hard',
                placeholder: 'AWS, Terraform, Docker...',
                fullWidth: true,
              }}
              onChange={onUpdate}
            />
            <InputPair
              field1={{
                label: t('soft-skills'),
                name: 'skills.soft',
                placeholder: 'Punctualitate, Comunicare, Leadership...',
                fullWidth: true,
              }}
              onChange={onUpdate}
            />
          </Section>

          {/* Projects Section */}
          <PairWithTextAreaSection
            title={t('personal-projects')}
            field1={{
              label: t('project-title'),
              name: 'projects.0.title',
              placeholder: 'ex: KeyStroke',
            }}
            field2={{
              label: t('stack'),

              name: 'projects.0.stack',
              placeholder: 'ex: MongoDB, Express...',
            }}
            textAreaLabel={t('description')}
            textAreaName="projects.0.description"
            textAreaPlaceholder={t('description-placeholder')}
            onChange={onUpdate}
          />

          {/* Certificates Section */}
          <SingleFieldSection
            title={t('certificates')}
            fieldName="certificates"
            placeholder="ex: AWS Certified, Google Cloud Training..."
            onChange={onUpdate}
          />

          {/* Volunteering Section */}
          <PairWithTextAreaSection
            title={t('volunteering')}
            field1={{
              label: t('volunteering-role'),
              name: 'volunteering.0.role',
              placeholder: 'ex: ASII - Project Management',
            }}
            field2={{ label: t('date'), name: 'volunteering.0.date', placeholder: 'ex: 2020 - 2021' }}
            textAreaLabel={t('description')}
            textAreaName="volunteering.0.description"
            textAreaPlaceholder={t('description-placeholder')}
            onChange={onUpdate}
          />

          {/* Languages Section */}
          <SingleFieldSection
            title={t('languages')}
            fieldName="languages"
            placeholder="ex: English - C1, French - B2"
            onChange={onUpdate}
          />

          {/* Interests Section */}
          <SingleFieldSection
            title={t('interests')}
            fieldName="interests"
            placeholder="ex: Reading, Traveling, Photography"
            onChange={onUpdate}
          />

          <CVBuilderBtns cvData={cvData} initialValues={initialValues} />
        </form>
      </div>
    </div>
  );
}

export default memo(CVBuilderMainContainer);
