import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  background: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  content: {
    position: "absolute",
    top: "30%",
    left: "10%",
    right: "10%",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: "#1E40AF",
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
    color: "#374151",
  },
  qrCode: {
    width: 100,
    height: 100,
    marginTop: 20,
  },
});

const TicketTemplate = ({ name, phone, qrCode }) => (
  <Document>
    <Page size="A6" style={styles.page}>
      <Image src="/ticket.png" style={styles.background} />
      <View style={styles.content}>
        <Text style={styles.title}>GoMAD Event Ticket</Text>
        <Text style={styles.info}>Name: {name}</Text>
        <Text style={styles.info}>Phone: {phone}</Text>
        <Image src={qrCode} style={styles.qrCode} />
      </View>
    </Page>
  </Document>
);

export default TicketTemplate;
