import { useQuery } from "@apollo/client";
import { PieChart, Pie, Tooltip } from "recharts";
import { GET_MONTH_EXPENSES } from "../graph/Query";

export function ChartExpenses(props){
 
    const getcolor =(color)=>{
        switch(color) {
        case 'red':
                return'rgB(212, 17, 17)'
        case 'orange':
                return "rgb(255, 123, 0)"
        case 'yellow':
             return "rgb(255, 238, 0)"
        case 'pink':
            return "rgb(235, 142, 188)"
        case 'magenta':
            return "rgb(236, 48, 205)"
        case 'purple':
            return "rgb(95, 77, 175)"
        case 'blue':
            return"rgb(20, 113, 219)"
        case 'dark_blue':
            return "rgb(6, 50, 145)"
        case 'light_blue':
            return "rgb(17, 205, 212)"
        case 'green':
            return "rgb(46, 187, 10)"
        case 'dark_green':
            return"rgb(6, 95, 21)"
        case 'light_green':
            return "rgb(126, 255, 94)"
        case 'black':
            return "rgb(0, 0, 0)"
        case 'gray':
            return "rgb(63, 77, 74)"
        case 'brown':
            return "rgb(105, 56, 16)"
        default:
            return "rgb(105, 56, 16)"
        }

      };
      
    const {data} = useQuery(GET_MONTH_EXPENSES,{
            variables:{
                owner_id: props.owner_id,
                month:JSON.stringify(props.date.getMonth()),
                year:JSON.stringify(props.date.getFullYear())
            }
    })

    let data01 = []
    if(data){
        data.getMonthExpenses?.expenses.map((exp,i)=>{
            props.scenarios.map((sc,s)=>{
                if(JSON.stringify(sc._id)===JSON.stringify(exp.scenario)){
                    data01=[...data01,{ name: sc.title, value: exp.money ,fill:getcolor(exp.color)}]

                }
            })
        })

    
    return(
        <>
        <h3>Month expenses</h3>
        <PieChart width={2000} height={600}>
        <Pie
        dataKey="value"
        isAnimationActive={true}
        data={data01}
        cx={400}
        cy={250}
        outerRadius={180}
     
        label
        />
        <Tooltip />
        </PieChart>
        </>
    )
    
    
    
    }


    
       
          
        
     


}
