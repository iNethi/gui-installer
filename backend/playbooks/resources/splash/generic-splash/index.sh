#!/bin/bash

source "../../root.conf"


cat <<EOF > index.html
<!DOCTYPE html>
<html>
<head>
<title>Page Title</title>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
* {
  box-sizing: border-box;
}

/* Style the body */
body {
  font-family:  -apple-system,system-ui;
  margin: 0;

   text-align: center;
    
}

    .login,
    .login-card h1,
    .login-help {
        text-align: center
}



.loginform {
    width: 280px;
    display: inline-block;
}

#error-message {
    text-align: center;
    color: #ff3e3e;
    font-style: italic;
}



.desktop {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
}

.desktop a, a:hover, a:visited, a:active {
  color: inherit;
  text-decoration: none;
 }

.imageContainer {
    padding: 10px;
    background-color: white;
    width: 100%;
    align-items: center
}


.banner {
    padding: 10px;
    background-color: #e0e0e0;

    width: 100%;
    align-items: center
}
  

.desktopItem {
    font-size: 0.875rem;
    line-height: 1.6;
    width: 100px;
    height: 100px;
    margin-left: 15px;
    margin-right: 15px;
    margin-bottom: 30px;
    margin-top: 30px;
}

.desktopItem2 {
    padding-top: 30px;
    padding-right: 20px;
    padding-bottom: 30px;
    padding-left: 20px;
    max-width: 320px;
    display: flex;
    flex-direction: row;
    flex: 1;
    flex-grow:1;
    flex-shrink: 1;
    flex-basis: 0%;
    box-sizing: border-box;
}

.desktopItemCol1 {
    opacity: 1;
    height: 73px;
    width: 73px;
    text-shadow: -2px 0 0 rgb(0 0 0 / 0%);
    padding: 16px;
    background-color: #f1c50e;
    border-radius: 50%; 
    display: block;
}

.desktopItemCol2 {
    padding-top: 0px;
    padding-bottom: 0px;
    padding-left:16px;
    display: flex;
    flex-direction: column;
    width: 220px;
    min-height: 198px;
    margin: 0 0 0 auto;
}
.desktopItemCol2 h3 {
    margin: 0px;
    font-family: 'Source Serif Pro',serif;
    text-align: left;
    text-transform: uppercase;
}

.desktopItemCol2 p {
    line-height: 1.6;
    text-align: left;
    font-size: 0.875rem;
}


.svg-content {
    width: 40px;
    fill: #f1c50e;
    box-sizing: border-box;

}
.floatButton {
    position: absolute;
    z-index: 100;
    top: 20px;
    right: 20px;
    font-family: 'Source Serif Pro',serif;
    background-color: rgb(88,136,196);
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    font-size: 16px;
    margin: 4px 2px;
    border-radius: 8px;
    cursor: pointer;
}

.floatButton:hover {
    background-color: rgb(169,196,229);
    color: rgb(74,124,193);
}

.absoluteButton {
    z-index: 100;
    top: 20px;
    right: 20px;
    background-color: #f1c50e;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    font-family: 'Source Serif Pro',serif;
    font-size: 16px;
    margin: 4px 2px;
    border-radius: 8px;
    cursor: pointer;
}

.absoluteButton:hover {
    background-color: rgb(169,196,229);
    color: rgb(74,124,193);
}

.absoluteButton2 {
    z-index: 100;
    top: 20px;
    right: 20px;
    background-color: rgb(88,136,196);
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    font-family: 'Source Serif Pro',serif;
    font-size: 16px;
    margin: 4px 2px;
    border-radius: 8px;
    cursor: pointer;
}

.absoluteButton2:hover {
    background-color: rgb(169,196,229);
    color: rgb(74,124,193);
}

.purchase-card {
    padding: 10px;
    width: 300px;
    background-color: #F7F7F7;
    margin: auto;
    border-radius: 2px;
    box-shadow: 0 2px 2px rgba(0, 0, 0, .3);
    overflow: hidden;
    text-align: left;
    position: absolute;
    z-index: 110;
    right: 10px;
    top: 100px;
    display: none
}

