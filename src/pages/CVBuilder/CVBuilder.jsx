import { useState } from 'react';
import './CVBuilder.css';
import CVBuilderMainContainer from '../../components/CVBuilderMainContainer/CVBuilderMainContainer';
import CVBuilderView from '../../components/CVBuilderVIew/CVBuilderVIew';
import { PDFViewer } from '@react-pdf/renderer';

export default function CVBuilder() {
  const [cvData, setCvData] = useState({
    personal: {
      name: 'Your Name',
      phone: '+1 (555) 000-0000',
      email: 'your.email@example.com',
      location: 'City, Country',
      github: 'your-github-username',
      linkedin: 'your-linkedin-profile',
    },
    experience: [
      {
        role: 'Job Title',
        company: 'Company Name',
        date: 'Month Year - Present',
        location: 'City, Country',
        description: 'Describe your responsibilities and achievements...',
      },
    ],
    education: [
      {
        university: 'University Name',
        degree: "Bachelor's Degree",
        location: 'City, Country',
        date: 'Year - Year',
        description: 'Describe your studies and achievements...',
      },
    ],
    skills: {
      hard: 'Add your hard skills here (e.g., AWS, Python, React)',
      soft: 'Add your soft skills here (e.g., Leadership, Communication)',
    },
    projects: [
      {
        title: 'Project Title',
        stack: 'Tech stack used',
        description: 'Describe your project and its features...',
      },
    ],
    certificates: 'List your certificates and trainings...',
    volunteering: [
      {
        role: 'Organization & Role',
        date: 'Year - Year',
        description: 'Describe your volunteering experience...',
      },
    ],
    languages: 'Language: Proficiency Level',
    interests: 'Your interests and hobbies...',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes('.')) {
      const parts = name.split('.');
      setCvData((prev) => {
        const newData = { ...prev };

        if (parts.length === 3) {
          const [section, index, field] = parts;
          newData[section] = [...prev[section]];
          newData[section][index] = { ...newData[section][index], [field]: value };
        } else if (parts.length === 2) {
          const [section, field] = parts;
          newData[section] = { ...prev[section], [field]: value };
        }

        return newData;
      });
    } else {
      setCvData((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="CVB">
      <div className="editor-side">
        <CVBuilderMainContainer cvData={cvData} onUpdate={handleChange} />
      </div>

      <div className="viewer-side">
        <PDFViewer width="100%" height="100%" showToolbar={false} className="pdf-viewer-frame">
          <CVBuilderView data={cvData} />
        </PDFViewer>
      </div>
    </div>
  );
}
