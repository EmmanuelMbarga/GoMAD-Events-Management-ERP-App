"use client";
import withAuth from "../utils/withAuth";
import { useState, useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { FaCheck, FaTimes } from "react-icons/fa";
import { LogOut } from "lucide-react"; // Add this import
import Link from "next/link";

const SuccessComponent = ({ closeModal }) => {
  return (
    <div className="flex flex-col items-center justify-center w-[90%] max-w-[400px] p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-center mb-4">
        <div className="w-[80px] h-[80px] bg-green-500 rounded-full flex items-center justify-center">
          <FaCheck className="text-white" size={40} />
        </div>
      </div>
      <h2 className="text-2xl font-bold text-green-600">Success</h2>
      <p className="text-sm text-gray-600">Successfully checked in.</p>
      <button
        onClick={closeModal}
        className="mt-4 px-4 py-2 text-white bg-purple-600 rounded-lg"
      >
        Done
      </button>
    </div>
  );
};

const ErrorComponent = ({ retry, closeModal }) => {
  return (
    <div className="flex flex-col items-center justify-center w-[90%] max-w-[400px] p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-center mb-4">
        <div className="w-[80px] h-[80px] bg-red-500 rounded-full flex items-center justify-center">
          <FaTimes className="text-white" size={40} />
        </div>
      </div>
      <h2 className="text-2xl font-bold text-red-600">Error</h2>
      <p className="text-sm text-gray-600">
        Wrong details or QR Code is invalid.
      </p>
      <div className="flex gap-4 mt-4">
        <button
          onClick={closeModal}
          className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg"
        >
          Cancel
        </button>
        <button
          onClick={retry}
          className="px-4 py-2 text-white bg-red-500 rounded-lg"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

const QRResult = ({ result, retry, closeModal }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      {result.valid ? (
        <SuccessComponent result={result} closeModal={closeModal} />
      ) : (
        <ErrorComponent retry={retry} closeModal={closeModal} />
      )}
    </div>
  );
};

function Scanner() {
  const [qrCode, setQrCode] = useState("");
  const [result, setResult] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const validateQRCode = async () => {
    if (!qrCode) {
      setResult({ valid: false, message: "QR Code is empty" });
      return;
    }

    try {
      const response = await fetch("/api/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ qrCode }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data);
      } else {
        setResult({ valid: false, message: data.error });
      }
      setShowModal(true);
    } catch (error) {
      setResult({ valid: false, message: "Invalid QR Code" });
      setShowModal(true);
    }
  };

  useEffect(() => {
    const qrCodeScanner = new Html5QrcodeScanner(
      "qr-reader",
      { fps: 10, qrbox: 250 },
      false
    );

    qrCodeScanner.render(
      (decodedText) => {
        setQrCode(decodedText);
      },
      (errorMessage) => {
        console.log("QR Code scan error:", errorMessage);
      }
    );

    return () => {
      qrCodeScanner.clear();
    };
  }, []);

  const closeModal = () => setShowModal(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <Link href={`/login`}>
        <div className="absolute flex rounded-full border-2 border-blue-500 top-4 right-4">
          <LogOut className="w-10 h-10 p-2 text-blue-500" />{" "}
        </div>
      </Link>

      <div className="text-center">
        <h1 className="text-lg font-medium text-gray-700">Welcome to</h1>
        <img src="/logo.png" alt="Logo" className="border-blue-500" />
        <h2 className="text-xl font-bold text-gray-800">Check-in</h2>
      </div>

      <div id="qr-reader" className="mt-8 flex flex-col"></div>

      <div className="mt-10">
        <button
          onClick={validateQRCode}
          className="bg-[#00AAE8] text-white font-bold py-2 px-6 rounded-lg shadow-lg hover:bg-white hover:text-[#1AC2EA] hover:border-[#1AC2EA] hover:border"
        >
          Start Verification
        </button>
      </div>

      {showModal && (
        <QRResult
          result={result}
          retry={validateQRCode}
          closeModal={closeModal}
        />
      )}
    </div>
  );
}

export default withAuth(Scanner);
