import { GiPayMoney,GiClothes,GiMoneyStack,GiPiggyBank,GiReceiveMoney,GiFuelTank,GiCoffeeCup,GiShoppingCart,GiHealthNormal } from 'react-icons/gi';
import { BsBank,BsTelephone,BsBarChartLineFill,BsMusicNoteList } from 'react-icons/bs';
import{IoFastFoodOutline,IoGiftSharp} from 'react-icons/io5';
import{SiBookstack} from 'react-icons/si';
import{TbDevices2} from 'react-icons/tb';
import{BiCalendarHeart} from 'react-icons/bi';
import{AiFillCar,AiFillCamera} from 'react-icons/ai';
import{GrBus} from 'react-icons/gr';
import{FaUmbrellaBeach,FaHome,FaGraduationCap} from 'react-icons/fa';
import{MdOutlineFamilyRestroom,MdOutlineSportsBasketball,MdOutlineSportsEsports} from 'react-icons/md';
import '../css/SettingsTemplate.css'
export function ColorIcon(props){
    const color=props.color;
    const icon=props.icon;
    switch(color) {
        case 'red':
            return <div className="scenarios_image"><span className="big_dot red"><InsideIcon icon={icon}></InsideIcon></span></div>

        case 'orange':
            return <div className="scenarios_image"><span className="big_dot orange"><InsideIcon icon={icon}></InsideIcon></span></div>
        case 'yellow':
            return <div className="scenarios_image"><span className="big_dot yellow"><InsideIcon icon={icon}></InsideIcon></span></div>
        case 'magenta':
            return <div className="scenarios_image"><span className="big_dot magenta"><InsideIcon icon={icon}></InsideIcon></span></div>
        case 'pink':
            return <div className="scenarios_image"><span className="big_dot pink"><InsideIcon icon={icon}></InsideIcon></span></div>
        case 'purple':          
        return <div className="scenarios_image"><span className="big_dot purple"><InsideIcon icon={icon}></InsideIcon></span></div>

        case 'blue':
            return <div className="scenarios_image"><span className="big_dot blue"><InsideIcon icon={icon}></InsideIcon></span></div>

        case 'light_blue':  
        return <div className="scenarios_image"><span className="big_dot light_blue"><InsideIcon icon={icon}></InsideIcon></span></div>

        case 'dark_blue':
            return <div className="scenarios_image"><span className="big_dot dark_blue"><InsideIcon icon={icon}></InsideIcon></span></div>
        case 'green':
            return <div className="scenarios_image"><span className="big_dot green"><InsideIcon icon={icon}></InsideIcon></span></div>
        case 'light_green':
            return <div className="scenarios_image"><span className="big_dot light_green"><InsideIcon icon={icon}></InsideIcon></span></div>
        case 'dark_green':
            return <div className="scenarios_image"><span className="big_dot dark_green"><InsideIcon icon={icon}></InsideIcon></span></div>
        case 'gray':
            return <div className="scenarios_image"><span className="big_dot gray"><InsideIcon icon={icon}></InsideIcon></span></div>
        case 'black':
            return <div className="scenarios_image"><span className="big_dot black"><InsideIcon icon={icon}></InsideIcon></span></div>

        case 'brown':
            return <div className="scenarios_image"><span className="big_dot brown"><InsideIcon icon={icon}></InsideIcon></span></div>

       
        default:
          return null
      }


}
function InsideIcon(props){
    const icon=props.icon;
    switch(icon) {
        case 'give_money':
            return <span><GiPayMoney size={30} ></GiPayMoney></span>
        case 'take_money':
            return  <span ><GiReceiveMoney size={30}></GiReceiveMoney></span>
        case 'money':
            return  <span ><GiMoneyStack size={30} ></GiMoneyStack></span>
        case 'bank':
            return  <span><BsBank size={30}></BsBank></span>

        case 'pinky':
            return   <span ><GiPiggyBank size={30}></GiPiggyBank></span>
        case 'clothes':
            return  <span ><GiClothes size={30} ></GiClothes></span>
        case 'food':
            return  <span ><IoFastFoodOutline size={30} ></IoFastFoodOutline></span>
        case 'fuel':
            return   <span><GiFuelTank size={30}></GiFuelTank></span>
        case 'car':
            return <span ><AiFillCar size={30}></AiFillCar></span>
        case 'coffe':
            return   <span ><GiCoffeeCup size={30} ></GiCoffeeCup></span>
        case 'home':
            return  <span><FaHome size={30}></FaHome></span>
        case 'family':
            return <span ><MdOutlineFamilyRestroom size={30}></MdOutlineFamilyRestroom></span>
        case 'bus':
            return <span ><GrBus size={30} ></GrBus></span>
        case 'vacation':
            return  <span><FaUmbrellaBeach size={30}></FaUmbrellaBeach></span>

        case 'camera':
            return   <span ><AiFillCamera size={30}></AiFillCamera></span>
        case 'graduation':          
            return  <span ><FaGraduationCap size={30} ></FaGraduationCap></span>
        case 'shopping':
            return <span><GiShoppingCart size={30}></GiShoppingCart></span>
        case 'sport':  
            return  <span ><MdOutlineSportsBasketball size={30}></MdOutlineSportsBasketball></span>
        case 'gifts':
            return   <span ><IoGiftSharp size={30} ></IoGiftSharp></span>
        case 'health':
            return    <span><GiHealthNormal size={30}></GiHealthNormal></span>
        case 'games':
            return  <span ><MdOutlineSportsEsports size={30}></MdOutlineSportsEsports></span>
        case 'telephone':
            return    <span><BsTelephone size={30}></BsTelephone></span>
        case 'love':
            return    <span ><BiCalendarHeart size={30}></BiCalendarHeart></span>         
        case 'books':
            return     <span ><SiBookstack size={30}></SiBookstack></span>
        case 'technology':
            return   <span><TbDevices2 size={30}></TbDevices2></span>
        case 'income':
            return    <span ><BsBarChartLineFill size={30}></BsBarChartLineFill></span>         
        case 'music':
            return    <span ><BsMusicNoteList size={30}></BsMusicNoteList></span>
        default:
          return null
    }
}
