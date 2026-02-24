import { StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { 
    padding: 40, 
    fontFamily: 'Helvetica', 
    fontSize: 10,
    lineHeight: 1.5 
  },
  header: { 
    borderBottom: 1, 
    borderColor: '#000', 
    paddingBottom: 10, 
    marginBottom: 10 
  },
  name: { 
    fontSize: 20, 
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 10, 
  },
  contactInfo: {
    fontSize: 9,
    marginTop: 4,
    color: '#333'
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginTop: 15,
    borderBottom: 0.5,
    borderColor: '#aaaaaa',
    paddingBottom: 2,
    color: '#000'
  },
  itemHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginTop: 7,
    fontWeight: 'bold'
  },
  itemSubHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 9,
    fontStyle: 'italic',
    color: '#444'
  },
  description: {
    marginTop: 3,
    fontSize: 9,
    textAlign: 'justify'
  },
  bold: { 
    fontWeight: 'bold' 
  },
  skillLabel: {
    fontWeight: 'bold',
    width: 100
  }
});

export default styles;