"use client";

import { useState } from "react";
import Image from "next/image";
import { Dialog } from "@headlessui/react";
import { motion } from "framer-motion";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import QRCode from "qrcode";
import TicketTemplate from "./TicketTemplate";
import { useRouter } from "next/navigation";

export default function PaymentPage() {
  const [form, setForm] = useState({ name: "", phone: "", method: "" });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1);
  const [dialogData, setDialogData] = useState({
    success: false,
    message: "",
    ticketUrl: "",
  });
  const [ticketData, setTicketData] = useState(null);
  const router = useRouter();

  const validateFormStep = (currentStep) => {
    const newErrors = {};

    if (currentStep === 1) {
      if (!form.name.trim()) newErrors.name = "Name is required";
      if (!form.phone.trim()) newErrors.phone = "Phone number is required";
      if (!/^\d{9}$/.test(form.phone.trim()))
        newErrors.phone = "Invalid phone number format, e.g. 677123456";
    }

    if (currentStep === 2) {
      if (!form.method) newErrors.method = "Please select a payment method";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateFormStep(step)) {
      setStep(2);
    }
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear error when user types
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const generateQRCode = async (data) => {
    try {
      const qrCodeDataURL = await QRCode.toDataURL(JSON.stringify(data));
      return qrCodeDataURL;
    } catch (err) {
      console.error("QR Code generation error:", err);
      return null;
    }
  };

  const handlePayment = async () => {
    if (!validateFormStep(2)) return;

    setIsLoading(true);
    try {
      const response = await fetch(
        "https://gomad-backend.onrender.com/api/register-and-pay",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.name,
            tel: form.phone,
            type: form.method,
            amount: 100,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        const qrCode = await generateQRCode({
          name: form.name,
          phone: form.phone,
          paymentId: data.paymentId,
        });

        setTicketData({
          name: form.name,
          phone: form.phone,
          qrCode,
        });

        setDialogData({
          success: true,
          message: "Payment successful! Download your ticket.",
        });
      } else {
        setDialogData({
          success: false,
          message: `Payment failed: ${data.message}`,
        });
      }

      setIsDialogOpen(true);
    } catch (error) {
      setDialogData({
        success: false,
        message: "An unexpected error occurred.",
      });
      setIsDialogOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const TicketDownloadButton = () => (
    <PDFDownloadLink
      document={<TicketTemplate {...ticketData} />}
      fileName="gomad-event-ticket.pdf"
      className="w-full bg-[#00AAE8] text-white text-center px-4 py-2 rounded-lg hover:bg-[#00BFFF] transition-colors duration-200"
    >
      {({ loading }) => (loading ? "Generating ticket..." : "Download Ticket")}
    </PDFDownloadLink>
  );

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-4 md:p-8">
      {/* Progress Steps */}
      <div className="w-full max-w-md mb-8">
        <div className="flex justify-between items-center">
          {[1, 2].map((stepNumber) => (
            <div key={stepNumber} className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= stepNumber
                    ? "bg-[#00AAE8] text-white"
                    : "border-[#0033CC] border text-[#0033CC]"
                }`}
              >
                {stepNumber}
              </div>
              <span className="text-sm mt-2 text-[#YourTextColor]">
                {stepNumber === 1 ? "Details" : "Payment"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <Image
          src="/logo.png"
          alt="Company Logo"
          width={120}
          height={120}
          className="mx-auto drop-shadow-md"
        />
        <h1 className="text-3xl font-bold mt-4 text-[#0033CC]">
          GoMAD Event Payment
        </h1>
        <div className="mt-2 bg-[#00BFFF] text-white px-4 py-2 rounded-full inline-block">
          Amount: 10,000 FCFA
        </div>
      </motion.header>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 bg-white shadow-lg rounded-xl p-8 w-full max-w-md border border-[#YourBorderColor]"
      >
        {step === 1 ? (
          <>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#0033CC] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition`}
                  placeholder="John Doe"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0033CC] mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition`}
                  placeholder="e.g. 677123456"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                )}
              </div>

              <button
                onClick={handleNextStep}
                className="w-full bg-[#00AAE8] text-white font-semibold rounded-lg py-3 px-4 hover:bg-white hover:text-[#1AC2EA] transition-colors duration-200 flex items-center justify-center"
              >
                Continue to Payment
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="space-y-6">
              <fieldset>
                <legend className="text-lg font-medium text-gray-900 mb-4">
                  Select Payment Method
                </legend>
                <div className="grid grid-cols-2 gap-4">
                  {["momo", "om"].map((method) => (
                    <label
                      key={method}
                      className={`relative flex flex-col items-center p-4 border rounded-lg cursor-pointer hover:border-[#1AC2EA] transition-all ${
                        form.method === method
                          ? "border-[#1AC2EA] bg-blue-100"
                          : "border-gray-200"
                      }`}
                    >
                      <Image
                        src={`/${method === "momo" ? "mtn" : "om"}.png`}
                        alt={
                          method === "momo" ? "Mobile Money" : "Orange Money"
                        }
                        width={48}
                        height={48}
                        className="mb-2"
                      />
                      <input
                        type="radio"
                        name="method"
                        value={method}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <span className="text-sm font-medium">
                        {method === "momo" ? "Mobile Money" : "Orange Money"}
                      </span>
                    </label>
                  ))}
                </div>
                {errors.method && (
                  <p className="mt-2 text-sm text-red-500">{errors.method}</p>
                )}
              </fieldset>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 bg-white border border-[#00AAE8] text-[#1AC2EA] font-medium rounded-lg py-3 px-4 hover:bg-[#00AAE8] hover:text-white transition-colors duration-200"
                >
                  Back
                </button>
                <button
                  onClick={handlePayment}
                  disabled={isLoading}
                  className="flex-1 bg-[#00AAE8] text-white font-semibold rounded-lg py-3 px-4 hover:bg-[#1AC2EA] transition-colors duration-200 flex items-center justify-center disabled:bg-[#00EA7]"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  ) : null}
                  {isLoading ? "Processing..." : "Pay Now"}
                </button>
              </div>
            </div>
          </>
        )}
      </motion.div>

      {/* Footer */}
      <footer className="w-full max-w-md mt-auto">
        <button
          onClick={() => router.push("/login")}
          className="w-full bg-gray-200 text-black px-4 py-2 rounded-md hover:bg-gray-300 transition-colors duration-200"
        >
          Admin Login
        </button>
      </footer>

      {/* Enhanced Dialog */}
      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        className="relative z-50"
      >
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm"
          aria-hidden="true"
        />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <div className="flex items-center justify-center mb-4">
                {dialogData.success ? (
                  <CheckCircle className="w-12 h-12 text-green-500" />
                ) : (
                  <AlertCircle className="w-12 h-12 text-red-500" />
                )}
              </div>
              <Dialog.Title
                className={`text-lg font-semibold text-center ${
                  dialogData.success ? "text-green-600" : "text-red-600"
                }`}
              >
                {dialogData.success ? "Payment Successful!" : "Payment Failed"}
              </Dialog.Title>
              <Dialog.Description className="mt-4 text-gray-700 text-center">
                {dialogData.message}
              </Dialog.Description>
              <div className="mt-6 flex flex-col gap-3">
                {dialogData.success && ticketData && <TicketDownloadButton />}
                <button
                  onClick={() => setIsDialogOpen(false)}
                  className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                >
                  Close
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