.login-card {
    font-size: 0.875rem;
    padding: 10px;
    width: 300px;
    background-color: #F7F7F7;
    margin: auto;
    border-radius: 2px;
    box-shadow: 0 2px 2px rgba(0, 0, 0, .3);
    overflow: hidden;

    position: absolute;
    z-index: 100;
    right: 10px;
    top: 100px;
    display: none
}

        .login-card h1 {
            font-weight: 400;
            font-size: 2.3em;
            color: #1383c6
        }

        .login-card h1 span {
            color: #f26721
        }

        .login-card img {
            width: 70%;
            height: 70%
        }

        .login-card input[type=submit] {
            width: 100%;
            display: block;
            margin-bottom: 10px;
            position: relative
        }

        .login-card input[type=text],
        input[type=password] {
            height: 44px;
            font-size: 16px;
            width: 100%;
            margin-bottom: 10px;
            -webkit-appearance: none;
            background: #fff;
            border: 1px solid #d9d9d9;
            border-top: 1px solid silver;
            padding: 0 8px;
            box-sizing: border-box;
            -moz-box-sizing: border-box
        }

        .login-card input[type=text]:hover,
        input[type=password]:hover {
            border: 1px solid #b9b9b9;
            border-top: 1px solid #a0a0a0;
            -moz-box-shadow: inset 0 1px 2px rgba(0, 0, 0, .1);
            -webkit-box-shadow: inset 0 1px 2px rgba(0, 0, 0, .1);
            box-shadow: inset 0 1px 2px rgba(0, 0, 0, .1)
        }

        .login {
            font-size: 14px;
            font-family: Arial, sans-serif;
            font-weight: 700;
            height: 36px;
            padding: 0 8px
        }

        .login-submit {
            cursor: pointer;
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            border: 0;
            color: #fff;
            text-shadow: 0 1px rgba(0, 0, 0, .1);
            background-color: rgb(88,136,196);
            border-radius: 8px;
        }



        .login-submit:disabled {
            background-color: #cecece
        }

        .login-submit:disabled:hover {
            background-color: #727272;
            color: white;
        }



        .login-submit:hover {
            border: 0;
            text-shadow: 0 1px rgba(0, 0, 0, .3);
            background-color: rgb(169,196,229);
            color: rgb(74,124,193);
        }


        .login-cancel {
            font-size: 14px;
            font-family: Arial, sans-serif;
            font-weight: 700;
            width: 100%;
            height: 36px;
            padding: 0 8px;
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            border: 0;
            color: #fff;
            cursor: pointer;
            text-shadow: 0 1px rgba(0, 0, 0, .1);
            border-radius: 8px;
            background-color: rgb(88,136,196)
        }


        .login-cancel:hover {
            border: 0;
            text-shadow: 0 1px rgba(0, 0, 0, .3);
            background-color: rgb(169,196,229);
            color: rgb(74,124,193);
        }

        .login-card a {
            text-decoration: none;
            color: #222;
            font-weight: 400;
            display: inline-block;
            opacity: .6;
            transition: opacity ease .5s
        }

        .login-card a:hover {
            opacity: 1
        }

        .login-help {
            width: 100%;
           
        }

        .login-help a {
            color: black;
        }


/* Header/logo Title */
.header {
  padding: 60px;
  text-align: center;
  background: #1abc9c;
  color: white;
}

/* Style the top navigation bar */
.navbar {
  display: flex;
  background-color: #333;
}

/* Style the navigation bar links */
.navbar a {
  color: white;
  padding: 14px 20px;
  text-decoration: none;
  text-align: center;
}

/* Change color on hover */
.navbar a:hover {
  background-color: #ddd;
  color: black;
}

/* Column container */
.row {  
  display: flex;
  flex-wrap: wrap;
}

/* Create two unequal columns that sits next to each other */
/* Sidebar/left column */
.side {
  flex: 30%;
  background-color: #f1f1f1;
  padding: 20px;
}

/* Main column */
.main {
  flex: 90%;
  background-color: white;
  padding: 20px;
}

