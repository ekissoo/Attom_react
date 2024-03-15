import React,{Component} from "react";
import axios from "axios";
import { useState } from "react";
import ProductService from "../service/FormService";
import {FaCircleNotch, FaXMark} from 'react-icons/fa'
import './Form.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import CloseButton from 'react-bootstrap/CloseButton';
<<<<<<< HEAD
import pluralize, { plural } from "pluralize";

// const REST_API_URL="http://192.168.1.23:5000/";
// const REST_API_URL="http://localhost:8080";
const REST_API_URL="https://ec2-34-208-122-172.us-west-2.compute.amazonaws.com:8080";

// const REST_API_URL="https://d69qhe0538.execute-api.ap-south-1.amazonaws.com/";
=======
// const REST_API_URL="http://192.168.1.22:5000/";
const REST_API_URL="https://d69qhe0538.execute-api.ap-south-1.amazonaws.com/";
>>>>>>> f3c57e9cf3f2cb5cb64acb1d36b9d26a36a08197





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
<<<<<<< HEAD
            transactional: false,
            educational: false,
=======
>>>>>>> f3c57e9cf3f2cb5cb64acb1d36b9d26a36a08197
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
<<<<<<< HEAD
            all_nGrams: [],
            all_must_haves: [],
            location_ids:[],
            addAnotherUsp: false
=======
            all_nGrams: []
>>>>>>> f3c57e9cf3f2cb5cb64acb1d36b9d26a36a08197
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
<<<<<<< HEAD
        let resp = axios.post(REST_API_URL + '/form', product)
        
=======
        let resp = axios.post(REST_API_URL + '/form', product);
