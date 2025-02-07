import React from "react";
import bgTiket from "../(payment)/image/fontGod.png";
import bgLogo from "../(payment)/image/logo.png";
import Image from "next/image";




export default function TicketView(props) {
    
  return (
    <div
      style={{
        backgroundImage: `url(${bgTiket})`,
        height: "400px ",
        width: "1180px",
      }}
      className="my-8 relative"
    >
      <Image src={bgTiket} alt="gomad" />
      <div className="w-[1136px] h-[370px] bg-white mx-auto my-[1rem] absolute top-0 left-0 right-0">
        <div className="flex justify-around">
          <div className="w-full ml-10">
            <h1 className="text-4xl font-bold my-5">GOMAD 10</h1>
            <div className="flex gap-2">
              <span style={{backgroundColor:"#00AAE8"}} className="p-2 text-white text-xl">Theme:</span>
              <h2 className="font-bold">
                From Vision to Impact;
                <br />
                Entrepreneurs as Nation Builders
              </h2>
            </div>
            <div className="flex justify-between my-4">
              <div>
                <h3 className="font-bold">
                  Dear 
                  <span className="underline">{props.data.participantName.name}</span>
                </h3>
              </div>
              <div className="mx-4 font-bold">
                <span>TICKET</span>
                <p style={{backgroundColor:"#00AAE8"}} className="text-lg w-36 px-1 z-50 relative">15,000 FCFA</p>
                <div className="w-36 h-8 bg-black -mt-7 -z-50 ml-1"></div>
              </div>
            </div>
            <div>
              <h3>Your ticket for this event is secured.</h3>
              <div className="grid grid-cols-3">
                <div>
                  <h3 style={{color:"#00AAE8"}} className="capitalize font-bold text-lg ">date:</h3>
                  <p className="text-sm">15 February,2025</p>
                </div>
                <div>
                  <h3 style={{color:"#00AAE8"}} className="capitalize font-bold text-lg ">time:</h3>
                  <p className="text-sm">8:00am to6:00pm</p>
                </div>
                <div>
                  <h3 style={{color:"#00AAE8"}} className="capitalize font-bold text-lg ">venue:</h3>
                  <p className="text-sm">
                    Collège Saint-Michel, Carrefour Terminus, Douala
                  </p>
                </div>
              </div>
            </div>
            <div style={{borderColor:"#00AAE8"}}  className="border-t-4  my-2">
              <p className="py-2 font-bold text-sm">
                Contacts +237 656 056 87 .Visit <u>www.gomadnetwork.com</u> for any
                further information needed
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            <div>
                
              <div className="flex justify-center mt-5 mb-3 ">
                <Image
                  src={bgLogo}
                  alt="GOMAD"
                  className="w-[100px] h-[50px] "
                />
              </div>
              <div style={{borderColor:"#00AAE8"}}  className=" w-60 ml-3 border-l-4 px-2">
              {/* <!--------------- QR Code Placeholder by Figma ---------------> */}
                <div>
                  <div className="flex justify-center">
                    <div className="w-14 h-14">{props.data.qrCode}</div>
                  </div>
                  <p className="text-center text-xs mt-2">Official use only</p>
                </div>
                <div style={{borderColor:"#00AAE8"}} className="border-2  my-2"></div>

              {/* <!--------------- QR Code Placeholder by google map ---------------> */}
                <div>
                  <div className="flex justify-center">
                    <div className="w-14 h-14 bg-black"></div>
                  </div>
                  <p className="text-center text-xs mt-2">
                    <b>For you</b>
                    <br />
                    Scan to get directions & exact event location
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
