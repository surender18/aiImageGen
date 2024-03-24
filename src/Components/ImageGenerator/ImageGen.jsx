import React ,{useRef,useState}from 'react'
import './ImageGen.css'
import defaultimage from '../Assets/defaultimage.jpg'
const ImageGen = () => {
  const [image_url, setImage_url] = useState('/');
  let inputRef =useRef(null);
  const [loading,setLoading]=useState(false);



  const imageGenerator=async()=>{
    if(inputRef.current.value===''){
      return 0;
  }
  setLoading(true);
  const response=await fetch(
   "https://api.openai.com/v1/images/generations",
    {
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        Authorization:"Bearer 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",
        "User-Agent": "Chrome",
      },
      body:JSON.stringify({
        prompt:`${inputRef.current.value}`,
        n:1,
        size:"515x512",
      }),
      
    }
    
  );
  let data= await response.json();
  let data_array= data.data;
  setImage_url(data_array[0].url);
  setLoading(false)
}
 

  return (
    <div className='ai-image-generator'>
      <div className="header"> AI Image <span>Generator</span></div>
      <div className="img-loading">
        <div className="image"><img src= {image_url==="/"?defaultimage:image_url}alt="" /></div>

        <div className={loading?"loading-bar-full":"loading-bar"}>
       <div className={loading?"loading-text":"display-none"}>Loading...</div>
        </div>
      </div>
      <div className="search-box">
        <input type="text" ref={inputRef}className='search-input'placeholder='Describe What You Want to See' />
        <div className="generate-btn" onClick={()=>{imageGenerator()}}>Generate</div>
      </div>
    </div>
  )
}

export default ImageGen
