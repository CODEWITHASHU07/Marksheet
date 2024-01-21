import { useState, useEffect, useRef } from "react";
import "./App.css"

function App() {
// !Basic Declaration of variable

  let TotalMarks=0;
  let ObtainedMarks=0;
  let CountStore = useRef(0);
  // !This is Main state where everything depends on it.

  let [count,setcount] = useState(1);
  // !For controlling the Result Show or hide

  let [Togle,setTogle]= useState(false);
//  ! For storing Subjects into a state

  let [Subjects,setSubjects] = useState([]);

  // !for taking input from user for each subjects
  useEffect(()=>{
    let set_Sub=[];
    while(CountStore.current<count)
    {
      let Sub_Name=prompt(`Enter Your Subject Name: ${CountStore.current+1}`);
      set_Sub.push(Sub_Name);
      CountStore.current++;
    }
    // ?if lenght is equal to 0 to avoid null use this condition
    if(set_Sub.length > 0)
    {
      let temparray=[...Subjects,set_Sub]
      setSubjects(temparray);
    }
   
  },[count]);

  
// !this Marks state controls the object of each subject ,marks,maxmarsks etc.

  let [Marks, setMarks] = useState([]);
  // ?genrate a array ,length equals to count so we can apply map;
  let arr = Array.from({ length: count }, (_, index) => index+1);


  // ! Hnadling the input of Form Tags
  function Handlesubmit(e) {
    setTogle(false)
    let tempobj = { Sr_No: 0, ObtainedMarks: 0, MinimumMarks: 0, Maxmarks: 0 };
    let S_r= e.target[0].value;
    let Min = parseInt(e.target[1].value);
    let Max = parseInt(e.target[2].value);
    let ObT = parseInt(e.target[3].value);
    if (S_r <= count && S_r > 0) {
      tempobj.Sr_No = e.target[0].value ;
    } else {
      alert("Enter Correct Serial Number!");
      return;
    }
    if (!isNaN(Min)) {
      tempobj.MinimumMarks = Min;
    } else {
      alert("Please Check Minimum Marks!");
      return;
    }
    if (!isNaN(Max)) {
      tempobj.Maxmarks = Max;
    } else {
      alert("Please Check Maximum Marks!");
      return;
    }
    if (ObT < tempobj.Maxmarks && ObT >= 0) {
      tempobj.ObtainedMarks = ObT;
    } else {
      console.log(tempobj.Maxmarks);
      alert("Please Check obtained Marks!");
      return;
    }
    if(S_r <= Marks.length)
    {
     let Temp=[...Marks];
     Temp[S_r]=tempobj;
     setMarks(Temp);
    }
    else if(Marks.length===count)
    {
      alert("Sorry The List Is Full!");
      return ;
    }
    else{
     let Temp=[...Marks,tempobj];
     setMarks(Temp);

   }
  }
  // !------------To Check that index is exist or not-------
  function Checker(a) {
    if (a === undefined) {
      return false;
    }
    return true;
  }
  // !------- For getiign total of marks there is two condition so that i can use it for both total marks and obtained marks-------------
  function getTotal(check) {
    console.log(Marks);
    if (check === 'Max') {
      TotalMarks=Marks.reduce((prev, current) => prev + current.Maxmarks, 0)
      return TotalMarks;
    } else {
      ObtainedMarks=Marks.reduce((prev, current) => prev + current.ObtainedMarks, 0)
      return ObtainedMarks;
    }
  }
 
  // !------------------
  const tdRef = useRef(null);

  // ! render------started 
  return (
    <div id="wraper">

      {/* For Taking data from user */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          Handlesubmit(e);
        }}
      >
        <input type="text" placeholder="Enter Sr Number..." className="Input" />
        <input type="text" placeholder="Minimum Number..." className="Input" />
        <input type="text" placeholder="Maximum Number..." className="Input" />
        <input type="text" placeholder="Obtained..." className="Input" />
        <button type="submit">Done</button>
      </form>


      {/* !for Showing Marksheet */}
      <table>
        <thead id="thead">
          <tr>
            <td>Sr.</td>
            <td>Subjects</td>
            <td>Maximum</td>
            <td>Minimum</td>
            <td>Obtained_Marks</td>
            <td>Result</td>
          </tr>
        </thead>
        <tbody>
          {/* Here we are use a array which will return from 1 to the total count of subjects and create table row for each count */}
          {arr.map((item) => (
            <tr key={item} ref={tdRef}>
            
              <td>{item}</td>
              <td contentEditable={true}>{Subjects[item-1]}</td>
              {Checker(Marks[item-1])?(
                  <><td>{ Marks[item-1].Maxmarks}</td>
                  <td>{ Marks[item-1].MinimumMarks}</td>
                  <td>{ Marks[item-1].ObtainedMarks }</td>
               
                  <td id="Result">{Marks[item-1].ObtainedMarks>Marks[item-1].MinimumMarks?"Pass":"Fail"}</td>
                 </>
              ):(
                <><td>0</td>
                <td>0</td>
                <td>0</td>
                <td>_</td></>
              )
              }
              {count==item?(<button id="Add" onClick={()=>setcount(count+1)}>ADDRows</button>):null}
            </tr>
          ))}
      {/* Only show when get result button clicked */}
        </tbody>
        {Togle?(<tfoot>
          <tr>
            <td id="Total" colSpan={2}>TotalMarks</td>
          <td id="Max" colSpan={2}>{getTotal('Max')}</td>
          <td id="Result" colSpan={1}>{getTotal("Result")}</td>
          <td id="Percentage">{(ObtainedMarks/TotalMarks)*100}%</td>
        
          </tr>
        </tfoot>):null}
      </table>
      {/* controlling the showing of tfoot */}
      <button onClick={()=>setTogle(true)} id="genrator">Genrate Result</button>
      
    </div>
  );
}

export default App;
