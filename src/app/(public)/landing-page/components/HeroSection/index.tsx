import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebookF,
  faTiktok,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section
      className="
        w-full 
        px-4 
        h-auto md:h-[70dvh]
        bg-white
      "
    >
      <div
        className="
          relative
          p-6
          py-12
          lg:p-18
          h-full
          max-w-[1440px] mx-auto
          bg-cover
          bg-center
          bg-no-repeat
          bg-[url('/images/hero-mobile.png')]
          md:bg-[url('/images/hero-desktop.png')]
          flex
          flex-col md:flex-row
          justify-start
          items-start md:items-center
          rounded-xl
          overflow-hidden
        "
      >
        <div className="relative flex-1 w-full order-1 md:order-2 mb-6 md:mb-0">
          <img
            src="/images/hero-image-desktop.png"
            alt="Hero"
            className="mx-auto md:absolute md:right-[15px] md:top-1/2 md:-translate-y-1/2 md:max-w-[500px]"
          />
        </div>

        <div className="z-10 sm:w-full md:w-[55%] order-2 md:order-1 mt-6 text-left">
          <h1 className="text-2xl font-bold text-white sm:text-4xl">
            Mais que psicologia, cuidado completo
          </h1>
          <p className="mt-2 text-sm text-white">
            Na Pulsar, você encontra apoio emocional, físico e financeiro com
            profissionais qualificados e humanos.
          </p>
          <button className="mt-6 inline-block rounded-full bg-green-400 px-4 py-3 text-sm text-[#0F1417] font-semibold hover:bg-green-500 cursor-pointer">
            Comece sua jornada
          </button>
        </div>

        <div className="flex flex-row justify-end space-x-3 order-3 md:order-2 w-full fa-lg mt-12 md:absolute md:bottom-6 md:right-6">
          <Link href="https://www.instagram.com/soupulsar?utm_source=ig_web_button_share_sheet&igsh=dzdkMXJ2ZTBmcDRq">
            <FontAwesomeIcon icon={faInstagram} style={{ color: "white" }} />
          </Link>
          <Link href="https://www.facebook.com/Soupulsarr/?ref=_xav_ig_profile_page_web">
            <FontAwesomeIcon icon={faFacebookF} style={{ color: "white" }} />
          </Link>
          <Link href="https://www.tiktok.com/@soupulsar?is_from_webapp=1&sender_device=pc">
            <FontAwesomeIcon icon={faTiktok} style={{ color: "white" }} />
          </Link>
          <Link href="https://www.youtube.com/@soupulsar/shorts">
            <FontAwesomeIcon icon={faYoutube} style={{ color: "white" }} />
          </Link>
        </div>
      </div>
    </section>
  );
}
