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

export function Icon(props){
    const icon=props.icon;
    switch(icon) {
        case 'give_money':
            return <button className='color-button' onClick={()=>props.PickImage("give_money")}>  <span><GiPayMoney size={35} ></GiPayMoney></span></button>
        case 'take_money':
            return  <button className='color-button' onClick={()=>props.PickImage("take_money")}>  <span ><GiReceiveMoney size={35}></GiReceiveMoney></span></button>
        case 'money':
            return <button className='color-button' onClick={()=>props.PickImage("money")}>  <span ><GiMoneyStack size={35} ></GiMoneyStack></span></button>
        case 'bank':
            return <button className='color-button' onClick={()=>props.PickImage("bank")}>  <span><BsBank size={35}></BsBank></span></button>

        case 'pinky':
            return  <button className='color-button' onClick={()=>props.PickImage("pinky")}>  <span ><GiPiggyBank size={35}></GiPiggyBank></span></button>
        case 'clothes':
            return  <button className='color-button' onClick={()=>props.PickImage("clothes")}>  <span ><GiClothes size={35} ></GiClothes></span></button>
        case 'food':
            return <button className='color-button' onClick={()=>props.PickImage("food")}>  <span ><IoFastFoodOutline size={35} ></IoFastFoodOutline></span></button>
        case 'fuel':
            return  <button className='color-button' onClick={()=>props.PickImage("fuel")}>  <span><GiFuelTank size={35}></GiFuelTank></span></button>
        case 'car':
            return <button className='color-button' onClick={()=>props.PickImage("car")}>  <span ><AiFillCar size={35}></AiFillCar></span></button>
        case 'coffe':
            return <button className='color-button' onClick={()=>props.PickImage("coffe")}>  <span ><GiCoffeeCup size={35} ></GiCoffeeCup></span></button>
        case 'home':
            return  <button className='color-button' onClick={()=>props.PickImage("home")}>  <span><FaHome size={35}></FaHome></span></button>
        case 'family':
            return <button className='color-button' onClick={()=>props.PickImage("family")}>  <span ><MdOutlineFamilyRestroom size={35}></MdOutlineFamilyRestroom></span></button>
        case 'bus':
            return <button className='color-button' onClick={()=>props.PickImage("bus")}>  <span ><GrBus size={35} ></GrBus></span></button>
        case 'vacation':
            return <button className='color-button' onClick={()=>props.PickImage("vacation")}>  <span><FaUmbrellaBeach size={35}></FaUmbrellaBeach></span></button>

        case 'camera':
            return  <button className='color-button' onClick={()=>props.PickImage("camera")}>  <span ><AiFillCamera size={35}></AiFillCamera></span></button>
        case 'graduation':          
            return  <button className='color-button' onClick={()=>props.PickImage("graduation")}>  <span ><FaGraduationCap size={35} ></FaGraduationCap></span></button>
        case 'shopping':
            return  <button className='color-button' onClick={()=>props.PickImage("shopping")}>  <span><GiShoppingCart size={35}></GiShoppingCart></span></button>
        case 'sport':  
            return  <button className='color-button' onClick={()=>props.PickImage("sport")}>  <span ><MdOutlineSportsBasketball size={35}></MdOutlineSportsBasketball></span></button>
        case 'gifts':
            return  <button className='color-button' onClick={()=>props.PickImage("gifts")}>  <span ><IoGiftSharp size={35} ></IoGiftSharp></span></button>
        case 'health':
            return  <button className='color-button' onClick={()=>props.PickImage("health")}>  <span><GiHealthNormal size={35}></GiHealthNormal></span></button>
        case 'games':
            return  <button className='color-button' onClick={()=>props.PickImage("games")}>  <span ><MdOutlineSportsEsports size={35}></MdOutlineSportsEsports></span></button>
        case 'telephone':
            return  <button className='color-button' onClick={()=>props.PickImage("telephone")}>  <span><BsTelephone size={35}></BsTelephone></span></button>
        case 'love':
            return  <button className='color-button' onClick={()=>props.PickImage("love")}>  <span ><BiCalendarHeart size={35}></BiCalendarHeart></span></button>         
        case 'books':
            return   <button className='color-button' onClick={()=>props.PickImage("books")}>  <span ><SiBookstack size={35}></SiBookstack></span></button>
        case 'technology':
            return   <button className='color-button' onClick={()=>props.PickImage("technology")}>  <span><TbDevices2 size={35}></TbDevices2></span></button>
        case 'income':
            return   <button className='color-button' onClick={()=>props.PickImage("income")}>  <span ><BsBarChartLineFill size={35}></BsBarChartLineFill></span></button>         
        case 'music':
            return   <button className='color-button' onClick={()=>props.PickImage("music")}>  <span ><BsMusicNoteList size={35}></BsMusicNoteList></span></button>
        default:
            return   <button className='color-button' onClick={()=>props.PickImage("")}>  <span className="dot">Icon</span></button>
      }







}
