import './CVBuilderMainContainer.css';
import { memo } from 'react';
import CVBuilderBtns from './CVBuilderBtns';

import Section from './Section';
import InputPair from './InputPair';
import TextAreaField from './TextAreaField';
import DynamicMultiFieldSection from './DynamicMultiFieldSection';
import SingleFieldSection from './SingleFieldSection';

import { useTranslation } from 'react-i18next';

function CVBuilderMainContainer({ onUpdate, cvData, onPreviewPDF, cvId }) {
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
          <DynamicMultiFieldSection
            title={t('work-experience')}
            arrayPath="experience"
            cvData={cvData}
            fields={[
              [
                {
                  label: t('role'),
                  name: 'role',
                  placeholder: 'ex: Full Stack - Intern',
                },
                {
                  label: t('company'),
                  name: 'company',
                  placeholder: 'ex: Cognizant',
                },
              ],
              [
                {
                  label: t('date'),
                  name: 'date',
                  placeholder: 'ex: 2020 - 2021',
                },
                {
                  label: t('location'),
                  name: 'location',
                  placeholder: t('location-placeholder'),
                },
              ],
            ]}
            textAreaTemplate={{
              label: t('description'),
              name: 'description',
              placeholder: t('description-placeholder'),
            }}
            onChange={onUpdate}
            template={{
              role: '',
              company: '',
              date: '',
              location: '',
              description: '',
            }}
          />

          {/* Education Section */}
          <DynamicMultiFieldSection
            title={t('education')}
            arrayPath="education"
            cvData={cvData}
            fields={[
              [
                {
                  label: t('university'),
                  name: 'university',
                  placeholder: 'ex: UAIC Iasi',
                },
                {
                  label: t('degree'),
                  name: 'degree',
                  placeholder: "ex: Master's Degree",
                },
              ],
              [
                {
                  label: t('location'),
                  name: 'location',
                  placeholder: t('location-placeholder'),
                },
                {
                  label: t('date'),
                  name: 'date',
                  placeholder: 'ex: 2020 - 2021',
                },
              ],
            ]}
            textAreaTemplate={{
              label: t('description'),
              name: 'description',
              placeholder: t('description-placeholder'),
            }}
            onChange={onUpdate}
            template={{
              university: '',
              degree: '',
              location: '',
              date: '',
              description: '',
            }}
          />

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
          <DynamicMultiFieldSection
            title={t('personal-projects')}
            arrayPath="projects"
            cvData={cvData}
            fields={[
              [
                {
                  label: t('project-title'),
                  name: 'title',
                  placeholder: 'ex: KeyStroke',
                },
                {
                  label: t('stack'),
                  name: 'stack',
                  placeholder: 'ex: MongoDB, Express...',
                },
              ],
            ]}
            textAreaTemplate={{
              label: t('description'),
              name: 'description',
              placeholder: 'Describe your project and its features...',
            }}
            onChange={onUpdate}
            template={{
              title: '',
              stack: '',
              description: '',
            }}
          />

          {/* Certificates Section */}
          <SingleFieldSection
            title={t('certificates')}
            fieldName="certificates"
            placeholder="ex: AWS Certified, Google Cloud Training..."
            onChange={onUpdate}
          />

          {/* Volunteering Section */}
          <DynamicMultiFieldSection
            title={t('volunteering')}
            arrayPath="volunteering"
            cvData={cvData}
            fields={[
              [
                {
                  label: t('volunteering-role'),
                  name: 'role',
                  placeholder: 'ex: ASII - Project Management',
                },
                {
                  label: t('date'),
                  name: 'date',
                  placeholder: 'ex: 2020 - 2021',
                },
              ],
            ]}
            textAreaTemplate={{
              label: t('description'),
              name: 'description',
              placeholder: 'Describe your volunteering experience...',
            }}
            onChange={onUpdate}
            template={{
              role: '',
              date: '',
              description: '',
            }}
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

          <CVBuilderBtns cvData={cvData} onPreviewPDF={onPreviewPDF} cvId={cvId} />
        </form>
      </div>
    </div>
  );
}

export default memo(CVBuilderMainContainer);
