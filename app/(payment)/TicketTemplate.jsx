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
}
