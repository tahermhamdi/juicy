//async new keyword
const dbl = n =>
    new Promise((resolve, reject) =>
        setTimeout(
            x => (isNaN(n) ? reject(new Error("Bad Num")) : resolve(n * 2)),
            500
        )
    );
async function fn() {
    const n = await dbl(15);
    console.log(n);
}
fn();
//INSTEAD OF
function getUser() {
    db.query("SELECT", []).then(function(result) {
        return result.rows[0];
    });
}
// if it wait to something that it is not a promise it will convert it to a Promise
//USE THIS with async and await
// async function getImageWithComments(id) {
//     const image = await getImageById(id);
//     const comments = await getCommentsByImageId(id);
//     return { image, comments };
// }
// In this example, the retrieval of the comments does not begin until the retrieval of the image is complete. If you wanted to perform the two asynchronous actions in parallel, you would have to reconfigure a bit.
//
// async function getImageWithComments(id) {
//     const image = getImageById(id);
//     const comments = getCommentsByImageId(id);
//     return {
//         image: await image,
//         comments: await comments
//     };
// }
async function getUser() {
    const { rows } = await db.query("SELECT", []).catch(function(e){

    });
    return rows[0];
}
app.get("/user", async (req, res) => {
    let user;
    try {
        user = await db.getUser();
        res.json(user);
    } catch(e){
        console.log(e);
        res.sendStatus(500);
    }

});
const { data } = await axios.get();

// fn().then(function(val) {
//     console.log(val);
// }).catch(function());

//when you call async function you have a promise in response
//

