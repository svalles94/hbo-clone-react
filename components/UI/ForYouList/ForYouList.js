const ForYouList = (props) => {
    const loopComp = (comp, digit) => {
        let thumbnails = [];
        for(let index = 0; index <= digit; index++) {
            thumbnails.push(comp);
        }

        return thumbnails;
    }
    return(
     <div className="foryou-list">
         <h3 className="foryou-list__title">For You</h3>
         <div className="foryou-list__thumbnails">
          
            {loopComp(
            (<div className="foryou-list__thumbnail">
             <img src="https://i5.walmartimages.com/asr/a977fb15-02bf-450b-bfc5-682cb4932548.86c3fbf41473395413624ba16670c537.jpeg" alt="" />
             <div className="foryou-list__top-layer">
                 <i className="fas fa-play" />
             </div>
             </div>), 10
             
             )}
         </div>
   
     </div>
    )
}

export default ForYouList;