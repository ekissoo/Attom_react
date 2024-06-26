import React,{Component} from "react";
import axios from "axios";
import { useState } from "react";
import ProductService from "../service/FormService";
import {FaCircleNotch, FaXMark} from 'react-icons/fa'
import './Form.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import CloseButton from 'react-bootstrap/CloseButton';
import pluralize, { plural } from "pluralize";

// const REST_API_URL="http://192.168.1.39:5000/";
// const REST_API_URL="http://192.168.16.226:8080";
// const REST_API_URL="http://localhost:8080";
const REST_API_URL="https://adtom.in";




export default class Form extends Component{
       
    constructor(props) {
        super(props)
        
        this.state = {
            // step 2 - We retrive productId from the route and store it in id variable. 
            id: this.props.match.params.id,
            name: '',
            brand: '',
            reqNo: 0,
            uspId: 0,
            allUsp: {},
            price: {},
            formData: {},
            offline: false,
            online: false,
            transactional: false,
            educational: false,
            loading: false ,
            locality: '',
            targetAudienceLocation: '',
            targetArea: '',
            landingPage: '',
            category: '',
            startingPrice: '',
            productKeywords: '',
            productUsp: '',
            identifierWords: '',
            uspKeyWords: '',
            all_generated_keywords: [],
            all_nGrams: [],
            all_must_haves: [],
            location_ids:[],
            addAnotherUsp: false,
            neg_keywords: {}, 
            ad_group: [],
            neg_word_inp: ''
        }

        this.saveOrUpdateProduct=this.saveOrUpdateProduct.bind(this);
        this.changeNameHandler=this.changeNameHandler.bind(this);
        this.changeStartingPriceHandler = this.changeStartingPriceHandler.bind(this);
        this.changeProductKeywordsHandler = this.changeProductKeywordsHandler.bind(this);
        this.changeCategoryHandler= this.changeCategoryHandler.bind(this);
        this.changeLandingPageHandler = this.changeLandingPageHandler.bind(this);
        this.changeProductUspHandler = this.changeProductUspHandler.bind(this);
        this.changeUspKeywordsHandler = this.changeUspKeywordsHandler.bind(this);
        this.changeIdentifierWordHandler = this.changeIdentifierWordHandler.bind(this);
        this.changetargetAudienceLocationHandler = this.changetargetAudienceLocationHandler.bind(this);
        this.changeLocalityHandler=this.changeLocalityHandler.bind(this);
        this.changeBrandHandler=this.changeBrandHandler.bind(this);
        this.changeMadeinHandler=this.changeMadeinHandler.bind(this);
        this.changePriceHandler=this.changePriceHandler.bind(this);
        this.changeNegWordHandler=this.changeNegWordHandler.bind(this);
 
    }

    // step 3 
    /*
        The componentDidMount() is executed when the component is mounted for the first time.
        In componentDidMount() method, if the id is _add then we don't do anything,
        else we retrieve Product by id using ProductService.getProductById() method:
    */
    componentDidMount(){
 
        // step 4
        // if(this.state.id === '_add'){
        //     return
        // }else{
        //     ProductService.getProductById(this.state.id).then( (response) =>{
        //         let product = response.data;
        //         this.setState({name: product.name,
        //             brand: product.brand,
        //             madein : product.madein,
        //             price:product.price
        //         });
        //     });
        // }
        return;        
    }
    
    /*
     In the saveOrUpdateEmployee () method, we check if the id is _add then we call ProductService.createProduct() method,
     which internally makes a REST API call to store product data into MySQL database.
     If id is any positive number then we call ProductService.updateProduct() method,
     which internally makes a REST API call to store updated product data into MySQL database.
    */
    
    createProduct = (product) =>
    {
        // return 0;
        let resp = axios.post(REST_API_URL + '/form', product)
        

        return resp;
    }



     


    filter = (e) =>{
        this.setState({loading: true});
        e.preventDefault();
        
        let checkboxes = document.querySelectorAll('.checkbox');
        let that = this;
        // console.log(this);
        // console.log(that);
        for( let checkboxx of checkboxes)
        {
            if(checkboxx.nodeName == "INPUT")
                continue;
            

            let cId = String(checkboxx.id)
            console.log("cId = ", cId);
            let pId = String(checkboxx.id).substring(0,2)


            let pCb = document.getElementById(pId);
            
            if(cId.length > 3 )
            {
                let s = String(checkboxx.innerHTML);
                let price = that.state.price;
                let pNw = pId + "makeNwordList";
                // console.log("pNw = "+ pNw + " cId=" + cId);
                let makeNw = document.getElementById(pId + "makeNwordList")
                if(makeNw != null)
                {
                    if( makeNw.checked == true && price[s] == 0)
                        price[s] = -1;
                    that.setState({price: price})   
                }
            }
            
            

            // console.log(checkboxx.value)
        }

        // console.log(this.state.price)


        let product = {name: this.state.name, call: 2,  brand: this.state.brand,madein:this.state.madein, price: this.state.price, uspId: this.state.uspId, allUsp: this.state.allUsp, formData: this.state.formData,
        offline: this.state.offline, online: this.state.online, locality: this.state.locality, targetAudienceLocation: this.state.targetAudienceLocation, targetArea: this.state.targetArea, 
        landingPage: this.state.landingPage,transactional:this.state.transactional, educational:this.state.educational, category: this.state.category, startingPrice: this.state.startingPrice, productKeywords: this.state.productKeywords, all_must_haves: this.state.all_must_haves,all_generated_keywords: this.state.all_generated_keywords,location_ids: this.state.location_ids ,all_must_haves: this.state.all_must_haves,all_nGrams: this.state.all_nGrams};
        console.log('product => ' + JSON.stringify(product));
        
        
        this.createProduct(product).then((response)=>{
            console.log("response = ", response)
            document.getElementById("post-form").style.display = 'none';

            let results_keywords = document.getElementById("results_keywords");
            let results_keywordsHTML = ''
            console.log(response.data)
            let k = 0
            // console.log("allUsp = ")
            // console.log(this.state.allUsp)
            for(let x of response.data['message']['all_filtered_keywords'])
            {   
                console.log(x)
                console.log(typeof(x))
                let title = '';
                if(k == 0)
                    title = 'your product';
                else
                    title = this.state.allUsp[k-1]['usp']
                k++;

                let ele = "<div><h6>Preferred keywords for " + title + ":</h6>"
                results_keywordsHTML = results_keywordsHTML + ele;

                // console.log("titile is..." + title)
                // console.log("x is.....")
                // console.log(x)
                // console.log("x type = " + typeof(x))
                ele = "<div class = 'res'>"
                results_keywordsHTML = results_keywordsHTML + ele;
                console.log("type of x")
                for(let [key, value] of Object.entries(x))
                {
                    ele = "<div id = '" + key+ "' class = 'result-box'>";
                    results_keywordsHTML = results_keywordsHTML + ele;
                    let k = 0;
                    if(key[0] != ['['])
                    {
                        ele = "<h6> Ad-Group for " + key + ":</h6>"
                        results_keywordsHTML = results_keywordsHTML + ele;
                    }
                    ele = "<div style = 'display: flex; justify-content: space-between; gap: 20px'> <div><label>Keyword<label></div>        <div><label>Volume<label></div>    </div>";
                    results_keywordsHTML = results_keywordsHTML + ele;

                    
                    for(let keyword of value)
                    {

                        let lis  = keyword.split(" (");
                        let text = keyword
                        console.log("lis = ", lis);
                        keyword = lis[0];

                        
                        if(lis.length == 2){
                            let volume = lis[1].substring(0,lis[1].length -1)
                            console.log(keyword, volume, "keyword and volume")
                            ele = "<div id = '" + text+ "' style = 'display: flex; justify-content: space-between;'>   <div class='keyword-entry'><label>" + keyword+ "</label></div>    <div class='volume-entry' ><label>" + volume+ "</label></div>    <div><button class= 'x-entry' id = '" + text+ "button'>X</button></div>   </div><div></div>" 
                            results_keywordsHTML = results_keywordsHTML + ele;
                        }
                        else {
                            let header = keyword.split(": ")[0]
                            let val = keyword.split(": ")[1]
                            console.log("header and val = " , header, val)
                            if(header == 'Max CPC')
                            {
                                ele = '<div class = "metrics_val" style = "display: flex; align-items: center;"><h6 class= "metrics">'+header+': </h6> <input type = "number" style = "margin-bottom: 8px; width: 50px; text-align: center; border: none" id = "'+key+'_max_cpc" value = "'+val+'"></div>' ;
                            }
                            else{
                                if(k == value.length -1)
                                    ele = '<h6 class= "metrics">' + keyword +"."+ '</h6>';
                                else
                                    ele = '<h6 class = "metrics">' + keyword+ '</h6>'
                                
                            }
                            results_keywordsHTML = results_keywordsHTML + ele;
                            k++;
                        }
                    }
                    ele = "<button class = 'refresh-button' id = '" + key + " refresh_button' >Refresh</button>"
                    results_keywordsHTML = results_keywordsHTML + ele;
                    ele = "</div>"
                    results_keywordsHTML = results_keywordsHTML + ele;
                }
                ele = "</div>"
                results_keywordsHTML = results_keywordsHTML + ele;
                
            }
            results_keywords.innerHTML = results_keywordsHTML;

            let negKeywords = document.getElementById("negative-keywords");
            let l = document.getElementById("makeNwordList")
            // console.log('checked =' + l.checked)
            if(l.checked)
            {
                let negKeywordsHTML = '';
                let ele = "<div id = 'neg_words_list' style = 'text-align: left;'><h6>Negative Keywords:</h6>"
                negKeywordsHTML = negKeywordsHTML + ele;
                for(let word of response.data['message']['neg_words'])
                {
                    let reElement  = "<div style = 'display:flex;justify-content: space-between'><label>" + word + "</label> <button class = 'neg_word_x'>X</button></div>";
                    negKeywordsHTML = negKeywordsHTML + reElement; 
                }
                
                
                ele = "</div>"
                negKeywordsHTML = negKeywordsHTML + ele;
                ele = "<div style = 'display: flex; align-items: center'><input style = 'width: 145px; height: 24px;' id='neg_word_input' autoComplete='off' placeholder='Enter' name='neg_word' className='form-control'>"
                negKeywordsHTML = negKeywordsHTML + ele;
                ele = "<button id = 'add_negative_keyword_button' style = 'margin-top: 0px;border: none; background-color: #ff7644; border-radius: 0px 5px 5px 0px;width: 145px; height: 24px; width: 29px; padding: 0px; outline: none'>>></button></div>"
                negKeywordsHTML = negKeywordsHTML + ele;
                ele = "<div><button id = 'recalculate-button' style = ' margin-top: 5px; margin-botton: -10px;border: none;color: white; background-color: black; border-radius: 3px; outline: none'>Re-calculate</button></div>"
                negKeywordsHTML = negKeywordsHTML + ele;
                
                
                negKeywords.innerHTML = negKeywordsHTML;
                negKeywords.style.display = 'block'
            }
            else
                negKeywords.style.display = 'none'
            // console.log(response.data)
            this.setState({loading: false});
            document.getElementById("results").style.display = 'block';
            document.getElementById("negative-keywords").style.display = 'block';
            
            let neg_word_input = document.getElementById("neg_word_input")
            neg_word_input.value = that.state.neg_word_inp
            console.log("neg_word_input.value = ", neg_word_input.value)
            neg_word_input.addEventListener('change', function(e){
                e.preventDefault();

                that.changeNegWordHandler(e);
            })

            document.getElementById("recalculate-button").addEventListener('click', function(e){
                e.preventDefault();
                this.disabled = true
                this.innerHTML = "loading..."
                that.filter(e);
                this.disabled = false;
            })

            let neg_word_x_buttons = document.querySelectorAll(".neg_word_x");
            for(let neg_word_x of neg_word_x_buttons)
            {
                neg_word_x.addEventListener('click', function(e){
                    e.preventDefault();
                    console.log("here")
                    let word = this.parentElement.firstChild.innerHTML
                    let p = that.state.price;
                    p[word] = 0;
                    that.setState({price: p})
                    this.parentElement.style.display = 'none';

                })
            }
            
            neg_word_input.addEventListener('keyup', function(e){

                e.preventDefault();
                if(e.key === "Enter")
                {
                    if(that.state.neg_word_inp != '')
                    {
                        let temp = that.state.price;
                        if(that.state.neg_word_inp in temp && temp[that.state.neg_word_inp] < 0)
                        {
                            that.setState({neg_word_inp: ''})
                        }
                        else if(that.state.neg_word_inp in temp && temp[that.state.neg_word_inp] > 0)
                        {
                            let inp = document.getElementById("neg_word_input")
                            inp.style.borderColor = 'red';
                            that.setState({neg_word_inp: ''})
                            inp.placeholder = 'Word contains ad-group theme'
                        }
                        else{
                            temp[that.state.neg_word_inp] = -1
                            document.getElementById("neg_words_list").innerHTML = document.getElementById("neg_words_list").innerHTML +  "<div style = 'display:flex;justify-content: space-between'><label>" + that.state.neg_word_inp + "</label> <button class = 'neg_word_x'>X</button></div>";
                            that.setState({neg_word_inp: ''})
                        }
                        let inp = document.getElementById("neg_word_input")
                        inp.style.borderColor = 'black';
                    }
                    else{
                        let inp = document.getElementById("neg_word_input")
                        inp.style.borderColor = 'red';
                        inp.placeholder = 'Enter a word'
                    }
                    console.log(that.state.price)
                }
                let neg_word_x_buttons = document.querySelectorAll(".neg_word_x");
                for(let neg_word_x of neg_word_x_buttons)
                {
                    neg_word_x.addEventListener('click', function(e){
                        e.preventDefault();
                        console.log("here")
                        let word = this.parentElement.firstChild.innerHTML
                        let p = that.state.price;
                        p[word] = 0;
                        that.setState({price: p})
                        this.parentElement.style.display = 'none';

                    })
                }
            })



            let add_neg_word_button = document.getElementById("add_negative_keyword_button");
            add_neg_word_button.addEventListener('click', function(e){
                e.preventDefault();
                if(that.state.neg_word_inp != '')
                {
                    let temp = that.state.price;
                    if(that.state.neg_word_inp in temp && temp[that.state.neg_word_inp] > 0)
                    {
                        that.setState({neg_word_inp: ''})
                    }
                    else{
                        temp[that.state.neg_word_inp] = -1
                        document.getElementById("neg_words_list").innerHTML = document.getElementById("neg_words_list").innerHTML +  "<div display= 'flex' style = 'justify-content: space-between'><label>" + that.state.neg_word_inp + "</label> <button class = 'neg_word_x'>X</button></div>";
                        that.setState({neg_word_inp: ''})
                    }
                    let inp = document.getElementById("neg_word_input")
                    inp.style.borderColor = 'black';
                }
                else{
                    let inp = document.getElementById("neg_word_input")
                    inp.style.borderColor = 'red';
                    inp.placeholder = 'Enter a word'
                }
                let neg_word_x_buttons = document.querySelectorAll(".neg_word_x");
                for(let neg_word_x of neg_word_x_buttons)
                {
                    neg_word_x.addEventListener('click', function(e){
                        e.preventDefault();
                        console.log("here")
                        let word = this.parentElement.firstChild.innerHTML
                        let p = that.state.price;
                        p[word] = 0;
                        that.setState({price: p})
                        this.parentElement.style.display = 'none';

                    })
                }
            })


            let x_buttons = document.querySelectorAll('.x-entry');
            console.log("here", x_buttons)

            for(let x_button of x_buttons)
            {
                console.log(x_button)
                x_button.addEventListener('click', function(e){
                    e.preventDefault();
                    let keyword = this.id.substring(0, this.id.length-6)
                    keyword = keyword.split(" (")[0]
                    console.log(keyword)
                    let temp = that.state.neg_keywords;
                    if(this.style.color != 'red')
                    {
                        temp[keyword] = -1;
                        this.style.color = 'red';
                        
                    }
                    else
                    {
                        temp[keyword] = 1;
                        this.style.color = 'black';

                    }
                    that.setState({neg_keywords: temp})
                    console.log(that.state.neg_keywords);
                });
            }

            let refresh_buttons = document.querySelectorAll('.refresh-button')
            console.log("here", refresh_buttons)
            for(let refresh_button of refresh_buttons)
            {
                console.log(refresh_button)
                refresh_button.addEventListener('click', function(e){
                    this.innerHTML = 'loading...'
                    e.preventDefault();
                    let boxId = this.id.substring(0,this.id.length - 15)
                    console.log(document.getElementById(boxId));
                    let res_box = document.getElementById(boxId);

                    console.log("resbox = ",res_box)
                    let keywords = []
                    for (let child of res_box.childNodes)
                    {
                        if(child.id && child.id.includes('refresh_button') == false)
                        {
                            let temp = that.state.neg_keywords;
                            let key = child.id.split(" (")[0];

                            if(key in temp && temp[key] < 0)
                                continue;
                            keywords.push(key)
                        }
                    }
                    console.log("keywords = ", keywords);

                    if(keywords.length == 0)
                        return
                    let max_cpc = document.getElementById(boxId+"_max_cpc")
                    max_cpc = max_cpc.value
                    console.log("max_cpc = ", max_cpc)
                    let product = {max_cpc: max_cpc, name: that.state.name, call: 3, brand: that.state.brand,madein:that.state.madein, price: that.state.price, uspId: that.state.uspId, allUsp: that.state.allUsp, formData: that.state.formData,
                    offline: that.state.offline, online: that.state.online, locality: that.state.locality, targetAudienceLocation: that.state.targetAudienceLocation, targetArea: that.state.targetArea, 
                    landingPage: that.state.landingPage,transactional:that.state.transactional, educational:that.state.educational, category: that.state.category, startingPrice: that.state.startingPrice, productKeywords: that.state.productKeywords, ad_group: keywords};
                    console.log('product => ' + JSON.stringify(product));


                    let that_one = this;

                    that.createProduct(product).then((response)=>{
                        console.log(response)
                        let metrics = response.data.message.forecast_metrics;
                        console.log("metrics = ", metrics)
                        console.log("resbox = ", res_box.childNodes)
                        let i = 0;
                        for (let child of res_box.childNodes)
                        {
                            if(child.id && child.id.includes('refresh_button') == false)
                            {
                                let temp = that.state.neg_keywords;
                                let key = child.id.split(" (")[0];

                                if(key in temp && temp[key] < 0)
                                    child.outerHTML = '';
                            }
                            else if(child.className == 'metrics')
                            {
                                console.log(child)
                                child.innerHTML = metrics[i];
                                i++;
                            } 
                            else if(child.className == 'metrics_val')
                            {
                                let header = metrics[i].split(": ")[0]
                                let val = metrics[i].split(": ")[1]

                                child.childNodes[2].value = val;
                                i++;
                            }  
                        }
                        that_one.innerHTML = 'Refresh'
                    })

                   
                })
            }


            
        }).catch((e) =>{
            this.setState({loading: false})
            document.getElementById("error3").innerHTML = "<label style = {{color: 'red'}}>Retry in 30secs</label>";
            document.getElementById("error3").style.gridTemplateRows = '1fr';
            
            console.log("Network error")
        });

        
        
    }

    
    updateGeneralInfo = (p) =>{
        
        p.preventDefault();
        // console.log(this.state.targetArea);
        // console.log(this.state.locality);
        // console.log(this.state.targetAudienceLocation);

        let preForm = document.getElementById("second-form");
        preForm.style.display = 'block';
        document.getElementById("first-form").style.display = 'none';
        this.setState({loading: false})
    }


