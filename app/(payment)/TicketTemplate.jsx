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
    width: 350,
    height: 200,
    flexDirection: "column", // Changed to column for vertical layout
    paddingTop: 60, // Adjusted to start below the horizontal line on ticket.png
    paddingHorizontal: 20, // Centralized padding
    backgroundColor: "#fff",
  },
  background: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
  },
  leftSide: {
    width: "75%",
    padding: 10,
    justifyContent: "center",
  },
  rightSide: {
    width: "25%",
    height: "60%",
    rounded: 10,
    opacity: 0.5,
    backgroundColor: "#00ADEF", // use your logo color
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    width: 50,
    height: 50,
    marginBottom: 10,
    // Added padding to prevent logo color from reaching the border
    padding: 5,
  },
  title: { fontSize: 14, fontWeight: "bold", marginLeft: 10 },
  body: { marginTop: 10 },
  textRow: { marginBottom: 4, fontSize: 10 },
  qrWrapper: {
    alignSelf: "flex-end",
    width: 60,
    height: 60,
    marginTop: 10,
  },
  qrImage: { width: "100%", height: "100%" },
  contentBox: {
    backgroundColor: "rgba(0, 0, 0, 0.05)", // Light background for centralization
    padding: 20, // Increased padding for better centralization
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
});

export default function TicketTemplate({ name, phone, qrCode }) {
  return (
    <Document>
      <Page size={[styles.page.width, styles.page.height]} style={styles.page}>
        <Image src="/ticket.png" style={styles.background} />
        <View style={styles.contentBox}>
          <Image src="/logo.png" style={styles.logo} />
          <Text style={styles.textRow}>Name: {name}</Text>
          <Text style={styles.textRow}>Phone: {phone}</Text>
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