/* Fake image, just for this example */
.fakeimg {
  background-color: #aaa;
  width: 100%;
  padding: 20px;
}

/* Footer */
.footer {
margin-top:50px;
    padding: 10px;
    width: 100%;
    background-color: #e0e0e0;
    color: black;
    text-align: center
}

.lineText {
    text-align: center;
    font-family: 'Source Serif Pro',serif;
    
}

.lineText h1,h2,h3,h4 {
   color: black;
}

.lineText h3,h4 {
   color:  #777777;
}



/* Responsive layout - when the screen is less than 700px wide, make the two columns stack on top of each other instead of next to each other */
@media screen and (max-width: 700px) {
  .row, .navbar {   
    flex-direction: column;
  }
}
</style>
</head>
<body>

<!-- Note -->
<!--<div style="background:yellow;padding:5px">
  <h4 style="text-align:center">Resize the browser window to see the responsive effect.</h4>
</div>-->

<!-- Header -->

  <div class="banner">
    <img src="captiveportal-inethilogo.png" style="width: 100%; max-width: 300px;">
    <div class="lineText">
        <h1>Connecting the d​ots for communities ... </h1>
    </div>
    
    <div class="lineText">
        <h3><i>Explore a world of free and iNethi club services that celebrate the creativity in your own community and dive into our large collection of education and entertainment resources.</i></h3>
    </div>
    <button class="absoluteButton"  onclick="window.location.href='https://inethi.org.za'"> LEARN MORE</button>
</br>
</br>
    <!--<button class="absoluteButton2" onclick="window.location.href='https://voucher.inethicloud.net'">PURCHASE VOUCHER</button>-->
    <button class="absoluteButton2" onclick="viewdiv('purchasecard')">PURCHASE VOUCHER</button>
  </div>
  
  <!--<button class="floatButton" type="button" onclick="viewdiv('logincard')">INTERNET</button>-->
  
  



<!-- The flexible grid (content) -->
<div class="login-card" , id="logincard">

    <span> <i>To access the Internet enter your username and password or voucher number. </i></span>
    <br />

    <br />
    <div class="loginform">
        <div id="error-message">
            #PORTAL_MESSAGE#
        </div>
        <form name="login_form" method="post" action="#PORTAL_ACTION#">
            <input type="text" name="auth_user" placeholder="User" id="auth_user">
            <input type="password" name="auth_pass" placeholder="Password" id="auth_pass">
            <br />
            <input onkeyup="copyFunction()" type="text" name="auth_voucher" placeholder="Voucher" id="auth_voucher">

            <div class="login-help">
               
                <label class="label--checkbox">
                    <input type="checkbox" class="checkbox"
                        onchange="document.getElementById('login').disabled = !this.checked;">
                    <span>I agree with the <a href="http://10.2.0.10/iNethi_AUP.pdf">Acceptance User
                            Policy</a> </span>
                    
                </label>
               
                    
                
            </div>
            <br/>
            <input name="redirurl" type="hidden" value="http://splash.inethi.net">
            <input type="submit" name="accept" class="login login-submit" value="Login" id="login" disabled>
            <button type="button" class="login-cancel" onclick="hidediv('logincard')" id="cancel">Cancel </button>
            <br/>
            <br/>
            <button type="button"  class="login-cancel" onclick="viewdiv('purchasecard')">Purchase voucher</button>
        </form>
    </div>




</div>
  

<div class="purchase-card" , id="purchasecard">

    <span>To use Sarafu dial <b>*384*96#</b> on Safaricom and </b>*483*46#</b> on Other networks</span>
    <br />
    <hr>
    <ul>
        <li>To buy 1-day of internet and 7 days of Inethi Services. Send <b>1 SRF</b> to 0757628885 </li>
        <li>To buy 1-week of internet and 30 days of Inethi Services. Send <b>5 SRF</b> to 0757628885  </li>
    </ul>
    <br/>
    <br/>
    <button type="button" class="login-cancel" onclick="hidediv('purchasecard')" >Cancel </button>

</div>
<!--<div class="desktop">