    updateProductInfo = (p) =>{
        // this.setState({loading: true});
        p.preventDefault();
        // console.log(this.state.name);
        // console.log(this.state.productKeywords);
        // console.log(this.state.category);
        // console.log(this.state.landingPage);
        // console.log(this.state.startingPrice);

        

        if(this.state.productKeywords == '')
        {
            let err = document.getElementById("error");
            err.firstChild.innerHTML = "Please enter keywords"
            err.style.gridTemplateRows = '1fr';

            let box = document.getElementById("productKeywordsInput")
            box.style.borderColor = 'red';
            return
        }
        let uspForm = document.getElementById("usp-form");
        let temp = this.state.price;
        let n =0 
        let flag = false;
        console.log(temp)
        let must_haves = {}
        for(p in temp) 
        {
            n++;
            console.log(temp[p])
            let word_val = temp[p];
            if(word_val > 0)
            {
                if(word_val in must_haves)
                    must_haves[word_val].push(" " + p)
                else
                    must_haves[word_val] = [p];
                flag = true;
            }
            
        }
        if(n == 0)
        {

            document.getElementById("parseButton1").style.boxShadow = '0px 0px 0px 2px red';
            document.getElementById("error").firstChild.innerHTML = "Please submit";
            document.getElementById("error").style.gridTemplateRows = '1fr'
            return 
        }
        
        if(flag == false)
        {
            let err = document.getElementById("error");
            err.firstChild.innerHTML = 'Please select campaign words';
            err.style.gridTemplateRows = '1fr';
            return;
        }

        console.log(must_haves)
        let must_have = ''
        for(let x in must_haves)
        {
            
            let must = must_haves[x];
            console.log("must= ",must)
            let temp = '['
            for(let i = 0 ;i < must.length;i++)
            {
                let word = must[i];
                word = word.replace('-', ' ')
                console.log("singular = ", pluralize.singular(word))
                console.log("plural = ", pluralize.plural(word));
                temp = temp + pluralize.singular(word);
                temp = temp + ', ';
                temp = temp + pluralize.plural(word);
                if(i != must.length -1)
                    temp = temp + ', '

            }
            temp = temp + ']'
            must_have = must_have + temp;
            console.log(temp);

        }
        console.log("must_have", must_have)
        let temp2 = this.state.price;
        temp2 = {};
        this.setState({price: temp2});
        this.setState({name: must_have})
        document.getElementById("parseButton1").style.boxShadow = 'none';

        uspForm.style.display = 'block';
        document.getElementById("second-form").style.display = 'none';
        document.getElementById("parse").innerHTML = '<div></div>'
        document.getElementById("parse").style.gridTemplateRows = '0fr'
        document.getElementById("error").innerHTML = '<label></label>'
        document.getElementById("error").style.gridTemplateRows = '0fr'
        document.getElementById("productKeywordsInput").style.borderColor = '1px solid #ced4da'


        this.setState({loading: false});
    }


