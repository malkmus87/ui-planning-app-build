import YearHelper from '../_classes/YearHelper';

class MonthHelper{
    constructor(year,month){
        this.month=month;
        this.year=year;
    }
    getFirstWeek(){
        const yearHelper=new YearHelper(this.year);
        const lengthOfFirstWeek=7-yearHelper.getFirstDayOfYear().day;
        const totalOfDaysBeforeMonth=yearHelper
            .getNumberOfDaysPerMonth()
            .slice(0,this.month)
            .reduce((a,b)=>a+b,0)
        ;
        
        var weekNumber=1;
        var restOfDaysBeforeMonth=totalOfDaysBeforeMonth-lengthOfFirstWeek; 
        
        while(restOfDaysBeforeMonth>=7){
            restOfDaysBeforeMonth=restOfDaysBeforeMonth-7;
            weekNumber++;
        }

        return({number:weekNumber,firstDay:restOfDaysBeforeMonth});
    }
    getDayDistribution(){
        const numberOfDays=this.getLastDay().date;
        const firstWeek=this.getFirstWeek();
        
        var dayDistribution=[];

        var weekNumber=firstWeek.number;
        var lastDayOfWeek=7-firstWeek.firstDay+1;

        for(let day=1;day<=numberOfDays;day++){  
            const tempDayDistribution=dayDistribution;
            dayDistribution=[...tempDayDistribution,{...this.getDay(day),weekNumber:weekNumber}];
            if(day===lastDayOfWeek){
                weekNumber=weekNumber+1;
                lastDayOfWeek=lastDayOfWeek+7;
            }
        }
        return dayDistribution;
    }
    getDay(i){
        const date=new Date(this.year,this.month,i);
        const weekDays=["Söndag","Måndag","Tisdag","Onsdag","Torsdag","Fredag","Lördag"];
        return({
            day:date.getDay(),
            name:weekDays[date.getDay()],
            date:date.getDate(),
            month:this.month
        });
    }
    getFirstDay(){
        const date=new Date(this.year,this.month,1);
        const weekDays=["Söndag","Måndag","Tisdag","Onsdag","Torsdag","Fredag","Lördag"];
        return({
            day:date.getDay(),
            name:weekDays[date.getDay()],
            date:date.getDate(),
            month:this.month
        });
    }
    getLastDay(){
        const date=new Date(this.year,this.month+1,0);
        const weekDays=["Söndag","Måndag","Tisdag","Onsdag","Torsdag","Fredag","Lördag"];
        return({
            day:date.getDay(),
            name:weekDays[date.getDay()],
            date:date.getDate(),
            month:this.month
        });
    }
}
export default MonthHelper;