<div class=desktopItem>
    <a href="http://voucher.blackequations.co.za">
        <img src="captiveportal-voucher.png" height="80">
        <p></p>
    </a>
    <p> Buy an Internet Voucher </p>
</div>



<div class=desktopItem>
    <a href="https://www.grassrootseconomics.org">
        <img src="captiveportal-grassecon.png" height="80">
        <p></p>
    </a>
    <p> Grassroots Economics, Find out more </p>
</div>

<div class=desktopItem>
    <a href="https://wordpress.${inethiDN}/main" >
        <img src="captiveportal-inethi.png" height="80">
        <p></p>
    </a>
    <p> Explore a world of free fast content</p>
</div>

</div> -->



<div class="lineText">
    <h1>Free local services</h1>
</div>

<div class="lineText">
    <h3><i>Because learning should always be free</i></h3>
</div>


<div class="desktop">
    <a href="https://kiwix.${inethiDN}/wikipedia_en_all_mini_2022-01/">
    <!--<a href="https://kiwix.${inethiDN}/wikipedia_en_all_maxi_2021-12/">-->
    <div class="desktopItem2">
        <span class="desktopItemCol1">
            <img width=43px src="captiveportal-wikipedia.png" alt="">
        </span>
        <div class="desktopItemCol2" >
            <h3>Wikipedia</h3>
            <p > The world's largest free community-built encyclopedia</p>
            
            <svg class="svg-content" viewBox="0 0 268.832 268.832" x="0px" y="0px" id="svg-ac38" style="enable-background:new 0 0 268.832 268.832;"><g><path d="M265.171,125.577l-80-80c-4.881-4.881-12.797-4.881-17.678,0c-4.882,4.882-4.882,12.796,0,17.678l58.661,58.661H12.5   c-6.903,0-12.5,5.597-12.5,12.5c0,6.902,5.597,12.5,12.5,12.5h213.654l-58.659,58.661c-4.882,4.882-4.882,12.796,0,17.678   c2.44,2.439,5.64,3.661,8.839,3.661s6.398-1.222,8.839-3.661l79.998-80C270.053,138.373,270.053,130.459,265.171,125.577z"></path>
            </g></svg>
        </div>

    </div>
    </a>
    
    <a href="https://kiwix.${inethiDN}/ted_en_science_2022-01">
    <div class="desktopItem2">
        <span class="desktopItemCol1">
            <img width=43px src="captiveportal-TEDtalk.png" alt="">
        </span>
        <div class="desktopItemCol2" >
            <h3>TED Talks</h3>
            <p > Explore interesting talks on science, technology, history, psychology and much more</p>
            
            <svg class="svg-content" viewBox="0 0 268.832 268.832" x="0px" y="0px" id="svg-ac38" style="enable-background:new 0 0 268.832 268.832;"><g><path d="M265.171,125.577l-80-80c-4.881-4.881-12.797-4.881-17.678,0c-4.882,4.882-4.882,12.796,0,17.678l58.661,58.661H12.5   c-6.903,0-12.5,5.597-12.5,12.5c0,6.902,5.597,12.5,12.5,12.5h213.654l-58.659,58.661c-4.882,4.882-4.882,12.796,0,17.678   c2.44,2.439,5.64,3.661,8.839,3.661s6.398-1.222,8.839-3.661l79.998-80C270.053,138.373,270.053,130.459,265.171,125.577z"></path>
            </g></svg>
        </div>

    </div>
    </a>

    <a href="https://kolibri.${inethiDN}/en/learn/#/topics/ec164fee25ee526296e68f7c10b1e169">
    <div class="desktopItem2">
        <span class="desktopItemCol1">
            <img width=43px src="captiveportal-kahn.png" alt="">
        </span>
        <div class="desktopItemCol2" >
            <h3>Khan Academy</h3>
            <p >Learn about maths, art, computer programming, physics, and more</p>
            
            <svg class="svg-content" viewBox="0 0 268.832 268.832" x="0px" y="0px" id="svg-ac38" style="enable-background:new 0 0 268.832 268.832;"><g><path d="M265.171,125.577l-80-80c-4.881-4.881-12.797-4.881-17.678,0c-4.882,4.882-4.882,12.796,0,17.678l58.661,58.661H12.5   c-6.903,0-12.5,5.597-12.5,12.5c0,6.902,5.597,12.5,12.5,12.5h213.654l-58.659,58.661c-4.882,4.882-4.882,12.796,0,17.678   c2.44,2.439,5.64,3.661,8.839,3.661s6.398-1.222,8.839-3.661l79.998-80C270.053,138.373,270.053,130.459,265.171,125.577z"></path>
            </g></svg>
         
   
        </div>

    </div>
    </a>

    <a href="https://kiwix.${inethiDN}/phet_en_2021-08/A/index.html">
    <div class="desktopItem2">
        <span class="desktopItemCol1">
            <img width=43px src="captiveportal-science.png" alt="">
        </span>
        <div class="desktopItemCol2" >
            <h3>PhET Simulations</h3>
            <p >Interactive simulation for Science and Maths</p>
            
            <svg class="svg-content" viewBox="0 0 268.832 268.832" x="0px" y="0px" id="svg-ac38" style="enable-background:new 0 0 268.832 268.832;"><g><path d="M265.171,125.577l-80-80c-4.881-4.881-12.797-4.881-17.678,0c-4.882,4.882-4.882,12.796,0,17.678l58.661,58.661H12.5   c-6.903,0-12.5,5.597-12.5,12.5c0,6.902,5.597,12.5,12.5,12.5h213.654l-58.659,58.661c-4.882,4.882-4.882,12.796,0,17.678   c2.44,2.439,5.64,3.661,8.839,3.661s6.398-1.222,8.839-3.661l79.998-80C270.053,138.373,270.053,130.459,265.171,125.577z"></path>
            </g></svg>

        </div>
    </div>
    </a>

    <a href="https://scratch.${inethiDN}/projects/editor/?tutorial=getStarted">
    <div class="desktopItem2">
        <span class="desktopItemCol1">
            <img width=43px src="captiveportal-scratch.png" alt="">
        </span>
        <div class="desktopItemCol2" >
            <h3>Scratch</h3>
            <p >Learn to program and make your own games you can share with your friends</p>
            
            <svg class="svg-content" viewBox="0 0 268.832 268.832" x="0px" y="0px" id="svg-ac38" style="enable-background:new 0 0 268.832 268.832;"><g><path d="M265.171,125.577l-80-80c-4.881-4.881-12.797-4.881-17.678,0c-4.882,4.882-4.882,12.796,0,17.678l58.661,58.661H12.5   c-6.903,0-12.5,5.597-12.5,12.5c0,6.902,5.597,12.5,12.5,12.5h213.654l-58.659,58.661c-4.882,4.882-4.882,12.796,0,17.678   c2.44,2.439,5.64,3.661,8.839,3.661s6.398-1.222,8.839-3.661l79.998-80C270.053,138.373,270.053,130.459,265.171,125.577z"></path>
            </g></svg>
         
   
        </div>

    </div>
    </a>

    <a href="https://kiwix.${inethiDN}/gutenberg_en_all_2022-03/A/Home.html">
    <div class="desktopItem2">
        <span class="desktopItemCol1">
            <img width=43px src="captiveportal-gutenberg.png" alt="">
        </span>
        <div class="desktopItemCol2" >
            <h3>Gutenberg</h3>
            <p >The world's largest collection of free books</p>
            
            <svg class="svg-content" viewBox="0 0 268.832 268.832" x="0px" y="0px" id="svg-ac38" style="enable-background:new 0 0 268.832 268.832;"><g><path d="M265.171,125.577l-80-80c-4.881-4.881-12.797-4.881-17.678,0c-4.882,4.882-4.882,12.796,0,17.678l58.661,58.661H12.5   c-6.903,0-12.5,5.597-12.5,12.5c0,6.902,5.597,12.5,12.5,12.5h213.654l-58.659,58.661c-4.882,4.882-4.882,12.796,0,17.678   c2.44,2.439,5.64,3.661,8.839,3.661s6.398-1.222,8.839-3.661l79.998-80C270.053,138.373,270.053,130.459,265.171,125.577z"></path>
            </g></svg>
         
   
        </div>

    </div>
    </a>
  
    
    
