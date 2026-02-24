import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import CVStyle from '../../components/CVBuilderVIew/CVStyle';

export default function CVBuilderView({ data }) {
  console.log(data);

  return (
    <Document>
      <Page size="A4" style={CVStyle.page}>
        {/* Header */}
        <View style={CVStyle.header}>
          <Text style={CVStyle.name}>{data.personal?.name}</Text>
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
        {data.experience && data.experience.length > 0 && (
          <>
            <Text style={CVStyle.sectionTitle}>Professional Experience</Text>
            {data.experience.map((exp, i) => (
              <View key={i} style={CVStyle.itemHeader}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={CVStyle.bold}>
                    {exp.role} - {exp.company}
                  </Text>
                  <Text>{exp.date}</Text>
                </View>
                {exp.location && <Text style={{ fontSize: 9 }}>{exp.location}</Text>}
                {exp.description && <Text style={{ marginTop: 3 }}>{exp.description}</Text>}
              </View>
            ))}
          </>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <>
            <Text style={CVStyle.sectionTitle}>Education</Text>
            {data.education.map((edu, i) => (
              <View key={i} style={CVStyle.itemHeader}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={CVStyle.bold}>
                    {edu.degree} - {edu.university}
                  </Text>
                  <Text>{edu.date}</Text>
                </View>
                {edu.location && <Text style={{ fontSize: 9 }}>{edu.location}</Text>}
                {edu.description && <Text style={{ marginTop: 3 }}>{edu.description}</Text>}
              </View>
            ))}
          </>
        )}

        {/* Skills */}
        {data.skills && (data.skills.hard || data.skills.soft) && (
          <>
            <Text style={CVStyle.sectionTitle}>Skills</Text>
            {data.skills.hard && (
              <Text style={{ marginTop: 5 }}>
                <Text style={CVStyle.bold}>Hard Skills: </Text>
                {data.skills.hard}
              </Text>
            )}
            {data.skills.soft && (
              <Text>
                <Text style={CVStyle.bold}>Soft Skills: </Text>
                {data.skills.soft}
              </Text>
            )}
          </>
        )}

        {/* Projects */}
        {data.projects && data.projects.length > 0 && (
          <>
            <Text style={CVStyle.sectionTitle}>Projects</Text>
            {data.projects.map((proj, i) => (
              <View key={i} style={{ marginTop: 5 }}>
                <Text style={CVStyle.bold}>
                  {proj.title}
                </Text>
                {proj.stack && (
                  <Text style={{ fontSize: 9 }}>
                    <Text style={CVStyle.bold}>Stack: </Text>
                    {proj.stack}
                  </Text>
                )}
                {proj.description && <Text style={{ marginTop: 3 }}>{proj.description}</Text>}
              </View>
            ))}
          </>
        )}

        {/* Certificates */}
        {data.certificates && (
          <>
            <Text style={CVStyle.sectionTitle}>Certificates & Training</Text>
            <Text style={{ marginTop: 5 }}>{data.certificates}</Text>
          </>
        )}

        {/* Volunteering */}
        {data.volunteering && data.volunteering.length > 0 && (
          <>
            <Text style={CVStyle.sectionTitle}>Volunteering & Training</Text>
            {data.volunteering.map((vol, i) => (
              <View key={i} style={CVStyle.itemHeader}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={CVStyle.bold}>{vol.role}</Text>
                  <Text>{vol.date}</Text>
                </View>
                {vol.description && <Text style={{ marginTop: 3 }}>{vol.description}</Text>}
              </View>
            ))}
          </>
        )}

        {/* Languages */}
        {data.languages && (
          <>
            <Text style={CVStyle.sectionTitle}>Languages</Text>
            <Text style={{ marginTop: 5 }}>{data.languages}</Text>
          </>
        )}

        {/* Interests */}
        {data.interests && (
          <>
            <Text style={CVStyle.sectionTitle}>Interests</Text>
            <Text style={{ marginTop: 5 }}>{data.interests}</Text>
          </>
        )}
      </Page>
    </Document>
  );
}
