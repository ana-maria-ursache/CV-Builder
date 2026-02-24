import { useState, useCallback, useEffect } from 'react';
import './CVBuilder.css';
import CVBuilderMainContainer from '../../components/CVBuilderMainContainer/CVBuilderMainContainer';
import CVBuilderView from '../../components/CVBuilderVIew/CVBuilderVIew';
import CVBuilderBtns from '../../components/CVBuilderMainContainer/CVBuilderBtns';
import { PDFViewer } from '@react-pdf/renderer';
import initialValuesCV from '../../helper/initialValuesCV';
import { ArrowUp } from 'lucide-react';

export default function CVBuilder() {
  const [cvData, setCvData] = useState(() => {
    // Load from localStorage or use initial values
    try {
      const savedData = localStorage.getItem('cvData');
      return savedData ? JSON.parse(savedData) : initialValuesCV;
    } catch {
      return initialValuesCV;
    }
  });

  const [debouncedCvData, setDebouncedCvData] = useState(cvData);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedCvData(cvData);
    }, 3000);

    return () => clearTimeout(timer);
  }, [cvData]);

  const topFunction = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  };

  const handleChange = useCallback((e) => {
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
  }, []);

  return (
    <div className="CVB">
      <div className="editor-side">
        <CVBuilderMainContainer
          onUpdate={handleChange}
          cvData={cvData}
          setCvData={setCvData}
          initialValues={initialValuesCV}
        />
      </div>

      <div className="viewer-side">
        <PDFViewer width="100%" height="100%" showToolbar={false} className="pdf-viewer-frame">
          <CVBuilderView data={debouncedCvData} />
        </PDFViewer>
      </div>

      <button className="back-to-top" onClick={topFunction} aria-label="Back to top">
        <ArrowUp className="icon-style" size={24} />
      </button>
    </div>
  );
}