</div>

<div class="lineText">
    <h1>iNethi club services</h1>
</div>

<div class="lineText">
    <h3><i>Entertainment, storage for your phone, games and much more</i></h3>
</div>

<div class="desktop">

    <a href="http://jellyfin.${inethiDN}">
    <div class="desktopItem2">
        <span class="desktopItemCol1">
            <img width=43px src="captiveportal-jellyfin.png" alt="">
        </span>
        <div class="desktopItemCol2" >
            <h3>Jellyfin</h3>
            <p >Your own community Youtube (user: guest, password: guest)</p>
            
            <svg class="svg-content" viewBox="0 0 268.832 268.832" x="0px" y="0px" id="svg-ac38" style="enable-background:new 0 0 268.832 268.832;"><g><path d="M265.171,125.577l-80-80c-4.881-4.881-12.797-4.881-17.678,0c-4.882,4.882-4.882,12.796,0,17.678l58.661,58.661H12.5   c-6.903,0-12.5,5.597-12.5,12.5c0,6.902,5.597,12.5,12.5,12.5h213.654l-58.659,58.661c-4.882,4.882-4.882,12.796,0,17.678   c2.44,2.439,5.64,3.661,8.839,3.661s6.398-1.222,8.839-3.661l79.998-80C270.053,138.373,270.053,130.459,265.171,125.577z"></path>
            </g></svg>
         
   
        </div>

    </div>
    </a>
  
    <a href="http://nextcloud.${inethiDN}">
    <div class="desktopItem2">
        <span class="desktopItemCol1">
            <img width=43px src="captiveportal-nextcloud.png" alt="">
        </span>
        <div class="desktopItemCol2" >
            <h3>Nextcloud</h3>
            <p >Share files with friends and backup all those photos on your phone</p>
            
            <svg class="svg-content" viewBox="0 0 268.832 268.832" x="0px" y="0px" id="svg-ac38" style="enable-background:new 0 0 268.832 268.832;"><g><path d="M265.171,125.577l-80-80c-4.881-4.881-12.797-4.881-17.678,0c-4.882,4.882-4.882,12.796,0,17.678l58.661,58.661H12.5   c-6.903,0-12.5,5.597-12.5,12.5c0,6.902,5.597,12.5,12.5,12.5h213.654l-58.659,58.661c-4.882,4.882-4.882,12.796,0,17.678   c2.44,2.439,5.64,3.661,8.839,3.661s6.398-1.222,8.839-3.661l79.998-80C270.053,138.373,270.053,130.459,265.171,125.577z"></path>
            </g></svg>
         
   
        </div>

    </div>
    </a>

    <a href="http://chess.${inethiDN}">
    <div class="desktopItem2">
        <span class="desktopItemCol1">
            <img width=43px src="captiveportal-chess.png" alt="">
        </span>
        <div class="desktopItemCol2" >
            <h3>Chess</h3>
            <p >Play chess against your friends or a chess computer</p>
            
            <svg class="svg-content" viewBox="0 0 268.832 268.832" x="0px" y="0px" id="svg-ac38" style="enable-background:new 0 0 268.832 268.832;"><g><path d="M265.171,125.577l-80-80c-4.881-4.881-12.797-4.881-17.678,0c-4.882,4.882-4.882,12.796,0,17.678l58.661,58.661H12.5   c-6.903,0-12.5,5.597-12.5,12.5c0,6.902,5.597,12.5,12.5,12.5h213.654l-58.659,58.661c-4.882,4.882-4.882,12.796,0,17.678   c2.44,2.439,5.64,3.661,8.839,3.661s6.398-1.222,8.839-3.661l79.998-80C270.053,138.373,270.053,130.459,265.171,125.577z"></path>
            </g></svg>
         
   
        </div>

    </div>
    </a>

    <a href="http://splash.${inethiDN}/minecraft">
    <div class="desktopItem2">
        <span class="desktopItemCol1">
            <img width=43px src="captiveportal-minecraft.png" alt="">
        </span>
        <div class="desktopItemCol2" >
            <h3>Minecraft</h3>
            <p >Play minecraft with friends without using any data</p>
            
            <svg class="svg-content" viewBox="0 0 268.832 268.832" x="0px" y="0px" id="svg-ac38" style="enable-background:new 0 0 268.832 268.832;"><g><path d="M265.171,125.577l-80-80c-4.881-4.881-12.797-4.881-17.678,0c-4.882,4.882-4.882,12.796,0,17.678l58.661,58.661H12.5   c-6.903,0-12.5,5.597-12.5,12.5c0,6.902,5.597,12.5,12.5,12.5h213.654l-58.659,58.661c-4.882,4.882-4.882,12.796,0,17.678   c2.44,2.439,5.64,3.661,8.839,3.661s6.398-1.222,8.839-3.661l79.998-80C270.053,138.373,270.053,130.459,265.171,125.577z"></path>
            </g></svg>
        </div>

    </div>
    </a>

    <a href="http://ludo.${inethiDN}">
    <div class="desktopItem2">
        <span class="desktopItemCol1">
            <img width=43px src="captiveportal-ludo.png" alt="">
        </span>
        <div class="desktopItemCol2" >
            <h3>Ludo</h3>
            <p>Play Ludo against friends</p>
            
            <svg class="svg-content" viewBox="0 0 268.832 268.832" x="0px" y="0px" id="svg-ac38" style="enable-background:new 0 0 268.832 268.832;"><g><path d="M265.171,125.577l-80-80c-4.881-4.881-12.797-4.881-17.678,0c-4.882,4.882-4.882,12.796,0,17.678l58.661,58.661H12.5   c-6.903,0-12.5,5.597-12.5,12.5c0,6.902,5.597,12.5,12.5,12.5h213.654l-58.659,58.661c-4.882,4.882-4.882,12.796,0,17.678   c2.44,2.439,5.64,3.661,8.839,3.661s6.398-1.222,8.839-3.661l79.998-80C270.053,138.373,270.053,130.459,265.171,125.577z"></path>
            </g></svg>
         
   
        </div>

    </div>
    </a>

    
    
