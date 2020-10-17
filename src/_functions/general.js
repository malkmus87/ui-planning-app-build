function range(start,end){
    let array=[];
    for(let i=start;i<=end;i++){
      array.push(i);
    }
    return array;
}

const groupBy = (array,key) =>{
  var object={};
  array.forEach(item=>{
      const tempObject={
          ...object,
          [item[key]]:item
      };
      object=tempObject;
  });
  return object;
}

function onlyUnique(value, index, self) { 
  return self.indexOf(value) === index;
}

function filterBy(items,keyToValue){
  const valueIsValid=(value)=> (value!==undefined && value!==null);
  const keys=Object.keys(keyToValue);
        const values=Object.values(keyToValue);
        const filteredItems=items.filter(item=>{
            var bool=true;
            keys.forEach((key,i)=>{
                if(valueIsValid(item[key]) && item[key].toString()!==values[i].toString()){
                    bool=false
                }
            })
            return bool;
        })
    return filteredItems;
}

const identify = (identifier,item)=>{
  const keys=Object.keys(identifier);
  var identified=true;
  keys.forEach(key=>{
    if(item[key]!==identifier[key]){
      identified=false;
    }
  });
  return identified;
}

const findIndexWithIdentifier=(array,identifier)=>{
  var index=0;
  while(index<array.length){
    const item=array[index];
    if(identify(identifier,item)){
      return index;
    }
    index++; 
  }
  return false;
}

const assignToArray= (array,identifier,newValue)=>{
  var affectedIndex=identifier;
  if(typeof identifier==="object"){
    affectedIndex=findIndexWithIdentifier(array,identifier,newValue);
  }
  return(
    [
      ...array.slice(0,affectedIndex),
      {
        ...array[affectedIndex],
        ...newValue
      },
      ...array.slice(affectedIndex+1)
    ]
  )
}

export {assignToArray,range,findIndexWithIdentifier,filterBy,onlyUnique,groupBy};