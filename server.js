const express =  require('express');
const axios = require('axios');
var cors = require('cors');
const googleTrends = require('google-trends-api');
const app =express();
app.use(cors());
// app.use();
app.get('/trends',(req,res) =>
{
let web=req.query.web_url;
  googleTrends.interestOverTime({startTime: new Date('2019-06-01'),keyword: web})
.then(function(results){
  console.log(typeof(results));
  let solve=JSON.parse(results);
    //console.log(solve);
  var arr=[]
  if(solve!=undefined&&solve.default!=undefined&&solve.default.timelineData!=undefined)
  arr=solve.default.timelineData;
  let i;
  var val=[];
  for( i=0;i<arr.length;i++)
  {
    if(arr[i].value!=undefined)
    val.push(arr[i].value[0])
  }
   res.json(val);
})
.catch(function(err){
  console.error(err);
})

});

app.get('/api/customers', (req,res) =>
{
let web=req.query.web_url
var authKey="";//Enter your NYTimes APPID
var queryURL = "https://api.nytimes.com/svc/topstories/v2/"+web+".json?api-key=" + authKey;

axios.get(queryURL)
  .then((response) => {
     //console.log(response);
    var result = [];
    console.log(response.data.results.length)
           if (response.data.results!=undefined&&response.data.results.length!=0) {

             for(var i=0; i<response.data.results.length; i++){
               // Break out of the loop if there are more than 5 entries
               if(response.data.results[i].title!=undefined&&response.data.results[i].url!=undefined&&response.data.results[i].abstract!=undefined
               &&response.data.results[i].published_date!=undefined&&response.data.results[i].section!=undefined
               &&response.data.results[i].title!=''&&response.data.results[i].url!=''&&response.data.results[i].abstract!=''
               &&response.data.results[i].published_date!=''&&response.data.results[i].section!='')
                {
                  if(i==10&&web!='home'){
                 break;
                  }
               else {
                 // Otherwise, push to results array
                 // result.push(response.data.results[i]);
                 var multimedia_img=[]
                 // var store=response.data.results[i].blocks.main.elements[0].assets
                 var all_imgs=response.data.results[i].multimedia
                 var j,store="https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg"
                 if(all_imgs!=undefined){
                 var len=all_imgs.length
                 for(j=0;j<len;j++)
                 {
                   if(all_imgs[j].width>=2000)
                   {

                       // console.log("stories greater than 2000"+all_imgs[j].url)
                       store=all_imgs[j].url
                     break;
                   }
                 }
               }
                 multimedia_img.push({url:store})

                 result.push({
                   title:response.data.results[i].title,
                   url:response.data.results[i].url,
                   id:response.data.results[i].url,
                   section:response.data.results[i].section,
                   abstract:response.data.results[i].abstract,
                   published_date:response.data.results[i].published_date,
                   multimedia:multimedia_img,
                   channel:"ny"
                 })

               }
             }
             }


           }
           // console.log(result)
    res.json(result);
  });


 });

 app.get('/api/article', (req,res) =>
 {
   // console.log(req.query.web_url)
   let web=req.query.web_url
   console.log(web)
   const customers =[{id: 1, firstName:'John', lastname: 'Doe'},
   {id: 2, firstName:'Stever', lastname: 'Smith'},
   {id: 3, firstName:'Mary', lastname: 'Swasnon'}];

  console.log(`first`);
  // var p=articleQuery();

 var authKey = "";//Enter your NYTimes APPID
 var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=web_url:(\""+web+"\")&api-key=" + authKey;
 console.log(queryURL)
 axios.get(queryURL)
   .then((response) => {
      //console.log(response);
     var result = [];

    //  console.log(response.data.response.docs[0])
            if (response.data.response.docs!=undefined&&response.data.response.docs.length!=0) {

                  // Otherwise, push to results array
                  // console.log(response.response.docs[0])
                  // result.push(response.data.response.docs[0]);
                  var multimedia_img=[]
                  // var store=response.data.response.content.blocks.main.elements[0].assets
                  var all_imgs=response.data.response.docs[0].multimedia
                  var j,store="https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg"
                  if(all_imgs!=undefined){
                  var len=all_imgs.length
                  for(j=0;j<len;j++)
                  {
                    console.log("article" +all_imgs[j].url)
                    if(all_imgs[j].width>=2000)
                    {
                      console.log("greater than 2000")
                      store='https://www.nytimes.com/'+all_imgs[j].url
                      break;
                    }
                  }
                }
                  multimedia_img.push({url:store})


                  // multimedia_img.push({url:response.data.response.content.blocks.main.elements[0].assets[store.length-1].file})
                  var title={main:response.data.response.docs[0].headline.main}
                  result.push(
                    {
                        id:response.data.response.docs[0].web_url,
                        web_url:response.data.response.docs[0].web_url,
                        pub_date:response.data.response.docs[0].pub_date,
                        multimedia:multimedia_img,
                        abstract:response.data.response.docs[0].abstract,
                        headline:title,
                        channel:'ny',
                        section:response.data.response.docs[0].news_desk

                    }
                  )



            }
             //console.log(result)
     res.json(result);
   });


  });
  app.get('/api/guard', (req,res) =>
  {
    // console.log(req.query.web_url)
    let web=req.query.web_url
    console.log(web)
   // var p=articleQuery();

  var authKey = "";//Enter your Guardian APPID
  var queryURL
    if(web==="home")
      queryURL="https://content.guardianapis.com/search?api-key="+authKey+"&section=(sport|business|technology|politics)&show-blocks=all"
      else {
        queryURL="https://content.guardianapis.com/search?api-key="+authKey+"&section=\("+web+"\)&show-blocks=all"

      }

  console.log(queryURL)
  axios.get(queryURL)
    .then((response) => {
       //console.log(response.data.response.results);
       var result = [];
              if (response.data.response.results!=undefined) {

                for(var i=0; i<response.data.response.results.length; i++){
                  if(response.data.response.results[i].webTitle!=undefined&&response.data.response.results[i].webTitle.length!=0&&
                  response.data.response.results[i].webUrl!=undefined&&response.data.response.results[i].webUrl.length!=0&&
                response.data.response.results[i].id!=undefined&&response.data.response.results[i].id.length!=0&&
              response.data.response.results[i].sectionId!=undefined&&response.data.response.results[i].sectionId.length!=0&&
            response.data.response.results[i].webPublicationDate!=undefined&&response.data.response.results[i].webPublicationDate.length!=0&&
          response.data.response.results[i].blocks!=undefined&&response.data.response.results[i].blocks.body!=undefined&&response.data.response.results[i].blocks.body.length!=0
        &&response.data.response.results[i].blocks.body[0].bodyTextSummary!=undefined&&response.data.response.results[i].blocks.body[0].bodyTextSummary.length!=0){
                  if(i==10&&web!='home'){
                    break;
                  }
                  else {
                    // Otherwise, push to results array
                    // result.push(response.data.response.results[i]);
                    var multimedia_img=[]
                    var by_def="https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png"
                    var store=response.data.response.results[i]
                    var st=undefined
                    if(store!=undefined&&store.blocks!=undefined&&store.blocks.main!=undefined&&store.blocks.main.elements!=undefined&&store.blocks.main.elements.length!=0&&store.blocks.main.elements[0].assets!=undefined&&store.blocks.main.elements[0].assets.length!=0)
                    {
                      len=store.blocks.main.elements[0].assets.length
                      st=store.blocks.main.elements[0].assets[len-1].file

                    }
                    if(st!=undefined&&st.length!=0)
                    multimedia_img.push({url:st})
                    else
                    multimedia_img.push({url:by_def})

                    result.push({
                      title:response.data.response.results[i].webTitle,
                      url:response.data.response.results[i].webUrl,
                      id:response.data.response.results[i].id,
                      section:response.data.response.results[i].sectionId,
                      abstract:response.data.response.results[i].blocks.body[0].bodyTextSummary,
                      published_date:response.data.response.results[i].webPublicationDate,
                      multimedia:multimedia_img,
                      channel:"ny"
                    })

                  }
                }
                }
              }
               //console.log(result)
               res.json(result);


   });
 });

 app.get('/api/latest', (req,res) =>
 {
   // console.log(req.query.web_url)
   //let web=req.query.web_url
   //console.log(web)
  // var p=articleQuery();

 var authKey = "";//Enter your Guardian APPID
 var queryURL
 //https://content.guardianapis.com/search?order-by=newest&show-fields=starRating,thumbnail,short-url&api-key=0ebab295-536c-4d4f-85ea-b1a7b03a309a
 queryURL="https://content.guardianapis.com/search?order-by=newest&show-fields=starRating,headline,thumbnail,short-url&api-key=0ebab295-536c-4d4f-85ea-b1a7b03a309a";
   // if(web==="home")
   //   queryURL="https://content.guardianapis.com/search?api-key="+authKey+"&section=(sport|business|technology|politics)&show-blocks=all"
   //   else {
   //     queryURL="https://content.guardianapis.com/search?api-key="+authKey+"&section=\("+web+"\)&show-blocks=all"
   //
   //   }

 console.log(queryURL)
 axios.get(queryURL)
   .then((response) => {
      //console.log(response.data.response.results);
      var result = [];
             if (response.data.response.results!=undefined) {

               for(var i=0; i<response.data.response.results.length; i++){
                 if(response.data.response.results[i].webTitle!=undefined&&response.data.response.results[i].webTitle.length!=0&&
                 response.data.response.results[i].webUrl!=undefined&&response.data.response.results[i].webUrl.length!=0&&
               response.data.response.results[i].id!=undefined&&response.data.response.results[i].id.length!=0&&
             response.data.response.results[i].sectionId!=undefined&&response.data.response.results[i].sectionId.length!=0&&
           response.data.response.results[i].webPublicationDate!=undefined&&response.data.response.results[i].webPublicationDate.length!=0
         ){

                   // Otherwise, push to results array
                   // result.push(response.data.response.results[i]);
                   var multimedia_img=[]
                   var by_def="https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png"
                   var store=response.data.response.results[i]
                   var st=undefined
                   if(store!=undefined&&store.fields!=undefined&&store.fields.thumbnail!=undefined)
                   {
                     //len=store.blocks.main.elements[0].assets.length
                     st=store.fields.thumbnail

                   }
                   if(st!=undefined&&st.length!=0)
                   multimedia_img.push({url:st})
                   else
                   multimedia_img.push({url:by_def})

                   result.push({
                     title:response.data.response.results[i].webTitle,
                     url:response.data.response.results[i].webUrl,
                     id:response.data.response.results[i].id,
                     section:response.data.response.results[i].sectionId,
                     abstract:"",
                     published_date:response.data.response.results[i].webPublicationDate,
                     multimedia:multimedia_img,
                     channel:"guard"
                   })


               }
               }
             }
              res.json(result);


  });
 });
 app.get('/api/article/guard', (req,res) =>
 {
   let web=req.query.web_url
   console.log(web)
 var authKey = "";//Enter your Guardian APPID
 var queryURL="https://content.guardianapis.com/"+web+"?api-key="+authKey+"&show-blocks=all"
 console.log(queryURL)
 axios.get(queryURL)
   .then((response) => {
      var result = [];

            if (response.data.response.content!=undefined) {
                  var multimedia_img=[]

                  var by_def="https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png"
                  var store=response.data.response.content
                  var st=undefined
                  if(store!=undefined&&store.blocks!=undefined&&store.blocks.main!=undefined&&store.blocks.main.elements!=undefined&&store.blocks.main.elements.length!=0&&store.blocks.main.elements[0].assets!=undefined&&store.blocks.main.elements[0].assets.length!=0)
                  {
                    len=store.blocks.main.elements[0].assets.length
                    st=store.blocks.main.elements[0].assets[len-1].file

                  }
                  if(st!=undefined&&st.length!=0)
                  multimedia_img.push({url:st})
                  else
                  multimedia_img.push({url:by_def})
                  var abs="";
                  if(response.data.response.content.blocks.body!=undefined)
                  {
                    for(i=0;i<response.data.response.content.blocks.body.length;i++)
                      { if(response.data.response.content.blocks.body[i].bodyHtml!=undefined)
                        abs=abs+response.data.response.content.blocks.body[i].bodyHtml
                      }
                  }

                  var title={main:response.data.response.content.webTitle}
                  result.push(
                    {
                        web_url:response.data.response.content.webUrl,
                        id:response.data.response.content.id,
                        pub_date:response.data.response.content.webPublicationDate,
                        multimedia:multimedia_img,
                        abstract:abs,
						headline:title,
                        channel:"guard",
                        section:response.data.response.content.sectionId
                    }
                  )
            }
     res.json(result);
   });


  });



   app.get('/api/search/ny', (req,res) =>
   {
     let web=req.query.web_url
     console.log(web)

              var authKey_ny="";//Enter your NYTimes APPID
              var queryURL_ny = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q="+web+"&api-key="+ authKey_ny
              console.log(queryURL_ny)

              axios.get(queryURL_ny)
                .then((response) => {
                   //console.log(response);
                   var result1 = [];
                         if (response.data.response.docs!=undefined) {

                           for(var i=0; i<response.data.response.docs.length; i++){
                             // Break out of the loop if there are more than 5 entries
                             if(response.data.response.docs[i].web_url!=undefined&&response.data.response.docs[i].web_url.length!=0&&
                             response.data.response.docs[i].pub_date!=undefined&&response.data.response.docs[i].pub_date.length!=0&&
                           response.data.response.docs[i].abstract!=undefined&&response.data.response.docs[i].abstract.length!=0&&
                         response.data.response.docs[i].headline!=undefined&&response.data.response.docs[i].headline.main!=undefined&&response.data.response.docs[i].headline.main.length!=0&&
                       response.data.response.docs[i].news_desk!=undefined&&response.data.response.docs[i].news_desk.length!=0){
                             if(i==10)
                             break
                             var multimedia_img=[]
                             var all_imgs=response.data.response.docs[i].multimedia
                             var j,store="https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg"
                             if(all_imgs!=undefined){
                             var len=all_imgs.length
                             for(j=0;j<len;j++)
                             {
                               if(all_imgs[j].width>=2000)
                               {
                                 store='https://www.nytimes.com/'+all_imgs[j].url
                                 break;
                               }
                             }
                           }
                             multimedia_img.push({url:store})
                             var title={main:response.data.response.docs[i].headline.main}
                             result1.push(
                               {
                                   web_url:response.data.response.docs[i].web_url,
                                   id:response.data.response.docs[i].web_url,
                                   published_date:response.data.response.docs[i].pub_date,
                                   multimedia:multimedia_img,
                                   abstract:response.data.response.docs[i].abstract,
                                   title:response.data.response.docs[i].headline.main,
                                   channel:'ny',
                                   section:response.data.response.docs[i].news_desk


                               }
                             )

                           }
                         }

                       }

                    console.log(result1)
                    res.json(result1)
     });



  });




  app.get('/api/search/guard', (req,res) =>
  {
    let web=req.query.web_url
    console.log(web)
    var authKey_guard = "";////Enter your Guardian APPID
    var result = [];
    var queryURL_guard="https://content.guardianapis.com/search?q="+web+"&api-key="+authKey_guard+"&show-blocks=all"
    console.log(queryURL_guard)
  axios.get(queryURL_guard)
    .then((response) => {
             if (response.data.response.results!=undefined) {

                   for(var i=0; i<response.data.response.results.length; i++){
                     if(response.data.response.results[i].webTitle!=undefined&&response.data.response.results[i].webTitle.length!=0&&
                     response.data.response.results[i].webUrl!=undefined&&response.data.response.results[i].webUrl.length!=0&&
                   response.data.response.results[i].id!=undefined&&response.data.response.results[i].id.length!=0&&
                 response.data.response.results[i].sectionId!=undefined&&response.data.response.results[i].sectionId.length!=0&&
               response.data.response.results[i].webPublicationDate!=undefined&&response.data.response.results[i].webPublicationDate.length!=0&&
             response.data.response.results[i].blocks!=undefined&&response.data.response.results[i].blocks.body!=undefined&&response.data.response.results[i].blocks.body.length!=0
           &&response.data.response.results[i].blocks.body[0].bodyTextSummary!=undefined&&response.data.response.results[i].blocks.body[0].bodyTextSummary.length!=0){
                       if(i==10)
                       break
                       var multimedia_img=[]
                       var by_def="https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png"
                       var store=response.data.response.results[i]
                       var st=undefined
                       if(store!=undefined&&store.blocks!=undefined&&store.blocks.main!=undefined&&store.blocks.main.elements!=undefined&&store.blocks.main.elements.length!=0&&store.blocks.main.elements[0].assets!=undefined&&store.blocks.main.elements[0].assets.length!=0)
                       {
                         len=store.blocks.main.elements[0].assets.length
                         st=store.blocks.main.elements[0].assets[len-1].file

                       }

                       if(st!=undefined&&st.length!=0)
                       multimedia_img.push({url:st})
                       else
                       multimedia_img.push({url:by_def})

                       result.push({
                         title:response.data.response.results[i].webTitle,
                         web_url:response.data.response.results[i].webUrl,
                         section:response.data.response.results[i].sectionId,
                         abstract:response.data.response.results[i].blocks.body[0].bodyTextSummary,
                         published_date:response.data.response.results[i].webPublicationDate,
                         multimedia:multimedia_img,
                         channel:"guard",
                         id:response.data.response.results[i].id
                       })

                     }
                   }
             }

                                 res.json(result)
             });

 });

const port = process.env.PORT || 5000;

app.listen(port,() => console.log(`Server started on {$port}`));