</div>

<div class="lineText">
    <h1>Help grow the network</h1>
</div>

<div class="lineText">
    <h3><i>Earn community vouchers for hosting radios</i></h3>
</div>

<button class="absoluteButton"  onclick="window.location.href='https://inethi.org.za'"> LEARN HOW</button>

<div class="imageContainer">
    <img src="captiveportal-mesh.png" style="width: 100%; max-width: 400px;">
  </div>




<!-- Footer -->
<div class="footer">
    <span> <i>Operated by </i> <strong>Dappa </strong> and <strong> Grassroots Economics</strong></span>
    <br />
    <br />
    <span> <i>Powered by </i> <a href="https://inethi.org.za"><strong>iNethi </strong></a> </i></span>
    <br />
    <br />
    <span> <i> Project Sponsored by The Internet Society </i> </span>
    <br />
    <br />
</div>

</body>

<script>

    /*var keycloak = new Keycloak({
        "realm": "inethi",
        "auth-server-url": "https://keycloak.inethi.net/auth/",
        "ssl-required": "external",
        "resource": "inethisplash",
        "public-client": true,
        "confidential-port": 0,
        "clientId": "inethisplash"
    });
    keycloak.init( {onLoad: 'login-required'} ).then(function (authenticated) {
        console.log(authenticated ? 'authenticated' : 'not authenticated');
    }).catch(function () {
        console.log('failed to initialize');
    });*/

    function copyFunction() {
        document.getElementById("auth_user").value = document.getElementById("auth_voucher").value;
        document.getElementById("auth_pass").value = document.getElementById("auth_voucher").value;
    }

    function viewdiv(id) {
        var div = document.getElementById(id);
        div.style.display = "block"
    }

    function hidediv(id) {
        var div = document.getElementById(id);
        div.style.display = "none"
    }


</script>

</html>
EOF
