import React,{Component} from "react";
import axios from "axios";
import { useState } from "react";
import ProductService from "../service/FormService";
import {FaCircleNotch, FaXMark} from 'react-icons/fa'
import './Form.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import CloseButton from 'react-bootstrap/CloseButton';
const REST_API_URL="http://192.168.1.41:5000/";
// const REST_API_URL="https://d69qhe0538.execute-api.ap-south-1.amazonaws.com/";





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
            uspKeyWords: ''


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
        let resp = axios.post(REST_API_URL + '/form', product);

        return resp;
    }

     


    filter = (p) =>{
        
        this.setState({loading: true});
        p.preventDefault();

        
        let checkboxes = document.querySelectorAll('.checkbox');
        let that = this;
        // console.log(this);
        // console.log(that);
        for( let checkboxx of checkboxes)
        {
            if(checkboxx.nodeName == "INPUT")
                continue;
            

            let cId = String(checkboxx.id)
            let pId = String(checkboxx.id).substring(0,2)

            let pCb = document.getElementById(pId);
            if(checkboxx.checked == true)
            {
                if(cId.length != 3)
                {
                    let x = String(checkboxx.innerHTML);
                    let p = that.state.price;
                    if(p[x] == 4)
                    {
                        delete p.x;
                        that.setState({price: p})

                    }

                    else if(pCb.checked == false)
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
                if(cId.length != 3)
                {
                    let s = String(checkboxx.innerHTML);
                    // d[s] = 1;
                    let price = that.state.price;
                    price[s] = 1

                    that.setState({price: price})   
                }
            }
            

            // console.log(checkboxx.value)
        }

        console.log(this.state.price)


        let product = {name: this.state.name, brand: this.state.brand,madein:this.state.madein, price: this.state.price, uspId: this.state.uspId, allUsp: this.state.allUsp, formData: this.state.formData,
        offline: this.state.offline, online: this.state.online, locality: this.state.locality, targetAudienceLocation: this.state.targetAudienceLocation, targetArea: this.state.targetArea, 
        landingPage: this.state.landingPage, category: this.state.category, startingPrice: this.state.startingPrice, productKeywords: this.state.productKeywords};
            
        
        
        this.createProduct(product).then((response)=>{
            document.getElementById("post-form").style.display = 'none';

            let results_keywords = document.getElementById("results_keywords");
            let results_keywordsHTML = ''
            console.log(response.data)
            let k = 0
            console.log("allUsp = ")
            console.log(this.state.allUsp)
            for(let x of response.data['message'][10])
            {   
                let title = '';
                if(k == 0)
                    title = this.state.name;
                else
                    title = this.state.allUsp[k-1]['usp']
                k++;

                let ele = "<div><h6>Preferred keywords for " + title + ":</h6>"
                results_keywordsHTML = results_keywordsHTML + ele;

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
                    

                    ele = "<div class = 'result-box'>";
                    results_keywordsHTML = results_keywordsHTML + ele;
                    let k = 0;
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
                // let price = this.state.price;
                // price[x] = 1;
                // this.setState({price: price});
                
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
            console.log('checked =' + l.checked)
            if(l.checked)
            {
                let negKeywordsHTML = '';
                let ele = "<div style = 'text-align: left;'><h6>Negative Keywords:</h6>"
                negKeywordsHTML = negKeywordsHTML + ele;
                for(let x of response.data['message'][9])
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
            console.log(response.data)
            this.setState({loading: false});
            document.getElementById("results").style.display = 'block';
            
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
        this.setState({loading: true});
        p.preventDefault();
        // console.log(this.state.name);
        // console.log(this.state.productKeywords);
        // console.log(this.state.category);
        // console.log(this.state.landingPage);
        // console.log(this.state.startingPrice);

        


        let uspForm = document.getElementById("usp-form");
        uspForm.style.display = 'block';
        document.getElementById("second-form").style.display = 'none';

        this.setState({loading: false});
    }


    saveOrUpdateProduct = (p) => {
        this.setState({loading: true});

        p.preventDefault();
        if(this.state.productUsp != '' && this.state.identifierWords != '')
        {
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
        }
        let product = {name: this.state.name, brand: this.state.brand,madein:this.state.madein, price: this.state.price, uspId: this.state.uspId, allUsp: this.state.allUsp, formData: this.state.formData,
        offline: this.state.offline, online: this.state.online, locality: this.state.locality, targetAudienceLocation: this.state.targetAudienceLocation, targetArea: this.state.targetArea, 
        landingPage: this.state.landingPage, category: this.state.category, startingPrice: this.state.startingPrice, productKeywords: this.state.productKeywords};
        // console.log('product => ' + JSON.stringify(product));
            
       

        this.createProduct(product).then((response)=>{
            // return;
            // console.log(response.data['message'][0]);
            // console.log(response.data);
            this.setState({loading: false});
            document.getElementById("second-form").remove();

            // let occasions = document.getElementById("occasions");
            // let occasionHTML = '';
            // for(let x of response.data['message'][0])
            // {  
            //     let price = this.state.price;
            //     price[x] = 1;
            //     this.setState({price: price});
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
            
            let checkboxes = document.querySelectorAll('.checkbox');
            let that = this;
            // console.log(this);
            // console.log(that);
            for( let checkboxx of checkboxes)
            {
                // console.log(checkboxx.value)
                checkboxx.addEventListener('click', function(){
                    if(this.nodeName == 'INPUT')
                        return;
                    
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

                })
            }


            document.getElementById("post-form").style.display = 'block'

            // setResults(response.data); 
        });
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
        }} >Attom</h1>);
    }


    render(){
        const {loading} = this.state;
        const {online} = this.state;
        const {offline} = this.state;
        return(
            <div>
            <div style={{
                margin: '0px',
                padding: '0px',
                minWidth: '600px',
                maxWidth: '800px',
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
                                // justifyContent: 'center'
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
                                                        console.log(this.state.offline)
                                                        console.log(this.state.online)
                                                    }} /> 
                                                    <label style= {{boxShadow: '0px 0px 0px', marginLeft: '4px'}}className = 'checkbox btn btn-primary labels' htmlFor = 'OfflineElement' >Offline</label>
                                                    </div>
                                                    <div>
                                                    <input name = "modeOfBusiness"
                                                    // style={{opacity:'0', position:'absolute'}} 
                                                    type = 'radio' value ='OnlineElement'   className = 'checkbox'  autoComplete = 'off' id = 'OnlineElement' onChange={e =>{
                                                        this.setState({offline: false})
                                                        this.setState({online: true})
                                                        console.log(this.state.offline)
                                                        console.log(this.state.online)

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
                                    <h2 style={{marginTop: '5px'}}>Product Details</h2>
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
                                                }}>Enter Landing Page:  </label>
                                                </div>
                                                <input autoComplete="off" placeholder="Enter Landing Page" name="landingPage" className="form-control" 
                                                    value={this.state.landingPage} onChange={this.changeLandingPageHandler}/>
                                            </div>
                                            <div className = "form-group" style={{
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
                                            </div>
                                            <div className = "form-group" style={{
                                                marginBottom: '2.0rem'
                                            }}>
                                                <div style={{
                                                    display: 'flex',
                                                    justifyContent: 'left'
                                                }}>
                                                <label style={{
                                                    // marginRight: '53%'
                                                }}>Enter product category:</label>
                                                </div>
                                                {/* <input autoComplete="off" placeholder="tiles/gifts" name="category" className="form-control" 
                                                    value={this.state.category} onChange={this.changeCategoryHandler}/> */}
                                                <div style={{
                                                    display: 'flex',
                                                    justifyContent: 'left'
                                                }}>
                                                <DropdownButton id="dropdown-basic-button" title= 'Select category' drop ={'down-centered'}>
                                                    <Dropdown.Item onClick={(e)=>{
                                                        e.preventDefault();
                                                        this.state.category = 'tiles';
                                                        let b = document.getElementById("dropdown-basic-button");
                                                        console.log(b)
                                                        b.title = this.state.category
                                                        b.innerHTML = "Tiles"
                                                        console.log(this.state.category);
                                                    }} href="#/action-1"><button className = "category-input" style={{
                                                        border: 'none' ,
                                                        background: 'none',
                                                        width: '100%',
                                                        textAlign: 'left'
                                                    }}  onClick={(e)=>{
                                                        e.preventDefault();
                                                        this.state.category = 'tiles';
                                                        let b = document.getElementById("dropdown-basic-button");
                                                        console.log(b)
                                                        b.title = this.state.category
                                                        b.innerHTML = "Tiles"
                                                        console.log(this.state.category);
                                                    }} 
                                                    >Tiles</button></Dropdown.Item>
                                                </DropdownButton>
                                                </div>
                                                
                                            </div>
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
                                                <input autoComplete="off" placeholder="Enter keywords separated by ','" name="startingPrice" className="form-control" 
                                                    value={this.state.startingPrice} onChange={this.changeStartingPriceHandler}/>
                                                
                                            </div>
                                            <div className = "form-group" style={{
                                                marginBottom: '2.0rem'
                                            }}>
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
                                                <input autoComplete="off" placeholder="Enter product benefits/solutions" name="Product USP" className="form-control" 
                                                    value={this.state.productUsp} onChange={this.changeProductUspHandler}/>
                                            </div>
                                            <div className = "form-group" style={{
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
                                            </div>
                                            <div className = "form-group" style={{
                                                marginBottom: '2.0rem',
                                                justifyContent: 'left'
                                            }}>
                                                <div style={{
                                                    display: 'flex',
                                                    justifyContent: 'left'
                                                }}>
                                                <label style={{
                                                    // marginRight: '53%'
                                                }}>Enter keywords related to product USP</label>
                                                </div>
                                                <input autoComplete="off" placeholder="Enter keywords separated by ','" name="uspKeywords" className="form-control" 
                                                    value={this.state.uspKeyWords} onChange={this.changeUspKeywordsHandler}/>
                                                
                                            </div>
                                            
                                            
                                            
                                            
                                             
                                            

                                            
                                            
                                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                            <button className="btn" id="previous-button2" style={{
                                                backgroundColor: 'white',
                                                padding: '0px 0px',
                                                borderRadius: '12px', 
                                                color: 'black',
                                                // borderColor: 'black',
                                                marginTop: '50px'
                                            }} onClick={(e)=>{
                                                e.preventDefault();
                                                document.getElementById("second-form").style.display = 'block';
                                                document.getElementById("usp-form").style.display = 'none';

                                            }}
                                            disabled = {loading}>
                                                {loading && <FaCircleNotch className="App-logo" style={{
                                                    marginLeft: '22px', 
                                                    marginRight: '22px'
                                                }}></FaCircleNotch>}
                                                {!loading && <span>{"< "}Previous</span>}
                                                </button>
                                            
                                            <button className="btn" id="Enter-another-usp-button" style={{
                                                backgroundColor: 'black',
                                                padding: '14px 30px',
                                                borderRadius: '12px', 
                                                color: 'white',
                                                border: 'none',
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
                                                marginTop: '50px'
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
                                                <div style={{
                                                    display: 'flex',
                                                    justifyContent: 'left',
                                                    alignItems: 'center',
                                                    marginBottom: '10px'
                                                }}>
                                                <label style={{
                                                    marginRight: '10px'
                                                }} >Select the related products that you offer: </label>
                                                <input style={{
                                                    opacity:'0', 
                                                    position:'absolute', 
                                                    left:'0px'


                                                }}  
                                                type = 'checkbox' value ='pl' className = 'checkbox ' defaultChecked   autoComplete = 'off' id = 'pl'/>   <label id= 'pl+' className = ' checkbox btn btn-primary labels2' htmlFor = 'pl'>Make AdGroup</label> 
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
                                                    justifyContent: 'left',
                                                    alignItems: 'center',
                                                    marginBottom: '10px'
                                                }}>
                                                <label style={{
                                                    marginRight: '10px'
                                                }} >Your product is relevent for: </label>
                                                <input style={{
                                                    opacity:'0', 
                                                    position:'absolute', 
                                                    left:'0px'


                                                }}  
                                                type = 'checkbox' value ='re' className = 'checkbox ' defaultChecked   autoComplete = 'off' id = 're'/>   <label id= 're+' className = ' checkbox btn btn-primary labels2' htmlFor = 're'>Make AdGroup</label> 
                                                
                                                </div>

                                                <div id="applications" style={{
                                                    display: 'flex',
                                                    marginBottom: '40px',
                                                    flexWrap: 'wrap',
                                                    gap: '12px',
                                                    justifyContent: 'left'
                                                }}>
                                                </div>


                                                


                                                <div style={{
                                                    display: 'flex',
                                                    justifyContent: 'left',
                                                    alignItems: 'center',
                                                    marginBottom: '10px'
                                                }}>
                                                <label style={{
                                                    marginRight: '10px'
                                                }} >Select the material type that you offer: </label>
                                                <input style={{
                                                    opacity:'0', 
                                                    position:'absolute', 
                                                    left:'0px'


                                                }}  
                                                type = 'checkbox' value ='pr' className = 'checkbox ' defaultChecked   autoComplete = 'off' id = 'pr'/>   <label id= 'pr+' className = ' checkbox btn btn-primary labels2' htmlFor = 'pr'>Make AdGroup</label> 
                                                
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
                                                    justifyContent: 'left',
                                                    alignItems: 'center',
                                                    marginBottom: '10px'
                                                }}>
                                                <label style={{
                                                    marginRight: '10px'
                                                }} >Select the styles and designs that you offer: </label>
                                                <input style={{
                                                    opacity:'0', 
                                                    position:'absolute', 
                                                    left:'0px'


                                                }}  
                                                type = 'checkbox' value ='de' className = 'checkbox ' defaultChecked   autoComplete = 'off' id = 'de'/>   <label id= 'de+' className = ' checkbox btn btn-primary labels2' htmlFor = 'de'>Make AdGroup</label> 
                                                
                                                </div>
                                                <div id="designs" style={{
                                                    display: 'flex',
                                                    marginBottom: '40px',
                                                    flexWrap: 'wrap',
                                                    gap: '12px',
                                                    justifyContent: 'left'
                                                }}>
                                                </div>


                                                <div style={{
                                                    display: 'flex',
                                                    justifyContent: 'left',
                                                    alignItems: 'center',
                                                    marginBottom: '10px'
                                                }}>
                                                <label style={{
                                                    marginRight: '10px'
                                                }} >Select the services that you provide: </label>
                                                <input style={{
                                                    opacity:'0', 
                                                    position:'absolute', 
                                                    left:'0px'


                                                }}  
                                                type = 'checkbox' value ='se' className = 'checkbox ' defaultChecked   autoComplete = 'off' id = 'se'/>   <label id= 'se+' className = ' checkbox btn btn-primary labels2' htmlFor = 'se'>Make AdGroup</label> 
                                                
                                                </div>
                                                <div id="services" style={{
                                                    display: 'flex',
                                                    marginBottom: '40px',
                                                    flexWrap: 'wrap',
                                                    gap: '12px',
                                                    justifyContent: 'left'
                                                }}>
                                                </div>


                                                


                                                <div style={{
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

                                                <input style={{marginLeft: '5px'}} type = 'checkbox' value ='makeNwordList' defaultChecked autoComplete = 'off' placeholder="make nwrods" id = 'makeNwordList'></input><label>Make negative keywords list</label>
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
                                                    width: '400px'
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