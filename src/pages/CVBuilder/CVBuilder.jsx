import { useState, useCallback, useEffect } from 'react';
import './CVBuilder.css';
import CVBuilderMainContainer from '../../components/CVBuilderMainContainer/CVBuilderMainContainer';
import CVBuilderView from '../../components/CVBuilderVIew/CVBuilderVIew';
import { PDFViewer } from '@react-pdf/renderer';
import ButtonUp from '../../components/ButtonUp/ButtonUp';

import { useSelector, useDispatch } from 'react-redux';
import { updateField } from '../../store/cvSlice';

export default function CVBuilder() {
  const cvData = useSelector((state) => state.cv);
  const dispatch = useDispatch();

  const [debouncedCvData, setDebouncedCvData] = useState(cvData);

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

  return (
    <div className="CVB">
      <div className="editor-side">
        <CVBuilderMainContainer onUpdate={handleChange} cvData={cvData} />
      </div>

      <div className="viewer-side">
        <PDFViewer width="100%" height="100%" showToolbar={false} className="pdf-viewer-frame">
          <CVBuilderView data={debouncedCvData} />
        </PDFViewer>
      </div>

      <ButtonUp />
    </div>
  );
}
