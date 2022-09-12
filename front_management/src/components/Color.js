import '../css/SettingsTemplate.css'

export function Color(props){
    const color=props.color;
    switch(color) {
        case 'red':
            return  <button className='color-button' onClick={()=>props.PickColor("red")}>  <span className="dot red"></span></button>
        case 'orange':
            return  <button className='color-button' onClick={()=>props.PickColor("orange")}>  <span className="dot orange"></span></button>
        case 'yellow':
            return  <button className='color-button' onClick={()=>props.PickColor("yellow")}>  <span className="dot yellow"></span></button>
        case 'magenta':
            return  <button className='color-button' onClick={()=>props.PickColor("magenta")}>  <span className="dot magenta"></span></button>
        case 'pink':
            return <button className='color-button' onClick={()=>props.PickColor("pink")}>  <span className="dot pink" ></span></button>
        case 'purple':          
            return  <button className='color-button' onClick={()=>props.PickColor("purple")}>  <span className="dot purple"></span></button>

        case 'blue':
            return  <button className='color-button' onClick={()=>props.PickColor("blue")}>  <span className="dot blue"></span></button>

        case 'light_blue':  
            return  <button className='color-button' onClick={()=>props.PickColor("light_blue")}>  <span className="dot light_blue"></span></button>

        case 'dark_blue':
            return  <button className='color-button' onClick={()=>props.PickColor("dark_blue")}>  <span className="dot dark_blue"></span></button>
        case 'green':
            return  <button className='color-button' onClick={()=>props.PickColor("green")}>  <span className="dot green"></span></button>
        case 'light_green':
            return  <button className='color-button' onClick={()=>props.PickColor("light_green")}>  <span className="dot light_green"></span></button>
        case 'dark_green':
            return  <button className='color-button' onClick={()=>props.PickColor("dark_green")}>  <span className="dot dark_green"></span></button>
        case 'gray':
             return <button className='color-button' onClick={()=>props.PickColor("gray")}>  <span className="dot gray"></span></button>
        case 'black':
            return <button className='color-button' onClick={()=>props.PickColor("black")}>  <span className="dot black"></span></button>

        case 'brown':
            return   <button className='color-button' onClick={()=>props.PickColor("brown")}>  <span className="dot brown"></span></button>

       
        default:
            return   <button className='color-button' onClick={()=>props.PickColor("")}>  <span className="dot">Color</span></button>

      }



 





}
