
import './App.css'

import { useState } from 'react';

function App() {

  const [age, setAge] =  useState(0);
  const [weight, setWeight] =  useState(0);
  const [height, setHeight] =  useState(0);

  const [bmi, setBmi] = useState(0)
  const [gender, setGender] = useState('')
  const [res, setRes] = useState('')

  const [isAge, setIsAge] =  useState(true);
  const [isWeight, setIsWeight] =  useState(true);
  const [isHeight, setIsHeight] =  useState(true);
  
  const validate = (e) => {
    const name = e.target.name;
    const value =(e.target.value)
    console.log(name, value);
    setBmi(0)

    if(!!value.match(/^[0-9]*$/) ) {
      if(name == 'age') {
        setAge(value)
        setIsAge(true)
      }else  if(name == 'ht') {
        setHeight(value)
        setIsHeight(true)
      }else if(name == 'wt') {
        setWeight(value)
        setIsWeight(true)
      }
    }else {
      if(name == 'age') {
        setAge(value)
        setIsAge(false)
      }else  if(name == 'ht') {
        setHeight(value)
        setIsHeight(false)
      }else if(name == 'wt') {
        setWeight(value)
        setIsWeight(false)
      }
    }
  }

  const calculate = (e) => {
    e.preventDefault();
    if (age == '' || height == '' || weight == '') {
      alert('Please fill the form completely');
    } else {
      const bmiValue = Number(weight) / ((Number(height) / 100) * (Number(height) / 100));
      setBmi(bmiValue.toFixed(2));
      setWeight(0)
      setAge(0)
      setHeight(0)
      if(bmi <= 18.4) {
        setRes('Underweight')
      }else if(bmi >= 18.5 && bmi <=24.9 ) {
        setRes('Normal')
      }else {
        setRes('Overweight')
      }

    }
  }

  const genderChange = (val)=> {
    setGender(val);
  }

  return (
    <>
      <div className='d-flex flex-column  align-items-center body-div'>
        <div className='mt-4 main-div'>
          <h1 className='text-primary text-center fw-bold'>BMI Calculator</h1>
          <div className='p-4 mt-4 sub-main'>
            <form onSubmit={calculate} >
              <div className='d-flex justify-content-between align-items-center'>
                <label className='label'>Age</label>
                <input className='input' type="text" placeholder='Enter your age' name='age' value={age || ''} onChange={(e)=>validate(e)} />
              </div>
              {!isAge &&<p className="text-danger error">*Invalid Input</p>}

              <div  className='d-flex justify-content-between align-items-center mt-4'>
                <label className='label d-flex flex-column align-items-center' >Height<span className='span'>(cm)</span></label>
                <input type="text" className='input' placeholder='Enter your height' name='ht' value={height || ''} onChange={(e)=>validate(e)} />
                
              </div>
              <div>
              {!isHeight &&<p className="text-danger error">*Invalid Input</p>}
              </div>
              

              <div  className='d-flex justify-content-between align-items-center mt-4'>
                <label className='label d-flex flex-column align-items-center' >Weight<span className='span'>(kg)</span></label>
                <input className='input' type="text" placeholder='Enter your weight' value={weight || ''} name='wt' onChange={(e)=>validate(e)} />
              </div>
              {!isWeight &&<p className="text-danger error">*Invalid Input</p>}
              <div className="d-flex justify-content-around mt-4">
            <label className={`gender ${gender == 'male' ? 'gender-selected' : ''}`} onClick={()=>genderChange('male')}>
                <input type="radio" name="gender" value="male" checked={gender == 'male'} onChange={()=>genderChange('male')} /> Male
            </label>
            <label className = {`gender ${gender == 'female' ? 'gender-selected' : ''}`} onClick={()=>genderChange('female')}>
                <input type="radio" name="gender" value="female" checked={gender == 'female'} onChange={()=>genderChange('female')}/> Female
            </label>
        </div>
              <div>
                <button className='btn btn-primary w-100 mt-3 btns' disabled = {isAge && isHeight && isWeight ? false: true} >Calculate BMI</button>
              </div>
            </form>
            <div>
              <p className='label fs-4  mt-1'>BMI</p>
              <p className='op'>{bmi}</p>
              <p className='label fs-4 '>Result</p>
              <p className='op'>{res}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
