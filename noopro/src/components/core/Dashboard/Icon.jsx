import * as iconsList from "react-icons/vsc";



const Icon = ({iconName }) => {

  const Ic = iconsList[iconName];
  return ( <Ic />)
}

export default Icon;