    saveOrUpdateProduct = (p) => {
        this.setState({loading: true});
        
        p.preventDefault();
        if(this.state.productUsp == '' && this.state.uspKeyWords != '')
        {
            let err = document.getElementById("error2");
            err.firstChild.innerHTML = "Please enter productUSP"
            err.style.gridTemplateRows = '1fr';

            let box = document.getElementById("productUsp")
            box.style.borderColor = 'red';
            return
        }
        if(this.state.uspKeyWords == '' && this.state.productUsp != '')
        {
            let err = document.getElementById("error2");
            err.firstChild.innerHTML = "Please enter keywords"
            err.style.gridTemplateRows = '1fr';

            let box = document.getElementById("uspKeywords")
            box.style.borderColor = 'red';
            return
        }
        let temp = this.state.price;
        let n = 0;
        let flag = false;
        console.log(temp);
        let must_haves = {}
        for(p in temp)
        {
            n++;
            console.log(temp[p])
            let word_val = temp[p];
            if(word_val> 0)
            {
                if(word_val in must_haves)
                    must_haves[word_val].push(" " + p)
                else   
                    must_haves[word_val] = [p];
                flag = true
            }
        }

        if(n == 0 && this.state.uspKeyWords != '')
        {
            document.getElementById("parseButton2").style.boxShadow = '0px 0px 0px 2px red';
            document.getElementById("error2").firstChild.innerHTML = "Please submit";
            document.getElementById("error2").style.gridTemplateRows = '1fr'
            return 
        }
        if(flag == false && n != 0)
        {
            let err = document.getElementById("error2");
            err.firstChild.innerHTML = 'Please select campaign words';
            err.style.gridTemplateRows = '1fr';
            return;
        }

        console.log(must_haves)
        let must_have = ''
        for(let x in must_haves)
        {
            
            let must = must_haves[x];
            console.log("must= ",must)
            let temp = '['
            for(let i = 0 ;i < must.length;i++)
            {
                let word = must[i];
                word = word.replace('-', ' ')
                console.log("singular = ", pluralize.singular(word))
                console.log("plural = ", pluralize.plural(word));
                temp = temp + pluralize.singular(word);
                temp = temp + ', ';
                temp = temp + pluralize.plural(word);
                if(i != must.length -1)
                    temp = temp + ', '

            }
            temp = temp + ']'
            must_have = must_have + temp;
            console.log(temp);

        }
        console.log(this.state)

        console.log("must_have", must_have)
        let temp3 = this.state.price;
        temp3 = {};

        this.setState({price: temp3});
        this.setState({identifierWords: must_have})

        for(let x  in this.state.price)
        {
            delete this.state.price[x]
        }
        for (let c of must_have)
        {
            this.state.identifierWords = this.state.identifierWords + c
        }
        console.log("-------")
        console.log(temp3)
        console.log(this.state.identifierWords)
        console.log(this.state.price)
        console.log(this.state)


        document.getElementById("parseButton2").style.boxShadow = 'none';

        document.getElementById("parse2").innerHTML = '<div></div>'
        document.getElementById("parse2").style.gridTemplateRows = '0fr'
        document.getElementById("error2").innerHTML = '<label></label>'
        // document.getElementById("error2").style.gridTemplateRows = '0fr'
        document.getElementById("uspKeywords").style.borderColor = '1px solid #ced4da'

        
        if(this.state.productUsp != '')
        {
            let au = this.state.allUsp;
            let temp = {};
            temp['usp'] = this.state.productUsp;
            temp['identifierWords'] = this.state.identifierWords;
            temp['uspKeyWords'] = this.state.uspKeyWords;

            console.log("tmep = ", temp)
            au[this.state.uspId] = temp;
            this.state.uspId++;
            this.setState({productUsp: ''});
            this.setState({identifierWords: ''});
            this.setState({uspKeyWords: ''});
            this.setState({allUsp: au});
        }

        if(this.state.addAnotherUsp == true)
            return;

        let product = {name: this.state.name, call: 1, brand: this.state.brand,madein:this.state.madein, price: this.state.price, uspId: this.state.uspId, allUsp: this.state.allUsp, formData: this.state.formData,
        offline: this.state.offline, online: this.state.online, locality: this.state.locality, targetAudienceLocation: this.state.targetAudienceLocation, targetArea: this.state.targetArea, 
        landingPage: this.state.landingPage,transactional:this.state.transactional, educational:this.state.educational, category: this.state.category, startingPrice: this.state.startingPrice, productKeywords: this.state.productKeywords};
        console.log('product => ' + JSON.stringify(product));

        try{this.createProduct(product).then((response)=>{
            // return;
            // console.log(response.data['message'][0]);
            console.log(response);
            if(response.message == 'Network Error')
            {
                console.log("error");
                throw response
            }
            this.setState({loading: false});
            // this.setState({all_generated_keywords: response.data['message'][8]})
            let o = response.data['message']['all_generated_keywords'];
            let temp = this.state.all_generated_keywords
            for(let i = 0;i < o.length;i++)
            {
                temp.push(o[i])
            }
            this.setState({all_generated_keywords: temp})
            console.log("all_generated_keywords = ", this.state.all_generated_keywords)

            // set location_ids
            let o4 = response.data['message']['location_ids'];
            let temp4 = this.state.location_ids
            for(let i = 0 ;i<o4.length;i++)
                temp4.push(o4[i])
            this.setState({location_ids: temp4})
            

            // set all_must_haves
            // console.log("temp = ", temp)


            let o3 = response.data['message']['all_must_haves'];
            let temp3 = this.state.all_must_haves
            for(let i = 0;i < o.length;i++)
            {
                temp3.push(o3[i])
            }
            // console.log("temp = ", temp)
            this.setState({all_must_haves: temp3})

            // let o2 = response.data['message']['all_nGrams'];
            // let temp2 = this.state.all_nGrams
            // for(let i = 0;i < o2.length;i++)
            // {
            //     temp2.push(o2[i])
            // }
            
            // this.setState({all_nGrams: temp2})
            // console.log("allNG=")
            // console.log(this.state.all_generated_keywrods)
            // document.getElementById("second-form").remove();

            


            // let applications = document.getElementById("applications");
            // let applicationsHTML = '';
            // let id = 1;
            // for(let x of response.data['message'][5])
            // {  
            //     let price = this.state.price;
            //     price[x] = 0;
            //     this.setState({price: price});
            //     let delButton = '<div style = "postion: absolute;" class = "delButtonContainer"><button id="delre' + x+ '" class = " delButton"><span class = "delButtonLabel2">-</span></button></div>'
            //     // let addButton = '<div style = "postion: absolute;" class = "delButtonContainer"><button class = " delButton"><span class = "delButtonLabel2">-</span></button></div>'
            //     // console.log(delButton)

            //     let reElement  = "<div style = 'display: flex;' id = '" + id + "' class = 'drop_container'><div style = 'display: flex; position: relative;' > <input style='opacity:0; position:absolute; left:0px;'  type = 'checkbox' value ='" + x + "' className = 'checkbox '   autocomplete = 'off' id = 're" + x + "'/> \n  <label draggable = 'true' id = 're+" + x + "'class = ' drag_container checkbox btn btn-primary labels' for = 're" + x+ "'>" + x +"</label>"+ delButton+"</div></div>\n ";
            //     id++;
            //     applicationsHTML = applicationsHTML + reElement;
            // }
            // applications.innerHTML = applicationsHTML;

            let must_haves = document.getElementById("must_haves");
            let must_havesHTML = '<div>';
            let id = 5001;
            console.log(response.data['message']['all_keywords'])
            let mul = 1
            // for(let x  in response.data['message']['all_keywords_order'])
            // {   
                
            //     let cam_word = response.data['message']['all_keywords_order'][x]
            //     let camElement = '<h6>' + cam_word + ':</h6><div style = "display: flex; max-width: 100%; flex-wrap: wrap; gap: 5px; margin: 5px 0px 5px 0px">';
            //     must_havesHTML = must_havesHTML + camElement;
            //     for(let x of response.data['message']['all_keywords'][cam_word])
            //     {  
            //         let price = this.state.price;
            //         price[x] = 0;
            //         this.setState({price: price});
            //         let delButton = '<div style = "postion: absolute;" class = "delButtonContainer"><button id="delre' + x+ '" class = " delButton"><span class = "delButtonLabel2">-</span></button></div>'
            //         // let addButton = '<div style = "postion: absolute;" class = "delButtonContainer"><button class = " delButton"><span class = "delButtonLabel2">-</span></button></div>'
            //         // console.log(delButton)

            //         let reElement  = "<div style = 'display: flex;' id = '" + id + "' class = 'drop_container'><div style = 'display: flex; position: relative;' > <input style='opacity:0; position:absolute; left:0px;'  type = 'checkbox' value ='" + x + "' className = 'checkbox '   autocomplete = 'off' id = 're" + x + "'/> \n  <label draggable = 'true' id = 're+" + x + "'class = ' drag_container checkbox btn btn-primary labels' for = 're" + x+ "'>" + x +"</label>"+ delButton+"</div></div>\n ";
            //         id++;
            //         must_havesHTML = must_havesHTML + reElement;

            //     }
            //     must_havesHTML = must_havesHTML + '</div>';
            //     id = 5001 + mul*1000
            //     mul+=1;
            // }
            // must_havesHTML = must_havesHTML + '</div>';
                
            // must_haves.innerHTML = must_havesHTML;




            let applications = document.getElementById("applications");
            let applicationsHTML = '<div>';
            id = 1;
            
            for(let head  in response.data['message']['headers'])
            {   
                console.log("Head and message[head] => ");
                console.log(head);
                console.log(typeof(response.data['message']['headers'][head]))
                console.log(response.data['message']['headers'][head]);
                let headerElement = '<h6>' + head + ':</h6><div style = "display: flex; max-width: 100%; flex-wrap: wrap; gap: 5px; margin: 5px 0px 5px 0px">';
                applicationsHTML = applicationsHTML + headerElement;
                for(let x of response.data['message']['headers'][head])
                {  
                    let price = this.state.price;
                    price[x] = 0;
                    this.setState({price: price});
                    let delButton = '<div style = "postion: absolute;" class = "delButtonContainer"><button id="delre' + x+ '" class = " delButton"><span class = "delButtonLabel2">-</span></button></div>'
                    // let addButton = '<div style = "postion: absolute;" class = "delButtonContainer"><button class = " delButton"><span class = "delButtonLabel2">-</span></button></div>'
                    // console.log(delButton)

                    let reElement  = "<div style = 'display: flex;' id = '" + id + "' class = 'drop_container'><div style = 'display: flex; position: relative;' > <input style='opacity:0; position:absolute; left:0px;'  type = 'checkbox' value ='" + x + "' className = 'checkbox '   autocomplete = 'off' id = 're" + x + "'/> \n  <label draggable = 'true' id = 're+" + x + "'class = ' drag_container checkbox btn btn-primary labels' for = 're" + x+ "'>" + x +"</label>"+ delButton+"</div></div>\n ";
                    id++;
                    applicationsHTML = applicationsHTML + reElement;

                }
                applicationsHTML = applicationsHTML + '</div>';

            }
            applicationsHTML = applicationsHTML + '</div>';
                
            applications.innerHTML = applicationsHTML;

            
            // let materialTypes = document.getElementById("materialType");
            // let materialTypesHTML = '';
            // for(let x of response.data['message'][1])
            // {  
            //     let price = this.state.price;
            //     price[x] = 0;
            //     this.setState({price: price});
            //     let delButton = '<div style = "postion: absolute;" class = "delButtonContainer"><button id="delpr' + x+ '" class = " delButton"><span class = "delButtonLabel2">-</span></button></div>'

            //     let prElement  = "<div style = 'display: flex;' id = '" + id + "' class = 'drop_container'><div style = 'display: flex; position: relative;' > <input style='opacity:0; position:absolute; left:0px;'  type = 'checkbox' value ='" + x + "' className = 'checkbox '   autocomplete = 'off' id = 'pr" + x + "'/> \n  <label draggable = 'true'  id = 'pr+" + x + "'class = ' drag_container checkbox btn btn-primary labels' for = 'pr" + x+ "'>" + x +"</label>"+ delButton+"</div></div>\n";
            //     id++;
            //     // let prElement  = "<input style='opacity:0; position:absolute; left:0px;'  type = 'checkbox' value ='" + x + "' className = 'checkbox ' checked  autocomplete = 'off' id = 'pr" + x + "'/> \n  <label id = 'pr+" + x + "' class = ' checkbox btn btn-primary labels' for = 'pr" + x+ "'>" + x + "</label> \n";
            //     materialTypesHTML = materialTypesHTML + prElement;
            // }
            // materialTypes.innerHTML = materialTypesHTML;



            // let designs = document.getElementById("designs");
            // let designsHTML = '';
            // for(let x of response.data['message'][3])
            // {  
            //     let price = this.state.price;
            //     price[x] = 0;
            //     this.setState({price: price});
            //     let delButton = '<div style = "postion: absolute;" class = "delButtonContainer"><button id="delde' + x+ '" class = " delButton"><span class = "delButtonLabel2">-</span></button></div>'
            //     let deElement  = "<div style = 'display: flex;' id = '" + id + "' class = 'drop_container'><div style = 'display: flex; position: relative;' > <input style='opacity:0; position:absolute; left:0px;'  type = 'checkbox' value ='" + x + "' className = 'checkbox '   autocomplete = 'off' id = 'de" + x + "'/> \n  <label draggable = 'true' id  = 'de+" + x + "'class = '  drag_container  checkbox btn btn-primary labels' for = 'de" + x+ "'>" + x +"</label>"+ delButton+"</div></div>\n ";
            //     id++;
                
            //     // let deElement  = "<input style='opacity:0; position:absolute; left:0px;'  type = 'checkbox' value ='" + x + "' className = 'checkbox ' checked   autocomplete = 'off' id = 'de" + x + "'/> \n  <label id = 'de+" + x + "' class = ' checkbox btn btn-primary labels' for = 'de" + x+ "'>" + x + "</label> \n";
            //     designsHTML = designsHTML + deElement;
            // }
            // designs.innerHTML = designsHTML;



            // let services = document.getElementById("services");
            // let servicesHTML = '';
            // for(let x of response.data['message'][4])
            // {  
            //     let price = this.state.price;
            //     price[x] = 0;
            //     this.setState({price: price});
            //     let delButton = '<div style = "postion: absolute;" class = "delButtonContainer"><button id="delse' + x+ '" class = " delButton"><span class = "delButtonLabel2">-</span></button></div>'
            //     let seElement  = "<div style = 'display: flex;' id = '" + id + "' class = 'drop_container'><div style = 'display: flex; position: relative;' > <input style='opacity:0; position:absolute; left:0px;'  type = 'checkbox' value ='" + x + "' className = 'checkbox '   autocomplete = 'off' id = 'se" + x + "'/> \n  <label draggable = 'true' id = 'se+" + x + "'class = '  drag_container  checkbox btn btn-primary labels' for = 'se" + x+ "'>" + x +"</label>"+ delButton+"</div></div>\n ";
            //     id++;
                
            //     // let seElement  = "<input style='opacity:0; position:absolute; left:0px;'  type = 'checkbox' value ='" + x + "' className = 'checkbox ' checked  autocomplete = 'off' id = 'se" + x + "'/> \n  <label id = 'se+" + x + "' class = ' checkbox btn btn-primary labels' for = 'se" + x+ "'>" + x + "</label> \n";
            //     servicesHTML = servicesHTML + seElement;
            // }
            // services.innerHTML = servicesHTML;

            

            // let productType = document.getElementById("productType");
            // let productTypeHTML = '';
            // for(let x of response.data['message'][2])
            // {  
            //     let price = this.state.price;
            //     price[x] = 0;
            //     this.setState({price: price});
            
            //     let delButton = '<div style = "postion: absolute;" class = "delButtonContainer"><button id="delpl' + x+ '" class = " delButton"><span class = "delButtonLabel2">-</span></button></div>'
            
            //     let plElement  = "<div style = 'display: flex;' id = '" + id + "' class = 'drop_container'><div style = 'display: flex; position: relative;' > <input style='opacity:0; position:absolute; left:0px;'  type = 'checkbox' value ='" + x + "' className = 'checkbox '   autocomplete = 'off' id = 'pl" + x + "'/> \n  <label draggable = 'true' id = 'pl+" + x + "'class = ' drag_container  checkbox btn btn-primary labels' for = 'pl" + x+ "'>" + x +"</label>"+ delButton+"</div></div>\n ";
            //     id++;
                
            //     // let plElement  = "<input style='opacity:0; position:absolute; left:0px;'  type = 'checkbox' value ='" + x + "' className = 'checkbox ' checked  autocomplete = 'off' id = 'pl" + x + "'/> \n  <label id = 'pl+" + x + "' class = ' checkbox btn btn-primary labels' for = 'pl" + x+ "'>" + x + "</label> \n";
            //     productTypeHTML = productTypeHTML + plElement;
    
            // }
            // productType.innerHTML = productTypeHTML;

            // let extra = document.getElementById("extra");
            // let extraHTML = '';
            // for(let x of response.data['message'][7])
            // {  
            //     let price = this.state.price;
            //     price[x] = 0;
            //     this.setState({price: price});
            //     // extraHTML = extraHTML + '<div style = "width: auto; height: auto; border: 2px solid black; text-align: center" draggable class = "drag_container">';
            //     let delButton = '<div style = "postion: absolute;" class = "delButtonContainer"><button id="delex' + x+ '" class = " delButton"><span class = "delButtonLabel2">-</span></button></div>'
            //     let exElement  = "<div style = 'display: flex;' id = '" + id + "' class = 'drop_container'><div style = 'display: flex; position: relative;' > <input style='opacity:0; position:absolute; left:0px;'  type = 'checkbox' value ='" + x + "' className = 'checkbox '   autocomplete = 'off' id = 'ex" + x + "'/> \n  <label draggable = 'true' id = 'ex+" + x + "'class = ' drag_container checkbox btn btn-primary labels' for = 'ex" + x+ "'>" + x +"</label>"+ delButton+"</div></div>\n ";
            //     id++;
            //     // let plElement  = "<input style='opacity:0; position:absolute; left:0px;'  type = 'checkbox' value ='" + x + "' className = 'checkbox ' checked  autocomplete = 'off' id = 'pl" + x + "'/> \n  <label id = 'pl+" + x + "' class = ' checkbox btn btn-primary labels' for = 'pl" + x+ "'>" + x + "</label> \n";
            //     extraHTML = extraHTML + exElement;
            // }
            // extra.innerHTML = extraHTML;

            // let company = document.getElementById("company");
            // let companyHTML = '';
            // for(let x of response.data['message'][6])
            // {  
            //     let price = this.state.price;
            //     price[x] = 0;
            //     this.setState({price: price});
            //     let delButton = '<div style = "postion: absolute;" class = "delButtonContainer"><button id="delco' + x+ '" class = " delButton"><span class = "delButtonLabel2">-</span></button></div>'
            //     let coElement  = "<div style = 'display: flex;' id = '" + id + "' class = 'drop_container'><div style = 'display: flex; position: relative;' > <input style='opacity:0; position:absolute; left:0px;'  type = 'checkbox' value ='" + x + "' className = 'checkbox '   autocomplete = 'off' id = 'co" + x + "'/> \n  <label  draggable = 'true' id = 'co+" + x + "'class = ' drag_container  checkbox btn btn-primary labels' for = 'co" + x+ "'>" + x +"</label>"+ delButton+"</div></div>\n ";
            //     id++;
            //     // let plElement  = "<input style='opacity:0; position:absolute; left:0px;'  type = 'checkbox' value ='" + x + "' className = 'checkbox ' checked  autocomplete = 'off' id = 'pl" + x + "'/> \n  <label id = 'pl+" + x + "' class = ' checkbox btn btn-primary labels' for = 'pl" + x+ "'>" + x + "</label> \n";
            //     companyHTML = companyHTML + coElement;
            // }
            // company.innerHTML = companyHTML;




            // let companies = document.getElementById("companies");
            // let companiesHTML = '';
            // for(let x of response.data['message'][6])
            // {  
            //     let price = this.state.price;
            //     price[x] = 1;
            //     this.setState({price: price});
            //     let coElement  = "<input style='opacity:0; position:absolute; left:0px;'  type = 'checkbox' value ='" + x + "' className = 'checkbox ' checked  autocomplete = 'off' id = 'co" + x + "'/> \n  <label id = 'co+" + x + "' class = ' checkbox btn btn-primary labels' for = 'co" + x+ "'>" + x + "</label> \n";
            //     companiesHTML = companiesHTML + coElement;
            // }
            // companies.innerHTML = companiesHTML;
            // companies.style.display = 'none';


            // let extras = document.getElementById("extras");
            // let extrasHTML = '';
            // for(let x of response.data['message'][7])
            // {  
            //     let exElement  = "<input style='opacity:0; position:absolute; left:0px;'  type = 'checkbox' value ='" + x + "' className = 'checkbox ' autocomplete = 'off' id = 'ex" + x + "'/> \n  <label class = ' checkbox btn btn-primary labels' for = 'ex" + x+ "'>" + x + "</label> \n";
            //     extrasHTML = extrasHTML + exElement;
            // }
            // extras.innerHTML = extrasHTML;


            // this.setState({price: d});
            // console.log("this is price " ,this.state.price, typeof(this.state.price));
            

            let drag_cont = document.querySelectorAll('.drag_container');
            let that = this;
            for(let dragEle of drag_cont)
            {
                dragEle.addEventListener('dragstart', function(e, dragItem){
                    // dragEle.parentElement.style.visibility = 'hidden';
                    e.dataTransfer.setData('dragItem', dragEle.id);

                })

                // dragEle.addEventListener('drop',function(e){
                //     let dragItemId = e.dataTransfer.getData('dragItem');
                //     let dragItem = document.getElementById(dragItemId);
                //     let dragTarget = dragEle;
                //     let price = that.state.price;
                //     let x = dragItem.innerHTML;
                    
                //     price[x] = 0;
                    
                //     let x2 = dragTarget.innerHTML;
                //     console.log("dragTarget = " , dragTarget.innerHTML);
                //     let newX2 = x2 + '/' + x;
                //     price[newX2] = price[x2];
                //     price[x2] = 0;
                //     that.setState({price: price});
                //     console.log(that.state.price);


                
                //     dragTarget.innerHTML = x2 + '/' + x;

                //     dragItem.parentElement.style.display = 'none';
                //     console.log("Updated = ", dragTarget.innerHTML);

                //     console.log("dragItem = ", dragItem);

                // })
                // dragEle.addEventListener('dragover', function(e){
                //     e.preventDefault();
                // })
            }


            let dropEles = document.querySelectorAll('.drop_container');
            for(let dropEle of dropEles)
            {
                dropEle.addEventListener('drop', function(e){

                    let dragItemId = e.dataTransfer.getData('dragItem');
                    let dragItem = document.getElementById(dragItemId);
                    let val = this.id;
                    if(this.id == dragItem.parentElement.parentElement.id)
                        return;
                    console.log("Drop conatiner before drop = ", this.outerHTML);
                    console.log(this.childNodes);
        
                    this.innerHTML = this.innerHTML + dragItem.parentElement.outerHTML;
                    console.log("Drop Container after drop = ", this.outerHTML);
                    console.log(this.childNodes);

                    let childs = this.childNodes;
                    let pId = childs[0].childNodes[3].id.substring(0,2);
                    this.style.border = '2px solid grey';
                    this.style.borderRadius = '14px';
                    dragItem.parentElement.style.display = 'none';
                    this.style.padding = '6px 6px 4px 8px';
                    this.style.gap = '7px';

                    for(let i = 0 ; i < childs.length ;i++)
                    {
                        console.log("------------------");
                        console.log("child = " , childs[i]);
                        let lab = childs[i].childNodes[3].id;
                        console.log("lab = ", lab);

                        lab = pId + lab.substring(2,lab.length);
                        console.log("updated lab = ", lab);

                        let s = lab.substring(3,lab.length);

                        console.log("keyword = ", s);
                        let del = 'del' + pId + lab.substring(3,lab.length);
                        childs[i].childNodes[3].id = lab;
                        let dragEle = childs[i].childNodes[3];
                        childs[i].childNodes[4].childNodes[0].id = del;
                        let p = that.state.price;
                        p[s] = parseInt(val);
                        that.setState({price: p})
                        
                        // let dragEle = document.getElementById(lab);
                        
                        dragEle.style.backgroundColor = 'black';
                        dragEle.style.color = 'white';
                        dragEle.style.boxShadow = '0px 0px 0px';
                        
                        

                        let checkboxx = dragEle;
                        checkboxx.addEventListener('click', function(){
                            
                            let cId = String(this.id)
                            let pId = String(this.id).substring(0,2)
                            let pCb = document.getElementById(pId);
                            
                            if(cId.length > 3)
                            {
                                
                                let d = 'del' + pId + cId.substring(3,cId.length);
                                let s = String(this.innerHTML);
                                let price = that.state.price;
                                let del = document.getElementById(d);
                                if(price[s] < 0)
                                {
                                    del.style.backgroundColor = 'white';
                                    this.style.backgroundColor = 'black';
                                    this.style.color = 'white';
                                    this.style.boxShadow = '0px 0px 0px';
                                    price[s] = -1*price[s];
                                }
                                else if(price[s] > 0)
                                {
                                    del.style.backgroundColor = 'white';
                                    this.style.backgroundColor = 'white';
                                    this.style.color = 'black';
                                    this.style.boxShadow = 'rgb(170, 170, 170) -5px 5px 0px';
                                
                                    price[s] = 0
                                }
                                else if(price[s] == 0)
                                {
                                    del.style.backgroundColor = 'white';
                                    this.style.backgroundColor = 'black';
                                    this.style.color = 'white';
                                    this.style.boxShadow = '0px 0px 0px';
                                    price[s] = parseInt(this.parentElement.parentElement.id);
                                }
        
                                that.setState({price: price})
                            }
        
        
                        })



                        dragEle.addEventListener('dragstart', function(e, dragItem){
                            // dragEle.parentElement.style.visibility = 'hidden';
                            e.dataTransfer.setData('dragItem', dragEle.id);
                        })

                        
                        


                        // let db = document.getElementById(del);
                        // db.addEventListener('click', function(e){
                        //     e.preventDefault();
                        //     let delId = String(this.id)
                        //     let x = String(this.id).substring(5,delId.length)
                        //     let pId = delId.substring(3,5);
                        //     let price = that.state.price;
                        //     let lab = document.getElementById(pId + '+' + x)
        
                        //     if(price[x] == 0)
                        //     {
                        //         price[x] = -1*parseInt(this.parentElement.parentElement.parentElement.id)
                        //         this.style.backgroundColor = 'red';
                        //         lab.style.backgroundColor = 'white';
                        //         lab.style.color = 'black';
                        //         lab.style.boxShadow = 'rgb(170, 170, 170) -5px 5px 0px';
        
                        //     }
                        //     else if(price[x] > 0 ){
                        //         price[x] = -1*price[x];
                        //         this.style.backgroundColor = 'red';
                        //         lab.style.backgroundColor = 'white';
                        //         lab.style.color = 'black';
                        //         lab.style.boxShadow = 'rgb(170, 170, 170) -5px 5px 0px';
                    
                        //     }
                        //     else if(price[x] < 0)
                        //     {
                        //         price[x] = 0;
                        //         this.style.backgroundColor = 'white';
                        //     }
                        //     that.setState({price: price})
                            
                            
        
                        // })


                    }

                    
                })
                dropEle.addEventListener('dragover', function(e){
                    e.preventDefault();
                })
            }


            
            let checkboxes = document.querySelectorAll('.checkbox');
            for( let checkboxx of checkboxes)
            {
                // console.log(checkboxx.value)
                checkboxx.addEventListener('click', function(){
                    if(this.nodeName == 'INPUT')
                        return;
                    
                    let cId = String(this.id)
                    let pId = String(this.id).substring(0,2)
                    let pCb = document.getElementById(pId);

                    console.log("cId = " ,cId);

                    if(cId.length > 3)
                    {
                        
                        let d = 'del' + pId + cId.substring(3,cId.length);
                        let s = String(this.innerHTML);
                        let price = that.state.price;
                        let del = document.getElementById(d);
                        if(price[s] < 0)
                        {
                            del.style.backgroundColor = 'white';
                            this.style.backgroundColor = 'black';
                            this.style.color = 'white';
                            this.style.boxShadow = '0px 0px 0px';
                            price[s] = -1*price[s];
                        }
                        else if(price[s] > 0)
                        {
                            del.style.backgroundColor = 'white';
                            this.style.backgroundColor = 'white';
                            this.style.color = 'black';
                            this.style.boxShadow = 'rgb(170, 170, 170) -5px 5px 0px';
                        
                            price[s] = 0
                        }
                        else if(price[s] == 0)
                        {
                            del.style.backgroundColor = 'white';
                            this.style.backgroundColor = 'black';
                            this.style.color = 'white';
                            this.style.boxShadow = '0px 0px 0px';
                            price[s] = parseInt(this.parentElement.parentElement.id);
                            console.log(this.parentElement.parentElement);
                            console.log("price = " , price[s]);
                        }

                        that.setState({price: price})
                    }

                    console.log(that.state.price);

                })
            }
            // console.log(this.state.price)
            let delButton = document.querySelectorAll(".delButton");
            
            for(let db of delButton)
            {
                db.addEventListener('click', function(e){
                    e.preventDefault();
                    let delId = String(this.id)
                    let x = String(this.id).substring(5,delId.length)
                    let pId = delId.substring(3,5);
                    let price = that.state.price;
                    let lab = document.getElementById(pId + '+' + x)

                    if(price[x] == 0)
                    {
                        console.log("parentElement = ", this.parentElement.parentElement.parentElement);
                        price[x] = -1*parseInt(this.parentElement.parentElement.parentElement.id)
                        this.style.backgroundColor = 'red';
                        lab.style.backgroundColor = 'white';
                        lab.style.color = 'black';
                        lab.style.boxShadow = 'rgb(170, 170, 170) -5px 5px 0px';
                        console.log(price[x])

                    }
                    else if(price[x] > 0 ){
                        price[x] = -1*price[x];
                        this.style.backgroundColor = 'red';
                        lab.style.backgroundColor = 'white';
                        lab.style.color = 'black';
                        lab.style.boxShadow = 'rgb(170, 170, 170) -5px 5px 0px';
            
                    }
                    else if(price[x] < 0)
                    {
                        price[x] = 0;
                        this.style.backgroundColor = 'white';
                    }
                    that.setState({price: price})
                    console.log(that.state.price)
                    
                    // document.getElementById(pId+'+' + x).style.display = 'none';
                    // document.getElementById(pId+ '+' + x).style.margin = '0px';

                    // document.getElementById(pId + '' + x).style.display = 'none';
                    // document.getElementById(pId + '' + x).style.margin = '0px';


                    // this.style.display = 'none';

                })
            }


            document.getElementById("post-form").style.display = 'block'
            document.getElementById("usp-form").style.display = 'none'
            // setResults(response.data); 
        }).catch((e) =>{
            let err = document.getElementById("error2");
            this.setState({loading: false})
            err.firstChild.innerHTML = "Too many requests. Retry in 30 seconds."
            err.style.gridTemplateRows = '1fr';
            console.log("network error");
        });}
        catch(e)
        {
            let err = document.getElementById('error2');
            err.firstChild.innerHTML = 'Too many requests. Retry in 30 seconds'
            err.style.gridTemplateRows = '1fr'
        }
        // if(this.state.id === '_add'){
        //     ProductService.createProduct(product).then(response =>{
        //         this.props.history.push('/products');
        //     });
        // }else{
        //     ProductService.updateProduct(product, this.state.id).then( response => {
        //         this.props.history.push('/form');
        //     });
        // }
        // console.log("here");
    }

