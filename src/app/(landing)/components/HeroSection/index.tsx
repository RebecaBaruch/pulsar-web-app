import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebookF,
  faTiktok,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import PrimaryButton from "@/components/Buttons/PrimaryButton";

export default function HeroSection() {
  return (
    <section className="w-full max-w-[1280px] mx-auto py-4 lg:p-[64px] px-4 md:px-0">
      <div
        className="
          relative
          p-6 py-12 lg:p-12 
          w-full min-h-[460px] lg:min-h-[500px]
          bg-cover bg-center bg-no-repeat
          bg-[url('/images/hero-mobile.png')]
          md:bg-[url('/images/hero-desktop.png')]
          flex flex-col md:flex-row
          justify-start items-start md:items-center
          rounded-xl overflow-hidden
        "
      >
        <div className="relative flex-1 w-full order-1 md:order-2 mb-6 md:mb-0">
          <Image
            src="/images/hero-image-desktop.png"
            alt="Hero"
            width={500}
            height={500}
            className="mx-auto md:absolute md:right-[15px] md:top-1/2 md:-translate-y-1/2 md:max-w-[450px] lg:max-w-[500px]"
          />
        </div>

        <div className="z-10 sm:w-full md:w-[55%] order-2 md:order-1 text-left">
          <h1 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            Mais que psicologia, cuidado completo
          </h1>
          <p className="mt-2 text-sm text-white">
            Na Pulsar, você encontra apoio emocional, físico e financeiro com
            profissionais qualificados e humanos.
          </p>
          <div className="w-fit mt-4">
            <PrimaryButton
              color="green"
              text="Comece sua jornada"
              onClick={() => {}}
            />
          </div>
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
