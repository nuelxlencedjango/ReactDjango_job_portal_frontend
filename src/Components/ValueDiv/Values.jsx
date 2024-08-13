import React from 'react'
import img1 from '../../assets/logos/logo1.jpg';


const Values=()=> {
 

  return (
    <div className='mb-[4rem] mt-[6rem]'>
      <h1 className='text-textColor text-[22px] py-[2rem] pb-[3rem] font-bold block'>
        The Value that holds us true and to account
      </h1>
      <div className="grid gap-[10rem] grid-cols-3 items-center">
        <div className='signgleGrid rounded-[10px] hover:bg-[#eeedf7] p-[1.5rem]'>
          <div className="flex items-center gap-3">
            <div className='imgDiv p-[4px] rounded-[.8rem] bg-inherit-[#dedef8] h-[40px] w-[40px] flex items-center justify-center'>
              <img src={img1} alt="" className='w-[100%]'/>

            </div>
            <span className='font-semibold text-textColor text-[18px]'>Simplicity</span>
          </div>
          <p className="text-[13px] text-textColor opacity-[.7] py-[1rem] font-semibold">
            Things being beautiful simple are at the heart of everything we do
          </p>

        </div>

        <div className='signgleGrid rounded-[10px] hover:bg-[#f7edf5] p-[1.5rem]'>
          <div className="flex items-center gap-3">
            <div className='imgDiv p-[4px] rounded-[.8rem] bg-inherit-[#dedef8] h-[40px] w-[40px] flex items-center justify-center'>
              <img src={img1} alt="" className='w-[100%]'/>

            </div>
            <span className='font-semibold text-textColor text-[18px]'>Simplicity</span>
          </div>
          <p className="text-[13px] text-textColor opacity-[.7] py-[1rem] font-semibold">
            Things being beautiful simple are at the heart of everything we do
          </p>

        </div>
        <div className='signgleGrid rounded-[10px] hover:bg-[#fcfa3e] p-[1.5rem]'>
          <div className="flex items-center gap-3">
            <div className='imgDiv p-[4px] rounded-[.8rem] bg-inherit-[#dedef8] h-[40px] w-[40px] flex items-center justify-center'>
              <img src={img1} alt="" className='w-[70%]'/>

            </div>
            <span className='font-semibold text-textColor text-[18px]'>Simplicity</span>
          </div>
          <p className="text-[13px] text-textColor opacity-[.7] py-[1rem] font-semibold">
            Things being beautiful simple are at the heart of everything we do
          </p>

        </div>
      </div>

      <div className="card card-value mt-[2rem] flex justify-between bg-blueColor p-[5rem] rounded-[10px]">
        <div>
          <h1 className='text-white text-[30px] font-bold'> Read to switch Career</h1>
          <h2 className='text-white text-[25px] font-bold'>Let's get started</h2>
          </div>
          <button className='border-[2px] rounded-[10px] py-[4px] px-[50px] text-[18px] font-semibold text-blueColor hover:bg-white border-blueColor'>Get Started</button>
        

      </div>
    </div>
  )
}

export default Values
