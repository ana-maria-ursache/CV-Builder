import { useState, useCallback, useEffect, useRef } from 'react';
import './CVBuilder.css';
import CVBuilderMainContainer from '../../components/CVBuilderMainContainer/CVBuilderMainContainer';
import CVBuilderView from '../../components/CVBuilderVIew/CVBuilderVIew';
import { PDFViewer, pdf } from '@react-pdf/renderer';
import ButtonUp from '../../components/ButtonUp/ButtonUp';
import { useParams } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { updateField } from '../../store/cvSlice';

export default function CVBuilder() {
  const { id: cvId } = useParams();
  const cvData = useSelector((state) => state.cv);
  const dispatch = useDispatch();

  const [debouncedCvData, setDebouncedCvData] = useState(cvData);
  const pdfRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedCvData(cvData);
    }, 3000);

    return () => clearTimeout(timer);
  }, [cvData]);

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      dispatch(updateField({ path: name, value }));
    },
    [dispatch]
  );

  const handlePreviewPDF = async () => {
    try {
      const doc = <CVBuilderView data={debouncedCvData} />;
      const asPdf = pdf(doc);
      const blob = await asPdf.toBlob();
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div className="CVB">
      <div className="editor-side">
        <CVBuilderMainContainer
          onUpdate={handleChange}
          cvData={cvData}
          onPreviewPDF={handlePreviewPDF}
          cvId={cvId}
        />
      </div>

      <div className="viewer-side">
        <PDFViewer
          ref={pdfRef}
          width="100%"
          height="100%"
          showToolbar={false}
          className="pdf-viewer-frame"
        >
          <CVBuilderView data={debouncedCvData} />
        </PDFViewer>
      </div>

      <ButtonUp />
    </div>
  );
}