// import React from "react";
// import ReactDOM from "react-dom";
// // import * as test from "./test";
// import Welcome from "./welcome"
// //one component per file
// //import { Weclome, Logo} from './welcome';
// //import axios from "./axios";
// //import {link}
// //logout no route for it, do it like petition a href = /logout
// let component;
// if (location.pathname == '/welcome'){
//     ReactDOM.render(<Welcome />, document.querySelector("main"));
// }else {
//     ReactDOM.render(<Logo />, document.querySelector("main"));
// }
// //ReactDOM.render(component, document.querySelector("main"));
//
// // const elem = <div> hi!! </div>;
//
// // ReactDOM.render(
// //     elem,
// //     document.querySelector('main')
// // );
//
// //ReactDOM.render(<HelloWorld />, document.querySelector("main"));
// //ReactDOM.render(<Hello />, document.querySelector("main"));
// ReactDOM.render(<Hello name="Dolly" />, document.querySelector("main"));
// // ReactDOM.render
// // function HelloWorld() {
// //     const coinFlip = Math.floor(Math.random() * 2);
// //     const elems = [<div>I</div>, <div>LOVE</div>];
// //     //const strings = [I, HATE];
// //     return (
// //         //<div>Hello, World! {new Date() + ''}</div>
// //         <div>
// //             Hello, World!{coinFlip && "HEADS"}
// //             {!coinFlip && "TAILS"}
// //             {new Date() % 2 == 0 ? <strong>even</strong> : <em>odd</em>}
// //         </div>
// //     );
// // }
// // function Hello() {
// //     return (
// //         <div id="funky">
// //             {" "}
// //             Hello, <Greetee /> <div />
// //         </div>
// //     );
// // }
// // function Greetee() {
// //     const css = {
// //         color: "tomato",
// //         fontWeight: "bold"
// //     };
// //     return (
// //         <span classNAme="funky" style={css}>
// //             {" "}
// //             Kitty{" "}
// //         </span>
// //     );
// // }
// // function Greetee() {
// //     return <div className="funky"> Kitty </div>;
// // }
// // function HelloWorld() {
// //     return (
// //         <div>Hello, World! </div>
// //     );
// // }
// // three components
// // registration form
// // one welcome and the second register with the four fields and the button
// // own component first for the component register
// //second one after the button click
// //register component on a seprate file
// //another file
// import axios from "axios";
// // needs a class because it needs a state because we have to redraw in case of failed
// // log in
// ///
// // export class register extends React.Component {
// //     constructor (props){
// //         super(props);
// //         this.state = {};
// //     }
// // }
// handleChange (e) {
//     this[e.target.name] = e.target.value;
// }
// submit(){
//     axios.post('/register', {
//         first: this.first,
//         last : this.last
//     }).then(resp => {
//         if (resp.data.success){
//             location.replace('/');
//         } else {
//             this.setState({
//                 error:true
//             })
//         }
//     })
// }
// render (){
//     return <div>
//     {this.state.error && <div className='errmsg'>You messed up </div>}
//     <input name="first" onchange{this.handleChange} />
//     <input name="last" onchange{this.handleChange} />
//     <button onCLick=()>Submit</button>
//     </div>
// }
// funtion Logo(){
//     return <img src="logo.gif" id="logo">
// }
// // 0 user table the same from petition
// // 1 make welcome component
// // 1.1 can be functional component
// //   show a bit splashy message
// //   render register component
// // will be rendered in start.js only if pathname is Welcome
// // Register comonent
// // shows four form fields in onChange events
// // collect field values in onChange events
// // post on click on button
// // // register route on server
// //  // // need user table
// // Insert the data
// //  // MUST HASH PASSWORD
// //put user nae in session
// // res.json( success : true )) or res.json ((success: false))
// // upon success redirect to : with location.replace("/")
// // upon error, update state so error message appears
// // 3. star.js
// // if location.pathname is "/welcome"; render <welcome /> component
// // if location.pathname is not "/welcome", render <logo /> component
// // 4. on server, enforce that logged out users can only get to /Welcome
// // and logged in users can't get to /welcome
// import React from 'react';
//
// export class Register extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {};
//         this.handleChange = this.handleChange.bind(this);
//         this.submit = this.submit.bind(this);
//     }
//     handleChange(e) {
//         this[e.target.name] = e.target.value;
//     }
//     submit() {
//         axios
//             .post('/register', {
//                 first: this.first,
//                 last: this.last
//             })
//             .then(resp => {
//                 if (resp.data.success) {
//                     location.replace('/');
//                 } else {
//                     this.setState({
//                         error: true
//                     });
//                 }
//             });
//     }
//     render() {
//         return (
//             <div>
//                 {this.state.error && (
//                     <div className="errmsg">You messed up</div>
//                 )}
//                 <input name="first" onChange={this.handleChange} />
//                 <input name="last" onChange={this.handleChange} />
//                 <button onClick={this.submit}>Submit</button>
//             </div>
//         );
//     }
// }
// // <Auth url="/login" />
// // <Auth url="/register" />
// //a mess very quick because of the conditonnal
// //<Route path='/login' render={()=> <AuthForm component={RegistrationForm} url="/register" />}
// //give a component to a funtion and get back a componet result
// //raped up in a new component..higher order comonenet
// // a function operate on function
// // render function
// // render() {
// //     const Login = wrapInAuthForm(LoginForm, '/login');
// //     return {
// //         <div>
// //             <Login />
// //         </div>
// //     }
// // }
// // after connections some parts will be always visible
// // On every page of the site
// // replace the existing components with app
// // profilepic and userprofilepic
// // uploading in a new component
// // app is once you logged in
// // app will be a container for all other stuffs
// // pass informations to other compoonents
// // Once you mouse, do a route /user send back with json informations users
// // url field must be changed in the TABLE
// // bio also a VARCHAR(300)
// // lifecycle moment (listen)
// //
// // Hi, {this.state.first}
// // <ProfilePic
// //     id={this.state.id}
// //     proiflePic={this.state.profilePic}
// //     first={this.data.first}
// //     last={this.data.last}
// //     makeUploadeerVisible={this.showUploader}
// // />
// // {this.state.uploaderShouldbeVisible && (
// //     <Uploader
// //         changeImage={img =>
// //             this.setState({
// //                 profilePic: img,
// //                 uploaderShouldBeVisible: false
// //             })
// //         }
// //     />
// // )}
// // const cssdiv = {
// //     position: "absolute",
// //     top: "100px",
// //     left: "100px"
// // };
// // const cssimg = {
// //     height: "300px",
// //     width: "300px"
// // };
// one new thing that people see
// use the browser history API
//history.pushState({},"title","/funky/chicken")
//params

//change the url
//window.addEventListener("popState",function(e){
//    console.log(55);))
//})
//=> 55
//hashrouter tag and browe router tag in App
// in the end of the render after the headr
// <BrowerRouter>
// <div>
// <Route path="/"/>
// </div>
// * start route will manage the change in the URL
// different url from client side and the server
// </BrowserRouter>
// import {BrowserRouter, Router}
// api.get("api/friends") anyhow should be different
// new component profile that needs to show profile pic bigger than the HD
// show name and Bio . On click on the bio, if you have one you add it
// replace by a text field where the user can click
// data must be pass from the App to the profile component
// and another component for the bio (text area or bio CASE) this component
// will save the bio and send a  new state with the new Bio
// Bio => Profile =>
function Whatevercomp (props){
    function doSomething(){}

    return {
        <div>
            <img onClick={doSomething} />
        </div>
    }
}
//passing the state
// <BrowserRouter>
// <div>
// <Route path="/" render={() => { return (<Profile id = {this.state.id})}} />
// </div>
// </BrowserRouter>
//ANOTHER WAY
// class Route extends React.Component {
// render() {
//     let elem;
//     if (this.props.render){
//         elem = this.props.render();
//     }else if (this.props.component) {
//         let Comp = this.props.component;
//         elem = <Comp />
//     }
//     return elem;
// }
}