    changeNameHandler= (event) => {
        this.setState({name: event.target.value});
    }
    changeCategoryHandler= (event) => {
        this.setState({category: event.target.value});
    }
    changeStartingPriceHandler= (event) => {
        this.setState({startingPrice: event.target.value});
    }
    changeProductKeywordsHandler = (event) =>{
        this.setState({productKeywords: event.target.value});
    }
    
    changeLandingPageHandler = (event) =>{
        this.setState({landingPage: event.target.value});

    }
    changeProductUspHandler = (event) =>{
        this.setState({productUsp: event.target.value});

    }
    changeUspKeywordsHandler = (event) =>{
        this.setState({uspKeyWords: event.target.value});

    }
    changeIdentifierWordHandler = (event) =>{
        this.setState({identifierWords: event.target.value});

    }
    changeLocalityHandler = (event) =>{
        this.setState({locality: event.target.value})
        
    }
    changetargetAudienceLocationHandler = (event) => 
    {
        this.setState({targetAudienceLocation: event.target.value});
    }
    changeTargetAreaHandler = (event) =>
    {
        this.setState({targetArea: event.target.value})
    }
    changeNegWordHandler = (event)=>{
        console.log('here')
        this.setState({neg_word_inp: event.target.value})
    }
    changeBrandHandler= (event) => {
        this.setState({brand: event.target.value});
    }
 
    changeMadeinHandler= (event) => {
        this.setState({madein: event.target.value});
    }
 
    changePriceHandler= (event) => {
        this.setState({price: event.target.value});
    }
    changeProductDetailsHandler = (event) =>{
        this.setState({productDetails: event.target.value})
    }
 
    cancel(){
        this.props.history.push('/products');
    }
    
    //We are using a getTitle() method to get the title for Add/Update Employee page based on id:
    getTitle(){
        return (<h1 className="text-center" 
        style={{
            fontFamily: 'Google Sans,Roboto,Arial,sans-serif'
        }} ></h1>);
    }