>>>>>>> f3c57e9cf3f2cb5cb64acb1d36b9d26a36a08197

        return resp;
    }

     


    filter = (p) =>{
        
        this.setState({loading: true});
        p.preventDefault();
<<<<<<< HEAD
=======

>>>>>>> f3c57e9cf3f2cb5cb64acb1d36b9d26a36a08197
        
        let checkboxes = document.querySelectorAll('.checkbox');
        let that = this;
        // console.log(this);
        // console.log(that);
        for( let checkboxx of checkboxes)
        {
            if(checkboxx.nodeName == "INPUT")
                continue;
            

            let cId = String(checkboxx.id)
<<<<<<< HEAD
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
            
            
=======
            let pId = String(checkboxx.id).substring(0,2)

            let pCb = document.getElementById(pId);
            if(checkboxx.checked == true)
            {
                if(cId.length > 3)
                {
                    let x = String(checkboxx.innerHTML);
                    let p = that.state.price;
                    if(p[x] == 4)
                    {
                        delete p.x;
                        that.setState({price: p})

                    }

                    else if(pCb.checked == true)
                    {
                        let s = String(checkboxx.innerHTML);
                        // d[s] = 1;
                        let price = that.state.price;
                        price[s] = 2

                        that.setState({price: price})
                    }
                    else
                    {
                        let s = String(checkboxx.innerHTML);
                        // d[s] = 1;
                        let price = that.state.price;
                        price[s] = 3

                        that.setState({price: price})
                    }
                }

            }
            else{
                if(cId.length > 3 )
                {
                    let s = String(checkboxx.innerHTML);
                    // d[s] = 1;
                    let price = that.state.price;
                    let pNw = pId + "makeNwordList";
                    console.log("pNw = "+ pNw + " cId=" + cId);
                    let makeNw = document.getElementById(pId + "makeNwordList")
                    if(makeNw != null)
                    {
                        if( makeNw.checked == true)
                        {
                            price[s] = 1
                            console.log("in")
                        }
                        else
                        {
                            price[s] = 3;
                            console.log("out")
                        }

                        that.setState({price: price})   
                    }
                }
            }
            
>>>>>>> f3c57e9cf3f2cb5cb64acb1d36b9d26a36a08197

            // console.log(checkboxx.value)
        }

<<<<<<< HEAD
        // console.log(this.state.price)


        let product = {name: this.state.name, call: false,  brand: this.state.brand,madein:this.state.madein, price: this.state.price, uspId: this.state.uspId, allUsp: this.state.allUsp, formData: this.state.formData,
        offline: this.state.offline, online: this.state.online, locality: this.state.locality, targetAudienceLocation: this.state.targetAudienceLocation, targetArea: this.state.targetArea, 
        landingPage: this.state.landingPage,transactional:this.state.transactional, educational:this.state.educational, category: this.state.category, startingPrice: this.state.startingPrice, productKeywords: this.state.productKeywords, all_must_haves: this.state.all_must_haves,all_generated_keywords: this.state.all_generated_keywords,location_ids: this.state.location_ids ,all_must_haves: this.state.all_must_haves,all_nGrams: this.state.all_nGrams};
=======
        console.log(this.state.price)


        let product = {name: this.state.name, brand: this.state.brand,madein:this.state.madein, price: this.state.price, uspId: this.state.uspId, allUsp: this.state.allUsp, formData: this.state.formData,
        offline: this.state.offline, online: this.state.online, locality: this.state.locality, targetAudienceLocation: this.state.targetAudienceLocation, targetArea: this.state.targetArea, 
        landingPage: this.state.landingPage, category: this.state.category, startingPrice: this.state.startingPrice, productKeywords: this.state.productKeywords, all_generated_keywords: this.state.all_generated_keywords, all_nGrams: this.state.all_nGrams};
>>>>>>> f3c57e9cf3f2cb5cb64acb1d36b9d26a36a08197
            
        
        
        this.createProduct(product).then((response)=>{
<<<<<<< HEAD
            console.log("response = ", response)
=======
>>>>>>> f3c57e9cf3f2cb5cb64acb1d36b9d26a36a08197
            document.getElementById("post-form").style.display = 'none';

            let results_keywords = document.getElementById("results_keywords");
            let results_keywordsHTML = ''
            console.log(response.data)
            let k = 0
<<<<<<< HEAD
            // console.log("allUsp = ")
            // console.log(this.state.allUsp)
            for(let x of response.data['message']['all_filtered_keywords'])
            {   
                console.log(x)
                console.log(typeof(x))
                let title = '';
                if(k == 0)
                    title = 'your product';
=======
            console.log("allUsp = ")
            console.log(this.state.allUsp)
            for(let x of response.data['message'][10])
            {   
                let title = '';
                if(k == 0)
                    title = this.state.name;
>>>>>>> f3c57e9cf3f2cb5cb64acb1d36b9d26a36a08197
                else
                    title = this.state.allUsp[k-1]['usp']
                k++;

                let ele = "<div><h6>Preferred keywords for " + title + ":</h6>"
                results_keywordsHTML = results_keywordsHTML + ele;

<<<<<<< HEAD
                // console.log("titile is..." + title)
                // console.log("x is.....")
                // console.log(x)
                // console.log("x type = " + typeof(x))
                ele = "<div class = 'res'>"
                results_keywordsHTML = results_keywordsHTML + ele;
                console.log("type of x")
                for(let [key, value] of Object.entries(x))
                {
                    // console.log("key = "+ key + "\nvalue = " + value)
                    // console.log("key = "+ typeof(key) + "\nvalue = " + typeof(value))
=======
                console.log("titile is..." + title)
                console.log("x is.....")
                console.log(x)
                console.log("x type = " + typeof(x))
                ele = "<div class = 'res'>"
                results_keywordsHTML = results_keywordsHTML + ele;
                for(let [key, value] of Object.entries(x))
                {
                    console.log("key = "+ key + "\nvalue = " + value)
                    console.log("key = "+ typeof(key) + "\nvalue = " + typeof(value))
>>>>>>> f3c57e9cf3f2cb5cb64acb1d36b9d26a36a08197
                    

                    ele = "<div class = 'result-box'>";
                    results_keywordsHTML = results_keywordsHTML + ele;
                    let k = 0;
<<<<<<< HEAD
                    if(key[0] != ['['])
                    {
                        ele = "<h6> Ad-Group for " + key + ":</h6>"
                        results_keywordsHTML = results_keywordsHTML + ele;
                    }
=======
>>>>>>> f3c57e9cf3f2cb5cb64acb1d36b9d26a36a08197
                    for(let keyword of value)
                    {
                        if(k == value.length -1)
                            ele = '<label>' + keyword +"."+ '</label>';
                        else
                            ele = '<label>' + keyword+ ",&nbsp" + '</label>'
                        results_keywordsHTML = results_keywordsHTML + ele;
                        k++;
                    }
                    ele = "</div>"
                    results_keywordsHTML = results_keywordsHTML + ele;

                }
                ele = "</div>"
                results_keywordsHTML = results_keywordsHTML + ele;
<<<<<<< HEAD
=======
                // let price = this.state.price;
                // price[x] = 1;
                // this.setState({price: price});
>>>>>>> f3c57e9cf3f2cb5cb64acb1d36b9d26a36a08197
                
            }
            results_keywords.innerHTML = results_keywordsHTML;


            // let filteredUspKeywords = document.getElementById("usp-keywords");
            // let filteredUspKeywordsHTML = '';
            // for(let i = 0;i< this.state.uspId;i++)
            // {
            //     console.log("here")
                
            //     let ele = "<div style = 'text-align: left;'><h6>Preferred keywords for " + this.state.allUsp[i]['usp'] + ":</h6>"
            //     filteredUspKeywordsHTML = filteredUspKeywordsHTML + ele;
            //     for(let x of response.data['message'][10][1+i])
            //     {   
            //         // let price = this.state.price;
            //         // price[x] = 1;
            //         // this.setState({price: price});
            //         let reElement  = "<div><label>" + x + "</label></div>";
            //         filteredUspKeywordsHTML = filteredUspKeywordsHTML + reElement;
            //     }
            //     ele = "</div>"
            //     filteredUspKeywordsHTML = filteredUspKeywordsHTML + ele;


            // }

            // filteredUspKeywords.innerHTML = filteredUspKeywordsHTML;
            let filteredUspKeywordsHTML = ''
            let negKeywords = document.getElementById("negative-keywrods");
            let l = document.getElementById("makeNwordList")
<<<<<<< HEAD
            // console.log('checked =' + l.checked)
=======
            console.log('checked =' + l.checked)
>>>>>>> f3c57e9cf3f2cb5cb64acb1d36b9d26a36a08197
            if(l.checked)
            {
                let negKeywordsHTML = '';
                let ele = "<div style = 'text-align: left;'><h6>Negative Keywords:</h6>"
                negKeywordsHTML = negKeywordsHTML + ele;
<<<<<<< HEAD
                for(let x of response.data['message']['neg_words'])
=======
                for(let x of response.data['message'][9])
>>>>>>> f3c57e9cf3f2cb5cb64acb1d36b9d26a36a08197
                {
                    let reElement  = "<div><label>" + x + "</label></div>";
                    negKeywordsHTML = negKeywordsHTML + reElement; 
                }
                ele = "</div>"
                filteredUspKeywordsHTML = filteredUspKeywordsHTML + ele;
                negKeywords.innerHTML = negKeywordsHTML;
                negKeywords.style.display = 'block'
            }
            else
                negKeywords.style.display = 'none'
<<<<<<< HEAD
            // console.log(response.data)
            this.setState({loading: false});
            document.getElementById("results").style.display = 'block';
            
        }).catch((e) =>{
            this.setState({loading: false})
            document.getElementById("error3").innerHTML = "<label style = {{color: 'red'}}>Retry in 30secs</label>";
            document.getElementById("error3").style.gridTemplateRows = '1fr';
            
            console.log("Network error")
=======
            console.log(response.data)
            this.setState({loading: false});
            document.getElementById("results").style.display = 'block';
            
>>>>>>> f3c57e9cf3f2cb5cb64acb1d36b9d26a36a08197
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
<<<<<<< HEAD
        // this.setState({loading: true});
=======
        this.setState({loading: true});
>>>>>>> f3c57e9cf3f2cb5cb64acb1d36b9d26a36a08197
        p.preventDefault();
        // console.log(this.state.name);
        // console.log(this.state.productKeywords);
        // console.log(this.state.category);
        // console.log(this.state.landingPage);
        // console.log(this.state.startingPrice);

        

<<<<<<< HEAD
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

=======

        let uspForm = document.getElementById("usp-form");
        uspForm.style.display = 'block';
        document.getElementById("second-form").style.display = 'none';
>>>>>>> f3c57e9cf3f2cb5cb64acb1d36b9d26a36a08197

        this.setState({loading: false});
    }


    saveOrUpdateProduct = (p) => {
        this.setState({loading: true});
<<<<<<< HEAD
        
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
        document.getElementById("error2").style.gridTemplateRows = '0fr'
        document.getElementById("uspKeywords").style.borderColor = '1px solid #ced4da'

        
        if(this.state.productUsp != '')
=======

        p.preventDefault();
        if(this.state.productUsp != '' && this.state.identifierWords != '')
>>>>>>> f3c57e9cf3f2cb5cb64acb1d36b9d26a36a08197
        {
            let au = this.state.allUsp;
            let temp = {};
            temp['usp'] = this.state.productUsp;
            temp['identifierWords'] = this.state.identifierWords;
            temp['uspKeyWords'] = this.state.uspKeyWords;
<<<<<<< HEAD

            console.log("tmep = ", temp)
=======
>>>>>>> f3c57e9cf3f2cb5cb64acb1d36b9d26a36a08197
            au[this.state.uspId] = temp;
            this.state.uspId++;
            this.setState({productUsp: ''});
            this.setState({identifierWords: ''});
            this.setState({uspKeyWords: ''});
            this.setState({allUsp: au});
<<<<<<< HEAD
        }

        if(this.state.addAnotherUsp == true)
            return;

        let product = {name: this.state.name, call: true, brand: this.state.brand,madein:this.state.madein, price: this.state.price, uspId: this.state.uspId, allUsp: this.state.allUsp, formData: this.state.formData,
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
=======

            console.log(this.state.allUsp);
        }
        let product = {name: this.state.name, brand: this.state.brand,madein:this.state.madein, price: this.state.price, uspId: this.state.uspId, allUsp: this.state.allUsp, formData: this.state.formData,
        offline: this.state.offline, online: this.state.online, locality: this.state.locality, targetAudienceLocation: this.state.targetAudienceLocation, targetArea: this.state.targetArea, 
        landingPage: this.state.landingPage, category: this.state.category, startingPrice: this.state.startingPrice, productKeywords: this.state.productKeywords};
        // console.log('product => ' + JSON.stringify(product));
            
       

        this.createProduct(product).then((response)=>{
            // return;
            // console.log(response.data['message'][0]);
            console.log(response.data);
            this.setState({loading: false});
            // this.setState({all_generated_keywords: response.data['message'][8]})
            let o = response.data['message'][8];
>>>>>>> f3c57e9cf3f2cb5cb64acb1d36b9d26a36a08197
            let temp = this.state.all_generated_keywords
            for(let i = 0;i < o.length;i++)
            {
                temp.push(o[i])
            }
<<<<<<< HEAD
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
=======
            console.log("temp = ", temp)
            this.setState({all_generated_keywords: temp})
            console.log("allGen..")
            console.log(this.state.all_generated_keywords)

            let o2 = response.data['message'][9];
            let temp2 = this.state.all_nGrams
            for(let i = 0;i < o2.length;i++)
            {
                temp2.push(o2[i])
            }
            
            this.setState({all_nGrams: temp2})
            console.log("allNG=")
            console.log(this.state.all_nGrams)
            // console.log(this.state.all_generated_keywrods)
            document.getElementById("second-form").remove();

            // let occasions = document.getElementById("occasions");
            // let occasionHTML = '';
            // for(let x of response.data['message'][0])
>>>>>>> f3c57e9cf3f2cb5cb64acb1d36b9d26a36a08197
            // {  
            //     let price = this.state.price;
            //     price[x] = 1;
            //     this.setState({price: price});
<<<<<<< HEAD
            //     let coElement  = "<input style='opacity:0; position:absolute; left:0px;'  type = 'checkbox' value ='" + x + "' className = 'checkbox ' checked  autocomplete = 'off' id = 'co" + x + "'/> \n  <label id = 'co+" + x + "' class = ' checkbox btn btn-primary labels' for = 'co" + x+ "'>" + x + "</label> \n";
            //     companiesHTML = companiesHTML + coElement;
            // }
            // companies.innerHTML = companiesHTML;
            // companies.style.display = 'none';
=======
            //     let ocElement  = "<input style='opacity:0; position:absolute; left:0px;'  type = 'checkbox' value ='" + x + "' className = 'checkbox' checked  autocomplete = 'off' id = 'oc" + x + "'/> \n  <label value = '" + x + "' class = ' checkbox btn btn-primary labels' for = 'oc" + x+ "'>" + x + "</label> \n";
            //     occasionHTML = occasionHTML + ocElement;
            // }
            // occasions.innerHTML = occasionHTML;


            let applications = document.getElementById("applications");
            let applicationsHTML = '';
            for(let x of response.data['message'][5])
            {  
                let price = this.state.price;
                price[x] = 1;
                this.setState({price: price});
                let delButton = '<div style = "postion: absolute;" class = "delButtonContainer"><button id="delre' + x+ '" class = " delButton"><span class = "delButtonLabel2">-</span></button></div>'
                // let addButton = '<div style = "postion: absolute;" class = "delButtonContainer"><button class = " delButton"><span class = "delButtonLabel2">-</span></button></div>'
                console.log(delButton)

                let reElement  = "<div style = 'display: flex; position: relative;' > <input style='opacity:0; position:absolute; left:0px;'  type = 'checkbox' value ='" + x + "' className = 'checkbox ' checked  autocomplete = 'off' id = 're" + x + "'/> \n  <label id = 're+" + x + "'class = ' checkbox btn btn-primary labels' for = 're" + x+ "'>" + x +"</label>"+ delButton+"</div>\n ";
                applicationsHTML = applicationsHTML + reElement;
            }
            applications.innerHTML = applicationsHTML;

            
            let materialTypes = document.getElementById("materialType");
            let materialTypesHTML = '';
            for(let x of response.data['message'][1])
            {  
                let price = this.state.price;
                price[x] = 1;
                this.setState({price: price});
                let delButton = '<div style = "postion: absolute;" class = "delButtonContainer"><button id="delpr' + x+ '" class = " delButton"><span class = "delButtonLabel2">-</span></button></div>'
                let prElement  = "<div style = 'display: flex; position: relative;' > <input style='opacity:0; position:absolute; left:0px;'  type = 'checkbox' value ='" + x + "' className = 'checkbox ' checked  autocomplete = 'off' id = 'pr" + x + "'/> \n  <label id = 'pr+" + x + "'class = ' checkbox btn btn-primary labels' for = 'pr" + x+ "'>" + x +"</label>"+ delButton+"</div>\n ";
                // let prElement  = "<input style='opacity:0; position:absolute; left:0px;'  type = 'checkbox' value ='" + x + "' className = 'checkbox ' checked  autocomplete = 'off' id = 'pr" + x + "'/> \n  <label id = 'pr+" + x + "' class = ' checkbox btn btn-primary labels' for = 'pr" + x+ "'>" + x + "</label> \n";
                materialTypesHTML = materialTypesHTML + prElement;
            }
            materialTypes.innerHTML = materialTypesHTML;



            let designs = document.getElementById("designs");
            let designsHTML = '';
            for(let x of response.data['message'][3])
            {  
                let price = this.state.price;
                price[x] = 1;
                this.setState({price: price});
                let delButton = '<div style = "postion: absolute;" class = "delButtonContainer"><button id="delde' + x+ '" class = " delButton"><span class = "delButtonLabel2">-</span></button></div>'
                let deElement  = "<div style = 'display: flex; position: relative;' > <input style='opacity:0; position:absolute; left:0px;'  type = 'checkbox' value ='" + x + "' className = 'checkbox ' checked  autocomplete = 'off' id = 'de" + x + "'/> \n  <label id = 'de+" + x + "'class = ' checkbox btn btn-primary labels' for = 'de" + x+ "'>" + x +"</label>"+ delButton+"</div>\n ";
                // let deElement  = "<input style='opacity:0; position:absolute; left:0px;'  type = 'checkbox' value ='" + x + "' className = 'checkbox ' checked   autocomplete = 'off' id = 'de" + x + "'/> \n  <label id = 'de+" + x + "' class = ' checkbox btn btn-primary labels' for = 'de" + x+ "'>" + x + "</label> \n";
                designsHTML = designsHTML + deElement;
            }
            designs.innerHTML = designsHTML;



            let services = document.getElementById("services");
            let servicesHTML = '';
            for(let x of response.data['message'][4])
            {  
                let price = this.state.price;
                price[x] = 1;
                this.setState({price: price});
                let delButton = '<div style = "postion: absolute;" class = "delButtonContainer"><button id="delse' + x+ '" class = " delButton"><span class = "delButtonLabel2">-</span></button></div>'
                let seElement  = "<div style = 'display: flex; position: relative;' > <input style='opacity:0; position:absolute; left:0px;'  type = 'checkbox' value ='" + x + "' className = 'checkbox ' checked  autocomplete = 'off' id = 'se" + x + "'/> \n  <label id = 'se+" + x + "'class = ' checkbox btn btn-primary labels' for = 'se" + x+ "'>" + x +"</label>"+ delButton+"</div>\n ";
                // let seElement  = "<input style='opacity:0; position:absolute; left:0px;'  type = 'checkbox' value ='" + x + "' className = 'checkbox ' checked  autocomplete = 'off' id = 'se" + x + "'/> \n  <label id = 'se+" + x + "' class = ' checkbox btn btn-primary labels' for = 'se" + x+ "'>" + x + "</label> \n";
                servicesHTML = servicesHTML + seElement;
            }
            services.innerHTML = servicesHTML;

            

            let productType = document.getElementById("productType");
            let productTypeHTML = '';
            for(let x of response.data['message'][2])
            {  
                let price = this.state.price;
                price[x] = 1;
                this.setState({price: price});
                let delButton = '<div style = "postion: absolute;" class = "delButtonContainer"><button id="delpl' + x+ '" class = " delButton"><span class = "delButtonLabel2">-</span></button></div>'
                let plElement  = "<div style = 'display: flex; position: relative;' > <input style='opacity:0; position:absolute; left:0px;'  type = 'checkbox' value ='" + x + "' className = 'checkbox ' checked  autocomplete = 'off' id = 'pl" + x + "'/> \n  <label id = 'pl+" + x + "'class = ' checkbox btn btn-primary labels' for = 'pl" + x+ "'>" + x +"</label>"+ delButton+"</div>\n ";
                // let plElement  = "<input style='opacity:0; position:absolute; left:0px;'  type = 'checkbox' value ='" + x + "' className = 'checkbox ' checked  autocomplete = 'off' id = 'pl" + x + "'/> \n  <label id = 'pl+" + x + "' class = ' checkbox btn btn-primary labels' for = 'pl" + x+ "'>" + x + "</label> \n";
                productTypeHTML = productTypeHTML + plElement;
            }
            productType.innerHTML = productTypeHTML;




            let companies = document.getElementById("companies");
            let companiesHTML = '';
            for(let x of response.data['message'][6])
            {  
                let price = this.state.price;
                price[x] = 1;
                this.setState({price: price});
                let coElement  = "<input style='opacity:0; position:absolute; left:0px;'  type = 'checkbox' value ='" + x + "' className = 'checkbox ' checked  autocomplete = 'off' id = 'co" + x + "'/> \n  <label id = 'co+" + x + "' class = ' checkbox btn btn-primary labels' for = 'co" + x+ "'>" + x + "</label> \n";
                companiesHTML = companiesHTML + coElement;
            }
            companies.innerHTML = companiesHTML;
            companies.style.display = 'none';
>>>>>>> f3c57e9cf3f2cb5cb64acb1d36b9d26a36a08197


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
            
<<<<<<< HEAD

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
=======
            let checkboxes = document.querySelectorAll('.checkbox');
            let that = this;
            // console.log(this);
            // console.log(that);
>>>>>>> f3c57e9cf3f2cb5cb64acb1d36b9d26a36a08197
            for( let checkboxx of checkboxes)
            {
                // console.log(checkboxx.value)
                checkboxx.addEventListener('click', function(){
                    if(this.nodeName == 'INPUT')
                        return;
                    
<<<<<<< HEAD
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
=======
                    // console.log(this.id);
                    let cId = String(this.id)
                    
                    let pId = String(this.id).substring(0,2)
                    console.log("Cid = " + cId)
                    console.log("pId = " + pId);
                    let pCb = document.getElementById(pId);
                    console.log(pCb)
                    console.log(pCb.checked)
                    // console.log(cId + " " + pId);

                    if(this.checked == true )
                    {   
                        // this.checked = false;
                        if(cId.length == 3)
                        {
                            this.checked = false;
                            this.style.backgroundColor = 'skyblue';
                            this.style.color = 'black';
                            this.style.boxShadow = 'rgb(170, 170, 170) -2px 2px 0px';
                        }
                        else
                        {
                            this.style.backgroundColor = 'white';
                            this.style.color = 'black';
                            this.style.boxShadow = 'rgb(170, 170, 170) -5px 5px 0px';
                            this.checked = false;
                            let s = String(this.innerHTML);
                            // d[s] = 1;
                            let price = that.state.price;
                            price[s] = 1

                            that.setState({price: price})
                        }
                        

                        


                    }
                    else
                    {
                        if(cId.length == 3)
                        {
                            this.checked = true
                            this.style.backgroundColor = 'black';
                            this.style.color = 'white';
                        }
                        else
                        {    
                            this.style.backgroundColor = 'black';
                            this.style.color = 'white';
                            this.style.boxShadow = '0px 0px 0px';
                            this.checked = true;
                            let s = String(this.innerHTML);

                            let price = that.state.price;
                            
                            if(pCb.checked == false)
                                price[s] = 2;
                            else
                                price[s] = 3;
                            that.setState({price:price})

                            
                            that.setState({price: price})
                        }

                        // console.log("you unchecked the checkbox");

>>>>>>> f3c57e9cf3f2cb5cb64acb1d36b9d26a36a08197
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
<<<<<<< HEAD
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
=======
                    
                    price[x] = 4

                    that.setState({price: price})

                    console.log(that.state.price)
                    console.log(delId);
                    console.log(x)
                    let l = document.getElementById(pId+'+' + x).checked = true;
                    document.getElementById(pId+'+' + x).style.display = 'none';
                    document.getElementById(pId+ '+' + x).style.margin = '0px';

                    document.getElementById(pId + '' + x).style.display = 'none';
                    document.getElementById(pId + '' + x).style.margin = '0px';


                    this.style.display = 'none';
>>>>>>> f3c57e9cf3f2cb5cb64acb1d36b9d26a36a08197

                })
            }


            document.getElementById("post-form").style.display = 'block'
<<<<<<< HEAD
            document.getElementById("usp-form").style.display = 'none'
            // setResults(response.data); 
        }).catch((e) =>{
            let err = document.getElementById("error2");
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
=======

            // setResults(response.data); 
        });
>>>>>>> f3c57e9cf3f2cb5cb64acb1d36b9d26a36a08197
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
<<<<<<< HEAD
        }} ></h1>);
=======
        }} >Attom</h1>);
