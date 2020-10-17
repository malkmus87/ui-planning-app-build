import JsonRequestHandler from './JsonRequestHandler';

class List{
    constructor(items){
        this.items=items;
        this.staticItems=items;
        this.changes=[];

    }
    setEntity(newEntity){
        this.entity=newEntity;
        return new List(this.items,this.entity);
    }
    filterBy(keyToValue){
        const keys=Object.keys(keyToValue);
        const values=Object.values(keyToValue);
        const filteredItems=this.items.filter(item=>{
            var bool=true;
            keys.forEach((key,i)=>{
                if(item[key]!==undefined && item[key].toString()!==values[i].toString()){
                    bool=false
                }
            })
            return bool;
        })
        return new List(filteredItems,this.entity);
    }
    filterByYear(year){
        return this.filterBy({year:year});
    }
    filterByMonth(month){
        return this.filterBy({month:month});
    }
    filterByDay(day){
        return this.filterBy({day:day});
    }    
    updateOneItem(affectedIndex,newValue){
        const newItems=this.items;
        const changes=this.changes;
        newItems[affectedIndex] = {
            ...this.items[affectedIndex],
            ...newValue
        };
        this.changes=[
            ...changes,
            {
                index:affectedIndex,
                type:"update",
                newValue:newValue
            }
        ];
        this.items=newItems;
        return this;
    }
    updateWithUniqueKey(key,id,newValue){
        const affectedIndex=this.items.map((item)=>item[key]).indexOf(id);
        return this.updateOneItem(affectedIndex,newValue);
    }
    addItem(addedValue){
        const newItems= [
            this.items, 
            {...addedValue}
        ];
        this.items=newItems;
        return this;
    }
    getItems(){
        return this.items;
    }
    getStaticItems(i){
        const listItems=this.staticItems;
        var changes=this.changes;
        if(i!==undefined && changes.length>0){
            changes=this.changes.slice(0,-i);
        }
        changes.forEach(change=>{
            const listItem=listItems[change.index];
            listItems[change.index]={...listItem,...change.newValue};
        })
        return listItems;
    }
}
export default List;