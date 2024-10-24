import { Icon, IconProps } from "@iconify/react/dist/iconify.js";


const IconifyIcon = ({ icon, ...rests }: IconProps) => {
  return <Icon icon={icon} fontSize={"16px"} {...rests}></Icon>;
};

export default IconifyIcon;


  
  