    render(){
        const {loading} = this.state;
        const {online} = this.state;
        const {offline} = this.state;
        const {transactional} = this.state;
        const {educational} = this.state;
        return(
            <div>
            <div style={{
                margin: '0px',
                padding: '0px',
                minWidth: '600px',
                // maxWidth: '800px',
                transition: ' all-linear 1s'
            }}>
                <div id = "first-form" style={{
                    position: 'absolute',
                    minWidth: '600px',
                    maxWidth: '800px',
                }}>
                    <br></br>
                    <div className = "container"  style={{
                        // minWidth: '500px',
                        // minHeight: '600px',
                        
                        wordWrap: 'break-word',
                        marginTop: '100px'
                        
                    }}>
                            <div className = "row" style={{
                                // justifyContent: 'center'23
                                
                                borderRadius: '14px'
                            }
                            }>
                                <div className = "card col" style={{
                                    borderRadius: '14px',
                                    borderColor: 'lightgray',
                                    minHeight: '350px',
                                    // height: '0px',
                                    maxHeight: '600px', 
                                    display: 'flex',
                                    boxShadow: '-8px 8px 0px #aaa'
                                    
                                }}>
                                    {
                                        this.getTitle()
                                    }
                                    <div className = "card-body" style={{
                                        // boxShadow: '0px 0px 8px #ddd'
                                    }}>
                                        <form style={{
                                            marginTop:'2.0rem', 
                                            // boxShadow: '0px 0px 8px #000'
                                        }}>
                                            <div className = "form-group" style={{
                                                marginBottom: '3.0rem'
                                            }}>
                                                <div style={{
                                                    display: 'flex',
                                                    justifyContent: 'left'
                                                }}>
                                                <label style={{
                                                    // marginRight: '70px'
                                                }}>Mode of Business:  </label>
                                                </div>

                                                <div id = "modeOfBusiness"
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between'

                                                }}>
                                                    <div>
                                                    <input name="modeOfBusiness"
                                                    // style={{opacity:'0', position:'absolute'}} 
                                                    type = 'radio' value ='OfflineElement'   className = 'checkbox'   autoComplete = 'off' id = 'OfflineElement' onChange={e =>{
                                                        this.setState({offline: true})
                                                        this.setState({online: false})
                                                    }} /> 
                                                    <label style= {{boxShadow: '0px 0px 0px', marginLeft: '4px'}}className = 'checkbox btn btn-primary labels' htmlFor = 'OfflineElement' >Offline</label>
                                                    </div>
                                                    <div>
                                                    <input name = "modeOfBusiness"
                                                    // style={{opacity:'0', position:'absolute'}} 
                                                    type = 'radio' value ='OnlineElement'   className = 'checkbox'  autoComplete = 'off' id = 'OnlineElement' onChange={e =>{
                                                        this.setState({offline: false})
                                                        this.setState({online: true})

                                                    }} /> 
                                                    <label style= {{boxShadow: '0px 0px 0px', marginLeft: '4px'}} className = 'checkbox btn btn-primary labels' htmlFor = 'OnlineElement' >Online</label>
                                                    </div>
                                                    <div>
                                                    
                                                    <input name = "modeOfBusiness"
                                                    // style={{opacity:'0', position:'absolute'}} 

                                                    type = 'radio' value ='BothElement'   className = 'checkbox'  autoComplete = 'off' id = 'BothElement' onChange={e =>{
                                                        this.setState({offline: true})
                                                        this.setState({online: true})
                                                    }} /> 
                                                    <label style= {{boxShadow: '0px 0px 0px', marginLeft: '4px'}} className = 'checkbox btn btn-primary labels' htmlFor = 'BothElement' >Both</label>
                                                    </div>
                                                </div>
                                                




                                                <div style={{
                                                    display: 'flex',
                                                    justifyContent: 'left',
                                                    marginTop: '16px'
                                                }}>
                                                <label style={{
                                                    // marginRight: '70px'
                                                }}>Campaign Intent:</label>
                                                </div>