>>>>>>> f3c57e9cf3f2cb5cb64acb1d36b9d26a36a08197
    }


    render(){
        const {loading} = this.state;
        const {online} = this.state;
        const {offline} = this.state;
<<<<<<< HEAD
        const {transactional} = this.state;
        const {educational} = this.state;
=======
>>>>>>> f3c57e9cf3f2cb5cb64acb1d36b9d26a36a08197
        return(
            <div>
            <div style={{
                margin: '0px',
                padding: '0px',
                minWidth: '600px',
<<<<<<< HEAD
                // maxWidth: '800px',
=======
                maxWidth: '800px',
>>>>>>> f3c57e9cf3f2cb5cb64acb1d36b9d26a36a08197
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
<<<<<<< HEAD
                                // justifyContent: 'center'23
                                
=======
                                // justifyContent: 'center'
>>>>>>> f3c57e9cf3f2cb5cb64acb1d36b9d26a36a08197
                                borderRadius: '14px'
                            }
                            }>
                                <div className = "card col" style={{
                                    borderRadius: '14px',
                                    borderColor: 'lightgray',
                                    minHeight: '350px',
                                    // height: '0px',
<<<<<<< HEAD
                                    maxHeight: '600px', 
=======
                                    maxHeight: '600px',
>>>>>>> f3c57e9cf3f2cb5cb64acb1d36b9d26a36a08197
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
<<<<<<< HEAD
=======
                                                        console.log(this.state.offline)
                                                        console.log(this.state.online)
>>>>>>> f3c57e9cf3f2cb5cb64acb1d36b9d26a36a08197
                                                    }} /> 
                                                    <label style= {{boxShadow: '0px 0px 0px', marginLeft: '4px'}}className = 'checkbox btn btn-primary labels' htmlFor = 'OfflineElement' >Offline</label>
                                                    </div>
                                                    <div>
                                                    <input name = "modeOfBusiness"
                                                    // style={{opacity:'0', position:'absolute'}} 
                                                    type = 'radio' value ='OnlineElement'   className = 'checkbox'  autoComplete = 'off' id = 'OnlineElement' onChange={e =>{
                                                        this.setState({offline: false})
                                                        this.setState({online: true})
<<<<<<< HEAD
=======
                                                        console.log(this.state.offline)
                                                        console.log(this.state.online)
>>>>>>> f3c57e9cf3f2cb5cb64acb1d36b9d26a36a08197

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
                                                
<<<<<<< HEAD




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
                                                


=======
>>>>>>> f3c57e9cf3f2cb5cb64acb1d36b9d26a36a08197
                        

                                            
                                            
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
<<<<<<< HEAD
                                    {/* <h2 style={{marginTop: '5px'}}>Product Details</h2> */}
=======
                                    <h2 style={{marginTop: '5px'}}>Product Details</h2>
>>>>>>> f3c57e9cf3f2cb5cb64acb1d36b9d26a36a08197
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
<<<<<<< HEAD
                                                }}>Landing page URL:  </label>
                                                </div>
                                                <input autoComplete="off"  name="landingPage" className="form-control" 
                                                    value={this.state.landingPage} onChange={this.changeLandingPageHandler}/>
                                            </div>
                                            {/* <div className = "form-group" style={{
=======
                                                }}>Enter Landing Page:  </label>
                                                </div>
                                                <input autoComplete="off" placeholder="Enter Landing Page" name="landingPage" className="form-control" 
                                                    value={this.state.landingPage} onChange={this.changeLandingPageHandler}/>
                                            </div>
                                            <div className = "form-group" style={{
>>>>>>> f3c57e9cf3f2cb5cb64acb1d36b9d26a36a08197
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
<<<<<<< HEAD
                                            </div> */}
                                            
                                            {/* <div className = "form-group" style={{
=======
                                            </div>
                                            <div className = "form-group" style={{
>>>>>>> f3c57e9cf3f2cb5cb64acb1d36b9d26a36a08197
                                                marginBottom: '2.0rem'
                                            }}>
                                                <div style={{
                                                    display: 'flex',
                                                    justifyContent: 'left'
                                                }}>
                                                <label style={{
                                                    // marginRight: '53%'
                                                }}>Enter product category:</label>
<<<<<<< HEAD
                                                </div> */}
                                                {/* <input autoComplete="off" placeholder="tiles/gifts" name="category" className="form-control" 
                                                    value={this.state.category} onChange={this.changeCategoryHandler}/> */}
                                                {/* <div style={{
                                                    display: 'flex',
                                                    justifyContent: 'left'
                                                }}> */}
                                                {/* <DropdownButton id="dropdown-basic-button" title= 'Select category' drop ={'down-centered'}>
=======
                                                </div>
                                                {/* <input autoComplete="off" placeholder="tiles/gifts" name="category" className="form-control" 
                                                    value={this.state.category} onChange={this.changeCategoryHandler}/> */}
                                                <div style={{
                                                    display: 'flex',
                                                    justifyContent: 'left'
                                                }}>
                                                <DropdownButton id="dropdown-basic-button" title= 'Select category' drop ={'down-centered'}>
>>>>>>> f3c57e9cf3f2cb5cb64acb1d36b9d26a36a08197
                                                    <Dropdown.Item onClick={(e)=>{
                                                        e.preventDefault();
                                                        this.state.category = 'tiles';
                                                        let b = document.getElementById("dropdown-basic-button");
<<<<<<< HEAD
                                                        b.title = this.state.category
                                                        b.innerHTML = "Tiles"
=======
                                                        console.log(b)
                                                        b.title = this.state.category
                                                        b.innerHTML = "Tiles"
                                                        console.log(this.state.category);
>>>>>>> f3c57e9cf3f2cb5cb64acb1d36b9d26a36a08197
                                                    }} href="#/action-1"><button className = "category-input" style={{
                                                        border: 'none' ,
                                                        background: 'none',
                                                        width: '100%',
                                                        textAlign: 'left'
                                                    }}  onClick={(e)=>{
                                                        e.preventDefault();
                                                        this.state.category = 'tiles';
                                                        let b = document.getElementById("dropdown-basic-button");
<<<<<<< HEAD
                                                        b.title = this.state.category
                                                        b.innerHTML = "Tiles"
=======
                                                        console.log(b)
                                                        b.title = this.state.category
                                                        b.innerHTML = "Tiles"
                                                        console.log(this.state.category);
>>>>>>> f3c57e9cf3f2cb5cb64acb1d36b9d26a36a08197
                                                    }} 
                                                    >Tiles</button></Dropdown.Item>
                                                </DropdownButton>
                                                </div>
                                                
<<<<<<< HEAD
                                            </div> */}
=======
                                            </div>
>>>>>>> f3c57e9cf3f2cb5cb64acb1d36b9d26a36a08197
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
<<<<<<< HEAD
                                                <input autoComplete="off"  name="startingPrice" className="form-control" 
=======
                                                <input autoComplete="off" placeholder="Enter keywords separated by ','" name="startingPrice" className="form-control" 
>>>>>>> f3c57e9cf3f2cb5cb64acb1d36b9d26a36a08197
                                                    value={this.state.startingPrice} onChange={this.changeStartingPriceHandler}/>
                                                
                                            </div>
                                            <div className = "form-group" style={{
                                                marginBottom: '2.0rem'
                                            }}>
<<<<<<< HEAD
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
                                                        
                                                        {!loading && <span style={{color: 'white'}}>{">>"}</span>}
                                                    </button>
                                                    </div>
                                                    <div id= 'parse'><div></div></div>
                                                    </div>
                                                    
                                                </div>
                                                
                                                <div id = 'error' style={{color: 'red',
                                                    textAlign:'left'}}><label></label></div>
=======
                                                <div style={{
                                                    display: 'flex',
                                                    justifyContent: 'left'
                                                }}>
                                                <label style={{
                                                    // marginRight: '53%'
                                                }}>Enter keywords related to your product:</label>
                                                </div>
                                                <input autoComplete="off" placeholder="Enter keywords separated by ','" name="productKeywords" className="form-control" 
                                                    value={this.state.productKeywords} onChange={this.changeProductKeywordsHandler}/>
                                                
                                            </div>
>>>>>>> f3c57e9cf3f2cb5cb64acb1d36b9d26a36a08197
                                            
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
<<<<<<< HEAD
                                                <input id= "productUsp" autoComplete="off" placeholder="Enter product benefits/solutions" name="Product USP" className="form-control" 
                                                    value={this.state.productUsp} onChange={this.changeProductUspHandler}/>
                                            </div>
                                            {/* <div className = "form-group" style={{
=======
                                                <input autoComplete="off" placeholder="Enter product benefits/solutions" name="Product USP" className="form-control" 
                                                    value={this.state.productUsp} onChange={this.changeProductUspHandler}/>
                                            </div>
                                            <div className = "form-group" style={{
>>>>>>> f3c57e9cf3f2cb5cb64acb1d36b9d26a36a08197
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
<<<<<<< HEAD
                                            </div> */}
=======
                                            </div>
>>>>>>> f3c57e9cf3f2cb5cb64acb1d36b9d26a36a08197
                                            <div className = "form-group" style={{
                                                marginBottom: '2.0rem',
                                                justifyContent: 'left'
                                            }}>
                                                <div style={{
                                                    display: 'flex',
                                                    justifyContent: 'left'
                                                }}>
                                                <label style={{
<<<<<<< HEAD
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
                                                        {loading && <FaCircleNotch className="App-logo" style={{
                                                            marginLeft: '22px', 
                                                            marginRight: '22px'
                                                        }}></FaCircleNotch>}
                                                        {!loading && <span style={{color: 'white'}}>{">>"}</span>}
                                                </button>
                                                </div>
                                                <div style={{textAlign: 'left'}}id = 'parse2'><div></div></div>
                                            </div>
                                            
                                            <div id = 'error2' style={{
                                                color: 'red',
                                                textAlign: 'left'
                                            }}><label></label></div>
=======
                                                    // marginRight: '53%'
                                                }}>Enter keywords related to product USP</label>
                                                </div>
                                                <input autoComplete="off" placeholder="Enter keywords separated by ','" name="uspKeywords" className="form-control" 
                                                    value={this.state.uspKeyWords} onChange={this.changeUspKeywordsHandler}/>
                                                
                                            </div>
                                            
>>>>>>> f3c57e9cf3f2cb5cb64acb1d36b9d26a36a08197
                                            
                                            
                                            
                                             
                                            

                                            
                                            
<<<<<<< HEAD
                                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
=======
                                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
>>>>>>> f3c57e9cf3f2cb5cb64acb1d36b9d26a36a08197
                                            <button className="btn" id="previous-button2" style={{
                                                backgroundColor: 'white',
                                                padding: '0px 0px',
                                                borderRadius: '12px', 
                                                color: 'black',
                                                // borderColor: 'black',
<<<<<<< HEAD
                                                // marginTop: '50px'
=======
                                                marginTop: '50px'
>>>>>>> f3c57e9cf3f2cb5cb64acb1d36b9d26a36a08197
                                            }} onClick={(e)=>{
                                                e.preventDefault();
                                                document.getElementById("second-form").style.display = 'block';
                                                document.getElementById("usp-form").style.display = 'none';
<<<<<<< HEAD
                                                let temp = this.state.price
                                                temp  = {}
                                                this.setState({price: temp})
                                                let parse = document.getElementById("parse2")

                                                parse.innerHTML = "<div></div>"
                                                parse.style.gridTemplateRows = '0fr';
                                                this.setState({uspKeyWords: ''})
=======
>>>>>>> f3c57e9cf3f2cb5cb64acb1d36b9d26a36a08197

                                            }}
                                            disabled = {loading}>
                                                {loading && <FaCircleNotch className="App-logo" style={{
                                                    marginLeft: '22px', 
<<<<<<< HEAD
                                                    marginRight: '22px',
                                                    // marginTop: '0px'
=======
                                                    marginRight: '22px'
>>>>>>> f3c57e9cf3f2cb5cb64acb1d36b9d26a36a08197
                                                }}></FaCircleNotch>}
                                                {!loading && <span>{"< "}Previous</span>}
                                                </button>
                                            
                                            <button className="btn" id="Enter-another-usp-button" style={{
                                                backgroundColor: 'black',
                                                padding: '14px 30px',
                                                borderRadius: '12px', 
                                                color: 'white',
                                                border: 'none',
<<<<<<< HEAD
                                                // marginTop: '50px'
                                            }} onClick={(e) =>{
                                                if(this.state.uspKeyWords == '' && this.state.productUsp == '')
                                                    return;
                                                this.setState({addAnotherUsp: true})
                                                this.saveOrUpdateProduct(e)
                                                this.setState({addAnotherUsp: false});
=======
                                                marginTop: '50px'
                                            }} onClick={(e) =>{
                                                e.preventDefault();
                                                let au = this.state.allUsp;
                                                let temp = {};
                                                temp['usp'] = this.state.productUsp;
                                                temp['identifierWords'] = this.state.identifierWords;
                                                temp['uspKeyWords'] = this.state.uspKeyWords;
                                                au[this.state.uspId] = temp;
                                                this.state.uspId++;
                                                this.setState({productUsp: ''});
                                                this.setState({identifierWords: ''});
                                                this.setState({uspKeyWords: ''});
                                                this.setState({allUsp: au});

                                                console.log(this.state.allUsp);
>>>>>>> f3c57e9cf3f2cb5cb64acb1d36b9d26a36a08197

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
<<<<<<< HEAD
                                                // marginTop: '50px'
=======
                                                marginTop: '50px'
>>>>>>> f3c57e9cf3f2cb5cb64acb1d36b9d26a36a08197
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
<<<<<<< HEAD
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
                                                
                                                

                                                
=======
>>>>>>> f3c57e9cf3f2cb5cb64acb1d36b9d26a36a08197
                                                <div style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    marginBottom: '10px'
                                                }}>
                                                <label style={{
<<<<<<< HEAD
                                                }} >Select Ad-group themes and mark negative keywords: </label>
                                                {/* <div style={{
                                                    textAlign: 'left'
                                                }}>
                                                <div style = {{
                                                    display:'none'
                                                }}>
                                               
=======
                                                    marginRight: '10px'
                                                }} >Select the related products that you offer: </label>
                                                <div style={{
                                                    textAlign: 'left'
                                                }}>
                                                <div>
>>>>>>> f3c57e9cf3f2cb5cb64acb1d36b9d26a36a08197
                                                <input style={{
                                                    


                                                }}  
<<<<<<< HEAD
                                                type = 'checkbox' value ='re' className = 'checkbox ' defaultChecked   autoComplete = 'off' id = 're'/>   <label id= 're+' className = ' checkbox ' htmlFor = 're'>Make AdGroup</label>  */}
                                                {/* </div> */}
                                                {/* <div><input style={{marginRight: '4px'}} type = 'checkbox' value ='remakeNwordList'  autoComplete = 'off' placeholder="make nwrods" id = 'remakeNwordList'></input><label>Mark unchecked as negative keywords</label></div> */}
                                                {/* </div> */}
=======
                                                type = 'checkbox' value ='pl' className = 'checkbox '    autoComplete = 'off' id = 'pl'/>   <label id= 'pl+' className = ' checkbox ' htmlFor = 'pl'>Make AdGroup</label> 
                                                </div>
                                                <div><input style={{marginRight: '4px'}} type = 'checkbox' value ='plmakeNwordList'  autoComplete = 'off' placeholder="make nwrods" id = 'plmakeNwordList'></input><label>Mark unchecked as negative keywords</label></div>
                                                </div>
                                                </div>
                                                {/* </div> */}
                                                <div id="productType" style={{
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
                                                }} >Your product is relevent for: </label>
                                                <div style={{
                                                    textAlign: 'left'
                                                }}>
                                                <div>
                                                <input style={{
                                                    


                                                }}  
                                                type = 'checkbox' value ='re' className = 'checkbox '    autoComplete = 'off' id = 're'/>   <label id= 're+' className = ' checkbox ' htmlFor = 're'>Make AdGroup</label> 
                                                </div>
                                                <div><input style={{marginRight: '4px'}} type = 'checkbox' value ='remakeNwordList'  autoComplete = 'off' placeholder="make nwrods" id = 'remakeNwordList'></input><label>Mark unchecked as negative keywords</label></div>
                                                </div>
>>>>>>> f3c57e9cf3f2cb5cb64acb1d36b9d26a36a08197
                                                </div>

                                                <div id="applications" style={{
                                                    display: 'flex',
                                                    marginBottom: '40px',
                                                    flexWrap: 'wrap',
                                                    gap: '12px',
<<<<<<< HEAD
                                                    justifyContent: 'left', 
                                                    textAlign: 'left'
=======
                                                    justifyContent: 'left'
>>>>>>> f3c57e9cf3f2cb5cb64acb1d36b9d26a36a08197
                                                }}>
                                                </div>


                                                


<<<<<<< HEAD
                                                {/* <div style={{
=======
                                                <div style={{
>>>>>>> f3c57e9cf3f2cb5cb64acb1d36b9d26a36a08197
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
<<<<<<< HEAD
                                                <div style = {{
                                                    display:'none'
                                                }}>
                                               
=======
                                                <div>
>>>>>>> f3c57e9cf3f2cb5cb64acb1d36b9d26a36a08197
                                                <input style={{
                                                    


                                                }}  
<<<<<<< HEAD
                                                type = 'checkbox' value ='pr' className = 'checkbox '   defaultChecked autoComplete = 'off' id = 'pr'/>   <label id= 'pr+' className = ' checkbox ' htmlFor = 'pr'>Make AdGroup</label> 
=======
                                                type = 'checkbox' value ='pr' className = 'checkbox '    autoComplete = 'off' id = 'pr'/>   <label id= 'pr+' className = ' checkbox ' htmlFor = 'pr'>Make AdGroup</label> 
>>>>>>> f3c57e9cf3f2cb5cb64acb1d36b9d26a36a08197
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
<<<<<<< HEAD
                                                <div style = {{
                                                    display:'none'
                                                }}>
                                               
=======
                                                <div>
>>>>>>> f3c57e9cf3f2cb5cb64acb1d36b9d26a36a08197
                                                <input style={{
                                                    


                                                }}  
<<<<<<< HEAD
                                                type = 'checkbox' value ='de' className = 'checkbox '   defaultChecked    autoComplete = 'off' id = 'de'/>   <label id= 'de+' className = ' checkbox ' htmlFor = 'de'>Make AdGroup</label> 
=======
                                                type = 'checkbox' value ='de' className = 'checkbox '    autoComplete = 'off' id = 'de'/>   <label id= 'de+' className = ' checkbox ' htmlFor = 'de'>Make AdGroup</label> 
>>>>>>> f3c57e9cf3f2cb5cb64acb1d36b9d26a36a08197
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
<<<<<<< HEAD
                                                </div> */}

{/* 
=======
                                                </div>


>>>>>>> f3c57e9cf3f2cb5cb64acb1d36b9d26a36a08197
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
<<<<<<< HEAD
                                                <div style = {{
                                                    display:'none'
                                                }}>
                                               
=======
                                                <div>
>>>>>>> f3c57e9cf3f2cb5cb64acb1d36b9d26a36a08197
                                                <input style={{
                                                    


                                                }}  
<<<<<<< HEAD
                                                type = 'checkbox' value ='se' className = 'checkbox '    defaultChecked   autoComplete = 'off' id = 'se'/>   <label id= 'se+' className = ' checkbox ' htmlFor = 'se'>Make AdGroup</label> 
=======
                                                type = 'checkbox' value ='se' className = 'checkbox '    autoComplete = 'off' id = 'se'/>   <label id= 'se+' className = ' checkbox ' htmlFor = 'se'>Make AdGroup</label> 
>>>>>>> f3c57e9cf3f2cb5cb64acb1d36b9d26a36a08197
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
<<<<<<< HEAD
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
=======
                                                </div>


                                                


                                                <div style={{
                                                    display: 'flex',
>>>>>>> f3c57e9cf3f2cb5cb64acb1d36b9d26a36a08197
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
<<<<<<< HEAD
                                                </div> */}
=======
                                                </div>
>>>>>>> f3c57e9cf3f2cb5cb64acb1d36b9d26a36a08197



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
                                            
<<<<<<< HEAD
                                            <div style={{
                                                display: 'grid',
                                                gridTemplateRows: '0fr',
                                                transition: 'gridTemplateRows 500ms'
                                            }}>
                                                <div id = "error3"></div>
                                            </div>
=======
    
>>>>>>> f3c57e9cf3f2cb5cb64acb1d36b9d26a36a08197
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
                                                    justifyContent: "left"
                                                }}>
                                                <div style={{
                                                    display: 'flex',
                                                    justifyContent: 'left',
<<<<<<< HEAD
                                                    width: '800px'
=======
                                                    width: '400px'
>>>>>>> f3c57e9cf3f2cb5cb64acb1d36b9d26a36a08197
                                                }} id = "results_keywords"></div>

                                                <div className="result-box" id="negative-keywrods" style={{
                                                    display: 'flex',
                                                    marginBottom: '40px',
                                                    marginLeft: '5px',
                                                    flexWrap: 'wrap',
                                                    gap: '12px',
                                                    justifyContent: 'left'
                                                }}>
                                                

                                                </div>
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
 







            </div>
            </div>
            
            

        );
    }

}