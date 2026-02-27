import { useState, useCallback, useEffect, useRef } from 'react';
import './CVBuilder.css';
import CVBuilderMainContainer from '../../components/CVBuilderMainContainer/CVBuilderMainContainer';
import CVBuilderView from '../../components/CVBuilderVIew/CVBuilderVIew';
import { PDFViewer, pdf } from '@react-pdf/renderer';
import ButtonUp from '../../components/ButtonUp/ButtonUp';
import { useParams } from 'react-router-dom';
import supabase from '../../utils/supabaseClient';

import { useSelector, useDispatch } from 'react-redux';
import { updateField, loadCV } from '../../store/cvSlice';

export default function CVBuilder() {
  const { id: cvId } = useParams();
  const cvData = useSelector((state) => state.cv);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const [debouncedCvData, setDebouncedCvData] = useState(cvData);
  const pdfRef = useRef();

  // Load CV data from localStorage or database
  useEffect(() => {
    const loadCVData = async () => {
      setLoading(true);
      try {
        if (cvId) {
          // First try localStorage
          const allCVs = JSON.parse(localStorage.getItem('allCVs') || '{}');
          if (allCVs[cvId]) {
            dispatch(loadCV(allCVs[cvId]));
            setLoading(false);
            return;
          }

          // If not in localStorage, fetch from database
          const { data, error } = await supabase
            .from('cv_versions')
            .select('cv_content')
            .eq('id', cvId)
            .single();

          if (error) throw error;
          if (data) {
            dispatch(loadCV(data.cv_content));
            // Cache it in localStorage
            const allCVs = JSON.parse(localStorage.getItem('allCVs') || '{}');
            allCVs[cvId] = data.cv_content;
            localStorage.setItem('allCVs', JSON.stringify(allCVs));
          }
        }
      } catch (error) {
        console.error('Error loading CV:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCVData();
  }, [cvId, dispatch]);

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

  if (loading) {
    return (
      <div
        className="CVB"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        Loading...
      </div>
    );
  }

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