                                                <div id = "campaignIntent"
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    marginBottom: '-16px'
                                                }}>
                                                    <div >
                                                    <input name="campaignIntent"
                                                    // style={{opacity:'0', position:'absolute'}} 
                                                    type = 'radio' value ='transactionalElement'   className = 'checkbox'   autoComplete = 'off' id = 'transactionalElement' onChange={e =>{
                                                        this.setState({transactional: true})
                                                        this.setState({educational: false})
                                                    }} /> 
                                                    <label style= {{boxShadow: '0px 0px 0px', marginLeft: '4px'}}className = 'checkbox btn btn-primary labels' htmlFor = 'transactionalElement' >Transactional</label>
                                                    </div>
                                                    <div>
                                                    <input name = "campaignIntent"
                                                    // style={{opacity:'0', position:'absolute'}} 
                                                    type = 'radio' value ='educationalElement'   className = 'checkbox'  autoComplete = 'off' id = 'educationalElement' onChange={e =>{
                                                        this.setState({transactional: false})
                                                        this.setState({educational: true})

                                                    }} /> 
                                                    <label style= {{boxShadow: '0px 0px 0px', marginLeft: '4px'}} className = 'checkbox btn btn-primary labels' htmlFor = 'educationalElement' >Educational</label>
                                                    </div>
                                                    <div>
                                                    
                                                    <input name = "campaignIntent"
                                                    // style={{opacity:'0', position:'absolute'}} 

                                                    type = 'radio' value ='BothElement'   className = 'checkbox'  autoComplete = 'off' id = 'BothElement2' onChange={e =>{
                                                        this.setState({transactional: true})
                                                        this.setState({educational: true})
                                                    }} /> 
                                                    <label style= {{boxShadow: '0px 0px 0px', marginLeft: '4px'}} className = 'checkbox btn btn-primary labels' htmlFor = 'BothElement2' >Both</label>
                                                    </div>
                                                </div>
                                                


                        

                                            
                                            
                                            </div>
                                            {this.state.online &&<div className = "form-group" style={{

                                                justifyContent: 'left'
                                            }}>
                                                <div style={{
                                                    display: 'flex',
                                                    justifyContent: 'left'
                                                }}>
                                                <label style={{
                                                    // marginRight: '53%'
                                                }}>Provide the area where you deliver:</label>
                                                </div>
                                                <input autoComplete="off" placeholder="Enter keywords separated by ','" name="targetArea" className="form-control" 
                                                    value={this.state.targetArea} onChange={this.changeTargetAreaHandler}/>
                                            </div>}

                                            {this.state.offline &&<div className = "form-group" style={{

                                                justifyContent: 'left'
                                            }}>
                                                <div style={{
                                                    display: 'flex',
                                                    justifyContent: 'left'
                                                }}>
                                                <label style={{
                                                    // marginRight: '53%'
                                                }}>Which city you are based at:</label>
                                                </div>
                                                <input autoComplete="off" placeholder="Enter products separated by ','" name="locality" className="form-control" 
                                                    value={this.state.locality} onChange={this.changeLocalityHandler}/>
                                            </div>}

                                            <div className = "form-group" style={{

                                                justifyContent: 'left'
                                                }}>
                                                <div style={{
                                                    display: 'flex',
                                                    justifyContent: 'left'
                                                }}>
                                                <label style={{
                                                    // marginRight: '53%'
                                                }}>Taget Audience Location:</label>
                                                </div>
                                                <input autoComplete="off" placeholder="Enter countrys/states/citys separated by ','" name="TargetAudienceLocation" className="form-control" 
                                                    value={this.state.targetAudienceLocation} onChange={this.changetargetAudienceLocationHandler}/>
                                            </div>
                                                                                            
    
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'right'
                                            }}>
                                            <button className="btn" id="next-button" style={{
                                                backgroundColor: 'white',
                                                // padding: '14px 30px',
                                                border: 'balck',
                                                borderRadius: '12px', 
                                                color: 'black',
                                                border: 'none',
                                                // marginTop: '50px'
                                            }} onClick={this.updateGeneralInfo}
                                            disabled = {loading}>
                                                {loading && <FaCircleNotch className="App-logo" style={{
                                                    marginLeft: '22px', 
                                                    marginRight: '22px'
                                                }}></FaCircleNotch>}
                                                {!loading && <span>Next{" >"}</span>}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
    
                    </div>
                    
                </div>


                <div id = "second-form" style={{
                    display: 'none',
                    // position: 'absolute',
                    // maxHeight: ''
                    // visibility: 'hidden',
                    // position: 'absolute'
                }}>
                    <br></br>
                    <div className = "container"  style={{
                        // minWidth: '500px',
                        // minHeight: '600px',
                        
                        wordWrap: 'break-word',
                        marginTop: '100px'
                        
                    }}>
                            <div className = "row" style={{
                                // justifyContent: 'center'
                                borderRadius: '14px'
                            }
                            }>
                                <div className = "card col" style={{
                                    borderRadius: '14px',
                                    borderColor: 'lightgray',
                                    minHeight: '350px',
                                    // height: '0px',
                                    // maxHeight: '600px',
                                    display: 'flex',
                                    boxShadow: '-8px 8px 0px #aaa'
                                    
                                }}>
                                    {/* <h2 style={{marginTop: '5px'}}>Product Details</h2> */}
                                    <div className = "card-body" style={{
                                        // boxShadow: '0px 0px 8px #ddd'
                                    }}>
                                        <form style={{
                                            marginTop:'2.0rem', 
                                            // boxShadow: '0px 0px 8px #000'
                                        }}>
                                            <div className = "form-group" style={{
                                                marginBottom: '2.0rem'
                                            }}>
                                                <div style={{
                                                    display: 'flex',
                                                    justifyContent: 'left'
                                                }}>
                                                <label style={{
                                                    // marginRight: '70px'
                                                }}>Landing page URL:  </label>
                                                </div>
                                                <input autoComplete="off"  name="landingPage" className="form-control" 
                                                    value={this.state.landingPage} onChange={this.changeLandingPageHandler}/>
                                            </div>
                                            {/* <div className = "form-group" style={{
                                                marginBottom: '2.0rem'
                                            }}>
                                                <div style={{
                                                    display: 'flex',
                                                    justifyContent: 'left'
                                                }}>
                                                <label style={{
                                                    // marginRight: '70px'
                                                }}>Identifing word(s) of your product:  </label>
                                                </div>
                                                <input autoComplete="off" placeholder="Enter words separated by ','" name="name" className="form-control" 
                                                    value={this.state.name} onChange={this.changeNameHandler}/>
                                            </div> */}
                                            
                                            {/* <div className = "form-group" style={{
                                                marginBottom: '2.0rem'
                                            }}>
                                                <div style={{
                                                    display: 'flex',
                                                    justifyContent: 'left'
                                                }}>
                                                <label style={{
                                                    // marginRight: '53%'
                                                }}>Enter product category:</label>
                                                </div> */}
                                                {/* <input autoComplete="off" placeholder="tiles/gifts" name="category" className="form-control" 
                                                    value={this.state.category} onChange={this.changeCategoryHandler}/> */}
                                                {/* <div style={{
                                                    display: 'flex',
                                                    justifyContent: 'left'
                                                }}> */}
                                                {/* <DropdownButton id="dropdown-basic-button" title= 'Select category' drop ={'down-centered'}>
                                                    <Dropdown.Item onClick={(e)=>{
                                                        e.preventDefault();
                                                        this.state.category = 'tiles';
                                                        let b = document.getElementById("dropdown-basic-button");
                                                        b.title = this.state.category
                                                        b.innerHTML = "Tiles"
                                                    }} href="#/action-1"><button className = "category-input" style={{
                                                        border: 'none' ,
                                                        background: 'none',
                                                        width: '100%',
                                                        textAlign: 'left'
                                                    }}  onClick={(e)=>{
                                                        e.preventDefault();
                                                        this.state.category = 'tiles';
                                                        let b = document.getElementById("dropdown-basic-button");
                                                        b.title = this.state.category
                                                        b.innerHTML = "Tiles"
                                                    }} 
                                                    >Tiles</button></Dropdown.Item>
                                                </DropdownButton>
                                                </div>
                                                
                                            </div> */}
                                            <div className = "form-group" style={{
                                                marginBottom: '2.0rem'
                                            }}>
                                                <div style={{
                                                    display: 'flex',
                                                    justifyContent: 'left'
                                                }}>
                                                <label style={{
                                                    // marginRight: '53%'
                                                }}>Enter starting price:</label>
                                                </div>
                                                <input autoComplete="off"  name="startingPrice" className="form-control" 
                                                    value={this.state.startingPrice} onChange={this.changeStartingPriceHandler}/>
                                                
                                            </div>
                                            <div className = "form-group" style={{
                                                marginBottom: '2.0rem'
                                            }}>
                                                <div id = 'keywords-box' style={{
                                                    textAlign: "left"
                                                }}>
                                                    <div style={{
                                                        display: 'flex',
                                                        justifyContent: 'left'
                                                    }}>
                                                        <label style={{
                                                            // marginRight: '53%'
                                                        }}>Enter keywords related to your product:</label>
                                                    </div>
                                                    <div style={{
                                                        display: 'flex',
                                                        justifyContent: 'left',
                                                        alignItems: 'center'
                                                    }}>
                                                    <input id="productKeywordsInput" autoComplete="off" placeholder="Enter keywords separated by ','" name="productKeywords" className="form-control" 
                                                        value={this.state.productKeywords} onChange={this.changeProductKeywordsHandler}/>
                                                    

                                                    <button className="btn" id="parseButton1" style={{
                                                        backgroundColor: 'orange',
                                                        padding: '0px',
                                                        border: 'balck',
                                                        borderRadius: '12px', 
                                                        color: 'black',
                                                        border: 'none',
                                                        borderRadius: '0px 5px 5px 0px',
                                                        color: 'black',
                                                        height: '39px',
                                                        width: '55px'
                                                        // marginTop: '50px'
                                                    }} onClick={(e)=>{
                                                        e.preventDefault();
                                                        this.setState({loading: true});
                                                        let inp = this.state.productKeywords;
                                                        if(inp == ''){
                                                            let err = document.getElementById('error');
                                                            let box = document.getElementById("productKeywordsInput")
                                                            console.log("box = ", box)
                                                            err.firstChild.innerHTML = 'Please enter keywords'
                                                            err.style.gridTemplateRows = '1fr';

                                                            box.style.borderColor = 'red'
                                                            this.setState({loading: false})
                                                            return;
                                                        }
                                                        let parse = document.getElementById("parse");
                                                        let parseHTML = "<div style='display: flex; justify-content: left;flex-wrap: wrap;  padding: 11px 8px; gap: 8px'>";
                                                        let id = 1;
                                                        let keywords_list = inp.split(", ");
                                                        console.log("keywrods_list = ", keywords_list)
                                                        
                                                        let assigned = {}

                                                        for(let keywords of keywords_list)
                                                        {   
                                                            console.log("keywords = ", keywords)

                                                            let words = keywords.split(" ")
                                                            
                                                            let exclude_words = {
                                                                'for': 1,
                                                                'and': 1,
                                                                'nor': 1,
                                                                'but': 1,
                                                                'or': 1,
                                                                'is': 1,
                                                                'yet': 1,
                                                                'so': 1,
                                                                'are': 1, 
                                                                'was': 1,
                                                                'were': 1,
                                                                'like':1,
                                                                'that':1,
                                                                'in': 1,
                                                                'of': 1,
                                                                'a': 1,
                                                                'i': 1,
                                                                'on': 1,
                                                                'to': 1
                                                            }
                                                            for(let x of words)
                                                            {  

                                                                console.log(x)
                                                                if(exclude_words[x] == 1)
                                                                    continue
                                                                if(assigned[x] == 1)
                                                                    continue
                                                                assigned[x] = 1
                                                                let price = this.state.price;
                                                                price[x] = 0;
                                                                this.setState({price: price});
                                                                let delButton = '<div style = " display: none;postion: absolute;" class = "delButtonContainer"><button id="delre' + x+ '" class = " delButton"><span class = "delButtonLabel2">-</span></button></div>'
                                                                // let addButton = '<div style = "postion: absolute;" class = "delButtonContainer"><button class = " delButton"><span class = "delButtonLabel2">-</span></button></div>'
                                                                // console.log(delButton)
                                            
                                                                let reElement  = "<div style = 'display: flex;' id = '" + id + "' class = 'drop_container'><div style = 'display: flex; position: relative;' > <input style='opacity:0; position:absolute; left:0px;'  type = 'checkbox' value ='" + x + "' className = 'checkbox '   autocomplete = 'off' id = 're" + x + "'/> \n  <label draggable = 'true' id = 're+" + x + "'class = ' drag_container checkbox btn btn-primary labels' for = 're" + x+ "'>" + x +"</label>" + delButton+ "</div></div>\n ";
                                                                id++;
                                                                parseHTML = parseHTML + reElement;
                                            
                                                            }
                                                            // parseHTML = parseHTML + '</div>';
                                            
                                                        }
                                                        parseHTML = parseHTML + '</div><label id= "SelectCamWords1">Select campaign words</label>';
                                                            
                                                        parse.innerHTML = parseHTML;
                                                        parse.style.gridTemplateRows = '1fr';
                                                        let drag_cont = document.querySelectorAll('.drag_container');
                                                        let that = this;
                                                        for(let dragEle of drag_cont)
                                                        {
                                                            dragEle.addEventListener('dragstart', function(e, dragItem){
                                                                // dragEle.parentElement.style.visibility = 'hidden';
                                                                e.dataTransfer.setData('dragItem', dragEle.id);
                                            
                                                            })
                                                        }
                                            
                                            
                                                        let dropEles = document.querySelectorAll('.drop_container');
                                                        for(let dropEle of dropEles)
                                                        {
                                                            dropEle.addEventListener('drop', function(e){
                                            
                                                                let dragItemId = e.dataTransfer.getData('dragItem');
                                                                let dragItem = document.getElementById(dragItemId);
                                                                let val = this.id;
                                                                if(this.id == dragItem.parentElement.parentElement.id)
                                                                    return;
                                                                console.log("Drop conatiner before drop = ", this.outerHTML);
                                                                console.log(this.childNodes);
                                                                
                                                    
                                                                this.innerHTML = this.innerHTML + dragItem.parentElement.outerHTML;
                                                                console.log("Drop Container after drop = ", this.outerHTML);
                                                                console.log(this.childNodes);
                                                                
                                                                let childs = this.childNodes;
                                                                let pId = childs[0].childNodes[3].id.substring(0,2);
                                                                this.style.border = '2px solid grey';
                                                                this.style.borderRadius = '14px';
                                                                dragItem.parentElement.style.display = 'none';
                                                                this.style.padding = '6px 6px 4px 8px';
                                                                this.style.gap = '7px';

                                                                for(let i = 0 ; i < childs.length ;i++)
                                                                {
                                                                    console.log("------------------");
                                                                    console.log("child = " , childs[i]);
                                                                    let lab = childs[i].childNodes[3].id;
                                                                    console.log("lab = ", lab);
                                            
                                                                    lab = pId + lab.substring(2,lab.length);
                                                                    console.log("updated lab = ", lab);
                                            
                                                                    let s = lab.substring(3,lab.length);
                                            
                                                                    console.log("keyword = ", s);
                                                                    let del = 'del' + pId + lab.substring(3,lab.length);
                                                                    childs[i].childNodes[3].id = lab;
                                                                    let dragEle = childs[i].childNodes[3];
                                                                    childs[i].childNodes[4].childNodes[0].id = del;
                                                                    let p = that.state.price;
                                                                    p[s] = parseInt(val);
                                                                    that.setState({price: p})
                                                                    
                                                                    // let dragEle = document.getElementById(lab);
                                                                    
                                                                    dragEle.style.backgroundColor = 'black';
                                                                    dragEle.style.color = 'white';
                                                                    dragEle.style.boxShadow = '0px 0px 0px';

                                                                    
                                            
                                                                    let checkboxx = dragEle;
                                                                    checkboxx.addEventListener('click', function(){
                                                                        
                                                                        let cId = String(this.id)
                                                                        let pId = String(this.id).substring(0,2)
                                                                        let pCb = document.getElementById(pId);
                                                                        
                                                                        if(cId.length > 3)
                                                                        {
                                                                            
                                                                            let d = 'del' + pId + cId.substring(3,cId.length);
                                                                            let s = String(this.innerHTML);
                                                                            let price = that.state.price;
                                                                            let del = document.getElementById(d);
                                                                            if(price[s] < 0)
                                                                            {
                                                                                del.style.backgroundColor = 'white';
                                                                                this.style.backgroundColor = 'black';
                                                                                this.style.color = 'white';
                                                                                this.style.boxShadow = '0px 0px 0px';
                                                                                price[s] = -1*price[s];
                                                                            }
                                                                            else if(price[s] > 0)
                                                                            {
                                                                                del.style.backgroundColor = 'white';
                                                                                this.style.backgroundColor = 'white';
                                                                                this.style.color = 'black';
                                                                                this.style.boxShadow = 'rgb(170, 170, 170) -5px 5px 0px';
                                                                            
                                                                                price[s] = 0
                                                                            }
                                                                            else if(price[s] == 0)
                                                                            {
                                                                                del.style.backgroundColor = 'white';
                                                                                this.style.backgroundColor = 'black';
                                                                                this.style.color = 'white';
                                                                                this.style.boxShadow = '0px 0px 0px';
                                                                                price[s] = parseInt(this.parentElement.parentElement.id);
                                                                            }
                                                    
                                                                            that.setState({price: price})
                                                                        }
                                                    
                                                    
                                                                    })
                                            
                                            
                                            
                                                                    dragEle.addEventListener('dragstart', function(e, dragItem){
                                                                        // dragEle.parentElement.style.visibility = 'hidden';
                                                                        e.dataTransfer.setData('dragItem', dragEle.id);
                                                                    })
                                            
                                                                    
                                                                    
                                            
                                            
                                                                }
                                            
                                                                
                                                            })
                                                            dropEle.addEventListener('dragover', function(e){
                                                                e.preventDefault();
                                                            })
                                                        }
                                            
                                            
                                                        
                                                        let checkboxes = document.querySelectorAll('.checkbox');
                                                        for( let checkboxx of checkboxes)
                                                        {
                                                            // console.log(checkboxx.value)
                                                            checkboxx.addEventListener('click', function(){
                                                                if(this.nodeName == 'INPUT')
                                                                    return;
                                                                
                                                                let cId = String(this.id)
                                                                let pId = String(this.id).substring(0,2)
                                                                let pCb = document.getElementById(pId);
                                            
                                                                console.log("cId = " ,cId);
                                            
                                                                if(cId.length > 3)
                                                                {
                                                                    
                                                                    let d = 'del' + pId + cId.substring(3,cId.length);
                                                                    let s = String(this.innerHTML);
                                                                    let price = that.state.price;
                                                                    let del = document.getElementById(d);
                                                                    if(price[s] < 0)
                                                                    {
                                                                        del.style.backgroundColor = 'white';
                                                                        this.style.backgroundColor = 'black';
                                                                        this.style.color = 'white';
                                                                        this.style.boxShadow = '0px 0px 0px';
                                                                        price[s] = -1*price[s];
                                                                    }
                                                                    else if(price[s] > 0)
                                                                    {
                                                                        del.style.backgroundColor = 'white';
                                                                        this.style.backgroundColor = 'white';
                                                                        this.style.color = 'black';
                                                                        this.style.boxShadow = 'rgb(170, 170, 170) -5px 5px 0px';
                                                                    
                                                                        price[s] = 0
                                                                    }
                                                                    else if(price[s] == 0)
                                                                    {
                                                                        del.style.backgroundColor = 'white';
                                                                        this.style.backgroundColor = 'black';
                                                                        this.style.color = 'white';
                                                                        this.style.boxShadow = '0px 0px 0px';
                                                                        price[s] = parseInt(this.parentElement.parentElement.id);
                                                                        console.log(this.parentElement.parentElement);
                                                                        console.log("price = " , price[s]);
                                                                    }
                                            
                                                                    that.setState({price: price})
                                                                }
                                            
                                                                console.log(that.state.price);
                                            
                                                            })
                                                        }
                                                        this.setState({loading: false})
                                                        
   
                                                    }}
                                                    disabled = {loading}>
                                                        {loading && <FaCircleNotch className="App-logo" style={{
                                                            marginLeft: '22px', 
                                                            marginRight: '22px'
                                                        }}></FaCircleNotch>}
                                                        {!loading && <span style={{color: 'white'}}>{">>"}</span>}
                                                    </button>
                                                    </div>
                                                    <div id= 'parse'><div></div></div>
                                                    </div>
                                                    
                                                </div>
                                                
                                                <div id = 'error' style={{color: 'red',
                                                    textAlign:'left'}}><label></label></div>
                                            
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'space-between'
                                            }}>


                                                <button className="btn" id="previous-button2" style={{
                                                backgroundColor: 'white',
                                                padding: '0px',
                                                border: 'balck',
                                                borderRadius: '12px', 
                                                color: 'black',
                                                border: 'none',
                                                // marginTop: '50px'
                                            }} onClick={(e)=>{
                                                e.preventDefault();
                                                document.getElementById("first-form").style.display = 'block';
                                                document.getElementById("second-form").style.display = 'none';

                                            }}
                                            disabled = {loading}>
                                                {loading && <FaCircleNotch className="App-logo" style={{
                                                    marginLeft: '22px', 
                                                    marginRight: '22px'
                                                }}></FaCircleNotch>}
                                                {!loading && <span>{"< "}Previous</span>}
                                                </button>




                                            <button className="btn" id="next-button2" style={{
                                                backgroundColor: 'white',
                                                // padding: '14px 30px',
                                                border: 'balck',
                                                borderRadius: '12px', 
                                                color: 'black',
                                                border: 'none',
                                                // marginTop: '50px'
                                            }} onClick={this.updateProductInfo}
                                            disabled = {loading}>
                                                {loading && <FaCircleNotch className="App-logo" style={{
                                                    marginLeft: '22px', 
                                                    marginRight: '22px'
                                                }}></FaCircleNotch>}
                                                {!loading && <span>Next {" >"}</span>}
                                                </button>

                                                

                                                

                                            </div>
                                            
                                        </form>
                                    </div>
                                </div>
                            </div>
    
                    </div>
                    
                </div>

                <div id = "usp-form" style={{
                    display: 'none'
                }}>
                    <br></br>
                    <div className = "container"  style={{                        
                        wordWrap: 'break-word',
                        marginTop: '100px'
                        
                    }}>
                            <div className = "row" style={{
                                // justifyContent: 'center'
                                borderRadius: '14px'
                            }
                            }>
                                <div className = "card col" style={{
                                    borderRadius: '14px',
                                    borderColor: 'lightgray',
                                    minHeight: '350px',
                                    
                                    display: 'flex',
                                    boxShadow: '-8px 8px 0px #aaa'
                                    
                                }}>
                                    {
                                        this.getTitle()
                                    }
                                    <div className = "card-body" style={{
                                        // boxShadow: '0px 0px 8px #ddd'
                                    }}>
                                        <form style={{
                                            marginTop:'2.0rem', 
                                            // boxShadow: '0px 0px 8px #000'
                                        }}>
                                            <div className = "form-group" style={{
                                                marginBottom: '2.0rem'
                                            }}>
                                                <div style={{
                                                    display: 'flex',
                                                    justifyContent: 'left'
                                                }}>
                                                <label style={{
                                                    // marginRight: '70px'
                                                }}>Product USP:</label>
                                                </div>
                                                <input id= "productUsp" autoComplete="off" placeholder="Enter product benefits/solutions" name="Product USP" className="form-control" 
                                                    value={this.state.productUsp} onChange={this.changeProductUspHandler}/>
                                            </div>
                                            {/* <div className = "form-group" style={{
                                                marginBottom: '2.0rem'
                                            }}>
                                                <div style={{
                                                    display: 'flex',
                                                    justifyContent: 'left'
                                                }}>
                                                <label style={{
                                                    // marginRight: '70px'
                                                }}>Identifier Words:</label>
                                                </div>
                                                <input autoComplete="off" placeholder="Enter words separated by '," name="identifierWords" className="form-control" 
                                                    value={this.state.identifierWords} onChange={this.changeIdentifierWordHandler}/>
                                            </div> */}
                                            <div className = "form-group" style={{
                                                marginBottom: '2.0rem',
                                                justifyContent: 'left'
                                            }}>
                                                <div style={{
                                                    display: 'flex',
                                                    justifyContent: 'left'
                                                }}>
                                                <label style={{
                                                }}>Enter keywords related to product USP</label>
                                                </div>
                                                <div style={{
                                                    display: 'flex',
                                                    justifyContent: "space-between"
                                                }}>
                                                <input id = "uspKeywords" autoComplete="off" placeholder="Enter keywords separated by ','" name="uspKeywords" className="form-control" 
                                                    value={this.state.uspKeyWords} onChange={this.changeUspKeywordsHandler}/>
                                                <button className="btn" id="parseButton2" style={{
                                                        backgroundColor: 'orange',
                                                        padding: '0px',
                                                        border: 'balck',
                                                        borderRadius: '12px', 
                                                        color: 'black',
                                                        border: 'none',
                                                        borderRadius: '0px 5px 5px 0px',
                                                        color: 'black',
                                                        height: '39px',
                                                        width: '55px'
                                                        // marginTop: '50px'
                                                    }} onClick={(e)=>{
                                                        e.preventDefault();
                                                        this.setState({loading: true});
                                                        let inp = this.state.uspKeyWords;
                                                        if(inp == ''){
                                                            console.log("inHere")
                                                            let err = document.getElementById('error2');
                                                            let box = document.getElementById("uspKeywords")
                                                            console.log("box = ", box)
                                                            err.firstChild.innerHTML = 'Please enter keywords'
                                                            err.style.gridTemplateRows = '1fr';

                                                            box.style.borderColor = 'red'
                                                            this.setState({loading: false})
                                                            return;
                                                        }
                                                        let parse = document.getElementById("parse2");
                                                        let parseHTML = "<div style='display: flex; justify-content: left;flex-wrap: wrap;  padding: 11px 8px; gap: 8px'>";
                                                        let id = 1;
                                                        let keywords_list = inp.split(", ");
                                                        console.log("keywrods_list = ", keywords_list)
                                                        
                                                        let assigned = {}

                                                        for(let keywords of keywords_list)
                                                        {   
                                                            console.log("keywords = ", keywords)

                                                            let words = keywords.split(" ")
                                                            
                                                            let exclude_words = {
                                                                'for': 1,
                                                                'and': 1,
                                                                'nor': 1,
                                                                'but': 1,
                                                                'or': 1,
                                                                'is': 1,
                                                                'yet': 1,
                                                                'so': 1,
                                                                'are': 1, 
                                                                'was': 1,
                                                                'were': 1,
                                                                'like':1,
                                                                'that':1,
                                                                'in': 1,
                                                                'of': 1,
                                                                'a': 1,
                                                                'i': 1,
                                                                'on': 1,
                                                                'to': 1,
                                                                '': 1,
                                                                ' ': 1
                                                            }
                                                            for(let x of words)
                                                            {  

                                                                console.log(x)
                                                                if(exclude_words[x] == 1)
                                                                    continue
                                                                if(assigned[x] == 1)
                                                                    continue
                                                                assigned[x] = 1
                                                                let price = this.state.price;
                                                                price[x] = 0;
                                                                this.setState({price: price});
                                                                let delButton = '<div style = " display: none;postion: absolute;" class = "delButtonContainer"><button id="delre' + x+ '" class = " delButton"><span class = "delButtonLabel2">-</span></button></div>'
                                                                // let addButton = '<div style = "postion: absolute;" class = "delButtonContainer"><button class = " delButton"><span class = "delButtonLabel2">-</span></button></div>'
                                                                // console.log(delButton)
                                            
                                                                let reElement  = "<div style = 'display: flex;' id = '" + id + "' class = 'drop_container'><div style = 'display: flex; position: relative;' > <input style='opacity:0; position:absolute; left:0px;'  type = 'checkbox' value ='" + x + "' className = 'checkbox '   autocomplete = 'off' id = 're" + x + "'/> \n  <label draggable = 'true' id = 're+" + x + "'class = ' drag_container checkbox btn btn-primary labels' for = 're" + x+ "'>" + x +"</label>" + delButton+ "</div></div>\n ";
                                                                id++;
                                                                parseHTML = parseHTML + reElement;
                                            
                                                            }
                                                            // parseHTML = parseHTML + '</div>';
                                            
                                                        }
                                                        parseHTML = parseHTML + '</div><label id= "SelectCamWords2">Select campaign words';
                                                            
                                                        parse.innerHTML = parseHTML;
                                                        parse.style.gridTemplateRows = '1fr';
                                                        let drag_cont = document.querySelectorAll('.drag_container');
                                                        let that = this;
                                                        for(let dragEle of drag_cont)
                                                        {
                                                            dragEle.addEventListener('dragstart', function(e, dragItem){
                                                                // dragEle.parentElement.style.visibility = 'hidden';
                                                                e.dataTransfer.setData('dragItem', dragEle.id);
                                            
                                                            })
                                                        }
                                            
                                            
                                                        let dropEles = document.querySelectorAll('.drop_container');
                                                        for(let dropEle of dropEles)
                                                        {
                                                            dropEle.addEventListener('drop', function(e){
                                            
                                                                let dragItemId = e.dataTransfer.getData('dragItem');
                                                                let dragItem = document.getElementById(dragItemId);
                                                                let val = this.id;
                                                                if(this.id == dragItem.parentElement.parentElement.id)
                                                                    return;
                                                                console.log("Drop conatiner before drop = ", this.outerHTML);
                                                                console.log(this.childNodes);
                                                                
                                                    
                                                                this.innerHTML = this.innerHTML + dragItem.parentElement.outerHTML;
                                                                console.log("Drop Container after drop = ", this.outerHTML);
                                                                console.log(this.childNodes);
                                                                
                                                                let childs = this.childNodes;
                                                                let pId = childs[0].childNodes[3].id.substring(0,2);
                                                                this.style.border = '2px solid grey';
                                                                this.style.borderRadius = '14px';
                                                                dragItem.parentElement.style.display = 'none';
                                                                this.style.padding = '6px 6px 4px 8px';
                                                                this.style.gap = '7px';

                                                                for(let i = 0 ; i < childs.length ;i++)
                                                                {
                                                                    console.log("------------------");
                                                                    console.log("child = " , childs[i]);
                                                                    let lab = childs[i].childNodes[3].id;
                                                                    console.log("lab = ", lab);
                                            
                                                                    lab = pId + lab.substring(2,lab.length);
                                                                    console.log("updated lab = ", lab);
                                            
                                                                    let s = lab.substring(3,lab.length);
                                            
                                                                    console.log("keyword = ", s);
                                                                    let del = 'del' + pId + lab.substring(3,lab.length);
                                                                    childs[i].childNodes[3].id = lab;
                                                                    let dragEle = childs[i].childNodes[3];
                                                                    childs[i].childNodes[4].childNodes[0].id = del;
                                                                    let p = that.state.price;
                                                                    p[s] = parseInt(val);
                                                                    that.setState({price: p})
                                                                    
                                                                    // let dragEle = document.getElementById(lab);
                                                                    
                                                                    dragEle.style.backgroundColor = 'black';
                                                                    dragEle.style.color = 'white';
                                                                    dragEle.style.boxShadow = '0px 0px 0px';

                                                                    
                                            
                                                                    let checkboxx = dragEle;
                                                                    checkboxx.addEventListener('click', function(){
                                                                        
                                                                        let cId = String(this.id)
                                                                        let pId = String(this.id).substring(0,2)
                                                                        let pCb = document.getElementById(pId);
                                                                        
                                                                        if(cId.length > 3)
                                                                        {
                                                                            
                                                                            let d = 'del' + pId + cId.substring(3,cId.length);
                                                                            let s = String(this.innerHTML);
                                                                            let price = that.state.price;
                                                                            let del = document.getElementById(d);
                                                                            if(price[s] < 0)
                                                                            {
                                                                                del.style.backgroundColor = 'white';
                                                                                this.style.backgroundColor = 'black';
                                                                                this.style.color = 'white';
                                                                                this.style.boxShadow = '0px 0px 0px';
                                                                                price[s] = -1*price[s];
                                                                            }
                                                                            else if(price[s] > 0)
                                                                            {
                                                                                del.style.backgroundColor = 'white';
                                                                                this.style.backgroundColor = 'white';
                                                                                this.style.color = 'black';
                                                                                this.style.boxShadow = 'rgb(170, 170, 170) -5px 5px 0px';
                                                                            
                                                                                price[s] = 0
                                                                            }
                                                                            else if(price[s] == 0)
                                                                            {
                                                                                del.style.backgroundColor = 'white';
                                                                                this.style.backgroundColor = 'black';
                                                                                this.style.color = 'white';
                                                                                this.style.boxShadow = '0px 0px 0px';
                                                                                price[s] = parseInt(this.parentElement.parentElement.id);
                                                                            }
                                                    
                                                                            that.setState({price: price})
                                                                        }
                                                    
                                                    
                                                                    })
                                            
                                            
                                            
                                                                    dragEle.addEventListener('dragstart', function(e, dragItem){
                                                                        // dragEle.parentElement.style.visibility = 'hidden';
                                                                        e.dataTransfer.setData('dragItem', dragEle.id);
                                                                    })
                                            
                                                                    
                                                                    
                                            
                                            
                                                                }
                                            
                                                                
                                                            })
                                                            dropEle.addEventListener('dragover', function(e){
                                                                e.preventDefault();
                                                            })
                                                        }
                                            
                                            
                                                        
                                                        let checkboxes = document.querySelectorAll('.checkbox');
                                                        for( let checkboxx of checkboxes)
                                                        {
                                                            // console.log(checkboxx.value)
                                                            checkboxx.addEventListener('click', function(){
                                                                if(this.nodeName == 'INPUT')
                                                                    return;
                                                                
                                                                let cId = String(this.id)
                                                                let pId = String(this.id).substring(0,2)
                                                                let pCb = document.getElementById(pId);
                                            
                                                                console.log("cId = " ,cId);
                                            
                                                                if(cId.length > 3)
                                                                {
                                                                    
                                                                    let d = 'del' + pId + cId.substring(3,cId.length);
                                                                    let s = String(this.innerHTML);
                                                                    let price = that.state.price;
                                                                    let del = document.getElementById(d);
                                                                    if(price[s] < 0)
                                                                    {
                                                                        del.style.backgroundColor = 'white';
                                                                        this.style.backgroundColor = 'black';
                                                                        this.style.color = 'white';
                                                                        this.style.boxShadow = '0px 0px 0px';
                                                                        price[s] = -1*price[s];
                                                                    }
                                                                    else if(price[s] > 0)
                                                                    {
                                                                        del.style.backgroundColor = 'white';
                                                                        this.style.backgroundColor = 'white';
                                                                        this.style.color = 'black';
                                                                        this.style.boxShadow = 'rgb(170, 170, 170) -5px 5px 0px';
                                                                    
                                                                        price[s] = 0
                                                                    }
                                                                    else if(price[s] == 0)
                                                                    {
                                                                        del.style.backgroundColor = 'white';
                                                                        this.style.backgroundColor = 'black';
                                                                        this.style.color = 'white';
                                                                        this.style.boxShadow = '0px 0px 0px';
                                                                        price[s] = parseInt(this.parentElement.parentElement.id);
                                                                        console.log(this.parentElement.parentElement);
                                                                        console.log("price = " , price[s]);
                                                                    }
                                            
                                                                    that.setState({price: price})
                                                                }
                                            
                                                                console.log(that.state.price);
                                            
                                                            })
                                                        }
                                                        this.setState({loading: false})

                                                    }} disabled = {loading}>
                                                        {!loading && <span style={{color: 'white'}}>{">>"}</span>}
                                                </button>
                                                </div>
                                                <div style={{textAlign: 'left'}}id = 'parse2'><div></div></div>
                                            </div>
                                            
                                            <div id = 'error2' style={{
                                                color: 'red',
                                                textAlign: 'left'
                                            }}><label></label></div>
                                            
                                            
                                            
                                             
                                            

                                            
                                            
                                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                            <button className="btn" id="previous-button2" style={{
                                                backgroundColor: 'white',
                                                padding: '0px 0px',
                                                borderRadius: '12px', 
                                                color: 'black',
                                                // borderColor: 'black',
                                                // marginTop: '50px'
                                            }} onClick={(e)=>{
                                                e.preventDefault();
                                                document.getElementById("second-form").style.display = 'block';
                                                document.getElementById("usp-form").style.display = 'none';
                                                let temp = this.state.price
                                                temp  = {}
                                                this.setState({price: temp})
                                                let parse = document.getElementById("parse2")

                                                parse.innerHTML = "<div></div>"
                                                parse.style.gridTemplateRows = '0fr';
                                                this.setState({uspKeyWords: ''})

                                            }}
                                            disabled = {loading}>
                                                {loading && <FaCircleNotch className="App-logo" style={{
                                                    marginLeft: '22px', 
                                                    marginRight: '22px',
                                                    // marginTop: '0px'
                                                }}></FaCircleNotch>}
                                                {!loading && <span>{"< "}Previous</span>}
                                                </button>
                                            
                                            <button className="btn" id="Enter-another-usp-button" style={{
                                                backgroundColor: 'black',
                                                padding: '14px 30px',
                                                borderRadius: '12px', 
                                                color: 'white',
                                                border: 'none',
                                                // marginTop: '50px'
                                            }} onClick={(e) =>{
                                                if(this.state.uspKeyWords == '' && this.state.productUsp == '')
                                                    return;
                                                this.setState({addAnotherUsp: true})
                                                this.saveOrUpdateProduct(e)
                                                this.setState({addAnotherUsp: false});

                                            }}
                                            disabled = {loading}>
                                                {loading && <FaCircleNotch className="App-logo" style={{
                                                    marginLeft: '22px', 
                                                    marginRight: '22px'
                                                }}></FaCircleNotch>}
                                                {!loading && <span>Add another USP</span>}
                                                </button>
                                            


                                            <button className="btn" id="generate-button" style={{
                                                backgroundColor: 'green',
                                                padding: '14px 30px',
                                                borderRadius: '12px', 
                                                color: 'white',
                                                border: 'none',
                                                // marginTop: '50px'
                                            }} onClick={this.saveOrUpdateProduct}
                                            disabled = {loading}>
                                                {loading && <FaCircleNotch className="App-logo" style={{
                                                    marginLeft: '22px', 
                                                    marginRight: '22px'
                                                }}></FaCircleNotch>}
                                                {!loading && <span>Done</span>}
                                                </button>    



                                            
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
    
                    </div>
                    
                </div>
                



                





                <div style={{
                    transition: '1s',
                    display: 'none',
                    // minWidth: '800px'
                }} id = "post-form">
                    <br></br>
                    <div className = "container"  style={{
                        // minWidth: '500px',
                        
                        // minHeight: '600px',
                        
                        wordWrap: 'break-word',
                        // marginTop: '100 px'
                        
                    }}>
                            <div className = "row" style={{
                                // justifyContent: 'center'
                                borderRadius: '14px'
                            }
                            }>
                                <div className = "card col" style={{
                                    borderRadius: '14px',
                                    borderColor: 'lightgray',
                                    minHeight: '500px',
                                    display: 'flex',
                                    boxShadow: '-8px 8px 0px #aaa'
                                    
                                }}>
                                    <div className = "card-body" style={{
                                        // boxShadow: '0px 0px 8px #ddd'
                                    }}>
                                        <form style={{
                                            marginTop:'2.0rem', 
                                            // boxShadow: '0px 0px 8px #000'
                                        }}>
                                            <div className = "form-group" style={{
                                                marginBottom: '3.0rem'
                                            }}>
                                            
                                                {/*<div style={{
                                                    display: 'flex',
                                                    justifyContent: 'left'
                                                }}>
                                                <label style={{
                                                    // marginRight: '40%'
                                                }} >Filter out the occasions your product is relevent for: </label>
                                                </div>
                                                <div id="occasions" style={{
                                                    marginBottom: '40px',
                                                    flexWrap: 'wrap',
                                                    display: 'flex',
                                                    gap: '12px',
                                                    justifyContent: 'left'
                                                }}>
                                            </div>*/}

                                                {/* <div style={{
                                                    display: 'felx', 
                                                    justifyContent: 'space-between'
                                                }}> */}
                                                {/* <div style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    marginBottom: '10px'
                                                }}> */}
                                                {/* <label style={{
                                                    marginRight: '10px'
                                                }} >Select the products that you offer: </label> */}
                                                {/* <div style={{
                                                    textAlign: 'left'
                                                }}> */}

                                                {/* <div style = {{
                                                    display:'none'
                                                }}>
                                               
                                                <input style={{

                                                }}  
                                                type = 'checkbox' value ='pl' className = 'checkbox '  defaultChecked  autoComplete = 'off' id = 'pl'/>   <label id= 'pl+' className = ' checkbox ' htmlFor = 'pl'>Make AdGroup</label> 
                                                </div> */}


                                                {/* <div><input style={{marginRight: '4px'}} type = 'checkbox' value ='plmakeNwordList'  autoComplete = 'off' placeholder="make nwrods" id = 'plmakeNwordList'></input><label>Mark unchecked as negative keywords</label></div> */}
                                                {/* </div> */}
                                                {/* </div> */}
                                                
                                                {/* <div id="productType" style={{
                                                    display: 'flex',
                                                    marginBottom: '40px',
                                                    flexWrap: 'wrap',
                                                    gap: '12px',
                                                    justifyContent: 'left'
                                                }}>
                                                </div> */}
                                                
                                                

                                                
                                                <div style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    marginBottom: '10px'
                                                }}>
                                                <label style={{
                                                }} >Select Ad-group themes and mark negative keywords: </label>
                                                {/* <div style={{
                                                    textAlign: 'left'
                                                }}>
                                                <div style = {{
                                                    display:'none'
                                                }}>
                                               
                                                <input style={{
                                                    


                                                }}  
                                                type = 'checkbox' value ='re' className = 'checkbox ' defaultChecked   autoComplete = 'off' id = 're'/>   <label id= 're+' className = ' checkbox ' htmlFor = 're'>Make AdGroup</label>  */}
                                                {/* </div> */}
                                                {/* <div><input style={{marginRight: '4px'}} type = 'checkbox' value ='remakeNwordList'  autoComplete = 'off' placeholder="make nwrods" id = 'remakeNwordList'></input><label>Mark unchecked as negative keywords</label></div> */}
                                                {/* </div> */}
                                                </div>

                                                <div id="applications" style={{
                                                    display: 'flex',
                                                    marginBottom: '40px',
                                                    flexWrap: 'wrap',
                                                    gap: '12px',
                                                    justifyContent: 'left', 
                                                    textAlign: 'left'
                                                }}>
                                                </div>


                                                


                                                {/* <div style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    marginBottom: '10px'
                                                }}>
                                                <label style={{
                                                    marginRight: '10px'
                                                }} >Select the material type that you offer: </label>
                                                <div style={{
                                                    textAlign: 'left'
                                                }}>
                                                <div style = {{
                                                    display:'none'
                                                }}>
                                               
                                                <input style={{
                                                    


                                                }}  
                                                type = 'checkbox' value ='pr' className = 'checkbox '   defaultChecked autoComplete = 'off' id = 'pr'/>   <label id= 'pr+' className = ' checkbox ' htmlFor = 'pr'>Make AdGroup</label> 
                                                </div>
                                                <div><input style={{marginRight: '4px'}} type = 'checkbox' value ='prmakeNwordList'  autoComplete = 'off' placeholder="make nwrods" id = 'prmakeNwordList'></input><label>Mark unchecked as negative keywords</label></div>
                                                </div>
                                                </div>
                                                <div id="materialType" style={{
                                                    display: 'flex',
                                                    marginBottom: '40px',
                                                    flexWrap: 'wrap',
                                                    gap: '12px',
                                                    justifyContent: 'left'
                                                }}>
                                                </div>

                                                <div style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    marginBottom: '10px'
                                                }}>
                                                <label style={{
                                                    marginRight: '10px'
                                                }} >Select the styles and designs that you offer: </label>
                                                <div style={{
                                                    textAlign: 'left'
                                                }}>
                                                <div style = {{
                                                    display:'none'
                                                }}>
                                               
                                                <input style={{
                                                    


                                                }}  
                                                type = 'checkbox' value ='de' className = 'checkbox '   defaultChecked    autoComplete = 'off' id = 'de'/>   <label id= 'de+' className = ' checkbox ' htmlFor = 'de'>Make AdGroup</label> 
                                                </div>
                                                <div><input style={{marginRight: '4px'}} type = 'checkbox' value ='demakeNwordList'  autoComplete = 'off' placeholder="make nwrods" id = 'demakeNwordList'></input><label>Mark unchecked as negative keywords</label></div>
                                                </div>
                                                </div>
                                                <div id="designs" style={{
                                                    display: 'flex',
                                                    marginBottom: '40px',
                                                    flexWrap: 'wrap',
                                                    gap: '12px',
                                                    justifyContent: 'left'
                                                }}>
                                                </div> */}

