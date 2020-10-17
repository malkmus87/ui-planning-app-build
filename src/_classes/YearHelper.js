import MonthHelper from '../_classes/MonthHelper';
class YearHelper{
    constructor(year){
        this.year=year;
    }
    getNumberOfDaysPerMonth(){
        const months=[1,2,3,4,5,6,7,8,9,10,11,12];
        return(
            months.map(month=>
                new MonthHelper(this.year,month-1).getLastDay().date
            )
        )
    }
    getFirstDayOfYear(){
        return(
            new MonthHelper(this.year,0).getFirstDay()
        );
    }
}
export default YearHelper;