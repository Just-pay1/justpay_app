import React from "react";
import ElectricityIcon from "@/assets/svg/services/electrical.svg";
import WaterIcon from "@/assets/svg/services/water.svg";
import GasIcon from "@/assets/svg/services/gas.svg";
import InternetIcon from "@/assets/svg/services/internet.svg";
import MobileIcon from "@/assets/svg/services/landing_Phone.svg";
import ReferenceIcon from "@/assets/svg/services/university.svg";
import GeneralIcon from "@/assets/svg/justpay_logo.svg";

const RenderIcon = ({
  serviceType,
  size = 17,
}: {
  serviceType: string;
  size?: number;
}) => {
  const getIcon = () => {
    if (serviceType === "electric bills" || serviceType.includes("elec")) {
      return <ElectricityIcon width={size} height={size} />;
    } else if (serviceType === "water bills" || serviceType.includes("water")) {
      return <WaterIcon />;
    } else if (serviceType === "gas bills" || serviceType.includes("gas")) {
      return <GasIcon />;
    } else if (
      serviceType === "internet bills" ||
      serviceType.includes("internet")
    ) {
      return <InternetIcon />;
    } else if (
      serviceType === "mobile bills" ||
      serviceType.includes("mob") ||
      serviceType.includes("phone")
    ) {
      return <MobileIcon />;
    } else if (
      serviceType === "reference bills" ||
      serviceType.includes("ref")
    ) {
      return <ReferenceIcon />;
    } else {
      return <GeneralIcon />;
    }
  };

  return getIcon();
};

export default RenderIcon;