{/* 
                                                <div style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    marginBottom: '10px'
                                                }}>
                                                <label style={{
                                                    marginRight: '10px'
                                                }} >Select the services that you provide: </label>
                                                <div style={{
                                                    textAlign: 'left'
                                                }}>
                                                <div style = {{
                                                    display:'none'
                                                }}>
                                               
                                                <input style={{
                                                    


                                                }}  
                                                type = 'checkbox' value ='se' className = 'checkbox '    defaultChecked   autoComplete = 'off' id = 'se'/>   <label id= 'se+' className = ' checkbox ' htmlFor = 'se'>Make AdGroup</label> 
                                                </div>
                                                <div><input style={{marginRight: '4px'}} type = 'checkbox' value ='plmakeNwordList'  autoComplete = 'off' placeholder="make nwrods" id = 'semakeNwordList'></input><label>Mark unchecked as negative keywords</label></div>
                                                </div>
                                                </div>
                                                <div id="services" style={{
                                                    display: 'flex',
                                                    marginBottom: '40px',
                                                    flexWrap: 'wrap',
                                                    gap: '12px',
                                                    justifyContent: 'left'
                                                }}>
                                                </div> */}

                                                {/* <div style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    marginBottom: '10px'
                                                }}>
                                                <label style={{
                                                    marginRight: '10px'
                                                }} >Uncategorized words: </label>
                                                <div style={{
                                                    textAlign: 'left'
                                                }}>
                                                <div style = {{
                                                    display:'none'
                                                }}>
                                               
                                                <input style={{
                                                    


                                                }}  
                                                type = 'checkbox' value ='ex' className = 'checkbox '   defaultChecked    autoComplete = 'off' id = 'ex'/>   <label id= 'ex+' className = ' checkbox ' htmlFor = 'ex'>Make AdGroup</label> 
                                                </div>
                                                <div><input style={{marginRight: '4px'}} type = 'checkbox' value ='exmakeNwordList'  autoComplete = 'off' placeholder="make nwrods" id = 'exmakeNwordList'></input><label>Mark unchecked as negative keywords</label></div>
                                                </div>
                                                </div>
                                                <div id="extra" style={{
                                                    display: 'flex',
                                                    marginBottom: '40px',
                                                    flexWrap: 'wrap',
                                                    gap: '12px',
                                                    justifyContent: 'left'
                                                }}>
                                                </div>
                                                

                                                <div style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    marginBottom: '10px'
                                                }}>
                                                <label style={{
                                                    marginRight: '10px'
                                                }} >Companies: </label>
                                                <div style={{
                                                    textAlign: 'left'
                                                }}>
                                                <div style = {{
                                                    display:'none'
                                                }}>
                                               
                                                <input style={{
                                                    


                                                }}  
                                                type = 'checkbox' value ='co' className = 'checkbox '   defaultChecked    autoComplete = 'off' id = 'co'/>   <label id= 'co+' className = ' checkbox ' htmlFor = 'co'>Make AdGroup</label> 
                                                </div>
                                                <div><input style={{marginRight: '4px'}} type = 'checkbox' value ='comakeNwordList'  autoComplete = 'off' placeholder="make nwrods" id = 'comakeNwordList'></input><label>Mark unchecked as negative keywords</label></div>
                                                </div>
                                                </div>
                                                <div id="company" style={{
                                                    display: 'flex',
                                                    marginBottom: '40px',
                                                    flexWrap: 'wrap',
                                                    gap: '12px',
                                                    justifyContent: 'left'
                                                }}>
                                                </div> */}

                                                {/* <div style={{
                                                    display: 'flex',
                                                    justifyContent: 'left'

                                                }}>
                                                <label style={{
                                                    // marginRight: '4%'
                                                }} ></label>
                                                </div>
                                                <div id="companies" style={{
                                                    display: 'flex',
                                                    marginBottom: '40px',
                                                    flexWrap: 'wrap',
                                                    gap: '12px',
                                                    justifyContent: 'left'
                                                }}>
                                                </div> */}



                                                {/* <label style={{
                                                    marginRight: '12%'
                                                }} >Select keywords if they are relevent to your product: </label>
                                                <div id="extras" style={{
                                                    display: 'flex',
                                                    marginBottom: '40px',
                                                    flexWrap: 'wrap',
                                                    gap: '12px',
                                                    justifyContent: 'left'
                                                }}>
                                                </div> */}



                                                
                                            </div>
                                            
                                            <div style={{
                                                display: 'grid',
                                                gridTemplateRows: '0fr',
                                                transition: 'gridTemplateRows 500ms'
                                            }}>
                                                <div id = "error3"></div>
                                            </div>
                                            <button className="btn" id="filter-button" style={{
                                                backgroundColor: 'black',
                                                padding: '14px 30px',
                                                borderRadius: '12px', 
                                                color: 'white',
                                                border: 'none',
                                            }} onClick={this.filter}
                                            disabled = {loading}>
                                                {loading && <FaCircleNotch className="App-logo" style={{
                                                    marginLeft: '22px', 
                                                    marginRight: '22px'
                                                }}></FaCircleNotch>}
                                                {!loading && <span>Filter</span>}
                                                </button>

                                                <input style={{marginLeft: '5px', display: 'none'}} type = 'checkbox' value ='makeNwordList' defaultChecked autoComplete = 'off' placeholder="make nwrods" id = 'makeNwordList'></input><label style={{display: 'none'}}>Make negative keywords list</label>
                                            </form>
                                    </div>
                                </div>
                            </div>
    
                    </div>
                    
                </div>

                <div style={{display: 'flex', position: 'relative'}}>
                    <div style={{
                        transition: '1s',
                        display: 'none',
                        textAlign: 'left'
                        // minWidth: '800px'
                        }} id = "results">
                        <br></br>
                        <div className = "container"  style={{
                            // minWidth: '500px',
                            
                            // minHeight: '600px',
                            
                            wordWrap: 'break-word',
                            // marginTop: '100 px'
                            
                        }}>
                                <div className = "row" style={{
                                    // justifyContent: 'center'
                                    borderRadius: '14px'
                                }
                                }>
                                    <div className = "card col" style={{
                                        borderRadius: '14px',
                                        borderColor: 'lightgray',
                                        minHeight: '500px',
                                        display: 'flex',
                                        boxShadow: '-8px 8px 0px #aaa'
                                        
                                    }}>
                                        <div className = "card-body" style={{
                                            // boxShadow: '0px 0px 8px #ddd'
                                        }}>
                                            <form style={{
                                                marginTop:'2.0rem', 
                                                // boxShadow: '0px 0px 8px #000'
                                            }}>
                                                <div className = "form-group" style={{
                                                    marginBottom: '3.0rem'
                                                }}>
                                                    <div style={{
                                                        display: 'flex',
                                                        justifyContent: "left",
                                                        position: 'relative'
                                                    }}>
                                                    <div style={{
                                                        display: 'flex',
                                                        justifyContent: 'left',
                                                        width: '800px'
                                                    }} id = "results_keywords"></div>

                                                    
                                                </div>
                                                    


                                                    



                                                    {/* <label style={{
                                                        marginRight: '12%'
                                                    }} >Select keywords if they are relevent to your product: </label>
                                                    <div id="extras" style={{
                                                        display: 'flex',
                                                        marginBottom: '40px',
                                                        flexWrap: 'wrap',
                                                        gap: '12px',
                                                        justifyContent: 'left'
                                                    }}>
                                                    </div> */}



                                                    
                                                </div>
                                                
                                                <div style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between'
                                                }}>


                                                    <button className="btn" id="previous-button3" style={{
                                                    backgroundColor: 'white',
                                                    padding: '0px',
                                                    border: 'balck',
                                                    borderRadius: '12px', 
                                                    color: 'black',
                                                    border: 'none',
                                                    // marginTop: '50px'
                                                }} onClick={(e)=>{
                                                    e.preventDefault();
                                                    document.getElementById("results").style.display = 'none';
                                                    document.getElementById("negative-keywords").style.display = 'none';
                                                    document.getElementById("post-form").style.display = 'block';

                                                }}
                                                disabled = {loading}>
                                                    {loading && <FaCircleNotch className="App-logo" style={{
                                                        marginLeft: '22px', 
                                                        marginRight: '22px'
                                                    }}></FaCircleNotch>}
                                                    {!loading && <span>{"< "}Previous</span>}
                                                    </button>

                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
        
                        </div>
                        
                    </div>

                    <div className="result-box" id="negative-keywords" style={{
                        display: 'flex',
                        display: 'none',
                        marginBottom: '40px',
                        marginLeft: '5px',
                        flexWrap: 'wrap',
                        gap: '12px',
                        justifyContent: 'left',
                        marginTop: '24px',

                        background: 'white'
                    }}>
                    

                    </div>
                </div>                                







            </div>
            </div>
            
            

        );
    }

}