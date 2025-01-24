import React from "react";
import {
  Document,
  Page,
  StyleSheet,
  View,
  Image,
  Text,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    position: "relative",
    width: 600, // Custom width for a digital ticket
    height: 300, // Custom height for the ticket
  },
  background: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
  },
  shortSection: {
    position: "absolute",
    top: 0,
    right: 0,
    width: "30%", // Covers the shorter vertical section
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Semi-transparent overlay for readability
    padding: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  userText: {
    color: "#fff",
    fontSize: 12,
    marginBottom: 5,
  },
  qrWrapper: {
    marginTop: 10,
    width: 80,
    height: 80,
  },
  qrImage: {
    width: "100%",
    height: "100%",
  },
});

export default function TicketTemplate({ name, phone, qrCode }) {
  return (
    <Document>
      <Page size={[styles.page.width, styles.page.height]} style={styles.page}>
        {/* Full Background Image */}
        <Image src="/ticket.png" style={styles.background} />

        {/* Short Section for User Details */}
        <View style={styles.shortSection}>
          <Text style={styles.userText}>Name: {name}</Text>
          <Text style={styles.userText}>Phone: {phone}</Text>
          {qrCode && (
            <View style={styles.qrWrapper}>
              <Image src={qrCode} style={styles.qrImage} />
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
} /*}

/*
import React from "react";
import {
  Document,
  Page,
  StyleSheet,
  View,
  Image,
  Text,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    width: 600, // Custom width for the ticket
    height: 300, // Custom height for the ticket
    padding: 20,
    backgroundColor: "#f5f5f5", // Light background
    fontFamily: "Helvetica",
  },
  header: {
    textAlign: "center",
    marginBottom: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  theme: {
    textAlign: "center",
    fontSize: 14,
    fontStyle: "italic",
    color: "#555",
    marginBottom: 15,
  },
  body: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    border: "1px solid #ddd",
    padding: 20,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  leftSection: {
    width: "70%",
    paddingRight: 15,
  },
  rightSection: {
    width: "30%",
    alignItems: "center",
    borderLeft: "1px solid #ddd",
    paddingLeft: 10,
  },
  bodyText: {
    marginBottom: 8,
    fontSize: 12,
    color: "#333",
  },
  qrCode: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
});

export default function TicketTemplate({ name, qrCode }) {
  return (
    <Document>
      <Page size={[styles.page.width, styles.page.height]} style={styles.page}>
        {/* Header */ /*}
        <View style={styles.header}>
          <Text style={styles.headerText}>GoMAD 10</Text>
          <Text style={styles.theme}>
            From Vision to Impact: Entrepreneurs as Nation Builders
          </Text>
        </View>

        {/* Ticket Body */ /*}
        <View style={styles.body}>
          {/* Left Section */ /*}
          <View style={styles.leftSection}>
            <Text style={styles.bodyText}>Dear {name},</Text>
            <Text style={styles.bodyText}>
              Your ticket for this event is secured.
            </Text>
            <Text style={styles.bodyText}>Date: 22 February, 2025</Text>
            <Text style={styles.bodyText}>Time: 8:00 AM - 6:00 PM</Text>
            <Text style={styles.bodyText}>
              Venue: Collège Saint-Michel, Carrefour Terminus, Douala
            </Text>
            <Text style={styles.bodyText}>
              Contacts: +237 679 112 339 | +237 656 056 874
            </Text>
            <Text style={styles.bodyText}>
              Visit www.gomadnetwork.com for further information.
            </Text>
          </View>

          {/* Right Section */ /*}
          <View style={styles.rightSection}>
            <Text style={styles.bodyText}>Scan the QR code below:</Text>
            <Image src={qrCode} style={styles.qrCode} />
          </View>
        </View>
      </Page>
    </Document>
  );
}
*/
