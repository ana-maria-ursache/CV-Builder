import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { memo } from 'react';
import styles from './CVStyle';

function CVBuilderView({ data }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{data.personal?.name}</Text>
          <Text>
            {data.personal?.location} | {data.personal?.email} | {data.personal?.phone}
          </Text>
          {(data.personal?.linkedin || data.personal?.github) && (
            <Text style={{ marginTop: 5 }}>
              {data.personal?.linkedin && `LinkedIn: ${data.personal.linkedin}`}
              {data.personal?.linkedin && data.personal?.github && ' | '}
              {data.personal?.github && `GitHub: ${data.personal.github}`}
            </Text>
          )}
        </View>

        {/* Experience */}
        {data.experience?.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Professional Experience</Text>
            {data.experience.map((exp, i) => (
              <View key={i} style={styles.itemContainer}>
                <View style={styles.itemHeader}>
                  <Text style={styles.bold}>
                    {exp.role} - {exp.company}
                  </Text>
                  <Text>{exp.date}</Text>
                </View>
                {exp.location && <Text style={styles.location}>{exp.location}</Text>}
                {exp.description && <Text style={styles.description}>{exp.description}</Text>}
              </View>
            ))}
          </>
        )}

        {/* Education */}
        {data.education?.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Education</Text>
            {data.education.map((edu, i) => (
              <View key={i} style={styles.itemContainer}>
                <View style={styles.itemHeader}>
                  <Text style={styles.bold}>
                    {edu.degree} - {edu.university}
                  </Text>
                  <Text>{edu.date}</Text>
                </View>
                {edu.location && <Text style={styles.location}>{edu.location}</Text>}
                {edu.description && <Text style={styles.description}>{edu.description}</Text>}
              </View>
            ))}
          </>
        )}

        {/* Skills */}
        {data.skills && (data.skills.hard || data.skills.soft) && (
          <>
            <Text style={styles.sectionTitle}>Skills</Text>
            {data.skills.hard && (
              <Text style={{ marginTop: 5 }}>
                <Text style={styles.bold}>Hard Skills: </Text>
                {data.skills.hard}
              </Text>
            )}
            {data.skills.soft && (
              <Text>
                <Text style={styles.bold}>Soft Skills: </Text>
                {data.skills.soft}
              </Text>
            )}
          </>
        )}

        {/* Projects */}
        {data.projects?.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Projects</Text>
            {data.projects.map((proj, i) => (
              <View key={i} style={styles.itemContainer}>
                <Text style={styles.bold}>{proj.title}</Text>
                {proj.stack && (
                  <Text style={{ fontSize: 9 }}>
                    <Text style={styles.bold}>Stack: </Text>
                    {proj.stack}
                  </Text>
                )}
                {proj.description && <Text style={styles.description}>{proj.description}</Text>}
              </View>
            ))}
          </>
        )}

        {/* Volunteering */}
        {data.volunteering?.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Volunteering & Training</Text>
            {data.volunteering.map((vol, i) => (
              <View key={i} style={styles.itemContainer}>
                <View style={styles.itemHeader}>
                  <Text style={styles.bold}>{vol.role}</Text>
                  <Text>{vol.date}</Text>
                </View>
                {vol.description && <Text style={styles.description}>{vol.description}</Text>}
              </View>
            ))}
          </>
        )}

        {/* Languages & Interests */}
        {data.languages && (
          <>
            <Text style={styles.sectionTitle}>Languages</Text>
            <Text style={{ marginTop: 5 }}>{data.languages}</Text>
          </>
        )}
        {/* Interests */}
        {data.interests && (
          <>
            <Text style={styles.sectionTitle}>Interests</Text>
            <Text style={{ marginTop: 5 }}>{data.interests}</Text>
          </>
        )}
      </Page>
    </Document>
  );
}

export default memo(CVBuilderView);
