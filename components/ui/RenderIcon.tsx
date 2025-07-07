import React from "react";
import ElectricityIcon from "@/assets/svg/services/electrical.svg";
import WaterIcon from "@/assets/svg/services/water.svg";
import GasIcon from "@/assets/svg/services/gas.svg";
import InternetIcon from "@/assets/svg/services/internet.svg";
import MobileIcon from "@/assets/svg/services/landing_Phone.svg";
import ReferenceIcon from "@/assets/svg/services/ref.svg";
import VodafoneIcon from "@/assets/svg/services/vod.svg";
import OrangeIcon from "@/assets/svg/services/Orange_Egypt-Logo.wine.svg";
// import OrangeIcon from "@/assets/svg/services/orange_logo.svg";
// import EtisalatIcon from "@/assets/svg/services/etisalat.svg";
import EtisalatIcon from "@/assets/svg/services/etisalaat.svg";
import WeIcon from "@/assets/svg/services/we.svg";
import GeneralIcon from "@/assets/svg/services/logo.svg";

const RenderIcon = ({
  serviceType,
  commercialName,
  size = 19,
}: {
  serviceType: string;
  size?: number;
  commercialName?: string;
}) => {
  const getIcon = () => {
    if (
      serviceType.toLowerCase() === "electric bills" ||
      serviceType.toLowerCase().includes("elec")
    ) {
      return <ElectricityIcon width={size} height={size} />;
    } else if (
      serviceType.toLowerCase() === "water bills" ||
      serviceType.toLowerCase().includes("water")
    ) {
      return <WaterIcon width={size} height={size} />;
    } else if (
      serviceType === "gas bills" ||
      serviceType.toLowerCase().includes("gas")
    ) {
      return <GasIcon width={size} height={size} />;
    } else if (
      serviceType.toLowerCase() === "internet bills" ||
      serviceType.toLowerCase().includes("internet")
    ) {
      if (commercialName?.toLowerCase().includes("we")) {
        return <WeIcon width={size} height={size} />;
      } else {
        return <InternetIcon width={size} height={size} />;
      }
    } else if (
      serviceType.toLowerCase() === "mobile bills" ||
      serviceType.toLowerCase().includes("mob") ||
      serviceType.toLowerCase().includes("phone")
    ) {
      if (commercialName?.toLowerCase().includes("vodafone")) {
        return <VodafoneIcon width={size} height={size} />;
      } else if (commercialName?.toLowerCase().includes("orange")) {
        return <OrangeIcon width={size} height={size} />;
      } else if (
        commercialName?.toLowerCase().includes("eti") ||
        commercialName?.toLowerCase().includes("itis")
      ) {
        return <EtisalatIcon width={size} height={size} />;
      } else {
        return <MobileIcon width={size} height={size} />;
      }
    } else if (
      serviceType.toLowerCase() === "reference bills" ||
      serviceType.toLowerCase().includes("ref")
    ) {
      return <ReferenceIcon width={size} height={size} />;
    } else {
      return <GeneralIcon width={size} height={size} />;
    }
  };

  return getIcon();
};

export default RenderIcon;
